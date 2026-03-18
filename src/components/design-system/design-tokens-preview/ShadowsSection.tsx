import { Section } from "./shared";

const shadowPrimitives = [
  { name: "shadow-none", cls: "border border-edge" },
  { name: "shadow-xs", cls: "shadow-xs" },
  { name: "shadow-sm", cls: "shadow-sm" },
  { name: "shadow-md", cls: "shadow-md" },
  { name: "shadow-lg", cls: "shadow-lg" },
];

export function ShadowsSection() {
  return (
    <>
      <Section
        title="Tokens primitifs — Niveaux d'élévation"
        subtitle="L'ombre est un murmure, pas un cri. Cards flat par défaut — l'ombre signale l'interactivité au hover."
      >
        <div className="flex flex-wrap gap-6">
          {shadowPrimitives.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-28 w-36 items-center justify-center rounded-component bg-surface-base ${s.cls}`}
              />
              <span className="text-xs font-medium text-content">{s.name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tokens sémantiques — en contexte izh">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="mb-2 text-xs text-content-secondary">
              shadow-card → none (repos)
            </p>
            <div className="rounded-component border border-edge bg-surface-subtle p-component-md">
              <p className="text-base text-content">Appeler le comptable</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-badge bg-quadrant-q3 px-2 py-0.5 text-xs font-medium text-content-inverse">
                  Q3
                </span>
                <span className="text-xs text-content-secondary">Demain</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-content-tertiary">
              → Flat au repos. Bordure seule.
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs text-content-secondary">
              shadow-card-hover → xs
            </p>
            <div className="rounded-component border border-edge bg-surface-subtle p-component-md shadow-card-hover">
              <p className="text-base text-content">Appeler le comptable</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-badge bg-quadrant-q3 px-2 py-0.5 text-xs font-medium text-content-inverse">
                  Q3
                </span>
                <span className="text-xs text-content-secondary">Demain</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-content-tertiary">
              → Hover : élévation subtile, signale l'interactivité.
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs text-content-secondary">
              shadow-modal → md
            </p>
            <div className="rounded-container bg-surface-base p-component-lg shadow-modal">
              <p className="font-heading text-lg font-bold text-content">
                Supprimer la tâche ?
              </p>
              <p className="mt-1 text-sm text-content-secondary">
                Cette action est irréversible.
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
                  className="rounded-component bg-action-danger px-4 py-2 text-sm font-medium text-content-inverse"
                >
                  Supprimer
                </button>
              </div>
            </div>
            <p className="mt-2 text-xs text-content-tertiary">
              → Modale : ombre md pour détacher du fond.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
