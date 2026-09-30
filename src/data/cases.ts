import { Bell, CircleCheck, ClipboardList, Clock3, FileText, Lightbulb, Mail, Sparkles, type LucideIcon } from "lucide-react";
import type { ToolId } from "./tools";

export type WorkflowStep = {
  title: string;
  description: string;
  icon: LucideIcon;
  tools: ToolId[];
};

/* ─── Cas client : Keprea ────────────────────────────────────── */

export const featuredCase = {
  title: "Automatisation des remontées sécurité sur site",
  tags: ["Agritech", "20 employés", "Déployé en 2 semaines"],
  problem:
    "Les incidents de sécurité et les suggestions d'amélioration étaient remontés sur papier ou par mail : aucune traçabilité, aucun suivi des délais, aucune alerte. Chaque plan d'action était rédigé depuis zéro.",
  stack: ["airtable", "googleappsscript", "gmail", "slack", "googledocs", "googledrive"] as ToolId[],
  metrics: [
    { prefix: "~", value: 134, suffix: " h", label: "économisées par an", note: "estimation" },
    { prefix: "~", value: 4700, suffix: " €", label: "de valeur générée par an", note: "au coût chargé de 35 €/h" },
    { prefix: "< ", value: 1, suffix: " min", label: "délai d'alerte incident", note: "contre 2 à 4 h avant" },
    { prefix: "", value: 120, suffix: "", label: "déclarations tracées par an", note: "0 perte de donnée" },
  ],
  breakdown: [
    { task: "Saisie et transmission d'un incident", calcul: "120 incidents × 10 min", gain: "~20 h/an" },
    { task: "Rédaction du plan d'action", calcul: "120 occurrences × 1 h*", gain: "~120 h/an" },
  ],
  steps: [
    {
      title: "Formulaire mobile",
      description: "Saisie de l'incident sur mobile, création instantanée dans Airtable avec un numéro de référence (SEC-XXXX).",
      icon: ClipboardList,
      tools: ["airtable"],
    },
    {
      title: "Alerte immédiate",
      description:
        "Dès la soumission, Slack et Gmail préviennent la référente sécurité et son responsable. Si l'incident est urgent, toute l'équipe est alertée sur Slack.",
      icon: Bell,
      tools: ["slack", "gmail"],
    },
    {
      title: "Plan d'action généré",
      description: "Un plan d'action est généré et pré-rempli pour chaque incident, avec les actions correctives déjà listées et tracées.",
      icon: FileText,
      tools: ["googledocs", "airtable"],
    },
    {
      title: "Récap hebdomadaire",
      description: "Chaque jeudi, un mail récapitulatif des incidents de la semaine part automatiquement.",
      icon: Mail,
      tools: ["gmail"],
    },
    {
      title: "Passage en retard",
      description: "Chaque matin à 8 h, les actions correctives dont l'échéance est dépassée basculent automatiquement en retard.",
      icon: Clock3,
      tools: ["airtable"],
    },
    {
      title: "Circuit suggestions",
      description: "Un formulaire parallèle recueille les idées d'amélioration et les route vers le bon responsable selon le process.",
      icon: Lightbulb,
      tools: ["airtable"],
    },
  ] satisfies WorkflowStep[],
};

/* ─── Scénarios types (résultats attendus) ───────────────────── */

export type Scenario = {
  id: string;
  title: string;
  profile: string;
  problem: string;
  stack: ToolId[];
  before: { value: string; label: string };
  after: { value: string; label: string };
  steps: WorkflowStep[];
  results: string[];
};

export const scenarios: Scenario[] = [
  {
    id: "prospection",
    title: "De LinkedIn à votre CRM en quelques minutes",
    profile: "Équipe commerciale, 3 à 5 SDR",
    problem:
      "Après chaque extraction LinkedIn, l'équipe passait des heures à nettoyer les listes, chercher des emails et décider qui contacter en priorité, sans savoir si le contact était déjà dans le CRM.",
    stack: ["hubspot", "apollo", "surfe", "lemlist"],
    before: { value: "4 à 5 h", label: "pour 500 prospects" },
    after: { value: "< 10 min", label: "pour 500 prospects" },
    steps: [
      {
        title: "Import et nettoyage",
        description:
          "Le fichier exporté depuis LinkedIn Sales Navigator est importé et normalisé. Chaque contact est vérifié dans HubSpot : seuls les nouveaux prospects passent à l'étape suivante.",
        icon: ClipboardList,
        tools: ["hubspot"],
      },
      {
        title: "Priorisation automatique",
        description:
          "Chaque prospect reçoit un score selon sa correspondance avec votre client idéal : secteur, taille, poste, réseau commun. La liste est triée en Chaud / Tiède / Froid.",
        icon: Sparkles,
        tools: [],
      },
      {
        title: "Recherche des coordonnées",
        description:
          "Emails et téléphones sont recherchés via plusieurs sources successives : Apollo, puis Surfe, puis Lemlist. Si l'une échoue, la suivante prend le relais.",
        icon: Mail,
        tools: ["apollo", "surfe", "lemlist"],
      },
      {
        title: "Mise à jour du CRM",
        description:
          "Un écran de validation liste les contacts et entreprises à créer ou mettre à jour. En un clic, tout est créé proprement dans HubSpot. Un export de secours reste disponible.",
        icon: CircleCheck,
        tools: ["hubspot"],
      },
    ],
    results: [
      "500 prospects traités en moins de 10 min, contre 4 à 5 h en manuel",
      "75 à 85 % des contacts enrichis avec un email ou un téléphone",
      "Les leads les plus pertinents remontent en tête de liste dès l'import",
      "Zéro doublon créé dans le CRM",
    ],
  },
  {
    id: "factures",
    title: "Traitement automatique des factures fournisseurs",
    profile: "PME, 15 à 30 salariés",
    problem:
      "Le service comptable recevait les factures par email, les saisissait dans un tableur et les classait dans Drive : 8 à 10 h par mois de saisie, des paiements oubliés et des doublons.",
    stack: ["gmail", "googledrive", "airtable"],
    before: { value: "2 jours", label: "pour traiter une facture" },
    after: { value: "< 10 min", label: "pour traiter une facture" },
    steps: [
      {
        title: "Détection et extraction",
        description:
          "Dès qu'une facture arrive par email, elle est reconnue. L'IA extrait le fournisseur, le montant HT/TTC, la date et l'échéance, sans saisie manuelle.",
        icon: Sparkles,
        tools: ["gmail"],
      },
      {
        title: "Classement dans Drive",
        description:
          "Le PDF est renommé selon la convention interne (AAAA-MM_Fournisseur_Montant) et rangé dans le bon dossier. Le lien et les métadonnées sont enregistrés dans Airtable.",
        icon: FileText,
        tools: ["googledrive", "airtable"],
      },
      {
        title: "Vérification automatique",
        description:
          "Si les données sont incomplètes ou incohérentes (montant manquant, IBAN absent), le comptable est alerté avec le document joint. Sinon, la facture passe en validation.",
        icon: CircleCheck,
        tools: ["gmail"],
      },
      {
        title: "Alerte avant échéance",
        description:
          "5 jours avant la date de paiement, le responsable financier reçoit un rappel avec le montant, le fournisseur et les coordonnées bancaires.",
        icon: Clock3,
        tools: ["gmail"],
      },
      {
        title: "Rapport mensuel",
        description:
          "Le 1er de chaque mois, un récapitulatif part automatiquement : factures traitées, répartition par fournisseur, factures en attente et montant engagé.",
        icon: Mail,
        tools: ["airtable", "gmail"],
      },
    ],
    results: [
      "8 à 10 h par mois de saisie éliminées, soit ~108 h par an",
      "Délai de traitement d'une facture : de 2 jours à moins de 10 minutes",
      "0 facture perdue ou dupliquée dans le suivi",
      "~108 h × 35 €/h = ~3 780 € par an de valeur générée",
    ],
  },
  {
    id: "locatif",
    title: "Gestion locative : quittances, relances et renouvellements",
    profile: "Gestionnaire locatif, 60 à 100 lots",
    problem:
      "Chaque mois, l'équipe envoyait 80 quittances à la main, surveillait les paiements et relançait un par un les retardataires. Avec les renouvellements, 3 à 4 jours de travail répétitif par mois.",
    stack: ["airtable", "gmail", "slack"],
    before: { value: "3 h 30", label: "pour 80 quittances" },
    after: { value: "< 2 min", label: "pour 80 quittances" },
    steps: [
      {
        title: "Quittances le 1er du mois",
        description:
          "Les quittances sont générées et envoyées à chaque locataire, avec un email personnalisé : nom, montant, période et coordonnées du gestionnaire.",
        icon: Mail,
        tools: ["airtable", "gmail"],
      },
      {
        title: "Impayés détectés à J+5",
        description: "Cinq jours après l'appel, les loyers non encaissés sont détectés et un rappel courtois part vers chaque locataire concerné.",
        icon: Clock3,
        tools: ["gmail"],
      },
      {
        title: "Relance renforcée à J+10",
        description:
          "Sans règlement à J+10, un second rappel part. Le gestionnaire reçoit une alerte Slack avec la liste des impayés, les montants et les contacts.",
        icon: Bell,
        tools: ["gmail", "slack"],
      },
      {
        title: "Proposition de renouvellement",
        description:
          "3 mois avant la fin de chaque bail, le locataire reçoit une proposition de renouvellement avec les nouvelles conditions et un lien pour confirmer.",
        icon: FileText,
        tools: ["airtable", "gmail"],
      },
      {
        title: "Rapport mensuel propriétaire",
        description:
          "En fin de mois, chaque propriétaire reçoit un rapport : loyers encaissés, impayés en cours, charges refacturables et prochaines échéances.",
        icon: CircleCheck,
        tools: ["airtable", "gmail"],
      },
    ],
    results: [
      "80 quittances envoyées en moins de 2 min, contre 3 h 30 chaque mois",
      "Relances systématiques : aucun impayé oublié",
      "~90 h par an économisées, soit ~3 150 € au coût chargé de 35 €/h",
      "Chaque fin de bail anticipée 3 mois à l'avance",
    ],
  },
];
