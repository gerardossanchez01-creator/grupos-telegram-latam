import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { formatMiembros, getCategoria, getGrupoBySlug, getPais, grupos, SITE, getGruposByCategoria } from "@/lib/data";
import GrupoCard from "@/components/GrupoCard";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() {
  return grupos.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const g = getGrupoBySlug(params.slug);
  if (!g) return {};
  return {
    title: `${g.nombre} — Grupo de Telegram (${formatMiembros(g.miembros)} miembros)`,
    description: g.descripcion,
    alternates: { canonical: `${SITE.url}/grupo/${g.slug}` },
  };
}

export default function GrupoPage({ params }: { params: { slug: string } }) {
  const g = getGrupoBySlug(params.slug);
  if (!g) notFound();
  const cat = getCategoria(g.categoria);
  const pais = getPais(g.pais);
  const relacionados = getGruposByCategoria(g.categoria).filter((x) => x.slug !== g.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: g.nombre,
    description: g.descripcion,
    url: g.link,
    memberOf: cat ? { "@type": "Thing", name: cat.nombre } : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-brand">Inicio</Link> /{" "}
        {cat && <><Link href={`/categoria/${cat.slug}`} className="hover:text-brand">{cat.nombre}</Link> / </>}
        <span>{g.nombre}</span>
      </nav>

      <article className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h1 className="text-2xl md:text-3xl font-bold">{g.nombre}</h1>
          {g.verificado && (
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded whitespace-nowrap">✓ Verificado</span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-slate-600 mb-6">
          <span>👥 {formatMiembros(g.miembros)} miembros</span>
          {cat && <Link href={`/categoria/${cat.slug}`} className="hover:text-brand">{cat.emoji} {cat.nombre}</Link>}
          {pais && <Link href={`/pais/${pais.slug}`} className="hover:text-brand">📍 {pais.nombre}</Link>}
          <span>📅 Añadido: {g.fechaAgregado}</span>
        </div>

        <p className="text-slate-700 text-lg mb-6">{g.descripcion}</p>

        <a
          href={g.link}
          target="_blank"
          rel="noopener nofollow"
          className="block w-full md:w-auto md:inline-block text-center bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3 rounded-lg text-lg"
        >
          🚀 Unirme al grupo en Telegram
        </a>
        <p className="text-xs text-slate-500 mt-3">
          Se abrirá la app de Telegram. El enlace es directo al grupo original en {g.link}.
        </p>
      </article>

      <AdSlot slot="3456789012" className="my-8" />

      {relacionados.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Otros grupos que te pueden interesar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relacionados.map((r) => <GrupoCard key={r.slug} grupo={r} />)}
          </div>
        </section>
      )}
    </>
  );
}
