import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { OverlayShell } from "./OverlayShell";

vi.mock("motion/react", async () => {
  const React = await import("react");

  type MotionDivProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
    drag?: unknown;
    dragControls?: unknown;
    dragListener?: unknown;
    dragConstraints?: unknown;
    dragElastic?: unknown;
    dragMomentum?: unknown;
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    onDragEnd?: (
      event: Event,
      info: {
        offset: { x: number; y: number };
        velocity: { x: number; y: number };
      },
    ) => void;
  };

  const MotionDiv = React.forwardRef<HTMLDivElement, MotionDivProps>(
    (
      {
        children,
        drag: _drag,
        dragControls: _dragControls,
        dragListener: _dragListener,
        dragConstraints: _dragConstraints,
        dragElastic: _dragElastic,
        dragMomentum: _dragMomentum,
        initial: _initial,
        animate: _animate,
        exit: _exit,
        onDragEnd,
        ...props
      },
      ref,
    ) => {
      return (
        <div
          ref={ref}
          {...props}
          onDragEnd={(event) => {
            onDragEnd?.(event as unknown as Event, {
              offset: { x: 0, y: 120 },
              velocity: { x: 0, y: 600 },
            });
          }}
        >
          {children}
        </div>
      );
    },
  );

  MotionDiv.displayName = "MockMotionDiv";

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    motion: {
      div: MotionDiv,
    },
    useReducedMotion: () => false,
    useDragControls: () => ({ start: vi.fn() }),
  };
});

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe("OverlayShell", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
    mockMatchMedia(false);
    document.body.style.overflow = "";
  });

  it("renders nothing when isOpen is false", () => {
    render(
      <OverlayShell isOpen={false} onClose={onClose} variant="flow">
        <p>Contenu</p>
      </OverlayShell>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders a dialog with aria-modal when opened", () => {
    render(
      <OverlayShell isOpen={true} onClose={onClose} variant="flow">
        <h2 id="overlay-title">Titre</h2>
      </OverlayShell>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("calls onClose when clicking the backdrop", () => {
    render(
      <OverlayShell isOpen={true} onClose={onClose} variant="flow">
        <p>Contenu</p>
      </OverlayShell>,
    );

    const backdrop = document.querySelector(".overlay-backdrop");

    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop!);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking the close button", async () => {
    mockMatchMedia(true);
    const user = userEvent.setup();

    render(
      <OverlayShell isOpen={true} onClose={onClose} variant="flow">
        <p>Contenu</p>
      </OverlayShell>,
    );

    await user.click(screen.getByRole("button", { name: /fermer/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when pressing Escape", () => {
    render(
      <OverlayShell isOpen={true} onClose={onClose} variant="flow">
        <button type="button">Action</button>
      </OverlayShell>,
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the mobile handle drag passes the close threshold", () => {
    render(
      <OverlayShell isOpen={true} onClose={onClose} variant="flow">
        <p>Contenu</p>
      </OverlayShell>,
    );

    const dialog = screen.getByRole("dialog");
    fireEvent.dragEnd(dialog);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("keeps focus trapped inside the overlay when tabbing", async () => {
    mockMatchMedia(true);
    const user = userEvent.setup();

    render(
      <OverlayShell isOpen={true} onClose={onClose} variant="flow">
        <button type="button">Premier</button>
        <button type="button">Second</button>
      </OverlayShell>,
    );

    const closeButton = screen.getByRole("button", { name: /fermer/i });
    const firstButton = screen.getByRole("button", { name: "Premier" });
    const secondButton = screen.getByRole("button", { name: "Second" });

    await waitFor(() => {
      expect(closeButton).toHaveFocus();
    });

    await user.tab();
    expect(firstButton).toHaveFocus();

    await user.tab();
    expect(secondButton).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();

    await user.tab({ shift: true });
    expect(secondButton).toHaveFocus();
  });

  it("returns focus to the trigger when the overlay closes", async () => {
    mockMatchMedia(true);
    const user = userEvent.setup();
    const triggerRef = React.createRef<HTMLElement>();

    const { rerender } = render(
      <>
        <button
          ref={triggerRef as React.RefObject<HTMLButtonElement>}
          type="button"
        >
          Ouvrir
        </button>
        <OverlayShell isOpen={false} onClose={onClose} variant="flow">
          <button type="button">Premier</button>
        </OverlayShell>
      </>,
    );

    const trigger = screen.getByRole("button", { name: "Ouvrir" });
    await user.click(trigger);
    expect(trigger).toHaveFocus();

    rerender(
      <>
        <button
          ref={triggerRef as React.RefObject<HTMLButtonElement>}
          type="button"
        >
          Ouvrir
        </button>
        <OverlayShell
          isOpen={true}
          onClose={onClose}
          variant="flow"
          triggerRef={triggerRef}
        >
          <button type="button">Premier</button>
        </OverlayShell>
      </>,
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /fermer/i })).toHaveFocus();
    });

    rerender(
      <>
        <button
          ref={triggerRef as React.RefObject<HTMLButtonElement>}
          type="button"
        >
          Ouvrir
        </button>
        <OverlayShell
          isOpen={false}
          onClose={onClose}
          variant="flow"
          triggerRef={triggerRef}
        >
          <button type="button">Premier</button>
        </OverlayShell>
      </>,
    );

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it("does not render the drag handle on desktop", () => {
    mockMatchMedia(true);

    render(
      <OverlayShell isOpen={true} onClose={onClose} variant="flow">
        <p>Contenu</p>
      </OverlayShell>,
    );

    expect(document.querySelector(".overlay-handle")).toBeNull();
  });
});
