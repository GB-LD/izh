import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, PartyPopper } from "lucide-react";
import { TaskContextHeader } from "@/shared/TaskContextHeader";
import { QuadrantBadge } from "@/shared/QuadrantBadge";
import { Button } from "@/shared/Button";
import { QUADRANT_DESCRIPTOR } from "@/lib/quadrants";
import type { Task } from "@/schemas/task";

// How long the confirmation badge stays on screen before the terminal
// celebration replaces it (SCR-05 vrac-empty).
const CELEBRATION_HOLD_MS = 1000;

interface SortResultProps {
  task: Task;
  progress: { sorted: number; total: number };
  vracEmpty: boolean;
  onNextTask: () => void;
  onSeeReserve: () => void;
}

export function SortResult({
  task,
  progress,
  vracEmpty,
  onNextTask,
  onSeeReserve,
}: SortResultProps) {
  const prefersReduced = useReducedMotion();
  const [celebrate, setCelebrate] = useState(false);
  const showCelebration = vracEmpty && celebrate;

  const nextRef = useRef<HTMLButtonElement>(null);
  const reserveRef = useRef<HTMLButtonElement>(null);

  // Vrac vidé : on laisse le badge de confirmation un court instant (le feedback
  // de l'action), puis la tâche + le badge s'effacent au profit de la
  // célébration « Tout est trié ! » — deux temps de lecture distincts.
  useEffect(() => {
    if (!vracEmpty) return;
    const timer = setTimeout(() => setCelebrate(true), CELEBRATION_HOLD_MS);
    return () => clearTimeout(timer);
  }, [vracEmpty]);

  // Focus le premier élément actionnable de l'étape visible.
  useEffect(() => {
    if (!vracEmpty) nextRef.current?.focus();
    else if (showCelebration) reserveRef.current?.focus();
  }, [vracEmpty, showCelebration]);

  if (showCelebration) {
    return (
      <div className="result-card" role="status">
        <motion.div
          className="result-state"
          {...(prefersReduced
            ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
            : {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.35, ease: "easeOut" as const },
              })}
        >
          <span className="result-medallion result-medallion--success">
            <PartyPopper size={30} aria-hidden="true" />
          </span>
          <h2 className="result-state__title">Tout est trié&nbsp;!</h2>
          <p className="result-state__subtitle">
            Ta liste est vide. Profite du calme — ou parcours ta Réserve.
          </p>
          <div className="result-state__actions">
            <Button ref={reserveRef} variant="primary" onClick={onSeeReserve}>
              Voir la Réserve
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Reached only after classification, so quadrant is always set; guard makes
  // the invariant explicit instead of asserting non-null at each use site.
  const { quadrant } = task;
  if (!quadrant) return null;

  return (
    <div className="result-card">
      <TaskContextHeader
        title={task.title}
        id="sorting-task-title"
        variant="result"
      />
      <QuadrantBadge
        quadrant={quadrant}
        state="confirmed"
        subtitle={QUADRANT_DESCRIPTOR[quadrant]}
      />
      {!vracEmpty && (
        <>
          <Button ref={nextRef} variant="primary" onClick={onNextTask}>
            Tâche suivante <ArrowRight size={12} aria-hidden="true" />
          </Button>
          <Button variant="text" onClick={onSeeReserve}>
            Voir la Réserve
          </Button>
          <p className="sort-progress">
            {progress.sorted}/{progress.total} triées
          </p>
        </>
      )}
    </div>
  );
}
