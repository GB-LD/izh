> Référence rapide pour tester des composants React de manière centrée sur l'utilisateur.
> Basé sur la documentation officielle de [@testing-library](https://testing-library.com/) (mars 2026).

---

## 1. Installation

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Dans le fichier de setup de test (ex : `setupTests.js`) :

```javascript
import '@testing-library/jest-dom'
```

---

## 2. Structure de base d'un test

```javascript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import MonComposant from './MonComposant'

test('décrit le comportement attendu', async () => {
  const user = userEvent.setup()

  render(<MonComposant />)

  // Requêter un élément
  const bouton = screen.getByRole('button', { name: /envoyer/i })

  // Interagir
  await user.click(bouton)

  // Vérifier le résultat
  expect(screen.getByText('Envoyé !')).toBeInTheDocument()
})
```

---

## 3. Requêtes (Queries) — Priorité recommandée

Utiliser les requêtes **dans cet ordre de priorité** (du plus accessible au moins accessible) :

| Priorité | Requête | Quand l'utiliser |
|----------|---------|-----------------|
| 1 | `getByRole` | **Toujours en premier.** Boutons, liens, titres, cases à cocher, etc. |
| 2 | `getByLabelText` | Champs de formulaire associés à un `<label>` |
| 3 | `getByPlaceholderText` | Si pas de label (déconseillé en accessibilité) |
| 4 | `getByText` | Texte visible non-interactif (paragraphes, spans) |
| 5 | `getByDisplayValue` | Valeur actuelle d'un `<input>`, `<select>`, `<textarea>` |
| 6 | `getByAltText` | Images (`alt`), `<area>`, `<input>` custom |
| 7 | `getByTitle` | Attribut `title` (peu fiable en accessibilité) |
| 8 | `getByTestId` | **Dernier recours.** Quand aucune autre requête ne convient |

### Variantes de requêtes

| Préfixe | 0 résultat | 1 résultat | N résultats | Async |
|---------|-----------|-----------|------------|-------|
| `getBy` | erreur | retourne | erreur | non |
| `queryBy` | `null` | retourne | erreur | non |
| `findBy` | erreur | retourne | erreur | **oui** |
| `getAllBy` | erreur | tableau | tableau | non |
| `queryAllBy` | `[]` | tableau | tableau | non |
| `findAllBy` | erreur | tableau | tableau | **oui** |

**Règle :**
- `getBy` → l'élément **doit** être présent
- `queryBy` → vérifier qu'un élément **n'existe pas**
- `findBy` → l'élément **apparaîtra** après une opération asynchrone

---

## 4. Exemples de requêtes courantes

```javascript
// Bouton par son rôle et son nom accessible
screen.getByRole('button', { name: /soumettre/i })

// Lien
screen.getByRole('link', { name: /accueil/i })

// Titre h1, h2, etc.
screen.getByRole('heading', { level: 2, name: /bienvenue/i })

// Case à cocher
screen.getByRole('checkbox', { name: /accepter les conditions/i })

// Champ de formulaire par son label
screen.getByLabelText(/nom d'utilisateur/i)

// Texte visible
screen.getByText(/aucun résultat trouvé/i)

// Vérifier l'absence d'un élément
expect(screen.queryByText(/erreur/i)).not.toBeInTheDocument()

// Attendre un élément asynchrone
const message = await screen.findByText(/chargement terminé/i)
```

---

## 5. Interactions utilisateur avec `userEvent`

> **Toujours préférer `userEvent` à `fireEvent`.** `userEvent` simule le comportement réel du navigateur (focus, keydown, keyup, input, change...).

```javascript
const user = userEvent.setup()
```

| Action | Code |
|--------|------|
| Clic | `await user.click(element)` |
| Double-clic | `await user.dblClick(element)` |
| Saisie de texte | `await user.type(element, 'texte')` |
| Effacer un champ | `await user.clear(element)` |
| Sélectionner une option | `await user.selectOptions(element, 'valeur')` |
| Cocher / décocher | `await user.click(checkbox)` |
| Tabulation | `await user.tab()` |
| Touche clavier | `await user.keyboard('{Enter}')` |
| Upload fichier | `await user.upload(input, file)` |
| Survol (hover) | `await user.hover(element)` |

### Exemple complet — Formulaire

```javascript
test('soumission de formulaire', async () => {
  const handleSubmit = jest.fn(e => e.preventDefault())
  const user = userEvent.setup()

  render(
    <form onSubmit={handleSubmit}>
      <label>
        Nom d'utilisateur
        <input name="username" />
      </label>
      <label>
        Pays
        <select name="country">
          <option value="">Sélectionner...</option>
          <option value="fr">France</option>
          <option value="ca">Canada</option>
        </select>
      </label>
      <label>
        <input type="checkbox" name="terms" />
        Accepter les conditions
      </label>
      <button type="submit">Envoyer</button>
    </form>
  )

  await user.type(screen.getByLabelText(/nom d'utilisateur/i), 'marie')
  await user.selectOptions(screen.getByLabelText(/pays/i), 'fr')
  await user.click(screen.getByLabelText(/accepter les conditions/i))
  await user.click(screen.getByRole('button', { name: /envoyer/i }))

  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
```

---

## 6. Assertions courantes (`jest-dom`)

| Assertion | Vérifie |
|-----------|---------|
| `toBeInTheDocument()` | L'élément est dans le DOM |
| `toBeVisible()` | L'élément est visible (pas `display:none`, `visibility:hidden`, `opacity:0`) |
| `toBeDisabled()` / `toBeEnabled()` | État désactivé/activé |
| `toHaveTextContent(/texte/i)` | Contenu textuel (accepte regex) |
| `toHaveValue('valeur')` | Valeur d'un input/select/textarea |
| `toHaveAttribute('attr', 'val')` | Attribut HTML |
| `toHaveClass('classe')` | Classe CSS |
| `toBeChecked()` | Case cochée |
| `toHaveFocus()` | L'élément a le focus |
| `toBeRequired()` | Champ obligatoire |
| `toBeEmpty()` / `toBeEmptyDOMElement()` | Élément vide |
| `toContainElement(autre)` | Contient un autre élément |
| `toHaveStyle({ color: 'red' })` | Style CSS inline |

```javascript
const input = screen.getByLabelText(/email/i)
expect(input).toHaveAttribute('type', 'email')
expect(input).toBeRequired()
expect(input).toHaveValue('')
expect(input).toBeEnabled()
```

---

## 7. Gestion de l'asynchrone

### `findBy` — Attendre qu'un élément apparaisse

```javascript
// findBy = getBy + waitFor (timeout par défaut : 1000ms)
const message = await screen.findByText(/données chargées/i)
expect(message).toBeInTheDocument()
```

### `waitFor` — Attendre une condition

```javascript
import { waitFor } from '@testing-library/react'

await waitFor(() => {
  expect(screen.getByText(/succès/i)).toBeInTheDocument()
})
```

### `waitForElementToBeRemoved` — Attendre une disparition

```javascript
import { waitForElementToBeRemoved } from '@testing-library/react'

await waitForElementToBeRemoved(() => screen.queryByText(/chargement/i))
```

---

## 8. Rendu conditionnel et re-rendu

```javascript
test('affichage conditionnel', () => {
  const { rerender } = render(<Alerte visible={false} />)

  expect(screen.queryByRole('alert')).not.toBeInTheDocument()

  rerender(<Alerte visible={true} />)

  expect(screen.getByRole('alert')).toBeInTheDocument()
})
```

---

## 9. Bonnes pratiques

### À FAIRE

- **Requêter comme un utilisateur** — Utiliser `getByRole`, `getByLabelText`, `getByText` en priorité
- **Utiliser `userEvent` plutôt que `fireEvent`** — Simulation plus réaliste
- **Utiliser `screen`** — Toujours préférer `screen.getByX` à la déstructuration de `render()`
- **Tester le comportement, pas l'implémentation** — Vérifier ce que l'utilisateur voit et peut faire
- **Utiliser `findBy` pour l'asynchrone** — Plus lisible que `waitFor` + `getBy`
- **Utiliser `queryBy` pour tester l'absence** — Seul préfixe qui retourne `null` sans erreur
- **Nommer les tests du point de vue utilisateur** — `'affiche un message d'erreur quand le formulaire est vide'`

### À ÉVITER

- **Ne pas tester les détails d'implémentation** — Pas d'état interne, pas de méthodes privées
- **Ne pas utiliser `container.querySelector`** — Utiliser les requêtes de Testing Library
- **Ne pas tester les noms de classes CSS** — Tester le résultat visuel, pas l'implémentation du style
- **Ne pas utiliser `getByTestId` en premier** — C'est un dernier recours, pas un réflexe
- **Ne pas envelopper dans `act()` manuellement** — `render`, `userEvent` et `findBy` le font déjà
- **Ne pas utiliser `cleanup` manuellement** — Automatique avec Jest/Vitest

---

## 10. Antisèches rapides

### Rôles ARIA courants

| Élément HTML | Rôle implicite |
|-------------|----------------|
| `<button>` | `button` |
| `<a href>` | `link` |
| `<input type="text">` | `textbox` |
| `<input type="checkbox">` | `checkbox` |
| `<input type="radio">` | `radio` |
| `<select>` | `combobox` |
| `<textarea>` | `textbox` |
| `<h1>`–`<h6>` | `heading` |
| `<ul>`, `<ol>` | `list` |
| `<li>` | `listitem` |
| `<img>` | `img` |
| `<form>` | `form` (si nommé) |
| `<nav>` | `navigation` |
| `<dialog>` | `dialog` |
| `<table>` | `table` |
| `<tr>` | `row` |
| `<td>` | `cell` |

### Touches spéciales pour `user.keyboard()`

```
{Enter}  {Escape}  {Backspace}  {Delete}  {Tab}
{ArrowUp}  {ArrowDown}  {ArrowLeft}  {ArrowRight}
{Home}  {End}  {PageUp}  {PageDown}
{Space}  {Control>}a{/Control}  (Ctrl+A)
```

---

## 11. Déboguer

```javascript
// Afficher le DOM actuel dans la console
screen.debug()

// Afficher un élément spécifique
screen.debug(screen.getByRole('form'))

// Lister les rôles accessibles disponibles
screen.logTestingPlaygroundURL() // Ouvre Testing Playground
```

---

*Mémo créé le 2026-03-20 — Sources : testing-library.com, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom*
