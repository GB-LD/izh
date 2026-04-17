import { GripVertical } from "lucide-react";
import type { Task } from "@/schemas/task";
import { Button } from "@/shared/Button";

interface TaskItemInboxProps {
  task: Task;
}

export function TaskItemInbox({ task }: TaskItemInboxProps) {
  return (
    <li className="task-item task-item-inbox">
      <GripVertical size={16} aria-hidden="true" className="task-item__grip" />
      <span className="task-item__title">{task.title}</span>
      <Button
        variant="secondary"
        size="xs"
        aria-label={`Trier "${task.title}"`}
      >
        Trier
      </Button>
    </li>
  );
}
