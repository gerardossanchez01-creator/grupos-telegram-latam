import type { Metadata } from "next";
import { CATEGORIAS, PAISES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Añadir tu grupo de Telegram gratis",
  description: "Publica tu grupo o canal de Telegram en nuestro directorio de forma gratuita. Revisión manual en 24-48 horas.",
};

export default function AnadirGrupoPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-3">Añade tu grupo de Telegram</h1>
      <p className="text-slate-600 mb-6">
        Publica gratis tu grupo o canal. Lo revisamos manualmente en 24-48h.
        <strong> No aceptamos contenido adulto, pirata, apuestas o estafas.</strong>
      </p>

      <form action="/api/submit-grupo" method="post" className="space-y-4 bg-white p-6 rounded-lg border border-slate-200">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre del grupo *</label>
          <input required name="nombre" className="w-full border border-slate-300 rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Enlace de Telegram (t.me/...) *</label>
          <input required name="link" type="url" placeholder="https://t.me/..." className="w-full border border-slate-300 rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Descripción *</label>
          <textarea required name="descripcion" rows={4} className="w-full border border-slate-300 rounded px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Categoría *</label>
            <select required name="categoria" className="w-full border border-slate-300 rounded px-3 py-2">
              <option value="">Elige...</option>
              {CATEGORIAS.map((c) => <option key={c.slug} value={c.slug}>{c.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">País principal</label>
            <select name="pais" className="w-full border border-slate-300 rounded px-3 py-2">
              <option value="">Global</option>
              {PAISES.map((p) => <option key={p.slug} value={p.slug}>{p.nombre}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tu email (privado)</label>
          <input name="email" type="email" className="w-full border border-slate-300 rounded px-3 py-2" />
        </div>
        <button type="submit" className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded">
          Enviar grupo
        </button>
      </form>
    </div>
  );
}
