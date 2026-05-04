import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { QuadrantButton } from "./QuadrantButton";
import type { Quadrant } from "@/schemas/task";

const QUADRANT_LABELS: Record<Quadrant, string> = {
  q1: "Faire maintenant",
  q2: "Planifier",
  q3: "Déléguer",
  q4: "Éliminer",
};

describe("QuadrantButton", () => {
  it.each(["q1", "q2", "q3", "q4"] as Quadrant[])(
    "renders the correct label for %s",
    (quadrant) => {
      render(<QuadrantButton quadrant={quadrant} onClick={vi.fn()} />);
      expect(screen.getByText(QUADRANT_LABELS[quadrant])).toBeInTheDocument();
    },
  );

  it.each(["q1", "q2", "q3", "q4"] as Quadrant[])(
    "has the correct aria-label for %s",
    (quadrant) => {
      render(<QuadrantButton quadrant={quadrant} onClick={vi.fn()} />);
      expect(
        screen.getByRole("button", {
          name: `Classer dans ${QUADRANT_LABELS[quadrant]}`,
        }),
      ).toBeInTheDocument();
    },
  );

  it("calls onClick with the correct quadrant when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<QuadrantButton quadrant="q1" onClick={onClick} />);

    await user.click(
      screen.getByRole("button", { name: /Classer dans Faire maintenant/ }),
    );

    expect(onClick).toHaveBeenCalledOnce();
    expect(onClick).toHaveBeenCalledWith("q1");
  });

  it("calls onClick with the correct quadrant for each quadrant", async () => {
    const user = userEvent.setup();

    for (const quadrant of ["q1", "q2", "q3", "q4"] as Quadrant[]) {
      const onClick = vi.fn();
      const { unmount } = render(
        <QuadrantButton quadrant={quadrant} onClick={onClick} />,
      );

      await user.click(
        screen.getByRole("button", {
          name: `Classer dans ${QUADRANT_LABELS[quadrant]}`,
        }),
      );

      expect(onClick).toHaveBeenCalledWith(quadrant);
      unmount();
    }
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<QuadrantButton quadrant="q1" onClick={onClick} disabled />);

    const btn = screen.getByRole("button", {
      name: /Classer dans Faire maintenant/,
    });
    expect(btn).toBeDisabled();

    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies the compact class when size is compact", () => {
    render(<QuadrantButton quadrant="q2" onClick={vi.fn()} size="compact" />);
    expect(
      screen.getByRole("button", { name: /Classer dans Planifier/ }),
    ).toHaveClass("quadrant-btn--compact");
  });

  it("does not apply the compact class by default", () => {
    render(<QuadrantButton quadrant="q2" onClick={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: /Classer dans Planifier/ }),
    ).not.toHaveClass("quadrant-btn--compact");
  });
});
