import type { FAQItem } from "@/lib/blog";

// FAQ genérica del home
export const HOME_FAQ: FAQItem[] = [
  {
    q: "¿Qué son los grupos de Telegram?",
    a: "Los grupos de Telegram son comunidades públicas o privadas donde miles de personas chatean en tiempo real sobre un tema común. A diferencia de WhatsApp, un grupo de Telegram puede tener hasta 200.000 miembros, y los canales admiten un número ilimitado de suscriptores. Encuentra los mejores por categoría o país en nuestro directorio.",
  },
  {
    q: "¿Cómo me uno a un grupo de Telegram?",
    a: "Elige un grupo del directorio, haz clic en el botón 'Unirme al grupo en Telegram' en su ficha y se abrirá la app de Telegram para confirmar tu ingreso. Si no tienes la app, primero descárgala desde telegram.org. Nunca compartas datos personales al unirte, y silencia notificaciones si el grupo es muy activo.",
  },
  {
    q: "¿Los grupos que aparecen aquí son verificados?",
    a: "Sí. Todos los grupos y canales de nuestro directorio son revisados manualmente antes de publicarse. Comprobamos que el enlace funcione, que sean comunidades activas y que cumplan con nuestras políticas (nada de contenido adulto, pirata o estafas). Reportamos y eliminamos los que dejen de funcionar.",
  },
  {
    q: "¿Puedo añadir mi propio grupo al directorio?",
    a: "Claro. Ve a nuestra sección 'Añadir grupo', rellena el formulario con el enlace de tu grupo, descripción, categoría y país. Revisamos manualmente en 24-48 horas y publicamos si cumple las políticas. Es totalmente gratis.",
  },
  {
    q: "¿Qué diferencia hay entre grupo y canal de Telegram?",
    a: "En un grupo cualquier miembro puede escribir y hay conversación bidireccional (hasta 200.000 miembros). En un canal solo el administrador publica y los suscriptores solo leen (miembros ilimitados). Los canales sirven para difundir; los grupos, para comunidad y debate. En el directorio los tratamos igual porque ambos aportan valor.",
  },
  {
    q: "¿Puedo unirme sin dar mi número de teléfono?",
    a: "Sí. Ve a Configuración → Privacidad y seguridad → Número de teléfono y elige 'Nadie' o 'Mis contactos'. Los demás miembros del grupo solo verán tu nombre y username, nunca tu teléfono. Es la configuración recomendada antes de unirte a cualquier grupo público.",
  },
  {
    q: "¿Qué grupos son los más populares?",
    a: "Los más populares en español suelen ser los de ofertas y chollos (Chollometro tiene 2M miembros), noticias de tecnología (Xataka, ADSLZone), criptomonedas (CriptoNoticias), y aprendizaje de inglés (BBC Learning English, Cambridge Dictionary). Todos los tienes en nuestro directorio con enlace directo.",
  },
];

// FAQ genérica por categoría (se puede sobreescribir con FAQ específica por slug si quieres)
export function faqParaCategoria(nombre: string, slug: string): FAQItem[] {
  return [
    {
      q: `¿Los grupos de Telegram de ${nombre} son gratis?`,
      a: `Sí, la inmensa mayoría de grupos de ${nombre.toLowerCase()} en Telegram son gratuitos y abiertos. Solo algunos canales VIP cobran suscripción, pero rara vez justifican el precio. Empieza por los gratuitos: suelen ser igual o mejores en calidad de contenido.`,
    },
    {
      q: `¿Cómo elijo el mejor grupo de ${nombre} para mí?`,
      a: `Revisa tres cosas: número de miembros activos, actividad reciente (últimos mensajes de hoy o ayer) y reglas fijadas por los admins. Nuestro directorio filtra por estos criterios. Prueba 2-3 durante una semana y quédate con el que aporte más valor a tu día a día.`,
    },
    {
      q: `¿Puedo publicar mi propio grupo de ${nombre} en el directorio?`,
      a: `Sí, gratis. Rellena el formulario de "Añadir grupo" con el enlace, descripción y categoría. Revisamos manualmente en 24-48 horas y lo publicamos si es apto (nada de contenido adulto, pirata o estafas).`,
    },
    {
      q: `¿Cuántos miembros tiene un grupo de Telegram típico de ${nombre}?`,
      a: `Los grupos varían enormemente: desde comunidades chicas de 500-2.000 miembros muy activas hasta megagrupos de 100.000+ suscriptores. En ${nombre.toLowerCase()} la ratio actividad/miembros suele ser más importante que el tamaño puro. Comunidades de 5.000-20.000 miembros suelen tener el mejor debate.`,
    },
    {
      q: `¿Los grupos y canales de ${nombre} en Telegram están moderados?`,
      a: `Los buenos sí. Tienen admins visibles, reglas fijadas al inicio y bots antispam como @combot o @ShieldyBot. Si te unes a un grupo y los primeros mensajes son solo publicidad o spam, sal y busca otro: nuestro directorio los sustituye rápidamente cuando pierden calidad.`,
    },
    {
      q: `¿En qué se diferencia un grupo de ${nombre} de un canal?`,
      a: `El grupo permite conversación bidireccional (todos escriben, hasta 200.000 miembros). El canal es unidireccional (solo admins publican, miembros ilimitados). Para ${nombre.toLowerCase()} suelen coexistir: un canal para noticias/actualizaciones y un grupo hermano para debate. Únete a ambos si el nicho lo justifica.`,
    },
  ];
}
