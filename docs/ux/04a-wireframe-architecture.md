# Architecture des wireframes — izh

> **Usage agent :** Ce document définit les décisions structurelles pour chaque écran — hiérarchie des contenus, zones fonctionnelles, décisions de layout justifiées, comportements clés et composants identifiés. Il est la source de vérité pour l'agent 04b qui produit les wireframes sémantiques.
>
> Pas de wireframes ici — uniquement les décisions et leur justification.

**Version :** v0.1
**Date :** 2026-03-04
**Auteur :** UX Designer (assisté par IA)
**Statut :** Brouillon
**Basé sur :** 01-brief-projet.md (v1.0), 02-personas-cas-usage.md (v0.1), 03-architecture-information-flows.md (v0.1)

---

## Conventions de notation

```
[ZONE:nom]    = Zone fonctionnelle nommée
[COMP:nom]    = Composant réutilisable (défini dans livrable 06)
[CTA]         = Call-to-action principal
[NAV]         = Élément de navigation
H1/H2/H3      = Niveau de titre (hiérarchie, pas style)
P             = Paragraphe / texte courant
[IMG]         = Placeholder image (ratio précisé si important)
[ICON:nom]    = Icône (nommée par fonction, pas apparence)
```

---

## Décisions transversales

> _Décisions UX qui impactent plusieurs écrans. Chacune est documentée en détail dans `knowledge/`._

| #     | Décision                                       | Résumé                                                                                                                                                                                                               | Détail                                                              |
| ----- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| DT-01 | Édition du titre d'une tâche                   | Long press (mobile) / double-clic (desktop) → édition inline. Protège contre les déclenchements accidentels.                                                                                                         | `knowledge/Décisions UX — Édition du titre d'une tâche.md`          |
| DT-02 | Overlays bottom sheet partiel unifié           | Bottom sheet ~75% avec fond assombri (opacité forte). Handle + ✕. Bottom nav masquée. Unifié pour tous les flows (tri, purge). Exception : micro-survey ~30%.                                                        | `knowledge/Décisions UX — Overlay de tri couvrant la navigation.md` |
| DT-03 | Focus mobile en layout asymétrique + swap (v3) | Sur mobile : 1 quadrant proéminent (Q1 par défaut, titres complets) + grille 2×2 de 4 mini-cards navigation (label + compteur, indicateur actif). Tap sur mini-card = swap. Grille 2×2 réservée au desktop/tablette. | `knowledge/Décisions UX — Matrice mobile segmented control.md`      |
| DT-04 | Réserve accordion et drag & drop               | Accordion strict (un seul quadrant ouvert, Q1 par défaut). Headers collapsed = zones de drop avec surbrillance.                                                                                                      | `knowledge/Décisions UX — Backlog accordion et drag and drop.md`    |

---

## ARCH-SCR-01 — Vrac

**ID écran :** SCR-01
**Flow(s) associé(s) :** FLOW-01, FLOW-02, FLOW-03, FLOW-05
**Persona(s) primaire(s) :** P1 (Camille), P2 (Lucas), P3 (David)

### Hiérarchie des contenus

| Priorité            | Contenu                                                     | Justification                                                                      |
| ------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 1 (regard immédiat) | Liste des tâches non triées                                 | C'est le contenu principal. Camille doit voir immédiatement ce qu'elle a déchargé. |
| 2                   | Action de tri par tâche (bouton)                            | Le geste suivant dans le workflow (décharger → trier).                             |
| 3                   | Sous-titre pédagogique + compteur dynamique ("[N] à trier") | Feedback de progression sans surcharger.                                           |
| 4 (contexte)        | Navigation persistante (bottom bar)                         | Orientation.                                                                       |

### Zones fonctionnelles

| Zone                 | Rôle                   | Contenu                                                                             | Composant(s)                 | Comportement                                                                                          |
| -------------------- | ---------------------- | ----------------------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| [ZONE:header]        | Contexte + progression | H1 "Vrac" + sous-titre "Note tes tâches en vrac, on les triera après · [N] à trier" | H1 + [COMP:subtitle-counter] | Sous-titre avec compteur dynamique mis à jour en temps réel                                           |
| [ZONE:task-list]     | Contenu principal      | Liste scrollable de tâches non triées                                               | [COMP:task-item-inbox] × N   | Scroll vertical, édition du titre par long press                                                      |
| [ZONE:capture-input] | Capture de tâches      | Champ de saisie inline avec placeholder                                             | [COMP:capture-input]         | Toujours visible, auto-focusé au 1er lancement. Après validation : champ vidé, prêt pour la suivante. |
| [ZONE:empty-state]   | Guidage (si vide)      | Message contextuel + direction vers l'action suivante                               | [COMP:empty-state]           | 2 variantes : 1er lancement vs Vrac triée                                                             |
| [ZONE:bottom-nav]    | Navigation persistante | 4 items : Vrac, Réserve, Focus, Archive                                             | [COMP:bottom-nav]            | Vrac actif (highlight + label), badge compteur                                                        |

### Décisions de layout

| Décision                  | Choix                                                                       | Justification                                                                                                  | Alternative écartée                                              |
| ------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Layout principal          | Liste verticale pleine largeur                                              | Le Vrac est une file brute. Camille scanne de haut en bas (pattern F). Scale sans limite (Vrac illimitée).     | Grille / cards — trop de bruit visuel pour du contenu texte-only |
| Position du sous-titre    | Inline dans le header, sous le H1 — phrase pédagogique + compteur dynamique | Visible sans effort, contextualise l'écran d'un coup d'œil et guide l'utilisateur.                             | Badge flottant — moins lisible, pas de phrase pédagogique        |
| Champ de saisie inline    | En haut de la liste, sous le header, toujours visible                       | Discoverability maximale — un champ texte est auto-explicatif. Test utilisateur : le FAB n'était pas intuitif. | FAB flottant — 2 utilisateurs ne l'ont pas trouvé en test        |
| Bouton tri par tâche      | Inline à droite de chaque task-item                                         | Visible sans geste supplémentaire. Rappel constant que "la suite est ici".                                     | Swipe-to-reveal — discoverability insuffisante pour le MVP       |
| Empty state 1er lancement | Centré verticalement, champ de saisie auto-focusé                           | Moment critique (FLOW-01). Le champ + placeholder guident vers le premier geste.                               | Tutoriel / slides — viole le principe onboarding par l'usage     |

### Comportements clés

| Comportement                  | Détail                                                                                                                                                                              |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scroll**                    | Vertical, illimité. Header fixe (sticky) avec H1 "Vrac" + sous-titre "Note tes tâches en vrac, on les triera après · [N] à trier". Champ de saisie et bottom nav toujours visibles. |
| **État vide — 1er lancement** | Champ de saisie inline auto-focusé avec placeholder "Qu'est-ce qui te trotte dans la tête ?".                                                                                       |
| **État vide — Vrac triée**    | Message positif + lien vers Réserve ("Tout est trié — voir ta Réserve"). Champ de saisie toujours visible.                                                                          |
| **État peuplé**               | Liste de tâches, compteur actif, bouton tri visible sur chaque tâche. Champ de saisie en haut, prêt.                                                                                |
| **Nudge tri (onboarding)**    | Après 5s d'inactivité post-ajout : surbrillance du bouton tri sur la 1ère tâche. Disparaît si l'utilisateur saisit dans le champ.                                                   |
| **Édition du titre**          | Long press (~500ms) → le titre devient éditable + vibration haptique (cf. DT-01).                                                                                                   |
| **Responsive**                | Mobile : pleine largeur. Desktop : contenu centré max-width (~600px), sidebar gauche pour la nav.                                                                                   |

---

## ARCH-SCR-02 — Overlay de tri (écran fusionné)

**ID écran :** SCR-02
**Flow(s) associé(s) :** FLOW-02, FLOW-03
**Persona(s) primaire(s) :** P1 (Camille), P2 (Lucas), P3 (David)

### Hiérarchie des contenus

| Priorité            | Contenu                     | Justification                                                                           |
| ------------------- | --------------------------- | --------------------------------------------------------------------------------------- |
| 1 (regard immédiat) | Titre de la tâche en cours  | Ancrage contextuel — Camille doit savoir ce qu'elle trie à tout moment.                 |
| 2                   | Bouton "Aide-moi à décider" | Action primaire, différenciateur d'izh. Nudge architectural vers le tri assisté.        |
| 3                   | 4 quadrants                 | Action secondaire, classement direct pour les utilisateurs expérimentés (David, CU-03). |
| 4 (contexte)        | Fermeture (✕)               | Sortie de secours, non destructive.                                                     |

### Zones fonctionnelles

| Zone                  | Rôle                          | Contenu                            | Composant(s)               | Comportement                                                            |
| --------------------- | ----------------------------- | ---------------------------------- | -------------------------- | ----------------------------------------------------------------------- |
| [ZONE:overlay-handle] | Affordance de fermeture       | Handle de drag (barre horizontale) | Élément natif overlay      | Swipe down → ferme l'overlay, tâche intacte                             |
| [ZONE:task-context]   | Ancrage contextuel            | Titre de la tâche en cours de tri  | [COMP:task-context-header] | Fixe en haut de l'overlay, toujours visible                             |
| [ZONE:quadrant-grid]  | Classement direct             | 4 boutons quadrants en grille 2×2  | [COMP:quadrant-button] × 4 | Tap → classement immédiat (pas de confirmation). Style outline/discret. |
| [ZONE:assisted-cta]   | Action primaire — tri assisté | Bouton "Aide-moi à décider"        | [COMP:cta-assisted]        | Filled, large, proéminent. Pulse léger au 1er tri (onboarding).         |
| [ZONE:close]          | Sortie de secours             | Bouton ✕                           | [COMP:close-button]        | Retour Vrac, tâche intacte, aucune donnée enregistrée                   |

### Décisions de layout

| Décision                   | Choix                                                                  | Justification                                                                                                                                    | Alternative écartée                                                                                     |
| -------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Type de surface            | Bottom sheet partiel ~75% avec handle + fond assombri fort (cf. DT-02) | Le fond assombri élimine la distraction. Le ~75% laisse deviner l'écran parent = "parenthèse temporaire". Le handle signale "couche temporaire". | Full-cover — trop de vide, perd le caractère parenthèse. Bottom sheet ~50% — trop petit pour le contenu |
| Position du titre          | En haut de l'overlay, fixe                                             | Ancrage immédiat. En enchaînement rapide (20 tâches), l'utilisateur sait toujours laquelle.                                                      | Titre dans le Vrac derrière — pas assez visible                                                         |
| Disposition des quadrants  | Grille 2×2, au-dessus du bouton assisté                                | Respecte le modèle mental Eisenhower (2 axes). L'exposition répétée enseigne le mapping spatial.                                                 | Liste verticale de 4 boutons — perd le modèle mental spatial                                            |
| Position du bouton assisté | En dessous des quadrants, pleine largeur                               | Position finale = plus mémorisé (effet de récence). Plus grand = plus proéminent.                                                                | Au-dessus des quadrants — friction pour David qui veut les quadrants directs                            |
| Hiérarchie visuelle        | Quadrants = outline, Assisté = filled/primaire                         | Le nudge est architectural, pas textuel. Le poids visuel guide vers l'assisté.                                                                   | Poids égal — pas de guidage, l'utilisateur hésite entre 5 options                                       |

### Comportements clés

| Comportement                  | Détail                                                                                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Ouverture**                 | Slide up depuis le bas, ~300ms. Le backdrop s'assombrit simultanément. La bottom nav est masquée par le backdrop.                      |
| **Fermeture**                 | Swipe down sur le handle OU tap ✕. Tâche reste dans le Vrac, aucune donnée partielle. Le backdrop disparaît, la bottom nav réapparaît. |
| **Tap quadrant (tri manuel)** | Classement immédiat → transition vers SCR-05. Pas de confirmation (décision D8, doc 03).                                               |
| **Tap "Aide-moi à décider"**  | Transition slide vers SCR-03. Si 1er tri : micro-texte affiché.                                                                        |
| **Onboarding (1er tri)**      | Le bouton assisté pulse légèrement. Disparaît après 1er usage.                                                                         |
| **Enchaînement rapide**       | Après SCR-05, si "Tâche suivante" → l'overlay reste ouvert, le titre change. Pas de fermeture/réouverture.                             |
| **Réserve pleine (40/40)**    | Le classement aboutit mais redirection vers état d'erreur dans SCR-05.                                                                 |
| **Responsive**                | Mobile : bottom sheet ~75% avec handle + fond assombri. Desktop : modal centrée ~480px avec backdrop, sidebar nav visible.             |

---

## ARCH-SCR-03 — Questionnaire cognitif

**ID écran :** SCR-03
**Flow(s) associé(s) :** FLOW-02
**Persona(s) primaire(s) :** P1 (Camille), P2 (Lucas), P3 (David)

### Hiérarchie des contenus

| Priorité            | Contenu                       | Justification                                                               |
| ------------------- | ----------------------------- | --------------------------------------------------------------------------- |
| 1 (regard immédiat) | Titre de la tâche en cours    | Ancrage permanent (hérité de l'overlay).                                    |
| 2                   | La question                   | Une seule question visible, claire, courte, langage émotionnel (Système 1). |
| 3                   | Les réponses                  | Options qui orientent vers le flux approprié ou vers un quadrant.           |
| 4                   | Indicateur de progression     | Discret, donne le sentiment "ça avance" sans stresser.                      |
| 5 (contexte)        | Navigation interne (← Retour) | Retour à la question précédente.                                            |

### Zones fonctionnelles

| Zone                | Rôle                 | Contenu                                                    | Composant(s)               | Comportement                                                                            |
| ------------------- | -------------------- | ---------------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------- |
| [ZONE:task-context] | Ancrage (hérité)     | Titre de la tâche                                          | [COMP:task-context-header] | Fixe en haut, identique à SCR-02                                                        |
| [ZONE:micro-text]   | Rassurance (1er tri) | "Réponds à l'instinct — il n'y a pas de mauvaise réponse." | Texte discret              | Affiché une seule fois (flag localStorage)                                              |
| [ZONE:question]     | Contenu principal    | La question en cours                                       | [COMP:question-card]       | Une seule question visible. Transition slide horizontal.                                |
| [ZONE:answers]      | Choix                | 2-4 boutons de réponse                                     | [COMP:answer-option] × N   | Tap → question suivante ou SCR-04                                                       |
| [ZONE:progress]     | Feedback             | Indicateur dots (•●•)                                      | [COMP:progress-dots]       | Mis à jour à chaque question. Pas de label "Étape 2/4".                                 |
| [ZONE:back]         | Navigation interne   | Bouton ← Retour                                            | [COMP:back-link]           | Ramène à la question précédente, réponse pré-sélectionnée. Absent sur la 1ère question. |

### Décisions de layout

| Décision                  | Choix                                                               | Justification                                                                        | Alternative écartée                                                           |
| ------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Une question par écran    | Afficher une seule question à la fois, transitions slide horizontal | Réduit la charge cognitive. Crée un rythme question → réponse qui donne du momentum. | Toutes les questions sur un scroll — overwhelming, rappelle un formulaire     |
| Position de la question   | Centre vertical                                                     | Zone de focus naturel. L'espace autour respire.                                      | En haut sous le titre — réponses trop basses, hors zone du pouce              |
| Format des réponses       | Boutons pleine largeur empilés verticalement                        | Un seul geste : lire → taper. Zone de tap large, Camille fatiguée une main.          | Radio buttons + submit — 2 gestes au lieu de 1                                |
| Indicateur de progression | Dots (•●•)                                                          | Discrets, non anxiogènes. Pas de quantification.                                     | Barre de progression — pression. "2/4" — ton professoral                      |
| Transition                | Slide horizontal (← →)                                              | Métaphore de progression linéaire. Retour slide dans l'autre sens.                   | Fade in/out — pas de sens directionnel                                        |
| Wording des réponses      | Langage émotionnel court (Système 1)                                | L'utilisateur reconnaît son état au lieu d'analyser. Principe #4.                    | Réponses analytiques Eisenhower — demande une analyse impossible en surcharge |

### Structure des flux

| Flux                                | Déclencheur                             | Nb questions              | Sortie                            |
| ----------------------------------- | --------------------------------------- | ------------------------- | --------------------------------- |
| Flux 1 — Projection de conséquences | "Pas sûr·e" / redirection depuis Flux 2 | 1                         | 4 réponses → 4 quadrants → SCR-04 |
| Flux 2 — Ancrage aux objectifs      | "Pas prioritaire"                       | 2 (ou redirection Flux 1) | → SCR-04                          |
| Flux 3 — Audit source du stress     | "Obligé·e"                              | 1-3                       | → SCR-04                          |
| Flux 4 — Test du regret             | "Repoussé·e"                            | 2                         | → SCR-04                          |

### Comportements clés

| Comportement              | Détail                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| **Question d'aiguillage** | "Comment tu vis cette tâche en ce moment ?" → 4 réponses orientent vers Flux 1-4.          |
| **Retour**                | ← Retour ramène à la question précédente. Réponse choisie pré-sélectionnée visuellement.   |
| **Flux 2 → Flux 1**       | Si "pas de priorités définies" → redirection fluide vers Flux 1, pas de message d'erreur.  |
| **Sortie**                | ✕ ferme l'overlay entier. Tâche reste dans le Vrac. Aucune réponse partielle.              |
| **Timer**                 | `flow_duration_ms` court depuis l'ouverture de SCR-02 — continue pendant le questionnaire. |
| **Micro-texte**           | "Réponds à l'instinct" n'apparaît qu'une seule fois (flag localStorage).                   |

---

## ARCH-SCR-04 — Confirmation de tri

**ID écran :** SCR-04
**Flow(s) associé(s) :** FLOW-02
**Persona(s) primaire(s) :** P1 (Camille), P2 (Lucas), P3 (David)

### Hiérarchie des contenus

| Priorité            | Contenu                 | Justification                                                  |
| ------------------- | ----------------------- | -------------------------------------------------------------- |
| 1 (regard immédiat) | Titre de la tâche       | Ancrage contextuel (hérité).                                   |
| 2                   | Quadrant proposé        | Résultat du questionnaire, mis en avant (couleur + label izh). |
| 3                   | Bouton "Ça me parle"    | Validation primaire, wording émotionnel (Système 1).           |
| 4                   | 3 quadrants alternatifs | Correction en un geste si désaccord.                           |
| 5 (contexte)        | Compteur de progression | "4/15 triées".                                                 |

### Zones fonctionnelles

| Zone                   | Rôle                | Contenu                                                       | Composant(s)               | Comportement                                |
| ---------------------- | ------------------- | ------------------------------------------------------------- | -------------------------- | ------------------------------------------- |
| [ZONE:task-context]    | Ancrage (hérité)    | Titre de la tâche                                             | [COMP:task-context-header] | Fixe en haut                                |
| [ZONE:result-proposal] | Résultat principal  | Couleur + label du quadrant proposé                           | [COMP:quadrant-result]     | Centré verticalement, visuellement dominant |
| [ZONE:confirm-cta]     | Validation primaire | Bouton "Ça me parle"                                          | [COMP:cta-confirm]         | Filled, large, pleine largeur               |
| [ZONE:alternatives]    | Correction          | "Pas convaincu·e ?" + 3 boutons quadrants (le proposé absent) | [COMP:quadrant-button] × 3 | Outline, compacts, sous le CTA              |
| [ZONE:progress]        | Feedback            | Compteur "4/15 triées"                                        | Texte discret en bas       | Mis à jour au fil des tris                  |

### Décisions de layout

| Décision                                 | Choix                                                  | Justification                                    | Alternative écartée                                           |
| ---------------------------------------- | ------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------- |
| Résultat proéminent                      | Couleur + label + taille dominante, centré             | L'œil tombe sur le résultat sans effort.         | Résultat au même niveau que les alternatives                  |
| "Ça me parle" sous le résultat           | Proximité résultat → validation                        | Un seul mouvement de scan vertical.              | En bas d'écran — trop loin du résultat                        |
| Alternatives en bas, discrètes           | 3 boutons outline sous micro-texte "Pas convaincu·e ?" | Accessibles mais pas en compétition avec le CTA. | 4 boutons au même niveau — annule le travail du questionnaire |
| Quadrant proposé absent des alternatives | Seuls les 3 autres quadrants affichés                  | Pas de confusion, pas de redondance.             | 4 boutons avec le proposé pré-sélectionné                     |

### Comportements clés

| Comportement          | Détail                                                                                |
| --------------------- | ------------------------------------------------------------------------------------- |
| **"Ça me parle"**     | Classement `user_override: false` → transition vers SCR-05.                           |
| **Tap alternative**   | Classement `user_override: true` → transition vers SCR-05.                            |
| **Donnée analytique** | Taux de correction (`user_override: true`) : si >30% sur un flux → revoir le wording. |

---

## ARCH-SCR-05 — Résultat de tri

**ID écran :** SCR-05
**Flow(s) associé(s) :** FLOW-02, FLOW-03
**Persona(s) primaire(s) :** P1 (Camille), P2 (Lucas), P3 (David)

### Hiérarchie des contenus

| Priorité            | Contenu                       | Justification                          |
| ------------------- | ----------------------------- | -------------------------------------- |
| 1 (regard immédiat) | Titre de la tâche             | Ancrage (hérité).                      |
| 2                   | Quadrant attribué + animation | Feedback de succès.                    |
| 3                   | Action suivante               | "Tâche suivante" ou "Voir la Réserve". |
| 4 (contexte)        | Compteur de progression       | "5/15 triées".                         |

### Zones fonctionnelles

| Zone                   | Rôle                  | Contenu                                                        | Composant(s)                          | Comportement                                  |
| ---------------------- | --------------------- | -------------------------------------------------------------- | ------------------------------------- | --------------------------------------------- |
| [ZONE:task-context]    | Ancrage (hérité)      | Titre de la tâche                                              | [COMP:task-context-header]            | Fixe en haut                                  |
| [ZONE:result-feedback] | Confirmation visuelle | Quadrant attribué + animation de classement                    | [COMP:quadrant-result] + animation    | Scale up + fade in, ~300ms                    |
| [ZONE:actions]         | Suite du flow         | "Tâche suivante →" (primaire) + "Voir la Réserve" (secondaire) | [COMP:cta-next] + [COMP:link-backlog] | Si Vrac vide : message positif + lien Réserve |
| [ZONE:progress]        | Feedback              | Compteur "5/15 triées"                                         | Texte discret en bas                  | Mis à jour                                    |

### Décisions de layout

| Décision                        | Choix                     | Justification                                      | Alternative écartée                                    |
| ------------------------------- | ------------------------- | -------------------------------------------------- | ------------------------------------------------------ |
| "Tâche suivante" en primaire    | Bouton filled, proéminent | L'enchaînement rapide est le comportement attendu. | Les deux boutons au même niveau — ralentit la décision |
| "Voir la Réserve" en secondaire | Lien texte ou outline     | Disponible mais pas en compétition.                | Pas de lien — l'utilisateur est piégé dans la boucle   |
| Compteur en bas                 | Texte discret             | Momentum sans pression.                            | Barre de progression — trop de pression                |

### Comportements clés

| Comportement               | Détail                                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| **Tâche suivante**         | Overlay reste ouvert → retour à SCR-02 avec titre suivant. Pas de fermeture/réouverture. |
| **Voir la Réserve**        | Fermeture overlay → SCR-06. Tâche classée en highlight temporaire (2-3s).                |
| **Vrac vide**              | "Tout est trié !" + lien Réserve. Pas de "Tâche suivante".                               |
| **Réserve pleine (40/40)** | Tâche reste Vrac avec badge couleur. "Fais de la place" + [Purger] + [Revenir au Vrac].  |

---

## ARCH-SCR-06 — Réserve

**ID écran :** SCR-06
**Flow(s) associé(s) :** FLOW-04, FLOW-06
**Persona(s) primaire(s) :** P1 (Camille), P2 (Lucas), P3 (David)

### Hiérarchie des contenus

| Priorité            | Contenu                                                | Justification                                            |
| ------------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| 1 (regard immédiat) | Listes de tâches par quadrant (accordion)              | Le contenu classifié. État mental = "j'organise".        |
| 2                   | Sous-titre pédagogique + compteur dynamique ("[N]/40") | Feedback de capacité et guidage.                         |
| 3                   | Actions par tâche (activer, compléter, reclasser)      | Gestion des tâches.                                      |
| 4 (contexte)        | Navigation persistante (bottom bar)                    | Orientation. Pour capturer : naviguer vers Vrac (1 tap). |

### Zones fonctionnelles

| Zone                    | Rôle                | Contenu                                                                                               | Composant(s)                                          | Comportement                                                       |
| ----------------------- | ------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| [ZONE:header]           | Contexte + capacité | H1 "Réserve" + sous-titre "Tes tâches triées attendent ici, active celles que tu veux faire · [N]/40" | H1 + [COMP:subtitle-counter]                          | Fixe. Compteur dynamique [N]/40. Changement visuel à 35+ et 40/40. |
| [ZONE:quadrant-list-q1] | Tâches Q1           | Couleur rouge + label + compteur + liste                                                              | [COMP:backlog-section] + [COMP:task-item-backlog] × N | Ouvert par défaut (accordion, cf. DT-04).                          |
| [ZONE:quadrant-list-q2] | Tâches Q2           | Couleur jaune + label + compteur + liste                                                              | [COMP:backlog-section] + [COMP:task-item-backlog] × N | Collapsed par défaut.                                              |
| [ZONE:quadrant-list-q3] | Tâches Q3           | Couleur bleue + label + compteur + liste                                                              | [COMP:backlog-section] + [COMP:task-item-backlog] × N | Collapsed par défaut.                                              |
| [ZONE:quadrant-list-q4] | Tâches Q4           | Couleur grise + label + compteur + liste                                                              | [COMP:backlog-section] + [COMP:task-item-backlog] × N | Collapsed, en bas.                                                 |
| [ZONE:nudge-purge]      | Alerte douce (35+)  | "37/40 — un petit tri ?" + lien purge                                                                 | [COMP:nudge-banner]                                   | Au-dessus des listes, dismissable.                                 |
| [ZONE:empty-state]      | Guidage (si vide)   | "Trie tes premières tâches depuis le Vrac" + lien                                                     | [COMP:empty-state]                                    | Centré                                                             |
| [ZONE:bottom-nav]       | Navigation          | 4 items, Réserve actif                                                                                | [COMP:bottom-nav]                                     | Badge Vrac                                                         |

### Décisions de layout

| Décision                          | Choix                                                                     | Justification                                                                                                             | Alternative écartée                                              |
| --------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Layout mobile                     | Accordion strict (cf. DT-04) — Q1 ouvert, Q2/Q3/Q4 collapsed              | Max ~10 tâches visibles. Headers collapsed = zones de drop pour le drag inter-quadrant.                                   | Toutes ouvertes — scroll excessif, drag impossible               |
| Drag inter-quadrant               | Drop sur les headers collapsed avec surbrillance couleur                  | Les headers fermés sont des cibles compactes et identifiées. Surbrillance = feedback clair.                               | Drag en scrollant — impossible sur mobile                        |
| Drag intra-quadrant               | Drag vertical au sein de la section ouverte                               | Réordonnancement manuel. Pas de conflit : si le doigt reste dans la section = réordonnancement, s'il sort = reclassement. | Pas de réordonnancement — pas assez flexible                     |
| Bouton activer par tâche          | Icône/bouton inline à droite                                              | Envoie la tâche dans le Focus (même quadrant). Grisé si quadrant Focus plein (4/4).                                       | Drag vers le Focus — cross-screen drag trop complexe             |
| Purge unitaire                    | Swipe gauche → supprimer + menu contextuel (long press) comme alternative | Deux gestes pour deux profils : swipe (David) + menu (Camille). Toast undo 5s.                                            | Swipe uniquement — discoverability insuffisante                  |
| Sous-titre + compteur de capacité | Sous-titre pédagogique + "[N]/40" dans le header, sous le H1              | L'utilisateur sait toujours où il en est et comprend le rôle de l'écran. Changement visuel à 35+.                         | Pas de compteur — surprise à 40. Compteur seul — pas de guidage. |
| Layout desktop                    | Même accordion que mobile                                                 | Cohérence cross-device — pas de re-apprentissage. La Réserve peut contenir 40 tâches, les colonnes seraient trop denses.  | 4 colonnes côte à côte — rompt la cohérence cross-device         |

### Comportements clés

| Comportement               | Détail                                                                                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Accordion**              | Tap sur un header collapsed → cette section s'ouvre, les autres se ferment. Tap sur la section ouverte → elle se ferme (tout collapsed). |
| **Drag inter-quadrant**    | Long press puis drag → headers collapsed en surbrillance. Drop sur header = reclassement. Toast "Déplacée vers [quadrant]".              |
| **Activer → Focus**        | Tap bouton → tâche disparaît (animation) → toast "Ajoutée à ton Focus". Si quadrant Focus plein → bouton grisé + message.                |
| **Compléter**              | Pas de complétion dans la Réserve — uniquement dans le Focus. L'utilisateur doit d'abord activer la tâche.                               |
| **Édition titre**          | Long press → édition inline (cf. DT-01).                                                                                                 |
| **Highlight post-tri**     | Tâche classée depuis SCR-05 : highlight temporaire 2-3s dans son quadrant.                                                               |
| **Bouton "Faire du tri"**  | Permanent, pleine largeur, au-dessus de la liste. Lance la purge (SCR-07) à tout moment.                                                 |
| **Nudge purge (35+)**      | Banner dismissable sous le bouton. "[N]/40 — ton backlog se remplit !".                                                                  |
| **Plein (40/40)**          | Compteur rouge. Ajout depuis le Vrac bloqué. Purge proposée. Vrac reste illimitée.                                                       |
| **Réserve intra-quadrant** | Toggle discret : "Par date" / "Manuel". Défaut : manuel.                                                                                 |
| **Responsive**             | Même layout accordion sur toutes les surfaces (mobile, tablette, desktop).                                                               |

---

## ARCH-SCR-07 — Overlay de purge — Intro

**ID écran :** SCR-07
**Flow(s) associé(s) :** FLOW-06
**Persona(s) primaire(s) :** P1 (Camille), P3 (David)

### Zones fonctionnelles

| Zone                  | Rôle           | Contenu                                                  | Composant(s)                               | Comportement                                |
| --------------------- | -------------- | -------------------------------------------------------- | ------------------------------------------ | ------------------------------------------- |
| [ZONE:overlay-handle] | Affordance     | Handle de swipe down                                     | Élément natif                              | Swipe down = "Pas maintenant"               |
| [ZONE:illustration]   | Ton émotionnel | Icône 🧹                                                 | Élément décoratif                          | Sobre                                       |
| [ZONE:message]        | Contexte       | Titre + sous-texte contextuel                            | H2 + texte                                 | 2 variantes : nudge (35+) / blocage (40/40) |
| [ZONE:actions]        | Décision       | "C'est parti" (primaire) + "Pas maintenant" (secondaire) | [COMP:cta-primary] + [COMP:link-secondary] | Primaire → SCR-08. Secondaire → ferme.      |

### Décisions de layout

| Décision        | Choix                                                                  | Justification                                                                                                         | Alternative écartée                                                       |
| --------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Type de surface | Bottom sheet partiel ~75% avec handle + fond assombri fort (cf. DT-02) | Cohérent avec tous les overlays de flow. Le fond assombri maintient le contexte "parenthèse au-dessus de la Réserve". | ~50% — incohérent avec les autres overlays. Full-cover — disproportionné. |

### Variantes de message

| Déclencheur     | Titre                  | Sous-texte                                                                           |
| --------------- | ---------------------- | ------------------------------------------------------------------------------------ |
| Nudge (35+)     | "Un peu de tri ?"      | "Ta Réserve a 37 tâches. On regarde ensemble celles qui traînent depuis un moment ?" |
| Blocage (40/40) | "Ta Réserve est plein" | "40/40 tâches. Fais de la place pour continuer à trier depuis le Vrac."              |

---

## ARCH-SCR-08 — Overlay de purge — Questionnaire

**ID écran :** SCR-08
**Flow(s) associé(s) :** FLOW-06
**Persona(s) primaire(s) :** P1 (Camille), P3 (David)

### Zones fonctionnelles

| Zone                      | Rôle              | Contenu                                                               | Composant(s)                                  | Comportement                             |
| ------------------------- | ----------------- | --------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------- |
| [ZONE:task-purge-context] | Ancrage           | Titre + badge quadrant + ancienneté ("là depuis 3 semaines")          | [COMP:task-purge-header]                      | Fixe en haut. L'ancienneté est un nudge. |
| [ZONE:question]           | Contenu principal | Q1 : "Elle compte toujours ?" / Q2 : "Au bon endroit ?"               | [COMP:question-card] (réutilisé)              | Une question à la fois                   |
| [ZONE:answers]            | Actions           | Q1 : "Oui" / "Non, supprimer". Q2 : quadrant actuel + 3 alternatives. | [COMP:answer-option] + [COMP:quadrant-button] | Tap → tâche suivante                     |
| [ZONE:progress]           | Feedback          | "3/12 tâches revues"                                                  | Texte discret                                 | Mis à jour                               |
| [ZONE:stop]               | Sortie            | "Arrêter la purge"                                                    | [COMP:link-secondary]                         | Toujours visible. Changements persistés. |

### Décisions de layout

| Décision            | Choix                                                                  | Justification                                                                              | Alternative écartée                                             |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Type de surface     | Bottom sheet partiel ~75% avec handle + fond assombri fort (cf. DT-02) | Cohérent avec tous les overlays de flow. Le fond assombri assure le focus sans full-cover. | Full-cover — incohérent avec les autres overlays, trop de vide. |
| Ordre des tâches    | Par ancienneté décroissante, Q4 d'abord                                | Les plus anciennes et moins importantes = candidates les plus probables.                   | Aléatoire — pas de logique                                      |
| Flow en 2 questions | Q1 existence → Q2 placement                                            | Deux filtres séquentiels. "Non, supprimer" dès Q1 accélère la purge.                       | Question unique — pas de reclassement possible                  |

### Comportements clés

| Comportement           | Détail                                                |
| ---------------------- | ----------------------------------------------------- |
| **"Non, supprimer"**   | Suppression immédiate + tâche suivante.               |
| **"Oui" → Q2**         | Quadrant actuel pré-sélectionné + 3 alternatives.     |
| **"Arrêter la purge"** | Retour Réserve. Changements persistés. Pas de bilan.  |
| **Rien à purger**      | "Ta Réserve est bien rangé." + [Retour à la Réserve]. |

---

## ARCH-SCR-09 — Overlay de purge — Bilan

**ID écran :** SCR-09
**Flow(s) associé(s) :** FLOW-06
**Persona(s) primaire(s) :** P1 (Camille), P3 (David)

### Zones fonctionnelles

| Zone                | Rôle              | Contenu                                         | Composant(s)            | Comportement                        |
| ------------------- | ----------------- | ----------------------------------------------- | ----------------------- | ----------------------------------- |
| [ZONE:illustration] | Ton émotionnel    | 🧹 + "Purge terminée"                           | H2                      | Satisfaction discrète               |
| [ZONE:recap]        | Résultat          | N revues, X supprimées, Y reclassées, Z gardées | [COMP:recap-list]       | Chiffres mis en évidence            |
| [ZONE:new-total]    | Feedback capacité | "Réserve : 29/40"                               | [COMP:counter-capacity] | Renforce "j'ai fait de la place"    |
| [ZONE:action]       | Retour            | "Retour à la Réserve"                           | [COMP:cta-primary]      | Ferme l'overlay → SCR-06 mis à jour |

### Décision de layout

Contenu centré, minimaliste. L'écran dure 3-5 secondes — récap + total + un bouton.

---

## ARCH-SCR-10 — Focus

**ID écran :** SCR-10
**Flow(s) associé(s) :** FLOW-04, FLOW-07
**Persona(s) primaire(s) :** P1 (Camille), P2 (Lucas), P3 (David)

### Hiérarchie des contenus

| Priorité            | Contenu                                                    | Justification                                          |
| ------------------- | ---------------------------------------------------------- | ------------------------------------------------------ |
| 1 (regard immédiat) | Tâches actives (dans le quadrant sélectionné ou la grille) | L'espace d'action. Camille voit quoi faire maintenant. |
| 2                   | Labels + compteurs des quadrants                           | Orientation spatiale, vue d'ensemble.                  |
| 3                   | Actions par tâche (compléter, remettre à la Réserve)       | Gestion.                                               |
| 4 (contexte)        | Navigation persistante (bottom bar)                        | Orientation.                                           |

### Zones fonctionnelles — Mobile (layout asymétrique + swap, cf. DT-03 v3)

| Zone                      | Rôle                                  | Contenu                                                                                                                                                      | Composant(s)                                                 | Comportement                                                                                                                                                                                |
| ------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ZONE:header]             | Contexte + progression                | H1 "Focus" + sous-titre "Tes tâches du moment, max 4 par priorité · [N] en cours"                                                                            | H1 + [COMP:subtitle-counter]                                 | Fixe. Compteur dynamique [N] = total des tâches activées.                                                                                                                                   |
| [ZONE:prominent-quadrant] | Quadrant actif, lisible               | Couleur + label complet + compteur + liste max 4 tâches (checkbox + titre complet)                                                                           | [COMP:matrix-prominent-zone] + [COMP:task-item-matrix] × 0-4 | ~50% hauteur utile. Q1 par défaut à chaque entrée. Long press → éditer titre.                                                                                                               |
| [ZONE:nav-grid]           | Navigation permanente des 4 quadrants | Grille 2×2 de 4 mini-cards : couleur + label complet + compteur ("2/4"). Le quadrant affiché en zone proéminente est visuellement marqué (indicateur actif). | [COMP:matrix-nav-card] × 4                                   | Tap → swap : le contenu du quadrant tappé monte en zone proéminente. L'indicateur actif se déplace. Positions fixes : Q1 (haut-gauche), Q2 (haut-droite), Q3 (bas-gauche), Q4 (bas-droite). |
| [ZONE:empty-state]        | Guidage (si vide)                     | "Active des tâches depuis ta Réserve" + lien                                                                                                                 | [COMP:empty-state]                                           | Si aucune tâche activée (global) ou si quadrant proéminent vide                                                                                                                             |
| [ZONE:bottom-nav]         | Navigation                            | 4 items, Focus sélectionné                                                                                                                                   | [COMP:bottom-nav]                                            | Badge Vrac                                                                                                                                                                                  |

### Zones fonctionnelles — Desktop (grille 2×2)

| Zone               | Rôle            | Contenu                                              | Composant(s)                                         | Comportement                                                        |
| ------------------ | --------------- | ---------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------- |
| [ZONE:matrix-grid] | Grille d'action | 4 quadrants en 2×2, chacun avec label + max 4 tâches | [COMP:matrix-quadrant] × 4 + [COMP:task-item-matrix] | Pas de scroll. Drag inter-quadrant interdit (feedback pédagogique). |

### Décisions de layout

| Décision                       | Choix                                                                                                | Justification                                                                                                                                                                                                  | Alternative écartée                                                                                                                                 |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout mobile                  | Layout asymétrique + swap + grille nav 2×2 (cf. DT-03 v3)                                            | 1 quadrant proéminent (~50% hauteur, titres complets) + grille 2×2 de 4 mini-cards navigation. Résout le vide du segmented control et la confusion avec la Réserve. Vue d'ensemble permanente des 4 quadrants. | Segmented control — écran vide. 3 mini-cards (v2) — le quadrant actif absent de la nav peut désorienter. Grille 2×2 symétrique — titres illisibles. |
| Mini-cards (grille 2×2 nav)    | Couleur + label complet + compteur. Indicateur actif sur le quadrant affiché. Positions fixes Q1→Q4. | Vue d'ensemble permanente des 4 quadrants. La grille 2×2 rappelle visuellement le modèle Eisenhower. L'indicateur actif maintient l'orientation.                                                               | 3 mini-cards (v2) — absence du quadrant actif en bas, label tronqué                                                                                 |
| Pas de capture                 | Aucun mécanisme d'ajout de tâche                                                                     | Le Focus est l'espace d'action (compléter, remettre à la Réserve). La capture se fait dans le Vrac uniquement.                                                                                                 | FAB flottant — non intuitif (test utilisateur) et bruit visuel                                                                                      |
| Quadrant par défaut            | Q1 "Faire maintenant" (label Focus), reset à chaque entrée                                           | Répond à "par quoi je commence ?" sans navigation. Pas de mémorisation.                                                                                                                                        | Dernier quadrant consulté — Camille veut la réponse immédiate                                                                                       |
| Swap au tap                    | Tap mini-card → contenu permute avec zone proéminente, animation crossfade ~200ms                    | Accès à n'importe quel quadrant en titres complets. Structure fixe, seul le contenu change.                                                                                                                    | Navigation par onglets — perte de vue d'ensemble                                                                                                    |
| Taille des quadrants (desktop) | 4 zones égales, grille symétrique                                                                    | Pas de hiérarchie de taille. Les labels et couleurs différencient.                                                                                                                                             | Q1 plus grand — biais de taille, renforcerait le Mere Urgency Effect                                                                                |
| Checkbox à gauche du titre     | Convention universelle (to-do lists)                                                                 | Zone de tap large. La complétion est le geste le plus fréquent.                                                                                                                                                | Swipe pour compléter — pas discoverable                                                                                                             |

### Comportements clés

| Comportement                       | Détail                                                                                                                                                                                             |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Complétion**                     | Checkbox → fade out + scale down → toast undo "Tâche complétée — [Annuler]" (5s) → Archive.                                                                                                        |
| **Remettre à la Réserve**          | Drag → zone Réserve s'illumine. Drop → retour même quadrant Réserve.                                                                                                                               |
| **Feedback pédagogique (desktop)** | Drag inter-quadrant dans la grille 2×2 → snap-back + toast "Dans le Focus, tu agis. Pour reclasser, remets-la d'abord dans la Réserve."                                                            |
| **État vide global**               | Message centré "Active des tâches depuis ta Réserve" + lien SCR-06.                                                                                                                                |
| **Swap**                           | Tap mini-card → crossfade ~200ms. Le contenu du quadrant tappé monte en zone proéminente. L'indicateur actif se déplace vers la mini-card tappée. Les positions des mini-cards ne changent jamais. |
| **Reset à l'entrée**               | À chaque navigation vers l'écran Focus (depuis bottom nav ou autre), Q1 est proéminent.                                                                                                            |
| **Quadrant vide (mobile)**         | Message contextuel dans la zone proéminente. Mini-card : compteur "0/4", label visible.                                                                                                            |
| **Quadrant vide (desktop)**        | Zone grisée/atténuée, label lisible.                                                                                                                                                               |
| **Highlight post-activation**      | Tâches nouvellement activées : highlight temporaire 2-3s.                                                                                                                                          |
| **Micro-survey**                   | Peut se déclencher après complétion (SCR-12, non bloquant).                                                                                                                                        |
| **Responsive**                     | Mobile : layout asymétrique (1 proéminent + grille 2×2 de 4 mini-cards nav, swap au tap). Tablette : grille 2×2. Desktop : grille 2×2 dans zone principale.                                        |

---

## ARCH-SCR-11 — Archive

**ID écran :** SCR-11
**Flow(s) associé(s) :** FLOW-07
**Persona(s) primaire(s) :** P1 (Camille), P2 (Lucas), P3 (David)

### Zones fonctionnelles

| Zone               | Rôle                   | Contenu                                                                | Composant(s)                 | Comportement                                                |
| ------------------ | ---------------------- | ---------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------- |
| [ZONE:header]      | Contexte + progression | H1 "Archive" + sous-titre "Tout ce que tu as accompli · [N] terminées" | H1 + [COMP:subtitle-counter] | Fixe. Compteur dynamique [N] = total des tâches complétées. |
| [ZONE:task-list]   | Contenu principal      | Liste scrollable de tâches complétées                                  | [COMP:task-item-archive] × N | Antichronologique. Badge couleur du quadrant d'origine.     |
| [ZONE:empty-state] | Guidage                | "Tes tâches complétées apparaîtront ici"                               | [COMP:empty-state]           | Ton neutre                                                  |
| [ZONE:bottom-nav]  | Navigation             | 4 items, Archive actif                                                 | [COMP:bottom-nav]            | Badge Vrac                                                  |

### Décisions de layout

| Décision                       | Choix                                      | Justification                                    | Alternative écartée                                                  |
| ------------------------------ | ------------------------------------------ | ------------------------------------------------ | -------------------------------------------------------------------- |
| Liste antichronologique        | Plus récentes en haut, pas de regroupement | "Qu'est-ce que j'ai fait récemment ?"            | Regroupement par quadrant — l'Archive n'est pas un espace de travail |
| Badge couleur quadrant         | Petit badge coloré par tâche               | Rappel discret de la classification.             | Pas de badge — liste fade                                            |
| Lecture seule                  | Pas de réactivation, pas de suppression    | Miroir de progression, pas un espace de travail. | Bouton réactiver — scope creep                                       |
| Pas de filtre/recherche en MVP | Scroll uniquement                          | Liste courte en semaines d'usage MVP.            | Filtre — over-engineering                                            |

---

## ARCH-SCR-12 — Micro-survey (bottom sheet)

**ID écran :** SCR-12
**Flow(s) associé(s) :** —
**Persona(s) primaire(s) :** P1 (Camille), P2 (Lucas), P3 (David)

### Zones fonctionnelles

| Zone            | Rôle                  | Contenu                                                      | Composant(s)         | Comportement                            |
| --------------- | --------------------- | ------------------------------------------------------------ | -------------------- | --------------------------------------- |
| [ZONE:handle]   | Affordance de dismiss | Handle de drag                                               | Élément natif        | Swipe down = dismiss sans donnée        |
| [ZONE:question] | Contenu               | "Comment tu te sens par rapport à tes tâches en ce moment ?" | Texte court          | Pas de titre, directement la question   |
| [ZONE:slider]   | Réponse               | Slider 1-10, émojis aux extrêmes (😫 → 😌)                   | [COMP:survey-slider] | Pas de labels intermédiaires            |
| [ZONE:submit]   | Validation            | Bouton "Envoyer"                                             | [COMP:cta-primary]   | Enregistre score + timestamp + contexte |

### Décisions de layout

| Décision                  | Choix                                     | Justification                                     | Alternative écartée                 |
| ------------------------- | ----------------------------------------- | ------------------------------------------------- | ----------------------------------- |
| Type de surface           | Bottom sheet partiel (~30%), non bloquant | Parenthèse, pas un overlay de focus. Dismissable. | Modal plein écran — disproportionné |
| Slider vs boutons         | Slider continu 1-10                       | Geste tactile naturel, moins "formulaire".        | 10 boutons — trop de choix visuels  |
| Émojis aux extrêmes       | 😫 (1) et 😌 (10), rien entre             | Ton émotionnel sans ancrage lexical.              | Labels textuels — biais d'ancrage   |
| Pas de relance si dismiss | Revient dans 7 jours                      | Respect du consentement. Pas de 2e popup.         | Relance — intrusif                  |

### Comportements clés

| Comportement     | Détail                                                                                                           |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Déclencheurs** | Post-1er tri complet (one-time) OU 1x/semaine (après complétion). Jamais au lancement. Jamais pendant tri/purge. |
| **Envoyer**      | `mental_lightness_score` + `survey_timestamp` + `survey_context`. Bottom sheet disparaît.                        |
| **Dismiss**      | Aucune donnée. Revient dans 7 jours.                                                                             |
| **Position**     | Par-dessus n'importe quel écran. La bottom nav reste visible.                                                    |

---

## Synthèse des composants réutilisables

> _Liste des composants récurrents identifiés. À spécifier dans le livrable 06._

### Composants transversaux

| Composant             | Variantes                                                                                                           | Écrans                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| [COMP:bottom-nav]     | 4 items (Vrac/Réserve/Focus/Archive), actif/inactif, badge compteur sur Vrac                                        | Tous les écrans de niveau 1    |
| [COMP:capture-input]  | Champ de saisie inline, placeholder "Qu'est-ce qui te trotte dans la tête ?", auto-focus (1er lancement uniquement) | SCR-01 (Vrac uniquement)       |
| [COMP:empty-state]    | 1er lancement (guidage), Vrac triée (lien Réserve), Réserve vide, Focus vide, Archive vide                          | SCR-01, SCR-06, SCR-10, SCR-11 |
| [COMP:toast-undo]     | "Tâche complétée — [Annuler]", "Tâche supprimée — [Annuler]", countdown 5s                                          | SCR-06, SCR-10                 |
| [COMP:overlay-shell]  | Flow ~75% avec handle + fond assombri fort (tri, purge), micro ~30% (micro-survey)                                  | SCR-02-05, SCR-07-09, SCR-12   |
| [COMP:close-button]   | Bouton ✕ discret                                                                                                    | SCR-02, overlays               |
| [COMP:cta-primary]    | Bouton filled, large, pleine largeur                                                                                | Multiples                      |
| [COMP:link-secondary] | Lien texte ou bouton outline, secondaire                                                                            | Multiples                      |

### Composants de tâche

| Composant                  | Variantes                                                                                                                               | Écrans                         |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| [COMP:task-item-inbox]     | Default (titre + bouton tri), surbrillance tri (onboarding)                                                                             | SCR-01                         |
| [COMP:task-item-backlog]   | Default (titre + bouton activer), drag actif, highlight post-tri, activer grisé. Pas de checkbox — la complétion se fait dans le Focus. | SCR-06                         |
| [COMP:task-item-matrix]    | Default (checkbox + titre), drag actif, completing (fade out), highlight post-activation                                                | SCR-10                         |
| [COMP:task-item-archive]   | Titre + badge quadrant couleur + date de complétion. Lecture seule.                                                                     | SCR-11                         |
| [COMP:task-context-header] | Titre de tâche en haut d'overlay                                                                                                        | SCR-02, SCR-03, SCR-04, SCR-05 |
| [COMP:task-purge-header]   | Titre + badge quadrant + ancienneté                                                                                                     | SCR-08                         |

### Composants de quadrant

| Composant                    | Variantes                                                                                                                              | Écrans           |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| [COMP:quadrant-button]       | Q1 (rouge), Q2 (jaune), Q3 (bleu), Q4 (gris). Outline compact (SCR-02/04), pressed. Couleur portée par le fond/bordure, pas par emoji. | SCR-02, SCR-04   |
| [COMP:quadrant-result]       | Format large : couleur + label proéminent                                                                                              | SCR-04, SCR-05   |
| [COMP:backlog-section]       | Expanded/collapsed (accordion), couleur + label + compteur, zone de drop (surbrillance)                                                | SCR-06           |
| [COMP:matrix-quadrant]       | Desktop grille 2×2 : peuplé, vide (grisé), highlight                                                                                   | SCR-10 (desktop) |
| [COMP:matrix-prominent-zone] | Zone proéminente mobile : couleur + label complet + compteur + liste tâches                                                            | SCR-10 (mobile)  |
| [COMP:matrix-nav-card]       | Mini-card navigation : couleur + label complet + compteur, état actif/inactif, tap → swap. Positions fixes en grille 2×2.              | SCR-10 (mobile)  |

### Composants de questionnaire

| Composant            | Variantes                                                                                 | Écrans         |
| -------------------- | ----------------------------------------------------------------------------------------- | -------------- |
| [COMP:question-card] | Question d'aiguillage (4 réponses), question de flux (2-4 réponses), avec/sans sous-texte | SCR-03, SCR-08 |
| [COMP:answer-option] | Default, pressed, pré-sélectionnée (retour), avec/sans sous-texte                         | SCR-03, SCR-08 |
| [COMP:progress-dots] | 2-5 dots, actif/inactif                                                                   | SCR-03         |
| [COMP:back-link]     | ← Retour, texte discret                                                                   | SCR-03, SCR-08 |

### Composants spécifiques

| Composant                | Variantes                                                                                                                                                                                   | Écrans                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| [COMP:subtitle-counter]  | Sous-titre pédagogique + compteur dynamique. Variantes : "[N] à trier" (Vrac), "[N]/40" avec alerte douce 35+ / plein 40 rouge (Réserve), "[N] en cours" (Focus), "[N] terminées" (Archive) | SCR-01, SCR-06, SCR-10, SCR-11 |
| [COMP:nudge-banner]      | Banner dismissable, ton bienveillant, CTA purge                                                                                                                                             | SCR-06                         |
| [COMP:sort-toggle]       | "Par date" / "Manuel"                                                                                                                                                                       | SCR-06                         |
| [COMP:cta-assisted]      | "Aide-moi à décider", filled large, pulse (onboarding)                                                                                                                                      | SCR-02                         |
| [COMP:cta-confirm]       | "Ça me parle", filled large                                                                                                                                                                 | SCR-04                         |
| [COMP:cta-next]          | "Tâche suivante →", filled                                                                                                                                                                  | SCR-05                         |
| [COMP:link-backlog]      | "Voir la Réserve", secondaire                                                                                                                                                               | SCR-05                         |
| [COMP:recap-list]        | Bilan purge : N revues, X supprimées, Y reclassées, Z gardées                                                                                                                               | SCR-09                         |
| [COMP:pedagogic-toast]   | Toast d'apprentissage (drag inter-quadrant Focus)                                                                                                                                           | SCR-10                         |
| [COMP:drop-zone-backlog] | Zone cible drag Focus → Réserve, inactive/illuminée                                                                                                                                         | SCR-10                         |
| [COMP:survey-slider]     | Slider 1-10, émojis extrêmes (😫 → 😌)                                                                                                                                                      | SCR-12                         |
| [COMP:micro-text-banner] | "Réponds à l'instinct", apparition unique                                                                                                                                                   | SCR-03                         |

---

## Décisions UX documentées pendant cette phase

| Décision                                              | Fichier                                                             |
| ----------------------------------------------------- | ------------------------------------------------------------------- |
| Édition du titre par long press / double-clic         | `knowledge/Décisions UX — Édition du titre d'une tâche.md`          |
| Overlay de tri full-cover avec handle, nav masquée    | `knowledge/Décisions UX — Overlay de tri couvrant la navigation.md` |
| Focus mobile en segmented control, grille 2×2 desktop | `knowledge/Décisions UX — Matrice mobile segmented control.md`      |
| Réserve accordion strict, drag sur headers collapsed  | `knowledge/Décisions UX — Backlog accordion et drag and drop.md`    |

---

_Template BMAD-UX v1.2 — basé sur les principes de hiérarchie visuelle (Nogier), séparation structure/style (Kholmatova), lois de Gestalt_
