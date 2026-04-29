import { useState, useRef } from "react";
import { PenLine, Trash2 } from "lucide-react";
import type { Task } from "@/schemas/task";
import { Button } from "@/shared/Button";
import { useTaskStore } from "@/stores/useTaskStore";

interface TaskItemInboxProps {
  task: Task;
}

export function TaskItemInbox({ task }: TaskItemInboxProps) {
  const { updateTask, deleteTask } = useTaskStore();
  const [inputValue, setInputValue] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleBlur() {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setInputValue(task.title);
      return;
    }
    if (trimmed !== task.title) {
      updateTask(task.id, { title: trimmed });
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setInputValue(task.title);
      inputRef.current?.blur();
    }
    if (event.key === "Enter") {
      inputRef.current?.blur();
    }
  }

  return (
    <li
      className="task-item task-item-inbox"
      onPointerDown={(e) => {
        if (!(e.target as HTMLElement).closest("button")) {
          inputRef.current?.focus({ preventScroll: true });
        }
      }}
    >
      <div className="task-item__edit-indicator" aria-hidden="true">
        <PenLine size={14} />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        className="task-item__edit-input"
        enterKeyHint="done"
        autoComplete="off"
        autoCorrect="off"
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <div className="task-item__action">
        <button
          type="button"
          aria-label={`Supprimer la tâche "${task.title}"`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => deleteTask(task.id)}
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
        aria-label={`Trier "${task.title}"`}
      >
        Trier
      </Button>
    </li>
  );
}
