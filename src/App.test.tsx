import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Task } from "@/schemas/task";
import { useTaskStore } from "@/stores/useTaskStore";
import { App } from "./App";

const makeReserveTask = (title: string): Task => ({
  id: crypto.randomUUID(),
  title,
  status: "backlog",
  quadrant: "q1",
  createdAt: "2026-04-01T10:00:00.000Z",
  classifiedAt: "2026-04-01T10:00:00.000Z",
  completedAt: null,
  flowDurationMs: null,
  sourceFlux: null,
  classificationMethod: "manual",
  userOverride: null,
  position: 1,
});

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  });
  useTaskStore.setState({ tasks: [], pendingBacklogDeletions: [] });
  localStorage.clear();
});

afterEach(() => vi.useRealTimers());

describe("Reserve deletion in the app", () => {
  it("keeps undo available after navigating away from the Reserve", async () => {
    const user = userEvent.setup();
    const task = makeReserveTask("À garder");
    useTaskStore.setState({ tasks: [task] });
    render(
      <MemoryRouter initialEntries={["/backlog"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", {
        name: `Supprimer la tâche "${task.title}"`,
      }),
    );
    const undo = screen.getByRole("button", {
      name: `Annuler la suppression de "${task.title}"`,
    });
    const bottomNav = screen.getByRole("navigation", {
      name: "Navigation en bas de page",
    });
    await user.click(
      within(bottomNav).getByRole("link", { name: "Liste des tâches" }),
    );

    expect(screen.getByRole("heading", { name: "Liste" })).toBeInTheDocument();
    expect(undo).toBeInTheDocument();

    await user.click(undo);
    await user.click(within(bottomNav).getByRole("link", { name: "Réserve" }));
    expect(screen.getByText(task.title)).toBeInTheDocument();
  });

  it("keeps a deleted task's place reserved until undo expires", () => {
    vi.useFakeTimers();
    const tasks = Array.from({ length: 40 }, (_, index) => ({
      ...makeReserveTask(`Tâche ${index + 1}`),
      position: index + 1,
    }));
    useTaskStore.setState({ tasks });
    render(
      <MemoryRouter initialEntries={["/backlog"]}>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: `Supprimer la tâche "${tasks[0].title}"`,
      }),
    );
    expect(screen.getByText("40/40")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText("39/40")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: `Annuler la suppression de "${tasks[0].title}"`,
      }),
    ).not.toBeInTheDocument();
  });

  it("blocks sorting while the last Reserve place is reserved for undo", async () => {
    const user = userEvent.setup();
    const reserveTasks = Array.from({ length: 40 }, (_, index) => ({
      ...makeReserveTask(`Tâche ${index + 1}`),
      position: index + 1,
    }));
    const inboxTask: Task = {
      ...makeReserveTask("À trier"),
      status: "inbox",
      quadrant: null,
      classifiedAt: null,
      classificationMethod: null,
    };
    useTaskStore.setState({ tasks: [...reserveTasks, inboxTask] });
    render(
      <MemoryRouter initialEntries={["/backlog"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", {
        name: `Supprimer la tâche "${reserveTasks[0].title}"`,
      }),
    );
    const bottomNav = screen.getByRole("navigation", {
      name: "Navigation en bas de page",
    });
    await user.click(
      within(bottomNav).getByRole("link", { name: "Liste des tâches" }),
    );
    await user.click(
      screen.getByRole("button", { name: `Trier "${inboxTask.title}"` }),
    );

    expect(
      screen.getByRole("heading", { name: "Réserve pleine" }),
    ).toBeInTheDocument();
  });

  it("keeps independent five-second undo windows for recent deletions", () => {
    vi.useFakeTimers();
    const first = makeReserveTask("Première");
    const second = { ...makeReserveTask("Deuxième"), position: 2 };
    useTaskStore.setState({ tasks: [first, second] });
    render(
      <MemoryRouter initialEntries={["/backlog"]}>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: `Supprimer la tâche "${first.title}"`,
      }),
    );
    act(() => vi.advanceTimersByTime(2000));
    fireEvent.click(
      screen.getByRole("button", {
        name: `Supprimer la tâche "${second.title}"`,
      }),
    );

    expect(
      screen.getByRole("button", {
        name: `Annuler la suppression de "${first.title}"`,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `Annuler la suppression de "${second.title}"`,
      }),
    ).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(3000));
    expect(
      screen.queryByRole("button", {
        name: `Annuler la suppression de "${first.title}"`,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `Annuler la suppression de "${second.title}"`,
      }),
    ).toBeInTheDocument();
  });

  it("dismisses only the most recent undo when Escape is pressed", () => {
    const first = makeReserveTask("Première");
    const second = { ...makeReserveTask("Deuxième"), position: 2 };
    useTaskStore.setState({ tasks: [first, second] });
    render(
      <MemoryRouter initialEntries={["/backlog"]}>
        <App />
      </MemoryRouter>,
    );

    for (const task of [first, second]) {
      fireEvent.click(
        screen.getByRole("button", {
          name: `Supprimer la tâche "${task.title}"`,
        }),
      );
    }
    fireEvent.keyDown(window, { key: "Escape" });

    expect(
      screen.getByRole("button", {
        name: `Annuler la suppression de "${first.title}"`,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: `Annuler la suppression de "${second.title}"`,
      }),
    ).not.toBeInTheDocument();
  });
});
