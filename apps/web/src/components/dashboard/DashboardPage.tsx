/**
 * DashboardPage — Main dashboard assembling all dashboard components.
 *
 * Shows a page header with today's date, agent status card,
 * five metric cards in a grid, and a recent calls table.
 * Uses mock data for now — real API data comes in Phase 10.
 */

import type { ICall } from "@worktf/shared";
import { CallDirection, CallStatus, CallOutcome } from "@worktf/shared";
import { Button, Card, Icon, Badge } from "@components/ui";
import AgentStatusCard from "./AgentStatusCard";
import MetricCard from "./MetricCard";
import RecentCallsTable from "./RecentCallsTable";

// ─── Mock data (real API data comes in Phase 10) ────────────────────

const MOCK_CALLS: ICall[] = [
  {
    id: "1",
    agentId: "agent1",
    userId: "user1",
    contactName: "Sarah Mitchell",
    contactNumber: "(555) 201-4892",
    direction: CallDirection.OUTBOUND,
    status: CallStatus.COMPLETED,
    outcome: CallOutcome.CONVERTED,
    duration: 272,
    startedAt: new Date(Date.now() - 2 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: "2",
    agentId: "agent1",
    userId: "user1",
    contactName: "Tom Kravitz",
    contactNumber: "(555) 348-2210",
    direction: CallDirection.OUTBOUND,
    status: CallStatus.COMPLETED,
    outcome: CallOutcome.ANSWERED,
    duration: 138,
    startedAt: new Date(Date.now() - 15 * 60 * 1000),
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    updatedAt: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: "3",
    agentId: "agent1",
    userId: "user1",
    contactName: "Alex Rodriguez",
    contactNumber: "(555) 912-7734",
    direction: CallDirection.OUTBOUND,
    status: CallStatus.MISSED,
    outcome: CallOutcome.MISSED,
    duration: 0,
    startedAt: new Date(Date.now() - 32 * 60 * 1000),
    createdAt: new Date(Date.now() - 32 * 60 * 1000),
    updatedAt: new Date(Date.now() - 32 * 60 * 1000),
  },
  {
    id: "4",
    agentId: "agent1",
    userId: "user1",
    contactName: "Diana Park",
    contactNumber: "(555) 456-8820",
    direction: CallDirection.INBOUND,
    status: CallStatus.COMPLETED,
    outcome: CallOutcome.CONVERTED,
    duration: 371,
    startedAt: new Date(Date.now() - 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000),
  },
  {
    id: "5",
    agentId: "agent1",
    userId: "user1",
    contactName: "Marcus Webb",
    contactNumber: "(555) 773-0091",
    direction: CallDirection.OUTBOUND,
    status: CallStatus.COMPLETED,
    outcome: CallOutcome.ANSWERED,
    duration: 105,
    startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
];

// ─── Channel cards data ─────────────────────────────────────────────

const CHANNELS = [
  { icon: "phone_in_talk", label: "Calling", stat: "1,284 calls this month", active: true },
  { icon: "chat", label: "WhatsApp", stat: "0 conversations", active: false },
  { icon: "photo_camera", label: "Instagram", stat: "0 conversations", active: false },
  { icon: "mail", label: "Email", stat: "0 emails sent", active: false },
] as const;

// ─── Component ──────────────────────────────────────────────────────

interface DashboardPageProps {
  onStartCall?: () => void;
  onViewAllCalls?: () => void;
  onManageAgent?: () => void;
}

/** Formats the current date as "Monday, June 3, 2025" */
function formatToday(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function DashboardPage({
  onStartCall,
  onViewAllCalls,
  onManageAgent,
}: DashboardPageProps) {
  return (
    <div className="animate-fade-in" style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* ── Page header ────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
          flexShrink: 0,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "28px",
              fontWeight: 700,
              color: "var(--on-surface)",
              margin: 0,
            }}
          >
            Dashboard
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "var(--on-surface-variant)",
              marginTop: "4px",
              marginBottom: 0,
            }}
          >
            {formatToday()}
          </p>
        </div>

        <Button variant="primary" size="md" icon="call" onClick={onStartCall}>
          Start New Call
        </Button>
      </div>

      {/* ── Scrollable Content Wrapper ──────────────── */}
      <div style={{ flex: 1, overflowY: "auto", paddingRight: "4px" }}>
        {/* ── Agent status ───────────────────────────── */}
        <AgentStatusCard
          isActive={true}
          concurrentCalls={3}
          onManage={onManageAgent}
        />

        {/* ── Metrics grid ───────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <MetricCard
            label="TOTAL CALLS"
            value="1,284"
            delta="+12% this week"
            icon="call"
            color="var(--primary)"
          />
          <MetricCard
            label="LIVE NOW"
            value="3"
            delta="Active"
            icon="fiber_manual_record"
            color="#16a34a"
            live
          />
          <MetricCard
            label="ANSWERED"
            value="1,101"
            delta="85.7% answer rate"
            icon="call_received"
            color="var(--primary)"
          />
          <MetricCard
            label="MISSED"
            value="183"
            delta="14.3% miss rate"
            icon="call_missed"
            color="var(--on-error-container)"
          />
          <MetricCard
            label="CONVERSION"
            value="24%"
            delta="+2.4% vs last week"
            icon="trending_up"
            color="#c2410c"
          />
        </div>

        {/* ── Active channels ────────────────────────── */}
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--on-surface)",
              marginBottom: "12px",
              marginTop: 0,
            }}
          >
            Active Channels
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px",
            }}
          >
            {CHANNELS.map((ch) => (
              <Card key={ch.label} padding={16}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Icon name={ch.icon} size={18} color="var(--on-surface)" />
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--on-surface)",
                      }}
                    >
                      {ch.label}
                    </span>
                  </div>
                  <Badge
                    label={ch.active ? "Active" : "Inactive"}
                    color={ch.active ? "green" : "gray"}
                  />
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--on-surface-variant)",
                  }}
                >
                  {ch.stat}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Recent calls table ─────────────────────── */}
        <RecentCallsTable calls={MOCK_CALLS} onViewAll={onViewAllCalls} />
      </div>
    </div>
  );
}
