import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — Guías y listas de grupos de Telegram",
  description: "Guías prácticas, listas curadas y trucos para sacar el máximo partido a Telegram: cómo buscar grupos, crearlos, mejores comunidades por tema.",
  alternates: { canonical: `${SITE.url}/blog` },
};

export default function BlogHub() {
  const posts = getAllPosts();
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
        <p className="text-slate-600 text-lg">
          Guías, tutoriales y listas curadas sobre grupos y canales de Telegram.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts.map((p) => (
          <article key={p.slug} className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md transition">
            <div className="text-xs text-slate-500 mb-1 uppercase tracking-wide">
              {p.category} · {p.readingTime} min
            </div>
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/blog/${p.slug}`} className="hover:text-brand">
                {p.title}
              </Link>
            </h2>
            <p className="text-slate-600 text-sm mb-3">{p.description}</p>
            <Link href={`/blog/${p.slug}`} className="text-brand text-sm font-medium hover:underline">
              Leer artículo →
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
