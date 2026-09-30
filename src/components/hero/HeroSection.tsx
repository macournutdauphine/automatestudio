import { m, useReducedMotion } from "framer-motion";
import { Backdrop } from "../fx/Backdrop";
import { Magnetic } from "../fx/Magnetic";
import { RotatingText } from "../fx/RotatingText";
import { EASE_OUT } from "../fx/Reveal";
import { Button } from "../ui";
import { FlowVisual } from "./FlowVisual";


const targets = ["vos relances.", "votre CRM.", "vos factures.", "votre reporting.", "vos demandes."];

const proof = [
  { value: "~134 h/an", label: "libérées sur un cas client" },
  { value: "2 semaines", label: "pour un premier flux en production" },
  { value: "Suivi continu", label: "surveillance et corrections" },
];

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const enter = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  });

  return (
    <section id="hero" className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-24 lg:pt-36">
      <Backdrop />

      <div className="container-x relative grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-12">
        <div className="relative z-10">
          <m.p {...enter(0)} className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1.5 pl-4 pr-4 text-[0.8rem] sm:pl-2">
            <span className="hidden rounded-full bg-accent/20 px-2 py-0.5 sm:inline font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg">
              IA · no-code
            </span>
            <span className="shiny-text font-medium">Studio d'automatisation pour les entreprises</span>
          </m.p>

          <h1 className="mt-7 text-[clamp(2.9rem,9vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-fg">
            <span className="sr-only">Automatisez vos relances, votre CRM, vos factures, votre reporting et vos demandes entrantes.</span>
            <m.span {...enter(0.08)} aria-hidden="true" className="block">
              Automatisez
            </m.span>
            <m.span {...enter(0.16)} aria-hidden="true" className="block">
              <RotatingText words={targets} />
            </m.span>
          </h1>

          <m.p {...enter(0.26)} className="mt-7 max-w-xl text-[1.06rem] leading-relaxed text-fg-muted sm:text-lg">
            Automate Studio conçoit, déploie et maintient des automatisations et des agents IA branchés sur vos outils.
            Vos logiciels travaillent ensemble, vos équipes se concentrent sur leur métier.
          </m.p>

          <m.div {...enter(0.34)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <Button href="#contact" size="lg" className="w-full sm:w-auto">
                Parler de votre cas
              </Button>
            </Magnetic>
            <Button href="#realisations" variant="secondary" size="lg" icon={null}>
              Voir des cas réels
            </Button>
          </m.div>

          <m.dl {...enter(0.44)} className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6">
            {proof.map((item) => (
              <div key={item.value}>
                <dt className="sr-only">{item.label}</dt>
                <dd className="text-[0.95rem] font-semibold tracking-[-0.02em] text-fg sm:text-lg">{item.value}</dd>
                <dd aria-hidden="true" className="mt-1 text-[0.75rem] leading-snug text-fg-subtle sm:text-[0.8rem]">{item.label}</dd>
              </div>
            ))}
          </m.dl>
        </div>

        <m.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE_OUT }}
          className="relative mx-auto w-full max-w-[640px] lg:max-w-none"
        >
          <FlowVisual />
        </m.div>
      </div>
    </section>
  );
}
