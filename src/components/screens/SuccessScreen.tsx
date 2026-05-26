"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/kiosk-store";
import { formatPrice } from "@/lib/utils";
import { SUCCESS_CONTENT } from "@/data/content/success-screen";
import { BRAND } from "@/data/content/shared";
import { ADDON_OPTIONS } from "@/data/customization";
import UnitPreviewCard from "@/components/kiosk/UnitPreviewCard";
import Lightbox from "@/components/kiosk/Lightbox";

const CF_COLORS = [
  "#1B5E35", "#2E7D52", "#4CAF78", "#C9A84C",
  "#E0C06A", "#A8D5B8", "#fff", "#C4B89A",
];
const AUTO_RESET = 350_000;

function GoldDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-linear-to-r from-transparent to-[#C9A84C]" />
      <svg width="8" height="8" viewBox="0 0 8 8">
        <rect x="2" y="0" width="4" height="4" fill="#C9A84C" transform="rotate(45 4 4)" />
      </svg>
      <div className="flex-1 h-px bg-linear-to-l from-transparent to-[#C9A84C]" />
    </div>
  );
}

export default function SuccessScreen() {
  const type    = useStore((s) => s.houseType);
  const unit    = useStore((s) => s.unit);
  const code    = useStore((s) => s.bookingCode);
  const payment = useStore((s) => s.paymentMethod);
  const custom  = useStore((s) => s.custom);
  const total   = useStore((s) => s.totalPrice());
  const reset   = useStore((s) => s.reset);
  const cfRef   = useRef<HTMLDivElement>(null);
  const tmRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const selectedAddons = ADDON_OPTIONS.filter((o) => custom.addons[o.id]);

  useEffect(() => {
    const box = cfRef.current;
    if (!box) return;
    for (let i = 0; i < 90; i++) {
      const el = document.createElement("div");
      const sz = 5 + Math.random() * 9;
      Object.assign(el.style, {
        position: "absolute",
        left: `${Math.random() * 100}%`,
        top: "-14px",
        width: `${sz}px`,
        height: `${sz * 1.6}px`,
        background: CF_COLORS[Math.floor(Math.random() * CF_COLORS.length)],
        borderRadius: Math.random() > 0.45 ? "50%" : "2px",
        animationDuration: `${2.5 + Math.random() * 2.5}s`,
        animationDelay: `${Math.random() * 1.2}s`,
        animationTimingFunction: "linear",
        animationFillMode: "forwards",
      });
      el.classList.add("cf-piece");
      box.appendChild(el);
    }
    tmRef.current = setTimeout(reset, AUTO_RESET);
    return () => { if (tmRef.current) clearTimeout(tmRef.current); };
  }, [reset]);

  return (
    <div className="absolute inset-0 overflow-hidden animate-screen-in bg-[#EDE8DE]">

      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(circle,rgba(27,94,53,0.06)_1px,transparent_1px)]
                      bg-size-[24px_24px]" />

      {/* Radial bloom */}
      <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(245,240,232,0.85)_30%,transparent_100%)]" />

      {/* Confetti */}
      <div ref={cfRef} className="absolute inset-0 pointer-events-none overflow-hidden z-20" />

      {/* ── Page layout ──────────────────────────────────────── */}
      <div className="relative z-10 absolute inset-0 flex flex-col px-10 pt-7 pb-6 gap-5">

        {/* Header row */}
        <div className="flex items-center justify-between shrink-0">
          <div>
            <div className="font-serif font-bold text-[17px] tracking-[3px] text-[#163F25]">
              {BRAND.nameShort} <span className="text-[#1B5E35]">{BRAND.nameSuffix}</span>
            </div>
            <div className="text-[8px] tracking-[3px] text-[#9AAD9C] uppercase font-semibold">
              {BRAND.marketingGalleryLabel}
            </div>
          </div>

          <div className="flex items-center gap-3 text-center">
            <div className="size-9 rounded-full bg-[rgba(27,94,53,0.1)] border border-[rgba(27,94,53,0.2)]
                            flex items-center justify-center text-[18px] animate-pop-in">
              {SUCCESS_CONTENT.icon}
            </div>
            <div>
              <div className="font-serif font-light text-[28px] text-[#163F25] leading-none">
                {SUCCESS_CONTENT.heading}
              </div>
              <div className="text-[10px] text-[#7A9480]">{SUCCESS_CONTENT.subtitle}</div>
            </div>
          </div>

          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl border-[1.5px] border-[rgba(27,94,53,0.2)] bg-transparent
                       text-[11px] font-semibold text-[#7A9480] transition-all hover:bg-[rgba(27,94,53,0.06)]"
          >
            ← Kembali ke Awal
          </button>
        </div>

        <GoldDivider />

        {/* ── Main three-column area ───────────────────────── */}
        <div className="flex-1 flex gap-5 min-h-0">

          {/* Col 1 — Unit Preview */}
          <div className="w-80 shrink-0 flex flex-col gap-4">
            <div className="text-[9px] tracking-[2.5px] uppercase font-bold text-[#9AAD9C]">
              Unit Dipilih
            </div>
            {unit && (
              <div className="flex-1 overflow-y-auto">
                <UnitPreviewCard unit={unit} onOpenLightbox={setLightbox} />
              </div>
            )}
          </div>

          {/* Col 2 — Booking ticket */}
          <div className="flex-1 flex flex-col">
            <div className="text-[9px] tracking-[2.5px] uppercase font-bold text-[#9AAD9C] mb-4">
              Detail Booking
            </div>

            {/* Ticket card */}
            <div className="flex-1 rounded-2xl bg-[#FDFAF4] border border-[rgba(27,94,53,0.14)]
                            shadow-[0_8px_40px_rgba(27,94,53,0.08)] flex flex-col overflow-hidden">
              {/* Booking code band */}
              <div className="bg-[#163F25] px-8 py-6 text-center">
                <div className="text-[9px] tracking-[4px] uppercase font-bold text-[#7AAD8C] mb-1">
                  {SUCCESS_CONTENT.ticket.bookingCodeLabel}
                </div>
                <div className="font-serif font-bold text-[52px] tracking-[8px] text-[#F5F0E8] leading-none">
                  {code ?? "—"}
                </div>
              </div>

              {/* Notch row */}
              <div className="relative flex items-center">
                <div className="absolute -left-3 size-6 rounded-full bg-[#EDE8DE] border border-[rgba(27,94,53,0.1)]" />
                <div className="flex-1 border-t-[1.5px] border-dashed border-[rgba(201,168,76,0.35)] mx-3" />
                <div className="absolute -right-3 size-6 rounded-full bg-[#EDE8DE] border border-[rgba(27,94,53,0.1)]" />
              </div>

              {/* Details grid */}
              <div className="px-8 py-6 flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {([
                    [SUCCESS_CONTENT.ticket.unitLabel,    unit?.code ?? "—"],
                    [SUCCESS_CONTENT.ticket.typeLabel,    type ? `Tipe ${type.types[0].buildingArea}/${type.types[0].landArea}` : "—"],
                    [SUCCESS_CONTENT.ticket.paymentLabel, payment ?? "—"],
                  ] as [string, string][]).map(([l, v]) => (
                    <div key={l} className="text-center px-3 py-2.5 rounded-xl bg-[rgba(27,94,53,0.04)] border border-[rgba(27,94,53,0.08)]">
                      <div className="text-[9px] text-[#9AAD9C] mb-1">{l}</div>
                      <div className="text-[13px] font-bold text-[#163F25]">{v}</div>
                    </div>
                  ))}
                </div>

                {/* Addon chips */}
                {selectedAddons.length > 0 && (
                  <div className="mb-5">
                    <div className="text-[9px] tracking-[2px] uppercase font-bold text-[#9AAD9C] mb-2">
                      Add-On Terpilih
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedAddons.map((a) => (
                        <span key={a.id}
                          className="px-2.5 py-1 rounded-full text-[10px] font-medium
                                     bg-[rgba(27,94,53,0.08)] border border-[rgba(27,94,53,0.15)] text-[#4A6A55]">
                          ✓ {a.name}
                          {!a.contact && a.price > 0 && (
                            <span className="ml-1 text-[#8B6A00]">+{formatPrice(a.price)}</span>
                          )}
                          {a.price === 0 && !a.contact && (
                            <span className="ml-1 text-[#5A8C6A]">· Gratis</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Total price */}
                <div className="border-t border-[rgba(27,94,53,0.1)] pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] font-bold text-[#9AAD9C] uppercase tracking-[2px]">
                      {SUCCESS_CONTENT.ticket.totalLabel}
                    </span>
                    <span className="font-serif font-bold text-[32px] text-[#163F25] leading-none">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <div className="text-[8.5px] text-[#9AAD9C] text-right mt-0.5">
                    * Belum termasuk pajak &amp; biaya notaris
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3 — Contact + reset */}
          <div className="w-72 shrink-0 flex flex-col gap-4">
            <div className="text-[9px] tracking-[2.5px] uppercase font-bold text-[#9AAD9C]">
              Langkah Selanjutnya
            </div>

            {/* Phone highlight */}
            <div className="rounded-2xl bg-[#163F25] px-6 py-6 text-center
                            shadow-[0_8px_28px_rgba(22,63,37,0.28)] flex flex-col gap-2">
              <div className="text-[9.5px] tracking-[1.5px] uppercase text-[#7AAD8C] font-semibold leading-relaxed">
                {SUCCESS_CONTENT.contact.text}
              </div>
              <div className="font-serif font-bold text-[28px] text-[#C9A84C] tracking-[1px] leading-none">
                {SUCCESS_CONTENT.contact.phone}
              </div>
              <div className="text-[10px] text-[#5A8C6A]">dalam 1×24 jam</div>
            </div>

            {/* Steps / info cards */}
            <div className="flex flex-col gap-2.5 flex-1">
              {[
                { step: "01", text: "Tim akan menghubungi Anda untuk verifikasi data" },
                { step: "02", text: "Jadwal kunjungan ke lokasi akan dikonfirmasi" },
                { step: "03", text: "Proses akad & administrasi dilakukan bersama" },
              ].map(({ step, text }) => (
                <div key={step}
                  className="flex gap-3 items-start p-3.5 rounded-xl
                             bg-[rgba(27,94,53,0.05)] border border-[rgba(27,94,53,0.1)]">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-[rgba(27,94,53,0.12)]
                                  flex items-center justify-center text-[9px] font-bold text-[#1B5E35]">
                    {step}
                  </div>
                  <p className="text-[10.5px] text-[#7A9480] leading-snug">{text}</p>
                </div>
              ))}
            </div>

            <p className="text-[9px] text-[#B0BEB2] text-center">
              {SUCCESS_CONTENT.autoResetNote}
            </p>
          </div>

        </div>
      </div>

      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}
