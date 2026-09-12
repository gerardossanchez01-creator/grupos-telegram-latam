import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIAS, getCategoria, getGruposByCategoria, PAISES, SITE, formatMiembros } from "@/lib/data";
import { PILARES_SLUGS } from "@/data/pilares";
import { getPostsByPillar, getAllPosts } from "@/lib/blog";
import GrupoCard from "@/components/GrupoCard";
import AdSlot from "@/components/AdSlot";
import FAQBlock from "@/components/FAQBlock";
import BlogRelacionado from "@/components/BlogRelacionado";
import { faqParaCategoria } from "@/data/faqs";

export function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = getCategoria(params.slug);
  if (!cat) return {};
  const count = getGruposByCategoria(cat.slug).length;
  return {
    title: `Grupos de Telegram de ${cat.nombre} (${count}+) — Verificados y activos`,
    description: `Encuentra los mejores grupos y canales de Telegram sobre ${cat.nombre.toLowerCase()}. ${cat.descripcion} Directorio actualizado a diario.`,
    alternates: { canonical: `${SITE.url}/categoria/${cat.slug}` },
  };
}

export default function CategoriaPage({ params }: { params: { slug: string } }) {
  const cat = getCategoria(params.slug);
  if (!cat) notFound();
  const items = getGruposByCategoria(cat.slug);
  const relatedPosts = [...getPostsByPillar(cat.slug, 4), ...getAllPosts().filter(p => !p.pillar).slice(0, 2)].slice(0, 4);
  const isPilar = (PILARES_SLUGS as readonly string[]).includes(cat.slug);
  const otrasCategorias = CATEGORIAS.filter((c) => c.slug !== cat.slug).slice(0, 8);
  const totalMiembros = items.reduce((sum, g) => sum + g.miembros, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.slice(0, 20).map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/grupo/${g.slug}`,
      name: g.nombre,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
      { "@type": "ListItem", position: 2, name: cat.nombre, item: `${SITE.url}/categoria/${cat.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-brand">Inicio</Link> /{" "}
        <Link href="/#categorias" className="hover:text-brand">Categorías</Link> /{" "}
        <span>{cat.nombre}</span>
      </nav>

      {/* HERO */}
      <header className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">{cat.emoji}</span>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Grupos de Telegram de {cat.nombre}
            </h1>
            <p className="text-slate-600 text-lg">{cat.descripcion}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-slate-500 mt-4 pt-4 border-t border-slate-100">
          <span>📊 <strong>{items.length}</strong> grupos verificados</span>
          <span>👥 <strong>{formatMiembros(totalMiembros)}+</strong> miembros combinados</span>
          <span>✅ Actualizado a diario</span>
        </div>
      </header>

      {/* INTRO SEO */}
      <section className="prose max-w-none mb-8 bg-slate-50 rounded-lg p-6 border border-slate-200">
        <p className="text-slate-700 lead">
          En esta página encontrarás los mejores <strong>grupos y canales de Telegram sobre {cat.nombre.toLowerCase()}</strong> del ecosistema hispanohablante. Todos verificados manualmente y ordenados por número de miembros activos. Si administras una comunidad del sector, puedes <Link href="/anadir-grupo">añadirla gratis al directorio</Link>. Para descubrir grupos de otros temas explora también nuestras <Link href="/#categorias">18 categorías</Link> o filtra <Link href="/#por-pais">por país</Link>.
        </p>
      </section>

      <AdSlot slot="2345678901" className="mb-8" />

      {/* LISTADO */}
      {items.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-slate-600">
          <p>Todavía no hay grupos publicados en esta categoría. Si conoces alguno, <Link href="/anadir-grupo" className="text-brand underline">añádelo gratis</Link>.</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">{items.length} grupos y canales verificados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((g) => <GrupoCard key={g.slug} grupo={g} />)}
          </div>
        </>
      )}

      {/* PILARES: enlaces geo */}
      {isPilar && (
        <section className="mt-12 bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Grupos de {cat.nombre} por país</h2>
          <p className="text-slate-600 mb-4">Cada país tiene sus propios canales locales, con contenido, monedas y horarios adaptados. Elige el tuyo:</p>
          <div className="flex flex-wrap gap-2">
            {PAISES.map((p) => (
              <Link
                key={p.slug}
                href={`/categoria/${cat.slug}/en/${p.slug}`}
                className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm hover:border-brand hover:bg-white"
              >
                {cat.nombre} en {p.nombre}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* BLOG RELACIONADO */}
      <BlogRelacionado
        posts={relatedPosts}
        title={`Guías del blog sobre ${cat.nombre.toLowerCase()} y Telegram`}
      />

      <AdSlot slot="3456789012" className="my-8" />

      {/* CONTENIDO EDITORIAL EXTENDIDO */}
      <section className="prose max-w-none bg-white rounded-lg p-6 md:p-8 border border-slate-200">
        <h2>¿Por qué unirse a grupos de Telegram sobre {cat.nombre.toLowerCase()}?</h2>
        <p>
          Los grupos de Telegram sobre <strong>{cat.nombre.toLowerCase()}</strong> son una de las formas más rápidas de conectar con personas que comparten tus intereses. A diferencia de foros tradicionales o redes sociales con algoritmo, aquí ves los mensajes en tiempo real, sin filtros ni publicidad intercalada. Puedes preguntar, aportar, descubrir recursos y hacer networking sin depender de que alguien te vea en LinkedIn o Twitter.
        </p>
        <p>
          En esta selección incluimos tanto <strong>grupos de chat</strong> (bidireccionales, hasta 200.000 miembros) como <strong>canales de difusión</strong> (unidireccionales, miembros ilimitados). Los canales son ideales si solo quieres consumir información; los grupos, si quieres participar en la conversación. La mayoría de comunidades serias tienen ambos, así que únete al que mejor encaje con tu forma de usar Telegram.
        </p>

        <h2>Cómo elegir el mejor grupo de {cat.nombre.toLowerCase()}</h2>
        <ol>
          <li><strong>Miembros activos, no totales</strong>. Un grupo con 100.000 miembros y 3 mensajes al día está muerto. Revisa la actividad reciente antes de unirte.</li>
          <li><strong>Reglas fijadas</strong>. Los grupos serios tienen normas claras al inicio. Los grupos sin reglas suelen ser tierra de spammers.</li>
          <li><strong>Admins visibles</strong>. Si los admins son cuentas anónimas de 2 semanas, huye. Los buenos admins tienen historial y perfil.</li>
          <li><strong>Bots antispam</strong>. Los grupos que aceptan a cualquiera sin CAPTCHA se llenan de publicidad de casinos y cripto en 24 horas.</li>
          <li><strong>Ratio contenido/promoción</strong>. Un grupo donde el 80% son enlaces afiliados o autopromoción no aporta valor real.</li>
        </ol>

        <h2>Errores comunes al unirse a grupos de {cat.nombre.toLowerCase()}</h2>
        <ul>
          <li>Unirse a 20 grupos del mismo nicho: es ruido puro. Elige 2-3 buenos y silencia los demás.</li>
          <li>Compartir tu número de teléfono al primer contacto: configura tu privacidad antes de unirte.</li>
          <li>Confiar en mensajes privados de "admins" con ofertas exclusivas: casi siempre son estafas.</li>
          <li>Descargar archivos o instalar apps que compartan en el grupo sin verificar: mucho malware disfrazado.</li>
          <li>Aceptar todos los enlaces sin revisar: los grupos con enlaces acortados sin contexto suelen ser trampa.</li>
        </ul>

        <h2>Otras categorías que te pueden interesar</h2>
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {otrasCategorias.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center hover:border-brand hover:bg-white transition"
            >
              <div className="text-2xl mb-1">{c.emoji}</div>
              <div className="text-sm font-medium">{c.nombre}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FAQBlock faqs={faqParaCategoria(cat.nombre, cat.slug)} />

      {/* Cierre con enlaces internos */}
      <section className="mt-8 text-sm text-slate-600 bg-slate-50 rounded-lg p-6 border border-slate-200">
        <p>
          ¿Quieres explorar más? Vuelve al <Link href="/" className="text-brand hover:underline">inicio del directorio</Link>, revisa las <Link href="/#categorias" className="text-brand hover:underline">18 categorías</Link>, filtra <Link href="/#por-pais" className="text-brand hover:underline">por país</Link> o consulta las <Link href="/blog" className="text-brand hover:underline">guías completas del blog</Link>. Si eres administrador de una comunidad de {cat.nombre.toLowerCase()}, <Link href="/anadir-grupo" className="text-brand hover:underline">añade tu grupo gratis</Link>.
        </p>
      </section>
    </>
  );
}
