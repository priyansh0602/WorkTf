import type { Config } from "tailwindcss";

/**
 * Shared Tailwind CSS configuration for the WorkTF AI design system.
 *
 * Every color maps to a CSS custom property defined in tokens.css so
 * themes can be swapped at runtime by changing the property values.
 *
 * Usage:  bg-surface  text-on-primary  border-outline-variant  etc.
 */
const config: Config = {
  content: [
    /* Web app */
    "../../apps/web/src/**/*.{ts,tsx,html}",
    /* Shared UI components */
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Surface ─────────────────────────────── */
        surface: "var(--surface)",
        "surface-dim": "var(--surface-dim)",
        "surface-bright": "var(--surface-bright)",
        "surface-lowest": "var(--surface-lowest)",
        "surface-low": "var(--surface-low)",
        "surface-container": "var(--surface-container)",
        "surface-high": "var(--surface-high)",
        "surface-highest": "var(--surface-highest)",

        /* ── On Surface ──────────────────────────── */
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",

        /* ── Inverse Surface ─────────────────────── */
        "inverse-surface": "var(--inverse-surface)",
        "inverse-on-surface": "var(--inverse-on-surface)",

        /* ── Outline ─────────────────────────────── */
        outline: "var(--outline)",
        "outline-variant": "var(--outline-variant)",

        /* ── Primary ─────────────────────────────── */
        primary: "var(--primary)",
        "on-primary": "var(--on-primary)",
        "primary-container": "var(--primary-container)",
        "on-primary-container": "var(--on-primary-container)",
        "primary-fixed": "var(--primary-fixed)",
        "primary-fixed-dim": "var(--primary-fixed-dim)",

        /* ── Secondary ───────────────────────────── */
        secondary: "var(--secondary)",
        "secondary-container": "var(--secondary-container)",
        "on-secondary-container": "var(--on-secondary-container)",

        /* ── Error ───────────────────────────────── */
        error: "var(--error)",
        "on-error": "var(--on-error)",
        "error-container": "var(--error-container)",
        "on-error-container": "var(--on-error-container)",

        /* ── Misc ────────────────────────────────── */
        background: "var(--background)",
        "surface-tint": "var(--surface-tint)",
      },
    },
  },
  plugins: [],
};

export default config;
