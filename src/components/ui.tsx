import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "ghost" | "light" | "orange";
  icon?: ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", icon, className = "", children, ...props }: ButtonProps) {
  const styles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-[#111111] text-white hover:bg-[#1e1e1e]",
    orange: "bg-[#9a5a2c] text-white hover:bg-[#7f471f]",
    secondary: "border border-black/10 bg-white/72 text-[#111111] hover:bg-white",
    ghost: "border border-transparent bg-transparent text-[#111111] hover:bg-black/5",
    light: "bg-white text-[#111111] hover:bg-white/90",
  };

  const sharedClassName = [
    "group focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:translate-y-px active:scale-[0.985] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
    styles[variant],
    className,
  ].join(" ");

  const content = (
    <>
      <span>{children}</span>
      {icon === undefined ? (
        variant === "primary" || variant === "orange" ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        ) : null
      ) : (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
          {icon}
        </span>
      )}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;

    return (
      <a {...anchorProps} href={href} className={sharedClassName}>
        {content}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button {...buttonProps} type={buttonProps.type ?? "button"} className={sharedClassName}>
      {content}
    </button>
  );
}

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Pill({ children, className = "" }: BadgeProps) {
  return (
    <span className={["card-border inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-sm text-[#5F5F5F]", className].join(" ")}>
      {children}
    </span>
  );
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  dark = false,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className={["mb-4 kicker", dark ? "text-white/50" : "text-[#5F5F5F]"].join(" ")}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={["text-balance font-heading text-[2.15rem] font-semibold tracking-[-0.05em] sm:text-4xl md:text-5xl", dark ? "text-white" : "text-[#111111]"].join(" ")}>
        {title}
      </h2>
      {subtitle ? (
        <p className={["mt-4 max-w-2xl text-pretty text-base leading-relaxed md:text-lg", dark ? "text-white/[0.68]" : "text-[#5F5F5F]"].join(" ")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
