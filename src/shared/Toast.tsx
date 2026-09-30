import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { UNDO_DELAY_MS } from "@/lib/constants";
import { Button } from "@/shared/Button";

interface ToastProps {
  message: string;
  stacked?: boolean;
  closeOnEscape?: boolean;
  variant?: "confirmation" | "undo";
  taskTitle?: string;
  remainingMs?: number;
  onUndo?: () => void;
  onClose?: () => void;
  onPause?: () => void;
  onResume?: () => void;
}

export function Toast({
  message,
  stacked = false,
  closeOnEscape = true,
  variant = "confirmation",
  taskTitle,
  remainingMs,
  onUndo,
  onClose,
  onPause,
  onResume,
}: ToastProps) {
  const prefersReducedMotion = useReducedMotion();
  const [interactions, setInteractions] = useState({
    hovered: false,
    pressed: false,
    focused: false,
  });
  const wasPausedRef = useRef(false);
  const seconds = Math.max(0, Math.ceil((remainingMs ?? 0) / 1000));
  const isUndo = variant === "undo";
  const progress = Math.min(1, Math.max(0, (remainingMs ?? 0) / UNDO_DELAY_MS));
  const isProgressPaused =
    interactions.hovered || interactions.pressed || interactions.focused;

  useEffect(() => {
    if (!isUndo || !onClose || !closeOnEscape) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeOnEscape, isUndo, onClose]);

  useEffect(() => {
    if (!isUndo || wasPausedRef.current === isProgressPaused) return;
    wasPausedRef.current = isProgressPaused;
    if (isProgressPaused) onPause?.();
    else onResume?.();
  }, [isProgressPaused, isUndo, onPause, onResume]);

  function setInteraction(
    interaction: keyof typeof interactions,
    isActive: boolean,
  ) {
    setInteractions((current) =>
      current[interaction] === isActive
        ? current
        : { ...current, [interaction]: isActive },
    );
  }

  return (
    <motion.div
      className={`toast toast--${variant}`}
      role="status"
      aria-label={isUndo ? "Suppression de tâche" : undefined}
      aria-live="polite"
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, x: stacked ? 0 : "-50%", y: 12 }
      }
      animate={
        prefersReducedMotion
          ? { x: stacked ? 0 : "-50%" }
          : { opacity: 1, x: stacked ? 0 : "-50%", y: 0 }
      }
      exit={
        prefersReducedMotion
          ? { x: stacked ? 0 : "-50%" }
          : { opacity: 0, x: stacked ? 0 : "-50%", y: 12 }
      }
      transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
      onMouseEnter={isUndo ? () => setInteraction("hovered", true) : undefined}
      onMouseLeave={isUndo ? () => setInteraction("hovered", false) : undefined}
      onPointerDown={isUndo ? () => setInteraction("pressed", true) : undefined}
      onPointerUp={isUndo ? () => setInteraction("pressed", false) : undefined}
      onPointerCancel={
        isUndo ? () => setInteraction("pressed", false) : undefined
      }
      onFocusCapture={
        isUndo ? () => setInteraction("focused", true) : undefined
      }
      onBlurCapture={
        isUndo
          ? (event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setInteraction("focused", false);
            }
          : undefined
      }
    >
      {isUndo && (
        <motion.span
          className="toast__progress"
          aria-hidden="true"
          initial={{ scaleX: progress }}
          animate={{ scaleX: isProgressPaused ? progress : 0 }}
          transition={
            prefersReducedMotion || isProgressPaused
              ? { duration: 0 }
              : { duration: (remainingMs ?? 0) / 1000, ease: "linear" }
          }
        />
      )}
      <span className="toast__message">{message}</span>
      {onUndo && (
        <Button
          variant="text"
          size="sm"
          aria-label={
            taskTitle
              ? `Annuler la suppression de "${taskTitle}"`
              : "Annuler la suppression"
          }
          onClick={onUndo}
        >
          Annuler
          {prefersReducedMotion && remainingMs !== undefined
            ? ` (${seconds} s)`
            : ""}
        </Button>
      )}
    </motion.div>
  );
}
