import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contacta con ${SITE.name} para reportar grupos rotos, sugerir mejoras, colaborar o resolver dudas sobre nuestro directorio de grupos y bots de Telegram.`,
  alternates: { canonical: `${SITE.url}/contacto` },
  robots: { index: true, follow: true },
};

export default function ContactoPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-brand">Inicio</Link> / <span>Contacto</span>
      </nav>

      <div className="prose max-w-none bg-white rounded-lg p-6 md:p-10 border border-slate-200 mb-8">
        <h1>Contacto</h1>
        <p className="lead">
          Puedes escribirnos por cualquiera de estos motivos: reportar un grupo caducado, sugerir nuevas categorías, colaborar editorialmente, resolver dudas sobre privacidad o cualquier otra consulta relacionada con {SITE.name}.
        </p>

        <h2>Para reportar un grupo o bot</h2>
        <p>
          Si encontraste un enlace que no funciona, un grupo con contenido no apto (spam, adulto, estafa) o un bot que ya no existe, escríbenos indicando la URL exacta del grupo/bot en nuestro directorio y el motivo. Actualizamos el directorio cada semana.
        </p>

        <h2>Para añadir tu propio grupo</h2>
        <p>
          Si administras un grupo o canal de Telegram y quieres publicarlo en el directorio, usa el <Link href="/anadir-grupo">formulario de añadir grupo</Link>. Es gratis y revisamos cada envío manualmente en 24-48 horas.
        </p>

        <h2>Para colaboraciones y prensa</h2>
        <p>
          Aceptamos colaboraciones editoriales (guest posts sobre Telegram, comunidades digitales o marketing), menciones patrocinadas (siempre marcadas como tales) y colaboraciones con medios. Escríbenos con tu propuesta y responderemos según el fit editorial.
        </p>

        <h2>Para consultas sobre privacidad</h2>
        <p>
          Si quieres ejercer alguno de tus derechos sobre datos personales (acceso, rectificación, supresión), consulta primero nuestra <Link href="/politica-privacidad">política de privacidad</Link>. Después escríbenos por email con tu solicitud.
        </p>

        <h2>Formulario de contacto</h2>
        <p>Escríbenos con tu mensaje. Respondemos en 2-5 días laborables.</p>
      </div>

      <form action="https://formspree.io/f/YOUR_FORM_ID" method="post" className="bg-white p-6 md:p-8 rounded-lg border border-slate-200 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre *</label>
          <input required name="nombre" className="w-full border border-slate-300 rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input required name="email" type="email" className="w-full border border-slate-300 rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Motivo *</label>
          <select required name="motivo" className="w-full border border-slate-300 rounded px-3 py-2">
            <option value="">Elige...</option>
            <option>Reportar grupo o bot</option>
            <option>Colaboración editorial</option>
            <option>Propuesta patrocinada</option>
            <option>Consulta sobre privacidad</option>
            <option>Otro</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mensaje *</label>
          <textarea required name="mensaje" rows={6} className="w-full border border-slate-300 rounded px-3 py-2" />
        </div>
        <button type="submit" className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded">
          Enviar mensaje
        </button>
        <p className="text-xs text-slate-500 text-center">
          Al enviar aceptas nuestra <Link href="/politica-privacidad" className="underline">política de privacidad</Link> y <Link href="/terminos" className="underline">términos</Link>.
        </p>
      </form>

      <p className="text-sm text-slate-500 mt-6 text-center">
        Sitio no afiliado con Telegram Messenger Inc. Consulta también nuestros <Link href="/terminos" className="text-brand hover:underline">términos y condiciones</Link>.
      </p>
    </div>
  );
}
