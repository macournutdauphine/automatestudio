import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_#";

type DecryptedTextProps = {
  text: string;
  className?: string;
  /** Durée totale du déchiffrement, en ms. */
  duration?: number;
};

/**
 * Libellé qui se « déchiffre » à son entrée dans le viewport
 * (inspiration React Bits « Decrypted Text »). Réservé aux petits labels mono.
 */
export function DecryptedText({ text, className, duration = 900 }: DecryptedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let frame = 0;
    const start = performance.now();
    let last = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      if (now - last > 40 || progress === 1) {
        last = now;
        const revealed = Math.floor(progress * text.length);
        setOutput(
          Array.from(text)
            .map((char, i) =>
              i < revealed || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            )
            .join(""),
        );
      }
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, text, duration]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
