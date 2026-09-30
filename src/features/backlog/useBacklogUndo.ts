import { createContext, useContext } from "react";
import type { Task } from "@/schemas/task";

interface BacklogUndoContextValue {
  deleteTask: (task: Task) => void;
  hasPendingDeletion: boolean;
}

export const BacklogUndoContext = createContext<BacklogUndoContextValue | null>(
  null,
);

export function useBacklogUndo() {
  const context = useContext(BacklogUndoContext);
  if (!context) throw new Error("BacklogUndoProvider is missing");
  return context;
}
