import type { LucideIcon } from "lucide-react";
import { Zap, Calendar, Forward, X } from "lucide-react";
import type { Quadrant } from "@/schemas/task";

export const QUADRANT_META: Record<
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

export const QUADRANT_DESCRIPTOR: Record<Quadrant, string> = {
  q1: "Urgent & Important",
  q2: "Important, pas urgent",
  q3: "Urgent, pas important",
  q4: "Ni urgent, ni important",
};
