import { create } from "zustand";
import type { Flux } from "@/schemas/flow";

type FlowState = {
  taskId: string | null;
  isActive: boolean;
  currentFlux: Flux | null;
  currentStep: number;
  answers: string[];
};

type FlowActions = {
  startFlow: (taskId: string) => void;
  setFlux: (flux: Flux) => void;
  nextStep: (answer: string) => void;
  prevStep: () => void;
  resetFlow: () => void;
};

const INITIAL_FLOW_STATE = {
  taskId: null,
  isActive: false,
  currentFlux: null,
  currentStep: 0,
  answers: [],
};

export const useFlowStore = create<FlowState & FlowActions>()((set) => ({
  ...INITIAL_FLOW_STATE,
  startFlow: (taskId) => set({ ...INITIAL_FLOW_STATE, taskId, isActive: true }),
  setFlux: (flux) => set({ currentFlux: flux }),
  nextStep: (answer) =>
    set((s) => ({
      currentStep: s.currentStep + 1,
      answers: [...s.answers, answer],
    })),
  prevStep: () =>
    set((s) => {
      if (s.currentStep >= 1) {
        return { currentStep: s.currentStep - 1 };
      } else {
        return { currentStep: 0 };
      }
    }),
  resetFlow: () => set(INITIAL_FLOW_STATE),
}));
