/**
 * Button — Primary action component with multiple variants and states.
 *
 * Supports primary / secondary / ghost / danger variants, three sizes,
 * leading/trailing icons, loading spinner, and full-width mode.
 *
 * @example
 *   <Button variant="primary" icon="add">Create Agent</Button>
 *   <Button variant="ghost" loading>Saving...</Button>
 */

import React, { useState, useCallback } from "react";
import Icon from "./Icon";

// ─── Types ──────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  /** Shows a spinner and disables interaction */
  loading?: boolean;
  /** Material Symbol name rendered before children */
  icon?: string;
  /** Material Symbol name rendered after children */
  iconAfter?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  fullWidth?: boolean;
}

// ─── Style Maps ─────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "var(--primary)",
    color: "var(--on-primary)",
    border: "none",
  },
  secondary: {
    background: "var(--secondary-container)",
    color: "var(--on-secondary-container)",
    border: "none",
  },
  ghost: {
    background: "transparent",
    color: "var(--on-surface)",
    border: "1px solid var(--outline-variant)",
  },
  danger: {
    background: "var(--error-container)",
    color: "var(--on-error-container)",
    border: "none",
  },
};

/** Hover background overlays per variant */
const variantHoverStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: { background: "var(--primary-container)" },
  secondary: { background: "var(--surface-highest)" },
  ghost: { background: "var(--surface-container)" },
  danger: { background: "var(--error)" , color: "var(--on-error)" },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties & { iconSize: number }> = {
  sm: { padding: "6px 14px", fontSize: "13px", borderRadius: "8px", iconSize: 16 },
  md: { padding: "10px 20px", fontSize: "15px", borderRadius: "10px", iconSize: 18 },
  lg: { padding: "14px 28px", fontSize: "17px", borderRadius: "12px", iconSize: 20 },
};

// ─── Component ──────────────────────────────────────────────────────

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  iconAfter,
  onClick,
  type = "button",
  style,
  fullWidth = false,
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const isDisabled = disabled || loading;
  const { iconSize, ...sizeStyle } = sizeStyles[size];

  const handleMouseDown = useCallback(() => setPressed(true), []);
  const handleMouseUp = useCallback(() => setPressed(false), []);
  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setPressed(false);
  }, []);

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        /* Base */
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.55 : 1,
        transition: "background 0.2s, transform 0.12s, box-shadow 0.2s",
        outline: "none",
        width: fullWidth ? "100%" : undefined,
        transform: pressed ? "scale(0.97)" : "scale(1)",
        /* Variant + size */
        ...variantStyles[variant],
        ...sizeStyle,
        /* Hover overlay */
        ...(hovered && !isDisabled ? variantHoverStyles[variant] : {}),
        /* User overrides */
        ...style,
      }}
    >
      {/* Loading spinner */}
      {loading && (
        <span
          style={{
            width: iconSize,
            height: iconSize,
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.6s linear infinite",
            flexShrink: 0,
          }}
        />
      )}

      {/* Leading icon */}
      {icon && !loading && <Icon name={icon} size={iconSize} />}

      {children}

      {/* Trailing icon */}
      {iconAfter && <Icon name={iconAfter} size={iconSize} />}
    </button>
  );
}
