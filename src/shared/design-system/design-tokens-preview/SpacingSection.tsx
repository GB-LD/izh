import { Section } from "./shared";

const spacingScale = [
  { name: "space-1", px: 4 },
  { name: "space-2", px: 8 },
  { name: "space-3", px: 12 },
  { name: "space-4", px: 16 },
  { name: "space-5", px: 20 },
  { name: "space-6", px: 24 },
  { name: "space-8", px: 32 },
  { name: "space-10", px: 40 },
  { name: "space-12", px: 48 },
  { name: "space-16", px: 64 },
];

const semanticSpacing = [
  { name: "component-sm", px: "8px", usage: "badges, tags" },
  { name: "component-md", px: "16px", usage: "cards, inputs" },
  { name: "component-lg", px: "24px", usage: "modales, bottom sheets" },
  { name: "stack-sm", px: "8px", usage: "gap interne card" },
  { name: "stack-md", px: "16px", usage: "gap entre cards" },
  { name: "stack-lg", px: "24px", usage: "gap entre sections" },
  { name: "page-margin mobile", px: "16px", usage: "desktop: 64px" },
];

export function SpacingSection() {
  return (
    <>
      <Section
        title="Échelle primitive"
        subtitle="Base 4px · Multiples de 4 · Densité faible"
      >
        <div className="flex flex-col gap-2">
          {spacingScale.map((s) => (
            <div key={s.name} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-xs text-content-secondary">
                <span className={s.px === 16 ? "font-bold text-content" : ""}>
                  {s.name}
                </span>{" "}
                {s.px}px
              </span>
              {/* style nécessaire : largeur dynamique calculée */}
              <div
                className="h-3 rounded-sm bg-action-accent"
                style={{ width: `${s.px * 2.5}px` }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="En contexte — Espacements appliqués">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="overflow-hidden rounded-container border border-edge bg-surface-base">
            <div className="p-page-mobile">
              <p className="mb-1 text-xs font-medium text-content-accent">
                Écran mobile — page-margin: 16px
              </p>
              <h3 className="font-heading font-bold text-xl tracking-tight text-content">
                Inbox
              </h3>
              <p className="mt-1 text-xs text-content-accent">
                ↕ stack-md: 16px entre cards
              </p>

              <div className="mt-4 flex flex-col gap-stack-md">
                <div className="rounded-component border border-edge bg-surface-subtle p-component-md">
                  <p className="text-xs text-content-accent">
                    ↔ component-md: 16px padding
                  </p>
                  <p className="text-base text-content">
                    Appeler le pédiatre pour le vaccin de Mila
                  </p>
                  <p className="text-xs text-content-accent">
                    ↕ stack-sm: 8px gap interne
                  </p>
                  <p className="mt-1 text-xs text-content-secondary">
                    Créée le 8 mars
                  </p>
                </div>
                <div className="rounded-component border border-edge bg-surface-subtle p-component-md">
                  <p className="text-base text-content">
                    Envoyer la facture Dupont
                  </p>
                  <p className="mt-1 text-xs text-content-secondary">
                    Créée le 7 mars
                  </p>
                </div>
              </div>

              <p className="mt-6 text-xs text-content-accent">
                ↕ stack-lg: 24px entre sections
              </p>

              <button
                type="button"
                className="mt-4 rounded-component bg-action-primary px-6 py-3 text-sm font-medium text-content-inverse"
              >
                Aide-moi à décider
              </button>
              <p className="mt-1 text-xs text-content-accent">
                ↔ bouton padding: 12px × 24px
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-content">
              Tokens sémantiques izh
            </p>
            {semanticSpacing.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 shrink-0 rounded-sm ${
                    s.name.startsWith("component")
                      ? "bg-action-accent"
                      : s.name.startsWith("stack")
                        ? "bg-quadrant-done"
                        : "bg-quadrant-q3"
                  }`}
                />
                <span className="text-xs text-content-secondary">
                  {s.name}: {s.px} — {s.usage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
