import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { ToolIcon } from "../ui";
import { EASE_OUT } from "../fx/Reveal";
import type { ToolId } from "@/data/tools";

/* Espace de coordonnées partagé par le SVG et les nœuds HTML. */
const W = 520;
const H = 340;

const NODES = {
  trigger: { x: 70, y: 170 },
  ai: { x: 215, y: 170 },
  top: { x: 385, y: 58 },
  mid: { x: 445, y: 170 },
  bottom: { x: 385, y: 262 },
} as const;

type ActionSlot = "top" | "mid" | "bottom";

const EDGES: { id: string; to: "ai" | ActionSlot; d: string }[] = [
  { id: "e-ai", to: "ai", d: "M 70 170 C 120 170, 165 170, 215 170" },
  { id: "e-top", to: "top", d: "M 215 170 C 295 170, 300 58, 385 58" },
  { id: "e-mid", to: "mid", d: "M 215 170 C 300 170, 360 170, 445 170" },
  { id: "e-bottom", to: "bottom", d: "M 215 170 C 295 170, 300 262, 385 262" },
];

type Step = { tool: ToolId; label: string; log: string };

type Scenario = {
  id: string;
  name: string;
  trigger: Step;
  ai: string;
  aiLog: string;
  actions: Record<ActionSlot, Step>;
  summary: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "demande",
    name: "Demande entrante",
    trigger: { tool: "airtable", label: "Formulaire soumis", log: "nouvelle demande · Société Dumas" },
    ai: "Qualifie et résume",
    aiLog: "priorité haute · besoin : devis",
    actions: {
      top: { tool: "hubspot", label: "Contact créé", log: "contact + transaction créés" },
      mid: { tool: "slack", label: "Équipe alertée", log: "#commercial notifié" },
      bottom: { tool: "gmail", label: "Réponse envoyée", log: "accusé de réception envoyé" },
    },
    summary: "3 actions · 0 ressaisie",
  },
  {
    id: "facture",
    name: "Facture fournisseur",
    trigger: { tool: "gmail", label: "Facture reçue", log: "pièce jointe détectée · PDF" },
    ai: "Extrait les données",
    aiLog: "montant TTC et échéance extraits",
    actions: {
      top: { tool: "googledrive", label: "PDF classé", log: "2026-10_Dumas.pdf rangé" },
      mid: { tool: "airtable", label: "Suivi mis à jour", log: "ligne ajoutée au suivi" },
      bottom: { tool: "googlecalendar", label: "Rappel planifié", log: "rappel paiement J-5" },
    },
    summary: "classée en 1,6 s",
  },
  {
    id: "reporting",
    name: "Reporting hebdo",
    trigger: { tool: "n8n", label: "Lundi 08:00", log: "déclenchement planifié" },
    ai: "Synthétise la semaine",
    aiLog: "12 indicateurs consolidés",
    actions: {
      top: { tool: "googlesheets", label: "Chiffres consolidés", log: "onglet S40 généré" },
      mid: { tool: "notion", label: "Rapport publié", log: "page « Semaine 40 » publiée" },
      bottom: { tool: "teams", label: "Équipe notifiée", log: "canal Direction notifié" },
    },
    summary: "prêt avant le point d'équipe",
  },
];

type LogLine = { id: number; source: string; text: string; tone: "trigger" | "ai" | "action" | "done" };

/* Durée de chaque phase d'une exécution, en ms. */
const PHASES = [500, 900, 1100, 1400, 2400];

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

export function FlowVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  const [run, setRun] = useState(0);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const logId = useRef(0);
  const clock = useRef(9 * 3600 + 41 * 60 + 2);

  const scenario = SCENARIOS[scenarioIndex];

  // Enchaîne les phases de l'exécution, puis passe au scénario suivant.
  useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(() => {
      if (phase < PHASES.length - 1) {
        setPhase(phase + 1);
      } else {
        setPhase(0);
        setRun((r) => r + 1);
        setScenarioIndex((i) => (i + 1) % SCENARIOS.length);
      }
    }, PHASES[phase]);
    return () => window.clearTimeout(id);
  }, [phase, inView]);

  // Journal d'événements, alimenté à chaque phase.
  useEffect(() => {
    const stamp = () => {
      clock.current += 1;
      const t = clock.current;
      const hh = String(Math.floor(t / 3600) % 24).padStart(2, "0");
      const mm = String(Math.floor(t / 60) % 60).padStart(2, "0");
      const ss = String(t % 60).padStart(2, "0");
      return `${hh}:${mm}:${ss}`;
    };
    const push = (lines: Omit<LogLine, "id">[]) =>
      setLogs((current) =>
        [...current, ...lines.map((line) => ({ ...line, id: ++logId.current, text: `${stamp()}  ${line.text}` }))].slice(-5),
      );

    if (phase === 1) push([{ source: scenario.trigger.tool, text: scenario.trigger.log, tone: "trigger" }]);
    if (phase === 2) push([{ source: "agent-ia", text: scenario.aiLog, tone: "ai" }]);
    if (phase === 3)
      push(
        (["top", "mid", "bottom"] as const).map((slot) => ({
          source: scenario.actions[slot].tool,
          text: scenario.actions[slot].log,
          tone: "action" as const,
        })),
      );
    if (phase === 4) push([{ source: "run", text: `terminé · ${scenario.summary}`, tone: "done" }]);
  }, [phase, scenario]);

  const selectScenario = (index: number) => {
    setScenarioIndex(index);
    setPhase(1);
    setRun((r) => r + 1);
  };

  // Légère inclinaison 3D qui suit la souris.
  const handleTilt = (event: PointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el || reduceMotion || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1400px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
  };
  const resetTilt = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "";
  };

  const isActive = (slot: "trigger" | "ai" | ActionSlot) =>
    slot === "trigger" ? phase >= 1 : slot === "ai" ? phase >= 2 : phase >= 3;

  return (
    <div ref={containerRef} className="relative" onPointerMove={handleTilt} onPointerLeave={resetTilt}>
      <div aria-hidden="true" className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgb(var(--accent)/0.22),transparent)]" />

      <div
        ref={tiltRef}
        className="panel gradient-border relative overflow-hidden transition-transform duration-500 ease-out will-change-transform"
      >
        {/* Barre de titre */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-success" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="truncate font-mono text-[0.7rem] text-fg-muted">
              workflow / <span className="text-fg">{scenario.id}.flow</span>
            </span>
          </div>
          <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-fg-subtle">
            run #{(1284 + run).toLocaleString("fr-FR")}
          </span>
        </div>

        {/* Graphe */}
        <div className="bg-dots relative aspect-[520/340] w-full">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="flow-stroke" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" style={{ stopColor: "rgb(var(--accent))" }} />
                <stop offset="1" style={{ stopColor: "rgb(var(--accent-2))" }} />
              </linearGradient>
            </defs>

            {EDGES.map((edge, i) => (
              <g key={edge.id}>
                <path d={edge.d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                <path
                  d={edge.d}
                  fill="none"
                  strokeWidth="1.5"
                  strokeDasharray="2 10"
                  strokeLinecap="round"
                  className="animate-dash-flow stroke-accent/40"
                />
                {!reduceMotion ? (
                  <circle r="2.2" className="fill-accent-2" opacity="0.85">
                    <animateMotion dur="2.4s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={edge.d} />
                  </circle>
                ) : null}
              </g>
            ))}

            {/* Tracé lumineux de l'exécution en cours */}
            {EDGES.map((edge) => {
              const lit = edge.to === "ai" ? phase >= 2 : phase >= 3;
              return lit ? (
                <m.path
                  key={`${edge.id}-${run}`}
                  d={edge.d}
                  fill="none"
                  stroke="url(#flow-stroke)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: phase === 4 ? 0.35 : 1 }}
                  transition={{ pathLength: { duration: reduceMotion ? 0 : 0.7, ease: EASE_OUT }, opacity: { duration: 0.8 } }}
                  style={{ filter: "drop-shadow(0 0 6px rgb(139 123 255 / 0.8))" }}
                />
              ) : null;
            })}
          </svg>

          <FlowNode
            position={NODES.trigger}
            active={isActive("trigger")}
            label={scenario.trigger.label}
            caption="déclencheur"
            swapKey={scenario.id}
          >
            <ToolIcon id={scenario.trigger.tool} size="lg" className="max-sm:h-11 max-sm:w-11" />
          </FlowNode>

          <FlowNode position={NODES.ai} active={isActive("ai")} label={scenario.ai} caption="agent IA" swapKey={scenario.id} primary>
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/40 bg-[linear-gradient(140deg,rgb(var(--accent)/0.35),rgb(var(--accent-2)/0.15))] text-fg shadow-glow max-sm:h-12 max-sm:w-12">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </span>
          </FlowNode>

          {(["top", "mid", "bottom"] as const).map((slot) => (
            <FlowNode
              key={slot}
              position={NODES[slot]}
              active={isActive(slot)}
              label={scenario.actions[slot].label}
              caption="action"
              swapKey={scenario.id}
            >
              <ToolIcon id={scenario.actions[slot].tool} size="lg" className="max-sm:h-11 max-sm:w-11" />
            </FlowNode>
          ))}
        </div>

        {/* Journal d'exécution */}
        <div className="border-t border-line bg-black/30 px-4 py-3 font-mono text-[0.68rem] leading-[1.7] sm:px-5">
          <ul className="h-[5.6rem] overflow-hidden sm:h-[8.6rem]" aria-hidden="true">
            <AnimatePresence initial={false}>
              {logs.map((line) => (
                <m.li
                  key={line.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="flex gap-2 whitespace-nowrap max-sm:[&:nth-last-child(n+4)]:hidden"
                >
                  <span className={toneClass[line.tone]}>{line.tone === "done" ? "✓" : "›"}</span>
                  <span className="w-[5.5rem] shrink-0 truncate text-fg-subtle">{line.source}</span>
                  <span className="truncate text-fg-muted">{line.text}</span>
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>

      {/* Sélecteur de scénario */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Choisir un scénario d'automatisation">
        {SCENARIOS.map((item, index) => {
          const selected = index === scenarioIndex;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => selectScenario(index)}
              className={[
                "rounded-full border px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-300",
                selected ? "border-accent/50 bg-accent/15 text-fg" : "border-line text-fg-subtle hover:border-line-strong hover:text-fg-muted",
              ].join(" ")}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Scénario affiché : {scenario.name}. {scenario.trigger.label}, puis l'agent IA {scenario.ai.toLowerCase()}, puis{" "}
        {scenario.actions.top.label}, {scenario.actions.mid.label} et {scenario.actions.bottom.label}.
      </p>
    </div>
  );
}

const toneClass: Record<LogLine["tone"], string> = {
  trigger: "text-accent-2",
  ai: "text-accent",
  action: "text-fg-subtle",
  done: "text-success",
};

type FlowNodeProps = {
  position: { x: number; y: number };
  active: boolean;
  label: string;
  caption: string;
  swapKey: string;
  primary?: boolean;
  children: ReactNode;
};

function FlowNode({ position, active, label, caption, swapKey, primary = false, children }: FlowNodeProps) {
  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      style={{ left: pct(position.x, W), top: pct(position.y, H) }}
    >
      <div className="relative">
        <span
          aria-hidden="true"
          className={[
            "absolute -inset-2 rounded-[1.4rem] border transition-all duration-500",
            active ? "border-accent/60 opacity-100 shadow-glow-sm" : "border-transparent opacity-0",
          ].join(" ")}
        />
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={swapKey}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: active || primary ? 1 : 0.55, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            {children}
          </m.div>
        </AnimatePresence>
      </div>
      <div className="pointer-events-none absolute top-full mt-2.5 hidden w-36 text-center sm:block">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-fg-subtle">{caption}</p>
        <p className={`mt-0.5 truncate text-[0.72rem] font-medium transition-colors duration-500 ${active ? "text-fg" : "text-fg-muted"}`}>
          {label}
        </p>
      </div>
    </div>
  );
}
