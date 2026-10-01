import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./ui";
import { EASE_OUT } from "./fx/Reveal";

const links = [
  { href: "#integrations", label: "Intégrations" },
  { href: "#usages", label: "Usages" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#methode", label: "Méthode" },
  { href: "#studio", label: "Studio" },
  { href: "#faq", label: "FAQ" },
];

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const reduceMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <div className="container-x">
        <div
          className={[
            "flex h-14 items-center justify-between rounded-full pl-3 pr-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out",
            scrolled || menuOpen
              ? "glass shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)]"
              : "border border-transparent bg-transparent",
          ].join(" ")}
        >
          <a href="#hero" className="rounded-full pr-2" aria-label="Automate Studio, retour en haut de page">
            <Logo />
          </a>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={[
                        "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                        isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                      ].join(" ")}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={[
                          "absolute inset-x-3.5 -bottom-px h-px bg-gradient-to-r from-accent to-accent-2 transition-opacity duration-500",
                          isActive ? "opacity-100" : "opacity-0",
                        ].join(" ")}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button href="#contact" className="hidden sm:inline-flex" size="md">
              Parler de votre cas
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.04] text-fg transition-colors hover:bg-white/[0.08] lg:hidden"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-500 ease-out ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-3 h-px w-4 bg-current transition-transform duration-500 ease-out ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 -z-10 bg-bg/[0.92] pt-24 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Navigation mobile" className="container-x flex h-full flex-col pb-10">
              <ul className="grid gap-1">
                {links.map((link, index) => (
                  <m.li
                    key={link.href}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.04 + index * 0.04 }}
                  >
                    <a
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-baseline justify-between border-b border-line py-4 text-3xl font-semibold tracking-[-0.03em] text-fg"
                    >
                      {link.label}
                      <span className="font-mono text-xs text-fg-subtle">0{index + 1}</span>
                    </a>
                  </m.li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button href="#contact" size="lg" className="w-full" onClick={closeMenu}>
                  Parler de votre cas
                </Button>
              </div>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
