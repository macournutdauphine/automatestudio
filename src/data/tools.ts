export type ToolId =
  | "slack"
  | "airtable"
  | "notion"
  | "gmail"
  | "googledrive"
  | "googledocs"
  | "googlesheets"
  | "googlecalendar"
  | "googleappsscript"
  | "hubspot"
  | "n8n"
  | "openai"
  | "teams"
  | "trello"
  | "typeform"
  | "apollo"
  | "surfe"
  | "lemlist";

export type Tool = {
  name: string;
  /** Logo servi depuis public/logos. Sans logo, un monogramme est affiché. */
  logo?: string;
  category: string;
  /** Logo au format « wordmark » : affiché plus large. */
  wide?: boolean;
};

export const tools: Record<ToolId, Tool> = {
  slack: { name: "Slack", logo: "/logos/slack.svg", category: "Messagerie" },
  airtable: { name: "Airtable", logo: "/logos/airtable.svg", category: "Base de données" },
  notion: { name: "Notion", logo: "/logos/notion.svg", category: "Documentation" },
  gmail: { name: "Gmail", logo: "/logos/gmail.svg", category: "Email" },
  googledrive: { name: "Google Drive", logo: "/logos/googledrive.svg", category: "Fichiers" },
  googledocs: { name: "Google Docs", logo: "/logos/googledocs.svg", category: "Documents" },
  googlesheets: { name: "Google Sheets", logo: "/logos/googlesheets.svg", category: "Tableur" },
  googlecalendar: { name: "Google Calendar", logo: "/logos/googlecalendar.svg", category: "Agenda" },
  googleappsscript: { name: "Apps Script", logo: "/logos/googleappsscript.svg", category: "Scripts" },
  hubspot: { name: "HubSpot", logo: "/logos/hubspot.svg", category: "CRM" },
  n8n: { name: "n8n", logo: "/logos/n8n.svg", category: "Orchestration" },
  openai: { name: "ChatGPT", logo: "/logos/openai.svg", category: "IA" },
  teams: { name: "Teams", logo: "/logos/teams.svg", category: "Messagerie" },
  trello: { name: "Trello", logo: "/logos/trello.svg", category: "Projets" },
  typeform: { name: "Typeform", logo: "/logos/typeform.svg", category: "Formulaires", wide: true },
  apollo: { name: "Apollo", logo: "/logos/apollo.svg", category: "Enrichissement" },
  surfe: { name: "Surfe", category: "Enrichissement" },
  lemlist: { name: "Lemlist", category: "Enrichissement" },
};
