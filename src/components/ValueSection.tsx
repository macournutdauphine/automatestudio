import { FadeUp, StaggerContainer } from "./animations";
import { Button, SectionHeading } from "./ui";
import {
  BarChartIcon,
  ClockIcon,
  CopyIcon,
  FileTextIcon,
  FunnelIcon,
  SparklesIcon,
} from "./icons";

const automations = [
  {
    title: "Tri des demandes entrantes",
    description:
      "Un formulaire, une boîte mail ou un tableau partagé peut classer les demandes, extraire les bons champs et envoyer la bonne alerte à la bonne personne.",
    icon: FunnelIcon,
    color: "#9A5A2C",
  },
  {
    title: "Relances après devis",
    description:
      "Les rappels partent selon le délai, le statut ou l'absence de réponse après un devis ou une proposition restée sans retour.",
    icon: ClockIcon,
    color: "#111111",
  },
  {
    title: "Rapport hebdo prêt à envoyer",
    description:
      "Les chiffres récurrents peuvent être rassemblés depuis vos outils et mis en forme avant le point d'équipe ou l'envoi du lundi matin.",
    icon: BarChartIcon,
    color: "#111111",
  },
  {
    title: "Compte rendu de réunion",
    description:
      "Les notes de réunion peuvent être structurées, résumées et transformées en compte rendu avec les actions à suivre déjà listées.",
    icon: FileTextIcon,
    color: "#9A5A2C",
  },
];

const outcomes = [
  "Gagnez du temps et augmentez la productivité de vos équipes.",
  "Une compréhension des automatisations qui tire la productivité vers le haut.",
  "Chaque automatisation reste lisible, modifiable, et entre vos mains.",
];

export function ValueSection() {
  return (
    <section id="valeur" className="relative scroll-mt-24 py-12 md:py-16">
      <div className="absolute inset-0 -z-10 bg-[#f3eee4]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(154,90,44,0.08),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(17,17,17,0.03),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="max-w-3xl">
            <p className="kicker text-[#66615A]">Ce que l'on vise</p>
            <h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.06em] text-[#111111] text-balance md:text-5xl">
              Ne pas remplacer l'humain, orienter son travail vers ce qui crée vraiment de la valeur.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5F5F5F]">
              L'idée est simple : enlever les gestes répétitifs et les tâches chronophages pour que l'humain se concentre sur ce qui demande du jugement, du contexte et de la relation.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {automations.map((item, index) => (
            <FadeUp key={item.title} delay={index * 0.06} className="h-full">
              <ValueCard {...item} iconColor={item.color} />
            </FadeUp>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.18} className="mt-4">
        <article className="panel-shell">
            <div className="panel-core grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-6">
              <div>
                <p className="kicker text-[#9A5A2C]">Bénéfices attendus</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.045em] text-[#111111]">
                  Faire mieux avec moins d'étapes inutiles.
                </h3>
              </div>

              <div className="grid gap-2">
                {outcomes.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm text-[#111111]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </article>
        </FadeUp>

        <FadeUp delay={0.24} className="mt-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#offre" variant="orange">
              Voir l'accompagnement
            </Button>
            <Button href="#contact" variant="secondary" icon={<SparklesIcon className="h-4 w-4" />}>
              Décrire un cas
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function ValueCard({
  title,
  description,
  icon: Icon,
  iconColor,
}: {
  title: string;
  description: string;
  icon: typeof CopyIcon;
  iconColor: string;
}) {
  return (
    <article className="panel-shell group h-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
      <div className="panel-core h-full p-4 md:p-5">
        <div className="flex items-start justify-between gap-4">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
            style={{ backgroundColor: iconColor }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#66615a]">
            usage
          </span>
        </div>

        <h3 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.045em] text-[#111111]">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#5F5F5F]">
          {description}
        </p>
      </div>
    </article>
  );
}
