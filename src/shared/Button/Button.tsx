import { cn } from "@/lib/utils";
import type { ComponentPropsWithRef, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "text"
  | "icon-only"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  block?: boolean;
  iconLeft?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  disabled,
  loading,
  block,
  iconLeft,
  className,
  ref,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      ref={ref}
      {...rest}
      className={cn(
        "btn",
        `btn-${variant}`,
        `btn-${size}`,
        block && "btn-block",
        className,
      )}
      disabled={disabled || loading}
      aria-disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
    >
      {loading ? "spinner" : iconLeft}
      {variant !== "icon-only" && children}
    </button>
  );
}
