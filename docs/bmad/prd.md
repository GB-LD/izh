---
stepsCompleted: [1, 2, 2b, 2c, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-izh-planning-2026-03-16.md"
  - "IZH UX /01-brief-projet.md"
  - "IZH UX /02-personas-cas-usage.md"
  - "IZH UX /03-architecture-information-flows.md"
  - "IZH UX /04a-wireframe-architecture.md"
  - "IZH UX /04b-export-figma-make.md"
  - "IZH UX /04b-wireframe-semantic.md"
  - "IZH UX /05-design-tokens-systeme-visuel.md"
  - "IZH UX /06-specifications-composants.md"
  - "IZH UX /09-references-visuelles-directions.md"
workflowType: 'prd'
documentCounts:
  briefs: 2
  research: 0
  projectDocs: 8
---

# Product Requirements Document - izh planning

**Author:** Dolu
**Date:** 2026-03-16

## Executive Summary

izh est une web app de gestion de tâches qui résout la paralysie décisionnelle — le moment où l'utilisateur a 30+ tâches en tête et ne sait pas par laquelle commencer. Là où les outils existants (Todoist, Notion, TickTick) présupposent que l'utilisateur sait ce qui est prioritaire, izh le guide activement via un questionnaire cognitif basé sur la matrice Eisenhower, ciblant 4 biais décisionnels : urgence perçue, absence de référentiel, anxiété fabriquée, et tâches importantes enterrées.

Le workflow suit 3 temps : **décharge** (brain dump sans friction, <10s par tâche), **tri guidé** (questionnaire cognitif, <60s par tâche, aboutit toujours à un quadrant), **action** (matrice limitée à 4 tâches par quadrant). L'app protège l'utilisateur de sa tendance à tout rendre visible et urgent.

Utilisateur north star : Camille, freelance-parent, 34 ans, 3-4 clients actifs, un enfant de 5 ans. Son moment critique : mardi soir 21h30, 45 minutes devant elle, 36 tâches en tête. Si le dump + tri prend 15 minutes, elle revient. Si ça demande du setup, elle ferme et ne revient pas.

MVP : React + TypeScript, responsive mobile-first, localStorage. En production dans 1 mois (mi-avril 2026). Le projet sert également de portfolio technique front-end.

## What Makes This Special

**Classification guidée par questionnaire cognitif** — Unique sur le marché. Le questionnaire utilise des questions émotionnelles (Système 1) avant les questions analytiques (Système 2), car en surcharge cognitive, l'utilisateur reconnaît son état plutôt qu'il ne l'analyse.

**Inversion du modèle** — Les outils de productivité demandent un effort d'organisation avant d'aider. izh inverse : friction zéro à l'entrée, l'app fait le travail cognitif ensuite.

**Protection cognitive intentionnelle** — Limites architecturales (40 tâches backlog, 4 par quadrant en matrice). L'app dit non à toute feature qui augmente le nombre d'éléments visibles simultanément.

**Tonalité bienveillante** — Un ami organisé, pas un coach. L'app ne juge jamais, ne fabrique pas d'urgence, et normalise le mélange pro/perso sans catégorisation.

## Project Classification

| Attribut | Valeur |
|---|---|
| Type de projet | Web app (SPA, responsive mobile-first) |
| Domaine | Productivité personnelle / gestion de tâches |
| Complexité domaine | Faible (pas de régulation, pas de compliance MVP) |
| Contexte projet | Greenfield — nouveau produit |
| Stack | React + TypeScript, localStorage (MVP), Supabase (phase 2) |
| Déploiement | Continu, URL publique |

## Success Criteria

### User Success

| Critère | Cible MVP | Mesure |
|---|---|---|
| Tâches déchargées par session de brain dump | 5+ | Compteur localStorage par session |
| Inbox triée en <48h | >80% des tâches | `created_at` vs `classified_at` |
| Tâches complétées/semaine depuis la matrice | 3+ | `completed_at` + source matrice |
| Temps de tri par tâche (flow assisté) | <60 secondes | Timer automatique entrée flow → classement |
| Score de légèreté mentale ressentie | >7/10 | Micro-survey in-app (post-1er tri complet, puis 1x/semaine max) |
| Rétention hebdomadaire W1→W4 | 40%+ | Sessions par semaine (localStorage) |

**Moment "aha!" :** Camille termine son premier tri assisté. La matrice se remplit. Elle voit clairement quoi faire demain matin. Émotion : clarté, soulagement — "je sais où j'en suis".

**Indicateur du différenciateur :** Le tri assisté est utilisé plus que le tri manuel lors des 2 premières semaines. Si les utilisateurs ne font que du tri manuel → le différenciateur ne fonctionne pas.

### Business Success

**À 3 mois (MVP en production — mi-avril 2026) :**
- Web app déployée en continu, URL publique accessible
- Workflow complet fonctionnel (brain dump → tri → backlog → matrice)
- Métriques localStorage validant l'hypothèse Lean UX
- Premiers retours qualitatifs (entourage proche)
- Repository GitHub comme pièce portfolio (React + TypeScript + clean architecture)

**À 12 mois :**
- Migration Supabase terminée (auth + persistance serveur)
- Timeblocking + synchronisation Google Agenda / Apple Calendar
- 10 utilisateurs actifs en production
- Données suffisantes pour valider ou invalider la rétention 40%+

**Go/No-go vers phase 2 :** Basé sur le ressenti fondateur + retours qualitatifs. Question clé : "Est-ce que les gens qui l'utilisent trouvent ça utile et reviennent ?"

### Technical Success

| Critère | Cible |
|---|---|
| Stack | React + TypeScript, responsive mobile-first |
| Persistance MVP | localStorage — zéro backend |
| Performance perçue | Capture <10s, tri <60s, navigation instantanée |
| Qualité code | Clean architecture, tests, CI/CD |
| Déploiement | Continu, chaque avancée visible en production |
| Accessibilité | WCAG AA sur texte fonctionnel, zones tactiles 44x44px min |

### Measurable Outcomes

**Signaux positifs (green lights) :**
- Les testeurs utilisent le tri assisté plutôt que le tri manuel
- Les testeurs reviennent la semaine suivante sans qu'on leur demande
- Retours qualitatifs convergent vers "ça m'aide à y voir clair"

**Signaux d'alerte (red flags) :**
- Abandon du questionnaire en cours de route
- Usage exclusif du tri manuel → le différenciateur échoue
- Feedback type "c'est encore un truc à gérer" → piège Todoist/Notion reproduit
- Taux de correction (user_override) >30% sur un flux → revoir le wording

## User Journeys

### Journey 1 — Camille découvre izh (north star, premier usage)

**Scène d'ouverture :** Mardi soir, 21h34. Mila dort enfin. Camille s'effondre sur le canapé avec son MacBook. 36 tâches tournent dans sa tête — la 3e relance Maison Dubois, les maquettes Leroy pour jeudi, le déguisement de Mila pour vendredi, le formulaire cassé de son site depuis 2 mois. Elle a essayé Todoist (abandonné), Notion (trop de setup), des listes papier (perdues). Un ami lui a dit "essaie izh, tu dump tout et ça t'aide à trier". Curiosité sceptique.

**Action montante :** Elle ouvre izh. Pas de slides, pas de tutoriel. Un champ de saisie avec "Qu'est-ce qui te trotte dans la tête ?". Elle tape "Relancer Maison Dubois 3e fois". Valide. Le champ se vide. Elle enchaîne. "Maquettes Leroy pour jeudi". "Déguisement Mila vendredi". "Formulaire site cassé". 15 tâches en 3 minutes. Premier sentiment : "ça sort de ma tête".

Le bouton tri pulse légèrement. Elle tape dessus. L'overlay monte : "Aide-moi à décider" en gros, 4 quadrants discrets en dessous. Elle clique sur "Aide-moi à décider". Première question : "Comment tu vis cette tâche en ce moment ?" — elle choisit "Je sais pas ce qui se passe si je le fais pas". Le questionnaire lui pose une question de projection. Elle réalise que ne pas relancer Maison Dubois = 1 200€ perdus. La tâche atterrit en Q1 "Faire maintenant". <40 secondes.

**Climax :** Après 8 tâches triées, Camille ouvre la Réserve. Ses tâches sont classées par quadrant avec des couleurs. Elle active 3 tâches dans le Focus. La matrice apparaît : Q1 "Faire maintenant" avec "Relancer Maison Dubois" en premier. Elle sait quoi faire demain matin à 8h.

**Résolution :** 21h52. 18 minutes. Elle ferme l'app avec une clarté qu'elle n'a pas ressentie depuis des semaines. Le mardi suivant, 21h30, elle rouvre izh sans qu'on lui demande. "Incroyable, je sais où je vais."

---

### Journey 2 — Lucas en semaine de partiels (capture mobile rapide + tri sous stress)

**Scène d'ouverture :** Mercredi soir, semaine de partiels. Lucas est à son bureau, 15 onglets ouverts, Netflix en fond. 5 deadlines cette semaine. Il a acheté des Red Bull au lieu de structurer ses révisions. Il ne sait pas par quoi commencer. Son réflexe : ouvrir FIFA "juste une game".

**Action montante :** Il se souvient d'izh. Sur son iPhone, il ouvre l'app. Il dump en 2 minutes : "Exam macro lundi", "Rendu TD stats vendredi", "Stage été — relancer les 3 boîtes", "Appeler maman", "Rembourser Léa 15€". Il lance le tri. "Comment tu vis cette tâche en ce moment ?" — pour "Exam macro lundi" il choisit "Je me sens obligé de la faire". Le questionnaire challenge : l'exam est lundi, pas vendredi. C'est vraiment urgent. Q1.

Pour "Stage été" il hésite. Le questionnaire lui fait réaliser que s'il ne relance pas maintenant, les places seront prises. Q2 "Planifier" — important mais pas pour ce soir.

**Climax :** La matrice montre : Q1 = "Exam macro lundi" + "Rendu TD stats vendredi". Pas 5 trucs, pas la montagne. Juste 2. Il sait par quoi commencer. Il ferme FIFA, ouvre ses notes de macro.

**Résolution :** Le lendemain en cours, le prof mentionne un exercice à rendre. Lucas sort son téléphone, tape "Exo macro chapitre 7 vendredi", range son téléphone. 8 secondes. La tâche est dans l'inbox, pas dans sa tête.

---

### Journey 3 — David, le tri expert en 10 minutes (tri manuel + purge)

**Scène d'ouverture :** Vendredi 17h. David a passé la semaine à répondre aux demandes du CEO, de son équipe, de 3 clients. Pour lui-même : rien. Son propre backlog mental est un chaos compensé par des heures sup le dimanche soir. Il a 10 minutes avant de partir.

**Action montante :** Il ouvre izh sur son MacBook. Dump rapide : "Rapport concurrent CEO", "Feedback Sarah en retard", "Temps famille weekend", "Conflit Marc/Sophie à régler", "Formation React à planifier". 5 tâches, 1 minute.

David connaît la matrice. Il utilise le tri manuel : "Rapport concurrent CEO" — le CEO a dit "URGENT" mais la deadline est dans 3 semaines. Q2 "Planifier". "Feedback Sarah" — promis depuis mardi, ça pèse. Q1 "Faire maintenant". "Temps famille weekend" — il hésite, puis réalise que c'est Q2. Important.

**Climax :** Sa matrice Focus montre "Feedback Sarah" en Q1. Pas le rapport CEO. Pour la première fois de la semaine, David distingue le bruyant de l'important. Le rapport CEO peut attendre. Sarah non.

**Résolution :** Trois semaines plus tard. Son backlog atteint 37 tâches. Le nudge apparaît : "37/40 — un petit tri ?". Il lance la purge. Le questionnaire lui présente les tâches les plus anciennes : "Formation React — là depuis 3 semaines. Elle compte toujours ?" Il supprime 8 tâches obsolètes. Backlog à 29. Sensation de légèreté.

---

### Journey 4 — Camille, edge case : backlog plein et questionnaire abandonné

**Scène d'ouverture :** Semaine 3 d'usage. Camille a accumulé 40 tâches dans la Réserve sans en compléter assez. Elle essaie de trier une nouvelle tâche depuis le Vrac.

**Action montante :** Le tri aboutit mais l'écran de résultat affiche : "Ta Réserve est pleine — 40/40. Fais de la place pour continuer." Deux options : "Purger" ou "Revenir au Vrac". Pas de panique, pas de ton punitif.

Elle lance la purge. À la 4e tâche, elle fatigue et tape "Arrêter la purge". Les 4 changements sont sauvegardés. Backlog à 36. Elle peut continuer à trier.

Un autre soir, elle lance le tri assisté mais ferme l'overlay au milieu du questionnaire (tap ✕). Aucune donnée partielle n'est enregistrée. La tâche reste dans le Vrac, intacte. Elle peut la trier plus tard.

**Résolution :** L'app ne punit jamais l'abandon. Pas de "tu as quitté en cours de route". Quand Camille revient, tout est exactement comme elle l'a laissé.

---

### Journey Requirements Summary

| Capability | Journeys source | Priorité |
|---|---|---|
| Brain dump continu sans friction (champ texte, flux continu) | J1, J2, J3 | Critique |
| Tri assisté par questionnaire cognitif (4 flux, <60s) | J1, J2 | Critique |
| Tri manuel direct (sélection quadrant) | J3 | Critique |
| Matrice Focus (max 4/quadrant, lecture seule) | J1, J2, J3 | Critique |
| Backlog Réserve (accordion, drag & drop, limite 40) | J1, J3, J4 | Critique |
| Purge assistée + manuelle (nudge 35+, blocage 40) | J3, J4 | Haute |
| Capture depuis le Vrac uniquement | J1, J2, J3 | Critique |
| Onboarding par l'usage (surbrillances, animations) | J1 | Haute |
| Abandon sans perte (overlay, questionnaire, purge) | J4 | Haute |
| Undo complétion/suppression (toast 5s) | J1, J3 | Moyenne |
| Feedback pédagogique (toast drag inter-quadrant) | J3 | Moyenne |
| Analytics localStorage (timestamps, timer) | Tous | Haute |
| Micro-survey légèreté mentale | J1 | Moyenne |

## Product Scope & Phased Development

### MVP Strategy

**Approche :** Problem-solving MVP — prouver que le workflow guidé "décharge → tri cognitif → action" débloque la paralysie décisionnelle.

**Ressources :** Solo developer (Dolu), React + TypeScript. Specs UX complètes déjà produites (wireframes, design tokens, composants) — l'implémentation peut commencer immédiatement.

**Timeline :** En production mi-avril 2026 (1 mois). Déploiement continu.

### MVP Feature Set (Phase 1)

**Core User Journeys supportés :** J1, J2, J3, J4 — 100% couverts.

**Workflow complet (critique) :**
1. Brain dump — champ texte inline dans le Vrac, flux continu
2. Inbox (Vrac) — liste sans limite, édition inline
3. Tri assisté — 4 flux cognitifs (projection, ancrage, audit stress, test du regret), 2-4 questions, <60s
4. Tri manuel — classement direct dans un quadrant
5. Backlog (Réserve) — 4 quadrants avec labels izh, limite 40 tâches, drag & drop inter-quadrant, accordion strict
6. Matrice active (Focus) — max 4/quadrant, sélection depuis backlog, lecture seule (compléter ou remettre), feedback pédagogique si drag inter-quadrant
7. Complétion et archivage — feedback subtil, undo 5s
8. Purge du backlog — questionnaire assisté + purge manuelle, nudge doux à 35+
9. Onboarding par l'usage — surbrillances et animations, pas de slides
10. Analytics localStorage — timestamps, timer de tri, micro-survey légèreté mentale

**Modèle de tâche :** Titre uniquement (côté utilisateur) + métadonnées automatiques invisibles (`created_at`, `classified_at`, `completed_at`, `quadrant`, `flow_duration_ms`, `source_flux`, `classification_method`).

**Must-Have Capabilities :**

| Capability | Pourquoi must-have | Sans ça... |
|---|---|---|
| Brain dump (champ texte, flux continu) | Point d'entrée du produit | Pas de produit |
| Inbox (Vrac) illimitée | Stockage des tâches non triées | Pas de brain dump |
| Tri assisté (4 flux cognitifs) | **Différenciateur** — raison d'être d'izh | Todoist clone |
| Tri manuel (sélection directe) | Raccourci pour utilisateurs experts | David abandonne |
| Backlog (Réserve) avec quadrants | Organisation post-tri | Pas de pipeline |
| Matrice (Focus) limitée à 4/quadrant | Passage à l'action | Pas de clarté |
| Complétion + archivage + undo | Boucle fermée | Tâches fantômes |
| Purge assistée (nudge 35+, blocage 40) | Santé du backlog | Backlog pourri |
| Onboarding par l'usage | Première impression | "Encore un truc à configurer" |
| Analytics localStorage | Validation hypothèse Lean UX | Pas de données |
| Édition inline des titres | Correction sans friction | Frustration |
| Drag & drop (backlog inter-quadrant) | Reclassification fluide | UX rigide |

**Nice-to-have intégrés au MVP (si le temps le permet) :**
- Micro-survey légèreté mentale (utile mais pas bloquant)
- Drag intra-quadrant pour réordonnancement manuel

### Phase 2 — Infrastructure & Timeblocking

| Feature | Dépendance | Valeur ajoutée |
|---|---|---|
| Migration Supabase (auth + persistance) | MVP validé | Multi-device, pas de perte de données |
| Timeblocking | Supabase | Passer de "quoi faire" à "quand le faire" |
| Sync Google Agenda + Apple Calendar | Timeblocking | Intégration dans le workflow réel |

### Phase 3 — Expansion

| Feature | Dépendance | Valeur ajoutée |
|---|---|---|
| Email digest hebdomadaire | Supabase (email) | Rétention passive |
| Installation PWA | Indépendant | Accès rapide mobile |
| Définition guidée des 3 priorités | Indépendant | Enrichit le Flux 2 |
| Freemium (si audience) | Supabase + userbase | Monétisation |

**Hors scope permanent :** fonctionnalités sociales, gamification/streaks, gestion de projets (sous-tâches, dépendances), timer/Pomodoro, notifications push natives.

### Risk Mitigation Strategy

**Risques techniques :**

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Drag & drop complexe sur mobile | Moyenne | Élevé | Utiliser une lib React éprouvée (dnd-kit), tester tôt sur iOS Safari |
| Performance localStorage avec 40+ tâches | Faible | Moyen | Structure de données simple (titre + metadata), pas de recherche complexe |
| Bottom sheet custom cross-browser | Moyenne | Moyen | Composant overlay unifié, tester Chrome + Safari dès le début |

**Risques marché :**

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Le questionnaire est le différenciateur mais personne ne l'utilise | Moyenne | Critique | Nudge architectural (bouton assisté > quadrants), tracking `classification_method`, itérer sur le wording |
| L'app est perçue comme "un Notion de plus" | Faible | Élevé | Moments signature visuels (animation tri, feedback classement), onboarding sans setup |
| Le wording ne fonctionne pas pour tous les profils | Moyenne | Élevé | Wording émotionnel (Système 1), taux de correction (`user_override`) <30%, itération post-MVP |

**Risques ressources :**

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Solo dev, timeline 1 mois trop court | Moyenne | Moyen | Specs UX complètes = pas de temps perdu en design. Prioriser le workflow core, reporter micro-survey si nécessaire |
| Perte de motivation | Faible | Élevé | Déploiement continu = résultats visibles, double valeur produit + portfolio |

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Classification guidée par questionnaire cognitif (innovation principale)**
Aucun outil de productivité ne questionne activement les biais décisionnels de l'utilisateur pour l'aider à classifier. Le benchmark de 10 concurrents confirme ce gap : tous supposent que l'utilisateur sait ce qui est prioritaire. izh est le premier à proposer une classification guidée par reconnaissance de patterns émotionnels (Système 1), pas par analyse rationnelle (Système 2).

**2. Design anti-surcharge intentionnel**
Là où les concurrents maximisent les features visibles (TickTick : 50+ features, Amazing Marvin : customisation infinie), izh impose des limites architecturales comme différenciateur : 40 tâches backlog, 4 par quadrant, pas de catégorisation à l'entrée. La contrainte EST la feature.

**3. Inversion du workflow de productivité**
Le pattern dominant est "organise → capture → agis". izh inverse : "capture (friction zéro) → l'app organise pour toi → agis". L'effort cognitif est transféré de l'utilisateur vers le questionnaire.

### Market Context & Competitive Landscape

Le gap est validé par le benchmark : Eisenhower.me a la matrice mais zéro guidage. Amazing Marvin a un "Procrastination Wizard" mais ne cible pas la classification. Sunsama a le meilleur design mais suppose que l'utilisateur sait ce qui est important. Aucun ne combine matrice Eisenhower + guidage cognitif actif + limites intentionnelles.

Les fondements scientifiques (Mere Urgency Effect — Zhu et al. 2018, effet Zeigarnik, hyperbolic discounting) donnent une base solide à l'approche.

### Validation Approach

| Hypothèse | Méthode | Signal de succès |
|---|---|---|
| Le tri assisté est préféré au tri manuel | Analytics localStorage (`classification_method`) | Assisté majoritaire les 2 premières semaines |
| Le questionnaire ne crée pas de friction | Timer `flow_duration_ms` | <60s par tâche |
| Le wording fonctionne pour les 3 profils | Taux de correction (`user_override`) | <30% par flux |
| Les limites sont perçues comme une aide | Micro-survey + retours qualitatifs | Score légèreté >7/10 |
| L'app ne devient pas "un truc de plus à gérer" | Rétention W1→W4 | 40%+ |

## Web App Technical Requirements

### Architecture

izh est une SPA (Single Page Application) responsive mobile-first. Pas de MPA, pas de SSR — le contenu n'a pas besoin d'être indexé (app personnelle, pas de contenu public). localStorage uniquement en MVP, pas de temps réel (pas de backend, pas de collaboration).

### Responsive Design

| Breakpoint | Surface | Layout |
|---|---|---|
| < 768px | Mobile (prioritaire) | Pleine largeur, bottom nav, layout asymétrique Focus |
| 768-1279px | Tablette | Pleine largeur, grille 2×2 Focus |
| ≥ 1280px | Desktop | Contenu centré max-width 600px, sidebar nav gauche |

### Design System

Design system complet défini : Space Grotesk (titres) + Inter (corps), palette Notion-like (#37352F, #F7F7F5), Lucide Icons, spacing base 4px, radius 8px défaut. Cf. `IZH UX /05-design-tokens-systeme-visuel.md` pour les tokens complets.

### Implementation Stack

- **Framework :** React + TypeScript — projet portfolio, qualité code prioritaire
- **Styling :** Design tokens CSS custom properties (OKLCH), responsive via breakpoints
- **State management :** localStorage avec timestamps automatiques par tâche
- **Drag & drop :** Nécessaire pour backlog (inter-quadrant + intra-quadrant) et Focus (vers Réserve)
- **Overlays :** Bottom sheet ~75% unifié (tri, purge), ~30% (micro-survey)
- **Animations :** Ease-spring pour drag & drop, ease-out pour modales, 120ms hover, 200ms expand, 300ms modal
- **Offline :** 100% offline par défaut (localStorage), pas de service worker en MVP
- **Déploiement :** Continu (Vercel ou équivalent), chaque push visible en production
- **SEO :** Non applicable — meta tags basiques uniquement (titre, description, OG tags)

## Functional Requirements

### Capture de tâches

- FR1: L'utilisateur peut saisir une tâche en entrant un titre dans un champ texte
- FR2: L'utilisateur peut enchaîner la saisie de plusieurs tâches en flux continu sans quitter l'écran
- FR3: L'utilisateur peut capturer une tâche uniquement depuis l'écran Vrac (inbox)
- FR4: L'utilisateur peut modifier le titre d'une tâche existante

### Gestion de l'inbox (Vrac)

- FR5: L'utilisateur peut voir la liste de toutes ses tâches non triées
- FR6: L'utilisateur peut voir le nombre de tâches à trier
- FR7: L'utilisateur peut lancer le tri d'une tâche depuis l'inbox
- FR8: L'utilisateur peut stocker un nombre illimité de tâches dans l'inbox

### Tri assisté (questionnaire cognitif)

- FR9: L'utilisateur peut classifier une tâche via un questionnaire guidé qui aboutit à un quadrant Eisenhower
- FR10: Le système propose une question d'aiguillage initiale orientant vers l'un des 4 flux cognitifs
- FR11: Le système pose 2-4 questions par flux et aboutit toujours à un quadrant — pas de cul-de-sac
- FR12: L'utilisateur peut revenir à la question précédente pendant le questionnaire
- FR13: L'utilisateur peut voir le quadrant proposé par le questionnaire et le valider ou le corriger
- FR14: L'utilisateur peut abandonner le questionnaire à tout moment sans perte de données

### Tri manuel

- FR15: L'utilisateur peut classifier une tâche en choisissant directement un quadrant sans passer par le questionnaire
- FR16: L'utilisateur peut choisir entre tri assisté et tri manuel pour chaque tâche

### Backlog (Réserve)

- FR17: L'utilisateur peut voir ses tâches classées organisées par quadrant
- FR18: L'utilisateur peut voir le nombre total de tâches dans le backlog et la capacité restante
- FR19: L'utilisateur peut reclasser une tâche d'un quadrant à un autre dans le backlog
- FR20: L'utilisateur peut réordonner les tâches au sein d'un quadrant
- FR21: L'utilisateur peut activer une tâche du backlog vers la matrice
- FR22: Le système empêche l'ajout de tâches au backlog au-delà de la limite de 40
- FR23: L'utilisateur peut supprimer une tâche du backlog
- FR24: L'utilisateur peut choisir l'ordre de tri d'un quadrant (date ou manuel)

### Matrice active (Focus)

- FR25: L'utilisateur peut voir ses tâches activées organisées par quadrant avec un maximum de 4 par quadrant
- FR26: L'utilisateur peut marquer une tâche comme complétée depuis la matrice
- FR27: L'utilisateur peut remettre une tâche de la matrice dans le backlog (même quadrant)
- FR28: Le système empêche le reclassement entre quadrants dans la matrice et affiche un feedback pédagogique
- FR29: L'utilisateur peut annuler une complétion pendant un délai court après l'action
- FR30: Le système empêche l'activation d'une tâche si le quadrant cible dans la matrice est plein (4/4)

### Purge du backlog

- FR31: L'utilisateur peut lancer une purge assistée qui présente les tâches les plus anciennes
- FR32: Le système propose un questionnaire de purge (existence puis reclassement) pour chaque tâche
- FR33: L'utilisateur peut supprimer ou reclasser une tâche pendant la purge
- FR34: L'utilisateur peut arrêter la purge à tout moment avec persistance des changements effectués
- FR35: Le système affiche un bilan récapitulatif après la purge
- FR36: Le système suggère une purge à l'approche de la limite de capacité du backlog
- FR37: L'utilisateur peut lancer une purge manuelle à tout moment

### Archivage

- FR38: L'utilisateur peut voir la liste de ses tâches complétées en ordre antichronologique
- FR39: L'utilisateur peut voir le quadrant d'origine de chaque tâche archivée
- FR40: L'utilisateur peut voir le nombre total de tâches complétées

### Onboarding

- FR41: Le système guide l'utilisateur à travers la première boucle complète (capture → tri → backlog → matrice) sans tutoriel explicite
- FR42: Le système met en surbrillance les éléments interactifs lors du premier usage

### Analytics et feedback

- FR43: Le système enregistre automatiquement les timestamps de création, classification et complétion de chaque tâche
- FR44: Le système mesure la durée du flow de tri pour chaque tâche
- FR45: Le système enregistre la méthode de classification utilisée (assisté vs manuel) et le flux source
- FR46: L'utilisateur peut donner un score de légèreté mentale via un micro-survey non bloquant
- FR47: Le système enregistre le taux de correction (override) des propositions du questionnaire

### Navigation et persistance

- FR48: L'utilisateur peut naviguer entre les 4 écrans principaux (Vrac, Réserve, Focus, Archive)
- FR49: Le système persiste toutes les données localement entre les sessions
- FR50: L'utilisateur peut utiliser l'application sur mobile, tablette et desktop avec une expérience adaptée

## Non-Functional Requirements

### Performance

| NFR | Cible | Justification |
|---|---|---|
| NFR1: First Contentful Paint | <1.5s sur mobile 4G | Camille a 45 min — l'app doit être prête immédiatement |
| NFR2: Time to Interactive | <2s | Le champ de saisie doit être utilisable sans attente |
| NFR3: Bundle size (gzipped) | <200KB | Chargement rapide sur connexions mobiles |
| NFR4: Animations | 60fps constant | Drag & drop et transitions fluides, pas de jank |
| NFR5: Opérations localStorage | <50ms | Lecture/écriture instantanée perçue |
| NFR6: Transition entre écrans | <100ms | Navigation instantanée (SPA, pas de rechargement) |

### Accessibilité

| NFR | Cible | Justification |
|---|---|---|
| NFR7: Standard WCAG | 2.1 niveau AA | Texte fonctionnel — contraste, navigation clavier, focus visible |
| NFR8: Contraste texte primaire | ≥4.5:1 (AA) | text-primary sur surface-base : ~14.5:1 atteint |
| NFR9: Zones tactiles | ≥44×44px | Toutes les zones interactives, Camille fatiguée une main |
| NFR10: Focus ring | Toujours visible, jamais supprimé | Navigation clavier obligatoire |
| NFR11: Couleur seule | Jamais seul vecteur d'information | Quadrants doublés par label textuel |
| NFR12: `prefers-reduced-motion` | Respecté | Désactivation des animations pour utilisateurs sensibles |
| NFR13: Taille texte minimum | ≥11px | Captions, metadata lisibles |

### Compatibilité

| NFR | Cible | Justification |
|---|---|---|
| NFR14: Chrome (mobile + desktop) | Support complet | >65% du marché |
| NFR15: Safari (mobile + desktop) | Support complet | iPhone Camille et Lucas |
| NFR16: Firefox, Edge | Support standard | Couverture raisonnable |
| NFR17: Viewport minimum | 320px largeur | iPhone SE |
| NFR18: Responsive breakpoints | Mobile (<768px), Tablette (768-1279px), Desktop (≥1280px) | Mobile-first, 3 breakpoints |

### Fiabilité

| NFR | Cible | Justification |
|---|---|---|
| NFR19: Persistance données | Zéro perte de données entre sessions | localStorage — les tâches de Camille doivent survivre à la fermeture du navigateur |
| NFR20: Tolérance à l'abandon | Aucune donnée partielle en cas de fermeture mid-flow | Questionnaire, purge — abandon = état intact |
| NFR21: Undo | Fenêtre de 5 secondes pour annuler complétion/suppression | Protection contre les erreurs de tap |
