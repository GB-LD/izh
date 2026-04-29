import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStickyState } from "@/hooks/useStickyState";
import { useTaskStore } from "@/stores/useTaskStore";
import { CaptureInput } from "./CaptureInput";
import { TaskItemInbox } from "./TaskItemInbox";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/shared/EmptyState/EmptyState";
import { Brain } from "lucide-react";

export function InboxPage() {
  const { sentinelRef, isStuck: isTopStuck } = useStickyState<HTMLDivElement>();

  const inboxTasks = useTaskStore(
    useShallow((s) => s.tasks.filter((task) => task.status === "inbox")),
  );

  const inboxCount = inboxTasks.length;

  const sortedInboxTasks = useMemo(
    () =>
      [...inboxTasks].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [inboxTasks],
  );

  return (
    <section aria-label="Liste des tâches à trier" className="inbox-page">
      <div
        ref={sentinelRef}
        className="inbox-page__sticky-sentinel"
        aria-hidden="true"
      />

      <div
        className={cn(
          "inbox-page__top",
          isTopStuck && "inbox-page__top--stuck",
        )}
      >
        <header className="inbox-page__header inbox-page__container">
          <h1 className="inbox-page__title">Liste</h1>
          <p aria-live="polite" aria-atomic="true">
            {inboxCount} tâche{inboxCount !== 1 ? "s" : ""} à trier
          </p>
        </header>
        <CaptureInput classes="inbox-page__container" />
      </div>
      <div className="inbox-page__body">
        {sortedInboxTasks.length === 0 ? (
          <EmptyState
            icon={Brain}
            message={
              "Aucune tâche pour le moment.\nAjoute ce que tu as en tête pour te libérer l'esprit !"
            }
            classes="w-4/5 mt-32"
          />
        ) : (
          <ul className="inbox-page__list inbox-page__container" role="list">
            {sortedInboxTasks.map((task) => (
              <TaskItemInbox key={task.id} task={task} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
