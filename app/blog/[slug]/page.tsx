import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, getRelatedPosts, splitHtmlByMarker } from "@/lib/blog";
import { SITE } from "@/lib/data";
import AdSlot from "@/components/AdSlot";
import CTABox from "@/components/CTABox";
import PostHero from "@/components/PostHero";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = getPostBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `${SITE.url}/blog/${p.slug}` },
    openGraph: { title: p.title, description: p.description, type: "article" },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const related = getRelatedPosts(post);
  const { first, second } = splitHtmlByMarker(post.html);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    wordCount: post.wordCount,
  };

  const faqJsonLd = post.faq && post.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-brand">Inicio</Link> /{" "}
        <Link href="/blog" className="hover:text-brand">Blog</Link> /{" "}
        <span>{post.title}</span>
      </nav>

      <PostHero title={post.title} pillar={post.pillar} category={post.category} readingTime={post.readingTime} />

      <article className="bg-white rounded-xl border border-slate-200 p-6 md:p-10">
        <div className="text-xs text-slate-500 mb-2 uppercase tracking-wide">
          {post.category} · {post.readingTime} min de lectura · {post.wordCount} palabras
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg text-slate-600 mb-8">{post.description}</p>

        <div
          className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-brand"
          dangerouslySetInnerHTML={{ __html: first }}
        />

        {post.midCta && <CTABox {...post.midCta} />}

        {second && (
          <div
            className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-brand"
            dangerouslySetInnerHTML={{ __html: second }}
          />
        )}

        {post.faq && post.faq.length > 0 && (
          <section className="mt-10 border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {post.faq.map((f, i) => (
                <details key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-200 group">
                  <summary className="font-semibold cursor-pointer text-slate-900 group-open:text-brand">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-slate-700">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {post.finalCta && <CTABox {...post.finalCta} />}
      </article>

      <AdSlot slot="4567890123" className="my-8" />

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Sigue leyendo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-brand hover:shadow-sm transition"
              >
                <div className="text-xs text-slate-500 mb-1">{r.category}</div>
                <div className="font-semibold text-slate-900">{r.title}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
