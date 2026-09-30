import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Toast } from "./Toast";

vi.mock("motion/react", async () => {
  const React = await import("react");

  type MotionProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    transition?: unknown;
  };

  function motionData(value: unknown) {
    return JSON.stringify(value);
  }

  const MotionDiv = React.forwardRef<HTMLDivElement, MotionProps>(
    ({ children, initial, animate, exit, transition, ...props }, ref) => (
      <div
        ref={ref}
        data-motion-initial={motionData(initial)}
        data-motion-animate={motionData(animate)}
        data-motion-exit={motionData(exit)}
        data-motion-transition={motionData(transition)}
        {...props}
      >
        {children}
      </div>
    ),
  );
  MotionDiv.displayName = "MockMotionDiv";

  const MotionSpan = React.forwardRef<HTMLSpanElement, MotionProps>(
    ({ children, initial, animate, exit, transition, ...props }, ref) => (
      <span
        ref={ref}
        data-motion-initial={motionData(initial)}
        data-motion-animate={motionData(animate)}
        data-motion-exit={motionData(exit)}
        data-motion-transition={motionData(transition)}
        {...props}
      >
        {children}
      </span>
    ),
  );
  MotionSpan.displayName = "MockMotionSpan";

  return {
    motion: { div: MotionDiv, span: MotionSpan },
    useReducedMotion: () => false,
  };
});

describe("Toast", () => {
  it("announces undo politely as a status", () => {
    render(
      <Toast
        variant="undo"
        message="Tâche supprimée"
        remainingMs={5000}
        onUndo={() => {}}
      />,
    );

    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });

  it("keeps its horizontal centering during entry, display, and exit", () => {
    render(<Toast message="Ajoutée à ton Focus" />);

    const toast = screen.getByRole("status");
    for (const phase of [
      "data-motion-initial",
      "data-motion-animate",
      "data-motion-exit",
    ]) {
      expect(JSON.parse(toast.getAttribute(phase) ?? "{}")).toMatchObject({
        x: "-50%",
      });
    }
  });

  it("animates undo progress continuously to zero for the remaining duration", () => {
    const { container } = render(
      <Toast
        variant="undo"
        message="Tâche supprimée"
        remainingMs={2500}
        onUndo={() => {}}
      />,
    );

    const progress = container.querySelector(".toast__progress");
    expect(progress).toHaveAttribute("aria-hidden", "true");
    expect(
      JSON.parse(progress?.getAttribute("data-motion-animate") ?? "{}"),
    ).toEqual({
      scaleX: 0,
    });
    expect(
      JSON.parse(progress?.getAttribute("data-motion-transition") ?? "{}"),
    ).toMatchObject({ duration: 2.5, ease: "linear" });

    fireEvent.mouseEnter(
      screen.getByRole("status", { name: "Suppression de tâche" }),
    );

    expect(
      JSON.parse(progress?.getAttribute("data-motion-animate") ?? "{}"),
    ).toEqual({
      scaleX: 0.5,
    });
    expect(
      JSON.parse(progress?.getAttribute("data-motion-transition") ?? "{}"),
    ).toMatchObject({ duration: 0 });
  });

  it("keeps the undo window paused until every active interaction ends", () => {
    const onPause = vi.fn();
    const onResume = vi.fn();
    render(
      <Toast
        variant="undo"
        message="Tâche supprimée"
        remainingMs={2500}
        onPause={onPause}
        onResume={onResume}
      />,
    );

    const toast = screen.getByRole("status", { name: "Suppression de tâche" });
    fireEvent.mouseEnter(toast);
    fireEvent.pointerDown(toast);
    fireEvent.pointerUp(toast);

    expect(onPause).toHaveBeenCalledOnce();
    expect(onResume).not.toHaveBeenCalled();

    fireEvent.mouseLeave(toast);
    expect(onResume).toHaveBeenCalledOnce();
  });
});
