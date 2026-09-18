@AGENTS.md

# Animal Studio — landing (Next 16 · React 19 · Tailwind 4 · TypeScript)

Landing de un gimnasio boutique (Longevity Performance Club). Una sola ruta (`/`). No hay backend todavía.

- Copy y datos editables: `content/*.ts` (nunca hardcodear textos en componentes).
- Componentes: `components/{ui,layout,sections,effects,lead}/`.
- Tokens, variantes y CSS global: `app/globals.css`. Estilos con utilidades Tailwind; CSS solo para lo que no cabe en una línea.
- Imágenes: `public/images/` con import estático + `next/image`. Fuentes: `next/font` en `app/layout.tsx`.

## Skills del repo (`.claude/skills/`)

Leé la skill que corresponda antes de tocar código; ahorran búsquedas:

| Skill | Cuándo |
|---|---|
| `animal-repo-map` | Cualquier tarea: mapa de archivos, qué hace cada componente, convenciones y gotchas de Next 16 |
| `animal-edit-content` | Cambiar textos, planes, pilares, fotos de galería, reseñas, contacto, footer |
| `animal-new-section` | Agregar una sección, tarjeta o componente nuevo con el mismo look |
| `animal-lead-form` | Todo lo del formulario de leads: spec del cliente, integración respond.io, analytics |
| `animal-verify` | Correr el sitio, lint/build y verificación visual desktop/mobile |

## Documentos

- `pendientes.md` — lo que falta desarrollar (mantenerlo al día al cerrar tareas).
- `../alcance_animal_final.pdf` — alcance definido por el cliente (fuente de verdad del requerimiento).
