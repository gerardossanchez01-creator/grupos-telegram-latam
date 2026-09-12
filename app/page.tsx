import Link from "next/link";
import { CATEGORIAS, PAISES, grupos, SITE, formatMiembros } from "@/lib/data";
import { PILARES_SLUGS } from "@/data/pilares";
import { getFeaturedPosts } from "@/lib/blog";
import GrupoCard from "@/components/GrupoCard";
import AdSlot from "@/components/AdSlot";
import FAQBlock from "@/components/FAQBlock";
import BlogRelacionado from "@/components/BlogRelacionado";
import { HOME_FAQ } from "@/data/faqs";

export default function Home() {
  const recientes = [...grupos]
    .sort((a, b) => (a.fechaAgregado < b.fechaAgregado ? 1 : -1))
    .slice(0, 12);

  const populares = [...grupos].sort((a, b) => b.miembros - a.miembros).slice(0, 6);
  const featuredPosts = getFeaturedPosts(6);

  const pilaresData = PILARES_SLUGS.map((slug) => {
    const cat = CATEGORIAS.find((c) => c.slug === slug)!;
    const gruposDelPilar = grupos.filter((g) => g.categoria === slug);
    return { ...cat, count: gruposDelPilar.length };
  });

  const totalGrupos = grupos.length;
  const totalMiembros = grupos.reduce((sum, g) => sum + g.miembros, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/buscar?q={query}`,
      "query-input": "required name=query",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="text-center py-10 md:py-16 mb-10 bg-gradient-to-br from-brand to-brand-dark rounded-xl text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 px-4">
          Grupos de Telegram en Español
        </h1>
        <p className="text-lg md:text-xl opacity-95 max-w-3xl mx-auto px-4 mb-6">
          El directorio más completo de grupos y canales de Telegram para México, LatAm y España. {totalGrupos}+ comunidades verificadas manualmente y actualizadas a diario.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base opacity-90 px-4">
          <span>✅ {totalGrupos}+ grupos activos</span>
          <span>👥 {formatMiembros(totalMiembros)}+ miembros combinados</span>
          <span>🌎 8 países LatAm + España</span>
          <span>📚 {featuredPosts.length}+ guías en el blog</span>
        </div>
      </section>

      {/* INTRO SEO */}
      <section className="mb-10 prose max-w-none bg-white rounded-lg p-6 md:p-8 border border-slate-200">
        <p className="lead text-lg text-slate-700">
          Bienvenido al mayor <strong>directorio de grupos de Telegram en español</strong>. Aquí encuentras comunidades activas sobre <Link href="/categoria/ofertas-y-chollos">ofertas y chollos</Link>, <Link href="/categoria/criptomonedas">criptomonedas</Link>, <Link href="/categoria/empleo-y-freelance">empleo remoto</Link>, <Link href="/categoria/programacion">programación</Link>, <Link href="/categoria/gaming">gaming</Link>, <Link href="/categoria/anime-y-manga">anime</Link>, <Link href="/categoria/idiomas">aprender idiomas</Link> y muchos temas más. Cada grupo está verificado manualmente para asegurar que el enlace funciona y que la comunidad está activa.
        </p>
        <p>
          Si eres nuevo en Telegram, empieza por nuestras guías de <Link href="/blog/como-buscar-grupos-de-telegram">cómo buscar grupos</Link> y <Link href="/blog/como-unirse-grupo-telegram">cómo unirte</Link> paso a paso. Si administras tu propia comunidad, puedes <Link href="/anadir-grupo">añadir tu grupo gratis</Link> a nuestro directorio.
        </p>
      </section>

      {/* CATEGORÍAS PILARES DESTACADAS */}
      <section id="pilares" className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Categorías destacadas</h2>
        <p className="text-slate-600 mb-6">Los 6 pilares del directorio: los nichos con más comunidad, actualización constante y valor real.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pilaresData.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-brand hover:shadow-md transition"
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="text-3xl">{c.emoji}</span>
                <div>
                  <div className="font-bold text-lg text-slate-900">{c.nombre}</div>
                  <div className="text-xs text-slate-500">{c.count} grupos verificados</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 line-clamp-3">{c.descripcion}</p>
              <div className="mt-3 text-brand text-sm font-medium">Ver directorio →</div>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot slot="1234567890" className="my-8" />

      {/* TODAS LAS CATEGORÍAS */}
      <section id="categorias" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Todas las categorías</h2>
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

      {/* GRUPOS MÁS POPULARES */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Grupos más populares</h2>
        <p className="text-slate-600 mb-4">Los canales de Telegram con más miembros en el directorio, ordenados por comunidad.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {populares.map((g) => <GrupoCard key={g.slug} grupo={g} />)}
        </div>
      </section>

      {/* ÚLTIMOS AÑADIDOS */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Últimos grupos añadidos</h2>
        <p className="text-slate-600 mb-4">Comunidades incorporadas recientemente al directorio, todas verificadas manualmente.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recientes.map((g) => <GrupoCard key={g.slug} grupo={g} />)}
        </div>
      </section>

      {/* BLOG DESTACADO */}
      <BlogRelacionado posts={featuredPosts} title="Guías populares del blog" />

      <AdSlot slot="9876543210" className="my-8" />

      {/* POR PAÍS */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Explorar por país</h2>
        <p className="text-slate-600 mb-4">Cada país tiene su propio ecosistema de Telegram: horarios, jerga, monedas y ofertas locales. Elige el tuyo:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PAISES.map((p) => {
            const count = grupos.filter((g) => g.pais === p.slug).length;
            return (
              <Link
                key={p.slug}
                href={`/pais/${p.slug}`}
                className="bg-white border border-slate-200 rounded-lg p-4 text-center hover:border-brand hover:shadow-sm transition"
              >
                <div className="font-semibold">{p.nombre}</div>
                <div className="text-xs text-slate-500 mt-1">{count} grupos</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CONTENIDO EDITORIAL EXTENSO SEO */}
      <section className="mb-12 prose max-w-none bg-white rounded-lg p-6 md:p-8 border border-slate-200">
        <h2>¿Por qué usar un directorio de grupos de Telegram?</h2>
        <p>
          Telegram tiene más de <strong>1.000 millones de usuarios activos</strong> en 2026, pero la app no te sugiere grupos automáticamente. A diferencia de Instagram o TikTok, aquí no hay algoritmo de descubrimiento: si no sabes qué grupo buscar, tu Telegram está prácticamente vacío. Por eso los directorios curados son la forma más eficiente de encontrar comunidades reales, activas y del tema que te interesa.
        </p>
        <p>
          Nuestro directorio se diferencia en que <strong>filtramos manualmente el contenido</strong>. Nada de spam, contenido adulto, apuestas, piratería o estafas. Solo comunidades que aportan valor real: ofertas verificadas, canales de noticias serios, grupos de aprendizaje, redes de empleo y grupos de nicho activos.
        </p>

        <h2>Qué encontrarás aquí</h2>
        <ul>
          <li><strong><Link href="/categoria/ofertas-y-chollos">Ofertas y chollos</Link></strong>: canales que avisan de descuentos de Amazon, MercadoLibre, AliExpress y grandes tiendas en tiempo real. Ideal si quieres cazar chollos antes que nadie.</li>
          <li><strong><Link href="/categoria/criptomonedas">Criptomonedas</Link></strong>: comunidades de Bitcoin, Ethereum, DeFi y trading educativo. Filtradas para evitar shilling y esquemas piramidales.</li>
          <li><strong><Link href="/categoria/empleo-y-freelance">Empleo y freelance</Link></strong>: ofertas remotas para LatAm y España, muchas veces publicadas antes que en LinkedIn.</li>
          <li><strong><Link href="/categoria/programacion">Programación</Link></strong>: grupos por lenguaje (JavaScript, Python, Go, Rust), IA, DevOps y ciberseguridad.</li>
          <li><strong><Link href="/categoria/gaming">Gaming</Link></strong>: comunidades por juego (Free Fire, Valorant, Fortnite), squads y códigos de canje.</li>
          <li><strong><Link href="/categoria/anime-y-manga">Anime y manga</Link></strong>: recomendaciones por género, discusión de temporada actual y comunidades otaku.</li>
          <li><strong><Link href="/categoria/idiomas">Idiomas</Link></strong>: canales para practicar inglés, japonés, alemán con nativos.</li>
          <li>Y también <Link href="/categoria/marketing-digital">marketing digital</Link>, <Link href="/categoria/viajes">viajes</Link>, <Link href="/categoria/emprendimiento">emprendimiento</Link>, <Link href="/categoria/fitness-y-salud">fitness</Link>, <Link href="/categoria/libros-y-lectura">libros</Link>, <Link href="/categoria/series-y-peliculas">series</Link>, <Link href="/categoria/diseno-y-arte">diseño</Link>, <Link href="/categoria/musica">música</Link>, <Link href="/categoria/deportes">deportes</Link> y más.</li>
        </ul>

        <h2>Cómo aprovechar el directorio</h2>
        <ol>
          <li><strong>Empieza por 2-3 categorías que te interesen</strong>. No te unas a 50 grupos a la vez, es ruido puro. Elige los que aporten valor y silencia los demás.</li>
          <li><strong>Usa los enlaces por país</strong> si vives en <Link href="/pais/mexico">México</Link>, <Link href="/pais/argentina">Argentina</Link>, <Link href="/pais/colombia">Colombia</Link> o <Link href="/pais/espana">España</Link>. Los grupos locales te dan ofertas y contenido adaptado a tu contexto.</li>
          <li><strong>Lee las guías del blog</strong> antes de tu primera semana. La guía sobre <Link href="/blog/como-crear-grupo-telegram">cómo crear un grupo</Link> te sirve incluso si solo vas a unirte a los ajenos: entenderás mejor cómo funcionan.</li>
          <li><strong>Configura tu privacidad</strong> en Telegram antes de unirte a nada público: oculta tu número, última conexión y foto de perfil para usuarios que no conoces.</li>
          <li><strong>Reporta grupos rotos</strong>: si encuentras uno cuyo enlace ha caducado, avísanos. Actualizamos el directorio cada semana.</li>
        </ol>

        <h2>Ventajas de Telegram frente a otras plataformas</h2>
        <p>
          Muchos usuarios se preguntan por qué elegir Telegram si ya tienen WhatsApp, Discord o grupos de Facebook. Las ventajas son claras:
        </p>
        <ul>
          <li><strong>Capacidad enorme</strong>: hasta 200.000 miembros por grupo (WhatsApp permite 1.024), canales ilimitados.</li>
          <li><strong>Sin algoritmo</strong>: ves los mensajes en orden cronológico, no lo que un algoritmo decida mostrarte.</li>
          <li><strong>Multiplataforma real</strong>: sincroniza al instante entre móvil, PC, tablet y web sin límite de sesiones.</li>
          <li><strong>Bots potentes</strong>: automatización, moderación, alertas por keyword, integraciones con APIs externas.</li>
          <li><strong>Búsqueda interna</strong>: cualquier mensaje viejo se encuentra con Ctrl+F, hasta años atrás.</li>
          <li><strong>Cifrado y privacidad</strong>: puedes usarlo sin revelar tu número si configuras bien la app.</li>
        </ul>
        <p>
          Si quieres saber más sobre las <Link href="/blog/alternativas-a-whatsapp-por-que-elegir-telegram">ventajas de Telegram vs WhatsApp</Link>, tenemos una guía dedicada.
        </p>
      </section>

      {/* FAQ */}
      <FAQBlock faqs={HOME_FAQ} />
    </>
  );
}
