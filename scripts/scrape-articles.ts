/**
 * Scraper de artículos listicle sobre grupos de Telegram.
 *
 * Descarga cada URL de la lista SOURCE_ARTICLES, extrae todos los enlaces
 * t.me/ que aparecen, y luego verifica cada uno vía t.me/s/ para obtener
 * metadata real (título, descripción, miembros).
 *
 * Fuentes son artículos listicle limpios de medios españoles/latam.
 * Los resultados se combinan con los usernames de scrape.ts.
 *
 * Uso: npm run scrape-articles
 * Salida: data/grupos-scraped-articles.json
 */
import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";

// ============ URLS FUENTE ============
// Añade aquí URLs de artículos listicle "los mejores grupos de telegram"
// de medios limpios. El scraper extraerá todos los t.me/ que aparezcan.
const SOURCE_ARTICLES = [
  // === LISTICLES GENÉRICOS ===
  "https://www.elgrupoinformatico.com/noticias/grupos-telegram-los-que-debes-unirte-t79929.html",
  "https://computerhoy.20minutos.es/apps/mejores-grupos-telegram-te-puedes-unir-espana-1400333",
  "https://filmora.wondershare.es/telegram/best-telegram-groups.html",
  "https://www.xataka.com/basics/canales-telegram-guia-a-fondo-que-como-funcionan-que-puedes-hacer-ellos-como-crearlos",
  "https://metricgram.com/es/blog/mejores-grupos-telegram",
  "https://digitalpymes.es/top-canales-de-telegram/",
  "https://grupos24h.com/",
  "https://respond.io/es/blog/telegram-groups",
  "https://www.grupostelegram.net/peliculas.html",
  "https://www.grupostelegram.net/cdmx.html",

  // === ESPAÑA — LISTICLES LOCALES ===
  "https://www.xatakamovil.com/aplicaciones/mejores-canales-telegram-que-debes-seguir-2024",
  "https://www.softzone.es/programas/tutorial-software/mejores-canales-telegram/",
  "https://www.adslzone.net/reportajes/software/canales-grupos-telegram-imprescindibles/",
  "https://as.com/meristation/reportajes/mejores-canales-de-telegram-para-videojuegos-n/",
  "https://www.eleconomista.es/tecnologia/noticias/12345678/mejores-canales-telegram-espana/",
  "https://www.20minutos.es/tecnologia/aplicaciones/mejores-canales-telegram-espana/",
  "https://andro4all.com/aplicaciones/mejores-canales-telegram-espana",
  "https://www.trecebits.com/mejores-canales-telegram-espana/",

  // Añade más URLs cuando descubras nuevos listicles limpios
];

// ============ FILTROS ============
const BLOCKLIST_KEYWORDS = [
  "porn", "xxx", "nsfw", "only", "casero", "leaks", "pack ", "packs ",
  "sex ", "sexo", "apuesta", "casino", "prohibido", "sin reglas",
  "adulto", "18+", "hentai", "loli", "warez", "crack", "iptv gratis",
];

// Usernames de Telegram a IGNORAR (canales oficiales, bots del sistema, etc.)
const IGNORE_USERNAMES = new Set([
  "botfather", "telegram", "telegrames", "telegramtips", "premiumbot",
  "stickers", "addstickers", "spambot", "searchreport", "notoscam",
  "iv", "s", "share", "socks", "proxy", "joinchat", "premium",
  "premiumspanish", "durov", "telegramgeeks",
]);

const CATEGORY_MAP: Record<string, string[]> = {
  "ofertas-y-chollos": ["oferta", "chollo", "descuento", "cupon", "amazon", "aliexpress", "mercadolibre"],
  "criptomonedas": ["cripto", "crypto", "bitcoin", "btc", "eth", "ethereum", "blockchain", "defi", "nft"],
  "empleo-y-freelance": ["empleo", "trabajo", "freelance", "vacante", "job", "remote", "remoto"],
  "estudios-y-universidad": ["universidad", "unam", "examenes", "apuntes", "estudiante"],
  "idiomas": ["ingles", "english", "aleman", "japones", "idioma"],
  "programacion": ["programacion", "programador", "javascript", "python", "react", "developer", "coding"],
  "marketing-digital": ["marketing", "seo", "ads", "growth"],
  "gaming": ["gaming", "free fire", "fortnite", "valorant", "lol", "cs2", "warzone", "fifa", "gamers"],
  "anime-y-manga": ["anime", "manga", "otaku", "cosplay", "isekai", "shonen", "seinen"],
  "series-y-peliculas": ["series", "netflix", "hbo", "peliculas", "cine"],
  "musica": ["musica", "reggaeton", "trap"],
  "deportes": ["futbol", "nba", "mma", "deporte"],
  "memes-y-humor": ["meme", "humor"],
  "libros-y-lectura": ["libro", "lectura", "ebook", "novela"],
  "fitness-y-salud": ["fitness", "gym", "rutina", "dieta"],
  "viajes": ["viaje", "mochilero", "nomada"],
  "emprendimiento": ["emprender", "startup", "negocio"],
  "diseno-y-arte": ["diseño", "diseno", "ui", "ux", "figma"],
};

const COUNTRY_MAP: Record<string, string[]> = {
  mexico: ["mexico", "méxico", "cdmx", "monterrey", "guadalajara"],
  argentina: ["argentina", "buenos aires", "cordoba"],
  colombia: ["colombia", "bogota", "medellin"],
  peru: ["peru", "perú", "lima"],
  chile: ["chile", "santiago"],
  espana: ["españa", "spain", "madrid", "barcelona"],
  venezuela: ["venezuela", "caracas"],
  ecuador: ["ecuador", "quito"],
};

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

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
      },
    });
    if (!res.ok) {
      console.log(`  ⚠️  HTTP ${res.status} en ${url}`);
      return null;
    }
    return res.text();
  } catch (e) {
    console.log(`  ⚠️  error fetch ${url}:`, (e as Error).message);
    return null;
  }
}

function extractUsernamesFromHtml(html: string): string[] {
  const regex = /(?:https?:)?\/\/t\.me\/([A-Za-z0-9_]{3,32})(?:\?|\/|"|<|\s|$)/gi;
  const found = new Set<string>();
  let m;
  while ((m = regex.exec(html)) !== null) {
    const u = m[1].toLowerCase();
    if (!IGNORE_USERNAMES.has(u)) found.add(m[1]);
  }
  return [...found];
}

async function fetchPreview(username: string): Promise<Scraped | null> {
  const html = await fetchHtml(`https://t.me/s/${username}`);
  if (!html) return null;
  const $ = cheerio.load(html);

  const nombre = ($('meta[property="og:title"]').attr("content") || "").trim();
  let desc = ($('meta[property="og:description"]').attr("content") || "").trim();
  if (desc.length > 220) desc = desc.slice(0, 217) + "...";

  let miembros = 0;
  const extraText = $(".tgme_page_extra").text() + " " + $(".tgme_channel_info_counter").text();
  const memMatch = extraText.match(/([\d\s,.]+)\s*(members|subscribers|miembros|suscriptores)/i);
  if (memMatch) miembros = parseInt(memMatch[1].replace(/\D/g, "")) || 0;

  if (!nombre || nombre.toLowerCase() === "telegram" || nombre.toLowerCase().includes("telegram: contact")) return null;
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
    _fuente: "articulo-listicle",
    _requiereRevision: true,
  };
}

async function main() {
  console.log(`→ Fase 1: extrayendo t.me/ de ${SOURCE_ARTICLES.length} artículos fuente...\n`);
  const allUsernames = new Set<string>();
  const perArticle: Record<string, number> = {};

  for (const url of SOURCE_ARTICLES) {
    console.log(`  ${url}`);
    const html = await fetchHtml(url);
    if (!html) continue;
    const usernames = extractUsernamesFromHtml(html);
    perArticle[url] = usernames.length;
    console.log(`    → ${usernames.length} usernames encontrados`);
    usernames.forEach((u) => allUsernames.add(u));
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\n→ Fase 2: verificando ${allUsernames.size} usernames únicos vía t.me/s/...\n`);
  const results: Scraped[] = [];
  const notFound: string[] = [];
  let done = 0;

  for (const username of allUsernames) {
    const g = await fetchPreview(username);
    if (g) results.push(g);
    else notFound.push(username);
    done++;
    if (done % 10 === 0) console.log(`  ${done}/${allUsernames.size}...`);
    await new Promise((r) => setTimeout(r, 300));
  }

  const outPath = path.join(process.cwd(), "data", "grupos-scraped-articles.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));

  const stats = {
    articulosProcesados: Object.keys(perArticle).length,
    usernamesUnicosDetectados: allUsernames.size,
    verificadosConMetadata: results.length,
    noVerificados: notFound.length,
    porCategoria: results.reduce((acc, g) => { acc[g.categoria] = (acc[g.categoria] || 0) + 1; return acc; }, {} as Record<string, number>),
    porPais: results.reduce((acc, g) => { const p = g.pais || "sin-pais"; acc[p] = (acc[p] || 0) + 1; return acc; }, {} as Record<string, number>),
  };

  console.log(`\n✅ Guardado en ${outPath}`);
  console.log(JSON.stringify(stats, null, 2));
  console.log("\n👉 Siguiente paso:");
  console.log("   1. Abre data/grupos-scraped-articles.json en tu editor.");
  console.log("   2. Descarta los que no encajen con tu política AdSense.");
  console.log("   3. Ajusta categoria/pais donde diga 'por-clasificar'.");
  console.log("   4. Copia los aprobados al array de data/grupos.json.");
  console.log("   5. npm run build && git push (Vercel redespliega).");
}

main().catch(console.error);
