import { Logo } from "./Logo";

const links = [
  { href: "#usages", label: "Usages" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#offre", label: "Offre" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-fg-subtle">Automatisation métier, IA et no-code · conçues, déployées et maintenues.</p>
        </div>
        <nav aria-label="Pied de page">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://www.linkedin.com/in/mathieucournut"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-fg-muted transition-colors hover:text-fg"
              >
                LinkedIn<span className="sr-only"> (nouvel onglet)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="container-x mt-8 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-fg-subtle">
        © {new Date().getFullYear()} Automate Studio
      </p>
    </footer>
  );
}
