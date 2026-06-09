import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../lib';
import { createAgent } from '../services';
import { createError } from '../middleware';
import { IUserDocument } from '../models';

export async function getMe(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  res.status(200).json(req.user);
}

interface CreateUserBody {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface OnboardingBody {
  useCase: string;
  callVolume: string;
  agentTone: string;
  audienceType: string;
  channels: string;
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { clerkId, email, firstName, lastName } = req.body as CreateUserBody;

    // Check if user already exists
    const { data: existing } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('clerk_id', clerkId)
      .single();

    if (existing) {
      res.status(200).json(existing);
      return;
    }

    // Create new user
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert({
        clerk_id: clerkId,
        email,
        first_name: firstName,
        last_name: lastName,
      })
      .select()
      .single();

    if (error || !user) {
      throw createError(error?.message || 'Failed to create user', 500);
    }

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateOnboarding(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const { useCase, callVolume, agentTone, audienceType, channels } =
      req.body as OnboardingBody;

    // Generate default goal based on useCase
    const goalMap: Record<string, string> = {
      LEAD_QUALIFICATION:
        'Qualify inbound leads by asking about budget, timeline, and pain points. Book follow-up calls for qualified prospects.',
      APPOINTMENT_BOOKING:
        'Help prospects schedule appointments. Confirm availability and send calendar invites.',
      CUSTOMER_SUPPORT:
        'Handle customer queries professionally. Resolve common issues and escalate complex cases.',
      OUTBOUND_SALES:
        'Reach out to prospects and gauge interest. Qualify leads and book discovery calls.',
    };

    // Determine enabled channels
    let enabledChannels: string[];
    switch (channels) {
      case 'ALL_CHANNELS':
        enabledChannels = ['CALLING', 'WHATSAPP', 'INSTAGRAM', 'EMAIL'];
        break;
      case 'CALLING_WHATSAPP':
        enabledChannels = ['CALLING', 'WHATSAPP'];
        break;
      case 'CALLING_EMAIL':
        enabledChannels = ['CALLING', 'EMAIL'];
        break;
      default:
        enabledChannels = ['CALLING'];
    }

    // Create agent
    const agent = await createAgent(userId, {
      name: 'Alex',
      voice_style: 'PROFESSIONAL_MALE',
      tone: agentTone,
      use_case: useCase,
      goal: goalMap[useCase] || goalMap.LEAD_QUALIFICATION,
      call_volume: callVolume,
      audience_type: audienceType,
      enabled_channels: enabledChannels,
    });

    // Update user onboarding status
    await supabaseAdmin
      .from('users')
      .update({
        onboarding_completed: true,
        agent_id: agent.id,
      })
      .eq('id', userId);

    const updatedUser: IUserDocument = {
      ...req.user!,
      onboarding_completed: true,
      agent_id: agent.id,
    };

    res.status(200).json({ user: updatedUser, agent });
  } catch (error) {
    next(error);
  }
}
