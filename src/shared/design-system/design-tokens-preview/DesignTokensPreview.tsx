import { Divider } from "./shared";
import { PaletteSection } from "./PaletteSection";
import { TypographySection } from "./TypographySection";
import { SpacingSection } from "./SpacingSection";
import { RadiusSection } from "./RadiusSection";
import { ShadowsSection } from "./ShadowsSection";
import { LayoutSection } from "./LayoutSection";

export function DesignTokensPreview() {
  return (
    <div className="min-h-screen bg-surface-base font-body">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-10">
          <h1 className="font-heading text-xl font-bold tracking-tight text-content">
            izh — Design Tokens Preview
          </h1>
          <p className="mt-2 text-sm text-content-secondary">
            Palette de couleurs OKLCH — Direction "Compagnon"
          </p>
        </header>

        <div className="flex flex-col gap-10">
          <PaletteSection />
          <Divider />
          <TypographySection />
          <Divider />
          <SpacingSection />
          <Divider />
          <RadiusSection />
          <Divider />
          <ShadowsSection />
          <Divider />
          <LayoutSection />
        </div>

        <footer className="mt-16 border-t border-edge pt-4">
          <p className="text-xs text-content-tertiary">
            izh Design Tokens v0.1 — OKLCH — Direction Compagnon — 2026-03-10
          </p>
        </footer>
      </div>
    </div>
  );
}
