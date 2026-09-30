# Martínez Multimarca — web

Web estática de Martínez Multimarca (Verín, Ourense). HTML, CSS y JS sin dependencias ni paso de build, publicada en GitHub Pages: <https://juanito2003.github.io/multimarcamartinez/>

## Contenido
- Venta de vehículos de ocasión (garantía 1 año, IVA incluido).
- Reprogramación y preparación de competición.
- Alquiler de vehículos y camper.
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
  showroom.webp|jpg   Foto del local (hero)
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
- `html-validate` sin errores en las cuatro páginas.
- Lighthouse móvil (servidor local, mediana de 3 pasadas):

  | | Performance | Accessibility | Best Practices | SEO |
  |---|---|---|---|---|
  | Antes | 73 | 100 | 96 | 100 |
  | Después | 98 | 100 | 100 | 100 |

## Pendiente
- **Datos legales:** sustituir `[RAZÓN SOCIAL]`, `[NIF]` y `[DATOS REGISTRO MERCANTIL]` en `aviso-legal.html` y `privacidad.html` con los datos que facilite el dueño. Si es autónomo y no sociedad, quitar la línea de datos registrales.
- **Dominio propio:** ver la sección anterior. Con hosting propio, añadir las cabeceras `Content-Security-Policy` (con `frame-ancestors 'none'`) y `Strict-Transport-Security`.
- Confirmar el horario de apertura (en la web y en el JSON-LD).
- Confirmar el dato «más de 40 años» y la valoración y seguidores del hero.
- Conseguir una foto del local de más resolución: la actual mide 1200x313 y se ve algo borrosa en pantallas retina.
- Sustituir o ampliar la galería cuando haya fotos de stock actual.
- Trasladar el contenido al WordPress/Avada existente en martinezmultimarca.com una vez haya acceso al hosting, aplicando antes las correcciones de seguridad del informe de auditoría (2FA, deshabilitar XML-RPC `system.multicall`, ocultar enumeración de usuarios REST, rate-limiting).
