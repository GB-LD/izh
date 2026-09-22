import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { Trash2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Task } from "@/schemas/task";
import { MAX_FOCUS_PER_QUADRANT } from "@/lib/constants";
import { QUADRANT_META } from "@/lib/quadrants";
import { Button } from "@/shared/Button";
import { useTaskStore } from "@/stores/useTaskStore";

interface TaskItemBacklogProps {
  task: Task;
  onDelete: (task: Task) => void;
  onActivated: () => void;
}

const SWIPE_REVEAL_PX = 24;
const SWIPE_COMMIT_PX = 48;

interface TooltipPosition {
  top: number;
  left: number;
  side: "above" | "below";
}

export function TaskItemBacklog({
  task,
  onDelete,
  onActivated,
}: TaskItemBacklogProps) {
  const prefersReducedMotion = useReducedMotion();
  const activateTask = useTaskStore((state) => state.activateTask);
  const activeCount = useTaskStore(
    (state) =>
      state.tasks.filter(
        (candidate) =>
          candidate.status === "active" && candidate.quadrant === task.quadrant,
      ).length,
  );
  const pointerStartX = useRef<number | null>(null);
  const activationRef = useRef<HTMLSpanElement>(null);
  const [isDeleteRevealed, setIsDeleteRevealed] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] =
    useState<TooltipPosition | null>(null);
  const tooltipId = useId();
  const isFocusFull = activeCount >= MAX_FOCUS_PER_QUADRANT;
  const quadrantLabel = task.quadrant
    ? QUADRANT_META[task.quadrant].label
    : "Non classé";
  const unavailableActivationLabel = `Activer "${task.title}" indisponible`;
  const focusFullMessage = `Le quadrant « ${quadrantLabel} » de ton Focus est plein (${MAX_FOCUS_PER_QUADRANT}/${MAX_FOCUS_PER_QUADRANT}). Termine une tâche ou remets-en une dans ta Réserve pour libérer une place.`;

  function requestDelete() {
    onDelete(task);
  }

  useLayoutEffect(() => {
    if (!isTooltipOpen || !activationRef.current) return;

    function updateTooltipPosition() {
      const rect = activationRef.current?.getBoundingClientRect();
      if (!rect) return;

      const tooltipWidth = Math.min(304, window.innerWidth - 32);
      const left = Math.min(
        Math.max(16, rect.right - tooltipWidth),
        window.innerWidth - tooltipWidth - 16,
      );
      const side = rect.top >= 116 ? "above" : "below";
      setTooltipPosition({
        top: side === "above" ? rect.top - 8 : rect.bottom + 8,
        left,
        side,
      });
    }

    updateTooltipPosition();
    window.addEventListener("resize", updateTooltipPosition);
    window.addEventListener("scroll", updateTooltipPosition, true);
    return () => {
      window.removeEventListener("resize", updateTooltipPosition);
      window.removeEventListener("scroll", updateTooltipPosition, true);
    };
  }, [isTooltipOpen]);

  return (
    <motion.li
      className="reserve-task-item task-item task-item-backlog"
      data-delete-revealed={isDeleteRevealed || undefined}
      tabIndex={0}
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={prefersReducedMotion ? {} : { opacity: 1 }}
      exit={prefersReducedMotion ? {} : { opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onKeyDown={(event) => {
        if (event.key === "Delete" && event.target === event.currentTarget) {
          event.preventDefault();
          requestDelete();
        }
      }}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest("button")) return;
        pointerStartX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (pointerStartX.current === null) return;
        const offset = event.clientX - pointerStartX.current;
        pointerStartX.current = null;
        setIsDeleteRevealed(offset <= -SWIPE_COMMIT_PX);
      }}
      onPointerMove={(event) => {
        if (pointerStartX.current === null) return;
        setIsDeleteRevealed(
          event.clientX - pointerStartX.current <= -SWIPE_REVEAL_PX,
        );
      }}
      onPointerCancel={() => {
        pointerStartX.current = null;
      }}
    >
      <span className="task-item-backlog__title">{task.title}</span>
      <div className="task-item__action">
        <button
          type="button"
          aria-label={`Supprimer la tâche "${task.title}"`}
          onMouseDown={(event) => event.preventDefault()}
          onClick={requestDelete}
        >
          <Trash2
            size={16}
            aria-hidden="true"
            className="task-item__action-delete"
          />
        </button>
      </div>
      <span
        ref={activationRef}
        className="task-item-backlog__activation"
        data-focus-full={isFocusFull || undefined}
        tabIndex={isFocusFull ? 0 : undefined}
        role={isFocusFull ? "group" : undefined}
        aria-label={isFocusFull ? unavailableActivationLabel : undefined}
        aria-disabled={isFocusFull || undefined}
        aria-describedby={isFocusFull ? tooltipId : undefined}
        onFocus={() => {
          if (isFocusFull) setIsTooltipOpen(true);
        }}
        onBlur={() => setIsTooltipOpen(false)}
        onMouseEnter={() => {
          if (isFocusFull) setIsTooltipOpen(true);
        }}
        onMouseLeave={() => setIsTooltipOpen(false)}
        onPointerDown={(event) => {
          event.stopPropagation();
          if (event.pointerType === "touch" && isFocusFull) {
            event.preventDefault();
            setIsTooltipOpen((isOpen) => !isOpen);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") setIsTooltipOpen(false);
        }}
      >
        <Button
          variant="secondary"
          size="xs"
          disabled={isFocusFull}
          aria-label={
            isFocusFull ? unavailableActivationLabel : `Activer "${task.title}"`
          }
          onClick={() => {
            if (activateTask(task.id)) onActivated();
          }}
        >
          Activer
        </Button>
      </span>
      {isTooltipOpen &&
        tooltipPosition &&
        createPortal(
          <span
            id={tooltipId}
            className="task-item-backlog__tooltip"
            data-side={tooltipPosition.side}
            role="tooltip"
            style={
              {
                "--_tooltip-top": `${tooltipPosition.top}px`,
                "--_tooltip-left": `${tooltipPosition.left}px`,
              } as CSSProperties
            }
          >
            {focusFullMessage}
          </span>,
          document.body,
        )}
    </motion.li>
  );
}
