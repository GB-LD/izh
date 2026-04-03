import { TaskSchema } from "./task";
import type { Task } from "./task";

const validTask: Task = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Rédiger les specs",
  status: "active",
  quadrant: "q2",
  createdAt: "2026-04-01T10:00:00.000Z",
  classifiedAt: "2026-04-01T11:00:00.000Z",
  completedAt: null,
  flowDurationMs: 3600000,
  sourceFlux: "manual",
  classificationMethod: "assisted",
  userOverride: false,
  position: 1,
};

function invalidate(overrides: Partial<Record<keyof Task, unknown>>) {
  return TaskSchema.safeParse({ ...validTask, ...overrides });
}

describe("TaskSchema — valid object", () => {
  it("accepts a complete valid object", () => {
    const result = TaskSchema.safeParse(validTask);
    expect(result.success).toBe(true);
  });

  it("accepts all nullable fields as null", () => {
    const result = invalidate({
      quadrant: null,
      classifiedAt: null,
      completedAt: null,
      flowDurationMs: null,
      sourceFlux: null,
      classificationMethod: null,
      userOverride: null,
    });
    expect(result.success).toBe(true);
  });
});

describe("TaskSchema — invalid constraints", () => {
  it("rejects an id that is not a UUID", () => {
    expect(invalidate({ id: "not-a-uuid" }).success).toBe(false);
  });

  it("rejects an empty title", () => {
    expect(invalidate({ title: "" }).success).toBe(false);
  });

  it("rejects an empty title with white space", () => {
    expect(invalidate({ title: "  " }).success).toBe(false);
  });

  it("rejects a status outside the enum", () => {
    expect(invalidate({ status: "done" }).success).toBe(false);
  });

  it("rejects a quadrant outside the enum", () => {
    expect(invalidate({ quadrant: "q5" }).success).toBe(false);
  });

  it("rejects a non-ISO createdAt", () => {
    expect(invalidate({ createdAt: "01/04/2026" }).success).toBe(false);
  });

  it("rejects a non-ISO classifiedAt", () => {
    expect(invalidate({ classifiedAt: "not-a-date" }).success).toBe(false);
  });

  it("rejects a non-ISO completedAt", () => {
    expect(invalidate({ completedAt: "not-a-date" }).success).toBe(false);
  });

  it("rejects a non-numeric flowDurationMs", () => {
    expect(invalidate({ flowDurationMs: "3600000" }).success).toBe(false);
  });

  it("rejects a sourceFlux outside the enum", () => {
    expect(invalidate({ sourceFlux: "flux5" }).success).toBe(false);
  });

  it("rejects a classificationMethod outside the enum", () => {
    expect(invalidate({ classificationMethod: "auto" }).success).toBe(false);
  });

  it("rejects a non-boolean userOverride", () => {
    expect(invalidate({ userOverride: "true" }).success).toBe(false);
  });

  it("rejects a non-numeric position", () => {
    expect(invalidate({ position: "1" }).success).toBe(false);
  });

  it("reject a negative position", () => {
    expect(invalidate({ position: -1 }).success).toBe(false);
  });

  it("reject a task without title properties", () => {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { title, ...rest } = validTask;
    expect(TaskSchema.safeParse(rest).success).toBe(false);
  });
});
