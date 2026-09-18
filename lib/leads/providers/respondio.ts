import { leadSummary, splitName } from "../format";
import type { Lead, LeadProvider } from "../types";

const DEFAULT_BASE_URL = "https://api.respond.io/v2";

async function call(path: string, body: unknown) {
  const token = process.env.RESPONDIO_API_TOKEN;
  if (!token) throw new Error("RESPONDIO_API_TOKEN is not set");
  // Read per call (not at module load) so .env.local changes in dev apply without restarting.
  // RESPONDIO_API_BASE exists only to point at the local mock (.claude/skills/animal-verify/scripts/respondio-mock.mjs)
  // and is ignored in production builds so a stray variable can never redirect real leads.
  const override = process.env.RESPONDIO_API_BASE;
  const isProduction = process.env.NODE_ENV === "production";
  if (override && isProduction) console.warn("[lead] RESPONDIO_API_BASE is ignored in production; using the real API");
  const baseUrl = override && !isProduction ? override : DEFAULT_BASE_URL;
  const res = await fetch(baseUrl + path, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`respond.io ${path} → ${res.status} ${text.slice(0, 300)}`);
  }
  return res;
}

/** Best-effort extra: failures are logged, they never fail the lead. */
async function tryCall(label: string, fn: () => Promise<unknown>) {
  try {
    await fn();
  } catch (err) {
    console.error(`[lead] respond.io ${label} failed:`, err);
  }
}

/**
 * Creates or updates the contact in respond.io (identified by email), then attaches
 * the configured tags and an internal comment with the full lead summary so the
 * advisor sees plan + origin in the conversation.
 *
 * Docs: https://developers.respond.io/docs/api/
 *  - POST /contact/create_or_update/{identifier}
 *  - POST /contact/{identifier}/tag        body: ["tag", …]   (tags must exist in the workspace)
 *  - POST /contact/{identifier}/comment    body: { text }
 */
export const respondioProvider: LeadProvider = {
  name: "respondio",
  async send(lead: Lead) {
    const identifier = `email:${lead.email}`;
    const { firstName, lastName } = splitName(lead.name);

    await call(`/contact/create_or_update/${encodeURIComponent(identifier)}`, {
      firstName,
      lastName,
      email: lead.email,
      phone: lead.phone,
      countryCode: "AR",
    });

    const tags = (process.env.RESPONDIO_TAGS ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (tags.length) {
      await tryCall("tags", () => call(`/contact/${encodeURIComponent(identifier)}/tag`, tags));
    }

    await tryCall("comment", () =>
      call(`/contact/${encodeURIComponent(identifier)}/comment`, { text: leadSummary(lead) }),
    );
  },
};
