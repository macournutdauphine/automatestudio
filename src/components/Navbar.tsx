import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./ui";

const links = [
  { href: "#offre", label: "Offre" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#valeur", label: "Valeur" },
  { href: "#about", label: "Méthode" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-4 z-30 pt-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface-card flex items-center justify-between rounded-full px-4 py-3 pl-3 pr-3 sm:px-5">
          <a href="#hero" className="group flex items-center gap-3">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[#111111] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <span className="absolute left-3 top-3 h-1.5 w-1.5 rounded-full bg-[#d8b06b]" />
              <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-[#f1e3cf]" />
              <span className="absolute bottom-3 left-3 right-3 h-px bg-white/25" />
            </span>
            <div className="leading-none">
              <p className="font-heading text-lg font-semibold tracking-[-0.04em] text-[#111111]">
                Automate Studio
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#66615a]">
                automatisation + prise en main
              </p>
            </div>
          </a>

          <nav aria-label="Navigation principale" className="hidden items-center gap-5 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#66615a] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#111111]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button href="#contact" variant="primary" className="hidden px-5 text-[0.92rem] lg:inline-flex">
            Parler de votre cas
          </Button>

          <button
            type="button"
            className="focus-ring group inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] lg:hidden"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span className="relative h-4 w-4">
              <span
                className={[
                  "absolute left-0 top-0 h-px w-4 origin-center bg-current transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  menuOpen ? "translate-y-2 rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-2 h-px w-4 bg-current transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  menuOpen ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-4 h-px w-4 origin-center bg-current transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  menuOpen ? "-translate-y-2 -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-white/[0.82] backdrop-blur-3xl lg:hidden"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            onClick={closeMenu}
          >
            <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
              <motion.div
                className="panel-shell w-full"
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.99 }}
                transition={{ duration: 0.62, ease: [0.32, 0.72, 0, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="panel-core flex min-h-[calc(100dvh-2rem)] flex-col justify-between p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="kicker">Navigation</p>
                      <p className="mt-2 font-heading text-2xl font-semibold tracking-[-0.04em] text-[#111111]">
                        Explorer la page
                      </p>
                    </div>
                    <button
                      type="button"
                      className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#111111] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                      aria-label="Fermer le menu"
                      onClick={closeMenu}
                    >
                      <span className="relative h-4 w-4">
                        <span className="absolute left-0 top-2 h-px w-4 origin-center rotate-45 bg-current" />
                        <span className="absolute left-0 top-2 h-px w-4 origin-center -rotate-45 bg-current" />
                      </span>
                    </button>
                  </div>

                  <motion.nav
                    aria-label="Navigation mobile"
                    className="mt-10 grid gap-3"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: {
                        transition: reduceMotion ? { duration: 0 } : { staggerChildren: 0.08, delayChildren: 0.06 },
                      },
                    }}
                  >
                    {links.map((link, index) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className="flex items-center justify-between rounded-[1.35rem] border border-black/[0.08] bg-white px-4 py-4 text-lg font-semibold tracking-[-0.03em] text-[#111111]"
                        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.58, ease: [0.32, 0.72, 0, 1], delay: index * 0.04 }}
                      >
                        <span>{link.label}</span>
                        <span className="text-sm text-[#66615a]">0{index + 1}</span>
                      </motion.a>
                    ))}
                  </motion.nav>

                  <div className="mt-10 grid gap-4">
                    <Button href="#contact" variant="orange" className="w-full justify-center" onClick={closeMenu}>
                      Parler de votre cas
                    </Button>
                    <p className="text-sm text-[#66615a]">
                      Menu pensé pour une consultation rapide sur mobile.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
