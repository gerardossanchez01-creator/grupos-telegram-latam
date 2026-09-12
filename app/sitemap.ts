import type { MetadataRoute } from "next";
import { CATEGORIAS, PAISES, grupos, SITE } from "@/lib/data";
import { PILARES_SLUGS } from "@/data/pilares";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/anadir-grupo`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ...CATEGORIAS.map((c) => ({
      url: `${SITE.url}/categoria/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...PAISES.map((p) => ({
      url: `${SITE.url}/pais/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...grupos.map((g) => ({
      url: `${SITE.url}/grupo/${g.slug}`,
      lastModified: new Date(g.fechaAgregado),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...getAllPosts().map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...PILARES_SLUGS.flatMap((pilar) =>
      PAISES.map((p) => ({
        url: `${SITE.url}/categoria/${pilar}/en/${p.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }))
    ),
  ];
  return urls;
}
