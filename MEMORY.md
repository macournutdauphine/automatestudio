# MEMORY.md — Automate Studio

Index des décisions, contexte et historique du projet. Limite : < 500 lignes.
Format des entrées : `[YYYY-MM-DD] Catégorie — Fait / Décision`

---

## Décisions d'architecture

- [2026-06-19] Stack — React 18 + TypeScript + Vite + Tailwind + Framer Motion retenu. Pas de Next.js (pas besoin de SSR pour un one-pager statique).
- [2026-06-19] État — Pas de Redux/Zustand. useState local uniquement. Le site est essentiellement statique.
- [2026-06-19] Animations — Framer Motion exclusivement (cohérence, respect prefers-reduced-motion intégré).
- [2026-06-19] Icônes — Lucide React (icons.tsx supprimé lors de la refonte 2026-09).
- [2026-07-01] Formulaire — Route Vercel api/contact.ts : Supabase (stockage) + Resend (notification).

## Contexte métier

- [2026-06-19] Cible — PME/ETI francophones cherchant à automatiser des tâches répétitives (CRM, reporting, qualification).
- [2026-06-19] Positionnement — Pas de remplacement d'outils existants. Connexion et automatisation des outils déjà utilisés.
- [2026-06-19] Cas concret principal — Automatisation remontées sécurité (Airtable + Apps Script + Gmail + Slack + Google Docs).

## Structure des sections (ordre actuel, depuis la refonte 2026-09)

1. HeroSection (hero/) — titre à mot tournant + FlowVisual
2. IntegrationsSection (01) — 12 outils reliés à un hub
3. UseCasesSection (02) — 4 tâches répétitives, avant → automatisation → résultat
4. RealisationsSection (03) — 4 missions livrées (Keprea nommée + 3 non nommées) + CTA
5. OfferSection (04, ancre #methode) — méthode en 5 étapes (Audit, Proposition de solution, Production, Déploiement, Accompagnement) + Mise en place / Après la mission
6. StudioSection (05) — Mathieu Cournut (consultant Automatisations & IA) + principes
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

## Détail technique — WorkflowStepper (realisations/WorkflowStepper.tsx)

- Remplace WorkflowSteps. Une seule source de temps : la barre de progression CSS de l'étape active (`progress-fill`), dont `onAnimationEnd` passe à l'étape suivante. Plus de setInterval concurrent → nœuds et barre toujours synchronisés.
- Pause via `animation-play-state` quand le composant est hors écran ou survolé.
- `prefers-reduced-motion` : pas de lecture automatique, navigation manuelle par les nœuds.

## État du projet

- [2026-06-19] Site créé — Structure complète, toutes les sections implémentées.
- [2026-07-01] Déploiement — Vercel (build statique + fonction api/contact.ts), domaine automate-studio.fr.
- [2026-07-01] Formulaire backend — Connecté (Supabase + Resend).
- [2026-06-19] Analytics — Non configuré.
- [2026-10-06] SEO — meta, OG, JSON-LD, robots.txt et sitemap.xml présents.
- [2026-09-30] Refonte identité tech terminée (build OK, LCP local ≈ 0,8 s desktop).
- [2026-10-06] Refonte fusionnée dans main (ancien design ivoire/brun supprimé, FinalCTA retiré) ; correctifs contact/SEO de main conservés ; branche redesign/identite-tech supprimée (locale et distante).
- [2026-10-06] Titre « Fondateur » remplacé par « Consultant Automatisations & IA » (StudioSection).
- [2026-10-06] Nettoyage : classes CSS field-select/mask-fade-x, couleur warning, public/keprea.png, vite.config.js/.d.ts (générés, ignorés par git) supprimés.

## À faire / Backlog

- [x] Connecter le formulaire à un vrai backend (Supabase + Resend via api/contact.ts)
- [ ] Configurer Google Analytics ou Plausible
- [x] Générer un sitemap.xml (2026-09-30)
- [ ] Audit accessibilité automatisé (Lighthouse, axe) — contrôles manuels clavier/contraste faits le 2026-09-30
- [x] Image OG en PNG (2026-09-30)
- [ ] Ajouter des témoignages clients quand disponibles
- [ ] Ajouter d'autres missions livrées dans data/cases.ts quand disponibles
- [x] Politique de confidentialité complétée (durée de conservation, localisation des données)
- [x] public/og-image.png : sous-titre remplacé par « Conçus, déployés et accompagnés pour vous. » (2026-10-06)
- [x] Domaine et hébergement (automate-studio.fr sur Vercel)
- [x] public/keprea.png supprimé (inutilisé)

## Notes techniques

- [2026-06-19] Alias `@/` → `src/` configuré dans tsconfig.json ET vite.config.ts (les deux nécessaires).
- [2026-06-19] Fonts chargées via Google Fonts CDN dans index.html (pas via npm).
- [2026-06-19] dist/ non versionné. Régénérer avec `npm run build`.
- [2026-06-19] tsconfig.tsbuildinfo — cache TypeScript, ignorable.
- [2026-10-06] package.json : vite ^5.4 et @vercel/node ^5.8 (build vérifié). Une ancienne modif locale non commitée (vite ^8, @vercel/node ^4) a été annulée.

---

_Ce fichier est mis à jour manuellement. Ajouter une ligne à chaque décision importante._
