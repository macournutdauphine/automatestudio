import { useState } from "react";
import { FadeUp } from "./animations";

const logos = [
  { name: "Slack",           slug: "slack",           featured: true,  localSrc: "/slack.svg" },
  { name: "Airtable",        slug: "airtable" },
  { name: "Notion",          slug: "notion" },
  { name: "Gmail",           slug: "gmail" },
  { name: "Google Drive",    slug: "googledrive" },
  { name: "HubSpot",         slug: "hubspot" },
  { name: "Google Calendar", slug: "googlecalendar" },
  { name: "n8n",             slug: "n8n" },
  { name: "ChatGPT",          slug: "openai",          featured: true,  localSrc: "/openai.svg" },
  { name: "Teams",           slug: "microsoftteams",                   localSrc: "/teams.svg" },
  { name: "Trello",          slug: "trello",          featured: true },
  { name: "Typeform",        slug: "typeform",        featured: true,  bigIcon: true },
];

type Logo = typeof logos[0];

function LogoCard({ name, slug, featured, localSrc, bigIcon }: Logo) {
  const [imgError, setImgError] = useState(false);
  // No color override → Simple Icons serves each brand's official color automatically
  const src = localSrc ?? `https://cdn.simpleicons.org/${slug}`;

  return (
    <div
      className={[
        featured ? "sm:col-span-2" : "",
        "group p-[5px] rounded-[1.35rem]",
        "border border-black/[0.05]",
        "bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(250,247,242,0.52))]",
        "shadow-[0_1px_2px_rgba(17,17,17,0.04),0_2px_10px_-4px_rgba(17,17,17,0.06)]",
        "transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "hover:-translate-y-[3px] hover:shadow-[0_6px_20px_-4px_rgba(17,17,17,0.11)]",
        "cursor-default",
      ].join(" ")}
    >
      <div className="relative h-full rounded-[calc(1.35rem-5px)] bg-gradient-to-b from-white to-[#fdfbf8] ring-1 ring-black/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,1)] flex flex-col items-center justify-center gap-[7px] overflow-hidden p-3">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(154,90,44,0.05),transparent_65%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />

        {imgError ? (
          <span className="relative text-[10px] font-semibold text-[#9A5A2C] tracking-wider uppercase">
            {name}
          </span>
        ) : (
          <>
            <img
              src={src}
              alt={name}
              className={[
                "relative w-auto transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] opacity-85 group-hover:opacity-100 group-hover:scale-[1.07]",
                bigIcon ? "h-[88px]" : "h-[22px]",
              ].join(" ")}
              onError={() => setImgError(true)}
              loading="lazy"
              decoding="async"
            />
            <span className="relative text-[9px] font-medium tracking-[0.12em] text-[#9A8F84] uppercase leading-none whitespace-nowrap">
              {name}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export function StackProofSection() {
  return (
    <section className="py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 lg:grid-cols-[0.84fr_1.16fr] lg:items-stretch">
          {/* Left: Stack info */}
          <FadeUp className="panel-shell">
            <div className="panel-core flex h-full flex-col justify-between p-6 md:p-8">
              <div>
                <p className="kicker">Stack existante</p>
                <h2 className="mt-4 max-w-lg font-heading text-4xl font-semibold tracking-[-0.06em] text-[#111111] md:text-5xl">
                  Valorisez vos outils existants, sans les remplacer.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-[#5F5F5F] md:text-lg">
                  Les automatisations les plus bénéfiques branchent d'abord ce que l'équipe utilise déjà. Le gain vient du flux, pas du remplacement.
                </p>
              </div>
              <div className="mt-4 rounded-[1.35rem] border border-black/5 bg-white px-4 py-3 text-sm text-[#111111]">
                Une seule source d'information, moins de ressaisie, moins de bascules entre outils.
              </div>
            </div>
          </FadeUp>

          {/* Right: Active connectors */}
          <FadeUp className="panel-shell">
            <div className="panel-core flex h-full flex-col overflow-hidden p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="kicker">Connecteurs actifs</p>
                  <h3 className="mt-4 max-w-md font-heading text-3xl font-semibold tracking-[-0.05em] text-[#111111]">
                    Vos outils restent visibles, groupés et exploitables.
                  </h3>
                </div>
                <span className="shrink-0 rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#66615a]">
                  12 logos
                </span>
              </div>

              <div className="mt-5 grid flex-1 auto-rows-[88px] grid-cols-2 gap-2.5 sm:grid-cols-4">
                {logos.map((logo) => (
                  <LogoCard key={logo.name} {...logo} />
                ))}
              </div>

            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
