import { Target } from "lucide-react";
import { EmptyState } from "@/shared/EmptyState/EmptyState";

export function FocusPage() {
  return (
    <EmptyState icon={Target} message="Tes tâches actives apparaîtront ici" />
  );
}
