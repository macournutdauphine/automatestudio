import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { EASE_OUT } from "../fx/Reveal";
import { ToolIcon } from "../ui";
import type { WorkflowStep } from "@/data/cases";

const STEP_DURATION = 5000;

/**
 * Enchaînement d'étapes d'un workflow, avec lecture automatique.
 * Une seule source de temps : la barre de progression CSS de l'étape active
 * (fin d'animation → étape suivante), ce qui garde nœuds et barre synchronisés.
 */
export function WorkflowStepper({ steps, label }: { steps: WorkflowStep[]; label: string }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  const running = inView && !hovered;
  const step = steps[active];
  const Icon = step.icon;

  return (
    <div ref={ref} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <ol className="flex items-center" aria-label={label}>
        {steps.map((item, index) => {
          const isActive = index === active;
          const isDone = index < active;
          const StepIcon = item.icon;
          return (
            <li key={item.title} className={index < steps.length - 1 ? "flex flex-1 items-center" : "flex items-center"}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Étape ${index + 1} : ${item.title}`}
                aria-current={isActive ? "step" : undefined}
                className={[
                  "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-out sm:h-10 sm:w-10",
                  isActive
                    ? "border-accent bg-accent/20 text-fg shadow-glow-sm"
                    : isDone
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-line bg-white/[0.02] text-fg-subtle hover:border-line-strong hover:text-fg-muted",
                ].join(" ")}
              >
                <StepIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              {index < steps.length - 1 ? (
                <span aria-hidden="true" className="relative mx-1 h-px flex-1 bg-line sm:mx-1.5">
                  <span
                    className={`absolute inset-0 origin-left bg-gradient-to-r from-accent to-accent-2 transition-transform duration-700 ease-out ${isDone ? "scale-x-100" : "scale-x-0"}`}
                  />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="relative mt-5 overflow-hidden rounded-2xl border border-line bg-white/[0.02]">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="p-5"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-fg">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fg-subtle">
                    étape {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                  </p>
                  <p className="mt-0.5 font-medium tracking-[-0.01em] text-fg">{step.title}</p>
                </div>
              </div>
              {step.tools.length > 0 ? (
                <div className="flex shrink-0 -space-x-1.5">
                  {step.tools.map((tool) => (
                    <ToolIcon key={tool} id={tool} size="sm" />
                  ))}
                </div>
              ) : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{step.description}</p>
          </m.div>
        </AnimatePresence>

        {!reduceMotion ? (
          <span
            key={active}
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent to-accent-2"
            style={{
              animation: `progress-fill ${STEP_DURATION}ms linear forwards`,
              animationPlayState: running ? "running" : "paused",
            }}
            onAnimationEnd={() => setActive((i) => (i + 1) % steps.length)}
          />
        ) : null}
      </div>
    </div>
  );
}
