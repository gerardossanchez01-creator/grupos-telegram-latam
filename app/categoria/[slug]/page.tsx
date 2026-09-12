import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIAS, getCategoria, getGruposByCategoria, PAISES, SITE } from "@/lib/data";
import { PILARES_SLUGS } from "@/data/pilares";
import GrupoCard from "@/components/GrupoCard";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = getCategoria(params.slug);
  if (!cat) return {};
  const count = getGruposByCategoria(cat.slug).length;
  return {
    title: `Grupos de Telegram de ${cat.nombre} (${count}+) — Actualizado`,
    description: `Encuentra los mejores grupos y canales de Telegram sobre ${cat.nombre.toLowerCase()}. ${cat.descripcion}`,
    alternates: { canonical: `${SITE.url}/categoria/${cat.slug}` },
  };
}

export default function CategoriaPage({ params }: { params: { slug: string } }) {
  const cat = getCategoria(params.slug);
  if (!cat) notFound();
  const items = getGruposByCategoria(cat.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/grupo/${g.slug}`,
      name: g.nombre,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-slate-500 mb-4">
        <a href="/" className="hover:text-brand">Inicio</a> / <span>{cat.nombre}</span>
      </nav>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {cat.emoji} Grupos de Telegram de {cat.nombre}
        </h1>
        <p className="text-slate-600 text-lg">{cat.descripcion}</p>
      </header>

      <AdSlot slot="2345678901" className="mb-8" />

      {items.length === 0 ? (
        <p className="text-slate-500">Todavía no hay grupos en esta categoría. <a href="/anadir-grupo" className="text-brand underline">¡Añade el primero!</a></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((g) => <GrupoCard key={g.slug} grupo={g} />)}
        </div>
      )}

      {(PILARES_SLUGS as readonly string[]).includes(cat.slug) && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Grupos de {cat.nombre} por país</h2>
          <div className="flex flex-wrap gap-2">
            {PAISES.map((p) => (
              <Link
                key={p.slug}
                href={`/categoria/${cat.slug}/en/${p.slug}`}
                className="bg-white border border-slate-200 rounded-full px-4 py-2 text-sm hover:border-brand"
              >
                {cat.nombre} en {p.nombre}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="prose max-w-none mt-12 bg-white rounded-lg p-6 border border-slate-200">
        <h2>Sobre los grupos de {cat.nombre} en Telegram</h2>
        <p>
          Los grupos de Telegram sobre <strong>{cat.nombre.toLowerCase()}</strong> son una forma rápida de conectar con personas que comparten tus intereses. Todos los grupos que ves aquí son verificados manualmente y actualizados con frecuencia para asegurar que los enlaces funcionen.
        </p>
      </section>
    </>
  );
}
