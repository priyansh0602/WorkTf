/**
 * Message — Type definitions for multi-channel messaging.
 *
 * Covers WhatsApp, Instagram DM, and Email channels with
 * conversation tracking, follow-up automation, and agent config.
 */

// ─── Enums ──────────────────────────────────────────────────────────

/** Supported messaging channels. */
export enum MessageChannel {
  WHATSAPP = "WHATSAPP",
  INSTAGRAM = "INSTAGRAM",
  EMAIL = "EMAIL",
}

/** Direction of a message within a conversation. */
export enum MessageDirection {
  INBOUND = "INBOUND",
  OUTBOUND = "OUTBOUND",
}

/** Delivery status of a message. */
export enum MessageStatus {
  QUEUED = "QUEUED",
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ",
  FAILED = "FAILED",
}

/** Status of a conversation thread. */
export enum ConversationStatus {
  ACTIVE = "ACTIVE",
  WAITING = "WAITING",
  RESOLVED = "RESOLVED",
  OPTED_OUT = "OPTED_OUT",
}

/** Status of an automated follow-up sequence. */
export enum FollowUpStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  RESPONDED = "RESPONDED",
  SKIPPED = "SKIPPED",
}

// ─── Interfaces ─────────────────────────────────────────────────────

/** A single message in a conversation thread. */
export interface IMessage {
  id: string;
  conversationId: string;
  agentId: string;
  userId: string;
  channel: MessageChannel;
  direction: MessageDirection;
  status: MessageStatus;
  content: string;
  contactName: string;
  /** Phone for WhatsApp, @handle for Instagram, email address for Email */
  contactHandle: string;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  createdAt: Date;
}

/** A conversation thread grouping messages with a contact. */
export interface IConversation {
  id: string;
  agentId: string;
  userId: string;
  channel: MessageChannel;
  status: ConversationStatus;
  contactName: string;
  contactHandle: string;
  lastMessage?: string;
  lastMessageAt?: Date;
  messageCount: number;
  isFollowUp: boolean;
  followUpStatus?: FollowUpStatus;
  followUpScheduledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/** A contact in an outreach campaign. */
export interface IOutreachContact {
  id: string;
  name: string;
  /** Phone/handle/email depending on channel */
  handle: string;
  channel: MessageChannel;
  status: FollowUpStatus;
  lastContactedAt?: Date;
  responseReceived: boolean;
  notes?: string;
}

/** Configuration for a messaging agent on a specific channel. */
export interface IMessagingAgentConfig {
  channel: MessageChannel;
  isEnabled: boolean;
  initialMessage: string;
  followUpMessage: string;
  followUpDelayHours: number;
  maxFollowUps: number;
  signOff: string;
}
