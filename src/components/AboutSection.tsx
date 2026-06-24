import { FadeUp, StaggerContainer } from "./animations";
import { SectionHeading } from "./ui";
import {
  ClipboardListIcon,
  FileCheckIcon,
  PackageSearchIcon,
  RocketIcon,
} from "./icons";

const steps = [
  {
    number: "01",
    title: "Cadrage",
    description:
      "On part d'un besoin net, on clarifie le contexte et on identifie ce qui mérite vraiment d'être automatisé.",
    icon: ClipboardListIcon,
  },
  {
    number: "02",
    title: "Prototype",
    description:
      "On construit un premier flux utile sur un cas précis, avec un objectif clair et une logique lisible.",
    icon: PackageSearchIcon,
  },
  {
    number: "03",
    title: "Déploiement",
    description:
      "On branche la solution à vos outils, on teste les cas réels et on sécurise les points sensibles avant la mise en marche.",
    icon: RocketIcon,
  },
  {
    number: "04",
    title: "Transmission",
    description:
      "On vous laisse un système compréhensible, maintenable et déjà expliqué à celles et ceux qui vont s'en servir.",
    icon: FileCheckIcon,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Un cadre simple, un système lisible, et quelqu'un qui prend le temps d'expliquer ce qui a été construit."
          subtitle="Je conçois des automatisations qui s'intègrent à vos outils du quotidien, puis je fais en sorte que vos équipes comprennent comment elles tournent."
        />

        {/* Intro personnelle */}
        <FadeUp delay={0.1} className="mt-6">
          <div className="panel-shell">
            <div className="panel-core rounded-[1.45rem] p-6 md:p-8">
              <div className="flex flex-col items-start gap-3 md:flex-row md:gap-5">

                <div className="flex shrink-0 flex-col items-center gap-3 md:items-start">
                  <div className="h-36 w-36 overflow-hidden rounded-2xl">
                    <img src="/mathieu.jpg" alt="Mathieu Cournut" className="h-full w-full object-cover object-top" />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="font-heading text-base font-semibold text-[#111111]">Mathieu Cournut</p>
                    <p className="text-sm text-[#66615a]">Fondateur, Automate Studio</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="flex-1">
                  <p className="kicker">Qui je suis</p>
                  <h3 className="mt-4 font-heading text-2xl font-semibold tracking-[-0.05em] text-[#111111] md:text-3xl">
                    Je préfère montrer des systèmes concrets et dire clairement ce qu'ils font, avant de parler d'IA.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5F5F5F] md:text-base">
                    J'ai découvert l'automatisation lors de mon stage chez Keprea, où j'ai déployé un premier workflow opérationnel en quelques jours, sans développeur ni budget technique. C'est là que j'ai compris que le vrai gain vient autant de la mise en place que de la compréhension du système par ceux qui l'utilisent.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5F5F5F] md:text-base">
                    Je travaille avec des équipes qui veulent des résultats mesurables, un discours net et une manière simple de reprendre la main ensuite.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Étapes de la méthode */}
        <StaggerContainer className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <FadeUp key={step.number} delay={0.16 + index * 0.08} className="h-full">
              <TimelineStep {...step} />
            </FadeUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function TimelineStep({
  number,
  title,
  description,
  icon: Icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: typeof ClipboardListIcon;
}) {
  return (
    <article className="panel-shell h-full">
      <div className="panel-core relative h-full overflow-hidden rounded-[1.45rem] p-6 md:p-7">
        {/* Numéro décoratif en arrière-plan */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1 select-none font-heading text-[5.5rem] font-bold leading-none tracking-tight text-black/[0.045]"
        >
          {number}
        </span>

        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#111111] text-white">
            <Icon className="h-[18px] w-[18px]" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#66615a]">
            Étape {number}
          </span>
        </div>

        <h3 className="font-heading text-xl font-semibold tracking-[-0.045em] text-[#111111] md:text-2xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#5F5F5F]">
          {description}
        </p>
      </div>
    </article>
  );
}
