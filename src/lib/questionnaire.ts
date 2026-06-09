import type { Quadrant, SourceFlux } from "@/schemas/task";

export type QuestionNode =
  | "aiguillage-q1"
  | "aiguillage-q2a"
  | "aiguillage-q2b"
  | "flux1"
  | "flux2-q1"
  | "flux2-q2a"
  | "flux2-q2b"
  | "flux3-q1"
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
  "aiguillage-q1": {
    text: "Cette tâche occupe ton esprit en ce moment ?",
    answers: [
      { label: "🔥 Oui, elle me revient souvent", next: "aiguillage-q2a" },
      { label: "💤 Non, elle traîne dans ma liste", next: "aiguillage-q2b" },
    ],
  },

  "aiguillage-q2a": {
    text: "Ce qui revient, c'est plutôt...",
    answers: [
      {
        label: "😬 Une pression — quelqu'un attend, ça doit être fait",
        next: "flux3-q1",
      },
      {
        label: "⏳ Un reproche — je sais que je devrais m'y mettre",
        next: "flux4-q1",
      },
    ],
  },

  "aiguillage-q2b": {
    text: "Pourquoi elle traîne ?",
    answers: [
      {
        label: "🤔 Je doute qu'elle soit vraiment importante pour moi",
        next: "flux2-q1",
      },
      {
        label: "🤷 Je ne me rappelle plus pourquoi je l'ai notée",
        next: "flux1",
      },
    ],
  },

  flux1: {
    text: "Si cette tâche n'était pas faite dans une semaine, que se passe-t-il ?",
    answers: [
      {
        label: "💥 Conséquence sérieuse : deadline ratée, projet bloqué",
        next: { quadrant: "q1", sourceFlux: "flux1" },
      },
      {
        label: "📉 Un objectif important a reculé",
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
    text: "Cette tâche contribue-t-elle directement à l'une de tes 3 priorités actuelles ?",
    answers: [
      { label: "Oui", next: "flux2-q2a" },
      { label: "Non", next: "flux2-q2b" },
      { label: "Pas de priorités définies", next: "flux1" },
    ],
  },

  "flux2-q2a": {
    text: "Y a-t-il une deadline ou quelqu'un qui attend cette tâche ?",
    answers: [
      { label: "Oui", next: { quadrant: "q1", sourceFlux: "flux2" } },
      { label: "Non", next: { quadrant: "q2", sourceFlux: "flux2" } },
    ],
  },

  "flux2-q2b": {
    text: "Cette tâche bloque quelqu'un d'autre ?",
    answers: [
      { label: "Oui", next: { quadrant: "q3", sourceFlux: "flux2" } },
      { label: "Non", next: { quadrant: "q4", sourceFlux: "flux2" } },
    ],
  },

  "flux3-q1": {
    text: "Si tu ignores cette tâche cette semaine, qu'est-ce qui se passe vraiment ?",
    answers: [
      {
        label: "🔔 Quelqu'un me relance, il y a une vraie conséquence",
        next: "flux3-q2a",
      },
      {
        label: "🤫 Rien, en fait personne ne dit rien",
        next: "flux3-q2b",
      },
    ],
  },

  "flux3-q2a": {
    text: "Cette conséquence touche un objectif essentiel pour toi ?",
    answers: [
      { label: "Oui", next: { quadrant: "q1", sourceFlux: "flux3" } },
      { label: "Non", next: { quadrant: "q3", sourceFlux: "flux3" } },
    ],
  },

  "flux3-q2b": {
    text: "Cette tâche, elle compte pour toi personnellement ?",
    answers: [
      { label: "Oui", next: { quadrant: "q2", sourceFlux: "flux3" } },
      { label: "Non", next: { quadrant: "q4", sourceFlux: "flux3" } },
    ],
  },

  "flux4-q1": {
    text: "Pense à une tâche que tu as repoussée plusieurs fois jusqu'à le regretter.\nCelle-ci, c'est le même genre ?",
    answers: [
      { label: "Oui", next: "flux4-q2a" },
      { label: "Non", next: "flux4-q2b" },
    ],
  },

  "flux4-q2a": {
    text: "Chaque semaine qui passe sans la faire aggrave la situation ?",
    answers: [
      { label: "Oui", next: { quadrant: "q1", sourceFlux: "flux4" } },
      { label: "Non", next: { quadrant: "q2", sourceFlux: "flux4" } },
    ],
  },

  "flux4-q2b": {
    text: "Quelqu'un dans ton entourage attend concrètement que tu la fasses ?",
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

export const AIGUILLAGE_NODES = new Set<QuestionNode>([
  "aiguillage-q1",
  "aiguillage-q2a",
  "aiguillage-q2b",
]);

// Every path is 2 routing ("aiguillage") questions + 1–2 flux questions, so the
// journey is at most 4 questions. We show a fixed 4-dot progress from the very
// first question; the shortest path (Flux 1 direct, 3 questions) ends at 3/4,
// leaving the last dot inactive.
const TOTAL_STEPS = 4;

export function getProgressState(history: QuestionNode[]): {
  stepIndex: number;
  totalSteps: number;
} {
  return {
    stepIndex: Math.min(history.length - 1, TOTAL_STEPS - 1),
    totalSteps: TOTAL_STEPS,
  };
}
