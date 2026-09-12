/**
 * Scraper multi-fuente de grupos de Telegram.
 *
 * Fuentes:
 *   1. combot.org/telegram/top/groups (rankings globales)
 *   2. tgstat.com (por categoría)
 *   3. Vista previa pública t.me/s/<usuario> (para verificar y sacar metadata)
 *
 * Salida: data/grupos-scraped.json listo para revisión manual.
 *
 * Cada grupo scraped incluye:
 *   - slug, nombre, descripcion, categoria (auto-detectada), pais (auto), link, miembros
 *   - _verificado: false por defecto (siempre revisar manualmente antes de mover a grupos.json)
 *   - _fuente y _fechaScraping para trazabilidad
 *
 * Uso:  npm run scrape
 */
import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";

// ------- Bloqueadores automáticos (política AdSense) -------
const BLOCKLIST_KEYWORDS = [
  "porn", "xxx", "nsfw", "only", "casero", "leaks", "pack", "hot",
  "sex", "sexo", "apuesta", "casino", "prohibido", "sin reglas",
  "sin límites", "sin limites", "adulto", "18+", "hentai", "loli",
  "warez", "crack", "pirata", "iptv gratis", "cuentas gratis",
];

// ------- Clasificador de categoría por keywords -------
const CATEGORY_MAP: Record<string, string[]> = {
  "ofertas-y-chollos": ["oferta", "chollo", "descuento", "cupon", "amazon", "aliexpress", "mercadolibre", "black friday", "hot sale"],
  "criptomonedas": ["cripto", "bitcoin", "btc", "eth", "ethereum", "blockchain", "defi", "nft", "trading crypto", "airdrop"],
  "empleo-y-freelance": ["empleo", "trabajo", "freelance", "vacante", "job", "remote", "remoto", "reclutamiento"],
  "estudios-y-universidad": ["universidad", "unam", "unal", "examenes", "apuntes", "resumen", "carrera", "estudiante"],
  "idiomas": ["ingles", "english", "frances", "aleman", "japones", "idioma", "practica"],
  "programacion": ["programacion", "javascript", "python", "react", "node", "developer", "dev", "coding", "backend", "frontend"],
  "marketing-digital": ["marketing", "seo", "ads", "growth", "social media", "publicidad"],
  "gaming": ["gaming", "free fire", "fortnite", "valorant", "lol", "cs2", "warzone", "fifa", "juego", "gamers"],
  "anime-y-manga": ["anime", "manga", "otaku", "cosplay", "isekai", "shonen", "seinen"],
  "series-y-peliculas": ["series", "netflix", "hbo", "peliculas", "estrenos", "cine"],
  "musica": ["musica", "reggaeton", "trap", "electronica", "dj", "producer"],
  "deportes": ["futbol", "nba", "mma", "f1", "formula", "deporte"],
  "memes-y-humor": ["meme", "humor", "chistes"],
  "libros-y-lectura": ["libro", "lectura", "ebook", "novela", "escritor"],
  "fitness-y-salud": ["fitness", "gym", "rutina", "dieta", "salud"],
  "viajes": ["viaje", "mochilero", "nomada", "vuelos", "hostal"],
  "emprendimiento": ["emprender", "startup", "negocio", "founder"],
  "diseno-y-arte": ["diseño", "diseno", "ilustracion", "ui", "ux", "figma", "photoshop"],
};

// ------- País auto-detectado por keywords -------
const COUNTRY_MAP: Record<string, string[]> = {
  mexico: ["mexico", "méxico", "mx", "cdmx", "monterrey", "guadalajara", "puebla", "queretaro"],
  argentina: ["argentina", "arg", "buenos aires", "cordoba", "rosario", "mendoza"],
  colombia: ["colombia", "bogota", "medellin", "cali", "barranquilla"],
  peru: ["peru", "perú", "lima", "arequipa"],
  chile: ["chile", "santiago", "valparaiso"],
  espana: ["españa", "spain", "espana", "madrid", "barcelona", "valencia", "sevilla"],
  venezuela: ["venezuela", "caracas", "maracaibo"],
  ecuador: ["ecuador", "quito", "guayaquil"],
};

type Scraped = {
  slug: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  pais: string;
  link: string;
  miembros: number;
  verificado: false;
  fechaAgregado: string;
  _fuente: string;
  _requiereRevision: true;
};

function toSlug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function isSafe(name: string, desc: string): boolean {
  const t = `${name} ${desc}`.toLowerCase();
  return !BLOCKLIST_KEYWORDS.some((k) => t.includes(k));
}

function classifyCategoria(name: string, desc: string): string {
  const t = `${name} ${desc}`.toLowerCase();
  for (const [cat, keys] of Object.entries(CATEGORY_MAP)) {
    if (keys.some((k) => t.includes(k))) return cat;
  }
  return "por-clasificar";
}

function classifyPais(name: string, desc: string): string {
  const t = `${name} ${desc}`.toLowerCase();
  for (const [pais, keys] of Object.entries(COUNTRY_MAP)) {
    if (keys.some((k) => t.includes(k))) return pais;
  }
  return "";
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; TelegramDirBot/1.0; +https://grupostelegramlatam.com/bot)",
      "Accept-Language": "es-ES,es;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} para ${url}`);
  return res.text();
}

// ------- Fuente 1: combot.org -------
async function scrapeCombot(): Promise<Scraped[]> {
  console.log("→ Scrapeando combot.org...");
  const html = await fetchHtml("https://combot.org/telegram/top/groups?lng=es");
  const $ = cheerio.load(html);
  const out: Scraped[] = [];
  $("tr.tgtable__row").each((_, el) => {
    const nombre = $(el).find(".tgtable__title").text().trim();
    const desc = $(el).find(".tgtable__desc").text().trim();
    const link = $(el).find("a[href*='t.me']").attr("href") || "";
    const membersText = $(el).find(".tgtable__members").text().trim();
    const miembros = parseInt(membersText.replace(/\D/g, "")) || 0;
    if (!nombre || !link || !isSafe(nombre, desc)) return;
    out.push({
      slug: toSlug(nombre),
      nombre,
      descripcion: desc,
      categoria: classifyCategoria(nombre, desc),
      pais: classifyPais(nombre, desc),
      link,
      miembros,
      verificado: false,
      fechaAgregado: new Date().toISOString().slice(0, 10),
      _fuente: "combot",
      _requiereRevision: true,
    });
  });
  console.log(`  encontrados: ${out.length}`);
  return out;
}

// ------- Verificador de link t.me -------
async function verifyTelegramLink(link: string): Promise<{ ok: boolean; miembros?: number; descripcion?: string }> {
  try {
    const match = link.match(/t\.me\/([A-Za-z0-9_]+)/);
    if (!match) return { ok: false };
    const preview = await fetchHtml(`https://t.me/s/${match[1]}`);
    const $ = cheerio.load(preview);
    const desc = $('meta[property="og:description"]').attr("content") || "";
    const memText = $(".tgme_page_extra").text();
    const miembros = parseInt(memText.replace(/\D/g, "")) || undefined;
    return { ok: true, miembros, descripcion: desc };
  } catch {
    return { ok: false };
  }
}

async function main() {
  const all: Scraped[] = [];

  try { all.push(...(await scrapeCombot())); }
  catch (e) { console.error("[combot] error:", e); }

  // Dedupe por link
  const seen = new Set<string>();
  const dedup = all.filter((g) => {
    if (!g.link || seen.has(g.link)) return false;
    seen.add(g.link);
    return true;
  });

  console.log(`\nVerificando ${dedup.length} enlaces contra t.me/s/...`);
  const verified: Scraped[] = [];
  const broken: string[] = [];
  for (const g of dedup) {
    const v = await verifyTelegramLink(g.link);
    if (v.ok) {
      if (v.miembros && v.miembros > g.miembros) g.miembros = v.miembros;
      if (v.descripcion && (!g.descripcion || g.descripcion.length < 20)) g.descripcion = v.descripcion.slice(0, 220);
      verified.push(g);
    } else {
      broken.push(g.link);
    }
    await new Promise((r) => setTimeout(r, 250)); // rate limit suave
  }

  const outPath = path.join(process.cwd(), "data", "grupos-scraped.json");
  fs.writeFileSync(outPath, JSON.stringify(verified, null, 2));

  const stats = {
    totalScraped: all.length,
    unicos: dedup.length,
    verificados: verified.length,
    enlacesRotos: broken.length,
    porCategoria: verified.reduce((acc, g) => {
      acc[g.categoria] = (acc[g.categoria] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    porPais: verified.reduce((acc, g) => {
      const p = g.pais || "sin-pais";
      acc[p] = (acc[p] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  console.log("\n✅ Resultado guardado en", outPath);
  console.log(JSON.stringify(stats, null, 2));
  console.log("\n👉 Siguiente paso: revisa data/grupos-scraped.json, ajusta categoría/país si es 'por-clasificar', marca 'verificado: true' en los que apruebes, y mueve los buenos a data/grupos.json.");
}

main().catch(console.error);
