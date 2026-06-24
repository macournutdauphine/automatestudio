# CLAUDE.md — Automate Studio

Limite absolue : ce fichier ne doit jamais dépasser 500 lignes.

## Projet en un coup d'œil

Site marketing monopage React/TypeScript/Vite/Tailwind pour **Automate Studio** (conseil en automatisation IA + no-code). Langue : français. Objectif : conversion de prospects.

## Commandes essentielles

```bash
npm run dev      # Dev server localhost:5173
npm run build    # Build prod → dist/
npm run preview  # Prévisualise dist/
```

Pas de tests configurés. Pas de linter. Vérification : `tsc --noEmit` (via build).

## Architecture

```
src/
├── App.tsx          # Racine — importe toutes les sections dans l'ordre
├── index.css        # Variables CSS + utilitaires custom (panel-shell, surface-card, kicker…)
├── components/
│   ├── animations.tsx   # FadeUp, WordsPullUp, StaggerContainer
│   ├── ui.tsx           # Button (variants), Pill, SectionHeading
│   ├── icons.tsx        # 27 icônes SVG custom (factory pattern)
│   ├── Navbar.tsx
│   ├── HeroSection.tsx  # Contient WorkflowVisual
│   ├── WorkflowVisual.tsx
│   ├── StackProofSection.tsx
│   ├── ProblemSection.tsx
│   ├── OffersSection.tsx
│   ├── PrototypesSection.tsx
│   ├── AboutSection.tsx
│   ├── FAQSection.tsx
│   └── FinalCTA.tsx     # Formulaire contact (simulation, pas de backend)
```

Ordre des sections dans la page : Navbar → Hero → Stack → Problem → Offers → Prototypes → About → FAQ → FinalCTA.

## Design system

### Tokens Tailwind (tailwind.config.js)

```js
colors: {
  bg: '#F5F1EA',      // Fond ivoire chaud
  text: '#111111',    // Texte principal
  accent: '#9A5A2C',  // Brun chaud — CTAs
  warm: '#B8843D',    // Or
  success: '#44624A', // Vert sauge
  muted: '#66615A',   // Gris taupe
  card: 'rgba(255,255,255,0.72)',
  mutedcard: 'rgba(255,255,255,0.44)',
  darkcard: 'rgba(17,17,17,0.04)',
}
fonts: {
  heading: ['Source Serif 4'],  // .font-heading
  body: ['Manrope'],
  mono: ['IBM Plex Mono'],      // .font-mono
}
shadows: {
  soft: '0 20px 60px -34px rgba(17,17,17,0.22)',
  insetSoft: 'inset 0 1px 0 rgba(255,255,255,0.55)',
}
```

### Classes custom importantes (index.css)

| Classe | Usage |
|--------|-------|
| `.panel-shell` | Conteneur externe carte glassmorphism |
| `.panel-core` | Conteneur interne avec fond blanc/gradient |
| `.surface-card` | Carte avec gradient + inset highlight |
| `.surface-strong` | Variante plus opaque |
| `.kicker` | Label uppercase 0.72rem tracking 0.18em |
| `.soft-underline` | Soulignement décoratif (::after) |
| `.bg-noise` | Texture bruit SVG en overlay |
| `.radial-glow` | Lueur radiale centrée |

## Composants clés

### Button (ui.tsx)
Composant polymorphique (`as` prop). Variants : `primary` (fond accent), `secondary` (bordure), `ghost`, `light`, `orange`. Taille : `sm`, `md` (défaut), `lg`.

### animations.tsx
- `<FadeUp>` — wrapper IntersectionObserver, `delay` prop en secondes
- `<WordsPullUp text="..." highlight={[0,2]}>` — animation mot par mot, indices highlights
- `<StaggerContainer staggerDelay={0.08}>` — enfants échelonnés

Toutes respectent `prefers-reduced-motion`.

### WorkflowVisual.tsx
Auto-cycle toutes les 3.6s. 2 workflows × 5 étapes. Lignes SVG distinctes mobile/desktop. Pas de prop externe — état entièrement interne.

### FinalCTA.tsx
Formulaire sans backend. Soumission simulée (900ms). Champs : nom, email, société, besoin (select), message (min 20 chars). Validation avant envoi, état succès après.

## Conventions de code

- Composants fonctionnels TypeScript avec types inline (pas de fichiers `.d.ts` séparés)
- Imports via alias `@/` → `src/`
- Pas de state management externe (useState local uniquement)
- Framer Motion pour toutes les animations (pas de CSS transitions sauf hover Tailwind)
- Icônes : d'abord `icons.tsx`, puis Lucide en fallback
- Logos intégrations : Simple Icons CDN avec fallback `public/` pour Slack/Teams/OpenAI

## Points d'attention

- **Formulaire sans backend** : FinalCTA simule l'envoi. Connecter à Netlify Forms, Formspree ou une API avant mise en prod.
- **Fonts Google** : chargées depuis CDN dans `index.html`. En cas de problème réseau, fallback system fonts.
- **dist/** : généré par build, ne pas versionner.
- **tsconfig.tsbuildinfo** / **tsconfig.node.tsbuildinfo** : fichiers de cache TypeScript, ne pas modifier manuellement.
- Pas de routing (SPA one-page). Navigation par ancres HTML.

## Intégrations affichées (StackProofSection)

Slack, Airtable, Notion, Gmail, Google Drive, HubSpot, Google Calendar, n8n, OpenAI, Microsoft Teams, Trello, Typeform.

## Cas concrets (PrototypesSection)

1. Qualification des demandes entrantes
2. Reporting hebdomadaire automatisé
3. Sync CRM + relances

## Offres (OffersSection)

1. **Diagnostic** — analyse + feuille de route
2. **Première Implémentation** — workflow concret (offre mise en avant)
3. **Accompagnement continu** — maintenance + évolution

## Fichiers de contexte du projet

| Fichier | Contenu |
|---------|---------|
| `README.md` | Documentation complète du projet |
| `CLAUDE.md` | Ce fichier — guide pour Claude (< 500 lignes) |
| `MEMORY.md` | Index mémoire des décisions et contexte (< 500 lignes) |
| `ERRORS.md` | Journal des bugs et erreurs rencontrées |
