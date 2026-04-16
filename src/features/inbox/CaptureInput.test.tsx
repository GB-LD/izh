import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CaptureInput } from "./CaptureInput";
import { useTaskStore } from "@/stores/useTaskStore";

beforeEach(() => {
  useTaskStore.setState({ tasks: [] });
  localStorage.clear();
});

describe("CaptureInput", () => {
  it("adds a task when submitting with Enter", async () => {
    const user = userEvent.setup();
    render(<CaptureInput />);

    const input = screen.getByRole("textbox", { name: /ajouter une tâche/i });
    await user.type(input, "Ma tâche{Enter}");

    const tasks = useTaskStore.getState().tasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("Ma tâche");
    expect(tasks[0].status).toBe("inbox");
  });

  it("adds a task through form submit (mobile submit path)", async () => {
    const user = userEvent.setup();
    render(<CaptureInput />);

    const input = screen.getByRole("textbox", { name: /ajouter une tâche/i });
    await user.type(input, "Soumission mobile");

    const form = input.closest("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    const tasks = useTaskStore.getState().tasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("Soumission mobile");
  });

  it("adds a task on submit even after composition start", async () => {
    const user = userEvent.setup();
    render(<CaptureInput />);

    const input = screen.getByRole("textbox", { name: /ajouter une tâche/i });
    await user.type(input, "Texte iPhone");

    fireEvent.compositionStart(input);

    const form = input.closest("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    const tasks = useTaskStore.getState().tasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("Texte iPhone");
  });

  it("persists the created task in localStorage", async () => {
    const user = userEvent.setup();
    render(<CaptureInput />);

    const input = screen.getByRole("textbox", { name: /ajouter une tâche/i });
    await user.type(input, "Tâche persistée{Enter}");

    await waitFor(() => {
      expect(localStorage.getItem("izh-tasks")).not.toBeNull();
    });

    const persistedRaw = localStorage.getItem("izh-tasks");
    expect(persistedRaw).not.toBeNull();

    const persisted = JSON.parse(persistedRaw as string) as {
      state?: { tasks?: Array<{ title?: string }> };
    };

    expect(persisted.state?.tasks?.[0]?.title).toBe("Tâche persistée");
  });

  it("clears the field and keeps focus after submit", async () => {
    const user = userEvent.setup();
    render(<CaptureInput />);

    const input = screen.getByRole("textbox", { name: /ajouter une tâche/i });
    await user.type(input, "Continuer la capture{Enter}");

    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
  });

  it("does not add a task when only spaces are submitted", async () => {
    const user = userEvent.setup();
    render(<CaptureInput />);

    const input = screen.getByRole("textbox", { name: /ajouter une tâche/i });
    await user.type(input, "   {Enter}");

    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });

  it("trims title before creating task", async () => {
    const user = userEvent.setup();
    render(<CaptureInput />);

    const input = screen.getByRole("textbox", { name: /ajouter une tâche/i });
    await user.type(input, "  ma tâche  {Enter}");

    expect(useTaskStore.getState().tasks).toHaveLength(1);
    expect(useTaskStore.getState().tasks[0].title).toBe("ma tâche");
  });

  it("shows clear button when typing and hides it after clearing", async () => {
    const user = userEvent.setup();
    const { container } = render(<CaptureInput />);

    const input = screen.getByRole("textbox", { name: /ajouter une tâche/i });
    const hiddenClearButton = container.querySelector(".input-capture__clear");
    expect(hiddenClearButton).not.toBeNull();
    expect(hiddenClearButton).toHaveAttribute("aria-hidden", "true");
    expect(hiddenClearButton).toHaveAttribute("tabindex", "-1");

    await user.type(input, "a");
    const visibleClearButton = screen.getByRole("button", {
      name: /effacer le texte/i,
    });
    expect(visibleClearButton).toBeInTheDocument();

    await user.click(visibleClearButton);
    expect(input).toHaveValue("");

    const hiddenClearButtonAfterClearing = container.querySelector(
      ".input-capture__clear",
    );
    expect(hiddenClearButtonAfterClearing).not.toBeNull();
    expect(hiddenClearButtonAfterClearing).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(hiddenClearButtonAfterClearing).toHaveAttribute("tabindex", "-1");
  });

  it("clears field and removes focus on Escape", async () => {
    const user = userEvent.setup();
    render(<CaptureInput />);

    const input = screen.getByRole("textbox", { name: /ajouter une tâche/i });
    await user.type(input, "À effacer");
    expect(input).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(input).toHaveValue("");
    expect(input).not.toHaveFocus();
  });
});
