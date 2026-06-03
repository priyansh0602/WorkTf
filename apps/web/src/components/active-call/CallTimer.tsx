/**
 * CallTimer — Live counting timer that increments every second.
 *
 * Displays elapsed time as MM:SS. If startedAt is provided,
 * initializes from the difference; otherwise starts at 00:00.
 */

import React, { useState, useEffect } from "react";

interface CallTimerProps {
  /** Optional start time — elapsed seconds are calculated from this */
  startedAt?: Date;
  style?: React.CSSProperties;
}

export default function CallTimer({ startedAt, style }: CallTimerProps) {
  const [seconds, setSeconds] = useState(() => {
    if (startedAt) {
      return Math.floor((Date.now() - startedAt.getTime()) / 1000);
    }
    return 0;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /** Format seconds as MM:SS with zero-padding */
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <span
      style={{
        fontFamily: "'Geist', sans-serif",
        fontSize: "44px",
        fontWeight: 700,
        color: "var(--primary-fixed-dim)",
        letterSpacing: "-0.02em",
        ...style,
      }}
    >
      {minutes}:{secs}
    </span>
  );
}
