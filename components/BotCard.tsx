import Link from "next/link";
import { formatUsuariosBot, getBotCategoria, type Bot } from "@/lib/bots";

export default function BotCard({ bot }: { bot: Bot }) {
  const cat = getBotCategoria(bot.categoria);
  return (
    <article className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-2 mb-2">
        <Link href={`/bots/${bot.slug}`} className="font-semibold text-slate-900 hover:text-brand">
          @{bot.username}
        </Link>
        <div className="flex gap-1">
          {bot.oficial && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Oficial</span>}
          {bot.verificado && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">✓</span>}
        </div>
      </div>
      <div className="font-medium text-slate-700 mb-2">{bot.nombre}</div>
      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{bot.descripcion}</p>
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span>👤 {formatUsuariosBot(bot.usuarios)}+ usuarios</span>
        {cat && (
          <Link href={`/bots/categoria/${cat.slug}`} className="hover:text-brand">
            {cat.emoji} {cat.nombre}
          </Link>
        )}
      </div>
      <Link
        href={`/bots/${bot.slug}`}
        className="block w-full text-center bg-brand hover:bg-brand-dark text-white text-sm font-medium py-2 rounded"
      >
        Ver bot
      </Link>
    </article>
  );
}
