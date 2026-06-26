import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";

import { FadeUp } from "./animations";
import { Button, SectionHeading } from "./ui";
import {
  BellIcon,
  ClipboardListIcon,
  FileTextIcon,
  MailIcon,
  SparklesIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  XIcon,
} from "./icons";

const STEP_DURATION = 5000;


type Step = {
  number: string;
  icon: (props: { className?: string }) => JSX.Element;
  title: string;
  description: string;
  tools: { name: string; slug: string; src?: string }[];
};

const kepreaWorkflowSteps: Step[] = [
  {
    number: "01",
    icon: ClipboardListIcon,
    title: "Formulaire mobile",
    description:
      "Saisie d'incident sur mobile, création instantanée dans Airtable avec numéro de référence (SEC-XXXX).",
    tools: [{ name: "Airtable", slug: "airtable", src: "/airtable.jpg" }],
  },
  {
    number: "02",
    icon: BellIcon,
    title: "Alerte immédiate",
    description: "Dès soumission, Slack + Gmail envoyés à la référente sécurité et son responsable. En cas d'incident urgent, une alerte Slack est également diffusée à toute l'équipe.",
    tools: [
      { name: "Slack", slug: "slack" },
      { name: "Gmail", slug: "gmail" },
    ],
  },
  {
    number: "03",
    icon: FileTextIcon,
    title: "Plan d'action généré",
    description:
      "Un plan d'action est automatiquement généré et pré-rempli pour chaque incident déclaré, avec les actions correctives à mener déjà listées et tracées.",
    tools: [
      { name: "Google Docs", slug: "googledocs" },
      { name: "Airtable", slug: "airtable", src: "/airtable.jpg" },
    ],
  },
  {
    number: "04",
    icon: MailIcon,
    title: "Récap hebdomadaire",
    description: "Chaque jeudi, un mail récapitulatif des incidents de la semaine est envoyé automatiquement.",
    tools: [{ name: "Gmail", slug: "gmail" }],
  },
  {
    number: "05",
    icon: ClockIcon,
    title: "Passage en retard",
    description: "Chaque matin à 8h, les actions correctives dont l'échéance est dépassée basculent automatiquement.",
    tools: [{ name: "Airtable", slug: "airtable", src: "/airtable.jpg" }],
  },
  {
    number: "06",
    icon: SparklesIcon,
    title: "Circuit suggestions",
    description:
      "Formulaire parallèle pour les idées d'amélioration, avec routage automatique vers le bon responsable selon le process.",
    tools: [{ name: "Airtable", slug: "airtable", src: "/airtable.jpg" }],
  },
];

const pipelineWorkflowSteps: Step[] = [
  {
    number: "01",
    icon: ClipboardListIcon,
    title: "Import et nettoyage",
    description:
      "Le fichier exporté depuis LinkedIn Sales Navigator est importé et normalisé automatiquement. Chaque contact est vérifié dans HubSpot pour éviter les doublons : seuls les nouveaux prospects passent à l'étape suivante.",
    tools: [
      { name: "HubSpot", slug: "hubspot" },
    ],
  },
  {
    number: "02",
    icon: SparklesIcon,
    title: "Priorisation automatique",
    description:
      "Chaque prospect reçoit un score de pertinence basé sur sa correspondance avec votre client idéal : secteur, taille d'entreprise, poste, réseau en commun. La liste est immédiatement triée en Chaud / Tiède / Froid, les meilleurs leads remontent en tête.",
    tools: [],
  },
  {
    number: "03",
    icon: MailIcon,
    title: "Recherche des coordonnées",
    description:
      "Les emails et numéros de téléphone sont recherchés automatiquement via plusieurs sources successives : Apollo en premier, Surfe en relais, Lemlist en dernier recours. Si l'une ne trouve pas, la suivante prend le relais, sans intervention manuelle.",
    tools: [
      { name: "Apollo", slug: "apollographql", src: "https://logosandtypes.com/wp-content/uploads/2022/09/apollo-io.svg" },
      { name: "Surfe", slug: "surfe", src: "https://cdn.brandfetch.io/surfe.com/w/256/h/256/logo" },
      { name: "Lemlist", slug: "lemlist", src: "https://cdn.brandfetch.io/lemlist.com/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed" },
    ],
  },
  {
    number: "04",
    icon: CheckCircleIcon,
    title: "Mise à jour du CRM",
    description:
      "Un écran de validation liste les contacts et entreprises à créer ou mettre à jour avant l'envoi. En un clic, tout est créé proprement dans HubSpot. Un export de secours reste disponible si besoin.",
    tools: [
      { name: "HubSpot", slug: "hubspot" },
    ],
  },
];

const facturesWorkflowSteps: Step[] = [
  {
    number: "01",
    icon: SparklesIcon,
    title: "Détection et extraction",
    description:
      "Dès qu'une facture arrive par email, elle est automatiquement reconnue. L'IA extrait le fournisseur, le montant HT/TTC, la date et l'échéance de paiement, sans aucune saisie manuelle.",
    tools: [
      { name: "Gmail", slug: "gmail", src: "/gmail.svg" },
    ],
  },
  {
    number: "02",
    icon: FileTextIcon,
    title: "Classement dans Drive",
    description:
      "Le PDF est renommé selon la convention interne (AAAA-MM_Fournisseur_Montant) et déposé dans le bon sous-dossier Drive. Un lien direct et toutes les métadonnées sont enregistrés dans Airtable.",
    tools: [
      { name: "Google Drive", slug: "googledrive", src: "/googledrive.svg" },
      { name: "Airtable", slug: "airtable", src: "/airtable.jpg" },
    ],
  },
  {
    number: "03",
    icon: CheckCircleIcon,
    title: "Vérification automatique",
    description:
      "Si les données extraites sont incomplètes ou incohérentes (montant manquant, IBAN absent), une alerte est envoyée au comptable avec le document joint. Sinon, la facture passe en validation automatique.",
    tools: [
      { name: "Gmail", slug: "gmail", src: "/gmail.svg" },
    ],
  },
  {
    number: "04",
    icon: ClockIcon,
    title: "Alerte avant échéance",
    description:
      "5 jours avant la date de paiement, un rappel est envoyé au responsable financier avec le montant, le fournisseur et les coordonnées bancaires, sans qu'il ait besoin d'aller chercher l'information.",
    tools: [
      { name: "Gmail", slug: "gmail", src: "/gmail.svg" },
    ],
  },
  {
    number: "05",
    icon: MailIcon,
    title: "Rapport mensuel automatique",
    description:
      "Le 1er de chaque mois, un récapitulatif est envoyé automatiquement : total des factures traitées, répartition par fournisseur, factures en attente de paiement et montant engagé.",
    tools: [
      { name: "Airtable", slug: "airtable", src: "/airtable.jpg" },
      { name: "Gmail", slug: "gmail", src: "/gmail.svg" },
    ],
  },
];

const locatifWorkflowSteps: Step[] = [
  {
    number: "01",
    icon: MailIcon,
    title: "Quittances envoyées le 1er du mois",
    description:
      "Le 1er de chaque mois, les quittances de loyer sont générées et envoyées automatiquement à chacun des locataires. Chaque email est personnalisé : nom, montant, période et coordonnées du gestionnaire.",
    tools: [
      { name: "Airtable", slug: "airtable", src: "/airtable.jpg" },
      { name: "Gmail", slug: "gmail", src: "/gmail.svg" },
    ],
  },
  {
    number: "02",
    icon: ClockIcon,
    title: "Détection des impayés à J+5",
    description:
      "Cinq jours après la date d'appel, les loyers non encaissés sont détectés automatiquement. Un email de rappel courtois est envoyé à chaque locataire concerné, sans intervention du gestionnaire.",
    tools: [
      { name: "Gmail", slug: "gmail", src: "/gmail.svg" },
    ],
  },
  {
    number: "03",
    icon: BellIcon,
    title: "Relance renforcée à J+10",
    description:
      "Sans règlement à J+10, un second rappel part automatiquement. Le gestionnaire reçoit en parallèle une alerte avec la liste des impayés, les montants et les coordonnées des locataires à contacter.",
    tools: [
      { name: "Gmail", slug: "gmail", src: "/gmail.svg" },
      { name: "Slack", slug: "slack", src: "/slack.svg" },
    ],
  },
  {
    number: "04",
    icon: FileTextIcon,
    title: "Proposition de renouvellement",
    description:
      "3 mois avant la fin de chaque bail, un email de proposition de renouvellement est envoyé automatiquement au locataire, avec les nouvelles conditions et un lien pour confirmer son intention.",
    tools: [
      { name: "Airtable", slug: "airtable", src: "/airtable.jpg" },
      { name: "Gmail", slug: "gmail", src: "/gmail.svg" },
    ],
  },
  {
    number: "05",
    icon: CheckCircleIcon,
    title: "Rapport mensuel propriétaire",
    description:
      "En fin de mois, chaque propriétaire reçoit automatiquement un rapport : loyers encaissés, impayés en cours, charges refacturables et prochaines échéances à surveiller.",
    tools: [
      { name: "Airtable", slug: "airtable", src: "/airtable.jpg" },
      { name: "Gmail", slug: "gmail", src: "/gmail.svg" },
    ],
  },
];

const keyMetrics = [
  { value: "~134 h", label: "économisées par an", note: "estimation" },
  { value: "~4 700 €", label: "de valeur générée / an", note: "au coût chargé 35 €/h" },
  { value: "< 1 min", label: "délai d'alerte incident", note: "vs 2 à 4h avant" },
  { value: "120", label: "déclarations tracées / an", note: "0 perte de donnée" },
];

const timeBreakdown = [
  { task: "Saisie + transmission d'un incident", calcul: "120 incidents × 10 min", gain: "~20 h/an" },
  { task: "Rédaction du plan d'action", calcul: "120 occurrences × 1h*", gain: "~120 h/an" },
];

const stackTools = [
  { name: "Airtable", slug: "airtable", localSrc: "/airtable.jpg" },
  { name: "Google Apps Script", slug: "googleappsscript" },
  { name: "Gmail", slug: "gmail", localSrc: "/gmail.svg" },
  { name: "Slack", slug: "slack" },
  { name: "Google Docs", slug: "googledocs" },
  { name: "Google Drive", slug: "googledrive", localSrc: "/googledrive.svg" },
];

type CasType = {
  title: string;
  badge?: string;
  context: { label: string; value: string }[];
  problem: string;
  steps: { number: string; title: string; tools: string[] }[];
  workflowSteps?: Step[];
  results: string[];
  stackTools?: { name: string; slug: string; src?: string }[];
};

const casTypes: CasType[] = [
  {
    title: "De LinkedIn à votre CRM en quelques minutes",
    context: [
      { label: "Profil", value: "Équipe commerciale, 3 à 5 SDR" },
    ],
    problem:
      "Après chaque extraction LinkedIn, l'équipe passait plusieurs heures à nettoyer les listes, chercher des emails manuellement et décider qui contacter en priorité, sans savoir si le contact était déjà dans le CRM, ni comment le classer.",
    stackTools: [
      { name: "HubSpot", slug: "hubspot" },
      { name: "Apollo", slug: "apollographql", src: "https://logosandtypes.com/wp-content/uploads/2022/09/apollo-io.svg" },
      { name: "Surfe", slug: "surfe", src: "https://cdn.brandfetch.io/surfe.com/w/256/h/256/logo" },
      { name: "Lemlist", slug: "lemlist", src: "https://cdn.brandfetch.io/lemlist.com/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed" },
    ],
    workflowSteps: pipelineWorkflowSteps,
    steps: [
      { number: "01", title: "Import du fichier LinkedIn, vérification automatique des doublons dans HubSpot", tools: ["HubSpot"] },
      { number: "02", title: "Priorisation automatique : Chaud / Tiède / Froid selon le profil, le secteur et le réseau", tools: [] },
      { number: "03", title: "Recherche des emails et téléphones via trois sources successives : Apollo, Surfe, Lemlist", tools: ["Apollo", "Surfe", "Lemlist"] },
      { number: "04", title: "Validation puis mise à jour directe dans HubSpot : contacts et entreprises créés ou mis à jour", tools: ["HubSpot"] },
    ],
    results: [
      "500 prospects traités en moins de 10 min, contre 4 à 5h en manuel",
      "75 à 85 % des contacts enrichis avec email ou téléphone",
      "Les leads les plus pertinents remontent en tête de liste dès l'import",
      "Zéro doublon créé en CRM, pipeline toujours propre",
    ],
  },
  {
    title: "Traitement automatique des factures fournisseurs",
    context: [
      { label: "Profil", value: "PME, 15 à 30 salariés" },
    ],
    problem:
      "Le service comptable recevait les factures par email, les saisissait manuellement dans le tableur de suivi et les classait dans Drive. Résultat : 8 à 10h/mois perdues en saisie répétitive, des paiements oubliés et des doublons réguliers.",
    stackTools: [
      { name: "Gmail", slug: "gmail", src: "/gmail.svg" },
      { name: "Google Drive", slug: "googledrive", src: "/googledrive.svg" },
      { name: "Airtable", slug: "airtable", src: "/airtable.jpg" },
    ],
    workflowSteps: facturesWorkflowSteps,
    steps: [
      { number: "01", title: "Facture reçue par email → extraction automatique par IA (fournisseur, montant, échéance)", tools: ["Gmail"] },
      { number: "02", title: "Classement dans Google Drive + enregistrement dans Airtable avec lien direct", tools: ["Google Drive", "Airtable"] },
      { number: "03", title: "Alerte si données incomplètes, validation automatique sinon", tools: ["Gmail"] },
      { number: "04", title: "Rappel de paiement envoyé 5 jours avant l'échéance", tools: ["Gmail"] },
      { number: "05", title: "Rapport mensuel automatique envoyé le 1er du mois", tools: ["Airtable", "Gmail"] },
    ],
    results: [
      "8 à 10h/mois de saisie manuelle éliminées → ~108h/an économisées",
      "Délai de traitement d'une facture : 2 jours → moins de 10 minutes",
      "0 facture perdue ou dupliquée dans le suivi",
      "~108h × 35 €/h = ~3 780 €/an de valeur générée",
    ],
  },
  {
    title: "Gestion locative automatisée : quittances, relances et renouvellements",
    context: [
      { label: "Profil", value: "Gestionnaire locatif, 60 à 100 lots" },
    ],
    problem:
      "Chaque mois, l'équipe envoyait les quittances de loyer manuellement à 80 locataires, surveillait les paiements et relançait un par un les retardataires. Avec les renouvellements à anticiper, cela représentait 3 à 4 jours de travail répétitif chaque mois.",
    stackTools: [
      { name: "Airtable", slug: "airtable", src: "/airtable.jpg" },
      { name: "Gmail", slug: "gmail", src: "/gmail.svg" },
      { name: "Slack", slug: "slack", src: "/slack.svg" },
    ],
    workflowSteps: locatifWorkflowSteps,
    steps: [
      { number: "01", title: "Le 1er du mois : quittances générées et envoyées automatiquement à chaque locataire", tools: ["Airtable", "Gmail"] },
      { number: "02", title: "J+5 sans paiement : email de rappel automatique au locataire", tools: ["Gmail"] },
      { number: "03", title: "J+10 : second rappel + alerte Slack au gestionnaire avec liste des impayés", tools: ["Gmail", "Slack"] },
      { number: "04", title: "3 mois avant fin de bail : email de proposition de renouvellement", tools: ["Airtable", "Gmail"] },
      { number: "05", title: "Fin de mois : rapport d'encaissement envoyé à chaque propriétaire", tools: ["Airtable", "Gmail"] },
    ],
    results: [
      "80 quittances envoyées en < 2 min, contre 3h30 de saisie manuelle chaque mois",
      "Taux de recouvrement amélioré : relances systématiques, aucun impayé oublié",
      "~90h/an économisées → ~3 150 €/an au coût chargé 35 €/h",
      "0 bail renouvelé dans l'urgence : chaque échéance anticipée 3 mois à l'avance",
    ],
  },
];

function ToolIcon({ name, slug, localSrc }: { name: string; slug: string; localSrc?: string }) {
  return (
    <img
      src={localSrc ?? `https://cdn.simpleicons.org/${slug}`}
      alt={name}
      title={name}
      className="h-5 w-5 opacity-55 grayscale transition-opacity duration-300 hover:opacity-80 hover:grayscale-0"
      loading="lazy"
      decoding="async"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

function WorkflowSteps({ steps }: { steps: Step[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [generation, setGeneration] = useState(0);
  const [started, setStarted] = useState(false);
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "0px 0px -60px 0px" });

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  useEffect(() => {
    if (reduceMotion || !started) return;
    const t = setInterval(() => setActiveIndex((i) => (i + 1) % steps.length), STEP_DURATION);
    return () => clearInterval(t);
  }, [reduceMotion, started, steps.length]);

  useEffect(() => {
    if (reduceMotion || !started || activeIndex !== steps.length - 1) return;
    const t = setTimeout(() => {
      setGeneration((g) => g + 1);
      setActiveIndex(0);
    }, STEP_DURATION);
    return () => clearTimeout(t);
  }, [reduceMotion, activeIndex, started, steps.length]);

  const active = steps[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <div ref={containerRef}>
      <div className="flex items-center">
        {steps.map((step, i) => {
          const isActive = i === activeIndex;
          const isDone = i < activeIndex;
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className={i < steps.length - 1 ? "flex flex-1 items-center" : "flex items-center"}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={step.title}
                aria-pressed={isActive}
                className={[
                  "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  isActive
                    ? "border-[#9a5a2c] bg-[#9a5a2c] text-white shadow-[0_0_0_4px_rgba(154,90,44,0.10)]"
                    : isDone
                      ? "border-[#9a5a2c]/25 bg-[#9a5a2c]/[0.07] text-[#9a5a2c]"
                      : "border-black/8 bg-white text-[#9a9389]",
                ].join(" ")}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>

              {i < steps.length - 1 && (
                <div className="relative mx-1.5 h-px flex-1 overflow-hidden bg-black/6">
                  <motion.span
                    key={`${generation}-${i}`}
                    className="absolute inset-y-0 left-0 bg-[#9a5a2c]/35"
                    initial={{ width: "0%" }}
                    animate={{ width: isDone ? "100%" : isActive && started ? "100%" : "0%" }}
                    transition={
                      isDone
                        ? { duration: 0 }
                        : isActive && started && !reduceMotion
                          ? { duration: STEP_DURATION / 1000, ease: "linear" }
                          : { duration: 0 }
                    }
                    onAnimationComplete={() => {
                      if (!reduceMotion && started && isActive) {
                        setActiveIndex((prev) => (i === prev ? (prev + 1) % steps.length : prev));
                      }
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={`mt-2.5 hidden sm:grid`} style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        {steps.map((step, i) => (
          <p
            key={step.number}
            className={[
              "pr-4 text-[9.5px] leading-snug transition-colors duration-500",
              i === activeIndex ? "font-medium text-[#111111]" : "text-[#b0a89e]",
            ].join(" ")}
          >
            {step.title}
          </p>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-[1.35rem] border border-black/5 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
            className="p-5 md:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-white">
                  <ActiveIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#66615a]">
                    étape {active.number}
                  </p>
                  <p className="mt-0.5 font-semibold tracking-[-0.02em] text-[#111111]">{active.title}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {active.tools.map((tool) => (
                  <ToolIcon key={tool.slug} name={tool.name} slug={tool.slug} localSrc={tool.src} />
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#5F5F5F]">{active.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        {steps.map((_: Step, i: number) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Étape ${i + 1}`}
            className={[
              "h-1 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
              i === activeIndex ? "w-5 bg-[#9a5a2c]" : "w-1.5 bg-black/12",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

function KepreaModalContent() {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-heading text-2xl font-semibold tracking-[-0.05em] text-[#111111] sm:text-3xl">
            Automatisation des remontées sécurité sur site
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            <span className="text-[#b0a89e]">
              Secteur <span className="text-[#5F5F5F]">Agritech</span>
            </span>
            <span className="text-[#b0a89e]">
              Taille <span className="text-[#5F5F5F]">20 employés</span>
            </span>
            <span className="text-[#b0a89e]">
              Déploiement <span className="text-[#5F5F5F]">2 semaines</span>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:justify-end">
          {stackTools.map((tool) => (
            <ToolIcon key={tool.slug} name={tool.name} slug={tool.slug} />
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-[1.35rem] border border-black/5 bg-[#f3eee4] p-5 md:p-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#66615a]">problème</p>
        <p className="mt-3 text-sm leading-relaxed text-[#111111]">
          Les incidents de sécurité et suggestions d'amélioration étaient remontés manuellement (papier ou mail) sans traçabilité, sans suivi des délais, sans aucune alerte automatique.
        </p>
      </div>

      <div className="mt-6">
        <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.24em] text-[#66615a]">workflow mis en place</p>
        <WorkflowSteps steps={kepreaWorkflowSteps} />
      </div>

      <div className="mt-6 rounded-[1.35rem] border border-[#9a5a2c]/15 bg-[#9a5a2c]/[0.06] p-5 md:p-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#9a5a2c]">résultats</p>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {keyMetrics.map((m) => (
            <div key={m.value} className="rounded-xl border border-black/5 bg-white p-3 md:p-4">
              <p className="font-heading text-2xl font-semibold tracking-[-0.04em] text-[#9a5a2c] md:text-3xl">
                {m.value}
              </p>
              <p className="mt-1.5 text-[11px] leading-snug text-[#111111]">{m.label}</p>
              <p className="mt-1 text-[10px] text-[#b0a89e]">{m.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-1.5">
          {timeBreakdown.map((row) => (
            <div key={row.task} className="flex items-center gap-3 rounded-lg bg-white/60 px-3 py-2.5">
              <div className="flex-1">
                <p className="text-xs font-medium text-[#111111]">{row.task}</p>
                <p className="mt-0.5 font-mono text-[10px] text-[#b0a89e]">{row.calcul}</p>
              </div>
              <span className="shrink-0 rounded-full bg-[#9a5a2c]/[0.10] px-2.5 py-1 text-[11px] font-medium text-[#9a5a2c]">
                {row.gain}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1.5 border-t border-black/5 pt-4">
          <p className="text-xs font-medium text-[#111111]">
            Total : ~134 heures/an économisées · à 35 €/h chargé →{" "}
            <span className="text-[#9a5a2c]">~4 700 €/an</span>
          </p>
          <p className="text-[10px] leading-relaxed text-[#b0a89e]">
            Estimations fondées sur les volumes observés : 120 incidents déclarés/an, 10 min de saisie par déclaration. *1h : temps de rédaction manuelle d'un plan d'action mesuré en interne avant automatisation.
          </p>
        </div>
        <div className="mt-3 rounded-xl border border-black/5 bg-white/60 px-4 py-3">
          <p className="text-xs leading-relaxed text-[#111111]">
            En déchargeant la responsable HSE des tâches de saisie et de suivi, l'automatisation lui a permis de{" "}
            <span className="font-medium">se concentrer sur des missions à plus forte valeur ajoutée</span>{" "}
            et d'augmenter significativement sa productivité.
          </p>
        </div>
      </div>
    </>
  );
}

function CasTypeModalContent({ casType }: { casType: CasType }) {
  return (
    <>
      <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-[#111111] sm:text-3xl">
        {casType.title}
      </h3>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        {casType.context.map(({ label, value }) => (
          <span key={label} className="text-[#b0a89e]">
            {label} <span className="text-[#5F5F5F]">{value}</span>
          </span>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-black/5 bg-[#f3eee4] p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#66615a]">problème</p>
        <p className="mt-2 text-sm leading-relaxed text-[#111111]">{casType.problem}</p>
      </div>

      <div className="mt-5">
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.24em] text-[#66615a]">flux automatisé</p>
        {casType.workflowSteps ? (
          <WorkflowSteps steps={casType.workflowSteps} />
        ) : (
          <div className="flex flex-col gap-3">
            {casType.steps.map((step) => (
              <div key={step.number} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/[0.05] font-mono text-[9px] text-[#66615a]">
                  {step.number}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-[#111111]">{step.title}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {step.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-black/8 px-2 py-0.5 text-[10px] text-[#9a9389]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 rounded-xl border border-[#9a5a2c]/12 bg-[#9a5a2c]/[0.04] p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#9a5a2c]">résultats attendus</p>
        <ul className="mt-3 flex flex-col gap-2">
          {casType.results.map((result) => (
            <li key={result} className="flex items-start gap-2.5">
              <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#9a5a2c]" />
              <span className="text-sm text-[#111111]">{result}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

type ModalSelection = "keprea" | number;

function CaseDetailModal({ type, onClose }: { type: ModalSelection; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const isKeprea = type === "keprea";
  const casType = typeof type === "number" ? casTypes[type] : null;
  const title = isKeprea ? "Automatisation des remontées sécurité" : (casType?.title ?? "");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {/* Backdrop — fixed, backdrop-blur appliqué uniquement ici (élément fixe) */}
      <div
        className="fixed inset-0 bg-[#111111]/55 backdrop-blur-[4px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="flex min-h-full items-start justify-center px-4 py-10 sm:py-16">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="relative z-10 w-full max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 14, scale: 0.985 }}
          transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Double-bezel outer shell */}
          <div className="rounded-[2rem] border border-black/[0.06] bg-[#111111]/[0.025] p-1.5 shadow-[0_48px_100px_-24px_rgba(17,17,17,0.28)]">
            {/* Inner core */}
            <div className="relative rounded-[calc(2rem-0.375rem)] bg-[#F5F1EA] shadow-[inset_0_1px_1px_rgba(255,255,255,0.82)]">

              {/* Bouton fermer */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                autoFocus
                className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/8 bg-white/80 text-[#66615a] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white hover:text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#9a5a2c]/30"
              >
                <XIcon className="h-4 w-4" />
              </button>

              <div className="p-6 md:p-10">
                {isKeprea ? <KepreaModalContent /> : casType ? <CasTypeModalContent casType={casType} /> : null}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function DetailButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#9a5a2c] transition-opacity duration-300 hover:opacity-70"
    >
      {label}
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#9a5a2c]/[0.09] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}

function KepreaCompactCard({ onDetail }: { onDetail: () => void }) {
  return (
    <div className="panel-shell">
      <div className="panel-core rounded-[1.8rem] p-5 md:p-7">

        {/* Tags contexte */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-black/8 bg-white/70 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#66615a]">Agritech</span>
          <span className="rounded-full border border-black/8 bg-white/70 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#66615a]">20 employés</span>
          <span className="rounded-full border border-black/8 bg-white/70 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#66615a]">Déployé en 2 semaines</span>
        </div>

        {/* Titre */}
        <h3 className="mt-3 font-heading text-xl font-semibold tracking-[-0.05em] text-[#111111] sm:text-2xl">
          Automatisation des remontées sécurité sur site
        </h3>

        {/* Description */}
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5F5F5F]">
          Les incidents étaient remontés manuellement (papier ou mail) sans traçabilité, sans suivi des délais, sans alerte automatique. Chaque déclaration nécessitait une saisie manuelle puis la rédaction d'un plan d'action depuis zéro.
        </p>

        {/* Bas de carte : stack + bouton */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#b0a89e]">Stack</p>
            <div className="flex items-center gap-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-black/[0.07] bg-white/80 p-1">
                <img src="/airtable.jpg" alt="Airtable" className="h-full w-full object-contain rounded-lg" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-black/[0.07] bg-white/80 p-1.5">
                <img src="/slack.svg" alt="Slack" className="h-full w-full object-contain" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-black/[0.07] bg-white/80 p-1.5">
                <img src="/gmail.svg" alt="Gmail" className="h-full w-full object-contain" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-black/[0.07] bg-white/80 p-1.5">
                <img src="/googledrive.svg" alt="Google Drive" className="h-full w-full object-contain" />
              </div>
            </div>
          </div>
          <DetailButton onClick={onDetail} label="Voir le cas complet" />
        </div>
      </div>
    </div>
  );
}

function CasTypeCompactCard({ casType, onDetail }: { casType: CasType; onDetail: () => void }) {
  return (
    <div className="panel-shell h-full">
      <div className="panel-core flex h-full flex-col rounded-[1.5rem] p-5 md:p-6">

        <h3 className="font-heading text-xl font-semibold tracking-[-0.04em] text-[#111111] md:text-2xl">
          {casType.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          {casType.context.map(({ label, value }) => (
            <span key={label} className="text-[#b0a89e]">
              {label} <span className="text-[#5F5F5F]">{value}</span>
            </span>
          ))}
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5F5F5F]">{casType.problem}</p>

        <div className="mt-5 flex items-center justify-between gap-4">
          {casType.stackTools && (
            <div className="flex items-center gap-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#b0a89e]">Stack</p>
              <div className="flex items-center gap-1.5">
                {casType.stackTools.map((tool) => (
                  <div key={tool.slug} className="flex h-7 w-7 items-center justify-center rounded-xl border border-black/[0.07] bg-white/80 p-1.5">
                    <img
                      src={tool.src ?? `https://cdn.simpleicons.org/${tool.slug}`}
                      alt={tool.name}
                      title={tool.name}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <DetailButton onClick={onDetail} label="En savoir plus" />
        </div>
      </div>
    </div>
  );
}

export function PrototypesSection() {
  const [selectedModal, setSelectedModal] = useState<ModalSelection | null>(null);
  const handleClose = useCallback(() => setSelectedModal(null), []);

  return (
    <section id="realisations" className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Des cas concrets délivrés à nos clients."
          subtitle="Contexte réel, enchaînement documenté, résultat mesurable."
        />

        {/* Keprea — cas réel, carte featured */}
        <FadeUp className="mt-7">
          <KepreaCompactCard onDetail={() => setSelectedModal("keprea")} />
        </FadeUp>

        {/* Scénarios illustratifs */}
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {casTypes.map((casType, i) => (
            <FadeUp key={casType.title} delay={0.05 + i * 0.06} className="h-full">
              <CasTypeCompactCard casType={casType} onDetail={() => setSelectedModal(i)} />
            </FadeUp>
          ))}
        </div>

        {/* CTA */}
        <FadeUp delay={0.1} className="mt-4">
          <div className="panel-shell">
              <div className="panel-core rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
              <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
                <div>
                  <p className="kicker text-[#5F5F5F]">Prochaine étape</p>
                  <h3 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.045em] text-[#111111] sm:text-3xl">
                    Votre premier flux opérationnel en deux semaines.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5F5F5F]">
                    On part d'un cas précis chez vous, on le structure, on le branche à vos outils.
                  </p>
                </div>
                <div className="shrink-0 md:pl-8">
                  <Button href="#contact" variant="orange">
                    Parlez-nous de vos besoins
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Modales — AnimatePresence gère les transitions d'entrée/sortie */}
      <AnimatePresence>
        {selectedModal !== null && (
          <CaseDetailModal
            key={String(selectedModal)}
            type={selectedModal}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
