# izh — Sprint Planning Complet

> Généré le 2026-03-16 | Dev solo : Dolu | Pilotage : Trello Kanban
> 8 epics · 26 stories · ~6 sprints de 2 semaines

---

## Organisation Trello recommandée

### Colonnes Kanban
| Colonne | Usage |
|---------|-------|
| **Backlog** | Toutes les stories non commencées |
| **Sprint N** | Stories sélectionnées pour le sprint courant |
| **En cours** | Story en développement actif (max 1-2) |
| **Review** | Code terminé, à relire/tester |
| **Done** | Story complétée et mergée |

### Labels (couleurs Trello)
| Label | Couleur | Usage |
|-------|---------|-------|
| `Epic 1` | Violet | App Shell, Design System & Persistance |
| `Epic 2` | Bleu | Brain Dump — Capture |
| `Epic 3` | Orange | Tri — Classification |
| `Epic 4` | Vert | Réserve — Backlog |
| `Epic 5` | Rouge | Focus — Matrice |
| `Epic 6` | Jaune | Archive |
| `Epic 7` | Rose | Purge |
| `Epic 8` | Gris | Onboarding, Analytics, CI/CD |
| `infra` | Noir | Setup, CI/CD, tooling |
| `ui` | Turquoise | Composants visuels / design system |
| `data` | Marron | Stores, schemas, persistance |

### Étiquettes de taille (optionnel)
- **S** = ~0.5-1 jour
- **M** = ~1-2 jours
- **L** = ~3-4 jours
- **XL** = ~5+ jours (à découper si possible)

---

## Sprint 1 — Fondations (Semaines 1-2)

**Objectif :** Avoir un squelette d'app navigable avec le design system en place et la couche data fonctionnelle.

### TICKET 1.1 — Initialisation du projet et outils de développement
- **Epic :** Epic 1 · App Shell
- **Labels :** `Epic 1`, `infra`
- **Taille :** M
- **Description :**
  Initialiser le projet avec Vite 8 + React 19 + TypeScript strict + SWC. Configurer ESLint flat config, Prettier, Vitest. Créer la structure de dossiers feature-based complète. Configurer l'alias `@/` → `src/`. Ajouter les constantes de base dans `src/lib/constants.ts`.
- **Checklist :**
  - [ ] `npm create vite@latest izh -- --template react-swc-ts`
  - [ ] TypeScript strict mode activé
  - [ ] Alias `@/` configuré dans tsconfig + vite.config
  - [ ] ESLint flat config + Prettier
  - [ ] Vitest installé et `npm run test` fonctionne
  - [ ] Structure dossiers : `src/schemas/`, `src/stores/`, `src/hooks/`, `src/lib/`, `src/services/`, `src/styles/`, `src/shared/`, `src/features/{inbox,sorting,reserve,purge,focus,archive,survey}`, `src/dnd/`, `e2e/`
  - [ ] `.gitkeep` dans les dossiers vides
  - [ ] `constants.ts` : `MAX_BACKLOG_SIZE = 40`, `MAX_FOCUS_PER_QUADRANT = 4`, `UNDO_DELAY_MS = 5000`
  - [ ] `npm run build` compile sans erreur

---

### TICKET 1.2 — Design System : Tokens CSS et fondations visuelles
- **Epic :** Epic 1 · App Shell
- **Labels :** `Epic 1`, `ui`
- **Taille :** L
- **Dépendance :** 1.1
- **Description :**
  Créer l'intégralité des design tokens OKLCH (primitifs + sémantiques). Configurer Tailwind CSS v4 avec `@theme`. Charger les Google Fonts (Space Grotesk + Inter).
- **Checklist :**
  - [ ] `styles/base/index.css` : tokens primitifs OKLCH — neutres chauds (11 niveaux), bleu accent (9 niveaux), couleurs quadrants (Q1 rouge, Q2 vert, Q3 orange, Q4 jaune)
  - [ ] `styles/themes/light.css` : tokens sémantiques — surfaces, textes, actions, bordures, quadrants, feedback
  - [ ] Tokens typographiques : Space Grotesk (titres) + Inter (corps), 5 niveaux (xs 11px → xl 34px), graisses 400/500/700
  - [ ] Tokens espacement base 4px : primitifs (4-64px) + sémantiques (component, inline, stack, page)
  - [ ] Tokens border radius : sm 4px, md 8px, lg 12px, xl 16px, full 9999px
  - [ ] Tokens ombres : none, xs, sm, md, lg + sémantiques
  - [ ] Tokens transition : durées (instant, fast 120ms, normal 200ms, slow 300ms, slower 500ms) + courbes
  - [ ] Tailwind CSS v4 configuré avec `@theme` utilisant les tokens
  - [ ] Google Fonts chargées
  - [ ] `src/app.css` importe Tailwind + styles dans le bon ordre

---

### TICKET 1.3 — Composant Button et classes CSS composants
- **Epic :** Epic 1 · App Shell
- **Labels :** `Epic 1`, `ui`
- **Taille :** M
- **Dépendance :** 1.2
- **Description :**
  Créer le composant `Button` avec 6 variantes, 3 tailles, 6 états. Classes CSS dans `styles/components/button.css` avec variables locales surchargeables.
- **Checklist :**
  - [ ] `styles/components/button.css` : `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-text`, `.btn-icon-only`, `.btn-danger` avec variables `--_btn-bg`, `--_btn-color`
  - [ ] `src/shared/Button.tsx` : Props typée — variant, size (sm 36px, md 44px, lg 52px), block, iconOnly, disabled, loading, onClick, children, ariaLabel
  - [ ] 6 états : default, hover, focus-visible (ring 2px), active (scale 0.97), loading (spinner + aria-busy), disabled (opacity 0.4 + aria-disabled)
  - [ ] `<button>` natif (jamais `<div role="button">`)
  - [ ] Named export : `export function Button()`
  - [ ] `Button.test.tsx` : variantes, tailles, états, accessibilité

---

### TICKET 1.5 — Data layer : Schemas Zod et stores Zustand
- **Epic :** Epic 1 · App Shell
- **Labels :** `Epic 1`, `data`
- **Taille :** XL
- **Dépendance :** 1.1
- **Description :**
  Créer tous les schemas Zod (source de vérité des types) et les 4 stores Zustand. Implémenter la validation localStorage avec reset sur corruption.
- **Checklist :**
  - [ ] `src/schemas/task.ts` : TaskSchema Zod — id (UUID), title, status (inbox/backlog/active/archived), quadrant (q1-q4 nullable), created_at, classified_at, completed_at, flow_duration_ms, source_flux, classification_method, user_override, position
  - [ ] Type `Task` inféré de Zod (`z.infer<typeof TaskSchema>`)
  - [ ] `src/schemas/flow.ts` : FlowState schema
  - [ ] `src/schemas/analytics.ts` : AnalyticsSchema
  - [ ] `src/stores/useTaskStore.ts` : persist middleware, clé `izh-tasks`, actions CRUD (addTask, updateTask, deleteTask, classifyTask, activateTask, completeTask, undoComplete), sélecteurs granulaires
  - [ ] Timestamps automatiques dans les actions (created_at, classified_at, completed_at)
  - [ ] `src/stores/useFlowStore.ts` : éphémère, état questionnaire
  - [ ] `src/stores/useUIStore.ts` : éphémère, état UI
  - [ ] `src/stores/useAnalyticsStore.ts` : persist, clé `izh-analytics`
  - [ ] `src/lib/persistence.ts` : validation Zod à chaque lecture localStorage — reset si invalide + log console
  - [ ] `src/shared/ErrorBoundary.tsx` : message bienveillant, jamais de stack trace
  - [ ] Tests : TaskSchema validation, useTaskStore CRUD + timestamps + limite 40, persistence validation + reset

---

### TICKET 1.4 — Navigation et layout responsive
- **Epic :** Epic 1 · App Shell
- **Labels :** `Epic 1`, `ui`
- **Taille :** L
- **Dépendance :** 1.2, 1.3, 1.5
- **Description :**
  Configurer React Router v7 (mode library, 4 routes). Créer BottomNav, Layout responsive (mobile bottom nav + desktop sidebar). Pages placeholder.
- **Checklist :**
  - [ ] React Router v7 : 4 routes — `/` (Vrac), `/reserve`, `/focus`, `/archive`
  - [ ] Pages placeholder avec H1 correspondant
  - [ ] `src/shared/BottomNav.tsx` : 4 items avec icônes Lucide, badge compteur sur Vrac (dynamique depuis useTaskStore), indicateur actif pill, hauteur 52px
  - [ ] `styles/components/nav.css` : `.bottom-nav`, `.nav-item`
  - [ ] `src/shared/Layout.tsx` : mobile pleine largeur + bottom nav, desktop contenu centré max-width 600px + sidebar nav gauche
  - [ ] 3 breakpoints : mobile (<768px), tablette (768-1279px), desktop (≥1280px)
  - [ ] `env(safe-area-inset-bottom)` sur iOS
  - [ ] Zones tactiles nav ≥ 44×44px
  - [ ] Transition entre écrans < 100ms
  - [ ] `BottomNav.test.tsx` : navigation, badge, état actif

---

## Sprint 2 — Brain Dump (Semaines 3-4)

**Objectif :** L'utilisateur peut capturer ses tâches en flux continu et voir sa liste inbox.

### TICKET 2.1 — Capture rapide : saisie de tâches en flux continu
- **Epic :** Epic 2 · Brain Dump
- **Labels :** `Epic 2`, `ui`
- **Taille :** M
- **Dépendance :** 1.4, 1.5
- **Description :**
  Créer `CaptureInput` (champ sticky, 44px, icône +, placeholder bienveillant). Saisie Enter → création tâche → champ vidé → focus maintenu. Trim du titre, rejet si vide.
- **Checklist :**
  - [ ] `CaptureInput.tsx` : sticky au-dessus de la liste, 44px, icône Lucide Plus, placeholder "Qu'est-ce qui te trotte dans la tête ?"
  - [ ] `styles/components/input.css` : `.input`, `.input-capture`
  - [ ] Enter → `addTask()` → champ vidé → focus maintenu
  - [ ] ID = `crypto.randomUUID()`, status `inbox`, quadrant `null`, `created_at` auto
  - [ ] Rejet titre vide, trim espaces
  - [ ] `CaptureInput.test.tsx` : saisie, Enter, vidage, focus, rejet vide, trim

---

### TICKET 2.2 — Liste des tâches non triées (InboxPage)
- **Epic :** Epic 2 · Brain Dump
- **Labels :** `Epic 2`, `ui`
- **Taille :** M
- **Dépendance :** 2.1
- **Description :**
  Créer `InboxPage` avec header sticky (H1 "Vrac" + compteur "N à trier"). Liste antichronologique des tâches inbox. `TaskItemInbox` avec titre + bouton "Trier".
- **Checklist :**
  - [ ] Header H1 "Vrac" Space Grotesk Bold 34px + sous-titre avec compteur dynamique
  - [ ] `SubtitleCounter.tsx` : composant réutilisable template + compteur
  - [ ] Liste antichronologique (plus récentes en haut)
  - [ ] `TaskItemInbox.tsx` : titre + bouton "Trier" (secondary, sm) visible sans swipe
  - [ ] Zone tactile ≥ 44px par item
  - [ ] Header + CaptureInput sticky au scroll
  - [ ] `InboxPage.test.tsx` : liste, compteur, ordre, scroll

---

### TICKET 2.3 — Édition inline du titre d'une tâche
- **Epic :** Epic 2 · Brain Dump
- **Labels :** `Epic 2`, `ui`
- **Taille :** M
- **Dépendance :** 2.2
- **Description :**
  Long press (mobile ~500ms) ou double-clic (desktop) → titre devient champ éditable. Enter/blur = sauvegarde. Escape = annulation. Titre vide rejeté.
- **Checklist :**
  - [ ] Hook `useInlineEdit` ou logique dans TaskItemInbox
  - [ ] Activation : long press ~500ms mobile, double-clic desktop
  - [ ] Mode édition : champ texte avec contenu sélectionné
  - [ ] Enter/blur → `updateTask()` + retour mode lecture
  - [ ] Escape → annulation, titre original restauré
  - [ ] Titre vide → rejeté, original restauré
  - [ ] `TaskItemInbox.test.tsx` : activation, sauvegarde, annulation, rejet vide

---

### TICKET 2.4 — Empty States du Vrac
- **Epic :** Epic 2 · Brain Dump
- **Labels :** `Epic 2`, `ui`
- **Taille :** S
- **Dépendance :** 2.2
- **Description :**
  Créer `EmptyState.tsx` avec 2 variantes Vrac : "1er lancement" (auto-focus CaptureInput, message guide) et "Vrac triée" (message positif + lien Réserve).
- **Checklist :**
  - [ ] `src/shared/EmptyState.tsx` : prop `variant`, named export
  - [ ] Variante 1er lancement : CaptureInput auto-focusé, "Commence par noter ce qui te trotte dans la tête"
  - [ ] Variante Vrac triée : "Tout est trié !" + lien "Voir ta Réserve" → `/reserve`
  - [ ] Flag 1er lancement dans `useUIStore`
  - [ ] `EmptyState.test.tsx` : 2 variantes, lien navigation

---

## Sprint 3 — Tri cognitif (Semaines 5-6)

**Objectif :** L'utilisateur peut classifier ses tâches via le questionnaire guidé ou manuellement.

### TICKET 3.1 — OverlayShell : système d'overlay unifié
- **Epic :** Epic 3 · Tri
- **Labels :** `Epic 3`, `ui`
- **Taille :** L
- **Dépendance :** 1.4
- **Description :**
  Créer le composant `OverlayShell` réutilisable : bottom sheet mobile (~75%) / modal desktop (~480px). Focus trap, Escape, transitions Motion 300ms. Masquage bottom nav sous le backdrop.
- **Checklist :**
  - [ ] `src/shared/OverlayShell.tsx` : props `isOpen`, `onClose`, `variant` ('flow' ~75% | 'micro' ~30%), `children`
  - [ ] Mobile : bottom sheet + handle drag + backdrop assombri + bottom nav masquée
  - [ ] Desktop : modal centrée ~480px + backdrop
  - [ ] Transitions : slide up/down 300ms (mobile), fade 300ms (desktop) — Motion
  - [ ] Fermeture : swipe down handle, ✕, backdrop, Escape
  - [ ] Focus trap (Tab ne sort pas), retour focus sur déclencheur
  - [ ] `aria-modal="true"`, `role="dialog"`
  - [ ] `styles/components/overlay.css` : `.overlay-shell`, `.overlay-backdrop`, `.overlay-handle`
  - [ ] `OverlayShell.test.tsx` : ouverture, fermeture (4 méthodes), focus trap, retour focus

---

### TICKET 3.2 — Overlay de tri : choix assisté vs manuel
- **Epic :** Epic 3 · Tri
- **Labels :** `Epic 3`, `ui`
- **Taille :** M
- **Dépendance :** 3.1, 2.2
- **Description :**
  Créer `SortingOverlay` avec titre tâche en ancrage, grille 2×2 QuadrantButtons (tri manuel), et bouton "Aide-moi à décider" (tri assisté, proéminent). Fermeture = aucune donnée enregistrée.
- **Checklist :**
  - [ ] `src/features/sorting/SortingOverlay.tsx` : orchestre le flow complet
  - [ ] `src/shared/TaskContextHeader.tsx` : titre tâche en ancrage
  - [ ] `src/shared/QuadrantButton.tsx` : grille 2×2 outline — Q1 rouge, Q2 vert, Q3 orange, Q4 jaune
  - [ ] Bouton "Aide-moi à décider" primary md pleine largeur (visuellement proéminent = nudge)
  - [ ] Tap QuadrantButton → classifyTask `manual` → écran résultat (3.4)
  - [ ] Tap "Aide-moi" → transition slide vers questionnaire (3.3)
  - [ ] Fermeture overlay → tâche intacte dans Vrac, rien enregistré
  - [ ] `SortingOverlay.test.tsx`, `QuadrantButton.test.tsx`

---

### TICKET 3.3 — Questionnaire cognitif : machine à états et navigation
- **Epic :** Epic 3 · Tri
- **Labels :** `Epic 3`, `data`, `ui`
- **Taille :** XL
- **Dépendance :** 3.2
- **Description :**
  Implémenter les 4 flux cognitifs, la machine à états (useReducer), la navigation questions avec transitions slide, retour arrière avec pré-sélection, ProgressDots. Aucun cul-de-sac — chaque branche aboutit à un quadrant.
- **Checklist :**
  - [ ] `src/lib/questionnaire.ts` : 4 flux cognitifs (questions, réponses, branchements, quadrant de sortie)
  - [ ] `src/hooks/useFlowReducer.ts` : machine à états useReducer — START, ANSWER, BACK, RESET
  - [ ] `src/features/sorting/Questionnaire.tsx` : une question à la fois
  - [ ] `src/shared/AnswerOption.tsx` : boutons pleine largeur, états default/pressed/pré-sélectionné
  - [ ] `src/shared/ProgressDots.tsx` : dots discrets actif/inactif
  - [ ] Question d'aiguillage : "Comment tu vis cette tâche en ce moment ?" → 4 réponses → 4 flux
  - [ ] 2-4 questions par flux, toujours un quadrant en sortie
  - [ ] Retour ← : slide gauche, réponse pré-sélectionnée
  - [ ] Flux 2 "pas de priorités" → redirection fluide vers Flux 1
  - [ ] Fermeture overlay → FlowStore reset, aucune donnée partielle
  - [ ] `useFlowReducer.test.ts` : 4 flux × toutes branches → quadrant, retour, reset, redirection
  - [ ] `questionnaire.test.ts` : chaque flux → quadrant, pas de cul-de-sac
  - [ ] `Questionnaire.test.tsx` : navigation, retour, pré-sélection, transitions

---

### TICKET 3.4 — Confirmation et résultat de tri
- **Epic :** Epic 3 · Tri
- **Labels :** `Epic 3`, `ui`
- **Taille :** L
- **Dépendance :** 3.3
- **Description :**
  Écran de confirmation (quadrant proposé + "Ça me parle" + 3 alternatives). Écran résultat (animation feedback + "Tâche suivante" + "Voir Réserve"). Gestion backlog plein 40/40. Enchaînement rapide sans fermer l'overlay.
- **Checklist :**
  - [ ] `src/features/sorting/SortConfirmation.tsx` : quadrant proéminent, "Ça me parle" (primary), 3 QuadrantButtons alternatifs sous "Pas convaincu·e ?"
  - [ ] Validation → `user_override: false` · Override → `user_override: true`
  - [ ] `src/features/sorting/SortResult.tsx` : animation scale up + fade in, compteur "4/15 triées"
  - [ ] "Tâche suivante →" : overlay reste ouvert, retour à 3.2 avec tâche suivante
  - [ ] Vrac vide → "Tout est trié !" + seul lien "Voir la Réserve"
  - [ ] Backlog 40/40 → tâche reste inbox, message "Réserve pleine" + liens Purger / Revenir
  - [ ] "Voir la Réserve" → ferme overlay + navigation `/reserve`
  - [ ] `SortConfirmation.test.tsx`, `SortResult.test.tsx`

---

## Sprint 4 — Réserve & Focus (Semaines 7-8)

**Objectif :** L'utilisateur peut organiser son backlog et agir depuis la matrice Focus.

### TICKET 4.1 — ReservePage : accordion par quadrant et compteur de capacité
- **Epic :** Epic 4 · Réserve
- **Labels :** `Epic 4`, `ui`
- **Taille :** L
- **Dépendance :** 1.5, 3.4
- **Description :**
  Créer `ReservePage` avec 4 sections accordion strict (Q1 ouvert par défaut). Header sticky H1 "Réserve" + compteur [N]/40. EmptyState si Réserve vide.
- **Checklist :**
  - [ ] `src/features/reserve/ReservePage.tsx` : layout avec header sticky
  - [ ] `src/features/reserve/QuadrantSection.tsx` : header couleur + label + compteur + liste collapsible
  - [ ] Accordion strict : un seul ouvert, Q1 par défaut, animation expand/collapse 200ms (Motion)
  - [ ] `src/shared/CounterCapacity.tsx` : [N]/40 réutilisable
  - [ ] `styles/components/card.css` : `.card`, `.card-body`
  - [ ] EmptyState "Réserve vide" → lien vers `/`
  - [ ] `ReservePage.test.tsx` : accordion, Q1 défaut, compteur, empty state

---

### TICKET 4.2 — TaskItemBacklog : affichage, activation et suppression
- **Epic :** Epic 4 · Réserve
- **Labels :** `Epic 4`, `ui`
- **Taille :** L
- **Dépendance :** 4.1
- **Description :**
  Créer `TaskItemBacklog` (titre + bouton Activer). Activation vers Focus (si < 4). Suppression swipe + toast undo 5s. Composant Toast générique avec countdown.
- **Checklist :**
  - [ ] `TaskItemBacklog.tsx` : titre + bouton "Activer" (icône, sm), zone 44px, édition inline
  - [ ] Activer → status `active`, fade-out, toast "Ajoutée à ton Focus"
  - [ ] Activer bloqué si 4/4 → disabled + message "Focus plein (4/4)"
  - [ ] Supprimer : swipe gauche (mobile) ou long press menu
  - [ ] `src/shared/Toast.tsx` : toast undo (countdown 5s + Annuler + auto-dismiss) + toast pédagogique (sans action)
  - [ ] `src/hooks/useUndo.ts` : timer 5s, annulation, expiration
  - [ ] `styles/components/toast.css` : position bottom au-dessus de la nav
  - [ ] `TaskItemBacklog.test.tsx`, `useUndo.test.ts`

---

### TICKET 4.3 — Drag & Drop : reclassement inter-quadrant et réordonnancement
- **Epic :** Epic 4 · Réserve
- **Labels :** `Epic 4`, `ui`
- **Taille :** XL
- **Dépendance :** 4.2
- **Description :**
  Configurer dnd-kit pour la Réserve. Drag intra-quadrant (réordonnancement). Drag vers header collapsed (reclassement inter-quadrant). SortToggle date/manuel par quadrant.
- **Checklist :**
  - [ ] `src/dnd/DndProvider.tsx` : contexte dnd-kit
  - [ ] `src/dnd/sensors.ts` : pointer + touch, delay ~200ms (tap vs drag)
  - [ ] `src/dnd/strategies.ts` : tri vertical sortable
  - [ ] Drag intra-quadrant : réorganisation temps réel, sauvegarde position, snap ease-spring
  - [ ] Drag inter-quadrant : headers collapsed = zones de drop, surbrillance couleur, reclassement + toast
  - [ ] Drop hors zone : snap-back ease-spring
  - [ ] `src/features/reserve/SortToggle.tsx` : "Par date" / "Manuel", Manuel = défaut
  - [ ] Tests dnd-kit : intra, inter, snap-back, sort toggle

---

### TICKET 4.4 — Gestion de capacité : nudge et blocage
- **Epic :** Epic 4 · Réserve
- **Labels :** `Epic 4`, `ui`
- **Taille :** M
- **Dépendance :** 4.1
- **Description :**
  `NudgeBanner` visible à 35+ tâches. Compteur rouge à 40/40. Lien vers la purge (placeholder Epic 7). Constante `NUDGE_THRESHOLD = 35`.
- **Checklist :**
  - [ ] `src/features/reserve/NudgeBanner.tsx` : variante nudge (35+) + variante blocage (40/40)
  - [ ] Banner dismissable (✕), ton bienveillant
  - [ ] Compteur sous-titre couleur d'alerte à 35+, rouge à 40/40
  - [ ] Lien "Faire du tri" → overlay purge (placeholder)
  - [ ] `NUDGE_THRESHOLD = 35` dans constants.ts
  - [ ] `NudgeBanner.test.tsx` : apparition 35+, message 40/40, dismiss, lien

---

### TICKET 5.1 — FocusPage mobile : layout asymétrique et swap
- **Epic :** Epic 5 · Focus
- **Labels :** `Epic 5`, `ui`
- **Taille :** L
- **Dépendance :** 4.2
- **Description :**
  Créer `FocusPage` mobile : zone proéminente (~50% hauteur, Q1 défaut) + NavGrid 2×2 (mini-cards fixes). Swap crossfade 200ms (Motion). Reset Q1 à chaque entrée.
- **Checklist :**
  - [ ] `src/features/focus/FocusPage.tsx` : orchestre mobile/desktop
  - [ ] `src/features/focus/ProminentQuadrant.tsx` : couleur + label + compteur + max 4 tâches
  - [ ] `src/features/focus/NavGrid.tsx` : grille 2×2 mini-cards, positions fixes, indicateur actif
  - [ ] Tap mini-card → crossfade 200ms (Motion), indicateur se déplace
  - [ ] Q1 proéminent par défaut, reset à chaque navigation entrante
  - [ ] EmptyState global : "Active des tâches depuis ta Réserve" + lien `/reserve`
  - [ ] EmptyState quadrant : "Aucune tâche ici — tape sur un quadrant pour voir les autres"
  - [ ] `FocusPage.test.tsx`, `NavGrid.test.tsx`

---

### TICKET 5.2 — FocusPage desktop : grille 2×2 symétrique
- **Epic :** Epic 5 · Focus
- **Labels :** `Epic 5`, `ui`
- **Taille :** M
- **Dépendance :** 5.1
- **Description :**
  Créer `MatrixGrid` : 4 zones égales en grille 2×2 pour tablette/desktop. Quadrants vides grisés. Rendu conditionnel (MatrixGrid desktop, ProminentQuadrant + NavGrid mobile).
- **Checklist :**
  - [ ] `src/features/focus/MatrixGrid.tsx` : grille 2×2, Q1 haut-gauche, Q2 haut-droite, Q3 bas-gauche, Q4 bas-droite
  - [ ] Chaque zone : couleur + label + compteur + max 4 tâches
  - [ ] Quadrant vide : zone grisée + message discret
  - [ ] MatrixGrid rendu uniquement ≥768px, ProminentQuadrant + NavGrid uniquement <768px
  - [ ] `MatrixGrid.test.tsx` : grille, 4 zones, empty states

---

## Sprint 5 — Focus actions, Archive & Purge (Semaines 9-10)

**Objectif :** L'utilisateur peut compléter/renvoyer des tâches, voir ses accomplissements, et nettoyer son backlog.

### TICKET 5.3 — TaskItemMatrix : complétion et undo
- **Epic :** Epic 5 · Focus
- **Labels :** `Epic 5`, `ui`
- **Taille :** L
- **Dépendance :** 5.1
- **Description :**
  `TaskItemMatrix` : checkbox + titre. Complétion → fade-out + scale-down 300ms + toast undo 5s. Undo → restauration. Highlight temporaire post-activation.
- **Checklist :**
  - [ ] `TaskItemMatrix.tsx` : checkbox (44×44px) + titre + édition inline
  - [ ] Coche → fade-out + scale-down 300ms (Motion), status `archived`, `completed_at` auto
  - [ ] Toast undo 5s : "Tâche complétée — [Annuler]", countdown visuel
  - [ ] Annuler → restore status `active`, `completed_at` = null, fade-in
  - [ ] 5s expirent → complétion définitive, visible dans Archive
  - [ ] Highlight 2-3s pour tâche nouvellement activée
  - [ ] `aria-live="polite"` pour résultat
  - [ ] `TaskItemMatrix.test.tsx`

---

### TICKET 5.4 — Remettre à la Réserve et feedback pédagogique
- **Epic :** Epic 5 · Focus
- **Labels :** `Epic 5`, `ui`
- **Taille :** M
- **Dépendance :** 5.3
- **Description :**
  Mécanisme de renvoi tâche Focus → backlog (même quadrant). Feedback pédagogique si drag inter-quadrant en Focus desktop (snap-back + toast explicatif).
- **Checklist :**
  - [ ] Bouton/menu renvoi → status `backlog`, même quadrant, toast "Remise dans ta Réserve"
  - [ ] Drag inter-quadrant en Focus → snap-back + toast pédagogique "Dans le Focus, tu agis. Pour reclasser, remets-la d'abord dans la Réserve."
  - [ ] Toast pédagogique : sans action, auto-dismiss
  - [ ] `TaskItemMatrix.test.tsx` : renvoi, feedback pédagogique, snap-back

---

### TICKET 6.1 — ArchivePage : liste des tâches complétées
- **Epic :** Epic 6 · Archive
- **Labels :** `Epic 6`, `ui`
- **Taille :** M
- **Dépendance :** 5.3
- **Description :**
  `ArchivePage` : H1 "Archive" + compteur "N terminées". Liste antichronologique par `completed_at`. `TaskItemArchive` : titre + badge quadrant couleur + date. Lecture seule.
- **Checklist :**
  - [ ] `src/features/archive/ArchivePage.tsx` : header sticky + liste
  - [ ] `src/features/archive/TaskItemArchive.tsx` : titre + badge couleur + date formatée
  - [ ] `styles/components/badge.css` : `.badge`, `.badge-q1` à `.badge-q4`
  - [ ] Ordre antichronologique par `completed_at`
  - [ ] Lecture seule : aucun bouton d'action
  - [ ] EmptyState "Archive vide" : ton neutre
  - [ ] `ArchivePage.test.tsx`

---

### TICKET 7.1 — PurgeIntro : déclenchement et écran d'introduction
- **Epic :** Epic 7 · Purge
- **Labels :** `Epic 7`, `ui`
- **Taille :** S
- **Dépendance :** 3.1, 4.4
- **Description :**
  Écran intro purge dans OverlayShell : 2 variantes de message (nudge 35+ / blocage 40/40). "C'est parti" → questionnaire. "Pas maintenant" → ferme.
- **Checklist :**
  - [ ] `src/features/purge/PurgeIntro.tsx` : icône 🧹, titre + sous-texte contextuel
  - [ ] Variante nudge (35-39) : "Un peu de tri ?" + "[N] tâches"
  - [ ] Variante blocage (40/40) : "Ta Réserve est pleine" + "40/40"
  - [ ] "C'est parti" (primary) → questionnaire purge (7.2)
  - [ ] "Pas maintenant" (secondary) / swipe → retour Réserve
  - [ ] `PurgeIntro.test.tsx`

---

### TICKET 7.2 — PurgeQuestionnaire : flow de purge en 2 questions
- **Epic :** Epic 7 · Purge
- **Labels :** `Epic 7`, `ui`, `data`
- **Taille :** L
- **Dépendance :** 7.1
- **Description :**
  Tâches présentées par ancienneté (Q4 prioritaire). Q1 "Elle compte toujours ?" (Oui/Non supprimer). Q2 "Au bon endroit ?" (quadrant actuel pré-sélectionné + 3 alternatives). Arrêt partiel = changements persistés.
- **Checklist :**
  - [ ] `src/features/purge/PurgeQuestionnaire.tsx` : flow 2 questions
  - [ ] Tri par ancienneté, Q4 en priorité
  - [ ] Chaque tâche : titre + badge quadrant + ancienneté relative
  - [ ] "Non, supprimer" → suppression immédiate
  - [ ] "Oui" → Q2 : quadrant actuel pré-sélectionné + 3 alternatives
  - [ ] Compteur "3/12 tâches revues"
  - [ ] "Arrêter la purge" toujours visible → persistance changements + ferme overlay
  - [ ] Rien à purger → "Ta Réserve est bien rangée" + retour
  - [ ] `PurgeQuestionnaire.test.tsx`

---

### TICKET 7.3 — PurgeSummary : bilan récapitulatif
- **Epic :** Epic 7 · Purge
- **Labels :** `Epic 7`, `ui`
- **Taille :** S
- **Dépendance :** 7.2
- **Description :**
  Bilan après purge complète : N revues, X supprimées, Y reclassées, Z gardées. Nouveau total Réserve [N]/40. "Retour à la Réserve".
- **Checklist :**
  - [ ] `src/features/purge/PurgeSummary.tsx` : icône 🧹 + "Purge terminée"
  - [ ] Récap chiffres mis en évidence
  - [ ] `CounterCapacity` : nouveau total
  - [ ] "Retour à la Réserve" (primary) → ferme overlay
  - [ ] `PurgeSummary.test.tsx`

---

## Sprint 6 — Polish & Déploiement (Semaines 11-12)

**Objectif :** Onboarding, analytics, micro-survey, CI/CD, et déploiement en production.

### TICKET 8.1 — Tracking analytique : timestamps, timer et méthodes
- **Epic :** Epic 8 · Analytics
- **Labels :** `Epic 8`, `data`
- **Taille :** M
- **Dépendance :** 1.5, 3.3
- **Description :**
  Vérifier/compléter les timestamps auto. Ajouter le timer de flow dans useAnalyticsStore. Helpers analytics (start/stop timer, calcul taux override).
- **Checklist :**
  - [ ] Vérifier `created_at`, `classified_at`, `completed_at` auto dans les actions store
  - [ ] Timer flow tri : start à l'ouverture overlay, stop à validation, cancel à abandon
  - [ ] `flow_duration_ms` sauvegardé sur la tâche
  - [ ] `classification_method`, `source_flux`, `user_override` enregistrés correctement
  - [ ] `src/lib/analytics.ts` : `startFlowTimer()`, `stopFlowTimer()`, `calculateOverrideRate()`
  - [ ] Persist via useAnalyticsStore (clé `izh-analytics`)
  - [ ] Tests : timestamps, timer start/stop/cancel, méthode + flux + override

---

### TICKET 8.2 — Onboarding par l'usage : surbrillances et guidage
- **Epic :** Epic 8 · Analytics
- **Labels :** `Epic 8`, `ui`
- **Taille :** M
- **Dépendance :** 2.1, 3.2
- **Description :**
  Pulse sur bouton "Trier" après 5s d'inactivité (1re tâche). Pulse sur "Aide-moi à décider" au 1er tri. Micro-texte "Réponds à l'instinct" au 1er questionnaire. Flags onboarding dans useUIStore.
- **Checklist :**
  - [ ] Timer inactivité 5s après 1re tâche → pulse bouton "Trier" (Motion)
  - [ ] Pulse "Aide-moi à décider" au 1er overlay tri (~2s loop)
  - [ ] Micro-texte "Réponds à l'instinct — il n'y a pas de mauvaise réponse." 1re fois uniquement
  - [ ] Flags useUIStore : `onboarding_sort_nudge_shown`, `onboarding_assisted_pulse_shown`, `onboarding_micro_text_shown`
  - [ ] `prefers-reduced-motion` → désactive les animations pulse
  - [ ] Tests : pulse après 5s, pulse Aide-moi, micro-texte unique, reduced-motion

---

### TICKET 8.3 — Micro-survey : score de légèreté mentale
- **Epic :** Epic 8 · Analytics
- **Labels :** `Epic 8`, `ui`
- **Taille :** M
- **Dépendance :** 3.1, 5.3
- **Description :**
  OverlayShell variante 'micro' (~30%). Slider 1-10 avec émojis. Déclenchement : 1x post-1er tri complet, puis max 1x/semaine après complétion Focus. Dismiss = pas de relance immédiate.
- **Checklist :**
  - [ ] `src/features/survey/MicroSurvey.tsx` : question + slider + "Envoyer"
  - [ ] `src/features/survey/SurveySlider.tsx` : slider 1-10, 😫 (1) → 😌 (10)
  - [ ] Déclencheur post-1er tri complet (toutes inbox triées), délai ~1s
  - [ ] Déclencheur 1x/semaine après complétion Focus
  - [ ] Jamais au lancement, ni pendant tri/purge
  - [ ] Envoyer → `mental_lightness_score`, `survey_timestamp`, `survey_context` dans useAnalyticsStore
  - [ ] Dismiss → rien enregistré, revient dans 7 jours
  - [ ] `MicroSurvey.test.tsx`

---

### TICKET 8.4 — CI/CD et déploiement
- **Epic :** Epic 8 · Analytics
- **Labels :** `Epic 8`, `infra`
- **Taille :** M
- **Dépendance :** 1.1
- **Description :**
  GitHub Actions : lint → type-check → test → build → deploy (webhook Coolify). Playwright config (tests E2E pas dans CI au MVP). Scripts npm complets.
- **Checklist :**
  - [ ] `.github/workflows/ci.yml` : Node.js ≥20.19, npm ci, cache npm
  - [ ] Pipeline : lint → type-check → test (Vitest) → build → deploy webhook Coolify
  - [ ] Chaque étape bloque les suivantes si échec
  - [ ] `playwright.config.ts` créé, `e2e/` avec placeholder
  - [ ] `npm run test:e2e` fonctionne
  - [ ] Scripts npm : `dev`, `build`, `test`, `test:e2e`, `lint`, `type-check`
  - [ ] `.env.example` documenté
  - [ ] App accessible sur URL publique + SSL Let's Encrypt

---

## Vue d'ensemble des sprints

| Sprint | Semaines | Thème | Tickets | Epic(s) |
|--------|----------|-------|---------|---------|
| **1** | 1-2 | Fondations | 1.1, 1.2, 1.3, 1.5, 1.4 | Epic 1 |
| **2** | 3-4 | Brain Dump | 2.1, 2.2, 2.3, 2.4 | Epic 2 |
| **3** | 5-6 | Tri cognitif | 3.1, 3.2, 3.3, 3.4 | Epic 3 |
| **4** | 7-8 | Réserve & Focus | 4.1, 4.2, 4.3, 4.4, 5.1, 5.2 | Epic 4, 5 |
| **5** | 9-10 | Actions, Archive & Purge | 5.3, 5.4, 6.1, 7.1, 7.2, 7.3 | Epic 5, 6, 7 |
| **6** | 11-12 | Polish & Déploiement | 8.1, 8.2, 8.3, 8.4 | Epic 8 |

## Graphe de dépendances simplifié

```
1.1 ──┬── 1.2 ── 1.3 ──┐
      │                  ├── 1.4 ── 2.1 ── 2.2 ──┬── 2.3
      └── 1.5 ──────────┘                        ├── 2.4
                                                  │
      3.1 ── 3.2 ── 3.3 ── 3.4                   │
       ↑       ↑                                  │
      1.4     2.2 ────────────────────────────────┘
                          │
      4.1 ── 4.2 ── 4.3  │     4.4 ── 7.1 ── 7.2 ── 7.3
       ↑      │           │
      3.4     └── 5.1 ── 5.2
                   │
                  5.3 ── 5.4
                   │
                  6.1
                   │
              8.1  8.2  8.3  8.4
```

## Notes pour Trello

1. **Créer 1 carte par TICKET** — copier le titre, la description et la checklist
2. **Ajouter les labels** Epic + type (ui/data/infra)
3. **Dépendances** : utiliser le Power-Up "Card Dependencies" ou simplement noter dans la description
4. **Sprint courant** : déplacer les tickets du sprint dans la colonne "Sprint N"
5. **Règle WIP** : max 2 tickets "En cours" en même temps (solo dev)
6. **Definition of Done** par ticket : checklist complète + tests passent + `npm run build` OK
