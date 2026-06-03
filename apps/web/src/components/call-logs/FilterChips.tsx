/**
 * FilterChips — Pill buttons for filtering calls by outcome.
 *
 * Active chip uses primary background, inactive chips use
 * surface-container with hover highlight.
 */

import { useState, useCallback } from "react";

interface FilterChipsProps {
  active: string;
  onChange: (filter: string) => void;
}

const FILTERS = ["All", "Converted", "Answered", "Missed"];

export default function FilterChips({ active, onChange }: FilterChipsProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        paddingBottom: "4px",
      }}
    >
      {FILTERS.map((filter) => (
        <ChipButton
          key={filter}
          label={filter}
          isActive={active === filter}
          onClick={() => onChange(filter)}
        />
      ))}
    </div>
  );
}

/** A single filter chip button with hover state. */
function ChipButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const handleEnter = useCallback(() => setHovered(true), []);
  const handleLeave = useCallback(() => setHovered(false), []);

  const background = isActive
    ? "var(--primary)"
    : hovered
      ? "var(--surface-high)"
      : "var(--surface-container)";

  const color = isActive ? "var(--on-primary)" : "var(--on-surface-variant)";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        padding: "6px 16px",
        borderRadius: "999px",
        border: "none",
        fontSize: "12px",
        fontFamily: "'Geist', sans-serif",
        fontWeight: 500,
        cursor: "pointer",
        whiteSpace: "nowrap",
        letterSpacing: "0.02em",
        transition: "background 0.15s",
        background,
        color,
      }}
    >
      {label}
    </button>
  );
}
