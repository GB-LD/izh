# Brief Projet — izh

> **Usage agent :** Ce document est le point de départ de toute la conception. Sans lui, aucun choix visuel ou structurel n'est justifiable. L'agent doit l'alimenter en collaboration avec le client/PO avant de produire tout autre livrable.

**Version :** v1.0
**Date :** 2026-03-03
**Auteur :** UX Designer (assisté par IA)
**Statut :** Validé

---

## 1. Problème à résoudre

**Problème primaire :**
Les personnes qui jonglent entre tâches professionnelles et personnelles accumulent des boucles ouvertes non triées. Le volume crée une paralysie décisionnelle : elles ne savent pas par où commencer, ce qui amplifie la procrastination et la charge mentale. Les outils existants (Todoist, Notion, to-do lists papier) présupposent que l'utilisateur sait déjà ce qui est prioritaire — or c'est précisément ce qu'il ne sait pas.

**Preuves / observations terrain :**

- Expérience personnelle du fondateur — vécu direct du problème
- Retours convergents de l'entourage proche
- Phénomène documenté scientifiquement : Mere Urgency Effect (Zhu et al., 2018), effet Zeigarnik (1927), hyperbolic discounting (Ainslie, 1975)
- 4 proto-personas détaillés avec brain dumps réalistes (parent actif, étudiant, manager, freelance) montrant 30-40+ tâches non triées mêlant pro/perso
- Benchmark de 10 concurrents confirmant qu'aucune app n'aide à classifier (cf. `docs/izh/benchmark-concurrentiel.md`)

**Hypothèse de valeur (Lean UX) :**

> « Nous croyons qu'un workflow guidé de tri par questionnaire cognitif (basé sur Eisenhower) pour les personnes en surcharge mentale permettra de débloquer le passage à l'action. Nous saurons que c'est vrai quand les utilisateurs classent >80% de leurs tâches inbox en moins de 48h et complètent des tâches depuis la matrice chaque semaine. »

---

## 2. Périmètre du produit

**Nom du produit / service :**
izh

**Type de surface :**

- [x] Web app (responsive mobile-first, tablet, desktop)
- [ ] Mobile iOS
- [ ] Mobile Android
- [ ] Desktop app
- [ ] Autre

**Version concernée par ce brief :**
MVP

**Ce que le produit fait (périmètre IN) :**

- Onboarding par l'usage : pas de slides ni de tutoriel — l'utilisateur vit la boucle complète (capture → tri → backlog → matrice) dès la première session, guidé par des surbrillances et animations — cf. `knowledge/Décisions UX — Onboarding première expérience.md`
- Brain dump rapide (bouton flottant + animé au premier lancement, depuis n'importe quel écran)
- Inbox (liste de tâches non triées)
- Tri assisté par questionnaire cognitif — 4 flux nommés :
  - Flux 1 — Projection de conséquences (biais : pression perçue vs conséquence réelle)
  - Flux 2 — Ancrage aux objectifs (biais : tout paraît important sans référentiel) — en MVP, l'utilisateur réfléchit mentalement à ses priorités au moment de la question, sans feature dédiée
  - Flux 3 — Audit de la source du stress (biais : urgence fabriquée par l'anxiété)
  - Flux 4 — Test du regret (biais : tâches Q2 enterrées en Q4)
- Tri manuel (classement direct dans un quadrant)
- Inbox sans limite de volume
- Backlog classifié (4 listes = 4 quadrants Eisenhower avec labels izh) — limite de 40 tâches au total, tous quadrants confondus
- Reclassification dans le backlog par drag & drop entre quadrants (libre, sans friction)
- Matrice active (max 4 tâches par quadrant, sélection depuis le backlog) — espace d'action en lecture seule : l'utilisateur peut compléter ou remettre au backlog, pas reclasser entre quadrants
- Feedback pédagogique si tentative de drag entre quadrants dans la matrice : la tâche revient en place, toast explicatif (_"Dans la matrice, tu agis. Pour reclasser, remets d'abord dans le backlog."_), seule la zone backlog est une cible de drop valide
- Échange matrice → backlog (drag ou geste explicite, la tâche retourne au même quadrant)
- Modèle de tâche minimaliste : titre uniquement côté utilisateur + métadonnées automatiques invisibles (created_at, classified_at, completed_at, quadrant, flow_duration_ms, source_flux, classification_method) — cf. `knowledge/Décisions UX — Modèle de données d'une tâche.md`
- Édition du titre inline (inbox, backlog, matrice)
- Tri du backlog par quadrant : par date de création ou ordre manuel (drag & drop intra-quadrant)
- Complétion et archivage des tâches
- Purge assistée du backlog (questionnaire + limite 40 tâches au total)
- Purge manuelle à tout moment
- Tracking analytique dès le MVP (timestamps par tâche, timer de tri, micro-survey de légèreté mentale) — données en localStorage

**Ce que le produit fait (périmètre IN — bonus fin de dev) :**

- Email digest hebdomadaire (« X tâches non triées dans ton inbox »)
- Installation PWA / écran d'accueil

**Ce que le produit ne fait PAS (périmètre OUT) :**

- Définition guidée des 3 priorités de la période — post-MVP (le Flux 2 fonctionne sans : l'utilisateur y réfléchit mentalement, ou est redirigé vers le Flux 1)
- Fonctionnalités sociales / collaboration / partage — MVP individuel
- Notifications push natives
- Intégrations tierces (calendrier, Slack, etc.)
- Gamification / streaks / accountability
- Gestion de projets (sous-tâches, dépendances)
- Timer / Pomodoro (tous les concurrents le font déjà, pas un différenciateur)
- Indicateur de confiance après chaque réponse du questionnaire — supprimé, ajoute de la friction sans valeur suffisante

---

## 3. Utilisateurs cibles

| Segment                           | Description rapide                                                                          | Maturité tech  | Contexte d'usage                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------ |
| **Freelance-Parent (north star)** | 30-40 ans, multi-clients + enfant(s), frontière pro/perso inexistante, 30-40 tâches en tête | Moyenne-Élevée | Mobile pour capture en mouvement, desktop pour les sessions de tri, interrompu fréquemment |
| Étudiant en charge                | 20-25 ans, études + job + vie sociale, procrastination sous stress                          | Élevée         | Mobile principalement, sessions courtes                                                    |
| Manager sollicité                 | 35-50 ans, équipe + livrables + vie perso                                                   | Moyenne-Élevée | Desktop au travail, mobile en transit                                                      |

**Utilisateur prioritaire (north star) :**
**Camille, le Freelance-Parent** — 34 ans, designer freelance, 3-4 clients actifs, un enfant de 5 ans (Mila), en couple avec Julien. Travaille depuis chez elle. Aucune frontière entre pro et perso. A déjà essayé Todoist (abandonné au bout de 2 semaines), des listes papier (perdues), Notion (trop de setup). Chaque tâche oubliée = soit un client mécontent, soit une culpabilité parentale. 36 tâches en tête. Si izh fonctionne pour elle, ça fonctionne pour tout le monde.

_(Persona complet avec brain dump : cf. `knowledge/Personas/⭐ Camille — North Star.md`)_

---

## 4. Objectifs du produit

**Objectif business principal :**
Atteindre un taux de rétention hebdomadaire (W1→W4) de 40%+ — preuve que l'app crée une habitude de tri.

**Objectifs utilisateurs (ce que l'utilisateur doit réussir) :**

- **Vider sa tête** — Décharger 100% de ses tâches dans l'inbox sans friction (brain dump → 0 tâche en tête)
- **Savoir quoi faire maintenant** — Passer d'un brouillard de 30+ tâches à une matrice avec max 16 tâches actionnables, classées
- **Avancer chaque semaine** — Compléter des tâches depuis la matrice de manière régulière

**Ce que Camille dirait si ça marche :**

> « Incroyable, je fais toutes mes tâches, je me sens mieux organisée et beaucoup plus légère mentalement. Je sais où je vais. »

Trois outcomes : passage à l'action, soulagement cognitif, clarté directionnelle.

**KPIs de succès UX (mesurés dès le MVP en localStorage) :**

| KPI                                             | Baseline actuelle | Cible MVP | Méthode de mesure      | Donnée technique requise                                                   |
| ----------------------------------------------- | ----------------- | --------- | ---------------------- | -------------------------------------------------------------------------- |
| Tâches déchargées par session de brain dump     | —                 | 5+        | Analytics localStorage | Compteur par session (timestamp début/fin)                                 |
| % de l'inbox triée en <48h                      | —                 | >80%      | Analytics localStorage | Timestamp de création + timestamp de classification                        |
| Tâches complétées par semaine depuis la matrice | —                 | 3+        | Analytics localStorage | Timestamp de complétion + source (matrice)                                 |
| Temps pour trier une tâche (flow assisté)       | —                 | <60s      | Analytics localStorage | Timer automatique : entrée dans le flow → classement                       |
| Score de légèreté mentale ressentie             | —                 | >7/10     | Micro-survey in-app    | Survey déclenché après premier tri complet de l'inbox, puis 1x/semaine max |

---

## 5. Principes non-négociables

1. **"Décharge d'abord, trie après"** — L'app ne demande jamais de catégoriser au moment de la capture. Le cerveau vide d'abord, réfléchit ensuite. _Implication : le bouton + ne montre qu'un champ texte, rien d'autre. Zéro friction à l'entrée._

2. **"La décision, pas la perfection"** — Chaque tâche aboutit à un quadrant, même imparfait. Classer "mal" est toujours mieux que ne pas classer. Le flow de tri aboutit toujours à un résultat — pas de cul-de-sac, pas d'option "revenir plus tard". _Implication : le questionnaire cognitif n'a pas de sortie sans décision. Les questions de rebond rattrapent les hésitations._

3. **"Moins tu vois, mieux tu agis"** — La matrice limite à 4 tâches par quadrant. L'app protège l'utilisateur de sa propre tendance à tout rendre visible et urgent. L'utilisateur peut remettre une tâche de la matrice dans le backlog pour faire de la place. _Implication : on dit non à toute feature qui augmente le nombre d'éléments visibles simultanément._

4. **"L'app pense pour toi quand tu ne peux plus"** — En surcharge cognitive, l'utilisateur ne peut pas analyser. Le questionnaire le guide par la reconnaissance de patterns, pas par la réflexion. _Implication : le flow de tri utilise des questions émotionnelles (Système 1) avant les questions analytiques (Système 2). Inclut une question de délégation pour contrer le biais de culpabilité parentale._

---

## 6. Ambiance émotionnelle attendue

**Émotions cibles par moment clé :**

| Moment de l'expérience               | Émotion visée                                                     | Émotion à éviter absolument                                    |
| ------------------------------------ | ----------------------------------------------------------------- | -------------------------------------------------------------- |
| Premier contact (ouverture de l'app) | Calme, espace — "c'est vide, c'est prêt pour moi"                 | Surcharge visuelle, sensation de "encore un truc à configurer" |
| Brain dump                           | Fluidité, décharge — "ça sort de ma tête sans effort"             | Friction, hésitation, sensation de formulaire                  |
| Tri assisté (questionnaire)          | Confiance guidée — "l'app m'aide à décider, je ne suis pas seule" | Jugement, sentiment de faire un test, peur de "mal répondre"   |
| Découverte de la matrice remplie     | Clarté, soulagement — "je sais où j'en suis"                      | Overwhelm, impression que tout est urgent                      |
| Complétion d'une tâche               | Satisfaction discrète — "j'avance"                                | Gamification excessive, récompense infantilisante              |
| Moment d'erreur / blocage            | Bienveillance — "c'est pas grave, on corrige"                     | Culpabilité, ton punitif, alerte anxiogène                     |
| Backlog qui approche les 40          | Nudge doux — "c'est le moment de faire du tri"                    | Panique, urgence fabriquée, punition                           |

**Tonalité générale du produit :**
Sobre, adulte, bienveillante sans être condescendante. Comme un ami organisé qui t'aide à y voir clair — pas un coach de productivité qui te fait la leçon.

**Ce qu'izh ne doit JAMAIS faire ressentir :**

- Que l'utilisateur est "en retard" ou "mauvais"
- Que l'app est elle-même une tâche à gérer
- Que la productivité est une compétition

---

## 7. Contraintes & dépendances

**Contraintes techniques connues :**

- Stack : React + TypeScript (projet portfolio développeur front junior)
- Web app responsive mobile-first
- Déployé en continu — chaque avancée visible en production
- Phase 1 (MVP workflow) : localStorage uniquement — pas de backend, ship rapide pour montrer à des employeurs
- Phase 2 (post-MVP workflow) : migration vers Supabase (auth + persistance)
- Le projet sert de portfolio — la qualité du code et du design comptent autant que la fonctionnalité

**Contraintes business / légales :**

- Pas de contraintes RGPD pour le MVP (localStorage, pas de données serveur)
- À reconsidérer lors de la migration Supabase (données perso stockées côté serveur)

**Dépendances avec d'autres équipes :**

| Équipe | Dépendance                            | Impact UX        |
| ------ | ------------------------------------- | ---------------- |
| —      | Aucune dépendance externe pour le MVP | Autonomie totale |

---

## 8. Ce qui a déjà été exploré

**Recherches existantes :**

- 4 proto-personas avec brain dumps détaillés (cf. `knowledge/Personas/`)
- Workflow complet documenté (cf. `knowledge/Workflow IZH.md`)
- Flow de classification cognitif en 4 flux avec fondements psychologiques (cf. `knowledge/Flow de Classification — Matrice Eisenhower.md`)
- Renommage des quadrants Eisenhower adapté à izh (cf. `knowledge/Nommage des quadrants izh.md`)

**Décisions UX documentées lors de la revue v0.1 → v1.0 :**

- Interactions backlog et matrice (cf. `knowledge/Décisions UX — Interactions backlog et matrice.md`)
- Modèle de données d'une tâche (cf. `knowledge/Décisions UX — Modèle de données d'une tâche.md`)
- Onboarding première expérience (cf. `knowledge/Décisions UX — Onboarding première expérience.md`)
- TODO : question de délégation à ajouter au flow (cf. `knowledge/TODO — Question de délégation dans le flow.md`)

**Tentatives de solutions précédentes (par le persona north star) :**

- Todoist — abandonné au bout de 2 semaines (trop de discipline requise)
- Listes papier — perdues, pas de vue d'ensemble
- Notion — trop de setup, devient une tâche en soi

**Concurrents / inspirations étudiés :**
Benchmark complet de 10 apps (cf. `docs/izh/benchmark-concurrentiel.md`)

| Concurrent     | Ce qui fonctionne                          | Ce qui ne fonctionne pas                          |
| -------------- | ------------------------------------------ | ------------------------------------------------- |
| Eisenhower.me  | Simple, limite 8/quadrant                  | Zéro guidage, interface datée                     |
| Todoist        | Ergonomie mature, saisie naturelle         | Eisenhower en hack, zéro aide à la décision       |
| TickTick       | Eisenhower natif, Pomodoro, prix bas       | Classification auto ≠ guidée, interface datée     |
| Amazing Marvin | Procrastination Wizard unique              | Customisation = paralysie, n'aide pas à classer   |
| Sunsama        | Plus beau design du marché                 | 20$/mois, suppose qu'on sait ce qui est important |
| Tiimo          | App de l'année Apple 2025, design inclusif | IA planifie mais ne questionne pas les priorités  |

**Gap identifié :** Aucune app n'aide l'utilisateur à classifier ses tâches. izh est la seule à proposer une classification guidée par questionnaire cognitif ciblant les biais décisionnels.

---

## 9. Validation & sign-off

| Rôle             | Nom | Date | Statut      |
| ---------------- | --- | ---- | ----------- |
| Product Owner    | —   | —    | ☐ À valider |
| UX Designer Lead | —   | —    | ☐ À valider |
| Tech Lead        | —   | —    | ☐ À valider |
| Commanditaire    | —   | —    | ☐ À valider |

---

_Template BMAD-UX v1.0 — basé sur Lean UX (Gothelf & Seiden), Design Thinking (IDEO) et les principes de Kholmatova_
