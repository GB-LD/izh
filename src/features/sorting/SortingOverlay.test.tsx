import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SortingOverlay } from "./SortingOverlay";
import { useUIStore } from "@/stores/useUIStore";
import { useTaskStore } from "@/stores/useTaskStore";
import { useFlowStore } from "@/stores/useFlowStore";
import type { Task } from "@/schemas/task";

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
    variants?: unknown;
    transition?: unknown;
    onAnimationComplete?: (definition: string) => void;
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
        variants: _variants,
        transition: _transition,
        onAnimationComplete,
        onDragEnd,
        ...props
      },
      ref,
    ) => {
      // Simulate the enter animation finishing so consumers relying on
      // onAnimationComplete (e.g. focusing the first option) run in tests.
      React.useEffect(() => {
        onAnimationComplete?.("animate");
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

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
    motion: { div: MotionDiv },
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

const TASK: Task = {
  id: "task-1",
  title: "Acheter du pain",
  status: "inbox",
  quadrant: null,
  createdAt: new Date().toISOString(),
  classifiedAt: null,
  completedAt: null,
  flowDurationMs: null,
  sourceFlux: null,
  classificationMethod: null,
  userOverride: null,
  position: 0,
};

const FLOW_WITH_TASK = {
  taskId: "task-1",
  isActive: false,
  currentFlux: null,
  currentStep: 0,
  answers: [],
};

beforeEach(() => {
  useUIStore.setState({
    activeOverlay: null,
    activeFocusQuadrant: null,
    onboardingFlags: {},
  });
  useFlowStore.setState({
    taskId: null,
    isActive: false,
    currentFlux: null,
    currentStep: 0,
    answers: [],
  });
  useTaskStore.setState({ tasks: [] });
  mockMatchMedia(false);
});

describe("SortingOverlay", () => {
  it("renders nothing when overlay is closed", () => {
    render(<SortingOverlay />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders a dialog when activeOverlay is 'sorting'", () => {
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    render(<SortingOverlay />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("displays the task title in the context header", () => {
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    render(<SortingOverlay />);

    expect(screen.getByText("Acheter du pain")).toBeInTheDocument();
  });

  it("renders all four quadrant buttons", () => {
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    render(<SortingOverlay />);

    expect(
      screen.getByRole("button", { name: /Classer dans Faire maintenant/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Classer dans Planifier/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Classer dans Déléguer/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Classer dans Éliminer/ }),
    ).toBeInTheDocument();
  });

  it("renders the 'Aide-moi à décider' primary button", () => {
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    render(<SortingOverlay />);

    expect(
      screen.getByRole("button", { name: /Aide-moi à décider/ }),
    ).toBeInTheDocument();
  });

  it("classifies the task when a quadrant button is clicked", async () => {
    const user = userEvent.setup();
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    render(<SortingOverlay />);

    await user.click(
      screen.getByRole("button", { name: /Classer dans Faire maintenant/ }),
    );

    const task = useTaskStore.getState().tasks.find((t) => t.id === "task-1");
    expect(task?.quadrant).toBe("q1");
    expect(task?.classificationMethod).toBe("manual");
    expect(task?.status).toBe("backlog");
    expect(
      screen.queryByRole("button", { name: /Classer dans/ }),
    ).not.toBeInTheDocument();
  });

  it("classifies with the correct quadrant for each button", async () => {
    const user = userEvent.setup();

    const quadrantMap = [
      { name: /Classer dans Planifier/, expected: "q2" },
      { name: /Classer dans Déléguer/, expected: "q3" },
      { name: /Classer dans Éliminer/, expected: "q4" },
    ] as const;

    for (const { name, expected } of quadrantMap) {
      useUIStore.setState({ activeOverlay: "sorting" });
      useFlowStore.setState(FLOW_WITH_TASK);
      useTaskStore.setState({
        tasks: [
          {
            ...TASK,
            status: "inbox",
            quadrant: null,
            classificationMethod: null,
          },
        ],
      });

      const { unmount } = render(<SortingOverlay />);
      await user.click(screen.getByRole("button", { name }));

      const task = useTaskStore.getState().tasks.find((t) => t.id === "task-1");
      expect(task?.quadrant).toBe(expected);
      unmount();
    }
  });

  it("starts the assisted flow when 'Aide-moi à décider' is clicked", async () => {
    const user = userEvent.setup();
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    render(<SortingOverlay />);

    await user.click(
      screen.getByRole("button", { name: /Aide-moi à décider/ }),
    );

    expect(useFlowStore.getState().isActive).toBe(true);
    expect(useUIStore.getState().activeOverlay).toBe("sorting");
    expect(
      screen.queryByRole("button", { name: /Classer dans/ }),
    ).not.toBeInTheDocument();
  });

  it("preserves taskId in FlowStore when starting the assisted flow", async () => {
    const user = userEvent.setup();
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    render(<SortingOverlay />);

    await user.click(
      screen.getByRole("button", { name: /Aide-moi à décider/ }),
    );

    expect(useFlowStore.getState().taskId).toBe("task-1");
  });

  it("closes without classifying when the backdrop is clicked", () => {
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    render(<SortingOverlay />);

    const backdrop = document.querySelector(".overlay-backdrop");
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop!);

    expect(useUIStore.getState().activeOverlay).toBeNull();
    expect(useFlowStore.getState().taskId).toBeNull();
    const task = useTaskStore.getState().tasks.find((t) => t.id === "task-1");
    expect(task?.status).toBe("inbox");
    expect(task?.quadrant).toBeNull();
  });

  it("closes without classifying when Escape is pressed", () => {
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    render(<SortingOverlay />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(useUIStore.getState().activeOverlay).toBeNull();
    expect(useFlowStore.getState().taskId).toBeNull();
    const task = useTaskStore.getState().tasks.find((t) => t.id === "task-1");
    expect(task?.status).toBe("inbox");
    expect(task?.quadrant).toBeNull();
  });
});
