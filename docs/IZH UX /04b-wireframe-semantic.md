# Wireframes sémantiques — izh

> **Usage agent :** Ce document contient les wireframes sémantiques YAML de chaque écran. Il traduit les décisions structurelles du document 04a en spécifications exploitables comme prompt Figma Make (TC-EBC), input MCP ou documentation. Aucune couleur, aucune typographie finale, aucune image réelle.

**Version :** v0.1
**Date :** 2026-03-04
**Auteur :** UX Designer (assisté par IA)
**Statut :** Brouillon
**Basé sur :** 04a-wireframe-architecture.md (v0.1), 03-architecture-information-flows.md (v0.1)

---

## SCR-01 — Vrac

```yaml
screen:
  id: SCR-01
  name: "Vrac"
  arch_ref: ARCH-SCR-01
  flows: [FLOW-01, FLOW-02, FLOW-03, FLOW-05]
  personas: [P1, P2, P3]

  layout: stacked

  regions:
    - id: header
      role: header
      position: top
      sticky: true
      height: 64px
      components:
        - type: heading
          level: 1
          content: "Vrac"
        - type: text
          variant: counter-badge
          content: "Note tes tâches en vrac, on les triera après · [N] à trier"

    - id: task-list
      role: content
      position: center
      scroll: vertical
      components:
        - type: list
          item_component: task-item-vrac
          item_layout:
            - type: text
              content: "[Titre de la tâche]"
            - type: button
              variant: secondary
              label: "Trier"
              position: right

    - id: capture-input
      role: content
      position: above-list
      sticky: true
      components:
        - type: input
          variant: text
          placeholder: "Qu'est-ce qui te trotte dans la tête ?"
          action: "capture-task"
          auto_focus: "first-launch only"
          behavior: "Saisie + Entrée = tâche ajoutée, champ vidé, prêt pour la suivante. Flux continu."

    - id: empty-state
      role: content
      position: center
      conditional: "tasks.length === 0"
      components:
        - type: empty-state
          variant: first-launch
          content: "Commence par vider ta tête."
          cta: null
        - type: empty-state
          variant: all-sorted
          content: "Tout est trié"
          cta:
            label: "Voir la Réserve"
            action: "navigate:SCR-06"

    # Pas de FAB — capture via champ inline uniquement

    - id: bottom-nav
      role: navigation
      position: bottom
      sticky: true
      height: 56px
      components:
        - type: bottom-nav
          items:
            - label: "Vrac"
              icon: icon-vrac
              active: true
              badge: null
            - label: "Réserve"
              icon: icon-reserve
              active: false
            - label: "Focus"
              icon: icon-focus
              active: false
            - label: "Archive"
              icon: icon-archive
              active: false

  responsive:
    tablet:
      task-list: { full-width: true }
    mobile:
      layout: stacked
      task-list: { full-width: true }
    desktop:
      layout: sidebar-main
      sidebar: { becomes: nav-list, position: left, width: 240px }
      task-list: { max-width: 600px, centered: true }

  states:
    empty-first-launch:
      task-list: hidden
      empty-state: { variant: first-launch, visible: true }
      capture-input: { auto_focus: true }
    empty-all-sorted:
      task-list: hidden
      empty-state: { variant: all-sorted, visible: true }
    populated:
      task-list: visible
      empty-state: hidden
    loading:
      task-list: "Skeleton placeholders × 5"

  interactions:
    - trigger: "Tap sur le champ de saisie inline"
      action: "Focus sur le champ, clavier ouvert"
      feedback: "Curseur actif dans le champ"
    - trigger: "Saisie + Entrée dans le champ"
      action: "Tâche ajoutée à Vrac, champ vidé"
      feedback: "Tâche apparaît dans la liste, compteur +1, champ prêt"
    - trigger: "Tap bouton Trier sur une tâche"
      action: "Ouvre overlay de tri (SCR-02)"
      feedback: "Slide up bottom sheet"
    - trigger: "Long press sur titre (~500ms)"
      action: "Édition inline du titre (DT-01)"
      feedback: "Vibration haptique + titre éditable"
    - trigger: "Inactivité 5s après ajout (onboarding)"
      action: "Nudge tri"
      feedback: "Surbrillance bouton Trier sur la 1ère tâche"
    - trigger: "Scroll vertical"
      action: "Défile la liste"
      feedback: "Header sticky, champ saisie et bottom-nav fixes"
```

---

## SCR-02 — Overlay de tri

```yaml
screen:
  id: SCR-02
  name: "Overlay de tri"
  arch_ref: ARCH-SCR-02
  flows: [FLOW-02, FLOW-03]
  personas: [P1, P2, P3]

  layout: stacked
  surface: overlay-partial-75
  backdrop: dark-strong

  regions:
    - id: overlay-handle
      role: header
      position: top
      components:
        - type: icon
          variant: drag-handle
          content: "Barre horizontale (affordance swipe down)"

    - id: task-context
      role: header
      position: top
      sticky: true
      components:
        - type: heading
          level: 2
          content: "[Titre de la tâche en cours]"

    - id: close
      role: aside
      position: top-right
      components:
        - type: button
          variant: icon
          label: "✕"
          action: "close-overlay"

    - id: assisted-cta
      role: content
      position: center
      components:
        - type: button
          variant: primary
          label: "Aide-moi à décider"
          size: large
          full_width: true
          action: "navigate:SCR-03"
          animation: "pulse (first-sort only)"
      note: "Bouton assisté en premier — le parcours par défaut. Le but est que l'utilisateur fasse le questionnaire."

    - id: quadrant-row
      role: content
      position: below-assisted-cta
      components:
        - type: button
          variant: outline
          label: "Critique"
          action: "classify:Q1"
        - type: button
          variant: outline
          label: "Essentiel"
          action: "classify:Q2"
        - type: button
          variant: outline
          label: "Fausse urgence"
          action: "classify:Q3"
        - type: button
          variant: outline
          label: "Optionnel"
          action: "classify:Q4"
      layout: row-4
      height: "same-as:assisted-cta"
      note: "Labels Réserve (descriptifs). 4 boutons sur une seule ligne, même hauteur que le bouton assisté. Outline = visuellement secondaire."

  responsive:
    tablet:
      surface: overlay-partial-75
    mobile:
      surface: overlay-partial-75
      quadrant-row: { layout: row-4, full-width: true }
    desktop:
      surface: modal-centered
      width: 480px
      sidebar-nav: visible

  states:
    default:
      all: visible
    onboarding-first-sort:
      assisted-cta: { animation: pulse }

  interactions:
    - trigger: "Swipe down sur handle"
      action: "Ferme l'overlay"
      feedback: "Slide down. Tâche intacte dans Vrac. Bottom nav réapparaît."
    - trigger: "Tap ✕"
      action: "Ferme l'overlay"
      feedback: "Tâche intacte, retour Vrac"
    - trigger: "Tap sur un quadrant"
      action: "Classement immédiat → SCR-05"
      feedback: "Transition vers résultat. Pas de confirmation."
    - trigger: "Tap Aide-moi à décider"
      action: "Transition vers questionnaire (SCR-03)"
      feedback: "Slide horizontal vers SCR-03"
    - trigger: "Ouverture overlay"
      action: "Slide up depuis le bas"
      feedback: "~300ms. Backdrop s'assombrit. Bottom nav masquée."
```

---

## SCR-03 — Questionnaire cognitif

```yaml
screen:
  id: SCR-03
  name: "Questionnaire cognitif"
  arch_ref: ARCH-SCR-03
  flows: [FLOW-02]
  personas: [P1, P2, P3]

  layout: centered
  surface: overlay-partial-75
  backdrop: dark-strong

  regions:
    - id: task-context
      role: header
      position: top
      sticky: true
      components:
        - type: heading
          level: 2
          content: "[Titre de la tâche en cours]"

    - id: micro-text
      role: content
      position: above-question
      conditional: "first_sort === true"
      components:
        - type: text
          variant: subtle
          content: "Réponds à l'instinct — il n'y a pas de mauvaise réponse."

    - id: question
      role: content
      position: center-vertical
      components:
        - type: heading
          level: 3
          content: "[Question en cours]"

    - id: answers
      role: content
      position: below-question
      components:
        - type: list
          item_component: answer-option
          layout: stacked-full-width
          items:
            - label: "[Réponse A]"
              action: "next-question OR navigate:SCR-04"
            - label: "[Réponse B]"
              action: "next-question OR navigate:SCR-04"
            - label: "[Réponse C — si applicable]"
              action: "next-question OR navigate:SCR-04"
            - label: "[Réponse D — si applicable]"
              action: "next-question OR navigate:SCR-04"

    - id: progress
      role: aside
      position: bottom-center
      components:
        - type: icon
          variant: progress-dots
          content: "●○○ (dots actif/inactif, 2-5 selon le flux)"

    - id: back
      role: navigation
      position: top-left
      conditional: "current_question > 1"
      components:
        - type: button
          variant: text
          label: "← Retour"
          action: "previous-question"

  responsive:
    tablet:
      question: { centered: true, max-width: 480px }
    mobile:
      layout: centered
      answers: { full-width: true, padding: 16px }
    desktop:
      surface: modal-centered
      width: 480px
      question: { centered: true }

  states:
    aiguillage:
      question: { content: "Comment tu vis cette tâche en ce moment ?" }
      answers:
        items: 4
        labels:
          - "😬 Je me sens obligé·e de la faire → Flux 3"
          - "⏳ C'est important mais je la repousse toujours → Flux 4"
          - "🤔 Pas sûr·e que ce soit prioritaire → Flux 2"
          - "🤷 Je sais pas ce qui se passe si je le fais pas → Flux 1"
      back: hidden
    flux-3-q1:
      question: { content: "D'où vient ce sentiment d'obligation ?" }
      answers: { items: 3, labels: ["Externe — deadline, contrat", "Interne — culpabilité, peur", "Je sais pas"] }
      back: visible
    flux-3-rebond:
      question: { content: "Si tu ignores cette semaine — quelqu'un te relance, ou il ne se passe rien ?" }
      answers: { items: 2, labels: ["On me relance → Externe", "Rien → Interne"] }
      back: visible
    flux-3-q2a:
      question: { content: "Si elle disparaissait, un objectif essentiel serait compromis ?" }
      answers: { items: 2, labels: ["Oui → Critique", "Non → Fausse urgence"] }
      back: visible
    flux-3-q2b:
      question: { content: "Ça compte vraiment pour toi — pas pour les autres ?" }
      answers: { items: 2, labels: ["Oui → Essentiel", "Non → Optionnel"] }
      back: visible
    flux-4-q1:
      question: { content: "Pense à quelque chose que tu as évité l'année dernière et que tu regrettes. Cette tâche ressemble à ça ?" }
      answers: { items: 2, labels: ["Oui", "Non"] }
      back: visible
    flux-4-q2a:
      question: { content: "Chaque semaine sans le faire aggrave la situation ?" }
      answers: { items: 2, labels: ["Oui → Critique", "Non → Essentiel"] }
      back: visible
    flux-4-q2b:
      question: { content: "Quelqu'un attend concrètement que tu le fasses ?" }
      answers: { items: 2, labels: ["Oui → Fausse urgence", "Non → Optionnel"] }
      back: visible
    flux-2-q1:
      question: { content: "Elle contribue directement à l'une de tes 3 priorités actuelles ?" }
      answers: { items: 3, labels: ["Oui", "Non", "Pas de priorités définies → redirige Flux 1"] }
      back: visible
    flux-2-q2a:
      question: { content: "Contrainte de temps externe — deadline, fenêtre qui se ferme ?" }
      answers: { items: 2, labels: ["Oui → Critique", "Non → Essentiel"] }
      back: visible
    flux-2-q2b:
      question: { content: "Quelqu'un d'autre est bloqué sans toi ?" }
      answers: { items: 2, labels: ["Oui → Fausse urgence", "Non → Optionnel"] }
      back: visible
    flux-1:
      question: { content: "Imagine que tu ne l'as pas faite dans une semaine. Que s'est-il passé ?" }
      answers:
        items: 4
        labels:
          - "💥 Deadline explosée, quelqu'un bloqué → Critique"
          - "📉 Objectif important a reculé → Essentiel"
          - "😬 Quelqu'un a été gêné → Fausse urgence"
          - "🤷 Pas grand chose → Optionnel"
      back: visible
    micro-text-visible:
      micro-text: visible
    micro-text-hidden:
      micro-text: hidden

  interactions:
    - trigger: "Tap sur une réponse"
      action: "Question suivante ou SCR-04"
      feedback: "Slide horizontal vers la droite"
    - trigger: "Tap ← Retour"
      action: "Question précédente"
      feedback: "Slide horizontal vers la gauche. Réponse pré-sélectionnée."
    - trigger: "Tap ✕ (hérité overlay)"
      action: "Ferme l'overlay entier"
      feedback: "Retour Vrac. Aucune réponse partielle enregistrée."
```

---

## SCR-04 — Confirmation de tri

```yaml
screen:
  id: SCR-04
  name: "Confirmation de tri"
  arch_ref: ARCH-SCR-04
  flows: [FLOW-02]
  personas: [P1, P2, P3]

  layout: centered
  surface: overlay-partial-75
  backdrop: dark-strong

  regions:
    - id: task-context
      role: header
      position: top
      sticky: true
      components:
        - type: heading
          level: 2
          content: "[Titre de la tâche en cours]"

    - id: result-proposal
      role: content
      position: center-vertical
      components:
        - type: card
          variant: quadrant-result
          content:
            color: "[couleur du quadrant proposé]"
            label: "[Label izh du quadrant]"
          emphasis: dominant

    - id: confirm-cta
      role: content
      position: below-result
      components:
        - type: button
          variant: primary
          label: "Ça me parle"
          size: large
          full_width: true
          action: "classify:proposed-quadrant"
          data: { user_override: false }

    - id: alternatives
      role: content
      position: below-cta
      components:
        - type: text
          variant: subtle
          content: "Pas convaincu·e ?"
        - type: list
          layout: horizontal
          item_component: quadrant-button
          items:
            - label: "[Quadrant alternatif 1]"
              variant: outline
              compact: true
              action: "classify:alt-quadrant"
              data: { user_override: true }
            - label: "[Quadrant alternatif 2]"
              variant: outline
              compact: true
              action: "classify:alt-quadrant"
              data: { user_override: true }
            - label: "[Quadrant alternatif 3]"
              variant: outline
              compact: true
              action: "classify:alt-quadrant"
              data: { user_override: true }

    - id: progress
      role: aside
      position: bottom-center
      components:
        - type: text
          variant: subtle
          content: "[N]/[Total] triées"

  responsive:
    tablet:
      result-proposal: { centered: true, max-width: 400px }
    mobile:
      layout: centered
      alternatives: { layout: horizontal, full-width: true }
    desktop:
      surface: modal-centered
      width: 480px

  states:
    default:
      all: visible

  interactions:
    - trigger: "Tap Ça me parle"
      action: "Classement user_override:false → SCR-05"
      feedback: "Transition vers résultat"
    - trigger: "Tap alternative"
      action: "Classement user_override:true → SCR-05"
      feedback: "Transition vers résultat"
```

---

## SCR-05 — Résultat de tri

```yaml
screen:
  id: SCR-05
  name: "Résultat de tri"
  arch_ref: ARCH-SCR-05
  flows: [FLOW-02, FLOW-03]
  personas: [P1, P2, P3]

  layout: centered
  surface: overlay-partial-75
  backdrop: dark-strong

  regions:
    - id: task-context
      role: header
      position: top
      sticky: true
      components:
        - type: heading
          level: 2
          content: "[Titre de la tâche]"

    - id: result-feedback
      role: content
      position: center-vertical
      components:
        - type: card
          variant: quadrant-result
          content:
            color: "[couleur du quadrant attribué]"
            label: "[Label izh du quadrant]"
          animation: "scale-up + fade-in, ~300ms"

    - id: actions
      role: content
      position: below-result
      components:
        - type: button
          variant: primary
          label: "Tâche suivante →"
          action: "next-task:SCR-02"
          conditional: "vrac.remaining > 0"
        - type: button
          variant: text
          label: "Voir la Réserve"
          action: "navigate:SCR-06"

    - id: progress
      role: aside
      position: bottom-center
      components:
        - type: text
          variant: subtle
          content: "[N]/[Total] triées"

  responsive:
    tablet:
      result-feedback: { centered: true }
    mobile:
      layout: centered
    desktop:
      surface: modal-centered
      width: 480px

  states:
    default:
      actions: { next-task: visible, tri-link: visible }
    vrac-empty:
      actions:
        next-task: hidden
        content: "Tout est trié !"
        tri-link: { label: "Voir la Réserve", visible: true }
    reserve-full:
      result-feedback: { content: "Tâche classée mais Réserve pleine (40/40)" }
      actions:
        - type: text
          content: "Fais de la place dans ta Réserve"
        - type: button
          variant: primary
          label: "Purger"
          action: "navigate:SCR-07"
        - type: button
          variant: text
          label: "Revenir au Vrac"
          action: "navigate:SCR-01"

  interactions:
    - trigger: "Tap Tâche suivante"
      action: "Overlay reste ouvert → retour SCR-02 avec titre suivant"
      feedback: "Pas de fermeture/réouverture. Titre change."
    - trigger: "Tap Voir la Réserve"
      action: "Fermeture overlay → SCR-06"
      feedback: "Tâche classée en highlight temporaire (2-3s) dans la Réserve"
```

---

## SCR-06 — Réserve

```yaml
screen:
  id: SCR-06
  name: "Réserve"
  arch_ref: ARCH-SCR-06
  flows: [FLOW-04, FLOW-06]
  personas: [P1, P2, P3]

  layout: stacked

  regions:
    - id: header
      role: header
      position: top
      sticky: true
      height: 64px
      components:
        - type: heading
          level: 1
          content: "Réserve"
        - type: text
          variant: counter-capacity
          content: "Tes tâches triées attendent ici, active celles que tu veux faire · [N]/40"

    - id: sort-cta
      role: content
      position: below-header
      components:
        - type: button
          variant: secondary
          label: "Faire du tri"
          full_width: true
          action: "navigate:SCR-07"
      note: "Bouton permanent au-dessus de la liste. Permet de lancer la purge à tout moment, pas uniquement à 35+."

    - id: nudge-purge
      role: aside
      position: below-sort-cta
      conditional: "tasks.total >= 35"
      components:
        - type: alert
          variant: warning
          dismissible: true
          content: "[N]/40 — ton backlog se remplit !"

    - id: quadrant-list-q1
      role: content
      position: center
      components:
        - type: card
          variant: reserve-section
          expanded: true
          content:
            label: "Critique"
            counter: "[N]"
          children:
            - type: list
              item_component: task-item-reserve
              item_layout:
                - type: text
                  content: "[Titre]"
                - type: button
                  variant: icon
                  label: "Activer"
                  action: "activate-to-focus"
                  disabled_if: "matrix.Q1.count >= 4"
              drag: true
              note: "Pas de checkbox dans la Réserve — la complétion se fait dans le Focus uniquement."

    - id: quadrant-list-q2
      role: content
      position: center
      components:
        - type: card
          variant: reserve-section
          expanded: false
          content:
            label: "Essentiel"
            counter: "[N]"
          children:
            - type: list
              item_component: task-item-reserve
              drag: true

    - id: quadrant-list-q3
      role: content
      position: center
      components:
        - type: card
          variant: reserve-section
          expanded: false
          content:
            label: "Fausse urgence"
            counter: "[N]"
          children:
            - type: list
              item_component: task-item-reserve
              drag: true

    - id: quadrant-list-q4
      role: content
      position: center
      components:
        - type: card
          variant: reserve-section
          expanded: false
          content:
            label: "Optionnel"
            counter: "[N]"
          children:
            - type: list
              item_component: task-item-reserve
              drag: true

    - id: empty-state
      role: content
      position: center
      conditional: "tasks.total === 0"
      components:
        - type: empty-state
          content: "Trie tes premières tâches depuis Vrac"
          cta:
            label: "Aller au Vrac"
            action: "navigate:SCR-01"

    # Pas de FAB — capture via Vrac uniquement

    - id: bottom-nav
      role: navigation
      position: bottom
      sticky: true
      height: 56px
      components:
        - type: bottom-nav
          items:
            - label: "Vrac"
              icon: icon-vrac
              badge: "[vrac count]"
            - label: "Réserve"
              icon: icon-reserve
              active: true
            - label: "Focus"
              icon: icon-focus
            - label: "Archive"
              icon: icon-archive

  responsive:
    tablet:
      layout: stacked
      quadrant-sections: { full-width: true }
    mobile:
      layout: stacked
      quadrant-sections: { accordion: strict }
    desktop:
      layout: stacked
      quadrant-sections: { accordion: strict }
      note: "Même layout accordion que mobile — cohérence cross-device"

  states:
    empty:
      quadrant-sections: hidden
      empty-state: visible
    populated:
      quadrant-sections: visible
      empty-state: hidden
    near-full:
      nudge-purge: visible
      counter-capacity: { variant: "alerte douce" }
    full:
      counter-capacity: { variant: "rouge" }
      nudge-purge: { content: "Ta Réserve est pleine (40/40). Fais de la place." }
    loading:
      quadrant-sections: "Skeleton placeholders"

  interactions:
    - trigger: "Tap header section collapsed"
      action: "Cette section s'ouvre, les autres se ferment (accordion strict DT-04)"
      feedback: "Animation expand/collapse"
    - trigger: "Tap header section ouverte"
      action: "Section se ferme (tout collapsed)"
      feedback: "Animation collapse"
    - trigger: "Long press + drag tâche"
      action: "Drag inter-quadrant"
      feedback: "Headers collapsed en surbrillance couleur (zones de drop DT-04)"
    - trigger: "Drop sur header collapsed"
      action: "Reclassement dans le quadrant cible"
      feedback: "Toast 'Déplacée vers [quadrant]'"
    - trigger: "Drag vertical dans section ouverte"
      action: "Réordonnancement intra-quadrant"
      feedback: "L'item suit le doigt"
    - trigger: "Tap bouton Activer"
      action: "Tâche → Focus (même quadrant)"
      feedback: "Animation disparition + toast 'Ajoutée à Focus'"
    - trigger: "Swipe gauche sur tâche"
      action: "Suppression"
      feedback: "Reveal bouton supprimer. Toast undo 5s."
    - trigger: "Long press sur titre"
      action: "Édition inline (DT-01)"
      feedback: "Vibration haptique + titre éditable"
```

---

## SCR-07 — Overlay de purge — Intro

```yaml
screen:
  id: SCR-07
  name: "Overlay de purge — Intro"
  arch_ref: ARCH-SCR-07
  flows: [FLOW-06]
  personas: [P1, P3]

  layout: centered
  surface: overlay-partial-75
  backdrop: dark-strong

  regions:
    - id: overlay-handle
      role: header
      position: top
      components:
        - type: icon
          variant: drag-handle
          content: "Barre horizontale"

    - id: illustration
      role: content
      position: center
      components:
        - type: icon
          variant: decorative
          content: "🧹"

    - id: message
      role: content
      position: center
      components:
        - type: heading
          level: 2
          content: "[Titre contextuel]"
        - type: text
          content: "[Sous-texte contextuel]"

    - id: actions
      role: content
      position: bottom
      components:
        - type: button
          variant: primary
          label: "C'est parti"
          action: "navigate:SCR-08"
        - type: button
          variant: text
          label: "Pas maintenant"
          action: "close-overlay"

  responsive:
    tablet:
      surface: overlay-partial-75
    mobile:
      surface: overlay-partial-75
    desktop:
      surface: modal-centered
      width: 400px

  states:
    nudge:
      message:
        title: "Un peu de ménage ?"
        subtitle: "Ta Réserve a [N] tâches. On regarde ensemble celles qui traînent depuis un moment ?"
    blocage:
      message:
        title: "Ta Réserve est pleine"
        subtitle: "40/40 tâches. Fais de la place pour continuer à trier depuis Vrac."

  interactions:
    - trigger: "Tap C'est parti"
      action: "Transition vers SCR-08"
      feedback: "Contenu de l'overlay change (transition slide). Même surface ~75%."
    - trigger: "Tap Pas maintenant"
      action: "Ferme l'overlay"
      feedback: "Retour Réserve"
    - trigger: "Swipe down"
      action: "Ferme l'overlay (= Pas maintenant)"
      feedback: "Slide down"
```

---

## SCR-08 — Overlay de purge — Questionnaire

```yaml
screen:
  id: SCR-08
  name: "Overlay de purge — Questionnaire"
  arch_ref: ARCH-SCR-08
  flows: [FLOW-06]
  personas: [P1, P3]

  layout: centered
  surface: overlay-partial-75
  backdrop: dark-strong

  regions:
    - id: task-purge-context
      role: header
      position: top
      sticky: true
      components:
        - type: heading
          level: 2
          content: "[Titre de la tâche]"
        - type: text
          variant: badge
          content: "[Couleur quadrant]"
        - type: text
          variant: subtle
          content: "Là depuis [N] semaines"

    - id: question
      role: content
      position: center-vertical
      components:
        - type: heading
          level: 3
          content: "[Question en cours]"

    - id: answers
      role: content
      position: below-question
      components:
        - type: list
          layout: stacked-full-width
          item_component: answer-option
          items: "[Réponses selon la question]"

    - id: progress
      role: aside
      position: bottom-center
      components:
        - type: text
          variant: subtle
          content: "[N]/[Total] tâches revues"

    - id: stop
      role: navigation
      position: bottom
      components:
        - type: button
          variant: text
          label: "Arrêter la purge"
          action: "navigate:SCR-06"

  responsive:
    tablet:
      question: { centered: true, max-width: 480px }
    mobile:
      layout: centered
    desktop:
      surface: modal-centered
      width: 480px

  states:
    question-1:
      question: { content: "Elle compte toujours ?" }
      answers:
        - label: "Oui"
          action: "next-question"
        - label: "Non, supprimer"
          action: "delete-task → next-task"
    question-2:
      question: { content: "Au bon endroit ?" }
      answers:
        - label: "[Quadrant actuel] (garder)"
          variant: pre-selected
        - label: "[Quadrant alt 1]"
        - label: "[Quadrant alt 2]"
        - label: "[Quadrant alt 3]"
    nothing-to-purge:
      question: { content: "Ta Réserve est bien rangée." }
      answers: hidden
      stop: { label: "Retour à la Réserve" }

  interactions:
    - trigger: "Tap Non, supprimer"
      action: "Suppression immédiate → tâche suivante"
      feedback: "Transition vers tâche suivante"
    - trigger: "Tap Oui"
      action: "Passe à Q2 (reclassement)"
      feedback: "Slide vers Q2"
    - trigger: "Tap quadrant (Q2)"
      action: "Reclassement ou conservation → tâche suivante"
      feedback: "Transition vers tâche suivante"
    - trigger: "Tap Arrêter la purge"
      action: "Retour Réserve si partiel, SCR-09 si toutes revues"
      feedback: "Changements persistés"
```

---

## SCR-09 — Overlay de purge — Bilan

```yaml
screen:
  id: SCR-09
  name: "Overlay de purge — Bilan"
  arch_ref: ARCH-SCR-09
  flows: [FLOW-06]
  personas: [P1, P3]

  layout: centered
  surface: overlay-partial-75
  backdrop: dark-strong

  regions:
    - id: illustration
      role: content
      position: center-top
      components:
        - type: icon
          variant: decorative
          content: "🧹"
        - type: heading
          level: 2
          content: "Purge terminée"

    - id: recap
      role: content
      position: center
      components:
        - type: list
          variant: recap-list
          items:
            - "[N] tâches revues"
            - "[X] supprimées"
            - "[Y] reclassées"
            - "[Z] gardées"

    - id: new-total
      role: content
      position: below-recap
      components:
        - type: text
          variant: counter-capacity
          content: "Réserve : [N]/40"

    - id: action
      role: content
      position: bottom
      components:
        - type: button
          variant: primary
          label: "Retour à la Réserve"
          action: "close-overlay → navigate:SCR-06"

  responsive:
    tablet:
      layout: centered
    mobile:
      layout: centered
    desktop:
      surface: modal-centered
      width: 400px

  states:
    default:
      all: visible

  interactions:
    - trigger: "Tap Retour à la Réserve"
      action: "Ferme l'overlay → SCR-06 mis à jour"
      feedback: "Slide down"
```

---

## SCR-10 — Focus

```yaml
screen:
  id: SCR-10
  name: "Focus"
  arch_ref: ARCH-SCR-10
  flows: [FLOW-04, FLOW-07]
  personas: [P1, P2, P3]

  layout: stacked

  regions:
    - id: header
      role: header
      position: top
      sticky: true
      height: 64px
      components:
        - type: heading
          level: 1
          content: "Focus"
        - type: text
          variant: counter-badge
          content: "Tes tâches du moment, max 4 par priorité · [N] en cours"

    - id: prominent-quadrant
      role: content
      position: center
      height: "~50% hauteur utile"
      components:
        - type: card
          variant: matrix-prominent-zone
          content:
            color: "[couleur du quadrant proéminent]"
            label: "[Label Focus — ex: Faire maintenant]"
            subtitle: "[Sous-titre contextuel — ex: Urgent et important — en premier]"
            counter: "[N]/4"
          children:
            - type: list
              item_component: task-item-focus
              max_items: 4
              item_layout:
                - type: checkbox
                  action: "complete-task"
                - type: text
                  content: "[Titre complet de la tâche]"
      default_quadrant: Q1

    - id: nav-grid
      role: navigation
      position: below-prominent
      height: "~25% hauteur utile"
      layout: grid-2x2
      components:
        - type: card
          variant: matrix-nav-card
          repeat: 4
          content:
            color: "[couleur du quadrant]"
            label: "[Label complet du quadrant]"
            counter: "[N]/4"
          action: "swap-with-prominent"
          states:
            active: "Visuellement marqué (bordure active, fond teinté)"
            inactive: "Style par défaut"
      positions:
        Q1: "haut-gauche"
        Q2: "haut-droite"
        Q3: "bas-gauche"
        Q4: "bas-droite"
      note: "Les positions sont fixes — seul l'indicateur actif change"

    - id: empty-state
      role: content
      position: center
      conditional: "active_tasks.total === 0"
      components:
        - type: empty-state
          variant: global
          content: "Active des tâches depuis ta Réserve"
          cta:
            label: "Voir la Réserve"
            action: "navigate:SCR-06"

    - id: bottom-nav
      role: navigation
      position: bottom
      sticky: true
      height: 56px
      components:
        - type: bottom-nav
          items:
            - label: "Vrac"
              icon: icon-vrac
              badge: "[vrac count]"
            - label: "Réserve"
              icon: icon-reserve
            - label: "Focus"
              icon: icon-focus
              active: true
            - label: "Archive"
              icon: icon-archive

  responsive:
    tablet:
      prominent-quadrant: hidden
      nav-grid: hidden
      layout: grid-2x2
      regions:
        - id: matrix-grid
          role: content
          components:
            - type: card
              variant: matrix-quadrant
              repeat: 4
              layout: grid-2x2
    mobile:
      prominent-quadrant: visible
      nav-grid: visible
      capture-input: hidden
    desktop:
      layout: sidebar-main
      sidebar: { becomes: nav-list, position: left, width: 240px }
      prominent-quadrant: hidden
      nav-grid: hidden
      regions:
        - id: matrix-grid
          role: content
          components:
            - type: card
              variant: matrix-quadrant
              repeat: 4
              layout: grid-2x2

  states:
    empty-global:
      prominent-quadrant: { empty: true }
      nav-grid: { all_counters: "0/4", active: Q1 }
      empty-state: visible
    prominent-empty:
      prominent-quadrant: { content: "Message contextuel — ex: Rien à faire maintenant — respire." }
      nav-grid: { active_card: "shows 0/4" }
    populated:
      prominent-quadrant: visible
      nav-grid: visible
      empty-state: hidden
    loading:
      prominent-quadrant: "Skeleton placeholder"
      nav-grid: "4 skeleton cards in 2x2 grid"

  interactions:
    - trigger: "Tap sur une mini-card (mobile)"
      action: "Swap : le contenu du quadrant tappé monte en zone proéminente. L'indicateur actif se déplace."
      feedback: "Crossfade ~200ms. Les positions des mini-cards ne changent jamais."
    - trigger: "Navigation vers l'écran Focus"
      action: "Reset Q1 proéminent"
      feedback: "Q1 toujours en zone proéminente à l'entrée. Pas de mémorisation."
    - trigger: "Tap checkbox (zone proéminente)"
      action: "Tâche complétée → Archive"
      feedback: "Fade out + scale down + toast undo 5s"
    - trigger: "Long press sur titre (zone proéminente)"
      action: "Édition inline (DT-01)"
      feedback: "Vibration haptique"
    - trigger: "Drag tâche vers zone Réserve (desktop)"
      action: "Remettre dans la Réserve (même quadrant)"
      feedback: "Drop zone s'illumine → toast 'Remise dans la Réserve'"
    - trigger: "Drag inter-quadrant (desktop grid)"
      action: "Interdit"
      feedback: "Snap-back + toast pédagogique 'Pour reclasser, remets-la d'abord dans la Réserve.'"
    - trigger: "Highlight post-activation"
      action: "Tâche nouvellement activée"
      feedback: "Highlight temporaire 2-3s"
```

---

## SCR-11 — Archive

```yaml
screen:
  id: SCR-11
  name: "Archive"
  arch_ref: ARCH-SCR-11
  flows: [FLOW-07]
  personas: [P1, P2, P3]

  layout: stacked

  regions:
    - id: header
      role: header
      position: top
      sticky: true
      height: 64px
      components:
        - type: heading
          level: 1
          content: "Archive"
        - type: text
          variant: counter
          content: "Tout ce que tu as accompli · [N] terminées"

    - id: task-list
      role: content
      position: center
      scroll: vertical
      components:
        - type: list
          item_component: task-item-archive
          order: antichronological
          item_layout:
            - type: text
              content: "[Titre de la tâche]"
            - type: text
              variant: badge
              content: "[Couleur quadrant d'origine]"
            - type: text
              variant: subtle
              content: "[Date de complétion]"

    - id: empty-state
      role: content
      position: center
      conditional: "completed_tasks.length === 0"
      components:
        - type: empty-state
          content: "Tes tâches complétées apparaîtront ici"

    # Pas de FAB — capture via Vrac uniquement

    - id: bottom-nav
      role: navigation
      position: bottom
      sticky: true
      height: 56px
      components:
        - type: bottom-nav
          items:
            - label: "Vrac"
              icon: icon-vrac
              badge: "[vrac count]"
            - label: "Réserve"
              icon: icon-reserve
            - label: "Focus"
              icon: icon-focus
            - label: "Archive"
              icon: icon-archive
              active: true

  responsive:
    tablet:
      task-list: { full-width: true }
    mobile:
      task-list: { full-width: true }
    desktop:
      layout: sidebar-main
      sidebar: { becomes: nav-list, position: left, width: 240px }
      task-list: { max-width: 600px, centered: true }

  states:
    empty:
      task-list: hidden
      empty-state: visible
    populated:
      task-list: visible
      empty-state: hidden
    loading:
      task-list: "Skeleton placeholders × 5"

  interactions:
    - trigger: "Scroll vertical"
      action: "Défile la liste"
      feedback: "Header sticky, bottom-nav fixe"
```

---

## SCR-12 — Micro-survey

```yaml
screen:
  id: SCR-12
  name: "Micro-survey"
  arch_ref: ARCH-SCR-12
  flows: []
  personas: [P1, P2, P3]

  layout: centered
  surface: overlay-partial-30
  blocking: false

  regions:
    - id: handle
      role: header
      position: top
      components:
        - type: icon
          variant: drag-handle
          content: "Barre horizontale"

    - id: question
      role: content
      position: center
      components:
        - type: text
          content: "Comment tu te sens par rapport à tes tâches en ce moment ?"

    - id: slider
      role: content
      position: below-question
      components:
        - type: input
          variant: slider
          min: 1
          max: 10
          label_min: "😫"
          label_max: "😌"
          labels_intermediate: none

    - id: submit
      role: content
      position: bottom
      components:
        - type: button
          variant: primary
          label: "Envoyer"
          action: "submit-survey"

  responsive:
    tablet:
      surface: overlay-partial-30
    mobile:
      surface: overlay-partial-30
    desktop:
      surface: overlay-partial-30
      max-width: 400px

  states:
    default:
      all: visible

  interactions:
    - trigger: "Swipe down sur handle"
      action: "Dismiss sans donnée"
      feedback: "Slide down. Revient dans 7 jours."
    - trigger: "Tap Envoyer"
      action: "Enregistre mental_lightness_score + timestamp + context"
      feedback: "Bottom sheet disparaît"
    - trigger: "Slide slider"
      action: "Mise à jour valeur"
      feedback: "Thumb suit le doigt, pas de label intermédiaire"
```

---

## Synthèse des composants identifiés

| Composant | Occurrences | Écrans |
|---|---|---|
| `bottom-nav` | 4 | SCR-01, SCR-06, SCR-10, SCR-11 |
| `capture-input` | 1 | SCR-01 |
| `task-context-header` | 4 | SCR-02, SCR-03, SCR-04, SCR-05 |
| `empty-state` | 4 | SCR-01, SCR-06, SCR-10, SCR-11 |
| `quadrant-button` | 2 | SCR-02, SCR-04 |
| `quadrant-result` | 2 | SCR-04, SCR-05 |
| `answer-option` | 2 | SCR-03, SCR-08 |
| `question-card` | 2 | SCR-03, SCR-08 |
| `counter-capacity` | 2 | SCR-06, SCR-09 |
| `task-item-vrac` | 1 | SCR-01 |
| `task-item-reserve` | 1 | SCR-06 |
| `task-item-focus` | 1 | SCR-10 |
| `task-item-archive` | 1 | SCR-11 |
| `task-purge-header` | 1 | SCR-08 |
| `reserve-section` | 1 | SCR-06 |
| `matrix-prominent-zone` | 1 | SCR-10 (mobile) |
| `matrix-nav-card` | 1 | SCR-10 (mobile) |
| `survey-slider` | 1 | SCR-12 |
| `progress-dots` | 1 | SCR-03 |
| `toast-undo` | 2 | SCR-06, SCR-10 |

---

*BMAD-UX Method v1.2 — Wireframes sémantiques (Agent 04b)*
