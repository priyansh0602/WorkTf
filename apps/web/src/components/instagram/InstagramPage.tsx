/**
 * InstagramPage — Main Instagram DM agent page.
 *
 * Split-panel layout with Instagram-themed branding (#E1306C accent).
 */

import { useState } from "react";
import type { IConversation, IMessage } from "@worktf/shared";
import {
  MessageChannel, MessageDirection, MessageStatus,
  ConversationStatus, FollowUpStatus,
} from "@worktf/shared";
import { Icon, Card, Badge, Button, Modal } from "@components/ui";
import ConversationList from "./ConversationList";
import ConversationView from "./ConversationView";
import OutreachConfig from "./OutreachConfig";

// ─── Mock data ──────────────────────────────────────────────────────

const MOCK_CONVERSATIONS: IConversation[] = [
  {
    id: "ig1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.INSTAGRAM, status: ConversationStatus.ACTIVE,
    contactName: "Emily Chen", contactHandle: "@emilychen",
    lastMessage: "Love the product! Can I get a trial?",
    lastMessageAt: new Date(Date.now() - 10 * 60 * 1000),
    messageCount: 4, isFollowUp: false,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "ig2", agentId: "agent1", userId: "user1",
    channel: MessageChannel.INSTAGRAM, status: ConversationStatus.WAITING,
    contactName: "Jake Morrison", contactHandle: "@jakemorrison",
    lastMessage: "Hey Jake! Saw your post about scaling...",
    lastMessageAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    messageCount: 2, isFollowUp: true, followUpStatus: FollowUpStatus.PENDING,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "ig3", agentId: "agent1", userId: "user1",
    channel: MessageChannel.INSTAGRAM, status: ConversationStatus.RESOLVED,
    contactName: "Lisa Patel", contactHandle: "@lisapatel.biz",
    lastMessage: "Booked a demo for next Tuesday!",
    lastMessageAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    messageCount: 7, isFollowUp: true, followUpStatus: FollowUpStatus.RESPONDED,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "ig4", agentId: "agent1", userId: "user1",
    channel: MessageChannel.INSTAGRAM, status: ConversationStatus.ACTIVE,
    contactName: "Ryan Torres", contactHandle: "@ryantorres",
    lastMessage: "How does the AI handle objections?",
    lastMessageAt: new Date(Date.now() - 45 * 60 * 1000),
    messageCount: 5, isFollowUp: false,
    createdAt: new Date(), updatedAt: new Date(),
  },
];

const MOCK_MESSAGES: IMessage[] = [
  {
    id: "im1", conversationId: "ig1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.INSTAGRAM, direction: MessageDirection.OUTBOUND,
    status: MessageStatus.READ,
    content: "Hey Emily! 👋 Loved your recent post about automating workflows. We built something you might find interesting!",
    contactName: "Emily Chen", contactHandle: "@emilychen",
    sentAt: new Date(Date.now() - 30 * 60 * 1000), createdAt: new Date(),
  },
  {
    id: "im2", conversationId: "ig1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.INSTAGRAM, direction: MessageDirection.INBOUND,
    status: MessageStatus.READ,
    content: "Oh cool! What does it do?",
    contactName: "Emily Chen", contactHandle: "@emilychen",
    sentAt: new Date(Date.now() - 25 * 60 * 1000), createdAt: new Date(),
  },
  {
    id: "im3", conversationId: "ig1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.INSTAGRAM, direction: MessageDirection.OUTBOUND,
    status: MessageStatus.READ,
    content: "WorkTF AI creates AI agents that handle your calls, DMs, and emails. Imagine never missing a lead again! 🚀",
    contactName: "Emily Chen", contactHandle: "@emilychen",
    sentAt: new Date(Date.now() - 20 * 60 * 1000), createdAt: new Date(),
  },
  {
    id: "im4", conversationId: "ig1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.INSTAGRAM, direction: MessageDirection.INBOUND,
    status: MessageStatus.READ,
    content: "Love the product! Can I get a trial?",
    contactName: "Emily Chen", contactHandle: "@emilychen",
    sentAt: new Date(Date.now() - 10 * 60 * 1000), createdAt: new Date(),
  },
];

// ─── Component ──────────────────────────────────────────────────────

export default function InstagramPage() {
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
            <Icon name="photo_camera" size={24} color="#E1306C" />
            <h1
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "var(--on-surface)",
                margin: 0,
              }}
            >
              Instagram Agent
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
            AI-powered Instagram DM outreach and conversations
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Badge label="Not Connected" color="gray" />
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
            console.log("Launch Instagram campaign:", config);
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
