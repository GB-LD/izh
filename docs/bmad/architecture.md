---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-03-16'
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/product-brief-izh-planning-2026-03-16.md"
  - "IZH UX /01-brief-projet.md"
  - "IZH UX /02-personas-cas-usage.md"
  - "IZH UX /03-architecture-information-flows.md"
  - "IZH UX /04a-wireframe-architecture.md"
  - "IZH UX /04b-wireframe-semantic.md"
  - "IZH UX /04b-export-figma-make.md"
  - "IZH UX /05-design-tokens-systeme-visuel.md"
  - "IZH UX /06-specifications-composants.md"
  - "IZH UX /09-references-visuelles-directions.md"
  - "IZH UX /flows/*.mmd"
workflowType: 'architecture'
project_name: 'izh planning'
user_name: 'Dolu'
date: '2026-03-16'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
50 FRs organisées en 10 domaines couvrant le workflow complet : capture → tri (assisté/manuel) → backlog → matrice → complétion → archive. Le tri assisté par questionnaire cognitif (FR9-FR14) est le différenciateur produit et la pièce architecturale la plus complexe — machine à états à 4 branches, retour arrière, abandon sans perte de données.

**Non-Functional Requirements:**
21 NFRs dominées par la performance perçue (FCP <1.5s, 60fps, transitions <100ms), l'accessibilité WCAG 2.1 AA systématique, et la fiabilité localStorage (zéro perte de données, tolérance à l'abandon). Le bundle <200KB gzip contraint les choix de librairies.

**UX Complexity:**
12 écrans dont 6 overlays, 8 flows utilisateur, drag & drop multi-surface, layout asymétrique mobile avec swap, accordion strict, système d'overlay unifié (bottom sheet mobile / modal desktop). 40+ composants spécifiés avec design tokens complets en OKLCH.

**Scale & Complexity:**

- Primary domain: Front-end SPA (React + TypeScript)
- Complexity level: Moyenne — pas d'infra serveur, mais UX riche
- Estimated architectural components: ~15-20 modules (state, UI, flows, analytics, persistence, drag & drop, overlays, onboarding)

### Architectural Priorities (User-Defined)

Ces 4 priorités guident toutes les décisions architecturales. Le projet sert de portfolio technique — l'architecture doit démontrer une maîtrise professionnelle du front-end React/TypeScript.

| Priorité | Signification concrète |
|---|---|
| **Scalable** | La structure absorbe la phase 2 (Supabase, timeblocking, calendrier) sans réécriture. Couche de persistance abstraite, modules découplés, pas de couplage localStorage en dur. |
| **Maintenable** | Séparation claire des responsabilités, code lisible, modules à responsabilité unique. Un développeur qui découvre le projet comprend la structure en <10 minutes. |
| **Testable** | Architecture qui facilite les tests unitaires (logique métier isolée), d'intégration (composants), et e2e (flows utilisateur). Pas de logique dans les composants UI. |
| **Standards industrie** | Patterns reconnus par un recruteur front-end senior : clean architecture, conventions React/TS modernes, structure de projet professionnelle, CI/CD. |

### Technical Constraints & Dependencies

| Contrainte | Impact architectural |
|---|---|
| React + TypeScript | Framework imposé, typage strict |
| localStorage uniquement (MVP) | Pas de couche API, mais structure de données doit anticiper Supabase |
| Mobile-first, 3 breakpoints | Layout responsive (bottom sheet mobile, modal desktop, asymétrique Focus mobile vs grille desktop) |
| Bundle <200KB gzip | Choix de libs contraint (pas de gros frameworks UI) |
| Portfolio technique | Qualité code, patterns clairs, testabilité — l'architecture EST le livrable |
| Migration Supabase (phase 2) | La couche de persistance doit être abstraite derrière une interface |

### Cross-Cutting Concerns Identified

1. **State management & persistance** — localStorage avec timestamps automatiques, abstraction pour migration Supabase
2. **Drag & drop** — 3 surfaces (inter-quadrant, intra-quadrant, Focus→Réserve), contraintes différentes par écran
3. **Système d'overlays** — bottom sheet mobile / modal desktop, réutilisé par tri, purge, micro-survey
4. **Machine à états du questionnaire** — 4 flux cognitifs, navigation avant/arrière, abandon propre
5. **Design tokens** — CSS custom properties OKLCH, tokens primitifs → sémantiques
6. **Tracking analytique** — timestamps, timer, classification_method, user_override, micro-survey
7. **Mécanisme d'undo** — toast 5s sur complétion/suppression
8. **Accessibilité** — WCAG 2.1 AA, focus ring, prefers-reduced-motion, zones tactiles ≥44×44px
9. **Onboarding conditionnel** — flags localStorage, surbrillances et animations one-shot

## Starter Template Evaluation

### Primary Technology Domain

Front-end SPA (React + TypeScript) — pas de SSR, pas de backend MVP, contenu personnel non indexable.

### Starter Options Considered

| Option | Pour | Contre | Verdict |
|---|---|---|---|
| Vite officiel `react-swc-ts` | Minimal, standard, chaque choix intentionnel | Setup testing/routing/linting à faire | **Retenu** |
| Templates communautaires | Démarrage rapide | Conventions imposées, moins impressionnant portfolio | Écarté |
| Next.js / Remix | SSR, routing intégré | SSR inutile, over-engineering | Écarté |

### Selected Starter: Vite 8 + React 19 (`react-swc-ts`)

**Rationale for Selection:**
Pour un projet portfolio, construire l'architecture depuis une base minimale démontre une maîtrise technique que copier un boilerplate ne démontre pas. Chaque dépendance ajoutée est un choix justifiable en entretien.

**Initialization Command:**

```bash
npm create vite@latest izh -- --template react-swc-ts
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript 5.x strict mode
- SWC pour la compilation React (Fast Refresh)
- Node.js ≥20.19

**Build Tooling:**
- Vite 8 (Rolldown unifié, persistent caching, module-level splitting)
- Production build optimisé (tree-shaking, minification, code splitting automatique)

**Development Experience:**
- HMR instantané via SWC
- Dev server avec hot reload
- TypeScript checking intégré

**Styling Solution: Tailwind CSS v4 + Design System DaisyUI-like**
- OKLCH natif — les design tokens izh (05-design-tokens) mappés via `@theme` et `:root`
- Approche DaisyUI-like : composants CSS custom (`@layer components` + `@apply`) avec variables locales surchargeables (`--_btn-bg`, `--_card-bg`)
- Mixte : classes custom pour les composants récurrents (btn, card, input, badge, quadrant) + utilitaires Tailwind pour les ajustements ponctuels
- Thèmes via `data-theme` (light par défaut, dark-ready pour post-MVP)
- Structure CSS : `styles/base/` (tokens) → `styles/themes/` → `styles/components/` → `styles/utilities/`

**Decisions Left to Make (next steps):**

| Décision | Options à évaluer |
|---|---|
| Routing | React Router v7 (recommandé — 4 routes, léger) |
| Testing | Vitest 4.1 + React Testing Library + Playwright (e2e) |
| Linting/Formatting | ESLint flat config + Prettier |
| State management | À définir |
| Drag & drop | dnd-kit (`@dnd-kit/react` 0.3.2) |
| CI/CD | GitHub Actions |

**Versions Verified (March 2026):**

| Package | Version | Vérifié |
|---|---|---|
| Vite | 8.0.0 | ✅ npm, mars 2026 |
| React | 19.2.4 | ✅ npm, janvier 2026 |
| Tailwind CSS | 4.1 | ✅ OKLCH natif, @theme directive |
| Vitest | 4.1.0 | ✅ npm, mars 2026 |
| @dnd-kit/react | 0.3.2 | ✅ npm, février 2026 |
| React Router | v7 | ✅ stable |

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
1. State management : Zustand 5.0 avec middleware persist
2. Routing : React Router 7.13
3. Styling : Tailwind CSS 4.1 + design system DaisyUI-like
4. Data validation : Zod 4.3
5. Drag & drop : dnd-kit (@dnd-kit/react 0.3.2)
6. Animations : Motion 12.37 (ex Framer Motion)

**Important Decisions (Shape Architecture):**
7. Machine à états questionnaire : useReducer custom
8. Testing : Vitest 4.1 + React Testing Library + Playwright
9. CI/CD : GitHub Actions
10. Hosting : Self-hosted sur VPS via Coolify v4

**Deferred Decisions (Post-MVP):**
- Authentication : Supabase Auth (phase 2)
- Base de données : Supabase PostgreSQL (phase 2)
- API layer : Supabase client SDK (phase 2)
- Dark mode : Tokens prêts, implémentation différée

### Frontend Architecture

#### State Management — Zustand 5.0.12

| Attribut | Valeur |
|---|---|
| Choix | Zustand avec middleware `persist` |
| Version | 5.0.12 |
| Rationale | API plus simple que useContext, zéro Provider, re-renders sélectifs (critique pour drag & drop 60fps sur 40 tâches), middleware `persist` pour localStorage natif, migration Supabase facilitée par remplacement du middleware |
| Alternative écartée | useContext + useReducer — verbose, re-renders globaux, sync localStorage manuelle |
| Alternative écartée | Redux Toolkit — overkill (~12KB), boilerplate excessif pour la taille du projet |
| Affects | Tous les composants, persistance, migration phase 2 |

**Structure des stores prévue :**
- `useTaskStore` — tâches (CRUD, quadrants, métadonnées)
- `useFlowStore` — état du questionnaire de tri (éphémère, pas persisté)
- `useUIStore` — état UI (overlay ouvert, quadrant actif Focus, onboarding flags)
- `useAnalyticsStore` — métriques (timer, compteurs, micro-survey)

#### Routing — React Router 7.13.1

| Attribut | Valeur |
|---|---|
| Choix | React Router v7 (library mode) |
| Version | 7.13.1 |
| Rationale | 4 routes seulement (Vrac, Réserve, Focus, Archive), léger (~20KB), standard industrie, import unifié depuis `react-router` |
| Alternative écartée | TanStack Router — type-safety poussée mais overkill pour 4 routes (+45KB) |
| Affects | Navigation, structure des pages |

#### Machine à états questionnaire — useReducer custom

| Attribut | Valeur |
|---|---|
| Choix | useReducer custom dans le FlowStore |
| Rationale | Complexité modérée (4 flux × 2-4 questions), retour arrière = navigation dans un tableau de réponses, abandon = reset state. Zéro dépendance supplémentaire. |
| Alternative écartée | XState — puissant mais courbe d'apprentissage non justifiée pour 4 flux courts |
| Affects | Overlay de tri (SCR-02 à SCR-05), overlay de purge (SCR-07 à SCR-09) |
| Évolution | Migrable vers XState si les flows se complexifient post-MVP |

#### Animation — Motion 12.37.0 (ex Framer Motion)

| Attribut | Valeur |
|---|---|
| Choix | Motion pour toutes les animations et transitions (hors drag & drop) |
| Version | 12.37.0 |
| Rationale | Standard industrie React (30M+ downloads/mois), GPU-accelerated 120fps, support natif `prefers-reduced-motion`, gestures (swipe bottom sheet), layout animations (accordion, swap Focus) |
| Import | `import { motion } from "motion/react"` |

#### Séparation Drag & Drop / Animations

| Responsabilité | Outil | Exemples |
|---|---|---|
| Tout ce qui touche au drag (mécanique + animations drag) | dnd-kit | Zones de drop (headers accordion), contraintes inter/intra-quadrant, sortable lists, sensors, preview pendant le drag, snap-back, drop animation, surbrillance zones de drop |
| Toutes les autres animations | Motion | Slide up/down overlays, fade-out complétion, crossfade swap Focus, accordion expand/collapse, toast undo, onboarding pulse, transitions questionnaire (slide horizontal) |

#### Component Architecture

| Attribut | Valeur |
|---|---|
| Approche | Composants React fonctionnels + hooks custom |
| Styling | Tailwind CSS v4.1 + classes custom DaisyUI-like (`@layer components` + `@apply`) |
| Structure CSS | `styles/base/` → `styles/themes/` → `styles/components/` → `styles/utilities/` |
| Design tokens | OKLCH via `@theme` + `:root`, variables locales surchargeables (`--_btn-bg`) |
| Principe | Logique métier dans les stores/hooks, composants UI purs (présentation seule) |

### Data Architecture

#### Data Validation — Zod 4.3.6

| Attribut | Valeur |
|---|---|
| Choix | Zod pour validation runtime des données localStorage |
| Version | 4.3.6 |
| Rationale | Protection contre corruption localStorage (données éditables par l'utilisateur dans DevTools, bugs de sérialisation). Inférence TypeScript automatique. Signal portfolio fort. |
| Alternative écartée | TypeScript seul — pas de validation runtime, crash silencieux sur données corrompues |
| Affects | Couche de persistance, modèle de tâche, migration Supabase |

#### Data Model

Défini dans le PRD — titre unique côté utilisateur + métadonnées automatiques :

```typescript
// Schéma Zod (source de vérité)
const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  status: z.enum(['inbox', 'backlog', 'active', 'archived']),
  quadrant: z.enum(['q1', 'q2', 'q3', 'q4']).nullable(),
  created_at: z.string().datetime(),
  classified_at: z.string().datetime().nullable(),
  completed_at: z.string().datetime().nullable(),
  flow_duration_ms: z.number().nullable(),
  source_flux: z.enum(['flux1', 'flux2', 'flux3', 'flux4', 'manual']).nullable(),
  classification_method: z.enum(['assisted', 'manual']).nullable(),
  user_override: z.boolean().nullable(),
  position: z.number(), // ordre dans le quadrant
})
```

#### Persistence Strategy

- MVP : Zustand `persist` middleware → localStorage (clé `izh-tasks`)
- Phase 2 : Remplacement du middleware persist par un middleware Supabase custom — le reste du code ne change pas
- Validation Zod à chaque lecture localStorage (protection corruption)

### Infrastructure & Deployment

#### Hosting — Self-hosted VPS + Coolify v4

| Attribut | Valeur |
|---|---|
| Choix | Self-hosted sur VPS personnel via Coolify |
| Version | Coolify v4 |
| Rationale | Contrôle total, pas de vendor lock-in, SSL automatique (Let's Encrypt), déploiement Git intégré, signal d'autonomie DevOps en entretien |
| Alternative écartée | Vercel — plus simple mais moins de contrôle, dépendance plateforme |
| Affects | Pipeline de déploiement, configuration DNS, SSL |

#### CI/CD — GitHub Actions

| Attribut | Valeur |
|---|---|
| Choix | GitHub Actions |
| Pipeline | lint → type-check → test (Vitest) → build → deploy (webhook Coolify) |
| Rationale | Standard industrie, gratuit pour repos publics, intégration native GitHub |

#### Testing — Vitest 4.1 + RTL + Playwright

| Attribut | Valeur |
|---|---|
| Unit tests | Vitest 4.1.0 — logique métier (stores, hooks, flows questionnaire) |
| Component tests | React Testing Library — composants UI |
| E2E tests | Playwright — flows utilisateur critiques (brain dump → tri → backlog → matrice) |
| Rationale | Vitest natif Vite (10-20x plus rapide que Jest), RTL = standard React, Playwright = standard e2e 2026 |

### Decision Impact Analysis

**Implementation Sequence:**
1. Vite 8 + React 19 + TypeScript (starter)
2. Tailwind CSS v4 + design tokens OKLCH
3. React Router v7 (4 routes)
4. Zustand + persist middleware + Zod schemas
5. Motion setup + design system DaisyUI-like
6. dnd-kit setup
7. Vitest + RTL setup
8. GitHub Actions pipeline
9. Coolify deployment config

**Cross-Component Dependencies:**
- Zustand persist dépend de Zod (validation à la lecture)
- Les composants UI dépendent des design tokens Tailwind
- Le questionnaire (useReducer) vit dans le FlowStore Zustand (état éphémère)
- Le drag & drop (dnd-kit) interagit avec le TaskStore pour les mutations
- Motion anime les transitions UI (overlays, complétion, swap) indépendamment de dnd-kit
- Le tracking analytique observe les mutations du TaskStore

**Versions Verified (March 2026):**

| Package | Version | Date vérification |
|---|---|---|
| Vite | 8.0.0 | mars 2026 |
| React | 19.2.4 | janvier 2026 |
| Tailwind CSS | 4.1 | 2025 |
| Zustand | 5.0.12 | mars 2026 |
| React Router | 7.13.1 | mars 2026 |
| Zod | 4.3.6 | février 2026 |
| Motion | 12.37.0 | mars 2026 |
| Vitest | 4.1.0 | mars 2026 |
| @dnd-kit/react | 0.3.2 | février 2026 |
| Coolify | v4 | mars 2026 |

## Implementation Patterns & Consistency Rules

### Naming Patterns

#### Code Naming Conventions

| Élément | Convention | Exemple |
|---|---|---|
| Composants React | PascalCase | `TaskItem`, `QuadrantSection` |
| Fichiers composants | PascalCase.tsx | `TaskItem.tsx`, `OverlayShell.tsx` |
| Hooks custom | camelCase, préfixe `use` | `useTaskStore.ts`, `useFlowReducer.ts` |
| Fonctions/variables | camelCase | `addTask`, `flowDuration` |
| Constantes | UPPER_SNAKE_CASE | `MAX_BACKLOG_SIZE = 40`, `UNDO_DELAY_MS = 5000` |
| Types/Interfaces | PascalCase, préfixe libre | `Task`, `QuadrantType`, `FlowState` |
| Fichiers utilitaires | camelCase.ts | `formatDate.ts`, `validateTask.ts` |
| Fichiers CSS composants | kebab-case.css | `button.css`, `quadrant-section.css` |
| Tokens CSS | `--{catégorie}-{propriété}-{modificateur}` | `--color-surface-base`, `--space-stack-md` |
| Classes CSS custom | kebab-case | `.btn-primary`, `.task-item`, `.quadrant-q1` |

### Structure Patterns

#### Project Organization

| Élément | Convention | Détail |
|---|---|---|
| Tests | Co-localisés | `TaskItem.test.tsx` à côté de `TaskItem.tsx` |
| Composants | Par feature | `features/inbox/`, `features/reserve/`, `features/focus/`, `features/archive/` |
| Composants partagés | Dossier `shared/` | Composants réutilisés entre features (OverlayShell, Toast, EmptyState) |
| Stores Zustand | `stores/` | À la racine de `src/` |
| Schemas Zod | `schemas/` | À la racine de `src/` |
| Design system CSS | `styles/` | Sous-dossiers : `base/`, `themes/`, `components/`, `utilities/` |
| Assets | `assets/` | Icônes Lucide importées via package, pas de fichiers statiques |

### Format Patterns

#### Data Conventions

| Élément | Convention | Exemple |
|---|---|---|
| IDs | UUID v4 (string) | `crypto.randomUUID()` |
| Dates | ISO 8601 strings | `"2026-03-16T21:30:00.000Z"` |
| JSON keys (localStorage) | camelCase | `createdAt`, `flowDurationMs` |
| Clés localStorage | préfixe `izh-` | `izh-tasks`, `izh-ui`, `izh-analytics` |
| Null vs undefined | `null` pour valeurs absentes en données | `quadrant: null` (pas encore trié) |
| Enums quadrant | lowercase string | `'q1'`, `'q2'`, `'q3'`, `'q4'` |
| Enums statut | lowercase string | `'inbox'`, `'backlog'`, `'active'`, `'archived'` |

### Communication Patterns

#### State Management — Zustand Rules

| Règle | Détail |
|---|---|
| Un store par domaine | `useTaskStore`, `useFlowStore`, `useUIStore`, `useAnalyticsStore` |
| Actions dans le store | Les mutations sont des fonctions définies dans le store, jamais dans les composants |
| Sélecteurs granulaires | `useTaskStore(s => s.inboxTasks)` — jamais `useTaskStore()` (évite les re-renders) |
| Immutabilité | Toujours retourner un nouvel objet/array dans `set()` |
| Timestamps automatiques | `created_at` ajouté dans l'action `addTask`, pas dans le composant |
| Persist sélectif | `useTaskStore` et `useAnalyticsStore` persistés. `useFlowStore` et `useUIStore` éphémères. |

### Process Patterns

#### Component Rules

| Règle | Détail |
|---|---|
| Logique zéro dans les composants | Les composants appellent des actions du store et affichent des données. Pas de `if/else` métier dans le JSX. |
| Props typées | Chaque composant a une interface `Props` explicite |
| Export | `export function TaskItem()` — named exports, pas de default exports (meilleur tree-shaking, refactoring) |
| Un composant par fichier | Sauf pour les sous-composants privés du même module |
| Hooks custom pour la logique | Si un composant a besoin de logique complexe → hook custom à côté |

#### Error Handling

| Règle | Détail |
|---|---|
| Error Boundaries | Un ErrorBoundary global + un par feature (inbox, reserve, focus) |
| localStorage corrompu | Validation Zod à chaque lecture. Si invalide → reset données vides + toast explicatif |
| Abandon mid-flow | Le questionnaire ne persiste RIEN tant que l'utilisateur n'a pas validé. Fermer = état intact. |
| Toast erreur | Ton bienveillant, jamais de message technique. Ex: "Quelque chose n'a pas marché — tes tâches sont intactes." |

#### Accessibility Patterns

| Règle | Détail |
|---|---|
| Focus management | Après ouverture overlay → focus sur le premier élément interactif. Après fermeture → focus revient sur l'élément déclencheur. |
| `aria-live` | Toasts et résultats de tri annoncés via `aria-live="polite"` |
| `prefers-reduced-motion` | Vérifier via Motion. Si activé → pas d'animations, transitions instantanées. |
| Keyboard nav | Tous les éléments interactifs accessibles au clavier. Tab order logique. |

### Enforcement Guidelines

**Tous les agents IA DOIVENT :**
- Suivre les conventions de nommage ci-dessus sans exception
- Placer les tests co-localisés avec leurs fichiers sources
- Utiliser des named exports (pas de default exports)
- Ne jamais mettre de logique métier dans les composants React
- Valider les données avec Zod avant de les utiliser depuis localStorage
- Respecter les patterns d'accessibilité (focus, aria-live, reduced-motion)

**Anti-patterns interdits :**
- `useTaskStore()` sans sélecteur → re-render global
- `export default` → mauvais tree-shaking
- Logique métier dans le JSX (`if (task.quadrant === 'q1' && ...)`)
- Dates en timestamp ou format custom → ISO 8601 uniquement
- Messages d'erreur techniques exposés à l'utilisateur

## Project Structure & Boundaries

### Complete Project Directory Structure

```
izh/
├── .github/
│   └── workflows/
│       └── ci.yml                          # lint → type-check → test → build → deploy
├── .env.example                            # Variables d'environnement documentées
├── .gitignore
├── .prettierrc                             # Config Prettier
├── eslint.config.js                        # ESLint flat config
├── index.html                              # Entry point Vite
├── package.json
├── tsconfig.json                           # TypeScript strict
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── playwright.config.ts                    # Config E2E
├── public/
│   ├── favicon.svg
│   └── manifest.json                       # PWA-ready (post-MVP)
├── e2e/                                    # Tests E2E Playwright (flows cross-features)
│   ├── brain-dump.spec.ts                  # FLOW-01 : capture → inbox
│   ├── tri-assiste.spec.ts                 # FLOW-02 : questionnaire complet
│   ├── tri-manuel.spec.ts                  # FLOW-03 : classement direct
│   ├── backlog-to-focus.spec.ts            # FLOW-04 : activation matrice
│   └── purge.spec.ts                       # FLOW-06 : purge backlog
└── src/
    ├── main.tsx                            # Entry point React
    ├── App.tsx                             # Router + providers
    ├── app.css                             # Point d'entrée CSS (imports Tailwind + styles)
    │
    ├── schemas/                            # Schemas Zod (source de vérité types)
    │   ├── task.ts                         # TaskSchema, Task type
    │   ├── task.test.ts                    # Validation : cas valides, corrompus, edge cases
    │   ├── analytics.ts                    # AnalyticsSchema, micro-survey
    │   └── flow.ts                         # FlowState, QuestionnaireStep
    │
    ├── stores/                             # Zustand stores
    │   ├── useTaskStore.ts                 # CRUD tâches, persist middleware
    │   ├── useTaskStore.test.ts            # CRUD, limites 40, timestamps auto, persist
    │   ├── useFlowStore.ts                 # État questionnaire (éphémère)
    │   ├── useFlowStore.test.ts            # État questionnaire, reset sur abandon
    │   ├── useUIStore.ts                   # Overlay, quadrant actif, onboarding flags
    │   ├── useUIStore.test.ts              # Overlay state, onboarding flags
    │   ├── useAnalyticsStore.ts            # Métriques, timer, persist middleware
    │   └── useAnalyticsStore.test.ts       # Timer, compteurs, micro-survey
    │
    ├── hooks/                              # Hooks custom partagés
    │   ├── useFlowReducer.ts              # useReducer machine à états questionnaire
    │   ├── useFlowReducer.test.ts          # Transitions entre flux, retour arrière
    │   ├── useUndo.ts                      # Mécanisme undo toast 5s
    │   ├── useUndo.test.ts                 # Timer 5s, annulation, expiration
    │   └── useMediaQuery.ts               # Breakpoint detection
    │
    ├── lib/                                # Utilitaires purs (pas de React)
    │   ├── constants.ts                    # MAX_BACKLOG_SIZE, UNDO_DELAY_MS, quadrant labels
    │   ├── questionnaire.ts               # Définition des 4 flux cognitifs
    │   ├── questionnaire.test.ts           # 4 flux × toutes les branches → quadrant correct
    │   ├── persistence.ts                  # Helpers validation Zod + localStorage
    │   ├── persistence.test.ts             # Lecture/écriture, corruption, reset
    │   └── analytics.ts                    # Helpers tracking (timer, timestamps)
    │
    ├── services/                           # Couche API (vide MVP, Supabase phase 2)
    │   └── .gitkeep                        # Auth, CRUD serveur, sync calendrier iront ici
    │
    ├── styles/                             # Design system DaisyUI-like
    │   ├── base/
    │   │   └── index.css                   # Reset + tokens primitifs OKLCH (:root)
    │   ├── themes/
    │   │   └── light.css                   # Tokens sémantiques (dark.css post-MVP)
    │   ├── components/
    │   │   ├── button.css                  # .btn, .btn-primary, .btn-outline
    │   │   ├── input.css                   # .input, .input-error
    │   │   ├── card.css                    # .card, .card-body
    │   │   ├── badge.css                   # .badge, .badge-q1..q4
    │   │   ├── toast.css                   # .toast, .toast-undo
    │   │   ├── overlay.css                 # .overlay-shell, .overlay-backdrop
    │   │   └── nav.css                     # .bottom-nav, .nav-item
    │   └── utilities/
    │       └── index.css                   # Classes utilitaires custom
    │
    ├── shared/                             # Composants partagés entre features
    │   ├── OverlayShell.tsx                # Bottom sheet mobile / modal desktop
    │   ├── OverlayShell.test.tsx           # Ouverture, fermeture, focus trap, keyboard
    │   ├── Toast.tsx                       # Toast undo + toast pédagogique
    │   ├── Toast.test.tsx                  # Affichage, undo callback, auto-dismiss
    │   ├── EmptyState.tsx                  # Messages état vide (variantes par écran)
    │   ├── BottomNav.tsx                   # Navigation 4 items
    │   ├── BottomNav.test.tsx              # Navigation, badge compteur, état actif
    │   ├── SubtitleCounter.tsx             # "[N] à trier", "[N]/40", "[N] en cours"
    │   ├── TaskContextHeader.tsx           # Titre tâche en haut d'overlay
    │   ├── QuadrantButton.tsx              # Bouton quadrant (couleur + label)
    │   ├── QuadrantButton.test.tsx         # 4 variantes couleur, états pressed/disabled
    │   ├── ErrorBoundary.tsx               # Error boundary global
    │   └── Layout.tsx                      # Layout responsive (content max-width 600px)
    │
    ├── features/
    │   ├── inbox/                          # SCR-01 — Vrac
    │   │   ├── InboxPage.tsx
    │   │   ├── InboxPage.test.tsx          # Liste, compteur, empty states
    │   │   ├── CaptureInput.tsx
    │   │   ├── CaptureInput.test.tsx       # Saisie, validation, flux continu, focus
    │   │   ├── TaskItemInbox.tsx
    │   │   └── TaskItemInbox.test.tsx      # Affichage, bouton trier, édition inline
    │   │
    │   ├── sorting/                        # SCR-02 à SCR-05 — Overlay de tri
    │   │   ├── SortingOverlay.tsx
    │   │   ├── SortingOverlay.test.tsx     # Choix assisté/manuel, fermeture sans perte
    │   │   ├── Questionnaire.tsx
    │   │   ├── Questionnaire.test.tsx      # Navigation questions, retour, micro-texte 1x
    │   │   ├── SortConfirmation.tsx
    │   │   ├── SortConfirmation.test.tsx   # Validation, override, alternatives
    │   │   ├── SortResult.tsx
    │   │   └── SortResult.test.tsx         # Tâche suivante, backlog plein, inbox vide
    │   │
    │   ├── reserve/                        # SCR-06 — Réserve (Backlog)
    │   │   ├── ReservePage.tsx
    │   │   ├── ReservePage.test.tsx        # Accordion, compteur capacité, états 35+/40
    │   │   ├── QuadrantSection.tsx
    │   │   ├── QuadrantSection.test.tsx    # Expand/collapse, zone de drop
    │   │   ├── TaskItemBacklog.tsx
    │   │   ├── TaskItemBacklog.test.tsx    # Activer, édition, suppression swipe
    │   │   ├── NudgeBanner.tsx
    │   │   └── SortToggle.tsx
    │   │
    │   ├── purge/                          # SCR-07 à SCR-09 — Overlay de purge
    │   │   ├── PurgeIntro.tsx
    │   │   ├── PurgeQuestionnaire.tsx
    │   │   ├── PurgeQuestionnaire.test.tsx # Flow 2 questions, arrêt partiel, persistance
    │   │   └── PurgeSummary.tsx
    │   │
    │   ├── focus/                          # SCR-10 — Focus (Matrice)
    │   │   ├── FocusPage.tsx
    │   │   ├── FocusPage.test.tsx          # Layout mobile vs desktop, reset Q1
    │   │   ├── ProminentQuadrant.tsx
    │   │   ├── ProminentQuadrant.test.tsx  # Affichage tâches, empty state contextuel
    │   │   ├── NavGrid.tsx
    │   │   ├── NavGrid.test.tsx            # Swap au tap, indicateur actif
    │   │   ├── MatrixGrid.tsx
    │   │   ├── TaskItemMatrix.tsx
    │   │   └── TaskItemMatrix.test.tsx     # Checkbox, complétion, undo
    │   │
    │   ├── archive/                        # SCR-11 — Archive
    │   │   ├── ArchivePage.tsx
    │   │   ├── ArchivePage.test.tsx        # Liste antichrono, badge quadrant, empty
    │   │   └── TaskItemArchive.tsx
    │   │
    │   └── survey/                         # SCR-12 — Micro-survey
    │       ├── MicroSurvey.tsx
    │       └── MicroSurvey.test.tsx        # Slider, dismiss, déclencheurs, fréquence
    │
    └── dnd/                                # Configuration dnd-kit
        ├── DndProvider.tsx
        ├── sensors.ts                      # Config sensors (pointer, keyboard)
        └── strategies.ts                   # Stratégies de tri (vertical list, etc.)
```

### Requirements to Structure Mapping

| Domaine FR | Feature | Fichiers principaux |
|---|---|---|
| FR1-FR4 Capture | `features/inbox/` | CaptureInput, TaskItemInbox |
| FR5-FR8 Inbox | `features/inbox/` | InboxPage |
| FR9-FR14 Tri assisté | `features/sorting/` | SortingOverlay, Questionnaire, SortConfirmation |
| FR15-FR16 Tri manuel | `features/sorting/` | SortingOverlay (branche manuelle) |
| FR17-FR24 Backlog | `features/reserve/` | ReservePage, QuadrantSection |
| FR25-FR30 Matrice | `features/focus/` | FocusPage, ProminentQuadrant, NavGrid |
| FR31-FR37 Purge | `features/purge/` | PurgeIntro, PurgeQuestionnaire, PurgeSummary |
| FR38-FR40 Archive | `features/archive/` | ArchivePage, TaskItemArchive |
| FR41-FR42 Onboarding | `stores/useUIStore` | Flags onboarding dans le store UI |
| FR43-FR47 Analytics | `stores/useAnalyticsStore` + `features/survey/` | MicroSurvey |
| FR48-FR50 Navigation | `shared/BottomNav` + `App.tsx` | Router + nav |

### Architectural Boundaries

**Data Flow :**
```
User Input → Composant UI (présentation pure)
                ↓ appelle action
             Store Zustand (logique métier + mutations)
                ↓ persist middleware
             Zod validation → localStorage
                ↓ sélecteurs
             Composant UI (re-render sélectif)
```

**Component Boundaries :**
- `features/` → chaque feature ne consomme que ses propres composants + `shared/` + `stores/`
- `stores/` → seule couche qui touche localStorage (via persist)
- `schemas/` → source de vérité pour les types TypeScript (inférés de Zod)
- `lib/` → fonctions pures, zéro dépendance React
- `styles/` → design system autonome, zéro dépendance JS
- `dnd/` → configuration dnd-kit isolée, consommée par les features qui ont du drag
- `services/` → couche API isolée (vide MVP, Supabase/calendrier phase 2)

### Future Evolution Readiness

| Évolution | Impact structural | Risque |
|---|---|---|
| Supabase Auth (phase 2a) | Nouveau `features/auth/` + `stores/useAuthStore.ts` + `services/auth.ts` | Aucun |
| Supabase persistance (phase 2a) | Remplacement middleware persist dans stores | Aucun |
| Timeblocking (phase 2b) | Nouveau `features/timeblocking/` + extension TaskSchema | Aucun |
| Sync calendrier (phase 2c) | Nouveau `services/calendar.ts` | Aucun |
| Dark mode | Ajouter `styles/themes/dark.css` | Aucun |
| PWA | Service worker config racine | Aucun |

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
Toutes les technologies vérifiées compatibles entre elles (Vite 8 + React 19 + Zustand 5 + Tailwind 4.1 + Motion 12 + dnd-kit 0.3 + Zod 4 + React Router 7 + Vitest 4.1). Aucun conflit de versions détecté.

**Pattern Consistency:**
Conventions de nommage uniformes cross-domaines. Structure feature-based alignée avec les stores Zustand. Co-location tests cohérente avec Vitest. Séparation logique/UI respectée.

**Structure Alignment:**
L'arbre projet supporte toutes les décisions architecturales. Boundaries claires entre features, stores, schemas, lib, services et styles. Points d'intégration structurés.

### Requirements Coverage Validation ✅

**Functional Requirements:** 50/50 FRs couvertes architecturalement. Chaque domaine FR mappé à une feature spécifique avec fichiers identifiés.

**Non-Functional Requirements:** 21/21 NFRs couvertes. Performance (Vite 8, libs légères), accessibilité (patterns a11y), compatibilité (baseline-widely-available), fiabilité (Zod validation, abandon sans perte, undo 5s).

### Implementation Readiness Validation ✅

**Decision Completeness:** 10 décisions documentées avec versions vérifiées (mars 2026). Rationale et alternatives écartées pour chaque décision.

**Structure Completeness:** Arbre projet complet avec ~60 fichiers identifiés. Tests co-localisés + E2E séparés. Mapping FRs → fichiers exhaustif.

**Pattern Completeness:** Naming, structure, format données, state management, composants, error handling, accessibilité — tous couverts avec exemples et anti-patterns.

### Gap Analysis Results

| Gap | Sévérité | Recommandation |
|---|---|---|
| Pas d'alias d'import `@/` | Moyenne | Configurer dans `tsconfig.json` au setup projet |
| Pas de lazy loading pages | Faible | `React.lazy()` sur les 4 pages — optimisation non bloquante |
| Pas de linter CSS | Faible | Stylelint optionnel post-MVP |

Aucun gap critique bloquant l'implémentation.

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Contexte projet analysé en profondeur
- [x] Complexité et échelle évaluées
- [x] Contraintes techniques identifiées
- [x] Préoccupations transversales mappées
- [x] 4 priorités architecturales utilisateur (scalable, maintenable, testable, standards)

**✅ Architectural Decisions**
- [x] 10 décisions critiques/importantes avec versions vérifiées
- [x] Stack technologique complet
- [x] Séparation drag (dnd-kit) / animations (Motion)
- [x] Persistance abstraite (migration Supabase prête)
- [x] Machine à états questionnaire (useReducer)

**✅ Implementation Patterns**
- [x] Conventions de nommage (code, CSS, données)
- [x] Patterns de structure (feature-based, co-location tests)
- [x] Patterns Zustand (sélecteurs, actions, persist)
- [x] Patterns d'erreur et d'accessibilité
- [x] Anti-patterns interdits

**✅ Project Structure**
- [x] Arbre projet complet
- [x] Tests co-localisés + E2E séparés
- [x] Boundaries claires
- [x] Mapping FRs → fichiers
- [x] Préparation phase 2 (services/, thèmes, schemas extensibles)

### Architecture Readiness Assessment

**Overall Status:** PRÊT POUR L'IMPLÉMENTATION

**Confidence Level:** Élevé

**Key Strengths:**
- Stack 100% vérifié et compatible (mars 2026)
- Couverture complète des 50 FRs et 21 NFRs
- Persistance abstraite — migration Supabase sans réécriture
- Structure évolutive pour les phases 2 et 3
- Patterns clairs pour l'implémentation par agents IA
- Séparation nette logique métier / composants UI / design system

**Areas for Future Enhancement:**
- Alias d'import `@/` (à configurer au setup)
- Lazy loading des pages
- Stylelint
- Storybook pour le design system (optionnel)

### Implementation Handoff

**AI Agent Guidelines:**
- Suivre toutes les décisions architecturales exactement comme documentées
- Utiliser les patterns d'implémentation de manière consistante
- Respecter la structure projet et les boundaries
- Référer à ce document pour toute question architecturale

**First Implementation Priority:**
```bash
npm create vite@latest izh -- --template react-swc-ts
```
Suivi de : Tailwind CSS v4 → React Router v7 → Zustand + persist + Zod → Design tokens OKLCH → Motion + dnd-kit → Vitest + RTL → GitHub Actions → Coolify
