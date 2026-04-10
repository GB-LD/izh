import { Button } from "@/shared/Button/Button";
import type { ButtonVariant, ButtonSize } from "@/shared/Button/Button";
import { Section } from "../design-tokens-preview/shared";

function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 1.5l1.545 3.13 3.455.502-2.5 2.437.59 3.44L8 9.385l-3.09 1.624.59-3.44-2.5-2.437 3.455-.503L8 1.5z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="4" x2="12" y2="12" />
      <line x1="12" y1="4" x2="4" y2="12" />
    </svg>
  );
}

interface RowProps {
  label: string;
  sub?: string;
  children: React.ReactNode;
}

function PreviewRow({ label, sub, children }: RowProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-xs font-medium text-content-secondary">{label}</p>
        {sub && <p className="text-xs text-content-tertiary">{sub}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

const VARIANTS: {
  variant: ButtonVariant;
  label: string;
  description: string;
}[] = [
  {
    variant: "primary",
    label: "Primary",
    description: "Action principale — 1 seul par vue",
  },
  {
    variant: "secondary",
    label: "Secondary",
    description: "Action importante mais pas principale",
  },
  {
    variant: "outline",
    label: "Outline",
    description: "Choix parmi options équivalentes",
  },
  {
    variant: "text",
    label: "Text",
    description: "Action tertiaire, fermeture, retour",
  },
  {
    variant: "icon-only",
    label: "Icon-only",
    description: "Action contextuelle sans label — aria-label obligatoire",
  },
  {
    variant: "danger",
    label: "Danger",
    description: "Action destructive",
  },
];

const SIZES: {
  size: ButtonSize;
  label: string;
  description: string;
}[] = [
  { size: "sm", label: "sm", description: "36px visuel · 44px zone tactile" },
  { size: "md", label: "md", description: "44px — défaut" },
  { size: "lg", label: "lg", description: "52px — CTA pleine largeur" },
];

export function ButtonSection() {
  return (
    <Section
      title="C-01 — Button"
      subtitle="Déclencher une action immédiate — chaque variante guide le regard vers le bon niveau de priorité"
    >
      <div className="flex flex-col gap-10">
        {/* ── Variantes de style ── */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-content-tertiary">
            Variantes de style
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {VARIANTS.map(({ variant, label, description }) => (
              <div
                key={variant}
                className="flex flex-col gap-3 rounded-component border border-edge p-component-md"
              >
                <div>
                  <p className="text-xs font-medium text-content">{label}</p>
                  <p className="text-xs text-content-tertiary">{description}</p>
                </div>
                <div className="flex items-center gap-3">
                  {variant === "icon-only" ? (
                    <Button
                      variant="icon-only"
                      size="md"
                      aria-label="Fermer"
                      iconLeft={<XIcon />}
                    />
                  ) : (
                    <Button
                      variant={variant}
                      size="md"
                      iconLeft={
                        variant === "primary" ? <StarIcon /> : undefined
                      }
                    >
                      {label}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Variantes de taille ── */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-content-tertiary">
            Variantes de taille
          </p>
          <div className="flex flex-col gap-4">
            {SIZES.map(({ size, label, description }) => (
              <PreviewRow key={size} label={label} sub={description}>
                <Button variant="primary" size={size}>
                  {size === "sm"
                    ? "Trier"
                    : size === "md"
                      ? "C'est parti"
                      : "Démarrer"}
                </Button>
                <Button variant="secondary" size={size}>
                  {size === "sm"
                    ? "Purger"
                    : size === "md"
                      ? "Annuler"
                      : "Plus tard"}
                </Button>
                <Button variant="outline" size={size}>
                  {size === "sm"
                    ? "Options"
                    : size === "md"
                      ? "Voir plus"
                      : "Explorer"}
                </Button>
                <Button variant="danger" size={size}>
                  {size === "sm"
                    ? "Retirer"
                    : size === "md"
                      ? "Supprimer"
                      : "Supprimer définitivement"}
                </Button>
              </PreviewRow>
            ))}
          </div>
        </div>

        {/* ── États ── */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-content-tertiary">
            États
          </p>
          <div className="flex flex-col gap-4">
            <PreviewRow label="Default">
              <Button variant="primary">Compléter</Button>
              <Button variant="secondary">Annuler</Button>
              <Button variant="outline">Options</Button>
              <Button variant="danger">Supprimer</Button>
            </PreviewRow>

            <PreviewRow
              label="Loading"
              sub="aria-busy=true · pointer-events none · spinner remplace l'icône"
            >
              <Button variant="primary" loading>
                Compléter
              </Button>
              <Button variant="secondary" loading>
                Annuler
              </Button>
              <Button variant="danger" loading>
                Supprimer
              </Button>
            </PreviewRow>

            <PreviewRow
              label="Disabled"
              sub="opacity 0.4 · cursor not-allowed · aria-disabled=true"
            >
              <Button variant="primary" disabled>
                Compléter
              </Button>
              <Button variant="secondary" disabled>
                Annuler
              </Button>
              <Button variant="outline" disabled>
                Options
              </Button>
              <Button variant="danger" disabled>
                Supprimer
              </Button>
            </PreviewRow>
          </div>
        </div>

        {/* ── Modificateurs ── */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-content-tertiary">
            Modificateurs
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-xs font-medium text-content-secondary">
                  block
                </p>
                <p className="text-xs text-content-tertiary">width: 100%</p>
              </div>
              <Button variant="primary" block>
                Voir mon Focus
              </Button>
              <Button variant="secondary" block>
                Pas maintenant
              </Button>
            </div>

            <PreviewRow
              label="icon-left"
              sub="Icône 16px + gap (--spacing-inline-sm) + label"
            >
              <Button variant="primary" iconLeft={<StarIcon />}>
                C'est parti
              </Button>
              <Button variant="secondary" iconLeft={<StarIcon />}>
                Trier
              </Button>
              <Button variant="outline" iconLeft={<StarIcon />}>
                Options
              </Button>
            </PreviewRow>

            <PreviewRow
              label="icon-only · sm & md"
              sub="Padding carré symétrique — aria-label obligatoire"
            >
              <Button
                variant="icon-only"
                size="md"
                aria-label="Fermer"
                iconLeft={<XIcon />}
              />
              <Button
                variant="icon-only"
                size="sm"
                aria-label="Fermer"
                iconLeft={<XIcon />}
              />
              <Button
                variant="primary"
                size="md"
                aria-label="Ajouter"
                iconLeft={<StarIcon />}
              />
              <Button
                variant="primary"
                size="sm"
                aria-label="Ajouter"
                iconLeft={<StarIcon />}
              />
            </PreviewRow>
          </div>
        </div>
      </div>
    </Section>
  );
}
