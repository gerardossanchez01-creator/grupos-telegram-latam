import type { Metadata } from "next";
import Link from "next/link";
import { bots, BOT_CATEGORIAS, formatUsuariosBot } from "@/lib/bots";
import { SITE } from "@/lib/data";
import BotCard from "@/components/BotCard";
import AdSlot from "@/components/AdSlot";
import FAQBlock from "@/components/FAQBlock";

export const metadata: Metadata = {
  title: "Los mejores bots de Telegram: directorio con 30+ bots útiles",
  description: "Directorio curado de los mejores bots de Telegram: moderación, antispam, IA, descargas, música, utilidades y más. Todos verificados manualmente.",
  alternates: { canonical: `${SITE.url}/bots` },
};

const BOT_FAQ = [
  {
    q: "¿Qué es un bot de Telegram?",
    a: "Un bot de Telegram es una cuenta automatizada gestionada por software que responde comandos y ejecuta tareas. Puede moderar grupos, buscar información, integrar con servicios externos (Notion, GitHub, IFTTT), generar contenido con IA y mucho más. Se identifican con @ como cualquier usuario y muchos son gratis.",
  },
  {
    q: "¿Cómo añado un bot a mi grupo?",
    a: "Busca el bot por su @username, ábrelo, toca el menú y elige 'Añadir al grupo'. Selecciona tu grupo y el bot pedirá los permisos que necesita (moderador, admin, etc.). Concédele solo los permisos mínimos necesarios por seguridad.",
  },
  {
    q: "¿Los bots de Telegram son gratis?",
    a: "La mayoría son gratis totalmente o freemium (funciones básicas gratis, extras de pago). Los bots oficiales de Telegram (BotFather, Stickers, GIF, Vote) son 100% gratis. Los de terceros a veces cobran por funciones avanzadas.",
  },
  {
    q: "¿Cómo creo mi propio bot de Telegram?",
    a: "Habla con @BotFather en Telegram, escribe /newbot, elige nombre y username, y BotFather te dará un token. Con ese token puedes programar tu bot en cualquier lenguaje (Python, JavaScript, Go) usando la API de Telegram. Es totalmente gratis publicar bots.",
  },
  {
    q: "¿Los bots pueden ver mis mensajes privados en el grupo?",
    a: "Solo los mensajes en los que se les menciona explícitamente (@bot) o los comandos que empiezan con /. Los admins pueden dar 'modo privacidad' desactivado para que el bot vea todo el chat, pero eso lo controla el dueño del grupo.",
  },
  {
    q: "¿Cómo elimino un bot de mi grupo?",
    a: "Ve al perfil del bot dentro del grupo, toca 'Eliminar del grupo' o revoca sus permisos de admin. Si te preocupa que haya guardado datos, contacta al desarrollador (aunque los bots serios respetan la privacidad y no persisten mensajes).",
  },
  {
    q: "¿Qué diferencia hay entre bot oficial y no oficial?",
    a: "Un bot 'oficial' es publicado por Telegram (BotFather, Stickers, Vote, GIF). Los no oficiales los publican desarrolladores independientes. Ambos pueden ser buenos: lo que importa es la reputación, cantidad de usuarios y transparencia del desarrollador.",
  },
];

export default function BotsHub() {
  const populares = [...bots].sort((a, b) => b.usuarios - a.usuarios).slice(0, 6);
  const totalUsuarios = bots.reduce((s, b) => s + b.usuarios, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: bots.length,
    itemListElement: bots.slice(0, 20).map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/bots/${b.slug}`,
      name: b.nombre,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-brand">Inicio</Link> / <span>Bots</span>
      </nav>

      <header className="text-center py-8 md:py-12 mb-8 bg-gradient-to-br from-brand to-brand-dark rounded-xl text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          🤖 Los mejores bots de Telegram
        </h1>
        <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto px-4 mb-4">
          Directorio curado con {bots.length}+ bots verificados: moderación, IA, descargas, música, utilidades y más.
        </p>
        <div className="flex flex-wrap justify-center gap-5 text-sm md:text-base opacity-90 px-4">
          <span>✅ {bots.length}+ bots verificados</span>
          <span>👤 {formatUsuariosBot(totalUsuarios)}+ usuarios combinados</span>
          <span>🗂️ {BOT_CATEGORIAS.length} categorías</span>
        </div>
      </header>

      <section className="mb-10 prose max-w-none bg-white rounded-lg p-6 border border-slate-200">
        <p className="lead">
          Los <strong>bots de Telegram</strong> son la razón por la que muchos grupos serios funcionan bien: gestionan miembros, filtran spam, integran servicios externos y automatizan tareas que en otras apps requieren pagar. En esta página encontrarás los <strong>{bots.length}+ bots más útiles</strong> ordenados por categoría, con instrucciones de uso y comparativa entre alternativas.
        </p>
        <p>
          Si administras un grupo, revisa la sección de <Link href="/bots/categoria/moderacion">moderación</Link> y <Link href="/bots/categoria/antispam">antispam</Link> — son imprescindibles desde el día 1. Si quieres integrar IA en tus conversaciones, mira los <Link href="/bots/categoria/ia-y-chatgpt">bots de ChatGPT y Midjourney</Link>. Y si buscas grupos activos donde usar estos bots, explora nuestro <Link href="/">directorio de grupos de Telegram</Link>.
        </p>
      </section>

      <section id="categorias" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Explorar por categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {BOT_CATEGORIAS.map((c) => {
            const count = bots.filter((b) => b.categoria === c.slug).length;
            return (
              <Link
                key={c.slug}
                href={`/bots/categoria/${c.slug}`}
                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-brand hover:shadow-sm transition"
              >
                <div className="text-2xl mb-1">{c.emoji}</div>
                <div className="font-semibold text-sm">{c.nombre}</div>
                <div className="text-xs text-slate-500 mt-1">{count} bots</div>
              </Link>
            );
          })}
        </div>
      </section>

      <AdSlot slot="6789012345" className="my-8" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Bots más populares</h2>
        <p className="text-slate-600 mb-4">Los bots con más usuarios activos del directorio, verificados manualmente.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {populares.map((b) => <BotCard key={b.slug} bot={b} />)}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Todos los bots del directorio</h2>
        <p className="text-slate-600 mb-4">{bots.length} bots verificados ordenados por popularidad.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...bots].sort((a, b) => b.usuarios - a.usuarios).map((b) => <BotCard key={b.slug} bot={b} />)}
        </div>
      </section>

      <section className="prose max-w-none bg-white rounded-lg p-6 md:p-8 border border-slate-200 mb-8">
        <h2>Cómo elegir el mejor bot para tu grupo</h2>
        <ol>
          <li><strong>Define qué necesitas primero</strong>. ¿Moderación? ¿Antispam? ¿Bienvenidas automáticas? ¿Estadísticas? Un solo bot no cubre todo bien.</li>
          <li><strong>Revisa la reputación</strong>. Bots con miles de usuarios y años de existencia suelen ser seguros. Los recién publicados sin historial merecen cautela.</li>
          <li><strong>Concede permisos mínimos</strong>. Un bot antispam solo necesita permiso de expulsar. Un bot de estadísticas solo necesita leer. No des permisos completos por defecto.</li>
          <li><strong>Combina 2-3 bots complementarios</strong>. Lo típico: uno de moderación (Rose), uno de antispam (Shieldy) y uno de estadísticas (Combot).</li>
          <li><strong>Prueba en un grupo pequeño antes</strong>. Antes de meterlo en tu grupo principal, prueba en uno de test para ver cómo se comporta.</li>
        </ol>

        <h2>Cómo instalar y configurar un bot en 5 minutos</h2>
        <ol>
          <li>Busca el bot por @username en la lupa de Telegram.</li>
          <li>Ábrelo y pulsa <em>Añadir al grupo</em>.</li>
          <li>Selecciona el grupo destino.</li>
          <li>Dale permisos de admin (con los mínimos permisos requeridos).</li>
          <li>Envía <code>/start</code> o <code>/help</code> en el grupo para ver los comandos disponibles.</li>
          <li>Configura según las instrucciones del bot (muchos tienen panel web para facilitar).</li>
        </ol>

        <h2>Bots que NO deberías añadir a tu grupo</h2>
        <ul>
          <li>Bots que piden permisos completos sin justificación.</li>
          <li>Bots que envían publicidad automáticamente al grupo.</li>
          <li>Bots que prometen "ganar dinero" o "generar tráfico" con esquemas dudosos.</li>
          <li>Bots recién creados sin usuarios ni reputación.</li>
          <li>Bots que piden datos personales o cuentas de otras apps.</li>
          <li>Bots que descargan contenido pirata (te pueden ban el grupo).</li>
        </ul>

        <h2>¿Y si quiero crear mi propio bot?</h2>
        <p>
          Es más fácil de lo que parece. Habla con <Link href="/bots/botfather">@BotFather</Link> en Telegram, escribe <code>/newbot</code>, dale nombre, elige un username terminado en "bot" y BotFather te dará un <strong>token</strong>. Con ese token puedes programar el bot en cualquier lenguaje: Python (python-telegram-bot), JavaScript (Telegraf), Go (telebot). Publicar bots es totalmente gratis y sin límite de usuarios.
        </p>
        <p>
          Para inspirarte, revisa nuestra <Link href="/blog/mejores-bots-telegram-para-grupos">guía de bots esenciales para admins</Link> o el post <Link href="/blog/como-crear-grupo-telegram">cómo crear un grupo de Telegram</Link> paso a paso.
        </p>
      </section>

      <FAQBlock faqs={BOT_FAQ} />

      <section className="mt-8 text-sm text-slate-600 bg-slate-50 rounded-lg p-6 border border-slate-200">
        <p>
          ¿Buscas también grupos activos donde probar estos bots? Explora nuestro <Link href="/" className="text-brand hover:underline">directorio de grupos de Telegram</Link> con {96}+ comunidades verificadas. Y si administras un bot útil y quieres que aparezca aquí, <Link href="/anadir-grupo" className="text-brand hover:underline">contáctanos</Link>.
        </p>
      </section>
    </>
  );
}
