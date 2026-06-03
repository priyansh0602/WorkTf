/**
 * RecentCallsTable — Table showing the most recent calls.
 *
 * Displays contact, number, duration, outcome badge, and relative
 * time for each call. Falls back to an empty state message.
 */

import { useState, useCallback } from "react";
import type { ICall, CallOutcome } from "@worktf/shared";
import { formatDuration, formatCallOutcome, formatTimeAgo } from "@worktf/shared";
import { Card, Avatar, Badge } from "@components/ui";

interface RecentCallsTableProps {
  calls: ICall[];
  onViewAll?: () => void;
}

/** Maps a CallOutcome to the appropriate Badge color. */
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

export default function RecentCallsTable({
  calls,
  onViewAll,
}: RecentCallsTableProps) {
  return (
    <Card padding={0} style={{ overflow: "hidden" }}>
      {/* ── Table header row ───────────────────────── */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--outline-variant)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--on-surface)",
          }}
        >
          Recent Calls
        </span>
        <button
          type="button"
          onClick={onViewAll}
          style={{
            background: "none",
            border: "none",
            color: "var(--primary)",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            padding: 0,
          }}
        >
          View All
        </button>
      </div>

      {/* ── Empty state ────────────────────────────── */}
      {calls.length === 0 ? (
        <div
          style={{
            padding: "48px",
            textAlign: "center",
            fontSize: "14px",
            color: "var(--on-surface-variant)",
          }}
        >
          No calls yet
        </div>
      ) : (
        /* ── Calls table ─────────────────────────── */
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "var(--surface-low)" }}>
              {["Contact", "Number", "Duration", "Outcome", "Time"].map(
                (col) => (
                  <th
                    key={col}
                    style={{
                      padding: "10px 20px",
                      textAlign: "left",
                      fontSize: "11px",
                      color: "var(--on-surface-variant)",
                      fontFamily: "'Geist', sans-serif",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {calls.map((call) => (
              <CallRow key={call.id} call={call} />
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

// ─── Row sub-component ──────────────────────────────────────────────

function CallRow({ call }: { call: ICall }) {
  const [hovered, setHovered] = useState(false);

  const handleEnter = useCallback(() => setHovered(true), []);
  const handleLeave = useCallback(() => setHovered(false), []);

  /** Split contact name into first/last for Avatar */
  const nameParts = call.contactName.split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");

  return (
    <tr
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        borderTop: "1px solid var(--outline-variant)",
        background: hovered ? "var(--surface-low)" : "transparent",
        transition: "background 0.15s",
      }}
    >
      {/* Contact */}
      <td style={{ padding: "14px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Avatar firstName={firstName} lastName={lastName} size="sm" />
          <span
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--on-surface)",
            }}
          >
            {call.contactName}
          </span>
        </div>
      </td>

      {/* Number */}
      <td
        style={{
          padding: "14px 20px",
          fontSize: "14px",
          color: "var(--on-surface-variant)",
          fontFamily: "'Geist', sans-serif",
        }}
      >
        {call.contactNumber}
      </td>

      {/* Duration */}
      <td
        style={{
          padding: "14px 20px",
          fontSize: "14px",
          color: "var(--on-surface-variant)",
        }}
      >
        {formatDuration(call.duration)}
      </td>

      {/* Outcome */}
      <td style={{ padding: "14px 20px" }}>
        {call.outcome ? (
          <Badge
            label={formatCallOutcome(call.outcome)}
            color={outcomeToBadgeColor(call.outcome)}
          />
        ) : (
          <span style={{ color: "var(--on-surface-variant)", fontSize: "13px" }}>
            —
          </span>
        )}
      </td>

      {/* Time */}
      <td
        style={{
          padding: "14px 20px",
          fontSize: "13px",
          color: "var(--on-surface-variant)",
        }}
      >
        {call.startedAt ? formatTimeAgo(new Date(call.startedAt)) : "—"}
      </td>
    </tr>
  );
}
