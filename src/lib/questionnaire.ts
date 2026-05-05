import type { Quadrant, SourceFlux } from "@/schemas/task";

export type QuestionNode =
  | "aiguillage"
  | "flux1"
  | "flux2-q1"
  | "flux2-q2a"
  | "flux2-q2b"
  | "flux3-q1"
  | "flux3-rebond"
  | "flux3-q2a"
  | "flux3-q2b"
  | "flux4-q1"
  | "flux4-q2a"
  | "flux4-q2b";

export type TerminalResult = { quadrant: Quadrant; sourceFlux: SourceFlux };
export type AnswerConfig = {
  label: string;
  next: QuestionNode | TerminalResult;
};
export type QuestionConfig = { text: string; answers: AnswerConfig[] };

export const QUESTIONNAIRE: Record<QuestionNode, QuestionConfig> = {
  aiguillage: {
    text: "Comment tu vis cette tâche en ce moment ?",
    answers: [
      { label: "😬 Je me sens obligé·e de la faire", next: "flux3-q1" },
      {
        label: "⏳ C'est important mais je la repousse toujours",
        next: "flux4-q1",
      },
      { label: "🤔 Pas sûr·e que ce soit prioritaire", next: "flux2-q1" },
      {
        label: "🤷 Je sais pas ce qui se passe si je le fais pas",
        next: "flux1",
      },
    ],
  },
  flux1: {
    text: "Imagine que tu ne l'as pas faite dans une semaine. Que s'est-il passé ?",
    answers: [
      {
        label: "💥 Deadline explosée, quelqu'un bloqué",
        next: { quadrant: "q1", sourceFlux: "flux1" },
      },
      {
        label: "📉 Objectif important a reculé",
        next: { quadrant: "q2", sourceFlux: "flux1" },
      },
      {
        label: "😬 Quelqu'un a été gêné",
        next: { quadrant: "q3", sourceFlux: "flux1" },
      },
      {
        label: "🤷 Pas grand chose",
        next: { quadrant: "q4", sourceFlux: "flux1" },
      },
    ],
  },
  "flux2-q1": {
    text: "Elle contribue directement à l'une de tes 3 priorités actuelles ?",
    answers: [
      { label: "Oui", next: "flux2-q2a" },
      { label: "Non", next: "flux2-q2b" },
      { label: "Pas de priorités définies", next: "flux1" },
    ],
  },
  "flux2-q2a": {
    text: "Contrainte de temps externe — deadline, fenêtre qui se ferme ?",
    answers: [
      { label: "Oui", next: { quadrant: "q1", sourceFlux: "flux2" } },
      { label: "Non", next: { quadrant: "q2", sourceFlux: "flux2" } },
    ],
  },
  "flux2-q2b": {
    text: "Quelqu'un d'autre est bloqué sans toi ?",
    answers: [
      { label: "Oui", next: { quadrant: "q3", sourceFlux: "flux2" } },
      { label: "Non", next: { quadrant: "q4", sourceFlux: "flux2" } },
    ],
  },
  "flux3-q1": {
    text: "D'où vient ce sentiment d'obligation ?",
    answers: [
      { label: "Externe — deadline, contrat", next: "flux3-q2a" },
      { label: "Interne — culpabilité, peur", next: "flux3-q2b" },
      { label: "Je sais pas", next: "flux3-rebond" },
    ],
  },
  "flux3-rebond": {
    text: "Si tu ignores cette semaine — quelqu'un te relance, ou il ne se passe rien ?",
    answers: [
      { label: "On me relance", next: "flux3-q2a" },
      { label: "Rien", next: "flux3-q2b" },
    ],
  },
  "flux3-q2a": {
    text: "Si elle disparaissait, un objectif essentiel serait compromis ?",
    answers: [
      { label: "Oui", next: { quadrant: "q1", sourceFlux: "flux3" } },
      { label: "Non", next: { quadrant: "q3", sourceFlux: "flux3" } },
    ],
  },
  "flux3-q2b": {
    text: "Ça compte vraiment pour toi — pas pour les autres ?",
    answers: [
      { label: "Oui", next: { quadrant: "q2", sourceFlux: "flux3" } },
      { label: "Non", next: { quadrant: "q4", sourceFlux: "flux3" } },
    ],
  },
  "flux4-q1": {
    text: "Pense à quelque chose que tu as évité l'année dernière et que tu regrettes. Cette tâche ressemble à ça ?",
    answers: [
      { label: "Oui", next: "flux4-q2a" },
      { label: "Non", next: "flux4-q2b" },
    ],
  },
  "flux4-q2a": {
    text: "Chaque semaine sans le faire aggrave la situation ?",
    answers: [
      { label: "Oui", next: { quadrant: "q1", sourceFlux: "flux4" } },
      { label: "Non", next: { quadrant: "q2", sourceFlux: "flux4" } },
    ],
  },
  "flux4-q2b": {
    text: "Quelqu'un attend concrètement que tu le fasses ?",
    answers: [
      { label: "Oui", next: { quadrant: "q3", sourceFlux: "flux4" } },
      { label: "Non", next: { quadrant: "q4", sourceFlux: "flux4" } },
    ],
  },
};

export function isTerminal(
  next: QuestionNode | TerminalResult,
): next is TerminalResult {
  return typeof next !== "string";
}

const FLUX_ENTRY_NODES = new Set<QuestionNode>([
  "flux1",
  "flux2-q1",
  "flux3-q1",
  "flux4-q1",
]);

const FLUX_MAX_STEPS: Partial<Record<QuestionNode, number>> = {
  flux1: 1,
  "flux2-q1": 2,
  "flux3-q1": 3,
  "flux4-q1": 2,
};

export function getProgressState(
  currentNode: QuestionNode,
  history: QuestionNode[],
): { stepIndex: number; totalSteps: number } | null {
  if (currentNode === "aiguillage") return null;

  const fluxEntryIdx = history.findIndex((n) => FLUX_ENTRY_NODES.has(n));
  if (fluxEntryIdx === -1) return null;

  const fluxEntryNode = history[fluxEntryIdx];
  const totalSteps = FLUX_MAX_STEPS[fluxEntryNode] ?? 1;
  const stepIndex = history.length - fluxEntryIdx;

  return { stepIndex: Math.min(stepIndex, totalSteps - 1), totalSteps };
}
