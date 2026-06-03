/**
 * ProgressBar — Step progress indicator for the onboarding wizard.
 *
 * Shows a filled progress track and a step counter with
 * a back button that appears from step 2 onward.
 */

import { Icon } from "@components/ui";

interface ProgressBarProps {
  /** Current step (1-based) */
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  onBack,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;
  const showBack = currentStep > 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "16px 16px 0",
      }}
    >
      {/* ── Progress track ─────────────────────────── */}
      <div
        style={{
          background: "var(--surface-highest)",
          borderRadius: "9999px",
          height: "6px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "var(--primary)",
            height: "100%",
            width: `${progress}%`,
            transition: "width 0.3s ease",
            borderRadius: "9999px",
          }}
        />
      </div>

      {/* ── Navigation row: back | spacer | step count ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Back button — hidden on first step for layout balance */}
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          style={{
            background: "none",
            border: "none",
            cursor: showBack ? "pointer" : "default",
            color: "var(--on-surface)",
            padding: "8px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            visibility: showBack ? "visible" : "hidden",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => {
            if (showBack) e.currentTarget.style.background = "var(--surface-container)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
          }}
        >
          <Icon name="arrow_back" size={22} />
        </button>

        {/* Center spacer — same width as back button for balance */}
        <div style={{ width: "38px" }} />

        {/* Step counter */}
        <span
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            color: "var(--on-surface-variant)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
}
