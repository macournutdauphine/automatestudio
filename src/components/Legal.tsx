import type { ReactNode } from "react";

const CONTACT_EMAIL = "mathieucournut@orange.fr";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
      <p className="kicker">{title}</p>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-fg-muted">{children}</div>
    </div>
  );
}

function Mail() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="text-fg underline-offset-4 hover:underline">
      {CONTACT_EMAIL}
    </a>
  );
}

export function LegalNotice() {
  return (
    <div className="mt-6 space-y-4">
      <Block title="Éditeur du site">
        <p>
          Le site Automate Studio est édité par Mathieu Cournut, entrepreneur individuel (micro-entreprise).
          <br />
          SIREN : 945400489 · SIRET : 94540048900015
          <br />
          Adresse : 92400 Courbevoie
          <br />
          Contact : <Mail />
        </p>
      </Block>
      <Block title="Directeur de la publication">
        <p>Mathieu Cournut</p>
      </Block>
      <Block title="Hébergement">
        <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis · vercel.com</p>
      </Block>
      <Block title="Propriété intellectuelle">
        <p>
          Les textes, visuels et éléments graphiques de ce site sont la propriété de leur auteur, sauf mention contraire. Les logos des
          outils cités appartiennent à leurs propriétaires respectifs.
        </p>
      </Block>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <div className="mt-6 space-y-4">
      <Block title="Responsable du traitement">
        <p>
          Mathieu Cournut, entrepreneur individuel (micro-entreprise), 92400 Courbevoie. Contact : <Mail />
        </p>
      </Block>
      <Block title="Données collectées">
        <p>
          Le formulaire de contact recueille votre nom, votre adresse email, le nom de votre entreprise, votre besoin principal et votre
          message. Aucune autre donnée personnelle n'est demandée.
        </p>
      </Block>
      <Block title="Finalité et base légale">
        <p>
          Ces données servent uniquement à répondre à votre demande et à échanger avec vous sur votre projet. Le traitement repose sur
          les mesures précontractuelles prises à votre demande. Elles ne sont ni vendues ni cédées.
        </p>
      </Block>
      <Block title="Destinataires et prestataires">
        <p>
          Les données sont accessibles à Mathieu Cournut uniquement. Elles transitent par les prestataires techniques du site :
          Vercel (hébergement), Supabase (stockage des demandes) et Resend (envoi de la notification par email).
        </p>
        <p>
          Le site est hébergé par Vercel. Les demandes envoyées par le formulaire sont stockées chez Supabase, sur des serveurs situés
          en Irlande, dans l'Union européenne. La notification de chaque demande part par email via Resend, prestataire établi aux
          États-Unis ; ce transfert hors Union européenne est encadré par les clauses contractuelles types de la Commission européenne.
        </p>
      </Block>
      <Block title="Durée de conservation">
        <p>
          Les demandes reçues sont conservées trois ans à compter du dernier échange, puis supprimées. Si une mission est signée, les
          informations sont conservées pendant la durée de la relation commerciale, puis trois ans après sa fin.
        </p>
      </Block>
      <Block title="Vos droits">
        <p>
          Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos
          données. Pour l'exercer, écrivez à <Mail />. Vous pouvez également adresser une réclamation à la CNIL (cnil.fr).
        </p>
      </Block>
      <Block title="Cookies">
        <p>
          Le site ne dépose aucun cookie de mesure d'audience ni de cookie publicitaire. Les polices de caractères sont chargées depuis
          Google Fonts, ce qui transmet votre adresse IP à Google lors de l'affichage des pages.
        </p>
      </Block>
    </div>
  );
}
