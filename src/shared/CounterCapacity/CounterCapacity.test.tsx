import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CounterCapacity } from "./CounterCapacity";

describe("CounterCapacity", () => {
  it("renders the ratio count/max with the default message", () => {
    render(<CounterCapacity count={12} />);
    expect(screen.getByText("12/40")).toBeInTheDocument();
    expect(
      screen.getByText(/active celles que tu veux faire/i),
    ).toBeInTheDocument();
  });

  it("accepts a custom message and max", () => {
    render(<CounterCapacity count={3} max={10} message="Bientôt plein" />);
    expect(screen.getByText("3/10")).toBeInTheDocument();
    expect(screen.getByText(/Bientôt plein/)).toBeInTheDocument();
  });

  it("uses the default ratio color below the warning threshold", () => {
    render(<CounterCapacity count={34} />);
    const ratio = screen.getByText("34/40");
    expect(ratio).not.toHaveClass("capacity-ratio--warning");
    expect(ratio).not.toHaveClass("capacity-ratio--error");
  });

  it("applies the warning variant at 35", () => {
    render(<CounterCapacity count={35} />);
    expect(screen.getByText("35/40")).toHaveClass("capacity-ratio--warning");
  });

  it("applies the error variant at the maximum", () => {
    render(<CounterCapacity count={40} />);
    expect(screen.getByText("40/40")).toHaveClass("capacity-ratio--error");
  });

  it("exposes the counter as a polite live region", () => {
    render(<CounterCapacity count={5} />);
    const counter = screen.getByText(/Tes tâches triées attendent ici/);
    expect(counter).toHaveAttribute("aria-live", "polite");
    expect(counter).toHaveAttribute("aria-atomic", "true");
  });
});
