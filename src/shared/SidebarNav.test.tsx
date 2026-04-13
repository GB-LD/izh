import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it, beforeEach } from "vitest";
import { SidebarNav } from "./SidebarNav";
import { useTaskStore } from "@/stores/useTaskStore";
import type { Task } from "@/schemas/task";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderNav(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <SidebarNav />
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
});

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe("SidebarNav — rendering", () => {
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
      screen.getByRole("navigation", { name: "Navigation principale" }),
    ).toBeInTheDocument();
  });

  it("renders the logo text", () => {
    renderNav();
    expect(screen.getByText("iZenHover")).toBeInTheDocument();
  });

  it("renders the collapse toggle button", () => {
    renderNav();
    expect(
      screen.getByRole("button", { name: "Réduire la navigation" }),
    ).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Active state
// ---------------------------------------------------------------------------

describe("SidebarNav — active link", () => {
  it.each([
    { path: "/", label: "Vrac" },
    { path: "/backlog", label: "Réserve" },
    { path: "/focus", label: "Focus" },
    { path: "/archive", label: "Archive" },
  ])(
    "applies sidebar-nav__item--active on '$label' when pathname = '$path'",
    ({ path, label }) => {
      renderNav(path);
      expect(screen.getByRole("link", { name: label })).toHaveClass(
        "sidebar-nav__item--active",
      );
    },
  );

  it("does not apply sidebar-nav__item--active on inactive links", () => {
    renderNav("/focus");
    expect(screen.getByRole("link", { name: "Vrac" })).not.toHaveClass(
      "sidebar-nav__item--active",
    );
    expect(screen.getByRole("link", { name: "Réserve" })).not.toHaveClass(
      "sidebar-nav__item--active",
    );
    expect(screen.getByRole("link", { name: "Archive" })).not.toHaveClass(
      "sidebar-nav__item--active",
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

describe("SidebarNav — href", () => {
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
// Collapse
// ---------------------------------------------------------------------------

describe("SidebarNav — collapse toggle", () => {
  it("is expanded by default", () => {
    renderNav();
    expect(
      screen.getByRole("navigation", { name: "Navigation principale" }),
    ).not.toHaveClass("sidebar-nav--collapsed");
  });

  it("collapses when the toggle button is clicked", async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(
      screen.getByRole("button", { name: "Réduire la navigation" }),
    );
    expect(
      screen.getByRole("navigation", { name: "Navigation principale" }),
    ).toHaveClass("sidebar-nav--collapsed");
  });

  it("expands again after a second click", async () => {
    const user = userEvent.setup();
    renderNav();
    const toggle = screen.getByRole("button", {
      name: "Réduire la navigation",
    });
    await user.click(toggle);
    await user.click(
      screen.getByRole("button", { name: "Agrandir la navigation" }),
    );
    expect(
      screen.getByRole("navigation", { name: "Navigation principale" }),
    ).not.toHaveClass("sidebar-nav--collapsed");
  });

  it("updates the toggle button aria-label when collapsed", async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(
      screen.getByRole("button", { name: "Réduire la navigation" }),
    );
    expect(
      screen.getByRole("button", { name: "Agrandir la navigation" }),
    ).toBeInTheDocument();
  });

  it("adds a title attribute to links when collapsed", async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(
      screen.getByRole("button", { name: "Réduire la navigation" }),
    );
    expect(screen.getByRole("link", { name: "Vrac" })).toHaveAttribute(
      "title",
      "Vrac",
    );
    expect(screen.getByRole("link", { name: "Focus" })).toHaveAttribute(
      "title",
      "Focus",
    );
  });

  it("has no title attribute on links when expanded", () => {
    renderNav();
    expect(screen.getByRole("link", { name: "Vrac" })).not.toHaveAttribute(
      "title",
    );
  });
});

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------

describe("SidebarNav — inbox badge", () => {
  it("shows the badge when inboxCount > 0", () => {
    useTaskStore.setState({ tasks: [makeTask(), makeTask()] });
    renderNav("/focus");
    expect(screen.getByLabelText("2 tâches à trier")).toBeInTheDocument();
  });

  it("shows the badge even when on Vrac (active tab)", () => {
    useTaskStore.setState({ tasks: [makeTask()] });
    renderNav("/");
    expect(screen.getByLabelText("1 tâche à trier")).toBeInTheDocument();
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

  it("truncates the badge to '9+' when inboxCount > 9", () => {
    useTaskStore.setState({
      tasks: Array.from({ length: 10 }, () => makeTask()),
    });
    renderNav("/archive");
    expect(screen.getByLabelText("10 tâches à trier")).toHaveTextContent("9+");
  });
});
