import { useLocation, useNavigate } from "react-router";
import { Inbox, Archive, Target, Layers } from "lucide-react";
import { useTaskStore } from "@/stores/useTaskStore";
import { useUIStore } from "@/stores/useUIStore";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { path: "/", label: "Vrac", Icon: Inbox },
  { path: "/backlog", label: "Réserve", Icon: Layers },
  { path: "/focus", label: "Focus", Icon: Target },
  { path: "/archive", label: "Archive", Icon: Archive },
] as const;

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const inboxCount = useTaskStore((s) => s.inboxTasks().length);
  const activeOverlay = useUIStore((s) => s.activeOverlay);

  if (activeOverlay !== null) return null;

  return (
    <nav aria-label="Navigation principale" className="bottom-nav">
      <div role="tablist" className="bottom-nav__track">
        {NAV_ITEMS.map(({ path, label, Icon }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              role="tab"
              aria-current={isActive ? "page" : undefined}
              aria-label={label}
              className={cn("nav-item", isActive && "nav-item--active")}
              onClick={() => navigate(path)}
            >
              <span className="relative inline-flex">
                <Icon size={20} aria-hidden="true" />
                {path === "/" && inboxCount > 0 && !isActive && (
                  <span
                    className="nav-item__badge"
                    aria-label={`${inboxCount} tâches à trier`}
                  >
                    {inboxCount}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
