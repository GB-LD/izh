import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Task } from "@/schemas/task";
import { MAX_FOCUS_PER_QUADRANT } from "@/lib/constants";
import { Button } from "@/shared/Button";
import { useTaskStore } from "@/stores/useTaskStore";

interface TaskItemBacklogProps {
  task: Task;
  onDelete: (task: Task) => void;
  onActivated: () => void;
}

const SWIPE_REVEAL_PX = 24;
const SWIPE_COMMIT_PX = 48;

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
  const [isDeleteRevealed, setIsDeleteRevealed] = useState(false);
  const isFocusFull = activeCount >= MAX_FOCUS_PER_QUADRANT;

  function requestDelete() {
    onDelete(task);
  }

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
      <Button
        variant="secondary"
        size="xs"
        disabled={isFocusFull}
        aria-label={
          isFocusFull
            ? `Focus plein pour ce quadrant (${MAX_FOCUS_PER_QUADRANT}/${MAX_FOCUS_PER_QUADRANT})`
            : `Activer "${task.title}"`
        }
        onClick={() => {
          if (activateTask(task.id)) onActivated();
        }}
      >
        Activer
      </Button>
      {isFocusFull && (
        <p className="task-item-backlog__full">
          Focus plein pour ce quadrant ({MAX_FOCUS_PER_QUADRANT}/
          {MAX_FOCUS_PER_QUADRANT})
        </p>
      )}
    </motion.li>
  );
}
