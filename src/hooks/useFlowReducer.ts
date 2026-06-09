import { useReducer } from "react";
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
  | { type: "GO_TO"; index: number }
  | { type: "RESET" };

const INITIAL_STATE: FlowReducerState = {
  history: ["aiguillage-q1"],
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
    case "GO_TO": {
      // Only navigate to a strictly past step; jumping to the current step or
      // forward is a no-op (you cannot skip ahead without answering).
      if (action.index < 0 || action.index >= state.history.length - 1) {
        return state;
      }
      return {
        history: state.history.slice(0, action.index + 1),
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

  const progressState = getProgressState(state.history);

  return {
    currentNode,
    currentQuestion,
    canGoBack,
    progressState,
    direction: state.direction,
    done: state.done,
    dispatch,
  };
}
