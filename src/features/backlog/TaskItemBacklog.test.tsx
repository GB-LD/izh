import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Task } from "@/schemas/task";
import { useTaskStore } from "@/stores/useTaskStore";
import { MAX_FOCUS_PER_QUADRANT } from "@/lib/constants";
import { TaskItemBacklog } from "./TaskItemBacklog";

const makeTask = (overrides: Partial<Task> = {}): Task => ({
  id: crypto.randomUUID(),
  title: "Préparer la rétro",
  status: "backlog",
  quadrant: "q1",
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

describe("TaskItemBacklog", () => {
  it("is a list item with a non-editable task title and its actions", () => {
    const task = makeTask();
    render(
      <TaskItemBacklog
        task={task}
        onDelete={() => {}}
        onActivated={() => {}}
      />,
    );

    expect(screen.getByRole("listitem")).toHaveTextContent(task.title);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    const activateButton = screen.getByRole("button", {
      name: `Activer "${task.title}"`,
    });
    const deleteButton = screen.getByRole("button", {
      name: `Supprimer la tâche "${task.title}"`,
    });

    expect(activateButton).toHaveClass("btn-secondary", "btn-xs");
    expect(activateButton.querySelector("svg")).toBeNull();
    expect(
      deleteButton.querySelector(".task-item__action-delete"),
    ).not.toBeNull();

    fireEvent.focus(activateButton);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("activates a backlog task and notifies its parent", async () => {
    const user = userEvent.setup();
    const onActivated = vi.fn();
    const task = makeTask({ id: "task-1" });
    useTaskStore.setState({ tasks: [task] });
    render(
      <TaskItemBacklog
        task={task}
        onDelete={() => {}}
        onActivated={onActivated}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: `Activer "${task.title}"` }),
    );

    expect(useTaskStore.getState().tasks[0].status).toBe("active");
    expect(onActivated).toHaveBeenCalledOnce();
  });

  it("explains a full named Focus quadrant without adding text to the task row", () => {
    const task = makeTask({ id: "backlog" });
    const active = Array.from({ length: MAX_FOCUS_PER_QUADRANT }, (_, index) =>
      makeTask({ id: `active-${index}`, status: "active" }),
    );
    useTaskStore.setState({ tasks: [...active, task] });
    render(
      <TaskItemBacklog
        task={task}
        onDelete={() => {}}
        onActivated={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: `Activer "${task.title}" indisponible`,
      }),
    ).toBeDisabled();
    expect(
      screen.queryByText("Focus plein pour ce quadrant (4/4)"),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("reveals and dismisses the full Focus explanation through mouse, keyboard, and touch", () => {
    const task = makeTask({ id: "backlog" });
    const active = Array.from({ length: MAX_FOCUS_PER_QUADRANT }, (_, index) =>
      makeTask({ id: `active-${index}`, status: "active" }),
    );
    useTaskStore.setState({ tasks: [...active, task] });
    render(
      <TaskItemBacklog
        task={task}
        onDelete={() => {}}
        onActivated={() => {}}
      />,
    );

    const activation = screen.getByRole("group", {
      name: `Activer "${task.title}" indisponible`,
    });

    fireEvent.mouseEnter(activation);
    expect(screen.getByRole("tooltip")).toHaveTextContent("Faire maintenant");

    fireEvent.mouseLeave(activation);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    fireEvent.focus(activation);
    const tooltip = screen.getByRole("tooltip");
    expect(activation).toHaveAttribute("aria-describedby", tooltip.id);

    fireEvent.keyDown(activation, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    fireEvent.pointerDown(activation, { pointerType: "touch" });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("deletes through its explicit action", async () => {
    const user = userEvent.setup();
    const task = makeTask();
    const onDelete = vi.fn();
    render(
      <TaskItemBacklog
        task={task}
        onDelete={onDelete}
        onActivated={() => {}}
      />,
    );

    await user.click(screen.getByRole("button", { name: /supprimer/i }));

    expect(onDelete).toHaveBeenCalledWith(task);
  });

  it("deletes with Delete when the Réserve item has focus", () => {
    const task = makeTask();
    const onDelete = vi.fn();
    render(
      <TaskItemBacklog
        task={task}
        onDelete={onDelete}
        onActivated={() => {}}
      />,
    );

    fireEvent.keyDown(screen.getByRole("listitem"), { key: "Delete" });

    expect(onDelete).toHaveBeenCalledWith(task);
  });

  it("reveals but does not delete after a left swipe", () => {
    const task = makeTask();
    const onDelete = vi.fn();
    render(
      <TaskItemBacklog
        task={task}
        onDelete={onDelete}
        onActivated={() => {}}
      />,
    );
    const item = screen.getByRole("listitem");

    fireEvent.pointerDown(item, { clientX: 100 });
    fireEvent.pointerMove(item, { clientX: 70 });
    fireEvent.pointerUp(item, { clientX: 50 });

    expect(item).toHaveAttribute("data-delete-revealed", "true");
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("closes the revealed action when the swipe ends before 40% of its width", () => {
    const task = makeTask();
    render(
      <TaskItemBacklog
        task={task}
        onDelete={() => {}}
        onActivated={() => {}}
      />,
    );
    const item = screen.getByRole("listitem");

    fireEvent.pointerDown(item, { clientX: 100 });
    fireEvent.pointerMove(item, { clientX: 70 });
    fireEvent.pointerUp(item, { clientX: 70 });

    expect(item).not.toHaveAttribute("data-delete-revealed");
  });
});
