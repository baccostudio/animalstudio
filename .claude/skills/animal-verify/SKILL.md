---
name: animal-verify
description: Cómo correr y verificar la landing Animal Studio — dev server con preview, lint/typecheck/build, capturas full-page desktop y mobile con Chrome headless y checklist de comportamiento (intro, header, modal, menú mobile, reloj). Usala al terminar cualquier cambio visual o funcional, cuando pidan "probá", "fijate que se vea bien", "sacá capturas", "corré el build" o "compará con el original".
---

# Verificar la landing

## Rápido

```bash
npm run lint && npx tsc --noEmit && npm run build
```

Los tres deben pasar sin warnings. El build tiene que mostrar `○ /` (estático).

## Ver el sitio

- Preview en el panel del navegador: `preview_start` con el nombre `dev` (config en `.claude/launch.json`, puerto 3000). Si la sesión está abierta en una carpeta padre y no encuentra la config, levantalo con `npm run dev` en segundo plano y esperá a que `http://localhost:3000` responda 200.
- El panel del navegador a veces devuelve capturas recortadas o en blanco cuando la ventana está oculta. Para capturas confiables usá el script de abajo.

## Capturas full-page (desktop 1440 y mobile 375)

`scripts/screenshot.mjs` usa el Chrome/Edge instalado en la máquina vía `puppeteer-core` (ya está como devDependency; no va a producción). Hace scroll completo para disparar los reveals y el intro, congela las animaciones y guarda `shots/<nombre>-<ancho>.png`.

```bash
node .claude/skills/animal-verify/scripts/screenshot.mjs http://localhost:3000 next
```

Para comparar contra otra versión (por ejemplo el HTML original servido con `npx serve carpeta -l 5050`), correrlo dos veces con nombres distintos y compararlas con el Read de imágenes. Las alturas totales deberían coincidir con diferencia de pocos px.

## Checklist de comportamiento

`scripts/check-behavior.mjs` imprime un JSON con todo esto; cualquier `false`, valor raro o entrada en `logs` es un problema:

- `<html>` tiene clase `js`; el header está `hidden` en el top y visible + sólido tras scrollear el intro (`intro-done`).
- El reloj del breaker termina en `01:23`.
- Modal: abre desde header, muestra `Plan …` desde un plan, focus en el primer input, cierra con Escape restaurando foco y `body.style.overflow`, muestra éxito al enviar y vuelve al form al reabrir.
- Mobile (375): burger visible, menú se abre como columna fija bajo el header y se cierra al clickear un link.
- Red: 0 requests a `fonts.googleapis`; fuentes `.woff2` locales; imágenes por `/_next/image`.
- Consola sin errores ni warnings (hidratación, LCP, `sizes`).

```bash
npm run check
```

## Probar el formulario de leads sin credenciales de respond.io

Tres modos, elegidos en `.env.local` (Next recarga el archivo solo):

1. **Consola / webhook.site**: `LEAD_PROVIDER=console,webhook` + `LEAD_WEBHOOK_URL` de webhook.site. Se ve el JSON del lead.
2. **respond.io simulado**: correr `npm run mock:respondio` desde la raíz del proyecto (puerto 5070; falla con EADDRINUSE si ya hay otro mock corriendo) y poner `LEAD_PROVIDER=respondio`, `RESPONDIO_API_BASE=http://localhost:5070/v2`, `RESPONDIO_API_TOKEN=test-token`, `RESPONDIO_TAGS=web`. El mock imprime cada llamada (create_or_update, tags, comment) con el cuerpo exacto que recibiría respond.io y rechaza requests sin Bearer. `RESPONDIO_API_BASE` solo se respeta con `NODE_ENV` distinto de `production`; en un build de producción se ignora (ver `lib/leads/providers/respondio.ts`).
3. **respond.io real**: quitar `RESPONDIO_API_BASE` y poner el token del cliente. Verificar en respond.io → Contacts.

En los tres casos el envío se hace desde el modal del sitio (o con `check-behavior.mjs`). Recordar el rate limit: 5 envíos por IP cada 10 min; reiniciar `npm run dev` lo limpia.

## Qué mirar a ojo

Intro → hero, manifiesto (kicker sticky solo en desktop), breaker, pilares 4/2/1 columnas, galería en sus 3 mosaicos, planes 3/1, reseñas, contacto, footer. Los breakpoints son 701px y 981px.
