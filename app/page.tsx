import Link from "next/link";
import { CATEGORIAS, PAISES, grupos, SITE } from "@/lib/data";
import GrupoCard from "@/components/GrupoCard";
import AdSlot from "@/components/AdSlot";

export default function Home() {
  const recientes = [...grupos]
    .sort((a, b) => (a.fechaAgregado < b.fechaAgregado ? 1 : -1))
    .slice(0, 12);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/buscar?q={query}`,
      "query-input": "required name=query",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="text-center py-8 md:py-14 mb-8 bg-gradient-to-br from-brand to-brand-dark rounded-xl text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          Grupos de Telegram en Español
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto px-4">
          Directorio con los mejores grupos y canales de Telegram para México, LatAm y España. Actualizado a diario.
        </p>
      </section>

      <section id="categorias" className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Explorar por categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {CATEGORIAS.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="bg-white border border-slate-200 rounded-lg p-3 text-center hover:border-brand hover:shadow-sm transition"
            >
              <div className="text-2xl mb-1">{c.emoji}</div>
              <div className="text-sm font-medium">{c.nombre}</div>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot slot="1234567890" className="my-8" />

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Últimos grupos añadidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recientes.map((g) => <GrupoCard key={g.slug} grupo={g} />)}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Por país</h2>
        <div className="flex flex-wrap gap-2">
          {PAISES.map((p) => (
            <Link
              key={p.slug}
              href={`/pais/${p.slug}`}
              className="bg-white border border-slate-200 rounded-full px-4 py-2 text-sm hover:border-brand"
            >
              {p.nombre}
            </Link>
          ))}
        </div>
      </section>

      <section className="prose max-w-none bg-white rounded-lg p-6 border border-slate-200">
        <h2>¿Qué son los grupos de Telegram?</h2>
        <p>
          Los grupos de Telegram son comunidades públicas o privadas donde miles de personas pueden chatear en tiempo real sobre un tema común. A diferencia de WhatsApp, un grupo de Telegram puede tener hasta <strong>200,000 miembros</strong>, y los canales admiten un número ilimitado de suscriptores.
        </p>
        <h2>Cómo unirse a un grupo</h2>
        <ol>
          <li>Elige un grupo del directorio.</li>
          <li>Haz clic en el botón <em>Unirse</em>.</li>
          <li>Se abrirá la app de Telegram y podrás confirmar tu ingreso.</li>
        </ol>
      </section>
    </>
  );
}
