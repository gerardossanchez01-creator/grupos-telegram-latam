import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Política de privacidad de ${SITE.name}: cómo recopilamos, usamos y protegemos tu información al usar nuestro directorio de grupos y bots de Telegram.`,
  alternates: { canonical: `${SITE.url}/politica-privacidad` },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  const fechaActualizacion = "12 de septiembre de 2026";
  return (
    <div className="prose max-w-none bg-white rounded-lg p-6 md:p-10 border border-slate-200">
      <nav className="text-sm text-slate-500 mb-4 not-prose">
        <Link href="/" className="hover:text-brand">Inicio</Link> / <span>Política de privacidad</span>
      </nav>

      <h1>Política de privacidad</h1>
      <p><em>Última actualización: {fechaActualizacion}</em></p>

      <p>
        En <strong>{SITE.name}</strong> ({SITE.url}, en adelante "el sitio", "nosotros") respetamos tu privacidad y nos comprometemos a proteger la información personal que puedas compartir con nosotros. Esta política explica qué datos recopilamos, cómo los usamos y qué derechos tienes sobre ellos.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de los datos recogidos en este sitio es el propietario de <strong>{SITE.domain}</strong>. Para cualquier consulta sobre privacidad puedes contactarnos en <Link href="/contacto">nuestra página de contacto</Link>.
      </p>

      <h2>2. Datos que recopilamos</h2>
      <p>Recopilamos únicamente los datos estrictamente necesarios para operar el sitio:</p>
      <ul>
        <li><strong>Datos de navegación</strong>: tipo de navegador, sistema operativo, páginas visitadas, tiempo de permanencia, referrer. Estos datos son anónimos y se usan para estadísticas agregadas.</li>
        <li><strong>Datos del formulario "Añadir grupo"</strong>: si envías un grupo o canal a nuestro directorio, guardamos el nombre del grupo, enlace de Telegram, descripción, categoría y opcionalmente tu email de contacto. Solo usamos estos datos para revisar el envío y contactarte si necesitamos aclaración.</li>
        <li><strong>Cookies</strong>: usamos cookies técnicas (para el funcionamiento del sitio) y cookies de terceros (Google Analytics, Google AdSense) para medir tráfico y mostrar publicidad relevante.</li>
      </ul>

      <h2>3. Uso de la información</h2>
      <p>Utilizamos tus datos exclusivamente para:</p>
      <ul>
        <li>Operar y mantener el sitio.</li>
        <li>Revisar y moderar los grupos que la comunidad envía.</li>
        <li>Analizar de forma agregada el uso del sitio para mejorarlo.</li>
        <li>Mostrar anuncios contextuales a través de Google AdSense.</li>
        <li>Cumplir con obligaciones legales aplicables.</li>
      </ul>
      <p>
        <strong>No vendemos ni cedemos tus datos personales a terceros</strong> con fines comerciales.
      </p>

      <h2>4. Cookies y tecnologías similares</h2>
      <p>Este sitio utiliza cookies de las siguientes categorías:</p>

      <h3>Cookies técnicas (necesarias)</h3>
      <p>Son imprescindibles para que el sitio funcione. No requieren consentimiento y no se pueden desactivar sin afectar la navegación.</p>

      <h3>Cookies analíticas</h3>
      <p>Utilizamos <strong>Google Analytics</strong> para medir de forma agregada cómo los visitantes usan el sitio (páginas más vistas, tiempo de sesión, dispositivos). Los datos se envían a Google y se procesan según <a href="https://policies.google.com/privacy" target="_blank" rel="noopener nofollow">su política de privacidad</a>.</p>

      <h3>Cookies publicitarias (Google AdSense)</h3>
      <p>
        Este sitio muestra anuncios servidos por <strong>Google AdSense</strong>, una plataforma de Google. AdSense usa cookies para mostrar publicidad relevante según tus intereses, incluyendo cookies como DoubleClick DART. Los proveedores externos, incluida Google, muestran anuncios basados en tus visitas anteriores a este u otros sitios web.
      </p>
      <p>
        Puedes desactivar la publicidad personalizada visitando la <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener nofollow">configuración de anuncios de Google</a> o inhabilitar cookies de terceros usando iniciativas como <a href="https://www.aboutads.info" target="_blank" rel="noopener nofollow">aboutads.info</a> o <a href="https://www.youronlinechoices.com/es" target="_blank" rel="noopener nofollow">youronlinechoices.com</a>.
      </p>

      <h3>Gestión de cookies desde tu navegador</h3>
      <p>Puedes bloquear o eliminar cookies en cualquier momento desde la configuración de tu navegador (Chrome, Firefox, Safari, Edge). Ten en cuenta que hacerlo puede afectar la experiencia de navegación.</p>

      <h2>5. Servicios de terceros</h2>
      <p>Este sitio utiliza los siguientes servicios externos que pueden recopilar datos según sus propias políticas:</p>
      <ul>
        <li><strong>Vercel</strong> (hosting): <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener nofollow">Política de privacidad de Vercel</a>.</li>
        <li><strong>Google Analytics</strong> (analítica): <a href="https://policies.google.com/privacy" target="_blank" rel="noopener nofollow">Política de privacidad de Google</a>.</li>
        <li><strong>Google AdSense</strong> (publicidad): <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener nofollow">Cómo usa Google la información</a>.</li>
        <li><strong>Telegram</strong> (destino de enlaces): los enlaces del directorio apuntan a <code>t.me/</code>. Al hacer clic sales de nuestro sitio y entras en el dominio de Telegram, sujeto a <a href="https://telegram.org/privacy" target="_blank" rel="noopener nofollow">su política de privacidad</a>.</li>
      </ul>

      <h2>6. Enlaces a sitios externos</h2>
      <p>
        Nuestro directorio contiene cientos de enlaces a grupos y canales de Telegram (<code>t.me/</code>). No somos responsables del contenido de estos grupos ni de las prácticas de privacidad de terceros. Recomendamos revisar las políticas de cada grupo o canal al que te unas.
      </p>

      <h2>7. Tus derechos</h2>
      <p>Puedes ejercer los siguientes derechos sobre tus datos personales:</p>
      <ul>
        <li><strong>Acceso</strong>: solicitar qué datos tenemos sobre ti.</li>
        <li><strong>Rectificación</strong>: corregir datos inexactos.</li>
        <li><strong>Supresión</strong>: pedir que borremos tus datos.</li>
        <li><strong>Oposición</strong>: oponerte al tratamiento en determinadas circunstancias.</li>
        <li><strong>Portabilidad</strong>: recibir tus datos en formato estructurado.</li>
      </ul>
      <p>
        Para ejercer cualquiera de estos derechos, contáctanos a través de nuestra <Link href="/contacto">página de contacto</Link>. Responderemos en un plazo máximo de 30 días.
      </p>

      <h2>8. Menores de edad</h2>
      <p>
        Este sitio no está dirigido a menores de 13 años. No recopilamos intencionalmente datos de menores. Si eres padre o tutor y crees que tu hijo ha proporcionado datos, contáctanos y los eliminaremos.
      </p>

      <h2>9. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra acceso no autorizado, alteración o pérdida. Sin embargo, ninguna transmisión de datos por internet es 100% segura.
      </p>

      <h2>10. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política ocasionalmente. Cuando lo hagamos, cambiaremos la fecha de "Última actualización" al inicio del documento. Te recomendamos revisar esta página periódicamente.
      </p>

      <h2>11. Contacto</h2>
      <p>
        Si tienes preguntas sobre esta política o sobre el tratamiento de tus datos, contáctanos a través de nuestra <Link href="/contacto">página de contacto</Link>.
      </p>

      <hr />
      <p className="text-sm text-slate-500">
        Al utilizar {SITE.name} aceptas los términos de esta política de privacidad. Consulta también nuestros <Link href="/terminos">términos y condiciones</Link>.
      </p>
    </div>
  );
}
