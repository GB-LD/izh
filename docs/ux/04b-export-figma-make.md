# Export Figma Make — izh

> **Usage :** Copier-coller chaque prompt dans Figma Make (TC-EBC) pour générer les wireframes basse fidélité. Un prompt par écran. Chaque prompt est auto-suffisant.

**Généré depuis :** 04b-wireframe-semantic.md (v0.1)
**Date :** 2026-03-04

---

## SCR-01 — Inbox

**Task:** Créer un wireframe basse fidélité de l'écran Inbox — l'espace de capture et de déchargement mental où l'utilisateur voit ses tâches non triées et peut lancer le tri.

**Context:** Écran principal pour Camille (P1, surcharge cognitive, une main, mobile-first), Lucas (P2, TDAH, capture impulsive) et David (P3, expert en productivité). Flow FLOW-01 (premier lancement), FLOW-02 (tri assisté), FLOW-03 (tri direct), FLOW-05 (capture). Layout stacked (liste verticale pleine largeur).

**Elements:**

- **Header (sticky, 64px)** :
  - Titre H1 "Inbox"
  - Compteur contextuel "[N] tâches à trier" (badge textuel sous le titre)
- **Zone principale — Liste de tâches** :
  - Liste verticale scrollable
  - Chaque item : titre de la tâche (texte) + bouton "Trier" aligné à droite (secondary)
  - Long press sur le titre → édition inline
- **État vide — 1er lancement** :
  - Message centré verticalement : "Qu'est-ce qui te trotte dans la tête ?"
  - Pas de CTA textuel — le FAB animé en dessous est le guide
- **État vide — inbox triée** :
  - Message positif centré : "Tout est trié"
  - Lien : "Voir ton backlog" → navigation
- **FAB (floating, bas-droite)** :
  - Bouton "+" circulaire, au-dessus de la bottom nav
  - Animation pulse au 1er lancement uniquement
- **Bottom nav (sticky, 56px)** :
  - 4 items : Inbox (actif, highlight + label), Backlog, Matrice, Archive
  - Badge compteur sur Inbox quand actif (redondant avec header mais convention)

**Behavior:**

- Scroll vertical illimité, header sticky, FAB et bottom nav toujours visibles
- Tap FAB → ouvre champ de saisie rapide, focus automatique
- Tap "Trier" → ouvre overlay de tri (bottom sheet slide up)
- Long press titre (~500ms) → vibration haptique + titre éditable inline
- Nudge onboarding : après 5s d'inactivité post-ajout, surbrillance du bouton "Trier" sur la 1ère tâche (disparaît au tap)
- État vide 1er lancement : message + FAB animé (pulse)
- État vide inbox triée : message positif + lien backlog
- Loading : 5 skeleton placeholders
- Responsive desktop : contenu centré max-width 600px, sidebar de navigation à gauche (240px)
- Responsive tablette : pleine largeur

**Constraints:**

- Wireframe basse fidélité — nuances de gris uniquement, pas de couleurs finales, pas de typographie finale
- Breakpoints : mobile < 768px, tablet 768-1279px, desktop ≥ 1280px
- Zones tactiles minimum 44×44px
- Le FAB ne doit jamais chevaucher le dernier item de la liste
- Pattern F de lecture (scan vertical)

---

## SCR-02 — Overlay de tri

**Task:** Créer un wireframe basse fidélité de l'overlay de tri — bottom sheet partiel ~75% avec fond assombri qui permet de classer une tâche par quadrant (tri direct) ou de lancer le questionnaire cognitif (tri assisté). C'est le carrefour décisionnel central d'izh.

**Context:** Overlay pour Camille (P1, besoin de guidage), Lucas (P2, décisions rapides) et David (P3, tri direct expert). Flow FLOW-02 (tri assisté) et FLOW-03 (tri direct). Surface : bottom sheet partiel ~75% avec handle et fond assombri fort (opacité ~70-80%), la bottom nav est masquée par le backdrop (DT-02).

**Elements:**

- **Handle (top)** :
  - Barre horizontale centrée — affordance de swipe down pour fermer
- **Titre de la tâche (sticky, top)** :
  - H2 affichant le titre de la tâche en cours de tri
  - Toujours visible, ancrage contextuel permanent
- **Bouton fermer (top-right)** :
  - Icône ✕, discret
  - Retour inbox, tâche intacte
- **Bouton assisté (centre, pleine largeur, EN PREMIER)** :
  - "Aide-moi à décider" — bouton filled, large, proéminent
  - Position haute = première chose vue = parcours par défaut
  - Pulse léger au 1er tri (onboarding)
  - Le but est que l'utilisateur fasse le questionnaire
- **Ligne de quadrants (sous le bouton assisté)** :
  - 4 boutons sur UNE SEULE LIGNE horizontale
  - Chaque bouton : outline/discret, même hauteur que le bouton assisté
  - Labels Réserve (descriptifs) : "Crit." "Ess." "F.urg." "Opt."
  - Labels complets au tap long ou en tooltip : "Critique", "Essentiel", "Fausse urgence", "Optionnel"
  - Visuellement secondaires (outline vs filled) — raccourci pour les experts

**Behavior:**

- Ouverture : slide up depuis le bas (~300ms), le backdrop s'assombrit simultanément, la bottom nav est masquée
- Swipe down sur handle → ferme l'overlay, backdrop disparaît, tâche intacte dans l'inbox, bottom nav réapparaît
- Tap ✕ → même effet que swipe down
- Tap sur un quadrant → classement immédiat, pas de confirmation, transition vers SCR-05
- Tap "Aide-moi à décider" → transition slide vers questionnaire SCR-03
- Onboarding (1er tri) : le bouton assisté pulse légèrement, disparaît après 1er usage
- Enchaînement rapide : après SCR-05 "Tâche suivante", l'overlay reste ouvert, seul le titre change
- Responsive desktop : modal centrée ~480px, sidebar de navigation visible derrière
- Hiérarchie visuelle : bouton assisté en haut (filled, poids fort), quadrants en ligne dessous (outline, poids faible) — le nudge est architectural
- Layout : bouton assisté pleine largeur + 4 quadrants sur une ligne, même hauteur

**Constraints:**

- Wireframe basse fidélité — nuances de gris, poids visuel différencié entre outline et filled
- Breakpoints : mobile < 768px, tablet 768-1279px, desktop ≥ 1280px
- Les 4 boutons de quadrant sur une seule ligne — labels abrégés si nécessaire sur mobile
- Même hauteur pour le bouton assisté et les boutons de quadrant
- Zones tactiles minimum 44×44px
- Le handle doit être clairement visible comme affordance de fermeture

---

## SCR-03 — Questionnaire cognitif

**Task:** Créer un wireframe basse fidélité du questionnaire cognitif — flow multi-questions qui guide l'utilisateur vers le bon quadrant via des questions émotionnelles (Système 1). Une question par écran, transitions fluides.

**Context:** Overlay (hérité de SCR-02) pour Camille (P1, fatiguée, une main), Lucas (P2, impulsif), David (P3, auto-évaluation rapide). Flow FLOW-02. 4 flux possibles (projection, ancrage, audit stress, test du regret), 1-4 questions par flux. Surface : même overlay ~75% que SCR-02.

**Elements:**

- **Titre de la tâche (sticky, top)** :
  - H2 identique à SCR-02, ancrage permanent
- **Micro-texte (au-dessus de la question, 1ère fois uniquement)** :
  - "Réponds à l'instinct — il n'y a pas de mauvaise réponse."
  - Texte discret, subtle, affiché une seule fois (flag localStorage)
- **Question (centre vertical)** :
  - H3, une seule question visible
  - Espace autour qui respire — zone de focus naturelle
  - Question d'aiguillage initiale : "Comment tu vis cette tâche en ce moment ?"
- **Réponses (sous la question)** :
  - 2-4 boutons empilés verticalement, pleine largeur
  - Zone de tap large (un seul geste : lire → taper)
  - Réponses en langage émotionnel court (Système 1)
  - Aiguillage (4 réponses) :
    - "😬 Je me sens obligé·e de la faire" → Flux 3 (Audit stress)
    - "⏳ C'est important mais je la repousse toujours" → Flux 4 (Test du regret)
    - "🤔 Pas sûr·e que ce soit prioritaire" → Flux 2 (Ancrage objectifs)
    - "🤷 Je sais pas ce qui se passe si je le fais pas" → Flux 1 (Projection conséquences)
  - Les questions de chaque flux suivent l'algorithme complet (cf. `knowledge/Flow de Classification — Matrice Eisenhower.md`) :
    - **Flux 3** : 2-3 questions (obligation externe/interne + rebond + aboutissement)
    - **Flux 4** : 2 questions (pattern de regret + aboutissement)
    - **Flux 2** : 2 questions (alignement priorités + aboutissement). Porte de sortie "Pas de priorités" → Flux 1.
    - **Flux 1** : 1 question à 4 réponses (projection conséquences → aboutissement direct)
- **Indicateur de progression (bas, centre)** :
  - Dots (●○○) — discrets, pas de label "Étape 2/4"
  - 2-5 dots selon la longueur du flux
- **Bouton retour (top-left, absent sur la 1ère question)** :
  - "← Retour" en texte discret
  - Ramène à la question précédente

**Behavior:**

- Tap sur une réponse → slide horizontal vers la droite (question suivante ou SCR-04)
- Tap ← Retour → slide horizontal vers la gauche, réponse précédente pré-sélectionnée visuellement
- ✕ (hérité de l'overlay) → ferme tout, retour inbox, aucune réponse partielle enregistrée
- Micro-texte n'apparaît qu'au 1er tri, jamais ensuite
- Flux 2 → Flux 1 : si "pas de priorités définies", redirection fluide sans message d'erreur
- Timer flow_duration_ms continue pendant le questionnaire
- Responsive desktop : modal centrée ~480px

**Constraints:**

- Wireframe basse fidélité — nuances de gris
- Une seule question visible à la fois — jamais de scroll de questions
- Les réponses doivent être lisibles d'un coup d'œil (3-5 mots max par option)
- Les dots ne doivent pas créer de pression (pas de pourcentage, pas de barre)
- Zone de tap des réponses : minimum 48px de hauteur, pleine largeur

---

## SCR-04 — Confirmation de tri

**Task:** Créer un wireframe basse fidélité de l'écran de confirmation de tri — présente le quadrant proposé par le questionnaire et permet de valider ou de corriger en un geste.

**Context:** Overlay (hérité) pour Camille (P1), Lucas (P2), David (P3). Flow FLOW-02 (suite du questionnaire). Layout centré. Le résultat du questionnaire est mis en avant, la correction est possible mais discrète.

**Elements:**

- **Titre de la tâche (sticky, top)** :
  - H2 identique, ancrage permanent
- **Résultat proposé (centre vertical, visuellement dominant)** :
  - Card avec la couleur du quadrant + label izh
  - Taille dominante, centré — l'œil tombe dessus sans effort
- **Bouton de validation (sous le résultat)** :
  - "Ça me parle" — bouton filled, large, pleine largeur
  - Proximité directe avec le résultat (un seul mouvement de scan vertical)
- **Alternatives (sous le CTA, discrètes)** :
  - Micro-texte : "Pas convaincu·e ?"
  - 3 boutons outline compacts en ligne horizontale
  - Seuls les 3 autres quadrants (le proposé est absent)
- **Compteur de progression (bas)** :
  - Texte discret : "[N]/[Total] triées"

**Behavior:**

- Tap "Ça me parle" → classement avec user_override: false → transition vers SCR-05
- Tap sur une alternative → classement avec user_override: true → transition vers SCR-05
- Donnée analytique : taux de correction (user_override: true) — si >30%, revoir le wording du flux
- Responsive desktop : modal centrée ~480px

**Constraints:**

- Wireframe basse fidélité — le résultat proposé doit être visuellement plus lourd (plus grand, plus de poids) que les alternatives
- Les 3 alternatives ne doivent pas entrer en compétition visuelle avec le CTA
- Zones tactiles minimum 44×44px

---

## SCR-05 — Résultat de tri

**Task:** Créer un wireframe basse fidélité de l'écran de résultat de tri — feedback de succès après classement, avec enchaînement vers la tâche suivante ou le backlog.

**Context:** Overlay (hérité) pour Camille (P1), Lucas (P2), David (P3). Flow FLOW-02 (tri assisté) et FLOW-03 (tri direct). Layout centré. Écran de feedback rapide — l'utilisateur doit pouvoir enchaîner.

**Elements:**

- **Titre de la tâche (sticky, top)** :
  - H2, ancrage permanent
- **Feedback de classement (centre vertical)** :
  - Card quadrant avec couleur + label
  - Animation : scale up + fade in (~300ms)
- **Actions (sous le feedback)** :
  - "Tâche suivante →" — bouton filled, proéminent (primaire)
  - "Voir le backlog" — lien texte ou bouton outline (secondaire)
- **Compteur de progression (bas)** :
  - Texte discret : "[N]/[Total] triées"

**Behavior:**

- Tap "Tâche suivante" → l'overlay reste ouvert, retour à SCR-02 avec le titre de la tâche suivante (pas de fermeture/réouverture)
- Tap "Voir le backlog" → fermeture overlay → navigation SCR-06, tâche classée en highlight temporaire (2-3s)
- Inbox vide → "Tout est trié !" + lien backlog, pas de bouton "Tâche suivante"
- Backlog plein (40/40) → tâche classée mais message : "Fais de la place dans ton backlog" + bouton "Purger" + lien "Revenir à l'inbox"
- Responsive desktop : modal centrée ~480px

**Constraints:**

- Wireframe basse fidélité — nuances de gris
- "Tâche suivante" doit être visuellement dominant par rapport à "Voir le backlog"
- L'animation de feedback doit être représentée (flèche ou annotation)

---

## SCR-06 — Backlog

**Task:** Créer un wireframe basse fidélité du Backlog — espace d'organisation des tâches classées par quadrant Eisenhower, avec accordion, drag & drop inter-quadrant, et gestion de capacité (max 40 tâches).

**Context:** Écran de niveau 1 pour Camille (P1, "j'organise"), Lucas (P2), David (P3, expert, drag & drop). Flow FLOW-04 (activation) et FLOW-06 (purge). Layout accordion strict sur toutes les surfaces (mobile, tablette, desktop) — cohérence cross-device.

**Elements:**

- **Header (sticky, 64px)** :
  - Titre H1 "Backlog"
  - Compteur de capacité "[N]/40" — changement visuel à 35+ (alerte douce) et 40/40 (rouge)
- **Bouton "Faire du tri" (sous le header, permanent, pleine largeur)** :
  - Bouton secondaire (outline), toujours visible
  - Action : navigation SCR-07 (purge)
  - Permet de lancer le tri/purge à tout moment, pas uniquement à 35+
- **Nudge purge (sous le bouton, conditionnel ≥ 35)** :
  - Banner dismissable : "[N]/40 — ton backlog se remplit !"
  - Pas de CTA dans le nudge — le bouton "Faire du tri" est déjà là
- **Section Q1 — "Critique" (ouverte par défaut)** :
  - Header : couleur + label Réserve + compteur "[N]"
  - Liste de tâches : titre + bouton "Activer" (icône, à droite). Pas de checkbox — la complétion se fait dans le Focus.
  - Drag activé (long press)
- **Section Q2 — "Essentiel" (collapsed par défaut)** :
  - Header cliquable : couleur + label Réserve + compteur
  - Zone de drop quand drag actif (surbrillance couleur)
- **Section Q3 — "Fausse urgence" (collapsed par défaut)** :
  - Même pattern que Q2
- **Section Q4 — "Optionnel" (collapsed par défaut, en bas)** :
  - Même pattern que Q2
- **État vide** :
  - "Trie tes premières tâches depuis l'inbox" + lien inbox
- **FAB** : bouton "+" circulaire, bas-droite
- **Bottom nav** : 4 items, Backlog actif, badge inbox

**Behavior:**

- Accordion strict (DT-04) : tap header collapsed → s'ouvre, les autres se ferment. Tap header ouverte → tout collapsed.
- Long press tâche + drag → headers collapsed en surbrillance couleur (zones de drop). Drop sur header = reclassement + toast "Déplacée vers [quadrant]".
- Drag vertical dans section ouverte → réordonnancement intra-quadrant.
- Tap "Activer" → tâche disparaît (animation) → toast "Ajoutée à ta matrice". Grisé si quadrant matrice plein (4/4).
- Swipe gauche → reveal bouton supprimer. Toast undo 5s.
- Long press titre → édition inline (DT-01), vibration haptique.
- Highlight post-tri : tâche classée depuis overlay → highlight 2-3s dans son quadrant.
- Toggle tri discret : "Par date" / "Manuel" (défaut : manuel).
- Nudge purge à 35+ : banner dismissable.
- Plein (40/40) : compteur rouge, ajout depuis inbox bloqué, purge proposée.
- Responsive desktop : même layout accordion que mobile — cohérence cross-device, pas de colonnes.
- Loading : skeleton placeholders.

**Constraints:**

- Wireframe basse fidélité — nuances de gris, différencier les quadrants par des niveaux de gris différents ou des labels
- Breakpoints : mobile < 768px, tablet 768-1279px, desktop ≥ 1280px
- Les headers collapsed doivent être visuellement identifiables comme zones de drop
- Zones tactiles minimum 44×44px
- Maximum ~10 tâches visibles sans scroll dans le quadrant ouvert

---

## SCR-07 — Overlay de purge — Intro

**Task:** Créer un wireframe basse fidélité de l'introduction à la purge — bottom sheet partiel (~75%) avec fond assombri qui invite l'utilisateur à faire du tri dans son backlog, avec deux variantes de ton (nudge vs blocage).

**Context:** Overlay pour Camille (P1, besoin de ménagement) et David (P3, efficacité). Flow FLOW-06 (purge). Surface : bottom sheet partiel ~75% avec fond assombri fort (DT-02). Décision rapide : j'y vais ou pas.

**Elements:**

- **Handle (top)** :
  - Barre horizontale — affordance swipe down (= "Pas maintenant")
- **Illustration (centre-haut)** :
  - Icône 🧹 sobre/décorative
- **Message (centre)** :
  - Titre H2 : variable selon variante
  - Sous-texte : variable selon variante
  - Variante nudge (35+) : "Un peu de tri ?" / "Ton backlog a [N] tâches. On regarde ensemble celles qui traînent depuis un moment ?"
  - Variante blocage (40/40) : "Ton backlog est plein" / "40/40 tâches. Fais de la place pour continuer à trier depuis l'inbox."
- **Actions (bas)** :
  - "C'est parti" — bouton filled, primaire
  - "Pas maintenant" — lien texte, secondaire

**Behavior:**

- Tap "C'est parti" → contenu de l'overlay change (transition slide), même surface ~75% → SCR-08
- Tap "Pas maintenant" → ferme l'overlay, retour backlog
- Swipe down sur handle → même effet que "Pas maintenant"
- Responsive desktop : modal centrée ~400px

**Constraints:**

- Wireframe basse fidélité — nuances de gris
- Le backlog doit être à peine visible derrière le fond assombri (~75% de couverture, backdrop forte opacité)
- Le ton doit transparaître dans la hiérarchie visuelle (bienveillant, pas alarmiste même en blocage)

---

## SCR-08 — Overlay de purge — Questionnaire

**Task:** Créer un wireframe basse fidélité du questionnaire de purge — flow de revue tâche par tâche qui permet de supprimer, garder ou reclasser les tâches anciennes du backlog.

**Context:** Overlay ~75% avec fond assombri pour Camille (P1) et David (P3). Flow FLOW-06 (purge). Tâches présentées par ancienneté décroissante, Q4 d'abord. Flow en 2 questions : Q1 "Elle compte toujours ?" → Q2 "Au bon endroit ?".

**Elements:**

- **En-tête tâche (sticky, top)** :
  - Titre de la tâche
  - Badge quadrant (couleur)
  - Ancienneté : "Là depuis [N] semaines" — nudge discret
- **Question (centre vertical)** :
  - H3, une question à la fois
  - Q1 : "Elle compte toujours ?"
  - Q2 : "Au bon endroit ?"
- **Réponses (sous la question)** :
  - Q1 : 2 boutons pleine largeur — "Oui" / "Non, supprimer"
  - Q2 : quadrant actuel (pré-sélectionné visuellement) + 3 alternatives
- **Compteur de progression (bas, centre)** :
  - "[N]/[Total] tâches revues"
- **Arrêter la purge (bas)** :
  - Lien texte secondaire, toujours visible
  - Changements déjà effectués sont persistés

**Behavior:**

- Tap "Non, supprimer" → suppression immédiate + transition vers tâche suivante
- Tap "Oui" → passe à Q2 (reclassement)
- Tap quadrant en Q2 → reclassement ou conservation → tâche suivante
- Tap "Arrêter la purge" → retour backlog (changements persistés)
- Si toutes les tâches sont revues → transition vers SCR-09 (bilan)
- Si rien à purger : "Ton backlog est bien rangé." + [Retour au backlog]
- Responsive desktop : modal centrée ~480px

**Constraints:**

- Wireframe basse fidélité — nuances de gris
- L'ancienneté doit être visible mais pas anxiogène
- "Non, supprimer" doit être visuellement différencié (destructif mais pas red — juste un poids différent en wireframe)
- Zones tactiles minimum 44×44px

---

## SCR-09 — Overlay de purge — Bilan

**Task:** Créer un wireframe basse fidélité du bilan de purge — écran de récapitulatif rapide (3-5 secondes) qui résume les actions effectuées et le nouveau total du backlog.

**Context:** Overlay (hérité) pour Camille (P1) et David (P3). Flow FLOW-06 (fin de purge). Layout centré, minimaliste. L'écran dure quelques secondes — récap + total + un bouton.

**Elements:**

- **Illustration + titre (centre-haut)** :
  - Icône 🧹 + H2 "Purge terminée"
- **Récapitulatif (centre)** :
  - Liste de chiffres mis en évidence :
    - "[N] tâches revues"
    - "[X] supprimées"
    - "[Y] reclassées"
    - "[Z] gardées"
- **Nouveau total (sous le récap)** :
  - "Backlog : [N]/40" — renforce "j'ai fait de la place"
- **Action (bas)** :
  - "Retour au backlog" — bouton filled, primaire

**Behavior:**

- Tap "Retour au backlog" → ferme l'overlay → SCR-06 mis à jour
- Responsive desktop : modal centrée ~400px

**Constraints:**

- Wireframe basse fidélité — nuances de gris
- Contenu centré, sobre, minimaliste — satisfaction discrète
- Les chiffres doivent être visuellement mis en évidence (taille ou poids)

---

## SCR-10 — Matrice

**Task:** Créer un wireframe basse fidélité de la Matrice — espace d'action avec les tâches activées, affichées par quadrant. Mobile : layout asymétrique (1 quadrant proéminent + 3 mini-cards avec swap). Desktop/tablette : grille 2×2.

**Context:** Écran de niveau 1 pour Camille (P1, "j'agis, par quoi je commence ?"), Lucas (P2), David (P3). Flow FLOW-04 (activation) et FLOW-07 (complétion). Layout mobile : layout asymétrique avec swap (DT-03) — Q1 proéminent par défaut (~55% hauteur) + 3 mini-cards en bas. Tap mini-card = swap. Max 4 tâches par quadrant.

**Elements — Mobile :**

- **Header (sticky, 64px)** :
  - Titre H1 "Matrice"
- **Zone proéminente (~55% hauteur utile, pleine largeur)** :
  - Header : couleur du quadrant + label Focus ("Faire maintenant") + sous-titre contextuel ("Urgent et important — en premier") + compteur "[N]/4"
  - Liste de tâches : max 4 items, chaque item = checkbox (gauche) + titre complet (pas de troncature)
  - Q1 "Faire maintenant" par défaut à chaque entrée sur l'écran
  - État vide : message contextuel ("Rien à faire maintenant — respire." pour Q1, "Active des tâches depuis ton backlog" générique)
- **Grille 2×2 de 4 mini-cards (navigation, sous la zone proéminente, ~25% hauteur)** :
  - Chaque mini-card : couleur + label Focus + compteur "[N]/4". Positions fixes : Q1(haut-gauche), Q2(haut-droite), Q3(bas-gauche), Q4(bas-droite). Mini-card du quadrant actif visuellement marquée.
  - Ordre : Q1→Q2→Q3→Q4 en excluant le quadrant proéminent
  - Tap → swap avec la zone proéminente (crossfade ~200ms)
  - Mini-card vide : compteur "0/4", pas d'aperçu
- **État vide global** :
  - "Active des tâches depuis ton backlog" + lien SCR-06
- **FAB** : bouton "+" circulaire
- **Bottom nav** : 4 items, Matrice actif, badge inbox

**Elements — Desktop/Tablette :**

- **Grille 2×2** :
  - 4 quadrants de taille égale, symétrique
  - Chaque quadrant : label + couleur + max 4 tâches avec checkbox
  - Quadrant vide : zone grisée/atténuée, label lisible
- **Pas de layout asymétrique** (remplacé par la grille)

**Behavior:**

- Mobile : tap mini-card → swap (le quadrant tappé monte en zone proéminente, l'ancien descend), crossfade ~200ms
- Mobile : reset Q1 proéminent à chaque entrée sur l'écran Matrice (pas de mémorisation)
- Tap checkbox → fade out + scale down → toast undo "Tâche complétée — [Annuler]" (5s) → archive
- Long press titre → édition inline (DT-01)
- Desktop : drag tâche vers zone backlog → zone s'illumine → drop = retour même quadrant backlog → toast
- Desktop : drag inter-quadrant dans la grille → INTERDIT → snap-back + toast pédagogique "Dans la matrice, tu agis. Pour reclasser, remets-la d'abord dans le backlog."
- Highlight post-activation : tâches nouvellement activées → highlight temporaire 2-3s
- Micro-survey (SCR-12) peut se déclencher après complétion
- Responsive : mobile = layout asymétrique + swap ; tablette/desktop = grille 2×2

**Constraints:**

- Wireframe basse fidélité — nuances de gris, différencier les quadrants par des labels et des niveaux de gris
- Breakpoints : mobile < 768px, tablet 768-1279px, desktop ≥ 1280px
- Les 4 quadrants desktop doivent être de taille strictement égale (pas de biais de taille)
- La zone proéminente mobile doit être visuellement dominante (~55% de la hauteur utile)
- Les 3 mini-cards doivent être de taille égale entre elles
- Checkbox à gauche du titre (convention to-do list)
- Zones tactiles minimum 44×44px sur les mini-cards
- Maximum 4 tâches par quadrant

---

## SCR-11 — Archive

**Task:** Créer un wireframe basse fidélité de l'Archive — miroir de progression en lecture seule, liste antichronologique des tâches complétées avec badge du quadrant d'origine.

**Context:** Écran de niveau 1 pour Camille (P1, "j'ai accompli"), Lucas (P2), David (P3). Flow FLOW-07 (complétion). Layout stacked (liste verticale). Lecture seule — pas de réactivation, pas de suppression. MVP : pas de filtre ni de recherche.

**Elements:**

- **Header (sticky, 64px)** :
  - Titre H1 "Archive"
  - Compteur total : "[N] tâches complétées"
- **Liste de tâches (scroll vertical)** :
  - Ordre antichronologique (plus récentes en haut)
  - Chaque item :
    - Titre de la tâche (texte)
    - Badge du quadrant d'origine (petit badge coloré — en wireframe : niveaux de gris + label)
    - Date de complétion (texte subtle)
  - Pas de regroupement, pas de sections
- **État vide** :
  - "Tes tâches complétées apparaîtront ici" — ton neutre
- **FAB** : bouton "+" circulaire
- **Bottom nav** : 4 items, Archive actif, badge inbox

**Behavior:**

- Scroll vertical, header sticky, bottom nav fixe
- Aucune interaction sur les items (lecture seule)
- Loading : 5 skeleton placeholders
- Responsive desktop : contenu centré max-width 600px, sidebar de navigation à gauche

**Constraints:**

- Wireframe basse fidélité — nuances de gris
- Breakpoints : mobile < 768px, tablet 768-1279px, desktop ≥ 1280px
- Les items sont strictement en lecture seule — aucun bouton, aucune action
- Le badge quadrant doit être discret mais lisible

---

## SCR-12 — Micro-survey

**Task:** Créer un wireframe basse fidélité du micro-survey — bottom sheet partiel (~30%), non bloquant, qui mesure le sentiment de légèreté mentale via un slider 1-10 avec émojis.

**Context:** Overlay léger pour Camille (P1), Lucas (P2), David (P3). Pas de flow spécifique — se déclenche post-1er tri complet (one-time) ou 1x/semaine après complétion. Jamais au lancement, jamais pendant tri/purge. La bottom nav reste visible. Surface : bottom sheet partiel ~30%, dismissable.

**Elements:**

- **Handle (top)** :
  - Barre horizontale — affordance swipe down (dismiss)
- **Question (centre)** :
  - Texte direct (pas de titre) : "Comment tu te sens par rapport à tes tâches en ce moment ?"
- **Slider (sous la question)** :
  - Slider continu 1-10
  - Émoji 😫 à gauche (1), émoji 😌 à droite (10)
  - Pas de labels intermédiaires, pas de chiffres visibles
- **Bouton envoyer (bas)** :
  - "Envoyer" — bouton filled, primaire

**Behavior:**

- Swipe down sur handle → dismiss sans donnée enregistrée, revient dans 7 jours
- Slide du thumb → valeur suit le doigt
- Tap "Envoyer" → enregistre mental_lightness_score + timestamp + context → bottom sheet disparaît
- Déclencheurs : post-1er tri complet (one-time) OU 1x/semaine (après complétion). Jamais au lancement. Jamais pendant tri/purge.
- Si dismiss : aucune relance, revient dans 7 jours
- Se superpose à n'importe quel écran, la bottom nav reste visible

**Constraints:**

- Wireframe basse fidélité — nuances de gris
- Bottom sheet ~30% de l'écran — la majorité du contenu en dessous reste visible
- Non bloquant — l'utilisateur peut l'ignorer facilement
- Pas de relance si dismiss (respect du consentement)
- Le slider doit être un geste tactile naturel (pas des boutons radio)

---

_Export Figma Make généré depuis BMAD-UX Method v1.2 — Agent 04b_
