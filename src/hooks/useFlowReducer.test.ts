import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useFlowReducer } from "./useFlowReducer";
import { getProgressState } from "@/lib/questionnaire";

function setup() {
  return renderHook(() => useFlowReducer());
}

describe("useFlowReducer", () => {
  it("starts at aiguillage-q1", () => {
    const { result } = setup();
    expect(result.current.currentNode).toBe("aiguillage-q1");
    expect(result.current.canGoBack).toBe(false);
    expect(result.current.done).toBeNull();
  });

  it("ANSWER forward — advances to correct node", () => {
    const { result } = setup();
    const answer = result.current.currentQuestion.answers[0]; // 🔥 → aiguillage-q2a
    act(() => {
      result.current.dispatch({ type: "ANSWER", answer });
    });
    expect(result.current.currentNode).toBe("aiguillage-q2a");
    expect(result.current.direction).toBe("forward");
    expect(result.current.canGoBack).toBe(true);
  });

  it("ANSWER terminal — sets done, no new node in history", () => {
    const { result } = setup();
    // aiguillage-q1 → aiguillage-q2b (💤)
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[1],
      });
    });
    // aiguillage-q2b → flux1 (🤷)
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[1],
      });
    });
    expect(result.current.currentNode).toBe("flux1");
    // Answer first terminal answer in flux1
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[0], // 💥 → q1
      });
    });
    expect(result.current.done).toEqual({
      quadrant: "q1",
      sourceFlux: "flux1",
    });
    expect(result.current.currentNode).toBe("flux1"); // history unchanged
  });

  it("BACK — removes last node, direction backward", () => {
    const { result } = setup();
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[0], // → aiguillage-q2a
      });
    });
    expect(result.current.currentNode).toBe("aiguillage-q2a");
    act(() => {
      result.current.dispatch({ type: "BACK" });
    });
    expect(result.current.currentNode).toBe("aiguillage-q1");
    expect(result.current.direction).toBe("backward");
    expect(result.current.canGoBack).toBe(false);
  });

  it("BACK on aiguillage-q1 — does nothing", () => {
    const { result } = setup();
    act(() => {
      result.current.dispatch({ type: "BACK" });
    });
    expect(result.current.currentNode).toBe("aiguillage-q1");
  });

  it('Flux 2 "no priorities" → flux1 redirect — transparent', () => {
    const { result } = setup();
    // aiguillage-q1 → aiguillage-q2b (💤)
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[1],
      });
    });
    // aiguillage-q2b → flux2-q1 (🤔)
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[0],
      });
    });
    expect(result.current.currentNode).toBe("flux2-q1");
    // flux2-q1 → flux1 (3rd answer: "Pas de priorités définies")
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[2], // → flux1
      });
    });
    expect(result.current.currentNode).toBe("flux1");
  });

  it("Flux 3 — flux3-q1 leads to flux3-q2a", () => {
    const { result } = setup();
    // aiguillage-q1 → aiguillage-q2a (🔥)
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[0],
      });
    });
    // aiguillage-q2a → flux3-q1 (😬 pression)
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[0],
      });
    });
    expect(result.current.currentNode).toBe("flux3-q1");
    // flux3-q1 → flux3-q2a (🔔 "Quelqu'un me relance")
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[0],
      });
    });
    expect(result.current.currentNode).toBe("flux3-q2a");
  });

  it("GO_TO — jumps back to an earlier step, truncating history", () => {
    const { result } = setup();
    // aiguillage-q1 → aiguillage-q2a → flux3-q1
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[0],
      });
    });
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[0],
      });
    });
    expect(result.current.currentNode).toBe("flux3-q1");
    expect(result.current.progressState.stepIndex).toBe(2);
    act(() => {
      result.current.dispatch({ type: "GO_TO", index: 0 });
    });
    expect(result.current.currentNode).toBe("aiguillage-q1");
    expect(result.current.direction).toBe("backward");
    expect(result.current.canGoBack).toBe(false);
  });

  it("GO_TO — current or forward index is a no-op", () => {
    const { result } = setup();
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[0], // → aiguillage-q2a
      });
    });
    // index 1 is the current step, index 5 is ahead — both ignored
    act(() => {
      result.current.dispatch({ type: "GO_TO", index: 1 });
    });
    expect(result.current.currentNode).toBe("aiguillage-q2a");
    act(() => {
      result.current.dispatch({ type: "GO_TO", index: 5 });
    });
    expect(result.current.currentNode).toBe("aiguillage-q2a");
  });

  it("RESET — resets history to aiguillage-q1", () => {
    const { result } = setup();
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[0],
      });
    });
    expect(result.current.currentNode).not.toBe("aiguillage-q1");
    act(() => {
      result.current.dispatch({ type: "RESET" });
    });
    expect(result.current.currentNode).toBe("aiguillage-q1");
    expect(result.current.canGoBack).toBe(false);
    expect(result.current.done).toBeNull();
  });
});

describe("getProgressState", () => {
  it("shows 4 fixed dots from the first aiguillage question", () => {
    expect(getProgressState(["aiguillage-q1"])).toEqual({
      stepIndex: 0,
      totalSteps: 4,
    });
    expect(getProgressState(["aiguillage-q1", "aiguillage-q2a"])).toEqual({
      stepIndex: 1,
      totalSteps: 4,
    });
  });

  it("advances stepIndex with history length through a flux", () => {
    const atFluxEntry = getProgressState([
      "aiguillage-q1",
      "aiguillage-q2b",
      "flux2-q1",
    ]);
    expect(atFluxEntry).toEqual({ stepIndex: 2, totalSteps: 4 });

    const atFluxLast = getProgressState([
      "aiguillage-q1",
      "aiguillage-q2b",
      "flux2-q1",
      "flux2-q2a",
    ]);
    expect(atFluxLast).toEqual({ stepIndex: 3, totalSteps: 4 });
  });

  it("leaves the last dot inactive on the shortest path (Flux 1 direct)", () => {
    // 3-question path → stepIndex 2 of 4: dots render ●●●○
    expect(
      getProgressState(["aiguillage-q1", "aiguillage-q2b", "flux1"]),
    ).toEqual({ stepIndex: 2, totalSteps: 4 });
  });
});
