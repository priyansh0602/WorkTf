/**
 * Colors — Design system color tokens as CSS custom property references.
 *
 * Components should ALWAYS reference colors from this object rather
 * than hardcoding hex values. This ensures consistency and enables
 * runtime theme switching by swapping the CSS custom properties.
 *
 * @example
 *   import { colors } from "@worktf/ui/tokens";
 *   <div style={{ background: colors.primary }} />
 */

export const colors = {
  // ─── Surface ──────────────────────────────────────────────────────
  surface: "var(--surface)",
  surfaceDim: "var(--surface-dim)",
  surfaceBright: "var(--surface-bright)",
  surfaceLowest: "var(--surface-lowest)",
  surfaceLow: "var(--surface-low)",
  surfaceContainer: "var(--surface-container)",
  surfaceHigh: "var(--surface-high)",
  surfaceHighest: "var(--surface-highest)",

  // ─── On Surface ───────────────────────────────────────────────────
  onSurface: "var(--on-surface)",
  onSurfaceVariant: "var(--on-surface-variant)",

  // ─── Inverse Surface ──────────────────────────────────────────────
  inverseSurface: "var(--inverse-surface)",
  inverseOnSurface: "var(--inverse-on-surface)",

  // ─── Outline ──────────────────────────────────────────────────────
  outline: "var(--outline)",
  outlineVariant: "var(--outline-variant)",

  // ─── Primary ──────────────────────────────────────────────────────
  primary: "var(--primary)",
  onPrimary: "var(--on-primary)",
  primaryContainer: "var(--primary-container)",
  onPrimaryContainer: "var(--on-primary-container)",
  primaryFixed: "var(--primary-fixed)",
  primaryFixedDim: "var(--primary-fixed-dim)",

  // ─── Secondary ────────────────────────────────────────────────────
  secondary: "var(--secondary)",
  secondaryContainer: "var(--secondary-container)",
  onSecondaryContainer: "var(--on-secondary-container)",

  // ─── Error ────────────────────────────────────────────────────────
  error: "var(--error)",
  onError: "var(--on-error)",
  errorContainer: "var(--error-container)",
  onErrorContainer: "var(--on-error-container)",

  // ─── Background & Tint ────────────────────────────────────────────
  background: "var(--background)",
  surfaceTint: "var(--surface-tint)",
} as const;
