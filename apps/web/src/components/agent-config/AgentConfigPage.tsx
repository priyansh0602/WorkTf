/**
 * AgentConfigPage — Agent configuration page assembling all sections.
 *
 * Manages state for agent identity, mission, and capabilities
 * with a save button (console.log for now until Phase 10 API).
 */

import { useState, useCallback, useEffect } from "react";
import { Button } from "@components/ui";
import IdentitySection from "./IdentitySection";
import MissionSection from "./MissionSection";
import CapabilitiesSection from "./CapabilitiesSection";
import { useAgentStore } from "../../store";

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

  const { fetchAgent, saveAgent, agent, isSaving } = useAgentStore();

  useEffect(() => {
    fetchAgent();
  }, [fetchAgent]);

  useEffect(() => {
    if (agent) {
      setAgentName(agent.name);
      setVoiceStyle(agent.voice_style || "PROFESSIONAL_MALE");
      setGoal(agent.goal);
      setCapabilities({
        inboundEnabled: !!agent.inbound_enabled,
        outboundEnabled: !!agent.outbound_enabled,
        voicemailDetection: !!agent.voicemail_detection,
        callRecording: !!agent.call_recording,
      });
    }
  }, [agent]);

  /** Update a single capability toggle value. */
  const handleCapabilityChange = useCallback((key: string, value: boolean) => {
    setCapabilities((prev) => ({ ...prev, [key]: value }));
  }, []);

  /** Save handler — calls saveAgent with current form state. */
  const handleSave = useCallback(() => {
    saveAgent({
      name: agentName,
      voice_style: voiceStyle,
      goal,
      inbound_enabled: capabilities.inboundEnabled,
      outbound_enabled: capabilities.outboundEnabled,
      voicemail_detection: capabilities.voicemailDetection,
      call_recording: capabilities.callRecording,
    });
  }, [saveAgent, agentName, voiceStyle, goal, capabilities]);

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', maxWidth: 840, margin: '0 auto', width: '100%' }}>
      {/* ── Page header ────────────────────────────── */}
      <div style={{ flexShrink: 0, marginBottom: 16 }}>
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

      {/* ── Config Content (2-Column Grid) ─────────────── */}
      <div
        style={{
          flex: 1,
          paddingBottom: 24,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          alignItems: 'start'
        }}
      >
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <IdentitySection
            agentName={agentName}
            voiceStyle={voiceStyle}
            onAgentNameChange={setAgentName}
            onVoiceStyleChange={setVoiceStyle}
          />
          <MissionSection goal={goal} onGoalChange={setGoal} />
          
          {/* ── Save button ────────────────────────────── */}
          <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 8 }}>
            <Button
              variant="primary"
              size="md"
              icon="save"
              onClick={handleSave}
              loading={isSaving}
            >
              Save Configuration
            </Button>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <CapabilitiesSection
            inboundEnabled={capabilities.inboundEnabled}
            outboundEnabled={capabilities.outboundEnabled}
            voicemailDetection={capabilities.voicemailDetection}
            callRecording={capabilities.callRecording}
            onChange={handleCapabilityChange}
          />
        </div>
      </div>
    </div>
  );
}
