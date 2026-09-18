import type { LeadProvider } from "../types";

/**
 * Generic provider: POSTs the lead as JSON to LEAD_WEBHOOK_URL.
 * Useful for testing (webhook.site) and for Make/Zapier or a client endpoint.
 */
export const webhookProvider: LeadProvider = {
  name: "webhook",
  async send(lead) {
    const url = process.env.LEAD_WEBHOOK_URL;
    if (!url) throw new Error("LEAD_WEBHOOK_URL is not set");
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  },
};
