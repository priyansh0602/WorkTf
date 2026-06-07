/**
 * IdentitySection — Agent name and voice style configuration.
 *
 * Renders a card with input for the agent name and a select
 * dropdown for voice style selection.
 */

import { Card, Icon, Input, Select } from "@components/ui";

interface IdentitySectionProps {
  agentName: string;
  voiceStyle: string;
  onAgentNameChange: (value: string) => void;
  onVoiceStyleChange: (value: string) => void;
}

const VOICE_OPTIONS = [
  { value: "PROFESSIONAL_MALE", label: "Professional Male" },
  { value: "PROFESSIONAL_FEMALE", label: "Professional Female" },
  { value: "FRIENDLY_MALE", label: "Friendly Male" },
  { value: "FRIENDLY_FEMALE", label: "Friendly Female" },
];

export default function IdentitySection({
  agentName,
  voiceStyle,
  onAgentNameChange,
  onVoiceStyleChange,
}: IdentitySectionProps) {
  return (
    <Card padding={16}>
      {/* ── Section header ─────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderBottom: "1px solid var(--surface-container)",
          paddingBottom: "8px",
          marginBottom: "12px",
        }}
      >
        <Icon name="person" size={20} fill color="var(--primary)" />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--on-surface)",
          }}
        >
          Agent Identity
        </span>
      </div>

      {/* ── Form fields ────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Input
          label="AGENT NAME"
          value={agentName}
          onChange={(e) => onAgentNameChange(e.target.value)}
          placeholder="e.g. Alex"
        />
        <Select
          label="VOICE STYLE"
          value={voiceStyle}
          onChange={(e) => onVoiceStyleChange(e.target.value)}
          options={VOICE_OPTIONS}
        />
      </div>
    </Card>
  );
}
