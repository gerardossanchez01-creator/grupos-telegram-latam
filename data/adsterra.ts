// =============================================================================
// CONFIGURACIÓN ADSTERRA  —  rellenar con los datos del panel (lo hace Codex)
// =============================================================================
// Pasos para Codex:
//  1. Crear cuenta en https://adsterra.com (Publisher) y añadir este sitio.
//  2. Crear las ZONAS de banner y pegar su `key` en AD_ZONES (abajo).
//  3. Opcional: crear Social Bar / Popunder y pegar el src del script en SITE_SCRIPTS.
//  4. Copiar la línea de ads.txt que da Adsterra en `public/ads.txt`.
//
// Mientras `key`/`src` estén vacíos, NO se renderiza nada roto: los huecos
// simplemente no muestran anuncio (en dev se ve un placeholder punteado).
// =============================================================================

// --- Scripts que van UNA sola vez en todo el sitio (app/layout.tsx) ----------
export const SITE_SCRIPTS = {
  // Social Bar: barra flotante. Pega aquí el src que te da Adsterra, p.ej:
  //   "//pl00000000.effectivegatecpm.com/00/11/22/0011223344.js"
  socialBarSrc: "",
  // Popunder: formato agresivo (abre pestaña). Déjalo vacío si no lo quieres.
  popunderSrc: "",
  // Meta de verificación del sitio, si Adsterra la pide (contenido del meta).
  verification: "",
};

// --- Zonas de banner por "placement" lógico ----------------------------------
// La clave del map coincide con el valor `slot="..."` que ya usan las páginas,
// así NO hay que tocar cada página: Codex solo pega el `key` de cada zona.
export type AdZone = {
  key: string; // Adsterra "Banner" zone key (lo da el panel)
  width: number;
  height: number;
};

export const AD_ZONES: Record<string, AdZone> = {
  "1234567890": { key: "7f1ea2455501d460f4a76bbbce8c6b09", width: 728, height: 90 },  // Home — tras categorías
  "9876543210": { key: "7f1ea2455501d460f4a76bbbce8c6b09", width: 728, height: 90 },  // Home — zona media/baja
  "2345678901": { key: "7f1ea2455501d460f4a76bbbce8c6b09", width: 728, height: 90 },  // Categoría — tras intro
  "3456789012": { key: "fafe236ce93897ad4ad27dbe2fdef823", width: 300, height: 250 }, // Categoría/Grupo — in-content
  "5678901234": { key: "7f1ea2455501d460f4a76bbbce8c6b09", width: 728, height: 90 },  // Categoría×País
  "4567890123": { key: "fafe236ce93897ad4ad27dbe2fdef823", width: 300, height: 250 }, // Blog post
  "9012345678": { key: "7f1ea2455501d460f4a76bbbce8c6b09", width: 728, height: 90 },  // Blog listado
  "6789012345": { key: "7f1ea2455501d460f4a76bbbce8c6b09", width: 728, height: 90 },  // Bots listado
  "7890123456": { key: "fafe236ce93897ad4ad27dbe2fdef823", width: 300, height: 250 }, // Bot ficha
  "8901234567": { key: "7f1ea2455501d460f4a76bbbce8c6b09", width: 728, height: 90 },  // Bots categoría
};

export function getAdZone(slot: string): AdZone | undefined {
  return AD_ZONES[slot];
}
