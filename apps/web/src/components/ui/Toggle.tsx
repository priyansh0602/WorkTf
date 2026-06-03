/**
 * Toggle — Animated on/off switch.
 *
 * A custom toggle switch with smooth thumb slide animation.
 * Used for agent settings like call recording, voicemail detection, etc.
 *
 * @example
 *   <Toggle on={isEnabled} onChange={setIsEnabled} />
 *   <Toggle on={isEnabled} onChange={setIsEnabled} size="sm" disabled />
 */

import { useCallback } from "react";

interface ToggleProps {
  on: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
}

/** Track and thumb dimensions per size variant */
const sizeConfig = {
  sm: { trackW: 36, trackH: 20, thumb: 14, travel: 16 },
  md: { trackW: 44, trackH: 24, thumb: 18, travel: 20 },
} as const;

export default function Toggle({
  on,
  onChange,
  disabled = false,
  size = "md",
}: ToggleProps) {
  const { trackW, trackH, thumb, travel } = sizeConfig[size];

  const handleClick = useCallback(() => {
    if (!disabled) onChange(!on);
  }, [disabled, on, onChange]);

  /** Thumb offset: 3px from edge when off, slides right by `travel` when on */
  const thumbOffset = on ? travel + 3 : 3;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={handleClick}
      style={{
        /* Track */
        position: "relative",
        width: trackW,
        height: trackH,
        borderRadius: trackH / 2,
        background: on ? "var(--primary)" : "var(--outline-variant)",
        border: "none",
        padding: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background 0.2s ease",
        outline: "none",
        flexShrink: 0,
      }}
    >
      {/* Thumb */}
      <span
        style={{
          position: "absolute",
          top: (trackH - thumb) / 2,
          left: thumbOffset,
          width: thumb,
          height: thumb,
          borderRadius: "50%",
          background: on ? "var(--on-primary)" : "var(--surface-lowest)",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
          transition: "left 0.2s ease, background 0.2s ease",
        }}
      />
    </button>
  );
}
