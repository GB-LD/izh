import { Section } from "./shared";

const radiusPrimitives = [
  { name: "radius-none", roundedClass: "rounded-none", px: "0px" },
  { name: "radius-sm", roundedClass: "rounded-sm", px: "4px" },
  { name: "radius-md", roundedClass: "rounded-md", px: "8px — défaut" },
  { name: "radius-lg", roundedClass: "rounded-lg", px: "12px" },
  { name: "radius-xl", roundedClass: "rounded-xl", px: "16px" },
  { name: "radius-full", roundedClass: "rounded-full", px: "9999px" },
];

export function RadiusSection() {
  return (
    <>
      <Section
        title="Tokens primitifs"
        subtitle="Chaque radius est intentionnel — doux sans être enfantin, aligné Notion/Linear."
      >
        <div className="flex flex-wrap gap-6">
          {radiusPrimitives.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-24 w-28 items-center justify-center border border-edge bg-surface-subtle ${r.roundedClass}`}
              />
              <span className="text-xs font-medium text-content">{r.name}</span>
              <span className="text-xs text-content-secondary">{r.px}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tokens sémantiques — en contexte izh">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="mb-2 text-xs text-content-secondary">
              radius-component → 8px
            </p>
            <div className="rounded-component border border-edge bg-surface-subtle p-component-md">
              <p className="text-base text-content">Préparer la réunion Q1</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-badge bg-quadrant-q1 px-2 py-0.5 text-xs font-medium text-content-inverse">
                  Q1 — Urgent
                </span>
                <span className="text-xs text-content-secondary">
                  Aujourd'hui
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs text-content-tertiary">
              → Card de tâche, inputs, boutons CTA
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs text-content-secondary">
              radius-container → 12px
            </p>
            <div className="rounded-container border border-edge bg-surface-base p-component-lg shadow-modal">
              <p className="font-heading text-lg font-bold text-content">
                Trier les tâches
              </p>
              <p className="mt-1 text-sm text-content-secondary">
                Choisir l'ordre d'affichage dans Vrac
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="rounded-component border border-edge px-4 py-2 text-sm font-medium text-content"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="rounded-component bg-action-primary px-4 py-2 text-sm font-medium text-content-inverse"
                >
                  Appliquer
                </button>
              </div>
            </div>
            <p className="mt-2 text-xs text-content-tertiary">
              → Modales, bottom sheets, menus
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs text-content-secondary">
              radius-badge → 4px / radius-pill → full
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-badge bg-quadrant-q1 px-2 py-0.5 text-xs font-medium text-content-inverse">
                  Q1
                </span>
                <span className="rounded-badge bg-quadrant-q3 px-2 py-0.5 text-xs font-medium text-content-inverse">
                  Q3
                </span>
                <span className="rounded-badge bg-quadrant-done px-2 py-0.5 text-xs font-medium text-content-inverse">
                  Fait
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-pill border border-edge px-3 py-1 text-xs font-medium text-content">
                  Toutes
                </span>
                <span className="rounded-pill bg-action-primary px-3 py-1 text-xs font-medium text-content-inverse">
                  Aujourd'hui
                </span>
                <span className="rounded-pill border border-edge px-3 py-1 text-xs font-medium text-content">
                  Cette semaine
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs text-content-tertiary">
              → Badges quadrant (4px) + Filtres/chips (pill)
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
