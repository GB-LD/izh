import { useFlowStore } from "./useFlowStore";
import type { Flux } from "@/schemas/flow";

const get = () => useFlowStore.getState();

const INITIAL_STATE = {
  taskId: null,
  isActive: false,
  currentFlux: null,
  currentStep: 0,
  answers: [],
};

beforeEach(() => {
  useFlowStore.setState(INITIAL_STATE);
});

// ---------------------------------------------------------------------------
// startFlow
// ---------------------------------------------------------------------------

describe("startFlow", () => {
  it("sets isActive to true", () => {
    get().startFlow("task-1");
    expect(get().isActive).toBe(true);
  });

  it("sets taskId to the provided id", () => {
    get().startFlow("task-42");
    expect(get().taskId).toBe("task-42");
  });

  it("resets currentStep to 0", () => {
    useFlowStore.setState({ currentStep: 3 });
    get().startFlow("task-1");
    expect(get().currentStep).toBe(0);
  });

  it("resets answers to an empty array", () => {
    useFlowStore.setState({ answers: ["yes", "no"] });
    get().startFlow("task-1");
    expect(get().answers).toEqual([]);
  });

  it("resets currentFlux to null", () => {
    useFlowStore.setState({ currentFlux: "flux1" });
    get().startFlow("task-1");
    expect(get().currentFlux).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// setFlux
// ---------------------------------------------------------------------------

describe("setFlux", () => {
  it("sets currentFlux to the provided value", () => {
    get().setFlux("flux2");
    expect(get().currentFlux).toBe("flux2");
  });

  it("overwrites a previously set flux", () => {
    get().setFlux("flux1");
    get().setFlux("flux3");
    expect(get().currentFlux).toBe("flux3");
  });

  it("does not modify other state fields", () => {
    useFlowStore.setState({ currentStep: 2, answers: ["a"] });
    get().setFlux("flux4");
    expect(get().currentStep).toBe(2);
    expect(get().answers).toEqual(["a"]);
  });
});

// ---------------------------------------------------------------------------
// nextStep
// ---------------------------------------------------------------------------

describe("nextStep", () => {
  it("increments currentStep by 1", () => {
    get().nextStep("answer");
    expect(get().currentStep).toBe(1);
  });

  it("appends the answer to the answers array", () => {
    get().nextStep("first");
    expect(get().answers).toEqual(["first"]);
  });

  it("accumulates answers across multiple calls", () => {
    get().nextStep("A");
    get().nextStep("B");
    get().nextStep("C");
    expect(get().answers).toEqual(["A", "B", "C"]);
    expect(get().currentStep).toBe(3);
  });

  it("does not modify other state fields", () => {
    useFlowStore.setState({ taskId: "task-1", currentFlux: "flux2" as Flux });
    get().nextStep("x");
    expect(get().taskId).toBe("task-1");
    expect(get().currentFlux).toBe("flux2");
  });
});

// ---------------------------------------------------------------------------
// prevStep
// ---------------------------------------------------------------------------

describe("prevStep", () => {
  it("decrements currentStep by 1 when > 0", () => {
    useFlowStore.setState({ currentStep: 3 });
    get().prevStep();
    expect(get().currentStep).toBe(2);
  });

  it("does not go below 0 when already at 0", () => {
    get().prevStep();
    expect(get().currentStep).toBe(0);
  });

  it("stays at 0 when currentStep is 1 and goes back", () => {
    useFlowStore.setState({ currentStep: 1 });
    get().prevStep();
    expect(get().currentStep).toBe(0);
  });

  it("does not modify other state fields", () => {
    useFlowStore.setState({
      currentStep: 2,
      answers: ["a", "b"],
      currentFlux: "flux1" as Flux,
    });
    get().prevStep();
    expect(get().answers).toEqual(["a", "b"]);
    expect(get().currentFlux).toBe("flux1");
  });
});

// ---------------------------------------------------------------------------
// resetFlow
// ---------------------------------------------------------------------------

describe("resetFlow", () => {
  it("resets all state to initial values", () => {
    useFlowStore.setState({
      taskId: "task-99",
      isActive: true,
      currentFlux: "flux3" as Flux,
      currentStep: 5,
      answers: ["yes", "no", "maybe"],
    });
    get().resetFlow();
    expect(get()).toMatchObject(INITIAL_STATE);
  });
});
