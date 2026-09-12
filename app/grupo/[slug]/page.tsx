import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { formatMiembros, getCategoria, getGrupoBySlug, getPais, grupos, SITE, getGruposByCategoria } from "@/lib/data";
import { getPostsByPillar, getAllPosts } from "@/lib/blog";
import GrupoCard from "@/components/GrupoCard";
import AdSlot from "@/components/AdSlot";
import BlogRelacionado from "@/components/BlogRelacionado";

export function generateStaticParams() {
  return grupos.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const g = getGrupoBySlug(params.slug);
  if (!g) return {};
  return {
    title: `${g.nombre} — Grupo de Telegram (${formatMiembros(g.miembros)} miembros)`,
    description: g.descripcion.slice(0, 155),
    alternates: { canonical: `${SITE.url}/grupo/${g.slug}` },
    openGraph: { title: g.nombre, description: g.descripcion, type: "website" },
  };
}

export default function GrupoPage({ params }: { params: { slug: string } }) {
  const g = getGrupoBySlug(params.slug);
  if (!g) notFound();
  const cat = getCategoria(g.categoria);
  const pais = getPais(g.pais);
  const relacionados = getGruposByCategoria(g.categoria).filter((x) => x.slug !== g.slug).slice(0, 3);
  const blogPosts = [
    ...getPostsByPillar(g.categoria, 2),
    ...getAllPosts().filter((p) => !p.pillar).slice(0, 2),
  ].slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: g.nombre,
    description: g.descripcion,
    url: g.link,
    memberOf: cat ? { "@type": "Thing", name: cat.nombre } : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
      cat && { "@type": "ListItem", position: 2, name: cat.nombre, item: `${SITE.url}/categoria/${cat.slug}` },
      { "@type": "ListItem", position: 3, name: g.nombre, item: `${SITE.url}/grupo/${g.slug}` },
    ].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

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

      {/* CONTEXTO EDITORIAL */}
      {cat && (
        <section className="bg-white border border-slate-200 rounded-lg p-6 mb-8 prose max-w-none">
          <h2>Sobre este grupo de {cat.nombre}</h2>
          <p>
            <strong>{g.nombre}</strong> es una comunidad de Telegram enfocada a {cat.nombre.toLowerCase()}
            {pais ? ` con audiencia principal en ${pais.nombre}` : " para hispanohablantes de todo el mundo"}.
            Al unirte podrás participar en la conversación
            {g.miembros > 10000 ? ` con ${formatMiembros(g.miembros)}+ miembros activos` : " en una comunidad enfocada"},
            enterarte de novedades del nicho y hacer networking con personas que comparten tus intereses.
          </p>
          <p>
            Recuerda configurar tu privacidad en Telegram antes de unirte a cualquier grupo público: ve a <em>Configuración → Privacidad y seguridad → Número de teléfono</em> y elige "Nadie" para que tu número no sea visible. Si el grupo tiene mucho volumen de mensajes, silencia las notificaciones desde el primer día para no saturarte.
          </p>
          <p>
            Si buscas más comunidades similares, revisa el <Link href={`/categoria/${cat.slug}`}>directorio completo de {cat.nombre}</Link>
            {pais && <> o filtra por <Link href={`/pais/${pais.slug}`}>grupos de {pais.nombre}</Link></>}.
            También puedes explorar todas las <Link href="/#categorias">categorías del directorio</Link> o leer nuestras <Link href="/blog">guías del blog</Link> para sacar más partido a Telegram.
          </p>
        </section>
      )}

      {/* GRUPOS RELACIONADOS */}
      {relacionados.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Otros grupos de {cat?.nombre.toLowerCase()} que te pueden interesar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relacionados.map((r) => <GrupoCard key={r.slug} grupo={r} />)}
          </div>
          {cat && (
            <div className="mt-4 text-center">
              <Link href={`/categoria/${cat.slug}`} className="text-brand hover:underline text-sm font-medium">
                Ver los {getGruposByCategoria(cat.slug).length} grupos de {cat.nombre} →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* BLOG RELACIONADO */}
      <BlogRelacionado posts={blogPosts} title="Guías del blog para sacar más partido a Telegram" />

      {/* CTA final */}
      <section className="mt-10 text-sm text-slate-600 bg-slate-50 rounded-lg p-6 border border-slate-200">
        <p>
          ¿Administras un grupo o canal parecido? <Link href="/anadir-grupo" className="text-brand hover:underline font-medium">Añádelo gratis al directorio</Link> y llega a miles de usuarios buscando comunidades de {cat?.nombre.toLowerCase() ?? "Telegram"}. Revisamos manualmente en 24-48h. Y si ya administras uno, no te pierdas nuestro <Link href="/bots" className="text-brand hover:underline">directorio de bots de Telegram</Link> con más de 30 herramientas de moderación, antispam, IA y estadísticas.
        </p>
      </section>
    </>
  );
}
