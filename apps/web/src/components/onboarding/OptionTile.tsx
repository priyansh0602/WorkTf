/**
 * OptionTile — Selectable answer tile for onboarding questions.
 *
 * Renders a full-width button with an icon circle, label, and
 * description. Border and icon colors change when selected.
 */

import { Icon } from "@components/ui";

interface OptionTileProps {
  value: string;
  /** Material Symbol name */
  icon: string;
  label: string;
  desc: string;
  selected: boolean;
  onSelect: (value: string) => void;
}

export default function OptionTile({
  value,
  icon,
  label,
  desc,
  selected,
  onSelect,
}: OptionTileProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
        width: "100%",
        padding: "16px",
        borderRadius: "16px",
        border: `1px solid ${selected ? "var(--primary)" : "var(--outline-variant)"}`,
        background: selected ? "var(--surface-low)" : "var(--surface-lowest)",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s",
        outline: "none",
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: selected ? "var(--primary-container)" : "var(--surface-container)",
          color: selected ? "var(--on-primary)" : "var(--on-surface-variant)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 0.2s, color 0.2s",
        }}
      >
        <Icon name={icon} size={24} fill />
      </div>

      {/* Text block */}
      <div style={{ paddingTop: "4px" }}>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--on-surface)",
            marginBottom: "4px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "var(--on-surface-variant)",
            lineHeight: "20px",
          }}
        >
          {desc}
        </div>
      </div>
    </button>
  );
}
