import { FadeUp } from "./animations";
import { Button, SectionHeading } from "./ui";
import { CheckCircleIcon, SparklesIcon } from "./icons";

const included = [
  "Identification des besoins et cartographie des flux existants",
  "Conception de l'automatisation sur un cas concret",
  "Mise en place et tests sur vos outils réels",
  "Session de prise en main pour l'équipe",
  "Explication claire des déclencheurs, règles et limites",
  "Documentation complète pour garder le système lisible",
];

const useCases = [
  "Relances commerciales",
  "Suivi client",
  "Reporting récurrent",
  "Qualification de demandes",
  "Génération de documents",
  "Et bien d'autres…",
];

export function OffersSection() {
  return (
    <section id="offre" className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="L'offre"
          title="Vous livrer un système et pas juste une automatisation."
          subtitle="Je prends en charge la mise en place, puis je montre à vos équipes comment le système fonctionne. L'objectif n'est pas de vous laisser dépendant, mais de vous laisser plus clairs et plus autonomes."
        />

        <FadeUp className="mt-7">
          <article className="panel-shell overflow-hidden">
            <div className="panel-core grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111111] text-white">
                    <SparklesIcon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#66615a]">
                    offre unique
                  </span>
                </div>

                <h3 className="mt-3 max-w-lg font-heading text-3xl font-semibold tracking-[-0.05em] text-[#111111] md:text-4xl">
                  Déploiement accompagné
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5F5F5F] md:text-base">
                  Je construis l'automatisation, je la branche à vos outils, puis je vous montre comment elle fonctionne. Vous gardez un système utile, et votre équipe comprend ce qu'elle utilise.
                </p>

                <ul className="mt-4 grid gap-2">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm text-[#111111]">
                      <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#9a5a2c]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Button href="#contact" variant="orange">
                    Demander un échange
                  </Button>
                  <Button href="#faq" variant="secondary">
                    Voir les questions fréquentes
                  </Button>
                </div>
              </div>

              <div className="border-t border-black/5 bg-[linear-gradient(180deg,rgba(245,241,234,0.35),rgba(255,255,255,0.7))] p-5 md:p-6 lg:border-l lg:border-t-0">
                <p className="kicker">Ce que l'on peut résoudre</p>
                <ul className="mt-3 grid gap-2">
                  {useCases.map((item) => (
                    <li key={item} className="rounded-[1.25rem] border border-black/5 bg-white px-4 py-3 text-sm text-[#111111]">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-[1.35rem] border border-[#9a5a2c]/12 bg-[#9a5a2c]/8 px-4 py-4 text-sm leading-relaxed text-[#5F5F5F]">
                  Vous ne repartez pas avec une boîte noire. Vous repartez avec un système expliqué, utilisable et documenté sans lourdeur.
                </div>
              </div>
            </div>
          </article>
        </FadeUp>
      </div>
    </section>
  );
}
