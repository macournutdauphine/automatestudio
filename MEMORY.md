# MEMORY.md — Automate Studio

Index des décisions, contexte et historique du projet. Limite : < 500 lignes.
Format des entrées : `[YYYY-MM-DD] Catégorie — Fait / Décision`

---

## Décisions d'architecture

- [2026-06-19] Stack — React 18 + TypeScript + Vite + Tailwind + Framer Motion retenu. Pas de Next.js (pas besoin de SSR pour un one-pager statique).
- [2026-06-19] État — Pas de Redux/Zustand. useState local uniquement. Le site est essentiellement statique.
- [2026-06-19] Animations — Framer Motion exclusivement (cohérence, respect prefers-reduced-motion intégré).
- [2026-06-19] Icônes — Factory pattern custom dans icons.tsx pour contrôle total du style. Lucide en fallback.
- [2026-06-19] Formulaire — Pas de backend configuré. Simulation 900ms. À connecter avant mise en prod.

## Décisions de design

- [2026-06-19] Palette — Ivoire chaud (#F5F1EA) + brun accent (#9A5A2C). Parti pris chaleur/artisanat vs blanc froid tech.
- [2026-06-19] Typo — Source Serif 4 (titres) + Manrope (corps) + IBM Plex Mono (mono). Sérieux + modernité.
- [2026-06-19] Cards — Pattern panel-shell/panel-core (glassmorphism léger) retenu pour hiérarchie visuelle.
- [2026-06-19] Logos partenaires — Simple Icons CDN avec fallback local (public/) pour Slack, Teams, OpenAI.

## Contexte métier

- [2026-06-19] Cible — PME/ETI francophones cherchant à automatiser des tâches répétitives (CRM, reporting, qualification).
- [2026-06-19] Positionnement — Pas de remplacement d'outils existants. Connexion et automatisation des outils déjà utilisés.
- [2026-06-19] Cas concret principal — Automatisation remontées sécurité (Airtable + Apps Script + Gmail + Slack + Google Docs).

## Structure des sections (ordre actuel)

1. HeroSection
2. StackProofSection (logos connecteurs)
3. ProblemSection ("La friction se cache rarement dans la stratégie.")
4. PrototypesSection (cas concret + workflow animé + CTA)
5. AboutSection (positionnement + 4 étapes process)
6. FAQSection
7. FinalCTA (formulaire contact)

OffersSection supprimée le 2026-06-19 — redondante avec AboutSection, moins efficace sans prix.

## Décisions de structure (session 2026-06-19)

- [2026-06-19] OffersSection supprimée — jugée redondante avec AboutSection (même contenu : process en 3 vs 4 étapes). Sans prix, les cartes d'offres n'ont pas de valeur ajoutée.
- [2026-06-19] PrototypesSection déplacée après ProblemSection (était après OffersSection).
- [2026-06-19] ProblemSection : sous-titre déplacé sous le titre (n'est plus en colonne droite sur desktop).
- [2026-06-19] Navbar : lien #offer supprimé, remplacé par #problem ("Pourquoi automatiser").
- [2026-06-19] PrototypesSection — 3 cas génériques remplacés par 1 cas réel détaillé (remontées sécurité).
- [2026-06-19] PrototypesSection — CTA ajouté en bas ("Votre premier flux opérationnel en deux semaines.").
- [2026-06-19] WorkflowSteps — composant interactif remplaçant la grille statique de 6 cartes. Auto-cycle via onAnimationComplete (synchronisation parfaite ligne/cercle). STEP_DURATION = 5000ms.
- [2026-06-19] WorkflowSteps — logos outils via Simple Icons CDN (airtable, slack, gmail, googledocs). Grayscale par défaut, couleur au hover.

## Détail technique — WorkflowSteps (PrototypesSection.tsx)

- Auto-cycle piloté par `onAnimationComplete` sur le connecteur actif (et non setInterval) pour synchroniser exactement la fin de la ligne avec l'allumage du cercle suivant.
- Fallback `setInterval` pour `prefers-reduced-motion` (pas d'animation à compléter).
- Fallback `setTimeout` pour la dernière étape (pas de connecteur sortant).
- Garde anti-stale-closure : `setActiveIndex(prev => i === prev ? prev+1 : prev)` — utilise la forme fonctionnelle pour lire l'état courant sans closure stale.
- Clic direct sur un cercle pour naviguer (setActiveIndex immédiat).
- Navigation par points toujours visible en bas.

## État du projet

- [2026-06-19] Site créé — Structure complète, toutes les sections implémentées.
- [2026-06-19] Déploiement — Non configuré. Build statique compatible Vercel/Netlify/GitHub Pages.
- [2026-06-19] Formulaire backend — Non connecté. Priorité avant toute mise en prod.
- [2026-06-19] Analytics — Non configuré.
- [2026-06-19] SEO — OG tags et meta description présents dans index.html. Pas de sitemap.

## À faire / Backlog

- [ ] Connecter le formulaire FinalCTA à un vrai backend (Netlify Forms recommandé)
- [ ] Configurer Google Analytics ou Plausible
- [ ] Générer un sitemap.xml
- [ ] Tester accessibilité (Lighthouse, axe)
- [ ] Optimiser images OG (og-image.svg → PNG pour meilleure compatibilité)
- [ ] Ajouter des témoignages clients quand disponibles
- [ ] Ajouter d'autres cas concrets dans PrototypesSection quand disponibles
- [ ] Configurer un domaine et hébergement

## Notes techniques

- [2026-06-19] Alias `@/` → `src/` configuré dans tsconfig.json ET vite.config.ts (les deux nécessaires).
- [2026-06-19] Fonts chargées via Google Fonts CDN dans index.html (pas via npm).
- [2026-06-19] dist/ non versionné. Régénérer avec `npm run build`.
- [2026-06-19] tsconfig.tsbuildinfo — cache TypeScript, ignorable.

---

_Ce fichier est mis à jour manuellement. Ajouter une ligne à chaque décision importante._
