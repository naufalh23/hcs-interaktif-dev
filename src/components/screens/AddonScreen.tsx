"use client";

import { useState } from "react";
import TopBar from "@/components/kiosk/TopBar";
import UnitPreviewCard from "@/components/kiosk/UnitPreviewCard";
import AddonCard from "@/components/kiosk/AddonCard";
import Lightbox from "@/components/kiosk/Lightbox";
import { useStore } from "@/store/kiosk-store";
import { formatPrice } from "@/lib/utils";
import { ADDON_OPTIONS } from "@/data/customization";
import { ADDON_CONTENT } from "@/data/content/addon-screen";

export default function AddonScreen() {
  const goTo   = useStore((s) => s.goTo);
  const type   = useStore((s) => s.houseType);
  const unit   = useStore((s) => s.unit);
  const custom = useStore((s) => s.custom);
  const toggle = useStore((s) => s.toggleAddon);
  const extra  = useStore((s) => s.extraPrice());
  const total  = useStore((s) => s.totalPrice());
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!type) return null;

  return (
    <div className="absolute inset-0 flex flex-col animate-screen-in bg-[#EDE8DE]">
      <TopBar />
      <div className="flex-1 overflow-hidden flex">

        {/* ── Sidebar ───────────────────────────────────── */}
        <div className="w-120 shrink-0 flex flex-col bg-[#F5F0E8] border-r border-[rgba(27,94,53,0.1)]">

          {/* Scrollable: unit preview + addon list */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-4">
            {unit && (
              <div className="px-5 pt-5">
                <UnitPreviewCard unit={unit} onOpenLightbox={setLightbox} />
              </div>
            )}

            <div className="px-6 pb-4">
              <div className="text-[9px] tracking-[2px] uppercase font-bold text-[#9AAD9C] mb-2">
                {ADDON_CONTENT.selectedAddonLabel}
              </div>
              {ADDON_OPTIONS.filter((a) => custom.addons[a.id]).length === 0 ? (
                <p className="text-[11px] text-[#9AAD9C] italic">{ADDON_CONTENT.emptyAddon}</p>
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
          </div>

          {/* Price card */}
          <div className="px-6 pt-4 border-t border-[rgba(27,94,53,0.08)]">
            <div className="rounded-2xl p-4 border border-[rgba(27,94,53,0.1)] bg-[#FDFAF4]">
              <div className="text-[9px] tracking-[2.5px] uppercase font-bold text-[#9AAD9C] mb-2">
                {ADDON_CONTENT.priceBreakdown.title}
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-[11px] text-[#7A9480]">{ADDON_CONTENT.priceBreakdown.basePriceLabel}</span>
                <span className="text-[11px] font-semibold text-[#4A6A55]">
                  {formatPrice(unit?.price ?? type.basePrice)}
                </span>
              </div>
              {extra > 0 && (
                <div className="flex justify-between mb-1">
                  <span className="text-[11px] text-[#7A9480]">{ADDON_CONTENT.priceBreakdown.addonLabel}</span>
                  <span className="text-[11px] font-semibold text-[#8B6A00]">+{formatPrice(extra)}</span>
                </div>
              )}
              <div className="border-t border-dashed border-[rgba(27,94,53,0.14)] mt-2 pt-2 flex justify-between items-baseline">
                <span className="text-[10.5px] font-bold text-[#163F25] uppercase tracking-[1px]">
                  {ADDON_CONTENT.priceBreakdown.totalLabel}
                </span>
                <span className="font-serif font-bold text-[20px] text-[#163F25]">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Back button */}
          <div className="px-6 py-4">
            <button
              onClick={() => goTo("unit")}
              className="w-full py-3 rounded-xl border-[1.5px] border-[rgba(27,94,53,0.18)] bg-transparent
                         text-xs font-semibold text-[#7A9480] transition-all hover:bg-[rgba(27,94,53,0.06)]"
            >
              ← Kembali ke Kavling
            </button>
          </div>
        </div>

        {/* ── Right panel ───────────────────────────────── */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-7">
            <div className="mb-4">
              <div className="text-[9.5px] tracking-[3px] uppercase font-bold text-[#9AAD9C] mb-1">
                {ADDON_CONTENT.stepLabel}
              </div>
              <div className="font-serif font-light text-[24px] text-[#163F25] leading-tight mb-4">
                {ADDON_CONTENT.heading}
              </div>
              <div className="text-[9.5px] tracking-[3px] uppercase font-bold text-[#9AAD9C]">
                {ADDON_CONTENT.sectionLabel}
              </div>
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

          {/* Lanjut button */}
          <div className="px-7 py-4 border-t border-[rgba(27,94,53,0.08)] bg-[#EDE8DE]">
            <button
              onClick={() => goTo("form")}
              className="w-full py-3.5 rounded-xl bg-linear-to-br from-[#1B5E35] to-[#2E7D52]
                         text-[#F5F0E8] text-sm font-bold tracking-[2px] uppercase
                         shadow-[0_4px_20px_rgba(27,94,53,0.22)] transition-all hover:scale-[1.005]"
            >
              Lanjut ke Form →
            </button>
          </div>
        </div>

      </div>

      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}
