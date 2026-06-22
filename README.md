# izh — iZenHover

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![State: Zustand](https://img.shields.io/badge/State-Zustand-443E38?logo=react&logoColor=white)](https://github.com/pmndrs/zustand)
![Status](https://img.shields.io/badge/status-work%20in%20progress-orange)

A focus & productivity app that turns a messy task list into clear priorities. You capture everything in an **inbox**, a guided **sorting** flow classifies each task into **quadrants** (importance × urgency), and you act on what matters from **focus** / **backlog** — the rest goes to **archive** or **purge**.

Built as a personal project to engineer a modern, accessible, fully-tested front-end the way I'd build production software.

---

## ✨ Features

- **Inbox-to-focus workflow** — capture, sort, prioritize and act, modeled as explicit stages (`inbox → sorting → focus / backlog → archive / purge`).
- **Quadrant prioritization** — tasks are classified into importance/urgency quadrants via a guided questionnaire.
- **Adaptive UI** — a single `OverlayShell` renders as a bottom sheet on mobile and a modal on desktop; navigation switches between a `BottomNav` (mobile) and a `SidebarNav` (desktop).
- **Offline-first persistence** — local state is persisted through a dedicated, tested persistence layer (`lib/persistence.ts`).
- **Resilient by design** — `ErrorBoundary`, typed state, and Zod schema validation at the edges.
- **Accessible** — semantic HTML, keyboard navigation and focus management (targeting WCAG 2.1 AA).

---

## 🏗️ Architecture

A **feature-sliced** front-end with clear, testable boundaries between state, domain logic, UI and styling.

```
┌─────────────────────────────────────────────────────────────┐
│                         FEATURES                            │
│   inbox · sorting · focus · backlog · archive · purge       │
│   survey   — each feature owns its screens & logic          │
└───────────────┬─────────────────────────────────────────────┘
                │ consume
┌───────────────▼───────────────┐   ┌─────────────────────────┐
│            STORES              │   │       SHARED UI         │
│  useFlowStore   (navigation)   │   │  OverlayShell, BottomNav │
│  useTaskStore   (tasks)        │   │  SidebarNav, Layout,     │
│  useUIStore     (overlays/UI)  │   │  Button, AnswerOption,   │
│  useAnalyticsStore (metrics)   │   │  QuadrantBadge/Button,   │
│  → Zustand, each fully tested  │   │  ProgressDots, …         │
└───────────────┬───────────────┘   └─────────────────────────┘
                │ use
┌───────────────▼─────────────────────────────────────────────┐
│                       DOMAIN / LIB                          │
│  persistence.ts  ·  quadrants.ts  ·  questionnaire.ts        │
│  uuid.ts  ·  constants.ts  ·  utils.ts (cn)                  │
│  schemas/ (Zod validation)                                  │
└──────────────────────────────────────────────────────────────┘
```

## 🔎 Highlights for reviewers

### 1. Typed, isolated state with Zustand
Four focused stores (`useFlowStore`, `useTaskStore`, `useUIStore`, `useAnalyticsStore`), each with its own test file. State is split by responsibility instead of one global blob — navigation flow, task data, UI/overlays and analytics evolve independently.

### 2. A real, tested persistence layer
Persistence lives behind a single module (`lib/persistence.ts`) with its own tests (`persistence.test.ts`), so the storage mechanism is an implementation detail the rest of the app doesn't depend on.

### 3. One adaptive overlay primitive
`OverlayShell` is a single component that becomes a **bottom sheet on mobile** and a **modal on desktop** — paired with `BottomNav` / `SidebarNav` for a responsive navigation model, instead of duplicating mobile/desktop trees.

### 4. Domain logic kept out of components
Quadrant classification (`quadrants.ts`) and questionnaire logic (`questionnaire.ts`) live in `lib/` as pure, testable functions, decoupled from React.

### 5. Validation at the boundaries
Zod schemas (`src/schemas`) validate data shapes, so untrusted/persisted data is parsed and typed before it reaches the UI.

---

## 🧪 Testing

Tests are written with **Vitest + React Testing Library + jsdom**, and **colocated** next to the code they cover (`*.test.ts` / `*.test.tsx`) — see stores, `lib/persistence`, and shared components (`BottomNav`, `OverlayShell`, `QuadrantButton`, `SidebarNav`…).

```bash
npm run test           # watch mode
npm run test:run       # single run (CI)
npm run test:coverage  # coverage report
npm run test:ui        # Vitest visual runner
```

**Approach:** unit tests for stores and domain logic, component tests for shared UI, Arrange-Act-Assert, with E2E (`e2e/`) deferred to a later stage.

---

## 🎨 Design system & styling

Tailwind CSS **v4** with a custom, layered stylesheet — no `tailwind.config.js`:

```
src/styles/
├── base/        # design tokens (CSS custom properties, OKLCH color scale)
├── themes/      # theme definitions
├── components/  # component classes (@layer components)
└── utilities/   # custom utilities
```

- **Design tokens** as CSS custom properties (OKLCH for perceptually consistent colors), exposed to Tailwind via `@theme`.
- **Component classes** built with the DaisyUI-style `@layer components` pattern (see ADR-005).
- **`cn()`** (`clsx` + `tailwind-merge`) for safe conditional class composition.
- Type **Inter** + **Space Grotesk** via `@fontsource-variable`.

---

## 🛠️ Tech stack

### Core
| Technology | Version | Role |
|------------|---------|------|
| React | 19 | UI library |
| TypeScript | 5.9 | Strict typing |
| Vite | 7 | Build tool & dev server |
| Tailwind CSS | 4 | Layered design system, OKLCH tokens, `@theme` |
| Zustand | 5 | State management (4 isolated stores) |
| React Router | 7 | Routing |
| Zod | 4 | Schema validation |
| Motion | 12 | Animations |

### Quality & tooling
| Technology | Role |
|------------|------|
| Vitest + @vitest/ui | Unit & component tests with visual runner |
| React Testing Library + jsdom | Behavior-driven DOM testing |
| ESLint + typescript-eslint | TypeScript-aware linting |
| Prettier | Consistent formatting |
| Husky + lint-staged | Pre-commit: related tests + format/lint |

---

## 📂 Project structure

```
src/
├── features/      # inbox · sorting · focus · backlog · archive · purge · survey
├── stores/        # Zustand stores (+ colocated tests)
├── shared/        # reusable UI (Button, OverlayShell, BottomNav, SidebarNav,
│                  #   QuadrantBadge/Button, AnswerOption, ProgressDots,
│                  #   Layout, ErrorBoundary, EmptyState, design-system)
├── lib/           # persistence, quadrants, questionnaire, uuid, constants, utils (cn)
├── schemas/       # Zod schemas
├── hooks/         # custom React hooks
├── styles/        # base · themes · components · utilities
└── App.tsx · main.tsx · index.css

docs/
└── archi-decisions/   # decisions.md · plans.md · project-context.md (ADRs)

e2e/               # end-to-end tests (planned)
```

---

## 🚀 Getting started

```bash
git clone https://github.com/GB-LD/izh.git
cd izh
npm install
npm run dev        # http://localhost:5173
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) + production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (write) |
| `npm run test` / `test:run` / `test:coverage` / `test:ui` | Vitest |

---

## 🧭 What this project demonstrates

| Skill | How it's demonstrated |
|-------|----------------------|
| **Architecture** | Feature-sliced structure, clear boundaries (features / stores / lib / shared / styles) |
| **State management** | Four isolated, individually-tested Zustand stores split by responsibility |
| **TypeScript** | Strict typing end to end, Zod validation at the edges |
| **Testing discipline** | Vitest + Testing Library, tests colocated with code, testing pyramid (ADR-001) |
| **Responsive UX** | One adaptive `OverlayShell` (sheet/modal) + `BottomNav`/`SidebarNav` |
| **Design system** | Tailwind v4 `@theme`, OKLCH design tokens, layered CSS, `cn()` composition |
| **Engineering process** | Documented ADRs, GitHub Flow + squash + Conventional Commits, GitHub Projects (issues/labels) |
| **Separation of concerns** | Domain logic (quadrants, questionnaire) kept pure and out of components |

---

## 👤 Author

**Germain Bouin** — Front-End Developer (React · Vue.js · TypeScript)
[LinkedIn](https://www.linkedin.com/in/germain-bouin-460761251) · [GitHub](https://github.com/GB-LD)
