"use client";
import { useMemo } from "react";
import type { AdZone } from "@/data/adsterra";

/**
 * Renderiza un banner de Adsterra dentro de un <iframe srcDoc> aislado.
 * Esto evita el conflicto del objeto global `atOptions` cuando hay varios
 * banners en la misma página (problema clásico de Adsterra en React/SSG).
 *
 * Si la zona aún no tiene `key`, no renderiza anuncio (placeholder en dev).
 */
export default function AdsterraBanner({ zone, className = "" }: { zone: AdZone; className?: string }) {
  const srcDoc = useMemo(() => {
    if (!zone.key) return "";
    return `<!doctype html><html><head><meta charset="utf-8">
<style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style>
</head><body>
<script type="text/javascript">
  atOptions = {
    'key' : '${zone.key}',
    'format' : 'iframe',
    'height' : ${zone.height},
    'width' : ${zone.width},
    'params' : {}
  };
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/${zone.key}/invoke.js"></script>
</body></html>`;
  }, [zone.key, zone.width, zone.height]);

  if (!zone.key) {
    // Hueco reservado: invisible en producción, visible en desarrollo.
    return (
      <div
        className={`ad-placeholder ${className}`}
        data-ad-network="adsterra"
        style={{
          display: process.env.NODE_ENV === "development" ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: zone.width,
          height: zone.height,
          margin: "0 auto",
          border: "1px dashed #cbd5e1",
          color: "#94a3b8",
          fontSize: 12,
        }}
      >
        Adsterra {zone.width}×{zone.height} (pega la key)
      </div>
    );
  }

  return (
    <div className={className} style={{ display: "flex", justifyContent: "center" }}>
      <iframe
        title="advertisement"
        aria-hidden="true"
        srcDoc={srcDoc}
        width={zone.width}
        height={zone.height}
        scrolling="no"
        frameBorder={0}
        style={{ width: "100%", maxWidth: zone.width, height: zone.height, border: 0, overflow: "hidden" }}
      />
    </div>
  );
}
