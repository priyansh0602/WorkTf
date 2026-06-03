/**
 * Spacing & Border Radius — Layout tokens for the WorkTF AI design system.
 *
 * Spacing follows a Tailwind-like scale mapping token names to pixel
 * values. Use these for margins, padding, gaps, and sizing to maintain
 * a consistent visual rhythm across the app.
 */

/** Spacing scale in pixels — Tailwind-style increments from 0 to 96. */
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  4: 16,
  6: 24,
  8: 32,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  64: 256,
  80: 320,
  96: 384,
} as const;

/** Border radius presets — from subtle rounding to fully circular. */
export const borderRadius = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;
