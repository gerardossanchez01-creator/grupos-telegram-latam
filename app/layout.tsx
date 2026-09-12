import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { SITE } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Directorio de Grupos y Canales de Telegram`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: SITE.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="ehzvaJrTd1Mn1qR_RXVzravheM6bL_S8mLdwcV-SAyU" />
        {/* Google AdSense — meta de verificación + script async */}
        <meta name="google-adsense-account" content={SITE.adsenseClient} />
        <Script
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE.adsenseClient}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-slate-50 text-slate-900">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg text-brand">
              📢 {SITE.name}
            </Link>
            <nav className="hidden md:flex gap-4 text-sm">
              <Link href="/categoria/ofertas-y-chollos" className="hover:text-brand">Ofertas</Link>
              <Link href="/categoria/criptomonedas" className="hover:text-brand">Cripto</Link>
              <Link href="/categoria/empleo-y-freelance" className="hover:text-brand">Empleo</Link>
              <Link href="/categoria/programacion" className="hover:text-brand">Programación</Link>
              <Link href="/categoria/gaming" className="hover:text-brand">Gaming</Link>
              <Link href="/categoria/anime-y-manga" className="hover:text-brand">Anime</Link>
              <Link href="/bots" className="hover:text-brand">Bots</Link>
              <Link href="/blog" className="hover:text-brand">Blog</Link>
              <Link href="/anadir-grupo" className="hover:text-brand font-medium text-brand">+ Añadir</Link>
            </nav>
            <nav className="md:hidden flex gap-3 text-sm">
              <Link href="/bots" className="hover:text-brand">Bots</Link>
              <Link href="/blog" className="hover:text-brand">Blog</Link>
              <Link href="/anadir-grupo" className="hover:text-brand font-medium text-brand">+ Añadir</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-slate-200 bg-white mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-600">
            <p>© {new Date().getFullYear()} {SITE.name}. Este sitio no está afiliado con Telegram.</p>
            <p className="mt-2">
              <Link href="/politica-privacidad" className="hover:underline">Privacidad</Link> · <Link href="/terminos" className="hover:underline">Términos</Link> · <Link href="/contacto" className="hover:underline">Contacto</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
