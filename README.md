# Galeria Web - Nestor Lluvias

Galeria web para presentar y vender obra original de Nestor Lluvias. El sitio publico muestra una seleccion de obras, detalle individual, lightbox, paginas informativas y checkout con Stripe. Tambien incluye una herramienta interna en `/admin/contenido` para capturar contenido real del artista y subir imagenes a Vercel Blob.

## Tecnologias

- Next.js 14 con App Router.
- React 18.
- TypeScript.
- Tailwind CSS.
- Stripe Checkout para pagos.
- Vercel Blob para guardar imagenes y el JSON de contenido interno.

## Instalacion

```bash
npm install
```

Copia `.env.example` a `.env.local` y configura las variables necesarias:

```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_PASSWORD=elige-una-contrasena-larga
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

`STRIPE_SECRET_KEY` se usa en `/api/checkout`. `NEXT_PUBLIC_SITE_URL` define URLs absolutas para Stripe. `ADMIN_PASSWORD` protege la herramienta interna. `BLOB_READ_WRITE_TOKEN` habilita Vercel Blob para imagenes y contenido JSON.

## Ejecucion

```bash
npm run dev
```

Abre `http://localhost:3000`.

Comandos utiles:

```bash
npm run lint
npm run build
npm run start
```

## Estructura

- `app/`: rutas App Router, paginas y API routes.
- `app/admin/contenido/`: herramienta interna de carga de contenido.
- `app/api/admin/contenido/route.ts`: lectura protegida del JSON guardado en Blob.
- `app/api/admin/guardar-contenido/route.ts`: subida de imagenes y guardado del JSON en Blob.
- `app/api/checkout/route.ts`: crea sesiones de Stripe Checkout.
- `components/`: componentes visuales reutilizables del sitio publico.
- `lib/paintings.ts`: catalogo publico placeholder/estatico usado por galeria, detalle y checkout.
- `lib/admin-content.ts`: tipos y valores iniciales del formulario interno.
- `lib/admin-content-storage.ts`: utilidades de Vercel Blob para imagenes y JSON.
- `public/`: assets publicos servidos por Next.
- `Pinturas/`: carpeta fuente local de imagenes originales.

## Rutas Principales

- `/`: home con hero slideshow, filtro por coleccion y galeria.
- `/obra/[slug]`: detalle de obra y boton de compra.
- `/sobre-el-artista`: pagina del artista.
- `/contacto`: pagina de contacto.
- `/gracias`: confirmacion posterior al checkout.
- `/admin/contenido`: herramienta privada para capturar contenido real. No esta enlazada en la navegacion publica.

## Contenido

El sitio publico todavia consume las obras desde `lib/paintings.ts` y las imagenes desde `public/pinturas` y `public/slide`. La herramienta interna guarda un objeto JSON en Vercel Blob con el nombre `contenido-nestor-lluvias.json`, junto con URLs publicas de imagenes subidas. Ese JSON esta preparado para reemplazar el contenido placeholder en una integracion posterior.

El endpoint de lectura protegido es:

```bash
GET /api/admin/contenido?password=ADMIN_PASSWORD
```

Tambien acepta el header:

```bash
x-admin-password: ADMIN_PASSWORD
```

## Notas de Desarrollo

- Mantener la herramienta admin aislada del sitio publico hasta que se implemente explicitamente la lectura del JSON en las paginas publicas.
- Las imagenes del sitio publico usan `object-cover` en tarjetas/hero y `object-contain` en vistas de detalle/lightbox para preservar la obra.
- No agregar enlaces a `/admin/contenido` en header, footer o sitemap publico.
- No guardar secretos reales en el repositorio.
