import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { EASE_OUT, Reveal } from "./fx/Reveal";
import { Button, SectionHeading } from "./ui";

const faqs = [
  {
    question: "Est-ce que je dois remplacer mes outils actuels ?",
    answer:
      "Non. On commence par faire mieux communiquer les outils que vous utilisez déjà, puis on ne change que ce qui apporte un vrai gain.",
  },
  {
    question: "Est-ce adapté à une petite structure ?",
    answer:
      "Oui. Les meilleurs premiers cas sont souvent simples : relances, tri de demandes, suivi client, mise à jour du CRM ou génération de documents.",
  },
  {
    question: "L'IA est-elle obligatoire dans chaque automatisation ?",
    answer:
      "Non. On l'utilise seulement quand elle améliore vraiment le flux, notamment pour résumer, qualifier ou structurer une entrée.",
  },
  {
    question: "Et si quelque chose casse après la livraison ?",
    answer: "Des points de contrôle, puis des interventions à la demande, sans abonnement.",
  },
  {
    question: "Qu'est-ce qui change concrètement pour mes équipes ?",
    answer:
      "Vos équipes n'ont plus à gérer la technique. L'automatisation tourne, son fonctionnement est documenté et nous les accompagnons dans la prise en main : elles se concentrent sur leur cœur de métier.",
  },
  {
    question: "Combien ça coûte ?",
    answer:
      "Le forfait dépend de votre situation : il est établi après l'audit et la proposition de solution. ROI garanti sans abonnement, ni frais caché. Parlons-en : laissez-nous vos coordonnées, nous vous rappelons.",
  },
  {
    question: "Où intervenez-vous ?",
    answer:
      "À Paris et en Île-de-France en priorité, avec rendez-vous sur place ou en visio possible, et partout ailleurs en France à distance.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            index="06"
            eyebrow="Questions fréquentes"
            title="Ce qu'on nous demande avant de démarrer."
            highlight={["démarrer."]}
            subtitle="Une logique simple : déployer proprement, documenter, puis accompagner la prise en main."
          />
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-line p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-fg-muted">Une autre question ? Posez-la directement.</p>
              <Button href="#contact" variant="secondary" className="shrink-0">
                Nous contacter
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className="panel divide-y divide-line px-5 sm:px-7">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={open === index}
                onToggle={() => setOpen(open === index ? null : index)}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function FaqItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <li>
      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className={`text-[1.05rem] font-medium tracking-[-0.01em] transition-colors duration-300 ${isOpen ? "text-fg" : "text-fg-muted group-hover:text-fg"}`}>
            {question}
          </span>
          <span
            aria-hidden="true"
            className={[
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-500 ease-out",
              isOpen ? "rotate-45 border-accent/50 bg-accent/15 text-fg" : "border-line text-fg-muted group-hover:border-line-strong",
            ].join(" ")}
          >
            <Plus className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <m.div
            key="panel"
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="max-w-xl pb-6 pr-10 text-[0.95rem] leading-relaxed text-fg-muted">{answer}</p>
          </m.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
