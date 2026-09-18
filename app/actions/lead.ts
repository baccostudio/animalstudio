"use server";

import { headers } from "next/headers";
import { normalizePhone } from "@/lib/leads/format";
import { getLeadProviders } from "@/lib/leads/providers";
import { isRateLimited } from "@/lib/leads/rate-limit";
import type { Lead, LeadSource } from "@/lib/leads/types";

export type LeadFormState = {
  status: "idle" | "sent" | "error";
  message?: string;
  /** Field with the validation problem, to focus/highlight it */
  field?: "name" | "email" | "phone";
  /** What the visitor typed, echoed back so the form keeps its values after an error (React resets forms after actions) */
  values?: { name: string; email: string; phone: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ATTRIBUTION_KEYS = ["path", "referrer", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function text(formData: FormData, key: string, max = 200) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  // Honeypot: real users never see this field. Pretend success so bots don't adapt.
  if (text(formData, "website")) {
    console.warn("[lead] honeypot triggered, ignoring submission");
    return { status: "sent" };
  }

  const name = text(formData, "name", 80);
  const email = text(formData, "email", 120).toLowerCase();
  const phoneRaw = text(formData, "phone", 30);
  const values = { name, email, phone: phoneRaw };
  const fail = (message: string, field?: LeadFormState["field"]): LeadFormState => ({ status: "error", message, field, values });

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) return fail("Demasiados intentos. Probá de nuevo en unos minutos.");

  if (name.length < 2) return fail("Ingresá tu nombre completo.", "name");
  if (!EMAIL_RE.test(email)) return fail("Revisá el email, parece incompleto.", "email");
  if (phoneRaw.replace(/\D/g, "").length < 8) return fail("Ingresá un celular válido (con código de área).", "phone");

  const source: LeadSource = { cta: text(formData, "cta", 40) || "unknown" };
  for (const key of ATTRIBUTION_KEYS) {
    const value = text(formData, key);
    if (value) source[key] = value;
  }

  const lead: Lead = {
    name,
    email,
    phone: normalizePhone(phoneRaw),
    plan: text(formData, "plan", 80) || undefined,
    source,
    submittedAt: new Date().toISOString(),
  };

  const providers = getLeadProviders();
  const results = await Promise.allSettled(providers.map((p) => p.send(lead)));
  const failures = results
    .map((r, i) => (r.status === "rejected" ? `${providers[i].name}: ${String(r.reason)}` : null))
    .filter((f): f is string => f !== null);
  failures.forEach((f) => console.error("[lead] provider failed →", f));

  if (failures.length === providers.length) {
    return fail("No pudimos enviar tus datos. Probá de nuevo o escribinos por Instagram.");
  }

  return { status: "sent" };
}
