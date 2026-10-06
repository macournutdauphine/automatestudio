import { Reveal } from "./fx/Reveal";
import { SectionHeading } from "./ui";

const principles = [
  { key: "outils", value: "Vos outils d'abord : on connecte l'existant avant de proposer du neuf." },
  { key: "ia", value: "L'IA seulement quand elle améliore le flux : résumer, qualifier, structurer une entrée." },
  { key: "doc", value: "Chaque flux est documenté : vous savez ce qui tourne, et pourquoi." },
  { key: "suivi", value: "Après la mise en service : des points de contrôle, puis des interventions à la demande." },
];

const credentials = ["Master management de l'innovation", "Université Paris Dauphine", "Mines Paris"];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function StudioSection() {
  return (
    <section id="studio" className="relative scroll-mt-24 py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <div className="container-x">
        <SectionHeading
          index="05"
          eyebrow="Le studio"
          title="Montrer des systèmes concrets avant de parler d'IA."
          highlight={["concrets"]}
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="h-full">
            <div className="panel relative flex h-full flex-col overflow-hidden p-3">
              <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem] lg:aspect-auto lg:flex-1">
                <picture className="block h-full">
                  <source srcSet="/mathieu-960.webp" type="image/webp" />
                  <img
                    src="/mathieu-960.jpg"
                    alt="Portrait de Mathieu Cournut, consultant Automatisations & IA"
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                    width={960}
                    height={1440}
                  />
                </picture>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <p className="text-lg font-semibold tracking-[-0.02em] text-fg">Mathieu Cournut</p>
                    <p className="text-sm text-fg-muted">Consultant Automatisations & IA</p>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/mathieucournut"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Profil LinkedIn de Mathieu Cournut (nouvel onglet)"
                    className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-fg transition-colors hover:bg-white/10"
                  >
                    <LinkedInIcon />
                  </a>
                </figcaption>
              </figure>
            </div>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.08}>
              <div className="panel p-6 sm:p-9">
                <p className="text-lg leading-relaxed text-fg sm:text-xl">
                  J'ai découvert l'automatisation lors d'une première mission terrain : un workflow opérationnel déployé sans
                  développeur.
                </p>
                <p className="mt-4 leading-relaxed text-fg-muted">
                  J'y ai compris que le vrai gain vient autant de la mise en place que de la fiabilité du système dans le temps.
                  Étudiant en master de management de l'innovation à Dauphine et aux Mines de Paris, je travaille avec des équipes qui
                  veulent des résultats mesurables, un discours net et un système qui continue de fonctionner.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {credentials.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="panel overflow-hidden">
                <div className="flex items-center justify-between border-b border-line px-5 py-3">
                  <span className="font-mono text-[0.7rem] text-fg-muted">principes.config</span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-success">● appliqués à chaque projet</span>
                </div>
                <dl className="divide-y divide-line">
                  {principles.map((item, index) => (
                    <div key={item.key} className="grid grid-cols-[2rem_4.5rem_1fr] items-baseline gap-2 px-5 py-4 sm:grid-cols-[2.5rem_5rem_1fr]">
                      <span aria-hidden="true" className="font-mono text-[0.7rem] text-fg-subtle">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <dt className="font-mono text-sm text-accent">{item.key}</dt>
                      <dd className="text-sm leading-relaxed text-fg-muted">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
