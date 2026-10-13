import AdsterraBanner from "@/components/AdsterraBanner";
import { getAdZone } from "@/data/adsterra";

/**
 * AdSlot: wrapper estable que las páginas ya usan como <AdSlot slot="..." />.
 * Antes servía anuncios de Google AdSense; ahora resuelve la zona de Adsterra
 * correspondiente a ese `slot` (ver data/adsterra.ts) y la renderiza.
 *
 * Mantener esta misma firma evita tener que editar cada página.
 */
type Props = { slot: string; format?: string; className?: string };

export default function AdSlot({ slot, className = "" }: Props) {
  const zone = getAdZone(slot);
  if (!zone) return null;
  return <AdsterraBanner zone={zone} className={className} />;
}
