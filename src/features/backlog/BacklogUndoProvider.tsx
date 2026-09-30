import { useCallback, useEffect, useState } from "react";
import type { Task } from "@/schemas/task";
import { useUndo } from "@/hooks/useUndo";
import { Toast } from "@/shared/Toast";
import { useTaskStore } from "@/stores/useTaskStore";
import { BacklogUndoContext } from "./useBacklogUndo";

function PendingDeletionToast({
  task,
  onRestored,
  closeOnEscape,
}: {
  task: Task;
  onRestored: () => void;
  closeOnEscape: boolean;
}) {
  const undoBacklogDeletion = useTaskStore(
    (state) => state.undoBacklogDeletion,
  );
  const finalizeBacklogDeletion = useTaskStore(
    (state) => state.finalizeBacklogDeletion,
  );
  const handleExpire = useCallback(
    () => finalizeBacklogDeletion(task.id),
    [finalizeBacklogDeletion, task.id],
  );
  const undo = useUndo<Task>(undefined, handleExpire);
  const startUndo = undo.start;

  useEffect(() => {
    startUndo(task);
  }, [task, startUndo]);

  if (!undo.pending) return null;

  return (
    <Toast
      stacked
      closeOnEscape={closeOnEscape}
      variant="undo"
      message={`Tâche supprimée : ${task.title}`}
      taskTitle={task.title}
      remainingMs={undo.remainingMs}
      onPause={undo.pause}
      onResume={undo.resume}
      onClose={() => {
        undo.clear();
        finalizeBacklogDeletion(task.id);
      }}
      onUndo={() => {
        const deletedTask = undo.undo();
        if (deletedTask && undoBacklogDeletion(deletedTask.id)) onRestored();
      }}
    />
  );
}

export function BacklogUndoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const stageBacklogDeletion = useTaskStore(
    (state) => state.stageBacklogDeletion,
  );
  const pendingDeletions = useTaskStore(
    (state) => state.pendingBacklogDeletions,
  );
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    if (!showRestored) return;
    const timer = window.setTimeout(() => setShowRestored(false), 1500);
    return () => window.clearTimeout(timer);
  }, [showRestored]);

  function deleteTask(task: Task) {
    if (stageBacklogDeletion(task.id)) setShowRestored(false);
  }

  return (
    <BacklogUndoContext.Provider
      value={{ deleteTask, hasPendingDeletion: pendingDeletions.length > 0 }}
    >
      {children}
      {pendingDeletions.length > 0 && (
        <div className="toast-stack" aria-label="Suppressions annulables">
          {[...pendingDeletions].reverse().map((task, index) => (
            <PendingDeletionToast
              key={task.id}
              task={task}
              closeOnEscape={index === 0}
              onRestored={() => setShowRestored(true)}
            />
          ))}
        </div>
      )}
      {pendingDeletions.length === 0 && showRestored && (
        <Toast message="Annulé !" />
      )}
    </BacklogUndoContext.Provider>
  );
}
