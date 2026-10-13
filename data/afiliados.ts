// =============================================================================
// AFILIADOS MERCADO LIBRE  —  productos recomendados por categoría
// =============================================================================
// Codex: para cada categoría comercial, elige 3 productos de Mercado Libre que
// encajen con el nicho, genera el ENLACE DE AFILIADO desde tu panel y pégalo en
// `url`. `imagen` y `precio` son opcionales (si no hay imagen se omite).
//
//  - Las categorías sin encaje comercial se dejan como [] (no muestran banner).
//  - El componente solo pinta productos que tengan `url`, así que puedes
//    rellenarlas poco a poco sin romper nada.
//  - Usa SIEMPRE el enlace de afiliado (con tu tag), no el enlace normal del
//    producto, o no se registra la comisión.
// =============================================================================

export type ProductoAfiliado = {
  titulo: string;
  url: string; // enlace de afiliado de Mercado Libre (OBLIGATORIO para que se muestre)
  imagen?: string; // URL de la imagen del producto (opcional)
  precio?: string; // texto libre, ej. "$1,299" (opcional)
};

export const AFILIADOS: Record<string, ProductoAfiliado[]> = {
  // 🛒 Lo más rentable: ya vienen buscando comprar
  "ofertas-y-chollos": [
    // Sugerencia: lo más vendido del momento / electrónica en oferta
    // { titulo: "", url: "", imagen: "", precio: "" },
  ],
  // 🎮 Consolas, controles, headsets, sillas gamer, tarjetas de regalo
  "gaming": [],
  // 🌸 Figuras, mangas, posters, funkos
  "anime-y-manga": [],
  // 🎧 Audífonos, bocinas, micrófonos, instrumentos
  "musica": [],
  // 💪 Mancuernas, bandas, básculas inteligentes, suplementos
  "fitness-y-salud": [],
  // 📚 Libros más vendidos, e-readers (Kindle), lámparas de lectura
  "libros-y-lectura": [],
  // 💻 Laptops, monitores, teclados mecánicos, hubs USB-C
  "programacion": [],
  // 🎓 Laptops económicas, tablets, papelería, mochilas
  "estudios-y-universidad": [],
  // 🎨 Tabletas gráficas, lápices, monitores, material de arte
  "diseno-y-arte": [],
  // ⚽ Balones, jerseys, tenis, gadgets deportivos
  "deportes": [],
  // ✈️ Maletas, organizadores, adaptadores de viaje, candados TSA
  "viajes": [],
  // 🚀 Equipo de oficina, cámaras, micrófonos, iluminación
  "emprendimiento": [],
  // 📈 Cámaras, ring lights, micrófonos para creadores
  "marketing-digital": [],

  // Categorías SIN encaje comercial directo → se dejan vacías:
  // criptomonedas, empleo-y-freelance, idiomas, series-y-peliculas, memes-y-humor
};

/** Productos genéricos de respaldo (opcional): se usan cuando la categoría no
 *  tiene productos propios. Déjalo vacío si no quieres fallback. */
export const AFILIADOS_FALLBACK: ProductoAfiliado[] = [];

export function getAfiliados(categoria: string): ProductoAfiliado[] {
  const propios = (AFILIADOS[categoria] ?? []).filter((p) => p.url);
  if (propios.length > 0) return propios;
  return AFILIADOS_FALLBACK.filter((p) => p.url);
}
