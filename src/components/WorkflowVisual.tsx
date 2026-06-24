import { AnimatePresence, motion, useReducedMotion, useInView } from "framer-motion";
import {
  BarChartIcon,
  DatabaseIcon,
  ClockIcon,
  MailIcon,
  FileTextIcon,
  FunnelIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "./icons";
import { useEffect, useRef, useState } from "react";

type IconComponent = typeof FileTextIcon;

type WorkflowStep = {
  badge: string;
  title: string;
  description: string;
  status: string;
  icon: IconComponent;
};

type WorkflowDefinition = {
  id: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
};

const workflows: WorkflowDefinition[] = [
  {
    id: "demande-recue",
    title: "Demande reçue",
    description: "Le flux trie, résume et distribue les demandes sans intervention manuelle.",
    steps: [
      {
        badge: "01",
        title: "Demande reçue",
        description: "Formulaire, email ou CRM",
        status: "en cours",
        icon: FileTextIcon,
      },
      {
        badge: "02",
        title: "Tri IA",
        description: "Qualification et résumé",
        status: "traité",
        icon: FunnelIcon,
      },
      {
        badge: "03",
        title: "Action automatique",
        description: "Relance, notification ou mise à jour",
        status: "déclenché",
        icon: SparklesIcon,
      },
      {
        badge: "04",
        title: "Données synchronisées",
        description: "CRM, tableur ou base interne",
        status: "synchronisé",
        icon: DatabaseIcon,
      },
      {
        badge: "05",
        title: "Reporting prêt",
        description: "Suivi clair et historisé",
        status: "prêt",
        icon: BarChartIcon,
      },
    ],
  },
  {
    id: "relance-devis",
    title: "Relance de devis",
    description: "Une fois le premier workflow terminé, un autre scénario prend le relais sans changer le système d'affichage.",
    steps: [
      {
        badge: "01",
        title: "Devis envoyé",
        description: "PDF, lien ou document partagé",
        status: "en cours",
        icon: FileTextIcon,
      },
      {
        badge: "02",
        title: "Délai surveillé",
        description: "Contexte, échéance et priorité",
        status: "attente",
        icon: ClockIcon,
      },
      {
        badge: "03",
        title: "Relance automatique",
        description: "Email ou tâche assignée",
        status: "envoyé",
        icon: MailIcon,
      },
      {
        badge: "04",
        title: "Réponse qualifiée",
        description: "Intérêt, objection ou suite à donner",
        status: "traité",
        icon: FunnelIcon,
      },
      {
        badge: "05",
        title: "Signature archivée",
        description: "CRM, dossier client, suivi final",
        status: "clos",
        icon: DatabaseIcon,
      },
    ],
  },
];

const desktopPoints = [
  { x: 170, y: 108 },
  { x: 780, y: 190 },
  { x: 235, y: 315 },
  { x: 775, y: 430 },
  { x: 855, y: 510 },
];

const mobilePoints = [
  { x: 22, y: 104 },
  { x: 22, y: 228 },
  { x: 22, y: 347 },
  { x: 22, y: 463 },
  { x: 22, y: 579 },
];


function WorkflowStepCard({
  step,
  active,
  reducedMotion,
}: {
  step: WorkflowStep;
  active: boolean;
  reducedMotion: boolean;
}) {
  const Icon = step.icon;

  return (
    <motion.article
      className={[
        "min-w-0 w-full rounded-2xl border p-4 whitespace-normal leading-snug transition-transform duration-300",
        active
          ? "border-[#9a5a2c]/28 bg-[linear-gradient(180deg,rgba(154,90,44,0.035),rgba(255,255,255,1))] shadow-[0_14px_30px_-26px_rgba(154,90,44,0.28)]"
          : "border-black/10 bg-white shadow-[0_10px_22px_-22px_rgba(17,17,17,0.16)]",
      ].join(" ")}
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reducedMotion ? undefined : { y: -3 }}
    >
      <div className="flex items-start justify-between gap-2.5">
        <div
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300",
            active ? "border-[#9a5a2c]/15 bg-[#111111] text-white" : "border-black/10 bg-[#F7F4EE] text-[#111111]",
          ].join(" ")}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="flex min-w-0 flex-col items-end gap-1">
          <span
            className={[
              "rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.22em]",
              active ? "border border-[#9a5a2c]/20 bg-[#111111] text-white" : "border border-black/10 bg-[#F7F4EE] text-[#66615a]",
            ].join(" ")}
          >
            {step.badge}
          </span>
          <span
            className={[
              "rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em]",
              active ? "border-[#9a5a2c]/15 bg-[#F7F4EE] text-[#111111]" : "border-transparent bg-transparent text-transparent",
            ].join(" ")}
          >
            {step.status}
          </span>
        </div>
      </div>

      <h3 className="mt-3.5 text-[0.95rem] font-semibold tracking-[-0.03em] text-[#111111] md:text-[1rem]">
        {step.title}
      </h3>
      <p className="mt-1 text-[0.82rem] leading-relaxed text-[#66615a]">
        {step.description}
      </p>
    </motion.article>
  );
}

function ConnectorLine({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  return (
    <div className="relative my-3 hidden items-center justify-center px-1 sm:flex">
      <div className="relative flex-1 h-px overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#cfa15a]/30 to-transparent" />
        <motion.span
          className="absolute inset-0 origin-left bg-gradient-to-r from-[#9a5a2c]/55 via-[#cfa15a] to-[#f1c36d]/70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="mx-3 h-2 w-2 rounded-full bg-[#f1c36d] shadow-[0_0_0_4px_rgba(241,195,109,0.12)]" />
      <div className="relative flex-1 h-px overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#cfa15a]/30 to-transparent" />
        <motion.span
          className="absolute inset-0 origin-left bg-gradient-to-r from-[#f1c36d]/70 via-[#cfa15a] to-[#9a5a2c]/55"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        />
      </div>
    </div>
  );
}

function ConnectorStack({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  return (
    <div className="my-2.5 flex items-center justify-center sm:hidden">
      <div className="relative h-6 w-px overflow-hidden">
        <span className="absolute inset-0 bg-[#cfa15a]/40" />
        <motion.span
          className="absolute inset-0 origin-top bg-[#9a5a2c]/75"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: active ? 1 : 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="ml-[-3px] h-2 w-2 rounded-full bg-[#f1c36d] shadow-[0_0_0_4px_rgba(241,195,109,0.12)]" />
    </div>
  );
}

function DesktopRail({ activeStep, reducedMotion }: { activeStep: number; reducedMotion: boolean }) {
  const current = desktopPoints[activeStep];

  return (
    <motion.svg
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
      viewBox="0 0 1000 640"
      preserveAspectRatio="none"
      aria-hidden="true"
      initial={reducedMotion ? false : { opacity: 0 }}
      whileInView={reducedMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.4, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
    >
      <defs>
        <linearGradient id="workflow-rail" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9a5a2c" stopOpacity="0" />
          <stop offset="50%" stopColor="#9a5a2c" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#9a5a2c" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M 132 122 C 286 122, 440 118, 586 146 C 694 166, 752 182, 824 198"
        fill="none"
        stroke="url(#workflow-rail)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 824 198 C 694 244, 598 274, 468 318 C 380 348, 312 360, 194 388"
        fill="none"
        stroke="url(#workflow-rail)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 194 388 C 330 414, 470 434, 616 454 C 726 472, 790 492, 880 522"
        fill="none"
        stroke="url(#workflow-rail)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {desktopPoints.map((point, index) => (
        <circle
          key={point.x}
          cx={point.x}
          cy={point.y}
          r={index === activeStep ? 5 : 3.5}
          fill={index === activeStep ? "#f1c36d" : "#d8b06b"}
          fillOpacity={index === activeStep ? 0.95 : 0.38}
        />
      ))}

      {!reducedMotion ? (
        <motion.circle
          initial={false}
          animate={{
            cx: current.x,
            cy: current.y,
            opacity: [0.35, 0.95, 0.35],
          }}
          r={6}
          fill="#f1c36d"
          transition={{
            cx: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
            cy: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 2.6, repeat: Infinity, ease: [0.32, 0.72, 0, 1] },
          }}
        />
      ) : null}
    </motion.svg>
  );
}

function MobileRail({ activeStep, reducedMotion }: { activeStep: number; reducedMotion: boolean }) {
  const current = mobilePoints[activeStep];

  return (
    <motion.svg
      className="pointer-events-none absolute inset-0 z-0 sm:hidden"
      viewBox="0 0 80 640"
      preserveAspectRatio="none"
      aria-hidden="true"
      initial={reducedMotion ? false : { opacity: 0 }}
      whileInView={reducedMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
    >
      <defs>
        <linearGradient id="workflow-mobile-rail" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9a5a2c" stopOpacity="0" />
          <stop offset="50%" stopColor="#9a5a2c" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#9a5a2c" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M 22 102 C 22 168, 22 188, 22 228 C 22 288, 22 306, 22 347 C 22 403, 22 424, 22 463 C 22 525, 22 545, 22 579"
        fill="none"
        stroke="url(#workflow-mobile-rail)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {mobilePoints.map((point, index) => (
        <circle
          key={point.y}
          cx={point.x}
          cy={point.y}
          r={index === activeStep ? 4.5 : 3}
          fill={index === activeStep ? "#f1c36d" : "#d8b06b"}
          fillOpacity={index === activeStep ? 0.95 : 0.4}
        />
      ))}

      {!reducedMotion ? (
        <motion.circle
          initial={false}
          animate={{
            cx: current.x,
            cy: current.y,
            opacity: [0.3, 0.95, 0.3],
          }}
          r={5.5}
          fill="#f1c36d"
          transition={{
            cx: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
            cy: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 2.6, repeat: Infinity, ease: [0.32, 0.72, 0, 1] },
          }}
        />
      ) : null}
    </motion.svg>
  );
}

function StepViewport({
  step,
  active,
  reducedMotion,
}: {
  step: WorkflowStep;
  active: boolean;
  reducedMotion: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.badge}
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        className="relative z-10 w-full"
      >
        <WorkflowStepCard step={step} active={active} reducedMotion={reducedMotion} />
      </motion.div>
    </AnimatePresence>
  );
}

function HiddenStepCard({
  step,
  active,
  reducedMotion,
  revealed,
  visibility,
  revealDelay,
}: {
  step: WorkflowStep;
  active: boolean;
  reducedMotion: boolean;
  revealed: boolean;
  visibility: number;
  revealDelay: number;
}) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.985 }}
      animate={{
        opacity: revealed ? visibility : 0,
        y: revealed ? 0 : 12,
        scale: revealed ? 1 : 0.985,
        height: "auto",
      }}
      transition={{
        delay: revealed ? revealDelay : 0,
        opacity: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
      }}
      className={[
        "relative z-10",
        revealed ? "" : "pointer-events-none",
      ].join(" ")}
    >
      <WorkflowStepCard step={step} active={active} reducedMotion={reducedMotion} />
    </motion.div>
  );
}

export function WorkflowVisual() {
  const reducedMotion = Boolean(useReducedMotion());
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  // amount:0.15 = déclenche quand 15% du composant est visible, sans rétrécir la zone
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  // Remet à zéro la séquence dès que la section entre dans le viewport
  useEffect(() => {
    if (!isInView) return;
    setActiveStep(0);
    setActiveWorkflowIndex(0);
  }, [isInView]);

  // Auto-cycle — tourne toujours (pas conditionné à isInView)
  useEffect(() => {
    if (reducedMotion) return undefined;

    const interval = window.setInterval(() => {
      setActiveStep((currentStep) => {
        const currentWorkflow = workflows[activeWorkflowIndex];

        if (currentStep < currentWorkflow.steps.length - 1) {
          return currentStep + 1;
        }

        setActiveWorkflowIndex((currentWorkflowIndex) => (currentWorkflowIndex + 1) % workflows.length);
        return 0;
      });
    }, 3600);

    return () => window.clearInterval(interval);
  }, [reducedMotion, activeWorkflowIndex]);

  const currentWorkflow = workflows[activeWorkflowIndex];
  const step = currentWorkflow.steps[0];

  return (
    <div ref={containerRef} className="relative">
      <div className="relative rounded-[2rem] border border-black/10 bg-[#F7F4EE] shadow-[0_18px_50px_-38px_rgba(17,17,17,0.28)]">
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(rgba(17,17,17,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,0.028)_1px,transparent_1px)] bg-[size:28px_28px] opacity-60" />
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_15%_10%,rgba(241,195,109,0.09),transparent_30%),radial-gradient(circle_at_86%_12%,rgba(154,90,44,0.06),transparent_24%)]" />

        <MobileRail activeStep={activeStep} reducedMotion={reducedMotion} />
        <DesktopRail activeStep={activeStep} reducedMotion={reducedMotion} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentWorkflow.id}
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 p-5 sm:p-6 lg:min-h-[520px] lg:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#66615a]">
                  Workflow automatisé
                </p>
                <p className="mt-2 max-w-md text-sm font-semibold leading-snug text-[#111111]">
                  {currentWorkflow.title}
                </p>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-[#5F5F5F]">
                  {currentWorkflow.description}
                </p>
              </div>
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#66615a]">
                clair
              </span>
            </div>

            <div className="mt-4">
              <div className="sm:hidden">
                <StepViewport step={step} active={true} reducedMotion={reducedMotion} />
              </div>

              <div className="hidden sm:block">
                <StepViewport step={step} active={true} reducedMotion={reducedMotion} />
              </div>

              <ConnectorLine active={activeStep >= 1} reducedMotion={reducedMotion} />
              <ConnectorStack active={activeStep >= 1} reducedMotion={reducedMotion} />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {currentWorkflow.steps.slice(1).map((item, index) => {
                  const stepIndex = index + 1;
                  const revealed = activeStep >= stepIndex;
                  const visibility = Math.min(1, 0.62 + index * 0.1);
                  const revealDelay = index * 0.16;

                  return (
                    <div key={item.badge} className="min-w-0">
                      <HiddenStepCard
                        step={item}
                        active={activeStep === stepIndex}
                        reducedMotion={reducedMotion}
                        revealed={revealed}
                        visibility={visibility}
                        revealDelay={revealDelay}
                      />
                      {stepIndex < currentWorkflow.steps.length - 1 ? (
                        <ConnectorStack active={revealed} reducedMotion={reducedMotion} />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
