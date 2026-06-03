/**
 * useCallTimer — Hook managing a running call timer.
 *
 * Provides seconds counter, formatted MM:SS string,
 * and start/stop/reset controls with automatic cleanup.
 */

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

interface UseCallTimerOptions {
  /** Optional start time — initializes elapsed seconds from this */
  startedAt?: Date;
  /** Whether to start ticking automatically on mount (default true) */
  autoStart?: boolean;
}

interface UseCallTimerReturn {
  seconds: number;
  /** Formatted as MM:SS with zero-padding */
  formatted: string;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export function useCallTimer({
  startedAt,
  autoStart = true,
}: UseCallTimerOptions = {}): UseCallTimerReturn {
  const [seconds, setSeconds] = useState(() => {
    if (startedAt) {
      return Math.max(0, Math.floor((Date.now() - startedAt.getTime()) / 1000));
    }
    return 0;
  });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /** Clear any existing interval. */
  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /** Start the timer. */
  const start = useCallback(() => {
    clearTimer();
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }, [clearTimer]);

  /** Stop the timer without resetting. */
  const stop = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, [clearTimer]);

  /** Stop and reset to 0. */
  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setSeconds(0);
  }, [clearTimer]);

  /** Auto-start on mount if configured. */
  useEffect(() => {
    if (autoStart) {
      start();
    }
    return clearTimer;
  }, [autoStart, start, clearTimer]);

  /** Format seconds as MM:SS. */
  const formatted = useMemo(() => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }, [seconds]);

  return { seconds, formatted, isRunning, start, stop, reset };
}
