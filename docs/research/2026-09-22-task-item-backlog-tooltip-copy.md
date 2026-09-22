# Copy UX — infobulle « Activer » indisponible

**Question.** Quel libellé concis rend le blocage d'activation d'une tâche de Réserve plus compréhensible quand le quadrant Focus cible est plein ?

**Méthode.** Lecture des sources de première partie du projet (spécifications, code et tests), complétée par le [pattern Tooltip du W3C WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) pour les contraintes du composant. Cette note ne modifie pas le code produit.

## Ce que le message doit expliquer

Le système bloque bien l'action lorsque le quadrant cible contient déjà quatre tâches actives : `isFocusFull` désactive le bouton « Activer » à partir de `MAX_FOCUS_PER_QUADRANT = 4`. [Source : `src/features/backlog/TaskItemBacklog.tsx`, lignes 24–34 et 90–109.](../../src/features/backlog/TaskItemBacklog.tsx) [Source : `src/lib/constants.ts`, lignes 1–3.](../../src/lib/constants.ts)

Le besoin produit dépasse cependant le simple constat de saturation : le flux prévoit de **compléter** une tâche dans Focus ou de la **remettre à la Réserve** pour faire de la place. [Source : `docs/ux/03-architecture-information-flows.md`, lignes 899–909.](../ux/03-architecture-information-flows.md) Le texte actuel — « Focus plein pour ce quadrant (4/4) » — nomme correctement la cause et la capacité, mais n'indique pas cette prochaine étape. Il est également le texte d'accessibilité qui remplace le libellé visible « Activer » sur le bouton désactivé. [Source : `src/features/backlog/TaskItemBacklog.tsx`, lignes 90–108.](../../src/features/backlog/TaskItemBacklog.tsx)

La recommandation doit rester une infobulle plutôt qu'un paragraphe persistant : le design impose une row Réserve compacte sur une ligne et prescrit explicitement un tooltip expliquant le motif de l'état disabled. [Source : `docs/ux/06-specifications-composants.md`, lignes 305–313, 360–369 et 385–400.](../ux/06-specifications-composants.md) L'acceptance criterion prévoit déjà « un message adjacent ou tooltip » avec le message actuel. [Source : `docs/bmad/epics.md`, lignes 720–735.](../bmad/epics.md)

## Variantes évaluées

| Variante | Apport | Limite |
| --- | --- | --- |
| « Focus plein (4/4). Termine ou remets une tâche en Réserve pour libérer une place. » | Très compacte, associe cause et issue. | « une tâche » ne précise pas qu'elle vient du Focus. |
| **« Ce quadrant Focus est plein (4/4). Termine une tâche ou remets-en une à la Réserve pour libérer une place. »** | Cause, limite, deux moyens cohérents avec le flux et résultat attendu ; ton factuel et non culpabilisant. | Un peu plus longue, mais reste adaptée à une infobulle. |
| « Ce quadrant contient déjà 4 tâches actives. Termine-en une ou remets-en une à la Réserve. » | Langage concret, évite le mot « plein ». | Le lien avec le bouton et la limite est moins immédiat. |
| « Impossible d'activer cette tâche : le quadrant Focus est plein (4/4). Termine ou remets une tâche en Réserve. » | Énonce l'effet sur l'action très explicitement. | La formulation négative est plus sèche et plus lourde. |

## Recommandation

Utiliser : **« Ce quadrant Focus est plein (4/4). Termine une tâche ou remets-en une à la Réserve pour libérer une place. »**

Elle répond dans l'ordre au modèle mental au moment du clic : **où est le problème** (ce quadrant Focus), **pourquoi l'action est bloquée** (4/4), puis **comment le résoudre** (compléter ou renvoyer une tâche). Elle reprend les verbes déjà employés par les spécifications (« complète », « remets-en une à la Réserve »), sans introduire une action qui n'existe pas. [Source : `docs/ux/03-architecture-information-flows.md`, lignes 883–885 et 899–909.](../ux/03-architecture-information-flows.md)

Conserver « Activer [titre de la tâche] » comme nom accessible du bouton quand celui-ci est disponible. Le motif du blocage doit être une **description** associée au déclencheur de l'infobulle, pas un remplacement de ce nom : les recommandations W3C distinguent un nom bref (le but du contrôle) d'une description qui porte l'information complémentaire, et déconseillent de remplacer le texte visible d'un bouton par `aria-label`. [Source : W3C, [Providing Accessible Names and Descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/).]

## Contraintes d'accessibilité à conserver

- Une infobulle standard apparaît au survol ou quand son déclencheur reçoit le focus, se ferme avec `Escape` et ne reçoit pas elle-même le focus ; son conteneur porte `role="tooltip"` et le déclencheur le référence avec `aria-describedby`. [Source : W3C, [Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/).]
- Le bouton actuel est nativement `disabled` et ses styles lui enlèvent les événements pointeur (`pointer-events: none`), donc il ne peut pas, seul, déclencher une infobulle au clavier ou à la souris. Prévoir un wrapper déclencheur focusable et utilisable au pointeur ; sur tactile, un tap doit afficher/masquer l'explication. [Source : `src/shared/Button/Button.tsx`, lignes 35–52.](../../src/shared/Button/Button.tsx) [Source : `src/styles/components/button.css`, lignes 38–43.](../../src/styles/components/button.css)
- Ne pas mettre de lien ni de bouton dans l'infobulle : le pattern W3C la définit comme non focusable. Si l'on souhaite amener directement vers Focus, ce serait un autre composant (p. ex. popover/dialog) et une décision de parcours distincte. [Source : W3C, [Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/).]

## Vérification à ajouter lors de l'implémentation

Vérifier que le texte recommandé est exposé comme description du déclencheur, que le bouton reste disabled à 4/4, et que l'infobulle est utilisable au clavier, à la souris et au tactile. Le test actuel vérifie uniquement le texte dans le DOM et le bouton disabled. [Source : `src/features/backlog/TaskItemBacklog.test.tsx`, lignes 78–100.](../../src/features/backlog/TaskItemBacklog.test.tsx)
