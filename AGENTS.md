# Instrucciones Para Asistentes

Antes de comenzar cualquier trabajo:

1. Leer `README.md`.
2. Leer `SESSION.md`.
3. Revisar el estado real del codigo relevante antes de asumir arquitectura o comportamiento.

Reglas permanentes:

- Mantener la arquitectura y el estilo existentes del proyecto Next.js 14, React, TypeScript y Tailwind.
- Preferir cambios pequenos, explicitos y directamente relacionados con la solicitud.
- No realizar refactors, cambios visuales o modificaciones de dependencias que no sean necesarios.
- Documentar decisiones tecnicas importantes en `SESSION.md`; mover historial antiguo a `CHANGELOG.md` cuando corresponda.
- No ejecutar `git commit`, `git push` ni operaciones destructivas de git.
- Si hay conflicto entre `README.md`, `SESSION.md`, `CHANGELOG.md` y el estado real del codigo, el codigo es la fuente de verdad. Senala la discrepancia y corrige la documentacion.
- Al finalizar cada sesion, o antes de que se corte por limite de contexto, actualizar `SESSION.md` con fecha y hora.
- Si `SESSION.md` supera aproximadamente 150 lineas, mover historial antiguo a `CHANGELOG.md` y dejar en `SESSION.md` solo el estado vigente.
- No enlazar rutas privadas como `/admin/contenido` desde la navegacion publica ni incluirlas en sitemap.
- No tocar checkout, galeria, lightbox o contenido publico salvo que la tarea lo pida explicitamente.
- No guardar secretos reales. Usar `.env.local` para entorno local y variables de entorno en Vercel.

Convenciones utiles:

- Usar `rg` para busquedas.
- Usar `npm run lint` y `npm run build` cuando el cambio toque TypeScript, rutas, componentes o dependencias.
- Usar `apply_patch` para ediciones manuales.
- Preservar el contenido placeholder publico hasta que se pida integrar el JSON de Blob en el sitio.
