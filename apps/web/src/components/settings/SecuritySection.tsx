/**
 * SecuritySection — Security options list.
 *
 * Renders clickable rows for password, 2FA, and security log.
 */

import { useState, useCallback } from "react";
import { Card, Icon } from "@components/ui";

const SECURITY_OPTIONS = [
  { icon: "lock", label: "Change Password" },
  { icon: "verified_user", label: "Two-Factor Authentication" },
  { icon: "history", label: "Review Security Log" },
] as const;

export default function SecuritySection() {
  return (
    <Card padding={16}>
      {/* Section title */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "15px",
          fontWeight: 600,
          color: "var(--on-surface)",
          marginBottom: "8px",
        }}
      >
        Security
      </div>

      {/* Security rows */}
      {SECURITY_OPTIONS.map((opt, index) => (
        <SecurityRow
          key={opt.label}
          icon={opt.icon}
          label={opt.label}
          isLast={index === SECURITY_OPTIONS.length - 1}
        />
      ))}
    </Card>
  );
}

/** A single clickable security option row. */
function SecurityRow({
  icon,
  label,
  isLast,
}: {
  icon: string;
  label: string;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const handleEnter = useCallback(() => setHovered(true), []);
  const handleLeave = useCallback(() => setHovered(false), []);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => console.log(label)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: isLast ? "none" : "1px solid var(--outline-variant)",
        cursor: "pointer",
        borderRadius: "4px",
        background: hovered ? "var(--surface-low)" : "transparent",
        transition: "background 0.15s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Icon name={icon} size={18} color="var(--on-surface-variant)" />
        <span
          style={{
            fontSize: "14px",
            color: "var(--on-surface)",
          }}
        >
          {label}
        </span>
      </div>
      <Icon name="chevron_right" size={18} color="var(--outline-variant)" />
    </div>
  );
}
