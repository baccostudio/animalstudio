import type { LeadProvider } from "../types";
import { consoleProvider } from "./console";
import { respondioProvider } from "./respondio";
import { webhookProvider } from "./webhook";

const REGISTRY: Record<string, LeadProvider> = {
  console: consoleProvider,
  webhook: webhookProvider,
  respondio: respondioProvider,
};

/**
 * Providers enabled via LEAD_PROVIDER, comma-separated ("console,webhook", "respondio").
 * Defaults to console so the form always works in development.
 */
export function getLeadProviders(): LeadProvider[] {
  const names = (process.env.LEAD_PROVIDER ?? "console")
    .split(",")
    .map((n) => n.trim().toLowerCase())
    .filter(Boolean);

  const providers: LeadProvider[] = [];
  for (const name of names) {
    const provider = REGISTRY[name];
    if (provider) providers.push(provider);
    else console.error(`[lead] Unknown LEAD_PROVIDER "${name}" (valid: ${Object.keys(REGISTRY).join(", ")})`);
  }
  return providers.length ? providers : [consoleProvider];
}
