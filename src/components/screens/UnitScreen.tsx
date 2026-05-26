"use client";

import { useState } from "react";
import TopBar from "@/components/kiosk/TopBar";
import UnitCard, { STATUS } from "@/components/kiosk/UnitCard";
import Lightbox from "@/components/kiosk/Lightbox";
import { useStore } from "@/store/kiosk-store";
import { cn } from "@/lib/utils";
import { UNITS } from "@/data/units";
import { UNIT_CONTENT } from "@/data/content/unit-screen";

export default function UnitScreen() {
  const goTo     = useStore((s) => s.goTo);
  const type     = useStore((s) => s.houseType);
  const selUnit  = useStore((s) => s.unit);
  const pickUnit = useStore((s) => s.pickUnit);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeType, setType]   = useState("all");

  if (!type) return null;

  const units   = UNITS[type.id] ?? [];
  const types   = ["all", ...new Set(units.map((u) => u.type))];
  const visible = activeType === "all" ? units : units.filter((u) => u.type === activeType);
  const avail   = units.filter((u) => u.status === "available").length;

  return (
    <div className="absolute inset-0 flex flex-col animate-screen-in bg-[#EDE8DE]">
      <TopBar />
      <div className="flex-1 overflow-hidden flex">

        {/* ── Sidebar ───────────────────────────────────── */}
        <div className="w-56 shrink-0 flex flex-col p-5 gap-5 overflow-y-auto bg-[#F5F0E8] border-r border-[rgba(27,94,53,0.1)]">

          {/* Filter tipe */}
          <div>
            <div className="text-[9.5px] tracking-[3px] uppercase font-bold text-[#9AAD9C] mb-2">
              {UNIT_CONTENT.sidebar.filterLabel}
            </div>
            <div className="flex flex-col gap-1.5">
              {types.map((t) => {
                const cnt = t === "all"
                  ? units.filter((u) => u.status !== "sold").length
                  : units.filter((u) => u.type === t && u.status !== "sold").length;
                const active = activeType === t;
                return (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={cn(
                      "flex justify-between items-center px-3.5 py-2.5 rounded-xl transition-all",
                      "text-[12.5px] font-semibold border-[1.5px]",
                      active
                        ? "bg-[rgba(27,94,53,0.1)] border-[rgba(27,94,53,0.3)] text-[#1B5E35]"
                        : "bg-[#FDFAF4] border-[rgba(27,94,53,0.1)] text-[#7A9480]",
                    )}
                  >
                    <span>{t === "all" ? UNIT_CONTENT.sidebar.allBlocksLabel : `Tipe ${t}`}</span>
                    <span className="rounded-lg px-1.5 py-0.5 text-[9.5px] font-bold bg-[rgba(27,94,53,0.1)] text-[#1B5E35]">
                      {cnt}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legenda */}
          <div>
            <div className="text-[9.5px] tracking-[3px] uppercase font-bold text-[#9AAD9C] mb-2">
              {UNIT_CONTENT.sidebar.legendLabel}
            </div>
            {Object.entries(STATUS).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2.5 py-1.5">
                <div className="size-2.5 rounded-full shrink-0" style={{ background: v.dot }} />
                <span className="text-[11px] text-[#7A9480]">{v.label}</span>
              </div>
            ))}
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
            {visible.map((u) => (
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

      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}
