import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SortResult } from "./SortResult";
import type { Task } from "@/schemas/task";

vi.mock("motion/react", async () => {
  const React = await import("react");
  type MotionDivProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
    initial?: unknown;
    animate?: unknown;
    transition?: unknown;
  };
  const MotionDiv = React.forwardRef<HTMLDivElement, MotionDivProps>(
    ({ children, initial: _i, animate: _a, transition: _t, ...props }, ref) => (
      <div ref={ref} {...props}>
        {children}
      </div>
    ),
  );
  MotionDiv.displayName = "MockMotionDiv";
  return {
    motion: { div: MotionDiv },
    useReducedMotion: () => false,
  };
});

const TASK: Task = {
  id: "task-1",
  title: "Acheter du pain",
  status: "backlog",
  quadrant: "q1",
  createdAt: new Date().toISOString(),
  classifiedAt: new Date().toISOString(),
  completedAt: null,
  flowDurationMs: null,
  sourceFlux: "flux1",
  classificationMethod: "assisted",
  userOverride: false,
  position: 0,
};

const baseProps = {
  task: TASK,
  progress: { sorted: 4, total: 15 },
  vracEmpty: false,
  onNextTask: vi.fn(),
  onSeeReserve: vi.fn(),
};

describe("SortResult", () => {
  it("renders the confirmed badge with its Eisenhower descriptor", () => {
    render(<SortResult {...baseProps} />);
    const status = screen
      .getByText("Faire maintenant")
      .closest(".quadrant-badge");
    expect(status).toHaveClass("quadrant-badge--confirmed");
    expect(screen.getByText("Urgent & Important")).toBeInTheDocument();
  });

  it("calls onNextTask when 'Tâche suivante' is clicked", async () => {
    const user = userEvent.setup();
    const onNextTask = vi.fn();
    render(<SortResult {...baseProps} onNextTask={onNextTask} />);
    await user.click(screen.getByRole("button", { name: /Tâche suivante/ }));
    expect(onNextTask).toHaveBeenCalledTimes(1);
  });

  it("calls onSeeReserve when 'Voir la Réserve' is clicked", async () => {
    const user = userEvent.setup();
    const onSeeReserve = vi.fn();
    render(<SortResult {...baseProps} onSeeReserve={onSeeReserve} />);
    await user.click(screen.getByRole("button", { name: /Voir la Réserve/ }));
    expect(onSeeReserve).toHaveBeenCalledTimes(1);
  });

  it("holds the confirmed badge, then replaces task + badge with the celebration when vrac is empty", async () => {
    render(<SortResult {...baseProps} vracEmpty />);
    // Badge phase first: task title + confirmed badge, no celebration yet.
    expect(screen.getByText("Acheter du pain")).toBeInTheDocument();
    expect(
      screen.getByText("Faire maintenant").closest(".quadrant-badge"),
    ).toHaveClass("quadrant-badge--confirmed");
    expect(screen.queryByText("Tout est trié !")).not.toBeInTheDocument();

    // Then the task title + badge disappear, replaced by the celebration only.
    expect(
      await screen.findByText("Tout est trié !", undefined, { timeout: 2000 }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Acheter du pain")).not.toBeInTheDocument();
    expect(screen.queryByText("Faire maintenant")).not.toBeInTheDocument();
    expect(screen.queryByText(/triées/)).not.toBeInTheDocument();
  });

  it("offers 'Voir la Réserve' once the celebration appears", async () => {
    const user = userEvent.setup();
    const onSeeReserve = vi.fn();
    render(<SortResult {...baseProps} vracEmpty onSeeReserve={onSeeReserve} />);
    await user.click(
      await screen.findByRole(
        "button",
        { name: /Voir la Réserve/ },
        { timeout: 2000 },
      ),
    );
    expect(onSeeReserve).toHaveBeenCalledTimes(1);
  });
});
