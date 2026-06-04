/**
 * Agent — Type definitions for the AI agent configuration.
 *
 * Each user creates one agent during onboarding. The agent's settings
 * drive the VAPI assistant creation and determine call behavior.
 * Supports multi-channel: calling, WhatsApp, Instagram, and Email.
 */

import type { IMessagingAgentConfig } from "./message";

// ─── Enums ──────────────────────────────────────────────────────────

/** Communication tone the agent adopts during calls. */
export enum AgentTone {
  PROFESSIONAL = "PROFESSIONAL",
  FRIENDLY = "FRIENDLY",
  PERSUASIVE = "PERSUASIVE",
  NEUTRAL = "NEUTRAL",
}

/** Primary purpose / workflow the agent is configured for. */
export enum AgentUseCase {
  LEAD_QUALIFICATION = "LEAD_QUALIFICATION",
  APPOINTMENT_BOOKING = "APPOINTMENT_BOOKING",
  CUSTOMER_SUPPORT = "CUSTOMER_SUPPORT",
  OUTBOUND_SALES = "OUTBOUND_SALES",
  WHATSAPP_OUTREACH = "WHATSAPP_OUTREACH",
  INSTAGRAM_OUTREACH = "INSTAGRAM_OUTREACH",
  EMAIL_OUTREACH = "EMAIL_OUTREACH",
}

/** Expected monthly call volume — determines resource allocation. */
export enum CallVolume {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  ENTERPRISE = "ENTERPRISE",
}

/** Nature of the audience the agent will be calling. */
export enum AudienceType {
  COLD = "COLD",
  WARM = "WARM",
  EXISTING = "EXISTING",
  MIXED = "MIXED",
}

/** Pre-configured voice options for the VAPI assistant. */
export enum VoiceStyle {
  PROFESSIONAL_MALE = "PROFESSIONAL_MALE",
  PROFESSIONAL_FEMALE = "PROFESSIONAL_FEMALE",
  FRIENDLY_MALE = "FRIENDLY_MALE",
  FRIENDLY_FEMALE = "FRIENDLY_FEMALE",
}

/** Available communication channels. */
export enum ChannelType {
  CALLING = "CALLING",
  WHATSAPP = "WHATSAPP",
  INSTAGRAM = "INSTAGRAM",
  EMAIL = "EMAIL",
}

// ─── Interfaces ─────────────────────────────────────────────────────

/** Complete agent configuration stored in the database. */
export interface IAgent {
  id: string;
  userId: string;
  name: string;
  voiceStyle: VoiceStyle;
  tone: AgentTone;
  useCase: AgentUseCase;
  /** Free-form description of what the agent should accomplish on calls. */
  goal: string;
  callVolume: CallVolume;
  audienceType: AudienceType;
  inboundEnabled: boolean;
  outboundEnabled: boolean;
  voicemailDetection: boolean;
  callRecording: boolean;
  /** Assigned after VAPI creates the assistant on the backend. */
  vapiAssistantId?: string;
  /** Phone number ID linked to this agent in VAPI. */
  vapiPhoneNumberId?: string;
  isActive: boolean;
  /** Per-channel messaging configurations. */
  messagingConfigs?: IMessagingAgentConfig[];
  /** Channels the user has enabled. */
  enabledChannels?: ChannelType[];
  createdAt: Date;
  updatedAt: Date;
}
