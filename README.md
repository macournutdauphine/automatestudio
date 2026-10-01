# Automate Studio — Site Web

Site marketing monopage pour **Automate Studio**, studio d'automatisation métier (IA + no-code) : conception, déploiement et accompagnement d'automatisations branchées sur les outils existants des entreprises. Site en français, conçu pour convertir des prospects.

Production : https://www.automate-studio.fr/

## Stack technique

| Couche | Outil |
|--------|-------|
| UI | React 18 |
| Typage | TypeScript 5 |
| Bundler | Vite 5 |
| CSS | Tailwind CSS 3 |
| Animations | Framer Motion 11 (`LazyMotion` + `domAnimation`) |
| Icônes | Lucide React |
| Formulaire | Route Vercel `api/contact.ts` (Supabase + Resend) |

## Démarrage rapide

```bash
npm install
npm run dev       # Serveur dev sur http://localhost:5173
npm run build     # Vérification TypeScript + build de production dans dist/
npm run preview   # Prévisualise le build sur http://localhost:4173
```

La route `/api/contact` ne tourne que sur Vercel (ou `vercel dev`). Variables d'environnement : `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `RESEND_API_KEY`, `NOTIFY_EMAIL`, `FROM_EMAIL`.

## Structure du projet

```
├── api/contact.ts               # Enregistrement Supabase + email Resend
├── index.html                   # Meta SEO, Open Graph, JSON-LD, polices
├── public/
│   ├── logos/                   # Logos des outils (SVG locaux)
│   ├── mathieu-960.webp/.jpg    # Portrait optimisé
│   ├── og-image.png             # Image de partage 1200×630
│   ├── favicon.svg, robots.txt, sitemap.xml
└── src/
    ├── App.tsx                  # Ordre des sections, config Framer Motion
    ├── index.css                # Design tokens + classes composants
    ├── data/                    # tools.ts (registre des outils), cases.ts (cas et scénarios)
    └── components/
        ├── fx/                  # Effets réutilisables (Reveal, BlurText, RotatingText, …)
        ├── ui.tsx               # Button, SectionHeading, ToolIcon
        ├── Logo.tsx, Dialog.tsx, Navbar.tsx, Footer.tsx
        ├── hero/                # HeroSection + FlowVisual
        ├── realisations/        # RealisationsSection + WorkflowStepper
        └── IntegrationsSection, UseCasesSection, OfferSection, StudioSection, FAQSection, ContactSection
```

## Design system

Direction artistique sombre et technologique : fond bleu-noir, surfaces quasi noires, texte blanc cassé, deux accents électriques (violet `#8B7BFF`, cyan `#4CD7F6`), grilles techniques, bordures en dégradé et halos discrets.

- **Tokens** : variables CSS dans `src/index.css`, exposées à Tailwind (`bg`, `bg-raised`, `surface`, `fg`, `fg-muted`, `fg-subtle`, `accent`, `accent-2`, `success`, `danger`, `line`…).
- **Typographie** : Geist (texte et titres), Geist Mono (labels, données, statuts).
- **Contrastes** : tous les couples texte/fond ≥ 4,5:1 (texte secondaire 8:1).

## Sections (ordre de la page)

1. **Navbar** : transparente puis en verre dépoli au scroll, section active soulignée, menu mobile plein écran.
2. **Hero** : titre à mot tournant, 2 CTA, preuves chiffrées, visualisation interactive d'un workflow (3 scénarios, journal d'exécution).
3. **Intégrations** : 12 outils reliés à un hub d'orchestration par des faisceaux animés.
4. **Usages** : 3 cas d'usage en onglets (Produire, Analyser, Chercher du contenu), schéma avant → automatisation → résultat.
5. **Réalisations** : 4 missions livrées — Keprea (remontées sécurité) avec workflow et métriques, 3 autres missions non nommées en modale, CTA.
6. **Méthode** (`#methode`) : Audit → Proposition de solution → Validation → Production → Déploiement → Accompagnement, volets Mise en place et Après la mission.
7. **Studio** : fondateur, parcours, principes de travail.
8. **FAQ** : 7 questions en accordéon.
9. **Contact** : formulaire validé côté client, envoyé à `/api/contact`.

## Animations et performance

- Effets inspirés de React Bits, réimplémentés en Framer Motion et CSS (aucune dépendance ajoutée, aucun canvas ni WebGL).
- Animations en `transform` / `opacity` ; suivi du curseur via variables CSS (pas de re-render React).
- Lectures automatiques en pause hors écran et au survol.
- `prefers-reduced-motion` respecté partout.
- Mesures locales du build : LCP ≈ 0,8 s (desktop), ≈ 1,5 s (mobile, CPU ×4), CLS ≈ 0.

## Accessibilité

HTML sémantique, lien d'évitement, focus visibles, onglets ARIA navigables au clavier, accordéon `aria-expanded`, modale avec focus piégé et restauré, textes alternatifs, animations décoratives masquées aux lecteurs d'écran.

## Déploiement

Déployé sur Vercel (build statique `dist/` + fonction `api/contact.ts`).
