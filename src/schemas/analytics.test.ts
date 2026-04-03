import { AnalyticsSchema } from "./analytics";
import type { Analytics } from "./analytics";

const validAnalytics: Analytics = {
  surveyScores: [{ score: 8, date: "2026-04-01T10:00:00.000Z" }],
  lastSurveyDate: "2026-04-01T10:00:00.000Z",
  totalTasksCreated: 10,
  totalTasksCompleted: 7,
  totalFlowsCompleted: 3,
};

function invalidate(overrides: Partial<Record<keyof Analytics, unknown>>) {
  return AnalyticsSchema.safeParse({ ...validAnalytics, ...overrides });
}

describe("AnalyticsSchema — valid object", () => {
  it("accepts a complete valid object", () => {
    expect(AnalyticsSchema.safeParse(validAnalytics).success).toBe(true);
  });

  it("accepts an empty surveyScores array", () => {
    expect(invalidate({ surveyScores: [] }).success).toBe(true);
  });

  it("accepts lastSurveyDate as null", () => {
    expect(invalidate({ lastSurveyDate: null }).success).toBe(true);
  });
});

describe("AnalyticsSchema — invalid constraints", () => {
  it("rejects surveyScores that is not an array", () => {
    expect(invalidate({ surveyScores: "scores" }).success).toBe(false);
  });

  it("rejects a surveyScore entry with a non-numeric score", () => {
    expect(
      invalidate({
        surveyScores: [{ score: "8", date: "2026-04-01T10:00:00.000Z" }],
      }).success,
    ).toBe(false);
  });

  it("rejects a surveyScore entry with a non-ISO date", () => {
    expect(
      invalidate({ surveyScores: [{ score: 8, date: "01/04/2026" }] }).success,
    ).toBe(false);
  });

  it("rejects a non-ISO lastSurveyDate", () => {
    expect(invalidate({ lastSurveyDate: "01/04/2026" }).success).toBe(false);
  });

  it("rejects a non-numeric totalTasksCreated", () => {
    expect(invalidate({ totalTasksCreated: "10" }).success).toBe(false);
  });

  it("rejects a non-numeric totalTasksCompleted", () => {
    expect(invalidate({ totalTasksCompleted: "7" }).success).toBe(false);
  });

  it("rejects a non-numeric totalFlowsCompleted", () => {
    expect(invalidate({ totalFlowsCompleted: "3" }).success).toBe(false);
  });
});
