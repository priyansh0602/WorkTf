/**
 * CallLogsPage — Call logs page with search, filter, and grouped list.
 *
 * Displays calls grouped by date (Today/Yesterday) with search
 * and outcome filtering. Uses mock data for now.
 */

import { useState, useMemo } from "react";
import type { ICall } from "@worktf/shared";
import { CallDirection, CallStatus, CallOutcome, formatCallOutcome } from "@worktf/shared";
import { Icon } from "@components/ui";
import SearchBar from "./SearchBar";
import FilterChips from "./FilterChips";
import CallLogItem from "./CallLogItem";

// ─── Mock data ──────────────────────────────────────────────────────

const today = new Date();
const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

const MOCK_CALLS: ICall[] = [
  {
    id: "1", agentId: "agent1", userId: "user1",
    contactName: "Sarah Mitchell", contactNumber: "(555) 201-4892",
    direction: CallDirection.OUTBOUND, status: CallStatus.COMPLETED,
    outcome: CallOutcome.CONVERTED, duration: 272,
    startedAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 15),
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 15),
    updatedAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 15),
  },
  {
    id: "2", agentId: "agent1", userId: "user1",
    contactName: "Tom Kravitz", contactNumber: "(555) 348-2210",
    direction: CallDirection.OUTBOUND, status: CallStatus.COMPLETED,
    outcome: CallOutcome.ANSWERED, duration: 138,
    startedAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 42),
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 42),
    updatedAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 42),
  },
  {
    id: "3", agentId: "agent1", userId: "user1",
    contactName: "Alex Rodriguez", contactNumber: "(555) 912-7734",
    direction: CallDirection.OUTBOUND, status: CallStatus.MISSED,
    outcome: CallOutcome.MISSED, duration: 0,
    startedAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 30),
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 30),
    updatedAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 30),
  },
  {
    id: "4", agentId: "agent1", userId: "user1",
    contactName: "Diana Park", contactNumber: "(555) 456-8820",
    direction: CallDirection.INBOUND, status: CallStatus.COMPLETED,
    outcome: CallOutcome.CONVERTED, duration: 371,
    startedAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 16, 10),
    createdAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 16, 10),
    updatedAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 16, 10),
  },
  {
    id: "5", agentId: "agent1", userId: "user1",
    contactName: "Marcus Webb", contactNumber: "(555) 773-0091",
    direction: CallDirection.OUTBOUND, status: CallStatus.COMPLETED,
    outcome: CallOutcome.ANSWERED, duration: 105,
    startedAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 14, 22),
    createdAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 14, 22),
    updatedAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 14, 22),
  },
  {
    id: "6", agentId: "agent1", userId: "user1",
    contactName: "Emily Watson", contactNumber: "(555) 301-5578",
    direction: CallDirection.OUTBOUND, status: CallStatus.MISSED,
    outcome: CallOutcome.MISSED, duration: 0,
    startedAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 11, 5),
    createdAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 11, 5),
    updatedAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 11, 5),
  },
  {
    id: "7", agentId: "agent1", userId: "user1",
    contactName: "Jake Nguyen", contactNumber: "(555) 608-4419",
    direction: CallDirection.INBOUND, status: CallStatus.COMPLETED,
    outcome: CallOutcome.ANSWERED, duration: 214,
    startedAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 9, 50),
    createdAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 9, 50),
    updatedAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 9, 50),
  },
];

// ─── Helpers ────────────────────────────────────────────────────────

/** Returns "Today" or "Yesterday" based on a date comparison. */
function getDateLabel(date: Date): string {
  const d = new Date(date);
  const todayStr = new Date().toDateString();
  const yesterdayStr = new Date(Date.now() - 86400000).toDateString();
  if (d.toDateString() === todayStr) return "Today";
  if (d.toDateString() === yesterdayStr) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** Groups calls by date label. */
function groupByDate(calls: ICall[]): Record<string, ICall[]> {
  const groups: Record<string, ICall[]> = {};
  for (const call of calls) {
    const label = getDateLabel(new Date(call.createdAt));
    if (!groups[label]) groups[label] = [];
    groups[label].push(call);
  }
  return groups;
}

// ─── Component ──────────────────────────────────────────────────────

export default function CallLogsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  /** Filter and search the mock calls */
  const filteredCalls = useMemo(() => {
    let result = MOCK_CALLS;

    // Filter by outcome
    if (filter !== "All") {
      result = result.filter(
        (c) => c.outcome && formatCallOutcome(c.outcome) === filter,
      );
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.contactName.toLowerCase().includes(q) ||
          c.contactNumber.toLowerCase().includes(q),
      );
    }

    return result;
  }, [search, filter]);

  const grouped = useMemo(() => groupByDate(filteredCalls), [filteredCalls]);
  const groupKeys = Object.keys(grouped);

  return (
    <div className="animate-fade-in">
      {/* Page title */}
      <h1
        style={{
          fontFamily: "'Geist', sans-serif",
          fontSize: "28px",
          fontWeight: 700,
          color: "var(--on-surface)",
          marginBottom: "20px",
          marginTop: 0,
        }}
      >
        Call Logs
      </h1>

      {/* Search + filter */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "12px" }}>
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <FilterChips active={filter} onChange={setFilter} />
      </div>

      {/* ── Results ────────────────────────────────── */}
      {groupKeys.length === 0 ? (
        /* Empty state */
        <div
          style={{
            padding: "48px",
            textAlign: "center",
          }}
        >
          <Icon name="search_off" size={48} color="var(--outline-variant)" />
          <div
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "var(--on-surface-variant)",
              marginTop: "12px",
            }}
          >
            No calls found
          </div>
        </div>
      ) : (
        /* Grouped call list */
        groupKeys.map((dateLabel) => (
          <div key={dateLabel} style={{ marginBottom: "20px" }}>
            <div
              style={{
                fontSize: "11px",
                color: "var(--on-surface-variant)",
                fontFamily: "'Geist', sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              {dateLabel}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {grouped[dateLabel].map((call) => (
                <CallLogItem
                  key={call.id}
                  call={call}
                  onClick={() => console.log("View call:", call.id)}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
