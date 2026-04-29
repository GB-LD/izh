import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/shared/Button/Button";
import { cn } from "@/lib/utils";

interface EmptyStateCta {
  label: string;
  to: string;
}

interface EmptyStateProps {
  classes?: string;
  icon: LucideIcon;
  /** Tailwind text color class. Defaults to text-content-tertiary */
  iconClassName?: string;
  message: string;
  subMessage?: string;
  cta?: EmptyStateCta;
}

export function EmptyState({
  icon: Icon,
  iconClassName = "text-content-tertiary",
  message,
  subMessage,
  cta,
  classes,
}: EmptyStateProps) {
  const navigate = useNavigate();

  return (
    <div role="status" className={cn("empty-state", classes)}>
      <Icon size={32} aria-hidden="true" className={iconClassName} />
      <div className="empty-state__text">
        <p className="empty-state__message">{message}</p>
        {subMessage && <p className="empty-state__sub-message">{subMessage}</p>}
      </div>
      {cta && (
        <Button variant="secondary" size="sm" onClick={() => navigate(cta.to)}>
          {cta.label}
        </Button>
      )}
    </div>
  );
}
