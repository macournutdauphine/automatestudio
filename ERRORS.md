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

## [2026-06-19] WorkflowSteps — désynchronisation ligne / allumage du cercle

**Symptôme :** Dans la section PrototypesSection, la ligne colorée finit de parcourir le connecteur entre deux étapes, mais le cercle de destination ne s'allume pas exactement au même moment. Légère avance ou retard visible.

**Cause :** Le cycle était piloté par `setInterval(fn, STEP_DURATION)` et l'animation CSS/Framer Motion par `transition={{ duration: STEP_DURATION / 1000 }}`. Les deux timers sont indépendants : JS timers et requestAnimationFrame ne se terminent pas sur la même frame. Écart typique de 5 à 50ms, visible à l'oeil.

**Fix :** Remplacement de `setInterval` par `onAnimationComplete` sur le `motion.span` du connecteur actif. Le changement d'état (`setActiveIndex`) est déclenché par Framer Motion exactement quand l'animation de la ligne se termine. Garde anti-stale-closure via la forme fonctionnelle de `setActiveIndex` : `prev => i === prev ? prev+1 : prev`.

**Statut :** Résolu ✓

---

## Template

## [YYYY-MM-DD] Titre de l'erreur
**Symptôme :** Description de ce qu'on voit (message d'erreur, comportement inattendu…)
**Cause :** Explication de la cause racine
**Fix :** Ce qui a été modifié
**Statut :** Résolu ✓ / En cours / Won't fix
