import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SortConfirmation } from "./SortConfirmation";

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

const baseProps = {
  taskTitle: "Acheter du pain",
  proposedQuadrant: "q1" as const,
  progress: { sorted: 4, total: 15 },
  onConfirm: vi.fn(),
  onOverride: vi.fn(),
};

describe("SortConfirmation", () => {
  it("displays the task title and the proposed quadrant", () => {
    render(<SortConfirmation {...baseProps} />);
    expect(screen.getByText("Acheter du pain")).toBeInTheDocument();
    expect(screen.getByText("Faire maintenant")).toBeInTheDocument();
  });

  it("calls onConfirm when 'Ça me parle' is clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<SortConfirmation {...baseProps} onConfirm={onConfirm} />);
    await user.click(screen.getByRole("button", { name: /Ça me parle/ }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("renders exactly three alternatives, never the proposed quadrant", () => {
    render(<SortConfirmation {...baseProps} proposedQuadrant="q1" />);
    const alternatives = screen.getAllByRole("button", {
      name: /Classer dans/,
    });
    expect(alternatives).toHaveLength(3);
    expect(
      screen.queryByRole("button", { name: /Classer dans Faire maintenant/ }),
    ).not.toBeInTheDocument();
  });

  it("calls onOverride with the chosen quadrant", async () => {
    const user = userEvent.setup();
    const onOverride = vi.fn();
    render(
      <SortConfirmation
        {...baseProps}
        proposedQuadrant="q1"
        onOverride={onOverride}
      />,
    );
    await user.click(
      screen.getByRole("button", { name: /Classer dans Planifier/ }),
    );
    expect(onOverride).toHaveBeenCalledWith("q2");
  });

  it("displays the progress counter", () => {
    render(<SortConfirmation {...baseProps} />);
    expect(screen.getByText("4/15 triées")).toBeInTheDocument();
  });
});
