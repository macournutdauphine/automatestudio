import { FadeUp } from "./animations";
import { Button, SectionHeading } from "./ui";
import { CheckCircleIcon, SparklesIcon, WrenchIcon } from "./icons";

const buildIncludes = [
  "Identification des besoins et cartographie des flux existants",
  "Conception de l'automatisation sur un cas concret",
  "Mise en place et tests sur vos outils réels",
  "Documentation technique du système",
];

const maintenanceIncludes = [
  "Surveillance continue des flux, erreurs détectées avant impact",
  "Mises à jour quand vos outils changent (APIs, webhooks, connecteurs)",
  "Corrections incluses sans surcoût supplémentaire",
  "Optimisations progressives au fil du temps",
];

export function OffersSection() {
  return (
    <section id="offre" className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="L'offre"
          title="Vos automatisations fonctionnent. Toujours."
          subtitle="Je construis le système, je le branche à vos outils, et je le maintiens dans la durée. Vous n'avez pas à vous en occuper."
        />

        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          {/* Carte 1 — Mise en place */}
          <FadeUp>
            <article className="panel-shell h-full overflow-hidden">
              <div className="panel-core flex h-full flex-col p-6 md:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0e9df] text-[#9a5a2c]">
                  <WrenchIcon className="h-5 w-5" />
                </div>

                <h3 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.04em] text-[#111111] md:text-3xl">
                  Mise en place
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5F5F5F]">
                  Je construis l'automatisation sur votre cas concret et je la branche à vos outils réels. Vous obtenez un système qui fonctionne dès le premier jour.
                </p>

                <ul className="mt-4 flex flex-col gap-2">
                  {buildIncludes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm text-[#111111]"
                    >
                      <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#9a5a2c]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row">
                  <Button href="#contact" variant="orange">
                    Demander un échange
                  </Button>
                  <Button href="#realisations" variant="secondary">
                    Voir les réalisations
                  </Button>
                </div>
              </div>
            </article>
          </FadeUp>

          {/* Carte 2 — Maintenance */}
          <FadeUp delay={0.08}>
            <article className="panel-shell h-full overflow-hidden">
              <div className="panel-core flex h-full flex-col p-6 md:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111111] text-white">
                  <SparklesIcon className="h-5 w-5" />
                </div>

                <h3 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.04em] text-[#111111] md:text-3xl">
                  Maintenance continue
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5F5F5F]">
                  Je surveille, corrige et fais évoluer vos flux dans la durée. Vos automatisations restent opérationnelles sans que vous ayez à intervenir.
                </p>

                <ul className="mt-4 flex flex-col gap-2">
                  {maintenanceIncludes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm text-[#111111]"
                    >
                      <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#9a5a2c]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row">
                  <Button href="#contact" variant="orange">
                    Demander un échange
                  </Button>
                  <Button href="#faq" variant="secondary">
                    Questions fréquentes
                  </Button>
                </div>
              </div>
            </article>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
