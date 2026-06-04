/**
 * ContactCard — Contact row shown in conversation lists.
 *
 * Shows avatar, contact name, last message preview, time,
 * and optional follow-up status badge.
 */

import { useState, useCallback } from "react";
import type { IConversation, FollowUpStatus } from "@worktf/shared";
import { formatTimeAgo } from "@worktf/shared";
import { Avatar, Badge } from "@components/ui";

interface ContactCardProps {
  conversation: IConversation;
  isActive?: boolean;
  onClick?: (conversation: IConversation) => void;
}

/** Maps follow-up status to badge color. */
function followUpBadge(
  status?: FollowUpStatus,
): { label: string; color: "orange" | "green" | "gray" } | null {
  switch (status) {
    case "PENDING":
      return { label: "Follow-up", color: "orange" };
    case "RESPONDED":
      return { label: "Responded", color: "green" };
    case "SKIPPED":
      return { label: "Skipped", color: "gray" };
    default:
      return null;
  }
}

export default function ContactCard({
  conversation,
  isActive = false,
  onClick,
}: ContactCardProps) {
  const [hovered, setHovered] = useState(false);
  const handleEnter = useCallback(() => setHovered(true), []);
  const handleLeave = useCallback(() => setHovered(false), []);

  const nameParts = conversation.contactName.split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");
  const badge = followUpBadge(conversation.followUpStatus);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(conversation)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        cursor: "pointer",
        padding: "12px 16px",
        borderRadius: "12px",
        transition: "background 0.15s",
        background: isActive
          ? "var(--secondary-container)"
          : hovered
            ? "var(--surface-low)"
            : "transparent",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Avatar firstName={firstName} lastName={lastName} size="sm" />

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Top row: name + time */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--on-surface)",
            }}
          >
            {conversation.contactName}
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "var(--on-surface-variant)",
            }}
          >
            {conversation.lastMessageAt
              ? formatTimeAgo(new Date(conversation.lastMessageAt))
              : ""}
          </span>
        </div>

        {/* Bottom row: preview + badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              color: "var(--on-surface-variant)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "200px",
            }}
          >
            {conversation.lastMessage ?? ""}
          </span>
          {badge && <Badge label={badge.label} color={badge.color} />}
        </div>
      </div>
    </div>
  );
}
