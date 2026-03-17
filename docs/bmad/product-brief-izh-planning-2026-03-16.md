---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - "IZH UX /01-brief-projet.md"
  - "IZH UX /02-personas-cas-usage.md"
  - "IZH UX /09-references-visuelles-directions.md"
date: 2026-03-16
author: Dolu
---

# Product Brief: izh planning

## Executive Summary

**izh** est une web app de gestion de tâches qui résout un problème que les outils existants ignorent : aider l'utilisateur à **savoir par où commencer** quand tout semble urgent. Là où Todoist, Notion ou TickTick présupposent que l'utilisateur sait déjà ce qui est prioritaire, izh le guide activement via un questionnaire cognitif basé sur la matrice Eisenhower et ciblant les biais décisionnels (urgence perçue, anxiété, procrastination).

> *"izh t'aide à savoir par où commencer quand tout semble urgent. Tu vides ta tête, l'app t'aide à trier, tu agis."*

Le MVP est une web app responsive mobile-first (React + TypeScript, localStorage) conçue pour les personnes qui jonglent entre tâches professionnelles et personnelles — freelances, étudiants, managers. Le projet sert également de portfolio technique démontrant des compétences front-end React/TypeScript en conditions réelles de production.

**Vision long terme :** izh évoluera vers une plateforme complète avec timeblocking et synchronisation calendrier (Google Agenda, Apple Calendar), migration backend Supabase, et ajout progressif de fonctionnalités post-MVP.

---

## Core Vision

### Problem Statement

Les personnes qui jonglent entre tâches professionnelles et personnelles accumulent des boucles ouvertes non triées. Le volume crée une paralysie décisionnelle : elles ne savent pas par où commencer, ce qui amplifie la procrastination et la charge mentale. Ce phénomène est documenté scientifiquement (Mere Urgency Effect, effet Zeigarnik, hyperbolic discounting) et touche particulièrement les profils multi-rôles — freelances-parents, étudiants en charge, managers sollicités.

Le problème n'est pas de **noter** les tâches. C'est de **savoir laquelle faire maintenant**.

### Problem Impact

- **Financier :** Tâches critiques repoussées (relances impayées, prospects perdus) par incapacité à les distinguer du bruit
- **Émotionnel :** Culpabilité permanente, charge mentale qui déborde sur la vie personnelle et familiale
- **Comportemental :** Compensation par la force brute (heures sup, Red Bull) plutôt que par la priorisation
- **Cycle vicieux :** Les outils de productivité adoptés deviennent eux-mêmes des tâches à gérer (Todoist abandonné en 2 semaines, Notion = trop de setup), renforçant le sentiment d'échec

### Why Existing Solutions Fall Short

Benchmark de 10 concurrents directs — aucun ne résout le problème de classification :

| Concurrent | Lacune principale |
|---|---|
| **Todoist** | Ergonomie mature mais Eisenhower en hack, zéro aide à la décision |
| **Eisenhower.me** | Matrice native mais zéro guidage, l'utilisateur doit décider seul |
| **TickTick** | Classification automatique ≠ guidée, ne questionne pas les biais |
| **Amazing Marvin** | Procrastination Wizard unique mais customisation = paralysie |
| **Sunsama** | Design premium mais 20$/mois et suppose qu'on sait ce qui est important |
| **Tiimo** | IA qui planifie mais ne questionne pas les priorités |

**Gap identifié :** Tous ces outils supposent que l'utilisateur sait déjà ce qui est prioritaire. Aucun ne l'aide à **décider**.

### Proposed Solution

izh propose un workflow en 3 temps :

1. **Décharge (Brain dump)** — Vider sa tête sans friction. Un champ texte, rien d'autre. Zéro catégorisation à l'entrée.
2. **Tri guidé (Questionnaire cognitif)** — 4 flux ciblant chacun un biais décisionnel spécifique (urgence perçue, absence de référentiel, anxiété fabriquée, tâches importantes enterrées). 2-4 questions, <60 secondes par tâche. Aboutit toujours à un quadrant — pas de cul-de-sac.
3. **Action (Matrice limitée)** — Max 4 tâches par quadrant visibles. L'app protège l'utilisateur de sa tendance à tout rendre visible et urgent.

**Principes non-négociables :**
- "Décharge d'abord, trie après"
- "La décision, pas la perfection"
- "Moins tu vois, mieux tu agis"
- "L'app pense pour toi quand tu ne peux plus"

### Key Differentiators

1. **Classification guidée par questionnaire cognitif** — Unique sur le marché. Aucun concurrent ne questionne activement les biais décisionnels de l'utilisateur pour l'aider à classifier.
2. **Friction zéro à l'entrée** — Capture en <10 secondes, tri en <60 secondes. L'app ne demande jamais de configurer quoi que ce soit avant d'être utile.
3. **Protection cognitive** — Limites intentionnelles (40 tâches backlog, 4 par quadrant en matrice) qui réduisent la surcharge au lieu de l'amplifier.
4. **Tonalité bienveillante** — L'app ne juge jamais. Pas de "en retard depuis X jours", pas de streaks, pas de gamification. Un ami organisé, pas un coach.
5. **Double valeur : produit + portfolio** — Projet conçu pour résoudre un vrai problème tout en démontrant des compétences front-end React/TypeScript de niveau production.

---

## Target Users

### Primary Users

**Persona North Star — Camille, la Freelance-Parent**

| Attribut | Détail |
|---|---|
| Âge | 34 ans |
| Rôle | Designer freelance, 3-4 clients actifs |
| Situation | En couple, un enfant de 5 ans (Mila) |
| Tech | Moyenne-Élevée (MacBook + iPhone) |
| Moment clé | Mardi soir 21h30, Mila couchée, 45 min devant elle |

**Contexte :** Aucune frontière pro/perso. 36 tâches en tête. A abandonné Todoist (trop de discipline), Notion (trop de setup), listes papier (perdues). Chaque outil essayé est devenu une tâche supplémentaire.

**Frustration centrale :** Elle ne procrastine pas par paresse — elle est paralysée par le volume. Elle sait qu'elle devrait trier. Ce qui échoue, c'est que chaque outil lui demande un effort d'organisation *avant* de l'aider.

**Succès :** *"Incroyable, je fais toutes mes tâches, je me sens mieux organisée et beaucoup plus légère mentalement. Je sais où je vais."*

**Règle de design :** Si un choix satisfait Camille mais pas les autres personas, on choisit Camille.

---

**Persona Secondaire — Lucas, l'Étudiant en Charge**

| Attribut | Détail |
|---|---|
| Âge | 21 ans |
| Rôle | L3 économie + job étudiant (McDo le weekend) |
| Situation | Coloc avec 2 amis |
| Tech | Élevée (iPhone principal + laptop) |
| Moment clé | Mercredi soir, semaine de partiels |

**Contexte :** 15 onglets ouverts, Netflix dans un coin, téléphone qui vibre. Aucune discipline externe. Son mécanisme de coping : l'évitement (FIFA "juste une game").

**Frustration centrale :** Il sait qu'il procrastine. Il n'a pas besoin qu'on lui dise. Il a besoin qu'on l'aide à démarrer le premier geste sans que ça ressemble à un effort monumental.

**Succès :** Savoir quoi réviser *maintenant* plutôt que paniquer devant la liste entière.

---

**Persona Secondaire — David, le Manager Sollicité**

| Attribut | Détail |
|---|---|
| Âge | 42 ans |
| Rôle | Directeur produit, équipe de 12 |
| Situation | Marié, enfants |
| Tech | Moyenne-Élevée (MacBook Pro + iPhone) |
| Moment clé | Vendredi 17h, 10 minutes avant de partir |

**Contexte :** Gère des roadmaps, OKRs, sprints pour son équipe. Pour lui-même : rien. Son propre backlog mental est un chaos qu'il compense par des heures sup le dimanche soir.

**Frustration centrale :** Il confond "quelqu'un attend" avec "c'est urgent". Les tâches interpersonnelles et personnelles sont systématiquement déprioritisées.

**Succès :** Sentir qu'il pilote sa semaine au lieu de la subir.

### Secondary Users

Pas de segment secondaire distinct pour le MVP. izh est un outil individuel — n'importe qui vivant une surcharge de tâches non triées peut en bénéficier. Les 3 personas couvrent les archétypes principaux (multi-rôles pro/perso, procrastination par paralysie, réactivité permanente).

### User Journey

**Parcours de Camille (north star) — du chaos à la clarté**

| Phase | Expérience | Émotion |
|---|---|---|
| **Découverte** | Bouche-à-oreille — un ami lui dit "essaie izh, tu dump tout et ça t'aide à trier" | Curiosité sceptique — "encore une app..." |
| **Onboarding** | Pas de slides, pas de tutoriel. Le bouton de capture est animé, elle comprend immédiatement. Elle tape sa première tâche | Surprise — "c'est tout ? ok, je continue" |
| **Brain dump** | Elle enchaîne 15 tâches en ~3 minutes. Flux continu, pas de catégorisation | Soulagement progressif — "ça sort de ma tête" |
| **Premier tri** | Le questionnaire lui pose 2-3 questions sur une tâche. Elle réalise que "relancer Maison Dubois" est plus urgent qu'elle ne pensait | Confiance guidée — "ah, en fait l'app m'aide à décider" |
| **Moment "aha"** | La matrice se remplit. Ses tâches sont classées. Elle voit clairement quoi faire demain matin | Clarté, soulagement — "je sais où j'en suis" |
| **Routine** | Mardi soir 21h30 : dump de la semaine + tri. En journée : capture rapide via bouton flottant. Lundi matin : sélection des tâches actives dans la matrice | Contrôle retrouvé — "je ne suis plus celle qui oublie" |

---

## Success Metrics

### User Success Metrics

| Métrique | Cible MVP | Méthode de mesure |
|---|---|---|
| Tâches déchargées par session de brain dump | 5+ | Analytics localStorage (compteur par session) |
| % de l'inbox triée en <48h | >80% | localStorage (created_at vs classified_at) |
| Tâches complétées par semaine depuis la matrice | 3+ | localStorage (completed_at + source matrice) |
| Temps de tri par tâche (flow assisté) | <60 secondes | Timer automatique (entrée flow → classement) |
| Score de légèreté mentale ressentie | >7/10 | Micro-survey in-app (après premier tri complet, puis 1x/semaine max) |
| Rétention hebdomadaire W1→W4 | 40%+ | localStorage (sessions par semaine) |

**Indicateur de succès ultime :** Camille revient chaque mardi soir depuis 4 semaines. Elle a trié >80% de son inbox et complète 3+ tâches/semaine depuis la matrice. Son score de légèreté mentale est passé de "je ne sais pas" à 7+/10.

### Business Objectives

**À 3 mois (MVP en production) :**
- Web app déployée en continu, accessible publiquement
- Workflow complet fonctionnel (brain dump → tri → backlog → matrice)
- Métriques localStorage validant l'hypothèse Lean UX
- Premiers retours utilisateurs qualitatifs (entourage proche)

**À 12 mois :**
- Migration Supabase terminée (auth + persistance serveur)
- Timeblocking en place avec synchronisation Google Agenda et Apple Calendar
- 10 utilisateurs actifs en production
- Données suffisantes pour valider ou invalider l'hypothèse de rétention 40%+

**Monétisation (horizon opportuniste) :**
- Pas de modèle de revenu pour le MVP — projet personnel et portfolio
- Si l'app rencontre un public : explorer un modèle freemium (fonctionnalités premium candidates : timeblocking, synchronisation calendrier, multi-device via Supabase)

### Key Performance Indicators

**KPIs Produit :**

| KPI | Cible | Horizon |
|---|---|---|
| Rétention W1→W4 | 40%+ | MVP +1 mois |
| Inbox triée <48h | >80% des tâches | MVP |
| Tâches complétées/semaine | 3+ depuis la matrice | MVP |
| Tri assisté vs manuel | Assisté majoritaire les 2 premières semaines | MVP |
| Utilisateurs actifs | 10 | 12 mois |

**KPIs Portfolio :**

| KPI | Cible | Horizon |
|---|---|---|
| App déployée en production | URL publique accessible | 3 mois |
| Code source | Repository GitHub privé + extraits portfolio ciblés | 3 mois |
| Stack démontrée | React + TypeScript + responsive mobile-first | 3 mois |
| Qualité code | Clean architecture, tests, CI/CD | 3 mois |
| Évolution technique | Migration Supabase + intégrations API calendrier | 12 mois |

---

## MVP Scope

### Core Features

**Workflow principal (critique — sans ces features, pas de produit) :**

1. **Brain dump** — Bouton flottant animé (premier lancement), accessible depuis tous les écrans. Champ texte uniquement, validation → champ se vide, prêt pour la suivante. Flux continu sans catégorisation.

2. **Inbox (Vrac)** — Liste de tâches non triées, sans limite de volume. Édition inline du titre. Persistance localStorage.

3. **Tri assisté par questionnaire cognitif** — 4 flux nommés :
   - Flux 1 — Projection de conséquences (urgence perçue vs conséquence réelle)
   - Flux 2 — Ancrage aux objectifs (réflexion mentale, pas de feature dédiée en MVP)
   - Flux 3 — Audit de la source du stress (urgence fabriquée par l'anxiété)
   - Flux 4 — Test du regret (tâches importantes enterrées)
   - 2-4 questions, <60s, aboutit toujours à un quadrant

4. **Tri manuel** — Classement direct dans un quadrant sans passer par le questionnaire

5. **Backlog (Réserve)** — 4 listes = 4 quadrants avec labels izh. Limite 40 tâches tous quadrants confondus. Reclassification par drag & drop entre quadrants. Tri par date de création ou ordre manuel intra-quadrant.

6. **Matrice active (Focus)** — Max 4 tâches par quadrant, sélection depuis le backlog. Lecture seule : compléter ou remettre au backlog, pas de reclassement entre quadrants. Feedback pédagogique si tentative de drag entre quadrants (toast explicatif, tâche revient en place).

7. **Complétion et archivage** — Feedback subtil, undo temporaire (toast 5 secondes)

8. **Purge du backlog** — Questionnaire assisté + purge manuelle libre. Nudge doux à l'approche des 40.

9. **Onboarding par l'usage** — Pas de slides ni tutoriel. Surbrillances et animations guidant la boucle complète dès la première session.

10. **Analytics localStorage** — Timestamps par tâche (created_at, classified_at, completed_at), timer de tri, micro-survey de légèreté mentale.

**Modèle de tâche :** Titre uniquement côté utilisateur + métadonnées automatiques invisibles (created_at, classified_at, completed_at, quadrant, flow_duration_ms, source_flux, classification_method).

### Out of Scope for MVP

| Feature exclue | Raison |
|---|---|
| Définition guidée des 3 priorités de la période | Post-MVP — le Flux 2 fonctionne sans |
| Fonctionnalités sociales / collaboration | MVP individuel |
| Notifications push natives | Pas de backend |
| Intégrations tierces (calendrier, Slack) | Post-MVP — timeblocking prévu en phase 2 |
| Gamification / streaks / accountability | Contraire à la tonalité bienveillante |
| Gestion de projets (sous-tâches, dépendances) | Hors positionnement |
| Timer / Pomodoro | Pas un différenciateur |
| Backend / auth | Phase 2 (Supabase) |
| Timeblocking | Phase 2 |
| Email digest hebdomadaire | Bonus fin de dev si le temps le permet |
| PWA | Bonus fin de dev si le temps le permet |

### MVP Success Criteria

**Go/No-go vers la phase 2 :**
- Basé sur le **ressenti du fondateur** et les **retours utilisateurs qualitatifs** (entourage proche)
- Pas de seuil métrique rigide — les KPIs localStorage informent la décision mais ne la commandent pas
- Question de décision : "Est-ce que les gens qui l'utilisent trouvent ça utile et reviennent ?"

**Signaux positifs (green lights) :**
- Les testeurs utilisent le tri assisté plutôt que de tout classer manuellement
- Les testeurs reviennent la semaine suivante sans qu'on leur demande
- Les retours qualitatifs convergent vers "ça m'aide à y voir clair"

**Signaux d'alerte (red flags) :**
- Les testeurs abandonnent le questionnaire en cours de route
- Les testeurs n'utilisent que le tri manuel → le différenciateur ne fonctionne pas
- Feedback type "c'est encore un truc à gérer" → piège Todoist/Notion reproduit

### Future Vision

**Roadmap post-MVP (dans l'ordre de priorité validé) :**

| Phase | Feature | Dépendance |
|---|---|---|
| Phase 2a | Migration Supabase (auth + persistance serveur) | MVP validé |
| Phase 2b | Timeblocking | Supabase en place |
| Phase 2c | Synchronisation Google Agenda + Apple Calendar | Timeblocking en place |
| Phase 3a | Email digest hebdomadaire | Supabase (besoin d'email) |
| Phase 3b | Installation PWA | Indépendant |

**Horizon opportuniste :**
- Définition guidée des 3 priorités de la période (enrichit le Flux 2)
- Modèle freemium si l'app rencontre un public (candidats premium : timeblocking, sync calendrier, multi-device)

**Contrainte de temps MVP :** En production dans **1 mois** (mi-avril 2026). Déployé en continu — chaque avancée visible en production.
