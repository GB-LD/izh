import { useUIStore } from "@/stores/useUIStore";
import { OverlayShell } from "@/shared/OverlayShell";

export function SortingOverlay() {
  const isOpen = useUIStore((s) => s.activeOverlay === "sorting");
  const { closeOverlay } = useUIStore.getState();

  return (
    <OverlayShell
      isOpen={isOpen}
      onClose={closeOverlay}
      variant="flow"
      aria-labelledby="sorting-overlay-title"
    >
      <h2 id="sorting-overlay-title">Trier les tâches</h2>
      <p>Contenu du tri à venir.</p>
    </OverlayShell>
  );
}
