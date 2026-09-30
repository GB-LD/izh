import { useCallback, useEffect, useRef, useState } from "react";
import { UNDO_DELAY_MS } from "@/lib/constants";

export function useUndo<T>(
  duration = UNDO_DELAY_MS,
  onExpire?: (value: T) => void,
) {
  const [pending, setPending] = useState<T | null>(null);
  const [remainingMs, setRemainingMs] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const expiresAtRef = useRef(0);
  const remainingRef = useRef(0);
  const pendingRef = useRef<T | null>(null);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
  }, []);

  const clear = useCallback(() => {
    clearTimers();
    pendingRef.current = null;
    remainingRef.current = 0;
    setPending(null);
    setRemainingMs(0);
    setIsPaused(false);
  }, [clearTimers]);

  const scheduleExpiration = useCallback(
    (delay: number) => {
      expiresAtRef.current = Date.now() + delay;
      intervalRef.current = window.setInterval(() => {
        const remaining = Math.max(0, expiresAtRef.current - Date.now());
        remainingRef.current = remaining;
        setRemainingMs(remaining);
      }, 100);
      timeoutRef.current = window.setTimeout(() => {
        const value = pendingRef.current;
        clear();
        if (value !== null) onExpire?.(value);
      }, delay);
    },
    [clear, onExpire],
  );

  const start = useCallback(
    (value: T) => {
      clearTimers();
      pendingRef.current = value;
      remainingRef.current = duration;
      setPending(value);
      setRemainingMs(duration);
      setIsPaused(false);
      scheduleExpiration(duration);
    },
    [clearTimers, duration, scheduleExpiration],
  );

  const pause = useCallback(() => {
    if (pendingRef.current === null || isPaused) return;
    const remaining = Math.max(0, expiresAtRef.current - Date.now());
    clearTimers();
    remainingRef.current = remaining;
    setRemainingMs(remaining);
    setIsPaused(true);
  }, [clearTimers, isPaused]);

  const resume = useCallback(() => {
    if (pendingRef.current === null || !isPaused || remainingRef.current <= 0) {
      return;
    }
    setIsPaused(false);
    scheduleExpiration(remainingRef.current);
  }, [isPaused, scheduleExpiration]);

  const undo = useCallback(() => {
    if (pendingRef.current === null) return null;
    const value = pendingRef.current;
    clear();
    return value;
  }, [clear]);

  useEffect(() => clearTimers, [clearTimers]);

  return {
    pending,
    remainingMs,
    isPaused,
    start,
    pause,
    resume,
    undo,
    clear,
  };
}
