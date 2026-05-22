"use client";

import Image from "next/image";
import TopBar from "@/components/kiosk/TopBar";
import { useStore } from "@/store/kiosk-store";
import { cn, formatPrice } from "@/lib/utils";
import type { HouseType } from "@/data/house-types";
import { UNITS } from "@/data/units";
import { CLUSTER_CONTENT } from "@/data/content/cluster-screen";

const BADGE_RIBBON: Record<string, string> = {
  ready:  "bg-[#0FA876] text-white",
  indent: "bg-[#C9780A] text-white",
  hot:    "bg-[#C83030] text-white",
};

const CLUSTER_IMAGE: Record<string, string> = {
  "Cluster Akasia":     "/Akasia.png",
  "Cluster Borneo":     "/Borneo.png",
  "Cluster Cemara":     "/Cemara.png",
  "Cluster Damar":      "/Damar.png",
  "Cluster Eucalyptus": "/Eucalyptus.png",
  "Cluster Gaharu":     "/Gaharu.png",
};

export default function ClusterScreen({
  houseTypes,
}: {
  houseTypes: HouseType[];
}) {
  const pickType = useStore((s) => s.pickType);
  const current  = useStore((s) => s.houseType);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#EDE8DE] animate-screen-in">
      <TopBar />

      <div className="flex-1 overflow-y-auto p-7 flex flex-col gap-5">
        {/* Header */}
        <div>
          <div className="text-[10px] tracking-[3px] uppercase font-bold text-[#9AAD9C] mb-1.5">
            {CLUSTER_CONTENT.stepLabel}
          </div>
          <h1 className="font-serif font-bold text-[38px] text-[#163F25] leading-[1.1] mb-1">
            {CLUSTER_CONTENT.heading}{" "}
          </h1>
          <p className="text-xs text-[#7A9480]">{CLUSTER_CONTENT.subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-4">
          {houseTypes.map((t) => {
            const stock = (UNITS[t.id] ?? []).filter((u) => u.status === "available").length;
            return (
              <TypeCard
                key={t.id}
                type={t}
                stock={stock}
                selected={current?.id === t.id}
                onSelect={() => pickType(t)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TypeCard({
  type: t,
  stock,
  selected,
  onSelect,
}: {
  type: HouseType;
  stock: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const clusterImg = CLUSTER_IMAGE[t.cluster];

  return (
    <button
      onClick={onSelect}
      className={cn(
        "text-left w-full rounded-2xl overflow-hidden transition-all duration-300",
        "shadow-[0_2px_12px_rgba(27,94,53,0.1)]",
        selected
          ? "ring-2 ring-[#1B5E35] ring-offset-2 shadow-[0_8px_32px_rgba(27,94,53,0.2)] -translate-y-0.5"
          : "hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(27,94,53,0.15)]",
      )}
    >
      {/* ── Top: image / gradient header ─────────────────────── */}
      <div className="relative h-50 overflow-hidden">

        {/* Cluster illustration */}
        {clusterImg ? (
          <Image
            src={clusterImg}
            alt=""
            fill
            className="object-cover object-center"
          />
        ) : (
          /* subtle radial glow fallback */
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_80%_110%,rgba(255,255,255,0.08)_0%,transparent_70%)]" />
        )}

        {/* dot texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[18px_18px]" />

        {/* bottom scrim */}
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />

        {/* Corner ribbon badge */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
          <div
            className={cn(
              "absolute top-4 -right-5 w-24 py-1 rotate-45 text-center",
              "text-[8px] font-bold tracking-[1.5px] uppercase shadow",
              BADGE_RIBBON[t.badge],
            )}
          >
            {t.badgeLabel}
          </div>
        </div>

        {/* Selected check */}
        {selected && (
          <div className="absolute top-3 left-3 z-10 w-6 h-6 rounded-full flex items-center justify-center bg-white text-[#1B5E35] text-[11px] font-bold animate-pop-in shadow">
            ✓
          </div>
        )}

      </div>

      {/* ── Bottom: info area ─────────────────────────────────── */}
      <div className="bg-[#FDFAF4] px-4 pt-3.5 pb-4">

        {/* Title row */}
        <div className="font-bold text-2xl tracking-[2px] uppercase text-[#163F25] mb-2">
          {t.cluster}
        </div>

        {/* Type dimensions */}
        <div className="text-lg text-[#9AAD9C] tracking-[0.5px] uppercase mb-0.5">
          Tipe
        </div>
        <div className="text-xl font-medium text-[#4A7A5A] mb-3">
          {t.types.map((v) => `${v.buildingArea}/${v.landArea}`).join(" · ")}
        </div>

        {/* Price + Stock */}
        <div className="flex items-end justify-between border-t border-[rgba(27,94,53,0.08)] pt-2.5">
          <div>
            <div className="text-md text-[#9AAD9C] tracking-[0.5px] mb-0.5">
              Mulai Dari
            </div>
            <div className="font-bold text-2xl text-[#163F25]">
              {formatPrice(t.basePrice)}
            </div>
            <div className="text-sm text-[#9AAD9C] mt-0.5">/Unit</div>
          </div>

          <div className="text-right">
            <div className="text-md text-[#9AAD9C] tracking-[0.5px] mb-0.5">Available</div>
            <div className="font-bold text-2xl text-[#163F25]">
              {stock}
            </div>
            <div className="text-md text-[#9AAD9C] mt-0.5">Unit</div>
          </div>
        </div>
      </div>
    </button>
  );
}
