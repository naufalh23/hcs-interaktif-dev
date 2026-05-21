"use client";

import TopBar from "@/components/kiosk/TopBar";
import { useStore } from "@/store/kiosk-store";
import { cn, formatPrice } from "@/lib/utils";
import { ADDON_OPTIONS } from "@/data/customization";
import type { AddonOption } from "@/data/customization";
import {
  IoConstructOutline,
  IoColorPaletteOutline,
  IoLockClosedOutline,
  IoSnowOutline,
  IoSunnyOutline,
  IoCallOutline,
} from "react-icons/io5";
import type { IconType } from "react-icons";

const ADDON_ICONS: Record<string, IconType> = {
  pre_ac:    IoConstructOutline,
  cat:       IoColorPaletteOutline,
  smartlock: IoLockClosedOutline,
  ac1pk:     IoSnowOutline,
  ac05pk:    IoSnowOutline,
  solar:     IoSunnyOutline,
};

export default function AddonScreen() {
  const goTo   = useStore((s) => s.goTo);
  const type   = useStore((s) => s.houseType);
  const custom = useStore((s) => s.custom);
  const toggle = useStore((s) => s.toggleAddon);
  const extra  = useStore((s) => s.extraPrice());
  const total  = useStore((s) => s.totalPrice());

  if (!type) return null;

  return (
    <div className="absolute inset-0 flex flex-col animate-screen-in bg-[#EDE8DE]">
      <TopBar />
      <div className="flex-1 overflow-hidden flex">

        {/* ── Left: price summary + nav ──────────────────── */}
        <div className="w-72 shrink-0 flex flex-col p-6 gap-4 bg-[#F5F0E8] border-r border-[rgba(27,94,53,0.1)] overflow-y-auto">
          <div>
            <div className="text-[9.5px] tracking-[3px] uppercase font-bold text-[#9AAD9C] mb-1">
              Langkah 3 dari 4
            </div>
            <div className="font-serif font-light text-[26px] text-[#163F25] leading-tight">
              Pilih <em className="italic text-[#1B5E35]">Addon</em>
            </div>
            <p className="text-[11px] text-[#7A9480] mt-1">
              {type.cluster} · {type.types[0].buildingArea}/{type.types[0].landArea}
            </p>
          </div>

          {/* Addon yang dipilih */}
          <div className="flex-1">
            {ADDON_OPTIONS.filter((a) => custom.addons[a.id]).length === 0 ? (
              <p className="text-[11px] text-[#9AAD9C] italic">Belum ada addon dipilih.</p>
            ) : (
              <div className="flex flex-col gap-1.5">
                {ADDON_OPTIONS.filter((a) => custom.addons[a.id]).map((a) => (
                  <div key={a.id} className="flex justify-between items-center text-[11px]">
                    <span className="text-[#4A6A55]">✓ {a.name}</span>
                    <span className="font-semibold text-[#8B6A00]">
                      {a.contact ? "—" : a.price === 0 ? "Gratis" : `+${formatPrice(a.price)}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Harga */}
          <div className="rounded-2xl p-4 border border-[rgba(27,94,53,0.1)] bg-[#FDFAF4]">
            <div className="text-[9px] tracking-[2.5px] uppercase font-bold text-[#9AAD9C] mb-2">
              Estimasi Harga
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-[11px] text-[#7A9480]">Harga Dasar</span>
              <span className="text-[11px] font-semibold text-[#4A6A55]">{formatPrice(type.basePrice)}</span>
            </div>
            {extra > 0 && (
              <div className="flex justify-between mb-1">
                <span className="text-[11px] text-[#7A9480]">Addon</span>
                <span className="text-[11px] font-semibold text-[#8B6A00]">+{formatPrice(extra)}</span>
              </div>
            )}
            <div className="border-t border-dashed border-[rgba(27,94,53,0.14)] mt-2 pt-2 flex justify-between items-baseline">
              <span className="text-[10.5px] font-bold text-[#163F25] uppercase tracking-[1px]">Total</span>
              <span className="font-serif font-bold text-[20px] text-[#163F25]">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Nav */}
          <div className="flex gap-2">
            <button
              onClick={() => goTo("unit")}
              className="px-4 py-3 rounded-xl border-[1.5px] border-[rgba(27,94,53,0.18)] bg-transparent
                         text-xs font-semibold text-[#7A9480] transition-all hover:bg-[rgba(27,94,53,0.06)]"
            >
              ← Kavling
            </button>
            <button
              onClick={() => goTo("form")}
              className="flex-1 py-3 rounded-xl bg-linear-to-br from-[#1B5E35] to-[#2E7D52]
                         text-[#F5F0E8] text-xs font-bold tracking-[2px] uppercase
                         shadow-[0_4px_20px_rgba(27,94,53,0.22)] transition-all hover:scale-[1.01]"
            >
              Lanjut →
            </button>
          </div>
        </div>

        {/* ── Right: addon cards ─────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-7">
          <div className="text-[9.5px] tracking-[3px] uppercase font-bold text-[#9AAD9C] mb-4">
            Fasilitas Tambahan
          </div>
          <div className="grid grid-cols-2 gap-3">
            {ADDON_OPTIONS.map((a) => (
              <AddonCard
                key={a.id}
                addon={a}
                active={!!custom.addons[a.id]}
                onToggle={() => toggle(a.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddonCard({
  addon: a,
  active,
  onToggle,
}: {
  addon: AddonOption;
  active: boolean;
  onToggle: () => void;
}) {
  const Icon = ADDON_ICONS[a.id];

  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center gap-3.5 p-4 rounded-2xl text-left transition-all border-[1.5px]",
        active
          ? "bg-[rgba(27,94,53,0.06)] border-[rgba(27,94,53,0.35)] shadow-[0_2px_12px_rgba(27,94,53,0.1)]"
          : "bg-white border-[rgba(27,94,53,0.1)] hover:border-[rgba(27,94,53,0.25)]",
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
          active
            ? "bg-[rgba(27,94,53,0.14)] text-[#1B5E35]"
            : "bg-[rgba(27,94,53,0.07)] text-[#4A7A5A]",
        )}
      >
        {Icon && <Icon size={22} />}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] font-bold text-[#163F25] mb-0.5 leading-tight">{a.name}</div>
        <div className="text-[8.5px] text-[#9AAD9C] uppercase tracking-[0.5px] mb-0.5">Deskripsi:</div>
        <div className="text-[10px] text-[#7A9480] leading-snug line-clamp-2">{a.desc}</div>
      </div>

      {/* Price / FREE / Contact */}
      <div className="shrink-0 ml-1">
        {a.contact ? (
          <ContactBadge />
        ) : a.price === 0 ? (
          <FreeBadge active={active} />
        ) : (
          <PriceBadge price={a.price} />
        )}
      </div>
    </button>
  );
}

function FreeBadge({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "w-[50px] h-[50px] rounded-full border-[2px] border-dashed flex items-center justify-center",
        active
          ? "border-[#0FA876] bg-[rgba(15,168,118,0.08)]"
          : "border-[rgba(27,94,53,0.3)]",
      )}
    >
      <span
        className={cn(
          "text-[11px] font-bold tracking-[0.5px]",
          active ? "text-[#0FA876]" : "text-[#8A9E8C]",
        )}
      >
        FREE
      </span>
    </div>
  );
}

function PriceBadge({ price }: { price: number }) {
  const jt = price / 1_000_000;
  return (
    <div className="text-right min-w-[38px]">
      <div className="text-[9px] text-[#9AAD9C] leading-none">Rp.</div>
      <div className="font-serif font-bold text-[26px] leading-[1.1] text-[#163F25]">
        {jt % 1 === 0 ? jt : jt.toFixed(1)}
      </div>
      <div className="text-[9px] text-[#9AAD9C] leading-none">Jt-an</div>
    </div>
  );
}

function ContactBadge() {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[44px]">
      <IoCallOutline size={20} className="text-[#1B5E35]" />
      <div className="text-[8.5px] text-[#7A9480] text-center leading-tight">
        Hubungi
        <br />
        Sales
      </div>
    </div>
  );
}
