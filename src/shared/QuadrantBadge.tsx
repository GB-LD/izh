import { motion, useReducedMotion } from "motion/react";
import type { Quadrant } from "@/schemas/task";
import { QUADRANT_META } from "@/lib/quadrants";

interface QuadrantBadgeProps {
  quadrant: Quadrant;
  state?: "default" | "confirmed";
  subtitle?: string;
}

export function QuadrantBadge({
  quadrant,
  state = "default",
  subtitle,
}: QuadrantBadgeProps) {
  const { label, Icon, color } = QUADRANT_META[quadrant];
  const prefersReduced = useReducedMotion();
  const isConfirmed = state === "confirmed";

  const anim = !isConfirmed
    ? {}
    : prefersReduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
      : {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: {
            duration: 0.3,
            ease: [0.34, 1.56, 0.64, 1] as const,
          },
        };

  return (
    <motion.div
      className={`quadrant-badge quadrant-badge--${quadrant}${
        isConfirmed ? " quadrant-badge--confirmed" : ""
      }`}
      style={{ "--_q-color": color } as React.CSSProperties}
      {...(isConfirmed ? { role: "status", "aria-live": "polite" } : {})}
      {...anim}
    >
      <Icon size={14} aria-hidden="true" />
      <span className="quadrant-badge__label">{label}</span>
      {subtitle && <span className="quadrant-badge__subtitle">{subtitle}</span>}
    </motion.div>
  );
}
