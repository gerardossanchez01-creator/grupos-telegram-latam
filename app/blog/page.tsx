import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SITE, getCategoria } from "@/lib/data";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Blog — Guías y listas de grupos de Telegram",
  description: "Guías prácticas, listas curadas y trucos para sacar el máximo partido a Telegram: cómo buscar grupos, crearlos, mejores comunidades por tema.",
  alternates: { canonical: `${SITE.url}/blog` },
};

const PILLAR_COLORS: Record<string, [string, string, string]> = {
  "ofertas-y-chollos": ["#f59e0b", "#c47d09", "🛒"],
  "criptomonedas": ["#f7931a", "#d97706", "🪙"],
  "empleo-y-freelance": ["#0ea5e9", "#0369a1", "💼"],
  "programacion": ["#8b5cf6", "#6d28d9", "💻"],
  "gaming": ["#22c55e", "#15803d", "🎮"],
  "anime-y-manga": ["#ec4899", "#be185d", "🌸"],
  "idiomas": ["#14b8a6", "#0f766e", "🌍"],
  "marketing-digital": ["#f43f5e", "#be123c", "📈"],
  "series-y-peliculas": ["#a855f7", "#7e22ce", "🎬"],
  "viajes": ["#06b6d4", "#0e7490", "✈️"],
  "emprendimiento": ["#eab308", "#a16207", "🚀"],
  "diseno-y-arte": ["#ef4444", "#b91c1c", "🎨"],
  "fitness-y-salud": ["#84cc16", "#4d7c0f", "💪"],
  "libros-y-lectura": ["#78716c", "#44403c", "📚"],
};

const CATEGORY_FALLBACK: Record<string, [string, string, string]> = {
  guias: ["#229ED9", "#1a7db0", "📘"],
  listicles: ["#7B68EE", "#5a4bbf", "🏆"],
  actualidad: ["#e11d48", "#b8153c", "📰"],
  adyacentes: ["#f59e0b", "#c47d09", "💡"],
  general: ["#229ED9", "#1a7db0", "📢"],
};

function thumbData(pillar: string | undefined, category: string): [string, string, string] {
  if (pillar && PILLAR_COLORS[pillar]) return PILLAR_COLORS[pillar];
  return CATEGORY_FALLBACK[category] ?? CATEGORY_FALLBACK.general;
}

export default function BlogHub() {
  const posts = getAllPosts();
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
        <p className="text-slate-600 text-lg">
          {posts.length} guías, tutoriales y listas curadas sobre grupos y canales de Telegram.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts.map((p) => {
          const [c1, c2, emoji] = thumbData(p.pillar, p.category);
          return (
            <article key={p.slug} className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition">
              <Link href={`/blog/${p.slug}`}>
                <div
                  className="h-32 md:h-36 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)` }}
                >
                  <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `radial-gradient(circle at 80% 30%, white 0.5px, transparent 1px)`, backgroundSize: "30px 30px" }} />
                  <span className="text-6xl md:text-7xl relative" aria-hidden="true">{emoji}</span>
                </div>
              </Link>
              <div className="p-5">
                <div className="text-xs text-slate-500 mb-1 uppercase tracking-wide">
                  {p.category} · {p.readingTime} min
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/blog/${p.slug}`} className="hover:text-brand">
                    {p.title}
                  </Link>
                </h2>
                <p className="text-slate-600 text-sm mb-3 line-clamp-2">{p.description}</p>
                <Link href={`/blog/${p.slug}`} className="text-brand text-sm font-medium hover:underline">
                  Leer artículo →
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <AdSlot slot="9012345678" className="my-10" />
    </>
  );
}
