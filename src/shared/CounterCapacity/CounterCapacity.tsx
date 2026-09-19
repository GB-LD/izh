import { cn } from "@/lib/utils";
import { MAX_BACKLOG_SIZE } from "@/lib/constants";

export const RESERVE_COUNTER_MESSAGE =
  "Tes tâches triées attendent ici, active celles que tu veux faire";

const WARNING_THRESHOLD = 35;

function capacityVariant(count: number, max: number) {
  if (count >= max) return "error" as const;
  if (count >= WARNING_THRESHOLD) return "warning" as const;
  return "default" as const;
}

interface CapacityRatioProps {
  count: number;
  max?: number;
  className?: string;
}

/**
 * Ratio `count/max` de la Réserve (C-15), coloré selon le seuil
 * (default / warning ≥ 35 / error = max). La taille de police est héritée du
 * contexte parent ; le composant ne gère que la couleur + le poids.
 */
export function CapacityRatio({
  count,
  max = MAX_BACKLOG_SIZE,
  className,
}: CapacityRatioProps) {
  const variant = capacityVariant(count, max);

  return (
    <span
      className={cn(
        "capacity-ratio",
        variant !== "default" && `capacity-ratio--${variant}`,
        className,
      )}
    >
      {count}/{max}
    </span>
  );
}

interface CounterCapacityProps {
  count: number;
  max?: number;
  message?: string;
  classes?: string;
}

/**
 * C-15 — Compteur de capacité inline : `{message} · {count}/{max}` sur une seule
 * ligne. Le conteneur est une région live unique, afin que les lecteurs d'écran
 * annoncent le contexte et le ratio ensemble lors d'une mise à jour.
 */
export function CounterCapacity({
  count,
  max = MAX_BACKLOG_SIZE,
  message = RESERVE_COUNTER_MESSAGE,
  classes,
}: CounterCapacityProps) {
  return (
    <p
      className={cn("counter-capacity", classes)}
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
      {" · "}
      <CapacityRatio count={count} max={max} />
    </p>
  );
}
