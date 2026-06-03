/**
 * DashboardPreview — Browser-frame mockup of the dashboard.
 *
 * Sits between the hero and features sections. Shows a fake browser
 * chrome bar with traffic-light dots and a URL bar, followed by a
 * mini dashboard layout with metric cards and recent calls.
 */

import { Badge } from "@components/ui";

export default function DashboardPreview() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "0 32px",
        marginBottom: "64px",
      }}
    >
      {/* ── Browser frame ──────────────────────────── */}
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          borderRadius: "16px",
          border: "1px solid var(--outline-variant)",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(15, 23, 42, 0.10)",
          background: "var(--surface-lowest)",
        }}
      >
        {/* ── Chrome bar ─────────────────────────── */}
        <div
          style={{
            background: "var(--surface-container)",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Traffic light dots */}
          {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
            <span
              key={color}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: color,
                flexShrink: 0,
              }}
            />
          ))}

          {/* URL bar */}
          <div
            style={{
              background: "var(--surface-lowest)",
              borderRadius: "6px",
              padding: "4px 12px",
              fontSize: "13px",
              color: "var(--on-surface-variant)",
              fontFamily: "'Geist', sans-serif",
              marginLeft: "12px",
              flex: 1,
              maxWidth: 300,
            }}
          >
            app.worktf.ai/dashboard
          </div>
        </div>

        {/* ── Dashboard content ──────────────────── */}
        <div
          style={{
            padding: "24px",
            display: "flex",
            gap: "16px",
          }}
        >
          {/* LEFT — 2×2 metric grid */}
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <MetricCard label="TOTAL CALLS" value="1,284" color="var(--primary)" />
            <MetricCard label="LIVE NOW" value="3" color="#16a34a" />
            <MetricCard label="ANSWERED" value="1,101" color="var(--primary)" />
            <MetricCard label="CONVERSION" value="24%" color="#c2410c" />
          </div>

          {/* RIGHT — Recent calls */}
          <div
            style={{
              flex: 1,
              background: "var(--surface-lowest)",
              border: "1px solid var(--outline-variant)",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontFamily: "'Geist', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--on-surface-variant)",
                marginBottom: "8px",
              }}
            >
              RECENT CALLS
            </div>

            <CallRow name="Sarah M." badge="Converted" badgeColor="green" />
            <CallRow name="Tom K." badge="Answered" badgeColor="primary" />
            <CallRow name="Alex R." badge="Missed" badgeColor="red" isLast />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components (internal only) ───────────────────────────────

/** A single metric card in the 2×2 grid. */
function MetricCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "var(--surface-lowest)",
        border: "1px solid var(--outline-variant)",
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontFamily: "'Geist', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--on-surface-variant)",
          marginBottom: "8px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "28px",
          fontFamily: "'Geist', sans-serif",
          fontWeight: 700,
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/** A single row in the recent calls list. */
function CallRow({
  name,
  badge,
  badgeColor,
  isLast = false,
}: {
  name: string;
  badge: string;
  badgeColor: "primary" | "green" | "red" | "orange" | "gray";
  isLast?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: isLast ? "none" : "1px solid var(--outline-variant)",
      }}
    >
      <span
        style={{
          fontSize: "14px",
          color: "var(--on-surface)",
        }}
      >
        {name}
      </span>
      <Badge label={badge} color={badgeColor} />
    </div>
  );
}
