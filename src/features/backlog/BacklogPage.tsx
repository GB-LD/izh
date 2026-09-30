import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Layers } from "lucide-react";
import { useTaskStore } from "@/stores/useTaskStore";
import type { Quadrant } from "@/schemas/task";
import { useStickyState } from "@/hooks/useStickyState";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/shared/EmptyState/EmptyState";
import { CounterCapacity } from "@/shared/CounterCapacity/CounterCapacity";
import { QuadrantSection } from "./QuadrantSection";
import { Toast } from "@/shared/Toast";
import { useBacklogUndo } from "./useBacklogUndo";

const QUADRANTS: Quadrant[] = ["q1", "q2", "q3", "q4"];

export function BacklogPage() {
  const { sentinelRef, isStuck: isTopStuck } = useStickyState<HTMLDivElement>();
  const [openQuadrant, setOpenQuadrant] = useState<Quadrant | null>("q1");
  const [revealedDeleteTaskId, setRevealedDeleteTaskId] = useState<
    string | null
  >(null);
  const [confirmationToast, setConfirmationToast] = useState(false);
  const { deleteTask, hasPendingDeletion } = useBacklogUndo();

  useEffect(() => {
    if (!confirmationToast) return;
    const timer = window.setTimeout(() => setConfirmationToast(false), 3000);
    return () => window.clearTimeout(timer);
  }, [confirmationToast]);

  useEffect(() => {
    if (!revealedDeleteTaskId) return;

    function closeOnOutsideClick(event: MouseEvent) {
      const target = event.target;
      if (
        target instanceof Element &&
        target
          .closest("[data-delete-action]")
          ?.closest("[data-task-id]")
          ?.getAttribute("data-task-id") === revealedDeleteTaskId
      ) {
        return;
      }
      setRevealedDeleteTaskId(null);
    }

    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, [revealedDeleteTaskId]);

  const backlogTasks = useTaskStore(
    useShallow((s) => s.tasks.filter((t) => t.status === "backlog")),
  );
  const backlogCapacityCount = useTaskStore((s) => s.getBacklogCapacityCount());

  const byQuadrant = useMemo(() => {
    const groups: Record<Quadrant, typeof backlogTasks> = {
      q1: [],
      q2: [],
      q3: [],
      q4: [],
    };
    for (const task of backlogTasks) {
      if (task.quadrant) groups[task.quadrant].push(task);
    }
    for (const quadrant of QUADRANTS) {
      groups[quadrant].sort(
        (a, b) =>
          a.position - b.position ||
          a.createdAt.localeCompare(b.createdAt) ||
          a.id.localeCompare(b.id),
      );
    }
    return groups;
  }, [backlogTasks]);

  const backlogCount = backlogTasks.length;

  return (
    <section aria-label="Réserve" className="reserve-page">
      <div
        ref={sentinelRef}
        className="reserve-page__sticky-sentinel"
        aria-hidden="true"
      />

      <div
        className={cn(
          "reserve-page__top",
          isTopStuck && "reserve-page__top--stuck",
        )}
      >
        <header className="reserve-page__header reserve-page__container">
          <h1 className="reserve-page__title">Réserve</h1>
          <CounterCapacity count={backlogCapacityCount} />
        </header>
      </div>

      <div className="reserve-page__body">
        {backlogCount === 0 ? (
          <EmptyState
            icon={Layers}
            message="Trie tes premières tâches depuis le Vrac"
            cta={{ label: "Aller au Vrac", to: "/" }}
            classes="w-4/5 mt-32"
          />
        ) : (
          <div className="reserve-page__list reserve-page__container">
            {QUADRANTS.map((quadrant) => (
              <QuadrantSection
                key={quadrant}
                quadrant={quadrant}
                tasks={byQuadrant[quadrant]}
                isOpen={openQuadrant === quadrant}
                revealedDeleteTaskId={revealedDeleteTaskId}
                onDeleteRevealChange={setRevealedDeleteTaskId}
                onToggle={() => {
                  setRevealedDeleteTaskId(null);
                  setOpenQuadrant((prev) =>
                    prev === quadrant ? null : quadrant,
                  );
                }}
                onActivated={() => {
                  setRevealedDeleteTaskId(null);
                  if (!hasPendingDeletion) setConfirmationToast(true);
                }}
                onDelete={(task) => {
                  setRevealedDeleteTaskId(null);
                  setConfirmationToast(false);
                  deleteTask(task);
                }}
              />
            ))}
          </div>
        )}
      </div>
      {!hasPendingDeletion && confirmationToast && (
        <Toast message="Ajoutée à ton Focus" />
      )}
    </section>
  );
}
