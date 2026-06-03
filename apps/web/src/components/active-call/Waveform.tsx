/**
 * Waveform — Animated audio waveform visualization.
 *
 * Renders a series of bars that animate with different wave
 * keyframes when active, creating a sound-wave effect.
 * Falls back to static height bars when inactive.
 */

interface WaveformProps {
  /** When false, bars are static (default true) */
  active?: boolean;
  /** Bar color (default var(--primary-fixed-dim)) */
  color?: string;
  /** Number of bars to render (default 7) */
  barCount?: number;
}

/** Animation class names cycling through wave1–wave5 */
const WAVE_CLASSES = [
  "animate-wave1",
  "animate-wave2",
  "animate-wave3",
  "animate-wave2",
  "animate-wave4",
  "animate-wave5",
  "animate-wave1",
];

/** Staggered delays for each bar position */
const DELAYS = ["0s", "0.1s", "0.2s", "0.15s", "0.05s", "0.25s", "0.3s"];

export default function Waveform({
  active = true,
  color = "var(--primary-fixed-dim)",
  barCount = 7,
}: WaveformProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        height: "64px",
      }}
    >
      {Array.from({ length: barCount }, (_, i) => (
        <div
          key={i}
          className={active ? WAVE_CLASSES[i % WAVE_CLASSES.length] : undefined}
          style={{
            width: "6px",
            borderRadius: "3px",
            background: color,
            height: active ? undefined : "16px",
            animationDelay: active ? DELAYS[i % DELAYS.length] : undefined,
          }}
        />
      ))}
    </div>
  );
}
