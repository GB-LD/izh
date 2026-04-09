import { validateAndLoad } from "@/lib/persistence";
import { z } from "zod";
import { create } from "zustand";
import { persist, type PersistStorage } from "zustand/middleware";
import { AnalyticsSchema } from "@/schemas/analytics";

type SurveyScore = {
  score: number;
  date: string;
};

type AnalyticsState = {
  surveyScores: SurveyScore[];
  lastSurveyDate: string | null;
  totalTasksCreated: number;
  totalTasksCompleted: number;
  totalFlowsCompleted: number;
};

type AnalyticsActions = {
  addSurveyScore: (score: SurveyScore) => void;
  startSession: () => void;
  trackTaskCreated: () => void;
  trackTaskCompleted: () => void;
  trackFlowCompleted: () => void;
};

const analyticsStorage: PersistStorage<AnalyticsState> = {
  getItem: (name) =>
    validateAndLoad(
      name,
      z.object({ state: AnalyticsSchema, version: z.number().optional() }),
    ),
  setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name) => localStorage.removeItem(name),
};

export const useAnalyticsStore = create<AnalyticsState & AnalyticsActions>()(
  persist(
    (set) => ({
      surveyScores: [],
      lastSurveyDate: null,
      totalTasksCreated: 0,
      totalTasksCompleted: 0,
      totalFlowsCompleted: 0,
      addSurveyScore: (surveyScore) =>
        set((s) => ({ surveyScores: [...s.surveyScores, surveyScore] })),
      startSession: () => set({ lastSurveyDate: new Date().toISOString() }),
      trackTaskCreated: () =>
        set((s) => ({ totalTasksCreated: s.totalTasksCreated + 1 })),
      trackTaskCompleted: () =>
        set((s) => ({ totalTasksCompleted: s.totalTasksCompleted + 1 })),
      trackFlowCompleted: () =>
        set((s) => ({ totalFlowsCompleted: s.totalFlowsCompleted + 1 })),
    }),
    {
      name: "izh-analytics",
      storage: analyticsStorage,
      partialize: (state) => ({
        surveyScores: state.surveyScores,
        lastSurveyDate: state.lastSurveyDate,
        totalTasksCreated: state.totalTasksCreated,
        totalTasksCompleted: state.totalTasksCompleted,
        totalFlowsCompleted: state.totalFlowsCompleted,
      }),
    },
  ),
);
