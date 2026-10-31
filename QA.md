# Validación · 30 de octubre de 2026

## Completado

- Revisión del PDF original renderizado, cuatro hojas de fotogramas de ambos videos, configuración, manifest de recursos, instrucciones y esquema SQL. Los clips no se incrustan ni se copian en producción.
- TypeScript estricto y build de producción Vite correctos con `npm run build`.
- Tests automatizados de contador UTC/Lima, fin del evento sin negativos, validación de enlaces y protección frente a protocolos, dominios y credenciales no permitidos.
- Revisión en navegador Chromium integrado a 320, 360, 375, 390, 414, 768, 1024 y 1440 px; alturas 568, 844 y 932 px. Sin overflow horizontal ni controles principales fuera del viewport.
- Apertura táctil/click del sobre, bloqueo de scroll inicial y foco posterior al título.
- Trivia completada con resultado 3/3; selección, avance y bloqueo antes de responder comprobados.
- Recomendación de canción como texto: aparece el enlace precargado de WhatsApp, sin afirmar guardado ni reproducción.
- Enlaces RSVP y Google Maps inspeccionados: número y dirección oficiales correctos. No se enviaron mensajes reales.
- Álbum vacío: no hay QR falso y el botón está deshabilitado.
- Capturas de portada a 390 y 1440 px junto al proyecto.
- Sin errores de consola observados durante la revisión.

## Límites

La revisión responsive usa emulación de viewport, no teléfonos físicos. No se probaron Safari de iOS ni Chrome de Android reales. No se verificó un servidor Supabase porque no se entregaron credenciales. La reproducción de Spotify/YouTube depende de sus restricciones; los embeds solo se cargan con una acción del visitante. No hay álbum de fotos configurado ni preguntas oficiales. El cierre utiliza un video y una imagen generados en Google Flow; no es una fotografía de Belén.

La versión está preparada para alojamiento estático; no se ha publicado ni asociado a un dominio. No se suben los archivos de referencia ni documentos privados.

## Actualización con Google Flow

- Revisado el nuevo video WhatsApp por fotogramas.
- Descargadas y optimizadas dos imágenes y dos videos generados en Flow. Sin rostros visibles ni mariposas en los fotogramas inspeccionados.
- Verificados el sobre cerrado inicial, apertura, frase exacta al inicio y botón para volver a ver el sobre.
- Comprobado el video del cierre en reproducción real: readyState 4 y avance de currentTime. Botón de pausa operativo.
- Repetida revisión de los ocho anchos tanto en el sobre como en la invitación, sin overflow ni controles recortados.
- Nuevas capturas del sobre y del cierre a 390 px guardadas junto al proyecto.

Cierre actualizado: verificado en navegador que no existe .flow-stage antes de finalizar y existe una escena después. Frase final exacta comprobada. Build y las tres pruebas correctos.


Reemplazados todos los símbolos Unicode de flecha/play por SVG. Retirados los controles de pausa de efectos/escena. Compilación y tres pruebas correctas. La reproducción sonora automática depende del navegador y de la disponibilidad de YouTube; no se garantiza.


En la prueba del enlace musical YouTube devolvió video no disponible. Se añadió manejo onError con aviso honesto y enlace original; no se afirma reproducción. El API también contempla onAutoplayBlocked.


Actualización: logo blanco verificado sobre ciruela y cinco preguntas oficiales con cinco alternativas cada una. Sin respuestas correctas suministradas, no hay puntuación ficticia. Reproductor movido a disco compacto expandible. Retirados nombre y fecha del cierre.

