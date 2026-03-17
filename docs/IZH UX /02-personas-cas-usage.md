# Personas & Cas d'usage — izh

> **Usage agent :** Produit après le brief projet. Chaque persona est basé sur des données réelles (entretiens, analytics, observations terrain) — jamais sur des suppositions. En contexte Lean UX / MVP, utilise des proto-personas explicitement marqués comme hypothèses à valider.

**Version :** v0.1
**Date :** 2026-03-03
**Basé sur :** Proto-hypothèses fondateur + brain dumps détaillés (4 profils) + benchmark concurrentiel
**Statut :** Proto-persona (hypothèse)

---

## Vue d'ensemble des personas

| ID | Nom | Segment | Priorité | Type |
|---|---|---|---|---|
| P1 | Camille — La Freelance-Parent | Freelance multi-clients + enfant, frontière pro/perso inexistante | Primaire (north star) | Proto |
| P2 | Lucas — L'Étudiant en Charge | Études + job étudiant + vie sociale, procrastination sous stress | Secondaire | Proto |
| P3 | David — Le Manager Sollicité | Directeur produit, équipe de 12, réactivité permanente | Secondaire | Proto |

> *Règle : ne jamais concevoir pour plus de 2 personas primaires simultanément. P1 est le north star — si un choix de design satisfait Camille mais pas David ou Lucas, on choisit Camille. P2 et P3 informent les décisions sans les commander.*

---

## Persona P1 — Camille, la Freelance-Parent

> *HYPOTHÈSE — à valider lors des 3 premiers tests utilisateurs*

### Identité

**Prénom fictif :** Camille
**Archétype :** "La freelance qui n'arrive pas à prioriser"
**Âge :** 34 ans
**Rôle / Métier :** Designer freelance, 3-4 clients actifs
**Niveau tech :** Moyenne-Élevée
**Appareils principaux :** MacBook (bureau maison) + iPhone (en mouvement)
**Situation personnelle :** En couple avec Julien, un enfant de 5 ans (Mila)

### Contexte de vie

**Environnement de travail :**
Travaille depuis chez elle. Bureau = salon = cuisine. Aucune frontière physique entre pro et perso. Interrompue fréquemment par Mila, les clients, la logistique du foyer. Son seul créneau calme : le soir après 21h30 quand Mila dort.

**Rapport au produit :**
Son moment critique : mardi soir, 21h30, Mila est couchée. Elle a 45 minutes devant elle et un cerveau qui tourne à plein. Si elle ouvre izh et que le dump + tri prend 15 minutes → elle revient la semaine suivante. Si ça demande du setup → elle ferme et ne revient pas.

**Outils qu'elle utilise déjà :**
Todoist (abandonné au bout de 2 semaines — trop de discipline requise), listes papier (perdues, pas de vue d'ensemble), Notion (trop de setup, devient une tâche en soi). A aussi essayé de tout garder en tête — résultat : 36 tâches non triées, paralysie.

---

### Objectifs

**Objectifs dans le produit :**
- Vider sa tête rapidement (brain dump sans friction)
- Voir émerger un ordre dans le chaos (le tri fait le travail cognitif pour elle)
- Savoir quoi faire demain matin (la matrice comme boussole)

**Objectifs de vie (motivations profondes) :**
- Ne plus être "celle qui oublie" — ni pour ses clients, ni pour Mila
- Retrouver un sentiment de contrôle sans devenir rigide
- Arrêter de culpabiliser à chaque tâche non faite

---

### Frustrations & douleurs actuelles

- La 3e relance facture impayée Maison Dubois traîne parce qu'elle est coincée entre des tâches "plus urgentes" qui ne le sont pas vraiment — elle perd de l'argent par incapacité à prioriser
- Elle paie la salle de sport depuis 3 mois sans y aller — pas par manque de volonté, mais parce que ça ne passe jamais le filtre de l'urgent
- Le formulaire contact de son site est cassé depuis 2 mois — elle perd peut-être des prospects sans le savoir, mais elle n'arrive pas à prioriser un truc "invisible"
- Chaque outil essayé est devenu une tâche supplémentaire à gérer au lieu de réduire sa charge mentale

**La tension comportementale :** Camille ne procrastine pas par paresse — elle procrastine parce qu'elle est paralysée par le volume. Elle **sait** qu'elle devrait trier. Ce qui échoue à chaque fois, c'est que l'outil lui demande un effort d'organisation **avant** de l'aider. Todoist : "dans quel projet ?", Notion : "quel template ?", listes papier : "où je l'ai mise ?". Résultat : l'outil de productivité devient lui-même une tâche.

---

### États émotionnels aux moments clés

| Moment d'usage | État émotionnel | Implication design |
|---|---|---|
| Ouverture de l'app (mardi soir, 21h30, Mila couchée) | Épuisée mais déterminée — "j'ai 45 min, faut que ça serve" | Zéro écran d'accueil, zéro setup. L'app doit être prête à recevoir en <2 secondes. L'inbox ou le bouton de capture est la première chose visible |
| Brain dump | Soulagement progressif — "ça sort de ma tête" | Le champ de saisie doit être ultra-rapide : valider un titre → le curseur revient immédiatement pour le suivant. Pas de catégorisation, pas de modal, pas de friction |
| Tri assisté (questionnaire cognitif) | Surprise guidée — "ah, en fait cette tâche n'est pas si urgente" | Le wording doit être doux et exploratoire, pas interrogatif. Questions courtes. Résultat immédiat après chaque tâche triée. Sentiment de progression visible |
| Découverte de la matrice remplie | Clarté, soulagement — "je sais quoi faire demain matin" | La matrice doit être lisible d'un coup d'oeil. Max 4 tâches visibles par quadrant. Les labels izh doivent parler en langage humain, pas en jargon Eisenhower |
| Tâche complétée | Satisfaction discrète — "j'avance, ça fait du bien" | Feedback subtil (animation légère, pas de confettis). Le focus revient sur la tâche suivante, pas sur la célébration |
| Backlog qui approche les 40 | Léger stress — "encore des trucs qui s'accumulent" | Nudge bienveillant, pas d'alarme. Proposer la purge comme un moment de tri, pas comme une punition |
| Tâche pro oubliée découverte tardivement | Culpabilité + anxiété — "je suis nulle, le client va me lâcher" | Ne jamais afficher de durée depuis la création ("en retard depuis X jours"). Pas de tonalité de reproche. L'app propose de l'action, pas du jugement |

---

### Ce que ce persona ne doit JAMAIS ressentir

- Que l'app est **elle-même une tâche** à gérer (le piège Todoist/Notion)
- Qu'elle est **jugée** sur le nombre de tâches non faites
- Que ses tâches perso (déguisement Mila) valent **moins** que ses tâches pro (maquettes client)
- Qu'elle a **"mal trié"** — le flow doit donner confiance, pas créer un nouveau doute

---

### Citation représentative

> *[Citation à recueillir lors des tests]* — Hypothèse : "J'ai essayé plein de trucs. Le problème c'est pas de noter les tâches, c'est de savoir laquelle faire maintenant."

---

## Persona P2 — Lucas, l'Étudiant en Charge

> *HYPOTHÈSE — à valider lors des 3 premiers tests utilisateurs*

### Identité

**Prénom fictif :** Lucas
**Archétype :** "L'étudiant qui procrastine par paralysie"
**Âge :** 21 ans
**Rôle / Métier :** L3 économie, job étudiant le weekend (McDo)
**Niveau tech :** Élevée
**Appareils principaux :** iPhone (principal) + laptop (révisions)
**Situation personnelle :** Coloc avec 2 amis

### Contexte de vie

**Environnement de travail :**
Chambre en coloc, bureau partagé. Travaille avec 15 onglets ouverts, Netflix dans un coin, le téléphone qui vibre. Aucune discipline externe — l'emploi du temps universitaire donne l'illusion de structure mais les révisions, le stage, l'administratif sont entièrement à sa charge.

**Rapport au produit :**
Son moment critique : mercredi soir, semaine de partiels. Il est devant son bureau, il ne sait pas par où commencer. S'il ouvre izh et que le dump + tri prend 5 minutes, il commence à réviser. Si ça prend plus → il ouvre FIFA.

**Outils qu'il utilise déjà :**
Notes du téléphone (liste informe), rappels iOS (oubliés), parfois un post-it sur l'écran. Pas d'outil de productivité installé — "c'est pour les gens organisés".

---

### Objectifs

**Objectifs dans le produit :**
- Savoir quoi réviser **maintenant** plutôt que paniquer devant la liste entière
- Distinguer ce qui est vraiment urgent (exam lundi) de ce qui stresse juste (stage d'été)
- Dump rapide entre deux cours ou dans le métro

**Objectifs de vie (motivations profondes) :**
- Prouver à ses parents (et à lui-même) qu'il gère
- Arrêter de culpabiliser quand il prend du temps pour lui (soirée, FIFA)
- Décrocher son année sans y laisser sa santé mentale

---

### Frustrations & douleurs actuelles

- 5 deadlines la même semaine, aucune idée de par laquelle commencer → il commence par la plus stressante, pas la plus importante
- Le stage d'été — "tout le monde a déjà trouvé" — traîne depuis des semaines parce que ce n'est jamais le bon moment
- Il a acheté des Red Bull pour réviser au lieu de structurer ses sessions — il compense le manque d'organisation par la force brute

**La tension comportementale :** Lucas **sait** qu'il procrastine. Il culpabilise même (l'appli méditation, "stress de fou"). Mais son mécanisme de coping c'est l'évitement — FIFA avec les potes, "juste une game". Il n'a pas besoin qu'on lui dise qu'il procrastine, il a besoin qu'on l'aide à **démarrer le premier geste** sans que ça ressemble à un effort monumental.

---

### États émotionnels aux moments clés

| Moment d'usage | État émotionnel | Implication design |
|---|---|---|
| Ouverture de l'app (mercredi soir, semaine partiels) | Anxieux, dispersé — "je sais même pas par où commencer" | L'app doit donner une direction en <30 secondes. Pas de dashboard complexe. La matrice = ta réponse |
| Brain dump | Décharge rapide — "ok au moins c'est sorti" | Saisie ultra-rapide, une main sur mobile. Validation par retour chariot, pas de tap supplémentaire |
| Tri assisté | Surprise — "ah ouais en fait l'exam de jeudi est plus urgent que celui de lundi" | Questions très courtes, langage direct, pas de ton professoral. Le questionnaire ne doit pas ressembler à un exam de plus |
| Matrice remplie | Soulagement ponctuel — "ok je commence par ça" | Afficher le premier geste, pas la montagne. La matrice doit donner envie de faire UN truc, pas de tout planifier |
| Tâche complétée | Petite victoire — "au moins j'ai fait ça" | Feedback discret mais présent. Suffisant pour renforcer sans infantiliser |
| Il a envie de tout lâcher (soirée chez Léa) | Culpabilité — "je devrais réviser" | L'app ne doit JAMAIS dire "tu as des tâches en retard". Si Lucas choisit la soirée, c'est ok. L'app sera là quand il reviendra |

---

### Ce que ce persona ne doit JAMAIS ressentir

- Que l'app lui fait **la morale** (il en a assez avec ses parents)
- Que prendre une pause = **échouer**
- Que l'app est un outil pour **"vrais adultes"** et pas pour lui
- Qu'il doit **configurer** quoi que ce soit avant que ça soit utile

---

### Citation représentative

> *[Citation à recueillir lors des tests]* — Hypothèse : "Je sais que je procrastine, c'est pas le problème. Le problème c'est que quand je veux bosser, je sais pas par quoi commencer et du coup je fais rien."

---

## Persona P3 — David, le Manager Sollicité

> *HYPOTHÈSE — à valider lors des 3 premiers tests utilisateurs*

### Identité

**Prénom fictif :** David
**Archétype :** "Le manager qui gère tout sauf lui-même"
**Âge :** 42 ans
**Rôle / Métier :** Directeur produit, équipe de 12, grosse boîte tech
**Niveau tech :** Moyenne-Élevée
**Appareils principaux :** MacBook Pro (bureau) + iPhone (transit)
**Situation personnelle :** Marié, enfants

### Contexte de vie

**Environnement de travail :**
Open space, réunions en chaîne, Slack en bruit de fond permanent. Passe ses journées à répondre aux demandes des autres — CEO, équipe, clients, RH. Son propre travail (réflexion stratégique, roadmap, formation) est systématiquement repoussé. Il compense par des heures sup le dimanche soir.

**Rapport au produit :**
Son moment critique : vendredi 17h. La semaine est finie mais rien ne semble bouclé. Il a 10 minutes avant de partir. S'il dump ses tâches du weekend et de la semaine prochaine en 3 minutes et trie les 5 plus critiques → il part l'esprit plus léger. S'il faut configurer un outil → il ferme et se dit "je verrai lundi".

**Outils qu'il utilise déjà :**
Jira (pour l'équipe, pas pour lui), Notion (espace équipe), Slack (flux permanent), email (67 non lus). Pour ses propres priorités : rien. Il utilise sa mémoire et des notes mentales — et ça ne scale pas.

---

### Objectifs

**Objectifs dans le produit :**
- Séparer ce qui est vraiment important de ce qui est bruyant
- Avoir une vue claire de SES priorités à lui (pas celles de son équipe)
- Dump rapide en fin de journée ou en transit

**Objectifs de vie (motivations profondes) :**
- Retrouver du temps pour lui (sport, famille, lecture) sans culpabiliser
- Sentir qu'il pilote sa semaine au lieu de la subir
- Être un bon manager ET un bon père — pas l'un au détriment de l'autre

---

### Frustrations & douleurs actuelles

- Le rapport concurrent marqué "URGENT" par le CEO a cannibalisé sa journée — alors que la deadline est dans 3 semaines. Il réagit au plus bruyant, pas au plus important
- Le feedback promis à Sarah depuis mardi lui pèse mentalement mais ne passe jamais devant les réunions — les tâches interpersonnelles sont toujours déprioritisées
- Il a promis du temps famille ce weekend mais il sait déjà qu'il va ouvrir son laptop dimanche soir — le perso perd systématiquement face au pro

**La tension comportementale :** David se pense organisé — il est directeur produit, il gère des roadmaps, des OKRs, des sprints. Mais c'est pour **son équipe**. Pour **lui-même**, il n'a aucun système. Son propre backlog mental est un chaos qu'il compense par des heures sup. Son biais spécifique : confondre **"quelqu'un attend"** avec **"c'est urgent"**.

---

### États émotionnels aux moments clés

| Moment d'usage | État émotionnel | Implication design |
|---|---|---|
| Ouverture de l'app (vendredi 17h) | Fatigué, saturé — "je veux juste savoir quoi faire lundi" | Pas de bruit visuel. L'app doit respirer. Interface sobre, adulte, professionnelle |
| Brain dump | Décharge stratégique — "ok, je pose tout ici et je trie" | Doit se sentir comme un outil sérieux, pas une app de bien-être. Le dump est un acte de management personnel |
| Tri assisté | Remise en question productive — "ah, le rapport CEO peut attendre en fait" | Le questionnaire doit challenger l'urgence perçue sans être condescendant. David accepte d'être questionné s'il sent que c'est intelligent |
| Matrice remplie | Contrôle retrouvé — "ma semaine est lisible" | La matrice doit ressembler à un outil de décision, pas à une to-do list colorée |
| Tâche perso qui émerge dans la matrice (sport, famille) | Surprise + légère gêne — "un directeur produit qui trie 'appeler maman'..." | Le produit doit normaliser le mélange pro/perso. Pas de catégories, pas de séparation. Une tâche est une tâche |

---

### Ce que ce persona ne doit JAMAIS ressentir

- Que l'outil est **enfantin** ou pas à la hauteur de sa complexité professionnelle
- Que mélanger "conflit Marc/Sophie" et "temps famille weekend" est **bizarre**
- Que l'app le **ralentit** — s'il peut trier plus vite manuellement, il lâchera le questionnaire
- Qu'il doit **justifier** pourquoi il utilise un outil de productivité individuel (syndrome "je suis censé gérer")

---

### Citation représentative

> *[Citation à recueillir lors des tests]* — Hypothèse : "Je gère des roadmaps pour 12 personnes mais je suis incapable de prioriser ma propre semaine. C'est absurde."

---

## Cas d'usage — Scénarios prioritaires

### CU-01 — Brain dump initial (première session)

**Persona concerné :** P1, P2, P3
**Déclencheur :** L'utilisateur ouvre izh pour la première fois. Il a 30-40 tâches en tête, aucune n'est notée nulle part.
**Objectif utilisateur :** Vider sa tête complètement en une seule session.
**Critère de succès :** L'utilisateur a déchargé 5+ tâches, l'inbox est remplie, il ressent un soulagement immédiat.

**Scénario nominal (happy path) :**
1. Camille ouvre izh mardi soir 21h30
2. L'onboarding par l'usage met en surbrillance le bouton de capture (animé au premier lancement)
3. Elle tape "Finir maquettes client Leroy pour jeudi" → valide → le champ se vide, prêt pour la suivante
4. Elle enchaîne 15 tâches en ~3 minutes (flux continu, pas de catégorisation)
5. Elle voit son inbox remplie — premier sentiment : "c'est sorti de ma tête"
6. L'app la guide vers le tri de sa première tâche (transition vers CU-02)

**Variantes & edge cases :**
- L'utilisateur tape une tâche très longue (phrase entière) → le titre s'affiche tronqué visuellement mais conservé intégralement
- L'utilisateur s'arrête après 3 tâches et ferme → l'inbox persiste (localStorage), pas de perte de données
- L'utilisateur veut modifier une tâche qu'il vient d'ajouter → édition inline dans l'inbox

**Fréquence d'usage :** Une seule fois (première session). Les dumps suivants sont CU-05.
**Criticité :** Critique — si ce moment échoue, l'utilisateur ne revient jamais.

---

### CU-02 — Tri assisté d'une tâche (questionnaire cognitif)

**Persona concerné :** P1, P2, P3
**Déclencheur :** L'utilisateur a des tâches dans l'inbox et lance le tri (guidé par l'onboarding la première fois, par choix ensuite).
**Objectif utilisateur :** Classer une tâche dans le bon quadrant sans avoir à y réfléchir seul.
**Critère de succès :** La tâche atterrit dans un quadrant, l'utilisateur comprend pourquoi, il passe à la suivante.

**Scénario nominal (happy path) :**
1. Camille sélectionne une tâche dans l'inbox (ou le flow les présente une par une)
2. Le questionnaire démarre — Flux 1 (Projection de conséquences) : "Si tu ne fais pas ça cette semaine, que se passe-t-il concrètement ?"
3. Selon la réponse → aiguillage vers le flux approprié (2, 3 ou 4)
4. 2-4 questions au total, <60 secondes
5. Résultat : la tâche est placée dans un quadrant avec un label izh
6. Camille voit la tâche apparaître dans le backlog → sentiment de progression
7. La tâche suivante de l'inbox se présente

**Variantes & edge cases :**
- L'utilisateur hésite à chaque question → les questions de rebond rattrapent, pas de cul-de-sac
- L'utilisateur n'est pas d'accord avec le classement → reclassement manuel par drag & drop dans le backlog
- L'utilisateur veut trier 20 tâches d'affilée → le flow reste fluide, progression visible ("12/20 triées")
- L'utilisateur quitte en plein tri → la tâche reste dans l'inbox, rien n'est perdu

**Fréquence d'usage :** Plusieurs fois par session, à chaque usage.
**Criticité :** Critique — c'est le différenciateur d'izh.

---

### CU-03 — Tri manuel (classement direct)

**Persona concerné :** P1 (habituée), P3 (veut aller vite)
**Déclencheur :** L'utilisateur sait déjà dans quel quadrant va sa tâche, il ne veut pas passer par le questionnaire.
**Objectif utilisateur :** Classer une tâche rapidement en choisissant directement le quadrant.
**Critère de succès :** La tâche est dans le bon quadrant en <10 secondes.

**Scénario nominal (happy path) :**
1. David voit "Approuver 8 demandes de congés" dans son inbox
2. Il clique sur le bouton de tri de la tâche
3. L'écran de choix s'affiche : questionnaire assisté ou classement manuel
4. Il choisit "manuel" → les 4 quadrants s'affichent avec leurs labels izh
5. Il sélectionne le quadrant correspondant → la tâche est classée dans le backlog
6. Il passe à la tâche suivante

**Variantes & edge cases :**
- L'utilisateur hésite entre deux quadrants → il peut basculer vers le tri assisté depuis le même écran
- L'utilisateur habitué enchaîne les tris manuels → le flow doit rester rapide sans obliger à repasser par le choix questionnaire/manuel à chaque tâche (à valider en test)

**Fréquence d'usage :** Régulier, surtout chez les utilisateurs expérimentés.
**Criticité :** Moyenne — le tri assisté est le parcours principal, celui-ci est un raccourci.

---

### CU-04 — Sélection des tâches actives (backlog → matrice)

**Persona concerné :** P1, P2, P3
**Déclencheur :** Le backlog contient des tâches triées, l'utilisateur veut décider quoi faire maintenant.
**Objectif utilisateur :** Choisir les tâches à traiter activement (max 4 par quadrant).
**Critère de succès :** La matrice contient les tâches sur lesquelles l'utilisateur va agir, il sait quoi faire ensuite.

**Scénario nominal (happy path) :**
1. Camille ouvre le backlog, voit ses tâches classées par quadrant
2. Sur la tâche "Finir maquettes client Leroy", elle clique sur le bouton d'activation (mise en matrice)
3. La tâche passe dans la matrice — feedback visuel de confirmation
4. Elle active 2-3 autres tâches depuis le backlog
5. Elle consulte la matrice → vue claire de sa journée/semaine
6. Elle commence par la première tâche

**Variantes & edge cases :**
- Un quadrant de la matrice est déjà plein (4 tâches) → le bouton d'activation est désactivé ou feedback : "Complète ou remets une tâche au backlog pour faire de la place"
- L'utilisateur veut reclasser entre quadrants dans la matrice → interdit, feedback pédagogique (toast : "Dans la matrice, tu agis. Pour reclasser, remets-la d'abord dans le backlog."), la tâche revient en place
- L'utilisateur veut remettre une tâche de la matrice au backlog → drag vers zone backlog ou geste explicite, retour au même quadrant

**Fréquence d'usage :** Hebdomadaire (lundi matin ou dimanche soir typiquement).
**Criticité :** Critique — c'est le passage de "j'ai trié" à "j'agis".

---

### CU-05 — Brain dump de suivi (sessions suivantes)

**Persona concerné :** P1, P2, P3
**Déclencheur :** De nouvelles tâches arrivent dans la tête de l'utilisateur au fil de la semaine.
**Objectif utilisateur :** Capturer rapidement 1-5 tâches sans interrompre ce qu'il fait.
**Critère de succès :** La tâche est dans l'inbox en <10 secondes, l'utilisateur retourne à son activité.

**Scénario nominal (happy path) :**
1. Lucas est en cours, le prof mentionne un exercice à rendre
2. Il sort son téléphone, tape sur le bouton flottant
3. Il tape "Exo macro chapitre 7 pour vendredi" → valide
4. Il range son téléphone — 8 secondes

**Variantes & edge cases :**
- L'utilisateur est sur un autre écran (backlog, matrice) → le bouton flottant est accessible partout
- L'utilisateur veut dump 5 tâches d'affilée en mouvement → le flow continu fonctionne comme CU-01

**Fréquence d'usage :** Quotidien, plusieurs fois par jour.
**Criticité :** Critique — si la capture est trop lente, l'utilisateur retourne aux notes du téléphone.

---

### CU-06 — Purge du backlog

**Persona concerné :** P1, P3
**Déclencheur :** Le backlog approche les 40 tâches, ou l'utilisateur sent qu'il y a du bruit.
**Objectif utilisateur :** Éliminer les tâches obsolètes ou non pertinentes pour garder le backlog actionnable.
**Critère de succès :** Le backlog est sous les 40, l'utilisateur sent qu'il ne reste que du pertinent.

**Scénario nominal (happy path) :**
1. Camille voit un nudge doux : "Ton backlog a 37 tâches. Un petit tri ?"
2. Elle entre dans le mode purge
3. Le questionnaire lui présente les tâches les plus anciennes : "Cette tâche est là depuis 3 semaines. Elle compte toujours ?"
4. Elle archive ou supprime 8 tâches
5. Backlog à 29 — sentiment de légèreté

**Variantes & edge cases :**
- L'utilisateur ignore le nudge → pas de blocage, pas de relance agressive
- L'utilisateur veut purger manuellement sans questionnaire → purge libre à tout moment
- Le backlog atteint 40 → blocage côté backlog uniquement, l'inbox reste illimitée

**Fréquence d'usage :** Mensuel ou quand la limite approche.
**Criticité :** Moyenne — important pour la rétention long terme.

---

### CU-07 — Complétion d'une tâche

**Persona concerné :** P1, P2, P3
**Déclencheur :** L'utilisateur a accompli une tâche dans la vraie vie.
**Objectif utilisateur :** Marquer la tâche comme faite et passer à la suivante.
**Critère de succès :** La tâche disparaît de la matrice, feedback discret, l'espace libéré est visible.

**Scénario nominal (happy path) :**
1. Camille a fini les maquettes Leroy
2. Elle ouvre la matrice, coche "Finir maquettes client Leroy"
3. Animation subtile de complétion — la tâche est archivée
4. Un emplacement se libère dans le quadrant → elle peut y mettre une tâche du backlog

**Variantes & edge cases :**
- L'utilisateur veut compléter depuis la Réserve → pas possible, il doit d'abord activer la tâche dans le Focus. La Réserve est l'espace d'organisation, le Focus est l'espace d'action.
- L'utilisateur veut annuler une complétion (erreur de tap) → undo temporaire (toast "Annuler" pendant 5 secondes)

**Fréquence d'usage :** Quotidien.
**Criticité :** Moyenne — simple mais le feedback doit renforcer l'habitude.

---

## Matrice personas × cas d'usage

| | CU-01 Brain dump initial | CU-02 Tri assisté | CU-03 Tri manuel | CU-04 Backlog → Matrice | CU-05 Dump suivi | CU-06 Purge | CU-07 Complétion |
|---|---|---|---|---|---|---|---|
| **P1 — Camille** | ✅ Primaire | ✅ Primaire | ✅ Primaire | ✅ Primaire | ✅ Primaire | ✅ Primaire | ✅ Primaire |
| **P2 — Lucas** | ✅ Primaire | ✅ Primaire | ⚠️ Secondaire | ✅ Primaire | ✅ Primaire | ⚠️ Secondaire | ✅ Primaire |
| **P3 — David** | ✅ Primaire | ✅ Primaire | ✅ Primaire | ✅ Primaire | ✅ Primaire | ✅ Primaire | ✅ Primaire |

**Lecture :** Lucas est secondaire sur le tri manuel (il n'a pas encore les réflexes pour classer seul) et la purge (son backlog bouge trop vite avec les deadlines académiques pour s'accumuler à 40).

---

## Hypothèses à valider (Lean UX)

| # | Hypothèse | Méthode de validation | Priorité |
|---|---|---|---|
| H1 | Camille utilise izh principalement le soir après 21h (créneau calme) | Analytics localStorage (timestamps d'usage) | Haute |
| H2 | Lucas utilise izh principalement sur mobile, sessions <5 minutes | Analytics localStorage (device + durée session) | Haute |
| H3 | Le tri assisté est utilisé plus que le tri manuel lors des 2 premières semaines | Analytics localStorage (classification_method) | Haute |
| H4 | Les utilisateurs trient >80% de l'inbox en <48h | Analytics localStorage (created_at vs classified_at) | Haute |
| H5 | David accepte de mélanger tâches pro et perso sans catégorisation | Entretien qualitatif post-test | Moyenne |
| H6 | Le brain dump initial dépasse 5 tâches par session chez les 3 profils | Analytics localStorage (compteur par session) | Moyenne |
| H7 | La limite de 40 tâches au backlog est perçue comme une aide, pas une contrainte | Micro-survey + entretien qualitatif | Moyenne |
| H8 | Le wording du questionnaire cognitif fonctionne pour les 3 profils sans adaptation | Test utilisateur A/B sur le wording | Haute |
| H9 | Lucas ne perçoit pas izh comme un outil "pour adultes organisés" | Entretien qualitatif post-test | Moyenne |

---

*Template BMAD-UX v1.0 — basé sur Nogier (Personas, Customer Journey), Lean UX (proto-personas, hypothèses)*
