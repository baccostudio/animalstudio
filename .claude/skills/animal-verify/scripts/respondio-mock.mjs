// Fake respond.io API for local testing without credentials.
// Imitates the three endpoints the site uses and prints every request it receives.
// Usage:  node .claude/skills/animal-verify/scripts/respondio-mock.mjs   (listens on :5070)
// Then in .env.local:
//   LEAD_PROVIDER=respondio
//   RESPONDIO_API_BASE=http://localhost:5070/v2
//   RESPONDIO_API_TOKEN=test-token
//   RESPONDIO_TAGS=web
import http from "node:http";

// 5070: not on the Fetch spec "bad ports" list (5060/5061 are, and Node fetch refuses them)
const PORT = 5070;
const contacts = new Map();

http
  .createServer((req, res) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      const auth = req.headers.authorization ?? "";
      const body = raw ? JSON.parse(raw) : null;
      const url = decodeURIComponent(req.url ?? "");
      const json = (code, payload) => {
        res.writeHead(code, { "content-type": "application/json" });
        res.end(JSON.stringify(payload));
      };

      if (!auth.startsWith("Bearer ")) return json(401, { message: "Unauthorized: missing Bearer token" });

      let m;
      if ((m = url.match(/^\/v2\/contact\/create_or_update\/(.+)$/)) && req.method === "POST") {
        const id = m[1];
        const existing = contacts.get(id);
        contacts.set(id, { ...(existing ?? {}), ...body, id: existing?.id ?? contacts.size + 1 });
        console.log(`\n[respond.io mock] ${existing ? "UPDATE" : "CREATE"} contact ${id}\n  ${JSON.stringify(body)}`);
        return json(200, contacts.get(id));
      }
      if ((m = url.match(/^\/v2\/contact\/(.+)\/tag$/)) && req.method === "POST") {
        console.log(`[respond.io mock] TAGS for ${m[1]}: ${JSON.stringify(body)}`);
        return json(200, { message: "Tags added" });
      }
      if ((m = url.match(/^\/v2\/contact\/(.+)\/comment$/)) && req.method === "POST") {
        console.log(`[respond.io mock] COMMENT for ${m[1]}:\n  ${String(body?.text).replace(/\n/g, "\n  ")}`);
        return json(200, { message: "Comment added" });
      }
      console.log(`[respond.io mock] UNKNOWN ${req.method} ${url}`);
      json(404, { message: "Not found" });
    });
  })
  .listen(PORT, () => console.log(`respond.io mock listening on http://localhost:${PORT}/v2 — contacts so far: 0`));
