---
name: animal-lead-form
description: Todo sobre el formulario de captura de leads de Animal Studio (modal "Sumate / Empezá tu prueba / Quiero que me contacten") — cómo está implementado (Server Action, proveedores console/webhook/respond.io, atribución UTM, honeypot y rate limit), variables de entorno, modo de prueba y pasos para pasar a producción con los datos del cliente. Usala para cualquier tarea sobre el formulario, el modal, el envío de datos, respond.io, UTM/origen del lead, spam, o cuando pidan "conectá el form", "que lleguen los leads", "configurá el CRM". El alcance es solo lo que pidió el cliente: no hay emails (ni al asesor ni al usuario).
---

# Formulario de leads

## Qué pidió el cliente (fuente: `../alcance_animal_final.pdf`)

- La web **no vende ni cobra**: sin precios, sin Mercado Pago/Payway, sin cuentas ni backoffice.
- Solo **recibe leads**: nombre completo, email y celular; al enviar, aviso de que **un asesor va a contactar**.
- El lead debe **crearse en respond.io**; métricas deseadas: visitas y **origen del lead**.
- A confirmar con el cliente: si además piden DNI (el PDF lo menciona en "Usuarios", pero la recomendación final no).

## Cómo está implementado

```
app/actions/lead.ts          "use server" submitLead(prevState, formData) → { status: idle|sent|error, message?, field? }
                             1) honeypot `website` → finge éxito  2) rate limit por IP (5 / 10 min, en memoria)
                             3) valida name/email/phone  4) arma el Lead con plan, cta y atribución
                             5) Promise.allSettled(providers) → error solo si fallan TODOS
lib/leads/types.ts           Lead, LeadSource (cta + utm_* + referrer + path), LeadProvider
lib/leads/format.ts          normalizePhone (→ +549…), splitName, leadSummary (texto para comment/email/log)
lib/leads/providers/         console (log), webhook (POST JSON a LEAD_WEBHOOK_URL), respondio (create_or_update
                             por email + tags + comment), index.getLeadProviders() lee LEAD_PROVIDER
lib/leads/rate-limit.ts      ventana deslizante en memoria (por instancia en serverless)
lib/attribution.ts           captureAttribution() guarda primer toque en sessionStorage; readAttribution()
components/effects/AttributionCapture.tsx  [client] llama captureAttribution() al montar (en app/layout.tsx)
components/lead/LeadForm.tsx  [client] useActionState(submitLead); agrega la atribución al FormData al enviar;
                             estados Enviando… / error (mensaje + foco en el campo) / ¡Listo!; nota legal
components/lead/LeadModalProvider.tsx  contexto open({ plan, cta }) / close; remonta LeadForm (key) en cada open
components/lead/LeadTrigger.tsx  prop obligatoria `cta` (header|hero|plan|contacto|footer) + `plan` opcional
app/privacidad/page.tsx      política de privacidad (Ley 25.326); datos del responsable en content/legal.ts
.env.example                 todas las variables documentadas
```

Payload que reciben webhook/respond.io:

```json
{ "name": "Juan Pérez", "email": "juan@example.com", "phone": "+5491155551234",
  "plan": "Débito automático · 6 meses",
  "source": { "cta": "plan", "path": "/?utm_source=instagram", "utm_source": "instagram", "referrer": "…" },
  "submittedAt": "2026-09-18T15:04:16.921Z" }
```

## Variables de entorno

| Variable | Prueba | Producción |
|---|---|---|
| `LEAD_PROVIDER` | `console,webhook` | `respondio` (+ `,webhook` si quieren copia a Make/Zapier) |
| `LEAD_WEBHOOK_URL` | URL de https://webhook.site | opcional |
| `RESPONDIO_API_TOKEN` | — | Settings → Integrations → Developer API → Add Access Token (plan Growth+) |
| `RESPONDIO_TAGS` | — | opcional; los tags deben existir en el workspace |

**Fuera de alcance por decisión del usuario (2026-09-18):** no se envían emails, ni de aviso al asesor ni de confirmación al visitante. El asesor ve el lead en respond.io. Si el cliente lo pide más adelante, agregar un módulo `lib/leads/notify.ts` llamado con `after()` desde la action.

Sin `.env.local` el form funciona igual: `console` es el default. Next recarga `.env.local` en dev sin reiniciar.

## Cómo probar

1. `npm run dev` y abrir el modal; con `LEAD_PROVIDER=console` el lead se imprime en la consola del server.
2. Con `webhook` + webhook.site se ve el JSON completo.
2b. Sin credenciales de respond.io: `npm run mock:respondio` + `RESPONDIO_API_BASE=http://localhost:5070/v2` (detalle en la skill `animal-verify`). Ejercita el provider real con las mismas rutas y cuerpos. Solo funciona fuera de producción: el provider ignora esa variable cuando `NODE_ENV=production`.
3. Casos a cubrir: éxito (botón "Enviando…" deshabilitado → "¡Listo!"), email inválido (mensaje y foco en el campo, el form sigue), honeypot lleno (éxito fingido, nada enviado), 6.º envío en 10 min (mensaje "Demasiados intentos"), todos los providers fallando (mensaje de error y se puede reintentar), UTMs en la URL de entrada llegan en `source`.
4. `node .claude/skills/animal-verify/scripts/check-behavior.mjs` cubre el camino feliz.

## API de respond.io (confirmada)

Base `https://api.respond.io/v2`, header `Authorization: Bearer <token>`, identificador `email:x@y.com` | `phone:+549…` | `id:123`.
- `POST /contact/create_or_update/{identifier}` body `{ firstName, lastName, email, phone, countryCode, custom_fields?: [{ name, value }] }`
- `POST /contact/{identifier}/tag` body `["tag1", "tag2"]`
- `POST /contact/{identifier}/comment` body `{ "text": "…" }`
Si el cliente quiere el plan en un campo custom en vez de en el comentario, crear el campo en Settings → Contact Fields y agregar `custom_fields` en `lib/leads/providers/respondio.ts`.

## Reglas al tocar esto

- Las keys viven solo en el server (la action y `lib/leads`); nunca importar `lib/leads/providers` desde un Client Component.
- No agregar canales (email, WhatsApp automático, etc.) que el cliente no haya pedido; el alcance es el PDF.
- No cambiar el copy del éxito sin avisar: es el que pidió el cliente.
- Cualquier proveedor nuevo implementa `LeadProvider` y se registra en `lib/leads/providers/index.ts`.
- Al cerrar un punto, actualizar `pendientes.md`.
