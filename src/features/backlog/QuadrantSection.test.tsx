import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { QuadrantSection } from "./QuadrantSection";
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

describe("QuadrantSection", () => {
  it("renders the quadrant label, counter and task titles", () => {
    render(
      <QuadrantSection
        quadrant="q1"
        tasks={[
          makeTask({ title: "Appeler le médecin" }),
          makeTask({ title: "Payer la facture" }),
        ]}
        isOpen
        onToggle={() => {}}
      />,
    );
    expect(screen.getByText("Faire maintenant")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Faire maintenant — 2 tâches" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Appeler le médecin")).toBeInTheDocument();
    expect(screen.getByText("Payer la facture")).toBeInTheDocument();
  });

  it("reflects the open state via aria-expanded", () => {
    const { rerender } = render(
      <QuadrantSection
        quadrant="q2"
        tasks={[]}
        isOpen={false}
        onToggle={() => {}}
      />,
    );
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    rerender(
      <QuadrantSection quadrant="q2" tasks={[]} isOpen onToggle={() => {}} />,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onToggle when the header is clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <QuadrantSection
        quadrant="q3"
        tasks={[]}
        isOpen={false}
        onToggle={onToggle}
      />,
    );
    await user.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it("shows an empty message when open with no tasks", () => {
    render(
      <QuadrantSection quadrant="q4" tasks={[]} isOpen onToggle={() => {}} />,
    );
    expect(screen.getByText("Aucune tâche")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Éliminer — 0 tâches" }),
    ).toBeInTheDocument();
  });
});
