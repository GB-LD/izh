import { NavLink } from "react-router";
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
  const inboxCount = useTaskStore((s) => s.inboxTasks().length);
  const activeOverlay = useUIStore((s) => s.activeOverlay);

  if (activeOverlay !== null) return null;

  return (
    <nav aria-label="Navigation en bas de page" className="bottom-nav">
      <ul className="bottom-nav__list">
        {NAV_ITEMS.map(({ path, label, Icon }) => {
          return (
            <li key={path} className="flex flex-1">
              <NavLink
                to={path}
                aria-label={label}
                className={({ isActive }) =>
                  cn("nav-item", isActive && "nav-item--active")
                }
              >
                {({ isActive }) => (
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
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
