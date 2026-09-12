"use client";
import { useEffect } from "react";
import { SITE } from "@/lib/data";

type Props = { slot: string; format?: string; className?: string };

declare global {
  interface Window { adsbygoogle: unknown[] }
}

export default function AdSlot({ slot, format = "auto", className = "" }: Props) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);
  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={SITE.adsenseClient}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
