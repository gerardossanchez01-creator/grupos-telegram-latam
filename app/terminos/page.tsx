import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: `Términos y condiciones de uso de ${SITE.name}: normas para usuarios, administradores de grupos y limitación de responsabilidad.`,
  alternates: { canonical: `${SITE.url}/terminos` },
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  const fechaActualizacion = "12 de septiembre de 2026";
  return (
    <div className="prose max-w-none bg-white rounded-lg p-6 md:p-10 border border-slate-200">
      <nav className="text-sm text-slate-500 mb-4 not-prose">
        <Link href="/" className="hover:text-brand">Inicio</Link> / <span>Términos y condiciones</span>
      </nav>

      <h1>Términos y condiciones</h1>
      <p><em>Última actualización: {fechaActualizacion}</em></p>

      <p>
        Bienvenido a <strong>{SITE.name}</strong> ({SITE.url}). Al acceder o utilizar este sitio aceptas los siguientes términos y condiciones. Si no estás de acuerdo, por favor no uses el sitio.
      </p>

      <h2>1. Descripción del servicio</h2>
      <p>
        {SITE.name} es un <strong>directorio informativo curado de grupos y canales públicos de Telegram</strong> en español, así como de bots verificados de la plataforma. No somos propietarios ni operamos ninguno de los grupos, canales o bots listados. Actuamos únicamente como catálogo con enlaces directos a las páginas públicas de Telegram (<code>t.me/</code>).
      </p>

      <h2>2. Uso permitido</h2>
      <p>Puedes usar el sitio para:</p>
      <ul>
        <li>Explorar y descubrir grupos, canales y bots de Telegram.</li>
        <li>Consultar guías y artículos del blog.</li>
        <li>Compartir enlaces del directorio en tus redes sociales o comunidades.</li>
        <li>Enviar tu propio grupo o canal a través del formulario "Añadir grupo".</li>
      </ul>

      <h2>3. Uso prohibido</h2>
      <p>Queda expresamente prohibido:</p>
      <ul>
        <li>Utilizar el sitio para actividades ilegales.</li>
        <li>Enviar grupos con contenido ilícito, pornográfico, difamatorio, engañoso o que promueva odio.</li>
        <li>Enviar grupos que promuevan estafas, esquemas piramidales, "hazte rico rápido", warez o piratería.</li>
        <li>Enviar el mismo grupo repetidamente (spam).</li>
        <li>Intentar realizar scraping automatizado, ataques de denegación de servicio (DoS), ingeniería inversa o cualquier acción que comprometa el funcionamiento del sitio.</li>
        <li>Reproducir, copiar o vender el contenido editorial del sitio sin autorización.</li>
      </ul>

      <h2>4. Contenido de terceros y descargo de responsabilidad</h2>
      <p>
        Los grupos, canales y bots listados en {SITE.name} son <strong>propiedad y responsabilidad exclusiva de sus respectivos administradores</strong>. No verificamos ni respaldamos el contenido publicado dentro de dichos grupos.
      </p>
      <p>
        Aunque revisamos manualmente los envíos antes de publicarlos y aplicamos filtros contra contenido prohibido, no podemos garantizar que todos los grupos mantengan la misma calidad o cumplan siempre las políticas después de su publicación.
      </p>
      <p>
        <strong>Al unirte a un grupo o canal desde nuestro directorio lo haces bajo tu propia responsabilidad</strong>. Recomendamos leer las reglas del grupo, configurar tu privacidad de Telegram antes de unirte y salir inmediatamente si detectas contenido problemático.
      </p>

      <h2>5. No afiliación con Telegram</h2>
      <p>
        {SITE.name} <strong>no está afiliado, asociado, autorizado, respaldado ni oficialmente conectado con Telegram Messenger Inc.</strong> ni con ninguna de sus subsidiarias. Telegram y su logotipo son marcas registradas de sus respectivos propietarios y se mencionan únicamente con fines descriptivos.
      </p>

      <h2>6. Propiedad intelectual</h2>
      <p>
        El diseño, código, textos editoriales, artículos del blog y sistema del sitio son propiedad de {SITE.name} y están protegidos por leyes de propiedad intelectual. Los logos, nombres de grupos y descripciones enviadas al directorio pertenecen a sus respectivos propietarios.
      </p>
      <p>
        Puedes citar fragmentos con atribución y enlace, pero no reproducir contenido sustancial sin permiso escrito.
      </p>

      <h2>7. Envío de grupos (UGC)</h2>
      <p>
        Al enviar un grupo, canal o bot a través del formulario correspondiente declaras que:
      </p>
      <ul>
        <li>Eres el administrador del grupo o tienes autorización explícita para publicarlo.</li>
        <li>El grupo cumple con nuestras políticas (no adulto, no pirata, no estafa, no apuestas).</li>
        <li>La información proporcionada (nombre, descripción, categoría) es precisa.</li>
        <li>Nos otorgas licencia no exclusiva para publicar la información en el directorio.</li>
      </ul>
      <p>
        Nos reservamos el derecho a rechazar, editar o eliminar cualquier envío sin explicación previa.
      </p>

      <h2>8. Publicidad</h2>
      <p>
        Este sitio muestra anuncios servidos por <strong>Google AdSense</strong> como fuente de financiación. Los anuncios se muestran en función de los intereses del visitante y el contexto de la página. No respaldamos ni verificamos los productos o servicios anunciados. Consulta nuestra <Link href="/politica-privacidad">política de privacidad</Link> para más información sobre cómo se usan cookies publicitarias.
      </p>

      <h2>9. Enlaces externos</h2>
      <p>
        El directorio y el blog contienen enlaces a sitios externos, incluidos <code>t.me/</code> (Telegram), medios de comunicación y páginas de referencia. No controlamos ni asumimos responsabilidad sobre el contenido, políticas de privacidad o prácticas de sitios de terceros.
      </p>

      <h2>10. Limitación de responsabilidad</h2>
      <p>
        En la máxima medida permitida por la ley, {SITE.name}, sus propietarios, colaboradores y proveedores <strong>no serán responsables</strong> de daños directos, indirectos, incidentales, especiales o consecuentes derivados de:
      </p>
      <ul>
        <li>El uso o imposibilidad de uso del sitio.</li>
        <li>Contenido publicado en grupos externos a los que enlazamos.</li>
        <li>Fallos técnicos, interrupciones o pérdida de datos.</li>
        <li>Acciones de terceros dentro de grupos de Telegram.</li>
        <li>Errores tipográficos o información desactualizada.</li>
      </ul>

      <h2>11. Modificaciones del servicio</h2>
      <p>
        Nos reservamos el derecho a modificar, suspender o discontinuar cualquier parte del sitio (categorías, funciones, contenido, disponibilidad) en cualquier momento, sin previo aviso y sin responsabilidad hacia los usuarios.
      </p>

      <h2>12. Modificaciones de estos términos</h2>
      <p>
        Podemos actualizar estos términos ocasionalmente. La versión vigente estará siempre en esta página con la fecha de última actualización visible al inicio. Continuar usando el sitio después de un cambio implica aceptación de los nuevos términos.
      </p>

      <h2>13. Ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes aplicables en el lugar de residencia del titular del sitio. Cualquier disputa se resolverá en los tribunales competentes de dicha jurisdicción.
      </p>

      <h2>14. Contacto</h2>
      <p>
        Para preguntas, reportes o requerimientos legales, contáctanos a través de nuestra <Link href="/contacto">página de contacto</Link>.
      </p>

      <hr />
      <p className="text-sm text-slate-500">
        Al utilizar {SITE.name} aceptas estos términos y nuestra <Link href="/politica-privacidad">política de privacidad</Link>.
      </p>
    </div>
  );
}
