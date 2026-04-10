import { useState } from "react";
import { DesignTokensPreview } from "./design-tokens-preview/DesignTokensPreview";
import { ComponentsPreview } from "./components-preview/ComponentsPreview";

type View = "tokens" | "components";

export function DesignSystemPreview() {
  const [view, setView] = useState<View>("tokens");

  return (
    <div>
      <nav className="sticky top-0 z-10 flex gap-1 border-b border-edge bg-surface-base/90 px-6 py-3 backdrop-blur">
        <button
          type="button"
          onClick={() => setView("tokens")}
          className={`rounded-component px-4 py-2 text-sm font-medium transition-colors ${
            view === "tokens"
              ? "bg-action-primary text-content-inverse"
              : "text-content-secondary hover:text-content"
          }`}
        >
          Design Tokens
        </button>
        <button
          type="button"
          onClick={() => setView("components")}
          className={`rounded-component px-4 py-2 text-sm font-medium transition-colors ${
            view === "components"
              ? "bg-action-primary text-content-inverse"
              : "text-content-secondary hover:text-content"
          }`}
        >
          Composants
        </button>
      </nav>
      {view === "tokens" ? <DesignTokensPreview /> : <ComponentsPreview />}
    </div>
  );
}
