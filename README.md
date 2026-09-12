# Grupos Telegram LatAm

Directorio SEO de grupos y canales de Telegram en español, orientado a monetización con Google AdSense.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- SSG (build-time) — todas las páginas se generan estáticas para máximo rendimiento SEO/AdSense
- Scraper propio en TS con Cheerio

## Estructura de rutas

```
/                        Home + categorías + últimos grupos
/categoria/[slug]        Página por categoría (18 nichos aptos AdSense)
/pais/[slug]             Página por país (8 países LatAm + España)
/grupo/[slug]            Ficha individual con botón "Unirme"
/anadir-grupo            Formulario UGC
/sitemap.xml             Auto-generado
/robots.txt              Auto-generado
/ads.txt                 AdSense
```

## Cómo empezar

```bash
npm install
npm run dev        # http://localhost:3000
npm run scrape     # popula data/grupos-scraped.json (revisar manualmente)
npm run build      # genera sitio estático
npm start
```

## Configurar AdSense

1. Sustituye `ca-pub-XXXXXXXXXXXXXXXX` por tu client ID en `lib/data.ts`.
2. Actualiza `public/ads.txt` con tu publisher ID.
3. Crea 3 unidades de anuncio en AdSense y sustituye los `slot="..."` en:
   - `app/page.tsx`
   - `app/categoria/[slug]/page.tsx`
   - `app/grupo/[slug]/page.tsx`

## Estrategia SEO

- **Head term**: "grupos de telegram" (135K/mes MX, 27K/mes ES) — captado por home.
- **Long-tail categoría**: "grupos de telegram de [nicho]" — 18 páginas.
- **Long-tail geo**: "grupos de telegram [país]" — 8 páginas.
- **Ficha grupo**: keyword "[nombre del grupo] telegram" — cientos de páginas conforme se añaden.

Meta objetivo mes 6: 500 grupos en el directorio, 3-5K visitas/día, ~$15-40/día en AdSense (CPC bajo LatAm pero volumen alto).

## Moderación

**Nunca aceptar** en el formulario ni en scraping:
- Contenido adulto/NSFW
- Piratería (streaming, warez, IPTV, cracks)
- Apuestas / casinos
- Estafas / criptomonedas dudosas / esquemas piramidales
- Contenido político extremista

Google AdSense suspende cuentas por 1 sola URL infractora.

## Despliegue

Vercel (recomendado): conecta el repo → deploy. Añade dominio custom desde el panel.
