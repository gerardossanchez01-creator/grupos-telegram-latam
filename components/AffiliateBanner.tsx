import { getAfiliados } from "@/data/afiliados";

/**
 * Banner de productos de afiliado (Mercado Libre) contextual por categoría.
 * No renderiza nada si la categoría no tiene productos con enlace, así que es
 * seguro colocarlo en todas las páginas aunque aún no haya links cargados.
 *
 * Cumplimiento: etiqueta visible de "enlaces de afiliado" + rel="sponsored
 * nofollow" (requisito de Google) + target _blank.
 */
export default function AffiliateBanner({
  categoria,
  limit = 3,
  titulo = "Productos recomendados",
}: {
  categoria: string;
  limit?: number;
  titulo?: string;
}) {
  const productos = getAfiliados(categoria).slice(0, limit);
  if (productos.length === 0) return null;

  return (
    <aside className="not-prose my-8 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between mb-3 gap-3">
        <h3 className="text-sm font-semibold text-slate-700">🛒 {titulo}</h3>
        <span className="text-[11px] text-slate-400 whitespace-nowrap">
          Publicidad · enlaces de afiliado
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map((p, i) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="flex flex-col rounded-lg border border-slate-200 hover:shadow-md hover:border-brand transition p-3"
          >
            {p.imagen ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={p.imagen}
                alt={p.titulo}
                loading="lazy"
                className="w-full h-32 object-contain mb-2"
              />
            ) : null}
            <p className="text-sm font-medium text-slate-900 line-clamp-2 flex-1">{p.titulo}</p>
            {p.precio ? <p className="text-brand font-bold mt-1">{p.precio}</p> : null}
            <span className="mt-2 inline-block text-center text-xs bg-brand text-white px-3 py-1.5 rounded">
              Ver en Mercado Libre →
            </span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-slate-400">
        Como afiliados, podemos recibir una comisión por las compras que realices a través de estos
        enlaces, sin coste adicional para ti.
      </p>
    </aside>
  );
}
