import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useTaskStore } from "@/stores/useTaskStore";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function CaptureInput({ classes = "" }: { classes?: string }) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const addTask = useTaskStore((s) => s.addTask);

  function submitTask() {
    const trimmedTitle = value.trim();
    if (!trimmedTitle) return;

    addTask(trimmedTitle);

    setValue("");
    inputRef.current?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitTask();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Escape") return;
    setValue("");
    inputRef.current?.blur();
  }

  function handleClear() {
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <form
      className={cn("input-capture", classes)}
      onSubmit={handleSubmit}
      aria-label="Capture rapide"
    >
      <Plus width={18} className="input-capture__icon" aria-hidden="true" />

      <input
        className="input input-capture__field"
        ref={inputRef}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ajouter une tâche..."
        aria-label="Ajouter une tâche"
        enterKeyHint="done"
        autoComplete="off"
        autoCorrect="off"
      />
      <button type="submit" hidden tabIndex={-1} aria-hidden="true">
        Soumettre
      </button>
      <button
        className={`input-capture__clear ${value.length > 0 ? "input-capture__clear--visible" : ""}`}
        type="button"
        onClick={handleClear}
        aria-label="Effacer le texte"
        aria-hidden={value.length === 0}
        tabIndex={value.length > 0 ? 0 : -1}
      >
        <X
          width={18}
          className="input-capture__clear-icon"
          aria-hidden="true"
        />
      </button>
    </form>
  );
}
