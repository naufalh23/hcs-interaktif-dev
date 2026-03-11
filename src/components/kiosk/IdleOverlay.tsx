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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4"
      style={{
        background: "rgba(245,240,232,0.94)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Rings */}
      {[180, 260].map((s, i) => (
        <div
          key={s}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: s,
            height: s,
            border: `1.5px solid rgba(27,94,53,${i === 0 ? 0.15 : 0.07})`,
          }}
        />
      ))}

      <p
        style={{
          fontSize: "10px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "#9AAD9C",
          marginBottom: 4,
        }}
      >
        Sesi akan berakhir dalam
      </p>

      <div
        className="font-serif font-bold leading-none animate-fade-up"
        style={{ fontSize: "100px", color: "#1B5E35", lineHeight: 1 }}
      >
        {count}
      </div>

      <button
        onClick={() => {
          clearAll();
          setShow(false);
          start();
        }}
        className="inline-flex items-center gap-2.5 transition-all hover:scale-[1.03] mt-3"
        style={{
          padding: "14px 36px",
          borderRadius: 999,
          background: "linear-gradient(135deg,#1B5E35,#2E7D52)",
          color: "#F5F0E8",
          fontSize: "11.5px",
          fontWeight: 700,
          letterSpacing: "3px",
          textTransform: "uppercase",
          boxShadow: "0 8px 28px rgba(27,94,53,0.25)",
        }}
      >
        Lanjutkan →
      </button>
    </div>
  );
}
