import { useId } from "react";

/** Pictogramme Automate Studio : deux nœuds reliés, retraité en dégradé. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const gradientId = useId();
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c4bbff" />
          <stop offset="0.5" stopColor="#8b7bff" />
          <stop offset="1" stopColor="#4cd7f6" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="63" height="63" rx="17.5" fill="#0e1119" stroke="rgba(255,255,255,0.12)" />
      <g stroke={`url(#${gradientId})`} fill="none" strokeLinecap="round">
        <path d="M 34 21 Q 42 14 50 21" strokeWidth="4" />
        <path d="M 10 36 C 16 54, 48 54, 54 36" strokeWidth="4.5" />
      </g>
      <g fill={`url(#${gradientId})`}>
        <circle cx="22" cy="20" r="5" />
        <circle cx="10" cy="36" r="5" />
        <circle cx="54" cy="36" r="5" />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="text-[1.02rem] font-semibold tracking-[-0.03em] text-fg">
        Automate<span className="text-fg-muted"> Studio</span>
      </span>
    </span>
  );
}
