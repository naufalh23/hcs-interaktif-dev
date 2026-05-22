"use client";

import { useState } from "react";
import Image from "next/image";
import TopBar from "@/components/kiosk/TopBar";
import { useStore } from "@/store/kiosk-store";
import { cn, formatPrice } from "@/lib/utils";
import { UNITS } from "@/data/units";
import type { Unit } from "@/data/units";
import { UNIT_CONTENT } from "@/data/content/unit-screen";
import {
  IoBedOutline,
  IoWaterOutline,
  IoLayersOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoCloseOutline,
  IoExpandOutline,
} from "react-icons/io5";
import type { IconType } from "react-icons";

const STATUS: Record<string, { dot: string; label: string; pill: string }> = {
  available: { dot: "#22A85A", label: UNIT_CONTENT.statusLabels.available, pill: "bg-[rgba(20,160,80,0.82)] text-white"  },
  indent:    { dot: "#C9780A", label: UNIT_CONTENT.statusLabels.indent,    pill: "bg-[rgba(201,120,10,0.82)] text-white" },
  sold:      { dot: "#B03030", label: UNIT_CONTENT.statusLabels.sold,      pill: "bg-[rgba(176,48,48,0.82)] text-white"  },
};

export default function UnitScreen() {
  const goTo     = useStore((s) => s.goTo);
  const type     = useStore((s) => s.houseType);
  const selUnit  = useStore((s) => s.unit);
  const pickUnit = useStore((s) => s.pickUnit);
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!type) return null;

  const units = UNITS[type.id] ?? [];
  const avail = units.filter((u) => u.status === "available").length;

  return (
    <div className="absolute inset-0 flex flex-col animate-screen-in bg-[#EDE8DE]">
      <TopBar />
      <div className="flex-1 overflow-hidden flex">

        {/* ── Sidebar ───────────────────────────────────── */}
        <div className="w-56 shrink-0 flex flex-col p-5 gap-5 overflow-y-auto bg-[#F5F0E8] border-r border-[rgba(27,94,53,0.1)]">

          {/* Legenda */}
          <div>
            <div className="text-[9.5px] tracking-[3px] uppercase font-bold text-[#9AAD9C] mb-2">
              {UNIT_CONTENT.sidebar.legendLabel}
            </div>
            {Object.entries(STATUS).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2.5 py-1.5">
                <div
                  className="size-2.5 rounded-full shrink-0"
                  style={{ background: v.dot }}
                />
                <span className="text-[11px] text-[#7A9480]">{v.label}</span>
              </div>
            ))}
          </div>

          {/* Statistik unit */}
          <div className="rounded-xl p-3.5 bg-[rgba(27,94,53,0.06)] border border-[rgba(27,94,53,0.1)]">
            <div className="text-[9px] tracking-[2px] uppercase font-bold text-[#9AAD9C] mb-2">
              Ringkasan
            </div>
            {(["available", "indent", "sold"] as const).map((s) => {
              const cnt = units.filter((u) => u.status === s).length;
              return (
                <div key={s} className="flex justify-between items-center py-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-2 rounded-full shrink-0"
                      style={{ background: STATUS[s].dot }}
                    />
                    <span className="text-[10.5px] text-[#7A9480]">{STATUS[s].label}</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#163F25]">{cnt}</span>
                </div>
              );
            })}
          </div>

          {/* Cluster info */}
          <div className="mt-auto rounded-2xl p-3.5 bg-[rgba(27,94,53,0.07)] border border-[rgba(27,94,53,0.12)]">
            <div className="text-[9px] tracking-[2px] uppercase font-semibold text-[#9AAD9C] mb-1">
              {UNIT_CONTENT.sidebar.selectedTypeLabel}
            </div>
            <div className="font-semibold text-[18px] text-[#163F25] leading-tight">{type.cluster}</div>
          </div>

          <button
            onClick={() => goTo("cluster")}
            className="w-full py-2.5 rounded-xl border-[1.5px] border-[rgba(27,94,53,0.16)]
                       bg-transparent text-xs font-semibold text-[#7A9480]
                       transition-all hover:bg-[rgba(27,94,53,0.06)]"
          >
            ← Kembali
          </button>
        </div>

        {/* ── Main grid ─────────────────────────────────── */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5">
          <div>
            <div className="text-[9.5px] tracking-[3px] uppercase font-bold text-[#9AAD9C] mb-1">
              {UNIT_CONTENT.stepLabel}
            </div>
            <h1 className="font-serif font-light text-[36px] text-[#163F25] leading-[1.1] mb-1">
              {UNIT_CONTENT.heading}
            </h1>
            <p className="text-[12px] text-[#7A9480]">
              {UNIT_CONTENT.subtitle} ·{" "}
              <strong className="text-[#1B5E35]">{avail} unit tersedia</strong>
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {units.map((u) => (
              <UnitCard
                key={u.id}
                unit={u}
                selected={selUnit?.id === u.id}
                onSelect={() => u.status !== "sold" && pickUnit(u)}
                onOpenLightbox={setLightbox}
              />
            ))}
          </div>

          <div className="mt-auto pt-2">
            <button
              onClick={() => selUnit && goTo("addon")}
              disabled={!selUnit}
              className={cn(
                "w-full py-3.75 rounded-[14px] text-[13px] font-bold tracking-[2px] uppercase transition-all",
                selUnit
                  ? "bg-linear-to-br from-[#1B5E35] to-[#2E7D52] text-[#F5F0E8] cursor-pointer shadow-[0_6px_24px_rgba(27,94,53,0.25)]"
                  : "bg-[rgba(27,94,53,0.12)] text-[rgba(27,94,53,0.35)] cursor-not-allowed",
              )}
            >
              {selUnit ? `Lanjut Pilih Add On →` : UNIT_CONTENT.emptySelection}
            </button>
          </div>
        </div>

      </div>

      {/* ── Lightbox ────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                       flex items-center justify-center text-white transition-colors"
          >
            <IoCloseOutline size={22} />
          </button>

          {/* Image container */}
          <div
            className="relative w-[70vw] h-[70vh] rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox}
              alt=""
              fill
              className="object-cover"
              sizes="70vw"
            />
          </div>

          {/* Tap outside hint */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] text-white/40 tracking-[1px]">
            Klik di luar untuk menutup
          </p>
        </div>
      )}
    </div>
  );
}

/* ── UnitCard ─────────────────────────────────────────────── */

function UnitCard({
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

        {/* Gradient fallback */}
        <div className="absolute inset-0 bg-linear-to-br from-[#1B5E35] via-[#2E7D52] to-[#163F25]" />

        {/* Image — klik untuk perbesar */}
        {imgs.length > 0 && (
          <div
            className="absolute inset-0 cursor-zoom-in"
            onClick={openLightbox}
          >
            <Image
              key={imgs[imgIdx]}
              src={imgs[imgIdx]}
              alt={u.code}
              fill
              className="object-cover object-center transition-opacity duration-300"
            />
          </div>
        )}

        {/* Subtle dot texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[14px_14px] pointer-events-none" />

        {/* Bottom scrim */}
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

        {/* Status pill — top right */}
        <div className={cn(
          "absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full pointer-events-none",
          "text-[7.5px] font-bold tracking-[1px] uppercase shadow-sm",
          st.pill,
        )}>
          {st.label}
        </div>

        {/* Selected check — top left */}
        {selected && (
          <div className="absolute top-2.5 left-2.5 w-[22px] h-[22px] rounded-full pointer-events-none
                          flex items-center justify-center bg-white text-[#1B5E35]
                          text-[10px] font-bold shadow animate-pop-in">
            ✓
          </div>
        )}

        {/* Expand hint icon — bottom-left, shows on hover */}
        {imgs.length > 0 && (
          <div
            className="absolute bottom-2.5 left-3 opacity-0 group-hover:opacity-100 transition-opacity
                       flex items-center gap-1 pointer-events-none"
          >
            <IoExpandOutline size={11} className="text-white/70" />
            <span className="text-[8px] text-white/60 tracking-[0.5px]">Perbesar</span>
          </div>
        )}

        {/* Carousel arrows */}
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

        {/* Dot indicators — bottom right */}
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

        {/* Code + Price */}
        <div className="flex justify-between items-start mb-2.5">
          <div className="font-serif font-bold text-[21px] text-[#163F25] leading-none">
            {u.code}
          </div>
          <div className="text-right">
            <div className="text-[8px] text-[#9AAD9C] tracking-[0.5px] uppercase mb-0.5">Harga</div>
            <div className="font-bold text-[13px] text-[#163F25] leading-none">
              {formatPrice(u.price)}
            </div>
          </div>
        </div>

        {/* Specs + Notes dalam satu baris */}
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

/* ── SpecItem ─────────────────────────────────────────────── */

function SpecItem({
  icon: Icon,
  value,
  label,
}: {
  icon: IconType;
  value: number | string;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon size={14} className="text-[#4A7A5A] shrink-0" />
      <span className="text-[13px] font-semibold text-[#163F25]">{value}</span>
      {label && <span className="text-[11px] text-[#9AAD9C]">{label}</span>}
    </div>
  );
}
