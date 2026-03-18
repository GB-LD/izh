---
stepsCompleted: [1, 2, 3, 4]
status: "complete"
completedAt: "2026-03-16"
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "IZH UX /03-architecture-information-flows.md"
  - "IZH UX /04a-wireframe-architecture.md"
  - "IZH UX /04b-wireframe-semantic.md"
  - "IZH UX /05-design-tokens-systeme-visuel.md"
  - "IZH UX /06-specifications-composants.md"
---

# izh planning - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for izh planning, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: L'utilisateur peut saisir une tâche en entrant un titre dans un champ texte
- FR2: L'utilisateur peut enchaîner la saisie de plusieurs tâches en flux continu sans quitter l'écran
- FR3: L'utilisateur peut capturer une tâche uniquement depuis l'écran Vrac (inbox)
- FR4: L'utilisateur peut modifier le titre d'une tâche existante
- FR5: L'utilisateur peut voir la liste de toutes ses tâches non triées
- FR6: L'utilisateur peut voir le nombre de tâches à trier
- FR7: L'utilisateur peut lancer le tri d'une tâche depuis l'inbox
- FR8: L'utilisateur peut stocker un nombre illimité de tâches dans l'inbox
- FR9: L'utilisateur peut classifier une tâche via un questionnaire guidé qui aboutit à un quadrant Eisenhower
- FR10: Le système propose une question d'aiguillage initiale orientant vers l'un des 4 flux cognitifs
- FR11: Le système pose 2-4 questions par flux et aboutit toujours à un quadrant — pas de cul-de-sac
- FR12: L'utilisateur peut revenir à la question précédente pendant le questionnaire
- FR13: L'utilisateur peut voir le quadrant proposé par le questionnaire et le valider ou le corriger
- FR14: L'utilisateur peut abandonner le questionnaire à tout moment sans perte de données
- FR15: L'utilisateur peut classifier une tâche en choisissant directement un quadrant sans passer par le questionnaire
- FR16: L'utilisateur peut choisir entre tri assisté et tri manuel pour chaque tâche
- FR17: L'utilisateur peut voir ses tâches classées organisées par quadrant
- FR18: L'utilisateur peut voir le nombre total de tâches dans le backlog et la capacité restante
- FR19: L'utilisateur peut reclasser une tâche d'un quadrant à un autre dans le backlog
- FR20: L'utilisateur peut réordonner les tâches au sein d'un quadrant
- FR21: L'utilisateur peut activer une tâche du backlog vers la matrice
- FR22: Le système empêche l'ajout de tâches au backlog au-delà de la limite de 40
- FR23: L'utilisateur peut supprimer une tâche du backlog
- FR24: L'utilisateur peut choisir l'ordre de tri d'un quadrant (date ou manuel)
- FR25: L'utilisateur peut voir ses tâches activées organisées par quadrant avec un maximum de 4 par quadrant
- FR26: L'utilisateur peut marquer une tâche comme complétée depuis la matrice
- FR27: L'utilisateur peut remettre une tâche de la matrice dans le backlog (même quadrant)
- FR28: Le système empêche le reclassement entre quadrants dans la matrice et affiche un feedback pédagogique
- FR29: L'utilisateur peut annuler une complétion pendant un délai court après l'action
- FR30: Le système empêche l'activation d'une tâche si le quadrant cible dans la matrice est plein (4/4)
- FR31: L'utilisateur peut lancer une purge assistée qui présente les tâches les plus anciennes
- FR32: Le système propose un questionnaire de purge (existence puis reclassement) pour chaque tâche
- FR33: L'utilisateur peut supprimer ou reclasser une tâche pendant la purge
- FR34: L'utilisateur peut arrêter la purge à tout moment avec persistance des changements effectués
- FR35: Le système affiche un bilan récapitulatif après la purge
- FR36: Le système suggère une purge à l'approche de la limite de capacité du backlog
- FR37: L'utilisateur peut lancer une purge manuelle à tout moment
- FR38: L'utilisateur peut voir la liste de ses tâches complétées en ordre antichronologique
- FR39: L'utilisateur peut voir le quadrant d'origine de chaque tâche archivée
- FR40: L'utilisateur peut voir le nombre total de tâches complétées
- FR41: Le système guide l'utilisateur à travers la première boucle complète (capture → tri → backlog → matrice) sans tutoriel explicite
- FR42: Le système met en surbrillance les éléments interactifs lors du premier usage
- FR43: Le système enregistre automatiquement les timestamps de création, classification et complétion de chaque tâche
- FR44: Le système mesure la durée du flow de tri pour chaque tâche
- FR45: Le système enregistre la méthode de classification utilisée (assisté vs manuel) et le flux source
- FR46: L'utilisateur peut donner un score de légèreté mentale via un micro-survey non bloquant
- FR47: Le système enregistre le taux de correction (override) des propositions du questionnaire
- FR48: L'utilisateur peut naviguer entre les 4 écrans principaux (Vrac, Réserve, Focus, Archive)
- FR49: Le système persiste toutes les données localement entre les sessions
- FR50: L'utilisateur peut utiliser l'application sur mobile, tablette et desktop avec une expérience adaptée

### NonFunctional Requirements

- NFR1: First Contentful Paint <1.5s sur mobile 4G
- NFR2: Time to Interactive <2s
- NFR3: Bundle size (gzipped) <200KB
- NFR4: Animations 60fps constant
- NFR5: Opérations localStorage <50ms
- NFR6: Transition entre écrans <100ms
- NFR7: Standard WCAG 2.1 niveau AA
- NFR8: Contraste texte primaire ≥4.5:1 (AA)
- NFR9: Zones tactiles ≥44×44px
- NFR10: Focus ring toujours visible, jamais supprimé
- NFR11: Couleur seule jamais seul vecteur d'information
- NFR12: `prefers-reduced-motion` respecté
- NFR13: Taille texte minimum ≥11px
- NFR14: Chrome (mobile + desktop) support complet
- NFR15: Safari (mobile + desktop) support complet
- NFR16: Firefox, Edge support standard
- NFR17: Viewport minimum 320px largeur
- NFR18: Responsive breakpoints — Mobile (<768px), Tablette (768-1279px), Desktop (≥1280px)
- NFR19: Persistance données — zéro perte de données entre sessions
- NFR20: Tolérance à l'abandon — aucune donnée partielle en cas de fermeture mid-flow
- NFR21: Undo — fenêtre de 5 secondes pour annuler complétion/suppression

### Additional Requirements

- Starter template Vite 8 + React 19 (`npm create vite@latest izh -- --template react-swc-ts`) — première story d'implémentation
- CI/CD GitHub Actions : pipeline lint → type-check → test → build → deploy (webhook Coolify)
- Hosting self-hosted VPS + Coolify v4 avec SSL automatique (Let's Encrypt)
- 4 stores Zustand : useTaskStore (persist), useFlowStore (éphémère), useUIStore (éphémère), useAnalyticsStore (persist)
- Validation Zod à chaque lecture localStorage — si invalide, reset données vides + toast bienveillant
- Error Boundaries : un global + un par feature (inbox, reserve, focus)
- Alias d'import `@/` à configurer dans tsconfig.json au setup projet
- Structure feature-based avec co-location des tests (`TaskItem.test.tsx` à côté de `TaskItem.tsx`)
- Séparation drag (dnd-kit) / animations (Motion) — pas de chevauchement
- Machine à états questionnaire : useReducer custom dans FlowStore
- Schemas Zod comme source de vérité pour les types TypeScript (inférés de Zod)
- Couche services/ vide au MVP, préparée pour Supabase phase 2
- ESLint flat config + Prettier
- Playwright pour les tests E2E dans `e2e/` à la racine

### UX Design Requirements

- UX-DR1: Implémentation complète des design tokens OKLCH (primitifs + sémantiques) : palette neutres chauds "Warm Stone" (11 niveaux), bleu accent (9 niveaux), couleurs quadrants (rouge Q1, vert Q2, orange Q3, jaune Q4), tokens sémantiques surfaces/textes/actions/bordures/quadrants/feedback
- UX-DR2: Système typographique 2 polices : Space Grotesk (titres H1/H2) + Inter (corps/labels/captions) avec échelle 5 niveaux (11px-34px), graisses 400/500/700, tracking négatif sur titres
- UX-DR3: Tokens d'espacement base 4px : échelle primitive (4-64px), tokens sémantiques component (sm/md/lg), inline (xs/sm/md), stack (sm/md/lg/xl), marges page mobile 16px / desktop 64px
- UX-DR4: Tokens border radius : sm 4px (badges), md 8px défaut (cards/inputs/boutons), lg 12px (modales), xl 16px (containers), full 9999px (pills)
- UX-DR5: Tokens ombres : cards flat par défaut, shadow-xs au hover, shadow-sm toasts, shadow-md modales, shadow-lg bottom sheets. Opacités 7-16%.
- UX-DR6: Composant Button (C-01) : 6 variantes (primary, secondary, outline, text, icon-only, danger), 3 tailles (sm 36px, md 44px, lg 52px), 6 états (default, hover, focus-visible, active, loading, disabled), modificateurs block/icon-only/icon-left
- UX-DR7: Composant CaptureInput (C-02) : champ 44px sticky au-dessus de la liste, icône + placeholder, auto-focus 1er lancement, validation Enter → champ vidé → focus maintenu, clear ✕ optionnel
- UX-DR8: Composant Card/TaskItem (C-03) : 4 variantes — inbox (titre + bouton trier), backlog (titre + bouton activer + drag handle), matrix (checkbox + titre), archive (titre + badge quadrant + date). Édition inline long press/double-clic.
- UX-DR9: Composant BottomNav (C-05) : navigation segmentée 4 items (Vrac/Réserve/Focus/Archive), icônes Lucide, badge compteur sur Vrac, indicateur actif pill, hauteur 52px, masqué sous les overlays
- UX-DR10: Composant Toast (C-06) : toast undo 5s avec countdown visuel + bouton Annuler, toast pédagogique sans action, position bottom au-dessus de la nav, auto-dismiss
- UX-DR11: Composant EmptyState (C-07) : 5 variantes contextuelles — 1er lancement Vrac (champ auto-focus), Vrac triée (lien Réserve), Réserve vide (lien Vrac), Focus vide (lien Réserve), Archive vide
- UX-DR12: Composants questionnaire : QuadrantButton (C-08, grille 2×2 outline), QuadrantBadge (C-09a, badge couleur dans cards), ResultCard (C-09b, résultat proéminent), AnswerOption (C-10, boutons pleine largeur), QuestionCard (C-11, question centrée + titre tâche ancrage), ProgressDots (C-12, dots discrets)
- UX-DR13: Composants Réserve : ReserveSection accordion strict (C-14, un seul ouvert Q1 défaut, headers collapsed = zones de drop), CounterCapacity (C-15, [N]/40 avec alerte visuelle 35+ et rouge 40/40), NudgeBanner (dismissable), SortToggle (date/manuel)
- UX-DR14: Composants Focus mobile : MatrixProminentZone (C-16, ~50% hauteur, label complet + liste max 4 tâches), MatrixNavCard (C-17, mini-cards grille 2×2 permanente avec label + compteur + indicateur actif, tap = swap crossfade 200ms). Focus desktop : MatrixQuadrant (C-17b, grille 2×2 symétrique 4 zones égales)
- UX-DR15: Système d'overlay unifié OverlayShell : bottom sheet ~75% mobile avec handle + fond assombri fort + bottom nav masquée / modal centrée ~480px desktop avec backdrop. Variante micro-survey ~30%. Fermeture swipe down ou ✕, focus trap, transitions 300ms ease-out
- UX-DR16: Animations Motion : slide up/down overlays 300ms, fade-out complétion, crossfade swap Focus 200ms, accordion expand/collapse 200ms, toast auto-dismiss, onboarding pulse léger, transitions questionnaire slide horizontal. Respect prefers-reduced-motion.
- UX-DR17: Layout responsive 3 breakpoints : mobile (<768px) pleine largeur + bottom nav + layout asymétrique Focus, tablette (768-1279px) pleine largeur + grille 2×2 Focus, desktop (≥1280px) contenu centré max-width 600px + sidebar nav gauche + grille 2×2 Focus

### FR Coverage Map

- FR1: Epic 2 — Saisie titre tâche
- FR2: Epic 2 — Flux continu de saisie
- FR3: Epic 2 — Capture depuis Vrac uniquement
- FR4: Epic 2 — Édition titre existant
- FR5: Epic 2 — Liste tâches non triées
- FR6: Epic 2 — Compteur tâches à trier
- FR7: Epic 3 — Lancement tri depuis inbox
- FR8: Epic 2 — Inbox illimitée
- FR9: Epic 3 — Questionnaire guidé → quadrant
- FR10: Epic 3 — Question d'aiguillage initiale
- FR11: Epic 3 — 2-4 questions par flux, pas de cul-de-sac
- FR12: Epic 3 — Retour question précédente
- FR13: Epic 3 — Validation/correction quadrant proposé
- FR14: Epic 3 — Abandon questionnaire sans perte
- FR15: Epic 3 — Tri manuel direct
- FR16: Epic 3 — Choix assisté vs manuel
- FR17: Epic 4 — Tâches classées par quadrant
- FR18: Epic 4 — Compteur total + capacité restante
- FR19: Epic 4 — Reclassement drag inter-quadrant
- FR20: Epic 4 — Réordonnancement intra-quadrant
- FR21: Epic 4 — Activation tâche vers matrice
- FR22: Epic 4 — Limite 40 tâches backlog
- FR23: Epic 4 — Suppression tâche backlog
- FR24: Epic 4 — Toggle tri date/manuel
- FR25: Epic 5 — Matrice max 4/quadrant
- FR26: Epic 5 — Complétion depuis matrice
- FR27: Epic 5 — Remettre tâche à la Réserve
- FR28: Epic 5 — Feedback pédagogique drag inter-quadrant
- FR29: Epic 5 — Undo complétion 5s
- FR30: Epic 5 — Blocage activation si quadrant plein
- FR31: Epic 7 — Purge assistée tâches anciennes
- FR32: Epic 7 — Questionnaire purge (existence + reclassement)
- FR33: Epic 7 — Supprimer/reclasser pendant purge
- FR34: Epic 7 — Arrêt purge avec persistance
- FR35: Epic 7 — Bilan récapitulatif purge
- FR36: Epic 7 — Suggestion purge à 35+
- FR37: Epic 7 — Purge manuelle à tout moment
- FR38: Epic 6 — Liste antichronologique complétées
- FR39: Epic 6 — Badge quadrant d'origine
- FR40: Epic 6 — Compteur total complétées
- FR41: Epic 8 — Guide première boucle complète
- FR42: Epic 8 — Surbrillance éléments interactifs 1er usage
- FR43: Epic 8 — Timestamps automatiques (création, classification, complétion)
- FR44: Epic 8 — Timer durée flow de tri
- FR45: Epic 8 — Enregistrement méthode classification + flux source
- FR46: Epic 8 — Micro-survey légèreté mentale
- FR47: Epic 8 — Taux de correction (override)
- FR48: Epic 1 — Navigation 4 écrans
- FR49: Epic 1 — Persistance localStorage
- FR50: Epic 1 — Responsive mobile/tablette/desktop

## Epic List

### Epic 1: App Shell, Design System & Persistance

L'utilisateur peut naviguer entre les 4 écrans (Vrac, Réserve, Focus, Archive) avec l'identité visuelle izh et ses données sont persistées entre les sessions.
**FRs couvertes:** FR48, FR49, FR50
**UX-DRs:** UX-DR1, UX-DR2, UX-DR3, UX-DR4, UX-DR5, UX-DR9, UX-DR15 (shell), UX-DR17
**Additional:** Starter Vite 8, Tailwind CSS v4, React Router v7, Zustand stores + persist, Zod schemas, ErrorBoundary global, ESLint + Prettier, alias @/, Layout responsive

### Epic 2: Brain Dump — Capture des tâches

L'utilisateur peut décharger ses tâches rapidement en flux continu depuis le Vrac, voir sa liste et modifier ses titres.
**FRs couvertes:** FR1, FR2, FR3, FR4, FR5, FR6, FR8
**UX-DRs:** UX-DR7, UX-DR8 (variante inbox), UX-DR11 (variantes Vrac)

### Epic 3: Tri — Classification guidée et manuelle

L'utilisateur peut classifier chaque tâche via le questionnaire cognitif (4 flux) ou par choix direct d'un quadrant, avec possibilité de corriger ou d'abandonner sans perte.
**FRs couvertes:** FR7, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16
**UX-DRs:** UX-DR12, UX-DR15 (overlay tri), UX-DR16 (transitions questionnaire)

### Epic 4: Réserve — Organisation du backlog

L'utilisateur peut voir ses tâches classées par quadrant en accordion, les reclasser par drag & drop, les réordonner, les activer vers le Focus, et gérer la limite de 40.
**FRs couvertes:** FR17, FR18, FR19, FR20, FR21, FR22, FR23, FR24
**UX-DRs:** UX-DR8 (variante backlog), UX-DR13, UX-DR16 (accordion)

### Epic 5: Focus — Passage à l'action

L'utilisateur peut voir ses tâches activées dans la matrice (max 4/quadrant), les compléter avec undo 5s, les remettre à la Réserve, et recevoir un feedback pédagogique si drag inter-quadrant.
**FRs couvertes:** FR25, FR26, FR27, FR28, FR29, FR30
**UX-DRs:** UX-DR8 (variante matrix), UX-DR10, UX-DR14, UX-DR16 (animations complétion/swap)

### Epic 6: Archive — Historique des accomplissements

L'utilisateur peut voir la liste de ses tâches complétées en antichronologique avec le badge quadrant d'origine et le compteur total.
**FRs couvertes:** FR38, FR39, FR40
**UX-DRs:** UX-DR8 (variante archive), UX-DR11 (variante Archive)

### Epic 7: Purge — Maintenance du backlog

L'utilisateur peut lancer une purge assistée (tâches les plus anciennes) ou manuelle, supprimer/reclasser, arrêter à tout moment, et voir le bilan récapitulatif.
**FRs couvertes:** FR31, FR32, FR33, FR34, FR35, FR36, FR37
**UX-DRs:** UX-DR15 (overlay purge), UX-DR16 (transitions purge)

### Epic 8: Onboarding, Analytics & Micro-survey

L'utilisateur est guidé lors du premier usage (surbrillances, animations), le système track les métriques clés, et l'utilisateur peut donner un score de légèreté mentale.
**FRs couvertes:** FR41, FR42, FR43, FR44, FR45, FR46, FR47
**UX-DRs:** UX-DR16 (onboarding pulse)
**Additional:** CI/CD GitHub Actions, Coolify deployment, Playwright E2E setup

---

## Epic 1: App Shell, Design System & Persistance

L'utilisateur peut naviguer entre les 4 écrans (Vrac, Réserve, Focus, Archive) avec l'identité visuelle izh et ses données sont persistées entre les sessions.

### Story 1.1: Initialisation du projet et outils de développement

As a developer,
I want to initialize the project with Vite 8, React 19, TypeScript strict, ESLint, Prettier, and the project folder structure,
So that I have a solid, standards-compliant foundation to build izh upon.

**Acceptance Criteria:**

**Given** aucun projet n'existe
**When** le projet est initialisé avec `npm create vite@latest izh -- --template react-swc-ts`
**Then** le projet compile sans erreur avec `npm run build`
**And** TypeScript est configuré en mode strict
**And** l'alias d'import `@/` pointe vers `src/` et fonctionne dans les imports
**And** ESLint flat config est configuré avec les règles React/TypeScript
**And** Prettier est configuré et cohérent avec ESLint
**And** Vitest est installé et `npm run test` exécute les tests
**And** la structure de dossiers suit l'architecture : `src/schemas/`, `src/stores/`, `src/hooks/`, `src/lib/`, `src/services/`, `src/styles/`, `src/shared/`, `src/features/` (inbox, sorting, reserve, purge, focus, archive, survey), `src/dnd/`, `e2e/`
**And** les fichiers `.gitkeep` sont placés dans les dossiers vides
**And** le fichier `src/lib/constants.ts` contient les constantes de base (`MAX_BACKLOG_SIZE = 40`, `MAX_FOCUS_PER_QUADRANT = 4`, `UNDO_DELAY_MS = 5000`)

### Story 1.2: Design System — Tokens CSS et fondations visuelles

As a user,
I want the app to have a calm, warm visual identity,
So that I feel welcomed and not overwhelmed when I open izh.

**Acceptance Criteria:**

**Given** le projet est initialisé (Story 1.1)
**When** les fichiers CSS du design system sont créés
**Then** `styles/base/index.css` contient tous les tokens primitifs OKLCH : neutres chauds (11 niveaux), bleu accent (9 niveaux), couleurs quadrants (rouge Q1, vert Q2, orange Q3, jaune Q4)
**And** `styles/themes/light.css` contient tous les tokens sémantiques : surfaces, textes, actions, bordures, quadrants, feedback
**And** les tokens typographiques sont définis : Space Grotesk (titres) + Inter (corps), 5 niveaux (xs 11px, sm 13px, base 15px, lg 20px, xl 34px), graisses 400/500/700
**And** les tokens d'espacement base 4px sont définis : primitifs (4-64px) + sémantiques (component, inline, stack, page)
**And** les tokens border radius sont définis : sm 4px, md 8px, lg 12px, xl 16px, full 9999px
**And** les tokens d'ombres sont définis : none, xs, sm, md, lg + sémantiques (card, button-hover, dropdown, modal, toast)
**And** les tokens de transition sont définis : durées (instant, fast 120ms, normal 200ms, slow 300ms, slower 500ms) + courbes (default, in, out, spring)
**And** Tailwind CSS v4 est configuré avec `@theme` utilisant les tokens OKLCH
**And** Google Fonts (Space Grotesk + Inter) sont chargées
**And** `src/app.css` importe Tailwind + tous les fichiers styles dans le bon ordre

### Story 1.3: Composant Button et classes CSS composants

As a user,
I want buttons to be clear, consistent, and easy to tap,
So that I always know what action I'm about to take.

**Acceptance Criteria:**

**Given** le design system est en place (Story 1.2)
**When** le composant Button et les classes CSS sont créés
**Then** `styles/components/button.css` définit les classes `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-text`, `.btn-icon-only`, `.btn-danger` avec variables locales surchargeables (`--_btn-bg`, `--_btn-color`, etc.)
**And** `src/shared/Button.tsx` est un composant React avec interface Props typée : `variant`, `size`, `block`, `iconOnly`, `disabled`, `loading`, `onClick`, `children`, `ariaLabel`
**And** les 3 tailles sont implémentées : sm (36px, zone tactile 44px min), md (44px), lg (52px)
**And** les 6 états sont implémentés : default, hover, focus-visible (ring 2px accent + 2px offset), active (scale 0.97), loading (spinner + opacity 0.7 + aria-busy), disabled (opacity 0.4 + aria-disabled + cursor not-allowed)
**And** le modificateur `block` rend le bouton pleine largeur
**And** l'état `icon-only` a un padding carré symétrique et exige `ariaLabel`
**And** les transitions utilisent `var(--transition-hover)` (120ms)
**And** le composant utilise `<button>` natif, jamais `<div role="button">`
**And** le composant est exporté en named export : `export function Button()`
**And** un fichier `Button.test.tsx` valide les variantes, tailles, états et l'accessibilité

### Story 1.4: Navigation et layout responsive

As a user,
I want to navigate between the 4 screens of izh with a clear navigation,
So that I always know where I am and can switch screens in one tap.

**Acceptance Criteria:**

**Given** le design system et le Button sont en place (Stories 1.2, 1.3)
**When** le routing et la navigation sont implémentés
**Then** React Router v7 est configuré en mode library avec 4 routes : `/` (Vrac), `/reserve` (Réserve), `/focus` (Focus), `/archive` (Archive)
**And** chaque route affiche une page placeholder avec le titre H1 correspondant
**And** `src/shared/BottomNav.tsx` affiche 4 items (Vrac, Réserve, Focus, Archive) avec icônes Lucide
**And** l'item actif a un indicateur visuel pill avec `--shadow-nav-pill`
**And** le badge compteur est affiché sur Vrac (valeur dynamique depuis useTaskStore)
**And** `styles/components/nav.css` définit `.bottom-nav` et `.nav-item` avec hauteur 52px
**And** `src/shared/Layout.tsx` implémente le layout responsive : mobile pleine largeur + bottom nav, desktop contenu centré max-width 600px + sidebar nav gauche
**And** les 3 breakpoints sont respectés : mobile (<768px), tablette (768-1279px), desktop (≥1280px)
**And** la bottom nav respecte `env(safe-area-inset-bottom)` sur iOS
**And** les zones tactiles de la nav sont ≥44×44px
**And** la transition entre écrans est <100ms (SPA, pas de rechargement)
**And** `BottomNav.test.tsx` valide la navigation, le badge compteur et l'état actif

### Story 1.5: Data layer — Schemas Zod et stores Zustand

As a user,
I want my data to persist between sessions and be protected against corruption,
So that I never lose my tasks when I close and reopen the app.

**Acceptance Criteria:**

**Given** le projet est initialisé (Story 1.1)
**When** les schemas Zod et les stores Zustand sont créés
**Then** `src/schemas/task.ts` définit le TaskSchema Zod avec tous les champs : id (UUID), title (string min 1), status (inbox/backlog/active/archived), quadrant (q1/q2/q3/q4 nullable), created_at (datetime ISO), classified_at (datetime nullable), completed_at (datetime nullable), flow_duration_ms (number nullable), source_flux (flux1-4/manual nullable), classification_method (assisted/manual nullable), user_override (boolean nullable), position (number)
**And** le type `Task` est inféré du schema Zod (`z.infer<typeof TaskSchema>`)
**And** `src/schemas/flow.ts` définit le FlowState schema (éphémère)
**And** `src/schemas/analytics.ts` définit le AnalyticsSchema (micro-survey, compteurs)
**And** `src/stores/useTaskStore.ts` implémente le store avec persist middleware, clé `izh-tasks`, actions CRUD (addTask, updateTask, deleteTask, classifyTask, activateTask, completeTask, undoComplete), sélecteurs granulaires (inboxTasks, backlogTasks, activeTasks, archivedTasks, backlogCount, quadrantTasks)
**And** les timestamps sont ajoutés automatiquement dans les actions (created_at dans addTask, classified_at dans classifyTask, completed_at dans completeTask)
**And** `src/stores/useFlowStore.ts` est éphémère (pas de persist) avec l'état du questionnaire
**And** `src/stores/useUIStore.ts` est éphémère avec l'état UI (overlay ouvert, quadrant actif Focus, onboarding flags)
**And** `src/stores/useAnalyticsStore.ts` utilise persist middleware avec clé `izh-analytics`
**And** `src/lib/persistence.ts` valide les données avec Zod à chaque lecture localStorage — si invalide, reset données vides + log console
**And** `src/shared/ErrorBoundary.tsx` capture les erreurs React et affiche un message bienveillant (jamais de stack trace)
**And** les tests unitaires couvrent : TaskSchema validation (cas valides, corrompus, edge cases), useTaskStore CRUD + timestamps auto + limite 40, persistence validation + reset sur corruption

---

## Epic 2: Brain Dump — Capture des tâches

L'utilisateur peut décharger ses tâches rapidement en flux continu depuis le Vrac, voir sa liste et modifier ses titres.

### Story 2.1: Capture rapide — Saisie de tâches en flux continu

As a user overwhelmed with tasks in my head,
I want to type tasks one after another without any friction,
So that I can dump everything from my mind in under 3 minutes.

**Acceptance Criteria:**

**Given** l'utilisateur est sur l'écran Vrac
**When** il tape un titre dans le champ de saisie et appuie sur Enter
**Then** une tâche est créée avec le titre saisi, status `inbox`, quadrant `null`, et `created_at` automatique (ISO 8601)
**And** le champ est vidé immédiatement après validation
**And** le focus reste sur le champ de saisie (flux continu, pas de blur)
**And** l'ID est un UUID v4 généré via `crypto.randomUUID()`
**And** la tâche apparaît dans la liste en temps réel

**Given** le champ de saisie est vide
**When** l'utilisateur appuie sur Enter
**Then** rien ne se passe (pas de tâche vide créée)

**Given** l'utilisateur tape un titre avec des espaces en début/fin
**When** il valide
**Then** le titre est trimé avant création

**Given** le composant `CaptureInput.tsx` est implémenté
**Then** il est sticky au-dessus de la liste de tâches
**And** il a une hauteur de 44px (finger-friendly)
**And** l'icône `+` (Lucide Plus) est affichée à gauche en `--color-text-tertiary`
**And** le placeholder est "Qu'est-ce qui te trotte dans la tête ?"
**And** le border radius utilise `var(--radius-component)` (8px)
**And** la bordure utilise `var(--color-border-default)`
**And** le focus ring utilise `var(--color-border-focus)` (2px)
**And** `styles/components/input.css` définit `.input` et `.input-capture` avec les tokens
**And** `CaptureInput.test.tsx` valide : saisie, validation Enter, champ vidé, focus maintenu, titre vide rejeté, trim

### Story 2.2: Liste des tâches non triées (InboxPage)

As a user,
I want to see all my unsorted tasks in a clear list with a count,
So that I know how many tasks I need to sort and can scan them quickly.

**Acceptance Criteria:**

**Given** l'utilisateur a des tâches avec status `inbox`
**When** il navigue vers l'écran Vrac
**Then** le header affiche H1 "Vrac" en Space Grotesk Bold 34px
**And** le sous-titre affiche "Note tes tâches en vrac, on les triera après · [N] à trier" avec N = nombre de tâches inbox
**And** le compteur se met à jour en temps réel quand des tâches sont ajoutées ou triées
**And** le header est sticky au scroll
**And** la liste affiche les tâches en ordre antichronologique (plus récentes en haut)

**Given** une tâche est affichée dans la liste
**Then** `TaskItemInbox.tsx` affiche le titre de la tâche à gauche
**And** un bouton "Trier" (variant secondary, taille sm) est affiché à droite de chaque tâche
**And** le bouton "Trier" est visible sans geste supplémentaire (pas de swipe)
**And** chaque item a une zone tactile ≥44px de hauteur

**Given** l'utilisateur scrolle la liste
**Then** le header (H1 + sous-titre) et le CaptureInput restent sticky en haut
**And** la bottom nav reste visible en bas

**And** `src/shared/SubtitleCounter.tsx` est un composant réutilisable acceptant un template de texte et un compteur dynamique
**And** `InboxPage.test.tsx` valide : affichage liste, compteur dynamique, ordre antichronologique, scroll avec header sticky

### Story 2.3: Édition inline du titre d'une tâche

As a user,
I want to edit a task title directly in the list without opening a separate screen,
So that I can fix typos or refine my task description quickly.

**Acceptance Criteria:**

**Given** une tâche est affichée dans la liste du Vrac
**When** l'utilisateur fait un long press (~500ms) sur mobile ou un double-clic sur desktop
**Then** le titre devient un champ de texte éditable avec le contenu actuel sélectionné
**And** le focus est positionné dans le champ

**Given** le titre est en mode édition
**When** l'utilisateur appuie sur Enter ou le champ perd le focus (blur)
**Then** le titre est sauvegardé via l'action `updateTask` du store
**And** le champ repasse en mode lecture

**Given** le titre est en mode édition
**When** l'utilisateur appuie sur Escape
**Then** les modifications sont annulées
**And** le champ repasse en mode lecture avec le titre original

**Given** le titre est en mode édition
**When** l'utilisateur efface tout le texte et valide
**Then** la modification est rejetée (titre vide interdit)
**And** le titre original est restauré

**And** `TaskItemInbox.test.tsx` valide : activation édition (long press + double-clic), sauvegarde Enter/blur, annulation Escape, rejet titre vide

### Story 2.4: Empty States du Vrac

As a new user opening izh for the first time,
I want to be gently guided toward my first action,
So that I know exactly what to do without needing a tutorial.

**Acceptance Criteria:**

**Given** l'utilisateur ouvre le Vrac pour la première fois (aucune tâche)
**When** la page se charge
**Then** un EmptyState "1er lancement" est affiché au centre vertical
**And** le CaptureInput est auto-focusé (le clavier s'ouvre sur mobile)
**And** le message est bienveillant et guide vers la saisie (ex: "Commence par noter ce qui te trotte dans la tête")
**And** aucun tutoriel, slide ou modal n'est affiché

**Given** l'utilisateur a trié toutes ses tâches (inbox vide, mais des tâches existent dans le backlog)
**When** il revient sur le Vrac
**Then** un EmptyState "Vrac triée" est affiché avec un message positif (ex: "Tout est trié !")
**And** un lien "Voir ta Réserve" navigue vers `/reserve`
**And** le CaptureInput reste visible et fonctionnel (l'utilisateur peut toujours ajouter des tâches)

**Given** le composant `EmptyState.tsx`
**Then** il accepte une prop `variant` pour distinguer les différents contextes
**And** il est exporté en named export depuis `src/shared/EmptyState.tsx`
**And** le texte utilise `--color-text-secondary` et le lien utilise `--color-text-accent`
**And** le flag "1er lancement" est géré dans `useUIStore` (onboarding flags)
**And** `EmptyState.test.tsx` valide les 2 variantes Vrac (1er lancement + triée) et le lien de navigation

---

## Epic 3: Tri — Classification guidée et manuelle

L'utilisateur peut classifier chaque tâche via le questionnaire cognitif (4 flux) ou par choix direct d'un quadrant, avec possibilité de corriger ou d'abandonner sans perte.

### Story 3.1: OverlayShell — Système d'overlay unifié

As a user,
I want overlays to feel like a temporary parenthesis above my current screen,
So that I stay focused on the current task without losing context.

**Acceptance Criteria:**

**Given** un overlay doit s'afficher (tri, purge, ou micro-survey)
**When** l'overlay est déclenché
**Then** sur mobile (<768px) : un bottom sheet monte depuis le bas à ~75% de la hauteur écran avec un handle de drag en haut
**And** sur desktop (≥1280px) : une modal centrée de ~480px de large s'affiche avec un backdrop
**And** le backdrop assombrit le fond avec une opacité forte
**And** la bottom nav est masquée sous le backdrop sur mobile
**And** la transition d'entrée utilise slide up 300ms ease-out (mobile) ou fade-in 300ms (desktop)

**Given** l'overlay est ouvert
**When** l'utilisateur swipe down sur le handle (mobile) ou clique sur le backdrop ou ✕
**Then** l'overlay se ferme avec une transition slide down / fade-out 300ms
**And** le focus revient sur l'élément déclencheur (focus management WCAG)
**And** la bottom nav réapparaît

**Given** l'overlay est ouvert
**When** l'utilisateur navigue au clavier
**Then** un focus trap maintient le focus à l'intérieur de l'overlay (Tab ne sort pas)
**And** Escape ferme l'overlay

**Given** le composant `src/shared/OverlayShell.tsx`
**Then** il accepte les props : `isOpen`, `onClose`, `variant` ('flow' ~75% | 'micro' ~30%), `children`
**And** `styles/components/overlay.css` définit `.overlay-shell`, `.overlay-backdrop`, `.overlay-handle`
**And** les ombres utilisent `var(--shadow-modal)` (mobile) ou `var(--shadow-lg)` (desktop)
**And** le border radius utilise `var(--radius-container)` (12px)
**And** `aria-modal="true"` et `role="dialog"` sont présents
**And** `OverlayShell.test.tsx` valide : ouverture, fermeture (swipe/✕/backdrop/Escape), focus trap, retour focus déclencheur

### Story 3.2: Overlay de tri — Choix assisté vs manuel

As a user with an unsorted task,
I want to choose between guided sorting and manual sorting,
So that I can use the method that fits my current state of mind.

**Acceptance Criteria:**

**Given** l'utilisateur clique sur "Trier" sur une tâche dans le Vrac
**When** l'overlay de tri s'ouvre
**Then** le titre de la tâche est affiché en haut de l'overlay comme ancrage contextuel (`TaskContextHeader`)
**And** une grille 2×2 de 4 QuadrantButtons est affichée en style outline : Q1 rouge "Faire maintenant", Q2 vert "Planifier", Q3 orange "Déléguer / expédier", Q4 jaune "Éliminer / reporter"
**And** un bouton "Aide-moi à décider" est affiché en dessous, variant primary, taille md, pleine largeur
**And** le bouton "Aide-moi à décider" est visuellement plus proéminent que les QuadrantButtons (nudge architectural)
**And** un bouton ✕ est affiché en haut à droite pour fermer

**Given** l'utilisateur tape sur un QuadrantButton (tri manuel)
**When** le quadrant est sélectionné
**Then** la tâche est classifiée immédiatement avec `classification_method: 'manual'`, `source_flux: 'manual'`, `user_override: null`
**And** la transition va directement vers l'écran de résultat (Story 3.4)
**And** aucune confirmation n'est demandée (FR15)

**Given** l'utilisateur tape sur "Aide-moi à décider"
**When** le bouton est cliqué
**Then** la transition slide horizontal vers le questionnaire cognitif (Story 3.3)

**Given** l'utilisateur ferme l'overlay (✕ ou swipe down)
**Then** la tâche reste dans le Vrac intacte, aucune donnée n'est enregistrée (FR14)

**And** `src/shared/QuadrantButton.tsx` affiche couleur + label, 4 variantes (q1-q4), états default/pressed/disabled
**And** `src/shared/TaskContextHeader.tsx` affiche le titre de la tâche en ancrage
**And** `src/features/sorting/SortingOverlay.tsx` orchestre le flow complet
**And** `SortingOverlay.test.tsx` valide : ouverture, affichage titre tâche, choix assisté vs manuel, fermeture sans perte
**And** `QuadrantButton.test.tsx` valide : 4 variantes couleur, états pressed/disabled

### Story 3.3: Questionnaire cognitif — Machine à états et navigation

As a user who doesn't know how to prioritize a task,
I want a short emotional questionnaire that guides me to the right Eisenhower quadrant,
So that I can classify my task in under 60 seconds without overthinking.

**Acceptance Criteria:**

**Given** l'utilisateur a choisi "Aide-moi à décider"
**When** le questionnaire démarre
**Then** la question d'aiguillage s'affiche : "Comment tu vis cette tâche en ce moment ?" avec 4 réponses émotionnelles orientant vers les flux 1-4 (FR10)
**And** le titre de la tâche reste visible en ancrage en haut
**And** des ProgressDots (•●•) indiquent la progression (discrets, pas de "Étape 2/4")

**Given** l'utilisateur sélectionne une réponse
**When** il tape sur un AnswerOption
**Then** la question suivante apparaît avec une transition slide horizontal vers la droite (~200ms)
**And** le ProgressDots se met à jour

**Given** l'utilisateur est sur une question après la première
**When** il tape sur "← Retour"
**Then** la question précédente réapparaît avec slide horizontal vers la gauche
**And** la réponse précédemment choisie est visuellement pré-sélectionnée (FR12)
**And** le bouton "← Retour" n'est pas visible sur la question d'aiguillage

**Given** le flux aboutit à un quadrant (2-4 questions selon le flux, FR11)
**When** la dernière réponse est sélectionnée
**Then** la transition va vers l'écran de confirmation (Story 3.4) avec `classification_method: 'assisted'`
**And** le flux source est enregistré (`source_flux: 'flux1'|'flux2'|'flux3'|'flux4'`)
**And** il n'y a jamais de cul-de-sac — chaque branche aboutit à un quadrant

**Given** le Flux 2 aboutit à "pas de priorités définies"
**When** cette réponse est sélectionnée
**Then** redirection fluide vers le Flux 1 (pas de message d'erreur)

**Given** l'utilisateur ferme l'overlay pendant le questionnaire (✕ ou swipe)
**Then** aucune réponse partielle n'est enregistrée (FR14)
**And** la tâche reste dans le Vrac intacte
**And** le FlowStore est reset

**And** `src/hooks/useFlowReducer.ts` implémente la machine à états avec useReducer : actions START, ANSWER, BACK, RESET, états par flux
**And** `src/lib/questionnaire.ts` définit les 4 flux cognitifs : questions, réponses, branchements, quadrant de sortie
**And** `src/features/sorting/Questionnaire.tsx` affiche une question à la fois avec AnswerOptions
**And** `src/shared/AnswerOption.tsx` : boutons pleine largeur empilés, états default/pressed/pré-sélectionné
**And** `src/shared/ProgressDots.tsx` : dots discrets, actif/inactif
**And** `useFlowReducer.test.ts` valide : 4 flux × toutes les branches → quadrant correct, retour arrière, reset, redirection Flux 2 → Flux 1
**And** `questionnaire.test.ts` valide : chaque flux aboutit toujours à un quadrant, pas de cul-de-sac
**And** `Questionnaire.test.tsx` valide : navigation questions, retour, pré-sélection, transition slide

### Story 3.4: Confirmation et résultat de tri

As a user who just answered the questionnaire,
I want to see the proposed quadrant and validate or correct it,
So that I stay in control of the final classification.

**Acceptance Criteria:**

**Given** le questionnaire aboutit à un quadrant (tri assisté)
**When** l'écran de confirmation s'affiche
**Then** le titre de la tâche est en ancrage en haut
**And** le quadrant proposé est affiché de manière proéminente (couleur + label, centré, visuellement dominant)
**And** un bouton "Ça me parle" (primary, pleine largeur) permet de valider
**And** un texte "Pas convaincu·e ?" introduit 3 QuadrantButtons alternatifs (les 3 autres quadrants, pas le proposé)
**And** un compteur discret affiche "4/15 triées" en bas

**Given** l'utilisateur tape sur "Ça me parle"
**When** le quadrant proposé est validé
**Then** la tâche est classifiée avec `user_override: false`
**And** la transition va vers l'écran de résultat

**Given** l'utilisateur tape sur un quadrant alternatif
**When** un autre quadrant est choisi
**Then** la tâche est classifiée avec le quadrant choisi et `user_override: true` (FR13, FR47)
**And** la transition va vers l'écran de résultat

**Given** l'écran de résultat s'affiche (après tri assisté ou manuel)
**When** le résultat est montré
**Then** le quadrant attribué est affiché avec une animation de feedback (scale up + fade in ~300ms)
**And** la tâche passe en status `backlog` avec `classified_at` automatique
**And** un bouton "Tâche suivante →" (primary) est affiché
**And** un lien "Voir la Réserve" (secondary) est affiché en dessous
**And** le compteur de progression est mis à jour

**Given** l'utilisateur tape sur "Tâche suivante →"
**When** il reste des tâches dans le Vrac
**Then** l'overlay reste ouvert et revient à l'écran de choix (Story 3.2) avec le titre de la tâche suivante (enchaînement rapide, pas de fermeture/réouverture)

**Given** l'utilisateur tape sur "Tâche suivante →"
**When** le Vrac est vide
**Then** un message "Tout est trié !" est affiché
**And** seul le lien "Voir la Réserve" est disponible (pas de "Tâche suivante")

**Given** la tâche est classifiée
**When** le backlog a déjà 40 tâches (FR22)
**Then** la tâche reste dans le Vrac (pas de changement de status)
**And** l'écran de résultat affiche "Ta Réserve est pleine — 40/40. Fais de la place pour continuer."
**And** deux options : "Purger" (lien vers purge) + "Revenir au Vrac" (ferme l'overlay)

**Given** l'utilisateur tape sur "Voir la Réserve"
**Then** l'overlay se ferme et la navigation va vers `/reserve`

**And** `src/features/sorting/SortConfirmation.tsx` affiche le quadrant proposé + validation + alternatives
**And** `src/features/sorting/SortResult.tsx` affiche le résultat + actions suivantes
**And** `SortConfirmation.test.tsx` valide : affichage résultat, validation, override, 3 alternatives
**And** `SortResult.test.tsx` valide : tâche suivante (enchaînement), Vrac vide, backlog plein, lien Réserve

---

## Epic 4: Réserve — Organisation du backlog

L'utilisateur peut voir ses tâches classées par quadrant en accordion, les reclasser par drag & drop, les réordonner, les activer vers le Focus, et gérer la limite de 40.

### Story 4.1: ReservePage — Accordion par quadrant et compteur de capacité

As a user who has sorted tasks,
I want to see them organized by Eisenhower quadrant in a clear accordion layout,
So that I can scan my priorities at a glance and know my backlog capacity.

**Acceptance Criteria:**

**Given** l'utilisateur navigue vers l'écran Réserve
**When** la page se charge
**Then** le header affiche H1 "Réserve" en Space Grotesk Bold 34px
**And** le sous-titre affiche "Tes tâches triées attendent ici, active celles que tu veux faire · [N]/40" via `SubtitleCounter`
**And** le compteur [N]/40 se met à jour en temps réel

**Given** des tâches sont classées dans différents quadrants
**When** la page se charge
**Then** 4 sections `QuadrantSection` sont affichées en accordion strict : Q1 (rouge "Faire maintenant"), Q2 (vert "Planifier"), Q3 (orange "Déléguer / expédier"), Q4 (jaune "Éliminer / reporter")
**And** Q1 est ouvert par défaut, Q2/Q3/Q4 sont collapsed
**And** chaque header de section affiche : couleur du quadrant + label + compteur de tâches dans le quadrant
**And** un seul quadrant peut être ouvert à la fois (accordion strict)

**Given** l'utilisateur tape sur un header collapsed
**When** la section s'ouvre
**Then** la section précédemment ouverte se ferme avec une animation expand/collapse 200ms ease-out (Motion)
**And** la section tapée s'ouvre et affiche ses tâches

**Given** l'utilisateur tape sur le header de la section ouverte
**When** la section se ferme
**Then** toutes les sections sont collapsed

**Given** la Réserve est vide (aucune tâche classée)
**When** la page se charge
**Then** un EmptyState "Réserve vide" est affiché : "Trie tes premières tâches depuis le Vrac" + lien vers `/`

**And** `src/features/reserve/ReservePage.tsx` orchestre le layout
**And** `src/features/reserve/QuadrantSection.tsx` implémente le header + liste collapsible
**And** `src/shared/CounterCapacity.tsx` est un composant réutilisable [N]/40 (variante de SubtitleCounter)
**And** `styles/components/card.css` définit `.card`, `.card-body` avec les tokens
**And** `ReservePage.test.tsx` valide : accordion strict, Q1 ouvert par défaut, compteur dynamique, empty state

### Story 4.2: TaskItemBacklog — Affichage, activation et suppression

As a user viewing my sorted tasks,
I want to activate tasks for my Focus matrix or remove irrelevant ones,
So that I can move tasks forward in my workflow or clean up my backlog.

**Acceptance Criteria:**

**Given** une tâche est affichée dans une section ouverte de la Réserve
**When** l'utilisateur la voit
**Then** `TaskItemBacklog.tsx` affiche : titre de la tâche + bouton "Activer" (icône, taille sm) à droite
**And** chaque item a une zone tactile ≥44px de hauteur
**And** l'édition inline du titre fonctionne (long press mobile / double-clic desktop, comme Story 2.3)

**Given** l'utilisateur tape sur le bouton "Activer"
**When** le quadrant correspondant dans le Focus a moins de 4 tâches
**Then** la tâche passe en status `active` et disparaît de la Réserve avec une animation fade-out
**And** un toast "Ajoutée à ton Focus" s'affiche (auto-dismiss)
**And** le compteur de la section et le compteur global se mettent à jour

**Given** l'utilisateur tape sur le bouton "Activer"
**When** le quadrant correspondant dans le Focus a déjà 4 tâches (FR30)
**Then** le bouton est grisé (disabled) avec `aria-disabled="true"`
**And** un message adjacent ou tooltip explique "Focus plein pour ce quadrant (4/4)"

**Given** l'utilisateur veut supprimer une tâche
**When** il swipe à gauche sur la tâche (mobile) ou fait un long press pour le menu contextuel
**Then** un bouton "Supprimer" (variant danger) est révélé
**And** la suppression est confirmée par un toast undo 5s : "Tâche supprimée — [Annuler]" (FR23)

**Given** l'utilisateur tape "Annuler" sur le toast dans les 5 secondes
**When** l'undo est déclenché
**Then** la tâche est restaurée à sa position précédente dans le même quadrant

**And** `src/shared/Toast.tsx` implémente le toast undo avec countdown visuel 5s + bouton Annuler + auto-dismiss
**And** `src/hooks/useUndo.ts` gère le mécanisme d'undo : timer 5s, annulation, expiration
**And** `styles/components/toast.css` définit `.toast`, `.toast-undo` avec position bottom au-dessus de la nav
**And** `TaskItemBacklog.test.tsx` valide : affichage, activation, activation bloquée (4/4), suppression swipe, toast undo
**And** `useUndo.test.ts` valide : timer 5s, annulation dans le délai, expiration après 5s

### Story 4.3: Drag & Drop — Reclassement inter-quadrant et réordonnancement

As a user who wants to reorganize tasks,
I want to drag tasks between quadrants or reorder them within a quadrant,
So that I can reclassify or reprioritize without friction.

**Acceptance Criteria:**

**Given** le setup dnd-kit est en place
**When** le module `src/dnd/` est configuré
**Then** `DndProvider.tsx` encapsule le contexte dnd-kit pour la Réserve
**And** `sensors.ts` configure les sensors pointer (desktop) et touch (mobile) avec delay d'activation (~200ms pour distinguer tap vs drag)
**And** `strategies.ts` configure la stratégie de tri vertical pour les listes

**Given** l'utilisateur long press puis drag une tâche dans la section ouverte
**When** il la déplace verticalement dans le même quadrant (FR20)
**Then** les autres tâches se réorganisent visuellement en temps réel (sortable)
**And** au drop, la nouvelle position est sauvegardée via le champ `position` du TaskSchema
**And** l'animation de snap utilise ease-spring (dnd-kit)

**Given** l'utilisateur drag une tâche vers un header de quadrant collapsed (FR19)
**When** le drag passe au-dessus d'un header collapsed
**Then** le header s'illumine avec la couleur du quadrant cible (surbrillance zone de drop)
**And** au drop, la tâche est reclassée dans le nouveau quadrant
**And** un toast "Déplacée vers [label quadrant]" confirme le reclassement
**And** le `quadrant` de la tâche est mis à jour dans le store

**Given** l'utilisateur drag une tâche
**When** il la relâche en dehors d'une zone de drop valide
**Then** la tâche revient à sa position d'origine avec une animation snap-back (ease-spring)

**Given** l'utilisateur veut choisir l'ordre de tri d'un quadrant (FR24)
**When** il interagit avec le SortToggle
**Then** un toggle discret "Par date" / "Manuel" est disponible par quadrant
**And** "Manuel" est le défaut
**And** "Par date" trie par `classified_at` antichronologique

**And** `src/features/reserve/SortToggle.tsx` implémente le toggle date/manuel
**And** `QuadrantSection.test.tsx` valide : zone de drop, surbrillance, reclassement
**And** les tests dnd-kit valident : drag intra-quadrant, drag inter-quadrant, snap-back, sort toggle

### Story 4.4: Gestion de capacité — Nudge et blocage

As a user approaching the backlog limit,
I want to be gently reminded to clean up my backlog,
So that I maintain a healthy task list without being blocked unexpectedly.

**Acceptance Criteria:**

**Given** le backlog contient 35 tâches ou plus (mais moins de 40)
**When** l'utilisateur est sur la Réserve
**Then** un `NudgeBanner` est affiché au-dessus des sections : "[N]/40 — ton backlog se remplit !" avec un lien "Faire du tri" vers la purge
**And** le banner est dismissable (bouton ✕)
**And** le ton est bienveillant, jamais punitif
**And** le compteur dans le sous-titre change visuellement (couleur d'alerte)

**Given** le backlog atteint 40/40
**When** l'utilisateur est sur la Réserve
**Then** le compteur [40/40] s'affiche en rouge (`--color-feedback-error`)
**And** le NudgeBanner affiche "Ta Réserve est pleine" avec un lien prioritaire vers la purge

**Given** le backlog est à 40/40
**When** l'utilisateur trie une tâche depuis le Vrac (Epic 3)
**Then** la classification aboutit mais la tâche reste dans le Vrac (FR22)
**And** l'écran de résultat affiche le message "Réserve pleine" (déjà géré dans Story 3.4)

**Given** un bouton "Faire du tri" est visible en permanence dans la Réserve (FR37)
**When** l'utilisateur tape dessus
**Then** l'overlay de purge s'ouvre (Epic 7 — placeholder pour l'instant, fonctionnel à l'Epic 7)

**And** `src/features/reserve/NudgeBanner.tsx` implémente le banner avec variantes nudge (35+) et blocage (40/40)
**And** les seuils sont définis dans `constants.ts` : `NUDGE_THRESHOLD = 35`
**And** `NudgeBanner.test.tsx` valide : apparition à 35+, message 40/40, dismissable, lien purge

---

## Epic 5: Focus — Passage à l'action

L'utilisateur peut voir ses tâches activées dans la matrice (max 4/quadrant), les compléter avec undo 5s, les remettre à la Réserve, et recevoir un feedback pédagogique si drag inter-quadrant.

### Story 5.1: FocusPage mobile — Layout asymétrique et swap

As a mobile user ready to act,
I want to see one priority quadrant prominently with an overview of all four,
So that I immediately know what to do next without scrolling or navigating.

**Acceptance Criteria:**

**Given** l'utilisateur navigue vers l'écran Focus sur mobile (<768px)
**When** la page se charge
**Then** le header affiche H1 "Focus" + sous-titre "Tes tâches du moment, max 4 par priorité · [N] en cours" (N = total tâches activées)
**And** la zone proéminente (`ProminentQuadrant`) occupe ~50% de la hauteur utile
**And** Q1 "Faire maintenant" est le quadrant proéminent par défaut
**And** la zone proéminente affiche : couleur + label complet + compteur + liste de max 4 tâches avec titres complets

**Given** la grille de navigation est affichée sous la zone proéminente
**When** l'utilisateur la voit
**Then** `NavGrid` affiche 4 mini-cards en grille 2×2 : Q1 (haut-gauche), Q2 (haut-droite), Q3 (bas-gauche), Q4 (bas-droite)
**And** chaque mini-card affiche : couleur + label complet + compteur "N/4"
**And** le quadrant actuellement proéminent a un indicateur actif visuel
**And** les positions des mini-cards sont fixes (ne changent jamais)

**Given** l'utilisateur tape sur une mini-card
**When** le swap est déclenché
**Then** le contenu de la zone proéminente change avec une animation crossfade ~200ms (Motion)
**And** l'indicateur actif se déplace vers la mini-card tapée
**And** les positions des mini-cards ne bougent pas (seul le contenu proéminent change)

**Given** l'utilisateur quitte le Focus puis y revient (navigation bottom nav)
**When** la page se recharge
**Then** Q1 est de nouveau le quadrant proéminent (reset à chaque entrée, pas de mémorisation)

**Given** aucune tâche n'est activée (Focus global vide)
**When** la page se charge
**Then** un EmptyState "Focus vide" est affiché : "Active des tâches depuis ta Réserve" + lien vers `/reserve`

**Given** le quadrant proéminent est vide mais d'autres ont des tâches
**When** l'utilisateur voit la zone proéminente
**Then** un message contextuel est affiché dans la zone : "Aucune tâche ici — tape sur un quadrant pour voir les autres"
**And** les mini-cards avec des tâches ont leur compteur visible

**And** `src/features/focus/FocusPage.tsx` orchestre le layout mobile/desktop
**And** `src/features/focus/ProminentQuadrant.tsx` affiche le quadrant actif en grand
**And** `src/features/focus/NavGrid.tsx` affiche la grille 2×2 de navigation
**And** `FocusPage.test.tsx` valide : layout mobile, Q1 par défaut, reset à l'entrée, empty states
**And** `NavGrid.test.tsx` valide : swap au tap, indicateur actif, positions fixes

### Story 5.2: FocusPage desktop — Grille 2×2 symétrique

As a desktop user,
I want to see all four quadrants at once in a balanced grid,
So that I have a complete overview of my active tasks.

**Acceptance Criteria:**

**Given** l'utilisateur navigue vers le Focus sur desktop (≥1280px) ou tablette (768-1279px)
**When** la page se charge
**Then** `MatrixGrid` affiche 4 zones égales en grille 2×2 : Q1 (haut-gauche), Q2 (haut-droite), Q3 (bas-gauche), Q4 (bas-droite)
**And** chaque zone affiche : couleur + label + compteur + max 4 tâches
**And** pas de scroll dans les zones (max 4 tâches = contenu limité)
**And** pas de hiérarchie de taille entre les quadrants (4 zones égales)

**Given** un quadrant est vide dans la grille desktop
**When** l'utilisateur le voit
**Then** la zone est visuellement atténuée (grisée) avec le label lisible
**And** un message contextuel discret indique l'absence de tâches

**Given** le header et le sous-titre
**Then** ils sont identiques à la version mobile (H1 "Focus" + compteur total)
**And** la sidebar nav gauche est affichée (pas de bottom nav)

**And** `src/features/focus/MatrixGrid.tsx` implémente la grille 2×2 desktop
**And** `MatrixGrid` n'est rendu que sur tablette/desktop, `ProminentQuadrant` + `NavGrid` uniquement sur mobile
**And** `MatrixGrid.test.tsx` valide : grille 2×2, 4 zones égales, empty states par quadrant

### Story 5.3: TaskItemMatrix — Complétion et undo

As a user acting on my tasks,
I want to check off completed tasks with a satisfying animation and the ability to undo,
So that I feel progress and am protected against accidental taps.

**Acceptance Criteria:**

**Given** une tâche est affichée dans le Focus (zone proéminente mobile ou grille desktop)
**When** l'utilisateur la voit
**Then** `TaskItemMatrix.tsx` affiche : checkbox à gauche + titre à droite
**And** la zone tactile de la checkbox est ≥44×44px
**And** l'édition inline du titre fonctionne (long press / double-clic)

**Given** l'utilisateur coche la checkbox (FR26)
**When** la complétion est déclenchée
**Then** la tâche fait un fade-out + scale-down (~300ms, Motion)
**And** le status passe à `archived` avec `completed_at` automatique (ISO 8601)
**And** un toast undo s'affiche : "Tâche complétée — [Annuler]" avec countdown visuel 5s (FR29)
**And** le compteur du quadrant et le compteur total se mettent à jour
**And** `aria-live="polite"` annonce le résultat

**Given** l'utilisateur tape "Annuler" sur le toast dans les 5 secondes
**When** l'undo est déclenché
**Then** la tâche est restaurée en status `active` dans le même quadrant à sa position précédente
**And** `completed_at` est remis à `null`
**And** la tâche réapparaît avec une animation fade-in

**Given** les 5 secondes expirent sans undo
**When** le timer se termine
**Then** le toast disparaît et la complétion est définitive
**And** la tâche est visible dans l'Archive

**Given** une tâche nouvellement activée depuis la Réserve
**When** elle apparaît dans le Focus
**Then** un highlight temporaire (2-3s) la distingue visuellement

**And** `TaskItemMatrix.test.tsx` valide : affichage checkbox + titre, complétion avec animation, toast undo, restauration, expiration timer, highlight post-activation

### Story 5.4: Remettre à la Réserve et feedback pédagogique

As a user who changed their mind about an active task,
I want to send it back to the backlog, and be taught why I can't reclassify in the Focus,
So that I understand the Focus is for action, not reorganization.

**Acceptance Criteria:**

**Given** une tâche est dans le Focus
**When** l'utilisateur veut la remettre à la Réserve (FR27)
**Then** un mécanisme de renvoi est disponible (bouton ou menu contextuel)
**And** la tâche repasse en status `backlog` dans le même quadrant
**And** un toast confirme "Remise dans ta Réserve"
**And** la tâche disparaît du Focus avec une animation

**Given** l'utilisateur drag une tâche vers un autre quadrant dans la grille Focus desktop (FR28)
**When** le drag est détecté vers une autre zone de la matrice
**Then** la tâche snap-back à sa position d'origine (animation ease-spring)
**And** un toast pédagogique s'affiche : "Dans le Focus, tu agis. Pour reclasser, remets-la d'abord dans la Réserve."
**And** le toast est de type pédagogique (pas d'action, auto-dismiss)

**Given** l'utilisateur essaie d'activer une tâche depuis la Réserve
**When** le quadrant cible dans le Focus a déjà 4 tâches (FR30)
**Then** l'activation est bloquée (déjà géré dans Story 4.2)

**And** `src/shared/Toast.tsx` supporte la variante pédagogique (sans bouton, auto-dismiss, ton bienveillant)
**And** `TaskItemMatrix.test.tsx` valide : renvoi Réserve, feedback pédagogique drag inter-quadrant, snap-back

---

## Epic 6: Archive — Historique des accomplissements

L'utilisateur peut voir la liste de ses tâches complétées en antichronologique avec le badge quadrant d'origine et le compteur total.

### Story 6.1: ArchivePage — Liste des tâches complétées

As a user who has completed tasks,
I want to see my accomplishments in a simple list,
So that I feel a sense of progress and can remember what I've done.

**Acceptance Criteria:**

**Given** l'utilisateur navigue vers l'écran Archive
**When** la page se charge
**Then** le header affiche H1 "Archive" en Space Grotesk Bold 34px
**And** le sous-titre affiche "Tout ce que tu as accompli · [N] terminées" via `SubtitleCounter` (FR40)
**And** le compteur se met à jour en temps réel

**Given** des tâches complétées existent
**When** la liste s'affiche
**Then** les tâches sont listées en ordre antichronologique (plus récentes en haut) basé sur `completed_at` (FR38)
**And** chaque `TaskItemArchive.tsx` affiche : titre de la tâche + badge couleur du quadrant d'origine (FR39) + date de complétion formatée
**And** le badge utilise les tokens `--color-quadrant-q1` à `--color-quadrant-q4` avec `--radius-badge` (4px)
**And** `styles/components/badge.css` définit `.badge`, `.badge-q1`, `.badge-q2`, `.badge-q3`, `.badge-q4`
**And** la date est affichée en `--font-size-xs` (11px) avec `--color-text-secondary`

**Given** la liste est longue
**When** l'utilisateur scrolle
**Then** le header (H1 + sous-titre) est sticky
**And** la bottom nav reste visible
**And** le scroll est vertical illimité

**Given** l'Archive est en lecture seule
**Then** aucun bouton d'action n'est affiché sur les tâches (pas de réactivation, pas de suppression)
**And** pas de filtre ni de recherche au MVP
**And** pas d'édition de titre

**Given** aucune tâche n'a été complétée
**When** la page se charge
**Then** un EmptyState "Archive vide" est affiché : "Tes tâches complétées apparaîtront ici"
**And** le ton est neutre (pas de pression à compléter des tâches)

**And** `src/features/archive/ArchivePage.tsx` implémente la page
**And** `src/features/archive/TaskItemArchive.tsx` affiche titre + badge + date
**And** `ArchivePage.test.tsx` valide : liste antichronologique, badge quadrant, compteur total, empty state, lecture seule

---

## Epic 7: Purge — Maintenance du backlog

L'utilisateur peut lancer une purge assistée (tâches les plus anciennes) ou manuelle, supprimer/reclasser, arrêter à tout moment, et voir le bilan récapitulatif.

### Story 7.1: PurgeIntro — Déclenchement et écran d'introduction

As a user whose backlog is getting full,
I want a friendly invitation to clean up my oldest tasks,
So that I can make room for new tasks without feeling pressured.

**Acceptance Criteria:**

**Given** l'utilisateur tape sur "Faire du tri" dans la Réserve ou sur le lien du NudgeBanner (FR37)
**When** l'overlay de purge s'ouvre
**Then** l'OverlayShell s'affiche en variante 'flow' (~75%)
**And** une icône 🧹 sobre est affichée
**And** un titre H2 et un sous-texte contextuel sont affichés

**Given** le backlog est entre 35 et 39 tâches (nudge)
**When** l'intro s'affiche
**Then** le titre est "Un peu de tri ?"
**And** le sous-texte est "Ta Réserve a [N] tâches. On regarde ensemble celles qui traînent depuis un moment ?"

**Given** le backlog est à 40/40 (blocage)
**When** l'intro s'affiche
**Then** le titre est "Ta Réserve est pleine"
**And** le sous-texte est "40/40 tâches. Fais de la place pour continuer à trier depuis le Vrac."

**Given** l'intro est affichée
**When** l'utilisateur tape sur "C'est parti" (primary)
**Then** la transition va vers le questionnaire de purge (Story 7.2)

**Given** l'intro est affichée
**When** l'utilisateur tape sur "Pas maintenant" (secondary) ou swipe down
**Then** l'overlay se ferme et l'utilisateur revient à la Réserve

**And** `src/features/purge/PurgeIntro.tsx` implémente les 2 variantes de message
**And** `PurgeIntro.test.tsx` valide : variante nudge (35+), variante blocage (40/40), navigation C'est parti / Pas maintenant

### Story 7.2: PurgeQuestionnaire — Flow de purge en 2 questions

As a user purging my backlog,
I want to quickly decide for each old task whether to keep, reclassify, or delete it,
So that I can clean up efficiently without spending too long on each task.

**Acceptance Criteria:**

**Given** la purge démarre
**When** les tâches sont présentées
**Then** elles sont triées par ancienneté décroissante (plus anciennes d'abord), Q4 en priorité (FR31)
**And** chaque tâche affiche : titre + badge quadrant actuel + ancienneté ("là depuis 3 semaines")
**And** un compteur "3/12 tâches revues" est affiché et mis à jour

**Given** une tâche est présentée (Question 1)
**When** la question "Elle compte toujours ?" s'affiche (FR32)
**Then** deux options : "Oui" et "Non, supprimer"

**Given** l'utilisateur tape "Non, supprimer"
**When** la suppression est confirmée
**Then** la tâche est supprimée immédiatement (FR33)
**And** la tâche suivante est présentée
**And** le compteur se met à jour

**Given** l'utilisateur tape "Oui" (Question 2)
**When** la question "Au bon endroit ?" s'affiche
**Then** le quadrant actuel est pré-sélectionné visuellement
**And** 3 QuadrantButtons alternatifs (les 3 autres quadrants) sont affichés
**And** tap sur le quadrant actuel = garder en place → tâche suivante
**And** tap sur un autre quadrant = reclassement → tâche suivante (FR33)

**Given** l'utilisateur veut arrêter la purge en cours (FR34)
**When** il tape sur "Arrêter la purge" (toujours visible)
**Then** tous les changements déjà effectués sont persistés (suppressions + reclassements)
**And** l'overlay se ferme et l'utilisateur revient à la Réserve mise à jour
**And** pas de bilan affiché (arrêt anticipé)

**Given** toutes les tâches candidates ont été revues
**When** la dernière tâche est traitée
**Then** la transition va vers le bilan récapitulatif (Story 7.3)

**Given** aucune tâche n'est candidate à la purge (Réserve récente ou vide)
**When** la purge est lancée
**Then** un message "Ta Réserve est bien rangée" est affiché + bouton "Retour à la Réserve"

**And** `src/features/purge/PurgeQuestionnaire.tsx` implémente le flow 2 questions
**And** les composants `QuestionCard` et `AnswerOption` de l'Epic 3 sont réutilisés
**And** `PurgeQuestionnaire.test.tsx` valide : ordre ancienneté, suppression Q1, reclassement Q2, arrêt partiel avec persistance, compteur, rien à purger

### Story 7.3: PurgeSummary — Bilan récapitulatif

As a user who just purged their backlog,
I want to see a summary of what I changed,
So that I feel the satisfaction of having cleaned up.

**Acceptance Criteria:**

**Given** toutes les tâches candidates ont été revues
**When** le bilan s'affiche (FR35)
**Then** le titre "Purge terminée" est affiché avec l'icône 🧹
**And** un récap liste les chiffres : N tâches revues, X supprimées, Y reclassées, Z gardées
**And** les chiffres sont visuellement mis en évidence

**Given** le bilan est affiché
**Then** le nouveau total de la Réserve est affiché via `CounterCapacity` : "Réserve : [N]/40"
**And** le ton est satisfait et discret (pas de célébration excessive)

**Given** l'utilisateur tape sur "Retour à la Réserve" (primary)
**When** le bouton est cliqué
**Then** l'overlay se ferme
**And** la Réserve est affichée avec les données mises à jour

**And** `src/features/purge/PurgeSummary.tsx` implémente le bilan
**And** `PurgeSummary.test.tsx` valide : affichage récap (N/X/Y/Z), nouveau total, retour Réserve

---

## Epic 8: Onboarding, Analytics & Micro-survey

L'utilisateur est guidé lors du premier usage (surbrillances, animations), le système track les métriques clés, et l'utilisateur peut donner un score de légèreté mentale.

### Story 8.1: Tracking analytique — Timestamps, timer et méthodes

As a product owner,
I want the app to silently track key usage metrics,
So that I can validate the Lean UX hypothesis with real data.

**Acceptance Criteria:**

**Given** l'utilisateur crée une tâche
**When** `addTask` est appelé dans useTaskStore
**Then** `created_at` est automatiquement ajouté en ISO 8601 (FR43)
**And** cette logique est déjà dans le store (Story 1.5) — cette story vérifie et complète si nécessaire

**Given** l'utilisateur classifie une tâche (tri assisté ou manuel)
**When** `classifyTask` est appelé
**Then** `classified_at` est automatiquement ajouté en ISO 8601 (FR43)
**And** `classification_method` est enregistré : 'assisted' ou 'manual' (FR45)
**And** `source_flux` est enregistré : 'flux1', 'flux2', 'flux3', 'flux4', ou 'manual' (FR45)
**And** `user_override` est enregistré : `true` si l'utilisateur a corrigé le quadrant proposé, `false` sinon, `null` si tri manuel (FR47)

**Given** l'utilisateur lance un tri assisté
**When** l'overlay de tri s'ouvre (SortingOverlay)
**Then** un timer démarre dans useAnalyticsStore
**And** `flow_duration_ms` est calculé à la fin du tri (validation ou override) et sauvegardé sur la tâche (FR44)
**And** le timer est annulé si l'utilisateur abandonne le questionnaire

**Given** l'utilisateur complète une tâche
**When** `completeTask` est appelé
**Then** `completed_at` est automatiquement ajouté en ISO 8601 (FR43)

**Given** les données analytiques
**Then** elles sont persistées via useAnalyticsStore (persist middleware, clé `izh-analytics`)
**And** les métriques agrégées sont calculables : taux d'override par flux, temps moyen de tri, ratio assisté/manuel

**And** `src/lib/analytics.ts` contient les helpers : `startFlowTimer()`, `stopFlowTimer()`, `calculateOverrideRate()`
**And** les tests valident : timestamps auto sur chaque action, timer start/stop/cancel, enregistrement méthode + flux + override

### Story 8.2: Onboarding par l'usage — Surbrillances et guidage

As a new user,
I want to be gently guided through my first complete loop without a tutorial,
So that I learn the app by using it naturally.

**Acceptance Criteria:**

**Given** l'utilisateur ouvre izh pour la première fois
**When** le Vrac se charge
**Then** le CaptureInput est auto-focusé (déjà géré Story 2.4)
**And** un flag `onboarding_capture_done` est mis à `false` dans useUIStore

**Given** l'utilisateur a ajouté sa première tâche et reste inactif 5s
**When** le timer d'inactivité expire (FR42)
**Then** le bouton "Trier" de la première tâche reçoit une surbrillance visuelle (pulse léger via Motion)
**And** la surbrillance disparaît si l'utilisateur tape dans le CaptureInput ou clique sur "Trier"
**And** le flag `onboarding_sort_nudge_shown` passe à `true`

**Given** l'utilisateur ouvre l'overlay de tri pour la première fois
**When** le bouton "Aide-moi à décider" est affiché (FR42)
**Then** le bouton a un pulse léger (animation Motion, ~2s loop)
**And** le pulse disparaît après le 1er clic sur le bouton
**And** le flag `onboarding_assisted_pulse_shown` passe à `true`

**Given** l'utilisateur entre dans le questionnaire pour la première fois (FR41)
**When** la première question s'affiche
**Then** un micro-texte "Réponds à l'instinct — il n'y a pas de mauvaise réponse." est affiché au-dessus de la question
**And** le micro-texte n'apparaît qu'une seule fois (flag `onboarding_micro_text_shown` dans useUIStore persisté via localStorage)

**Given** tous les flags d'onboarding
**Then** ils sont stockés dans useUIStore avec persistance localStorage (clé `izh-ui`)
**And** chaque surbrillance/animation est désactivée si `prefers-reduced-motion` est activé (NFR12)

**And** `useUIStore` est étendu avec les flags onboarding
**And** les animations onboarding utilisent Motion avec `prefers-reduced-motion` check
**And** les tests valident : pulse bouton Trier après 5s, pulse Aide-moi à décider 1er tri, micro-texte unique, respect reduced-motion

### Story 8.3: Micro-survey — Score de légèreté mentale

As a user who just completed a sorting session,
I want to rate how light I feel about my tasks,
So that the app can track whether it's actually helping me feel clearer.

**Acceptance Criteria:**

**Given** l'utilisateur complète son premier tri complet (toutes les tâches inbox triées)
**When** la complétion est détectée
**Then** un micro-survey s'affiche via OverlayShell variante 'micro' (~30%) après un court délai (~1s)
**And** le déclencheur est one-time pour le premier tri (FR46)

**Given** l'utilisateur a déjà fait le premier tri
**When** il complète une tâche depuis le Focus
**Then** le micro-survey peut se déclencher maximum 1x par semaine (7 jours depuis le dernier)
**And** il ne se déclenche jamais au lancement de l'app, ni pendant un tri ou une purge

**Given** le micro-survey est affiché
**When** l'utilisateur le voit
**Then** la question "Comment tu te sens par rapport à tes tâches en ce moment ?" est affichée
**And** un slider continu 1-10 est affiché avec émojis aux extrêmes : 😫 (1) et 😌 (10)
**And** pas de labels intermédiaires
**And** un bouton "Envoyer" (primary) est affiché sous le slider

**Given** l'utilisateur déplace le slider et tape "Envoyer"
**When** la soumission est déclenchée
**Then** `mental_lightness_score` (1-10), `survey_timestamp` (ISO 8601) et `survey_context` (post-first-sort | weekly) sont enregistrés dans useAnalyticsStore
**And** le bottom sheet disparaît
**And** pas de confirmation ni de remerciement (discret)

**Given** l'utilisateur dismiss le micro-survey (swipe down ou ✕)
**When** le dismiss est détecté
**Then** aucune donnée n'est enregistrée
**And** le survey revient dans 7 jours (pas de relance immédiate)

**And** `src/features/survey/MicroSurvey.tsx` implémente le survey
**And** `src/features/survey/SurveySlider.tsx` implémente le slider 1-10 avec émojis (C-18)
**And** `MicroSurvey.test.tsx` valide : déclencheurs (post-1er tri, 1x/semaine), slider, soumission, dismiss, fréquence max

### Story 8.4: CI/CD et déploiement

As a developer,
I want an automated pipeline that tests, builds, and deploys every push,
So that each change is validated and visible in production immediately.

**Acceptance Criteria:**

**Given** le repository GitHub est configuré
**When** un push est fait sur la branche principale
**Then** GitHub Actions exécute le pipeline : lint → type-check → test (Vitest) → build → deploy
**And** chaque étape bloque les suivantes en cas d'échec

**Given** le pipeline passe
**When** le build est terminé
**Then** un webhook déclenche le déploiement sur Coolify v4
**And** l'app est accessible sur l'URL publique avec SSL (Let's Encrypt)

**Given** le fichier `.github/workflows/ci.yml`
**Then** il configure : Node.js ≥20.19, npm ci, les 5 étapes du pipeline
**And** le cache npm est activé pour accélérer les builds

**Given** Playwright est configuré
**When** `playwright.config.ts` est créé
**Then** les tests E2E peuvent être exécutés avec `npm run test:e2e`
**And** le dossier `e2e/` contient les specs de test (vides/placeholder pour l'instant)
**And** Playwright n'est pas exécuté dans le CI au MVP (optionnel, trop lent pour le feedback loop)

**And** les scripts npm sont configurés : `dev`, `build`, `test`, `test:e2e`, `lint`, `type-check`
**And** `.env.example` documente les variables d'environnement nécessaires
