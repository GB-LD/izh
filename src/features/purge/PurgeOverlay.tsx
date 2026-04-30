import { useUIStore } from "@/stores/useUIStore";
import { OverlayShell } from "@/shared/OverlayShell";

export function PurgeOverlay() {
  const isOpen = useUIStore((s) => s.activeOverlay === "purge");
  const { closeOverlay } = useUIStore.getState();

  return (
    <OverlayShell
      isOpen={isOpen}
      onClose={closeOverlay}
      variant="flow"
      aria-labelledby="purge-overlay-title"
    >
      <h2 id="purge-overlay-title">Purger les tâches</h2>
      <p>Contenu de la purge à venir.</p>
    </OverlayShell>
  );
}
