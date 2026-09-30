import { m, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "./Reveal";

type BlurTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Mots rendus avec le dégradé d'accent (la ponctuation est ignorée). */
  highlight?: string[];
  delay?: number;
};

const bare = (word: string) => word.replace(/[^\p{L}\p{N}'’-]/gu, "");

/** Titre révélé mot par mot, du flou vers le net (inspiration React Bits « Blur Text »). */
export function BlurText({ text, as = "h2", className, highlight = [], delay = 0 }: BlurTextProps) {
  const reduceMotion = useReducedMotion();
  const Tag = m[as];
  const words = text.split(" ");
  const highlighted = new Set(highlight.map(bare));

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ staggerChildren: reduceMotion ? 0 : 0.045, delayChildren: delay }}
    >
      {words.map((word, index) => (
          <m.span
            key={`${word}-${index}`}
            className={`inline-block ${highlighted.has(bare(word)) ? "text-gradient" : ""}`}
            variants={{
              hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: "0.35em", filter: "blur(10px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE_OUT } },
            }}
          >
            {word}
            {index < words.length - 1 ? " " : null}
          </m.span>
      ))}
    </Tag>
  );
}
