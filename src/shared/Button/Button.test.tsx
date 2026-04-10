import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with the given label", () => {
    render(<Button>Envoyer</Button>);
    expect(
      screen.getByRole("button", { name: /envoyer/i }),
    ).toBeInTheDocument();
  });

  it("applies the base btn class", () => {
    render(<Button>OK</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn");
  });

  it("applies btn-primary variant by default", () => {
    render(<Button>OK</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-primary");
  });

  it.each(["primary", "secondary", "outline", "text", "danger"] as const)(
    "applies variant %s",
    (variant) => {
      render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole("button", { name: variant })).toHaveClass(
        `btn-${variant}`,
      );
    },
  );

  it("applies variant icon-only", () => {
    render(
      <Button variant="icon-only" aria-label="Fermer">
        X
      </Button>,
    );
    expect(screen.getByRole("button", { name: /fermer/i })).toHaveClass(
      "btn-icon-only",
    );
  });

  it.each(["sm", "md", "lg"] as const)("applies size %s", (size) => {
    render(<Button size={size}>OK</Button>);
    expect(screen.getByRole("button")).toHaveClass(`btn-${size}`);
  });

  it("applies btn-block when block is true", () => {
    render(<Button block>OK</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-block");
  });

  it("is disabled and has aria-disabled when disabled", () => {
    render(<Button disabled>OK</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("has aria-busy when loading", () => {
    render(<Button loading>OK</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });

  it("shows spinner when loading", () => {
    render(<Button loading>OK</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("spinner");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>OK</Button>);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        OK
      </Button>,
    );

    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when loading", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button loading onClick={handleClick}>
        OK
      </Button>,
    );

    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("forwards ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>OK</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("merges custom className", () => {
    render(<Button className="mt-8">OK</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn", "mt-8");
  });

  it("forwards native HTML props", () => {
    render(
      <Button type="submit" id="my-btn">
        OK
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("id", "my-btn");
  });
});
