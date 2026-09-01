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
- `lib/get-site-content.ts`: lectura, normalizacion y fallbacks del contenido publico almacenado en Vercel Blob.
- `lib/paintings.ts`: catalogo local de respaldo y utilidades de formato para cuando Blob no esta disponible.
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

El sitio publico lee `contenido-nestor-lluvias.json` directamente de Vercel Blob mediante `lib/get-site-content.ts`. Home, detalle de obra, biografia, contacto y checkout se regeneran como maximo cada 60 segundos. Si Blob no esta configurado, no responde o un campo esta vacio, se usan los assets y textos locales de respaldo para mantener el sitio funcional.

El endpoint de lectura protegido es:

```bash
GET /api/admin/contenido?password=ADMIN_PASSWORD
```

Tambien acepta el header:

```bash
x-admin-password: ADMIN_PASSWORD
```

## Notas de Desarrollo

- Mantener la herramienta admin aislada de la navegacion publica; el sitio lee Blob directamente y nunca usa el endpoint protegido de admin.
- Las imagenes del sitio publico usan `object-cover` en tarjetas/hero y `object-contain` en vistas de detalle/lightbox para preservar la obra.
- No agregar enlaces a `/admin/contenido` en header, footer o sitemap publico.
- No guardar secretos reales en el repositorio.
