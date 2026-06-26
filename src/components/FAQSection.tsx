import { SectionHeading } from "./ui";
import { ChevronDownIcon } from "./icons";

const faqs = [
  {
    question: "Est-ce que je dois remplacer mes outils actuels ?",
    answer: "Non. L'approche consiste d'abord à faire mieux communiquer les outils que vous utilisez déjà, puis à ne changer que ce qui apporte un vrai gain.",
  },
  {
    question: "Est-ce adapté à une petite structure ?",
    answer: "Oui. Les meilleurs premiers cas sont souvent simples: relances, tri de demandes, suivi client, mise à jour CRM ou génération de documents.",
  },
  {
    question: "Combien de temps prend une première mise en place ?",
    answer: "Cela dépend du besoin, du niveau de clarté des processus et du nombre d'outils à relier. L'idée est de démarrer par un périmètre utile et maîtrisé.",
  },
  {
    question: "L'IA est-elle obligatoire dans chaque automatisation ?",
    answer: "Non. On l'utilise seulement quand elle améliore vraiment le flux, par exemple pour résumer, qualifier ou structurer une entrée.",
  },
  {
    question: "Est-ce que vous maintenez le système après la mise en place ?",
    answer: "Oui. Une fois le flux déployé, je le surveille, je corrige les erreurs et je l'adapte quand vos outils changent. Vous n'avez pas à vous en occuper.",
  },
  {
    question: "Qu'est-ce qui change concrètement pour mes équipes ?",
    answer: "Vos équipes n'ont plus à gérer la technique. L'automatisation tourne, je la maintiens, elles se concentrent sur leur cœur de métier.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Les questions qu'on pose avant de déployer un système qui tourne sans intervention."
          subtitle="Les réponses ci-dessous reflètent une logique simple : déployer proprement et maintenir ce qui fonctionne."
        />

        <div className="mt-6 panel-shell">
          <div className="panel-core px-5 md:px-7">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} defaultOpen={index === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border-b border-black/10 py-5 first:pt-2 last:border-b-0" open={defaultOpen}>
      <summary className="focus-ring flex cursor-pointer list-none items-start justify-between gap-4 text-left">
        <span className="max-w-2xl font-heading text-[1.25rem] font-semibold tracking-[-0.04em] text-[#111111]">
          {question}
        </span>
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-white transition-transform duration-300 group-open:rotate-180">
          <ChevronDownIcon className="h-4 w-4 text-[#111111]" />
        </span>
      </summary>
      <div className="pt-4 pr-12 text-sm leading-relaxed text-[#5F5F5F]">
        {answer}
      </div>
    </details>
  );
}
