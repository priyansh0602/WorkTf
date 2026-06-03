/**
 * CallControls — Mute, hold, note, and end call buttons.
 *
 * Secondary controls are circular icon buttons that toggle
 * active state. The end call button is a large red circle.
 */

import { useState, useCallback } from "react";
import { Icon } from "@components/ui";

interface CallControlsProps {
  onEndCall: () => void;
  onMute?: () => void;
  onHold?: () => void;
  onNote?: () => void;
  isMuted?: boolean;
  isOnHold?: boolean;
}

export default function CallControls({
  onEndCall,
  onMute,
  onHold,
  onNote,
  isMuted = false,
  isOnHold = false,
}: CallControlsProps) {
  const [endPressed, setEndPressed] = useState(false);

  const handleEndDown = useCallback(() => setEndPressed(true), []);
  const handleEndUp = useCallback(() => setEndPressed(false), []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}
    >
      {/* ── Secondary controls row ─────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <ControlButton
          icon={isMuted ? "mic_off" : "mic"}
          label={isMuted ? "Unmute" : "Mute"}
          active={isMuted}
          onClick={onMute}
        />
        <ControlButton
          icon={isOnHold ? "play_arrow" : "pause"}
          label={isOnHold ? "Resume" : "Hold"}
          active={isOnHold}
          onClick={onHold}
        />
        <ControlButton
          icon="note_add"
          label="Note"
          active={false}
          onClick={onNote}
        />
      </div>

      {/* ── End call button ────────────────────────── */}
      <button
        type="button"
        onClick={onEndCall}
        onMouseDown={handleEndDown}
        onMouseUp={handleEndUp}
        onMouseLeave={handleEndUp}
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "var(--error)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(186, 26, 26, 0.35)",
          transition: "transform 0.1s",
          transform: endPressed ? "scale(0.94)" : "scale(1)",
        }}
      >
        <Icon name="call_end" size={32} color="var(--on-error)" />
      </button>
    </div>
  );
}

// ─── Internal sub-component ─────────────────────────────────────────

/** A single circular secondary control button. */
function ControlButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <button
        type="button"
        onClick={onClick}
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: active ? "var(--primary-fixed)" : "var(--surface-container)",
          border: active ? "none" : "1px solid var(--outline-variant)",
          color: active ? "var(--primary)" : "var(--on-surface-variant)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s, color 0.15s",
        }}
      >
        <Icon name={icon} size={22} />
      </button>
      <div
        style={{
          fontSize: "12px",
          color: "var(--on-surface-variant)",
          marginTop: "4px",
        }}
      >
        {label}
      </div>
    </div>
  );
}
