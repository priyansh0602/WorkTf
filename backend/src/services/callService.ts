import { supabaseAdmin, vapiClient } from '../lib';
import { ICallDocument } from '../models';
import { createError } from '../middleware';
import { config } from '../config';
import { IAgentDocument, IUserDocument } from '../models';

interface VapiCallResponse {
  id: string;
}

interface CallStats {
  total: number;
  answered: number;
  missed: number;
  converted: number;
  conversionRate: string;
}

interface CallsResult {
  calls: ICallDocument[];
  total: number;
}

export async function initiateOutboundCall(
  userId: string,
  contactName: string,
  contactNumber: string
): Promise<ICallDocument> {
  try {
    // 1. Get agent by userId
    const { data: agent, error: agentError } = await supabaseAdmin
      .from('agents')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (agentError || !agent) {
      throw createError('No agent configured', 404);
    }

    const typedAgent = agent as IAgentDocument;

    if (!typedAgent.outbound_enabled) {
      throw createError('Outbound calling disabled', 400);
    }

    // 2. Check calls limit
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      throw createError('User not found', 404);
    }

    const typedUser = user as IUserDocument;

    if (typedUser.calls_used >= typedUser.calls_limit) {
      throw createError('Call limit reached. Please upgrade your plan.', 429);
    }

    // 3. Insert call record
    const { data: call, error: callError } = await supabaseAdmin
      .from('calls')
      .insert({
        agent_id: typedAgent.id,
        user_id: userId,
        contact_name: contactName,
        contact_number: contactNumber,
        direction: 'OUTBOUND',
        status: 'INITIATED',
      })
      .select()
      .single();

    if (callError || !call) {
      throw createError(callError?.message || 'Failed to create call record', 500);
    }

    const typedCall = call as ICallDocument;

    // 4. Start VAPI call
    const vapiCall = await vapiClient.post<VapiCallResponse>('call/phone', {
      assistantId: typedAgent.vapi_assistant_id,
      phoneNumberId: typedAgent.vapi_phone_number_id || config.vapiPhoneNumberId,
      customer: {
        name: contactName,
        number: contactNumber,
      },
    });

    // 5. Update call with VAPI call ID
    const { data: updatedCall, error: updateError } = await supabaseAdmin
      .from('calls')
      .update({
        vapi_call_id: vapiCall.id,
        status: 'RINGING',
      })
      .eq('id', typedCall.id)
      .select()
      .single();

    if (updateError) {
      console.error('Failed to update call with VAPI ID:', updateError.message);
    }

    // 6. Increment user calls_used
    await supabaseAdmin
      .from('users')
      .update({ calls_used: typedUser.calls_used + 1 })
      .eq('id', userId);

    return (updatedCall || typedCall) as ICallDocument;
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error;
    }
    throw createError(
      error instanceof Error ? error.message : 'Failed to initiate call',
      500
    );
  }
}

export async function getCallsByUserId(
  userId: string,
  limit = 20,
  skip = 0
): Promise<CallsResult> {
  try {
    // Get total count
    const { count, error: countError } = await supabaseAdmin
      .from('calls')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (countError) {
      throw createError(countError.message, 500);
    }

    // Get paginated calls
    const { data: calls, error } = await supabaseAdmin
      .from('calls')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1);

    if (error) {
      throw createError(error.message, 500);
    }

    return {
      calls: (calls || []) as ICallDocument[],
      total: count || 0,
    };
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error;
    }
    throw createError(
      error instanceof Error ? error.message : 'Failed to get calls',
      500
    );
  }
}

export async function getCallById(callId: string): Promise<ICallDocument> {
  try {
    const { data: call, error } = await supabaseAdmin
      .from('calls')
      .select('*')
      .eq('id', callId)
      .single();

    if (error || !call) {
      throw createError('Call not found', 404);
    }

    return call as ICallDocument;
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error;
    }
    throw createError(
      error instanceof Error ? error.message : 'Failed to get call',
      500
    );
  }
}

export async function updateCallFromWebhook(
  vapiCallId: string,
  updates: Record<string, unknown>
): Promise<ICallDocument | null> {
  try {
    // Find call by vapi_call_id
    const { data: existing, error: findError } = await supabaseAdmin
      .from('calls')
      .select('*')
      .eq('vapi_call_id', vapiCallId)
      .single();

    if (findError || !existing) {
      return null;
    }

    // Update call
    const { data: updated, error: updateError } = await supabaseAdmin
      .from('calls')
      .update(updates)
      .eq('vapi_call_id', vapiCallId)
      .select()
      .single();

    if (updateError || !updated) {
      return null;
    }

    return updated as ICallDocument;
  } catch (error) {
    console.error('Error updating call from webhook:', error);
    return null;
  }
}

export async function getCallStats(userId: string): Promise<CallStats> {
  try {
    const { data: calls, error } = await supabaseAdmin
      .from('calls')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw createError(error.message, 500);
    }

    const allCalls = (calls || []) as ICallDocument[];
    const total = allCalls.length;
    const answered = allCalls.filter(
      (c) => c.outcome === 'ANSWERED' || c.outcome === 'CONVERTED'
    ).length;
    const missed = allCalls.filter((c) => c.outcome === 'MISSED').length;
    const converted = allCalls.filter((c) => c.outcome === 'CONVERTED').length;
    const conversionRate = total > 0
      ? (converted / total * 100).toFixed(1)
      : '0.0';

    return { total, answered, missed, converted, conversionRate };
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error;
    }
    throw createError(
      error instanceof Error ? error.message : 'Failed to get call stats',
      500
    );
  }
}
