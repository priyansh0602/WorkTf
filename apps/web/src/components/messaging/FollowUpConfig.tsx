/**
 * FollowUpConfig — Configuration panel for automated follow-up messages.
 *
 * Used across WhatsApp, Instagram, and Email outreach config modals
 * with channel-specific placeholder text.
 */

import type { IMessagingAgentConfig, MessageChannel } from "@worktf/shared";
import { Toggle, Input, Textarea } from "@components/ui";

interface FollowUpConfigProps {
  config: IMessagingAgentConfig;
  onChange: (updates: Partial<IMessagingAgentConfig>) => void;
  channel: MessageChannel;
}

/** Channel-specific placeholder text for the initial message. */
const INITIAL_PLACEHOLDERS: Record<string, string> = {
  WHATSAPP: "Hi {name}! I wanted to reach out about...",
  INSTAGRAM: "Hey {name}! Loved your profile...",
  EMAIL: "Hi {name}, I hope this finds you well...",
};

export default function FollowUpConfig({
  config,
  onChange,
  channel,
}: FollowUpConfigProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Section header */}
      <div>
        <div
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--on-surface)",
            marginBottom: "4px",
          }}
        >
          Follow-up Automation
        </div>
        <div
          style={{
            fontSize: "13px",
            color: "var(--on-surface-variant)",
          }}
        >
          Configure how your AI follows up with contacts automatically
        </div>
      </div>

      {/* Enable toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--on-surface)",
          }}
        >
          Enable Follow-ups
        </span>
        <Toggle
          on={config.isEnabled}
          onChange={(val) => onChange({ isEnabled: val })}
        />
      </div>

      {/* Fields shown only when enabled */}
      {config.isEnabled && (
        <>
          <Textarea
            label="INITIAL MESSAGE"
            value={config.initialMessage}
            onChange={(e) => onChange({ initialMessage: e.target.value })}
            rows={3}
            maxLength={500}
            placeholder={INITIAL_PLACEHOLDERS[channel] ?? "Type your initial message..."}
          />

          <Textarea
            label="FOLLOW-UP MESSAGE"
            value={config.followUpMessage}
            onChange={(e) => onChange({ followUpMessage: e.target.value })}
            rows={3}
            maxLength={500}
            placeholder="Following up on my previous message..."
          />

          <div style={{ display: "flex", gap: "12px" }}>
            <Input
              label="FOLLOW-UP DELAY (HOURS)"
              type="number"
              value={String(config.followUpDelayHours)}
              onChange={(e) =>
                onChange({ followUpDelayHours: Number(e.target.value) || 1 })
              }
              min={1}
              max={168}
            />
            <Input
              label="MAX FOLLOW-UPS"
              type="number"
              value={String(config.maxFollowUps)}
              onChange={(e) =>
                onChange({ maxFollowUps: Number(e.target.value) || 1 })
              }
              min={1}
              max={5}
            />
          </div>

          <Input
            label="SIGN-OFF"
            value={config.signOff}
            onChange={(e) => onChange({ signOff: e.target.value })}
            placeholder="Best regards, Alex from WorkTF AI"
          />
        </>
      )}
    </div>
  );
}
