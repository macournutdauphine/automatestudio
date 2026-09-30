import { useEffect, useRef } from "react";

type BackdropProps = {
  /** Aurore colorée en haut de la zone. */
  aurora?: boolean;
  /** La grille s'illumine autour du curseur (pointeur précis uniquement). */
  interactive?: boolean;
  className?: string;
};

/**
 * Fond technique : grille estompée, aurore lente et halo qui révèle la grille
 * sous le curseur (inspiration React Bits « Aurora » / « Grid »).
 * Uniquement du CSS animé en transform/opacity : aucun canvas ni WebGL.
 */
export function Backdrop({ aurora = true, interactive = true, className = "" }: BackdropProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host || !interactive) return;
    const canHover = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduce) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--gx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--gy", `${event.clientY - rect.top}px`);
        el.style.setProperty("--glow", "1");
      });
    };
    const onLeave = () => el.style.setProperty("--glow", "0");

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive]);

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {aurora ? (
        <>
          <div className="absolute -top-[30%] left-[8%] h-[70%] w-[60%] animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.28),transparent)] will-change-transform" />
          <div
            className="absolute -top-[20%] right-[-6%] h-[60%] w-[50%] animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent-2)/0.16),transparent)] will-change-transform"
            style={{ animationDelay: "-9s", animationDuration: "22s" }}
          />
        </>
      ) : null}

      <div className="bg-grid mask-radial absolute inset-0" />

      {interactive ? (
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: "var(--glow, 0)",
            backgroundImage:
              "linear-gradient(rgb(var(--accent) / 0.35) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--accent) / 0.35) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            WebkitMaskImage: "radial-gradient(240px circle at var(--gx, 50%) var(--gy, 50%), #000, transparent 70%)",
            maskImage: "radial-gradient(240px circle at var(--gx, 50%) var(--gy, 50%), #000, transparent 70%)",
          }}
        />
      ) : null}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
