import { useReducer, useMemo } from "react";
import {
  QUESTIONNAIRE,
  getProgressState,
  isTerminal,
} from "@/lib/questionnaire";
import type {
  QuestionNode,
  TerminalResult,
  AnswerConfig,
} from "@/lib/questionnaire";

type FlowReducerState = {
  history: QuestionNode[];
  direction: "forward" | "backward";
  done: TerminalResult | null;
};

type FlowAction =
  | { type: "ANSWER"; answer: AnswerConfig }
  | { type: "BACK" }
  | { type: "RESET" };

const INITIAL_STATE: FlowReducerState = {
  history: ["aiguillage"],
  direction: "forward",
  done: null,
};

function reducer(
  state: FlowReducerState,
  action: FlowAction,
): FlowReducerState {
  switch (action.type) {
    case "ANSWER": {
      const { next } = action.answer;
      if (isTerminal(next)) {
        return { ...state, done: next, direction: "forward" };
      }
      return {
        history: [...state.history, next],
        direction: "forward",
        done: null,
      };
    }
    case "BACK": {
      if (state.history.length <= 1) return state;
      return {
        history: state.history.slice(0, -1),
        direction: "backward",
        done: null,
      };
    }
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
}

export function useFlowReducer() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const currentNode = state.history[state.history.length - 1];
  const currentQuestion = QUESTIONNAIRE[currentNode];
  const canGoBack = state.history.length > 1;

  const previousAnswer = useMemo<AnswerConfig | null>(() => {
    if (state.history.length < 2) return null;
    const prevNode = state.history[state.history.length - 2];
    const prevQuestion = QUESTIONNAIRE[prevNode];
    return (
      prevQuestion.answers.find(
        (a) => !isTerminal(a.next) && a.next === currentNode,
      ) ?? null
    );
  }, [state.history, currentNode]);

  const progressState = getProgressState(currentNode, state.history);

  return {
    currentNode,
    currentQuestion,
    canGoBack,
    previousAnswer,
    progressState,
    direction: state.direction,
    done: state.done,
    dispatch,
  };
}
