# Pendientes — Animal Studio web

Fuente: `../alcance_animal_final.pdf` (alcance definido por el cliente) contrastado con lo que ya está implementado.
Estado al 2026-09-18. El diseño y la estructura de la landing están resueltos; lo que falta es la **captura de leads** y el **contenido real**.

Origen de cada ítem: **[PDF]** lo pidió el cliente en el alcance · **[propuesta]** lo sugerimos nosotros (no está en el PDF; se hace solo si el cliente lo aprueba) · **[técnico]** necesario para publicar, sin impacto en el alcance.

## Resumen del alcance

- La web es **landing + receptora de leads**. No vende abonos, no cobra (nada de Mercado Pago/Payway), no tiene cuentas de usuario ni backoffice. Todo eso corre en otro sistema del gym.
- En cada plan se piden **nombre completo, email y celular**, no se muestran precios, y al enviar se avisa que **un asesor va a contactar**.
- El lead tiene que **crearse en respond.io** para que el asesor lo trabaje desde ahí.
- Métricas: **cantidad de visitas** y **origen del lead**.
- Tienda de merch / carrito: el cliente pide **no incluirla por ahora** (fuera de alcance de esta etapa).

## 1. Formulario de leads — desarrollado (2026-09-18), falta configuración del cliente

Implementado (ver skill `animal-lead-form` y `.env.example`):
- [x] [PDF] Server Action con validación, estados enviando / éxito / error en el modal.
- [x] [PDF] Proveedores intercambiables por `LEAD_PROVIDER`: `console`, `webhook`, `respondio` (create_or_update + tags + comentario con el resumen). Los tags son [propuesta], opcionales.
- [x] [PDF] Origen del lead: CTA que abrió el modal + UTM, referrer y página de llegada.
- [x] [técnico] Anti-spam: honeypot + rate limit por IP.
- [x] [propuesta] Texto legal bajo el botón y página `/privacidad`. No está en el PDF; la Ley 25.326 lo exige al recolectar datos personales. Si el cliente no lo quiere, se quita el link y la página.

Pendiente de datos del cliente:
- [ ] [PDF] Token de la Developer API de respond.io (requiere plan Growth o superior) → `RESPONDIO_API_TOKEN`, `LEAD_PROVIDER=respondio`. Si quieren tags, crearlos en el workspace y cargarlos en `RESPONDIO_TAGS`.
- [ ] [propuesta] Razón social, domicilio y email de contacto para la política de privacidad (`content/legal.ts`). Solo si mantienen la página.
- [ ] [PDF] Confirmar si piden DNI además de nombre, email y celular (hoy: no; el PDF es ambiguo).

## 2. Métricas

- [ ] [PDF] Analytics de visitas (Vercel Analytics, GA4 o Plausible) en `app/layout.tsx`. El cliente pide "cantidad de visitas"; la herramienta la elegimos nosotros.
- [ ] [PDF] Origen del lead como métrica: el cliente pide "origen del lead". Ya viaja en cada lead a respond.io; el evento `lead_submitted` en analytics es [propuesta] para verlo agregado.

## 3. Contenido real que debe entregar el cliente

- [ ] [PDF] **Reseñas de Google**: puntaje real y 3 reseñas textuales con nombre (`content/reviews.ts`, hoy placeholders). El PDF pide "testimonios / comunidad".
- [ ] [PDF] **Dirección** de la sede y **mapa** (embed de Google Maps + link de indicaciones) en `content/contact.ts` y `components/sections/Contact.tsx`. El PDF pide "ubicación(es) con mapa y contacto".
- [ ] [PDF] **Email / WhatsApp** de contacto (`content/contact.ts`).
- [ ] [PDF] **Redes sociales** además de Instagram, si las hay. El PDF pide "footer con redes sociales".
- [ ] [PDF] **Fotos y video propios** de instalaciones y clases: el PDF dice que Animal los aporta. Reemplazar los renders de la galería y, si entregan video, el hero.
- [ ] [PDF] Confirmar nombres y descripciones definitivos de los 3 planes (`content/plans.ts`). El PDF dice que los administradores cambian nombres.

## 4. Hero en video (opcional según asset)

- [ ] [PDF] Si el cliente entrega video: hero con `<video autoplay muted loop playsinline>` y poster, con fallback a la foto actual y respeto de `prefers-reduced-motion`. El PDF pide "hero en video (loop, muteado) o foto de alto impacto"; hoy es foto.

## 5. Puesta en producción

- [ ] [técnico] Hosting (Vercel recomendado) y dominio; variables de entorno de respond.io.
- [ ] [propuesta] Metadata para compartir: imagen Open Graph, `sitemap`, `robots`, título/descr definitivos. No está en el PDF; mejora cómo se ve el link en redes y en Google.
- [ ] [propuesta] Revisión final de accesibilidad y Lighthouse en producción.

## Fuera de alcance por ahora (según el cliente)

- Emails automáticos (aviso al asesor o confirmación al usuario): no están en el PDF. El asesor trabaja el lead desde respond.io.
- Tienda / carrito de merch y sus métricas (compras, productos más vendidos).
- Cuentas de usuario, historial de compras.
- Backoffice de planes: los nombres se cambian en `content/plans.ts`. Si el cliente quiere editarlos sin tocar código, evaluar un CMS liviano más adelante.
- Pagos y cobros recurrentes (Payway) — se gestionan fuera de la web.
