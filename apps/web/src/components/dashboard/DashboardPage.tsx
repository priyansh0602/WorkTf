/**
 * DashboardPage — Main dashboard assembling all dashboard components.
 *
 * Shows a page header with today's date, agent status card,
 * five metric cards in a grid, and a recent calls table.
 * Uses mock data for now — real API data comes in Phase 10.
 */

import { useEffect } from "react";
import { Button, Card, Icon, Badge } from "@components/ui";
import AgentStatusCard from "./AgentStatusCard";
import MetricCard from "./MetricCard";
import RecentCallsTable from "./RecentCallsTable";
import { useCallStore, useAgentStore } from "../../store";

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
  const { fetchRecentCalls, fetchCallStats, recentCalls, callStats, isLoading } = useCallStore();
  const { fetchAgent, agent } = useAgentStore();

  useEffect(() => {
    fetchRecentCalls();
    fetchCallStats();
    fetchAgent();
  }, [fetchRecentCalls, fetchCallStats, fetchAgent]);

  const activeAgent = agent?.is_active || false;

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* ── Page header ────────────────────────────── */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 28
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
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4 }}>
        {/* ── Agent status ───────────────────────────── */}
        <AgentStatusCard
          isActive={activeAgent}
          concurrentCalls={0}
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
            value={callStats?.total?.toString() || "0"}
            delta="+12% this week"
            icon="call"
            color="var(--primary)"
            loading={isLoading}
          />
          <MetricCard
            label="LIVE NOW"
            value="0"
            delta="Active"
            icon="fiber_manual_record"
            color="#16a34a"
            live
            loading={isLoading}
          />
          <MetricCard
            label="ANSWERED"
            value={callStats?.answered?.toString() || "0"}
            delta={callStats?.total ? `${((callStats.answered / callStats.total) * 100).toFixed(1)}% answer rate` : "0% answer rate"}
            icon="call_received"
            color="var(--primary)"
            loading={isLoading}
          />
          <MetricCard
            label="MISSED"
            value={callStats?.missed?.toString() || "0"}
            delta={callStats?.total ? `${((callStats.missed / callStats.total) * 100).toFixed(1)}% miss rate` : "0% miss rate"}
            icon="call_missed"
            color="var(--on-error-container)"
            loading={isLoading}
          />
          <MetricCard
            label="CONVERSION"
            value={callStats?.conversionRate ? callStats.conversionRate + "%" : "0%"}
            delta="+2.4% vs last week"
            icon="trending_up"
            color="#c2410c"
            loading={isLoading}
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
            {CHANNELS.map((ch) => {
              const isChannelActive = agent?.enabled_channels?.includes(ch.label.toUpperCase() as any) || ch.active;
              return (
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
                      label={isChannelActive ? "Active" : "Inactive"}
                      color={isChannelActive ? "green" : "gray"}
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
              );
            })}
          </div>
        </div>

        {/* ── Recent calls table ─────────────────────── */}
        <RecentCallsTable calls={recentCalls} onViewAll={onViewAllCalls} />
      </div>
    </div>
  );
}
