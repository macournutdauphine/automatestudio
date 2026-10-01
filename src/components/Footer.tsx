import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import { Dialog } from "./Dialog";
import { LegalNotice, PrivacyPolicy } from "./Legal";
import { Logo } from "./Logo";

const links = [
  { href: "#usages", label: "Usages" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#methode", label: "Méthode" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const legal = {
  notice: { title: "Mentions légales", content: <LegalNotice /> },
  privacy: { title: "Politique de confidentialité", content: <PrivacyPolicy /> },
};

export function Footer() {
  const [openLegal, setOpenLegal] = useState<keyof typeof legal | null>(null);
  const close = useCallback(() => setOpenLegal(null), []);

  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-fg-subtle">Automatisation métier, IA et no-code · de l'audit à la mise en service.</p>
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
            {(Object.keys(legal) as (keyof typeof legal)[]).map((key) => (
              <li key={key}>
                <button type="button" onClick={() => setOpenLegal(key)} className="text-sm text-fg-muted transition-colors hover:text-fg">
                  {legal[key].title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="container-x mt-8 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-fg-subtle">
        © {new Date().getFullYear()} Automate Studio
      </p>

      <AnimatePresence>
        {openLegal ? (
          <Dialog key={openLegal} title={legal[openLegal].title} onClose={close}>
            {legal[openLegal].content}
          </Dialog>
        ) : null}
      </AnimatePresence>
    </footer>
  );
}
