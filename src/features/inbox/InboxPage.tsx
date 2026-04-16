import { useMemo } from "react";
import { useTaskStore } from "@/stores/useTaskStore";
import { CaptureInput } from "./CaptureInput";

export function InboxPage() {
  const tasks = useTaskStore((s) => s.tasks);

  const sortedInboxTasks = useMemo(
    () =>
      tasks
        .filter((task) => task.status === "inbox")
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
    [tasks],
  );

  return (
    <section aria-label="Vrac" className="w-11/12 mx-auto xl:w-3/5">
      <h1>Vrac</h1>
      <CaptureInput />

      {sortedInboxTasks.length === 0 ? (
        <p>Aucune tâche pour le moment.</p>
      ) : (
        <ul>
          {sortedInboxTasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
