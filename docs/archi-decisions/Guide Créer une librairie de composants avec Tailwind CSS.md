Architecture et système de design pour un projet, inspiré de DaisyUI.

---

## 1. Structure recommandée

```
mon-projet/
├── src/
│   ├── styles/
│   │   ├── base/
│   │   │   └── index.css        # Reset + variables globales
│   │   ├── components/
│   │   │   ├── button.css
│   │   │   ├── card.css
│   │   │   ├── input.css
│   │   │   └── ...
│   │   ├── utilities/
│   │   │   └── index.css        # Classes utilitaires custom
│   │   └── themes/
│   │       ├── light.css
│   │       └── dark.css
│   ├── app.css                  # Point d'entrée principal
│   └── ...
├── tailwind.config.js
└── package.json
```

---

## 2. Configuration Tailwind

### 2.1 Installation

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2.2 tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue,svelte}"],
  theme: {
    extend: {
      // Étendre avec vos design tokens
      colors: {
        // Couleurs sémantiques liées aux variables CSS
        "base-100": "var(--color-base-100)",
        "base-200": "var(--color-base-200)",
        "base-300": "var(--color-base-300)",
        "base-content": "var(--color-base-content)",
        "primary": "var(--color-primary)",
        "primary-content": "var(--color-primary-content)",
        "secondary": "var(--color-secondary)",
        "secondary-content": "var(--color-secondary-content)",
        "success": "var(--color-success)",
        "success-content": "var(--color-success-content)",
        "warning": "var(--color-warning)",
        "warning-content": "var(--color-warning-content)",
        "error": "var(--color-error)",
        "error-content": "var(--color-error-content)",
      },
      borderRadius: {
        "box": "var(--radius-box)",
        "field": "var(--radius-field)",
        "selector": "var(--radius-selector)",
      },
    },
  },
  plugins: [],
}
```

---

## 3. Point d'entrée CSS

```css
/* src/app.css */

/* Tailwind layers */
@import "tailwindcss";

/* Base - variables et reset */
@import "./styles/base/index.css";

/* Thèmes */
@import "./styles/themes/light.css";
@import "./styles/themes/dark.css";

/* Composants custom */
@import "./styles/components/button.css";
@import "./styles/components/card.css";
@import "./styles/components/input.css";
@import "./styles/components/badge.css";

/* Utilitaires custom */
@import "./styles/utilities/index.css";
```

---

## 4. Variables globales (Design Tokens)

```css
/* src/styles/base/index.css */

@layer base {
  :root {
    /* ========== COULEURS SÉMANTIQUES ========== */
    
    /* Surfaces */
    --color-base-100: oklch(100% 0 0);
    --color-base-200: oklch(96% 0 0);
    --color-base-300: oklch(90% 0 0);
    --color-base-content: oklch(20% 0 0);
    
    /* Actions */
    --color-primary: oklch(55% 0.25 250);
    --color-primary-content: oklch(98% 0 0);
    
    --color-secondary: oklch(65% 0.15 200);
    --color-secondary-content: oklch(98% 0 0);
    
    /* États */
    --color-success: oklch(65% 0.2 145);
    --color-success-content: oklch(98% 0 0);
    
    --color-warning: oklch(80% 0.15 85);
    --color-warning-content: oklch(20% 0 0);
    
    --color-error: oklch(60% 0.22 25);
    --color-error-content: oklch(98% 0 0);
    
    /* ========== RAYONS ========== */
    --radius-selector: 0.5rem;
    --radius-field: 0.25rem;
    --radius-box: 1rem;
    
    /* ========== TRANSITIONS ========== */
    --transition-fast: 150ms ease;
    --transition-base: 200ms ease;
  }
}
```

---

## 5. Système de thèmes

### 5.1 Thème clair (défaut)

```css
/* src/styles/themes/light.css */

@layer base {
  :root,
  [data-theme="light"] {
    --color-base-100: oklch(100% 0 0);
    --color-base-200: oklch(96% 0 0);
    --color-base-300: oklch(90% 0 0);
    --color-base-content: oklch(20% 0 0);
    
    --color-primary: oklch(55% 0.25 250);
    --color-primary-content: oklch(98% 0 0);
    
    --color-secondary: oklch(65% 0.15 200);
    --color-secondary-content: oklch(98% 0 0);
  }
}
```

### 5.2 Thème sombre

```css
/* src/styles/themes/dark.css */

@layer base {
  [data-theme="dark"] {
    --color-base-100: oklch(20% 0.02 260);
    --color-base-200: oklch(25% 0.02 260);
    --color-base-300: oklch(35% 0.02 260);
    --color-base-content: oklch(90% 0 0);
    
    --color-primary: oklch(65% 0.25 250);
    --color-primary-content: oklch(15% 0 0);
    
    --color-secondary: oklch(70% 0.15 200);
    --color-secondary-content: oklch(15% 0 0);
  }

  /* Support automatique préférence système */
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --color-base-100: oklch(20% 0.02 260);
      --color-base-200: oklch(25% 0.02 260);
      --color-base-300: oklch(35% 0.02 260);
      --color-base-content: oklch(90% 0 0);
      
      --color-primary: oklch(65% 0.25 250);
      --color-primary-content: oklch(15% 0 0);
    }
  }
}
```

### 5.3 Toggle thème (JavaScript)

```javascript
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme')
  const next = current === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
  localStorage.setItem('theme', next)
}

function initTheme() {
  const saved = localStorage.getItem('theme')
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved)
  }
}
```

---

## 6. Anatomie d'un composant

### Approche DaisyUI : classes custom + @apply Tailwind

```css
/* src/styles/components/button.css */

@layer components {
  
  /* 1. Classe de base */
  .btn {
    /* Variables locales (surchargeables par variantes) */
    --_btn-bg: var(--color-base-200);
    --_btn-fg: var(--color-base-content);
    --_btn-border: var(--color-base-300);
    
    /* Utiliser @apply pour les utilitaires Tailwind */
    @apply inline-flex items-center justify-center gap-2;
    @apply px-4 py-2 text-sm font-medium;
    @apply rounded-field;
    @apply cursor-pointer select-none;
    @apply transition-all duration-150;
    
    /* Propriétés avec variables */
    background-color: var(--_btn-bg);
    color: var(--_btn-fg);
    border: 1px solid var(--_btn-border);
  }
  
  /* 2. États interactifs */
  .btn:hover {
    @apply brightness-95;
  }
  
  .btn:active {
    @apply scale-[0.98];
  }
  
  .btn:focus-visible {
    @apply outline-2 outline-offset-2 outline-primary;
  }
  
  .btn:disabled {
    @apply opacity-50 cursor-not-allowed pointer-events-none;
  }
  
  /* 3. Variantes de couleur */
  .btn-primary {
    --_btn-bg: var(--color-primary);
    --_btn-fg: var(--color-primary-content);
    --_btn-border: var(--color-primary);
  }
  
  .btn-secondary {
    --_btn-bg: var(--color-secondary);
    --_btn-fg: var(--color-secondary-content);
    --_btn-border: var(--color-secondary);
  }
  
  .btn-success {
    --_btn-bg: var(--color-success);
    --_btn-fg: var(--color-success-content);
    --_btn-border: var(--color-success);
  }
  
  .btn-error {
    --_btn-bg: var(--color-error);
    --_btn-fg: var(--color-error-content);
    --_btn-border: var(--color-error);
  }
  
  /* 4. Variante outline */
  .btn-outline {
    --_btn-bg: transparent;
    --_btn-fg: var(--color-base-content);
  }
  
  .btn-outline.btn-primary {
    --_btn-fg: var(--color-primary);
    --_btn-border: var(--color-primary);
  }
  
  .btn-outline.btn-primary:hover {
    --_btn-bg: var(--color-primary);
    --_btn-fg: var(--color-primary-content);
  }
  
  /* 5. Variantes de taille */
  .btn-xs {
    @apply px-2 py-1 text-xs;
  }
  
  .btn-sm {
    @apply px-3 py-1.5 text-sm;
  }
  
  .btn-lg {
    @apply px-6 py-3 text-lg;
  }
  
  /* 6. Modificateurs */
  .btn-block {
    @apply w-full;
  }
  
  .btn-circle {
    @apply aspect-square rounded-full p-2;
  }
}
```

---

## 7. Autres exemples de composants

### Card

```css
/* src/styles/components/card.css */

@layer components {
  .card {
    --_card-bg: var(--color-base-100);
    --_card-border: var(--color-base-300);
    
    @apply rounded-box overflow-hidden;
    
    background-color: var(--_card-bg);
    border: 1px solid var(--_card-border);
  }
  
  .card-body {
    @apply p-6;
  }
  
  .card-title {
    @apply text-lg font-semibold mb-2;
  }
  
  .card-actions {
    @apply flex gap-2 mt-4;
  }
  
  .card-compact .card-body {
    @apply p-4;
  }
}
```

### Input

```css
/* src/styles/components/input.css */

@layer components {
  .input {
    --_input-border: var(--color-base-300);
    
    @apply w-full px-4 py-2;
    @apply text-base rounded-field;
    @apply transition-colors duration-150;
    
    background-color: var(--color-base-100);
    color: var(--color-base-content);
    border: 1px solid var(--_input-border);
  }
  
  .input:focus {
    @apply outline-none ring-2 ring-primary/30;
    border-color: var(--color-primary);
  }
  
  .input:disabled {
    @apply cursor-not-allowed;
    background-color: var(--color-base-200);
  }
  
  .input-error {
    --_input-border: var(--color-error);
  }
  
  .input-success {
    --_input-border: var(--color-success);
  }
  
  .input-sm {
    @apply px-3 py-1.5 text-sm;
  }
  
  .input-lg {
    @apply px-5 py-3 text-lg;
  }
}
```

### Badge

```css
/* src/styles/components/badge.css */

@layer components {
  .badge {
    --_badge-bg: var(--color-base-200);
    --_badge-fg: var(--color-base-content);
    
    @apply inline-flex items-center gap-1;
    @apply px-2 py-0.5 text-xs font-medium;
    @apply rounded-full;
    
    background-color: var(--_badge-bg);
    color: var(--_badge-fg);
  }
  
  .badge-primary {
    --_badge-bg: var(--color-primary);
    --_badge-fg: var(--color-primary-content);
  }
  
  .badge-success {
    --_badge-bg: var(--color-success);
    --_badge-fg: var(--color-success-content);
  }
  
  .badge-warning {
    --_badge-bg: var(--color-warning);
    --_badge-fg: var(--color-warning-content);
  }
  
  .badge-error {
    --_badge-bg: var(--color-error);
    --_badge-fg: var(--color-error-content);
  }
}
```

---

## 8. Utilisation mixte : classes custom + utilitaires Tailwind

L'avantage de cette approche : vous pouvez combiner vos composants avec les utilitaires Tailwind.

```html
<!DOCTYPE html>
<html lang="fr" data-theme="light">
<head>
  <link rel="stylesheet" href="./app.css">
</head>
<body class="bg-base-100 text-base-content min-h-screen">
  
  <main class="container mx-auto p-8">
    
    <!-- Composants custom -->
    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-outline btn-error">Outline Error</button>
    
    <!-- Composant + utilitaires Tailwind pour ajustements -->
    <button class="btn btn-primary mt-4 shadow-lg">
      Avec ombre
    </button>
    
    <!-- Card avec utilitaires -->
    <div class="card mt-8 shadow-md hover:shadow-lg transition-shadow">
      <div class="card-body">
        <h2 class="card-title">Titre</h2>
        <p class="text-base-content/70">Description avec opacité Tailwind.</p>
        <div class="card-actions justify-end">
          <button class="btn btn-sm">Annuler</button>
          <button class="btn btn-primary btn-sm">Confirmer</button>
        </div>
      </div>
    </div>
    
    <!-- Formulaire -->
    <form class="mt-8 space-y-4 max-w-md">
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input type="email" class="input" placeholder="email@exemple.com">
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Message</label>
        <input type="text" class="input input-error" placeholder="Erreur...">
        <p class="text-error text-sm mt-1">Ce champ est requis</p>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Envoyer</button>
    </form>
    
    <!-- Badges -->
    <div class="flex gap-2 mt-8">
      <span class="badge">Défaut</span>
      <span class="badge badge-primary">Primary</span>
      <span class="badge badge-success">Succès</span>
      <span class="badge badge-error">Erreur</span>
    </div>
    
  </main>
  
  <script>
    // Theme toggle
    function toggleTheme() {
      const html = document.documentElement
      const current = html.getAttribute('data-theme')
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark')
    }
  </script>
</body>
</html>
```

---

## 9. Résumé : les @layer Tailwind

| Layer | Usage | Priorité |
|-------|-------|----------|
| `@layer base` | Reset, variables CSS, styles par défaut des éléments | Basse |
| `@layer components` | Classes de composants (.btn, .card, .input) | Moyenne |
| `@layer utilities` | Classes utilitaires custom | Haute |

Les utilitaires Tailwind (`mt-4`, `flex`, etc.) ont toujours priorité sur vos composants, ce qui permet de les surcharger facilement.

---

## 10. Checklist d'implémentation

### Étape 1 : Setup
- [ ] Installer Tailwind CSS
- [ ] Configurer `tailwind.config.js` avec les couleurs sémantiques
- [ ] Créer la structure de dossiers

### Étape 2 : Fondations
- [ ] Définir les variables CSS dans `@layer base`
- [ ] Créer les thèmes light/dark
- [ ] Tester le toggle de thème

### Étape 3 : Composants
- [ ] Button (base + variantes couleur/taille)
- [ ] Input (base + états validation)
- [ ] Card (base + sous-éléments)
- [ ] Badge

### Étape 4 : Intégration
- [ ] Vérifier que les utilitaires Tailwind fonctionnent avec vos composants
- [ ] Tester le responsive
- [ ] Valider les deux thèmes

---

## 11. Bonnes pratiques

1. **`@layer components`** pour tous vos composants
2. **Variables CSS locales** (`--_`) pour les valeurs surchargeables
3. **`@apply`** pour réutiliser les utilitaires Tailwind
4. **Couleurs via variables** pour supporter les thèmes
5. **Pas de valeurs en dur** : tout passe par les design tokens
6. **Combinaison possible** : composant + utilitaires Tailwind dans le HTML

---

*Basé sur l'architecture de DaisyUI v5 + Tailwind CSS 4*
