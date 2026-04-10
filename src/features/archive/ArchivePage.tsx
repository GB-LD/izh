import { Archive } from "lucide-react";
import { EmptyState } from "@/shared/EmptyState/EmptyState";

export function ArchivePage() {
  return (
    <EmptyState
      icon={Archive}
      message="Tes tâches complétées apparaîtront ici"
    />
  );
}
