# ERRORS.md — Journal des bugs et erreurs

Format :
```
## [YYYY-MM-DD] Titre court
**Symptôme :** Ce qui s'observe
**Cause :** Ce qui en est la cause
**Fix :** Ce qui a été fait
**Statut :** Résolu / En cours / Ignoré
```

---

## [2026-06-19] WorkflowSteps — désynchronisation ligne / allumage du cercle (composant remplacé depuis par WorkflowStepper)

**Symptôme :** Dans la section PrototypesSection, la ligne colorée finit de parcourir le connecteur entre deux étapes, mais le cercle de destination ne s'allume pas exactement au même moment. Légère avance ou retard visible.

**Cause :** Le cycle était piloté par `setInterval(fn, STEP_DURATION)` et l'animation CSS/Framer Motion par `transition={{ duration: STEP_DURATION / 1000 }}`. Les deux timers sont indépendants : JS timers et requestAnimationFrame ne se terminent pas sur la même frame. Écart typique de 5 à 50ms, visible à l'oeil.

**Fix :** Remplacement de `setInterval` par `onAnimationComplete` sur le `motion.span` du connecteur actif. Le changement d'état (`setActiveIndex`) est déclenché par Framer Motion exactement quand l'animation de la ligne se termine. Garde anti-stale-closure via la forme fonctionnelle de `setActiveIndex` : `prev => i === prev ? prev+1 : prev`.

**Statut :** Résolu ✓

## [2026-09-30] Hero mobile — texte et boutons collés au bord droit

**Symptôme :** Sur mobile (390 px), le paragraphe et les CTA du hero débordaient jusqu'au bord droit. Le contrôle `scrollWidth` ne détectait rien car la section est en `overflow-hidden`.
**Cause :** Les lignes `whitespace-nowrap` du journal de FlowVisual élargissaient la piste de grille (`1fr` a une largeur minimale `auto`).
**Fix :** Pistes `grid-cols-[minmax(0,1fr)]` (hero et section Usages). Règle ajoutée dans CLAUDE.md.
**Statut :** Résolu ✓

## [2026-09-30] BlurText — mots en dégradé non appliqués

**Symptôme :** « production, », « maintenance. », « déjà. » restaient blancs dans les titres.
**Cause :** Seul le mot du titre était nettoyé de sa ponctuation ; la liste `highlight` la gardait, donc aucune correspondance.
**Fix :** Normalisation des deux côtés via `bare()`.
**Statut :** Résolu ✓

## [2026-09-29] Logos Surfe / Lemlist cassés

**Symptôme :** Images vides dans les scénarios (aussi en production avant refonte).
**Cause :** `cdn.brandfetch.io` renvoie une page HTML sans référent valide (hotlink bloqué).
**Fix :** Monogrammes générés par `ToolIcon` ; les autres logos sont servis depuis `public/logos`.
**Statut :** Résolu ✓

---

## Template

## [YYYY-MM-DD] Titre de l'erreur
**Symptôme :** Description de ce qu'on voit (message d'erreur, comportement inattendu…)
**Cause :** Explication de la cause racine
**Fix :** Ce qui a été modifié
**Statut :** Résolu ✓ / En cours / Won't fix
