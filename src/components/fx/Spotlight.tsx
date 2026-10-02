import type { HTMLAttributes, PointerEvent, ReactNode } from "react";

/** Positionne --mx / --my sur l'élément survolé — aucun re-render React. */
function trackPointer(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

type SpotlightCardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "div" | "article";
};

/**
 * Carte avec halo et bordure lumineuse qui suivent le curseur
 * (inspiration React Bits « Spotlight Card »).
 */
export function SpotlightCard({ children, className = "", as: Tag = "div", ...props }: SpotlightCardProps) {
  return (
    <Tag {...props} onPointerMove={trackPointer} className={`spotlight ${className}`}>
      <span aria-hidden="true" className="spotlight-border" />
      {children}
    </Tag>
  );
}
