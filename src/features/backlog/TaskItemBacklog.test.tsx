import { fireEvent, render, screen } from "@testing-library/react";
import { useState, type ComponentProps } from "react";
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

function ControlledTaskItemBacklog(
  props: Omit<
    ComponentProps<typeof TaskItemBacklog>,
    "isDeleteRevealed" | "onDeleteRevealChange"
  >,
) {
  const [isDeleteRevealed, setIsDeleteRevealed] = useState(false);
  return (
    <TaskItemBacklog
      {...props}
      isDeleteRevealed={isDeleteRevealed}
      onDeleteRevealChange={setIsDeleteRevealed}
    />
  );
}

function setTouchOnly(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockReturnValue({
      matches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  });
}

beforeEach(() => {
  setTouchOnly(false);
  useTaskStore.setState({ tasks: [] });
  localStorage.clear();
});

describe("TaskItemBacklog", () => {
  it("is a list item with a non-editable task title and its actions", () => {
    const task = makeTask();
    render(
      <ControlledTaskItemBacklog
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
      <ControlledTaskItemBacklog
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
      <ControlledTaskItemBacklog
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
      <ControlledTaskItemBacklog
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

    fireEvent.pointerDown(activation, {
      pointerType: "touch",
      pointerId: 1,
      isPrimary: true,
      clientX: 100,
      clientY: 40,
    });
    fireEvent.pointerUp(activation, {
      pointerType: "touch",
      pointerId: 1,
      clientX: 100,
      clientY: 40,
    });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("deletes through its explicit action", async () => {
    const user = userEvent.setup();
    const task = makeTask();
    const onDelete = vi.fn();
    render(
      <ControlledTaskItemBacklog
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
      <ControlledTaskItemBacklog
        task={task}
        onDelete={onDelete}
        onActivated={() => {}}
      />,
    );

    fireEvent.keyDown(screen.getByRole("listitem"), { key: "Delete" });

    expect(onDelete).toHaveBeenCalledWith(task);
  });

  it("reveals but does not delete after a left touch swipe", () => {
    setTouchOnly(true);
    const task = makeTask();
    const onDelete = vi.fn();
    render(
      <ControlledTaskItemBacklog
        task={task}
        onDelete={onDelete}
        onActivated={() => {}}
      />,
    );
    const item = screen.getByRole("listitem");

    fireEvent.pointerDown(item, {
      pointerType: "touch",
      isPrimary: true,
      pointerId: 1,
      clientX: 100,
      clientY: 40,
    });
    fireEvent.pointerMove(item, {
      pointerType: "touch",
      pointerId: 1,
      clientX: 70,
      clientY: 41,
    });
    fireEvent.pointerUp(item, {
      pointerType: "touch",
      pointerId: 1,
      clientX: 50,
      clientY: 41,
    });

    expect(item).toHaveAttribute("data-delete-revealed", "true");
    expect(onDelete).not.toHaveBeenCalled();

    const deleteButton = screen.getByRole("button", { name: /supprimer/i });
    fireEvent.pointerDown(deleteButton, {
      pointerType: "touch",
      pointerId: 2,
      isPrimary: true,
    });
    fireEvent.click(deleteButton, { detail: 1 });
    expect(onDelete).toHaveBeenCalledWith(task);
  });

  it("closes the revealed action when the swipe ends before 48px", () => {
    setTouchOnly(true);
    const task = makeTask();
    render(
      <ControlledTaskItemBacklog
        task={task}
        onDelete={() => {}}
        onActivated={() => {}}
      />,
    );
    const item = screen.getByRole("listitem");

    fireEvent.pointerDown(item, {
      pointerType: "touch",
      isPrimary: true,
      pointerId: 1,
      clientX: 100,
      clientY: 40,
    });
    fireEvent.pointerMove(item, {
      pointerType: "touch",
      pointerId: 1,
      clientX: 70,
      clientY: 41,
    });
    fireEvent.pointerUp(item, {
      pointerType: "touch",
      pointerId: 1,
      clientX: 70,
      clientY: 41,
    });

    expect(item).not.toHaveAttribute("data-delete-revealed");
  });

  it("ignores a mostly vertical touch movement", () => {
    setTouchOnly(true);
    const task = makeTask();
    render(
      <ControlledTaskItemBacklog
        task={task}
        onDelete={() => {}}
        onActivated={() => {}}
      />,
    );
    const item = screen.getByRole("listitem");

    fireEvent.pointerDown(item, {
      pointerType: "touch",
      pointerId: 1,
      isPrimary: true,
      clientX: 100,
      clientY: 40,
    });
    fireEvent.pointerMove(item, {
      pointerType: "touch",
      pointerId: 1,
      clientX: 110,
      clientY: 75,
    });
    fireEvent.pointerMove(item, {
      pointerType: "touch",
      pointerId: 1,
      clientX: 160,
      clientY: 100,
    });
    fireEvent.pointerUp(item, {
      pointerType: "touch",
      pointerId: 1,
      clientX: 160,
      clientY: 100,
    });

    expect(item).not.toHaveAttribute("data-delete-revealed");
  });

  it("does not reveal the action after a right touch swipe", () => {
    setTouchOnly(true);
    const task = makeTask();
    render(
      <ControlledTaskItemBacklog
        task={task}
        onDelete={() => {}}
        onActivated={() => {}}
      />,
    );
    const item = screen.getByRole("listitem");
    fireEvent.pointerDown(item, {
      pointerType: "touch",
      pointerId: 1,
      isPrimary: true,
      clientX: 100,
      clientY: 40,
    });
    fireEvent.pointerMove(item, {
      pointerType: "touch",
      pointerId: 1,
      clientX: 150,
      clientY: 40,
    });
    fireEvent.pointerUp(item, {
      pointerType: "touch",
      pointerId: 1,
      clientX: 150,
      clientY: 40,
    });
    expect(item).not.toHaveAttribute("data-delete-revealed");
  });

  it("swipes from Activer without activating, but still activates on a tap", () => {
    setTouchOnly(true);
    const task = makeTask({ id: "swipe-activation" });
    useTaskStore.setState({ tasks: [task] });
    const onActivated = vi.fn();
    render(
      <ControlledTaskItemBacklog
        task={task}
        onDelete={() => {}}
        onActivated={onActivated}
      />,
    );
    const item = screen.getByRole("listitem");
    const activate = screen.getByRole("button", {
      name: `Activer "${task.title}"`,
    });

    fireEvent.pointerDown(activate, {
      pointerType: "touch",
      pointerId: 1,
      isPrimary: true,
      clientX: 100,
      clientY: 40,
    });
    fireEvent.pointerMove(activate, {
      pointerType: "touch",
      pointerId: 1,
      clientX: 50,
      clientY: 41,
    });
    fireEvent.pointerUp(activate, {
      pointerType: "touch",
      pointerId: 1,
      clientX: 50,
      clientY: 41,
    });
    fireEvent.click(activate, { detail: 1 });

    expect(item).toHaveAttribute("data-delete-revealed", "true");
    expect(onActivated).not.toHaveBeenCalled();

    fireEvent.pointerDown(activate, {
      pointerType: "touch",
      pointerId: 2,
      isPrimary: true,
      clientX: 100,
      clientY: 40,
    });
    fireEvent.pointerUp(activate, {
      pointerType: "touch",
      pointerId: 2,
      clientX: 100,
      clientY: 40,
    });
    fireEvent.click(activate, { detail: 1 });
    expect(onActivated).toHaveBeenCalledOnce();
  });

  it("opens explicitly from the keyboard and closes with Escape", () => {
    setTouchOnly(true);
    const task = makeTask();
    render(
      <ControlledTaskItemBacklog
        task={task}
        onDelete={() => {}}
        onActivated={() => {}}
      />,
    );
    const item = screen.getByRole("listitem");
    const deleteButton = screen.getByRole("button", { name: /supprimer/i });
    const action = deleteButton.parentElement;
    expect(action).toHaveAttribute("inert");

    item.focus();
    expect(item).not.toHaveAttribute("data-delete-revealed");
    screen.getByRole("button", { name: /activer/i }).focus();
    expect(item).not.toHaveAttribute("data-delete-revealed");
    item.focus();
    fireEvent.keyDown(item, { key: "ArrowLeft" });
    expect(item).toHaveAttribute("data-delete-revealed", "true");
    expect(action).not.toHaveAttribute("inert");

    deleteButton.focus();
    fireEvent.keyDown(deleteButton, { key: "Escape" });
    expect(item).not.toHaveAttribute("data-delete-revealed");
    expect(item).toHaveFocus();
  });
});
