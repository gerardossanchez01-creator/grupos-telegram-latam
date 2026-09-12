import Link from "next/link";
import { formatMiembros, getCategoria, type Grupo } from "@/lib/data";

export default function GrupoCard({ grupo }: { grupo: Grupo }) {
  const cat = getCategoria(grupo.categoria);
  return (
    <article className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-2 mb-2">
        <Link href={`/grupo/${grupo.slug}`} className="font-semibold text-slate-900 hover:text-brand">
          {grupo.nombre}
        </Link>
        {grupo.verificado && (
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">✓ Verificado</span>
        )}
      </div>
      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{grupo.descripcion}</p>
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span>👥 {formatMiembros(grupo.miembros)} miembros</span>
        {cat && (
          <Link href={`/categoria/${cat.slug}`} className="hover:text-brand">
            {cat.emoji} {cat.nombre}
          </Link>
        )}
      </div>
      <Link
        href={`/grupo/${grupo.slug}`}
        className="block w-full text-center bg-brand hover:bg-brand-dark text-white text-sm font-medium py-2 rounded"
      >
        Ver grupo
      </Link>
    </article>
  );
}
