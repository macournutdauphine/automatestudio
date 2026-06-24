import { useState, useEffect, useRef } from "react";
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
} from "./icons";

const STEP_DURATION = 5000;

// ─── Données ──────────────────────────────────────────────────────────────────

type Step = {
  number: string;
  icon: (props: { className?: string }) => JSX.Element;
  title: string;
  description: string;
  tools: { name: string; slug: string }[];
};

const workflowSteps: Step[] = [
  {
    number: "01",
    icon: ClipboardListIcon,
    title: "Formulaire mobile",
    description:
      "Saisie d'incident sur mobile, création instantanée dans Airtable avec numéro de référence (SEC-XXXX).",
    tools: [{ name: "Airtable", slug: "airtable" }],
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
      { name: "Airtable", slug: "airtable" },
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
    tools: [{ name: "Airtable", slug: "airtable" }],
  },
  {
    number: "06",
    icon: SparklesIcon,
    title: "Circuit suggestions",
    description:
      "Formulaire parallèle pour les idées d'amélioration, avec routage automatique vers le bon responsable selon le process.",
    tools: [{ name: "Airtable", slug: "airtable" }],
  },
];

const keyMetrics = [
  { value: "~134 h", label: "économisées par an", note: "estimation" },
  { value: "~4 700 €", label: "de valeur générée / an", note: "au coût chargé 35 €/h" },
  { value: "< 1 min", label: "délai d'alerte incident", note: "vs 2 à 4h avant" },
  { value: "−99 %", label: "sur le délai d'alerte", note: "vs process manuel" },
];

const timeBreakdown = [
  { task: "Saisie + transmission d'un incident", calcul: "120 incidents × 10 min", gain: "~20 h/an" },
  { task: "Rédaction du plan d'action", calcul: "120 occurrences × 57 min", gain: "~114 h/an" },
];

const stackTools = [
  { name: "Airtable", slug: "airtable" },
  { name: "Google Apps Script", slug: "googleappsscript" },
  { name: "Gmail", slug: "gmail" },
  { name: "Slack", slug: "slack" },
  { name: "Google Docs", slug: "googledocs" },
];

type CasType = {
  title: string;
  context: { label: string; value: string }[];
  problem: string;
  steps: { number: string; title: string; tools: string[] }[];
  results: string[];
};

const casTypes: CasType[] = [
  {
    title: "Relances commerciales automatisées",
    context: [
      { label: "Profil", value: "PME, 5 commerciaux" },
      { label: "Stack", value: "HubSpot, Gmail, Slack" },
    ],
    problem:
      "Les relances sont faites de mémoire ou oubliées. Les commerciaux passent 2h par semaine à organiser leur pipeline manuellement, sans vue consolidée des prospects chauds.",
    steps: [
      { number: "01", title: "Nouveau prospect tagué selon la source d'entrée", tools: ["HubSpot", "n8n"] },
      { number: "02", title: "J+3 sans réponse : email de relance personnalisé envoyé", tools: ["Gmail"] },
      { number: "03", title: "J+7 sans réponse : notification Slack au commercial responsable", tools: ["Slack"] },
      { number: "04", title: "Rapport hebdo des conversions envoyé chaque lundi", tools: ["Gmail"] },
    ],
    results: [
      "Zéro relance oubliée",
      "~2h économisées par commercial par semaine",
      "Pipeline à jour sans saisie manuelle",
    ],
  },
  {
    title: "Onboarding client en moins de 5 minutes",
    context: [
      { label: "Profil", value: "Agence ou cabinet, 3-5 clients/mois" },
      { label: "Stack", value: "Notion, Gmail, Google Drive" },
    ],
    problem:
      "Chaque onboarding est refait à la main : création des accès, envoi des documents, mise en place des espaces. L'équipe y passe 30 à 45 min par nouveau client.",
    steps: [
      { number: "01", title: "Contrat signé : espace Notion créé depuis un template", tools: ["Notion"] },
      { number: "02", title: "Dossier Google Drive partagé avec les bons accès", tools: ["Google Drive"] },
      { number: "03", title: "Email de bienvenue avec tous les liens envoyé automatiquement", tools: ["Gmail"] },
      { number: "04", title: "Rappel J+7 si certaines étapes non complétées", tools: ["Gmail", "Slack"] },
    ],
    results: [
      "Onboarding lancé en < 5 min (vs 30-45 min)",
      "Aucune étape oubliée",
      "Client opérationnel dès J+1",
    ],
  },
];

// ─── WorkflowSteps (utilisé dans la modale Keprea) ────────────────────────────

function WorkflowSteps() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "0px 0px -60px 0px" });

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  useEffect(() => {
    if (!reduceMotion || !started) return;
    const t = setInterval(() => setActiveIndex((i) => (i + 1) % workflowSteps.length), STEP_DURATION);
    return () => clearInterval(t);
  }, [reduceMotion, started]);

  useEffect(() => {
    if (reduceMotion || !started || activeIndex !== workflowSteps.length - 1) return;
    const t = setTimeout(() => setActiveIndex(0), STEP_DURATION);
    return () => clearTimeout(t);
  }, [reduceMotion, activeIndex, started]);

  const active = workflowSteps[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <div ref={containerRef}>
      <div className="flex items-center">
        {workflowSteps.map((step, i) => {
          const isActive = i === activeIndex;
          const isDone = i < activeIndex;
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className={i < workflowSteps.length - 1 ? "flex flex-1 items-center" : "flex items-center"}
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

              {i < workflowSteps.length - 1 && (
                <div className="relative mx-1.5 h-px flex-1 overflow-hidden bg-black/6">
                  <motion.span
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
                        setActiveIndex((prev) => (i === prev ? (prev + 1) % workflowSteps.length : prev));
                      }
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 hidden grid-cols-6 sm:grid">
        {workflowSteps.map((step, i) => (
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
                  <img
                    key={tool.slug}
                    src={`https://cdn.simpleicons.org/${tool.slug}`}
                    alt={tool.name}
                    title={tool.name}
                    className="h-5 w-5 opacity-55 grayscale transition-opacity duration-300 hover:opacity-80 hover:grayscale-0"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#5F5F5F]">{active.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        {workflowSteps.map((_, i) => (
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

// ─── Contenu des modales ──────────────────────────────────────────────────────

function KepreaModalContent() {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="kicker text-[#66615a]">Keprea · Cas réel</span>
          <h3 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.05em] text-[#111111] sm:text-3xl">
            Automatisation des remontées sécurité sur site
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            <span className="text-[#b0a89e]">
              Secteur <span className="text-[#5F5F5F]">Agriculture</span>
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
            <img
              key={tool.slug}
              src={`https://cdn.simpleicons.org/${tool.slug}`}
              alt={tool.name}
              title={tool.name}
              className="h-5 w-5 opacity-55 grayscale transition-opacity duration-300 hover:opacity-80 hover:grayscale-0"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
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
        <WorkflowSteps />
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
            Estimations fondées sur les volumes observés chez Keprea : 120 incidents déclarés/an, 10 min de saisie par déclaration, plan d'action généré pour chaque incident.
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
      <span className="inline-block rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#66615a]">
        Scénario illustratif
      </span>
      <h3 className="mt-4 font-heading text-2xl font-semibold tracking-[-0.04em] text-[#111111] sm:text-3xl">
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

// ─── Modale ───────────────────────────────────────────────────────────────────

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
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
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

// ─── Bouton de détail ─────────────────────────────────────────────────────────

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

// ─── Carte compacte Keprea ────────────────────────────────────────────────────

function KepreaCompactCard({ onDetail }: { onDetail: () => void }) {
  return (
    <div className="panel-shell">
      <div className="panel-core rounded-[1.8rem] p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <span className="kicker text-[#66615a]">Keprea · Cas réel</span>
            <h3 className="mt-2 font-heading text-xl font-semibold tracking-[-0.05em] text-[#111111] sm:text-2xl">
              Automatisation des remontées sécurité
            </h3>
            <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-[#5F5F5F]">
              Automatisation des process de remontées d'incidents sur site
            </p>
          </div>

          {/* Métriques en ligne */}
          <div className="flex shrink-0 flex-wrap gap-x-6 gap-y-2 sm:justify-end">
            {keyMetrics.slice(0, 3).map((m) => (
              <div key={m.value} className="sm:text-right">
                <p className="font-heading text-xl font-semibold tracking-[-0.04em] text-[#9a5a2c]">
                  {m.value}
                </p>
                <p className="text-[10px] leading-snug text-[#b0a89e]">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <DetailButton onClick={onDetail} label="Voir le cas complet" />
        </div>
      </div>
    </div>
  );
}

// ─── Carte compacte scénario ──────────────────────────────────────────────────

function CasTypeCompactCard({ casType, onDetail }: { casType: CasType; onDetail: () => void }) {
  return (
    <div className="panel-shell h-full">
      <div className="panel-core flex h-full flex-col rounded-[1.5rem] p-5 md:p-6">

        <span className="self-start rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#66615a]">
          Scénario illustratif
        </span>

        <h3 className="mt-4 font-heading text-xl font-semibold tracking-[-0.04em] text-[#111111] md:text-2xl">
          {casType.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          {casType.context.map(({ label, value }) => (
            <span key={label} className="text-[#b0a89e]">
              {label} <span className="text-[#5F5F5F]">{value}</span>
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-1 flex-col gap-2.5">
          {casType.results.map((result) => (
            <div key={result} className="flex items-start gap-2.5">
              <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#9a5a2c]" />
              <p className="text-sm leading-snug text-[#111111]">{result}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <DetailButton onClick={onDetail} label="En savoir plus" />
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function PrototypesSection() {
  const [selectedModal, setSelectedModal] = useState<ModalSelection | null>(null);

  return (
    <section id="realisations" className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Un cas concret, structuré comme une vraie livraison."
          subtitle="Contexte réel, enchaînement documenté, résultat mesurable."
        />

        {/* Keprea — cas réel, carte featured */}
        <FadeUp className="mt-7">
          <KepreaCompactCard onDetail={() => setSelectedModal("keprea")} />
        </FadeUp>

        {/* Scénarios illustratifs */}
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
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
            onClose={() => setSelectedModal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
