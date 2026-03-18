---
updated: 2026-03-17
---

# Contexte technique — IZH

## Stack

| Couche | Technologie | Version |
|--------|-------------|---------|
| Framework | React | 19.2.4 |
| Build | Vite | 8.0.0 |
| Langage | TypeScript | 5.9.3 |
| Linting | ESLint 9 + eslint-config-prettier | — |
| Formatting | Prettier | 3.8.1 |
| Git hooks | Husky + lint-staged | — |

## Structure actuelle

```
src/
  App.tsx
  main.tsx
  index.css
```

Projet au stade initial — scaffolding Vite + React.

## Conventions detectees

- ESM (`"type": "module"`)
- Path alias : `@` → `./src`
- Pre-commit : Prettier + ESLint via lint-staged
- Pas de state management, routing, ou testing setup detecte
