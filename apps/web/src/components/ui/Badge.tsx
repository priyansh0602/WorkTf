/**
 * Badge — Small status label pill.
 *
 * Used for call outcomes, agent status, plan labels, etc.
 * Uses Geist font for a crisp, data-oriented appearance.
 *
 * @example
 *   <Badge label="Active" color="green" />
 *   <Badge label="Failed" color="red" size="sm" />
 */


type BadgeColor = "primary" | "green" | "red" | "orange" | "gray";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  size?: BadgeSize;
}

/** Background + text color pairs for each badge variant */
const colorMap: Record<BadgeColor, { background: string; color: string }> = {
  primary: {
    background: "var(--primary-fixed)",
    color: "var(--primary)",
  },
  green: {
    background: "#dcfce7",
    color: "#16a34a",
  },
  red: {
    background: "var(--error-container)",
    color: "var(--on-error-container)",
  },
  orange: {
    background: "#ffedd5",
    color: "#c2410c",
  },
  gray: {
    background: "var(--surface-container)",
    color: "var(--on-surface-variant)",
  },
};

const sizeMap: Record<BadgeSize, { fontSize: string; padding: string }> = {
  sm: { fontSize: "11px", padding: "2px 8px" },
  md: { fontSize: "12px", padding: "3px 10px" },
};

export default function Badge({
  label,
  color = "gray",
  size = "md",
}: BadgeProps) {
  const colors = colorMap[color];
  const sizing = sizeMap[size];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "999px",
        fontFamily: "'Geist', sans-serif",
        fontWeight: 500,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        ...colors,
        ...sizing,
      }}
    >
      {label}
    </span>
  );
}
