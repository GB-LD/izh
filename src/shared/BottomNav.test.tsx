import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, beforeEach } from "vitest";
import { BottomNav } from "./BottomNav";
import { useTaskStore } from "@/stores/useTaskStore";
import { useUIStore } from "@/stores/useUIStore";
import type { Task } from "@/schemas/task";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderNav(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <BottomNav />
    </MemoryRouter>,
  );
}

const makeTask = (overrides: Partial<Task> = {}): Task => ({
  id: crypto.randomUUID(),
  title: "Default task",
  status: "inbox",
  quadrant: null,
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

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  useTaskStore.setState({ tasks: [] });
  useUIStore.setState({
    activeOverlay: null,
    activeFocusQuadrant: null,
    onboardingFlags: {},
  });
});

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe("BottomNav — rendering", () => {
  it("renders all 4 links", () => {
    renderNav();
    expect(screen.getByRole("link", { name: "Vrac" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Réserve" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Focus" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Archive" })).toBeInTheDocument();
  });

  it("renders the nav with the correct aria-label", () => {
    renderNav();
    expect(
      screen.getByRole("navigation", { name: "Navigation en bas de page" }),
    ).toBeInTheDocument();
  });

  it("renders nothing when the 'sorting' overlay is active", () => {
    useUIStore.setState({ activeOverlay: "sorting" });
    const { container } = renderNav();
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when the 'purge' overlay is active", () => {
    useUIStore.setState({ activeOverlay: "purge" });
    const { container } = renderNav();
    expect(container).toBeEmptyDOMElement();
  });
});

// ---------------------------------------------------------------------------
// Active state
// ---------------------------------------------------------------------------

describe("BottomNav — active link", () => {
  it.each([
    { path: "/", label: "Vrac" },
    { path: "/backlog", label: "Réserve" },
    { path: "/focus", label: "Focus" },
    { path: "/archive", label: "Archive" },
  ])(
    "applies nav-item--active on '$label' when pathname = '$path'",
    ({ path, label }) => {
      renderNav(path);
      expect(screen.getByRole("link", { name: label })).toHaveClass(
        "nav-item--active",
      );
    },
  );

  it("does not apply nav-item--active on inactive links", () => {
    renderNav("/focus");
    expect(screen.getByRole("link", { name: "Vrac" })).not.toHaveClass(
      "nav-item--active",
    );
    expect(screen.getByRole("link", { name: "Réserve" })).not.toHaveClass(
      "nav-item--active",
    );
    expect(screen.getByRole("link", { name: "Archive" })).not.toHaveClass(
      "nav-item--active",
    );
  });

  it("sets aria-current='page' on the active link", () => {
    renderNav("/archive");
    expect(screen.getByRole("link", { name: "Archive" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("does not set aria-current on inactive links", () => {
    renderNav("/archive");
    expect(screen.getByRole("link", { name: "Vrac" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

describe("BottomNav — href", () => {
  it.each([
    { path: "/", label: "Vrac" },
    { path: "/backlog", label: "Réserve" },
    { path: "/focus", label: "Focus" },
    { path: "/archive", label: "Archive" },
  ])("'$label' has href '$path'", ({ path, label }) => {
    renderNav();
    expect(screen.getByRole("link", { name: label })).toHaveAttribute(
      "href",
      path,
    );
  });
});

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------

describe("BottomNav — inbox badge", () => {
  it("shows the badge when inboxCount > 0 and not on Vrac", () => {
    useTaskStore.setState({ tasks: [makeTask(), makeTask()] });
    renderNav("/focus");
    expect(screen.getByLabelText("2 tâches à trier")).toBeInTheDocument();
  });

  it("hides the badge when on Vrac (active tab)", () => {
    useTaskStore.setState({ tasks: [makeTask()] });
    renderNav("/");
    expect(screen.queryByLabelText(/tâches à trier/)).not.toBeInTheDocument();
  });

  it("hides the badge when inboxCount = 0", () => {
    renderNav("/archive");
    expect(screen.queryByLabelText(/tâches à trier/)).not.toBeInTheDocument();
  });

  it("renders only one badge", () => {
    useTaskStore.setState({ tasks: [makeTask(), makeTask(), makeTask()] });
    renderNav("/backlog");
    expect(screen.getAllByLabelText(/tâches à trier/)).toHaveLength(1);
  });

  it("displays the correct count in the badge", () => {
    useTaskStore.setState({ tasks: [makeTask(), makeTask(), makeTask()] });
    renderNav("/archive");
    expect(screen.getByLabelText("3 tâches à trier")).toHaveTextContent("3");
  });
});
