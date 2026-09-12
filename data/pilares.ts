// Las 6 categorías pilares que reciben páginas long-tail geo (categoría x país)
// y aparecen en la navegación principal.
export const PILARES_SLUGS = [
  "ofertas-y-chollos",
  "criptomonedas",
  "empleo-y-freelance",
  "programacion",
  "gaming",
  "anime-y-manga",
] as const;

export type PilarSlug = (typeof PILARES_SLUGS)[number];
