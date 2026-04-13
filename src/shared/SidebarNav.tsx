import { useTaskStore } from "@/stores/useTaskStore";
import { useState } from "react";
import { NavLink } from "react-router";
import {
  Inbox,
  Archive,
  Target,
  Layers,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { path: "/", label: "Vrac", Icon: Inbox },
  { path: "/backlog", label: "Réserve", Icon: Layers },
  { path: "/focus", label: "Focus", Icon: Target },
  { path: "/archive", label: "Archive", Icon: Archive },
] as const;

export function SidebarNav() {
  const inboxCount = useTaskStore((s) => s.inboxTasks().length);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav
      aria-label="Navigation principale"
      className={cn("sidebar-nav", isCollapsed && "sidebar-nav--collapsed")}
    >
      <div className="sidebar-nav__header">
        <div className="sidebar-nav__logo">iZenHover</div>
        <button
          className="sidebar-nav__toggle"
          aria-label={
            isCollapsed ? "Agrandir la navigation" : "Réduire la navigation"
          }
          onClick={() => setIsCollapsed((v) => !v)}
        >
          {isCollapsed ? (
            <PanelLeftOpen size={14} aria-hidden="true" />
          ) : (
            <PanelLeftClose size={14} aria-hidden="true" />
          )}
        </button>
      </div>

      <ul className="sidebar-nav__list">
        {NAV_ITEMS.map(({ path, label, Icon }) => {
          return (
            <li key={path}>
              <NavLink
                to={path}
                aria-label={label}
                title={isCollapsed ? label : undefined}
                className={({ isActive }) =>
                  cn(
                    "sidebar-nav__item",
                    isActive && "sidebar-nav__item--active",
                  )
                }
              >
                <Icon size={22} aria-hidden="true" />
                <span className="sidebar-nav__label">{label}</span>
                {path === "/" && inboxCount > 0 && (
                  <span
                    className="nav-item__badge sidebar-nav__badge"
                    aria-label={
                      inboxCount === 1
                        ? "1 tâche à trier"
                        : `${inboxCount} tâches à trier`
                    }
                  >
                    {inboxCount > 9 ? "9+" : inboxCount}
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
