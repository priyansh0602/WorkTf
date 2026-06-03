/**
 * Textarea — Styled multi-line text input with label, character count, and error state.
 *
 * Used for agent goal descriptions and other long-form inputs.
 * Shows a live character counter when maxLength is provided.
 *
 * @example
 *   <Textarea
 *     label="Agent Goal"
 *     placeholder="Describe what your agent should accomplish..."
 *     maxLength={500}
 *     value={goal}
 *     onChange={handleChange}
 *   />
 */

import React, { useState, useCallback } from "react";

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  /** Number of visible text rows (default 4) */
  rows?: number;
  /** When set, enables the character counter */
  maxLength?: number;
  style?: React.CSSProperties;
  name?: string;
}

export default function Textarea({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  rows = 4,
  maxLength,
  style,
  name,
}: TextareaProps) {
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

  const charCount = value?.length ?? 0;

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

      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          width: "100%",
          background: "var(--surface-lowest)",
          border: `1px solid ${borderColor}`,
          borderRadius: "10px",
          padding: "10px 14px",
          fontSize: "14px",
          fontFamily: "'Inter', sans-serif",
          color: "var(--on-surface)",
          outline: "none",
          boxShadow,
          transition: "border-color 0.2s, box-shadow 0.2s",
          resize: "vertical",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : undefined,
          boxSizing: "border-box",
        }}
      />

      {/* Bottom row: error message + character counter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: "4px",
          minHeight: error || maxLength ? "16px" : 0,
        }}
      >
        {/* Error message */}
        {error ? (
          <p
            style={{
              fontSize: "12px",
              color: "var(--error)",
              margin: 0,
            }}
          >
            {error}
          </p>
        ) : (
          <span />
        )}

        {/* Character counter */}
        {maxLength !== undefined && (
          <span
            style={{
              fontSize: "12px",
              color: "var(--on-surface-variant)",
              fontFamily: "'Geist', sans-serif",
              flexShrink: 0,
            }}
          >
            {charCount} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
