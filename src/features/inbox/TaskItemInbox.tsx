import { useState, useRef } from "react";
import { PenIcon, Trash2 } from "lucide-react";
import type { Task } from "@/schemas/task";
import { Button } from "@/shared/Button";
import { useTaskStore } from "@/stores/useTaskStore";
import type { FormEvent } from "react";

interface TaskItemInboxProps {
  task: Task;
}

export function TaskItemInbox({ task }: TaskItemInboxProps) {
  const { updateTask, deleteTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  function submitTask() {
    const trimmedTitle = inputValue.trim();
    if (!trimmedTitle) return;

    updateTask(task.id, { title: trimmedTitle });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitTask();
    setIsEditing(false);
    inputRef.current?.blur();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setInputValue(task.title);
      setIsEditing(false);
      inputRef.current?.blur();
    }
    if (event.key === "Enter") {
      submitTask();
      setIsEditing(false);
      inputRef.current?.blur();
    }
  }

  function handleDelete(id: string) {
    deleteTask(id);
  }

  return (
    <li className="task-item task-item-inbox">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="task-item__edit-form">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            className="task-item__edit-input"
            autoFocus
            enterKeyHint="done"
            autoComplete="off"
            autoCorrect="off"
            onBlur={() => setIsEditing(false)}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" hidden tabIndex={-1} aria-hidden="true">
            Soumettre
          </button>
        </form>
      ) : (
        <span
          onClick={() => setIsEditing((prev) => !prev)}
          className="task-item__title"
        >
          {task.title}
        </span>
      )}
      <div className="task-item__action">
        <button
          type="button"
          aria-label={`Modifier la tâche "${task.title}"`}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          <PenIcon
            size={16}
            aria-hidden="true"
            className="task-item__action-edit"
          />
        </button>
        <button
          type="button"
          aria-label={`Supprimer la tâche "${task.title}"`}
          onClick={() => handleDelete(task.id)}
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
