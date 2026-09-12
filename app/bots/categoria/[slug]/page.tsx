import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { BOT_CATEGORIAS, getBotCategoria, getBotsByCategoria, formatUsuariosBot } from "@/lib/bots";
import { SITE } from "@/lib/data";
import BotCard from "@/components/BotCard";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() {
  return BOT_CATEGORIAS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = getBotCategoria(params.slug);
  if (!cat) return {};
  const count = getBotsByCategoria(cat.slug).length;
  return {
    title: `Los mejores bots de Telegram de ${cat.nombre} (${count}+)`,
    description: `${cat.descripcion} Directorio verificado y actualizado.`,
    alternates: { canonical: `${SITE.url}/bots/categoria/${cat.slug}` },
  };
}

export default function BotCategoriaPage({ params }: { params: { slug: string } }) {
  const cat = getBotCategoria(params.slug);
  if (!cat) notFound();
  const items = getBotsByCategoria(cat.slug);
  const totalUsuarios = items.reduce((s, b) => s + b.usuarios, 0);
  const otras = BOT_CATEGORIAS.filter((c) => c.slug !== cat.slug);

  return (
    <>
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-brand">Inicio</Link> /{" "}
        <Link href="/bots" className="hover:text-brand">Bots</Link> /{" "}
        <span>{cat.nombre}</span>
      </nav>

      <header className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">{cat.emoji}</span>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Bots de Telegram de {cat.nombre}
            </h1>
            <p className="text-slate-600 text-lg">{cat.descripcion}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-slate-500 mt-4 pt-4 border-t border-slate-100">
          <span>📊 <strong>{items.length}</strong> bots verificados</span>
          <span>👤 <strong>{formatUsuariosBot(totalUsuarios)}+</strong> usuarios combinados</span>
        </div>
      </header>

      <AdSlot slot="8901234567" className="mb-8" />

      {items.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-slate-600">
          <p>Todavía no hay bots en esta categoría. Vuelve al <Link href="/bots" className="text-brand underline">directorio principal</Link>.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((b) => <BotCard key={b.slug} bot={b} />)}
        </div>
      )}

      <section className="mt-12 bg-white border border-slate-200 rounded-lg p-6 md:p-8 prose max-w-none">
        <h2>¿Por qué usar bots de {cat.nombre.toLowerCase()} en Telegram?</h2>
        <p>
          Los bots de <strong>{cat.nombre.toLowerCase()}</strong> son una de las herramientas más potentes del ecosistema Telegram. A diferencia de otras apps de mensajería, aquí puedes automatizar tareas complejas gratis y sin instalación adicional. En esta categoría tenemos {items.length} bots seleccionados manualmente, todos verificados, con al menos {formatUsuariosBot(items[items.length - 1]?.usuarios ?? 0)}+ usuarios activos cada uno.
        </p>
        <p>
          Para probarlos, abre Telegram, busca su @username y envía el comando <code>/start</code>. La mayoría son gratis o freemium. Recuerda darle solo los permisos mínimos necesarios cuando lo añadas a un grupo.
        </p>

        <h2>Otras categorías de bots</h2>
        <div className="not-prose grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {otras.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              href={`/bots/categoria/${c.slug}`}
              className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center hover:border-brand hover:bg-white transition"
            >
              <div className="text-2xl mb-1">{c.emoji}</div>
              <div className="text-sm font-medium">{c.nombre}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 text-sm text-slate-600 bg-slate-50 rounded-lg p-6 border border-slate-200">
        <p>
          Vuelve al <Link href="/bots" className="text-brand hover:underline">directorio completo de bots</Link>, revisa el <Link href="/" className="text-brand hover:underline">directorio de grupos de Telegram</Link> o lee las <Link href="/blog" className="text-brand hover:underline">guías del blog</Link> para sacar más partido a la app.
        </p>
      </section>
    </>
  );
}
