/**
 * CallLogsPage — Call logs page with search, filter, and grouped list.
 *
 * Displays calls grouped by date (Today/Yesterday) with search
 * and outcome filtering. Uses mock data for now.
 */

import { useState, useMemo, useEffect } from "react";
import type { ICall } from "@worktf/shared";
import { formatCallOutcome } from "@worktf/shared";
import { Icon } from "@components/ui";
import SearchBar from "./SearchBar";
import FilterChips from "./FilterChips";
import CallLogItem from "./CallLogItem";
import { useCallStore } from "../../store";

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

  const { fetchRecentCalls, recentCalls, isLoading } = useCallStore();

  useEffect(() => {
    fetchRecentCalls();
  }, [fetchRecentCalls]);

  /** Filter and search the store calls */
  const filteredCalls = useMemo(() => {
    let result = recentCalls;

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
  }, [recentCalls, search, filter]);

  const grouped = useMemo(() => groupByDate(filteredCalls), [filteredCalls]);
  const groupKeys = Object.keys(grouped);

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Page title */}
      <h1
        style={{
          fontFamily: "'Geist', sans-serif",
          fontSize: "28px",
          fontWeight: 700,
          color: "var(--on-surface)",
          marginTop: 0,
          flexShrink: 0,
          marginBottom: 20
        }}
      >
        Call Logs
      </h1>

      {/* Search + filter */}
      <div style={{ flexShrink: 0, marginBottom: 20 }}>
        <div style={{ marginBottom: "12px" }}>
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <FilterChips active={filter} onChange={setFilter} />
      </div>

      {/* ── Results ────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4 }}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "48px 0",
              height: "100%",
            }}
          >
            <div
              style={{
                border: "3px solid var(--surface-container)",
                borderTop: "3px solid var(--primary)",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
          </div>
        ) : groupKeys.length === 0 ? (
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
    </div>
  );
}
