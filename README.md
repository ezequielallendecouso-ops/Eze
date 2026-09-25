# Metalúrgica Allende — sitio web

Sitio institucional estático (HTML + CSS + JS, sin build ni dependencias).

## Estructura

```
index.html            Página única (todas las secciones)
robots.txt
sitemap.xml
assets/css/styles.css Estilos (paleta y fuentes en :root)
assets/js/main.js     Menú, fotos reemplazables, formulario
assets/img/           Favicon, imagen para redes y (a futuro) fotos
```

## Subir a Hostinger

1. hPanel → Sitios web → Administrar → **Administrador de archivos** → carpeta `public_html`.
2. Subir **el contenido** de este repositorio (no la carpeta contenedora): `index.html` tiene que quedar directamente dentro de `public_html`.
3. No hace falta subir `README.md` ni la carpeta `.git`.

## Qué reemplazar y dónde

Buscar en `index.html` los comentarios con la palabra **REEMPLAZAR** o **AGREGAR**.

| Qué | Cómo |
|---|---|
| **Logo** | Hoy es un wordmark tipográfico en CSS (`.wordmark`). Guardar el SVG como `assets/img/logo.svg` y reemplazar el contenido del `<a class="wordmark">` en header y footer (instrucciones en el comentario). Reemplazar también `favicon.svg`, `favicon-32.png` y `apple-touch-icon.png`. |
| **Fotos de máquinas** | Subir a `assets/img/` con estos nombres exactos: `maquina-prensa-200t.jpg`, `maquina-prensa-150t.jpg`, `maquina-prensa-90t.jpg`, `maquina-torno-automatico.jpg`. Proporción 4:3 (ej. 1600×1200). **No hay que tocar código**: el bloque de fotos debajo de la tabla de máquinas aparece solo cuando existe al menos una. |
| **Fotos de piezas** | Subir `pieza-01.jpg` … `pieza-08.jpg` (1:1, ej. 1200×1200). La sección *Trabajos* y su link en el menú aparecen solos cuando hay al menos una foto. Editar el `alt` de cada una en `index.html` describiendo la pieza. |
| **Redes sociales** | Bloque comentado en el footer. Descomentar y poner las URLs reales. |
| **Formulario** | El botón principal abre WhatsApp con el mensaje armado; el secundario abre el mail del visitante. Para recibir los mensajes directo: crear un formulario en [Formspree](https://formspree.io) y pegar la URL en `data-endpoint="…"` del `<form>`. |
| **Datos técnicos** | Tabla de máquinas y bloque "Materiales / Volúmenes / Sectores" en la sección Servicios y Capacidades. La columna "Uso típico" es una estimación: revisarla. Falta confirmar el espesor máximo de acero inoxidable y el listado completo de prensas (hoy la tabla muestra 200, 150 y 90 t y una nota "desde 15 t"). |
| **Dominio** | Cuando esté activo: agregar `canonical` y `og:url` (comentario en el `<head>`), pasar `og:image` a URL absoluta, y verificar el dominio en `robots.txt` y `sitemap.xml` (estos dos exigen URL absoluta; hoy apuntan a `metalurgicaallende.com`). |

Optimizar fotos antes de subir (ej. [Squoosh](https://squoosh.app)): JPG calidad ~80, menos de 250 KB cada una.

## Identidad visual propuesta (provisoria)

| Rol | Color |
|---|---|
| Grafito (base oscura) | `#161B20` |
| Acero (secundario) | `#2B343D` / `#5A646E` |
| Hueso (fondo claro) | `#F3F1EC` |
| Óxido (acento, sobre claro) | `#A4461A` |
| Óxido claro (acento, sobre oscuro) | `#E07B45` |

Tipografías: **Barlow Condensed** (títulos) y **Barlow** (texto), de Google Fonts.
Todas las combinaciones de texto/fondo usadas cumplen contraste WCAG AA.
