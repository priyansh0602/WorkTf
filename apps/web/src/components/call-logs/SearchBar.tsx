/**
 * SearchBar — Search input for filtering call logs.
 *
 * Renders a text input with a search icon positioned inside.
 */

import { useState, useCallback } from "react";
import { Icon } from "@components/ui";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search contacts...",
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => setFocused(false), []);

  return (
    <div style={{ position: "relative" }}>
      {/* Search icon */}
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
        <Icon name="search" size={18} />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          width: "100%",
          paddingLeft: "40px",
          paddingRight: "16px",
          paddingTop: "10px",
          paddingBottom: "10px",
          background: "var(--surface-low)",
          border: `1px solid ${focused ? "var(--primary)" : "var(--outline-variant)"}`,
          borderRadius: "10px",
          fontSize: "14px",
          color: "var(--on-surface)",
          fontFamily: "'Inter', sans-serif",
          outline: "none",
          boxShadow: focused ? "0 0 0 3px rgba(0, 88, 190, 0.12)" : "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}
