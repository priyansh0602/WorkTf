/**
 * AgentConfigPage — Agent configuration page assembling all sections.
 *
 * Manages state for agent identity, mission, and capabilities
 * with a save button (console.log for now until Phase 10 API).
 */

import { useState, useCallback } from "react";
import { Button } from "@components/ui";
import IdentitySection from "./IdentitySection";
import MissionSection from "./MissionSection";
import CapabilitiesSection from "./CapabilitiesSection";

interface Capabilities {
  inboundEnabled: boolean;
  outboundEnabled: boolean;
  voicemailDetection: boolean;
  callRecording: boolean;
}

export default function AgentConfigPage() {
  const [agentName, setAgentName] = useState("Alex");
  const [voiceStyle, setVoiceStyle] = useState("PROFESSIONAL_MALE");
  const [goal, setGoal] = useState(
    "Qualify inbound leads by asking about their budget, timeline, and current pain points. Book a follow-up call with the sales team for qualified prospects.",
  );
  const [capabilities, setCapabilities] = useState<Capabilities>({
    inboundEnabled: true,
    outboundEnabled: true,
    voicemailDetection: false,
    callRecording: true,
  });

  /** Update a single capability toggle value. */
  const handleCapabilityChange = useCallback((key: string, value: boolean) => {
    setCapabilities((prev) => ({ ...prev, [key]: value }));
  }, []);

  /** Save handler — logs config for now, API in Phase 10. */
  const handleSave = useCallback(() => {
    console.log("Save config:", { agentName, voiceStyle, goal, capabilities });
  }, [agentName, voiceStyle, goal, capabilities]);

  return (
    <div className="animate-fade-in" style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", maxWidth: 720 }}>
      {/* ── Page header ────────────────────────────── */}
      <div style={{ marginBottom: "28px", flexShrink: 0 }}>
        <h1
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "28px",
            fontWeight: 700,
            color: "var(--on-surface)",
            margin: 0,
            marginBottom: "6px",
          }}
        >
          Agent Config
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "var(--on-surface-variant)",
            margin: 0,
          }}
        >
          Customize your AI agent's identity, behavior, and capabilities.
        </p>
      </div>

      {/* ── Scrollable Config Content ──────────────── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingRight: "4px",
          paddingBottom: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <IdentitySection
          agentName={agentName}
          voiceStyle={voiceStyle}
          onAgentNameChange={setAgentName}
          onVoiceStyleChange={setVoiceStyle}
        />
        <MissionSection goal={goal} onGoalChange={setGoal} />
        <CapabilitiesSection
          inboundEnabled={capabilities.inboundEnabled}
          outboundEnabled={capabilities.outboundEnabled}
          voicemailDetection={capabilities.voicemailDetection}
          callRecording={capabilities.callRecording}
          onChange={handleCapabilityChange}
        />

        {/* ── Save button ────────────────────────────── */}
        <Button
          variant="primary"
          size="md"
          icon="save"
          onClick={handleSave}
          style={{ width: "fit-content", marginTop: "4px" }}
        >
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
