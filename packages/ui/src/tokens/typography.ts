/**
 * Typography — Font system tokens for the WorkTF AI design system.
 *
 * Inter is the primary UI font (body, labels, data).
 * Geist is used for display elements (headings, hero text).
 */

export const typography = {
  /** Font family stacks with system fallbacks. */
  fontFamily: {
    sans: "Inter, system-ui, -apple-system, sans-serif",
    display: "Geist, system-ui, -apple-system, sans-serif",
  },

  /** Font size scale — values in px for inline style usage. */
  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
  },

  /** Font weight scale — numeric values for CSS. */
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  /** Line height values for tight, normal, and relaxed text density. */
  lineHeight: {
    tight: "20px",
    normal: "24px",
    relaxed: "28px",
  },

  /** Letter spacing for fine-tuning text density and emphasis. */
  letterSpacing: {
    tight: "-0.02em",
    normal: "0",
    wide: "0.04em",
    wider: "0.08em",
  },
} as const;
