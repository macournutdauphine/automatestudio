import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAIL = "m.cournut@keprea.com";
const FROM_EMAIL = "Automate Studio <contact@automatestudio.fr>";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { name, email, company, need, message } = req.body as {
    name: string;
    email: string;
    company: string;
    need?: string;
    message: string;
  };

  if (!name?.trim() || !email?.trim() || !company?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Données invalides" });
  }

  const { error: dbError } = await supabase
    .from("contact_submissions")
    .insert([{ name, email, company: company || null, need: need || null, message }]);

  if (dbError) {
    console.error("Supabase error:", dbError);
    return res.status(500).json({ error: "Erreur lors de l'enregistrement" });
  }

  const { error: emailError } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [NOTIFY_EMAIL],
    replyTo: email,
    subject: `Nouvelle demande — ${name}${company ? ` (${company})` : ""}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#111">
        <h2 style="color:#9A5A2C">Nouvelle demande de contact</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 0;font-weight:600;width:120px">Nom</td><td>${name}</td></tr>
          <tr><td style="padding:6px 0;font-weight:600">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 0;font-weight:600">Entreprise</td><td>${company || "—"}</td></tr>
          <tr><td style="padding:6px 0;font-weight:600">Besoin</td><td>${need || "—"}</td></tr>
        </table>
        <hr style="margin:16px 0;border:none;border-top:1px solid #eee" />
        <p style="font-weight:600">Message :</p>
        <p style="white-space:pre-wrap;background:#f5f1ea;padding:12px 16px;border-radius:8px">${message}</p>
      </div>
    `,
  });

  if (emailError) {
    console.error("Resend error:", emailError);
  }

  return res.status(200).json({ success: true });
}
