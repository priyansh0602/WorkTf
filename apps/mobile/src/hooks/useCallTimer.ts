import { useState, useEffect, useRef, useCallback, useMemo } from "react";

interface UseCallTimerOptions {
  startedAt?: Date;
  autoStart?: boolean;
}

interface UseCallTimerReturn {
  seconds: number;
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

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimer();
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }, [clearTimer]);

  const stop = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setSeconds(0);
  }, [clearTimer]);

  useEffect(() => {
    if (autoStart) {
      start();
    }
    return clearTimer;
  }, [autoStart, start, clearTimer]);

  const formatted = useMemo(() => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }, [seconds]);

  return { seconds, formatted, isRunning, start, stop, reset };
}
