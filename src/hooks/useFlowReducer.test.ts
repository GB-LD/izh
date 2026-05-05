import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useFlowReducer } from "./useFlowReducer";
import { getProgressState } from "@/lib/questionnaire";

function setup() {
  return renderHook(() => useFlowReducer());
}

describe("useFlowReducer", () => {
  it("starts at aiguillage", () => {
    const { result } = setup();
    expect(result.current.currentNode).toBe("aiguillage");
    expect(result.current.canGoBack).toBe(false);
    expect(result.current.done).toBeNull();
  });

  it("ANSWER forward — advances to correct node", () => {
    const { result } = setup();
    const answer = result.current.currentQuestion.answers[0]; // 😬 → flux3-q1
    act(() => {
      result.current.dispatch({ type: "ANSWER", answer });
    });
    expect(result.current.currentNode).toBe("flux3-q1");
    expect(result.current.direction).toBe("forward");
    expect(result.current.canGoBack).toBe(true);
  });

  it("ANSWER terminal — sets done, no new node in history", () => {
    const { result } = setup();
    // Navigate to flux1
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[3], // 🤷 → flux1
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
        answer: result.current.currentQuestion.answers[3], // → flux1
      });
    });
    expect(result.current.currentNode).toBe("flux1");
    act(() => {
      result.current.dispatch({ type: "BACK" });
    });
    expect(result.current.currentNode).toBe("aiguillage");
    expect(result.current.direction).toBe("backward");
    expect(result.current.canGoBack).toBe(false);
  });

  it("BACK on aiguillage — does nothing", () => {
    const { result } = setup();
    act(() => {
      result.current.dispatch({ type: "BACK" });
    });
    expect(result.current.currentNode).toBe("aiguillage");
  });

  it('Flux 2 "no priorities" → flux1 redirect — transparent', () => {
    const { result } = setup();
    // aiguillage → flux2-q1 (3rd answer: 🤔)
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[2], // 🤔 → flux2-q1
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

  it("Flux 3 with rebond — correct history", () => {
    const { result } = setup();
    // aiguillage → flux3-q1 (😬)
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[0],
      });
    });
    // flux3-q1 → flux3-rebond ("Je sais pas")
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[2],
      });
    });
    expect(result.current.currentNode).toBe("flux3-rebond");
    // flux3-rebond → flux3-q2a ("On me relance")
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[0],
      });
    });
    expect(result.current.currentNode).toBe("flux3-q2a");
  });

  it("previousAnswer returns correct answer after BACK", () => {
    const { result } = setup();
    const firstAnswer = result.current.currentQuestion.answers[3]; // 🤷 → flux1
    act(() => {
      result.current.dispatch({ type: "ANSWER", answer: firstAnswer });
    });
    act(() => {
      result.current.dispatch({ type: "BACK" });
    });
    expect(result.current.currentNode).toBe("aiguillage");
    expect(result.current.previousAnswer).toBeNull();
  });

  it("previousAnswer points to the answer that led to current node", () => {
    const { result } = setup();
    const answer = result.current.currentQuestion.answers[3]; // 🤷 → flux1
    act(() => {
      result.current.dispatch({ type: "ANSWER", answer });
    });
    // Now at flux1; go back to aiguillage
    act(() => {
      result.current.dispatch({ type: "BACK" });
    });
    // aiguillage has no previous (it's the root)
    expect(result.current.previousAnswer).toBeNull();

    // Go forward again, then check previousAnswer from flux1
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[3],
      });
    });
    expect(result.current.currentNode).toBe("flux1");
    // previousAnswer should be the answer from aiguillage that led to flux1
    expect(result.current.previousAnswer?.label).toBe(
      "🤷 Je sais pas ce qui se passe si je le fais pas",
    );
  });

  it("RESET — resets history to aiguillage", () => {
    const { result } = setup();
    act(() => {
      result.current.dispatch({
        type: "ANSWER",
        answer: result.current.currentQuestion.answers[0],
      });
    });
    expect(result.current.currentNode).not.toBe("aiguillage");
    act(() => {
      result.current.dispatch({ type: "RESET" });
    });
    expect(result.current.currentNode).toBe("aiguillage");
    expect(result.current.canGoBack).toBe(false);
    expect(result.current.done).toBeNull();
  });
});

describe("getProgressState", () => {
  it("returns null at aiguillage", () => {
    expect(getProgressState("aiguillage", ["aiguillage"])).toBeNull();
  });

  it("returns correct stepIndex and totalSteps in flux 2", () => {
    // At flux2-q1: history = ['aiguillage', 'flux2-q1'], currentNode = 'flux2-q1'
    // fluxEntryIdx = 1 (flux2-q1), stepIndex = history.length - fluxEntryIdx = 2 - 1 = 1? Wait
    // Actually currentNode is NOT in history yet when getProgressState is called
    // history = ['aiguillage', 'flux2-q1'], currentNode = 'flux2-q1'
    // fluxEntryIdx = 1 (finds 'flux2-q1' in history)
    // stepIndex = history.length - fluxEntryIdx = 2 - 1 = 1 → but that's 1-based, should be 0?
    // Re-reading: stepIndex = history.length - fluxEntryIdx = 2 - 1 = 1
    // totalSteps for flux2 = 2, so min(1, 2-1) = min(1,1) = 1 → step 1 of 2
    const result = getProgressState("flux2-q1", ["aiguillage", "flux2-q1"]);
    expect(result).not.toBeNull();
    expect(result!.totalSteps).toBe(2);
    // stepIndex is 1 (= history.length - fluxEntryIdx = 2 - 1 = 1, capped to totalSteps-1=1)
    expect(result!.stepIndex).toBe(1);
  });

  it("returns stepIndex 0 for first question in flux 1", () => {
    // history = ['aiguillage'], currentNode = 'flux1' (not in history yet)
    // Wait — in useFlowReducer, when ANSWER is dispatched, 'flux1' is added to history
    // So when we're AT flux1: history = ['aiguillage', 'flux1']
    // fluxEntryIdx = 1, stepIndex = 2 - 1 = 1, totalSteps = 1, min(1, 0) = 0
    const result = getProgressState("flux1", ["aiguillage", "flux1"]);
    expect(result).not.toBeNull();
    expect(result!.totalSteps).toBe(1);
    expect(result!.stepIndex).toBe(0);
  });
});
