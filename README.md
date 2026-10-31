# Belén · XV años

Invitación React + TypeScript + Vite. Recursos oficiales WebP, sobre cinematográfico generado en Google Flow, contador en hora de Lima, WhatsApp, canciones con reproductor oficial opcional, trivia y cierre de video generado en Google Flow, sin rostros ni mariposas.

## Ejecutar

Requiere Node.js 22.18+ o 24 LTS y npm.

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

`dist/` es la web lista para publicar. No necesita servidor de aplicaciones. En Netlify usar `npm run build` y directorio `dist`; en Vercel importar como Vite. También se puede subir el contenido de `dist` a un alojamiento estático HTTPS. Está preparada para la raíz del dominio.

## Editar contenido

La información del evento, fecha, teléfono, restricciones, mensajes, enlaces y preguntas está en `src/data/eventConfig.ts`. Después de editar, ejecutar build y publicar el nuevo `dist`. Los textos generales de interfaz están en los componentes de `src/components` y `src/main.tsx`; colores, tipografía, tamaños y movimiento en `src/styles.css`. El logo oficial se conserva intacto en `public/assets`.

La fecha ISO incluye `-05:00`. El contador nunca muestra negativos. Si cambia el evento, actualizar también el archivo opcional de calendario `public/belen-xv.ics` y los metadatos de `index.html`.

## Preguntas oficiales

En `trivia.questions`, reemplazar los ejemplos por objetos con `id`, `question`, `options: [{id, text}]` y `correctOptionId`. Cambiar `modoDemo` a `false` solo cuando sean las preguntas oficiales. Usar `questions: []` para mostrar «Próximamente». Las respuestas quedan solo en memoria y se borran al recargar.

## Fotos

Definir `photoAlbumUrl` con la URL HTTPS verdadera del álbum colaborativo. Se generará un QR local con ese destino y un botón al mismo enlace. Mientras esté vacío, el botón permanece deshabilitado y no se muestra ningún QR falso. El acceso y los permisos de subida se administran en el servicio del álbum.

## Canciones y audio

El formulario admite texto o enlace HTTPS de YouTube/Spotify. El reproductor se carga únicamente al pulsar «Abrir reproductor oficial»; sus controles de play y pausa pertenecen a la plataforma. Puede haber restricciones regionales o del titular. No descarga audio. Un título de texto no activa un reproductor.

Sin backend, preparar la recomendación muestra un enlace a WhatsApp; el invitado debe abrirlo y enviar el mensaje. No se afirma guardado ni envío automático.

Para guardar en Supabase: crear un proyecto propio, ejecutar `backend/supabase_schema.sql`, copiar `.env.example` como `.env.local`, completar URL y clave pública `anon`, y reconstruir. Nunca usar `service_role`. La tabla no permite lectura pública. Antes de habilitar la integración revisar límites de uso y protección contra spam. El éxito se muestra solo después de una respuesta correcta del servidor. La integración no pudo probarse con un servidor real porque no se suministraron credenciales.

Para audio ambiental autorizado, agregar un archivo a `public/assets` y definir `backgroundAudioUrl`; aparecerá un botón para activarlo. No hay reproducción automática.

## Accesibilidad y privacidad

Controles táctiles de al menos 44 px, foco visible, apertura con teclado, foco al título tras abrir, inputs de 16 px, reduced motion, sin lectura del contador cada segundo. Sin analítica ni almacenamiento de visitantes. Google Fonts carga las tipografías con fallback local; Spotify/YouTube se consultan solo cuando se abre su reproductor. No se publican PDF, videos de referencia ni documentos internos.

## Pendiente del cliente

- Preguntas oficiales.
- URL del álbum colaborativo.
- Credenciales públicas Supabase, solo si se quiere almacenamiento común.
- Audio autorizado, solo si se desea música ambiental.

Consultar `QA.md` para las comprobaciones realizadas y sus límites.

## Recursos de Google Flow

Proyecto: https://flow.google.com/project/28d090c4-d8e1-47e3-ae34-e0045ac88e04

Se generaron dos imágenes y dos videos propios: sobre con apertura y cierre con figura anónima de espaldas bajo luz y estrellas. Los archivos están incluidos localmente en `public/assets`; la invitación publicada no necesita iniciar sesión en Google ni conectarse a Flow. `src/data/eventConfig.ts` contiene `visuals` para reemplazarlos. Hay MP4, WebM y posters WebP; se elige el formato compatible. Sin movimiento preferido se muestra imagen estática. La apertura solo reproduce tras pulsar y tiene alternativa si el video falla. El cierre se carga cerca de la sección y se pausa fuera de pantalla.

El enlace de Google Fotos de la clienta va en `photoAlbumUrl`. El álbum debe permitir colaboración para que los visitantes puedan aportar fotos. Hasta añadirlo no se muestra un QR ficticio.

## Movimiento y Tailwind
Tailwind CSS 4 se compila con @tailwindcss/vite. Las utilidades se usan en Confetti.tsx y los estilos de arte/motion están en styles.css. El botón Activar animaciones permite elegir movimiento aun cuando el sistema lo reduce por defecto. Incluye sobre animado, ambiente disco y confeti sobrio sobre el video final. React/TypeScript genera JavaScript de producción con npm run build.


## Cierre tras participar
InvitationClosing.tsx muestra Finalizar y ver cierre después de las secciones. La escena solo se monta después de pulsarlo, enfoca el cierre y desplaza la vista a la frase configurable closingMessage. Finalizar no afirma que se enviaron mensajes de WhatsApp. Se puede volver al inicio para editar o participar de nuevo.


## Actualización de controles, música y cierre
Los controles usan Icon.tsx con SVG locales, sin emojis del sistema. Los efectos quedan activos sin botones de pausa. El cierre se presenta a 76svh, sin control de pausa de escena. Soundtrack.tsx incorpora el enlace musical solicitado mediante YouTube con intento autoplay tras abrir; algunos navegadores o titulares pueden bloquearlo y se conserva el reproductor oficial para pulsar reproducir. No se descargó ni se redistribuye audio de YouTube. El identificador se edita en backgroundYouTubeId.


## Cambios de identidad y trivias oficiales
Logo blanco suministrado por el cliente en public/assets/logo-belen-blanco.webp. Iconos de vestimenta, trivia y playlist blancos mediante CSS conservando transparencias. Cinco preguntas oficiales en eventConfig.ts; correctOptionId vacío hasta recibir clave. Sin clave se agradece la participación sin mostrar puntuación. Música en un disco de esquina que abre el reproductor oficial visible; al cerrarlo se desmonta y se detiene. No se oculta un reproductor de YouTube en segundo plano. Se retiraron nombre y fecha bajo el video final.


## Clave confirmada de trivias
1. Lomo saltado; 2. Marrón; 3. Tailandia; 4. Michael Jackson; 5. Ver películas y series. Se activa resultado X/5. El cliente escribió Michel Jason para la cuarta, interpretado como la alternativa Michael Jackson existente.


## Logo final y miniatura social
Logo final suministrado por el cliente: public/assets/logo-belen-final.webp. Miniatura social: public/assets/social-belen-final-v1.jpg (1200x1200, logo blanco intacto sobre ciruela). Metadatos Open Graph y Twitter en index.html con URL absoluta. WhatsApp puede conservar miniaturas antiguas en mensajes ya enviados. El número visible fue retirado, el enlace RSVP continúa operativo. El formulario de canciones actual no agrega pistas a Spotify; sin Supabase configurado mantiene envío por WhatsApp.


## Pegar la playlist colaborativa de la clienta
En src/data/eventConfig.ts, pegar el enlace de invitación en spotifyCollaborativeUrl entre las comillas. Debe generarlo ella desde Spotify: menú de la playlist > Invitar a colaboradores > Copiar enlace. No basta el enlace para escuchar. Spotify indica que la invitación caduca a los siete días: pegar uno vigente cerca del evento y renovar si es necesario. Ejecutar npm run build y publicar. Con un enlace oficial configurado, Playlist muestra Agregar canción en Spotify y reemplaza el formulario; mientras esté vacío mantiene las recomendaciones por WhatsApp. La web no crea playlists ni conecta cuentas automáticamente y no necesita contraseñas ni claves de Spotify. Los invitados agregan las canciones en Spotify tras aceptar la colaboración.


## Música persistente y ambiente al desplazarse
Al minimizar el panel musical no se desmonta OfficialPlayer: el mismo iframe permanece cargado. Minimizar no envía pausa ni destruye el reproductor. Su reproducción sigue dependiendo de YouTube y del navegador. ScrollAmbience.tsx mantiene 18 partículas en una capa fija; el scroll actualiza solo una variable CSS con requestAnimationFrame y listener pasivo. El logo de portada se redujo. Retiradas las dos frases de WhatsApp solicitadas.

