/**
 * AgentStatusCard — Shows the AI agent's operational status.
 *
 * Displays whether the agent core is active with a pulse indicator
 * and the number of concurrent calls, plus a manage button.
 */

import { Card, Button } from "@components/ui";

interface AgentStatusCardProps {
  isActive: boolean;
  concurrentCalls: number;
  onManage?: () => void;
}

export default function AgentStatusCard({
  isActive,
  concurrentCalls,
  onManage,
}: AgentStatusCardProps) {
  return (
    <Card
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "24px",
      }}
    >
      {/* ── Left side: status info ─────────────────── */}
      <div>
        <div
          style={{
            fontSize: "11px",
            fontFamily: "'Geist', sans-serif",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--on-surface-variant)",
            marginBottom: "6px",
          }}
        >
          AGENT STATUS
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {isActive ? (
            <>
              {/* Active pulse indicator */}
              <div
                style={{
                  position: "relative",
                  width: "12px",
                  height: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="animate-pulse-ring"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--primary)",
                    borderRadius: "50%",
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    width: "8px",
                    height: "8px",
                    background: "var(--primary)",
                    borderRadius: "50%",
                  }}
                />
              </div>

              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--on-surface)",
                }}
              >
                AI Core Active — {concurrentCalls} concurrent call
                {concurrentCalls !== 1 ? "s" : ""}
              </span>
            </>
          ) : (
            <>
              {/* Inactive static dot */}
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--outline)",
                }}
              />

              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--on-surface-variant)",
                }}
              >
                AI Core Inactive
              </span>
            </>
          )}
        </div>
      </div>

      {/* ── Right side: manage button ──────────────── */}
      <Button variant="secondary" size="sm" icon="settings" onClick={onManage}>
        Manage
      </Button>
    </Card>
  );
}
