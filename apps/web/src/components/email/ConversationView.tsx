/**
 * ConversationView — Right panel showing an email thread.
 *
 * Wider message bubbles (85%), subject line in header,
 * and email-specific AI status text.
 */

import { useState } from "react";
import type { IConversation, IMessage } from "@worktf/shared";
import { MessageDirection, MessageStatus } from "@worktf/shared";
import { formatTimeAgo } from "@worktf/shared";
import { Icon, Avatar } from "@components/ui";

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
        <Icon name="mail" size={64} color="var(--outline-variant)" />
        <div
          style={{
            fontSize: "16px",
            fontWeight: 500,
            color: "var(--on-surface-variant)",
            marginTop: "16px",
          }}
        >
          Select an email thread
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
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Header with subject line */}
      <div
        style={{
          flexShrink: 0,
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
            <div
              style={{
                fontSize: "13px",
                color: "var(--on-surface-variant)",
                fontStyle: "italic",
                marginTop: "2px",
              }}
            >
              Re: Following up on our conversation
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {["reply", "info"].map((ic) => (
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

      {/* Messages area — email style */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}
      >
        {messages.map((msg) => {
          const isOutbound = msg.direction === MessageDirection.OUTBOUND;
          return (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent: isOutbound ? "flex-end" : "flex-start",
                marginBottom: "8px",
              }}
            >
              <div>
                <div
                  style={{
                    maxWidth: "85%",
                    minWidth: "120px",
                    padding: "14px 18px",
                    borderRadius: isOutbound ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: isOutbound ? "var(--primary)" : "var(--surface-container)",
                    color: isOutbound ? "var(--on-primary)" : "var(--on-surface)",
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontFamily: "'Inter', sans-serif",
                    borderTop: "1px solid var(--outline-variant)",
                  }}
                >
                  {msg.content}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    justifyContent: isOutbound ? "flex-end" : "flex-start",
                    marginTop: "2px",
                  }}
                >
                  {msg.sentAt && (
                    <span style={{ fontSize: "11px", color: "var(--on-surface-variant)" }}>
                      {formatTimeAgo(new Date(msg.sentAt))}
                    </span>
                  )}
                  {isOutbound && msg.status === MessageStatus.READ && (
                    <Icon name="done_all" size={14} color="var(--primary)" />
                  )}
                  {isOutbound && msg.status === MessageStatus.DELIVERED && (
                    <Icon name="done_all" size={14} color="var(--on-surface-variant)" />
                  )}
                  {isOutbound && (
                    <span
                      style={{
                        background: "var(--primary-fixed)",
                        color: "var(--primary)",
                        fontSize: "10px",
                        padding: "1px 6px",
                        borderRadius: "999px",
                        fontFamily: "'Geist', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      AI
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI status bar */}
      <div
        style={{
          flexShrink: 0,
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
          AI Agent Active — managing email thread automatically
        </span>
      </div>

      {/* Input area */}
      <div
        style={{
          flexShrink: 0,
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
          placeholder="Type a reply or let AI handle it..."
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
