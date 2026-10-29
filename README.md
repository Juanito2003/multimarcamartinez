# Martínez Multimarca — web

[![Validar HTML](https://github.com/Juanito2003/multimarcamartinez/actions/workflows/validar-html.yml/badge.svg)](https://github.com/Juanito2003/multimarcamartinez/actions/workflows/validar-html.yml)
[![Comprobar enlaces](https://github.com/Juanito2003/multimarcamartinez/actions/workflows/enlaces.yml/badge.svg)](https://github.com/Juanito2003/multimarcamartinez/actions/workflows/enlaces.yml)

Web estática de Martínez Multimarca (Verín, Ourense). HTML, CSS y JS sin dependencias ni paso de build, publicada en GitHub Pages: <https://juanito2003.github.io/multimarcamartinez/>

## Aspecto
Desde octubre de 2026 el diseño recupera el de la web antigua de martinezmultimarca.com ([copia de marzo de 2025 en archive.org](https://web.archive.org/web/20250321134944/https://martinezmultimarca.com/)): franja superior gris oscuro con el teléfono, cabecera roja con el logo, foto de la fachada a todo el ancho, franja oscura de cifras (700 m², 50 vehículos, 1.000 m², +40 años), franja roja «Echa un vistazo a nuestros vehículos de ocasión y KM0» y pie gris oscuro. Los colores salen de la web antigua (`--brand-red`, `--dark`, `--dark-2` en `styles.css`); para textos sobre fondo claro se usa `--accent`, un rojo algo más oscuro que cumple el contraste AA.

## Contenido
- Venta de vehículos seminuevos, nuevos y KM0 (garantía 1 año, IVA incluido, financiación).
- Sección de reprogramación BND Unlimited (distribuidor oficial): Stage 1, cambio automático DSG y multimapas, y el banco de potencia propio (desde noviembre de 2022). Solo texto, sin el logo de BND.
- Sección de competición: escudería Talleres Martínez Racing (rallyes y montaña), con la foto de rally de la web antigua.
- Servicios de taller con los textos de la web antigua: mantenimiento integral, chapa y pintura, pre-ITV, accesorios y enganches, electricidad y diagnosis.
- Alquiler de vehículos, furgonetas de hasta 9 plazas o de carga, y camper.
- Opiniones: enlaces a las valoraciones de Google y de coches.net (sin copiar los textos de las reseñas).
- Stock actual: enlace al escaparate del concesionario en coches.net, además de Instagram, Facebook y WhatsApp.
- Galería con entregas reales recientes (fotos tomadas de [@martinez_multimarca](https://www.instagram.com/martinez_multimarca/)).
- Contacto: Avda. de Castilla 163, Verín · 607 91 73 39 · 988 41 04 18 · simon@martinezmultimarca.com.

## Estructura
```
index.html            Página principal
aviso-legal.html      Aviso legal (LSSI-CE)
privacidad.html       Política de privacidad (RGPD); la web no usa cookies ni analítica
404.html              Página de error de GitHub Pages
styles.css            Estilos compartidos por todas las páginas
main.js               Menú móvil, botones «Copiar» y año del footer
fonts/                Oswald, Work Sans y JetBrains Mono (woff2, subconjunto latin) + licencias OFL
images/
  logo.webp|png       Logo a 2x (256x72)
  fachada*.webp|jpg   Fachada del local (hero), 1920x500 con variantes de 800 y 1200 px. Matrículas difuminadas
  rally.webp|jpg      Coche de la escudería (sección de competición)
  0N-*.jpg            Fotos de la galería (640px) + variantes -400.webp y -640.webp
  og-image.jpg        Imagen para compartir en redes (1200x630)
  icon-*.png          Iconos del manifest (192, 512, maskable)
favicon.ico|svg, apple-touch-icon.png, site.webmanifest
robots.txt, sitemap.xml
```

## Ver en local
Las rutas son relativas, así que basta con abrir `index.html` en el navegador. Para probarla como en producción, con la CSP y las fuentes, levanta un servidor:
```
python3 -m http.server 8000   # y abre http://localhost:8000/
```

## Añadir o cambiar fotos de la galería
1. Guarda la foto en `images/` como JPG cuadrado de 640 px (`07-marca-modelo.jpg`).
2. Genera las variantes WebP de 400 y 640 px (`07-marca-modelo-400.webp`, `07-marca-modelo-640.webp`), por ejemplo con `cwebp -q 78 -resize 400 0 …`.
3. Copia un bloque `<article class="car-card">` de `index.html` y cambia las rutas, el `alt` (describe lo que se ve en la foto), el título y el texto.

## Seguridad
- Cada página lleva una Content-Security-Policy en `<meta>` que solo permite recursos del propio sitio. No añadas scripts ni estilos en línea, ni atributos `style=` u `onclick=`, porque el navegador los bloqueará. Tampoco recursos externos (fuentes, analítica, mapas incrustados) sin actualizar la CSP y la política de privacidad.
- GitHub Pages no permite cabeceras HTTP propias. Por eso `frame-ancestors` (protección contra clickjacking) y HSTS quedan pendientes hasta tener un hosting que permita configurarlas.

## Pasar a dominio propio
La URL de GitHub Pages aparece en estos sitios; al cambiar de dominio, sustitúyela en todos:
- `index.html`: `canonical`, `og:url`, `og:image`, `twitter:image` y el JSON-LD (`@id`, `url`, `logo`, `image`).
- `aviso-legal.html` y `privacidad.html`: `canonical`.
- `sitemap.xml` y `robots.txt`.
- `404.html`: `<base href="/multimarcamartinez/">` → `<base href="/">`.

Nota: en un sitio de proyecto de GitHub Pages los buscadores solo leen el `robots.txt` de la raíz del dominio (`juanito2003.github.io/robots.txt`), así que el de este repo no tendrá efecto hasta tener dominio propio. Mientras tanto, el sitemap puede enviarse a mano en Google Search Console.

## Verificación (30/09/2026)
- `html-validate` sin errores en las cuatro páginas. Desde octubre de 2026 se comprueba automáticamente en cada push y pull request con GitHub Actions (`.github/workflows/validar-html.yml`, reglas en `.htmlvalidate.json`).
- Enlaces internos y externos comprobados con [lychee](https://github.com/lycheeverse/lychee) en cada push, en cada pull request y todos los lunes (`.github/workflows/enlaces.yml`). Instagram y Facebook se excluyen en `.lycheeignore` porque bloquean las peticiones automáticas.
- Lighthouse móvil (servidor local, mediana de 3 pasadas):

  | | Performance | Accessibility | Best Practices | SEO |
  |---|---|---|---|---|
  | Antes | 73 | 100 | 96 | 100 |
  | Después | 98 | 100 | 100 | 100 |

## Pendiente
- **Datos legales:** sustituir `[RAZÓN SOCIAL]`, `[NIF]` y `[DATOS REGISTRO MERCANTIL]` en `aviso-legal.html` y `privacidad.html` con los datos que facilite el dueño. Si es autónomo y no sociedad, quitar la línea de datos registrales.
- **Dominio propio:** ver la sección anterior. Con hosting propio, añadir las cabeceras `Content-Security-Policy` (con `frame-ancestors 'none'`) y `Strict-Transport-Security`.
- **Razón social:** la ficha de ATAVE la recoge como «Martínez Multimarca, S.L.». Confirmarlo con el dueño junto con el NIF y los datos registrales.
- **Permiso para las fotos de la galería:** varias muestran a clientes (en la de la Berlingo se reconoce la cara). Confirmar que hay consentimiento o cambiarlas.
- **Fotos nuevas:** la de la fachada (hero) y la de rally son de la web antigua (2013). Pedir una foto actual de la fachada (el rótulo ha cambiado) y una del banco de potencia, que la web antigua tenía pero archive.org no guardó.
- **Confirmar datos:** horario (en la web y en el JSON-LD), las cifras de la franja oscura (700 m², 50 vehículos y 1.000 m² salen de la web antigua) y la valoración 4,5/5 con más de 100 opiniones (dato de Páxinas Galegas, que enlaza a las reseñas de Google). La de coches.net es 4,8/5 con 5 valoraciones (octubre de 2026).
- **Escudería:** confirmar que sigue activa y si quieren nombrar pilotos o pruebas.
- Sustituir o ampliar la galería cuando haya fotos de stock actual.
- Trasladar el contenido a la web actual de martinezmultimarca.com una vez haya acceso al hosting, aplicando antes las correcciones de seguridad acordadas con el cliente.
