import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ReserveFullNotice } from "./ReserveFullNotice";

describe("ReserveFullNotice", () => {
  it("announces the full reserve with Purger and Revenir au Vrac", () => {
    render(<ReserveFullNotice onPurge={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText("Réserve pleine")).toBeInTheDocument();
    expect(screen.getByText(/40\/40/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Purger/ })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Revenir au Vrac/ }),
    ).toBeInTheDocument();
  });

  it("calls onPurge when 'Purger' is clicked", async () => {
    const user = userEvent.setup();
    const onPurge = vi.fn();
    render(<ReserveFullNotice onPurge={onPurge} onClose={vi.fn()} />);
    await user.click(screen.getByRole("button", { name: /Purger/ }));
    expect(onPurge).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when 'Revenir au Vrac' is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ReserveFullNotice onPurge={vi.fn()} onClose={onClose} />);
    await user.click(screen.getByRole("button", { name: /Revenir au Vrac/ }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
