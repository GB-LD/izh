import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskItemInbox } from "./TaskItemInbox";
import { useTaskStore } from "@/stores/useTaskStore";
import type { Task } from "@/schemas/task";

const makeTask = (overrides: Partial<Task> = {}): Task => ({
  id: crypto.randomUUID(),
  title: "Préparer la rétro",
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

describe("TaskItemInbox", () => {
  it("renders the task title in the editable input", () => {
    const task = makeTask({ title: "Préparer la rétro" });
    render(<TaskItemInbox task={task} />);

    expect(screen.getByDisplayValue("Préparer la rétro")).toBeInTheDocument();
  });

  it("renders the delete button with the correct aria-label", () => {
    const task = makeTask({ title: "Préparer la rétro" });
    render(<TaskItemInbox task={task} />);

    expect(
      screen.getByRole("button", {
        name: /supprimer la tâche "Préparer la rétro"/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the sort button", () => {
    const task = makeTask();
    render(<TaskItemInbox task={task} />);

    expect(screen.getByRole("button", { name: /trier/i })).toBeInTheDocument();
  });

  it("updates the title on blur when the value changed", async () => {
    const user = userEvent.setup();
    const task = makeTask({ id: "t1", title: "Titre original" });
    useTaskStore.setState({ tasks: [task] });

    render(<TaskItemInbox task={task} />);

    const input = screen.getByDisplayValue("Titre original");
    await user.clear(input);
    await user.type(input, "Nouveau titre");
    await user.tab();

    expect(useTaskStore.getState().tasks[0].title).toBe("Nouveau titre");
  });

  it("trims the title before saving on blur", async () => {
    const user = userEvent.setup();
    const task = makeTask({ id: "t1", title: "Titre original" });
    useTaskStore.setState({ tasks: [task] });

    render(<TaskItemInbox task={task} />);

    const input = screen.getByDisplayValue("Titre original");
    await user.clear(input);
    await user.type(input, "  Titre avec espaces  ");
    await user.tab();

    expect(useTaskStore.getState().tasks[0].title).toBe("Titre avec espaces");
  });

  it("does not update if the title has not changed", async () => {
    const user = userEvent.setup();
    const task = makeTask({ id: "t1", title: "Titre inchangé" });
    useTaskStore.setState({ tasks: [task] });

    const updateTask = vi.spyOn(useTaskStore.getState(), "updateTask");
    render(<TaskItemInbox task={task} />);

    const input = screen.getByDisplayValue("Titre inchangé");
    await user.click(input);
    await user.tab();

    expect(updateTask).not.toHaveBeenCalled();
    updateTask.mockRestore();
  });

  it("reverts to the original title on blur when the input is cleared", async () => {
    const user = userEvent.setup();
    const task = makeTask({ id: "t1", title: "Titre original" });
    useTaskStore.setState({ tasks: [task] });

    render(<TaskItemInbox task={task} />);

    const input = screen.getByDisplayValue("Titre original");
    await user.clear(input);
    await user.tab();

    expect(input).toHaveValue("Titre original");
    expect(useTaskStore.getState().tasks[0].title).toBe("Titre original");
  });

  it("reverts the edit and blurs on Escape", async () => {
    const user = userEvent.setup();
    const task = makeTask({ title: "Titre original" });
    render(<TaskItemInbox task={task} />);

    const input = screen.getByDisplayValue("Titre original");
    await user.click(input);
    await user.keyboard("Suite modifiée{Escape}");

    expect(input).toHaveValue("Titre original");
    expect(input).not.toHaveFocus();
  });

  it("commits the edit and blurs on Enter", async () => {
    const user = userEvent.setup();
    const task = makeTask({ id: "t1", title: "Titre original" });
    useTaskStore.setState({ tasks: [task] });

    render(<TaskItemInbox task={task} />);

    const input = screen.getByDisplayValue("Titre original");
    await user.clear(input);
    await user.type(input, "Titre validé{Enter}");

    expect(input).not.toHaveFocus();
    expect(useTaskStore.getState().tasks[0].title).toBe("Titre validé");
  });

  it("deletes the task when clicking the delete button", async () => {
    const user = userEvent.setup();
    const task = makeTask({ id: "t1", title: "À supprimer" });
    useTaskStore.setState({ tasks: [task] });

    render(<TaskItemInbox task={task} />);

    const deleteButton = screen.getByRole("button", {
      name: /supprimer la tâche "À supprimer"/i,
    });
    await user.click(deleteButton);

    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });

  it("focuses the input when clicking the list item outside a button", () => {
    const task = makeTask({ title: "Ma tâche" });
    render(<TaskItemInbox task={task} />);

    const listItem = screen.getByRole("listitem");
    fireEvent.pointerDown(listItem);

    expect(screen.getByDisplayValue("Ma tâche")).toHaveFocus();
  });
});
