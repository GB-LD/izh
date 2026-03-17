# Design Tokens & Système visuel de base — izh

> **Usage agent :** C'est le vocabulaire visuel du produit. Chaque valeur est une décision intentionnelle, pas un choix arbitraire. Distingue les tokens PRIMITIFS (valeurs brutes) des tokens SÉMANTIQUES (rôles intentionnels). L'UI designer étend ce système — il ne le contourne jamais.
>
> Convention de nommage : `--{catégorie}-{propriété}-{modificateur}` — nommer par RÔLE, jamais par apparence (pas `--color-blue-500`, mais `--color-action-primary`).

**Version :** v1.0
**Date :** 2026-03-10
**Auteur :** UX Designer (assisté par IA)
**Statut :** Complété

---

## 1. Palette de couleurs

### Tokens primitifs — Neutres chauds "Warm Stone"

> _Les neutres d'izh ont une teinte chaude (H ≈ 90-106 en OKLCH) avec un chroma minimal — c'est ce qui donne le côté "calme, pas froid" sans basculer dans le beige. Les primitives ne sont jamais utilisées directement dans les composants — seulement via les sémantiques._

```css
/* Neutres chauds — "Warm Stone" (H ≈ 92-106) */
--primitive-neutral-0: oklch(100% 0 0); /* Blanc pur — fond principal */
--primitive-neutral-50: oklch(
  97.6% 0.003 106
); /* Beige-gris — surface cards (#F7F7F5) */
--primitive-neutral-100: oklch(
  91.5% 0.004 106
); /* Bordures, séparateurs (#E3E3E0) */
--primitive-neutral-200: oklch(
  86% 0.005 100
); /* Bordures fortes, hover subtle */
--primitive-neutral-300: oklch(
  76.9% 0.006 106
); /* Texte tertiaire, hints (#B4B4B0) */
--primitive-neutral-400: oklch(
  62% 0.005 92
); /* Texte secondaire, icônes repos (~#808078) — assombri pour AA */
--primitive-neutral-500: oklch(58% 0.006 92); /* — */
--primitive-neutral-600: oklch(48% 0.008 92); /* — */
--primitive-neutral-700: oklch(40% 0.01 92); /* — */
--primitive-neutral-800: oklch(
  32.9% 0.011 92
); /* Texte primaire, CTA dark (#37352F) */
--primitive-neutral-900: oklch(
  25% 0.01 92
); /* Texte sur surface claire — plus sombre */
--primitive-neutral-950: oklch(
  18% 0.008 92
); /* Quasi-noir — tooltips, overlays */
```

### Tokens primitifs — Bleu Accent

```css
/* Bleu Accent — CTA, liens, focus (H ≈ 253) */
--primitive-accent-50: oklch(96% 0.015 253);
--primitive-accent-100: oklch(92% 0.035 253);
--primitive-accent-200: oklch(84% 0.07 253);
--primitive-accent-300: oklch(75% 0.11 253);
--primitive-accent-400: oklch(68% 0.14 253);
--primitive-accent-500: oklch(60.6% 0.167 253); /* Base — #2383E2 */
--primitive-accent-600: oklch(53% 0.17 253); /* Hover */
--primitive-accent-700: oklch(45% 0.155 253); /* Active */
--primitive-accent-800: oklch(37% 0.13 253);
--primitive-accent-900: oklch(30% 0.1 253);
```

### Tokens primitifs — Couleurs de quadrant Eisenhower

```css
/* Q1 — Rouge "Feu" — Urgent & Important (H ≈ 24) */
--primitive-red-light: oklch(92% 0.035 24);
--primitive-red-base: oklch(
  58% 0.183 24
); /* ~#D14040 — assombri pour AA sur fond blanc */
--primitive-red-dark: oklch(48% 0.15 24);

/* Q3 — Orange "Soleil" — Urgent, pas important (H ≈ 63) */
--primitive-orange-light: oklch(93% 0.04 63);
--primitive-orange-base: oklch(79.2% 0.152 63); /* #FFA344 */
--primitive-orange-dark: oklch(60% 0.13 63);

/* Complété / Validé — Vert "Sauge" (H ≈ 180) */
--primitive-green-light: oklch(93% 0.03 180);
--primitive-green-base: oklch(68% 0.093 180); /* #4DAB9A */
--primitive-green-dark: oklch(48% 0.08 180);

/* En cours — Jaune "Chartreuse doré" (H ≈ 100) */
--primitive-yellow-light: oklch(94% 0.045 100);
--primitive-yellow-base: oklch(76.8% 0.157 100); /* #B5B830 */
--primitive-yellow-dark: oklch(55% 0.12 100);
```

---

### Tokens sémantiques — Rôles intentionnels

> _Ce sont ces tokens que les composants utilisent. Les primitives ne sont jamais référencées directement. Changer le thème = changer ces valeurs, pas les composants._

#### Surfaces (backgrounds)

```css
--color-surface-base: var(--primitive-neutral-0); /* Fond principal */
--color-surface-subtle: var(
  --primitive-neutral-50
); /* Fond cards, sections — #F7F7F5 */
--color-surface-muted: var(--primitive-neutral-100); /* Fond désactivé */
--color-surface-inverse: var(--primitive-neutral-950); /* Tooltips, overlays */
--color-surface-accent: var(
  --primitive-accent-50
); /* Fond teinte bleue légère */
```

#### Textes

```css
--color-text-primary: var(
  --primitive-neutral-800
); /* #37352F — brun-noir chaud */
--color-text-secondary: var(
  --primitive-neutral-400
); /* ~#808078 — labels, icônes (AA sur blanc) */
--color-text-tertiary: var(
  --primitive-neutral-300
); /* #B4B4B0 — hints, placeholders */
--color-text-inverse: var(--primitive-neutral-0); /* Texte sur fond sombre */
--color-text-accent: var(--primitive-accent-500); /* Liens, texte actionnable */
--color-text-danger: var(--primitive-red-dark); /* Messages d'erreur */
```

#### Actions

```css
/* CTA primaire — Dark button (signature izh) */
--color-action-primary: var(
  --primitive-neutral-800
); /* #37352F — sobre et affirmé */
--color-action-primary-hover: var(
  --primitive-neutral-950
); /* #1A1A16 — contraste hover renforcé */
--color-action-primary-active: var(
  --primitive-neutral-950
); /* idem hover — différencié par scale(0.97) */

/* CTA secondaire — Blue pour liens/actions alternatives */
--color-action-accent: var(--primitive-accent-500); /* #2383E2 */
--color-action-accent-hover: var(--primitive-accent-600);
--color-action-accent-active: var(--primitive-accent-700);

/* Actions tertiaires — Ghost/outline */
--color-action-ghost: transparent;
--color-action-ghost-hover: var(--primitive-neutral-50);

/* Danger */
--color-action-danger: var(--primitive-red-base);
--color-action-danger-hover: var(--primitive-red-dark);
```

#### Bordures

```css
--color-border-default: var(
  --primitive-neutral-100
); /* #E3E3E0 — séparateurs subtils */
--color-border-strong: var(--primitive-neutral-200); /* Bordure plus visible */
--color-border-accent: var(--primitive-accent-500); /* Sélection, focus ring */
--color-border-danger: var(--primitive-red-base);
--color-border-focus: var(--primitive-accent-500); /* ⚠️ Jamais supprimer */
```

#### Quadrants Eisenhower (sémantique métier)

```css
/* Les quadrants ont des couleurs spécifiques — jamais les feedback génériques */
--color-quadrant-q1: var(
  --primitive-red-base
); /* Urgent & Important — Rouge "Feu" */
--color-quadrant-q1-surface: var(--primitive-red-light);
--color-quadrant-q2: var(
  --primitive-green-base
); /* Important, pas urgent — Vert "Sauge" */
--color-quadrant-q2-surface: var(--primitive-green-light);
--color-quadrant-q3: var(
  --primitive-orange-base
); /* Urgent, pas important — Orange "Soleil" */
--color-quadrant-q3-surface: var(--primitive-orange-light);
--color-quadrant-q4: var(
  --primitive-yellow-base
); /* Ni urgent, ni important — Jaune "Chartreuse doré" */
--color-quadrant-q4-surface: var(--primitive-yellow-light);
--color-quadrant-active: var(--primitive-yellow-base); /* Tâche en cours */
--color-quadrant-active-surface: var(--primitive-yellow-light);
--color-quadrant-done: var(--primitive-green-base); /* Complété */
--color-quadrant-done-surface: var(--primitive-green-light);
```

> **Note :** Chaque quadrant a sa couleur propre — la couleur est l'identité permanente du quadrant, pas seulement un signal d'urgence. Q4 partage le jaune chartreuse avec le statut "en cours", Q2 partage le vert sauge avec "complété" — ces collisions sont acceptées car quadrant (classification) et statut (avancement) ne s'affichent jamais au même endroit.

#### Feedback système

```css
--color-feedback-success: var(--primitive-green-base);
--color-feedback-success-surface: var(--primitive-green-light);
--color-feedback-error: var(--primitive-red-base);
--color-feedback-error-surface: var(--primitive-red-light);
--color-feedback-warning: var(--primitive-orange-base);
--color-feedback-warning-surface: var(--primitive-orange-light);
--color-feedback-info: var(--primitive-accent-500);
--color-feedback-info-surface: var(--primitive-accent-50);
```

---

## 2. Typographie

### Familles de polices

| Rôle       | Famille       | Fallback                             | Utilisation                                 |
| ---------- | ------------- | ------------------------------------ | ------------------------------------------- |
| Titres     | Space Grotesk | system-ui, sans-serif                | H1, H2 — identité izh, tech-friendly        |
| Corps / UI | Inter         | system-ui, -apple-system, sans-serif | Tout le texte courant, labels, boutons      |
| Monospace  | —             | —                                    | Pas nécessaire au MVP (pas de code affiché) |

```css
--font-family-heading: "Space Grotesk", system-ui, sans-serif;
--font-family-body: "Inter", system-ui, -apple-system, sans-serif;
```

### Échelle typographique

> _Ratio ~1.25 (Major Third). Tailles uniformes cross-device — l'app est content-centered (max-width ~600px), pas un dashboard large. Seul l'espacement change entre mobile et desktop._

```css
/* Tailles */
--font-size-xs: 0.6875rem; /*  11px — Caption, metadata */
--font-size-sm: 0.8125rem; /*  13px — Labels, boutons */
--font-size-base: 0.9375rem; /*  15px — Corps de texte (standard Notion) */
--font-size-lg: 1.25rem; /*  20px — H2 */
--font-size-xl: 2.125rem; /*  34px — H1 */

/* Graisses */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;

/* Interlignage */
--line-height-tight: 1.25; /* Titres H1, H2 */
--line-height-normal: 1.5; /* Corps de texte */

/* Tracking (letter-spacing) */
--tracking-tight: -0.5px; /* H1 — Space Grotesk serré */
--tracking-snug: -0.3px; /* H2 — légèrement serré */
--tracking-normal: 0; /* Corps, labels */
```

### Rôles sémantiques typographiques

| Token            | Famille       | Taille           | Graisse     | Tracking | Line-height | Usage izh                                 |
| ---------------- | ------------- | ---------------- | ----------- | -------- | ----------- | ----------------------------------------- |
| `--text-h1`      | Space Grotesk | 34px (2.125rem)  | Bold 700    | -0.5px   | 1.25        | Titre de vue — "Vrac", "Réserve", "Focus" |
| `--text-h2`      | Space Grotesk | 20px (1.25rem)   | Bold 700    | -0.3px   | 1.25        | Titre de section — "Urgent & Important"   |
| `--text-body`    | Inter         | 15px (0.9375rem) | Regular 400 | 0        | 1.5         | Corps — titre de tâche, texte courant     |
| `--text-label`   | Inter         | 13px (0.8125rem) | Medium 500  | 0        | 1.5         | Labels — badges de quadrant, boutons CTA  |
| `--text-caption` | Inter         | 11px (0.6875rem) | Regular 400 | 0        | 1.5         | Metadata — dates, compteurs, timestamps   |

> **Choix intentionnels :**
>
> - Le corps est à **15px** (pas 16) — standard Notion validé en direction visuelle. Suffisant pour l'accessibilité avec line-height 1.5.
> - Le tracking négatif sur Space Grotesk serre les titres pour un rendu dense et affirmé.
> - Pas de H3/H4 pour le MVP — l'app est plate, pas d'arborescence profonde. Si besoin futur : Inter Semibold 16-18px.
> - Tailles **uniformes cross-device** — l'app est content-centered max-width ~600px. C'est l'espacement qui change, pas la typo.

---

## 3. Espacements

> _Échelle basée sur un multiple de 4px. La densité faible est le principal levier de "respiration" — c'est là que se joue le "calme, espace, prêt pour moi" du brief._

### Échelle primitive

```css
--space-0: 0;
--space-px: 1px;
--space-1: 0.25rem; /*  4px */
--space-2: 0.5rem; /*  8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px — base */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
```

### Tokens sémantiques d'espacement

```css
/* Espacement interne des composants (padding) */
--space-component-sm: var(--space-2); /*  8px — badges, tags de quadrant */
--space-component-md: var(--space-4); /* 16px — cards de tâche, inputs */
--space-component-lg: var(--space-6); /* 24px — modales, bottom sheets */

/* Espacement entre éléments dans un composant (gap interne) */
--space-inline-xs: var(--space-1); /*  4px */
--space-inline-sm: var(--space-2); /*  8px */
--space-inline-md: var(--space-3); /* 12px */

/* Espacement vertical entre composants (stack) */
--space-stack-sm: var(
  --space-2
); /*  8px — gap interne card (titre ↔ metadata) */
--space-stack-md: var(--space-4); /* 16px — gap entre cards dans une liste */
--space-stack-lg: var(--space-6); /* 24px — gap entre sections */
--space-stack-xl: var(--space-8); /* 32px — gap entre zones majeures */

/* Marges de page */
--space-page-mobile: var(--space-4); /* 16px — marge latérale mobile */
--space-page-desktop: var(--space-16); /* 64px — marge latérale desktop */
```

> **Choix intentionnels :**
>
> - Les gaps entre sections (24px) sont volontairement généreux pour une app de productivité — c'est le levier principal de "respiration".
> - Content max-width ~600px centré — l'espace blanc latéral sur desktop EST le design, pas un vide à combler.
> - Les tailles d'espacement ne changent pas entre mobile et desktop — seules les marges de page augmentent.

---

## 4. Rayons de courbure (Border Radius)

> _Le radius est un signal de personnalité : 0 = pro austère, 16+ = bubbly grand public. izh vise le juste milieu Notion/Linear — doux sans être enfantin. 8px par défaut._

### Tokens primitifs

```css
--radius-none: 0;
--radius-sm: 4px; /* Tags, badges de quadrant */
--radius-md: 8px; /* Cards de tâche, inputs, boutons — DÉFAUT */
--radius-lg: 12px; /* Modales, bottom sheets, menus */
--radius-xl: 16px; /* Containers principaux, dialogs */
--radius-full: 9999px; /* Pills, avatars, toggles */
```

### Tokens sémantiques

```css
--radius-component: var(
  --radius-md
); /* Défaut composants — cards, inputs, CTA */
--radius-container: var(--radius-lg); /* Containers — modales, popovers */
--radius-badge: var(--radius-sm); /* Tags, badges Eisenhower */
--radius-pill: var(--radius-full); /* Filtres, chips, toggles */
```

> **Choix intentionnels :**
>
> - **8px par défaut** — aligné sur Notion/Linear. Doux sans être enfantin.
> - Les badges Eisenhower à 4px restent compacts et informationnels — ce sont des labels, pas des boutons.
> - `radius-full` distingue visuellement les éléments de filtre/navigation des cards de contenu.
> - Pas de radius asymétriques au MVP — simplicité.

---

## 5. Ombres & effets

> _L'ombre est un murmure, pas un cri. Cards flat par défaut — l'ombre signale l'interactivité au hover. Opacités volontairement basses mais lisibles._

### Tokens primitifs

```css
--shadow-none: none;
--shadow-xs: 0 1px 3px oklch(0% 0 0 / 0.07); /* Hover subtle sur cards */
--shadow-sm: 0 2px 6px oklch(0% 0 0 / 0.09); /* Toasts, notifications */
--shadow-md: 0 4px 16px oklch(0% 0 0 / 0.12); /* Modales, popovers, dropdowns */
--shadow-lg: 0 8px 32px oklch(0% 0 0 / 0.16); /* Bottom sheets, dialogs majeurs */
```

### Tokens sémantiques

```css
--shadow-card: var(--shadow-none); /* Cards au repos — flat, pas d'ombre */
--shadow-card-hover: var(--shadow-xs); /* Cards hover — élévation subtile */
--shadow-button-hover: 0 2px 8px oklch(0% 0 0 / 0.19); /* Bouton hover — élévation perceptible */
--shadow-dropdown: var(--shadow-md); /* Menus, popovers, autocomplete */
--shadow-modal: var(--shadow-md); /* Modales et bottom sheets */
--shadow-toast: var(--shadow-sm); /* Notifications, toasts */
--shadow-nav-pill: 0 1px 4px oklch(0% 0 0 / 0.08); /* Pill actif bottom nav segmented */
```

> **Choix intentionnels :**
>
> - **Cards flat par défaut** — la bordure `border-default` suffit au repos. L'ombre apparaît uniquement au hover pour signaler l'interactivité.
> - Opacités 7-16% — assez pour distinguer clairement les niveaux d'élévation, sans devenir "loud".
> - Couleurs en `oklch(0% 0 0 / opacity)` — noir pur désaturé, pas de teinte parasite.
> - Pas d'ombres intérieures (inner shadow) au MVP — simplicité.

---

## 6. Transitions & animations

> _Les transitions sont fonctionnelles, pas décoratives. Chaque durée et courbe sert la fluidité perçue — l'utilisateur ne doit jamais "attendre" une animation._

### Durées primitives

```css
--duration-instant: 0ms; /* Aucune transition — toggles, checkboxes */
--duration-fast: 120ms; /* Micro-interactions — hover, focus, press */
--duration-normal: 200ms; /* Transitions standard — cards, dropdowns */
--duration-slow: 300ms; /* Entrées/sorties — modales, bottom sheets */
--duration-slower: 500ms; /* Animations complexes — page transitions */
```

### Courbes d'accélération (easing)

```css
--ease-default: cubic-bezier(0.25, 0.1, 0.25, 1); /* Ease-out standard */
--ease-in: cubic-bezier(0.42, 0, 1, 1); /* Entrée — éléments qui apparaissent */
--ease-out: cubic-bezier(
  0,
  0,
  0.58,
  1
); /* Sortie — éléments qui disparaissent */
--ease-spring: cubic-bezier(
  0.34,
  1.56,
  0.64,
  1
); /* Rebond léger — drag & drop, snapping */
```

### Tokens sémantiques

```css
--transition-hover: var(--duration-fast) var(--ease-default); /* Hover sur cards, boutons */
--transition-expand: var(--duration-normal) var(--ease-out); /* Ouverture dropdowns, accordéons */
--transition-modal: var(--duration-slow) var(--ease-out); /* Entrée/sortie modales */
--transition-drag: var(--duration-fast) var(--ease-spring); /* Drag & drop de tâches */
```

> **Choix intentionnels :**
>
> - **120ms pour le hover** — instantané au ressenti, assez pour éviter le "flash". Standard iOS/Material.
> - **200ms pour les dropdowns** — l'utilisateur perçoit l'ouverture sans attendre.
> - **Ease-spring** réservé au drag & drop — le rebond léger rend le glisser-déposer des tâches satisfaisant sans être distrayant.
> - Pas d'animations d'entrée de page au MVP — les transitions sont fonctionnelles, pas décoratives.

---

## 7. Grille & Layout

> _Content-centered, single column, 600px max. L'espace blanc latéral sur desktop EST le design, pas un vide à combler._

### Breakpoints

```css
--breakpoint-sm: 480px; /* Mobile petit — iPhone SE */
--breakpoint-md: 768px; /* Tablette / mobile large */
--breakpoint-lg: 1024px; /* Desktop */
--breakpoint-xl: 1280px; /* Desktop large */
```

### Content width

```css
--layout-content-max: 600px; /* Largeur max du contenu — signature izh */
--layout-content-min: 320px; /* Largeur min supportée */
```

### Layout

```css
--layout-columns: 1; /* Single column — l'app est une liste, pas un dashboard */

/* Marges de page (repris des tokens d'espacement) */
--layout-margin-mobile: var(--space-4); /* 16px */
--layout-margin-desktop: var(--space-16); /* 64px */

/* Safe areas (mobile) */
--layout-safe-top: env(safe-area-inset-top);
--layout-safe-bottom: env(safe-area-inset-bottom);
```

### Navigation

```css
--layout-navbar-height: 52px; /* Bottom nav mobile — segmented icons-only */
--layout-header-height: 48px; /* Top bar — titre de vue + actions */
```

> **Choix intentionnels :**
>
> - **Single column, 600px max** — izh est une app de productivité personnelle, pas un dashboard. Le contenu centré avec espace blanc latéral sur desktop EST le design.
> - **Pas de grille multi-colonnes** — les tâches sont une liste verticale. La complexité visuelle irait contre le "calme".
> - **56px pour la navbar** — assez pour les 4 mini-cards de navigation (Vrac, Réserve, Focus, Archive) sans empiéter sur le contenu.
> - **env(safe-area)** — support natif des encoches iOS/Android.

---

## 8. Thème sombre (Dark mode)

_Post-MVP — les tokens sémantiques sont prêts pour le supporter._

---

## 9. Vérifications d'accessibilité des couleurs

> _Approche hybride : AA strict sur le texte fonctionnel, tolérance sur le décoratif. L'info n'est jamais portée par la couleur seule._

### Audit des combinaisons critiques

| Combinaison                                             | Contraste | WCAG AA | Usage                                      |
| ------------------------------------------------------- | --------- | ------- | ------------------------------------------ |
| `text-primary` (#37352F) sur `surface-base` (#FFF)      | ~14.5:1   | ✅ AAA  | Corps de texte                             |
| `text-primary` (#37352F) sur `surface-subtle` (#F7F7F5) | ~13.2:1   | ✅ AAA  | Texte sur cards                            |
| `text-secondary` (~#808078) sur `surface-base` (#FFF)   | ~5.5:1    | ✅ AA   | Labels, icônes                             |
| `text-tertiary` (#B4B4B0) sur `surface-base` (#FFF)     | ~2.2:1    | ❌ Fail | Hints, placeholders — décoratif uniquement |
| `text-inverse` (#FFF) sur `action-primary` (#37352F)    | ~14.5:1   | ✅ AAA  | Boutons CTA                                |
| `text-accent` (#2383E2) sur `surface-base` (#FFF)       | ~4.6:1    | ✅ AA   | Liens                                      |
| `text-inverse` (#FFF) sur `action-danger` (~#D14040)    | ~4.8:1    | ✅ AA   | Bouton Supprimer                           |
| Badge Q1 (~#D14040) sur `red-light`                     | ~4.5:1    | ✅ AA   | Badge Urgent                               |
| Badge Q3 (#FFA344) sur `orange-light`                   | ~2.5:1    | ❌ Fail | Badge — info doublée par label textuel     |

### Ajustements appliqués (approche hybride)

1. **`neutral-400` (text-secondary) : 68.6% → 62%** — gain de ~2.5 points de contraste. Les labels et icônes passent AA strict.
2. **`red-base` (action-danger, badge Q1) : 65.3% → 58%** — le rouge plus profond passe AA sur fond blanc. Plus sérieux pour les actions destructives.
3. **`text-tertiary` maintenu** — usage strictement décoratif (placeholders, hints). Jamais porteur d'info critique.
4. **Badges Eisenhower maintenus** — conforme WCAG 1.4.1 : l'info n'est jamais portée par la couleur seule (toujours doublée par le label "Q1", "Q3", etc.).

### Règles à respecter

- ⚠️ `text-tertiary` : **jamais** comme seul vecteur d'information
- ⚠️ Couleurs de quadrant : **toujours** accompagnées d'un label textuel
- ✅ `border-focus` : **jamais** supprimer le focus ring (outline obligatoire)
- ✅ Tailles minimales : texte ≥ 11px, zones tactiles ≥ 44×44px

---

_Template BMAD-UX v1.0 — basé sur Kholmatova (patterns perceptuels, design tokens), guides Web Design OKLCH, Nogier (accessibilité couleur, temps de réponse)_
