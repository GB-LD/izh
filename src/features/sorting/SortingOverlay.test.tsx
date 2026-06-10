import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
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

function renderOverlay() {
  return render(<SortingOverlay />, { wrapper: MemoryRouter });
}

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

const TASK2: Task = {
  ...TASK,
  id: "task-2",
  title: "Appeler le dentiste",
  position: 1,
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
    renderOverlay();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders a dialog when activeOverlay is 'sorting'", () => {
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    renderOverlay();

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("displays the task title in the context header", () => {
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    renderOverlay();

    expect(screen.getByText("Acheter du pain")).toBeInTheDocument();
  });

  it("renders all four quadrant buttons", () => {
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    renderOverlay();

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

    renderOverlay();

    expect(
      screen.getByRole("button", { name: /Aide-moi à décider/ }),
    ).toBeInTheDocument();
  });

  it("classifies the task when a quadrant button is clicked", async () => {
    const user = userEvent.setup();
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    renderOverlay();

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

      const { unmount } = renderOverlay();
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

    renderOverlay();

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

    renderOverlay();

    await user.click(
      screen.getByRole("button", { name: /Aide-moi à décider/ }),
    );

    expect(useFlowStore.getState().taskId).toBe("task-1");
  });

  it("closes without classifying when the backdrop is clicked", () => {
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    renderOverlay();

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

    renderOverlay();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(useUIStore.getState().activeOverlay).toBeNull();
    expect(useFlowStore.getState().taskId).toBeNull();
    const task = useTaskStore.getState().tasks.find((t) => t.id === "task-1");
    expect(task?.status).toBe("inbox");
    expect(task?.quadrant).toBeNull();
  });

  // Walk the assisted questionnaire to its shortest terminal node
  // (Flux 1 → q1): "traîne" → "ne me rappelle plus" → "conséquence sérieuse".
  async function reachConfirmation(user: ReturnType<typeof userEvent.setup>) {
    await user.click(
      screen.getByRole("button", { name: /Aide-moi à décider/ }),
    );
    await user.click(
      await screen.findByText("💤 Non, elle traîne dans ma liste"),
    );
    await user.click(
      await screen.findByText(
        "🤷 Je ne me rappelle plus pourquoi je l'ai notée",
      ),
    );
    await user.click(
      await screen.findByText(
        "💥 Conséquence sérieuse : deadline ratée, projet bloqué",
      ),
    );
    await screen.findByRole("button", { name: /Ça me parle/ });
  }

  it("moves to confirmation after the questionnaire without classifying", async () => {
    const user = userEvent.setup();
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK] });

    renderOverlay();
    await reachConfirmation(user);

    const task = useTaskStore.getState().tasks.find((t) => t.id === "task-1");
    expect(task?.status).toBe("inbox");
    expect(task?.quadrant).toBeNull();
  });

  it("classifies with userOverride false when 'Ça me parle' is confirmed", async () => {
    const user = userEvent.setup();
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK, TASK2] });

    renderOverlay();
    await reachConfirmation(user);
    await user.click(screen.getByRole("button", { name: /Ça me parle/ }));

    const task = useTaskStore.getState().tasks.find((t) => t.id === "task-1");
    expect(task?.status).toBe("backlog");
    expect(task?.quadrant).toBe("q1");
    expect(task?.classificationMethod).toBe("assisted");
    expect(task?.sourceFlux).toBe("flux1");
    expect(task?.userOverride).toBe(false);
    expect(
      screen.getByRole("button", { name: /Voir la Réserve/ }),
    ).toBeInTheDocument();
  });

  it("classifies with userOverride true when an alternative is chosen", async () => {
    const user = userEvent.setup();
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK, TASK2] });

    renderOverlay();
    await reachConfirmation(user);
    await user.click(
      screen.getByRole("button", { name: /Classer dans Planifier/ }),
    );

    const task = useTaskStore.getState().tasks.find((t) => t.id === "task-1");
    expect(task?.status).toBe("backlog");
    expect(task?.quadrant).toBe("q2");
    expect(task?.userOverride).toBe(true);
  });

  it("blocks sorting and shows the reserve-full notice when the Réserve is full", () => {
    const backlog: Task[] = Array.from({ length: 40 }, (_, i) => ({
      ...TASK,
      id: `backlog-${i}`,
      status: "backlog",
      quadrant: "q1",
    }));
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK, ...backlog] });

    renderOverlay();

    expect(screen.getByText("Réserve pleine")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Aide-moi à décider/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Classer dans/ }),
    ).not.toBeInTheDocument();
  });

  it("skips confirmation for manual classification (userOverride null)", async () => {
    const user = userEvent.setup();
    useUIStore.setState({ activeOverlay: "sorting" });
    useFlowStore.setState(FLOW_WITH_TASK);
    useTaskStore.setState({ tasks: [TASK, TASK2] });

    renderOverlay();
    await user.click(
      screen.getByRole("button", { name: /Classer dans Faire maintenant/ }),
    );

    const task = useTaskStore.getState().tasks.find((t) => t.id === "task-1");
    expect(task?.status).toBe("backlog");
    expect(task?.userOverride).toBeNull();
    expect(
      screen.queryByRole("button", { name: /Ça me parle/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Voir la Réserve/ }),
    ).toBeInTheDocument();
  });
});
