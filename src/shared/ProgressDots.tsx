import { motion, useReducedMotion } from "motion/react";

interface ProgressDotsProps {
  stepIndex: number;
  total: number;
}

export function ProgressDots({ stepIndex, total }: ProgressDotsProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="progress-dots"
      aria-label={`Question ${stepIndex + 1} sur ${total}`}
    >
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === stepIndex;
        const isCompleted = i < stepIndex;

        const dotClass = [
          "progress-dot",
          isActive ? "progress-dot--active" : "",
          isCompleted ? "progress-dot--completed" : "",
          !isActive && !isCompleted ? "progress-dot--upcoming" : "",
        ]
          .filter(Boolean)
          .join(" ");

        if (isActive) {
          return (
            <motion.div
              key={i}
              className={dotClass}
              animate={
                prefersReduced ? { opacity: [0, 1] } : { scale: [1, 1.25, 1] }
              }
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          );
        }

        return <div key={i} className={dotClass} />;
      })}
    </div>
  );
}
