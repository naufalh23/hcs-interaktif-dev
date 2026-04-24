"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/kiosk-store";
import { formatPrice } from "@/lib/utils";

const CF_COLORS = [
  "#1B5E35", "#2E7D52", "#4CAF78", "#C9A84C",
  "#E0C06A", "#A8D5B8", "#fff", "#C4B89A",
];
const AUTO_RESET = 50_000;

function Logo({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" fill="none">
      <polygon points="45,4 82,24 82,66 45,86 8,66 8,24"
        fill="rgba(27,94,53,0.08)" stroke="#1B5E35" strokeWidth="1.5" />
      <polygon points="45,11 76,28 76,62 45,79 14,62 14,28"
        fill="none" stroke="rgba(201,168,76,0.38)" strokeWidth="0.75" />
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
        fontFamily="Cormorant Garamond,Georgia,serif" fontSize="42"
        fontWeight="700" fill="#1B5E35">H</text>
      <line x1="27" y1="70" x2="63" y2="70"
        stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GoldDivider({ width = 240 }: { width?: number }) {
  return (
    <div className="flex items-center gap-3" style={{ width }}>
      <div className="flex-1 h-px bg-linier-to-r from-transparent to-[#C9A84C]" />
      <svg width="8" height="8" viewBox="0 0 8 8">
        <rect x="2" y="0" width="4" height="4" fill="#C9A84C" transform="rotate(45 4 4)" />
      </svg>
      <div className="flex-1 h-px bg-linier-to-l from-transparent to-[#C9A84C]" />
    </div>
  );
}

export default function SuccessScreen() {
  const type    = useStore((s) => s.houseType);
  const unit    = useStore((s) => s.unit);
  const code    = useStore((s) => s.bookingCode);
  const payment = useStore((s) => s.paymentMethod);
  const total   = useStore((s) => s.totalPrice());
  const reset   = useStore((s) => s.reset);
  const cfRef   = useRef<HTMLDivElement>(null);
  const tmRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden animate-screen-in bg-[#F5F0E8]">

      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(circle,rgba(27,94,53,0.08)_1px,transparent_1px)]
                      bg-size-[24px_24px]" />

      {/* Centre bloom */}
      <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(245,240,232,0.95)_25%,rgba(220,210,188,0.45)_100%)]" />

      {/* Green pillar accents */}
      {(["left-0", "right-0"] as const).map((cls) => (
        <div key={cls}
          className={`absolute ${cls} top-0 bottom-0 w-3 pointer-events-none
                      bg-[linear-gradient(180deg,#163F25,#1B5E35,#2E7D52,#1B5E35,#163F25)]`}>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#C9A84C]" />
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A84C]" />
        </div>
      ))}

      {/* Confetti container */}
      <div ref={cfRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

      {/* Card */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-130 w-full animate-fade-up">

        {/* Logo + brand */}
        <div className="flex items-center gap-2.5 mb-5">
          <Logo size={52} />
          <div>
            <div className="font-serif font-bold text-[17px] tracking-[3px] text-[#163F25]">
              H City <span className="text-[#1B5E35]">Sawangan</span>
            </div>
            <div className="text-[8.5px] tracking-[3px] text-[#9AAD9C] uppercase font-semibold">
              Marketing Gallery
            </div>
          </div>
        </div>

        <GoldDivider />

        {/* Icon */}
        <div className="flex items-center justify-center mt-6 mb-4 animate-pop-in
                        size-22 rounded-full text-[42px]
                        bg-[rgba(27,94,53,0.08)] border-2 border-[rgba(27,94,53,0.2)]">
          🏠
        </div>

        <h1 className="font-serif font-light text-[52px] text-[#163F25] leading-[0.9] mb-2.5">
          Booking{" "}
          <em className="text-[#1B5E35] italic">Berhasil!</em>
        </h1>
        <p className="text-[13px] text-[#7A9480] mb-6">
          Terima kasih! Hunian impian Anda satu langkah lebih dekat.
        </p>

        {/* Ticket */}
        <div className="relative w-full rounded-2xl overflow-visible mb-5
                        bg-[#FDFAF4] border border-[rgba(27,94,53,0.14)]
                        shadow-[0_8px_40px_rgba(27,94,53,0.1)]">
          {/* Notches */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 size-6 rounded-full
                          bg-[#F5F0E8] border border-[rgba(27,94,53,0.1)]" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 size-6 rounded-full
                          bg-[#F5F0E8] border border-[rgba(27,94,53,0.1)]" />

          <div className="px-10 py-6">
            <div className="text-[9px] tracking-[4px] uppercase font-bold text-[#9AAD9C] mb-1.5">
              Kode Booking
            </div>
            <div className="font-serif font-bold text-[44px] tracking-[8px] text-[#1B5E35] leading-none mb-4">
              {code ?? "—"}
            </div>

            {/* Gold dashed divider */}
            <div className="border-t-[1.5px] border-dashed border-[rgba(201,168,76,0.3)] pt-3.5">
              <div className="grid grid-cols-3 gap-4">
                {[
                  ["Unit",  unit?.code    ?? "—"],
                  ["Tipe",  type?.name    ?? "—"],
                  ["Bayar", payment       ?? "—"],
                ].map(([l, v]) => (
                  <div key={l} className="text-center">
                    <div className="text-[13.5px] font-bold text-[#163F25] mb-0.5">{v}</div>
                    <div className="text-[9.5px] text-[#8A9E8C]">{l}</div>
                  </div>
                ))}
              </div>
              {total > 0 && (
                <div className="mt-4 pt-4 text-center border-t border-[rgba(27,94,53,0.1)]">
                  <div className="text-[9.5px] text-[#8A9E8C] mb-0.5">Total Estimasi</div>
                  <div className="font-serif font-bold text-[22px] text-[#1B5E35]">
                    {formatPrice(total)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* WA info */}
        <div className="w-full rounded-xl px-5 py-3 mb-6 flex items-center gap-2.5
                        bg-[rgba(27,94,53,0.07)] border border-[rgba(27,94,53,0.14)]">
          <span className="text-base">📞</span>
          <p className="text-[12px] text-[#7A9480]">
            Tim kami akan menghubungi Anda via WhatsApp:{" "}
            <strong className="text-[#1B5E35]">+62 811 1130 114</strong>
          </p>
        </div>

        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-10 py-3.5 rounded-full
                     bg-linier-to-br from-[#1B5E35] to-[#2E7D52]
                     text-[#F5F0E8] text-xs font-bold tracking-[3px] uppercase
                     shadow-[0_8px_28px_rgba(27,94,53,0.28)] transition-all hover:scale-[1.03]"
        >
          ← Kembali ke Awal
        </button>

        <p className="text-[9.5px] text-[#B0BEB2] mt-3.5">
          Halaman akan kembali otomatis dalam beberapa saat
        </p>
      </div>
    </div>
  );
}