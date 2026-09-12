import { getCategoria } from "@/lib/data";

// Mapeo de category → emoji para posts que no tienen pillar (guias, adyacentes, etc.)
const CATEGORY_ICONS: Record<string, { emoji: string; grad: [string, string] }> = {
  guias: { emoji: "📘", grad: ["#229ED9", "#1a7db0"] },
  listicles: { emoji: "🏆", grad: ["#7B68EE", "#5a4bbf"] },
  actualidad: { emoji: "📰", grad: ["#e11d48", "#b8153c"] },
  adyacentes: { emoji: "💡", grad: ["#f59e0b", "#c47d09"] },
  general: { emoji: "📢", grad: ["#229ED9", "#1a7db0"] },
};

// Mapeo pilar-específico (usa el emoji de la categoría del directorio)
function getHeroData(pillar: string | undefined, category: string) {
  if (pillar) {
    const cat = getCategoria(pillar);
    if (cat) {
      // Colores por pilar
      const palettes: Record<string, [string, string]> = {
        "ofertas-y-chollos": ["#f59e0b", "#c47d09"],
        "criptomonedas": ["#f7931a", "#d97706"],
        "empleo-y-freelance": ["#0ea5e9", "#0369a1"],
        "programacion": ["#8b5cf6", "#6d28d9"],
        "gaming": ["#22c55e", "#15803d"],
        "anime-y-manga": ["#ec4899", "#be185d"],
        "idiomas": ["#14b8a6", "#0f766e"],
        "marketing-digital": ["#f43f5e", "#be123c"],
        "series-y-peliculas": ["#a855f7", "#7e22ce"],
        "viajes": ["#06b6d4", "#0e7490"],
        "emprendimiento": ["#eab308", "#a16207"],
        "diseno-y-arte": ["#ef4444", "#b91c1c"],
        "fitness-y-salud": ["#84cc16", "#4d7c0f"],
        "libros-y-lectura": ["#78716c", "#44403c"],
      };
      return { emoji: cat.emoji, grad: palettes[pillar] ?? ["#229ED9", "#1a7db0"], label: cat.nombre };
    }
  }
  const fallback = CATEGORY_ICONS[category] ?? CATEGORY_ICONS.general;
  return { emoji: fallback.emoji, grad: fallback.grad, label: category };
}

export default function PostHero({ title, pillar, category, readingTime }: {
  title: string;
  pillar?: string;
  category: string;
  readingTime: number;
}) {
  const { emoji, grad, label } = getHeroData(pillar, category);
  return (
    <div
      className="relative overflow-hidden rounded-xl mb-6"
      style={{ background: `linear-gradient(135deg, ${grad[0]} 0%, ${grad[1]} 100%)` }}
    >
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `radial-gradient(circle at 90% 20%, white 0.5px, transparent 1px), radial-gradient(circle at 20% 80%, white 0.5px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div className="relative p-6 md:p-10 flex items-center gap-5 md:gap-8">
        <div className="text-6xl md:text-8xl shrink-0" aria-hidden="true">
          {emoji}
        </div>
        <div className="text-white flex-1 min-w-0">
          <div className="text-xs uppercase tracking-wider opacity-80 mb-1">
            {label} · {readingTime} min de lectura
          </div>
          <div className="text-lg md:text-2xl font-bold leading-tight line-clamp-3">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}
