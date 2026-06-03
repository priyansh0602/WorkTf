/**
 * HeroSection — Main hero block below the navbar on the landing page.
 *
 * Contains the headline, subheadline, primary CTA button,
 * and a social proof row with overlapping avatars.
 */

import { Button, Avatar } from "@components/ui";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "80px 32px 48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}
    >
      {/* ── Headline block ─────────────────────────── */}
      <div style={{ maxWidth: 680 }}>
        <h1
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: "56px",
            letterSpacing: "-0.02em",
            color: "var(--on-surface)",
            marginBottom: "16px",
            marginTop: 0,
          }}
        >
          Human-like AI calling for your business
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "var(--on-surface-variant)",
            lineHeight: "28px",
            margin: 0,
          }}
        >
          Automate customer interactions, qualify leads, and scale your sales
          operations with highly realistic AI voice agents that sound
          indistinguishable from humans.
        </p>
      </div>

      {/* ── CTA button ─────────────────────────────── */}
      <Button
        variant="primary"
        size="lg"
        onClick={onGetStarted}
        style={{ boxShadow: "0 4px 14px rgba(0, 88, 190, 0.3)" }}
      >
        Get Started — It's Free
      </Button>

      {/* ── Social proof row ───────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "8px",
        }}
      >
        {/* Overlapping avatar stack */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar firstName="Sarah" lastName="M" size="sm" />
          <Avatar
            firstName="Tom"
            lastName="K"
            size="sm"
            style={{ marginLeft: "-8px" }}
          />
          <Avatar
            firstName="Alex"
            lastName="R"
            size="sm"
            style={{ marginLeft: "-8px" }}
          />
        </div>

        <span
          style={{
            fontSize: "14px",
            color: "var(--on-surface-variant)",
          }}
        >
          Trusted by 500+ businesses
        </span>
      </div>
    </section>
  );
}
