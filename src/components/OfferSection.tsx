import { m, useScroll, useSpring } from "framer-motion";
import { Check, CircleCheck, FileText, Hammer, LifeBuoy, Rocket, Search, ShieldCheck, TrendingUp, Wrench, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { Reveal } from "./fx/Reveal";
import { SpotlightCard } from "./fx/Spotlight";
import { Button, SectionHeading } from "./ui";

const lifecycle: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Audit",
    description:
      "45 minutes d'audit des outils et des cas d'automatisation. Nous regardons vos outils et les tâches qui vous freinent : ce qui prend du temps, où vivent vos informations, qui ressaisit quoi. Nous ne vendons aucune solution pendant ce rendez-vous.",
    icon: Search,
  },
  {
    title: "Proposition de solution",
    description:
      "Sous 24 h. Un document unique : la solution proposée, ce qu'elle rapporte ou évite sur l'année (temps rendu, erreurs et doublons évités, chiffre d'affaires qui ne dort plus, coût de l'inaction), ainsi que le montant forfaitaire.",
    icon: FileText,
  },
  {
    title: "Validation",
    description: "On relit la proposition, on ajuste le périmètre et le planning.",
    icon: CircleCheck,
  },
  {
    title: "Production",
    description:
      "Nous construisons la solution : automatisations, branchements entre vos outils, interface de saisie. Vous voyez le résultat au fur et à mesure.",
    icon: Hammer,
  },
  {
    title: "Déploiement",
    description: "Mise en service des solutions.",
    icon: Rocket,
  },
  {
    title: "Accompagnement",
    description: "Le fonctionnement est documenté et nous vous accompagnons dans la prise en main.",
    icon: LifeBuoy,
  },
];

const offers = [
  {
    id: "build",
    icon: Wrench,
    title: "Mise en place",
    tagline: "Des solutions d'automatisation clés en main.",
    description: "Nous construisons la solution sur votre cas concret et nous la branchons à vos outils réels.",
    includes: [
      "Audit des outils et des cas d'automatisation",
      "Proposition de solution sous 24 h",
      "Production et mise en service sur vos outils réels",
      "Fonctionnement documenté et prise en main accompagnée",
    ],
    featured: false,
  },
  {
    id: "run",
    icon: ShieldCheck,
    title: "Après la mission",
    tagline: "Des points de contrôle, puis des interventions à la demande.",
    description: "Une fois la solution en service, on fait le point ensemble, et nous intervenons quand vous en avez besoin.",
    includes: [
      "Points de contrôle après la mise en service",
      "Interventions à la demande",
      "Sans abonnement",
    ],
    featured: true,
  },
];

const outcomes: { text: string; icon: LucideIcon }[] = [
  { text: "Du temps gagné et des équipes plus productives.", icon: TrendingUp },
  { text: "Un fonctionnement documenté et une équipe accompagnée dans la prise en main.", icon: ShieldCheck },
  { text: "Des logiciels qui travaillent ensemble, sans ressaisie.", icon: Check },
];

export function OfferSection() {
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section id="methode" className="relative scroll-mt-24 py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="La méthode"
          title="Un partenaire, de l'audit à la mise en service."
          highlight={["service."]}
          subtitle="Nous livrons des solutions d'automatisation clés en main. Le fonctionnement est documenté et votre équipe est accompagnée dans la prise en main."
        />

        {/* Cycle de vie */}
        <ol ref={trackRef} className="relative mt-16 grid gap-8 pl-10 md:grid-cols-6 md:gap-6 md:pl-0 md:pt-12">
          <span aria-hidden="true" className="absolute bottom-2 left-[1.1rem] top-2 w-px bg-line md:bottom-auto md:left-0 md:right-0 md:top-[1.1rem] md:h-px md:w-auto" />
          <m.span
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute bottom-2 left-[1.1rem] top-2 w-px origin-top bg-gradient-to-b from-accent to-accent-2 md:hidden"
          />
          <m.span
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute left-0 right-0 top-[1.1rem] hidden h-px origin-left bg-gradient-to-r from-accent to-accent-2 md:block"
          />

          {lifecycle.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <li key={stage.title} className="relative">
                <Reveal delay={index * 0.08}>
                  <span className="absolute -left-10 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-bg text-fg md:-top-12 md:left-0">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">0{index + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-fg">{stage.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{stage.description}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* Deux volets */}
        <div className="mt-20 grid gap-4 lg:grid-cols-2">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <Reveal key={offer.id} delay={index * 0.08} className="h-full">
                <SpotlightCard
                  as="article"
                  className={`panel relative flex h-full flex-col overflow-hidden p-6 sm:p-9 ${offer.featured ? "gradient-border" : ""}`}
                >
                  {offer.featured ? (
                    <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.22),transparent)]" />
                  ) : null}
                  <div className="relative flex items-center justify-between gap-4">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${offer.featured ? "border-accent/40 bg-accent/15" : "border-line bg-white/[0.03]"} text-fg`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {offer.featured ? <span className="chip border-accent/40 text-fg">Ensuite</span> : <span className="chip">Démarrage</span>}
                  </div>
                  <h3 className="relative mt-6 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">{offer.title}</h3>
                  <p className="relative mt-1 text-fg">{offer.tagline}</p>
                  <p className="relative mt-3 text-sm leading-relaxed text-fg-muted">{offer.description}</p>
                  <ul className="relative mt-6 space-y-3 border-t border-line pt-6">
                    {offer.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-fg">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="relative mt-auto pt-8">
                    <Button href="#contact" variant={offer.featured ? "primary" : "secondary"}>
                      Demander un échange
                    </Button>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {outcomes.map(({ text, icon: Icon }) => (
              <li key={text} className="flex items-start gap-3 rounded-2xl border border-line px-5 py-4 text-sm text-fg-muted">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-2" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
