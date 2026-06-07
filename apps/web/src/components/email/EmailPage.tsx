/**
 * EmailPage — Main Email agent page.
 *
 * Split-panel layout with email-themed branding.
 * Shows "Connected" badge since Email via Resend works immediately.
 */

import { useState } from "react";
import type { IConversation, IMessage } from "@worktf/shared";
import {
  MessageChannel, MessageDirection, MessageStatus,
  ConversationStatus, FollowUpStatus,
} from "@worktf/shared";
import { Icon, Badge, Button, Modal } from "@components/ui";
import ConversationList from "./ConversationList";
import ConversationView from "./ConversationView";
import OutreachConfig from "./OutreachConfig";

// ─── Mock data ──────────────────────────────────────────────────────

const MOCK_CONVERSATIONS: IConversation[] = [
  {
    id: "em1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.EMAIL, status: ConversationStatus.ACTIVE,
    contactName: "David Kim", contactHandle: "david@techcorp.io",
    lastMessage: "Thanks for the detailed overview. Let me review with my CTO.",
    lastMessageAt: new Date(Date.now() - 15 * 60 * 1000),
    messageCount: 5, isFollowUp: false,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "em2", agentId: "agent1", userId: "user1",
    channel: MessageChannel.EMAIL, status: ConversationStatus.WAITING,
    contactName: "Amanda Foster", contactHandle: "amanda@growthlab.co",
    lastMessage: "Following up on my previous email about WorkTF AI...",
    lastMessageAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    messageCount: 3, isFollowUp: true, followUpStatus: FollowUpStatus.PENDING,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "em3", agentId: "agent1", userId: "user1",
    channel: MessageChannel.EMAIL, status: ConversationStatus.RESOLVED,
    contactName: "Chris Nakamura", contactHandle: "chris@ventureai.com",
    lastMessage: "Deal! Let's schedule the onboarding for next week.",
    lastMessageAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
    messageCount: 8, isFollowUp: true, followUpStatus: FollowUpStatus.RESPONDED,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "em4", agentId: "agent1", userId: "user1",
    channel: MessageChannel.EMAIL, status: ConversationStatus.ACTIVE,
    contactName: "Priya Sharma", contactHandle: "priya@startupx.in",
    lastMessage: "Can you send me a comparison with Competitor X?",
    lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    messageCount: 4, isFollowUp: false,
    createdAt: new Date(), updatedAt: new Date(),
  },
];

const MOCK_MESSAGES: IMessage[] = [
  {
    id: "em-m1", conversationId: "em1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.EMAIL, direction: MessageDirection.OUTBOUND,
    status: MessageStatus.READ,
    content: "Hi David,\n\nI'm Alex from WorkTF AI. We help companies like TechCorp automate their outreach with AI-powered agents that handle calls, emails, and social DMs.\n\nWould you have 15 minutes this week for a quick demo?",
    contactName: "David Kim", contactHandle: "david@techcorp.io",
    sentAt: new Date(Date.now() - 60 * 60 * 1000), createdAt: new Date(),
  },
  {
    id: "em-m2", conversationId: "em1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.EMAIL, direction: MessageDirection.INBOUND,
    status: MessageStatus.READ,
    content: "Hi Alex,\n\nThat sounds interesting! We've been looking at automating our SDR outreach. What channels do you support?",
    contactName: "David Kim", contactHandle: "david@techcorp.io",
    sentAt: new Date(Date.now() - 45 * 60 * 1000), createdAt: new Date(),
  },
  {
    id: "em-m3", conversationId: "em1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.EMAIL, direction: MessageDirection.OUTBOUND,
    status: MessageStatus.READ,
    content: "Great question! WorkTF AI supports four channels:\n\n• AI Voice Calls — Natural conversations with leads\n• WhatsApp — Automated messaging and follow-ups\n• Instagram DMs — Social selling on autopilot\n• Email — Intelligent sequences with smart follow-ups\n\nThe best part? One AI agent manages all channels seamlessly.",
    contactName: "David Kim", contactHandle: "david@techcorp.io",
    sentAt: new Date(Date.now() - 30 * 60 * 1000), createdAt: new Date(),
  },
  {
    id: "em-m4", conversationId: "em1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.EMAIL, direction: MessageDirection.INBOUND,
    status: MessageStatus.READ,
    content: "Thanks for the detailed overview. Let me review with my CTO.",
    contactName: "David Kim", contactHandle: "david@techcorp.io",
    sentAt: new Date(Date.now() - 15 * 60 * 1000), createdAt: new Date(),
  },
];

// ─── Component ──────────────────────────────────────────────────────

export default function EmailPage() {
  const [activeConversation, setActiveConversation] = useState<IConversation | null>(null);
  const [showOutreach, setShowOutreach] = useState(false);

  const activeMessages = activeConversation
    ? MOCK_MESSAGES.filter((m) => m.conversationId === activeConversation.id)
    : [];

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Page header */}
      <div
        style={{
          flexShrink: 0,
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Icon name="mail" size={24} color="var(--primary)" />
            <h1
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "var(--on-surface)",
                margin: 0,
              }}
            >
              Email Agent
            </h1>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "var(--on-surface-variant)",
              marginTop: "4px",
              marginBottom: 0,
            }}
          >
            AI-powered email outreach and follow-up sequences
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Badge label="Connected" color="green" />
          <Button
            variant="primary"
            icon="add"
            onClick={() => setShowOutreach(true)}
          >
            New Campaign
          </Button>
        </div>
      </div>

      {/* Outreach modal */}
      <Modal open={showOutreach} onClose={() => setShowOutreach(false)} width={600}>
        <OutreachConfig
          onClose={() => setShowOutreach(false)}
          onLaunch={(config) => {
            console.log("Launch Email campaign:", config);
            setShowOutreach(false);
          }}
        />
      </Modal>

      {/* Main content: split panel */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', borderTop: '1px solid var(--outline-variant)' }}>
        <ConversationList
          conversations={MOCK_CONVERSATIONS}
          activeId={activeConversation?.id}
          onSelect={setActiveConversation}
          onNewOutreach={() => setShowOutreach(true)}
        />
        <ConversationView
          conversation={activeConversation ?? undefined}
          messages={activeMessages}
          onSendMessage={(content) => console.log("Send:", content)}
        />
      </div>
    </div>
  );
}
