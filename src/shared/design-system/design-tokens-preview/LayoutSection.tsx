import { Section } from "./shared";

export function LayoutSection() {
  return (
    <Section
      title="Grille & Layout"
      subtitle="Content-centered, single column, 600px max. L'espace blanc latéral EST le design."
    >
      <div className="grid gap-8 sm:grid-cols-2">
        {/* Mobile mock */}
        <div>
          <p className="mb-3 text-center text-sm font-bold text-content">
            Mobile — 375px
          </p>
          <div className="mx-auto max-w-80 overflow-hidden rounded-container border border-edge bg-surface-base">
            <div className="flex h-12 items-center justify-between border-b border-edge px-4">
              <span className="font-heading text-xl font-bold tracking-tight text-content">
                Inbox
              </span>
              <span className="text-content-secondary">+</span>
            </div>

            <div className="flex flex-col gap-stack-md p-page-mobile">
              {[
                {
                  task: "Préparer la réunion Q1",
                  badge: "Q1",
                  color: "bg-quadrant-q1",
                },
                {
                  task: "Appeler le comptable",
                  badge: "Q3",
                  color: "bg-quadrant-q3",
                },
                { task: "Lire article productivité", badge: "", color: "" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-component border border-edge bg-surface-subtle p-component-md"
                >
                  <p className="text-base text-content">{item.task}</p>
                  {item.badge ? (
                    <div className="mt-1.5 flex items-center gap-2">
                      <span
                        className={`rounded-badge ${item.color} px-2 py-0.5 text-xs font-medium text-content-inverse`}
                      >
                        {item.badge}
                      </span>
                      <span className="text-xs text-content-secondary">
                        {i === 0 ? "Aujourd'hui" : "Demain"}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-1 text-xs text-content-secondary">
                      Cette semaine
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex h-13 items-center justify-around border-t border-edge">
              {["Inbox", "Réserve", "Focus", "Archive"].map((label) => (
                <span
                  key={label}
                  className={`text-xs ${label === "Inbox" ? "font-medium text-content" : "text-content-secondary"}`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-content-secondary">
            margin: 16px · header: 48px · navbar: 52px
          </p>
        </div>

        {/* Desktop mock */}
        <div>
          <p className="mb-3 text-center text-sm font-bold text-content">
            Desktop — 1280px
          </p>
          <div className="rounded-container border border-edge bg-surface-muted p-8">
            <div className="mx-auto max-w-80 rounded-component border border-edge bg-surface-base p-component-md">
              <p className="mb-2 text-center text-xs text-content-secondary">
                espace blanc
              </p>
              <div className="text-center">
                <span className="font-heading text-xl font-bold tracking-tight text-content">
                  Inbox
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <div className="rounded-component border border-edge bg-surface-subtle p-3">
                  <p className="text-sm text-content">Préparer la réunion Q1</p>
                  <span className="mt-1 inline-block rounded-badge bg-quadrant-q1 px-2 py-0.5 text-xs font-medium text-content-inverse">
                    Q1
                  </span>
                </div>
                <div className="rounded-component border border-edge bg-surface-subtle p-3">
                  <p className="text-sm text-content">Appeler le comptable</p>
                  <span className="mt-1 inline-block rounded-badge bg-quadrant-q3 px-2 py-0.5 text-xs font-medium text-content-inverse">
                    Q3
                  </span>
                </div>
              </div>
              <p className="mt-2 text-center text-xs text-content-secondary">
                espace blanc
              </p>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-content-secondary">
            content max: 600px centré · margin: 64px
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        <div>
          <p className="text-sm font-bold text-content">Breakpoints</p>
          <div className="mt-2 flex flex-col gap-1">
            {[
              { name: "sm", px: "480px" },
              { name: "md", px: "768px" },
              { name: "lg", px: "1024px" },
              { name: "xl", px: "1280px" },
            ].map((bp) => (
              <p key={bp.name} className="text-xs text-content-secondary">
                {bp.name}: {bp.px}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-content">Content</p>
          <div className="mt-2 flex flex-col gap-1">
            <p className="text-xs text-content-secondary">max-width: 600px</p>
            <p className="text-xs text-content-secondary">min-width: 320px</p>
            <p className="text-xs text-content-secondary">
              colonnes: 1 (single)
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-content">Navigation</p>
          <div className="mt-2 flex flex-col gap-1">
            <p className="text-xs text-content-secondary">header: 48px</p>
            <p className="text-xs text-content-secondary">
              navbar: 52px (mobile)
            </p>
            <p className="text-xs text-content-secondary">safe-area: env()</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
