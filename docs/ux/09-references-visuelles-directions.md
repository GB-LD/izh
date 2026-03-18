# Références visuelles & Directions explorées — izh

> **Usage agent :** Ce document évite les allers-retours coûteux sur l'ambiance générale. Il aligne l'équipe sur la tonalité attendue avant que l'UI designer ouvre Figma. Présenter plusieurs directions visuelles distinctes avec leurs implications, puis valider une direction avec les parties prenantes avant de passer aux maquettes haute fidélité.

**Version :** v0.1
**Date :** 2026-03-10
**Auteur :** UX Designer (assisté par IA)
**Statut :** Une direction validée

---

## 1. Rappel du brief émotionnel

> _Extrait du livrable 01 — Brief Projet. Récapitule les émotions cibles pour ancrer les décisions visuelles._

| Moment clé                  | Émotion cible                                         | Émotion à éviter                                               |
| --------------------------- | ----------------------------------------------------- | -------------------------------------------------------------- |
| Premier contact (ouverture) | Calme, espace — "c'est vide, c'est prêt pour moi"     | Surcharge visuelle, sensation de "encore un truc à configurer" |
| Brain dump                  | Fluidité, décharge — "ça sort de ma tête sans effort" | Friction, hésitation, sensation de formulaire                  |
| Tri assisté (questionnaire) | Confiance guidée — "l'app m'aide à décider"           | Jugement, sentiment de faire un test                           |
| Découverte de la matrice    | Clarté, soulagement — "je sais où j'en suis"          | Overwhelm, impression que tout est urgent                      |
| Complétion d'une tâche      | Satisfaction discrète — "j'avance"                    | Gamification excessive, récompense infantilisante              |
| Moment d'erreur / blocage   | Bienveillance — "c'est pas grave, on corrige"         | Culpabilité, ton punitif                                       |
| Backlog qui approche les 40 | Nudge doux — "c'est le moment de faire du tri"        | Panique, urgence fabriquée                                     |

**Tonalité générale visée :** Sobre, adulte, bienveillante sans être condescendante. Comme un ami organisé qui t'aide à y voir clair — pas un coach de productivité qui te fait la leçon.

---

## 2. Analyse du paysage concurrentiel

### Référence principale — Notion

**Type :** Référence hors-secteur (outil de productivité, pas de gestion de tâches Eisenhower)

**Ce qui fonctionne :**

- Hiérarchie visuelle claire — fond blanc, espacement généreux, contenu qui respire
- Ton adulte et professionnel sans être froid — les emojis injectent de la personnalité
- Sidebar hiérarchique + contenu centré max-width — navigation intuitive
- Système kanban minimaliste avec cards outline légères
- Contraste serif (titres) / sans-serif (UI) — élégant mais fonctionnel

**Ce qui ne fonctionne pas / opportunité :**

- Notion est un outil _complexe_ avec beaucoup de vues/options — izh doit être _plus simple encore_
- Le côté "blank canvas" peut générer l'anxiété du setup — exactement ce qu'izh doit éviter
- Le kanban Notion n'a pas de guidance — izh guide activement via le questionnaire cognitif
- Pas de flow de tri assisté — c'est le différenciateur d'izh

**Leçon à retenir :** La sobriété et l'espace de Notion sont un standard à reproduire. Le manque de guidance est l'opportunité d'izh.

---

### Tableau de synthèse concurrentielle

| Critère visuel           | Notion                            | Todoist             | Sunsama             | izh (notre cible)                  |
| ------------------------ | --------------------------------- | ------------------- | ------------------- | ---------------------------------- |
| Couleur dominante        | Blanc + brun-noir chaud           | Blanc + rouge       | Blanc + bleu-violet | Blanc + brun-noir chaud (#37352F)  |
| Radius                   | Modéré (4-8px)                    | Modéré (8px)        | Généreux (12px)     | Modéré (4-8px)                     |
| Densité d'information    | Faible-moyenne                    | Moyenne             | Faible              | Faible                             |
| Hiérarchie typographique | Serif titres + sans-serif corps   | Sans-serif uniforme | Sans-serif uniforme | Space Grotesk titres + Inter corps |
| Ton émotionnel           | Sobre, professionnel, accueillant | Fonctionnel, neutre | Calme, premium      | Sobre, bienveillant, adulte        |
| Différenciation mobile   | App native correcte               | Excellente          | Bonne               | Mobile-first, guidage actif        |

---

## 3. Moodboard — Références d'ambiance

### Moodboard "Compagnon Notion" — direction retenue

**Mot-clé :** Sobre · Aéré · Bienveillant

**Références collectées :**
| Source | Chemin | Ce qu'elle capture |
|---|---|---|
| Notion — Desktop app home | `knowledge/inspiration UI/notion ui/screencapture-notion-so-*_26_08.png` | L'espace blanc généreux, la sidebar hiérarchique, le fond #F7F7F5 |
| Notion — Kanban board | `knowledge/inspiration UI/notion ui/desktop (1).png` | Les cards outline légères, le système de colonnes, les badges de statut |
| Notion — Task management | `knowledge/inspiration UI/notion ui/desktop (2).png` | La hiérarchie titre bold + sous-titres, les tags colorés discrets |
| Notion — Search modal | `knowledge/inspiration UI/notion ui/screencapture-notion-so-*_26_59.png` | La command palette épurée, le search-first approach |
| Notion — Team tracker | `knowledge/inspiration UI/notion ui/desktop (4).png` | Les listes minimalistes, les colonnes de statut avec points colorés |
| Notion — Project planner | `knowledge/inspiration UI/notion ui/screencapture-notion-so-*_30_58.png` | La vue table sobre, le cover image comme touche de chaleur |

**Palette extraite :**

- Background : `#FFFFFF` — blanc pur
- Surface : `#F7F7F5` — beige-gris chaud (signature Notion)
- Texte primaire : `#37352F` — brun-noir chaud, pas un noir pur
- Texte secondaire : `#9B9A97` — gris moyen
- Bordures : `#E3E3E0` — gris clair chaud
- Accent : `#2383E2` — bleu Notion pour les CTA

**Typographie retenue :**

- Titres (H1, H2) : **Space Grotesk**, Bold 700, tracking -0.5px
- Corps / UI : **Inter**, Regular-Medium 400-500, 15px, line-height 1.5

**Radius / Style de formes :**
Radius modérés (4-8px sur boutons/inputs, 8px sur cards, 12px sur modales). Conservateur — jamais pill-shaped. Cercles uniquement pour les checkboxes et avatars.

**Implications pour izh :**

- ✅ La sobriété correspond exactement à "calme, espace, prêt pour moi"
- ✅ La faible densité s'aligne avec "moins tu vois, mieux tu agis"
- ✅ Le ton adulte convient à David (P3) sans exclure Lucas (P2)
- ✅ Space Grotesk apporte une identité propre vs le serif Notion
- ❌ Risque de ressembler à "encore un Notion" si les moments signature ne sont pas marqués

---

## 4. Direction visuelle retenue — "Compagnon"

**Résumé en une phrase :** Un ami organisé, pas un outil — la sobriété de Notion avec une touche d'affirmation via Space Grotesk et un guidage actif que Notion n'a jamais offert.

**Palette de couleurs :**

```
Background :     #FFFFFF    /* Blanc pur */
Surface :        #F7F7F5    /* Beige-gris chaud Notion */
Text primary :   #37352F    /* Brun-noir chaud */
Text secondary : #9B9A97    /* Gris moyen */
Text tertiary :  #B4B4B0    /* Gris clair, hints */
Border :         #E3E3E0    /* Séparateurs subtils */
Accent blue :    #2383E2    /* CTA, liens */
Status red :     #EB5757    /* Q1 — Urgent & Important */
Status orange :  #FFA344    /* Q3 — Urgent, pas important */
Status green :   #4DAB9A    /* Complété, validé */
Status yellow :  #DFAB01    /* En cours */
CTA dark :       #37352F    /* Bouton primaire "Aide-moi à décider" */
```

**Typographie :**

- Titres (H1) : Space Grotesk, Bold 700, 34px, tracking -0.5px
- Titres (H2) : Space Grotesk, Bold 700, 20px, tracking -0.3px
- Corps : Inter, Regular 400, 15px, line-height 1.5
- Labels : Inter, Medium 500, 13-14px
- Metadata : Inter, Regular 400, 11-12px

**Radius :**

- Boutons : `4px`
- Cards / Inputs : `8px`
- Tags / Badges : `3px`
- Modales / Bottom sheets : `12-16px`
- Checkboxes : cercle (`50%`)

**Densité :** Faible — beaucoup d'espace blanc. Content max-width ~600px centré. Spacing base 4px.

**Animations :**

- Micro-interactions : 150-200ms, ease-out
- Hover : changement de background-color uniquement, pas de scale
- Transitions de page : aucune (instantané)
- Respects `prefers-reduced-motion`

**Ombres :**

- Au repos : aucune (fond ou bordure fine)
- Hover cards : `0 1px 3px rgba(0,0,0,0.08)`
- Dropdowns : `0 4px 12px rgba(0,0,0,0.12)`
- Modales : `0 8px 24px rgba(0,0,0,0.15)` + overlay `rgba(0,0,0,0.45)`

**Iconographie :**

- Set : Lucide Icons (outline, stroke 1.5px)
- Taille : 22px navigation, 18px inline, 16px actions
- Couleur : `#9B9A97` repos, `#37352F` actif/hover

**Ce que cette direction dit à l'utilisateur :**
"Cet espace est calme, prêt pour toi. Tu n'as rien à configurer. Pose ce que tu as en tête, je t'aide à y voir clair."

**Persona principal aligné :** P1 — Camille (Freelance-Parent). L'interface ne ressemble pas à "encore un outil à gérer". L'espace respire comme son créneau du mardi soir 21h30.

**Risque :** Copier Notion trop fidèlement pourrait manquer de personnalité propre. Les moments signature (questionnaire cognitif, feedback de tri, matrice limitée) doivent être les points de différenciation visuelle.

---

## 5. Matrice de décision

> _Une seule direction explorée en profondeur (approche "Notion-like" validée par l'utilisateur). Pas de matrice comparative nécessaire — la direction a été choisie par conviction et alignement avec le brief._

| Critère                                  | Poids | Score                                                          |
| ---------------------------------------- | ----- | -------------------------------------------------------------- |
| Alignement avec les émotions cibles      | 30%   | 5/5 — calme, espace, bienveillance                             |
| Lisibilité pour P1 (Camille)             | 25%   | 5/5 — zéro friction, interface qui respire                     |
| Différenciation concurrentielle          | 20%   | 3/5 — esthétique proche de Notion, différenciation par le flow |
| Faisabilité technique (React + Tailwind) | 15%   | 5/5 — Inter/Space Grotesk gratuits, Lucide open source         |
| Scalabilité (design system extensible)   | 10%   | 5/5 — palette neutre + accents par quadrant, très extensible   |
| **Score pondéré**                        |       | **4.6/5**                                                      |

---

## 6. Direction retenue

**Direction choisie :** "Compagnon" — Notion-like avec Space Grotesk
**Date de validation :** 2026-03-10
**Validé par :** Fondateur / UX Designer

**Choix clés validés en session :**

- Palette Notion fidèle (blanc, #F7F7F5, #37352F)
- Space Grotesk Bold pour les titres (remplace le Noto Serif initialement proposé — plus de caractère, plus tech-friendly)
- Inter pour le corps et l'UI
- CTA primaire en dark (#37352F) — sobre et affirmé
- Lucide Icons outline

**Éléments écartés :**

- Noto Serif pour les titres — trop "éditorial", pas assez affirmé pour une app de productivité
- Palette colorée (Sunsama-like) — trop de couleur dilue le calme recherché
- Radius pill-shaped — trop "app mobile trendy", pas assez sobre

---

## 7. Moments signature (Kholmatova)

> _2-3 moments où izh exprime sa personnalité distinctive — sans perturber le flux principal._

| Moment                                | Contexte                                                            | Expression visuelle envisagée                                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Premier tri complété                  | L'utilisateur vient de trier sa première tâche via le questionnaire | Animation subtile de la tâche qui glisse vers son quadrant. Toast bienveillant : "Bien joué — une de moins dans la tête."                    |
| Inbox vidée                           | Toutes les tâches du Vrac sont triées                               | Empty state chaleureux avec message "Tout est trié — voir ta Réserve". Moment de soulagement visuel — l'espace vide EST le feedback positif. |
| Matrice remplie pour la première fois | L'utilisateur a activé des tâches depuis la Réserve                 | La matrice apparaît peuplée — moment "clarté". Micro-animation discrète. Message : "Tu sais quoi faire."                                     |

---

## 8. Ressources & assets validés

| Type               | Ressource                                            | Accès                     | Usage autorisé |
| ------------------ | ---------------------------------------------------- | ------------------------- | -------------- |
| Typographie titres | Space Grotesk                                        | Google Fonts (OFL)        | Oui — libre    |
| Typographie corps  | Inter                                                | Google Fonts (OFL)        | Oui — libre    |
| Icônes             | Lucide Icons                                         | ISC License (open source) | Oui — libre    |
| Illustrations      | Aucune pour le MVP                                   | —                         | —              |
| Photos             | Aucune (UI pur)                                      | —                         | —              |
| Couleurs           | Palette définie ci-dessus, formalisée en livrable 05 | —                         | —              |

---

## 9. Lien vers les explorations visuelles

**Fichier .pen :** `docs/izh/UX/09-design-systems-references.pen`

Contient :

- SCR-01 — Vrac (Inbox) — direction Notion-like avec Space Grotesk
- SCR-02 — Overlay de tri — bottom sheet avec quadrants et CTA "Aide-moi à décider"

---

_Template BMAD-UX v1.0 — basé sur Kholmatova (moments signature, patterns perceptuels, purpose comme boussole), Nogier (design émotionnel, expérience utilisateur multidimensionnelle)_
