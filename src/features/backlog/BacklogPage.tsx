import { Inbox } from "lucide-react";
import { EmptyState } from "@/shared/EmptyState/EmptyState";

export function BacklogPage() {
  return (
    <EmptyState icon={Inbox} message="Tes tâches triées apparaîtront ici" />
  );
}
