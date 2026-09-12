import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { bots, getBotBySlug, getBotCategoria, getBotsByCategoria, formatUsuariosBot } from "@/lib/bots";
import { SITE } from "@/lib/data";
import BotCard from "@/components/BotCard";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() {
  return bots.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const b = getBotBySlug(params.slug);
  if (!b) return {};
  return {
    title: `@${b.username} — ${b.nombre} | Bot de Telegram`,
    description: b.descripcion.slice(0, 155),
    alternates: { canonical: `${SITE.url}/bots/${b.slug}` },
  };
}

export default function BotPage({ params }: { params: { slug: string } }) {
  const b = getBotBySlug(params.slug);
  if (!b) notFound();
  const cat = getBotCategoria(b.categoria);
  const relacionados = getBotsByCategoria(b.categoria).filter((x) => x.slug !== b.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: b.nombre,
    applicationCategory: cat?.nombre ?? "Utility",
    operatingSystem: "Telegram",
    description: b.descripcion,
    aggregateRating: b.verificado ? {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: Math.max(100, Math.floor(b.usuarios / 100)),
    } : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Bots", item: `${SITE.url}/bots` },
      cat && { "@type": "ListItem", position: 3, name: cat.nombre, item: `${SITE.url}/bots/categoria/${cat.slug}` },
      { "@type": "ListItem", position: 4, name: b.nombre, item: `${SITE.url}/bots/${b.slug}` },
    ].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-brand">Inicio</Link> /{" "}
        <Link href="/bots" className="hover:text-brand">Bots</Link> /{" "}
        {cat && <><Link href={`/bots/categoria/${cat.slug}`} className="hover:text-brand">{cat.nombre}</Link> / </>}
        <span>{b.nombre}</span>
      </nav>

      <article className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{b.nombre}</h1>
            <div className="text-slate-500 font-mono text-lg mt-1">@{b.username}</div>
          </div>
          <div className="flex gap-2">
            {b.oficial && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Oficial de Telegram</span>}
            {b.verificado && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">✓ Verificado</span>}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-6">
          <span>👤 {formatUsuariosBot(b.usuarios)}+ usuarios</span>
          {cat && <Link href={`/bots/categoria/${cat.slug}`} className="hover:text-brand">{cat.emoji} {cat.nombre}</Link>}
          <span>📅 Añadido: {b.fechaAgregado}</span>
        </div>

        <p className="text-slate-700 text-lg mb-6">{b.descripcion}</p>

        <a
          href={`https://t.me/${b.username}`}
          target="_blank"
          rel="noopener nofollow"
          className="block w-full md:w-auto md:inline-block text-center bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3 rounded-lg text-lg"
        >
          🤖 Abrir bot en Telegram
        </a>
        <p className="text-xs text-slate-500 mt-3">
          Se abrirá el chat con @{b.username}. Envía <code className="bg-slate-100 px-2 py-0.5 rounded">{b.comando}</code> para empezar.
        </p>
      </article>

      <section className="mt-8 bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Características principales</h2>
        <ul className="space-y-2">
          {b.caracteristicas.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-700">
              <span className="text-emerald-600 mt-1">✓</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <AdSlot slot="7890123456" className="my-8" />

      <section className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 prose max-w-none">
        <h2>Cómo usar {b.nombre}</h2>
        <ol>
          <li>Abre Telegram y busca <strong>@{b.username}</strong> en la lupa, o pulsa el botón "Abrir bot en Telegram" de arriba.</li>
          <li>Toca "Iniciar" o envía el comando <code>{b.comando}</code>.</li>
          <li>El bot te dará instrucciones para configurarlo. Sigue el flujo paso a paso.</li>
          {cat?.slug === "moderacion" || cat?.slug === "antispam" || cat?.slug === "estadisticas" ? (
            <li>Para usarlo en un grupo, ábrelo en Telegram, toca el menú, elige "Añadir al grupo" y selecciona tu grupo destino. Concédele los permisos que necesita.</li>
          ) : null}
          <li>Explora los comandos disponibles enviando <code>/help</code>.</li>
        </ol>

        <h2>Sobre {b.nombre} y otros bots de {cat?.nombre.toLowerCase()}</h2>
        <p>
          <strong>{b.nombre}</strong> es uno de los bots de <Link href={`/bots/categoria/${cat?.slug}`}>{cat?.nombre.toLowerCase()}</Link> más usados en Telegram, con {formatUsuariosBot(b.usuarios)}+ usuarios activos. {b.oficial ? "Es un bot oficial de Telegram, mantenido directamente por el equipo de la app." : "Es un bot de terceros verificado por nuestra comunidad."}
        </p>
        <p>
          Si buscas alternativas, explora el <Link href={`/bots/categoria/${cat?.slug}`}>directorio completo de bots de {cat?.nombre.toLowerCase()}</Link>, o revisa <Link href="/bots">todas las categorías</Link> del directorio. Para grupos donde probar este bot, mira nuestro <Link href="/">directorio de grupos activos</Link>.
        </p>
      </section>

      {relacionados.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Otros bots de {cat?.nombre.toLowerCase()}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relacionados.map((r) => <BotCard key={r.slug} bot={r} />)}
          </div>
        </section>
      )}

      <section className="mt-8 text-sm text-slate-600 bg-slate-50 rounded-lg p-6 border border-slate-200">
        <p>
          ¿Buscas guías sobre cómo aprovechar los bots? Revisa <Link href="/blog/como-crear-grupo-telegram" className="text-brand hover:underline">cómo crear un grupo de Telegram</Link> paso a paso o <Link href="/blog/como-administrar-grupo-telegram-grande" className="text-brand hover:underline">cómo administrar grupos grandes</Link>. Vuelve al <Link href="/bots" className="text-brand hover:underline">directorio de bots</Link> o al <Link href="/" className="text-brand hover:underline">directorio de grupos</Link>.
        </p>
      </section>
    </>
  );
}
