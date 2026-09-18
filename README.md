# Animal Studio — landing

Landing de Animal Studio (Longevity Performance Club) en Next.js 16 (App Router, React 19, TypeScript, Tailwind 4).

## Scripts

```bash
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm run start   # sirve el build
npm run lint    # ESLint
npm run check   # checklist de comportamiento (intro, modal, menú mobile) contra localhost:3000
npm run mock:respondio   # respond.io simulado en :5070 para probar el form sin credenciales
```

## Variables de entorno y modo de prueba

Copiar `.env.example` a `.env.local` (no se commitea). Sin ese archivo el formulario funciona igual y los leads se imprimen en la consola del servidor.

- **Prueba**: `LEAD_PROVIDER=console,webhook` y `LEAD_WEBHOOK_URL` con una URL de [webhook.site](https://webhook.site) para ver el JSON de cada lead.
- **Producción**: `LEAD_PROVIDER=respondio` con el `RESPONDIO_API_TOKEN` del cliente (plan Growth o superior, Settings → Integrations → Developer API) y, si quieren, `RESPONDIO_TAGS`.

No se envían emails: el asesor ve y trabaja el lead en respond.io, que es lo que pidió el cliente.

Detalle completo en `.env.example` y en `.claude/skills/animal-lead-form/SKILL.md`.

## Estructura

```
app/
  layout.tsx        fuentes (Inter + Chakra Petch via next/font), metadata, <AttributionCapture>, <LeadModalProvider>
  page.tsx          compone la landing
  privacidad/       política de privacidad
  actions/lead.ts   Server Action del formulario de leads
  globals.css       tokens de diseño (@theme), variantes js/intro-done, base y CSS no expresable en utilidades
  icon.png          favicon
components/
  ui/               Button, Container, Section, Eyebrow, Kicker, SectionHead
  layout/           IntroSplash, SiteHeader, SiteFooter
  sections/         Hero, Manifesto, Breaker, Pillars, Gallery (+ Gallery.module.css), Plans, Community, Contact
  effects/          RevealObserver (reveal on scroll), ClockCounter (01:23), AttributionCapture (UTM/referrer)
  lead/             LeadModalProvider (modal), LeadForm (form + estados), LeadTrigger (botón/link que abre el modal)
lib/leads/          proveedores de leads (console, webhook, respond.io), rate limit, formato
content/            textos y datos editables: nav, pilares, planes, galería, reseñas, contacto, legal
public/images/      fotos y logos
```

## Convenciones

- Estilos con utilidades Tailwind. Lo que no cabe en una línea (keyframes, grid-areas de la galería,
  gradientes múltiples, estados `.reveal` / `intro-done`) vive en `globals.css` o en un `.module.css` co-localizado.
- Breakpoints: `md` = 701px y `lg` = 981px (los del diseño original), escritos mobile-first.
- Imágenes con `next/image` (import estático desde `public/images`). Fuentes self-hosteadas con `next/font`.
- Componentes cliente solo donde hay interacción: intro, header, reveal, reloj y modal.
- El formulario del modal envía a los proveedores configurados en `LEAD_PROVIDER` (ver arriba); las keys viven solo en el servidor.
