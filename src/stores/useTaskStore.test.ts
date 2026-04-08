import { useTaskStore } from "./useTaskStore";
import { MAX_BACKLOG_SIZE } from "@/lib/constants";
import type { Task } from "@/schemas/task";

const get = () => useTaskStore.getState();

const makeTask = (overrides: Partial<Task> = {}): Task => ({
  id: crypto.randomUUID(),
  title: "Default task",
  status: "inbox",
  quadrant: null,
  createdAt: "2026-04-01T10:00:00.000Z",
  classifiedAt: null,
  completedAt: null,
  flowDurationMs: null,
  sourceFlux: null,
  classificationMethod: null,
  userOverride: null,
  position: 1,
  ...overrides,
});

beforeEach(() => {
  useTaskStore.setState({ tasks: [] });
  localStorage.clear();
});

// ---------------------------------------------------------------------------
// addTask
// ---------------------------------------------------------------------------

describe("addTask", () => {
  it("adds a task with status inbox", () => {
    get().addTask("My task");
    const [task] = get().tasks;
    expect(task.status).toBe("inbox");
    expect(task.title).toBe("My task");
  });

  it("initializes all nullable fields to null", () => {
    get().addTask("My task");
    const [task] = get().tasks;
    expect(task.quadrant).toBeNull();
    expect(task.classifiedAt).toBeNull();
    expect(task.completedAt).toBeNull();
    expect(task.flowDurationMs).toBeNull();
    expect(task.sourceFlux).toBeNull();
    expect(task.classificationMethod).toBeNull();
    expect(task.userOverride).toBeNull();
  });

  it("assigns position 1 when inbox is empty", () => {
    get().addTask("First task");
    expect(get().tasks[0].position).toBe(1);
  });

  it("assigns position = inbox count + 1 for subsequent tasks", () => {
    get().addTask("Task A");
    get().addTask("Task B");
    get().addTask("Task C");
    const inboxTasks = get().inboxTasks();
    expect(inboxTasks[2].position).toBe(3);
  });

  it("generates a unique id per task", () => {
    get().addTask("Task A");
    get().addTask("Task B");
    const [a, b] = get().tasks;
    expect(a.id).not.toBe(b.id);
  });

  it("sets createdAt to a valid ISO string", () => {
    get().addTask("Task");
    expect(get().tasks[0].createdAt).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
    );
  });

  it("does not count non-inbox tasks when computing position", () => {
    const backlogTask = makeTask({ status: "backlog", position: 1 });
    useTaskStore.setState({ tasks: [backlogTask] });
    get().addTask("Inbox task");
    const inboxTask = get().tasks.find((t) => t.status === "inbox")!;
    expect(inboxTask.position).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// updateTask
// ---------------------------------------------------------------------------

describe("updateTask", () => {
  it("updates the title of the target task", () => {
    get().addTask("Original");
    const id = get().tasks[0].id;
    get().updateTask(id, { title: "Updated" });
    expect(get().tasks[0].title).toBe("Updated");
  });

  it("does not modify other tasks", () => {
    get().addTask("Task A");
    get().addTask("Task B");
    const idA = get().tasks[0].id;
    get().updateTask(idA, { title: "Changed A" });
    expect(get().tasks[1].title).toBe("Task B");
  });

  it("merges the patch without overwriting unrelated fields", () => {
    get().addTask("Task");
    const id = get().tasks[0].id;
    get().updateTask(id, { position: 99 });
    const task = get().tasks[0];
    expect(task.position).toBe(99);
    expect(task.title).toBe("Task");
    expect(task.status).toBe("inbox");
  });
});

// ---------------------------------------------------------------------------
// deleteTask
// ---------------------------------------------------------------------------

describe("deleteTask", () => {
  it("removes the task with the given id", () => {
    get().addTask("To delete");
    const id = get().tasks[0].id;
    get().deleteTask(id);
    expect(get().tasks).toHaveLength(0);
  });

  it("does not remove other tasks", () => {
    get().addTask("Keep");
    get().addTask("Delete");
    const idToDelete = get().tasks[1].id;
    get().deleteTask(idToDelete);
    expect(get().tasks).toHaveLength(1);
    expect(get().tasks[0].title).toBe("Keep");
  });
});

// ---------------------------------------------------------------------------
// classifyTask
// ---------------------------------------------------------------------------

describe("classifyTask", () => {
  it("moves the task to backlog with the given quadrant", () => {
    get().addTask("Task");
    const id = get().tasks[0].id;
    get().classifyTask(id, "q1", "manual");
    expect(get().tasks[0].status).toBe("backlog");
    expect(get().tasks[0].quadrant).toBe("q1");
  });

  it("sets classificationMethod", () => {
    get().addTask("Task");
    const id = get().tasks[0].id;
    get().classifyTask(id, "q2", "assisted");
    expect(get().tasks[0].classificationMethod).toBe("assisted");
  });

  it("sets sourceFlux when provided", () => {
    get().addTask("Task");
    const id = get().tasks[0].id;
    get().classifyTask(id, "q1", "manual", "manual");
    expect(get().tasks[0].sourceFlux).toBe("manual");
  });

  it("sets sourceFlux to null when not provided", () => {
    get().addTask("Task");
    const id = get().tasks[0].id;
    get().classifyTask(id, "q1", "manual");
    expect(get().tasks[0].sourceFlux).toBeNull();
  });

  it("sets classifiedAt to a non-null ISO string", () => {
    get().addTask("Task");
    const id = get().tasks[0].id;
    get().classifyTask(id, "q3", "manual");
    expect(get().tasks[0].classifiedAt).not.toBeNull();
    expect(get().tasks[0].classifiedAt).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
    );
  });

  it("does not classify when backlog is at MAX_BACKLOG_SIZE", () => {
    const backlogTasks = Array.from({ length: MAX_BACKLOG_SIZE }, (_, i) =>
      makeTask({
        id: crypto.randomUUID(),
        status: "backlog",
        quadrant: "q1",
        position: i + 1,
      }),
    );
    const inboxTask = makeTask({ id: crypto.randomUUID(), status: "inbox" });
    useTaskStore.setState({ tasks: [...backlogTasks, inboxTask] });

    get().classifyTask(inboxTask.id, "q2", "manual");

    const updated = get().tasks.find((t) => t.id === inboxTask.id)!;
    expect(updated.status).toBe("inbox");
  });

  it("classifies when backlog has exactly MAX_BACKLOG_SIZE - 1 tasks", () => {
    const backlogTasks = Array.from({ length: MAX_BACKLOG_SIZE - 1 }, (_, i) =>
      makeTask({
        id: crypto.randomUUID(),
        status: "backlog",
        quadrant: "q1",
        position: i + 1,
      }),
    );
    const inboxTask = makeTask({ id: crypto.randomUUID(), status: "inbox" });
    useTaskStore.setState({ tasks: [...backlogTasks, inboxTask] });

    get().classifyTask(inboxTask.id, "q2", "manual");

    const updated = get().tasks.find((t) => t.id === inboxTask.id)!;
    expect(updated.status).toBe("backlog");
  });
});

// ---------------------------------------------------------------------------
// activateTask
// ---------------------------------------------------------------------------

describe("activateTask", () => {
  it("changes status from backlog to active", () => {
    const task = makeTask({ status: "backlog", quadrant: "q1" });
    useTaskStore.setState({ tasks: [task] });
    get().activateTask(task.id);
    expect(get().tasks[0].status).toBe("active");
  });

  it("does not modify other fields", () => {
    const task = makeTask({
      status: "backlog",
      quadrant: "q2",
      title: "Focus",
    });
    useTaskStore.setState({ tasks: [task] });
    get().activateTask(task.id);
    expect(get().tasks[0].title).toBe("Focus");
    expect(get().tasks[0].quadrant).toBe("q2");
  });
});

// ---------------------------------------------------------------------------
// completeTask
// ---------------------------------------------------------------------------

describe("completeTask", () => {
  it("changes status to archived", () => {
    const task = makeTask({ status: "active" });
    useTaskStore.setState({ tasks: [task] });
    get().completeTask(task.id);
    expect(get().tasks[0].status).toBe("archived");
  });

  it("sets completedAt to a non-null ISO string", () => {
    const task = makeTask({ status: "active" });
    useTaskStore.setState({ tasks: [task] });
    get().completeTask(task.id);
    expect(get().tasks[0].completedAt).not.toBeNull();
    expect(get().tasks[0].completedAt).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
    );
  });
});

// ---------------------------------------------------------------------------
// undoComplete
// ---------------------------------------------------------------------------

describe("undoComplete", () => {
  it("reverts status from archived to active", () => {
    const task = makeTask({
      status: "archived",
      completedAt: "2026-04-01T12:00:00.000Z",
    });
    useTaskStore.setState({ tasks: [task] });
    get().undoComplete(task.id);
    expect(get().tasks[0].status).toBe("active");
  });

  it("clears completedAt", () => {
    const task = makeTask({
      status: "archived",
      completedAt: "2026-04-01T12:00:00.000Z",
    });
    useTaskStore.setState({ tasks: [task] });
    get().undoComplete(task.id);
    expect(get().tasks[0].completedAt).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// selectors
// ---------------------------------------------------------------------------

describe("selectors", () => {
  beforeEach(() => {
    useTaskStore.setState({
      tasks: [
        makeTask({ id: "id-1", status: "inbox" }),
        makeTask({ id: "id-2", status: "inbox" }),
        makeTask({ id: "id-3", status: "backlog", quadrant: "q1" }),
        makeTask({ id: "id-4", status: "backlog", quadrant: "q2" }),
        makeTask({ id: "id-5", status: "active" }),
        makeTask({ id: "id-6", status: "archived" }),
      ],
    });
  });

  it("inboxTasks returns only inbox tasks", () => {
    const result = get().inboxTasks();
    expect(result).toHaveLength(2);
    expect(result.every((t) => t.status === "inbox")).toBe(true);
  });

  it("backlogTasks returns only backlog tasks", () => {
    const result = get().backlogTasks();
    expect(result).toHaveLength(2);
    expect(result.every((t) => t.status === "backlog")).toBe(true);
  });

  it("activeTasks returns only active tasks", () => {
    const result = get().activeTasks();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("id-5");
  });

  it("archivedTasks returns only archived tasks", () => {
    const result = get().archivedTasks();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("id-6");
  });

  it("backlogCount returns the number of backlog tasks", () => {
    expect(get().backlogCount()).toBe(2);
  });

  it("quadrantTasks filters by quadrant", () => {
    const result = get().quadrantTasks("q1");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("id-3");
  });

  it("quadrantTasks returns empty array when no match", () => {
    expect(get().quadrantTasks("q4")).toHaveLength(0);
  });
});
