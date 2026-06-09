import { supabaseAdmin, vapiClient } from '../lib';
import { IAgentDocument, IAgentInsert } from '../models';
import { createError } from '../middleware';
import { config } from '../config';

interface VapiAssistantResponse {
  id: string;
  name: string;
}

function mapVoiceStyle(style: string): string {
  const voiceMap: Record<string, string> = {
    PROFESSIONAL_MALE: 'ErXwobaYiN019PkySvjV',
    PROFESSIONAL_FEMALE: 'EXAVITQu4vr4xnSDxMaL',
    FRIENDLY_MALE: 'VR6AewLTigWG4xSOukaG',
    FRIENDLY_FEMALE: 'oWAxZDx7w5VEj9dCyTzz',
  };
  return voiceMap[style] || 'ErXwobaYiN019PkySvjV';
}

export async function createAgent(
  userId: string,
  data: Partial<IAgentInsert>
): Promise<IAgentDocument> {
  try {
    // 1. Insert agent into Supabase
    const { data: agent, error } = await supabaseAdmin
      .from('agents')
      .insert({ user_id: userId, ...data })
      .select()
      .single();

    if (error || !agent) {
      throw createError(error?.message || 'Failed to create agent', 500);
    }

    const typedAgent = agent as IAgentDocument;

    // 2. Create VAPI assistant
    const vapiAssistant = await vapiClient.post<VapiAssistantResponse>('assistant', {
      name: typedAgent.name,
      model: {
        provider: 'groq',
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: `You are ${typedAgent.name}, an AI calling agent. Your goal is: ${typedAgent.goal}. Tone: ${typedAgent.tone}. Audience: ${typedAgent.audience_type}. Be concise, professional, and always stay focused on the goal. Keep responses brief and conversational.`,
          },
        ],
      },
      voice: {
        provider: '11labs',
        voiceId: mapVoiceStyle(typedAgent.voice_style),
      },
      firstMessage: `Hello! This is ${typedAgent.name}. How can I help you today?`,
      endCallMessage: 'Thank you for your time. Have a great day!',
    });

    // 3. Update agent with VAPI assistant ID
    const { data: updated, error: updateError } = await supabaseAdmin
      .from('agents')
      .update({
        vapi_assistant_id: vapiAssistant.id,
        vapi_phone_number_id: config.vapiPhoneNumberId,
      })
      .eq('id', typedAgent.id)
      .select()
      .single();

    if (updateError || !updated) {
      throw createError(updateError?.message || 'Failed to update agent with VAPI ID', 500);
    }

    return updated as IAgentDocument;
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error;
    }
    throw createError(
      error instanceof Error ? error.message : 'Failed to create agent',
      500
    );
  }
}

export async function getAgentByUserId(userId: string): Promise<IAgentDocument> {
  try {
    const { data: agent, error } = await supabaseAdmin
      .from('agents')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !agent) {
      throw createError('Agent not found', 404);
    }

    return agent as IAgentDocument;
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error;
    }
    throw createError(
      error instanceof Error ? error.message : 'Failed to get agent',
      500
    );
  }
}

export async function updateAgent(
  agentId: string,
  updates: Partial<IAgentDocument>
): Promise<IAgentDocument> {
  try {
    // Get the existing agent first to check for VAPI updates
    const { data: existingAgent, error: fetchError } = await supabaseAdmin
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .single();

    if (fetchError || !existingAgent) {
      throw createError('Agent not found', 404);
    }

    const typed = existingAgent as IAgentDocument;

    // Update in Supabase
    const { data: updated, error: updateError } = await supabaseAdmin
      .from('agents')
      .update(updates)
      .eq('id', agentId)
      .select()
      .single();

    if (updateError || !updated) {
      throw createError(updateError?.message || 'Failed to update agent', 500);
    }

    const updatedAgent = updated as IAgentDocument;

    // If agent has VAPI assistant and name/goal/tone changed, update VAPI too
    if (typed.vapi_assistant_id) {
      const needsVapiUpdate =
        updates.name || updates.goal || updates.tone || updates.audience_type;

      if (needsVapiUpdate) {
        await vapiClient.patch(`assistant/${typed.vapi_assistant_id}`, {
          name: updatedAgent.name,
          model: {
            provider: 'groq',
            model: 'llama3-70b-8192',
            messages: [
              {
                role: 'system',
                content: `You are ${updatedAgent.name}, an AI calling agent. Your goal is: ${updatedAgent.goal}. Tone: ${updatedAgent.tone}. Audience: ${updatedAgent.audience_type}. Be concise, professional, and always stay focused on the goal. Keep responses brief and conversational.`,
              },
            ],
          },
          firstMessage: `Hello! This is ${updatedAgent.name}. How can I help you today?`,
        });
      }
    }

    return updatedAgent;
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error;
    }
    throw createError(
      error instanceof Error ? error.message : 'Failed to update agent',
      500
    );
  }
}

export async function deleteAgent(agentId: string): Promise<{ success: boolean }> {
  try {
    // Get agent to check for VAPI assistant
    const { data: agent, error: fetchError } = await supabaseAdmin
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .single();

    if (fetchError || !agent) {
      throw createError('Agent not found', 404);
    }

    const typed = agent as IAgentDocument;

    // Delete from VAPI if assistant exists
    if (typed.vapi_assistant_id) {
      try {
        await vapiClient.delete(`assistant/${typed.vapi_assistant_id}`);
      } catch (vapiError) {
        console.error('Failed to delete VAPI assistant:', vapiError);
        // Continue with Supabase deletion even if VAPI fails
      }
    }

    // Delete from Supabase
    const { error: deleteError } = await supabaseAdmin
      .from('agents')
      .delete()
      .eq('id', agentId);

    if (deleteError) {
      throw createError(deleteError.message, 500);
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error;
    }
    throw createError(
      error instanceof Error ? error.message : 'Failed to delete agent',
      500
    );
  }
}
