import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { BlurText } from "./fx/BlurText";
import { DecryptedText } from "./fx/DecryptedText";
import { Reveal } from "./fx/Reveal";
import { tools, type ToolId } from "@/data/tools";

/* ─── Button ─────────────────────────────────────────────────── */

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  /** Icône finale ; `null` pour aucune. Par défaut : flèche. */
  icon?: ReactNode | null;
};

type ButtonAsButton = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonAsLink = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<NonNullable<ButtonBaseProps["variant"]>, string> = {
  primary:
    "bg-fg text-bg shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_10px_30px_-10px_rgb(var(--accent)/0.6)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_14px_44px_-8px_rgb(var(--accent)/0.85)]",
  secondary: "glass text-fg hover:border-line-strong hover:bg-white/[0.06]",
  ghost: "text-fg-muted hover:text-fg",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

export function Button({ variant = "primary", size = "md", icon, className = "", children, ...props }: ButtonProps) {
  const classes = [
    "group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em]",
    "transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  ].join(" ");

  const trailing = icon === undefined ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : icon;

  const content = (
    <>
      <span>{children}</span>
      {trailing ? (
        <span className="-mr-1 flex transition-transform duration-300 ease-out group-hover:translate-x-0.5">{trailing}</span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <a {...props} className={classes}>
        {content}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} type={buttonProps.type ?? "button"} className={classes}>
      {content}
    </button>
  );
}

/* ─── Section heading ────────────────────────────────────────── */

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  highlight?: string[];
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeading({ index, eyebrow, title, highlight, subtitle, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`kicker flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        <DecryptedText text={eyebrow} />
      </p>
      <BlurText
        as="h2"
        text={title}
        highlight={highlight}
        className="mt-5 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.035em] text-fg sm:text-5xl lg:text-[3.4rem]"
      />
      {subtitle ? (
        <Reveal delay={0.15}>
          <p
            className={`mt-5 text-base leading-relaxed text-fg-muted sm:text-lg ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
          >
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ─── Tool icon ──────────────────────────────────────────────── */

type ToolIconProps = {
  id: ToolId;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Affiche le nom en infobulle native. */
  withTitle?: boolean;
};

const iconSizes = {
  sm: { box: "h-7 w-7 rounded-lg", img: "h-3.5 w-3.5", text: "text-[0.6rem]" },
  md: { box: "h-10 w-10 rounded-xl", img: "h-5 w-5", text: "text-xs" },
  lg: { box: "h-14 w-14 rounded-2xl", img: "h-7 w-7", text: "text-sm" },
};

/** Tuile d'application : logo sur surface sombre, ou monogramme à défaut. */
export function ToolIcon({ id, size = "md", className = "", withTitle = true }: ToolIconProps) {
  const tool = tools[id];
  const s = iconSizes[size];
  return (
    <span
      title={withTitle ? tool.name : undefined}
      className={`inline-flex shrink-0 items-center justify-center border border-line bg-surface-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${s.box} ${className}`}
    >
      {tool.logo ? (
        <img
          src={tool.logo}
          alt={tool.name}
          className={`${tool.wide ? "h-auto w-[82%]" : s.img} object-contain`}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className={`font-mono font-medium text-fg ${s.text}`} role="img" aria-label={tool.name}>
          {tool.name.slice(0, 2)}
        </span>
      )}
    </span>
  );
}
