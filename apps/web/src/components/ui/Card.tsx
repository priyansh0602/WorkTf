/**
 * Card — Surface container component.
 *
 * A generic card with consistent surface styling, optional hover
 * highlight, and click handling. Used as the base for dashboard
 * panels, stat cards, and list items.
 *
 * @example
 *   <Card hoverable onClick={handleClick}>
 *     <h3>Calls Today</h3>
 *     <p>42</p>
 *   </Card>
 */

import React, { useState, useCallback } from "react";

interface CardProps {
  children: React.ReactNode;
  /** Padding in px or CSS string (default 16) */
  padding?: number | string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  /** Enables border highlight on hover (default false) */
  hoverable?: boolean;
  /** Removes the border entirely */
  noBorder?: boolean;
}

export default function Card({
  children,
  padding = 16,
  style,
  className = "",
  onClick,
  hoverable = false,
  noBorder = false,
}: CardProps) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  const resolvedPadding = typeof padding === "number" ? `${padding}px` : padding;

  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={hoverable ? handleMouseEnter : undefined}
      onMouseLeave={hoverable ? handleMouseLeave : undefined}
      style={{
        background: "var(--surface-lowest)",
        border: noBorder ? "none" : "1px solid var(--outline-variant)",
        borderRadius: "16px",
        padding: resolvedPadding,
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.06)",
        cursor: onClick ? "pointer" : undefined,
        transition: "border-color 0.2s, box-shadow 0.2s",
        /* Hover highlight */
        ...(hoverable && hovered
          ? {
              borderColor: "var(--primary-fixed-dim)",
              boxShadow: "0 2px 8px rgba(15, 23, 42, 0.1)",
            }
          : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
