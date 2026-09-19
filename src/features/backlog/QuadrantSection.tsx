import { useEffect, useRef, type CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { Quadrant, Task } from "@/schemas/task";
import { QUADRANT_META } from "@/lib/quadrants";
import { cn } from "@/lib/utils";

interface QuadrantSectionProps {
  quadrant: Quadrant;
  tasks: Task[];
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * C-14 — Section accordéon d'un quadrant de la Réserve.
 *
 * Toujours rendue (même vide). L'état ouvert/fermé est piloté par le parent
 * (`BacklogPage`) pour garantir l'accordion strict. Le rendu des tâches est ici
 * un stub minimal (titre seul) ; story 4.2 le remplacera par `TaskItemBacklog`.
 */
export function QuadrantSection({
  quadrant,
  tasks,
  isOpen,
  onToggle,
}: QuadrantSectionProps) {
  const prefersReduced = useReducedMotion();
  const { label, Icon } = QUADRANT_META[quadrant];
  const count = tasks.length;

  const sectionRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  // À l'ouverture (déclenchée par l'utilisateur), ramène le début de la section
  // sous le header sticky pour révéler le haut de sa liste — utile quand on
  // déplie une section depuis le bas de la page.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!isOpen) return;

    const el = sectionRef.current;
    if (!el) return;

    // Compense la hauteur du header sticky pour ne pas masquer le titre.
    const stickyTop = document.querySelector<HTMLElement>(".reserve-page__top");
    el.style.scrollMarginTop = `${(stickyTop?.offsetHeight ?? 0) + 8}px`;

    // Attend la fin de l'animation expand/collapse (200ms) pour que la mise en
    // page soit stabilisée avant de scroller vers la position finale.
    const behavior: ScrollBehavior = prefersReduced ? "auto" : "smooth";
    const timer = window.setTimeout(
      () => el.scrollIntoView({ behavior, block: "start" }),
      prefersReduced ? 0 : 210,
    );
    return () => window.clearTimeout(timer);
  }, [isOpen, prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "quadrant-section",
        `quadrant-section--${quadrant}`,
        count === 0 && "quadrant-section--empty",
      )}
      style={
        {
          "--_q-color": `var(--color-quadrant-${quadrant})`,
          "--_q-surface": `var(--color-quadrant-${quadrant}-surface)`,
        } as CSSProperties
      }
    >
      <button
        type="button"
        className="quadrant-section__header"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={`${label} — ${count} tâches`}
      >
        <Icon
          size={16}
          aria-hidden="true"
          style={{ color: "var(--_q-color)" }}
        />
        <span className="quadrant-section__label">{label}</span>
        <span className="quadrant-section__counter">{count}</span>
        <ChevronDown
          size={16}
          className="quadrant-section__chevron"
          data-open={isOpen}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="quadrant-section__body"
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={prefersReduced ? {} : { height: "auto", opacity: 1 }}
            exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            {/* Le wrapper interne porte padding + divider pour qu'ils se
                collapsent avec la hauteur (sinon résidu de ~13px → flick). */}
            <div className="quadrant-section__body-inner">
              {count === 0 ? (
                <p className="quadrant-section__empty-text">Aucune tâche</p>
              ) : (
                <ul role="list">
                  {tasks.map((task) => (
                    // 4.2 → <TaskItemBacklog task={task} />
                    <li key={task.id} className="reserve-task-stub">
                      {task.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
