/**
 * Scraper vía t.me/s/USERNAME
 *
 * Combot.org y tgstat.com bloquean scrapers con Cloudflare, pero las vistas
 * previas públicas de Telegram (t.me/s/xxx) siempre están accesibles.
 *
 * Este script toma una lista SEMILLA de usernames conocidos del ecosistema
 * hispano y verifica cada uno, extrayendo:
 *   - título real (og:title)
 *   - descripción real (og:description)
 *   - miembros/suscriptores (parseado del HTML)
 *   - imagen
 *
 * Filtra automáticamente NSFW/pirata y clasifica por categoría/país.
 * Salida: data/grupos-scraped.json
 *
 * Añade más usernames en SEED_USERNAMES abajo cuando descubras nuevos.
 * Uso: npm run scrape
 */
import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";

// ============ LISTA SEMILLA ============
// Añade aquí los usernames de canales/grupos conocidos (sin @, solo la parte
// después de t.me/). El scraper verificará cada uno y descargará su metadata.
// Puedes añadir tantos como quieras — 100, 500, 1000. El script hace pausa
// de 300ms entre requests para no saturar.

const SEED_USERNAMES = [
  // Ofertas y chollos
  "chollometro", "chollometro_ofertas", "ofertaschollos", "amazon_ofertas_es",
  "aliexpresschollos", "chollosaliexpress", "promodescuentos", "ofertasmexico",
  "errorprecio", "cuponesmx", "chollocero", "ofertasargentina",

  // Criptomonedas
  "bitcoinespanol", "cryptolatam", "criptomonedas_es", "bitcoin_argentina",
  "defiespanol", "ethereum_es", "cryptomexico", "bitcoinvenezuela",
  "airdropslatam", "criptonoticias", "bitso_oficial",

  // Empleo y freelance
  "empleosremotos", "remotejobsespanol", "empleositlatam", "trabajoremoto",
  "jsjobses", "pythonjobs_latam", "diseñoempleos", "empleosmxremoto",
  "trabajoargentina", "empleospana", "freelanceenespanol",

  // Programación
  "javascripthispano", "reactenespanol", "pythonlatam", "devsenespanol",
  "programadorescolombia", "programacionmx", "webdevlatam", "aispanish",
  "cyberespanol", "devopsespanol",

  // Gaming
  "freefirees", "fortnite_es", "valorantlatam", "cs2espanol", "loldelas",
  "fifaespanol", "gamers_latam", "pcgamers_es", "nintendoswitchmx",
  "steamdeck_es", "gamingretro",

  // Anime y manga
  "animeespanol", "otakulatam", "shonenespanol", "seinen_es", "isekai_es",
  "manhwaespanol", "cosplayes", "recomendacionesanime",

  // Idiomas
  "ingles_espanol", "japones_es", "aprendealeman",

  // Marketing digital
  "seoenespanol", "marketingdigital_es", "growthlatam",

  // Fitness y salud
  "fitnesscol", "gymnamotivacion",

  // Viajes
  "viajerosmochileros", "digitalnomad_es",

  // Emprendimiento
  "emprendedoreslatam", "startups_es",

  // Diseño
  "uxuidesignes", "disenadoreshispanos",

  // Libros
  "librosgratislegal", "clublectores_es",

  // Series y películas
  "seriesreco", "cinefiloshispanos",

  // Estudios
  "universitarioslatam", "estudiantesmedicina_es",
];

// ============ FILTROS ============
const BLOCKLIST_KEYWORDS = [
  "porn", "xxx", "nsfw", "only", "casero", "leaks", "pack ", "packs ",
  "sex ", "sexo", "apuesta", "casino", "prohibido", "sin reglas",
  "sin límites", "sin limites", "adulto", "18+", "hentai", "loli",
  "warez", "crack", "iptv gratis", "cuentas gratis netflix",
];

const CATEGORY_MAP: Record<string, string[]> = {
  "ofertas-y-chollos": ["oferta", "chollo", "descuento", "cupon", "amazon", "aliexpress", "mercadolibre", "black friday", "hot sale", "cyber"],
  "criptomonedas": ["cripto", "crypto", "bitcoin", "btc", "eth", "ethereum", "blockchain", "defi", "nft", "trading crypto", "airdrop", "usdt"],
  "empleo-y-freelance": ["empleo", "trabajo", "freelance", "vacante", "job", "remote", "remoto", "reclutamiento", "vacancy"],
  "estudios-y-universidad": ["universidad", "unam", "unal", "examenes", "apuntes", "resumen", "carrera", "estudiante", "medicina"],
  "idiomas": ["ingles", "english", "frances", "aleman", "japones", "idioma", "practica idioma"],
  "programacion": ["programacion", "programador", "javascript", "python", "react", "node", "developer", "dev ", "coding", "backend", "frontend", "web dev", "software"],
  "marketing-digital": ["marketing", "seo", "ads", "growth", "social media", "publicidad"],
  "gaming": ["gaming", "free fire", "fortnite", "valorant", "lol", "cs2", "cs:go", "warzone", "fifa", "juego", "gamers", "steam"],
  "anime-y-manga": ["anime", "manga", "otaku", "cosplay", "isekai", "shonen", "seinen", "manhwa"],
  "series-y-peliculas": ["series", "netflix", "hbo", "peliculas", "estrenos", "cine", "cinefilo"],
  "musica": ["musica", "reggaeton", "trap", "electronica", "productor musical"],
  "deportes": ["futbol", "nba", "mma", "f1", "formula 1", "deporte"],
  "memes-y-humor": ["meme", "humor", "chistes"],
  "libros-y-lectura": ["libro", "lectura", "ebook", "novela", "escritor", "lectores"],
  "fitness-y-salud": ["fitness", "gym", "rutina", "dieta", "salud"],
  "viajes": ["viaje", "mochilero", "nomada", "vuelos", "hostal", "digital nomad"],
  "emprendimiento": ["emprender", "startup", "negocio", "founder", "emprendedor"],
  "diseno-y-arte": ["diseño", "diseno", "ilustracion", "ui ", "ux ", "figma", "photoshop", "disenador"],
};

const COUNTRY_MAP: Record<string, string[]> = {
  mexico: ["mexico", "méxico", " mx ", " cdmx", "monterrey", "guadalajara", "puebla", "queretaro", "banxico"],
  argentina: ["argentina", " arg ", "buenos aires", "cordoba", "rosario", "mendoza", "monotributista"],
  colombia: ["colombia", "bogota", "medellin", "cali", "barranquilla"],
  peru: ["peru", "perú", "lima", "arequipa"],
  chile: ["chile", "santiago", "valparaiso"],
  espana: ["españa", "spain", " espana", "madrid", "barcelona", "valencia", "sevilla"],
  venezuela: ["venezuela", "caracas", "maracaibo"],
  ecuador: ["ecuador", "quito", "guayaquil"],
};

// ============ TIPOS ============
type Scraped = {
  slug: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  pais: string;
  link: string;
  miembros: number;
  verificado: boolean;
  fechaAgregado: string;
  _fuente: string;
  _requiereRevision: true;
};

// ============ HELPERS ============
function toSlug(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}

function isSafe(name: string, desc: string): boolean {
  const t = ` ${name} ${desc} `.toLowerCase();
  return !BLOCKLIST_KEYWORDS.some((k) => t.includes(k));
}

function classifyCategoria(name: string, desc: string, username: string): string {
  const t = `${name} ${desc} ${username}`.toLowerCase();
  for (const [cat, keys] of Object.entries(CATEGORY_MAP)) {
    if (keys.some((k) => t.includes(k))) return cat;
  }
  return "por-clasificar";
}

function classifyPais(name: string, desc: string): string {
  const t = ` ${name} ${desc} `.toLowerCase();
  for (const [pais, keys] of Object.entries(COUNTRY_MAP)) {
    if (keys.some((k) => t.includes(k))) return pais;
  }
  return "";
}

// ============ CORE ============
async function fetchPreview(username: string): Promise<Scraped | null> {
  try {
    const url = `https://t.me/s/${username}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
      },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const $ = cheerio.load(html);

    const nombre = ($('meta[property="og:title"]').attr("content") || "").trim();
    let desc = ($('meta[property="og:description"]').attr("content") || "").trim();
    if (desc.length > 220) desc = desc.slice(0, 217) + "...";

    // Miembros: parsear el div .tgme_page_extra o similar
    let miembros = 0;
    const extraText = $(".tgme_page_extra").text() + " " + $(".tgme_channel_info_counter").text();
    const memMatch = extraText.match(/([\d\s,.]+)\s*(members|subscribers|miembros|suscriptores)/i);
    if (memMatch) {
      miembros = parseInt(memMatch[1].replace(/\D/g, "")) || 0;
    }

    if (!nombre || nombre.toLowerCase().includes("telegram: contact") || nombre === "Telegram") {
      return null; // username no existe o no tiene preview público
    }
    if (!isSafe(nombre, desc)) return null;

    return {
      slug: toSlug(nombre),
      nombre,
      descripcion: desc,
      categoria: classifyCategoria(nombre, desc, username),
      pais: classifyPais(nombre, desc),
      link: `https://t.me/${username}`,
      miembros,
      verificado: false,
      fechaAgregado: new Date().toISOString().slice(0, 10),
      _fuente: "t.me/s/",
      _requiereRevision: true,
    };
  } catch (e) {
    return null;
  }
}

async function main() {
  console.log(`→ Verificando ${SEED_USERNAMES.length} usernames vía t.me/s/...`);
  const results: Scraped[] = [];
  const notFound: string[] = [];

  let done = 0;
  for (const username of SEED_USERNAMES) {
    const g = await fetchPreview(username);
    if (g) results.push(g);
    else notFound.push(username);
    done++;
    if (done % 10 === 0) console.log(`  ${done}/${SEED_USERNAMES.length}...`);
    await new Promise((r) => setTimeout(r, 300));
  }

  const outPath = path.join(process.cwd(), "data", "grupos-scraped.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));

  const stats = {
    verificados: results.length,
    noEncontrados: notFound.length,
    porCategoria: results.reduce((acc, g) => { acc[g.categoria] = (acc[g.categoria] || 0) + 1; return acc; }, {} as Record<string, number>),
    porPais: results.reduce((acc, g) => { const p = g.pais || "sin-pais"; acc[p] = (acc[p] || 0) + 1; return acc; }, {} as Record<string, number>),
  };

  console.log(`\n✅ Guardado en ${outPath}`);
  console.log(JSON.stringify(stats, null, 2));
  if (notFound.length > 0) {
    console.log(`\n⚠️  No se pudieron verificar (${notFound.length}): ${notFound.slice(0, 10).join(", ")}${notFound.length > 10 ? "..." : ""}`);
    console.log("   (los usernames pueden estar libres o el grupo es privado)");
  }
  console.log("\n👉 Siguiente paso:");
  console.log("   1. Abre data/grupos-scraped.json en tu editor.");
  console.log("   2. Ajusta 'categoria' donde diga 'por-clasificar'.");
  console.log("   3. Marca 'verificado: true' en los que apruebes.");
  console.log("   4. Copia los aprobados al array de data/grupos.json.");
  console.log("   5. npm run build && git push (Vercel redespliega).");
}

main().catch(console.error);
