import { useRef, useState, type FormEvent } from "react";
import { Button } from "./ui";
import { ArrowUpRightIcon, CheckCircleIcon } from "./icons";

export function FinalCTA() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    need: "Déploiement accompagné",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function validate() {
    const nextErrors: Record<string, string> = {};

    if (formState.name.trim().length < 2) {
      nextErrors.name = "Indiquez votre nom.";
    }

    if (!/^\S+@\S+\.\S+$/.test(formState.email.trim())) {
      nextErrors.email = "Ajoutez une adresse email valide.";
    }

    if (formState.message.trim().length < 20) {
      nextErrors.message = "Décrivez brièvement le besoin et les outils concernés.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.message) messageRef.current?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitted(false);
    setErrors({});

    try {
      const response = await fetch("https://formspree.io/f/xkolnezq", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", company: "", need: "Déploiement accompagné", message: "" });
      } else {
        setErrors({ submit: "Une erreur est survenue. Réessayez ou écrivez-moi directement." });
      }
    } catch {
      setErrors({ submit: "Problème réseau. Réessayez ou écrivez-moi directement." });
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClassName =
    "mt-2 w-full rounded-2xl border border-black/10 bg-white/[0.85] px-4 py-3 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#7b766f] focus:border-[#9a5a2c]/50 focus:bg-white";

  return (
    <section id="contact" className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-5">
          <div className="panel-shell">
            <div className="panel-core p-5 md:p-6">
              <p className="kicker">Dernière étape</p>
              <h2 className="mt-3 font-heading text-4xl font-semibold tracking-[-0.06em] text-[#111111] md:text-5xl">
                Décrivez un cas précis, je vous dirai comment l'automatiser et comment l'expliquer à l'équipe.
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-base leading-7 text-[#5F5F5F] md:text-lg">
                Le premier échange sert à comprendre vos tâches répétitives, vos outils actuels et le niveau d'autonomie que vous voulez garder. À partir de là, on peut proposer un cadre simple et utile.
              </p>

              <div className="mt-4 space-y-2">
                {[
                  "Un système lisible, pas une boîte noire.",
                  "Une prise en main claire pour l'équipe.",
                  "Une proposition alignée sur vos outils réels.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm text-[#111111]">
                    <CheckCircleIcon className="mt-0.5 h-5 w-5 text-[#9a5a2c]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel-shell">
            <div className="panel-core p-5 md:p-6">
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-[#111111]">
                      Nom
                    </label>
                    <input
                      ref={nameRef}
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formState.name}
                      onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                      className={fieldClassName}
                      placeholder="Votre nom"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name ? (
                      <p id="name-error" className="mt-2 text-sm text-[#8a3d3d]" role="alert">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-[#111111]">
                      Email
                    </label>
                    <input
                      ref={emailRef}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formState.email}
                      onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
                      className={fieldClassName}
                      placeholder="nom@entreprise.fr"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email ? (
                      <p id="email-error" className="mt-2 text-sm text-[#8a3d3d]" role="alert">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="text-sm font-medium text-[#111111]">
                      Entreprise
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={formState.company}
                      onChange={(event) => setFormState((current) => ({ ...current, company: event.target.value }))}
                      className={fieldClassName}
                      placeholder="Nom de votre structure"
                    />
                  </div>

                  <div>
                    <label htmlFor="need" className="text-sm font-medium text-[#111111]">
                      Besoin principal
                    </label>
                    <select
                      id="need"
                      name="need"
                      value={formState.need}
                      onChange={(event) => setFormState((current) => ({ ...current, need: event.target.value }))}
                    className={fieldClassName}
                  >
                      <option>Déploiement accompagné</option>
                      <option>Relances et suivi client</option>
                      <option>CRM et synchronisation</option>
                      <option>Reporting et synthèse</option>
                      <option>Qualification de leads</option>
                      <option>Génération de documents</option>
                      <option>Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium text-[#111111]">
                    Message
                  </label>
                  <textarea
                    ref={messageRef}
                    id="message"
                    name="message"
                    rows={6}
                    value={formState.message}
                    onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))}
                    className={[fieldClassName, "resize-y"].join(" ")}
                    placeholder="Expliquez la tâche répétitive, les outils utilisés et ce que vous voulez faire comprendre à l'équipe."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : "message-help"}
                  />
                  {errors.message ? (
                    <p id="message-error" className="mt-2 text-sm text-[#8a3d3d]" role="alert">
                      {errors.message}
                    </p>
                  ) : (
                  <p id="message-help" className="mt-2 text-sm text-[#66615a]">
                      Exemple: relances de prospects, reporting hebdomadaire, suivi CRM, préparation de documents ou prise en main d'un flux existant.
                    </p>
                  )}
                </div>

                {errors.submit ? (
                  <p className="text-sm text-[#8a3d3d]" role="alert">{errors.submit}</p>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    type="submit"
                    variant="primary"
                    icon={<ArrowUpRightIcon className="h-4 w-4" />}
                    disabled={submitting}
                    aria-busy={submitting}
                  >
                    {submitting ? "Envoi en cours…" : "Demander un échange"}
                  </Button>
                  <p className="text-sm text-[#66615a]">
                    Une seule demande claire suffit pour démarrer.
                  </p>
                </div>
              </form>

              {submitted ? (
                <div
                  className="mt-4 rounded-2xl border border-[#44624a]/18 bg-[#44624a]/10 px-4 py-4 text-sm text-[#2f4b35]"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0" />
                    <p>
                      Message prêt. Je reviens avec une première lecture du besoin et un format d'accompagnement clair.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
