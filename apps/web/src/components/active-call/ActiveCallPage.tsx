/**
 * ActiveCallPage — Full active call screen.
 *
 * Assembles the status pill, contact info, waveform visualization,
 * call timer, and control buttons into a centered card layout.
 */

import { useState, useCallback } from "react";
import { Card, Avatar, Icon } from "@components/ui";
import CallTimer from "./CallTimer";
import Waveform from "./Waveform";
import CallControls from "./CallControls";

interface ActiveCallPageProps {
  contactName?: string;
  contactNumber?: string;
  onEndCall?: () => void;
}

export default function ActiveCallPage({
  contactName = "David Chen",
  contactNumber = "(555) 123-4567",
  onEndCall,
}: ActiveCallPageProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);

  const toggleMute = useCallback(() => setIsMuted((m) => !m), []);
  const toggleHold = useCallback(() => setIsOnHold((h) => !h), []);

  /** Split contact name into first/last for Avatar */
  const nameParts = contactName.split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Page title */}
      <h1
        style={{
          fontFamily: "'Geist', sans-serif",
          fontSize: "28px",
          fontWeight: 700,
          color: "var(--on-surface)",
          marginTop: 0,
          flexShrink: 0,
          maxWidth: 520,
          margin: '0 auto',
          width: '100%',
          marginBottom: 16
        }}
      >
        Active Call
      </h1>

      <div style={{ flex: 1, overflowY: 'auto', maxWidth: 520, margin: '0 auto', width: '100%' }}>
        <Card padding={24} style={{ textAlign: "center" }}>
          {/* ── Status pill ──────────────────────────── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--surface-container)",
                borderRadius: "999px",
                padding: "6px 16px",
                border: "1px solid var(--outline-variant)",
              }}
            >
              {/* Pulse indicator */}
              <div
                style={{
                  position: "relative",
                  width: "10px",
                  height: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="animate-pulse-ring"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--primary)",
                    borderRadius: "50%",
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    width: "6px",
                    height: "6px",
                    background: "var(--primary)",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--primary)",
                }}
              >
                Active AI Core
              </span>
            </div>
          </div>

          {/* ── Contact avatar ───────────────────────── */}
          <div style={{ margin: "0 auto 8px", width: "fit-content" }}>
            <Avatar firstName={firstName} lastName={lastName} size="xl" />
          </div>

          {/* ── Contact name ─────────────────────────── */}
          <div
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "24px",
              fontWeight: 600,
              color: "var(--on-surface)",
              marginBottom: "2px",
            }}
          >
            {contactName}
          </div>

          {/* ── Contact number ───────────────────────── */}
          <div
            style={{
              fontSize: "16px",
              color: "var(--on-surface-variant)",
              marginBottom: "16px",
            }}
          >
            {contactNumber}
          </div>

          {/* ── Waveform container ───────────────────── */}
          <div
            style={{
              background: "var(--inverse-surface)",
              borderRadius: "24px",
              padding: "24px 16px",
              marginBottom: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Waveform active={!isOnHold} />

            {/* Duration label + timer */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: "'Geist', sans-serif",
                  letterSpacing: "0.08em",
                  color: "var(--on-surface-variant)",
                  marginBottom: "4px",
                  textTransform: "uppercase",
                }}
              >
                Duration
              </div>
              <CallTimer />
            </div>

            {/* Encrypted indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--outline-variant)",
              }}
            >
              <Icon name="lock" size={14} />
              <span
                style={{
                  fontSize: "12px",
                  fontFamily: "'Geist', sans-serif",
                }}
              >
                End-to-end encrypted
              </span>
            </div>
          </div>

          {/* ── Call controls ────────────────────────── */}
          <CallControls
            onEndCall={onEndCall ?? (() => console.log("End call"))}
            onMute={toggleMute}
            onHold={toggleHold}
            onNote={() => console.log("Add note")}
            isMuted={isMuted}
            isOnHold={isOnHold}
          />
        </Card>
      </div>
    </div>
  );
}
