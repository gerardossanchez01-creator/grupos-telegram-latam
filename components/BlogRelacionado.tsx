import Link from "next/link";
import type { Post } from "@/lib/blog";

export default function BlogRelacionado({ posts, title = "Guías y artículos relacionados" }: { posts: Post[]; title?: string }) {
  if (posts.length === 0) return null;
  return (
    <section className="mt-10 bg-white border border-slate-200 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="block border border-slate-200 rounded-lg p-4 hover:border-brand hover:shadow-sm transition"
          >
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">
              {p.category} · {p.readingTime} min
            </div>
            <div className="font-semibold text-slate-900 mb-1">{p.title}</div>
            <p className="text-sm text-slate-600 line-clamp-2">{p.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
