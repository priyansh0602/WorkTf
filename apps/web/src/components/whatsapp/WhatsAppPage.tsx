/**
 * WhatsAppPage — Main WhatsApp messaging agent page.
 *
 * Split-panel layout: conversation list (left) and
 * conversation thread view (right). Includes outreach modal.
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
    id: "wa1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.WHATSAPP, status: ConversationStatus.ACTIVE,
    contactName: "Sarah Mitchell", contactHandle: "+1 555 201 4892",
    lastMessage: "Thanks! I'll check with my team and get back to you.",
    lastMessageAt: new Date(Date.now() - 5 * 60 * 1000),
    messageCount: 6, isFollowUp: false,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "wa2", agentId: "agent1", userId: "user1",
    channel: MessageChannel.WHATSAPP, status: ConversationStatus.WAITING,
    contactName: "Tom Kravitz", contactHandle: "+1 555 348 2210",
    lastMessage: "Hi Tom, following up on our earlier chat...",
    lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    messageCount: 3, isFollowUp: true, followUpStatus: FollowUpStatus.PENDING,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "wa3", agentId: "agent1", userId: "user1",
    channel: MessageChannel.WHATSAPP, status: ConversationStatus.RESOLVED,
    contactName: "Diana Park", contactHandle: "+1 555 456 8820",
    lastMessage: "Great, looking forward to the demo!",
    lastMessageAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    messageCount: 8, isFollowUp: true, followUpStatus: FollowUpStatus.RESPONDED,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: "wa4", agentId: "agent1", userId: "user1",
    channel: MessageChannel.WHATSAPP, status: ConversationStatus.ACTIVE,
    contactName: "Marcus Webb", contactHandle: "+1 555 773 0091",
    lastMessage: "Can you send me the pricing details?",
    lastMessageAt: new Date(Date.now() - 30 * 60 * 1000),
    messageCount: 4, isFollowUp: false,
    createdAt: new Date(), updatedAt: new Date(),
  },
];

const MOCK_MESSAGES: IMessage[] = [
  {
    id: "m1", conversationId: "wa1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.WHATSAPP, direction: MessageDirection.OUTBOUND,
    status: MessageStatus.READ, content: "Hi Sarah! I'm Alex from WorkTF AI. We help companies automate their outreach with AI-powered agents.",
    contactName: "Sarah Mitchell", contactHandle: "+1 555 201 4892",
    sentAt: new Date(Date.now() - 30 * 60 * 1000), createdAt: new Date(),
  },
  {
    id: "m2", conversationId: "wa1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.WHATSAPP, direction: MessageDirection.INBOUND,
    status: MessageStatus.READ, content: "Hey! That sounds interesting. Can you tell me more?",
    contactName: "Sarah Mitchell", contactHandle: "+1 555 201 4892",
    sentAt: new Date(Date.now() - 25 * 60 * 1000), createdAt: new Date(),
  },
  {
    id: "m3", conversationId: "wa1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.WHATSAPP, direction: MessageDirection.OUTBOUND,
    status: MessageStatus.READ, content: "Of course! We offer AI calling, WhatsApp, Instagram, and email automation. Our AI handles conversations naturally and can qualify leads, book appointments, and follow up automatically.",
    contactName: "Sarah Mitchell", contactHandle: "+1 555 201 4892",
    sentAt: new Date(Date.now() - 20 * 60 * 1000), createdAt: new Date(),
  },
  {
    id: "m4", conversationId: "wa1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.WHATSAPP, direction: MessageDirection.INBOUND,
    status: MessageStatus.READ, content: "That's impressive. What's the pricing like?",
    contactName: "Sarah Mitchell", contactHandle: "+1 555 201 4892",
    sentAt: new Date(Date.now() - 15 * 60 * 1000), createdAt: new Date(),
  },
  {
    id: "m5", conversationId: "wa1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.WHATSAPP, direction: MessageDirection.OUTBOUND,
    status: MessageStatus.DELIVERED, content: "We have flexible plans starting from $49/month. I'd love to set up a quick demo to show you how it works for your specific use case. Would tomorrow work?",
    contactName: "Sarah Mitchell", contactHandle: "+1 555 201 4892",
    sentAt: new Date(Date.now() - 10 * 60 * 1000), createdAt: new Date(),
  },
  {
    id: "m6", conversationId: "wa1", agentId: "agent1", userId: "user1",
    channel: MessageChannel.WHATSAPP, direction: MessageDirection.INBOUND,
    status: MessageStatus.READ, content: "Thanks! I'll check with my team and get back to you.",
    contactName: "Sarah Mitchell", contactHandle: "+1 555 201 4892",
    sentAt: new Date(Date.now() - 5 * 60 * 1000), createdAt: new Date(),
  },
];

// ─── Component ──────────────────────────────────────────────────────

export default function WhatsAppPage() {
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
            <Icon name="chat" size={24} color="#25D366" />
            <h1
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "var(--on-surface)",
                margin: 0,
              }}
            >
              WhatsApp Agent
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
            AI-powered WhatsApp outreach and conversations
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
            console.log("Launch WhatsApp campaign:", config);
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
