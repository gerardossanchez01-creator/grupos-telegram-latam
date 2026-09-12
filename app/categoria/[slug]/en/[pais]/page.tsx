import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIAS, getCategoria, getPais, grupos, PAISES, SITE } from "@/lib/data";
import { PILARES_SLUGS } from "@/data/pilares";
import GrupoCard from "@/components/GrupoCard";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() {
  const out: { slug: string; pais: string }[] = [];
  for (const pilar of PILARES_SLUGS) {
    for (const pais of PAISES) {
      out.push({ slug: pilar, pais: pais.slug });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; pais: string };
}): Promise<Metadata> {
  const cat = getCategoria(params.slug);
  const pais = getPais(params.pais);
  if (!cat || !pais) return {};
  return {
    title: `Grupos de Telegram de ${cat.nombre} en ${pais.nombre}`,
    description: `Los mejores grupos y canales de Telegram sobre ${cat.nombre.toLowerCase()} para usuarios de ${pais.nombre}. Verificados y actualizados.`,
    alternates: { canonical: `${SITE.url}/categoria/${cat.slug}/en/${pais.slug}` },
  };
}

export default function LongTailPage({
  params,
}: {
  params: { slug: string; pais: string };
}) {
  const cat = getCategoria(params.slug);
  const pais = getPais(params.pais);
  if (!cat || !pais) notFound();

  const filtrados = grupos
    .filter((g) => g.categoria === cat.slug && (g.pais === pais.slug || g.pais === ""))
    .sort((a, b) => b.miembros - a.miembros);

  return (
    <>
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-brand">Inicio</Link> /{" "}
        <Link href={`/categoria/${cat.slug}`} className="hover:text-brand">{cat.nombre}</Link> /{" "}
        <span>{pais.nombre}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {cat.emoji} Grupos de Telegram de {cat.nombre} en {pais.nombre}
        </h1>
        <p className="text-slate-600 text-lg">
          Comunidades activas de {cat.nombre.toLowerCase()} enfocadas a {pais.nombre}, seleccionadas manualmente.
        </p>
      </header>

      <AdSlot slot="5678901234" className="mb-8" />

      {filtrados.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-slate-600">
          <p className="mb-4">
            Todavía no hemos añadido grupos específicos de {cat.nombre.toLowerCase()} para {pais.nombre}. Mientras tanto puedes explorar todos los grupos de la categoría:
          </p>
          <Link
            href={`/categoria/${cat.slug}`}
            className="inline-block bg-brand text-white px-4 py-2 rounded font-medium hover:bg-brand-dark"
          >
            Ver todos los grupos de {cat.nombre}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtrados.map((g) => <GrupoCard key={g.slug} grupo={g} />)}
        </div>
      )}

      <section className="prose max-w-none mt-12 bg-white rounded-lg p-6 border border-slate-200">
        <h2>¿Por qué buscar grupos de Telegram de {cat.nombre.toLowerCase()} en {pais.nombre}?</h2>
        <p>
          Cada país tiene su propio ecosistema. Un grupo de {cat.nombre.toLowerCase()} enfocado a {pais.nombre} te trae contenido, ofertas o discusiones adaptadas a tu contexto local: moneda, horarios, jerga y regulación. Por eso preferimos separarlos en vez de mezclar todo en un único megagrupo global.
        </p>
        <p>
          En este listado solo verás grupos verificados manualmente. Si conoces uno que debería estar aquí, <Link href="/anadir-grupo">añádelo gratis</Link>.
        </p>
      </section>
    </>
  );
}
