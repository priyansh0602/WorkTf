/**
 * CallLogItem — A single call log row card.
 *
 * Shows contact avatar + name, time/duration meta, outcome
 * badge, and a chevron for navigation.
 */

import type { ICall, CallOutcome } from "@worktf/shared";
import { formatDuration, formatCallOutcome, formatTimeAgo } from "@worktf/shared";
import { Card, Avatar, Badge, Icon } from "@components/ui";

interface CallLogItemProps {
  call: ICall;
  onClick?: (call: ICall) => void;
}

/** Maps outcome to Badge color — same logic as RecentCallsTable. */
function outcomeToBadgeColor(
  outcome?: CallOutcome,
): "green" | "primary" | "red" | "orange" | "gray" {
  switch (outcome) {
    case "CONVERTED":
      return "green";
    case "ANSWERED":
      return "primary";
    case "MISSED":
    case "FAILED":
      return "red";
    case "VOICEMAIL":
      return "orange";
    default:
      return "gray";
  }
}

export default function CallLogItem({ call, onClick }: CallLogItemProps) {
  const nameParts = call.contactName.split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");

  return (
    <Card
      hoverable
      onClick={onClick ? () => onClick(call) : undefined}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: onClick ? "pointer" : undefined,
      }}
    >
      {/* ── Left side: avatar + info ───────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Avatar firstName={firstName} lastName={lastName} size="sm" />
        <div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--on-surface)",
              marginBottom: "2px",
            }}
          >
            {call.contactName}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "var(--on-surface-variant)",
            }}
          >
            <Icon name="schedule" size={14} />
            <span>
              {call.startedAt ? formatTimeAgo(new Date(call.startedAt)) : "—"}
            </span>
            <span>·</span>
            <span>{formatDuration(call.duration)}</span>
          </div>
        </div>
      </div>

      {/* ── Right side: badge + chevron ─────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {call.outcome && (
          <Badge
            label={formatCallOutcome(call.outcome)}
            color={outcomeToBadgeColor(call.outcome)}
          />
        )}
        <Icon name="chevron_right" size={18} color="var(--outline-variant)" />
      </div>
    </Card>
  );
}
