import { Brain } from "lucide-react";
import { EmptyState } from "@/shared/EmptyState/EmptyState";

export function InboxPage() {
  return (
    <EmptyState icon={Brain} message="Ta liste de tâches apparaitra ici" />
  );
}
