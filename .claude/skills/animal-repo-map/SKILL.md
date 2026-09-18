---
name: animal-repo-map
description: Mapa del repo de la landing Animal Studio (Next 16 + Tailwind 4) — dónde vive cada cosa, qué hace cada componente, cómo fluyen los datos de content/ a las secciones, convenciones de estilos y gotchas de Next 16. Usá esta skill al empezar CUALQUIER tarea en este repo (bug, cambio visual, texto nuevo, feature, refactor), aunque la pregunta parezca chica, antes de buscar archivos a mano.
---

# Mapa del repo — Animal Studio

Una sola página (`app/page.tsx`) que compone secciones en orden. Todo el copy vive en `content/`, todos los estilos en utilidades Tailwind + `app/globals.css`.

## Archivos y responsabilidades

```
app/
  layout.tsx        <html lang="es">, fuentes (Inter variable + Chakra Petch 500/600/700 via next/font),
                    metadata, script inline que agrega la clase `js` a <html>, <LeadModalProvider>
  page.tsx          IntroSplash → SiteHeader → <main id="top"> Hero, Manifesto, Breaker, Pillars, Gallery,
                    Plans, Community, Contact </main> → SiteFooter → RevealObserver
  globals.css       @theme (colores, fuentes, --spacing-gutter, --container-site, breakpoints md=701 lg=981,
                    animaciones kenburns/scrollline/intro-hint), @custom-variant js / intro-pending / intro-done,
                    @layer base (body, headings, ::selection, section{position:relative}),
                    @layer components (.reveal, .hero-overlay::after, .breaker-bg, .map-grid::before)
  icon.png          favicon

components/ui/      Primitivas sin estado (Server Components)
  Button.tsx        variantes primary|outline|dark|ink; <a> si tiene href, si no <button>. Exporta buttonClasses()
  Container.tsx     max-w-site mx-auto px-gutter
  Section.tsx       <section> con tone bone|navy|ink y padding vertical estándar (padded=false para custom)
  Eyebrow.tsx       texto chico uppercase Chakra (hero, modal)
  Kicker.tsx        "01 ———" numerador de sección
  SectionHead.tsx   h2 + párrafo lado a lado (Pillars, Gallery)

components/layout/
  IntroSplash.tsx   [client] splash negro inicial; al scrollear separa las mitades del ícono y
                    togglea `intro-done` en <html> (>62% del alto)
  SiteHeader.tsx    [client] header fixed: `solid` al pasar 40px, burger/menú mobile, CTA "Sumate".
                    Oculto hasta intro-done (variantes intro-pending/intro-done)
  SiteFooter.tsx    columnas de links desde content/site.ts (FOOTER_COLUMNS), tagline, legal

components/sections/  Una por bloque de la landing, todas Server Components
  Hero.tsx          foto con next/image fill + preload, overlay .hero-overlay, h1, CTAs
  Manifesto.tsx     blockquote del manifiesto, kicker sticky en desktop
  Breaker.tsx       fondo degradado .breaker-bg + <ClockCounter target="01:23">
  Pillars.tsx       grid 4/2/1 col desde content/pillars.ts + tarjeta de cierre
  Gallery.tsx       mosaico desde content/gallery.ts; áreas a–j en Gallery.module.css
  Plans.tsx         3 planes desde content/plans.ts, botón abre el modal con el nombre del plan
  Community.tsx     stat de Google + reseñas desde content/reviews.ts (placeholders)
  Contact.tsx       filas de content/contact.ts + caja de mapa placeholder .map-grid

components/effects/
  RevealObserver.tsx [client] IntersectionObserver que agrega `.in` a cada `.reveal`. Se monta una vez en page.tsx
  ClockCounter.tsx   [client] count-up 00:00 → target al entrar en viewport (respeta reduced-motion)

components/lead/
  LeadModalProvider.tsx [client] contexto { open({ plan?, cta? }), close() } + UI del modal; remonta LeadForm en cada open
  LeadForm.tsx          [client] useActionState(submitLead): Enviando… / error / ¡Listo!, honeypot, nota legal
  LeadTrigger.tsx       [client] botón (o link con asLink) que abre el modal; prop obligatoria `cta`

app/actions/lead.ts     "use server" submitLead: honeypot, rate limit, validación, proveedores
app/privacidad/page.tsx política de privacidad (Ley 25.326); usa <SiteHeader variant="page">
lib/leads/              types, format (normalizePhone, leadSummary), providers/{console,webhook,respondio,index},
                        rate-limit. Solo se importa desde código de servidor. Sin emails (fuera de alcance)
lib/attribution.ts      captura/lectura de UTM + referrer en sessionStorage (client)
components/effects/AttributionCapture.tsx [client] montado en layout.tsx
.env.example            variables de entorno documentadas (LEAD_PROVIDER, webhook, respond.io). Detalle: skill animal-lead-form

content/
  site.ts      NAV_LINKS, FOOTER_COLUMNS, INSTAGRAM_URL/HANDLE, tagline, legal
  pillars.ts   PILLARS (7)
  plans.ts     PLANS (name, leadLabel, badge, description, features, highlight)
  gallery.ts   GALLERY (area, src import estático, alt, caption, sizes)
  reviews.ts   GOOGLE_STAT + REVIEWS (pending: true mientras sean placeholders)
  contact.ts   CONTACT_ROWS (label, value, href?, pending?)
  legal.ts     LEGAL (responsable, domicilio, email) para /privacidad — placeholders hasta que el cliente confirme

lib/cx.ts      cx(...classes) une clases ignorando falsy
public/images/ 13 assets (hero, 10 galería, 3 logos)
.claude/launch.json  config "dev" para preview (npm run dev, puerto 3000)
```

## Cómo fluye un cambio típico

- Texto/dato → editar `content/*.ts`. Los componentes solo mapean.
- Look de un bloque → clases Tailwind en la sección correspondiente. Tokens en `globals.css @theme`.
- Nuevo CTA que abre el modal → `<LeadTrigger cta="…" plan="…" variant="…">` (`cta` identifica el origen del lead).
- Links de navegación usan `/#seccion` (funcionan también desde `/privacidad`).
- Nuevo efecto con JS → componente `"use client"` chico en `components/effects/`, montado desde la sección o page.

## Convenciones de estilo (importantes para no romper la fidelidad)

- Tailwind mobile-first con `md:` (≥701px) y `lg:` (≥981px). No usar `sm`/`xl` salvo necesidad real.
- Tamaños de fuente siempre arbitrarios en px (`text-[14px]`, `text-[clamp(30px,4vw,52px)]`): las escalas `text-sm` etc. traen line-height propio y desalinean respecto del diseño.
- Colores solo por token: `bg-navy-900`, `text-bone`, `border-mist`… (nunca hex sueltos salvo rgba de overlays).
- Todo bloque que aparece al scrollear lleva la clase `reveal` (y `reveal in` en el hero, que ya está visible).
- Preflight de Tailwind está activo: por eso `Button` fija `leading-[normal]` en `<button>` y `leading-[1.5]` en `<a>`, y los links que deben subrayarse llevan `underline` explícito.
- Lo que no cabe en una línea de utilidades va a `globals.css` (`@layer components`) o a un `.module.css` co-localizado (hoy solo `Gallery.module.css`).

## Gotchas de Next 16 (leer `node_modules/next/dist/docs/` ante la duda)

- `next/image`: usar `preload` (no `priority`, deprecado). `qualities` default `[75]`. Con `fill` el padre debe ser `relative`.
- `LayoutProps<"/">` es un tipo global generado; no se importa.
- El script inline del layout + `suppressHydrationWarning` en `<html>` son intencionales (evitan flash de los reveals).
- `/` y `/privacidad` se prerenderizan estáticas; la única lógica de servidor es la Server Action del formulario (`app/actions/lead.ts`), que usa `headers()`.
