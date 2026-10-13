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
export const AFILIADOS: Record<string, ProductoAfiliado[]> = {
  "gaming": [
    {
      "titulo": "Control Alámbrico GameSir G7 Pro para Xbox Series X|S y Xbox One, Gamepad Inalámbrico para PC y Android con Palancas TMR, Gatillos Analógicos Hall Effect y Tasa de Sondeo de 1000Hz",
      "url": "https://meli.la/2SjXhGT"
    },
    {
      "titulo": "Control Joystick Inalámbrico Microsoft Xbox Wireless Controller Robot White",
      "url": "https://meli.la/2dAsPiK"
    },
    {
      "titulo": "Control Con Cable Gamesir G7 SE Para Pc y xBox One Color Violeta",
      "url": "https://meli.la/2i7y8uZ"
    }
  ],
  "anime-y-manga": [
    {
      "titulo": "Panini Manga Naruto Gold Edition N.1",
      "url": "https://meli.la/2jts2AF"
    },
    {
      "titulo": "Editorial Panini Naruto La Verdadera Historia De Sasuke N.1",
      "url": "https://meli.la/18HTEUo"
    },
    {
      "titulo": "Editorial Panini Naruto Boxset N.2",
      "url": "https://meli.la/13mhnum"
    }
  ],
  "musica": [
    {
      "titulo": "Audífonos Inalámbricos Sony Wh-ch520 Negro",
      "url": "https://meli.la/1u8AGVS"
    },
    {
      "titulo": "Bocina Portátil Aiwa Aws600bt Con Bluetooth Waterproof Negra",
      "url": "https://meli.la/2KDXWs4"
    },
    {
      "titulo": "Micrófono Sony Ecm-lv1 Con Conector Trs De 3.5mm",
      "url": "https://meli.la/1N1sQNq"
    }
  ],
  "fitness-y-salud": [
    {
      "titulo": "Kit Mancuernas Ajustables 3 En 1 Barra Pesas Ejercicio 15kg Color Rojo/Negro",
      "url": "https://meli.la/2Ef6shp"
    },
    {
      "titulo": "Mancuerna Hexagonal Pesa Ejercicio Gym 15 Lb Gimnasio Color Negro",
      "url": "https://meli.la/1FDJ7ei"
    },
    {
      "titulo": "Kit De 2 Mancuernas Lincky Hexagonal Ejercicio Gym 20lb C/u Color Negro",
      "url": "https://meli.la/1YPS6c5"
    }
  ],
  "libros-y-lectura": [
    {
      "titulo": "Usb Recargable Lámpara De Lectura Para Libros Portátil Heroes Negro color de luz Blanco",
      "url": "https://meli.la/2e8WL1P"
    },
    {
      "titulo": "Vanance Lámpara De Escritorio Led Giratorias Ajustable Flexible Van060104 Lampara De Lectura Usb Recargable 4000mah Luz 3 Temperaturas Y 360° Brazo Giratoria Led Color Negro",
      "url": "https://meli.la/2r2oRR6"
    },
    {
      "titulo": "Lámpara De Escritorio De Lectura Led Regulable",
      "url": "https://meli.la/23XoN7c"
    }
  ],
  "programacion": [
    {
      "titulo": "Teclado Magnético Mecánico Aula Win60he Estándar 8k Rgb E-sport Alámbrico",
      "url": "https://meli.la/2XvRUvD"
    },
    {
      "titulo": "Teclado Mecánico Gamer Español con Ñ 100 Teclas RGB Hot Swap Free Wolf K3 Teclado USB Switch Rojo Teclado Alambrico para Gaming y Escritura, Blanco",
      "url": "https://meli.la/1u3FFNK"
    },
    {
      "titulo": "Mechanical Teclado With 68 Keyons Red Rgb In English Compatible With PC/Portátil/Windows",
      "url": "https://meli.la/1LRARpX"
    }
  ],
  "estudios-y-universidad": [
    {
      "titulo": "Mochila Escolares Viaje Antirrobo Impermeable Hombre Juvenil Niños Mochilas para Laptop 15.6\" Negra IFORU 30L",
      "url": "https://meli.la/2xgLYxh"
    },
    {
      "titulo": "Mochila Para Laptop 15.6 Impermeable Con Usb Oficina Viajes",
      "url": "https://meli.la/1gfS2RL"
    },
    {
      "titulo": "Mochila Escolar Viaje Laptop 15.6 Inch Iforu Backpack-32N Color Negro",
      "url": "https://meli.la/2SR687D"
    }
  ],
  "diseno-y-arte": [
    {
      "titulo": "Tableta Gráfica Digitalizadora Ugee S640 Color Black",
      "url": "https://meli.la/2JW36UR"
    },
    {
      "titulo": "Tableta Gráfica Wacom Intuos CTL4100 Small Color Negro",
      "url": "https://meli.la/22iWxN3"
    },
    {
      "titulo": "Xppen Deco 640 Tableta Gráfica 6 Pulgadas Compatible Android color negro",
      "url": "https://meli.la/17q9f8A"
    }
  ],
  "deportes": [
    {
      "titulo": "Balón de Fútbol SZHGXL Profesional Tamaño 5 para Entrenamiento y Recreación",
      "url": "https://meli.la/19EkFx4"
    },
    {
      "titulo": "Balón De Futbol Gaser Soccer Suka Laminado No.4 Color Turqueza/naranja",
      "url": "https://meli.la/2kxQnEw"
    },
    {
      "titulo": "Balón Futbol Sala Oka Bote Muerto Nº4 Blanco Sintético Duela 2023",
      "url": "https://meli.la/16FNPtb"
    }
  ],
  "viajes": [
    {
      "titulo": "Maleta Deportiva Quanna para Viaje y Gym, Negra con Compartimento para Zapatos",
      "url": "https://meli.la/17HqydJ"
    },
    {
      "titulo": "Maleta Deportiva Viaje Bolsa Mochila Gym Duffel Con Ruedas GZKXKJ",
      "url": "https://meli.la/1hWpgWm"
    },
    {
      "titulo": "Maleta Viaje 10 Kg Carry On Cabina Mano Avion Ruedas Candado",
      "url": "https://meli.la/2hvVHQP"
    }
  ],
  "emprendimiento": [
    {
      "titulo": "Silla de Oficina Ergonómica Cuory CUOSORM3 Negra Respaldo de Malla Transpirable",
      "url": "https://meli.la/11Ww43D"
    },
    {
      "titulo": "Silla De Oficina Top Living Silla Ejecutiva Giratoria con Base Plástico Tapizado Malla Color Negro",
      "url": "https://meli.la/2AP1UXA"
    },
    {
      "titulo": "Silla Ejecutiva Oficina Ergonómica Escritorio Giratoria",
      "url": "https://meli.la/23xTMEW"
    }
  ],
  "marketing-digital": [
    {
      "titulo": "Micrófono Lavalier Wireless Uorlen CL-139 Inalámbrico iPhone Android PC",
      "url": "https://meli.la/1v3abR9"
    },
    {
      "titulo": "2pcs Boya Mini Microfonos Inalambricos Lavalier Negro Usb",
      "url": "https://meli.la/2fAHJoF"
    },
    {
      "titulo": "Micrófono Sony Ecm-lv1 Con Conector Trs De 3.5mm",
      "url": "https://meli.la/1N1sQNq"
    }
  ],
  "ofertas-y-chollos": [
    {
      "titulo": "Bocina Portátil Aiwa Aws600bt Con Bluetooth Waterproof Negra",
      "url": "https://meli.la/2KDXWs4"
    },
    {
      "titulo": "Bocina Kaiser MSA-7515MX portátil con bluetooth color Negro",
      "url": "https://meli.la/13Sr2fW"
    },
    {
      "titulo": "Barra De Sonido Con Subwoofer 160W Home Theater 2.1 Canales Audishako BS-400 Teatro En Casa Con Bluetooth HDMI-ARC/AUX/USB Conector 110V Color Negro Control Remoto",
      "url": "https://meli.la/2cmFXAK"
    }
  ]
};

/** Productos genéricos de respaldo (opcional): se usan cuando la categoría no
 *  tiene productos propios. Déjalo vacío si no quieres fallback. */
export const AFILIADOS_FALLBACK: ProductoAfiliado[] = [];

export function getAfiliados(categoria: string): ProductoAfiliado[] {
  const propios = (AFILIADOS[categoria] ?? []).filter((p) => p.url);
  if (propios.length > 0) return propios;
  return AFILIADOS_FALLBACK.filter((p) => p.url);
}
