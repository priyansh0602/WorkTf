/**
 * MessageBubble — A single chat message bubble used across all channels.
 *
 * Outbound bubbles are right-aligned with primary background,
 * inbound bubbles are left-aligned with surface background.
 * Shows delivery status icon and optional AI badge.
 */

import { MessageDirection, MessageStatus } from "@worktf/shared";
import { formatTimeAgo } from "@worktf/shared";
import { Icon } from "@components/ui";

interface MessageBubbleProps {
  content: string;
  direction: MessageDirection;
  status?: MessageStatus;
  sentAt?: Date;
  /** Whether this message was sent by AI (default true for outbound) */
  isAI?: boolean;
}

/** Maps message status to a status icon. */
function getStatusIcon(status: MessageStatus): { name: string; color: string } {
  switch (status) {
    case MessageStatus.SENT:
      return { name: "done", color: "var(--on-surface-variant)" };
    case MessageStatus.DELIVERED:
      return { name: "done_all", color: "var(--on-surface-variant)" };
    case MessageStatus.READ:
      return { name: "done_all", color: "var(--primary)" };
    case MessageStatus.FAILED:
      return { name: "error", color: "var(--error)" };
    default:
      return { name: "schedule", color: "var(--on-surface-variant)" };
  }
}

export default function MessageBubble({
  content,
  direction,
  status,
  sentAt,
  isAI,
}: MessageBubbleProps) {
  const isOutbound = direction === MessageDirection.OUTBOUND;
  const showAI = isAI ?? isOutbound;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isOutbound ? "flex-end" : "flex-start",
        marginBottom: "8px",
      }}
    >
      <div>
        {/* Bubble */}
        <div
          style={{
            maxWidth: "70%",
            minWidth: "80px",
            padding: "10px 14px",
            borderRadius: isOutbound ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
            background: isOutbound ? "var(--primary)" : "var(--surface-container)",
            color: isOutbound ? "var(--on-primary)" : "var(--on-surface)",
            fontSize: "14px",
            lineHeight: "20px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {content}
        </div>

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            justifyContent: isOutbound ? "flex-end" : "flex-start",
            marginTop: "2px",
          }}
        >
          {sentAt && (
            <span
              style={{
                fontSize: "11px",
                color: "var(--on-surface-variant)",
              }}
            >
              {formatTimeAgo(new Date(sentAt))}
            </span>
          )}

          {/* Status icon for outbound messages */}
          {isOutbound && status && (() => {
            const s = getStatusIcon(status);
            return <Icon name={s.name} size={14} color={s.color} />;
          })()}

          {/* AI badge */}
          {showAI && (
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
}
