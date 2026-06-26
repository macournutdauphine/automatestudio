import { Navbar } from "./Navbar";
import { FadeUp } from "./animations";
import { Button, Pill } from "./ui";
import { ArrowUpRightIcon, LayersIcon } from "./icons";

export function HeroSection() {
  return (
    <section id="hero" className="relative isolate min-h-[100dvh] scroll-mt-24">
      <div className="absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(circle_at_12%_10%,rgba(154,90,44,0.12),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(17,17,17,0.04),transparent_26%),radial-gradient(circle_at_72%_78%,rgba(154,90,44,0.05),transparent_26%)]" />
      <div className="absolute inset-x-0 top-0 h-[44rem] bg-grid opacity-[0.18]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-12">
        <Navbar />

        <div className="grid items-center gap-8 py-6 lg:grid-cols-[1fr_0.78fr] lg:gap-16 lg:py-10">
          <div className="relative z-10 max-w-3xl lg:self-center">
            <FadeUp delay={0.06}>
              <h1 className="mt-5 font-heading max-w-[760px] text-[clamp(2.9rem,10vw,4.4rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-balance text-[#111111] lg:text-[clamp(3.8rem,6vw,6.4rem)]">
                Des automatisations qui fonctionnent
                <span className="block">et qui durent.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.14}>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.8] text-[#5F5F5F] text-pretty">
                Parce que la valeur d'une automatisation ne se mesure pas seulement au jour de sa mise en place, mais à sa capacité à rester opérationnelle dans le temps.
              </p>
            </FadeUp>

            <FadeUp delay={0.22}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#contact" variant="orange" className="w-full sm:w-auto" icon={<ArrowUpRightIcon className="h-4 w-4" />}>
                  Parler de votre cas
                </Button>
                <Button href="#offre" variant="secondary" className="w-full sm:w-auto" icon={<LayersIcon className="h-4 w-4" />}>
                  Voir l'offre
                </Button>
              </div>
            </FadeUp>

            <FadeUp delay={0.30}>
              <div className="mt-8 border-t border-black/[0.08] pt-6">
                <p className="kicker">Qui suis-je ?</p>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-[#5F5F5F]">
                  Étudiant en master de management de l'innovation à Dauphine et aux Mines de Paris, je déploie des workflows opérationnels, sans développeur ni budget technique afin de vous proposer la qualité de mes services à des prix compétitifs.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="font-heading text-[0.92rem] font-semibold tracking-[-0.03em] text-[#111111]">Mathieu Cournut</span>
                  <span className="text-[#b8843d]">·</span>
                  <span className="text-[0.8rem] text-[#66615a]">Fondateur d'Automate Studio</span>
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="relative lg:self-center">
            <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_44%_38%,rgba(154,90,44,0.11),transparent_60%)] blur-3xl" />

            <FadeUp delay={0.18}>
              <div className="relative">

                <div className="panel-shell relative">
                  <div className="panel-core p-3">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.15rem]">
                      <img src="/mathieu.jpg" alt="Mathieu Cournut" className="h-full w-full object-cover object-top" />
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3 rounded-[0.9rem] border border-black/[0.06] bg-white/60 px-4 py-3">
                      <div>
                        <p className="font-heading text-[1rem] font-semibold tracking-[-0.03em] text-[#111111]">
                          Mathieu Cournut
                        </p>
                        <p className="text-[0.75rem] text-[#66615a]">
                          Fondateur · Automate Studio
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href="https://www.linkedin.com/in/mathieucournut"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn de Mathieu Cournut"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0077b5]/20 bg-[#0077b5]/[0.08] text-[#0077b5] transition-colors hover:bg-[#0077b5]/20"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>



              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}
