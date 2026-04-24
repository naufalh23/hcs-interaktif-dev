"use client";

import { useState } from "react";
import TopBar from "@/components/kiosk/TopBar";
import { useStore } from "@/store/kiosk-store";
import { cn, formatPrice } from "@/lib/utils";
import { UNITS } from "@/data/units";
import type { Unit } from "@/data/units";

const STATUS: Record<string, { dot: string; bg: string; label: string }> = {
  available: { dot: "#22A85A", bg: "rgba(34,168,90,0.12)", label: "Tersedia" },
  indent: {
    dot: "#C9780A",
    bg: "rgba(201,120,10,0.1)",
    label: "Inden / Proses",
  },
  sold: { dot: "#B03030", bg: "rgba(176,48,48,0.08)", label: "Terjual" },
};

export default function UnitScreen() {
  const goTo = useStore((s) => s.goTo);
  const type = useStore((s) => s.houseType);
  const selUnit = useStore((s) => s.unit);
  const pickUnit = useStore((s) => s.pickUnit);
  const [activeBlock, setBlock] = useState("all");

  if (!type) return null;

  const units = UNITS[type.id] ?? [];
  const blocks = ["all", ...new Set(units.map((u) => u.block))];
  const visible =
    activeBlock === "all"
      ? units
      : units.filter((u) => u.block === activeBlock);
  const avail = units.filter((u) => u.status === "available").length;

  return (
    <div className="absolute inset-0 flex flex-col animate-screen-in bg-[#EDE8DE]">
      <TopBar />
      <div className="flex-1 overflow-hidden flex">
        {/* ── Sidebar ─────────────────────────────────── */}
        <div
          className="w-62.5 shrink-0 flex flex-col p-5 gap-4 overflow-y-auto
                        bg-[#F5F0E8] border-r border-[rgba(27,94,53,0.1)]"
        >
          {/* Filter blok */}
          <div>
            <div className="text-[9.5px] tracking-[3px] uppercase font-bold text-[#9AAD9C] mb-2">
              Filter Blok
            </div>
            <div className="flex flex-col gap-1.5">
              {blocks.map((b) => {
                const cnt =
                  b === "all"
                    ? units.filter((u) => u.status !== "sold").length
                    : units.filter((u) => u.block === b && u.status !== "sold")
                        .length;
                const active = activeBlock === b;
                return (
                  <button
                    key={b}
                    onClick={() => setBlock(b)}
                    className={cn(
                      "flex justify-between items-center px-3.5 py-2.5 rounded-xl transition-all",
                      "text-[12.5px] font-semibold border-[1.5px]",
                      active
                        ? "bg-[rgba(27,94,53,0.1)] border-[rgba(27,94,53,0.3)] text-[#1B5E35]"
                        : "bg-[#FDFAF4] border-[rgba(27,94,53,0.1)] text-[#7A9480]",
                    )}
                  >
                    <span className="capitalize">
                      {b === "all" ? "Semua Blok" : b}
                    </span>
                    <span
                      className="rounded-lg px-1.5 py-0.5 text-[9.5px] font-bold
                                     bg-[rgba(27,94,53,0.1)] text-[#1B5E35]"
                    >
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
              Keterangan
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

          {/* Tipe info */}
          <div
            className="mt-auto rounded-2xl p-3.5
                          bg-[rgba(27,94,53,0.07)] border border-[rgba(27,94,53,0.12)]"
          >
            <div className="text-[9px] tracking-[2px] uppercase font-bold text-[#9AAD9C] mb-1.5">
              Tipe Dipilih
            </div>
            <div className="font-serif font-semibold text-[17px] text-[#163F25] mb-0.5">
              {type.name}
            </div>
            <div className="text-[11px] text-[#7A9480]">{type.cluster}</div>
            <div className="text-[11px] text-[#9AAD9C] mt-0.5">
              LB {type.buildingArea}m² · LT {type.landArea}m²
            </div>
          </div>

          <button
            onClick={() => goTo("custom")}
            className="w-full py-2.75 rounded-xl border-[1.5px] border-[rgba(27,94,53,0.16)]
                       bg-transparent text-xs font-semibold text-[#7A9480]
                       transition-all hover:bg-[rgba(27,94,53,0.06)]"
          >
            ← Kembali
          </button>
        </div>

        {/* ── Main grid ───────────────────────────────── */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5">
          <div>
            <h1 className="font-serif font-light text-[36px] text-[#163F25] leading-[1.1] mb-1">
              Pilih <em className="text-[#1B5E35] italic">Kavling</em>
            </h1>
            <p className="text-[12px] text-[#7A9480]">
              {type.cluster} · {type.name} ·{" "}
              <strong className="text-[#1B5E35]">{avail} unit tersedia</strong>
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {visible.map((u) => (
              <UnitCard
                key={u.id}
                unit={u}
                selected={selUnit?.id === u.id}
                onSelect={() => u.status !== "sold" && pickUnit(u)}
              />
            ))}
          </div>

          <div className="mt-auto pt-2">
            <button
              onClick={() => selUnit && goTo("form")}
              disabled={!selUnit}
              className={cn(
                "w-full py-3.75 rounded-[14px] text-[13px] font-bold tracking-[2px] uppercase transition-all",
                selUnit
                  ? "bg-linier-to-br from-[#1B5E35] to-[#2E7D52] text-[#F5F0E8] cursor-pointer shadow-[0_6px_24px_rgba(27,94,53,0.25)]"
                  : "bg-[rgba(27,94,53,0.12)] text-[rgba(27,94,53,0.35)] cursor-not-allowed",
              )}
            >
              {selUnit
                ? `Lanjut Pesan — Kavling ${selUnit.code} →`
                : "Pilih unit terlebih dahulu"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UnitCard({
  unit: u,
  selected,
  onSelect,
}: {
  unit: Unit;
  selected: boolean;
  onSelect: () => void;
}) {
  const st = STATUS[u.status];
  return (
    <div
      onClick={onSelect}
      className={cn(
        "rounded-[14px] p-3.5 text-center transition-all relative border-[1.5px]",
        u.status !== "sold" ? "cursor-pointer" : "cursor-not-allowed",
        selected
          ? "bg-[rgba(27,94,53,0.08)] border-[#1B5E35] -translate-y-px shadow-[0_0_0_1.5px_#1B5E35,0_6px_20px_rgba(27,94,53,0.12)]"
          : "bg-[#FDFAF4] border-[rgba(27,94,53,0.12)] shadow-[0_1px_6px_rgba(27,94,53,0.06)]",
        u.status === "sold" && "opacity-45",
      )}
    >
      {/* Status dot */}
      <div
        className="absolute top-2.5 right-2.5 size-2 rounded-full"
        style={{
          background: st.dot,
          boxShadow: u.status === "available" ? `0 0 5px ${st.dot}` : "none",
        }}
      />

      {/* Check */}
      {selected && (
        <div
          className="absolute top-2 left-2 size-5 rounded-full flex items-center justify-center
                        animate-pop-in bg-[#1B5E35] text-[#F5F0E8] text-[9px] font-bold"
        >
          ✓
        </div>
      )}

      <div className="font-serif font-semibold text-[19px] text-[#163F25] mb-0.5">
        {u.code}
      </div>
      <div className="text-[10px] text-[#8A9E8C] mb-1">{u.block}</div>
      <div className="text-[10px] text-[#4A7A5A] font-semibold mb-1.5">
        ↑ {u.facing}
      </div>
      <div className="text-xs font-bold text-[#163F25]">
        {formatPrice(u.price)}
      </div>
      {u.notes && (
        <div
          className="mt-1.5 rounded-lg px-1.5 py-0.5 text-[8.5px] font-semibold
                        bg-[rgba(201,168,76,0.15)] text-[#7A5A00]"
        >
          {u.notes}
        </div>
      )}
    </div>
  );
}
