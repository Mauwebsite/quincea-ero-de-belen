/**
 * BASE DE CONFIGURACIÓN PARA LA INVITACIÓN DE BELÉN.
 * Codex: copiar/adaptar a src/data/eventConfig.ts e importarla en los componentes.
 * No inventar valores faltantes. Las preguntas de ejemplo están señaladas como demo.
 */
export type TriviaQuestion = {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
};

export const eventConfig = {
  // Pegar aquí el enlace de INVITACIÓN A COLABORAR de Spotify de la quinceañera.
  // Un enlace de reproducción normal no habilita agregar canciones. Renovar si caduca.
  spotifyCollaborativeUrl: '',
  backgroundYouTubeId: 'ltjio4AM2uw',
  closingMessage: 'Hay momentos que son mágicos y compartirlos con las personas que quiero los hace perfectos',
  visuals: {
    envelopePoster: 'assets/sobre-flow.webp',
    envelopeVideo: 'assets/apertura-flow.mp4',
    finalePoster: 'assets/cierre-flow.webp',
    finaleVideo: 'assets/cierre-flow.mp4',
  },
  name: "Belén",
  title: "XV años de Belén",
  dateISO: "2026-11-28T19:00:00-05:00",
  timeZone: "America/Lima",
  dateDisplay: "Sábado 28 de noviembre de 2026",
  timeDisplay: "7:00 p. m.",
  venueName: "Salón de Fiestas",
  venueAddress: "Jirón El Incario 114, Santiago de Surco, Lima, Perú",
  whatsappNumber: "51999118684",
  whatsappDisplay: "999 118 684",
  whatsappRSVPMessage:
    "Hola, confirmo mi asistencia a los XV años de Belén. Mi nombre es: ",
  dressCode: {
    warning: "No ir con lila, plateado y azul\nEl lila y el azul estarán reservados exclusivamente para la quinceañera.\n\nAgradeceremos evitar el uso de estos colores en su vestimenta.",
    womenLabel: "MUJERES",
    menLabel: "HOMBRES",
  },
  openingMessage:
    "Te invito a ser parte de una noche que para mí será especial e inolvidable, y que guardaré para siempre",
  photoShareMessage:
    "Escanea este código QR y sube las fotografías y videos que captures durante la celebración para que todos podamos guardar estos lindos recuerdos.",
  photoAlbumUrl: "", // PENDIENTE: enlace real del álbum colaborativo (no un QR inventado)
  backgroundAudioUrl: "assets/lets-groove.mp3", // Suena al pulsar «Abrir invitación» (nunca antes de un clic). Vacío = sin música.
  musicSuggestions: {
    useSupabaseWhenConfigured: true,
    fallbackToWhatsApp: true,
    acceptSongAndArtist: true,
    acceptSpotifyOrYouTubeUrl: true,
  },
  trivia: {
    modoDemo: false,
    questions: [
      {
            "id": "comida",
            "question": "¿Cuál es mi comida favorita?",
            "options": [
                  {
                        "id": "a",
                        "text": "Pollo a la brasa"
                  },
                  {
                        "id": "b",
                        "text": "Ceviche"
                  },
                  {
                        "id": "c",
                        "text": "Lomo saltado"
                  },
                  {
                        "id": "d",
                        "text": "Fetuccini al peso"
                  },
                  {
                        "id": "e",
                        "text": "Aji de gallina"
                  }
            ],
            "correctOptionId": "c"
      },
      {
            "id": "color",
            "question": "¿Cuál es mi color favorito?",
            "options": [
                  {
                        "id": "a",
                        "text": "Blanco"
                  },
                  {
                        "id": "b",
                        "text": "Marrón"
                  },
                  {
                        "id": "c",
                        "text": "Lila"
                  },
                  {
                        "id": "d",
                        "text": "Celeste"
                  },
                  {
                        "id": "e",
                        "text": "Verde"
                  }
            ],
            "correctOptionId": "b"
      },
      {
            "id": "pais",
            "question": "¿País al que quiero viajar?",
            "options": [
                  {
                        "id": "a",
                        "text": "Tailandia"
                  },
                  {
                        "id": "b",
                        "text": "Francia"
                  },
                  {
                        "id": "c",
                        "text": "Japón"
                  },
                  {
                        "id": "d",
                        "text": "Italia"
                  },
                  {
                        "id": "e",
                        "text": "Brasil"
                  }
            ],
            "correctOptionId": "a"
      },
      {
            "id": "artista",
            "question": "¿Cuál es mi artista favorito?",
            "options": [
                  {
                        "id": "a",
                        "text": "Michael Jackson"
                  },
                  {
                        "id": "b",
                        "text": "Justin Bieber"
                  },
                  {
                        "id": "c",
                        "text": "Trueno"
                  },
                  {
                        "id": "d",
                        "text": "Daddy Yankee"
                  },
                  {
                        "id": "e",
                        "text": "Shakira"
                  }
            ],
            "correctOptionId": "a"
      },
      {
            "id": "hobby",
            "question": "¿Cuál es mi hobby favorito?",
            "options": [
                  {
                        "id": "a",
                        "text": "Nadar"
                  },
                  {
                        "id": "b",
                        "text": "Viajar"
                  },
                  {
                        "id": "c",
                        "text": "Bailar"
                  },
                  {
                        "id": "d",
                        "text": "Cantar"
                  },
                  {
                        "id": "e",
                        "text": "Ver películas y series"
                  }
            ],
            "correctOptionId": "e"
      }
] satisfies TriviaQuestion[],
  },
} as const;

// Enlaces auxiliares seguros para implementar en la app:
export const googleMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(eventConfig.venueAddress);
export const whatsappRSVPUrl =
  `https://wa.me/${eventConfig.whatsappNumber}?text=` +
  encodeURIComponent(eventConfig.whatsappRSVPMessage);

