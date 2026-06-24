import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 26 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.82, delay, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}

type WordsPullUpProps = {
  text: string;
  highlightWords?: string[];
  className?: string;
};

export function WordsPullUp({ text, highlightWords = [], className }: WordsPullUpProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <h1 ref={ref} className={className}>
      {words.map((word, index) => {
        const clean = word.replace(/[^\p{L}\p{N}-]/gu, "");
        const highlighted = highlightWords.includes(clean);
        return (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block will-change-transform"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.7,
              delay: index * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span
            className={
              highlighted
                  ? "inline-block rounded-2xl bg-[#111111] px-3 py-0.5 text-[#F7F4EE] rotate-[-1deg]"
                  : ""
              }
            >
              {word}
            </span>
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        );
      })}
    </h1>
  );
}

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
};

export function StaggerContainer({ children, className, delayChildren = 0.08 }: StaggerContainerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: reduceMotion ? { duration: 0 } : { staggerChildren: delayChildren, delayChildren: 0.04 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
