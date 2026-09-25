import {
  useEffect,
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
  isDeleteRevealed: boolean;
  onDeleteRevealChange: (revealed: boolean) => void;
  onDelete: (task: Task) => void;
  onActivated: () => void;
}

const SWIPE_REVEAL_PX = 24;
const SWIPE_COMMIT_PX = 48;
const SWIPE_AXIS_PX = 8;
const TOUCH_ONLY_QUERY = "(hover: none) and (pointer: coarse)";

interface SwipeGesture {
  pointerId: number;
  startX: number;
  startY: number;
  axis: "pending" | "horizontal" | "vertical";
}

interface TooltipPosition {
  top: number;
  left: number;
  side: "above" | "below";
}

export function TaskItemBacklog({
  task,
  isDeleteRevealed,
  onDeleteRevealChange,
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
  const itemRef = useRef<HTMLLIElement>(null);
  const swipeGesture = useRef<SwipeGesture | null>(null);
  const suppressPointerClick = useRef(false);
  const activationRef = useRef<HTMLSpanElement>(null);
  const [isTouchOnly, setIsTouchOnly] = useState(
    () => window.matchMedia?.(TOUCH_ONLY_QUERY).matches ?? false,
  );
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

  useEffect(() => {
    const media = window.matchMedia?.(TOUCH_ONLY_QUERY);
    if (!media) return;
    const update = () => setIsTouchOnly(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

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
      ref={itemRef}
      className="reserve-task-item task-item task-item-backlog"
      data-task-id={task.id}
      data-delete-revealed={isDeleteRevealed || undefined}
      tabIndex={0}
      aria-keyshortcuts={isTouchOnly ? "Delete ArrowLeft" : "Delete"}
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={prefersReducedMotion ? {} : { opacity: 1 }}
      exit={prefersReducedMotion ? {} : { opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onKeyDown={(event) => {
        if (event.key === "Delete" && event.target === event.currentTarget) {
          event.preventDefault();
          requestDelete();
        }
        if (
          event.key === "ArrowLeft" &&
          event.target === event.currentTarget &&
          isTouchOnly
        ) {
          event.preventDefault();
          onDeleteRevealChange(true);
        }
        if (event.key === "Escape" && isDeleteRevealed) {
          event.preventDefault();
          onDeleteRevealChange(false);
          itemRef.current?.focus();
        }
      }}
      onPointerDownCapture={(event) => {
        suppressPointerClick.current = false;
        swipeGesture.current = null;
        if (
          event.isPrimary === false ||
          (event.pointerType === "mouse" && isTouchOnly)
        )
          return;
        if ((event.target as HTMLElement).closest("[data-delete-action]"))
          return;
        if (!isTouchOnly && (event.target as HTMLElement).closest("button"))
          return;
        swipeGesture.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          axis: "pending",
        };
      }}
      onPointerMove={(event) => {
        const gesture = swipeGesture.current;
        if (!gesture || event.pointerId !== gesture.pointerId) return;
        const dx = event.clientX - gesture.startX;
        const dy = event.clientY - gesture.startY;
        if (gesture.axis === "pending") {
          if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_AXIS_PX) return;
          gesture.axis =
            Math.abs(dy) >= Math.abs(dx) || dx >= 0 ? "vertical" : "horizontal";
        }
        if (gesture.axis === "horizontal") {
          onDeleteRevealChange(-dx >= SWIPE_REVEAL_PX);
        }
      }}
      onPointerUp={(event) => {
        const gesture = swipeGesture.current;
        if (!gesture || event.pointerId !== gesture.pointerId) return;
        swipeGesture.current = null;
        const dx = event.clientX - gesture.startX;
        const dy = event.clientY - gesture.startY;
        if (gesture.axis === "pending") {
          gesture.axis =
            Math.abs(dx) >= SWIPE_AXIS_PX &&
            Math.abs(dx) > Math.abs(dy) &&
            dx < 0
              ? "horizontal"
              : "vertical";
        }
        if (gesture.axis !== "horizontal") return;
        suppressPointerClick.current = true;
        onDeleteRevealChange(-dx >= SWIPE_COMMIT_PX);
      }}
      onPointerCancel={() => {
        if (swipeGesture.current?.axis === "horizontal") {
          onDeleteRevealChange(false);
        }
        swipeGesture.current = null;
      }}
      onClickCapture={(event) => {
        if (suppressPointerClick.current && event.detail !== 0) {
          suppressPointerClick.current = false;
          event.preventDefault();
          event.stopPropagation();
        }
      }}
    >
      <span className="task-item-backlog__title">{task.title}</span>
      <div
        className="task-item__action"
        inert={isTouchOnly && !isDeleteRevealed}
      >
        <button
          type="button"
          data-delete-action
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
        onPointerUp={(event) => {
          const gesture = swipeGesture.current;
          if (
            event.pointerType === "touch" &&
            isFocusFull &&
            gesture?.axis === "pending" &&
            Math.abs(event.clientX - gesture.startX) < SWIPE_AXIS_PX &&
            Math.abs(event.clientY - gesture.startY) < SWIPE_AXIS_PX
          ) {
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
