/**
 * OutreachConfig — WhatsApp outreach campaign configuration panel.
 */

import { useState } from "react";
import type { IMessagingAgentConfig } from "@worktf/shared";
import { MessageChannel } from "@worktf/shared";
import { Card, Button, Textarea } from "@components/ui";
import { FollowUpConfig } from "@components/messaging";

interface OutreachConfigProps {
  onClose?: () => void;
  onLaunch?: (config: IMessagingAgentConfig) => void;
}

export default function OutreachConfig({ onClose, onLaunch }: OutreachConfigProps) {
  const [contacts, setContacts] = useState("");
  const [config, setConfig] = useState<IMessagingAgentConfig>({
    channel: MessageChannel.WHATSAPP,
    isEnabled: true,
    initialMessage: "",
    followUpMessage: "",
    followUpDelayHours: 24,
    maxFollowUps: 2,
    signOff: "",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "20px",
            fontWeight: 600,
            color: "var(--on-surface)",
          }}
        >
          New WhatsApp Campaign
        </span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--on-surface-variant)",
              fontSize: "20px",
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Contacts */}
      <Card padding={20}>
        <Textarea
          label="CONTACTS"
          value={contacts}
          onChange={(e) => setContacts(e.target.value)}
          rows={5}
          placeholder={"+1 555 123 4567\n+1 555 234 5678"}
        />
        <div
          style={{
            fontSize: "12px",
            color: "var(--on-surface-variant)",
            marginTop: "6px",
          }}
        >
          International format recommended (+1...)
        </div>
      </Card>

      {/* Follow-up config */}
      <FollowUpConfig
        config={config}
        onChange={(updates) => setConfig((prev) => ({ ...prev, ...updates }))}
        channel={MessageChannel.WHATSAPP}
      />

      {/* Launch button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        icon="rocket_launch"
        onClick={() => onLaunch?.(config)}
      >
        Launch Campaign
      </Button>
    </div>
  );
}
