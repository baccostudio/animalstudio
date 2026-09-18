import type { Lead } from "./types";

/**
 * Normalizes what people type into an E.164-style number, assuming Argentina.
 * Mobiles must carry the "9" after +54 for WhatsApp (+549 11 xxxx xxxx); the "15" local prefix is dropped.
 *   "11 6663 7192"      → +5491166637192
 *   "+54 11 6663 7192"  → +5491166637192
 *   "0351 15 555 1234"  → +5493515551234
 *   "+1 305 555 0100"   → +13055550100 (other countries untouched)
 */
export function normalizePhone(raw: string) {
  const compact = raw.replace(/[\s\-().]/g, "");
  let digits: string;
  if (compact.startsWith("+")) digits = compact.slice(1).replace(/\D/g, "");
  else if (compact.startsWith("00")) digits = compact.slice(2).replace(/\D/g, "");
  else {
    digits = compact.replace(/\D/g, "");
    if (!digits.startsWith("54")) digits = "54" + digits.replace(/^0/, "");
  }

  if (!digits.startsWith("54")) return "+" + digits;

  let local = digits.slice(2);
  if (local.startsWith("9")) local = local.slice(1);
  local = local.replace(/^0/, "").replace(/^(\d{2,4})15/, "$1");
  return "+549" + local;
}

/** "Juan Pérez García" → { firstName: "Juan", lastName: "Pérez García" } */
export function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  return { firstName: parts[0] ?? "", lastName: parts.slice(1).join(" ") };
}

/** Plain-text summary used for respond.io comments, emails and logs. */
export function leadSummary(lead: Lead) {
  const s = lead.source;
  const lines = [
    `Lead desde la web — ${lead.submittedAt}`,
    `Nombre: ${lead.name}`,
    `Email: ${lead.email}`,
    `Celular: ${lead.phone}`,
    `Plan de interés: ${lead.plan ?? "sin especificar (CTA general)"}`,
    `CTA: ${s.cta}`,
  ];
  if (s.utm_source || s.utm_medium || s.utm_campaign) {
    lines.push(`UTM: ${[s.utm_source, s.utm_medium, s.utm_campaign, s.utm_content, s.utm_term].filter(Boolean).join(" / ")}`);
  }
  if (s.referrer) lines.push(`Referrer: ${s.referrer}`);
  if (s.path) lines.push(`Landing: ${s.path}`);
  return lines.join("\n");
}
