/**
 * Input — Styled text input with label, icon, and error state.
 *
 * Renders a labeled input field with focus ring, error messaging,
 * and optional leading icon. Follows the design system token palette.
 *
 * @example
 *   <Input label="Phone" icon="call" placeholder="+1 (555) 000-0000" />
 *   <Input label="Email" error="Invalid email address" />
 */

import React, { useState, useCallback } from "react";
import Icon from "./Icon";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  /** Error message — when set, border turns red and message is shown below */
  error?: string;
  disabled?: boolean;
  /** Material Symbol name rendered inside the left of the input */
  icon?: string;
  style?: React.CSSProperties;
  name?: string;
  required?: boolean;
}

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  disabled = false,
  icon,
  style,
  name,
  required = false,
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => setFocused(false), []);

  /** Resolve border color: error → red, focused → primary, default → outline-variant */
  const borderColor = error
    ? "var(--error)"
    : focused
      ? "var(--primary)"
      : "var(--outline-variant)";

  const boxShadow = focused && !error
    ? "0 0 0 3px rgba(0, 88, 190, 0.12)"
    : "none";

  return (
    <div style={{ width: "100%", ...style }}>
      {/* Label */}
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "12px",
            fontFamily: "'Geist', sans-serif",
            fontWeight: 500,
            color: "var(--on-surface)",
            letterSpacing: "0.04em",
            textTransform: "uppercase" as const,
            marginBottom: "6px",
          }}
        >
          {label}
          {required && (
            <span style={{ color: "var(--error)", marginLeft: "2px" }}>*</span>
          )}
        </label>
      )}

      {/* Input wrapper — positions the icon absolutely inside */}
      <div style={{ position: "relative" }}>
        {/* Leading icon */}
        {icon && (
          <div
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--on-surface-variant)",
              pointerEvents: "none",
              display: "flex",
            }}
          >
            <Icon name={icon} size={18} />
          </div>
        )}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            width: "100%",
            background: "var(--surface-lowest)",
            border: `1px solid ${borderColor}`,
            borderRadius: "10px",
            padding: "10px 14px",
            paddingLeft: icon ? "40px" : "14px",
            fontSize: "14px",
            fontFamily: "'Inter', sans-serif",
            color: "var(--on-surface)",
            outline: "none",
            boxShadow,
            transition: "border-color 0.2s, box-shadow 0.2s",
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : undefined,
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Error message */}
      {error && (
        <p
          style={{
            fontSize: "12px",
            color: "var(--error)",
            marginTop: "4px",
            marginBottom: 0,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
