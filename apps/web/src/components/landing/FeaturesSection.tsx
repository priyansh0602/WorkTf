/**
 * FeaturesSection — Three-column feature highlight grid.
 *
 * Showcases the core value propositions of WorkTF AI:
 * 24/7 availability, natural voice quality, and instant setup.
 */

import { Card, Icon } from "@components/ui";

/** Feature data — icon, title, description */
const features = [
  {
    icon: "schedule",
    title: "24/7 Availability",
    desc: "Never miss a lead. Our AI agents handle inbound and outbound calls around the clock, ensuring your business is always responsive.",
  },
  {
    icon: "record_voice_over",
    title: "Natural Voice",
    desc: "Experience ultra-low latency and hyper-realistic voices that breathe, pause, and adapt dynamically to the conversation flow.",
  },
  {
    icon: "bolt",
    title: "Instant Setup",
    desc: "Deploy your first agent in minutes. Use our pre-built templates or customize prompts easily without writing a single line of code.",
  },
] as const;

export default function FeaturesSection() {
  return (
    <section
      style={{
        maxWidth: 1440,
        margin: "0 auto",
        padding: "0 32px 80px",
      }}
    >
      {/* Section heading */}
      <h2
        style={{
          fontFamily: "'Geist', sans-serif",
          fontSize: "32px",
          fontWeight: 600,
          textAlign: "center",
          color: "var(--on-surface)",
          marginBottom: "32px",
          marginTop: 0,
        }}
      >
        Why Choose WorkTF AI
      </h2>

      {/* Feature cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {features.map((feature) => (
          <Card key={feature.title} padding={24}>
            {/* Icon container */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "var(--primary-fixed)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <Icon name={feature.icon} size={24} fill />
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                color: "var(--on-surface)",
                marginBottom: "8px",
              }}
            >
              {feature.title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: "14px",
                color: "var(--on-surface-variant)",
                lineHeight: "20px",
              }}
            >
              {feature.desc}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
