export type BotCategoria = {
  slug: string;
  nombre: string;
  descripcion: string;
  emoji: string;
};

export const BOT_CATEGORIAS: BotCategoria[] = [
  { slug: "moderacion", nombre: "Moderación", emoji: "🛡️", descripcion: "Bots para gestionar grupos, expulsar spammers, filtrar palabras y aplicar reglas automáticas." },
  { slug: "antispam", nombre: "Antispam", emoji: "🚫", descripcion: "Bots que verifican con CAPTCHA a los nuevos miembros y bloquean cuentas sospechosas." },
  { slug: "estadisticas", nombre: "Estadísticas", emoji: "📊", descripcion: "Bots para medir actividad, miembros activos, rankings y crecimiento de tu grupo o canal." },
  { slug: "utilidades", nombre: "Utilidades", emoji: "🧰", descripcion: "Bots multiuso: descargar videos, convertir archivos, acortar URLs y más." },
  { slug: "productividad", nombre: "Productividad", emoji: "⚡", descripcion: "Bots para automatizar tareas, recordatorios, listas y flujos de trabajo." },
  { slug: "ia-y-chatgpt", nombre: "IA y ChatGPT", emoji: "🤖", descripcion: "Bots que integran modelos de IA (GPT, Claude, Gemini) directamente en Telegram." },
  { slug: "descargas", nombre: "Descargas", emoji: "⬇️", descripcion: "Bots para descargar contenido legal de YouTube, Spotify, Instagram, TikTok y otras plataformas." },
  { slug: "juegos", nombre: "Juegos y trivia", emoji: "🎮", descripcion: "Bots de trivias, quizzes, juegos de mesa y minijuegos multijugador para grupos." },
  { slug: "musica", nombre: "Música", emoji: "🎵", descripcion: "Bots para buscar canciones, letras y compartir música dentro de grupos." },
  { slug: "traduccion", nombre: "Traducción", emoji: "🌐", descripcion: "Bots que traducen mensajes al instante en más de 100 idiomas." },
  { slug: "notificaciones", nombre: "Notificaciones", emoji: "🔔", descripcion: "Bots que avisan sobre precios, ofertas, RSS, mercados financieros y más." },
  { slug: "creacion-de-bots", nombre: "Creación de bots", emoji: "🛠️", descripcion: "Bots oficiales para crear, configurar y gestionar tus propios bots de Telegram." },
];
