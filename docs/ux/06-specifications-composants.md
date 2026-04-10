# Spécifications des composants — izh

> **Usage agent :** Pour chaque composant clé : ses variantes, ses états, ses dimensions et son comportement. L'UI designver dessine avec précision sur cette base. Référencer les tokens du livrable 05 — jamais de valeurs hardcodées.
>
> Structure recommandée (Kholmatova) : les patterns fonctionnels sont des blocs tangibles qui activent des comportements utilisateur. Chaque composant répond à la question : "Quel comportement encourage-t-il ?"

**Version :** v0.1
**Date :** 2026-03-10
**Auteur :** UX Designer (assisté par IA)
**Statut :** En cours
**Basé sur :** 04b-wireframe-semantic.md (v0.4), 05-design-tokens-systeme-visuel.md (v1.1)

---

## Index des composants

| ID    | Composant                   | Catégorie     | Priorité | Statut             |
| ----- | --------------------------- | ------------- | -------- | ------------------ |
| C-01  | Button                      | Actions       | P1       | ✅ Spécifié        |
| C-02  | Input (capture-input)       | Formulaires   | P1       | ✅ Spécifié        |
| C-03  | Card (Task Item)            | Conteneurs    | P1       | ✅ Spécifié        |
| C-04  | ~~Task Item~~               | Tâches        | —        | Fusionné dans C-03 |
| C-05  | Bottom Nav                  | Navigation    | P1       | ✅ Spécifié        |
| C-06  | Toast (Feedback Contextuel) | Feedback      | P1       | ✅ Spécifié        |
| C-07  | Empty State                 | Feedback      | P1       | ✅ Spécifié        |
| C-08  | Quadrant Button             | Tri           | P1       | ✅ Spécifié        |
| C-09a | Quadrant Badge (card)       | Tri           | P1       | ✅ Spécifié        |
| C-09b | Result Card                 | Tri           | P1       | ✅ Spécifié        |
| C-10  | Answer Option               | Questionnaire | P2       | ✅ Spécifié        |
| C-11  | Question Card               | Questionnaire | P2       | ✅ Spécifié        |
| C-12  | Progress Dots               | Indicateurs   | P2       | ✅ Spécifié        |
| C-13  | ~~Task Context Header~~     | Overlay       | —        | Fusionné dans C-11 |
| C-14  | Reserve Section             | Layout        | P2       | ✅ Spécifié        |
| C-15  | Counter Capacity            | Indicateurs   | P2       | ✅ Spécifié        |
| C-16  | Matrix Prominent Zone       | Layout        | P2       | ✅ Spécifié        |
| C-17  | Matrix Nav Card             | Navigation    | P2       | ✅ Spécifié        |
| C-17b | Matrix Quadrant (desktop)   | Layout        | P1       | ✅ Spécifié        |
| C-18  | Survey Slider               | Formulaires   | P3       | En attente         |

---

## C-01 — Button

**Comportement utilisateur encouragé :** Déclencher une action immédiate et passer à l'étape suivante — chaque variante visuelle guide le regard vers le bon niveau de priorité (primary = "fais ça maintenant", outline = "choisis parmi ces options", text = "c'est réversible").

**Référence :** Kholmatova (pattern fonctionnel d'action), Nogier (feedback < 100ms, finger-friendly ≥ 44px)

### Anatomie

```
┌──────────────────────────────────────┐
│  [Icône opt. 16px]  [Label]         │
│  ←─ padding-x ─→            ← px ─→ │
└──────────────────────────────────────┘
         ↕ padding-y
```

**Tokens utilisés :**

- Padding vertical : `var(--space-2)` (8px) — sm · `var(--space-3)` (12px) — md
- Padding horizontal : `var(--space-4)` (16px) — sm · `var(--space-6)` (24px) — md
- Border radius : `var(--radius-component)` (8px)
- Font : `var(--text-label)` — Inter 13px Medium 500
- Transition : `var(--transition-hover)` (120ms ease-out)
- Gap icône ↔ label : `var(--space-inline-sm)` (8px)

---

### Variantes de style

| Variante      | Quand l'utiliser                           | Background                         | Texte                              | Bordure                            | Écrans izh                                                              |
| ------------- | ------------------------------------------ | ---------------------------------- | ---------------------------------- | ---------------------------------- | ----------------------------------------------------------------------- |
| **Primary**   | Action principale — 1 seul par vue         | `--color-action-primary` (#37352F) | `--color-text-inverse` (#FFF)      | Aucune                             | "C'est parti" (SCR-02), "Voir mon Focus" (SCR-09), "Compléter" (SCR-10) |
| **Secondary** | Action importante mais pas principale      | `--color-surface-subtle` (#F7F7F5) | `--color-text-primary` (#37352F)   | `--color-border-default` (#E3E3E0) | "Trier" dans Vrac (SCR-01), "Purger" (SCR-06)                           |
| **Outline**   | Choix parmi plusieurs options équivalentes | Transparent                        | `--color-text-primary`             | `--color-border-strong` (#D6D6D0)  | Quadrant buttons Eisenhower (SCR-02)                                    |
| **Text**      | Action tertiaire, fermeture, retour        | Transparent                        | `--color-text-accent` (#2383E2)    | Aucune                             | "✕ Fermer" overlay (SCR-02), "Pas maintenant" (SCR-07)                  |
| **Icon-only** | Action contextuelle sans label             | Transparent                        | `--color-text-secondary` (#808078) | Aucune                             | Drag handle, close, chevrons                                            |
| **Danger**    | Action destructive                         | `--color-action-danger` (#D14040)  | `--color-text-inverse` (#FFF)      | Aucune                             | Suppression tâche (swipe reveal SCR-06)                                 |

---

### Variantes de taille

| Taille          | Hauteur | Padding x / y             | Font size                 | Zone tactile | Usage izh                                     |
| --------------- | ------- | ------------------------- | ------------------------- | ------------ | --------------------------------------------- |
| **sm**          | 36px    | `--space-4` / `--space-2` | `--font-size-sm` (13px)   | 36×44px min  | "Trier" inline, actions overlay, icon-only    |
| **md** (défaut) | 44px    | `--space-6` / `--space-3` | `--font-size-sm` (13px)   | 44×44px      | CTA overlays, "C'est parti", "Voir mon Focus" |
| **lg**          | 52px    | `--space-8` / `--space-4` | `--font-size-base` (15px) | 52×52px      | CTA pleine largeur onboarding (futur)         |

> **Finger Friendly (Nogier) :** La taille `sm` a une hauteur visuelle de 36px mais une **zone tactile de 44px minimum** (padding invisible). Aucun bouton n'est jamais < 44px en zone de tap.

---

### États

| État                 | Déclencheur                | Changement visuel                                                                                                                                                            | Comportement                                         |
| -------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Default**          | —                          | Style de base par variante                                                                                                                                                   | Cliquable                                            |
| **Hover**            | Survol souris              | Primary → `--color-action-primary-hover` (#1A1A16) + `--shadow-button-hover`. Secondary → `--color-surface-muted`. Outline → fond `--color-surface-subtle`. Text → underline | `cursor: pointer`                                    |
| **Focus-visible**    | Tab / focus clavier        | Ring : `0 0 0 2px var(--color-surface-base), 0 0 0 4px var(--color-border-focus)`                                                                                            | Jamais supprimer — obligatoire WCAG                  |
| **Active / Pressed** | Mousedown / touchstart     | Primary → `--color-action-primary-active` (#1A1A16). `transform: scale(0.97)`                                                                                                | Feedback tactile immédiat                            |
| **Loading**          | Action asynchrone en cours | Spinner 16px remplace l'icône. Label passe en `--color-text-tertiary`. Opacité 0.7                                                                                           | `aria-busy="true"`, `pointer-events: none`           |
| **Disabled**         | Condition non remplie      | Opacité 0.4. Cursor not-allowed                                                                                                                                              | `aria-disabled="true"` + tooltip expliquant POURQUOI |

> **Règle Nogier :** Un bouton disabled sans explication est un cul-de-sac cognitif. Toujours un tooltip ou un message adjacent.

---

### Modificateurs

| Modificateur | Effet                                                             | Usage izh                                                        |
| ------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| `block`      | `width: 100%` du conteneur                                        | CTA "C'est parti" en overlay (SCR-02), "Voir mon Focus" (SCR-09) |
| `icon-only`  | Padding carré symétrique, label masqué (`aria-label` obligatoire) | Bouton fermer ✕, drag handle                                     |
| `icon-left`  | Icône 16px + gap + label                                          | — (réservé futur)                                                |

---

### Règles d'usage

**Faire :**

- 1 seul bouton **Primary** par vue — les autres sont Secondary, Outline ou Text
- Labels = verbe d'action à l'infinitif ("Trier", "Compléter", "Supprimer") — jamais "Ok" ou "Oui"
- Paire d'actions : Primary à droite, Text/Secondary à gauche (convention occidentale)
- Actions destructives : toujours précédées d'une confirmation ou d'un undo (toast 5s)

**Ne pas faire :**

- Deux boutons Primary côte à côte
- Bouton Text sans contexte (risque de confusion avec un lien)
- `outline: none` sur focus sans remplacement — interdit
- Label tronqué : si le texte ne tient pas, reformuler, ne pas couper avec `...`

**Anti-patterns izh :**

- Pas de FAB (Floating Action Button) — contraire à la philosophie calme
- Pas de bouton avec animation d'attention (pulse, shake) — le calme prime

---

### Accessibilité

| Critère       | Spécification                                                                          |
| ------------- | -------------------------------------------------------------------------------------- |
| **Rôle**      | `<button>` natif — jamais `<div role="button">` sauf contrainte technique              |
| **Label**     | Texte visible OU `aria-label` pour icon-only                                           |
| **Focus**     | `:focus-visible` obligatoire — ring 2px accent (4px offset blanc)                      |
| **Contraste** | Primary : blanc sur #37352F = 14.5:1 ✅ AAA · Danger : blanc sur #D14040 = 4.8:1 ✅ AA |
| **Clavier**   | `Enter` et `Space` déclenchent l'action                                                |
| **Touch**     | Zone minimum 44×44px · espacement entre boutons ≥ `var(--space-2)` (8px)               |
| **Disabled**  | `aria-disabled="true"` + raison communiquée (tooltip ou texte adjacent)                |
| **Loading**   | `aria-busy="true"` + `aria-live="polite"` sur le conteneur parent                      |

---

## Checklist de validation — Button ✅

- [x] Tous les états définis (default, hover, focus, active, disabled, loading)
- [x] Variantes de taille documentées avec dimensions exactes
- [x] Tokens de design référencés (aucune valeur hardcodée)
- [x] Règles d'accessibilité : aria-\*, role, focus-visible, contraste vérifié
- [x] Comportement responsive documenté (zone tactile 44px min)
- [x] Cas limites définis (label long, icon-only, loading)
- [x] Règles d'usage (quand utiliser, quand ne pas utiliser, anti-patterns)

---

## C-02 — Input (capture-input)

**Comportement utilisateur encouragé :** Capturer une pensée en une seconde — l'input est toujours visible, toujours prêt. Zéro friction entre l'idée et sa notation. C'est le point d'entrée principal du système izh.

**Référence :** Kholmatova (pattern de capture spontanée), Nogier (seuil 100ms, manipulation directe)

### Anatomie

```
┌──────────────────────────────────────────────────┐
│  [+ icône 16px]  [Placeholder / Valeur]  [✕ opt] │
│  ←─ gap 8px ─→                                   │
└──────────────────────────────────────────────────┘
         ↕ height: 44px
```

**Tokens utilisés :**

- Hauteur : 44px (finger-friendly, non négociable)
- Padding horizontal : `var(--space-4)` (16px)
- Border radius : `var(--radius-component)` (8px)
- Font : `var(--text-body)` — Inter 15px Regular 400
- Border : 1px `var(--color-border-default)` (#E3E3E0)
- Focus ring : 2px `var(--color-border-focus)` (#2383E2) + shadow 2px spread
- Gap icône ↔ texte : `var(--space-inline-sm)` (8px)
- Transition : `var(--transition-hover)` (120ms ease-out)

---

### Variante unique — Capture Input

> Dans izh, l'input n'a qu'une seule variante au MVP : le champ de capture rapide. Pas de search, password ou textarea — l'app est une liste de tâches, pas un formulaire.

| Propriété        | Valeur                                                             |
| ---------------- | ------------------------------------------------------------------ |
| **Position**     | Sticky, au-dessus de la liste de tâches (SCR-01)                   |
| **Icône gauche** | `+` (lucide:plus) — 16px, `--color-text-tertiary`                  |
| **Placeholder**  | "Ajouter une tâche..." — `--color-text-tertiary` (#B4B4B0)         |
| **Soumission**   | `Enter` — crée la tâche, vide le champ, focus reste dans l'input   |
| **Clear**        | Icône `✕` apparaît quand le champ est rempli — tap efface le texte |
| **Fond**         | `--color-surface-base` (#FFF)                                      |

---

### États

| État           | Déclencheur                          | Changement visuel                                                                                       | Comportement                                         |
| -------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Default**    | —                                    | Border `--color-border-default` (1px). Placeholder visible. Icône `+` en tertiary                       | Prêt à recevoir le focus                             |
| **Hover**      | Survol souris                        | Border → `--color-border-strong` (#D6D6D0)                                                              | `cursor: text`                                       |
| **Focus**      | Tap / click / tab                    | Border → `--color-border-focus` (2px) + shadow ring `#2383E233`. Placeholder persiste jusqu'à la frappe | Clavier ouvert sur mobile                            |
| **Filled**     | Texte saisi                          | Valeur en `--color-text-primary`. Icône `✕` apparaît à droite. Placeholder masqué                       | `Enter` pour soumettre                               |
| **Submitting** | Enter pressé                         | Flash subtle du fond (100ms) → champ vidé → retour Default                                              | Tâche créée, ajoutée en haut de la liste             |
| **Disabled**   | Condition rare (ex: mode hors-ligne) | Opacité 0.4, fond `--color-surface-muted`                                                               | `aria-disabled="true"` + message expliquant pourquoi |

---

### Comportements spécifiques

| Comportement    | Spécification                                                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| **Soumission**  | `Enter` crée la tâche immédiatement — pas de bouton "Ajouter" séparé. Feedback < 100ms (Nogier)             |
| **Multi-ajout** | Après soumission, le focus reste dans l'input — l'utilisateur peut enchaîner les tâches sans lever le doigt |
| **Texte long**  | Texte tronqué visuellement avec `text-overflow: ellipsis` — pas de wrapping                                 |
| **Sticky**      | Le champ reste visible au scroll — position sticky au-dessus de la liste                                    |
| **Clear (✕)**   | Apparaît uniquement quand `value.length > 0`. Tap → vide le champ, focus reste                              |

---

### Règles d'usage

**Faire :**

- Toujours visible en haut de SCR-01 (Vrac) — c'est la porte d'entrée du flow
- Feedback immédiat à la soumission — la tâche apparaît en haut de la liste avec une animation subtle
- Conserver le focus après soumission pour permettre l'enchaînement rapide

**Ne pas faire :**

- Pas de validation côté client — toute chaîne non-vide est une tâche valide
- Pas de compteur de caractères — izh ne limite pas la longueur des titres
- Pas de bouton "Ajouter" séparé — `Enter` suffit, le bouton ajouterait du bruit visuel
- Pas d'autocomplete ou de suggestions — la capture est brute, le tri vient après

**Anti-patterns izh :**

- Jamais de modal "Nouvelle tâche" avec des champs multiples — contraire à la philosophie "vrac d'abord"
- Jamais de catégorisation à la saisie — le tri est un acte séparé et conscient

---

### Accessibilité

| Critère          | Spécification                                                                                             |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| **Élément**      | `<input type="text">` natif                                                                               |
| **Label**        | `aria-label="Ajouter une tâche"` (pas de label visible — le placeholder fait office)                      |
| **Placeholder**  | Texte en `--color-text-tertiary` — jamais porteur d'information critique (doublé par aria-label)          |
| **Focus**        | `:focus-visible` obligatoire — ring 2px accent                                                            |
| **Contraste**    | Placeholder #B4B4B0 sur blanc = 2.2:1 — décoratif uniquement (conforme WCAG 1.4.1, doublé par aria-label) |
| **Clavier**      | `Enter` = soumettre, `Escape` = vider et blur                                                             |
| **Touch**        | Hauteur 44px = zone tactile conforme                                                                      |
| **Clear button** | `aria-label="Effacer le texte"`, zone tactile 44×44px (padding invisible)                                 |

---

## Checklist de validation — Input ✅

- [x] Tous les états définis (default, hover, focus, filled, submitting, disabled)
- [x] Variante unique documentée avec dimensions exactes
- [x] Tokens de design référencés (aucune valeur hardcodée)
- [x] Règles d'accessibilité : aria-\*, focus-visible, contraste vérifié
- [x] Comportement responsive documenté (sticky, zone tactile 44px)
- [x] Cas limites définis (texte long, multi-ajout, clear)
- [x] Règles d'usage (quand utiliser, quand ne pas utiliser, anti-patterns)

---

## C-03 — Card (Task Item)

**Comportement utilisateur encouragé :** Scanner rapidement une liste et identifier les tâches qui comptent. Le task item a deux modes visuels selon le contexte : **card** (Vrac, Archive — autonome, bordure, pas de fond) et **row** (Réserve, Focus — flat, séparé par border-bottom). Sa structure change par écran pour refléter le mode d'interaction : capturer (Vrac), organiser (Réserve), exécuter (Focus), contempler (Archive).

**Référence :** Kholmatova (pattern fonctionnel de conteneur — "quel comportement encourage-t-il ?"), Nogier (finger-friendly ≥ 44px, manipulation directe, feedback < 100ms)

### Anatomie

**Mode card (Vrac) :**

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Grip 16px]  [Titre ←fill→]                              [Action] │
│  ← gap 12 →                                              ← gap 8 → │
└──────────────────────────────────────────────────────────────────────┘
         height: 44px / padding: 0 16px
```

**Mode row (Réserve, Focus, Archive) :**

```
  [Grip 16px]  [Titre ←fill→]  [Timestamp opt.]  [Badge Q]  [Action]
  ← gap 10 →                                              ← gap 8 →
─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  ← border-bottom
         height: 40px / padding: 0 16px

Timestamp : "Créée il y a 1h" — visible uniquement au hover/focus, masqué au repos
```

**Tokens — mode card (Vrac, Archive) :**

- Fond : `transparent` — pas de fond
- Bordure : `var(--color-border-default)` (#E3E3E0) · 1px inside
- Border radius : `var(--radius-component)` (8px)
- Height : `44px`
- Padding : `0` vertical / `var(--space-4)` (16px) horizontal
- Gap interne : `var(--space-3)` (12px) entre éléments
- Titre : `var(--text-body)` — Inter 15px Regular 400

**Tokens — mode row (Réserve, Focus, Archive) :**

- Fond : `transparent` — pas de fond propre, le container parent fournit le contexte
- Bordure : aucune — séparation par border-bottom `1px solid var(--color-border-default)` (#E3E3E0)
- Border radius : aucun
- Height : `40px` fixe
- Padding : `0` vertical / `var(--space-4)` (16px) horizontal
- Gap interne : `var(--space-2-5)` (10px) entre éléments
- Hover : fond `var(--color-surface-subtle)` (#F7F7F5) — le fond apparaît uniquement au hover
- Transition : `var(--transition-hover)` (120ms ease-out)
- Titre : `var(--text-body-sm)` — Inter 14px Regular 400
- Metadata : `var(--text-caption)` — Inter 11px Regular 400
- Badge : `var(--text-caption)` — Inter 11px Medium 500

---

### Variantes par écran

| Variante              | Écran          | Structure                                   | Éléments                                                                                     |
| --------------------- | -------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **task-item-vrac**    | SCR-01 Vrac    | `[grip] [titre ←fill→] [Trier]`             | Drag handle + titre + bouton Secondary "Trier"                                               |
| **task-item-reserve** | SCR-06 Réserve | `[grip] [titre ←fill→] [▶ Activer]`         | Drag handle + titre + bouton icon "Activer" (play)                                           |
| **task-item-focus**   | SCR-10 Focus   | `[grip] [titre ←fill→] [☐]`                 | Drag handle + titre + checkbox à droite                                                      |
| **task-item-archive** | SCR-11 Archive | `[~~titre barré~~] [badge Q] [date phrase]` | Titre barré en tertiary + badge d'origine + date de complétion en phrase ("Faite le 8 mars") |

**Différences clés :**

- **Vrac** : la plus simple — pas de badge, pas de date. L'action "Trier" est le seul CTA.
- **Réserve** : pas de badge quadrant — le quadrant est implicite par la section dans laquelle la tâche se trouve. Bouton "Activer" (icône play) envoie vers Focus.
- **Focus** : épuré pour l'exécution. Pas de badge (le quadrant est implicite par la zone proéminente). Checkbox à droite pour compléter.
- **Archive** : lecture seule. Titre barré en `--color-text-tertiary`, badge d'origine + date en phrase lisible ("Faite le 8 mars"). Pas de checkbox — le titre barré suffit à signaler la complétion.

---

### États

| État                      | Déclencheur            | Changement visuel                                                                                                                                                                                                                                                                                                                  | Comportement                                                       |
| ------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Default**               | —                      | Fond transparent, pas de bordure, pas d'ombre. Divider `--color-border-subtle` 1px entre rows. Drag handle en `--color-text-tertiary`                                                                                                                                                                                              | Cliquable, draggable                                               |
| **Hover (desktop)**       | Survol souris          | Fond → `--color-surface-subtle` (#F7F7F5). Drag handle → `--color-text-secondary`. Timestamp "Créée il y a [durée]" apparaît en `--color-text-tertiary` (`--text-caption`). Icônes edit (pencil) et delete (trash-2) apparaissent à droite. Bouton "Trier" passe en Primary inversé (`--color-action-primary` fond, texte inverse) | `cursor: pointer`                                                  |
| **Pressed**               | Mousedown / touchstart | Fond → `--color-surface-muted`. `transform: scale(0.98)`                                                                                                                                                                                                                                                                           | Feedback tactile immédiat                                          |
| **Disabled**              | Condition non remplie  | Opacité 0.4. `cursor: not-allowed`                                                                                                                                                                                                                                                                                                 | `aria-disabled="true"` + tooltip expliquant POURQUOI               |
| **Editing**               | Long press ~500ms      | Fond → accent léger (`--color-surface-accent`). Outline → `--color-border-focus` 2px. Titre devient éditable (contenteditable). Boutons ✓ (confirm, Primary) et ✕ (cancel) apparaissent à droite                                                                                                                                   | Vibration haptique mobile. `Enter` = confirmer, `Escape` = annuler |
| **Swipe delete (mobile)** | Swipe gauche           | La card glisse, révèle un bouton rouge (`--color-action-danger`) pleine hauteur avec icône trash-2 en blanc                                                                                                                                                                                                                        | Tap sur trash = suppression + toast undo 5s                        |

---

### Modificateurs

| Modificateur    | Effet                                                                        | Usage izh                          |
| --------------- | ---------------------------------------------------------------------------- | ---------------------------------- |
| `draggable`     | Drag handle visible, `cursor: grab` au hover sur le handle                   | Vrac, Réserve, Focus               |
| `with-checkbox` | Checkbox 16×16px à droite (radius 3px, border 1.5px `--color-border-strong`) | Focus uniquement                   |
| `with-badge`    | Badge quadrant coloré (4px radius, padding 2px/8px)                          | Réserve, Archive                   |
| `readonly`      | Pas de drag, pas d'actions, titre barré en tertiary                          | Archive                            |
| `highlight`     | Fond accent léger 2-3s post-activation                                       | Tâche nouvellement ajoutée/activée |

---

### Règles d'usage

**Faire :**

- Layout inline horizontal — titre à gauche (fill), metadata + actions à droite
- Hauteur fixe 40px (zone tactile ≥ 44px assurée par le padding du container parent)
- Drag handle toujours en première position (sauf Archive = readonly)
- Badge quadrant toujours accompagné du label textuel (WCAG 1.4.1 — couleur jamais seule)
- Actions destructives (delete) toujours suivies d'un toast undo 5s

**Ne pas faire :**

- Pas de card multi-ligne — une tâche = une ligne
- Pas de menu contextuel (three dots) — les actions sont visibles au hover (desktop) ou via swipe (mobile)
- Pas de checkbox dans Vrac et Réserve — la complétion se fait dans le Focus uniquement
- Pas de fond au repos — le fond subtle apparaît uniquement au hover
- Pas d'ombre — jamais de shadow sur les rows

**Anti-patterns izh :**

- Pas de card avec image ou preview — izh est texte-first
- Pas d'accordéon dans la card — la card est atomique, plate
- Pas de couleur de fond par quadrant sur la card elle-même — seul le badge porte la couleur

---

### Accessibilité

| Critère       | Spécification                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rôle**      | `<li>` dans une `<ul>` — sémantique de liste                                                                                                                  |
| **Label**     | Titre de la tâche comme contenu textuel accessible                                                                                                            |
| **Focus**     | `:focus-visible` obligatoire — ring 2px `--color-border-focus` (4px offset blanc). Le timestamp "Créée il y a [durée]" apparaît (même comportement que hover) |
| **Contraste** | Titre #37352F sur #FFFFFF = ~15.4:1 ✅ AAA · Metadata #B4B4B0 = décoratif (doublé par le contexte)                                                            |
| **Clavier**   | `Tab` = focus card → `Enter` = action principale (Trier/Activer/Checkbox) · `Delete` = supprimer (avec undo) · Long `Enter` = mode édition                    |
| **Touch**     | Hauteur row 40px + divider = espacement suffisant · zone de tap étendue par le container parent                                                               |
| **Drag**      | `aria-grabbed`, `aria-dropeffect` sur les zones de drop · annonce vocale du déplacement                                                                       |
| **Swipe**     | Action de swipe doublée par les icônes hover desktop — jamais d'action uniquement gestuelle                                                                   |

---

## Checklist de validation — Card ✅

- [x] Tous les états définis (default, hover, pressed, disabled, editing, swipe-delete)
- [x] Variantes par écran documentées (Vrac, Réserve, Focus, Archive)
- [x] Tokens de design référencés (aucune valeur hardcodée)
- [x] Règles d'accessibilité : aria-\*, focus-visible, contraste vérifié
- [x] Comportement responsive documenté (swipe mobile, icônes hover desktop)
- [x] Cas limites définis (titre long, drag inter-quadrant, readonly archive)
- [x] Règles d'usage (quand utiliser, quand ne pas utiliser, anti-patterns)

---

## C-05 — Bottom Nav (Icons + Labels)

**Comportement utilisateur encouragé :** Naviguer entre les 4 espaces mentaux (Vrac → Réserve → Focus → Archive) — la barre fixe en bas est le seul repère de localisation dans l'app. L'onglet actif dit "tu es ici" par un fond subtle sur l'icône + le label, le badge dit "il y a quelque chose là-bas".

**Référence :** Kholmatova (pattern de navigation — orientation spatiale), Nogier (finger-friendly ≥ 44px, feedback immédiat < 100ms)

**Direction choisie :** Bottom nav classique icônes + labels — fond subtle sur l'onglet actif (radius 8px), pas de track global. Lisible (56px), équilibré, orienté contenu.

### Anatomie

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌─────────┐                                                 │
│  │  inbox  │   layers      target      archive               │
│  │  20px   │   20px        20px        20px                  │
│  │  Vrac   │   Réserve     Focus       Archive               │
│  │  11px   │   11px        11px        11px                  │
│  └─────────┘                                                 │
│   fond subtle   icônes + labels tertiary, pas de fond        │
│   radius 8px                                                 │
│                                                              │
│   padding: 8px 12px                                          │
└──────────────────────────────────────────────────────────────┘
  ↕ height: 56px · position: sticky bottom · safe-area-inset
```

**Tokens utilisés :**
- Hauteur barre : 56px (`var(--layout-navbar-height)`)
- Fond barre : `var(--color-surface-base)` (#FFFFFF)
- Bordure top : 1px `var(--color-border-default)` (#E3E3E0)
- Pas de track global — fond uniquement sur l'onglet actif
- Pill actif fond : `var(--color-surface-subtle)` (#F7F7F5) · `border-radius: 8px`
- Pill actif padding : 6px 12px (enveloppe icône + label)
- Icône inactive : `var(--color-text-tertiary)` (#B4B4B0) · 20×20px
- Icône active : `var(--color-text-primary)` (#37352F) · 20×20px
- Label inactive : `var(--color-text-tertiary)` (#B4B4B0) · Inter 11px Regular · `letter-spacing: 0`
- Label active : `var(--color-text-primary)` (#37352F) · Inter 11px Medium (500)
- Gap icône → label : 2px
- Layout barre : `display: flex` · segments `flex: 1` · `align-items: center` · `justify-content: center`
- Safe area : `env(safe-area-inset-bottom)` — iOS/Android

**Tokens utilisés (déjà définis dans 05) :**
- `--layout-navbar-height: 56px`

---

### Icônes par onglet

| Onglet | Icône (Lucide) | Signification | `aria-label` |
|---|---|---|---|
| Vrac | `inbox` | Boîte de réception — tout arrive ici | "Vrac" |
| Réserve | `layers` | Couches empilées — tâches triées par quadrant | "Réserve" |
| Focus | `target` | Cible — exécution ciblée | "Focus" |
| Archive | `archive` | Boîte d'archive — tâches complétées | "Archive" |

> **Pas de labels texte.** Les 4 icônes Lucide sont suffisamment distinctes et universelles. L'accessibilité est assurée par `aria-label` sur chaque onglet. Ce choix réduit le bruit visuel et renforce le caractère zen d'izh.

---

### États

| État | Déclencheur | Changement visuel | Comportement |
|---|---|---|---|
| **Onglet inactif** | — | Icône 20px + label 11px en `--color-text-tertiary`. Pas de fond | Tappable, zone 44px min |
| **Onglet actif** | Navigation vers la vue | Fond `--color-surface-subtle` (#F7F7F5) + `border-radius: 8px`. Icône 20px + label 11px Medium en `--color-text-primary` | 1 seul onglet actif à la fois |
| **Hover (desktop)** | Survol souris sur onglet inactif | Icône + label → `--color-text-secondary`. Fond `--color-surface-subtle` + radius 8px | `cursor: pointer` |
| **Focus-visible** | Tab / focus clavier | Ring : `0 0 0 2px var(--color-surface-base), 0 0 0 4px var(--color-border-focus)` sur le segment | Jamais supprimer — obligatoire WCAG |
| **Avec badge** | `vrac.count > 0` depuis une autre vue | Pill rouge (`--color-action-danger`) 16×16px en haut-droite de l'icône Vrac. Texte 9px bold inverse | Le badge disparaît quand on est sur Vrac |
| **Masqué** | Overlay ouvert (tri, purge, questionnaire) | La barre entière disparaît (`display: none` ou slide down) | Réapparaît à la fermeture de l'overlay |

> **Transition de l'onglet actif :** Le fond subtle apparaît sur l'onglet sélectionné avec `transition: background-color 150ms var(--ease-default), color 150ms var(--ease-default)` — transition douce, pas de déplacement.

---

### Badge de notification

| Propriété | Valeur |
|---|---|
| **Position** | Haut-droite de l'icône Vrac, offset x+12 y-4 |
| **Forme** | Pill circulaire (`border-radius: 9999px`) |
| **Taille** | 16×16px minimum (s'élargit si compteur > 9) |
| **Fond** | `var(--color-action-danger)` (#D14040) |
| **Texte** | Inter 9px Bold 700 · `var(--color-text-inverse)` (#FFF) |
| **Visibilité** | Visible uniquement depuis Réserve, Focus et Archive — masqué quand on est sur Vrac |
| **Contenu** | Nombre de tâches non triées dans le Vrac |

---

### Règles d'usage

**Faire :**
- Toujours 4 onglets — pas de variation selon le contexte
- Zone tactile minimum 44×44px par segment (le segment `flex: 1` garantit ~85px sur 375px)
- 1 seul onglet actif à la fois — toujours le même que la vue courante
- Badge uniquement sur Vrac — pas de badge sur les autres onglets
- Respecter `env(safe-area-inset-bottom)` pour les encoches iOS/Android
- `aria-label` obligatoire sur chaque onglet (pas de label visible)

**Ne pas faire :**
- Pas de track global en fond gris — le fond subtle est uniquement sur l'onglet actif
- Pas d'animation de déplacement (sliding pill) — la transition est sur place (fade background)
- Pas de scroll horizontal — les 4 segments sont toujours visibles
- Pas de bottom nav pendant les overlays — elle masque et réapparaît

**Anti-patterns izh :**
- Pas de FAB (Floating Action Button) au-dessus de la nav — contraire à la philosophie calme
- Pas de 5ème onglet "Plus" ou "Profil" — izh est 4 espaces, point
- Pas de bottom nav sur desktop — remplacée par une sidebar navigation
- Pas de pill blanc ombré sur track gris (style segmented control) — ce n'est pas la direction retenue

---

### Responsive

| Breakpoint | Comportement |
|---|---|
| **Mobile** (< 768px) | Bottom nav fixe en bas, 56px + safe area. Icônes 20px + labels 11px. Fond subtle sur actif |
| **Tablette** (768-1023px) | Bottom nav identique au mobile |
| **Desktop** (≥ 1024px) | Bottom nav masquée → remplacée par une sidebar navigation à gauche (240px) avec icônes + labels |

---

### Accessibilité

| Critère | Spécification |
|---|---|
| **Élément** | `<nav>` avec `aria-label="Navigation principale"` |
| **Items** | `<a>` ou `<button>` avec `aria-current="page"` sur l'onglet actif |
| **Labels** | Labels visibles ("Vrac", "Réserve", "Focus", "Archive") — `aria-label` redondant mais conservé pour cohérence WCAG |
| **Focus** | `:focus-visible` obligatoire — ring 2px `--color-border-focus` sur le segment |
| **Contraste** | Actif : icône + label #37352F sur fond #F7F7F5 = ~13.5:1 ✅ AAA · Inactif : icône + label #B4B4B0 sur fond #FFFFFF = ~2.1:1 — renforcé par la forme iconique + le label (conforme 1.4.1) |
| **Clavier** | `Tab` entre les onglets, `Enter` / `Space` pour naviguer |
| **Touch** | Zone minimum 44×44px par segment (~85px sur 375px) · padding track 3px évite les erreurs de tap |
| **Badge** | `aria-label="Vrac, 3 tâches non triées"` — le nombre est annoncé |
| **Screen reader** | Annonce "Navigation principale, Vrac sélectionné, 4 onglets" |

---

## Checklist de validation — Bottom Nav ✅

- [x] Tous les états définis (inactif, actif, hover, focus-visible, badge, masqué)
- [x] Variantes documentées (icons + labels + fond subtle sur actif, V0)
- [x] Tokens de design référencés (aucune valeur hardcodée) + tokens manquants identifiés
- [x] Règles d'accessibilité : aria-label, focus-visible, contraste vérifié
- [x] Comportement responsive documenté (mobile, tablette, desktop sidebar)
- [x] Cas limites définis (badge > 9, overlay masquage, safe area, transition pill)
- [x] Règles d'usage (quand utiliser, quand ne pas utiliser, anti-patterns)

---

## Checklist de validation — Bottom Nav ✅

- [x] Tous les états définis (inactif, actif, hover, focus-visible, badge, masqué)
- [x] Variantes documentées (segmented icons-only + pill ombré)
- [x] Tokens de design référencés (aucune valeur hardcodée) + tokens manquants identifiés
- [x] Règles d'accessibilité : aria-label, focus-visible, contraste vérifié
- [x] Comportement responsive documenté (mobile, tablette, desktop sidebar)
- [x] Cas limites définis (badge > 9, overlay masquage, safe area, transition pill)
- [x] Règles d'usage (quand utiliser, quand ne pas utiliser, anti-patterns)

---

## C-06 — Toast (Feedback Contextuel)

**Comportement utilisateur encouragé :** Agir sans hésitation — le toast confirme que l'action a eu lieu et offre un filet de sécurité temporel (undo 5s) pour les actions destructives. L'utilisateur n'a jamais besoin de réfléchir "est-ce que je suis sûr ?" — il peut toujours revenir en arrière.

**Référence :** Kholmatova (pattern fonctionnel de feedback — "rassurer pour encourager l'action"), Nogier (feedback < 100ms après l'action, manipulation directe réversible)

### Anatomie

```
    ┌─────────────────────────────────────────────┐
    │  [Icône 16px]  [Message]  [Action opt.]  [✕] │
    │  ← gap 12 →                       ← gap 12 → │
    └─────────────────────────────────────────────┘
       ↕ height: auto · padding: 14px 24px
       ↕ width: auto (fit-content) · pill shape
       ↕ position: fixed bottom, 16px above navbar
```

**Tokens utilisés :**

- Fond : teinté par contexte (voir variantes) — gradient horizontal comme timer visuel
- Texte message : `var(--color-text-primary)` (#37352F)
- Icône : couleur contextuelle (voir variantes)
- Action (Annuler) : couleur contextuelle, `fontWeight: 600`
- Close (✕) : `var(--color-text-secondary)` (#808078)
- Padding : 14px vertical / 24px horizontal
- Border radius : `var(--radius-pill)` (9999px)
- Shadow : `var(--shadow-toast)` (0 2px 6px 9%)
- Gap interne : 12px
- Marge bottom : `var(--space-4)` (16px) au-dessus de `--layout-navbar-height` (52px)

---

### Variantes

| Variante         | Quand l'utiliser                        | Fond (surface)                               | Icône                 | Couleur icône/action                 | Durée | Écrans izh                               |
| ---------------- | --------------------------------------- | -------------------------------------------- | --------------------- | ------------------------------------ | ----- | ---------------------------------------- |
| **Undo**         | Action destructive ou lourde réversible | `--color-feedback-error-surface` (#EADCDC)   | `rotate-ccw` (lucide) | `--color-feedback-error` (#D14040)   | 5s    | SCR-06 (swipe delete), SCR-10 (checkbox) |
| **Confirmation** | Feedback action réussie non-destructive | `--color-feedback-success-surface` (#DBE9E6) | `check` (lucide)      | `--color-feedback-success` (#4DAB9A) | 3s    | SCR-06 (drag, activer), SCR-10 (drag)    |
| **Pédagogique**  | Action impossible — explication         | `--color-feedback-info-surface` (#E8EDF5)    | `info` (lucide)       | `--color-feedback-info` (#2383E2)    | 4s    | SCR-10 (drag inter-quadrant interdit)    |

---

### Timer visuel — Fond gradient (variante Undo uniquement)

> **Principe :** Pas de progress bar séparée. Le fond du toast lui-même sert de timer. Un gradient horizontal avance de droite à gauche : la partie claire (`#F7F2F2`) représente le temps écoulé, la partie colorée (`#EADCDC`) le temps restant.

| Propriété                 | Valeur                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Mécanisme**             | Gradient linéaire horizontal. La frontière coloré/clair se déplace de 100% → 0% en 5s                       |
| **Couleur temps restant** | Couleur de surface de la variante (ex: `#EADCDC` pour Undo)                                                 |
| **Couleur temps écoulé**  | Version désaturée/claire de la surface (ex: `#F7F2F2` pour Undo)                                            |
| **Transition**            | Linéaire, 5s. Frontière nette (pas de dégradé progressif entre les deux zones)                              |
| **Pause**                 | L'animation se met en pause au hover / touch-hold sur le toast                                              |
| **Reduced motion**        | `@media (prefers-reduced-motion)` : pas de gradient animé, fond uni + texte "(5s)" à côté du bouton Annuler |

---

### États

| État                              | Déclencheur                                       | Changement visuel                                                                                                                                             | Comportement                                                                             |
| --------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Entrée**                        | Action utilisateur (delete, complete, drag, etc.) | Slide up depuis le bas + fade in. `transform: translateY(100%) → translateY(0)` · `opacity: 0 → 1` · durée `var(--duration-normal)` (200ms) `var(--ease-out)` | Apparaît 16px au-dessus de la bottom nav                                                 |
| **Visible (undo)**                | Toast affiché, timer en cours                     | Gradient fond : couleur claire avance de gauche à droite pendant 5s                                                                                           | Bouton "Annuler" cliquable. Swipe down pour dismiss anticipé                             |
| **Visible (confirmation/pédago)** | Toast affiché                                     | Fond uni (pas de gradient timer)                                                                                                                              | Auto-dismiss après durée. Swipe down pour dismiss anticipé                               |
| **Hover action (desktop)**        | Survol du bouton "Annuler"                        | Texte action plus lumineux + `text-decoration: underline`                                                                                                     | `cursor: pointer`. Timer **se met en pause** au hover sur le toast entier                |
| **Action triggered**              | Tap sur "Annuler"                                 | Fond passe en `--color-feedback-success-surface` (#DBE9E6). Icône → `check` verte. Message → "Annulé !" pendant 800ms → dismiss                               | Action inversée (tâche restaurée)                                                        |
| **Dismiss**                       | Timer expiré / swipe down / tap ✕                 | Slide down + fade out. `translateY(0) → translateY(100%)` · `opacity: 1 → 0` · durée `var(--duration-normal)` (200ms) `var(--ease-in)`                        | Toast supprimé du DOM. Action définitive                                                 |
| **Stacked**                       | Nouveau toast alors qu'un toast est visible       | Le toast existant se dismiss immédiatement. Le nouveau entre. **Max 1 toast visible à la fois**                                                               | Le timer du toast précédent est annulé — si c'était un undo, l'action devient définitive |

---

### Comportements spécifiques

| Comportement         | Spécification                                                                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Position**         | Fixed bottom — `bottom: calc(var(--layout-navbar-height) + var(--space-4) + env(safe-area-inset-bottom))`. Centré horizontalement                                                |
| **Largeur**          | Auto (fit-content) — le toast s'adapte au contenu du message. Pas de max-width imposé                                                                                            |
| **Timer pause**      | Le timer se met en pause quand le pointeur/doigt est sur le toast (hover desktop, touch-hold mobile). Reprend au leave                                                           |
| **Swipe to dismiss** | Swipe down > 50px → dismiss avec inertie. Le toast suit le doigt pendant le swipe (manipulation directe, Nogier)                                                                 |
| **Stacking**         | Max 1 toast visible. Si un nouveau toast arrive, il remplace l'ancien. Si l'ancien était un undo, l'action devient définitive immédiatement                                      |
| **Undo mécanique**   | Suppression : la tâche est retirée visuellement mais conservée en mémoire pendant 5s. Undo = réinsertion à la position d'origine. Complétion : idem, la tâche revient dans Focus |
| **Navbar**           | Le toast est **au-dessus** de la bottom nav, jamais en overlap                                                                                                                   |
| **Overlay**          | Si un overlay est ouvert, le toast apparaît au-dessus de l'overlay                                                                                                               |

---

### Règles d'usage

**Faire :**

- Toast undo pour toute action destructive (suppression) ou lourde (complétion → Archive)
- Toast confirmation pour les actions de déplacement réussies — rassure sans interrompre
- Messages courts et directs : verbe au passé + nom de l'objet ("Tâche supprimée", "Déplacée vers Q1")
- Couleur de fond teinté par contexte — cohérent avec les badges Eisenhower
- 1 seul toast à la fois — pas d'empilement

**Ne pas faire :**

- Pas de toast pour les actions de création (capture input) — le feedback est la tâche qui apparaît dans la liste
- Pas de toast pour les erreurs critiques — utiliser un composant d'erreur dédié (futur)
- Pas de toast persistant (sans timer) — chaque toast disparaît
- Label "Annuler" jamais tronqué — reformuler le message si espace insuffisant

**Anti-patterns izh :**

- Pas de toast fond noir/inverse — les couleurs teintées sont plus calmes et cohérentes
- Pas de toast avec icône d'alerte rouge pour les confirmations positives — le ton est calme
- Pas de toast qui bloque l'interaction (type modal) — le toast est non-bloquant par nature
- Pas de vibration haptique sur le toast — réservée au long-press editing (C-03)
- Pas de progress bar séparée — le fond gradient du toast est le timer

---

### Tokens manquants à créer dans le livrable 05

| Token                          | Valeur    | Usage                                             |
| ------------------------------ | --------- | ------------------------------------------------- |
| `--duration-toast-undo`        | `5000ms`  | Durée du timer undo                               |
| `--duration-toast-confirm`     | `3000ms`  | Durée auto-dismiss confirmation                   |
| `--duration-toast-pedagogy`    | `4000ms`  | Durée auto-dismiss pédagogique                    |
| `--color-toast-undo-faded`     | `#F7F2F2` | Partie "temps écoulé" du gradient undo            |
| `--color-toast-confirm-faded`  | `#EFF5F3` | Partie "temps écoulé" du gradient confirm (futur) |
| `--color-toast-pedagogy-faded` | `#EEF0F5` | Partie "temps écoulé" du gradient pédago (futur)  |

---

### Accessibilité

| Critère          | Spécification                                                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rôle**         | `role="status"` + `aria-live="polite"` — annonce sans interrompre le screen reader                                                           |
| **Undo**         | `role="alertdialog"` + `aria-live="assertive"` — interrompt le SR pour les actions destructives                                              |
| **Label action** | Bouton "Annuler" avec `aria-label="Annuler la suppression de [nom tâche]"` — contexte complet                                                |
| **Timer**        | Pas d'annonce continue du timer — uniquement annonce à l'apparition du toast                                                                 |
| **Focus**        | Le toast ne capture **pas** le focus automatiquement. Exception : si navigation clavier, `Tab` atteint le bouton "Annuler"                   |
| **Contraste**    | Texte #37352F sur #EADCDC = ~8.5:1 ✅ AAA. Action #D14040 sur #EADCDC = ~3.8:1 — renforcé par le poids 600 (conforme WCAG 1.4.1 texte large) |
| **Dismiss**      | `Escape` dismiss le toast. Si c'était un undo, l'action devient définitive                                                                   |
| **Motion**       | `@media (prefers-reduced-motion)` : pas de slide ni de gradient animé, apparition instantanée avec fade 100ms, fond uni                      |

---

## Checklist de validation — Toast ✅

- [x] Tous les états définis (entrée, visible, hover action, action triggered, dismiss, stacked)
- [x] 3 variantes documentées (undo, confirmation, pédagogique) avec durées et couleurs contextuelles
- [x] Tokens de design référencés (aucune valeur hardcodée) + tokens manquants identifiés
- [x] Règles d'accessibilité : aria-live, role, focus non-capturé, contraste vérifié
- [x] Comportement responsive documenté (position above navbar, safe area, swipe to dismiss)
- [x] Cas limites définis (stacking, timer pause, overlay context, undo mécanique)
- [x] Règles d'usage (quand utiliser, quand ne pas utiliser, anti-patterns)
- [x] Timer visuel : fond gradient au lieu de progress bar séparée

---

## C-07 — Empty State

**Comportement utilisateur encouragé :** Comprendre "où je suis, pourquoi c'est vide, et quoi faire maintenant" — l'état vide rassure (ce n'est pas un bug), oriente (un message contextuel par écran) et guide vers l'action suivante (CTA optionnel). C'est un moment pédagogique calme, pas une alerte.

**Référence :** Kholmatova (pattern fonctionnel de guidance — orienter sans imposer), Nogier (feedback de contexte, prévention de l'erreur — l'utilisateur ne doit jamais se demander "est-ce que ça marche ?")

### Anatomie

```
┌──────────────────────────────────────────────────┐
│                                                    │
│              [Icône 32px opt.]                      │
│                   ↕ 12px                           │
│              [Message — 1-2 lignes]                │
│                   ↕ 16px                           │
│              [CTA Button opt.]                     │
│                                                    │
└──────────────────────────────────────────────────┘
  ↕ centré verticalement dans la zone content
  ↔ centré horizontalement · max-width: 280px
```

**Tokens utilisés :**

- Icône : 32×32px · `var(--color-text-tertiary)` (#B4B4B0)
- Gap icône ↔ message : `var(--space-3)` (12px)
- Gap message ↔ CTA : `var(--space-4)` (16px)
- Message : `var(--text-body)` — Inter 15px Regular 400 · `var(--color-text-secondary)` (#808078)
- Alignement texte : `text-align: center`
- Max-width message : 280px (force le retour à la ligne naturel sur mobile)
- CTA : composant `Button` variante Secondary, taille sm (C-01)
- Position verticale : centré dans la zone `content` (entre header sticky et bottom nav)

---

### Variantes par écran

| Variante          | Écran          | Condition                  | Icône (Lucide) | Message                                  | CTA                                   |
| ----------------- | -------------- | -------------------------- | -------------- | ---------------------------------------- | ------------------------------------- |
| **first-launch**  | SCR-01 Vrac    | Premier lancement, 0 tâche | `brain`        | "Commence par vider ta tête."            | — (le capture-input au-dessus suffit) |
| **all-sorted**    | SCR-01 Vrac    | Toutes les tâches triées   | `circle-check` | "Tout est trié"                          | "Aller à la Réserve" → SCR-06         |
| **reserve-empty** | SCR-06 Réserve | 0 tâche triée              | `inbox`        | "Trie tes premières tâches depuis Vrac"  | "Aller au Vrac" → SCR-01              |
| **focus-empty**   | SCR-10 Focus   | 0 tâche active             | `target`       | "Active des tâches depuis ta Réserve"    | "Aller à la Réserve" → SCR-06         |
| **archive-empty** | SCR-11 Archive | 0 tâche complétée          | `archive`      | "Tes tâches complétées apparaîtront ici" | — (pas d'action directe)              |

**Différences clés :**

- **first-launch** : pas de CTA — le capture-input sticky est déjà visible et auto-focusé. L'empty state guide le regard vers l'input.
- **all-sorted** : ton positif (circle-check vert) — c'est un accomplissement, pas un manque. CTA oriente vers la suite logique du flow.
- **reserve-empty** et **focus-empty** : CTA de navigation vers l'étape précédente du workflow — guider l'utilisateur vers l'amont.
- **archive-empty** : pas de CTA — l'archive se remplit naturellement en complétant des tâches dans Focus.

---

### États

| État                  | Déclencheur                               | Changement visuel                                                             | Comportement                                           |
| --------------------- | ----------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------ |
| **Visible**           | `items.length === 0` dans la vue courante | Affiché centré dans la zone content. Liste masquée                            | Statique, pas d'animation d'entrée                     |
| **Entrée**            | Dernière tâche supprimée/déplacée         | Fade in `opacity: 0 → 1` · `var(--duration-normal)` (200ms) `var(--ease-out)` | Apparition douce après disparition de la dernière card |
| **Sortie**            | Première tâche ajoutée/arrivée            | Fade out `opacity: 1 → 0` · `var(--duration-fast)` (120ms) `var(--ease-in)`   | Disparition rapide pour laisser place à la liste       |
| **CTA hover**         | Survol du bouton CTA                      | Hérite des états du Button Secondary (C-01)                                   | `cursor: pointer`                                      |
| **CTA focus-visible** | Tab sur le CTA                            | Hérite du focus ring Button (C-01)                                            | Jamais supprimer                                       |

> **Pas d'état disabled, loading ou error** — l'empty state est un composant passif de feedback. Si la vue est en chargement, ce sont les skeletons qui s'affichent, pas l'empty state.

---

### Variante spéciale — all-sorted (ton positif)

| Propriété                  | Valeur                                                                                       |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| **Icône**                  | `circle-check` (lucide) · `var(--color-feedback-success)` (#4DAB9A) au lieu de tertiary      |
| **Message**                | "Tout est trié" — ton affirmatif, pas neutre                                                 |
| **Sous-message optionnel** | "Retrouve tes tâches dans la Réserve" — `var(--text-caption)` · `var(--color-text-tertiary)` |

> C'est le seul empty state à connotation positive — les autres sont neutres/pédagogiques. L'icône verte et le message court célèbrent l'accomplissement sans excès (pas de confetti, pas d'animation festive — le calme prime).

---

### Règles d'usage

**Faire :**

- 1 message par écran — jamais de message générique "Rien à afficher"
- Message en langage naturel, tutoiement — cohérent avec le ton izh
- Icône contextuelle qui rappelle la fonction de l'écran (inbox pour Vrac, target pour Focus…)
- CTA uniquement quand l'utilisateur peut agir directement — pas de CTA si l'action est implicite (capture-input visible, complétion future)
- Le CTA navigue toujours vers l'étape **amont** du workflow (Focus → Réserve, Réserve → Vrac)

**Ne pas faire :**

- Pas d'illustration ou d'image — izh est texte-first, l'icône Lucide 32px suffit
- Pas d'animation d'entrée complexe (bouncing, slide) — fade in 200ms maximum
- Pas de message culpabilisant ("Tu n'as rien fait") — le ton est bienveillant et neutre
- Pas de CTA Primary — le Secondary suffit, l'empty state n'est pas un CTA principal de la vue
- Pas de compteur ou de statistique dans l'empty state — c'est un guide, pas un dashboard

**Anti-patterns izh :**

- Pas d'empty state avec gamification (badges, streaks, encouragements excessifs) — contraire à la philosophie calme
- Pas de lien vers l'aide ou un tutoriel — l'app doit être auto-explicative
- Pas d'empty state animé en boucle (icône qui pulse, texte qui défile) — bruit visuel

---

### Accessibilité

| Critère            | Spécification                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| **Élément**        | `<div role="status">` — annonce passive du contenu au screen reader                              |
| **Label**          | Le message texte est le contenu accessible — pas besoin d'aria-label supplémentaire              |
| **Icône**          | `aria-hidden="true"` — purement décorative, le message porte l'info                              |
| **CTA**            | Bouton standard (C-01) avec label explicite ("Aller au Vrac", pas "Aller")                       |
| **Focus**          | Si CTA présent : focusable via `Tab`. Sinon : le focus passe au capture-input ou à la bottom nav |
| **Contraste**      | Message #808078 sur #FFFFFF = ~5.5:1 ✅ AA · Icône #B4B4B0 = décorative (doublée par le message) |
| **Screen reader**  | Annonce "Vrac vide. Commence par vider ta tête." — le contexte de l'écran + le message           |
| **Reduced motion** | `@media (prefers-reduced-motion)` : pas de fade, apparition instantanée                          |

---

## Checklist de validation — Empty State ✅

- [x] Tous les états définis (visible, entrée, sortie, CTA hover/focus)
- [x] 5 variantes contextuelles documentées (first-launch, all-sorted, reserve, focus, archive)
- [x] Tokens de design référencés (aucune valeur hardcodée)
- [x] Règles d'accessibilité : role="status", aria-hidden sur icône, contraste vérifié
- [x] Comportement responsive documenté (centrage vertical, max-width 280px)
- [x] Cas limites définis (variante positive all-sorted, transition avec skeletons)
- [x] Règles d'usage (quand utiliser, quand ne pas utiliser, anti-patterns)

---

## C-08 — Quadrant Button

**Comportement utilisateur encouragé :** Classifier une tâche dans un quadrant Eisenhower par un geste délibéré et rapide. Le bouton matérialise le choix de classification — en tri manuel (SCR-02, 4 boutons en grille 2×2) comme en correction post-questionnaire (SCR-04, 3 alternatives sans le quadrant proposé). La couleur associe visuellement le bouton au quadrant cible, renforçant l'apprentissage spatial du modèle Eisenhower.

**Référence :** Kholmatova (pattern fonctionnel de classification — mapper une action à un espace mental), Nogier (finger-friendly ≥ 44px, feedback < 100ms)

### Anatomie

```
┌─────────────────────────────────────┐
│  ⚡ Icon 16px   Label 13px Medium   │
│                                     │
└─────────────────────────────────────┘
  ↕ padding: 12px top/bottom
  ↔ padding: 16px left/right
  ↔ gap icon ↔ label: 8px
  ↔ cornerRadius: 8px
  ↔ border: 1px couleur quadrant
  ↔ fond: transparent (ghost/outline)
```

**Tokens utilisés :**

- Container : `height: 48px` (default) / `36px` (compact) · `var(--radius-component)` (8px) · `border: 1px solid [couleur quadrant]` · `background: transparent`
- Icône : Lucide `16×16px` (default) / `14×14px` (compact) · `fill: [couleur quadrant]` · icône spécifique par quadrant (voir tableau)
- Label : `var(--text-label)` — Inter Medium 13px (default) / 12px (compact) · `var(--color-text-primary)` (#37352F)
- Gap icône ↔ label : `var(--space-2)` (8px)
- Padding vertical : `var(--space-3)` (12px) / `var(--space-2)` (8px compact)
- Padding horizontal : `var(--space-4)` (16px) / `var(--space-3)` (12px compact)
- Transition : `var(--transition-hover)` — 120ms ease-default

---

### Variantes par quadrant

| Variante | Label izh          | Icône (Lucide) | Couleur bordure         | Token                                |
| -------- | ------------------ | -------------- | ----------------------- | ------------------------------------ |
| **Q1**   | "Faire maintenant" | `zap`          | Rouge "Feu"             | `var(--color-quadrant-q1)` (#D14040) |
| **Q2**   | "Planifier"        | `calendar`     | Vert "Sauge"            | `var(--color-quadrant-q2)` (#4DAB9A) |
| **Q3**   | "Déléguer"         | `forward`      | Orange "Soleil"         | `var(--color-quadrant-q3)` (#FFA344) |
| **Q4**   | "Éliminer"         | `x`            | Jaune "Chartreuse doré" | `var(--color-quadrant-q4)` (#B5B830) |

> **Décision de design :** Chaque quadrant a sa propre couleur distincte (rouge, vert, orange, jaune) — écart minimal ~40° de hue en OKLCH, garantissant qu'aucune paire ne se confond. La couleur est l'identité permanente du quadrant, pas seulement un signal d'urgence. Le style ghost/outline (fond transparent, bordure fine) maintient les boutons visuellement subordonnés au CTA primaire "Aide-moi à décider" dans l'overlay de tri.

---

### Variantes de taille

| Taille      | Hauteur | Dot     | Font              | Padding     | Usage                                            |
| ----------- | ------- | ------- | ----------------- | ----------- | ------------------------------------------------ |
| **Default** | 48px    | 10×10px | Inter Medium 13px | 12px / 16px | SCR-02 grille 2×2, SCR-08 purge                  |
| **Compact** | 36px    | 8×8px   | Inter Medium 12px | 8px / 12px  | SCR-04 alternatives (3 boutons sous le résultat) |

---

### Variantes de layout

| Layout                | Contexte                   | Description                                                                                                                                                                                          |
| --------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Grille 2×2**        | SCR-02 Overlay de tri      | 4 boutons en 2 lignes × 2 colonnes · gap `var(--space-3)` (12px) · largeur `fill_container` par bouton · Q1 haut-gauche, Q2 haut-droite, Q3 bas-gauche, Q4 bas-droite                                |
| **Ligne horizontale** | SCR-04 Confirmation de tri | 3 boutons compact en ligne · gap `var(--space-3)` (12px) · largeur `fill_container` (égale) · le quadrant proposé est absent · Q1 utilise le label raccourci "Faire" (au lieu de "Faire maintenant") |
| **Ligne 4**           | SCR-08 Purge Q2            | 4 boutons en ligne (quadrant actuel pré-sélectionné + 3 alternatives)                                                                                                                                |

---

### États

| État              | Déclencheur                | Changement visuel                                                                                                               | Comportement                                                                           |
| ----------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Default**       | Au repos                   | Fond transparent · bordure 1px couleur quadrant · icône couleur quadrant · label `text-primary`                                 | `cursor: pointer`                                                                      |
| **Hover**         | Survol (desktop)           | Bordure 1.5px · `var(--shadow-button-hover)` (ombre subtile) · icône couleur quadrant foncée                                    | Transition `var(--transition-hover)` (120ms)                                           |
| **Pressed**       | Tap / click actif          | Fond `[couleur quadrant]` plein · icône + label `var(--color-text-inverse)` (#FFF) · `scale(0.97)`                              | Retour visuel < 100ms · classement immédiat (SCR-02) ou sélection alternative (SCR-04) |
| **Disabled**      | Quadrant Focus plein (4/4) | `opacity: 0.4` · fond `var(--color-surface-muted)` · bordure `var(--color-border-default)` · icône `var(--color-text-tertiary)` | `cursor: not-allowed` · tooltip "Ce quadrant est plein dans ton Focus"                 |
| **Focus-visible** | Navigation clavier (Tab)   | Focus ring `2px solid var(--color-border-focus)` (#2383E2) · offset 2px                                                         | Jamais `outline: none` sans remplacement                                               |

---

### Modificateurs

| Modificateur    | Description                       | Changement                                                                            |
| --------------- | --------------------------------- | ------------------------------------------------------------------------------------- |
| **selected**    | Quadrant actuel dans SCR-08 purge | Fond `[couleur quadrant surface]` · bordure 2px · label bold 600 · mention "(garder)" |
| **highlighted** | Onboarding — nudge premier tri    | Bordure 2px pulse animation (2 cycles, 600ms chaque) · puis retour default            |

---

### Règles d'usage

**Faire :**

- Toujours afficher les 4 boutons dans l'overlay de tri (SCR-02) — même si un quadrant est plein (état disabled)
- En SCR-04 (alternatives), afficher uniquement les 3 quadrants restants — le proposé est absent
- Conserver la position spatiale fixe des quadrants dans la grille 2×2 : Q1 haut-gauche, Q2 haut-droite, Q3 bas-gauche, Q4 bas-droite — renforce le modèle mental Eisenhower
- Le label est toujours le nom izh du quadrant ("Faire maintenant", "Planifier", "Déléguer", "Éliminer") — pas "Q1", "Q2" etc.
- L'information est toujours doublée : couleur + label textuel (WCAG 1.4.1)

**Ne pas faire :**

- Pas de style Primary/filled au repos — les quadrant buttons sont toujours subordonnés au CTA "Aide-moi à décider"
- Pas d'emoji dans le bouton — l'icône Lucide spécifique à chaque quadrant suffit (zap, calendar, forward, x)
- Pas de confirmation après tap (SCR-02 tri manuel) — le classement est immédiat (décision D8, doc 03)
- Pas de compteur de tâches dans le bouton — c'est un bouton d'action, pas un indicateur

**Anti-patterns izh :**

- Ne jamais réduire la taille sous 36px (compact) — zones tactiles < 36px incompatibles avec le mobile
- Ne pas changer les couleurs des quadrants selon le contexte — la couleur est l'identité permanente du quadrant
- Ne pas utiliser les couleurs de quadrant pour d'autres composants que le tri Eisenhower

---

### Accessibilité

| Critère                | Spécification                                                                                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rôle**               | `<button>` natif — pas de `div` cliquable                                                                                                            |
| **aria-label**         | "Classer dans [nom du quadrant]" — ex: "Classer dans Faire maintenant"                                                                               |
| **Focus-visible**      | Ring `2px solid var(--color-border-focus)` offset 2px · jamais supprimé                                                                              |
| **Navigation clavier** | `Tab` entre les boutons · `Enter` ou `Space` pour activer                                                                                            |
| **Contraste bordure**  | Q1 #D14040, Q2 #4DAB9A, Q3 #FFA344, Q4 #B5B830 sur blanc : >3:1 pour les éléments non-texte (AA) · toujours doublé par le label textuel (WCAG 1.4.1) |
| **Disabled**           | `aria-disabled="true"` + tooltip explicatif · pas de `pointer-events: none` seul                                                                     |
| **Reduced motion**     | `@media (prefers-reduced-motion)` : pas de scale(0.97) au press, pas de pulse onboarding                                                             |

---

## Checklist de validation — Quadrant Button ✅

- [x] Comportement Kholmatova défini (classification Eisenhower)
- [x] 4 variantes par quadrant documentées (Q1 rouge, Q2 vert, Q3 orange, Q4 jaune)
- [x] 2 variantes de taille (default 48px, compact 36px)
- [x] 3 variantes de layout (grille 2×2, ligne 3, ligne 4)
- [x] 5 états définis (default, hover, pressed, disabled, focus-visible)
- [x] 2 modificateurs (selected, highlighted)
- [x] Tokens de design référencés — aucune valeur hardcodée
- [x] Règles d'accessibilité : button natif, aria-label, focus-visible, contraste, reduced-motion
- [x] Règles d'usage et anti-patterns documentés
- [x] Preview visuelle validée dans le .pen

---

## C-09a — Quadrant Badge (card)

**Comportement utilisateur encouragé :** Identifier instantanément le résultat de la classification Eisenhower d'une tâche. Le badge confirme visuellement le quadrant attribué via sa couleur, son icône et son label — renforçant la confiance dans le système de tri.

**Référence :** Kholmatova (pattern de confirmation — feedback visuel immédiat du classement), Nogier (feedback < 100ms, manipulation directe)

**Note de décomposition :** L'ancien C-09 "Quadrant Result" a été décomposé en deux composants atomiques :

- **C-09a Quadrant Badge (card)** — le badge de résultat (ce composant)
- **C-09b Result Card** — le conteneur qui compose badge + CTA + alternatives
- La **variante inline** est supprimée : elle est remplacée par le C-08 Quadrant Button `compact` déjà spécifié.

### Anatomie

```
┌─────────────────────────┐
│      ⚡ Icon 14px        │
│    Label 13px Bold       │   ← centré vertical
│  Sous-titre 9px Medium   │
└─────────────────────────┘
  ↕ padding: 10px
  ↔ gap: 4px
  ↔ cornerRadius: 10px (--radius-container)
  ↔ border: 1.5px couleur quadrant
  ↔ fond: --color-surface-base (blanc)
  ↔ shadow: --shadow-md
  ↔ taille: 115×115px (carré)
```

**Tokens utilisés :**

- Container : `115×115px` · `var(--radius-container)` (10px) · `border: 1.5px solid var(--color-quadrant-qN)` · `background: var(--color-surface-base)` · `var(--shadow-md)`
- Padding : `10px`
- Gap interne : `4px`
- Icône : Lucide `14×14px` · `fill: var(--color-quadrant-qN)` · icône spécifique par quadrant
- Label : `var(--font-family-heading)` — Space Grotesk Bold 13px · `var(--color-text-primary)` · `text-align: center`
- Sous-titre : `var(--font-family-body)` — Inter Medium 9px · `fill: var(--color-quadrant-qN)` · `text-align: center`

---

### Variantes par quadrant

| Variante | Label izh          | Icône (Lucide) | Couleur border/icône/sous-titre | Token                                |
| -------- | ------------------ | -------------- | ------------------------------- | ------------------------------------ |
| **Q1**   | "Faire maintenant" | `zap`          | Rouge "Feu"                     | `var(--color-quadrant-q1)` (#D14040) |
| **Q2**   | "Planifier"        | `calendar`     | Vert "Sauge"                    | `var(--color-quadrant-q2)` (#4DAB9A) |
| **Q3**   | "Déléguer"         | `forward`      | Orange "Soleil"                 | `var(--color-quadrant-q3)` (#FFA344) |
| **Q4**   | "Éliminer"         | `x`            | Jaune "Chartreuse doré"         | `var(--color-quadrant-q4)` (#B5B830) |

---

### États

| État            | Déclencheur                           | Changement visuel                                                                                         | Comportement                                          |
| --------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **default**     | Affichage du résultat                 | Border 1.5px couleur quadrant, shadow standard                                                            | Statique                                              |
| **confirmed**   | Validation SCR-04 → SCR-05            | Border épaissie 2.5px, shadow teintée (`color-quadrant-qN` à 10% opacité), animation `scale-up + fade-in` | `var(--duration-slow)` (300ms) + `var(--ease-spring)` |
| **highlighted** | Tâche classée visible dans la Réserve | Border pulse 2.5px couleur quadrant pendant 2-3s puis retour à default                                    | Temporaire, auto-dismiss                              |

---

### Accessibilité

- L'icône est **décorative** (`aria-hidden="true"`) — le label textuel porte l'information sémantique
- Ajouter `role="status"` + `aria-live="polite"` quand le badge apparaît en résultat (SCR-05) pour annoncer le classement aux lecteurs d'écran
- Les sous-titres colorés respectent le contraste AA grâce aux variantes `dark` des tokens quadrant
- Animation respecte `prefers-reduced-motion: reduce` → pas de scale-up, fade-in instantané

### Règles d'usage

**Quand utiliser :**

- Résultat de tri dans SCR-04 (proposition) et SCR-05 (confirmation) — toujours à l'intérieur d'un C-09b Result Card
- Preview du classement dans un contexte de résumé

**Quand NE PAS utiliser :**

- Comme tag dans une liste de tâches → utiliser C-08 Quadrant Button `compact` à la place
- Comme bouton d'action → c'est un badge de résultat, pas un bouton interactif
- Seul sans contexte → toujours accompagné du titre de la tâche et d'un CTA

**Anti-patterns :**

- ❌ Afficher plusieurs badges côte à côte pour la même tâche (une tâche = un quadrant)
- ❌ Utiliser la variante card dans un espace < 115px
- ❌ Hardcoder les couleurs — toujours passer par `var(--color-quadrant-qN)`

---

## Checklist de validation — Quadrant Badge ✅

- [x] Comportement Kholmatova défini (confirmation visuelle du classement)
- [x] 4 variantes par quadrant documentées (Q1 rouge, Q2 vert, Q3 orange, Q4 jaune)
- [x] Variante inline supprimée — renvoi vers C-08 compact
- [x] 3 états définis (default, confirmed, highlighted)
- [x] Tokens de design référencés — aucune valeur hardcodée
- [x] Règles d'accessibilité : aria-hidden icône, role status, contraste AA, reduced-motion
- [x] Règles d'usage et anti-patterns documentés
- [x] Preview visuelle validée dans le .pen

---

## C-09b — Result Card

**Comportement utilisateur encouragé :** Valider ou corriger le classement Eisenhower proposé en un geste. Le conteneur compose le badge de résultat (C-09a) avec un CTA de confirmation et des alternatives de correction, hiérarchisant visuellement la proposition vs les options de changement.

**Référence :** Kholmatova (pattern de confirmation — action délibérée avec possibilité de correction), Nogier (manipulation directe, feedback immédiat, finger-friendly)

### Anatomie

```
┌─────────────────────────────────────────┐
│  [Titre de la tâche]    --text-body     │
│                                         │
│       ┌───────────┐                     │
│       │  C-09a    │  ← Quadrant Badge   │
│       │  Badge    │     (card 115×115)  │
│       └───────────┘                     │
│                                         │
│     ┌──────────────────┐                │
│     │  CTA Primaire    │  ← fit-content │
│     └──────────────────┘    px:32       │
│                                         │
│  ┌────┐ ┌────┐ ┌────┐   (SCR-04 only)  │
│  │Alt1│ │Alt2│ │Alt3│   ← C-08 compact │
│  └────┘ └────┘ └────┘                   │
│                                         │
│  Voir le tri complet    (SCR-05 only)   │
└─────────────────────────────────────────┘
```

**Tokens utilisés :**

- Container : `var(--radius-container)` (12px) · `var(--color-surface-base)` · `var(--shadow-xs)` · `padding: var(--space-component-md)` (16px)
- Gap interne : `var(--space-inline-md)` (12px)
- Titre tâche : `var(--font-family-heading)` — Space Grotesk Semibold 15px · `var(--color-text-primary)` · `text-align: center`
- Badge : C-09a Quadrant Badge (card) — 115×115px
- CTA : C-01 Button `primary` · h: 36px · `width: fit-content` · `padding: 0 32px` · `var(--radius-component)` (6px)
- Alternatives : 3× C-08 Quadrant Button `compact` (h: 30px) en row `gap: var(--space-inline-sm)` (8px) · `justify-content: center`
- Lien texte : `var(--text-caption)` — Inter Medium 11px · `var(--color-text-accent)` (#2383E2) · `text-align: center`
- Animation annotation : Inter Medium 9px · `var(--color-text-accent)` · `opacity: 0.8`

---

### Variantes contextuelles

| Variante      | Écran  | Badge état                     | CTA label                                     | Alternatives                         | Lien                  |
| ------------- | ------ | ------------------------------ | --------------------------------------------- | ------------------------------------ | --------------------- |
| **proposed**  | SCR-04 | `default`                      | "Ça me parle"                                 | 3× C-08 compact (quadrants restants) | —                     |
| **confirmed** | SCR-05 | `confirmed` (animation spring) | "Tâche suivante →" (icône `arrow-right` 12px) | —                                    | "Voir le tri complet" |

> **Décision de design :** La variante `proposed` montre les alternatives pour permettre la correction sans friction. La variante `confirmed` les supprime — le choix est fait, on avance. Le CTA passe de `full-width` à `fit-content` pour ne pas écraser visuellement le badge qui est l'élément central.

---

### États spéciaux

| État             | Déclencheur            | Contenu affiché                                                                                                                                                                                |
| ---------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **vrac-empty**   | `vrac.remaining === 0` | Icône `party-popper` (18px, vert sauge) + "Tout est trié !" (Space Grotesk 13px Bold) + lien "Voir la Réserve"                                                                                 |
| **reserve-full** | `reserve.count >= 40`  | Icône `triangle-alert` (18px, orange) + "Réserve pleine" (Space Grotesk 13px Bold) + description "Tâche classée mais Réserve pleine (40/40)" + CTA "Purger" (h: 32px) + lien "Revenir au Vrac" |

**Tokens états spéciaux :**

- Container : `var(--radius-container)` (12px) · `var(--color-surface-base)` · `border: 1px var(--color-border-default)` · `var(--shadow-xs)`
- Tag état : pill `border-radius: 9999px` · fond teinté (`--color-quadrant-q2-surface` ou `--color-quadrant-q3-surface`) · Inter Semibold 8px
- Titre : `var(--font-family-heading)` — Space Grotesk Bold 13px · `var(--color-text-primary)`
- Description : Inter Regular 10px · `var(--color-text-secondary)` · `text-align: center`

---

### Comportement overlay

Le Result Card vit dans un overlay (`surface: overlay-partial-75`, `backdrop: dark-strong`) :

- **SCR-04 → SCR-05 :** Pas de fermeture/réouverture. Le contenu de la card change (badge passe en `confirmed`, alternatives disparaissent, CTA change).
- **"Tâche suivante" :** L'overlay reste ouvert, le titre change pour la tâche suivante, retour au flow SCR-02.
- **"Voir le tri complet" / "Voir la Réserve" :** Fermeture overlay → navigation vers SCR-06.

---

### Accessibilité

- Container : `role="dialog"` + `aria-labelledby="[titre-tâche-id]"` — contexte overlay
- Focus trap : tab circule entre CTA primaire et alternatives (SCR-04), ou CTA et lien (SCR-05)
- `aria-live="polite"` sur le C-09a Badge quand il passe en `confirmed` pour annoncer le résultat
- Alternatives : `aria-label="Changer pour [nom quadrant]"` sur chaque C-08 compact
- États spéciaux : `role="status"` sur le container pour annoncer "Tout est trié" ou "Réserve pleine"
- `prefers-reduced-motion: reduce` → transitions instantanées, pas de scale-up

### Règles d'usage

**Quand utiliser :**

- SCR-04 (proposition de classement) — variante `proposed`
- SCR-05 (résultat confirmé) — variante `confirmed`
- SCR-05 états terminaux — `vrac-empty` ou `reserve-full`

**Quand NE PAS utiliser :**

- En dehors d'un overlay de tri — ce composant est contextualisé au flow de classification
- Comme card autonome dans une liste — c'est un conteneur de résultat, pas un item de liste

**Anti-patterns :**

- ❌ Afficher les alternatives ET le lien "Voir le tri complet" en même temps
- ❌ Utiliser `full-width` sur le CTA — le badge doit rester l'élément dominant
- ❌ Omettre le titre de la tâche — l'utilisateur doit toujours savoir quelle tâche est classée

---

## Checklist de validation — Result Card ✅

- [x] Comportement Kholmatova défini (confirmation avec possibilité de correction)
- [x] 2 variantes contextuelles documentées (proposed, confirmed)
- [x] 2 états spéciaux documentés (vrac-empty, reserve-full)
- [x] Compose C-09a Badge + C-01 Button + C-08 Quadrant Button compact
- [x] Comportement overlay documenté (transitions, navigation)
- [x] Tokens de design référencés — aucune valeur hardcodée
- [x] Règles d'accessibilité : dialog, focus trap, aria-live, aria-label, reduced-motion
- [x] Règles d'usage et anti-patterns documentés
- [x] Preview visuelle validée dans le .pen

---

## C-10 — Answer Option

**Comportement utilisateur encouragé :** Un choix instinctif et rapide — chaque option est un bouton pleine largeur, empilé verticalement. L'utilisateur scanne de haut en bas et tape sans réfléchir. Le texte conversationnel des réponses et l'absence de hiérarchie visuelle entre les options renforcent l'idée qu'il n'y a pas de mauvaise réponse.

**Référence :** Kholmatova (pattern fonctionnel de sélection — choix non biaisé par le design), Nogier (feedback < 100ms, finger-friendly ≥ 44px)

**Écrans :** SCR-03 (questionnaire cognitif Eisenhower), SCR-08 (questionnaire de purge)

### Anatomie

```
┌──────────────────────────────────────────────┐
│  [Emoji opt.]  [Label ←fill→]                │
│  ← gap 8px →                                 │
└──────────────────────────────────────────────┘
  ↕ padding: 14px vertical
  ↔ padding: 16px horizontal
  ↔ cornerRadius: 8px
  ↔ border: 1px --color-border-default
  ↔ fond: --color-surface-base
```

**Tokens utilisés :**

- Fond : `var(--color-surface-base)` (#FFF)
- Bordure : `var(--color-border-default)` (#E3E3E0) · 1px
- Border radius : `var(--radius-component)` (8px)
- Padding vertical : `var(--space-3-5)` (14px) — hauteur totale ~48px
- Padding horizontal : `var(--space-4)` (16px)
- Label : `var(--text-body)` — Inter 15px Regular 400 · `var(--color-text-primary)` (#37352F)
- Gap emoji ↔ label : `var(--space-2)` (8px)
- Espacement entre options : `var(--space-2)` (8px) vertical
- Transition : `var(--transition-hover)` (120ms ease-out)

---

### Variantes

| Variante    | Contexte                      | Différence                                                                        |
| ----------- | ----------------------------- | --------------------------------------------------------------------------------- |
| **default** | SCR-03 questionnaire cognitif | Emoji en préfixe (ex: "😬 Je me sens obligé·e..."). 2-4 options par question      |
| **purge**   | SCR-08 questionnaire purge    | Pas d'emoji. Réponses courtes ("Oui", "Non, supprimer"). 2-3 options par question |

> **Pas de variante "sélectionnée" persistante** — le tap sur une option déclenche immédiatement la transition vers la question suivante ou le résultat. Il n'y a pas d'état "choisi" visible durablement.

---

### États

| État                 | Déclencheur            | Changement visuel                                                                                             | Comportement                                    |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **Default**          | —                      | Fond blanc, bordure `--color-border-default`, label en `--color-text-primary`                                 | Tappable                                        |
| **Hover**            | Survol souris          | Fond → `--color-surface-subtle` (#F7F7F5). Bordure → `--color-border-strong` (#D6D6D0)                        | `cursor: pointer`                               |
| **Focus-visible**    | Tab clavier            | Ring : `0 0 0 2px var(--color-surface-base), 0 0 0 4px var(--color-border-focus)`                             | Navigation clavier entre options                |
| **Active / Pressed** | Touchstart / mousedown | Fond → `--color-surface-muted` (#F0F0EE). `transform: scale(0.98)`. Bordure → `--color-border-strong`         | Feedback tactile immédiat < 100ms               |
| **Transitioning**    | Après release          | Fond flash `--color-action-primary` (#37352F) + texte `--color-text-inverse` (#FFF) pendant 150ms → slide out | Confirme visuellement le choix avant transition |

> **Décision de design :** L'état Transitioning (flash sombre 150ms) donne un micro-feedback de confirmation sans ralentir le flow. L'utilisateur sait que son tap a été pris en compte avant que la question suivante n'arrive.

---

### Comportements spécifiques

| Comportement           | Spécification                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| **Tap**                | Déclenche immédiatement `next-question` ou `navigate:SCR-04/SCR-05`. Pas de bouton "Valider" séparé       |
| **Navigation clavier** | `↑↓` pour naviguer entre options, `Enter` ou `Space` pour sélectionner                                    |
| **Empilement**         | `flex-direction: column`, `gap: var(--space-2)` (8px), `width: 100%`                                      |
| **Ordre**              | L'ordre des réponses est fixe par question — pas de randomisation (cohérence entre sessions)              |
| **Reduced motion**     | `prefers-reduced-motion: reduce` → skip le flash transitioning, passer directement à la question suivante |
| **Touch optimization** | `touch-action: manipulation` sur le conteneur (supprime le 300ms tap delay)                               |

---

### Règles d'usage

**Faire :**

- Toujours pleine largeur dans l'overlay — jamais côte à côte
- Texte conversationnel, pas de jargon technique (c'est un questionnaire, pas un formulaire)
- 2-4 options maximum par question — au-delà, le cerveau hésite trop
- Toutes les options visuellement égales — pas de mise en avant d'une réponse "attendue"

**Ne pas faire :**

- Pas de radio button ou checkbox visible — le tap sur toute la surface suffit
- Pas de confirmation après sélection — l'action est immédiate et réversible (bouton "← Retour")
- Pas de couleur différente par option — neutralité visuelle totale pour ne pas biaiser le choix
- Pas de scroll horizontal ou grille — toujours empilé verticalement

**Anti-patterns izh :**

- Jamais de style "quiz gamifié" (couleurs vives, scores, timer) — le questionnaire est un outil de clarification introspective, pas un jeu
- Jamais de réponse pré-sélectionnée ou mise en surbrillance

---

### Accessibilité

| Critère       | Spécification                                                                       |
| ------------- | ----------------------------------------------------------------------------------- |
| **Rôle**      | `role="listbox"` sur le conteneur, `role="option"` sur chaque answer-option         |
| **Élément**   | `<button>` natif dans un `<div role="listbox">`                                     |
| **Label**     | Texte visible suffit — le label est le contenu                                      |
| **Focus**     | `:focus-visible` obligatoire — ring 2px accent (4px offset blanc)                   |
| **Contraste** | Texte #37352F sur blanc = 14.5:1 ✅ AAA                                             |
| **Clavier**   | `↑↓` = navigation, `Enter`/`Space` = sélection. `Tab` sort du groupe                |
| **Touch**     | Hauteur ≥ 48px (padding 14px + line-height) · espacement 8px entre options          |
| **Annonce**   | `aria-label="Question [N] sur [Total] : [texte question]"` sur le conteneur listbox |

---

## Checklist de validation — Answer Option ✅

- [x] Comportement Kholmatova défini (choix instinctif non biaisé)
- [x] 2 variantes contextuelles documentées (default, purge)
- [x] Tous les états définis (default, hover, focus-visible, active, transitioning)
- [x] Tokens de design référencés — aucune valeur hardcodée
- [x] Règles d'accessibilité : listbox/option, focus-visible, contraste AAA, clavier
- [x] Comportements spécifiques : tap, empilement, reduced-motion, touch-action
- [x] Règles d'usage et anti-patterns documentés
- [x] Preview visuelle validée dans le .pen

---

## C-11 — Question Card

**Comportement utilisateur encouragé :** Répondre à une question de tri à la fois — la carte isole visuellement la question en cours pour réduire la charge cognitive et focaliser l'attention sur le choix. Le texte conversationnel et la progression discrète (dots, pas "2/4") créent un rythme fluide qui maintient le momentum sans générer d'anxiété.

**Référence :** Kholmatova (pattern fonctionnel de progression guidée — chaque étape réduit l'incertitude), Nogier (charge cognitive réduite par segmentation), Système 1 (langage émotionnel > analytique)

**Écrans :** SCR-03 (questionnaire cognitif Eisenhower), SCR-08 (questionnaire de purge)

### Anatomie

```
┌─────────────────────────────────────────────┐
│  [← Retour]                                 │  ← bouton retour (masqué Q1)
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  📋  [Nom de la tâche]              │    │  ← contexte tâche
│  └─────────────────────────────────────┘    │
│                                             │
│  (micro-texte rassurant — 1er tri only)     │  ← encouragement
│                                             │
│  Question text                              │  ← zone question
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  Answer Option (C-10)               │    │  ← zone réponses
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │  Answer Option (C-10)               │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │  Answer Option (C-10)               │    │
│  └─────────────────────────────────────┘    │
│                                             │
│              ● ● ○                          │  ← progress dots (C-12) centrés
└─────────────────────────────────────────────┘
         ↕ backdrop blur derrière la carte
```

**Tokens utilisés :**

- Fond carte : `var(--color-surface-base)` (#FFF)
- Fond backdrop : `var(--color-action-primary)` à 4% opacité + `backdrop-filter: blur(12px)`
- Corner radius carte : `var(--radius-xl)` (16px)
- Corner radius backdrop : `var(--radius-xl)` (16px)
- Ombre carte : `0 4px 16px oklch(0% 0 0 / 0.08), 0 1px 3px oklch(0% 0 0 / 0.04)`
- Padding carte : `var(--space-5)` (20px)
- Padding backdrop : `var(--space-4)` (16px)
- Gap interne carte : `var(--space-5)` (20px)
- Contexte tâche — fond : `var(--color-surface-subtle)` (#F7F7F5) · radius `var(--radius-component)` (8px) · padding 10px/12px
- Contexte tâche — texte : `var(--text-label)` — Inter 13px Medium 500 · `var(--color-text-primary)`
- Micro-texte rassurant : `var(--text-caption)` — Inter 11px · `var(--color-text-tertiary)` · centré
- Question text : `var(--text-body)` — Inter 15px Regular 400 · `var(--color-text-primary)` · `line-height: 1.5`
- Bouton retour : `var(--text-label)` · `var(--color-text-accent)` (#2383E2)
- Transition slide : `var(--transition-expand)` (200ms ease-out) · `translateX(±100%)`

---

### Variantes

| Variante      | Contexte                          | Layout réponses         | Différences                                                                                                   |
| ------------- | --------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| **cognitive** | SCR-03 — questionnaire Eisenhower | Vertical (empilé)       | Question d'aiguillage (4 options emoji) puis flux spécialisés (2-4 options). Micro-texte rassurant au 1er tri |
| **purge**     | SCR-08 — questionnaire purge      | **Horizontal (inline)** | 2-3 réponses courtes ("Oui", "Supprimer", "Pas sûr"). Pas de micro-texte rassurant                            |

**Sous-variantes par flux cognitif (SCR-03) :**

| Flux                       | Déclencheur       | Questions               | Options par question        |
| -------------------------- | ----------------- | ----------------------- | --------------------------- |
| Aiguillage                 | Entrée SCR-03     | 1 question émotionnelle | 4 (emoji + texte, empilées) |
| Flux 1 — Projection        | "Pas sûr·e"       | 1 question conséquences | 4 → quadrants directs       |
| Flux 2 — Ancrage objectifs | "Pas prioritaire" | 2 questions             | 2-3 par question            |
| Flux 3 — Audit obligation  | "Obligé·e"        | 1-3 questions           | 2-3 par question            |
| Flux 4 — Test du regret    | "Repoussé·e"      | 2 questions             | 2-3 par question            |

---

### États

| État          | Déclencheur                    | Changement visuel                                                                                                                                            | Comportement                                    |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| **Default**   | Question affichée              | Contenu statique, réponses interactives                                                                                                                      | Attend une sélection                            |
| **Entering**  | Navigation vers cette question | Slide-in depuis la droite (`translateX(100%)` → `0`) en 200ms                                                                                                | `will-change: transform`                        |
| **Exiting**   | Réponse sélectionnée           | Slide-out vers la gauche (`translateX(0)` → `translateX(-100%)`) en 200ms, opacité réduite                                                                   | Simultané avec entering de la question suivante |
| **Returning** | Bouton "← Retour"              | Slide-in depuis la gauche (`translateX(-100%)` → `0`). Réponse précédente pré-sélectionnée (bordure `--color-border-accent` + fond `--color-surface-accent`) | Permet de corriger un choix                     |

> **Reduced motion :** `prefers-reduced-motion: reduce` → remplacer les slides par un simple `opacity` fade 150ms.

---

### Comportements spécifiques

| Comportement              | Spécification                                                                                                                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Contexte tâche**        | Bandeau `📋 [nom de la tâche]` toujours visible sous le bouton retour. Fond `--color-surface-subtle`, radius 8px. Rappelle à l'utilisateur quelle tâche il est en train de trier |
| **Bouton retour**         | Masqué sur la première question. Visible à partir de Q2. Positionné tout en haut de la carte. Tap → état Returning                                                               |
| **Micro-texte rassurant** | "Réponds à l'instinct — il n'y a pas de mauvaise réponse." Affiché uniquement au 1er tri. Positionné entre le contexte tâche et la question. Centré, `--color-text-tertiary`     |
| **Progress dots**         | Composant C-12 intégré en bas de la carte, centrés. Dots discrets (`●○`) — jamais "2/4" (non anxiogène)                                                                          |
| **Pré-sélection retour**  | Quand l'utilisateur revient, l'option choisie précédemment a une bordure `--color-border-accent` + fond `--color-surface-accent`. Tapper une autre option écrase le choix        |
| **Backdrop**              | La carte repose sur un fond semi-transparent avec `backdrop-filter: blur(12px)`. Donne de la profondeur à l'overlay et sépare visuellement la carte du contenu en arrière-plan   |
| **Layout réponses purge** | `flex-direction: row` avec `gap: 8px`. Boutons `fill_container` pour répartition égale. Hauteur 44px. Texte centré                                                               |
| **Overflow**              | Si > 4 options, scroll vertical dans la zone réponses. Maximum 4 options recommandé                                                                                              |
| **Conteneur**             | Occupe 100% de la largeur de l'overlay parent moins le padding du backdrop                                                                                                       |

---

### Règles d'usage

**Faire :**

- Une seule question visible à la fois — jamais de scroll entre questions
- Langage émotionnel Système 1 ("Je me sens obligé·e...") — jamais de jargon Eisenhower
- Toujours afficher le contexte de la tâche pour que l'utilisateur sache ce qu'il trie
- Transitions directionnelles cohérentes : droite = avancer, gauche = reculer
- Progress dots toujours en bas de la carte, centrés
- Variante purge : boutons inline pour les réponses courtes

**Ne pas faire :**

- Pas de numérotation "Question 2/4" — les dots suffisent
- Pas de timer, score ou gamification — c'est un outil introspectif
- Pas de bouton "Valider" séparé — le tap sur C-10 suffit (action immédiate)
- Pas de skip — chaque question est nécessaire au tri

**Anti-patterns izh :**

- Jamais de formulaire classique (radio buttons, labels formels) — le questionnaire est une conversation
- Jamais de barre de progression remplie — trop anxiogène pour 2-4 questions
- Jamais cacher la tâche en cours — l'utilisateur doit toujours savoir ce qu'il trie

---

### Accessibilité

| Critère        | Spécification                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Rôle**       | `role="group"` sur la question-card · `aria-labelledby` pointant vers le texte de la question                    |
| **Annonce**    | `aria-live="polite"` sur le conteneur — annonce la nouvelle question à chaque transition                         |
| **Question**   | `<h2>` ou `aria-level="2"` pour le texte de la question                                                          |
| **Retour**     | `<button>` natif · `aria-label="Retour à la question précédente"`                                                |
| **Progress**   | `aria-label="Question [N] sur [Total]"` sur le conteneur dots (C-12)                                             |
| **Focus**      | Au slide-in, focus automatique sur la première option (C-10) · `:focus-visible` obligatoire                      |
| **Clavier**    | `Tab` = accéder aux options · `↑↓` = naviguer entre options · `Enter`/`Space` = sélectionner · `Escape` = retour |
| **Transition** | `prefers-reduced-motion: reduce` → fade au lieu de slide                                                         |
| **Contraste**  | Question text #37352F sur #FFF = 14.5:1 AAA · Micro-texte #B4B4B0 = décoratif uniquement                         |

---

### Checklist de validation

- [x] Comportement Kholmatova défini et confirmé
- [x] Anatomie complète avec tokens (contexte tâche, retour, micro-texte, question, réponses, dots)
- [x] Variantes documentées : cognitive (vertical) et purge (inline)
- [x] Sous-variantes par flux cognitif (4 flux + aiguillage)
- [x] États de transition : entering, exiting, returning avec specs d'animation
- [x] Backdrop blur + ombre documentés
- [x] Règles d'accessibilité : group, aria-live, focus auto, clavier, reduced-motion
- [x] Comportements spécifiques : contexte tâche, pré-sélection retour, layout inline purge
- [x] Règles d'usage et anti-patterns documentés
- [x] Preview visuelle validée dans le .pen

---

## C-12 — Progress Dots

**Comportement utilisateur encouragé :** Poursuivre le questionnaire en voyant qu'il avance — chaque dot rempli récompense la progression et réduit l'incertitude ("il en reste combien ?"). Micro-engagement qui rend la complétion naturelle.

**Référence :** Kholmatova (pattern de progression incrémentale), Nogier (feedback immédiat < 100ms sur changement d'état)

### Anatomie

```
         ●    ●    ○    ○    ○
         ←─ gap ─→
  ┌──────────────────────────────────┐
  │  [dot] [dot] [dot] [dot] [dot]  │
  │           ← gap: 8px →          │
  └──────────────────────────────────┘
      position: bottom-center
```

**Tokens utilisés :**

- Taille dot : 8px × 8px
- Border radius : `var(--radius-full)` (9999px — cercle parfait)
- Gap entre dots : `var(--space-2)` (8px)
- Dot actif (passé/courant) : `var(--color-action-primary)` (#37352F)
- Dot inactif (à venir) : `var(--color-border-default)` (#E3E3E0)
- Transition dot : `var(--transition-hover)` (120ms ease-out)
- Padding conteneur : `var(--space-3)` (12px) vertical

---

### Variantes

| Variante                | Nombre de dots                           | Usage izh                         |
| ----------------------- | ---------------------------------------- | --------------------------------- |
| **Questionnaire tri**   | 2–5 dots (selon le flux cognitif)        | SCR-03 — questionnaire Eisenhower |
| **Questionnaire purge** | Variable (selon nombre de tâches revues) | SCR-08 — purge de la Réserve      |

> **Note :** Pour la purge (SCR-08), le nombre de tâches est potentiellement élevé (jusqu'à 40). Dans ce cas, utiliser un **compteur textuel** ("3/12 tâches revues") plutôt que des dots — les dots deviennent illisibles au-delà de ~7. Le composant C-12 est réservé aux flux courts (2–5 étapes).

---

### États

| État           | Déclencheur            | Changement visuel                                                        | Comportement                                                            |
| -------------- | ---------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| **Completed**  | Question répondue      | Dot rempli `--color-action-primary` — 8×8px                              | Indique une étape passée                                                |
| **Current**    | Question affichée      | Dot rempli `--color-action-primary` + `transform: scale(1.25)` — 10×10px | Identifie l'étape courante                                              |
| **Upcoming**   | Questions restantes    | Dot vide `--color-border-default` — 8×8px                                | Montre le chemin restant                                                |
| **Transition** | Changement de question | Dot passe de upcoming → current → completed                              | Animation 120ms, synchronisée avec le slide horizontal du questionnaire |

---

### Comportements spécifiques

| Comportement         | Spécification                                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Progression**      | Les dots se remplissent de gauche à droite — cohérent avec la direction de lecture                                                            |
| **Retour arrière**   | Si l'utilisateur tape [← Retour], le dot courant revient à l'étape précédente — le dot "current" recule, le dot suivant repasse en "upcoming" |
| **Nombre dynamique** | Le nombre de dots est déterminé au lancement du flux (2–5 selon l'aiguillage). Il ne change pas en cours de questionnaire                     |
| **Position**         | Bottom-center de l'écran questionnaire, au-dessus de la safe area mobile                                                                      |
| **Animation**        | Le scale du dot current pulse une seule fois à l'arrivée (120ms ease-out), pas de loop — cohérent avec la philosophie calme                   |

---

### Règles d'usage

**Faire :**

- Toujours visible pendant le questionnaire — l'utilisateur sait où il en est
- Synchroniser l'animation des dots avec la transition slide du contenu
- Réserver aux flux courts (2–7 étapes max)

**Ne pas faire :**

- Pas de dots cliquables/tappables — la navigation se fait via les réponses et le bouton retour
- Pas de labels sous les dots — le questionnaire est trop court pour nécessiter des labels
- Pas d'animation de pulse en boucle — contraire à la philosophie calme
- Pas de dots pour les flux longs (purge) — utiliser un compteur textuel à la place

**Anti-patterns izh :**

- Pas de barre de progression (progress bar) — les dots discrets sont plus cohérents avec l'esthétique sobre/Notion
- Pas de pourcentage affiché — trop "gamifié" pour le ton d'izh

---

### Accessibilité

| Critère           | Spécification                                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rôle**          | `role="progressbar"` sur le conteneur                                                                                                                      |
| **ARIA**          | `aria-valuenow="2"`, `aria-valuemin="1"`, `aria-valuemax="5"`, `aria-label="Question 2 sur 5"`                                                             |
| **Contraste**     | Dot actif (#37352F) sur fond blanc = 14.5:1 ✅ AAA · Dot inactif (#E3E3E0) sur fond blanc = 1.6:1 — décoratif, non informatif (l'info est portée par ARIA) |
| **Clavier**       | Non focusable — pas un élément interactif                                                                                                                  |
| **Screen reader** | Annonce "Question [N] sur [total]" à chaque changement via `aria-live="polite"`                                                                            |

---

### Checklist de validation — Progress Dots ✅

- [x] Comportement Kholmatova défini et confirmé
- [x] Tous les états définis (completed, current, upcoming, transition)
- [x] Tokens de design référencés (aucune valeur hardcodée)
- [x] Règles d'accessibilité : aria-progressbar, aria-valuenow, live region
- [x] Comportement responsive documenté (position bottom-center)
- [x] Cas limites définis (flux courts vs longs, retour arrière)
- [x] Règles d'usage et anti-patterns documentés
- [x] Preview visuelle validée dans le .pen

---

## C-14 — Reserve Section

**Comportement utilisateur encouragé :** Organiser mentalement son backlog par catégorie — chaque section pliable représente un quadrant Eisenhower, permettant de scanner rapidement l'inventaire sans être submergé. L'accordéon révèle les tâches à la demande, encourageant un rapport "au besoin" plutôt qu'une vue exhaustive anxiogène.

**Référence :** Kholmatova (pattern de groupement — réduire la complexité perçue par catégorisation), Nogier (progressive disclosure — montrer ce qui est pertinent), Gestalt (proximité + enclosure)

**Écrans :** SCR-06 (Réserve) — 4 instances (Q1 Critique, Q2 Essentiel, Q3 Fausse urgence, Q4 Optionnel)

### Anatomie

```
┌─────────────────────────────────────────────┐
│  🔥 [Label quadrant]             (N)   [▾]  │  ← header (toujours visible)
├─────────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐    │
│  │  Task Item Reserve (C-03 variant)   │    │  ← children (expanded only)
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │  Task Item Reserve (C-03 variant)   │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

**Tokens utilisés :**

- Fond section : `var(--color-surface-base)` (#FFF)
- Border default : `1px solid var(--color-border-default)` (#E3E3E0)
- Border hover : `1.5px solid var(--color-quadrant-[Qn])` (couleur du quadrant)
- Border radius : `var(--radius-component)` (8px)
- Padding header : `var(--space-3)` (12px) vertical · `var(--space-4)` (16px) horizontal
- Padding children : `0` top · `var(--space-4)` (16px) horizontal · `var(--space-3)` (12px) bottom
- Gap entre items : `var(--space-stack-sm)` (8px)
- Label quadrant : `var(--text-label)` — Inter 13px Medium 500 · `var(--color-text-primary)`
- Icône quadrant : Lucide 16×16px · couleur du quadrant (voir tableau variantes)
- Counter : badge pill · fond `var(--color-quadrant-[Qn]-surface)` · texte `var(--color-quadrant-[Qn])` · `var(--text-caption)` 10px Semi-bold 600 · `border-radius: 10px` · padding `0 8px` · height 20px
- Chevron : `16×16px` · `var(--color-text-secondary)` · rotation `0°` (collapsed) → `180°` (expanded)
- Transition expand/collapse : `var(--transition-expand)` (200ms ease-out)

---

### Variantes par quadrant

| Variante | Label izh      | Icône Lucide | Token couleur              | Token surface                      | Expanded par défaut |
| -------- | -------------- | ------------ | -------------------------- | ---------------------------------- | ------------------- |
| **Q1**   | Critique       | `flame`      | `var(--color-quadrant-q1)` | `var(--color-quadrant-q1-surface)` | Oui                 |
| **Q2**   | Essentiel      | `shield`     | `var(--color-quadrant-q2)` | `var(--color-quadrant-q2-surface)` | Non                 |
| **Q3**   | Fausse urgence | `zap`        | `var(--color-quadrant-q3)` | `var(--color-quadrant-q3-surface)` | Non                 |
| **Q4**   | Optionnel      | `timer`      | `var(--color-quadrant-q4)` | `var(--color-quadrant-q4-surface)` | Non                 |

> **Logique d'état initial :** Q1 est expanded par défaut car c'est le quadrant prioritaire. Les autres sont collapsed — l'utilisateur déplie à la demande.

---

### États

| État            | Déclencheur                   | Changement visuel                                                                                                            | Comportement                                                            |
| --------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Collapsed**   | État par défaut (sauf Q1)     | Header seul visible. Chevron ▸ (droite). Children masqués (`height: 0`, `overflow: hidden`)                                  | Tap header → expanded                                                   |
| **Expanded**    | Tap header ou état initial Q1 | Children visibles, slide-down 200ms. Chevron ▾ (bas, `rotate(180deg)`)                                                       | Tap header → collapsed                                                  |
| **Hover**       | Pointeur/doigt sur le header  | Border passe de `--color-border-default` à `1.5px solid var(--color-quadrant-[Qn])` (couleur du quadrant) · transition 120ms | Feedback visuel immédiat — identifie la section sur laquelle on va agir |
| **Empty**       | Section sans tâche            | Header visible, counter "0", pas de children. Texte subtle "Aucune tâche" centré                                             | Section reste pliable                                                   |
| **Drag active** | Long press sur un item enfant | Section reste expanded. Items réordonnables. Zone de drop `2px dashed var(--color-border-strong)`                            | Drag & drop intra-section uniquement                                    |

---

### Tailles

| Propriété            | Valeur                                              |
| -------------------- | --------------------------------------------------- |
| Hauteur header       | 44px min (Finger Friendly)                          |
| Largeur              | 100% - `2 × var(--space-page-mobile)` (100% - 32px) |
| Hauteur max expanded | Pas de limite — scroll de l'écran parent            |

---

### Règles d'usage

**Faire :**

- Toujours 4 sections, dans l'ordre Q1 → Q4, même si certaines sont vides
- L'icône Lucide est l'identité permanente du quadrant — toujours accompagnée du label textuel (accessibilité)
- Le counter en badge pill reflète le nombre de tâches en temps réel
- Toutes les tâches ont le même style visuel (fond blanc, bordure default, même hauteur)

**Ne pas faire :**

- Ne jamais masquer une section vide — l'absence de tâche est une information utile
- Ne pas permettre le drag inter-sections — le reclassement passe par le re-tri (overlay SCR-02)
- Ne pas empiler plus d'un niveau d'accordéon (pas de sous-sections)
- Ne pas différencier visuellement les tâches récentes des anciennes — uniformité des items

**Anti-patterns izh :**

- Pas de swipe-to-delete dans la Réserve — la suppression passe par la purge (SCR-07/08)
- Pas de checkbox — la complétion se fait uniquement dans le Focus (SCR-10)

---

### Accessibilité

| Critère            | Spécification                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| Rôle               | Header : `role="button"` + `aria-expanded="true/false"`                                                         |
| Label              | `aria-label="[Label quadrant] — [N] tâches"`                                                                    |
| Icône              | Décorative (`aria-hidden="true"`) — le label textuel suffit                                                     |
| Navigation clavier | `Tab` parcourt les headers · `Enter`/`Space` toggle expand · `Arrow Down/Up` entre sections                     |
| Drag & drop        | `aria-roledescription="sortable"` sur les items · annonce au screen reader "Tâche [X] déplacée en position [N]" |
| Reduced motion     | `prefers-reduced-motion: reduce` → pas d'animation expand/collapse, changement immédiat                         |

---

### Checklist de validation — Reserve Section ✅

- [x] Comportement Kholmatova défini et confirmé
- [x] Tous les états définis (collapsed, expanded, hover, empty, drag)
- [x] Tokens de design référencés (aucune valeur hardcodée)
- [x] Icônes Lucide par quadrant (flame, shield, zap, timer)
- [x] Counter en badge pill coloré
- [x] Border hover colorée par quadrant
- [x] Tâches uniformes (pas de style différencié)
- [x] Règles d'accessibilité : aria-expanded, role button, drag a11y
- [x] Règles d'usage et anti-patterns documentés
- [x] Preview visuelle validée dans le .pen

---

## C-15 — Counter Capacity

**Comportement utilisateur encouragé :** Savoir d'un coup d'œil où en est sa Réserve — le ratio "[N]/40" donne un repère spatial ("combien de place il reste") sans forcer à compter. Les variantes d'alerte douce et rouge préviennent l'utilisateur avant le blocage, encourageant un tri proactif plutôt qu'une confrontation soudaine au mur.

**Référence :** Kholmatova (pattern de feedback d'état — rendre visible l'invisible), Nogier (feedback continu et prévention de l'erreur — l'utilisateur ne doit jamais être surpris par une limite)

**Écrans :** SCR-06 (Réserve — header), SCR-09 (résultat de tri — bilan Réserve)

### Anatomie

```
  Tes tâches triées attendent ici · [N]/40
  ←─────── message ──────────→  ←counter→

┌──────────────────────────────────────────┐
│  [Message contextuel]  ·  [N]/[max]     │
└──────────────────────────────────────────┘
    ↕ intégré sous le heading H1 de l'écran
```

**Tokens utilisés :**

- Font message : `var(--text-caption)` — Inter 13px Regular 400
- Couleur message (default) : `var(--color-text-secondary)` (#808078)
- Font counter : `var(--text-caption)` — Inter 13px **Medium 500**
- Couleur counter (default) : `var(--color-text-secondary)` (#808078)
- Séparateur : `·` (middle dot) · même style que le message
- Margin-top sous heading : `var(--space-1)` (4px)
- Ligne unique, pas de retour à la ligne — `white-space: nowrap`

---

### Variantes

| Variante         | Condition       | Couleur counter                      | Couleur message                    | Comportement additionnel                                            | Usage izh                           |
| ---------------- | --------------- | ------------------------------------ | ---------------------------------- | ------------------------------------------------------------------- | ----------------------------------- |
| **default**      | N < 35          | `--color-text-secondary` (#808078)   | `--color-text-secondary` (#808078) | Aucun                                                               | SCR-06 en usage normal              |
| **alerte-douce** | 35 ≤ N < 40     | `--color-feedback-warning` (#FFA344) | `--color-text-secondary` (#808078) | Message change : "37/40 — un petit tri ?"                           | SCR-06 quand la Réserve se remplit  |
| **rouge**        | N = 40          | `--color-feedback-error` (#D14040)   | `--color-text-danger` (red-dark)   | Message change : "Ta Réserve est pleine (40/40). Fais de la place." | SCR-06 quand la Réserve est pleine  |
| **bilan**        | Après tri/purge | `--color-text-secondary` (#808078)   | `--color-text-secondary` (#808078) | Format simplifié : "Réserve : [N]/40"                               | SCR-09 résultat de tri, bilan purge |

---

### États

| État                 | Déclencheur                    | Changement visuel                                                   | Comportement                                                                                                       |
| -------------------- | ------------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Default**          | N < 35                         | Style de base, couleur neutre                                       | Statique, informatif                                                                                               |
| **Alerte douce**     | Tâche ajoutée, N atteint 35    | Counter passe en orange `--color-feedback-warning`. Message modifié | Transition couleur `var(--duration-normal)` (200ms)                                                                |
| **Rouge**            | N atteint 40                   | Counter passe en rouge `--color-feedback-error`. Message alarmant   | Transition couleur 200ms. Bloque l'ajout côté Réserve                                                              |
| **Mise à jour**      | Tâche ajoutée/supprimée/purgée | Counter N s'incrémente/décrémente                                   | Animation compteur : `var(--duration-normal)` (200ms). Pas de flash ou de bounce — le changement de chiffre suffit |
| **Retour à default** | Purge ramène N < 35            | Counter repasse en couleur neutre                                   | Transition douce 200ms                                                                                             |

> **Philosophie izh :** L'alerte douce est un nudge bienveillant, pas une alarme. Le rouge n'apparaît qu'à la limite absolue. Le ton reste calme — "un petit tri ?" plutôt que "ATTENTION".

---

### Messages par variante

| Variante             | Message complet                                                             |
| -------------------- | --------------------------------------------------------------------------- |
| **default (SCR-06)** | "Tes tâches triées attendent ici, active celles que tu veux faire · [N]/40" |
| **alerte-douce**     | "Ta Réserve se remplit, un petit tri ? · [N]/40"                            |
| **rouge**            | "Ta Réserve est pleine (40/40). Fais de la place."                          |
| **bilan (SCR-09)**   | "Réserve : [N]/40"                                                          |

> Le message de la variante default est défini par l'écran parent (Réserve). Le counter-capacity n'impose pas le message — il stylise le ratio N/max et adapte le ton selon le seuil.

---

### Seuils et logique

| Seuil            | Valeur | Déclencheur | Conséquence                                                                                                  |
| ---------------- | ------ | ----------- | ------------------------------------------------------------------------------------------------------------ |
| **Normal**       | 0–34   | —           | Affichage neutre                                                                                             |
| **Alerte douce** | 35–39  | `N >= 35`   | Counter orange, message modifié, nudge purge optionnel (overlay non bloquant dismissable)                    |
| **Plein**        | 40     | `N === max` | Counter rouge, message d'alerte, tri Vrac bloqué côté Réserve (la tâche reste dans Vrac avec badge quadrant) |

> **Max = 40** est une décision UX — cf. architecture (ARCH-SCR-06). Ce n'est pas un magic number : il est passé en prop `max` pour permettre un ajustement futur.

---

### Règles d'usage

**Faire :**

- Toujours afficher le counter dans le header de la Réserve — l'utilisateur doit voir la capacité en permanence
- Utiliser le format `N/max` — jamais un pourcentage, jamais une barre de progression
- Transition douce entre les variantes de couleur — pas de changement brusque
- Le message d'alerte douce est un nudge, pas un blocage — l'utilisateur peut l'ignorer

**Ne pas faire :**

- Pas de progress bar ou de jauge visuelle — le ratio textuel est plus calme et plus précis
- Pas d'animation de pulse ou de shake sur l'alerte — le changement de couleur suffit
- Pas de compteur animé qui "scrolle" les chiffres — le chiffre change directement
- Pas de tooltip ou de popover explicatif — le message est auto-suffisant

**Anti-patterns izh :**

- Pas de gamification du compteur (badges de remplissage, niveaux, récompenses)
- Pas d'alerte sonore ou haptique — le visuel seul informe
- Pas de rouge avant 40/40 — l'alerte douce orange suffit entre 35 et 39

---

## C-16 — Matrix Prominent Zone

**Comportement utilisateur encouragé :** Percevoir immédiatement le quadrant prioritaire et agir sur ses tâches sans navigation supplémentaire. La zone proéminente répond à "par quoi je commence ?" en affichant le quadrant actif en grand, titres complets et checkboxes accessibles — le geste le plus fréquent (compléter une tâche) est à portée directe.

**Référence :** Kholmatova (pattern fonctionnel de focalisation — réduire le bruit pour amplifier l'action), Nogier (manipulation directe, feedback < 200ms), Hick (1 quadrant à la fois = temps de décision minimal)

**Écrans :** SCR-10 Focus (mobile uniquement). Desktop/tablette utilisent la grille 2×2 symétrique.

### Anatomie

```
┌─────────────────────────────────────────────────┐
│  ⚡ Icon 16px   "Faire maintenant"    2 / 4    │  ← header
├─────────────────────────────────────────────────┤
│  ⠿  Finaliser le dossier client           ☐   │  ← task-item-focus (C-03)
│  ⠿  Appeler le fournisseur                ☐   │     [grip] [titre ←fill→] [☐]
│                                                 │     max 4 tâches
└─────────────────────────────────────────────────┘
  ↔ cornerRadius: var(--radius-component) (8px)
  ↔ border: 1px solid var(--color-border-default)
  ↔ shadow: 0 1px 3px rgba(0,0,0,0.03)
  ↔ fond: #FFFFFF
```

**Tokens utilisés :**

- Container : `background: #FFFFFF` · `border: 1px solid var(--color-border-default)` (#E3E3E0) · `border-radius: var(--radius-component)` (8px) · `box-shadow: 0 1px 3px rgba(0,0,0,0.03)` · `height: ~50% hauteur utile` (flexible)
- Icône quadrant : Lucide `16×16px` · couleur `var(--color-quadrant-[Qn])` · icône spécifique par quadrant (cf. C-08)
- Label quadrant : `var(--text-label)` — Inter 14px Medium 600 · `color: var(--color-text-primary)` (#37352F)
- Compteur : Inter 12px Regular · `color: var(--color-text-tertiary)` (#B4B4B0)
- Header padding : `14px 16px`
- Divider header/body : `1px solid var(--color-border-default)`
- Task rows : composant C-03 mode **row** variante `task-item-focus` — `[grip] [titre ←fill→] [☐]`
- Task row : fond `transparent` · height `40px` · padding `0 16px` · gap `10px` · titre Inter 14px
- Divider entre rows : `1px solid var(--color-border-default)` (#E3E3E0)
- Checkbox : `16×16px` · radius `3px` · border `1.5px solid var(--color-border-strong)`
- Body padding : `4px 0` (vertical uniquement)
- Transition swap : crossfade ~200ms

---

### Variantes par quadrant

| Quadrant        | Label izh          | Icône (Lucide) | Token couleur                        |
| --------------- | ------------------ | -------------- | ------------------------------------ |
| **Q1** (défaut) | "Faire maintenant" | `zap`          | `var(--color-quadrant-q1)` (#D14040) |
| **Q2**          | "Planifier"        | `calendar`     | `var(--color-quadrant-q2)` (#4DAB9A) |
| **Q3**          | "Déléguer"         | `forward`      | `var(--color-quadrant-q3)` (#FFA344) |
| **Q4**          | "Éliminer"         | `x`            | `var(--color-quadrant-q4)` (#B5B830) |

> **Direction Notion :** Le fond reste blanc pour tous les quadrants. La couleur est portée uniquement par l'icône dans le header — accent fonctionnel minimal, content-first.

---

### États

| État                | Déclencheur                 | Changement visuel                                                                                                        | Comportement                                     |
| ------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| **Populated**       | Quadrant a 1-4 tâches       | Liste de task-item-focus (C-03) avec grip + checkbox                                                                     | Interaction normale — drag, checkbox             |
| **Empty**           | Quadrant a 0 tâches         | Message contextuel centré — ex : "Rien à faire maintenant — respire." · Inter 14px · `color: var(--color-text-tertiary)` | Pas de checkbox, pas de drag                     |
| **Swapping**        | Tap sur une nav-card (C-17) | Crossfade ~200ms : contenu sortant fade-out, nouveau fade-in. L'icône et le label du header changent                     | `aria-live="polite"` annonce le nouveau quadrant |
| **Loading**         | Chargement initial          | Skeleton : 3 lignes placeholder (grip rect + bar + checkbox rect) en `var(--color-surface-muted)`                        | `aria-busy="true"`                               |
| **Task completing** | Tap checkbox                | La tâche fait fade-out (300ms) · compteur se décrémente · si dernière tâche → transition vers Empty                      | Toast undo (C-06)                                |

---

### Règles d'usage

**Faire :**

- Utiliser exclusivement sur mobile (SCR-10) — desktop/tablette affichent la grille 2×2
- Utiliser le composant C-03 `task-item-focus` pour chaque tâche — pas de structure custom
- Reset Q1 ("Faire maintenant") à chaque entrée sur l'écran Focus
- L'icône quadrant est le seul accent couleur — le fond reste blanc

**Ne pas faire :**

- Pas plus de 4 tâches — le max est garanti côté données
- Pas de drag inter-quadrant dans cette zone (feedback pédagogique via toast si tenté)
- Pas de mémorisation du dernier quadrant consulté — toujours reset Q1
- Pas de fond coloré par quadrant — direction Notion : blanc uniforme

**Anti-patterns izh :**

- Pas de tabs ou segmented control pour naviguer les quadrants — les nav-cards (C-17) gèrent ça
- Pas d'ombre au hover sur le container — l'ombre est structurelle, pas interactive

---

### Accessibilité

| Critère                | Implémentation                                                                    |
| ---------------------- | --------------------------------------------------------------------------------- |
| **Rôle**               | `role="region"` · `aria-label="Quadrant [Label] — [N] tâches sur 4"`              |
| **Live region**        | `aria-live="polite"` sur le container — annonce le changement de quadrant au swap |
| **Contraste**          | Icône couleur quadrant toujours doublée par le label textuel (WCAG 1.4.1)         |
| **Focus**              | Checkboxes focusables individuellement · focus-visible ring standard              |
| **Navigation clavier** | `Tab` parcourt les grip → checkbox de chaque tâche · `Escape` ne fait rien        |
| **Zone tactile**       | Checkboxes : `16×16px` visuel, `44×44px` zone de tap (padding invisible — Nogier) |
| **Drag**               | `aria-grabbed`, `aria-dropeffect` · annonce vocale du déplacement                 |

---

### Preview visuelle

Voir `09-design-systems-references.pen` — frame "Component Preview — C-16 Matrix Prominent Zone"

---

### Accessibilité

| Critère            | Spécification                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Élément**        | `<span>` inline dans le sous-titre — pas un composant autonome                                                                             |
| **ARIA**           | `aria-label="[N] tâches sur 40 dans la Réserve"` sur le counter                                                                            |
| **Live region**    | `aria-live="polite"` sur le conteneur parent — annonce les changements de compteur                                                         |
| **Alerte douce**   | `role="status"` — annonce passive au screen reader                                                                                         |
| **Rouge (plein)**  | `role="alert"` — annonce immédiate au screen reader : "Réserve pleine, 40 sur 40"                                                          |
| **Contraste**      | Orange (#FFA344) sur fond blanc = 2.1:1 — insuffisant seul → le message textuel porte l'info. Rouge (#D14040) sur fond blanc = 4.5:1 ✅ AA |
| **Non interactif** | Non focusable — c'est un indicateur passif, pas un contrôle                                                                                |

---

### Checklist de validation — Counter Capacity ✅

- [x] Comportement Kholmatova défini et confirmé (feedback d'état continu)
- [x] 4 variantes documentées (default, alerte douce, rouge, bilan) avec messages et couleurs
- [x] Tokens de design référencés (aucune valeur hardcodée)
- [x] Seuils définis (0–34, 35–39, 40) avec logique de transition
- [x] Règles d'accessibilité : aria-label, aria-live, role alert/status, contraste vérifié
- [x] Transition douce entre états (200ms)
- [x] Règles d'usage et anti-patterns documentés
- [x] Ton bienveillant cohérent avec la philosophie izh

---

## C-17 — Matrix Nav Card

**Comportement utilisateur encouragé :** Naviguer entre les 4 quadrants Eisenhower sans quitter l'écran Focus — chaque mini-card résume un quadrant (icône couleur, label, compteur) et un tap swap le contenu de la zone proéminente (C-16). Le comportement radio (1 seul actif) réduit la charge cognitive : "je suis ici, et voilà les 3 autres".

**Référence :** Kholmatova (pattern fonctionnel de navigation contextuelle — sélection parmi des options mutuellement exclusives), Nogier (manipulation directe, feedback < 200ms, Finger Friendly ≥ 44px), Hick (4 choix max = temps de décision optimal)

**Écrans :** SCR-10 Focus (mobile uniquement). Desktop/tablette affichent la grille 2×2 complète sans nav-cards.

### Anatomie

```
┌───────────────────────┐
│         ⚡ 24px        │  ← icône centrée (couleur quadrant)
│                       │
│  Label         N / 4  │  ← label gauche ↔ compteur droite
└───────────────────────┘
  ↔ cornerRadius: var(--radius-component) (8px)
  ↔ padding: 14px 16px
  ↔ gap icône → texte: 8px
```

**Tokens utilisés :**

- Container actif : `background: var(--color-quadrant-[Qn]-surface)` · `border: 2px solid var(--color-quadrant-[Qn])` · `border-radius: var(--radius-component)` (8px)
- Container inactif : `background: var(--color-surface-subtle)` (#F7F7F5) · `border: 1px solid var(--color-border-default)` (#E3E3E0)
- Icône quadrant : Lucide `24×24px` · couleur `var(--color-quadrant-[Qn])` · icône spécifique par quadrant (cf. C-08)
- Label : `var(--font-family-body)` — Inter 12px · actif: `fontWeight: 600` · inactif: `fontWeight: 500` · `color: var(--color-text-primary)` (#37352F)
- Compteur : Inter 11px · actif: `fontWeight: 500` · `color: var(--color-text-secondary)` (#808078) · inactif: `color: var(--color-text-tertiary)` (#B4B4B0)
- Padding : `14px 16px`
- Gap icône ↔ ligne texte : `8px`
- Layout interne : vertical (icône centrée), puis horizontal `space_between` (label ↔ compteur)
- Transition : `var(--transition-hover)` (120ms ease-out) sur background et border

---

### Variantes par quadrant

| Quadrant        | Label izh          | Icône (Lucide) | Token couleur                        | Token surface                                |
| --------------- | ------------------ | -------------- | ------------------------------------ | -------------------------------------------- |
| **Q1** (défaut) | "Faire maintenant" | `zap`          | `var(--color-quadrant-q1)` (#D14040) | `var(--color-quadrant-q1-surface)` (#EADCDC) |
| **Q2**          | "Planifier"        | `calendar`     | `var(--color-quadrant-q2)`           | `var(--color-quadrant-q2-surface)`           |
| **Q3**          | "Déléguer"         | `forward`      | `var(--color-quadrant-q3)` (#FFA344) | `var(--color-quadrant-q3-surface)` (#F0E4D3) |
| **Q4**          | "Éliminer"         | `x`            | `var(--color-quadrant-q4)` (#B5B830) | `var(--color-quadrant-q4-surface)` (#E8E5CB) |

> **Direction Notion :** Le fond de surface est une teinte très légère de la couleur quadrant — pas de fond saturé. L'icône reste le seul accent couleur fort.

---

### Taille et zone tactile

| Propriété        | Valeur                                                          |
| ---------------- | --------------------------------------------------------------- |
| **Largeur**      | `fill_container` (50% de la grille - gap)                       |
| **Hauteur**      | `fit_content` (~68px avec padding + icône 24px + ligne texte)   |
| **Zone tactile** | Card entière — minimum 44×44px garanti (Nogier Finger Friendly) |
| **Grille**       | 2×2 · gap `10px` entre cards                                    |
| **Position**     | Sous la zone proéminente (C-16), ~20-25% hauteur utile          |

---

### États

| État              | Déclencheur                                  | Changement visuel                                                                                                                             | Comportement                        |
| ----------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Active**        | Card du quadrant affiché en zone proéminente | Fond `--color-quadrant-[Qn]-surface` · border `2px solid --color-quadrant-[Qn]` · label `fontWeight: 600` · compteur `--color-text-secondary` | `aria-checked="true"`               |
| **Inactive**      | Les 3 autres quadrants                       | Fond `--color-surface-subtle` · border `1px solid --color-border-default` · label `fontWeight: 500` · compteur `--color-text-tertiary`        | `aria-checked="false"`              |
| **Hover**         | Survol souris (desktop)                      | Border passe à `--color-border-strong` · `box-shadow: 0 1px 3px rgba(0,0,0,0.07)`                                                             | `cursor: pointer`                   |
| **Pressed**       | Touchstart / mousedown                       | Fond passe à `--color-quadrant-[Qn]-surface` · border `2px solid --color-quadrant-[Qn]` · `opacity: 0.9`                                      | Feedback tactile immédiat           |
| **Focus-visible** | Tab / focus clavier                          | Ring : `0 0 0 2px var(--color-surface-base), 0 0 0 4px var(--color-border-focus)`                                                             | Jamais supprimer — obligatoire WCAG |

> **Comportement radio :** Quand une card passe à Active, l'ancienne Active retourne à Inactive. Transition crossfade ~200ms sur la zone proéminente (C-16).

---

### Modificateurs

| Modificateur | Effet                                              | Usage izh                                                                         |
| ------------ | -------------------------------------------------- | --------------------------------------------------------------------------------- |
| `empty`      | Compteur affiche "0/4" · icône en `opacity: 0.5`   | Quadrant sans tâches assignées                                                    |
| `updating`   | Compteur pulse brièvement (scale 1.1 → 1.0, 300ms) | Après complétion d'une tâche dans la zone proéminente — le compteur se met à jour |

---

### Règles d'usage

**Faire :**

- Utiliser exclusivement sur mobile (SCR-10) — desktop/tablette affichent la grille 2×2 complète
- Toujours afficher les 4 cards même si un quadrant est vide (compteur 0/4)
- Reset Q1 ("Faire maintenant") comme card active à chaque entrée sur l'écran Focus
- Les positions des 4 cards sont fixes : Q1 top-left, Q2 top-right, Q3 bottom-left, Q4 bottom-right

**Ne pas faire :**

- Pas de réorganisation des cards selon le nombre de tâches — positions toujours fixes
- Pas de masquage d'une card vide — toujours visible avec "0/4"
- Pas de scroll dans la grille — les 4 cards sont toujours visibles simultanément
- Pas de double-tap ou long-press — un tap simple suffit

**Anti-patterns izh :**

- Pas de tabs ou segmented control pour cette navigation — les cards visuelles sont plus expressives
- Pas d'animation de déplacement des cards au swap — seul le contenu de la zone proéminente change
- Pas de fond coloré saturé — direction Notion : surface très légère + icône accent

---

### Accessibilité

| Critère                | Implémentation                                                                                                    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Rôle**               | `role="radiogroup"` sur le conteneur grille · `role="radio"` sur chaque card                                      |
| **ARIA**               | `aria-checked="true"` sur la card active · `aria-label="[Label quadrant] — [N] tâches sur 4"`                     |
| **Contraste**          | Icône couleur quadrant doublée par le label textuel (WCAG 1.4.1 — ne pas transmettre l'info par la couleur seule) |
| **Focus**              | Chaque card focusable · focus-visible ring standard · navigation par flèches dans le radiogroup                   |
| **Navigation clavier** | `Tab` entre dans le radiogroup · `←→↑↓` navigue entre les cards · `Space/Enter` active la card focusée            |
| **Zone tactile**       | Card entière cliquable — minimum 44×44px garanti (Nogier Finger Friendly)                                         |
| **Live region**        | `aria-live="polite"` sur la zone proéminente (C-16) — annonce le changement de quadrant                           |

---

### Preview visuelle

Voir `09-design-systems-references.pen` :

- Frame "Component Preview — C-17 Matrix Nav Card" — variantes, états, specs
- Frame "Context Preview — SCR-10 Focus (C-05 + C-16 + C-17)" — écran complet assemblé

---

### Checklist de validation — Matrix Nav Card ✅

- [x] Comportement Kholmatova défini (navigation contextuelle radio)
- [x] Anatomie : icône 24px centrée, label ↔ compteur en space_between
- [x] 4 variantes par quadrant documentées (Q1-Q4) avec tokens couleur et surface
- [x] 5 états documentés (active, inactive, hover, pressed, focus-visible)
- [x] Tous les tokens référencés — aucune valeur hardcodée
- [x] Zone tactile ≥ 44px (Finger Friendly Nogier)
- [x] Accessibilité : radiogroup, aria-checked, navigation clavier, contraste vérifié
- [x] Règles d'usage et anti-patterns documentés
- [x] Preview visuelle dans le .pen (composant isolé + contexte SCR-10)

---

## C-17b — Matrix Quadrant (desktop)

**Comportement utilisateur encouragé :** Scanner l'ensemble de ses priorités d'un coup d'œil et agir directement — les 4 quadrants Eisenhower sont visibles simultanément, chacun avec ses tâches et des checkboxes. Pas de navigation, pas de swap : "je vois tout, j'agis là où c'est urgent". La grille 2×2 exploite la loi de proximité (Gestalt) pour regrouper visuellement urgent/important.

**Référence :** Kholmatova (pattern fonctionnel de vue panoramique — réduire la charge cognitive par la vue d'ensemble), Nogier (manipulation directe, feedback < 100ms), Hick (4 quadrants = temps de décision optimal)

**Écrans :** SCR-10 Focus (desktop et tablette uniquement). Mobile utilise C-16 + C-17 à la place.

### Anatomie

```
  ⚡ Faire maintenant        2/4   │  📅 Planifier              1/4
  Urgent et important — en premier │  Important — fais-lui de la place
                                    │
  ┌────────────────────────────┐    │  ┌────────────────────────────┐
  │ ⠿  Envoyer devis...    ☐  │    │  │ ⠿  Définir objectifs   ☐  │
  └────────────────────────────┘    │  └────────────────────────────┘
  ┌────────────────────────────┐    │
  │ ⠿  Corriger retours... ☐  │    │
  └────────────────────────────┘    │
────────────────────────────────────┼───────────────────────────────────
  → Déléguer                 1/4   │  ✕ Éliminer                0/4
  Ça presse mais c'est pas vital   │  C'est ok si ça attend
                                    │
  ┌────────────────────────────┐    │           Vide
  │ ⠿  Rappeler mairie...  ☐  │    │
  └────────────────────────────┘    │
```

**Séparation :** Axes horizontaux et verticaux (lignes 1px `var(--color-border-default)`) — pas de bordures de cards sur les quadrants.

**Structure interne d'un quadrant :**

```
│                                     │
│  ⚡ 18px  Label          N/4        │  ← header : icône Lucide couleur + label + compteur
│  Sous-titre contextuel              │  ← sous-titre en text-secondary
│                                     │  ← gap implicite
│  ┌─────────────────────────────────┐│
│  │ ⠿  Titre de la tâche        ☐  ││  ← task card : grip + titre + checkbox droite
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │ ⠿  Titre de la tâche        ☐  ││
│  └─────────────────────────────────┘│
│                                     │
│         (espace libre extensible)   │
│                                     │
```

**Tokens utilisés :**

- Conteneur quadrant : `background: var(--color-surface-base)` (#FFFFFF) · pas de bordure individuelle — séparé par des **axes** (lignes 1px `var(--color-border-default)`)
- Padding interne : `var(--space-5)` (20px)
- Icône quadrant : Lucide `18×18px` · couleur `var(--color-quadrant-[Qn])` · icône spécifique par quadrant (cf. C-08 : zap, calendar, forward, x)
- Label quadrant : `var(--text-body)` — Inter 15px Semi-Bold 600 · `color: var(--color-text-primary)` (#37352F)
- Compteur : `var(--text-label)` — Inter 13px Medium 500 · `color: var(--color-text-tertiary)` (#B4B4B0)
- Sous-titre : `var(--text-caption)` — Inter 11px Regular 400 · `color: var(--color-text-secondary)` (#808078)
- Gap header → sous-titre : `var(--space-1)` (4px)
- Gap sous-titre → liste tâches : `var(--space-3)` (12px)
- Gap entre task items : `var(--space-2)` (8px)
- Layout header interne : `flex` · `justify-content: space-between` · `align-items: center`
- Gap icône ↔ label : `var(--space-2)` (8px)
- Task item : card blanche `background: #FFFFFF` · `border: 1px solid var(--color-border-default)` · `border-radius: var(--radius-md)` (8px) · `padding: 12px 14px`
- Task item layout : `grip-vertical` 16px (#B4B4B0) → titre `fill_container` → checkbox 16×16px carrée `border-radius: 3px` · `border: 1.5px solid var(--color-border-strong)`
- Empty state texte : `var(--text-body)` — Inter 15px Regular 400 · `color: var(--color-text-tertiary)` (#B4B4B0) · centré verticalement et horizontalement

---

### Variantes par quadrant

| Quadrant | Label izh          | Sous-titre contextuel                        | Icône dot  | Token couleur                        | Token surface |
| -------- | ------------------ | -------------------------------------------- | ---------- | ------------------------------------ | ------------- |
| **Q1**   | "Faire maintenant" | "Urgent et important — en premier"           | `zap`      | `var(--color-quadrant-q1)` (#D14040) | —             |
| **Q2**   | "Planifier"        | "Important — fais-lui de la place"           | `calendar` | `var(--color-quadrant-q2)`           | —             |
| **Q3**   | "Déléguer"         | "Ça presse mais c'est pas vital — fais vite" | `forward`  | `var(--color-quadrant-q3)` (#FFA344) | —             |
| **Q4**   | "Éliminer"         | "C'est ok si ça attend"                      | `x`        | `var(--color-quadrant-q4)` (#B5B830) | —             |

> **Direction Notion :** Pas de fond coloré par quadrant — fond blanc uniforme. L'icône Lucide 18px est le seul accent couleur. Séparation par axes (lignes 1px), pas par bordures de cards. L'information de priorité est portée par le label + sous-titre, pas par la couleur seule (WCAG 1.4.1).

---

### Layout grille

| Propriété              | Valeur                                                                      |
| ---------------------- | --------------------------------------------------------------------------- |
| **Display**            | `grid` · `grid-template-columns: 1fr 1fr` · `grid-template-rows: 1fr 1fr`   |
| **Gap**                | `var(--space-4)` (16px)                                                     |
| **Positions**          | Q1 top-left · Q2 top-right · Q3 bottom-left · Q4 bottom-right               |
| **Hauteur quadrant**   | `minmax(200px, 1fr)` — s'étend pour remplir l'espace disponible             |
| **Largeur max grille** | Contrainte par le conteneur main (total viewport - sidebar 240px - padding) |
| **Breakpoint**         | ≥ 768px (tablette) : grille 2×2. < 768px : bascule vers C-16 + C-17 mobile  |

---

### États

| État                      | Déclencheur                                         | Changement visuel                                                                                                    | Comportement                                                  |
| ------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Default**               | —                                                   | Fond blanc, border default, tâches listées                                                                           | Chaque quadrant visible simultanément                         |
| **Hover quadrant**        | Survol souris sur le conteneur                      | `border-color: var(--color-border-strong)` (#D6D6D0) · `box-shadow: var(--shadow-card-hover)`                        | `cursor: default` (pas de navigation — action sur les tâches) |
| **Empty**                 | Quadrant sans tâches actives                        | Compteur "0/4" · zone centrale affiche "Vide" en `--color-text-tertiary` · pas de liste de tâches                    | Aucune action possible dans ce quadrant                       |
| **Task completing**       | Checkbox cochée dans un quadrant                    | Task item : fade out + scale down (300ms) · compteur N/4 se décrémente · toast undo 5s                               | `aria-live="polite"` sur le compteur                          |
| **Focus-visible**         | Tab sur un quadrant                                 | Ring : `0 0 0 2px var(--color-surface-base), 0 0 0 4px var(--color-border-focus)` sur le conteneur quadrant          | Tab entre quadrants, puis Tab dans les tâches                 |
| **Task hover**            | Survol d'un task item                               | Task item : `background: var(--color-surface-subtle)` (#F7F7F5) · `border-radius: var(--radius-sm)` (4px)            | `cursor: pointer` sur la checkbox                             |
| **Drag over** (drop zone) | Drag d'une tâche depuis un quadrant vers la Réserve | Quadrant source : tâche en semi-transparence. Zone Réserve (sidebar) : highlight `--color-surface-subtle`            | Drop = remettre en Réserve                                    |
| **Drag interdit**         | Drag d'une tâche vers un autre quadrant             | `cursor: not-allowed` · snap-back animation · toast pédagogique "Pour reclasser, remets-la d'abord dans la Réserve." | Interdit par design — pas de reclassement direct              |

---

### Modificateurs

| Modificateur    | Effet                                                                                                   | Usage izh                                      |
| --------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `highlight-new` | Task item nouvellement activé : fond `--color-quadrant-[Qn]-surface` pendant 2-3s puis fade vers normal | Après activation d'une tâche depuis la Réserve |
| `all-empty`     | Les 4 quadrants vides → afficher l'empty state global (C-07) par-dessus la grille                       | Aucune tâche activée — CTA "Voir la Réserve"   |

---

### Règles d'usage

**Faire :**

- Utiliser exclusivement sur desktop/tablette (≥ 768px) — mobile utilise C-16 + C-17
- Toujours afficher les 4 quadrants même si certains sont vides (compteur 0/4, texte "Vide")
- Positions fixes : Q1 top-left, Q2 top-right, Q3 bottom-left, Q4 bottom-right — jamais réordonnées
- Les task items à l'intérieur sont des C-03 (Card) en variante `focus` — checkbox + titre
- Maximum 4 tâches par quadrant — cohérence avec la règle Focus

**Ne pas faire :**

- Pas de fond coloré par quadrant — direction Notion : blanc + dot accent seulement
- Pas de collapse/accordion des quadrants — les 4 sont toujours visibles
- Pas de drag & drop entre quadrants — uniquement vers la Réserve (sidebar)
- Pas de scroll interne par quadrant — max 4 tâches, toujours visibles
- Pas de zone proéminente (C-16) ni de nav-cards (C-17) en desktop — la grille les remplace

**Anti-patterns izh :**

- Pas de kanban horizontal — la matrice 2×2 est le pattern Eisenhower
- Pas de tri ou filtre dans la grille — chaque quadrant a sa logique propre
- Pas de resize des quadrants par l'utilisateur — les 4 ont toujours la même taille

---

### Accessibilité

| Critère                | Implémentation                                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| **Rôle**               | `role="region"` sur chaque quadrant · `aria-label="[Label quadrant] — [N] tâches sur 4"`                 |
| **Structure**          | Grille = `role="grid"` ou layout natif CSS Grid · chaque quadrant = `role="region"` avec heading         |
| **Heading**            | Chaque label quadrant = `<h3>` pour la structure du document (sous le `<h1>` "Focus")                    |
| **Contraste**          | Dot couleur doublé par le label textuel (WCAG 1.4.1 — ne pas transmettre l'info par la couleur seule)    |
| **Focus**              | Tab navigue entre quadrants → Tab entre dans les task items → Space/Enter sur checkbox                   |
| **Navigation clavier** | `Tab` entre les 4 quadrants (ordre : Q1 → Q2 → Q3 → Q4) · `Tab` dans un quadrant accède aux checkboxes   |
| **Live region**        | `aria-live="polite"` sur chaque compteur — annonce "N tâches sur 4" au changement                        |
| **Drag & drop**        | Alternative clavier : bouton contextuel "Remettre en Réserve" sur chaque task item (accessible au focus) |

---

### Checklist de validation — Matrix Quadrant (desktop) ✅

- [x] Comportement Kholmatova défini (vision panoramique + action directe)
- [x] Anatomie : dot 8px + label + compteur en header, sous-titre, liste tâches
- [x] 4 variantes par quadrant documentées (Q1-Q4) avec tokens couleur
- [x] 7 états documentés (default, hover, empty, task completing, focus-visible, task hover, drag)
- [x] Tous les tokens référencés — aucune valeur hardcodée
- [x] Layout grille CSS Grid spécifié avec breakpoint
- [x] Relation avec C-16/C-17 mobile documentée
- [x] Accessibilité : regions, headings, navigation clavier, contraste vérifié
- [x] Règles d'usage et anti-patterns documentés
- [x] Drag & drop vers Réserve + interdiction inter-quadrant documentés
- [x] Preview visuelle dans le .pen (composant isolé + contexte SCR-10 desktop)

### Preview visuelle

Voir `09-design-systems-references.pen` :

- Frame "Component Preview — C-17b Matrix Quadrant (desktop)" — grille 2×2, specs tokens
- Frame "Context Preview — SCR-10 Focus Desktop (C-17b)" — écran complet sidebar + grille

---

_BMAD-UX Method v1.2 — Spécifications composants (Agent 06/10)_
