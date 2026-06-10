import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QuadrantBadge } from "./QuadrantBadge";
import type { Quadrant } from "@/schemas/task";

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

const CASES: { quadrant: Quadrant; label: string }[] = [
  { quadrant: "q1", label: "Faire maintenant" },
  { quadrant: "q2", label: "Planifier" },
  { quadrant: "q3", label: "Déléguer" },
  { quadrant: "q4", label: "Éliminer" },
];

describe("QuadrantBadge", () => {
  it.each(CASES)(
    "renders the label and quadrant class for $quadrant",
    ({ quadrant, label }) => {
      const { container } = render(<QuadrantBadge quadrant={quadrant} />);
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(
        container.querySelector(`.quadrant-badge--${quadrant}`),
      ).toBeInTheDocument();
    },
  );

  it("exposes role=status when confirmed", () => {
    render(<QuadrantBadge quadrant="q1" state="confirmed" />);
    const status = screen.getByRole("status");
    expect(status).toHaveClass("quadrant-badge--confirmed");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("does not expose a status role in the default state", () => {
    render(<QuadrantBadge quadrant="q1" />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders the decorative icon as aria-hidden", () => {
    const { container } = render(<QuadrantBadge quadrant="q2" />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("renders an optional subtitle", () => {
    render(<QuadrantBadge quadrant="q3" subtitle="Source flux 2" />);
    expect(screen.getByText("Source flux 2")).toBeInTheDocument();
  });
});
