import { Section } from "./shared";

interface TypeRowDef {
  role: string;
  example: string;
  spec: string;
  className: string;
}

const typeRows: TypeRowDef[] = [
  {
    role: "H1 — 34px",
    example: "Vrac",
    spec: "Space Grotesk Bold · tracking -0.5px · line-height 1.25",
    className: "font-heading font-bold text-xl tracking-tight",
  },
  {
    role: "H2 — 20px",
    example: "Urgent & Important",
    spec: "Space Grotesk Bold · tracking -0.3px · line-height 1.25",
    className: "font-heading font-bold text-lg tracking-snug",
  },
  {
    role: "Body — 15px",
    example: "Appeler le pédiatre pour le vaccin de Mila",
    spec: "Inter Regular · line-height 1.5",
    className: "font-body font-normal text-base",
  },
  {
    role: "Label — 13px",
    example: "Aide-moi à décider",
    spec: "Inter Medium · boutons, badges, tags",
    className: "font-body font-medium text-sm",
  },
  {
    role: "Caption — 11px",
    example: "Créée le 8 mars · Triée en 42s",
    spec: "Inter Regular · metadata, timestamps",
    className: "font-body font-normal text-xs",
  },
];

export function TypographySection() {
  return (
    <>
      <Section
        title="Échelle typographique"
        subtitle="Space Grotesk (titres) + Inter (corps) — Ratio ~1.25 Major Third"
      >
        <div className="flex flex-col divide-y divide-edge overflow-hidden rounded-component border border-edge">
          {typeRows.map((row) => (
            <div
              key={row.role}
              className="flex items-center gap-6 p-component-md"
            >
              <span className="w-28 shrink-0 text-xs text-content-secondary">
                {row.role}
              </span>
              <span className={`${row.className} text-content`}>
                {row.example}
              </span>
              <span className="ml-auto hidden text-xs text-content-tertiary sm:block">
                {row.spec}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="En contexte — Hiérarchie typographique appliquée">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-container border border-edge bg-surface-base p-component-lg">
            <h3 className="font-heading font-bold text-xl tracking-tight text-content">
              Vrac
            </h3>
            <p className="mt-1 text-xs text-content-secondary">
              12 tâches non triées
            </p>
            <div className="mt-4 flex flex-col gap-stack-sm">
              {[
                "Appeler le pédiatre pour le vaccin de Mila",
                "Envoyer la facture client Dupont",
                "Acheter des couches taille 4",
              ].map((task, i) => (
                <div
                  key={i}
                  className="rounded-component border border-edge bg-surface-subtle p-component-md"
                >
                  <p className="text-base text-content">{task}</p>
                  <p className="mt-1 text-xs text-content-secondary">
                    Créée le {8 - i} mars
                  </p>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 rounded-component bg-action-primary px-6 py-3 text-sm font-medium text-content-inverse"
            >
              Aide-moi à décider
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {[
              {
                title: "H1 — Space Grotesk Bold 34px",
                desc: "Nom de la vue. Un seul H1 par écran. Ancrage visuel immédiat.",
              },
              {
                title: "Body — Inter Regular 15px",
                desc: "Titre de tâche. Hiérarchie plate : body + caption.",
              },
              {
                title: "Caption — Inter Regular 11px",
                desc: "Metadata discrète. Couleur secondaire. Visible mais n'attire pas l'attention.",
              },
              {
                title: "Label — Inter Medium 13px",
                desc: "Bouton CTA. Medium 500 pour se distinguer du body.",
              },
            ].map((a, i) => (
              <div key={i} className="flex gap-3">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-action-accent" />
                <div>
                  <p className="text-sm font-medium text-content">{a.title}</p>
                  <p className="text-xs text-content-secondary">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
