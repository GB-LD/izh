import { useAnalyticsStore } from "./useAnalyticsStore";

const get = () => useAnalyticsStore.getState();

const INITIAL_STATE = {
  surveyScores: [],
  lastSurveyDate: null,
  totalTasksCreated: 0,
  totalTasksCompleted: 0,
  totalFlowsCompleted: 0,
};

beforeEach(() => {
  useAnalyticsStore.setState(INITIAL_STATE);
  localStorage.clear();
});

// ---------------------------------------------------------------------------
// addSurveyScore
// ---------------------------------------------------------------------------

describe("addSurveyScore", () => {
  it("appends a score to an empty array", () => {
    get().addSurveyScore({ score: 8, date: "2026-04-09T10:00:00.000Z" });
    expect(get().surveyScores).toHaveLength(1);
    expect(get().surveyScores[0]).toEqual({
      score: 8,
      date: "2026-04-09T10:00:00.000Z",
    });
  });

  it("accumulates scores on successive calls", () => {
    get().addSurveyScore({ score: 5, date: "2026-04-01T00:00:00.000Z" });
    get().addSurveyScore({ score: 9, date: "2026-04-09T00:00:00.000Z" });
    expect(get().surveyScores).toHaveLength(2);
    expect(get().surveyScores[1].score).toBe(9);
  });

  it("does not modify other state fields", () => {
    useAnalyticsStore.setState({ totalTasksCreated: 3 });
    get().addSurveyScore({ score: 7, date: "2026-04-09T00:00:00.000Z" });
    expect(get().totalTasksCreated).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// startSession
// ---------------------------------------------------------------------------

describe("startSession", () => {
  it("sets lastSurveyDate to a non-null ISO string", () => {
    get().startSession();
    expect(get().lastSurveyDate).not.toBeNull();
    expect(get().lastSurveyDate).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
    );
  });

  it("overwrites the previous lastSurveyDate on successive calls", () => {
    useAnalyticsStore.setState({ lastSurveyDate: "2026-01-01T00:00:00.000Z" });
    get().startSession();
    expect(get().lastSurveyDate).not.toBe("2026-01-01T00:00:00.000Z");
  });

  it("does not modify other state fields", () => {
    useAnalyticsStore.setState({ totalFlowsCompleted: 2 });
    get().startSession();
    expect(get().totalFlowsCompleted).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// trackTaskCreated
// ---------------------------------------------------------------------------

describe("trackTaskCreated", () => {
  it("increments totalTasksCreated from 0 to 1", () => {
    get().trackTaskCreated();
    expect(get().totalTasksCreated).toBe(1);
  });

  it("increments totalTasksCreated on successive calls", () => {
    get().trackTaskCreated();
    get().trackTaskCreated();
    get().trackTaskCreated();
    expect(get().totalTasksCreated).toBe(3);
  });

  it("does not modify other counters", () => {
    get().trackTaskCreated();
    expect(get().totalTasksCompleted).toBe(0);
    expect(get().totalFlowsCompleted).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// trackTaskCompleted
// ---------------------------------------------------------------------------

describe("trackTaskCompleted", () => {
  it("increments totalTasksCompleted from 0 to 1", () => {
    get().trackTaskCompleted();
    expect(get().totalTasksCompleted).toBe(1);
  });

  it("increments totalTasksCompleted on successive calls", () => {
    get().trackTaskCompleted();
    get().trackTaskCompleted();
    expect(get().totalTasksCompleted).toBe(2);
  });

  it("does not modify other counters", () => {
    get().trackTaskCompleted();
    expect(get().totalTasksCreated).toBe(0);
    expect(get().totalFlowsCompleted).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// trackFlowCompleted
// ---------------------------------------------------------------------------

describe("trackFlowCompleted", () => {
  it("increments totalFlowsCompleted from 0 to 1", () => {
    get().trackFlowCompleted();
    expect(get().totalFlowsCompleted).toBe(1);
  });

  it("increments totalFlowsCompleted on successive calls", () => {
    get().trackFlowCompleted();
    get().trackFlowCompleted();
    expect(get().totalFlowsCompleted).toBe(2);
  });

  it("does not modify other counters", () => {
    get().trackFlowCompleted();
    expect(get().totalTasksCreated).toBe(0);
    expect(get().totalTasksCompleted).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// counter isolation
// ---------------------------------------------------------------------------

describe("counter isolation", () => {
  it("all three counters increment independently", () => {
    get().trackTaskCreated();
    get().trackTaskCreated();
    get().trackTaskCompleted();
    get().trackFlowCompleted();
    get().trackFlowCompleted();
    get().trackFlowCompleted();

    expect(get().totalTasksCreated).toBe(2);
    expect(get().totalTasksCompleted).toBe(1);
    expect(get().totalFlowsCompleted).toBe(3);
  });
});
