import { validateAndLoad } from "./persistence";
import { TaskSchemaList, type TaskList } from "@/schemas/task";

const mockTaskList: TaskList = [
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    title: "Préparer la démo",
    status: "inbox",
    quadrant: "q1",
    createdAt: "2026-04-02T09:00:00.000Z",
    classifiedAt: null,
    completedAt: null,
    flowDurationMs: null,
    sourceFlux: "flux1",
    classificationMethod: null,
    userOverride: null,
    position: 2,
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    title: "Corriger le bug #42",
    status: "backlog",
    quadrant: "q3",
    createdAt: "2026-04-03T08:30:00.000Z",
    classifiedAt: "2026-04-03T09:00:00.000Z",
    completedAt: null,
    flowDurationMs: 1800000,
    sourceFlux: "manual",
    classificationMethod: "manual",
    userOverride: true,
    position: 3,
  },
];

describe("validate and load data from localStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns null when key is not found", () => {
    expect(validateAndLoad("toto", TaskSchemaList)).toBe(null);
  });

  it("returns parsed taskList for a valid key", () => {
    localStorage.setItem("taskList", JSON.stringify(mockTaskList));
    expect(validateAndLoad("taskList", TaskSchemaList)).toEqual(mockTaskList);
  });

  it("returns null and removes the key for corrupted JSON", () => {
    localStorage.setItem("taskList", "not-valid-json{[");
    expect(validateAndLoad("taskList", TaskSchemaList)).toBe(null);
    expect(localStorage.getItem("taskList")).toBe(null);
  });

  it("returns null and removes the key when data does not match the schema", () => {
    localStorage.setItem(
      "taskList",
      JSON.stringify([{ id: "bad", title: "" }]),
    );
    expect(validateAndLoad("taskList", TaskSchemaList)).toBe(null);
    expect(localStorage.getItem("taskList")).toBe(null);
  });

  it("returns an empty array for an empty taskList", () => {
    localStorage.setItem("taskList", JSON.stringify([]));
    expect(validateAndLoad("taskList", TaskSchemaList)).toEqual([]);
  });
});
