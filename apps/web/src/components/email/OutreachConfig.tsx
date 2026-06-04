/**
 * OutreachConfig — Email outreach campaign configuration panel.
 *
 * Includes an extra subject line field compared to WhatsApp/Instagram.
 */

import { useState } from "react";
import type { IMessagingAgentConfig } from "@worktf/shared";
import { MessageChannel } from "@worktf/shared";
import { Card, Button, Input, Textarea } from "@components/ui";
import { FollowUpConfig } from "@components/messaging";

interface OutreachConfigProps {
  onClose?: () => void;
  onLaunch?: (config: IMessagingAgentConfig) => void;
}

export default function OutreachConfig({ onClose, onLaunch }: OutreachConfigProps) {
  const [contacts, setContacts] = useState("");
  const [subject, setSubject] = useState("");
  const [config, setConfig] = useState<IMessagingAgentConfig>({
    channel: MessageChannel.EMAIL,
    isEnabled: true,
    initialMessage: "",
    followUpMessage: "",
    followUpDelayHours: 72,
    maxFollowUps: 3,
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
          New Email Campaign
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

      {/* Subject line */}
      <Input
        label="EMAIL SUBJECT LINE"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Following up on our conversation..."
      />

      {/* Contacts */}
      <Card padding={20}>
        <Textarea
          label="CONTACTS"
          value={contacts}
          onChange={(e) => setContacts(e.target.value)}
          rows={5}
          placeholder={"john@company.com\nsarah@startup.io"}
        />
        <div
          style={{
            fontSize: "12px",
            color: "var(--on-surface-variant)",
            marginTop: "6px",
          }}
        >
          One email address per line
        </div>
      </Card>

      {/* Follow-up config */}
      <FollowUpConfig
        config={config}
        onChange={(updates) => setConfig((prev) => ({ ...prev, ...updates }))}
        channel={MessageChannel.EMAIL}
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
