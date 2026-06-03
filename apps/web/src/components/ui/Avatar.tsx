/**
 * Avatar — Circular avatar showing initials or an image.
 *
 * Falls back to uppercase initials (via getInitials from @worktf/shared)
 * when no imageUrl is provided. Uses Geist font for the initials.
 *
 * @example
 *   <Avatar firstName="John" lastName="Doe" />
 *   <Avatar firstName="Jane" imageUrl="/avatar.jpg" size="lg" />
 */

import React from "react";
import { getInitials } from "@worktf/shared";

interface AvatarProps {
  firstName: string;
  lastName?: string;
  size?: "sm" | "md" | "lg" | "xl";
  imageUrl?: string;
  style?: React.CSSProperties;
}

const sizeMap = {
  sm: { box: 28, font: 11 },
  md: { box: 36, font: 13 },
  lg: { box: 48, font: 16 },
  xl: { box: 64, font: 22 },
} as const;

export default function Avatar({
  firstName,
  lastName = "",
  size = "md",
  imageUrl,
  style,
}: AvatarProps) {
  const { box, font } = sizeMap[size];
  const initials = getInitials(firstName, lastName);

  const baseStyle: React.CSSProperties = {
    width: box,
    height: box,
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
    ...style,
  };

  /* When an image URL is provided, render an img tag */
  if (imageUrl) {
    return (
      <div style={baseStyle}>
        <img
          src={imageUrl}
          alt={`${firstName} ${lastName}`.trim()}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    );
  }

  /* Fallback: initials on a primary-tinted background */
  return (
    <div
      style={{
        ...baseStyle,
        background: "var(--primary-fixed)",
        color: "var(--primary)",
        fontFamily: "'Geist', sans-serif",
        fontWeight: 700,
        fontSize: font,
        letterSpacing: "0.02em",
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  );
}
