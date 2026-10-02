import { CircleCheck, Send } from "lucide-react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Backdrop } from "./fx/Backdrop";
import { BlurText } from "./fx/BlurText";
import { Reveal } from "./fx/Reveal";
import { Button } from "./ui";

const EMPTY_FORM = { name: "", email: "", company: "", message: "" };

type FieldName = keyof typeof EMPTY_FORM;

const promises = [
  "Une solution clés en main, au fonctionnement documenté.",
  "Des points de contrôle, puis des interventions à la demande.",
  "Une proposition alignée sur vos outils réels.",
];

export function ContactSection() {
  const [formState, setFormState] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const update = (field: FieldName, value: string) => setFormState((current) => ({ ...current, [field]: value }));

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (formState.name.trim().length < 2) nextErrors.name = "Indiquez votre nom.";
    if (!/^\S+@\S+\.\S+$/.test(formState.email.trim())) nextErrors.email = "Ajoutez une adresse email valide.";
    if (formState.company.trim().length < 1) nextErrors.company = "Indiquez votre entreprise.";
    if (formState.message.trim().length < 1) nextErrors.message = "Décrivez brièvement le besoin et les outils concernés.";
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.company) companyRef.current?.focus();
      else if (nextErrors.message) messageRef.current?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitted(false);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormState(EMPTY_FORM);
      } else {
        let message = "Une erreur est survenue. Écrivez-nous directement à mathieucournut@orange.fr.";
        try {
          const body = (await response.json()) as { code?: string };
          if (body.code === "VALIDATION_ERROR") message = "Certains champs sont invalides. Vérifiez que tous les champs sont bien remplis.";
          else if (body.code === "DB_ERROR") message = "Impossible d'enregistrer votre demande pour le moment. Réessayez dans quelques instants.";
        } catch {
          /* réponse non-JSON, on garde le message par défaut */
        }
        setErrors({ submit: message });
      }
    } catch {
      setErrors({ submit: "Impossible de joindre le serveur. Vérifiez votre connexion et réessayez." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <div className="panel gradient-border relative isolate overflow-hidden">
          <Backdrop interactive={false} />

          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-14">
            <div>
              <p className="kicker flex items-center gap-3">
                <span className="text-accent">07</span>
                <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                Contact
              </p>
              <BlurText
                as="h2"
                text="Décrivez un cas précis. Nous vous disons comment l'automatiser."
                highlight={["l'automatiser."]}
                className="mt-5 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.035em] text-fg sm:text-5xl"
              />
              <Reveal delay={0.15}>
                <p className="mt-5 max-w-lg leading-relaxed text-fg-muted sm:text-lg">
                  Le premier rendez-vous est un audit des outils et des cas d'automatisation : 45 minutes pour comprendre vos tâches
                  répétitives et vos outils actuels. Vous recevez ensuite une proposition de solution sous 24 h.
                </p>
                <ul className="mt-8 space-y-3">
                  {promises.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-fg">
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <form className="glass space-y-5 rounded-3xl p-5 sm:p-7" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nom" id="name" error={errors.name}>
                    <input
                      ref={nameRef}
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formState.name}
                      onChange={(event) => update("name", event.target.value)}
                      className="field"
                      placeholder="Votre nom"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                  </Field>
                  <Field label="Email" id="email" error={errors.email}>
                    <input
                      ref={emailRef}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formState.email}
                      onChange={(event) => update("email", event.target.value)}
                      className="field"
                      placeholder="nom@entreprise.fr"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </Field>
                </div>

                <Field label="Entreprise" id="company" error={errors.company}>
                  <input
                    ref={companyRef}
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={formState.company}
                    onChange={(event) => update("company", event.target.value)}
                    className="field"
                    placeholder="Nom de votre structure"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? "company-error" : undefined}
                  />
                </Field>

                <Field label="Message" id="message" error={errors.message}>
                  <textarea
                    ref={messageRef}
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={(event) => update("message", event.target.value)}
                    className="field resize-y"
                    placeholder="Décrivez-nous vos besoins et nous reviendrons vers vous"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                </Field>

                {errors.submit ? (
                  <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-fg" role="alert">
                    {errors.submit}
                  </p>
                ) : null}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    aria-busy={submitting}
                    icon={<Send className="h-4 w-4" aria-hidden="true" />}
                  >
                    {submitting ? "Envoi en cours…" : "Demander un échange"}
                  </Button>
                  <p className="text-sm text-fg-subtle">Une seule demande claire suffit pour démarrer.</p>
                </div>

                <div aria-live="polite">
                  {submitted ? (
                    <p className="flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-fg" role="status">
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                      Message envoyé. Nous revenons vers vous avec une première lecture du besoin et un format d'accompagnement clair.
                    </p>
                  ) : null}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
