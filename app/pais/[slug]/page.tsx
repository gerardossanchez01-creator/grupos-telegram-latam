import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGruposByPais, getPais, PAISES, SITE } from "@/lib/data";
import GrupoCard from "@/components/GrupoCard";

export function generateStaticParams() {
  return PAISES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pais = getPais(params.slug);
  if (!pais) return {};
  return {
    title: `Grupos de Telegram de ${pais.nombre}`,
    description: `Directorio de grupos y canales de Telegram populares en ${pais.nombre}.`,
    alternates: { canonical: `${SITE.url}/pais/${pais.slug}` },
  };
}

export default function PaisPage({ params }: { params: { slug: string } }) {
  const pais = getPais(params.slug);
  if (!pais) notFound();
  const items = getGruposByPais(pais.slug);

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          📍 Grupos de Telegram de {pais.nombre}
        </h1>
        <p className="text-slate-600 text-lg">
          Comunidades activas de Telegram en {pais.nombre}, organizadas por categoría.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="text-slate-500">Todavía no hay grupos añadidos para este país.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((g) => <GrupoCard key={g.slug} grupo={g} />)}
        </div>
      )}
    </>
  );
}
