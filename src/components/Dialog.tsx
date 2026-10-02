import { m, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { EASE_OUT } from "./fx/Reveal";

type DialogProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Fenêtre modale : focus piégé, fermeture par Échap ou clic extérieur, focus restauré. */
export function Dialog({ title, onClose, children }: DialogProps) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <m.div
      className="fixed inset-0 z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="fixed inset-0 bg-bg/80 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
      <div className="flex min-h-full items-start justify-center px-4 py-10 sm:py-16">
        <m.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="panel gradient-border relative z-10 w-full max-w-3xl bg-bg-raised"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        >
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.04] text-fg-muted transition-colors hover:bg-white/[0.08] hover:text-fg"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          <div className="p-6 sm:p-10">
            <h2 id={titleId} className="pr-12 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">
              {title}
            </h2>
            {children}
          </div>
        </m.div>
      </div>
    </m.div>
  );
}
