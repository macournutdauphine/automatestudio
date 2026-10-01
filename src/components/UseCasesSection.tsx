import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, Check, Clock3, FileText, Filter, LineChart, Sparkles, X, type LucideIcon } from "lucide-react";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { EASE_OUT, Reveal } from "./fx/Reveal";
import { SectionHeading, ToolIcon } from "./ui";
import { tools, type ToolId } from "@/data/tools";

type UseCase = {
  id: string;
  title: string;
  icon: LucideIcon;
  before: string[];
  flow: (ToolId | "ai")[];
  after: string;
  result: string;
};

const useCases: UseCase[] = [
  {
    id: "tri",
    title: "Tri des demandes entrantes",
    icon: Filter,
    before: ["Lire chaque email ou formulaire", "Recopier les informations dans le CRM", "Transférer à la bonne personne"],
    flow: ["gmail", "ai", "hubspot", "slack"],
    after: "Les demandes sont classées, les bons champs extraits et la bonne personne alertée.",
    result: "Plus aucune demande oubliée dans une boîte mail.",
  },
  {
    id: "relances",
    title: "Relances après devis",
    icon: Clock3,
    before: ["Tenir la liste des devis envoyés", "Vérifier qui n'a pas répondu", "Rédiger chaque relance à la main"],
    flow: ["hubspot", "n8n", "gmail"],
    after: "Les rappels partent selon le délai, le statut ou l'absence de réponse.",
    result: "Chaque devis est relancé au bon moment, sans y penser.",
  },
  {
    id: "reporting",
    title: "Rapport hebdo prêt à envoyer",
    icon: LineChart,
    before: ["Exporter les chiffres de chaque outil", "Les copier dans un tableur", "Mettre en forme avant le lundi"],
    flow: ["airtable", "googlesheets", "ai", "gmail"],
    after: "Les chiffres sont rassemblés depuis vos outils et mis en forme avant le point d'équipe.",
    result: "Le rapport arrive tout seul le lundi matin.",
  },
  {
    id: "cr",
    title: "Compte rendu de réunion",
    icon: FileText,
    before: ["Relire ses notes", "Rédiger le compte rendu", "Lister et envoyer les actions"],
    flow: ["googlecalendar", "ai", "notion", "slack"],
    after: "Les notes sont structurées, résumées et transformées en compte rendu avec les actions déjà listées.",
    result: "Chaque participant repart avec ses actions.",
  },
];

const AUTO_ADVANCE_MS = 7000;

export function UseCasesSection() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(panelRef, { margin: "-20% 0px" });
  const reduceMotion = useReducedMotion();

  const running = autoplay && inView && !paused && !reduceMotion;
  const current = useCases[active];

  const select = (index: number, focus = false) => {
    setActive(index);
    setAutoplay(false);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = useCases.length - 1;
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? active === last ? 0 : active + 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? active === 0 ? last : active - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  };

  return (
    <section id="usages" className="relative scroll-mt-24 py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Là où vous perdez du temps"
          title="Ne pas remplacer l'humain. Le rendre plus efficace."
          highlight={["efficace."]}
          subtitle="Moins de ressaisie, moins d'erreurs, la bonne information au bon moment : vos équipes produisent plus et mieux, et gardent leur énergie pour ce qui demande du jugement, du contexte et de la relation."
        />

        <Reveal className="mt-14">
          <div
            ref={panelRef}
            className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            <div
              role="tablist"
              aria-label="Exemples de tâches automatisables"
              className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 lg:flex-col lg:overflow-visible"
            >
              {useCases.map((item, index) => {
                const selected = index === active;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    role="tab"
                    id={`usecase-tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls={`usecase-panel-${item.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(index)}
                    onKeyDown={onKeyDown}
                    className={[
                      "relative flex shrink-0 snap-start items-center gap-3 overflow-hidden rounded-2xl border px-4 py-4 text-left transition-colors duration-300 lg:w-full",
                      selected ? "border-line-strong bg-surface text-fg" : "border-line bg-transparent text-fg-muted hover:bg-white/[0.03] hover:text-fg",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300",
                        selected ? "border-accent/40 bg-accent/15 text-fg" : "border-line text-fg-subtle",
                      ].join(" ")}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="whitespace-nowrap text-[0.95rem] font-medium tracking-[-0.01em] lg:whitespace-normal">{item.title}</span>
                    {selected && autoplay && !reduceMotion ? (
                      <span
                        key={`${item.id}-progress`}
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent to-accent-2"
                        style={{
                          animation: `progress-fill ${AUTO_ADVANCE_MS}ms linear forwards`,
                          animationPlayState: running ? "running" : "paused",
                        }}
                        onAnimationEnd={() => setActive((i) => (i + 1) % useCases.length)}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`usecase-panel-${current.id}`}
              aria-labelledby={`usecase-tab-${current.id}`}
              className="panel relative overflow-hidden p-5 sm:p-8"
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="grid h-full gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch"
                >
                  <Column label="Avant" tone="danger">
                    <ul className="space-y-2.5">
                      {current.before.map((step) => (
                        <li key={step} className="flex items-start gap-2.5 text-sm text-fg-muted">
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-danger/80" aria-hidden="true" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto pt-5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-subtle">manuel · chaque semaine</p>
                  </Column>

                  <Connector />

                  <Column label="Automatisation" tone="accent" highlighted>
                    <ol className="flex flex-col items-start gap-0" aria-label="Enchaînement automatisé">
                      {current.flow.map((node, index) => (
                        <li key={`${node}-${index}`} className="flex flex-col items-start">
                          <m.div
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 + index * 0.1, ease: EASE_OUT }}
                            className="flex items-center gap-3"
                          >
                            {node === "ai" ? (
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/15 text-fg">
                                <Sparkles className="h-4 w-4" aria-hidden="true" />
                              </span>
                            ) : (
                              <ToolIcon id={node} />
                            )}
                            <span className="font-mono text-[0.7rem] text-fg-muted">{node === "ai" ? "Agent IA" : tools[node].name}</span>
                          </m.div>
                          {index < current.flow.length - 1 ? (
                            <span aria-hidden="true" className="relative ml-5 block h-4 w-px overflow-hidden bg-line-strong">
                              <span className="absolute inset-x-0 top-0 h-2 animate-[usecase-drop_1.2s_linear_infinite] bg-accent-2" />
                            </span>
                          ) : null}
                        </li>
                      ))}
                    </ol>
                  </Column>

                  <Connector />

                  <Column label="Résultat" tone="success">
                    <p className="text-sm leading-relaxed text-fg-muted">{current.after}</p>
                    <p className="mt-auto flex items-start gap-2.5 pt-5 text-[0.95rem] font-medium leading-snug text-fg">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                      {current.result}
                    </p>
                  </Column>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const toneDot = {
  danger: "bg-danger",
  accent: "bg-accent",
  success: "bg-success",
};

function Column({
  label,
  tone,
  highlighted = false,
  children,
}: {
  label: string;
  tone: keyof typeof toneDot;
  highlighted?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={[
        "flex flex-col rounded-2xl border p-5",
        highlighted ? "gradient-border border-transparent bg-accent/[0.06]" : "border-line bg-white/[0.02]",
      ].join(" ")}
    >
      <p className="kicker mb-4 flex items-center gap-2">
        <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${toneDot[tone]}`} />
        {label}
      </p>
      {children}
    </div>
  );
}

function Connector() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center text-fg-subtle">
      <ArrowDown className="h-4 w-4 md:-rotate-90" />
    </div>
  );
}
