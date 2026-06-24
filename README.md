# Automate Studio — Site Web

Site marketing monopage pour **Automate Studio**, un service de conseil en automatisation métier (IA + no-code). Le site est entièrement en français et conçu pour convertir des prospects en clients.

## Stack technique

| Couche | Outil | Version |
|--------|-------|---------|
| UI | React | 18.3.1 |
| Typage | TypeScript | 5.6.3 |
| Bundler | Vite | 5.4.10 |
| CSS | Tailwind CSS | 3.4.14 |
| Animations | Framer Motion | 11.11.9 |
| Icônes | Lucide React + SVG custom | 0.454.0 |

## Démarrage rapide

```bash
npm install
npm run dev       # Serveur dev sur http://localhost:5173
npm run build     # Build de production dans dist/
npm run preview   # Prévisualise le build prod
```

## Structure du projet

```
siteweb/
├── index.html              # Entrée HTML (lang="fr", OG tags, Google Fonts)
├── src/
│   ├── main.tsx            # Point d'entrée React
│   ├── App.tsx             # Racine — orchestre toutes les sections
│   ├── index.css           # Styles globaux + variables CSS + utilitaires custom
│   └── components/
│       ├── animations.tsx  # Wrappers Framer Motion (FadeUp, WordsPullUp, Stagger)
│       ├── ui.tsx          # Primitives (Button, Pill, SectionHeading)
│       ├── icons.tsx       # 27 icônes SVG custom
│       ├── Navbar.tsx      # Header sticky + menu mobile animé
│       ├── HeroSection.tsx # Section hero + CTA principal
│       ├── WorkflowVisual.tsx  # Animation workflow interactive (auto-cycle)
│       ├── StackProofSection.tsx  # Logos d'intégrations (12 outils)
│       ├── ProblemSection.tsx     # 4 points de friction → bénéfices
│       ├── OffersSection.tsx      # Offre unique : déploiement accompagné
│       ├── PrototypesSection.tsx  # 3 études de cas réels
│       ├── AboutSection.tsx       # Positionnement + 4 étapes de process
│       ├── FAQSection.tsx         # 6 questions accordéon
│       └── FinalCTA.tsx           # Formulaire de contact avec validation
├── public/
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── slack.svg / teams.svg / openai.svg  # Logos locaux (fallback CDN)
└── dist/                   # Build de production (gitignored)
```

## Design system

### Couleurs (tailwind.config.js)

| Token | Valeur | Usage |
|-------|--------|-------|
| `bg` | `#F5F1EA` | Fond principal (ivoire chaud) |
| `text` | `#111111` | Texte principal |
| `accent` | `#9A5A2C` | Brun chaud — CTA, highlights |
| `warm` | `#B8843D` | Or — variante accent |
| `success` | `#44624A` | Vert sauge — confirmations |
| `card` | `rgba(255,255,255,0.72)` | Fond de cartes |

### Typographie

- **Titres** : Source Serif 4 (`.font-heading`)
- **Corps** : Manrope (défaut)
- **Mono** : IBM Plex Mono (`.font-mono`)

### Patterns CSS custom (index.css)

- `.panel-shell` / `.panel-core` — Cartes imbriquées avec glassmorphism
- `.surface-card` — Gradient backdrop + inset highlight
- `.kicker` — Label majuscule 0.72rem, tracking 0.18em
- `.soft-underline` — Soulignement décoratif custom
- `.bg-noise` — Texture bruit de fond
- `.radial-glow` — Effet de lueur radiale

## Sections (ordre de la page)

1. **Navbar** — Sticky, logo, liens ancres, menu mobile
2. **HeroSection** — Titre principal, sous-titre, 2 CTA, WorkflowVisual
3. **StackProofSection** — Grille bento de 12 intégrations
4. **ProblemSection** — 4 frictions → solution
5. **OffersSection** — offre unique (déploiement accompagné + prise en main)
6. **PrototypesSection** — 3 cas concrets avec avant/après
7. **AboutSection** — Positionnement + process en 4 étapes
8. **FAQSection** — 6 questions/réponses accordéon
9. **FinalCTA** — Formulaire de contact (validation client-side)

## Animations

Toutes les animations respectent `prefers-reduced-motion`.

- **FadeUp** — Apparition au scroll (IntersectionObserver via Framer Motion)
- **WordsPullUp** — Animation mot par mot avec support highlight
- **StaggerContainer** — Décalage des enfants
- **WorkflowVisual** — Auto-cycle toutes les 3.6s, 2 workflows × 5 étapes

## Formulaire de contact (FinalCTA)

- Champs : Nom (requis), Email (requis), Société, Besoin (dropdown), Message (requis, min 20 chars)
- Validation client-side avec messages d'erreur accessibles (aria-invalid, aria-describedby)
- Soumission simulée avec délai de 900ms + état succès
- Pas de backend actuel — à connecter (Netlify Forms, Formspree, etc.)

## Accessibilité

- HTML sémantique (nav, main, article, section)
- Lien "skip to content" en haut de page
- ARIA sur le formulaire et le menu mobile
- Focus rings visibles
- Contraste couleurs conforme WCAG

## Déploiement

Le build produit des assets statiques dans `dist/`. Compatible avec tout hébergeur statique : Vercel, Netlify, GitHub Pages, etc.

```bash
npm run build
# Déployer le contenu de dist/
```
