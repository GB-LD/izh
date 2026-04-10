import { ButtonSection } from "./ButtonSection";

export function ComponentsPreview() {
  return (
    <div className="min-h-screen bg-surface-base font-body">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-10">
          <h1 className="font-heading text-xl font-bold tracking-tight text-content">
            izh — Components Preview
          </h1>
          <p className="mt-2 text-sm text-content-secondary">
            Composants UI — Direction "Compagnon"
          </p>
        </header>

        <div className="flex flex-col gap-10">
          <ButtonSection />
        </div>

        <footer className="mt-16 border-t border-edge pt-4">
          <p className="text-xs text-content-tertiary">
            izh Components v0.1 — Direction Compagnon — 2026-03-19
          </p>
        </footer>
      </div>
    </div>
  );
}
