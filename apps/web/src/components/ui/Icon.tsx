/**
 * Icon — Wrapper around Google Material Symbols Outlined.
 *
 * Renders a material symbol by name. The icon font is loaded via
 * a CDN link in index.html. Pass `fill` to use the filled variant.
 *
 * @example
 *   <Icon name="call" />
 *   <Icon name="dashboard" size={20} fill />
 */

import React from "react";

interface IconProps {
  /** Material Symbol name, e.g. "call", "dashboard", "settings" */
  name: string;
  /** Icon size in px — applied as fontSize (default 24) */
  size?: number;
  /** When true, renders the filled variant via font-variation-settings */
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Icon color — defaults to currentColor so it inherits from parent */
  color?: string;
}

export default function Icon({
  name,
  size = 24,
  fill = false,
  className = "",
  style,
  color,
}: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: size,
        color: color || "currentColor",
        fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0",
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
