# Changelog

## 2026-07-26

- Se agrego documentacion base del proyecto: `README.md`, `AGENTS.md`, `SESSION.md` y `CHANGELOG.md`.
- Se establecio que `SESSION.md` contiene solo el estado vigente y `CHANGELOG.md` acumula historial retirado o decisiones pasadas.

## 2026-07-25

- Se agrego la ruta interna `/admin/contenido`.
- Se implemento password gate simple basado en `ADMIN_PASSWORD`.
- Se creo el formulario interno para biografia, obras repetibles, imagenes, Instagram, politicas, nombre para Stripe y frase del hero/slideshow.
- Se agregaron API routes:
  - `GET /api/admin/contenido`
  - `POST /api/admin/guardar-contenido`
- Se decidio usar unicamente Vercel Blob para imagenes y texto.
- Se decidio guardar el contenido en Blob como `contenido-nestor-lluvias.json` con `allowOverwrite: true`.
- Se agrego `@vercel/blob` como dependencia.
- Se mejoro la usabilidad del formulario admin con contador de biografia, validacion simple de Instagram, mensajes sencillos para imagenes y formateo de precio.
- Se verifico el proyecto con `npm run lint` y `npm run build`.
