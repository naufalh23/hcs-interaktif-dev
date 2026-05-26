"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IoBedOutline,
  IoWaterOutline,
  IoLayersOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoExpandOutline,
} from "react-icons/io5";
import { cn, formatPrice } from "@/lib/utils";
import type { Unit } from "@/data/units";
import SpecItem from "./SpecItem";

const STATUS: Record<string, { dot: string; label: string; pill: string }> = {
  available: { dot: "#22A85A", label: "Tersedia", pill: "bg-[rgba(20,160,80,0.82)] text-white"  },
  indent:    { dot: "#C9780A", label: "Inden",    pill: "bg-[rgba(201,120,10,0.82)] text-white" },
  sold:      { dot: "#B03030", label: "Terjual",  pill: "bg-[rgba(176,48,48,0.82)] text-white"  },
};

export { STATUS };

export default function UnitCard({
  unit: u,
  selected,
  onSelect,
  onOpenLightbox,
}: {
  unit: Unit;
  selected: boolean;
  onSelect: () => void;
  onOpenLightbox: (src: string) => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const st   = STATUS[u.status];
  const imgs = u.images ?? [];

  const prev = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setImgIdx((i) => Math.max(0, i - 1));
  };
  const next = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setImgIdx((i) => Math.min(imgs.length - 1, i + 1));
  };
  const openLightbox = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (imgs[imgIdx]) onOpenLightbox(imgs[imgIdx]);
  };

  return (
    <div
      onClick={onSelect}
      className={cn(
        "rounded-2xl overflow-hidden transition-all duration-200",
        "shadow-[0_2px_14px_rgba(27,94,53,0.09)]",
        u.status !== "sold" ? "cursor-pointer" : "cursor-not-allowed opacity-50",
        selected
          ? "ring-[2.5px] ring-[#1B5E35] ring-offset-2 shadow-[0_8px_28px_rgba(27,94,53,0.2)] -translate-y-0.5"
          : u.status !== "sold" && "hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(27,94,53,0.14)]",
      )}
    >
      {/* ── Carousel ──────────────────────────────────── */}
      <div className="relative h-40 bg-[#163F25] overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-br from-[#1B5E35] via-[#2E7D52] to-[#163F25]" />

        {imgs.length > 0 && (
          <div className="absolute inset-0 cursor-zoom-in" onClick={openLightbox}>
            <Image
              key={imgs[imgIdx]}
              src={imgs[imgIdx]}
              alt={u.code}
              fill
              className="object-cover object-center transition-opacity duration-300"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[14px_14px] pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

        {/* Status pill */}
        <div className={cn(
          "absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full pointer-events-none",
          "text-[7.5px] font-bold tracking-[1px] uppercase shadow-sm",
          st.pill,
        )}>
          {st.label}
        </div>

        {/* Selected check */}
        {selected && (
          <div className="absolute top-2.5 left-2.5 w-5.5 h-5.5 rounded-full pointer-events-none
                          flex items-center justify-center bg-white text-[#1B5E35]
                          text-[10px] font-bold shadow animate-pop-in">
            ✓
          </div>
        )}

        {/* Expand hint */}
        {imgs.length > 0 && (
          <div className="absolute bottom-2.5 left-3 opacity-0 group-hover:opacity-100 transition-opacity
                         flex items-center gap-1 pointer-events-none">
            <IoExpandOutline size={11} className="text-white/70" />
            <span className="text-[8px] text-white/60 tracking-[0.5px]">Perbesar</span>
          </div>
        )}

        {/* Arrows */}
        {imgs.length > 1 && (
          <>
            {imgIdx > 0 && (
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full
                           bg-black/35 backdrop-blur-[2px] flex items-center justify-center
                           text-white hover:bg-black/55 transition-colors z-10"
              >
                <IoChevronBackOutline size={13} />
              </button>
            )}
            {imgIdx < imgs.length - 1 && (
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full
                           bg-black/35 backdrop-blur-[2px] flex items-center justify-center
                           text-white hover:bg-black/55 transition-colors z-10"
              >
                <IoChevronForwardOutline size={13} />
              </button>
            )}
          </>
        )}

        {/* Dots */}
        {imgs.length > 1 && (
          <div className="absolute bottom-2.5 right-3 flex gap-1 items-center pointer-events-none">
            {imgs.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full transition-all duration-200",
                  i === imgIdx ? "w-3.5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/45",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Info panel ────────────────────────────────── */}
      <div className="bg-[#FDFAF4] px-4 pt-3 pb-3.5">
        <div className="flex justify-between items-start mb-2.5">
          <div className="font-serif font-bold text-[21px] text-[#163F25] leading-none">{u.code}</div>
          <div className="text-right">
            <div className="text-[8px] text-[#9AAD9C] tracking-[0.5px] uppercase mb-0.5">Harga</div>
            <div className="font-bold text-[13px] text-[#163F25] leading-none">{formatPrice(u.price)}</div>
          </div>
        </div>
        <div className="border-t border-[rgba(27,94,53,0.08)] pt-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <SpecItem icon={IoBedOutline}    value={u.bedrooms}  label="KT" />
            <SpecItem icon={IoWaterOutline}  value={u.bathrooms} label="KM" />
            <SpecItem icon={IoLayersOutline} value={`${u.floors} Lt`} />
          </div>
          {u.notes && (
            <div className="shrink-0 inline-flex items-center gap-1 rounded-lg px-2 py-0.5
                            text-[8px] font-semibold bg-[rgba(201,168,76,0.15)] text-[#7A5A00]">
              ★ {u.notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
