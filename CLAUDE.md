# CLAUDE.md — Automate Studio

Limite absolue : ce fichier ne doit jamais dépasser 500 lignes.

## Projet en un coup d'œil

Site marketing monopage React/TypeScript/Vite/Tailwind pour **Automate Studio** (automatisation métier, IA et no-code). Langue : français. Objectif : conversion de prospects. Identité visuelle sombre et technologique depuis la refonte de septembre 2026.

## Commandes essentielles

```bash
npm run dev      # Dev server localhost:5173
npm run build    # tsc -b + build prod → dist/
npm run preview  # Prévisualise dist/ (localhost:4173)
```

Pas de tests ni de linter. Vérification : `npm run build` (inclut `tsc -b`).
Contrôle du code mort : `npx tsc -p tsconfig.json --noEmit --noUnusedLocals --noUnusedParameters`.

## Architecture

```
api/contact.ts            # Route Vercel : Supabase (stockage) + Resend (notification)
src/
├── App.tsx               # LazyMotion + MotionConfig(reducedMotion="user") + ordre des sections
├── index.css             # Design tokens (variables CSS) + classes composants
├── data/
│   ├── tools.ts          # Registre des outils (nom, logo local, catégorie)
│   └── cases.ts          # 4 missions livrées : Keprea (nommée) + 3 missions non nommées
└── components/
    ├── ui.tsx            # Button, SectionHeading, ToolIcon
    ├── Logo.tsx          # LogoMark + Logo
    ├── Dialog.tsx        # Modale accessible (focus piégé, Échap, focus restauré)
    ├── fx/               # Effets réutilisables (voir plus bas)
    ├── Navbar.tsx
    ├── hero/             # HeroSection + FlowVisual (graphe d'automatisation animé)
    ├── IntegrationsSection.tsx
    ├── UseCasesSection.tsx
    ├── realisations/     # RealisationsSection + WorkflowStepper
    ├── OfferSection.tsx
    ├── StudioSection.tsx
    ├── FAQSection.tsx
    ├── ContactSection.tsx
    ├── Legal.tsx         # Mentions légales + politique de confidentialité (affichées en modale depuis le footer)
    └── Footer.tsx
```

Ordre de la page : Hero → Intégrations (01) → Usages (02) → Réalisations (03) → Méthode (04) → Studio (05) → FAQ (06) → Contact (07) → Footer.
Ancres : `#hero`, `#integrations`, `#usages`, `#realisations`, `#methode`, `#studio`, `#faq`, `#contact`.

## Design system

Tokens dans `src/index.css` (`:root`), exposés à Tailwind en canaux RGB → opacité possible (`bg-accent/20`).

| Token | Valeur | Usage |
|-------|--------|-------|
| `bg` | `#06070B` | Fond principal bleu-noir |
| `bg-raised` | `#0A0C12` | Fond des panneaux |
| `surface` / `surface-2` | `#0E1119` / `#151924` | Surfaces actives, tuiles d'outils |
| `fg` | `#EEF0F6` | Texte principal |
| `fg-muted` | `#A1A7B8` | Texte secondaire (8:1) |
| `fg-subtle` | `#82889E` | Labels, notes (≥ 5:1) |
| `accent` | `#8B7BFF` | Violet électrique |
| `accent-2` | `#4CD7F6` | Cyan |
| `success` / `danger` | `#3EE0A1` / `#FF7886` | États |
| `line` / `line-strong` | blanc 8 % / 14 % | Bordures |

Typographie : **Geist** (sans, défaut) et **Geist Mono** (`font-mono`, labels et données), chargées via Google Fonts dans `index.html`.

Classes clés (`index.css`) : `.container-x`, `.panel`, `.glass`, `.gradient-border`, `.text-gradient`, `.kicker`, `.chip`, `.field`, `.bg-grid`, `.bg-dots`, `.shiny-text`, `.spotlight` + `.spotlight-border`, masques `.mask-fade-b` et `.mask-radial`.

## Effets (`components/fx/`)

Inspirés de React Bits, réimplémentés sans dépendance (Framer Motion / CSS).

| Composant | Rôle |
|-----------|------|
| `Reveal` | Apparition au scroll (fondu + flou). Exporte `EASE_OUT`. |
| `BlurText` | Titre révélé mot par mot ; `highlight` = mots en dégradé (ponctuation ignorée) |
| `RotatingText` | Mots alternés du hero (décoratif : fournir le texte complet en `sr-only`) |
| `DecryptedText` | Déchiffrement des petits labels mono |
| `CountUp` | Compteurs des métriques |
| `Magnetic` | CTA attiré par le curseur (souris uniquement) |
| `SpotlightCard` | Halo + bordure qui suivent le curseur (variables CSS, pas de re-render) |
| `Backdrop` | Aurore CSS + grille qui s'illumine sous le curseur |

## Conventions de code

- Composants fonctionnels TypeScript, types inline.
- Imports `@/` → `src/` (alias dans tsconfig.json ET vite.config.ts).
- Animations : Framer Motion avec `m.*` uniquement (`LazyMotion strict` : `motion.*` lève une erreur). Pas de `layout` (nécessiterait `domMax`).
- Micro-interactions simples : transitions CSS Tailwind.
- Icônes : `lucide-react`. Logos d'outils : fichiers locaux `public/logos/*.svg` déclarés dans `data/tools.ts` (pas de CDN).
- Toute animation doit respecter `prefers-reduced-motion` (MotionConfig + `useReducedMotion` + règle globale CSS).
- Grilles contenant du texte `nowrap` : pistes `minmax(0, …)` pour éviter le débordement mobile.

## Points d'attention

- **Formulaire** : `ContactSection` POST `/api/contact` (Supabase + Resend). Variables d'env : `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `RESEND_API_KEY`, `NOTIFY_EMAIL`, `FROM_EMAIL`.
- **Missions livrées** : les 4 cas sont étiquetés « Mission livrée ». Seule Keprea est nommée ; les 3 autres entreprises ne doivent pas l'être.
- **Règles éditoriales** (mission du 2026-10-01) : aucun prix ni montant (hors équivalent € du cas Keprea), aucune durée de mission, aucun engagement de délai sauf « proposition de solution sous 24 h », pas de « maintenance », « abonnement » seulement dans « sans abonnement », rendez-vous d'entrée = « audit des outils et des cas d'automatisation » (45 minutes). Contact : mathieucournut@orange.fr.
- **Titre affiché** : « Consultant Automatisations & IA » (section Studio). Ne plus employer « Fondateur » dans le texte visible.
- **Image OG** : `public/og-image.png` (1200×630). À régénérer si le message du hero change.
- **SEO** : meta, Open Graph, Twitter, JSON-LD `ProfessionalService`, `robots.txt`, `sitemap.xml`.
- `tsc -b` génère `vite.config.js` / `vite.config.d.ts` : ignorés par git (`.gitignore`), ne pas les commiter.
- `dist/` et `*.tsbuildinfo` : générés, non versionnés.

## Fichiers de contexte du projet

| Fichier | Contenu |
|---------|---------|
| `README.md` | Documentation complète du projet |
| `CLAUDE.md` | Ce fichier — guide pour Claude (< 500 lignes) |
| `MEMORY.md` | Index mémoire des décisions et contexte (< 500 lignes) |
| `ERRORS.md` | Journal des bugs et erreurs rencontrées |
