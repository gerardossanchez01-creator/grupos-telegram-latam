export type Categoria = {
  slug: string;
  nombre: string;
  descripcion: string;
  emoji: string;
};

// Solo nichos seguros para AdSense (nada de adulto/pirata/apuestas).
export const CATEGORIAS: Categoria[] = [
  { slug: "ofertas-y-chollos", nombre: "Ofertas y Chollos", emoji: "🛒", descripcion: "Grupos de Telegram con ofertas de Amazon, MercadoLibre, cupones y descuentos en tiempo real." },
  { slug: "criptomonedas", nombre: "Criptomonedas", emoji: "🪙", descripcion: "Comunidades sobre Bitcoin, Ethereum, análisis técnico, noticias cripto y trading educativo." },
  { slug: "empleo-y-freelance", nombre: "Empleo y Freelance", emoji: "💼", descripcion: "Ofertas de trabajo remoto, empleos en LatAm y oportunidades para freelancers." },
  { slug: "estudios-y-universidad", nombre: "Estudios y Universidad", emoji: "🎓", descripcion: "Grupos de apuntes, exámenes, resúmenes y ayuda entre estudiantes universitarios." },
  { slug: "idiomas", nombre: "Idiomas", emoji: "🌍", descripcion: "Practica inglés, francés, alemán o japonés con hablantes nativos y estudiantes." },
  { slug: "programacion", nombre: "Programación", emoji: "💻", descripcion: "Comunidades de desarrolladores: JavaScript, Python, IA, DevOps y ayuda entre programadores." },
  { slug: "marketing-digital", nombre: "Marketing Digital", emoji: "📈", descripcion: "SEO, ads, growth, social media y networking para marketers." },
  { slug: "gaming", nombre: "Gaming", emoji: "🎮", descripcion: "Grupos por juego: Free Fire, Fortnite, Valorant, LoL, retro y competitivo." },
  { slug: "anime-y-manga", nombre: "Anime y Manga", emoji: "🌸", descripcion: "Comunidades de anime, recomendaciones, manga y cultura otaku." },
  { slug: "series-y-peliculas", nombre: "Series y Películas", emoji: "🎬", descripcion: "Discusión de series, estrenos, recomendaciones y análisis (solo debate, no piratería)." },
  { slug: "musica", nombre: "Música", emoji: "🎧", descripcion: "Grupos por género musical, productores, DJs y descubrimiento de artistas independientes." },
  { slug: "deportes", nombre: "Deportes", emoji: "⚽", descripcion: "Fútbol, NBA, MMA, fórmula 1 y comunidades de aficionados por equipo." },
  { slug: "memes-y-humor", nombre: "Memes y Humor", emoji: "😂", descripcion: "Grupos para compartir memes, humor y contenido viral en español." },
  { slug: "libros-y-lectura", nombre: "Libros y Lectura", emoji: "📚", descripcion: "Clubs de lectura, recomendaciones literarias y ebooks compartidos legalmente." },
  { slug: "fitness-y-salud", nombre: "Fitness y Salud", emoji: "💪", descripcion: "Rutinas, dietas, motivación y comunidades fit." },
  { slug: "viajes", nombre: "Viajes", emoji: "✈️", descripcion: "Grupos de viajeros por país, mochileros, digital nomads y tips de vuelos baratos." },
  { slug: "emprendimiento", nombre: "Emprendimiento", emoji: "🚀", descripcion: "Founders, networking, ideas de negocio y comunidades de startups en LatAm." },
  { slug: "diseno-y-arte", nombre: "Diseño y Arte", emoji: "🎨", descripcion: "Diseñadores gráficos, ilustradores, motion, UI/UX y críticas constructivas." },
];

export const PAISES = [
  { slug: "mexico", nombre: "México" },
  { slug: "argentina", nombre: "Argentina" },
  { slug: "colombia", nombre: "Colombia" },
  { slug: "peru", nombre: "Perú" },
  { slug: "chile", nombre: "Chile" },
  { slug: "espana", nombre: "España" },
  { slug: "venezuela", nombre: "Venezuela" },
  { slug: "ecuador", nombre: "Ecuador" },
];
