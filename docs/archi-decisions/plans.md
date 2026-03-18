---
updated: 2026-03-18
---

# Plans d'implementation — IZH

## PLAN-001 — Composant Button (C-01)

**Date :** 2026-03-18
**Statut :** Planifié
**Décision liée :** EX session — Option C (composant classique monolithique, pas de headless)
**Branche :** `feat/1.3-buttonComponent`

**Principes appliqués :**
- SRP (solidbook ch.13) — Le composant fait UNE chose : rendre un bouton stylé. Pas de logique métier.
- Affordances in code (solidbook ch.5) — Colocation tests, dossier par composant, nommage explicite.
- Pyramide de tests (solidbook ch.25) — Tests unitaires sur le comportement observable.

**Architecture choisie :**
- Styling dans CSS (`@layer components`) — pattern DaisyUI avec variables CSS locales `--_btn-*` et `@apply`
- Composant React fin — mappe les props vers les classes CSS via `cn()`
- `cn()` = `clsx` + `tailwind-merge` — résolution des conflits de classes Tailwind

---

### Étape 0 — Prérequis : test setup

**Fichier :** `src/test/setup.ts`
**Action :** Créer le fichier setup déjà référencé dans `vite.config.ts` (`setupFiles: ["./src/test/setup.ts"]`). Import des matchers jest-dom pour Vitest.

```ts
import "@testing-library/jest-dom/vitest";
```

**Pourquoi :** Sans ce fichier, `toBeInTheDocument()`, `toHaveClass()`, etc. ne sont pas disponibles. Vitest crashera au premier test.

**Piège à éviter :** Importer depuis `@testing-library/jest-dom` au lieu de `@testing-library/jest-dom/vitest` — le sous-path `/vitest` enregistre les matchers automatiquement pour Vitest.

---

### Étape 1 — Dépendances : `clsx` + `tailwind-merge` + utilitaire `cn()`

**Installer :**

```bash
npm install clsx tailwind-merge
```

**Fichier :** `src/lib/utils.ts`
**Action :** Créer l'utilitaire `cn()`. Pattern standard (shadcn/ui, la plupart des design systems modernes).

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Pourquoi `tailwind-merge` :** Quand un parent passe `className="mt-8"` à un Button qui a déjà `mt-4` dans ses classes de base, `clsx` concatène les deux (les deux s'appliquent, comportement CSS imprévisible). `twMerge` résout le conflit intelligemment : la dernière classe gagne.

**Pourquoi un fichier séparé :** Ce `cn()` sera réutilisé par TOUS les composants du design system. Le mettre dans `src/lib/` le rend accessible sans créer de dépendance circulaire.

---

### Étape 2 — Styling CSS : `button.css`

**Fichier :** `src/styles/components/button.css`
**Action :** Définir toutes les classes visuelles du Button dans `@layer components`. Approche DaisyUI : classe de base `.btn` + variantes `.btn-primary`, `.btn-sm`, etc.

**Structure :**

```css
@layer components {

  /* ===== 1. BASE ===== */
  .btn {
    /* Variables locales (surchargeables par variantes) */
    --_btn-bg: transparent;
    --_btn-fg: var(--color-content);
    --_btn-border: transparent;

    /* Layout — @apply Tailwind */
    @apply inline-flex items-center justify-center;
    @apply cursor-pointer select-none;
    @apply font-medium;

    /* Tokens visuels via variables */
    background-color: var(--_btn-bg);
    color: var(--_btn-fg);
    border: 1px solid var(--_btn-border);
    border-radius: var(--radius-component);
    gap: var(--spacing-inline-sm);
    transition: all var(--duration-fast) var(--ease-out);
  }

  /* ===== 2. ÉTATS INTERACTIFS ===== */
  .btn:focus-visible { /* ring 2px accent, 4px offset — spec accessibilité */ }
  .btn:active { transform: scale(0.97); }
  .btn:disabled, .btn[aria-disabled="true"] { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
  .btn[aria-busy="true"] { pointer-events: none; }

  /* ===== 3. VARIANTES DE STYLE ===== */
  .btn-primary {
    --_btn-bg: var(--color-action-primary);
    --_btn-fg: var(--color-content-inverse);
    --_btn-border: var(--color-action-primary);
  }
  .btn-primary:hover {
    --_btn-bg: var(--color-action-primary-hover);
    box-shadow: var(--shadow-button-hover);
  }

  .btn-secondary { /* --color-surface-subtle, border-edge */ }
  .btn-outline { /* transparent, border-edge-strong */ }
  .btn-text { /* transparent, content-accent, pas de border */ }
  .btn-icon-only { /* padding carré symétrique */ }
  .btn-danger { /* action-danger, content-inverse */ }

  /* ===== 4. VARIANTES DE TAILLE ===== */
  .btn-sm { /* h-9, px-4, py-2, text-sm, min-h touch 44px */ }
  .btn-md { /* h-11, px-6, py-3, text-sm — défaut */ }
  .btn-lg { /* h-13, px-8, py-4, text-base */ }

  /* ===== 5. MODIFICATEURS ===== */
  .btn-block { @apply w-full; }
}
```

**Mapping tokens spec → tokens réels :**

| Spec | Token CSS | Utilitaire Tailwind |
|---|---|---|
| `--color-text-primary` | `--color-content` | `text-content` |
| `--color-text-inverse` | `--color-content-inverse` | `text-content-inverse` |
| `--color-text-secondary` | `--color-content-secondary` | `text-content-secondary` |
| `--color-text-accent` | `--color-content-accent` | `text-content-accent` |
| `--color-border-default` | `--color-edge` | `border-edge` |
| `--color-border-strong` | `--color-edge-strong` | `border-edge-strong` |
| `--color-border-focus` | `--color-edge-focus` | `ring-edge-focus` |
| `--color-surface-subtle` | ✅ identique | `bg-surface-subtle` |
| `--color-surface-muted` | ✅ identique | `bg-surface-muted` |
| `--color-action-primary` | ✅ identique | `bg-action-primary` |
| `--color-action-danger` | ✅ identique | `bg-action-danger` |

**Piège à éviter :** Utiliser les noms de la spec (`--color-text-primary`) au lieu des vrais tokens (`--color-content`). Les specs UX ont été écrites avant le renommage Tailwind.

**Piège à éviter :** Oublier `@apply` pour les propriétés Tailwind et écrire du CSS brut — on perd la cohérence avec l'échelle Tailwind.

---

### Étape 3 — Composant React : `Button.tsx`

**Fichier :** `src/components/Button/Button.tsx`
**Action :** Composant fin qui mappe les props vers les classes CSS définies à l'étape 2.

**Types :**

```tsx
type ButtonVariant = "primary" | "secondary" | "outline" | "text" | "icon-only" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  variant?: ButtonVariant;       // défaut: "primary"
  size?: ButtonSize;             // défaut: "md"
  block?: boolean;               // width: 100%
  loading?: boolean;             // spinner + aria-busy
  iconLeft?: React.ReactNode;    // icône avant le label
}
```

**Pattern du composant (React 19 — ref as prop) :**

```tsx
function Button({
  variant = "primary",
  size = "md",
  block,
  loading,
  iconLeft,
  className,
  children,
  disabled,
  ref,
  ...rest
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={cn(
        "btn",
        `btn-${variant}`,
        `btn-${size}`,
        block && "btn-block",
        className,  // overrides du parent — twMerge résout les conflits
      )}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner /> : iconLeft}
      {variant !== "icon-only" && children}
    </button>
  );
}
```

**Décisions de design :**
- `ref` comme prop (React 19) — `forwardRef` est déprécié depuis React 19. Le `ref` se destructure comme n'importe quelle prop.
- `ComponentPropsWithRef<"button">` — on hérite de TOUTES les props HTML natives (`type`, `onClick`, `id`, `ref`...)
- Pas de prop `iconOnly` — `variant="icon-only"` suffit. Une seule source de vérité.
- `className` en dernier dans `cn()` — le parent peut toujours override
- Le spinner est un composant interne simple (SVG animé 16px)

**SRP (solidbook ch.13) :** Le composant React ne gère QUE le mapping props → classes + ARIA. Zéro logique visuelle — tout est dans le CSS.

**Piège à éviter :** Mettre des classes Tailwind directement dans le composant au lieu d'utiliser les classes CSS (`.btn-primary`). Ça créerait deux sources de vérité pour le styling.

---

### Étape 4 — Export barrel

**Fichier :** `src/components/Button/index.ts`
**Action :**

```ts
export { Button } from "./Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./Button";
```

**Affordances (solidbook ch.5) :** `import { Button } from "@/components/Button"` — propre, prévisible.

---

### Étape 5 — Tests colocalisés

**Fichier :** `src/components/Button/Button.test.tsx`
**Action :** Tester les **comportements**, pas les détails d'implémentation CSS.

**Tests à écrire :**

| # | Test | Ce qu'il vérifie |
|---|---|---|
| 1 | Rend avec le label | Le texte est dans le DOM |
| 2 | Applique la classe de base `.btn` | Contrat CSS |
| 3 | Variante par défaut = `.btn-primary` | Défaut sans prop explicite |
| 4 | Chaque variante applique `.btn-{variant}` | 6 variantes × 1 assertion |
| 5 | Chaque taille applique `.btn-{size}` | 3 tailles × 1 assertion |
| 6 | `block` → `.btn-block` | Modificateur |
| 7 | `disabled` → `aria-disabled="true"` | Accessibilité |
| 8 | `loading` → `aria-busy="true"` | Accessibilité |
| 9 | `loading` → spinner visible | Feedback visuel |
| 10 | Click handler appelé | Comportement de base |
| 11 | Click PAS appelé quand disabled | Protection |
| 12 | Click PAS appelé quand loading | Protection |
| 13 | Forward ref | `ref` pointe vers le DOM node |
| 14 | `className` custom merged | `cn()` fonctionne, pas d'écrasement |
| 15 | Props HTML forwarded | `type="submit"`, `id`, etc. |
| 16 | `icon-only` sans `aria-label` → warning console | Accessibilité (bonus) |

**Principes :**
- Pyramide de tests (solidbook ch.25) — comportement observable, pas CSS interne
- Exception : on teste les classes car c'est le contrat du design system (`.btn-primary` doit être présent)
- ADR-001 : tests colocalisés dans le même dossier

---

### Étape 6 — Intégration CSS

**Fichier :** `src/index.css` (ligne 11)
**Action :** Décommenter l'import déjà préparé :

```css
@import "./styles/components/button.css";
```

---

### Ordre d'exécution

```
0. src/test/setup.ts              — prérequis tests
1. npm install clsx tailwind-merge — dépendances
2. src/lib/utils.ts                — utilitaire cn()
3. src/styles/components/button.css — styling (CSS d'abord, c'est le contrat visuel)
4. src/components/Button/Button.tsx — composant React
5. src/components/Button/index.ts   — export
6. src/components/Button/Button.test.tsx — tests
7. src/index.css                    — décommenter l'import
```

**Dépendances entre étapes :**
- Étape 3 dépend de 1 (tokens CSS disponibles via import)
- Étape 4 dépend de 2 (`cn()` doit exister) ET 3 (classes CSS référencées)
- Étape 6 dépend de 0 (setup.ts) ET 4 (composant à tester)

### Critères de complétion

- [ ] `npm run test:run` — tous les tests passent
- [ ] Les 6 variantes visuelles rendent avec les bonnes classes CSS
- [ ] Les 3 tailles sont implémentées (sm: 36px, md: 44px, lg: 52px)
- [ ] Zone tactile ≥ 44px sur toutes les tailles (padding invisible pour `sm`)
- [ ] `focus-visible` ring conforme spec : `0 0 0 2px surface-base, 0 0 0 4px edge-focus`
- [ ] États `disabled` et `loading` accessibles (`aria-disabled`, `aria-busy`)
- [ ] Aucune valeur hardcodée — tout via design tokens
- [ ] `className` custom mergé via `cn()` sans conflit
- [ ] 0 violation SRP — composant React = mapping, CSS = visuel

### Fichiers créés/modifiés

| Fichier | Action |
|---|---|
| `src/test/setup.ts` | Créer |
| `src/lib/utils.ts` | Créer |
| `src/styles/components/button.css` | Créer |
| `src/components/Button/Button.tsx` | Créer |
| `src/components/Button/index.ts` | Créer |
| `src/components/Button/Button.test.tsx` | Créer |
| `src/index.css` | Modifier (décommenter ligne 11) |
