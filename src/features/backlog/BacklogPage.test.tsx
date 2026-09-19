import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BacklogPage } from "./BacklogPage";
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
  return {
    motion: { div: MotionDiv },
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
      <BacklogPage />
    </MemoryRouter>,
  );
}

const headerOf = (name: RegExp | string) =>
  screen.getByRole("button", { name });

beforeEach(() => {
  useTaskStore.setState({ tasks: [] });
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
});
