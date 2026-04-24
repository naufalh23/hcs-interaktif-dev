"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/kiosk-store";
import { cn } from "@/lib/utils";
import type { Screen } from "@/store/kiosk-store";
import Image from "next/image";

const STEPS: { key: Screen; label: string; n: number }[] = [
  { key: "type", label: "Cluster", n: 1 },
  { key: "unit", label: "Unit", n: 2 },
  { key: "custom", label: "Kustomisasi", n: 3 },
  { key: "form", label: "Pemesanan", n: 4 },
];

const ORDER: Screen[] = [
  "attract",
  "type",
  "unit",
  "custom",
  "form",
  "success",
];

function MiniLogo() {
  return (
    <Image
      src="/Logo-HCS.png"
      alt="Company Logo"
      width={32}
      height={32}
      priority
      className="object-contain"
    />
  );
}

export default function TopBar() {
  const screen = useStore((s) => s.screen);
  const reset = useStore((s) => s.reset);

  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();

      const date = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      const time = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });

      setTime(`${date} | ${time} WIB`);
    };

    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const curIdx = ORDER.indexOf(screen);

  return (
    <div className="h-16 flex items-center px-6 gap-6 bg-[#FDFAF4] border-b border-green-900/10 shadow-sm">
      {/* Brand */}
      <div className="flex items-center gap-3 shrink-0">
        <MiniLogo />

        <div className="leading-tight">
          <div className="font-serif font-bold text-[15px] tracking-[2px] text-[#163F25]">
            H City <span className="text-[#1B5E35]">Sawangan</span>
          </div>

          <div className="text-[8px] tracking-[2.5px] uppercase font-semibold text-[#9AAD9C]">
            A home to live
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-7 bg-green-900/20" />

      {/* Steps Progress */}
      <div className="flex items-center gap-2 flex-1">
        {STEPS.map((s) => {
          const idx = ORDER.indexOf(s.key);
          const done = idx < curIdx;
          const active = s.key === screen;

          return (
            <div
              key={s.key}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300",
                active &&
                  "bg-[#1B5E35]/20 border border-[#1B5E35]/40 shadow-2xs",
              )}
            >
              {/* Circle */}
              <span
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all",
                  active &&
                    "bg-[#1B5E35] text-[#F5F0E8] border-[#1B5E35] shadow-sm",
                  done && "bg-green-900/10 text-[#1B5E35] border-[#1B5E35]",
                  !active && !done && "border-green-900/20 text-green-900/40",
                )}
              >
                {done ? "✓" : s.n}
              </span>

              {/* Label */}
              <span
                className={cn(
                  "text-xs font-semibold tracking-wide",
                  active && "text-[#1B5E35]",
                  done && "text-green-900/50",
                  !active && !done && "text-green-900/30",
                )}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Clock */}
        <span className="text-sm font-medium text-[#8FA396] tabular-nums tracking-wide">
          {time}
        </span>

        {/* Reset */}
        <button
          onClick={reset}
          className="
    flex items-center gap-1
    text-xs font-semibold tracking-wider
    px-3 py-1.5 rounded-lg
    border border-red-400/40
    text-red-500
    bg-red-100
    transition-all duration-200
    hover:bg-red-100
    hover:text-red-600
    hover:border-red-500
    hover:shadow-[0_0_10px_rgba(239,68,68,0.35)]
    active:scale-95
  "
        >
          ✕ Reset
        </button>
      </div>
    </div>
  );
}
