/** Where the visitor clicked to open the lead modal. */
export type LeadCta = "header" | "hero" | "plan" | "contacto" | "footer";

/** First-touch attribution captured on page load (see components/effects/AttributionCapture.tsx). */
export type LeadSource = {
  cta: LeadCta | string;
  path?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

export type Lead = {
  name: string;
  email: string;
  /** Normalized to E.164-ish (+54…) when possible; see lib/leads/format.ts */
  phone: string;
  /** Plan label as shown in the modal title, e.g. "Débito automático · 6 meses" */
  plan?: string;
  source: LeadSource;
  /** ISO timestamp */
  submittedAt: string;
};

export interface LeadProvider {
  name: string;
  send(lead: Lead): Promise<void>;
}
