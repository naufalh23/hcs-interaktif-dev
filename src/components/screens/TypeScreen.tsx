"use client";

import TopBar from "@/components/kiosk/TopBar";
import { useStore } from "@/store/kiosk-store";
import { cn, formatPrice } from "@/lib/utils";
import type { HouseType } from "@/data/house-types";
import { IoHome } from "react-icons/io5";

const BADGE_STYLE: Record<string, string> = {
  ready: "bg-green-900/10 text-green-800 border border-green-900/20",
  indent: "bg-yellow-700/10 text-yellow-800 border border-yellow-700/20",
  hot: "bg-red-800/10 text-red-800 border border-red-800/20",
};

const BADGE_PULSE: Record<string, string> = {
  ready: "bg-green-700/40",
  indent: "bg-yellow-600/40",
  hot: "bg-red-600/40",
};

export default function TypeScreen({
  houseTypes,
}: {
  houseTypes: HouseType[];
}) {
  const pickType = useStore((s) => s.pickType);
  const current = useStore((s) => s.houseType);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#EDE8DE] animate-screen-in">
      <TopBar />

      <div className="flex-1 overflow-y-auto p-7 flex flex-col gap-5">
        {/* Header */}
        <div>
          <div className="text-[10px] tracking-[3px] uppercase font-bold text-[#9AAD9C] mb-1.5">
            Langkah 1 dari 4
          </div>

          <h1 className="font-serif font-light text-[38px] text-[#163F25] leading-[1.1] mb-1">
            Pilih <em className="text-[#1B5E35] italic">Cluster</em> &amp; Tipe
          </h1>

          <p className="text-xs text-[#7A9480]">
            Jl. Raya Parung No. 27, Bojongsari, Depok · Tersedia mulai Rp 800
            Juta
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-4">
          {houseTypes.map((t) => (
            <TypeCard
              key={t.id}
              type={t}
              selected={current?.id === t.id}
              onSelect={() => pickType(t)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TypeCard({
  type: t,
  selected,
  onSelect,
}: {
  type: HouseType;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button onClick={onSelect} className="text-left group">
      <div
        className={cn(
          "relative overflow-hidden rounded-[18px] border transition-all duration-300 bg-[#FDFAF4]",
          selected
            ? "border-green-900 shadow-[0_0_0_1.5px_#1B5E35,0_16px_40px_rgba(27,94,53,0.14)]"
            : "border-green-900/20 shadow-sm hover:-translate-y-1",
        )}
      >
        <div className="absolute top-3 right-3 z-10 flex items-center justify-center">
          {/* Pulse Ring */}
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-60",
              BADGE_PULSE[t.badge],
            )}
          />

          {/* Badge */}
          <div
            className={cn(
              "relative px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[1.5px] uppercase",
              BADGE_STYLE[t.badge],
            )}
          >
            {t.badgeLabel}
          </div>
        </div>

        {/* Checkmark */}
        {selected && (
          <div className="absolute top-3 left-3 z-10 w-6 h-6 rounded-full flex items-center justify-center bg-[#1B5E35] text-[#F5F0E8] text-[11px] font-bold animate-pop-in">
            ✓
          </div>
        )}

        {/* Illustration */}
        <div className="h-32 flex items-center justify-center bg-gradient-to-br from-[#EDE8DE] to-[#E3DDD2] overflow-hidden">
          <IoHome
            size={120}
            className="text-[#1B5E35] drop-shadow-md opacity-90 group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <div className="p-4 border-t border-green-900/10">
          <div className="text-lg tracking-[2px] uppercase font-bold text-[#1B5E35] mb-0.5">
            {t.cluster}
          </div>

          <div className="font-serif font-semibold text-xl text-[#163F25] mb-1">
            {t.name}
          </div>

          <div className="text-xs text-[#8A9E8C] mb-3">
            {t.floors} Lantai · LB {t.buildingArea}m² · LT {t.landArea}m²
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="font-serif font-bold text-2xl text-[#163F25]">
                {formatPrice(t.basePrice)}
              </div>
              <div className="text-xs text-[#9AAD9C]">/unit</div>
            </div>

            <div className="flex gap-3">
              {[
                ["KT", t.bedrooms],
                ["KM", t.bathrooms],
              ].map(([l, v]) => (
                <div key={l as string} className="text-center">
                  <div className="text-lg font-bold text-[#4A7A5A]">{v}</div>
                  <div className="text-xs text-[#9AAD9C]">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
