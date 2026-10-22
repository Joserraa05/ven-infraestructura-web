# VEN Infraestructure — web

Web corporativa bilingüe (es-ES / pt-PT) de VEN Infraestructure: energía eléctrica y obra civil en España y Portugal.

## Stack (obligatorio)

- **Astro** (última versión estable 5.x), salida estática (`output: 'static'`).
- HTML + CSS propios. Sin Tailwind, sin librerías de UI, sin React/Vue salvo que se pida.
- JavaScript solo en el componente `LetterCells` y en el menú móvil (scripts de Astro, sin frameworks).
- i18n con el sistema integrado de Astro (`i18n` en `astro.config.mjs`), locales `es` (por defecto) y `pt`, `prefixDefaultLocale: true`.
- Fuentes autoalojadas con `@fontsource/poppins` (500, 600) y `@fontsource/geist-mono` (400, 500). Nada de Google Fonts en runtime.

## Fuentes de verdad

| Qué | Dónde |
| --- | --- |
| Encargo completo | `PROMPT.md` |
| Colores, tipografía, espaciados, movimiento | `design/tokens.css` (copiar a `src/styles/tokens.css`) |
| Normas de marca | `design/brand-kit.md` |
| Aspecto final del Inicio | `design/referencia-inicio.html` (abrir en el navegador) |
| Textos | `src/i18n/es.json`, `src/i18n/pt.json` |
| Logo | `public/logo/` |

Si algo en el código contradice estos archivos, mandan estos archivos.

## Reglas

- Todos los textos visibles salen de `src/i18n/*.json`. Nunca texto escrito a mano en los componentes.
- Las dos lenguas tienen exactamente las mismas claves. Si añades una en `es.json`, añádela en `pt.json`.
- No inventes datos (teléfonos, direcciones, cifras, clientes). Lo que falte se muestra como `[PENDIENTE]`.
- Titulares, menú y botones en minúsculas, Poppins 600. Texto en Poppins 500. Etiquetas técnicas en Geist Mono 12 px MAYÚSCULAS.
- Todo cuadrado: `border-radius: 0`. El amarillo `--signal-yellow` nunca como texto sobre blanco.
- Respetar `prefers-reduced-motion`.
- Antes de dar algo por terminado: `npm run build` sin errores y revisar a 360 px y a 1440 px.
