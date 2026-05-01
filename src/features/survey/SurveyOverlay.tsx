import { useUIStore } from "@/stores/useUIStore";
import { OverlayShell } from "@/shared/OverlayShell";

export function SurveyOverlay() {
  const isOpen = useUIStore((s) => s.activeOverlay === "survey");
  const { closeOverlay } = useUIStore.getState();

  return (
    <OverlayShell
      isOpen={isOpen}
      onClose={closeOverlay}
      variant="micro"
      aria-labelledby="survey-overlay-title"
    >
      <h2 id="survey-overlay-title">Micro-sondage</h2>
      <p>Questions à venir.</p>
    </OverlayShell>
  );
}
