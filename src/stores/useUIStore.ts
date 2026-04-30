import { create } from "zustand";
import type { Quadrant } from "@/schemas/task";

type UIStoreState = {
  activeOverlay: "sorting" | "purge" | "survey" | null;
  activeFocusQuadrant: Quadrant | null;
  onboardingFlags: Record<string, boolean>;
};

type UIStoreActions = {
  openOverlay: (id: "sorting" | "purge" | "survey") => void;
  closeOverlay: () => void;
  setActiveFocusQuadrant: (q: Quadrant) => void;
  markOnboardingDone: (key: string) => void;
};

export const useUIStore = create<UIStoreState & UIStoreActions>()((set) => ({
  activeOverlay: null,
  activeFocusQuadrant: null,
  onboardingFlags: {},
  openOverlay: (id: "sorting" | "purge" | "survey") =>
    set({ activeOverlay: id }),
  closeOverlay: () => set({ activeOverlay: null }),
  setActiveFocusQuadrant: (q: Quadrant) => set({ activeFocusQuadrant: q }),
  markOnboardingDone: (key) =>
    set((s) => ({ onboardingFlags: { ...s.onboardingFlags, [key]: true } })),
}));
