import { useUIStore } from "./useUIStore";
import type { Quadrant } from "@/schemas/task";

const get = () => useUIStore.getState();

const INITIAL_STATE = {
  activeOverlay: null,
  activeFocusQuadrant: null,
  onboardingFlags: {},
};

beforeEach(() => {
  useUIStore.setState(INITIAL_STATE);
});

// ---------------------------------------------------------------------------
// openOverlay / closeOverlay
// ---------------------------------------------------------------------------

describe("openOverlay", () => {
  it("sets activeOverlay to 'sorting'", () => {
    get().openOverlay("sorting");
    expect(get().activeOverlay).toBe("sorting");
  });

  it("sets activeOverlay to 'purge'", () => {
    get().openOverlay("purge");
    expect(get().activeOverlay).toBe("purge");
  });

  it("overwrites a previously open overlay on successive calls", () => {
    get().openOverlay("sorting");
    get().openOverlay("purge");
    expect(get().activeOverlay).toBe("purge");
  });

  it("does not modify other state fields", () => {
    useUIStore.setState({ activeFocusQuadrant: "q1" as Quadrant });
    get().openOverlay("sorting");
    expect(get().activeFocusQuadrant).toBe("q1");
  });
});

describe("closeOverlay", () => {
  it("resets activeOverlay to null", () => {
    get().openOverlay("sorting");
    get().closeOverlay();
    expect(get().activeOverlay).toBeNull();
  });

  it("is a no-op when no overlay is open", () => {
    get().closeOverlay();
    expect(get().activeOverlay).toBeNull();
  });

  it("closes whichever overlay was open", () => {
    get().openOverlay("purge");
    get().closeOverlay();
    expect(get().activeOverlay).toBeNull();
  });

  it("does not modify other state fields", () => {
    useUIStore.setState({ activeFocusQuadrant: "q2" as Quadrant });
    get().openOverlay("sorting");
    get().closeOverlay();
    expect(get().activeFocusQuadrant).toBe("q2");
  });
});

// ---------------------------------------------------------------------------
// setActiveFocusQuadrant
// ---------------------------------------------------------------------------

describe("setActiveFocusQuadrant", () => {
  it("sets activeFocusQuadrant to the given quadrant", () => {
    get().setActiveFocusQuadrant("q1");
    expect(get().activeFocusQuadrant).toBe("q1");
  });

  it("overwrites the previous quadrant on successive calls", () => {
    get().setActiveFocusQuadrant("q1");
    get().setActiveFocusQuadrant("q3");
    expect(get().activeFocusQuadrant).toBe("q3");
  });

  it("does not modify other state fields", () => {
    useUIStore.setState({ activeOverlay: "sorting" });
    get().setActiveFocusQuadrant("q4");
    expect(get().activeOverlay).toBe("sorting");
  });
});

// ---------------------------------------------------------------------------
// markOnboardingDone / onboardingFlags
// ---------------------------------------------------------------------------

describe("markOnboardingDone", () => {
  it("sets the given key to true in onboardingFlags", () => {
    get().markOnboardingDone("welcome");
    expect(get().onboardingFlags["welcome"]).toBe(true);
  });

  it("accumulates multiple keys on successive calls", () => {
    get().markOnboardingDone("step-1");
    get().markOnboardingDone("step-2");
    expect(get().onboardingFlags).toEqual({ "step-1": true, "step-2": true });
  });

  it("does not overwrite an existing key when marking another", () => {
    get().markOnboardingDone("intro");
    get().markOnboardingDone("tour");
    expect(get().onboardingFlags["intro"]).toBe(true);
  });

  it("is idempotent when called twice with the same key", () => {
    get().markOnboardingDone("hint");
    get().markOnboardingDone("hint");
    expect(get().onboardingFlags["hint"]).toBe(true);
    expect(Object.keys(get().onboardingFlags)).toHaveLength(1);
  });

  it("does not modify other state fields", () => {
    useUIStore.setState({ activeOverlay: "purge" });
    get().markOnboardingDone("any-key");
    expect(get().activeOverlay).toBe("purge");
  });
});
