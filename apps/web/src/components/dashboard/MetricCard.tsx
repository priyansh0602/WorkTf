/**
 * MetricCard — Single stat display card for the dashboard.
 *
 * Shows a labeled metric with an icon, value, optional delta,
 * and optional live pulse indicator for real-time values.
 *
 * @example
 *   <MetricCard label="TOTAL CALLS" value="1,284" delta="+12%" icon="call" />
 *   <MetricCard label="LIVE NOW" value="3" icon="fiber_manual_record" live />
 */

import { Card, Icon } from "@components/ui";

interface MetricCardProps {
  /** Uppercase label above the value */
  label: string;
  /** The primary metric value */
  value: string;
  /** Optional secondary text below the value (e.g. "+12%") */
  delta?: string;
  /** Material Symbol name shown in the top-right */
  icon: string;
  /** CSS color for the value text (default var(--primary)) */
  color?: string;
  /** When true, shows a green pulsing dot next to the value */
  live?: boolean;
}

export default function MetricCard({
  label,
  value,
  delta,
  icon,
  color = "var(--primary)",
  live = false,
}: MetricCardProps) {
  return (
    <Card padding={20} hoverable>
      {/* ── Label row ──────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontFamily: "'Geist', sans-serif",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--on-surface-variant)",
          }}
        >
          {label}
        </span>
        <Icon name={icon} size={18} color="var(--on-surface-variant)" />
      </div>

      {/* ── Value row ──────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "30px",
            fontWeight: 700,
            color,
          }}
        >
          {value}
        </span>

        {/* Live pulse indicator */}
        {live && (
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
            {/* Pulsing ring */}
            <div
              className="animate-pulse-ring"
              style={{
                position: "absolute",
                inset: 0,
                background: "#16a34a",
                borderRadius: "50%",
                opacity: 0.6,
              }}
            />
            {/* Solid dot */}
            <div
              style={{
                position: "relative",
                width: "8px",
                height: "8px",
                background: "#16a34a",
                borderRadius: "50%",
              }}
            />
          </div>
        )}
      </div>

      {/* ── Delta text ─────────────────────────────── */}
      {delta && (
        <div
          style={{
            fontSize: "12px",
            color: "var(--on-surface-variant)",
            marginTop: "4px",
          }}
        >
          {delta}
        </div>
      )}
    </Card>
  );
}
