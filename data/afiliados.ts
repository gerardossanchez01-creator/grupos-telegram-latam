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

// Enlaces generados en Mercado Libre el 13/10/2026.
// Etiqueta: antoniogerardo20220803163353 (perfil FactotumMX).
// Imágenes y precios (MXN) extraídos de la ficha de cada producto el 13/10/2026.
export const AFILIADOS: Record<string, ProductoAfiliado[]> = {
  "gaming": [
    {
      titulo: "Control GameSir G7 Pro (Xbox/PC, Hall Effect)",
      url: "https://meli.la/2SjXhGT",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_633535-MLA98780126119_112025-O.webp",
      precio: "$1,597",
    },
    {
      titulo: "Control inalámbrico Xbox Series — Robot White",
      url: "https://meli.la/2dAsPiK",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_731205-MLA99521859502_122025-O.webp",
      precio: "$1,354",
    },
    {
      titulo: "Control GameSir G7 SE con cable (PC/Xbox)",
      url: "https://meli.la/2i7y8uZ",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_673255-MLA99953518789_112025-O.webp",
      precio: "$874",
    },
  ],
  "anime-y-manga": [
    {
      titulo: "Manga Naruto Gold Edition N.1 (Panini)",
      url: "https://meli.la/2jts2AF",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_864926-MLM51655900755_092022-O.webp",
      precio: "$269",
    },
    {
      titulo: "Naruto: La verdadera historia de Sasuke N.1",
      url: "https://meli.la/18HTEUo",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_761243-MLA86728008937_062025-O.webp",
      precio: "$179",
    },
    {
      titulo: "Naruto Boxset N.2 (Panini)",
      url: "https://meli.la/13mhnum",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_974643-MLA80900623420_122024-O.webp",
      precio: "$2,079",
    },
  ],
  "musica": [
    {
      titulo: "Audífonos inalámbricos Sony WH-CH520",
      url: "https://meli.la/1u8AGVS",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_963414-MLA99445666920_112025-O.webp",
      precio: "$679",
    },
    {
      titulo: "Bocina portátil Aiwa AWS600BT Bluetooth (waterproof)",
      url: "https://meli.la/2KDXWs4",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_655583-MLA99989998391_112025-O.webp",
      precio: "$849",
    },
    {
      titulo: "Micrófono Sony ECM-LV1 (TRS 3.5 mm)",
      url: "https://meli.la/1N1sQNq",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_706359-MLM93030318088_092025-O.webp",
      precio: "$599",
    },
  ],
  "fitness-y-salud": [
    {
      titulo: "Kit mancuernas ajustables 3 en 1 (15 kg)",
      url: "https://meli.la/2Ef6shp",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_619964-MLA95698259108_102025-O.webp",
      precio: "$629",
    },
    {
      titulo: "Mancuerna hexagonal 15 lb",
      url: "https://meli.la/1FDJ7ei",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_658824-MLA99529793766_122025-O.webp",
      precio: "$388",
    },
    {
      titulo: "Kit 2 mancuernas hexagonales 20 lb c/u",
      url: "https://meli.la/1YPS6c5",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_661037-MLA86621357433_062025-O.webp",
      precio: "$999",
    },
  ],
  "libros-y-lectura": [
    {
      titulo: "Lámpara de lectura USB recargable (clip)",
      url: "https://meli.la/2e8WL1P",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_906846-MLA96130698551_102025-O.webp",
      precio: "$110",
    },
    {
      titulo: "Lámpara de escritorio LED flexible USB (4000 mAh)",
      url: "https://meli.la/2r2oRR6",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_926856-MLA109536294772_042026-O.webp",
      precio: "$189",
    },
    {
      titulo: "Lámpara de escritorio LED regulable",
      url: "https://meli.la/23XoN7c",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_628452-MLM83569107760_042025-O.webp",
      precio: "$132",
    },
  ],
  "programacion": [
    {
      titulo: "Teclado mecánico Aula Win60HE RGB 8K",
      url: "https://meli.la/2XvRUvD",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_789341-MLA99946793497_112025-O.webp",
      precio: "$649",
    },
    {
      titulo: "Teclado mecánico gamer español (Ñ, RGB, hot-swap)",
      url: "https://meli.la/1u3FFNK",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_929638-MLA113284630637_062026-O.webp",
      precio: "$568",
    },
    {
      titulo: "Teclado mecánico 68 teclas RGB (switch rojo)",
      url: "https://meli.la/1LRARpX",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_895657-MLA109778752211_032026-O.webp",
      precio: "$274",
    },
  ],
  "estudios-y-universidad": [
    {
      titulo: 'Mochila antirrobo para laptop 15.6" IFORU 30L',
      url: "https://meli.la/2xgLYxh",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_977529-MLA99555031970_122025-O.webp",
      precio: "$339",
    },
    {
      titulo: 'Mochila para laptop 15.6" impermeable con USB',
      url: "https://meli.la/1gfS2RL",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_963074-MLM112664009111_062026-O.webp",
      precio: "$449",
    },
    {
      titulo: 'Mochila escolar/laptop 15.6" IFORU 32N',
      url: "https://meli.la/2SR687D",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_874423-MLA99515296862_112025-O.webp",
      precio: "$364",
    },
  ],
  "diseno-y-arte": [
    {
      titulo: "Tableta gráfica Ugee S640",
      url: "https://meli.la/2JW36UR",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_911257-MLA100031994735_122025-O.webp",
      precio: "$569",
    },
    {
      titulo: "Tableta gráfica Wacom Intuos CTL4100 (S)",
      url: "https://meli.la/22iWxN3",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_765906-MLA99990946213_112025-O.webp",
      precio: "$1,199",
    },
    {
      titulo: 'Tableta gráfica XPPen Deco 640 (6")',
      url: "https://meli.la/17q9f8A",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_972100-MLA92050034671_092025-O.webp",
      precio: "$626",
    },
  ],
  "deportes": [
    {
      titulo: "Balón de fútbol SZHGXL profesional No.5",
      url: "https://meli.la/19EkFx4",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_737111-MLA110819201492_052026-O.webp",
      precio: "$282",
    },
    {
      titulo: "Balón de fútbol Gaser Suka No.4",
      url: "https://meli.la/2kxQnEw",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_812075-MLA111153241278_052026-O.webp",
      precio: "$278",
    },
    {
      titulo: "Balón fútbol sala Oka No.4",
      url: "https://meli.la/16FNPtb",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_749617-MLA100060676653_122025-O.webp",
      precio: "$274",
    },
  ],
  "viajes": [
    {
      titulo: "Maleta deportiva Quanna (con porta-zapatos)",
      url: "https://meli.la/17HqydJ",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_655465-MLA99389960848_112025-O.webp",
      precio: "$140",
    },
    {
      titulo: "Bolsa de viaje/gym con ruedas GZKXKJ",
      url: "https://meli.la/1hWpgWm",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_694540-MLA112083874205_052026-O.webp",
      precio: "$240",
    },
    {
      titulo: "Maleta carry-on 10 kg con ruedas y candado",
      url: "https://meli.la/2hvVHQP",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_826861-MLM111294780157_052026-O.webp",
      precio: "$749",
    },
  ],
  "emprendimiento": [
    {
      titulo: "Silla de oficina ergonómica Cuory (malla)",
      url: "https://meli.la/11Ww43D",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_781282-MLA95846927727_102025-O.webp",
      precio: "$663",
    },
    {
      titulo: "Silla ejecutiva giratoria Top Living (malla)",
      url: "https://meli.la/2AP1UXA",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_656228-MLA116866254165_082026-O.webp",
      precio: "$668",
    },
    {
      titulo: "Silla ejecutiva ergonómica giratoria",
      url: "https://meli.la/23xTMEW",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_861655-MLM116840676308_092026-O.webp",
      precio: "$650",
    },
  ],
  "marketing-digital": [
    {
      titulo: "Micrófono lavalier inalámbrico Uorlen CL-139",
      url: "https://meli.la/1v3abR9",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_867277-MLA99578722886_122025-O.webp",
      precio: "$132",
    },
    {
      titulo: "2× micrófonos lavalier inalámbricos Boya (USB)",
      url: "https://meli.la/2fAHJoF",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_721538-CBT112791374494_072026-O.webp",
      precio: "$935",
    },
    {
      titulo: "Micrófono Sony ECM-LV1 (TRS 3.5 mm)",
      url: "https://meli.la/1N1sQNq",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_706359-MLM93030318088_092025-O.webp",
      precio: "$599",
    },
  ],
  "ofertas-y-chollos": [
    {
      titulo: "Bocina portátil Aiwa AWS600BT Bluetooth (waterproof)",
      url: "https://meli.la/2KDXWs4",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_655583-MLA99989998391_112025-O.webp",
      precio: "$849",
    },
    {
      titulo: "Bocina Kaiser MSA-7515MX Bluetooth",
      url: "https://meli.la/13Sr2fW",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_701664-MLA99851267363_112025-O.webp",
      precio: "$2,142",
    },
    {
      titulo: "Barra de sonido 2.1 con subwoofer 160W (HDMI-ARC)",
      url: "https://meli.la/2cmFXAK",
      imagen: "https://http2.mlstatic.com/D_NQ_NP_992085-MLA118419949247_092026-O.webp",
      precio: "$778",
    },
  ],

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
