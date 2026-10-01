import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT } from "./Reveal";

type RotatingTextProps = {
  words: string[];
  interval?: number;
  /** Mot à afficher, piloté par le parent. Sans lui, la rotation est automatique. */
  index?: number;
  className?: string;
};

/**
 * Alterne une liste de mots avec une entrée lettre par lettre
 * (inspiration React Bits « Rotating Text »). Décoratif : le texte
 * complet doit être fourni aux lecteurs d'écran par le parent.
 */
export function RotatingText({ words, interval = 2600, index: controlledIndex, className = "" }: RotatingTextProps) {
  const [ownIndex, setOwnIndex] = useState(0);
  const controlled = controlledIndex !== undefined;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (controlled || !inView) return;
    const id = window.setInterval(() => setOwnIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [controlled, inView, interval, words.length]);

  const word = words[controlled ? controlledIndex : ownIndex];

  return (
    <span ref={ref} aria-hidden="true" className={`relative inline-flex overflow-hidden pb-[0.12em] ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <m.span key={word} className="inline-flex whitespace-pre">
          {Array.from(word).map((char, i) => (
            <m.span
              key={`${char}-${i}`}
              className="text-gradient inline-block"
              initial={reduceMotion ? { opacity: 0 } : { y: "105%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { y: "-105%", opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: reduceMotion ? 0 : i * 0.022 }}
            >
              {char}
            </m.span>
          ))}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
