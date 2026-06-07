/**
 * CapabilitiesSection — Toggle switches for agent capabilities.
 *
 * Renders four toggle rows for inbound/outbound calls,
 * voicemail detection, and call recording.
 */

import { Card, Icon, Toggle } from "@components/ui";

interface CapabilitiesSectionProps {
  inboundEnabled: boolean;
  outboundEnabled: boolean;
  voicemailDetection: boolean;
  callRecording: boolean;
  onChange: (key: string, value: boolean) => void;
}

/** Capability definitions for rendering toggle rows. */
const CAPABILITIES = [
  {
    key: "inboundEnabled",
    label: "Inbound Calls",
    desc: "Agent answers incoming calls automatically",
  },
  {
    key: "outboundEnabled",
    label: "Outbound Calls",
    desc: "Agent initiates calls to your lead list",
  },
  {
    key: "voicemailDetection",
    label: "Voicemail Detection",
    desc: "Skip voicemails and try again later",
  },
  {
    key: "callRecording",
    label: "Call Recording",
    desc: "Record all calls for review and compliance",
  },
] as const;

export default function CapabilitiesSection({
  inboundEnabled,
  outboundEnabled,
  voicemailDetection,
  callRecording,
  onChange,
}: CapabilitiesSectionProps) {
  /** Map capability keys to their current boolean values. */
  const values: Record<string, boolean> = {
    inboundEnabled,
    outboundEnabled,
    voicemailDetection,
    callRecording,
  };

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
        <Icon name="settings_suggest" size={20} fill color="var(--primary)" />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--on-surface)",
          }}
        >
          Capabilities
        </span>
      </div>

      {/* ── Toggle rows ────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {CAPABILITIES.map((cap) => (
          <div
            key={cap.key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--on-surface)",
                  marginBottom: "2px",
                }}
              >
                {cap.label}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--on-surface-variant)",
                }}
              >
                {cap.desc}
              </div>
            </div>
            <Toggle
              on={values[cap.key]}
              onChange={(val) => onChange(cap.key, val)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
