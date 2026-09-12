import gruposJson from "@/data/grupos.json";
import { CATEGORIAS, PAISES, type Categoria } from "@/data/categorias";

export type Grupo = {
  slug: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  pais: string;
  link: string;
  miembros: number;
  verificado: boolean;
  fechaAgregado: string;
};

export const SITE = {
  name: "Grupos Telegram LatAm",
  domain: "grupostelegramlatam.com",
  url: "https://grupostelegramlatam.com",
  description:
    "El directorio más grande de grupos y canales de Telegram en español. Ofertas, cripto, empleo, programación, gaming, anime y más.",
  adsenseClient: "ca-pub-XXXXXXXXXXXXXXXX", // reemplaza con tu client id
};

export const grupos: Grupo[] = gruposJson as Grupo[];

export function getGrupoBySlug(slug: string): Grupo | undefined {
  return grupos.find((g) => g.slug === slug);
}

export function getGruposByCategoria(slug: string): Grupo[] {
  return grupos
    .filter((g) => g.categoria === slug)
    .sort((a, b) => b.miembros - a.miembros);
}

export function getGruposByPais(slug: string): Grupo[] {
  return grupos
    .filter((g) => g.pais === slug)
    .sort((a, b) => b.miembros - a.miembros);
}

export function getCategoria(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}

export function getPais(slug: string) {
  return PAISES.find((p) => p.slug === slug);
}

export function formatMiembros(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K";
  return n.toString();
}

export { CATEGORIAS, PAISES };
