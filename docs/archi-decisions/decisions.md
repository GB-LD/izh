---
updated: 2026-03-18
---

# Journal des decisions techniques — IZH

## ADR-001 — Testing : Vitest + jsdom + React Testing Library

**Date :** 2026-03-17
**Statut :** Acceptée

**Contexte :** Mise en place du testing sur IZH (React 19, Vite 8, TS 5.9).

**Options considérées :**
- **A) Vitest + jsdom + RTL** — Tests unitaires/intégration en environnement simulé. Standard industrie, rapide, léger.
- **B) Vitest Browser Mode (Playwright)** — Tests dans un vrai navigateur. Plus fidèle mais plus lourd.

**Décision :** Option A. Le projet est au stade initial, on priorise la base de la pyramide de tests (solidbook ch.25). Le Browser Mode sera ajouté plus tard pour les besoins E2E dans `e2e/`.

**Convention :** Tests colocalisés à côté des composants (`Component.test.tsx`), pas dans un dossier `test/` séparé. Raison : affordances in code (solidbook ch.5) — proximité physique = découvrabilité.

**Principes solidbook appliqués :**
- ch.25 — Unit test all domain layer code (pyramide de tests)
- ch.5 — Human-Centered Design: affordances in code (colocation)

## ADR-002 — Pre-commit : tests related via husky

**Date :** 2026-03-17
**Statut :** Acceptée

**Contexte :** Empêcher les commits qui cassent les tests. Lint-staged gère déjà prettier + eslint.

**Options considérées :**
- **A) `vitest related` dans lint-staged** — Simple mais appelle Vitest N fois (une par fichier stagé), potentiellement redondant.
- **B) `vitest related` dans le hook husky** — Un seul appel avec tous les fichiers stagés. Vitest résout le graph de dépendances en une passe.

**Décision :** Option B. Séparation logique : lint-staged = formatage/linting (par fichier), husky = tests (par changeset). Plus efficace, pas de doublons.

**Implémentation :** `.husky/pre-commit` — lint-staged d'abord, puis `vitest related --run` sur les fichiers `*.ts`/`*.tsx` stagés (avec guard si aucun fichier concerné).

## ADR-003 — Branching : GitHub Flow adapté + squash merge

**Date :** 2026-03-18
**Statut :** Acceptée

**Contexte :** Projet solo avec déploiement continu via Coolify (staging + prod). Objectif : adopter des pratiques d'équipe pro pour être prêt à intégrer une équipe.

**Options considérées (branching) :**
- **A) GitHub Flow adapté** — `main` (prod) + `staging` (pré-prod/e2e) + feature branches. Pas de `develop`.
- **B) Git Flow classique** — `main` + `staging` + `develop` + feature branches. Trois niveaux de merge.

**Options considérées (merge strategy) :**
- **A) Squash merge** — 1 PR = 1 commit sur la branche cible. Historique détaillé conservé dans la PR GitHub.
- **B) Rebase interactif + merge** — Contrôle fin mais complexité inutile au stade actuel.
- **C) Merge classique** — Zéro effort mais historique bruyant.

**Décision :** GitHub Flow adapté (A) + squash merge (A). Suppression de la branche `develop`. Feature branches créées depuis `main`, PR vers `staging` pour validation e2e, puis PR vers `main` pour livraison prod.

**Convention :** Conventional Commits pour le message du squash (`feat:`, `fix:`, `chore:`…). Commits intermédiaires sur la feature branch = libres.

**Raisonnement :** `develop` n'apporte rien que `staging` ne fait pas déjà. Le squash merge est le standard industrie pour garder un historique lisible (1 ticket = 1 commit) tout en préservant le détail dans les PRs.

## ADR-004 — Project management : GitHub Projects + Issues

**Date :** 2026-03-18
**Statut :** Acceptée

**Contexte :** Besoin d'un outil de suivi avec kanban visuel et lien automatique issues ↔ PRs. Backlog existant dans `docs/bmad/sprint-planning.md` (8 epics, 26 tickets, 6 sprints). Migration depuis une planification Trello jamais instanciée.

**Options considérées (granularité issues) :**
- **A) 1 issue = 1 ticket** — 26 issues. Lien PR → issue automatique via `closes #N`. Traçabilité complète.
- **B) 1 issue = 1 epic** — 8 issues avec checklists. Pas de lien automatique PR → sous-tâche.

**Options considérées (board) :**
- **A) Board unique + custom fields + vues filtrées** — Un board, plusieurs angles de vue (sprint courant, par epic, etc.).
- **B) Un board par sprint** — Isolation visuelle mais pas de vue d'ensemble, maintenance lourde.

**Options considérées (labels) :**
- **A) Labels par epic + type + size** — Contexte visuel sur les issues et PRs partout dans GitHub.
- **B) Custom fields uniquement** — Pas de contexte visuel hors du board.

**Décision :** Option A sur les trois axes.
- **Issues :** 1 issue par ticket (26 issues)
- **Board :** Board unique avec custom fields : Status (`Backlog`, `Sprint N`, `In Progress`, `In Review`, `Done`), Epic, Type, Sprint (iteration 2 sem), Size
- **Labels :** `epic:app-shell`, `epic:brain-dump`, `epic:sorting`, etc. + `ui`, `data`, `infra` + `size:S/M/L/XL`

**Workflow cible :**
1. Issue dans le board (ex: #12 "Design tokens OKLCH")
2. Feature branch : `feat/1.2-design-tokens`
3. PR vers `staging` avec `closes #12` → squash merge → issue fermée auto → board mis à jour

**Raisonnement :** La traçabilité issue → PR → merge est le standard des équipes pro sur GitHub. Les labels complètent les custom fields en rendant le contexte visible partout (liste issues, PRs, notifications).
