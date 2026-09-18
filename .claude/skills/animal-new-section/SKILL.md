---
name: animal-new-section
description: Patrón para agregar una sección, bloque, tarjeta o componente nuevo a la landing Animal Studio manteniendo el mismo diseño (tokens, Section/Container/Kicker/SectionHead, reveal, breakpoints 701/981, Server vs Client). Usala cuando pidan "agregá una sección/bloque/tarjeta/componente", una página nueva, un CTA nuevo o cualquier UI que no exista todavía.
---

# Agregar una sección o componente

## Esqueleto de una sección

```tsx
// components/sections/NuevaSeccion.tsx  (Server Component, sin "use client")
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { NUEVO } from "@/content/nuevo";

export function NuevaSeccion() {
  return (
    <Section id="nueva" tone="bone">            {/* tone: bone | navy | ink */}
      <Container>
        <Kicker number="07" className="reveal" />
        <SectionHead className="reveal" title="Título" description="Bajada corta." />
        <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NUEVO.map((item) => ( /* … */ ))}
        </div>
      </Container>
    </Section>
  );
}
```

Luego:
1. Datos en `content/nuevo.ts` (tipado, exportado en mayúsculas).
2. Montar en `app/page.tsx` en el orden correcto dentro de `<main>`.
3. Si tiene que aparecer en el menú, agregar `{ href: "#nueva", label: "…" }` a `NAV_LINKS` en `content/site.ts` (y al footer si corresponde).
4. Renumerar los `Kicker` de las secciones siguientes (01…06 hoy).

## Reglas que mantienen el look

- Colores por token (`text-navy-200`, `bg-ink`, `border-mist`). Fondos claros usan `tone="bone"`, oscuros `navy` o `ink`; alterná como en la landing.
- Tipografía: `font-display` (Chakra Petch, uppercase con tracking) para etiquetas/numeradores/títulos técnicos; `font-body` para títulos grandes y párrafos. Tamaños en px arbitrarios, no escalas `text-sm/lg`.
- Espaciado vertical: dejá que `Section` ponga el padding; solo `padded={false}` si el diseño lo exige (ver `Plans.tsx`).
- Ancho: siempre dentro de `Container` (1320px + gutter fluido).
- Animación de entrada: clase `reveal` en los bloques (el `RevealObserver` ya los toma). Nada más de animación salvo hover sutil.
- Botones y CTAs: `Button` (link) o `LeadTrigger` (abre el modal). No crear estilos de botón nuevos; si hace falta otra variante, agregarla en `Button.tsx`.
- Imágenes: import estático + `next/image`; con `fill` el padre lleva `relative` y un tamaño; pasar `sizes` acorde al ancho real.

## Client Components: solo cuando hay estado o eventos

Poné `"use client"` únicamente en el componente hoja que necesita `useState`/`useEffect`/handlers, y mantené la sección como Server Component (ver `Breaker.tsx` + `ClockCounter.tsx` como ejemplo). Si necesita hablar con el modal, usá `useLeadModal()` de `components/lead/LeadModalProvider.tsx`.

## CSS que no cabe en utilidades

Keyframes, `grid-template-areas`, gradientes múltiples en pseudo-elementos → `app/globals.css` bajo `@layer components`, o un `Nombre.module.css` al lado del componente si es exclusivo de él (como `Gallery.module.css`). Preferí utilidades para todo lo demás.

## Antes de cerrar

`npm run lint`, `npm run build`, y mirar desktop (≥1320px) y mobile (375px) con la skill `animal-verify`.
