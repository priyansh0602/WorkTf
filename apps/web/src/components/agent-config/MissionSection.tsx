/**
 * MissionSection — Agent goal and script configuration.
 *
 * Renders a card with a textarea for defining the agent's
 * goal and behavior instructions, with character counter.
 */

import { Card, Icon, Textarea } from "@components/ui";

interface MissionSectionProps {
  goal: string;
  onGoalChange: (value: string) => void;
}

export default function MissionSection({
  goal,
  onGoalChange,
}: MissionSectionProps) {
  return (
    <Card padding={20}>
      {/* ── Section header ─────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderBottom: "1px solid var(--surface-container)",
          paddingBottom: "12px",
          marginBottom: "16px",
        }}
      >
        <Icon name="flag" size={20} fill color="var(--primary)" />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--on-surface)",
          }}
        >
          Mission &amp; Script
        </span>
      </div>

      {/* ── Goal textarea ──────────────────────────── */}
      <Textarea
        label="AGENT GOAL"
        value={goal}
        onChange={(e) => onGoalChange(e.target.value)}
        rows={4}
        maxLength={500}
        placeholder="Describe what your agent should accomplish on each call. Be specific about the goal, tone, and any key questions it should ask."
      />
    </Card>
  );
}
