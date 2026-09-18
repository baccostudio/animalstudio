/** First-touch attribution stored per browser session and attached to every lead. Client-only helpers. */

const STORAGE_KEY = "animal-attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number] | "referrer" | "path", string>>;

function safeGet(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/** Records UTMs/referrer/landing path the first time the visitor lands (keeps the first touch). */
export function captureAttribution() {
  if (safeGet()) return;
  const params = new URLSearchParams(window.location.search);
  const data: Attribution = { path: window.location.pathname + window.location.search };
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) data[key] = value.slice(0, 200);
  }
  if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
    data.referrer = document.referrer.slice(0, 200);
  }
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable (private mode): the lead is still sent without attribution */
  }
}

export function readAttribution(): Attribution {
  return safeGet() ?? {};
}
