/**
 * QuestionCard — Renders a single onboarding question with option tiles.
 *
 * Displays a centered title, subtitle, and a vertical list of
 * OptionTile components for the user to choose from.
 */

import type { IOnboardingOption } from "@worktf/shared";
import OptionTile from "./OptionTile";

interface QuestionCardProps {
  title: string;
  subtitle: string;
  options: IOnboardingOption[];
  selectedValue: string | undefined;
  onSelect: (value: string) => void;
}

export default function QuestionCard({
  title,
  subtitle,
  options,
  selectedValue,
  onSelect,
}: QuestionCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      {/* ── Question header ────────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "24px",
            fontWeight: 600,
            color: "var(--on-surface)",
            marginBottom: "8px",
            marginTop: 0,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "var(--on-surface-variant)",
            lineHeight: "20px",
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* ── Option tiles ───────────────────────────── */}
      {options.map((option) => (
        <OptionTile
          key={option.value}
          value={option.value}
          icon={option.icon}
          label={option.label}
          desc={option.desc}
          selected={selectedValue === option.value}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
