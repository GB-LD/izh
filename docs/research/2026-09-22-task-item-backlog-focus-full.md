# Diagnostic UI — message « Focus plein » dans une tâche de Réserve

**Question.** Pourquoi le message rendu par `task-item-backlog__full` paraît-il mal placé dans `reserve-task-item task-item task-item-backlog`, et quelle correction privilégier ?

**Méthode.** Lecture des sources de première partie du projet : composant React, feuilles de style, tests et spécifications UX. Aucun code produit n'a été modifié par cette recherche.

## Constat

Le message est techniquement présent lorsque le quadrant Focus atteint sa limite : le composant calcule `isFocusFull`, désactive le bouton, puis rend un paragraphe frère du titre, de l'action de suppression et du bouton « Activer ». [Source : `src/features/backlog/TaskItemBacklog.tsx`, lignes 24–34 et 75–110.](../../src/features/backlog/TaskItemBacklog.tsx)

Ce choix de structure explique son aspect de contenu « détaché » : le conteneur est une ligne flex (`.task-item`) avec un `gap`, tandis que la variante backlog active le retour à la ligne. [Source : `src/styles/components/task-item-inbox.css`, lignes 2–10.](../../src/styles/components/task-item-inbox.css) [Source : `src/styles/components/task-item-backlog.css`, lignes 6–14.](../../src/styles/components/task-item-backlog.css) Le paragraphe reçoit `flex-basis: 100%`; il force donc une seconde ligne pleine largeur, alignée au début de l'item, plutôt que d'être spatialement rattaché au bouton désactivé. [Source : `src/styles/components/task-item-backlog.css`, lignes 39–44.](../../src/styles/components/task-item-backlog.css)

Deux effets renforcent le problème :

- La variante backlog remet le padding de l'item à `0`, et le message n'a qu'une marge basse. Il n'a donc ni retrait propre ni conteneur visuel qui le relie à l'action. [Source : `src/styles/components/task-item-backlog.css`, lignes 6–14 et 39–44.](../../src/styles/components/task-item-backlog.css)
- Le message occupe une ligne de liste supplémentaire, alors que le design de référence décrit l'item Réserve comme une **row** compacte, avec titre extensible et action à droite; les tokens de ce mode prévoient une hauteur fixe de 40 px et un padding horizontal. Les règles d'usage excluent explicitement une card multi-ligne (« une tâche = une ligne »). [Source : `docs/ux/06-specifications-composants.md`, lignes 305–337 et 385–397.](../ux/06-specifications-composants.md)

Le message répond bien au besoin fonctionnel : FR30 impose de bloquer l'activation quand le quadrant Focus cible est plein. [Source : `docs/bmad/prd.md`, lignes 395–402.](../bmad/prd.md) Mais la spécification de composants indique précisément que l'état disabled doit expliquer **pourquoi via un tooltip**; le ticket autorise aussi « un message adjacent ou tooltip ». [Source : `docs/ux/06-specifications-composants.md`, lignes 360–369.](../ux/06-specifications-composants.md) [Source : `docs/bmad/epics.md`, lignes 732–735.](../bmad/epics.md)

Enfin, les tests confirment l'existence du texte dans le DOM, mais ne testent ni son ancrage visuel au contrôle désactivé, ni son comportement clavier/mobile. [Source : `src/features/backlog/TaskItemBacklog.test.tsx`, lignes 78–100.](../../src/features/backlog/TaskItemBacklog.test.tsx)

## Recommandation

**Option privilégiée — conserver une row à une ligne et remplacer le paragraphe par une infobulle contextuelle.**

Associer le texte « Focus plein pour ce quadrant (4/4) » au contrôle « Activer » comme infobulle non native (visible au survol, au focus et au toucher), déclenchée par un wrapper autour du bouton désactivé. Cela suit la spécification disabled, maintient le message au point de décision et préserve la densité annoncée pour les listes de la Réserve. Le wrapper est nécessaire : un bouton HTML `disabled` ne reçoit ni focus ni événements pointeur dans l'implémentation actuelle (`.btn:disabled` applique aussi `pointer-events: none`). [Source : `src/styles/components/button.css`, lignes 38–43.](../../src/styles/components/button.css)

Critères d'implémentation proposés :

1. Retirer le `<p className="task-item-backlog__full">` en tant que frère de la ligne et son `flex-basis: 100%`.
2. Rendre l'explication à proximité immédiate du CTA désactivé, avec une zone déclencheuse utilisable au pointeur, au clavier et au toucher; lier texte et déclencheur avec `aria-describedby` lorsque celui-ci peut recevoir le focus.
3. Ne pas rendre le message visible par défaut dans chaque ligne bloquée; préserver le scan rapide de la Réserve, dont les tâches constituent la priorité visuelle principale. [Source : `docs/ux/04a-wireframe-architecture.md`, lignes 296–303.](../ux/04a-wireframe-architecture.md)
4. Ajouter des tests pour l'ouverture de l'infobulle et la disponibilité du libellé; conserver le test de blocage fonctionnel.

**Alternative si l'explication doit rester toujours visible.**

Créer un bloc `task-item-backlog__activation` qui contient le bouton et un court statut (« Focus plein · 4/4 »), aligné à droite et sous le CTA. Le titre reste dans la première colonne; le statut n'est plus une ligne pleine largeur. Cette variante est plus explicite sur mobile, mais augmente la hauteur de chaque tâche bloquée et s'écarte du modèle row compact. Elle ne devrait être choisie que si des retours utilisateurs montrent que l'infobulle est peu découverte.

## Décision suggérée

Commencer par l'infobulle contextuelle : elle est la solution explicitement décrite par le système de composants et corrige à la fois le placement et la densité. Ne retenir le statut visible sous le CTA qu'en cas de besoin d'explication persistante validé par test utilisateur.
