import type { Quadrant } from "@/schemas/task";
import { QUADRANT_META } from "@/lib/quadrants";
import { cn } from "@/lib/utils";

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
  const { label, Icon, color } = QUADRANT_META[quadrant];
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
