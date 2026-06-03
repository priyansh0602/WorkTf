/**
 * Select — Styled dropdown with label, error state, and custom chevron.
 *
 * Hides the native browser appearance and renders a consistent
 * design-system styled select with a trailing chevron_down icon.
 *
 * @example
 *   <Select
 *     label="Use Case"
 *     options={[{ value: "sales", label: "Sales" }]}
 *     value={selected}
 *     onChange={handleChange}
 *   />
 */

import React, { useState, useCallback } from "react";
import Icon from "./Icon";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  name?: string;
  placeholder?: string;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  error,
  disabled = false,
  style,
  name,
  placeholder,
}: SelectProps) {
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => setFocused(false), []);

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
        </label>
      )}

      {/* Select wrapper — positions the chevron absolutely */}
      <div style={{ position: "relative" }}>
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            width: "100%",
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none" as React.CSSProperties["MozAppearance"],
            background: "var(--surface-lowest)",
            border: `1px solid ${borderColor}`,
            borderRadius: "10px",
            padding: "10px 40px 10px 14px",
            fontSize: "14px",
            fontFamily: "'Inter', sans-serif",
            color: "var(--on-surface)",
            outline: "none",
            boxShadow,
            transition: "border-color 0.2s, box-shadow 0.2s",
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : "pointer",
            boxSizing: "border-box",
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <div
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--on-surface-variant)",
            pointerEvents: "none",
            display: "flex",
          }}
        >
          <Icon name="expand_more" size={20} />
        </div>
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
