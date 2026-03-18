import { Section, Swatch } from "./shared";
import type { SwatchDef } from "./shared";

const neutrals: SwatchDef[] = [
  { label: "0", bgClass: "bg-neutral-0", sub: "100%" },
  { label: "50", bgClass: "bg-neutral-50", sub: "97.6%" },
  { label: "100", bgClass: "bg-neutral-100", sub: "91.5%" },
  { label: "200", bgClass: "bg-neutral-200", sub: "86%" },
  { label: "300", bgClass: "bg-neutral-300", sub: "76.9%" },
  { label: "400", bgClass: "bg-neutral-400", sub: "62%" },
  { label: "500", bgClass: "bg-neutral-500", sub: "58%" },
  { label: "600", bgClass: "bg-neutral-600", sub: "48%" },
  { label: "700", bgClass: "bg-neutral-700", sub: "40%" },
  { label: "800", bgClass: "bg-neutral-800", sub: "32.9%" },
  { label: "900", bgClass: "bg-neutral-900", sub: "25%" },
  { label: "950", bgClass: "bg-neutral-950", sub: "18%" },
];

const accents: SwatchDef[] = [
  { label: "50", bgClass: "bg-accent-50" },
  { label: "100", bgClass: "bg-accent-100" },
  { label: "200", bgClass: "bg-accent-200" },
  { label: "300", bgClass: "bg-accent-300" },
  { label: "400", bgClass: "bg-accent-400" },
  { label: "500", bgClass: "bg-accent-500" },
  { label: "600", bgClass: "bg-accent-600" },
  { label: "700", bgClass: "bg-accent-700" },
  { label: "800", bgClass: "bg-accent-800" },
  { label: "900", bgClass: "bg-accent-900" },
];

interface QuadrantDef {
  name: string;
  subtitle: string;
  light: string;
  base: string;
  dark: string;
}

const quadrants: QuadrantDef[] = [
  {
    name: "Q1 — Rouge Feu",
    subtitle: "Urgent & Important",
    light: "bg-red-light",
    base: "bg-red-base",
    dark: "bg-red-dark",
  },
  {
    name: "Q3 — Orange Soleil",
    subtitle: "Urgent, pas important",
    light: "bg-orange-light",
    base: "bg-orange-base",
    dark: "bg-orange-dark",
  },
  {
    name: "Vert Sauge",
    subtitle: "Complété / Validé",
    light: "bg-green-light",
    base: "bg-green-base",
    dark: "bg-green-dark",
  },
  {
    name: "Jaune Chartreuse",
    subtitle: "En cours",
    light: "bg-yellow-light",
    base: "bg-yellow-base",
    dark: "bg-yellow-dark",
  },
];

export function PaletteSection() {
  return (
    <>
      <Section
        title='Neutres Chauds — "Warm Stone"'
        subtitle="Palette de couleurs OKLCH — Direction Compagnon"
      >
        <div className="flex flex-wrap gap-2">
          {neutrals.map((s) => (
            <Swatch key={s.label} {...s} />
          ))}
        </div>
      </Section>

      <Section title="Bleu Accent — CTA & Liens">
        <div className="flex flex-wrap gap-2">
          {accents.map((s) => (
            <Swatch key={s.label} {...s} />
          ))}
        </div>
      </Section>

      <Section title="Couleurs Eisenhower — Quadrants">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {quadrants.map((q) => (
            <div key={q.name} className="flex flex-col gap-1.5">
              {[q.light, q.base, q.dark].map((c, i) => (
                <div key={i} className={`h-10 w-full rounded-sm ${c}`} />
              ))}
              <p className="text-xs font-medium text-content">{q.name}</p>
              <p className="text-xs text-content-secondary">{q.subtitle}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Rôles sémantiques — Surfaces & Textes">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col overflow-hidden rounded-component border border-edge">
            <div className="border-b border-edge bg-surface-base p-component-md">
              <p className="text-sm font-medium text-content">surface-base</p>
              <p className="text-xs text-content-secondary">
                ≈ #FFFFFF — Fond principal
              </p>
            </div>
            <div className="border-b border-edge bg-surface-subtle p-component-md">
              <p className="text-sm font-medium text-content">surface-subtle</p>
              <p className="text-xs text-content-secondary">
                ≈ #F7F7F5 — Cards, sections
              </p>
            </div>
            <div className="bg-surface-inverse p-component-md">
              <p className="text-sm font-medium text-content-inverse">
                surface-inverse
              </p>
              <p className="text-xs text-content-inverse/70">
                ≈ #1C1A16 — Tooltips, overlays
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-component border border-edge p-component-md">
            <p className="text-base font-medium text-content">
              text-primary — Le texte principal
            </p>
            <p className="text-sm text-content-secondary">
              text-secondary — Labels et icônes au repos
            </p>
            <p className="text-sm text-content-tertiary">
              text-tertiary — Hints et placeholders
            </p>
            <p className="text-sm text-content-accent">
              text-accent — Liens et actions
            </p>
            <p className="text-sm text-content-danger">
              text-danger — Messages d'erreur
            </p>
          </div>
        </div>
      </Section>

      <Section title="Actions — Boutons CTA">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-component bg-action-primary px-6 py-3 text-sm font-medium text-content-inverse"
          >
            Aide-moi à décider
          </button>
          <button
            type="button"
            className="rounded-component bg-action-accent px-6 py-3 text-sm font-medium text-content-inverse"
          >
            Voir la matrice
          </button>
          <button
            type="button"
            className="rounded-component border border-edge bg-action-ghost px-6 py-3 text-sm font-medium text-content"
          >
            Annuler
          </button>
          <button
            type="button"
            className="rounded-component bg-action-danger px-6 py-3 text-sm font-medium text-content-inverse"
          >
            Supprimer
          </button>
        </div>
      </Section>
    </>
  );
}
