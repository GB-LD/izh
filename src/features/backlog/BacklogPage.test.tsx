import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BacklogPage } from "./BacklogPage";
import { BacklogUndoProvider } from "./BacklogUndoProvider";
import { useTaskStore } from "@/stores/useTaskStore";
import type { Task } from "@/schemas/task";

vi.mock("motion/react", async () => {
  const React = await import("react");
  type MotionDivProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    transition?: unknown;
  };
  const MotionDiv = React.forwardRef<HTMLDivElement, MotionDivProps>(
    (
      {
        children,
        initial: _i,
        animate: _a,
        exit: _e,
        transition: _t,
        ...props
      },
      ref,
    ) => (
      <div ref={ref} {...props}>
        {children}
      </div>
    ),
  );
  MotionDiv.displayName = "MockMotionDiv";
  type MotionLiProps = React.HTMLAttributes<HTMLLIElement> & {
    children?: React.ReactNode;
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    transition?: unknown;
  };
  const MotionLi = React.forwardRef<HTMLLIElement, MotionLiProps>(
    (
      {
        children,
        initial: _i,
        animate: _a,
        exit: _e,
        transition: _t,
        ...props
      },
      ref,
    ) => (
      <li ref={ref} {...props}>
        {children}
      </li>
    ),
  );
  MotionLi.displayName = "MockMotionLi";
  return {
    motion: { div: MotionDiv, li: MotionLi, span: MotionDiv },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => false,
  };
});

const makeTask = (overrides: Partial<Task> = {}): Task => ({
  id: crypto.randomUUID(),
  title: "Tâche",
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

function renderBacklogPage() {
  return render(
    <MemoryRouter>
      <BacklogUndoProvider>
        <BacklogPage />
      </BacklogUndoProvider>
    </MemoryRouter>,
  );
}

const headerOf = (name: RegExp | string) =>
  screen.getByRole("button", { name });

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

afterEach(() => {
  vi.clearAllMocks();
});

describe("BacklogPage", () => {
  it("renders the four quadrant sections even when some are empty", () => {
    useTaskStore.setState({ tasks: [makeTask({ quadrant: "q1" })] });
    renderBacklogPage();

    expect(headerOf(/Faire maintenant/)).toBeInTheDocument();
    expect(headerOf(/Planifier/)).toBeInTheDocument();
    expect(headerOf(/Déléguer/)).toBeInTheDocument();
    expect(headerOf(/Éliminer/)).toBeInTheDocument();
    // Empty sections still display a "0" counter in the header label.
    expect(headerOf("Planifier — 0 tâches")).toBeInTheDocument();
  });

  it("reflects the backlog count in the capacity counter", () => {
    useTaskStore.setState({
      tasks: [
        makeTask({ quadrant: "q1" }),
        makeTask({ quadrant: "q2" }),
        makeTask({ quadrant: "q3" }),
      ],
    });
    renderBacklogPage();
    expect(screen.getByText("3/40")).toBeInTheDocument();
  });

  it("opens Q1 by default", () => {
    useTaskStore.setState({ tasks: [makeTask({ quadrant: "q2" })] });
    renderBacklogPage();
    expect(headerOf(/Faire maintenant/)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(headerOf(/Planifier/)).toHaveAttribute("aria-expanded", "false");
  });

  it("enforces a strict accordion: opening Q2 closes Q1", async () => {
    const user = userEvent.setup();
    useTaskStore.setState({ tasks: [makeTask({ quadrant: "q1" })] });
    renderBacklogPage();

    await user.click(headerOf(/Planifier/));

    expect(headerOf(/Faire maintenant/)).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(headerOf(/Planifier/)).toHaveAttribute("aria-expanded", "true");
  });

  it("re-tapping the open section collapses everything", async () => {
    const user = userEvent.setup();
    useTaskStore.setState({ tasks: [makeTask({ quadrant: "q2" })] });
    renderBacklogPage();

    await user.click(headerOf(/Planifier/));
    expect(headerOf(/Planifier/)).toHaveAttribute("aria-expanded", "true");

    await user.click(headerOf(/Planifier/));
    for (const label of [
      /Faire maintenant/,
      /Planifier/,
      /Déléguer/,
      /Éliminer/,
    ]) {
      expect(headerOf(label)).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("orders tasks within a quadrant by ascending position", () => {
    useTaskStore.setState({
      tasks: [
        makeTask({ quadrant: "q1", title: "Deuxième", position: 2 }),
        makeTask({ quadrant: "q1", title: "Première", position: 1 }),
      ],
    });
    renderBacklogPage();
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Première");
    expect(items[1]).toHaveTextContent("Deuxième");
  });

  it("shows the empty state when the Réserve has no tasks", () => {
    renderBacklogPage();
    expect(
      screen.getByText("Trie tes premières tâches depuis le Vrac"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Aller au Vrac" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Faire maintenant/ }),
    ).not.toBeInTheDocument();
  });

  it("only counts backlog tasks, ignoring other statuses", () => {
    useTaskStore.setState({
      tasks: [
        makeTask({ quadrant: "q1", status: "backlog" }),
        makeTask({ quadrant: "q1", status: "active" }),
        makeTask({ quadrant: null, status: "inbox" }),
      ],
    });
    renderBacklogPage();
    expect(screen.getByText("1/40")).toBeInTheDocument();
    const q1Body = within(headerOf(/Faire maintenant/).closest("section")!);
    expect(q1Body.getAllByRole("listitem")).toHaveLength(1);
  });

  it("keeps one delete action open and lets an outside tap activate normally", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
    const first = makeTask({ id: "first", title: "Première", position: 1 });
    const second = makeTask({ id: "second", title: "Deuxième", position: 2 });
    useTaskStore.setState({ tasks: [first, second] });
    renderBacklogPage();
    const firstRow = screen.getByText("Première").closest("li")!;
    const secondRow = screen.getByText("Deuxième").closest("li")!;

    firstRow.focus();
    fireEvent.keyDown(firstRow, { key: "ArrowLeft" });
    expect(firstRow).toHaveAttribute("data-delete-revealed", "true");

    await userEvent.setup().click(screen.getByText("Première"));
    expect(firstRow).not.toHaveAttribute("data-delete-revealed");

    firstRow.focus();
    fireEvent.keyDown(firstRow, { key: "ArrowLeft" });

    secondRow.focus();
    fireEvent.keyDown(secondRow, { key: "ArrowLeft" });
    expect(firstRow).not.toHaveAttribute("data-delete-revealed");
    expect(secondRow).toHaveAttribute("data-delete-revealed", "true");

    firstRow.focus();
    fireEvent.keyDown(firstRow, { key: "ArrowLeft" });
    const activateSecond = screen.getByRole("button", {
      name: `Activer "${second.title}"`,
    });
    fireEvent.pointerDown(activateSecond, {
      pointerType: "touch",
      pointerId: 1,
      isPrimary: true,
    });
    expect(firstRow).toHaveAttribute("data-delete-revealed", "true");
    fireEvent.pointerUp(activateSecond, {
      pointerType: "touch",
      pointerId: 1,
    });
    fireEvent.click(activateSecond, { detail: 1 });

    expect(firstRow).not.toHaveAttribute("data-delete-revealed");
    expect(
      useTaskStore.getState().tasks.find((task) => task.id === second.id),
    ).toHaveProperty("status", "active");
  });

  it("restores a deleted task from the undo toast", async () => {
    const user = userEvent.setup();
    const task = makeTask({ id: "undo-task", title: "À garder", position: 2 });
    useTaskStore.setState({ tasks: [task] });
    renderBacklogPage();

    await user.click(screen.getByRole("button", { name: /supprimer/i }));

    expect(
      screen.getByRole("status", { name: "Suppression de tâche" }),
    ).toHaveTextContent("Tâche supprimée");
    await user.click(
      screen.getByRole("button", {
        name: `Annuler la suppression de "${task.title}"`,
      }),
    );

    expect(useTaskStore.getState().tasks).toEqual([task]);
    expect(screen.getByText("À garder")).toBeInTheDocument();
    expect(screen.getByText("Annulé !")).toBeInTheDocument();
  });

  it("makes a deletion definitive when Escape closes its undo toast", async () => {
    const user = userEvent.setup();
    const task = makeTask({ id: "escape-task", title: "À retirer" });
    useTaskStore.setState({ tasks: [task] });
    renderBacklogPage();

    await user.click(screen.getByRole("button", { name: /supprimer/i }));
    fireEvent.keyDown(window, { key: "Escape" });

    expect(
      screen.queryByRole("status", { name: "Suppression de tâche" }),
    ).not.toBeInTheDocument();
    expect(useTaskStore.getState().tasks).toEqual([]);
  });
});
