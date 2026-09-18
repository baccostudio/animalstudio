---
name: animal-edit-content
description: Cómo cambiar el contenido de la landing Animal Studio — textos, nombres y bullets de planes, pilares, fotos de la galería y del hero, reseñas de Google, dirección/contacto, links del footer y redes. Usala siempre que el pedido sea "cambiá/actualizá/poné/sacá" un texto, foto, plan o dato, aunque no digan la palabra "contenido"; el copy vive en content/ y no en los componentes.
---

# Editar contenido

Regla: los textos y datos viven en `content/*.ts`; los componentes solo los mapean. Si un texto no está en `content/`, está en la sección correspondiente de `components/sections/` (hero, manifiesto, breaker, títulos) y ahí se edita.

## Dónde está cada cosa

| Quiero cambiar | Archivo | Notas |
|---|---|---|
| Links del header | `content/site.ts` → `NAV_LINKS` | href = id de sección (`#planes`) |
| Columnas del footer, tagline, © | `content/site.ts` → `FOOTER_COLUMNS`, `FOOTER_TAGLINE`, `FOOTER_LEGAL` | `lead: true` abre el modal; `external: true` abre en pestaña nueva |
| Instagram | `content/site.ts` → `INSTAGRAM_URL/HANDLE` | lo usan footer y contacto |
| Pilares (7) | `content/pillars.ts` | la tarjeta de cierre "Exclusivo en calidad…" está en `Pillars.tsx` |
| Planes | `content/plans.ts` | `leadLabel` es lo que se ve en el título del modal ("Plan …"); `highlight: true` = tarjeta destacada con badge |
| Fotos de galería | `content/gallery.ts` | ver "Agregar o reemplazar una foto" |
| Foto del hero | `components/sections/Hero.tsx` (import `hero`) | reemplazar `public/images/hero-silhouette.jpg` o cambiar el import |
| Reseñas y puntaje Google | `content/reviews.ts` | poner `pending: false` al cargar datos reales: cambia color/estilo itálico |
| Dirección, contacto | `content/contact.ts` | `pending: false` quita el itálico gris; `href` convierte el valor en link |
| Texto del mapa | `components/sections/Contact.tsx` | placeholder hasta tener ubicación real |
| Título/desc del modal | `components/lead/LeadModalProvider.tsx` | |
| Labels del form, nota legal, mensajes de error | `components/lead/LeadForm.tsx` (`FIELDS`) y `app/actions/lead.ts` (mensajes) | |
| Datos del responsable en la política de privacidad | `content/legal.ts` | texto de la política en `app/privacidad/page.tsx` |
| Manifiesto, hero, breaker | su sección en `components/sections/` | |
| Título y descripción SEO | `app/layout.tsx` → `metadata` | |

## Agregar o reemplazar una foto

1. Copiar el archivo a `public/images/` (jpg optimizado, ~1600px de ancho es suficiente; el hero puede ser vertical).
2. Importarlo estáticamente: `import foto from "@/public/images/nombre.jpg";` (así `next/image` conoce ancho/alto y evita layout shift).
3. En galería, cada item necesita `area` (a–j, define su lugar en el mosaico de `Gallery.module.css`), `alt` descriptivo, `caption` y `sizes`. Usar `HALF` para áreas de 2 columnas y `QUARTER` para las de 1.
4. Si se agregan más de 10 fotos hay que extender las `grid-template-areas` en `Gallery.module.css` (3 layouts: 1, 2 y 4 columnas).

## Después de editar

- `npm run lint` y, si cambió estructura, `npm run build`.
- Si el cambio es visual, mirar desktop y mobile (skill `animal-verify`).
- Si se completó algo que figuraba en `pendientes.md`, tacharlo ahí.
