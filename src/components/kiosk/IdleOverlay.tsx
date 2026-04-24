"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/kiosk-store";

const CD_SECS = 5;

export default function IdleOverlay({ idleMs }: { idleMs: number }) {
  const screen = useStore((s) => s.screen);
  const reset = useStore((s) => s.reset);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(CD_SECS);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cd = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAll = () => {
    if (idle.current) {
      clearTimeout(idle.current);
      idle.current = null;
    }
    if (cd.current) {
      clearInterval(cd.current);
      cd.current = null;
    }
  };

  const start = () => {
    clearAll();
    if (screen === "attract" || screen === "success") return;
    idle.current = setTimeout(() => {
      let n = CD_SECS;
      setCount(n);
      setShow(true);
      cd.current = setInterval(() => {
        n--;
        setCount(n);
        if (n <= 0) {
          clearAll();
          setShow(false);
          reset();
        }
      }, 1000);
    }, idleMs);
  };

  useEffect(() => {
    const events = ["mousemove", "mousedown", "touchstart", "keydown"];
    events.forEach((e) => window.addEventListener(e, start));
    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
    };
  }, [screen]); // eslint-disable-line

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4
                 bg-[rgba(245,240,232,0.94)] backdrop-blur-xl"
    >
      {/* Rings */}
      <div className="absolute size-45 rounded-full border border-[rgba(27,94,53,0.15)] pointer-events-none" />
      <div className="absolute size-65 rounded-full border border-[rgba(27,94,53,0.07)] pointer-events-none" />

      <p className="text-[10px] tracking-[4px] uppercase font-semibold text-[#9AAD9C] mb-1">
        Sesi akan berakhir dalam
      </p>

      <div className="font-serif font-bold leading-none animate-fade-up text-[100px] text-[#1B5E35]">
        {count}
      </div>

      <button
        onClick={() => {
          clearAll();
          setShow(false);
          start();
        }}
        className="inline-flex items-center gap-2.5 mt-3 px-9 py-3.5 rounded-full
                   bg-linier-to-br from-[#1B5E35] to-[#2E7D52]
                   text-[#F5F0E8] text-[11.5px] font-bold tracking-[3px] uppercase
                   shadow-[0_8px_28px_rgba(27,94,53,0.25)]
                   transition-transform hover:scale-[1.03]"
      >
        Lanjutkan →
      </button>
    </div>
  );
}
