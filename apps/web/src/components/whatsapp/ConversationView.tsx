/**
 * ConversationView — Right panel showing a WhatsApp conversation thread.
 *
 * Displays message bubbles, AI status bar, and a message input area.
 */

import { useState } from "react";
import type { IConversation, IMessage } from "@worktf/shared";
import { Icon, Avatar } from "@components/ui";
import { MessageBubble } from "@components/messaging";

interface ConversationViewProps {
  conversation?: IConversation;
  messages?: IMessage[];
  onSendMessage?: (content: string) => void;
}

export default function ConversationView({
  conversation,
  messages = [],
  onSendMessage,
}: ConversationViewProps) {
  const [inputValue, setInputValue] = useState("");

  if (!conversation) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Icon name="chat" size={64} color="var(--outline-variant)" />
        <div
          style={{
            fontSize: "16px",
            fontWeight: 500,
            color: "var(--on-surface-variant)",
            marginTop: "16px",
          }}
        >
          Select a conversation
        </div>
      </div>
    );
  }

  const nameParts = conversation.contactName.split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid var(--outline-variant)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar firstName={firstName} lastName={lastName} size="sm" />
          <div>
            <div
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--on-surface)",
              }}
            >
              {conversation.contactName}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--on-surface-variant)",
              }}
            >
              {conversation.contactHandle}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {["phone", "info"].map((ic) => (
            <button
              key={ic}
              type="button"
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "var(--on-surface-variant)",
                display: "flex",
              }}
            >
              <Icon name={ic} size={20} />
            </button>
          ))}
        </div>
      </div>

      {/* Messages area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            content={msg.content}
            direction={msg.direction}
            status={msg.status}
            sentAt={msg.sentAt}
            isAI={msg.direction === "OUTBOUND"}
          />
        ))}
      </div>

      {/* AI status bar */}
      <div
        style={{
          padding: "8px 16px",
          background: "var(--surface-low)",
          borderTop: "1px solid var(--outline-variant)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#16a34a",
          }}
        />
        <span
          style={{
            fontSize: "13px",
            color: "var(--on-surface-variant)",
            fontFamily: "'Geist', sans-serif",
          }}
        >
          AI Agent Active — responding automatically
        </span>
      </div>

      {/* Input area */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid var(--outline-variant)",
          display: "flex",
          gap: "8px",
          alignItems: "flex-end",
        }}
      >
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message or let AI handle it..."
          rows={2}
          style={{
            flex: 1,
            resize: "none",
            border: "1px solid var(--outline-variant)",
            borderRadius: "10px",
            padding: "10px 14px",
            fontSize: "14px",
            fontFamily: "'Inter', sans-serif",
            color: "var(--on-surface)",
            background: "var(--surface-low)",
            outline: "none",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          type="button"
          onClick={handleSend}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            border: "none",
            background: "var(--primary)",
            color: "var(--on-primary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon name="send" size={20} />
        </button>
      </div>
    </div>
  );
}
