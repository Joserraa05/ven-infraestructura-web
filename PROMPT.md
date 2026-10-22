# Encargo: web de VEN Infraestructure en Astro

Lee primero `CLAUDE.md` (reglas del proyecto) y abre `design/referencia-inicio.html` en el navegador: es el aspecto que debe tener el Inicio. Después construye la web siguiendo este documento.

## 1. Empresa y objetivo

VEN Infraestructure: energía eléctrica y obra civil en España y Portugal.
Público: compañías eléctricas, administraciones y promotores.
La web debe (1) explicar las dos disciplinas, (2) conseguir peticiones de presupuesto y (3) dar acceso al equipo a la App VEN (enlace externo `[URL APP]`).

## 2. Proyecto Astro

- Inicializa Astro en este repo (plantilla mínima, TypeScript estricto), salida estática.
- `astro.config.mjs`:
  ```js
  i18n: { locales: ['es', 'pt'], defaultLocale: 'es', routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false } }
  ```
  y `site: '[DOMINIO]'` para el sitemap.
- Integraciones: `@astrojs/sitemap` (con i18n es-ES / pt-PT).
- Fuentes: `@fontsource/poppins` (500, 600) y `@fontsource/geist-mono` (400, 500), importadas en el layout.
- `src/pages/index.astro`: redirección a `/pt/` si `navigator.language` empieza por `pt`, si no a `/es/` (script mínimo + `<meta http-equiv="refresh">` a `/es/` como respaldo).

Estructura objetivo:

```
src/
  i18n/es.json  pt.json  utils.ts        (t(lang, key), rutas traducidas, getAlternate())
  styles/tokens.css  global.css
  layouts/Base.astro                     (head, hreflang, fuentes, Header, Footer)
  components/
    Header.astro  MobileMenu.astro  LanguageSwitch.astro
    LetterCells.astro  DimensionLine.astro  SectionHeader.astro
    ServiceColumn.astro  PhaseTimeline.astro  ModuleTile.astro
    ButtonLink.astro  Footer.astro  QuoteForm.astro
  pages/
    es/index.astro  es/servicios.astro  es/proyectos.astro  es/empresa.astro  es/contacto.astro
    es/aviso-legal.astro  es/privacidad.astro  es/cookies.astro
    pt/index.astro  pt/servicos.astro  pt/projetos.astro  pt/empresa.astro  pt/contacto.astro
    pt/aviso-legal.astro  pt/privacidade.astro  pt/cookies.astro
public/logo/  public/favicon.svg
```

Las páginas de cada idioma deben ser finas: importan un componente de página compartido (`src/views/Home.astro`, etc.) y le pasan `lang`. Nada de duplicar markup entre ES y PT.

## 3. Bilingüe

- Rutas traducidas: servicios ↔ servicos, proyectos ↔ projetos, privacidad ↔ privacidade. Mapa en `src/i18n/utils.ts`.
- `<html lang="es-ES">` / `lang="pt-PT"`; `<link rel="alternate" hreflang>` cruzados + `x-default` → `/es/`.
- `title` y `meta description` propios por página e idioma (claves `meta.*` en los JSON).
- `LanguageSwitch` enlaza a la página equivalente del otro idioma, con `aria-current="page"` en el activo.
- Un script `npm run check:i18n` que falle si `es.json` y `pt.json` no tienen exactamente las mismas claves; ejecútalo en `prebuild`.

## 4. Inicio — secciones en orden

Réplica fiel de `design/referencia-inicio.html`, con estos componentes:

1. **Header** (fondo `--ven-blue`): logo blanco, menú en minúsculas (servicios, método, app ven, contacto), `LanguageSwitch`, botón blanco «acceso empleados» → `[URL APP]`. En móvil (<860 px) el menú pasa a un panel a pantalla completa azul.
2. **Hero** (azul con cuadrícula de plano de 40 px): etiqueta mono «HOJA 01 — ÍNDICE · ESC. 1:1 · ES · PT»; `LetterCells`; debajo «energía eléctrica ‹ obra civil» a todo el ancho (chevron amarillo); `DimensionLine` ESPAÑA — PORTUGAL; entradilla y botón «pedir presupuesto» + enlace «ver servicios».
3. **Servicios** (blanco): `SectionHeader` «dos disciplinas.» · «01 / SERVICIOS»; dos `ServiceColumn` (energía eléctrica, obra civil) con lista separada por líneas finas y una barra amarilla que crece de 12 a 48 px en hover.
4. **Método** (blanco): «del plano a la obra.»; `PhaseTimeline` de 4 fases; el nodo cuadrado gira a rombo amarillo en hover.
5. **Proyectos destacados** (blanco): 3 celdas cuadradas con foto + código de obra. Si `projects` está vacío en el JSON, la sección no se renderiza.
6. **Ámbito** (azul): «españa ‹ portugal» grande; `letter-spacing` se abre en hover; sedes debajo.
7. **App VEN** (blanco): «la obra, en el bolsillo.»; 5 `ModuleTile` azules que pasan a amarillo en hover; botón «entrar a la app».
8. **Footer** (azul): «¿hablamos de tu obra?», email, teléfono, dirección, enlaces legales, `LanguageSwitch`.

## 5. LetterCells (firma de la marca)

- 11 celdas cuadradas en grid, bordes 1 px `--rule-on-blue`, letra Poppins 600 minúscula `clamp(22px, 5vw, 76px)`.
- Palabras desde `hero.words` del JSON del idioma (ES: construimos, conectamos, iluminamos, canalizamos, proyectamos · PT: construímos, ligamos, iluminamos, canalizamos, projetamos).
- Tick cada 45 ms. La celda i muestra caracteres aleatorios `[a-z0-9/+]` en `--blue-300` hasta el tick `6 + 3·i`; después su letra; durante 6 ticks la celda recién fijada tiene fondo `--signal-yellow` y letra `--ven-navy`. A los 120 ticks pasa a la siguiente palabra.
- Hover de celda: fondo blanco, letra azul.
- El `h1` lleva el texto completo (`hero.h1`) oculto visualmente; las celdas `aria-hidden`.
- Render inicial en servidor con la primera palabra (sin JS se ve completa). `prefers-reduced-motion`: sin animación.
- Pausar el intervalo cuando el hero sale de pantalla (IntersectionObserver).

La implementación de referencia está en el `<script>` de `design/referencia-inicio.html`.

## 6. Resto de páginas

- **Servicios**: una ficha por servicio (título, descripción, alcance) agrupadas por disciplina. Textos `services.*`.
- **Proyectos**: rejilla de celdas cuadradas; si no hay proyectos, mensaje «próximamente» (`projects.empty`).
- **Empresa**: quiénes somos, sedes ES/PT, certificaciones `[PENDIENTE]`.
- **Contacto**: `QuoteForm` con nombre, empresa, email, teléfono, país (ES/PT), tipo de servicio, mensaje y aceptación de privacidad. Envío a `[ENDPOINT FORMULARIO]` (deja la URL en una variable de entorno `PUBLIC_FORM_ENDPOINT`). Validación HTML nativa, mensajes de error de los JSON.
- **Legal**: aviso legal, privacidad y cookies con texto `[PENDIENTE]` hasta tener los definitivos.

## 7. Diseño

Todo sale de `src/styles/tokens.css` (copia de `design/tokens.css`). Resumen:

- Colores: `--ven-blue #0B2FAA`, `--ven-navy #061A66`, `--ink-soft #1C2A5E`, `--blue-500 #3A57C9`, `--blue-300 #7F98F0`, `--blue-200 #C9D4F7`, `--blue-100 #DCE4FF`, `--blue-50 #E4E9FA`, `--blue-25 #F3F6FE`, `--signal-yellow #FFC20E`.
- Proporción: ~55 % blanco, ~35 % azul, ≤5 % amarillo. Secciones alternando bloques azules y blancos.
- Tipografía: Poppins 600 en titulares, menú, botones y celdas (minúsculas, tracking negativo); Poppins 500 en texto; Geist Mono 12 px MAYÚSCULAS para anotaciones.
- Formas: radio 0 siempre; bordes 1 px; reglas 2 px; iconos de trazo 2–2.5 px con `stroke-linecap: square`.
- Movimiento: hovers 300 ms `cubic-bezier(.2,.8,.2,1)`; líneas que se dibujan con `stroke-dashoffset` en 2 s `cubic-bezier(.65,0,.25,1)`. Botones: hover amarillo con texto navy y el chevron se separa de 14 a 20 px. Enlaces: subrayado amarillo de 3 px que crece.

## 8. Calidad

- Responsive desde 360 px. Sin scroll horizontal.
- WCAG AA: contraste, foco visible (contorno 3 px `--signal-yellow`), objetivos táctiles ≥ 44 px, navegación por teclado del menú móvil.
- Lighthouse ≥ 95 en las cuatro categorías; LCP < 2 s en móvil.
- Imágenes con `astro:assets` (`<Image>`), WebP/AVIF, `width`/`height`.
- `npm run build` sin avisos.

## 9. Orden de trabajo

1. Inicializar Astro, i18n, fuentes, tokens y `Base.astro`.
2. Componentes del Inicio y `/es/` hasta que coincida con la referencia.
3. `/pt/` con los mismos componentes.
4. Resto de páginas, formulario, legal.
5. SEO (hreflang, sitemap, metas), accesibilidad y rendimiento.

Haz un commit por paso con mensajes claros en español.
