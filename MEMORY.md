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

## Structure des sections (ordre actuel, depuis la refonte 2026-09)

1. HeroSection (hero/) — titre à mot tournant + FlowVisual
2. IntegrationsSection (01) — 12 outils reliés à un hub
3. UseCasesSection (02) — 4 tâches répétitives, avant → automatisation → résultat
4. RealisationsSection (03) — 4 missions livrées (Keprea nommée + 3 non nommées) + CTA
5. OfferSection (04, ancre #methode) — méthode en 6 étapes + Mise en place / Après la mission
6. StudioSection (05) — fondateur + principes
7. FAQSection (06)
8. ContactSection (07) — formulaire /api/contact
9. Footer

## Décisions de la refonte « identité tech » (2026-09-29/30)

- [2026-09-29] Identité — Abandon ivoire/brun/serif au profit d'une DA sombre : bleu-noir #06070B, accents violet #8B7BFF + cyan #4CD7F6, Geist + Geist Mono. Objectif : image de studio tech, perçue comme maîtrisée et soignée.
- [2026-09-29] Effets — Inspiration React Bits (Blur/Rotating/Decrypted/Shiny Text, Spotlight Card, Aurora, Grid, CountUp, Magnetic) réimplémentée en Framer Motion/CSS dans components/fx/. Pas d'import React Bits : plusieurs composants tirent gsap/ogl/three et la licence (MIT + Commons Clause) impose de la prudence ; les équivalents maison pèsent quelques Ko.
- [2026-09-29] Framer Motion — LazyMotion(domAnimation, strict) + composants `m.*` pour réduire le bundle ; MotionConfig reducedMotion="user".
- [2026-09-29] Hero — Visualisation « FlowVisual » : déclencheur → agent IA → 3 actions, flux permanent (SMIL + tirets CSS) + exécution séquencée + journal d'événements ; 3 scénarios cliquables. Remplace WorkflowVisual (mort) et la photo du fondateur (déplacée en section Studio).
- [2026-09-29] Section Offre réintroduite — elle absorbe le process de l'ancienne AboutSection (Identifier/Construire/Tester/Déployer/Accompagner) : plus de redondance entre les deux.
- [2026-09-29] Honnêteté — Les 3 cas hors Keprea sont libellés « Scénario type / résultats attendus » (l'ancien titre laissait croire à trois clients livrés).
- [2026-09-29] Logos — Rapatriés dans public/logos (Simple Icons) ; Surfe/Lemlist en monogramme car Brandfetch bloque le hotlink (renvoie du HTML).
- [2026-09-30] Assets — Portrait redimensionné (WebP 45 Ko au lieu de JPEG 473 Ko), og-image.png 1200×630 (SVG non supporté par les réseaux), robots.txt + sitemap.xml.
- [2026-09-30] Accessibilité — fg-subtle relevé à #82889E pour tenir ≥ 4,5:1 sur toutes les surfaces.

## Décisions de structure (session 2026-06-19, historique)

- [2026-06-19] OffersSection supprimée — jugée redondante avec AboutSection (même contenu : process en 3 vs 4 étapes). Sans prix, les cartes d'offres n'ont pas de valeur ajoutée.
- [2026-06-19] PrototypesSection déplacée après ProblemSection (était après OffersSection).
- [2026-06-19] ProblemSection : sous-titre déplacé sous le titre (n'est plus en colonne droite sur desktop).
- [2026-06-19] Navbar : lien #offer supprimé, remplacé par #problem ("Pourquoi automatiser").
- [2026-06-19] PrototypesSection — 3 cas génériques remplacés par 1 cas réel détaillé (remontées sécurité).
- [2026-06-19] PrototypesSection — CTA ajouté en bas ("Votre premier flux opérationnel en deux semaines.").
- [2026-06-19] WorkflowSteps — composant interactif remplaçant la grille statique de 6 cartes. Auto-cycle via onAnimationComplete (synchronisation parfaite ligne/cercle). STEP_DURATION = 5000ms.
- [2026-06-19] WorkflowSteps — logos outils via Simple Icons CDN (airtable, slack, gmail, googledocs). Grayscale par défaut, couleur au hover.

## Détail technique — WorkflowStepper (realisations/WorkflowStepper.tsx)

- Remplace WorkflowSteps. Une seule source de temps : la barre de progression CSS de l'étape active (`progress-fill`), dont `onAnimationEnd` passe à l'étape suivante. Plus de setInterval concurrent → nœuds et barre toujours synchronisés.
- Pause via `animation-play-state` quand le composant est hors écran ou survolé.
- `prefers-reduced-motion` : pas de lecture automatique, navigation manuelle par les nœuds.

## État du projet

- [2026-06-19] Site créé — Structure complète, toutes les sections implémentées.
- [2026-06-19] Déploiement — Non configuré. Build statique compatible Vercel/Netlify/GitHub Pages.
- [2026-06-19] Formulaire backend — Non connecté. Priorité avant toute mise en prod.
- [2026-06-19] Analytics — Non configuré.
- [2026-06-19] SEO — OG tags et meta description présents dans index.html. Pas de sitemap.
- [2026-09-30] Refonte identité tech terminée sur la branche redesign/identite-tech (build OK, LCP local ≈ 0,8 s desktop).

## À faire / Backlog

- [x] Connecter le formulaire à un vrai backend (Supabase + Resend via api/contact.ts)
- [ ] Configurer Google Analytics ou Plausible
- [x] Générer un sitemap.xml (2026-09-30)
- [ ] Audit accessibilité automatisé (Lighthouse, axe) — contrôles manuels clavier/contraste faits le 2026-09-30
- [x] Image OG en PNG (2026-09-30)
- [ ] Ajouter des témoignages clients quand disponibles
- [ ] Ajouter d'autres missions livrées dans data/cases.ts quand disponibles
- [ ] Compléter la politique de confidentialité : durée de conservation et localisation des données ([À COMPLÉTER] dans Legal.tsx)
- [ ] Régénérer public/og-image.png : son texte dit encore « Conçus, déployés et maintenus pour vous » (non modifié le 2026-10-01, consigne de ne pas toucher à l'image)
- [x] Domaine et hébergement (automate-studio.fr sur Vercel)
- [ ] Décider du sort de public/keprea.png (inutilisé)

## Notes techniques

- [2026-06-19] Alias `@/` → `src/` configuré dans tsconfig.json ET vite.config.ts (les deux nécessaires).
- [2026-06-19] Fonts chargées via Google Fonts CDN dans index.html (pas via npm).
- [2026-06-19] dist/ non versionné. Régénérer avec `npm run build`.
- [2026-06-19] tsconfig.tsbuildinfo — cache TypeScript, ignorable.

---

_Ce fichier est mis à jour manuellement. Ajouter une ligne à chaque décision importante._
