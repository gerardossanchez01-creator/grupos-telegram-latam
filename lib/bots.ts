import botsJson from "@/data/bots.json";
import { BOT_CATEGORIAS, type BotCategoria } from "@/data/bots-categorias";

export type Bot = {
  slug: string;
  nombre: string;
  username: string;
  descripcion: string;
  categoria: string;
  comando: string;
  oficial: boolean;
  verificado: boolean;
  usuarios: number;
  caracteristicas: string[];
  fechaAgregado: string;
};

export const bots: Bot[] = botsJson as Bot[];

export function getBotBySlug(slug: string): Bot | undefined {
  return bots.find((b) => b.slug === slug);
}

export function getBotsByCategoria(slug: string): Bot[] {
  return bots.filter((b) => b.categoria === slug).sort((a, b) => b.usuarios - a.usuarios);
}

export function getBotCategoria(slug: string): BotCategoria | undefined {
  return BOT_CATEGORIAS.find((c) => c.slug === slug);
}

export function formatUsuariosBot(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

export { BOT_CATEGORIAS };
