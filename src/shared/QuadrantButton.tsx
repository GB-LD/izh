import type { LucideIcon } from "lucide-react";
import { Zap, Calendar, Forward, X } from "lucide-react";
import type { Quadrant } from "@/schemas/task";
import { cn } from "@/lib/utils";

const QUADRANT_CONFIG: Record<
  Quadrant,
  { label: string; Icon: LucideIcon; color: string }
> = {
  q1: {
    label: "Faire maintenant",
    Icon: Zap,
    color: "var(--color-quadrant-q1)",
  },
  q2: {
    label: "Planifier",
    Icon: Calendar,
    color: "var(--color-quadrant-q2)",
  },
  q3: {
    label: "Déléguer",
    Icon: Forward,
    color: "var(--color-quadrant-q3)",
  },
  q4: {
    label: "Éliminer",
    Icon: X,
    color: "var(--color-quadrant-q4)",
  },
};

interface QuadrantButtonProps {
  quadrant: Quadrant;
  onClick: (quadrant: Quadrant) => void;
  disabled?: boolean;
  size?: "default" | "compact";
}

export function QuadrantButton({
  quadrant,
  onClick,
  disabled,
  size = "default",
}: QuadrantButtonProps) {
  const { label, Icon, color } = QUADRANT_CONFIG[quadrant];
  const isCompact = size === "compact";

  return (
    <button
      type="button"
      className={cn("quadrant-btn", isCompact && "quadrant-btn--compact")}
      style={{ "--_q-color": color } as React.CSSProperties}
      onClick={() => onClick(quadrant)}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-label={`Classer dans ${label}`}
    >
      <Icon
        size={isCompact ? 14 : 16}
        aria-hidden="true"
        className="quadrant-btn__icon"
      />
      <span className="quadrant-btn__label">{label}</span>
    </button>
  );
}
