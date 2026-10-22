# VEN Infraestructure

Energía eléctrica y obra civil en España y Portugal. Una marca limpia, cuadrada y precisa como un plano, con la calidez de una tipografía redonda en minúsculas.

Este kit nace de la dirección **F · Minimal · letra del logo** y es la referencia para la web pública (ES / PT) y para la app interna del equipo.

## Principios

1. **El plano manda.** Todo se apoya en una retícula: celdas cuadradas, cotas, numeración de hoja (`HOJA 01`, `01 / Servicios`). Nada flota sin alinearse.
2. **Cuadrado por fuera, redondo por dentro.** Las formas son siempre rectas (`radius-none`); la única curva de la marca está en las letras, como el arco de la «n» del logo.
3. **Minúsculas limpias.** Titulares, menú y botones en minúsculas Poppins SemiBold 600, el mismo peso que el «infraestructure» del logotipo. Nunca pesos finos.
4. **Azul con aire.** El azul es protagonista en bloques completos (hero, ámbito, pie) que alternan con secciones blancas. El amarillo solo señala.
5. **Movimiento con intención.** Las cosas se *dibujan* o se *fijan*: letras que se escanean y se asientan, cotas que se trazan, nodos que giran. Nada rebota.

## Color

| Token | Uso | Proporción |
| --- | --- | --- |
| `white` | Fondo de secciones de lectura | ~55 % |
| `ven-blue` | Bloques de marca (hero, ámbito, pie, módulos), titulares, botón primario | ~35 % |
| `ven-navy` / `ink-soft` | Texto de lectura | ~5 % |
| `signal-yellow` | Acento: letra activa, marca de cota, chevron «‹», hovers | ≤5 % |

Reglas:
- Sobre `ven-blue` el texto es `white`; el secundario `blue-100`; las etiquetas `blue-200`.
- Sobre `white` los titulares son `ven-blue`, el texto `ven-navy` / `ink-soft`, las etiquetas `blue-500`.
- `signal-yellow` nunca es texto sobre blanco. Es fondo o forma, con `ven-navy` encima.
- Las secciones alternan: azul → blanco → blanco → azul → blanco → azul. Nunca dos bloques azules seguidos sin respiro blanco salvo hero+cinta.

## Tipografía

- **Poppins** (Google Fonts) es la fuente principal y la misma del «infraestructure» del logotipo, con el mismo peso que el logo: SemiBold 600 para titulares, menú y botones y Medium 500 para texto de lectura. Es ancha: los titulares llevan tracking negativo (`-0.02em` a `-0.035em`). Pendiente confirmar con quien diseñó el logo.
- **Geist Mono** (Google Fonts, 400–500) solo para anotaciones de plano en MAYÚSCULAS a 12 px.
- Titulares en minúsculas y con punto final: «dos disciplinas.», «del plano a la obra.».
- Cuerpo en Poppins 500, nunca por debajo de 16 px.

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;900&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Formas y patrones

- **Celdas de letras:** retícula de 11 cuadrados con línea de 1 px (`rule-on-blue`), una letra por celda. Es la firma visual de la marca.
- **Cuadrícula de plano:** 40 px (`space-7`) en `grid-on-blue` sobre los bloques azules.
- **Cota:** línea horizontal con topes verticales en los extremos y una marca amarilla en el centro; etiquetas `ESPAÑA` / `PORTUGAL` en mono.
- **Chevron «‹»:** viene de la animación del logo. Se usa como separador («energía eléctrica ‹ obra civil») y en la cinta, siempre amarillo.
- **Marcas de esquina:** pequeña escuadra de 5 px en la esquina superior izquierda de cada celda.

## Movimiento

| Patrón | Dónde | Cómo |
| --- | --- | --- |
| Escaneo de letras | Celdas del hero | Caracteres aleatorios → letra final de izquierda a derecha cada ~3 frames (45 ms); la letra recién fijada se enciende en amarillo 270 ms; rota palabra cada ~5,4 s |
| Dibujo de cota | Hero | `stroke-dashoffset` 1→0 en `dur-draw` con `ease-draw` |
| Barra de servicio | Servicios | La marca amarilla crece de 12 a 48 px en hover |
| Nodo de fase | Método | Cuadrado → rombo amarillo (rotate 45°) en hover |
| Separación de letras | Ámbito | `letter-spacing` se abre en hover |
| Subrayado | Enlaces | Barra amarilla de 3 px que crece de izquierda a derecha |

Respetar siempre `prefers-reduced-motion`: sin escaneo (palabra fija), cotas ya dibujadas.

## Voz bilingüe · ES / PT

Directa, técnica, sin adornos. Frases cortas, verbos en primera persona del plural.

| Español | Português |
| --- | --- |
| construimos | construímos |
| conectamos | ligamos |
| iluminamos | iluminamos |
| canalizamos | canalizamos |
| proyectamos | projetamos |
| energía eléctrica ‹ obra civil | energia elétrica ‹ obra civil |
| dos disciplinas. | duas disciplinas. |
| del plano a la obra. | do projeto à obra. |
| la obra, en el bolsillo. | a obra, no bolso. |
| ¿hablamos de tu obra? | falamos da sua obra? |
| pedir presupuesto | pedir orçamento |
| acceso empleados | acesso colaboradores |
| fichaje diario | registo de ponto |
| partes de trabajo | relatórios de trabalho |
| nóminas | recibos de vencimento |

Las palabras del hero deben caber en 11 celdas en ambos idiomas.
Las traducciones portuguesas son una primera propuesta: revisar con un nativo de Portugal (PT-PT, no PT-BR).

## Logotipo

El logo oficial está en **Assets › Logos**. En la web se usa la versión blanca sobre `ven-blue` en el hero y el pie, y `ven-blue` sobre blanco en el resto. Pendiente: recibir el logotipo en SVG vectorial (blanco y azul).

## Iconografía

Trazo de 2–2.5 px, `stroke-linecap: square`, sin rellenos, ángulos rectos. El chevron de botón es una punta de 3 segmentos (`4,1 10,7 4,13`). Sin emojis.
