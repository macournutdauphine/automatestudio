import { AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useCallback, useState } from "react";
import { Dialog } from "../Dialog";
import { CountUp } from "../fx/CountUp";
import { Magnetic } from "../fx/Magnetic";
import { Reveal } from "../fx/Reveal";
import { SpotlightCard } from "../fx/Spotlight";
import { Button, SectionHeading, ToolIcon } from "../ui";
import { WorkflowStepper } from "./WorkflowStepper";
import { featuredCase, scenarios, type Scenario } from "@/data/cases";

type Selection = { kind: "featured" } | { kind: "scenario"; scenario: Scenario };

export function RealisationsSection() {
  const [selection, setSelection] = useState<Selection | null>(null);
  const close = useCallback(() => setSelection(null), []);

  return (
    <section id="realisations" className="relative scroll-mt-24 py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="Réalisations"
          title="Des systèmes en production, pas des maquettes."
          highlight={["production,"]}
          subtitle="Contexte réel, enchaînement documenté, résultat mesurable. 4 missions livrées et suivies."
        />

        <Reveal className="mt-14">
          <FeaturedCase onDetail={() => setSelection({ kind: "featured" })} />
        </Reveal>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {scenarios.map((scenario, index) => (
            <Reveal key={scenario.id} delay={0.06 * index} className="h-full">
              <ScenarioCard scenario={scenario} onDetail={() => setSelection({ kind: "scenario", scenario })} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4">
          <div className="panel relative flex flex-col items-start gap-6 overflow-hidden p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div aria-hidden="true" className="absolute -right-20 -top-24 h-64 w-96 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.25),transparent)]" />
            <div className="relative">
              <p className="kicker">Prochaine étape</p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">
                Commençons par l'audit de vos outils.
              </p>
              <p className="mt-2 text-fg-muted">On part d'une tâche précise chez vous, on la structure, on la branche à vos outils.</p>
            </div>
            <Magnetic className="relative shrink-0">
              <Button href="#contact" size="lg">
                Parlez-nous de votre besoin
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {selection?.kind === "featured" ? (
          <Dialog key="featured" title={featuredCase.title} onClose={close}>
            <FeaturedDetail />
          </Dialog>
        ) : null}
        {selection?.kind === "scenario" ? (
          <Dialog key={selection.scenario.id} title={selection.scenario.title} onClose={close}>
            <ScenarioDetail scenario={selection.scenario} />
          </Dialog>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

/* ─── Mission livrée mise en avant ───────────────────────────── */

function FeaturedCase({ onDetail }: { onDetail: () => void }) {
  return (
    <article className="panel gradient-border relative overflow-hidden p-5 sm:p-10">
      <div aria-hidden="true" className="bg-dots mask-fade-b absolute inset-x-0 top-0 h-64 opacity-60" />

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="chip border-success/30 text-success">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
              Mission livrée
            </span>
            {featuredCase.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mt-5 max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.03em] text-fg sm:text-[2.1rem]">
            {featuredCase.title}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="kicker">Stack</span>
          <div className="flex -space-x-1.5">
            {featuredCase.stack.map((tool) => (
              <ToolIcon key={tool} id={tool} size="sm" />
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-8 grid gap-4 lg:grid-cols-[0.85fr_1.6fr]">
        <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
          <p className="kicker flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-danger" />
            Avant
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-fg-muted">{featuredCase.problem}</p>
        </div>
        <div>
          <p className="kicker mb-4 flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Workflow mis en place
          </p>
          <WorkflowStepper steps={featuredCase.steps} label="Étapes du workflow de remontée sécurité" />
        </div>
      </div>

      <div className="relative mt-8">
        <p className="kicker mb-4 flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
          Résultat
        </p>
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {featuredCase.metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-line bg-white/[0.02] p-4 sm:p-5">
              <dt className="sr-only">{metric.label}</dt>
              <dd className="text-gradient whitespace-nowrap text-[1.6rem] font-semibold tracking-[-0.04em] sm:text-4xl">
                <CountUp to={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
              </dd>
              <dd aria-hidden="true" className="mt-2 text-sm leading-snug text-fg">
                {metric.label}
              </dd>
              <dd className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-fg-subtle">{metric.note}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg-muted">La responsable HSE se concentre désormais sur ses missions à plus forte valeur ajoutée.</p>
        <Button variant="secondary" onClick={onDetail} className="shrink-0">
          Voir le détail du calcul
        </Button>
      </div>
    </article>
  );
}

function FeaturedDetail() {
  return (
    <div className="mt-6 space-y-5">
      <div className="flex flex-wrap gap-2">
        {featuredCase.tags.map((tag) => (
          <span key={tag} className="chip">
            {tag}
          </span>
        ))}
      </div>
      <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
        <p className="kicker">Détail des gains</p>
        <p className="mt-4 text-sm font-medium text-fg">
          Total : ~134 heures par an économisées · à 35 €/h chargé → <span className="text-gradient">~4 700 € par an</span>
        </p>
        <p className="mt-2 text-xs leading-relaxed text-fg-subtle">
          Estimations fondées sur les volumes observés : 120 incidents déclarés par an, 10 min de saisie par déclaration.
        </p>
      </div>
      <p className="rounded-2xl border border-accent/25 bg-accent/[0.07] p-5 text-sm leading-relaxed text-fg">
        En déchargeant la responsable HSE des tâches de saisie et de suivi, l'automatisation lui a permis de se concentrer sur des
        missions à plus forte valeur ajoutée et d'augmenter significativement sa productivité.
      </p>
    </div>
  );
}

/* ─── Autres missions livrées ────────────────────────────────── */

function ScenarioCard({ scenario, onDetail }: { scenario: Scenario; onDetail: () => void }) {
  return (
    <SpotlightCard as="article" className="panel flex h-full flex-col p-6">
      <p className="kicker">Mission livrée</p>
      <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.02em] text-fg">{scenario.title}</h3>
      <p className="mt-1.5 text-sm text-fg-subtle">{scenario.profile}</p>

      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-line bg-bg/60 p-4">
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-subtle">avant</p>
          <p className="mt-1 text-lg font-semibold tracking-[-0.02em] text-fg-muted line-through decoration-danger/60">
            {scenario.before.value}
          </p>
        </div>
        <span aria-hidden="true" className="relative block h-px w-8 overflow-hidden bg-line-strong sm:w-10">
          <span className="absolute inset-y-0 left-0 w-3 animate-[beam-x_1.6s_linear_infinite] bg-accent-2" />
        </span>
        <div className="text-right">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-subtle">après</p>
          <p className="text-gradient mt-1 text-lg font-semibold tracking-[-0.02em]">{scenario.after.value}</p>
        </div>
        <p className="col-span-3 text-center text-xs text-fg-subtle">{scenario.after.label}</p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 pt-1 sm:mt-auto">
        <div className="flex -space-x-1.5">
          {scenario.stack.map((tool) => (
            <ToolIcon key={tool} id={tool} size="sm" />
          ))}
        </div>
        <button
          type="button"
          onClick={onDetail}
          className="group inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-fg transition-colors hover:text-accent-2"
        >
          Voir la mission
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          <span className="sr-only"> : {scenario.title}</span>
        </button>
      </div>
    </SpotlightCard>
  );
}

function ScenarioDetail({ scenario }: { scenario: Scenario }) {
  return (
    <div className="mt-4 space-y-6">
      <div className="flex flex-wrap gap-2">
        <span className="chip">Mission livrée</span>
        <span className="chip">{scenario.profile}</span>
      </div>
      <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
        <p className="kicker flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-danger" />
          Problème
        </p>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">{scenario.problem}</p>
      </div>
      <div>
        <p className="kicker mb-4 flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          Flux automatisé
        </p>
        <WorkflowStepper steps={scenario.steps} label={`Étapes de la mission ${scenario.title}`} />
      </div>
      <div className="rounded-2xl border border-success/25 bg-success/[0.05] p-5">
        <p className="kicker flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
          Résultats
        </p>
        <ul className="mt-4 space-y-2.5">
          {scenario.results.map((result) => (
            <li key={result} className="flex items-start gap-2.5 text-sm text-fg">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              {result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
