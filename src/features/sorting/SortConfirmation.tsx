import { useEffect, useRef } from "react";
import { TaskContextHeader } from "@/shared/TaskContextHeader";
import { QuadrantBadge } from "@/shared/QuadrantBadge";
import { QuadrantButton } from "@/shared/QuadrantButton";
import { Button } from "@/shared/Button";
import type { Quadrant } from "@/schemas/task";

const ALL_QUADRANTS: Quadrant[] = ["q1", "q2", "q3", "q4"];

interface SortConfirmationProps {
  taskTitle: string;
  proposedQuadrant: Quadrant;
  progress: { sorted: number; total: number };
  onConfirm: () => void;
  onOverride: (quadrant: Quadrant) => void;
}

export function SortConfirmation({
  taskTitle,
  proposedQuadrant,
  progress,
  onConfirm,
  onOverride,
}: SortConfirmationProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    confirmRef.current?.focus();
  }, []);

  const alternatives = ALL_QUADRANTS.filter((q) => q !== proposedQuadrant);

  return (
    <div className="result-card">
      <TaskContextHeader
        title={taskTitle}
        id="sorting-task-title"
        variant="result"
      />
      <div className="result-proposal">
        <p className="result-eyebrow">Ma proposition</p>
        <QuadrantBadge quadrant={proposedQuadrant} state="default" />
      </div>
      <Button ref={confirmRef} variant="primary" onClick={onConfirm}>
        Ça me parle
      </Button>

      <div className="sort-alt">
        <p className="result-card__subtle">Pas convaincu·e&nbsp;? Choisis :</p>
        <div className="result-card__alternatives">
          {alternatives.map((q) => (
            <QuadrantButton key={q} quadrant={q} onClick={onOverride} />
          ))}
        </div>
      </div>

      <p className="sort-progress">
        {progress.sorted}/{progress.total} triées
      </p>
    </div>
  );
}
