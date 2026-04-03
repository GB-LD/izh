import { FlowStateSchema } from "./flow";
import type { FlowState } from "./flow";

const validFlowState: FlowState = {
  currentFlux: "flux1",
  currentStep: 1,
  taskId: "123e4567-e89b-12d3-a456-426614174000",
  answers: ["yes"],
  isActive: true,
};

function invalidate(overrides: Partial<Record<keyof FlowState, unknown>>) {
  return FlowStateSchema.safeParse({ ...validFlowState, ...overrides });
}

describe("FlowStateSchema — valid object", () => {
  it("accepts a complete valid object", () => {
    expect(FlowStateSchema.safeParse(validFlowState).success).toBe(true);
  });

  it("accepts all nullable fields as null", () => {
    const result = invalidate({ currentFlux: null, taskId: null });
    expect(result.success).toBe(true);
  });
});

describe("FlowStateSchema — invalid constraints", () => {
  it("rejects a currentFlux outside the enum", () => {
    expect(invalidate({ currentFlux: "flux5" }).success).toBe(false);
  });

  it("rejects a non-numeric currentStep", () => {
    expect(invalidate({ currentStep: "1" }).success).toBe(false);
  });

  it("rejects a taskId that is not a UUID", () => {
    expect(invalidate({ taskId: "not-a-uuid" }).success).toBe(false);
  });

  it("rejects answers that is not an array", () => {
    expect(invalidate({ answers: "yes" }).success).toBe(false);
  });

  it("rejects answers containing non-string values", () => {
    expect(invalidate({ answers: [1, 2] }).success).toBe(false);
  });

  it("rejects a non-boolean isActive", () => {
    expect(invalidate({ isActive: "true" }).success).toBe(false);
  });
});
