import { LogoMark } from "./Logo";
import { Reveal } from "./fx/Reveal";
import { SpotlightCard } from "./fx/Spotlight";
import { SectionHeading } from "./ui";
import { tools, type ToolId } from "@/data/tools";

const ecosystem: ToolId[] = [
  "slack",
  "airtable",
  "notion",
  "gmail",
  "googledrive",
  "hubspot",
  "googlecalendar",
  "n8n",
  "openai",
  "teams",
  "trello",
  "typeform",
];

/* Centres des tuiles sur la grille desktop (5 colonnes 1/1/1.3/1/1, 3 rangées), en %. */
const COLUMN_CENTERS = [9.4, 28.3, 71.7, 90.6];
const ROW_CENTERS = [16.7, 50, 83.3];
const HUB = { x: 50, y: 50 };

const beams = ROW_CENTERS.flatMap((y) =>
  COLUMN_CENTERS.map((x) => {
    const midX = (x + HUB.x) / 2;
    return `M ${x} ${y} C ${midX} ${y}, ${midX} ${HUB.y}, ${HUB.x} ${HUB.y}`;
  }),
);

const facts = ["Une seule source d'information", "Moins de ressaisie", "Moins de bascules entre outils"];

export function IntegrationsSection() {
  return (
    <section id="integrations" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="Intégrations"
          title="Branché sur les outils que vous utilisez déjà."
          highlight={["déjà."]}
          subtitle="Pas de nouveau logiciel à imposer à vos équipes. On connecte ce qui existe, CRM, messagerie, tableurs, stockage, et l'information circule seule entre eux."
          align="center"
        />

        <Reveal className="relative mt-16">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          >
            {beams.map((d, i) => (
              <g key={d}>
                <path d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <path
                  d={d}
                  fill="none"
                  pathLength={100}
                  strokeDasharray="10 90"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  className="animate-beam stroke-accent-2/70"
                  style={{ animationDelay: `${(i * 0.53) % 3.2}s` }}
                />
              </g>
            ))}
          </svg>

          <ul className="relative grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-[1fr_1fr_1.3fr_1fr_1fr] lg:grid-rows-3">
            <li className="col-span-full lg:col-span-1 lg:col-start-3 lg:row-span-3 lg:row-start-1">
              <div className="panel gradient-border relative flex h-full flex-col items-center justify-center gap-4 overflow-hidden px-6 py-8 text-center">
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(closest-side,rgb(var(--accent)/0.25),transparent)]" />
                <div className="relative">
                  <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-[1.1rem] border border-accent/60" />
                  <LogoMark className="relative h-16 w-16" />
                </div>
                <div className="relative">
                  <p className="text-lg font-semibold tracking-[-0.02em] text-fg">Automate Studio</p>
                  <p className="mt-1 text-sm text-fg-muted">La logique qui relie vos outils</p>
                </div>
                <p className="relative font-mono text-[0.65rem] uppercase tracking-[0.16em] text-fg-subtle">
                  API · webhooks · IA
                </p>
              </div>
            </li>

            {ecosystem.map((id) => {
              const tool = tools[id];
              return (
                <li key={id}>
                  <SpotlightCard className="group flex h-full min-h-[7rem] flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-bg-raised px-3 py-5 transition-colors duration-300 hover:bg-surface">
                    <img
                      src={tool.logo}
                      alt=""
                      className={`${tool.wide ? "h-4 w-auto" : "h-7 w-7"} object-contain transition-transform duration-500 ease-out group-hover:scale-110`}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="text-center">
                      <span className="block text-[0.82rem] font-medium text-fg">{tool.name}</span>
                      <span className="mt-0.5 block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fg-subtle">
                        {tool.category}
                      </span>
                    </span>
                  </SpotlightCard>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2.5 text-sm text-fg-muted">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-2 shadow-[0_0_10px_rgb(var(--accent-2))]" />
                {fact}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
