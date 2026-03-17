---
updated: 2026-03-17
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
