import { create } from "zustand";
import { persist, type PersistStorage } from "zustand/middleware";
import { z } from "zod";
import { MAX_BACKLOG_SIZE } from "@/lib/constants";
import { validateAndLoad } from "@/lib/persistence";
import { createUuidV4 } from "@/lib/uuid";
import { TaskSchemaList } from "@/schemas/task";
import type {
  Task,
  Quadrant,
  SourceFlux,
  ClassificationMethod,
} from "@/schemas/task";

type TaskState = {
  tasks: Task[];
};

type TaskSelectors = {
  getInboxTasks: () => Task[];
  getBacklogTasks: () => Task[];
  getActiveTasks: () => Task[];
  getArchivedTasks: () => Task[];
  getBacklogCount: () => number;
  getQuadrantTasks: (quadrant: Quadrant) => Task[];
};

type TaskActions = {
  addTask: (taskTitle: string) => void;
  updateTask: (
    taskId: string,
    taskPatch: Partial<
      Omit<Task, "id" | "createdAt" | "classifiedAt" | "completedAt">
    >,
  ) => void;
  deleteTask: (id: string) => void;
  classifyTask: (
    id: string,
    quadrant: Quadrant,
    classificationMethod: ClassificationMethod,
    sourceFlux?: SourceFlux,
  ) => void;
  activateTask: (id: string) => void;
  completeTask: (id: string) => void;
  undoComplete: (id: string) => void;
};

const taskStorage: PersistStorage<TaskState> = {
  getItem: (name) => {
    try {
      return validateAndLoad(
        name,
        z.object({
          state: z.object({ tasks: TaskSchemaList }),
          version: z.number().optional(),
        }),
      );
    } catch (error) {
      console.warn(`task storage read failed for ${name}:`, error);
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch (error) {
      console.warn("task storage write failed for", name, ":", error);
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.warn("task storage remove failed for", name, ":", error);
    }
  },
};

export const useTaskStore = create<TaskState & TaskSelectors & TaskActions>()(
  persist(
    (set, get) => ({
      // store state
      tasks: [],

      // store actions
      addTask: (taskTitle) =>
        set((s) => {
          const newTask: Task = {
            id: createUuidV4(),
            title: taskTitle,
            status: "inbox",
            quadrant: null,
            createdAt: new Date().toISOString(),
            classifiedAt: null,
            completedAt: null,
            flowDurationMs: null,
            sourceFlux: null,
            classificationMethod: null,
            userOverride: null,
            position: s.tasks.filter((t) => t.status === "inbox").length + 1,
          };
          return { tasks: [...s.tasks, newTask] };
        }),
      updateTask: (taskId, taskPatch) =>
        set((s) => {
          const updatedTasks = s.tasks.map((t) =>
            t.id === taskId ? { ...t, ...taskPatch } : t,
          );
          return { tasks: updatedTasks };
        }),
      deleteTask: (taskId: string) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== taskId) })),
      classifyTask: (id, quadrant, classificationMethod, sourceFlux) =>
        set((s) => {
          if (
            s.tasks.filter((t) => t.status === "backlog").length >=
            MAX_BACKLOG_SIZE
          )
            return s;
          const updatedTasks = s.tasks.map((t) =>
            t.id === id
              ? ({
                  ...t,
                  status: "backlog",
                  quadrant,
                  classificationMethod,
                  sourceFlux: sourceFlux ?? null,
                  classifiedAt: new Date().toISOString(),
                } satisfies Task)
              : t,
          );
          return { tasks: updatedTasks };
        }),
      activateTask: (taskId) =>
        set((s) => {
          const updatedTasks = s.tasks.map((t) =>
            t.id === taskId ? ({ ...t, status: "active" } satisfies Task) : t,
          );
          return { tasks: updatedTasks };
        }),
      completeTask: (taskId) =>
        set((s) => {
          const updatedTasks = s.tasks.map((t) =>
            t.id === taskId
              ? ({
                  ...t,
                  status: "archived",
                  completedAt: new Date().toISOString(),
                } satisfies Task)
              : t,
          );
          return { tasks: updatedTasks };
        }),
      undoComplete: (taskId) =>
        set((s) => {
          const updatedTasks = s.tasks.map((t) =>
            t.id === taskId
              ? ({
                  ...t,
                  status: "active",
                  completedAt: null,
                } satisfies Task)
              : t,
          );
          return { tasks: updatedTasks };
        }),

      /**
       * Store getters for imperative/non-reactive access only.
       *
       * Do NOT use these as React selectors, e.g.
       * `useTaskStore((state) => state.getInboxTasks())`.
       *
       * These getters call `filter(...)`, which creates a new array on every
       * invocation. In React, that means the selector result will get a new
       * reference on every store update and can trigger unnecessary re-renders.
       *
       * Correct imperative usage:
       * `const inboxTasks = useTaskStore.getState().getInboxTasks()`
       *
       * Correct React usage (as in navigation components):
       * `const tasks = useTaskStore((state) => state.tasks)`
       * `const inboxTasks = useMemo(
       *   () => tasks.filter((t) => t.status === "inbox"),
       *   [tasks],
       * )`
       */
      getInboxTasks: () => get().tasks.filter((t) => t.status === "inbox"),
      getBacklogTasks: () => get().tasks.filter((t) => t.status === "backlog"),
      getActiveTasks: () => get().tasks.filter((t) => t.status === "active"),
      getArchivedTasks: () =>
        get().tasks.filter((t) => t.status === "archived"),
      getBacklogCount: () =>
        get().tasks.filter((t) => t.status === "backlog").length,
      getQuadrantTasks: (quadrant) =>
        get().tasks.filter((t) => t.quadrant === quadrant),
    }),
    {
      name: "izh-tasks",
      storage: taskStorage,
      partialize: (state) => ({
        tasks: state.tasks,
      }),
    },
  ),
);
