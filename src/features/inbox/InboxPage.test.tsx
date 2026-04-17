import { act, render, screen } from "@testing-library/react";
import { InboxPage } from "./InboxPage";
import { useTaskStore } from "@/stores/useTaskStore";
import type { Task } from "@/schemas/task";

const makeTask = (overrides: Partial<Task> = {}): Task => ({
  id: crypto.randomUUID(),
  title: "Tâche",
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

beforeEach(() => {
  useTaskStore.setState({ tasks: [] });
  localStorage.clear();
});

describe("InboxPage", () => {
  it("affiche les tâches inbox", () => {
    useTaskStore.setState({
      tasks: [
        makeTask({ title: "Préparer la rétro" }),
        makeTask({ title: "Envoyer le rapport" }),
        makeTask({ title: "Tâche triée", status: "backlog" }),
      ],
    });

    render(<InboxPage />);

    expect(screen.getByText("Préparer la rétro")).toBeInTheDocument();
    expect(screen.getByText("Envoyer le rapport")).toBeInTheDocument();
    expect(screen.queryByText("Tâche triée")).not.toBeInTheDocument();
    expect(screen.getByRole("list")).toHaveClass("inbox-page__list");
  });

  it("affiche les tâches inbox en ordre antichronologique", () => {
    useTaskStore.setState({
      tasks: [
        makeTask({
          id: "older",
          title: "Tâche ancienne",
          createdAt: "2026-04-12T10:00:00.000Z",
        }),
        makeTask({
          id: "newer",
          title: "Tâche récente",
          createdAt: "2026-04-13T10:00:00.000Z",
        }),
      ],
    });

    render(<InboxPage />);

    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Tâche récente");
    expect(items[1]).toHaveTextContent("Tâche ancienne");
  });

  it("affiche un compteur basé sur le nombre de tâches inbox", () => {
    useTaskStore.setState({
      tasks: [
        makeTask({ title: "A" }),
        makeTask({ title: "B" }),
        makeTask({ title: "C", status: "active" }),
      ],
    });

    render(<InboxPage />);

    expect(screen.getByText(/2\s+tâches\s+à trier/i)).toBeInTheDocument();
  });

  it("met à jour le compteur quand addTask est appelé", () => {
    render(<InboxPage />);

    expect(screen.getByText(/0\s+tâches\s+à trier/i)).toBeInTheDocument();

    act(() => {
      useTaskStore.getState().addTask("Nouvelle tâche");
    });

    expect(screen.getByText(/1\s+tâche\s+à trier/i)).toBeInTheDocument();
  });

  it("affiche le H1 Liste et le CaptureInput", () => {
    const { container } = render(<InboxPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Liste",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /ajouter une tâche/i,
      }),
    ).toBeInTheDocument();

    expect(container.querySelector(".inbox-page__top")).toBeInTheDocument();
  });
});
