"use client";

import { useStore } from "@/store/kiosk-store";
import Image from "next/image";
import { ATTRACT_CONTENT } from "@/data/content/attract-screen";
import { BRAND } from "@/data/content/shared"; // nameShort, nameSuffix masih dipakai

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 w-70">
      <div className="flex-1 h-px bg-linear-to-r from-transparent to-[#C9A84C]" />
      <svg width="8" height="8" viewBox="0 0 8 8">
        <rect
          x="2"
          y="0"
          width="4"
          height="4"
          fill="#C9A84C"
          transform="rotate(45 4 4)"
        />
      </svg>
      <div className="flex-1 h-px bg-linear-to-l from-transparent to-[#C9A84C]" />
    </div>
  );
}

export default function AttractScreen() {
  const goTo = useStore((s) => s.goTo);

  return (
    <div className="absolute inset-0 overflow-hidden animate-screen-in flex items-center justify-center bg-[#F5F0E8]">
      {/* Background picture */}
      <Image
        src={ATTRACT_CONTENT.images.background}
        alt=""
        fill
        className="object-cover object-center opacity-70"
        priority
      />

      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(27,94,53,0.09)_1px,transparent_1px)] bg-size-[24px_24px]" />

      {/* Centre radial bloom */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_46%,rgba(245,240,232,0.96)_28%,rgba(220,210,188,0.5)_100%)]" />

      {/* Green side pillars */}
      {[
        { cls: "left-0",  rotate: false, text: ATTRACT_CONTENT.pillars.left  },
        { cls: "right-0", rotate: true,  text: ATTRACT_CONTENT.pillars.right },
      ].map(({ cls, rotate, text }) => (
        <div
          key={cls}
          className={`absolute ${cls} top-0 bottom-0 w-16 pointer-events-none flex flex-col
      bg-[linear-gradient(180deg,#163F25_0%,#1B5E35_45%,#2E7D52_70%,#1B5E35_100%)]`}
        >
          <div className="h-1 shrink-0 bg-[#C9A84C]" />
          <div
            className={`flex-1 flex items-center justify-center overflow-hidden
      [writing-mode:vertical-rl] text-[8px] font-semibold tracking-[3px]
      text-[rgba(245,240,232,0.36)] uppercase select-none
      ${rotate ? "rotate-180" : ""}`}
          >
            {text}
          </div>
          <div className="h-1 shrink-0 bg-[#C9A84C]" />
        </div>
      ))}
    
      <div className="relative z-10 flex flex-col items-center text-center gap-0 px-20">
        {/* Logo + brand */}
        <div className="flex flex-col items-center mb-5 gap-2.5">
          <Image
            src={ATTRACT_CONTENT.images.logo}
            alt="Company Logo"
            width={120}
            height={300}
            className="w-auto h-40"
            priority
          />
          <div className="font-serif font-bold text-[26px] tracking-[6px] text-[#163F25]">
            {BRAND.nameShort} <span className="text-[#1B5E35]">{BRAND.nameSuffix}</span>
          </div>
          <div className="text-[9.5px] tracking-[4.5px] text-[#8A9E8C] uppercase font-semibold">
            {ATTRACT_CONTENT.subtitle}
          </div>
        </div>

        <div className="mb-6">
          <GoldDivider />
        </div>

        {/* Headline */}
        <h1 className="font-serif font-light text-[64px] leading-[0.86] tracking-[-0.5px] text-[#163F25] mb-7.5">
          {ATTRACT_CONTENT.heading}
        </h1>

        <button
          onClick={() => goTo("cluster")}
          className="inline-flex items-center gap-3 px-11 py-3.75 rounded-full
      bg-[linear-gradient(135deg,#1B5E35_0%,#2E7D52_100%)]
      text-[#F5F0E8] text-[11.5px] font-bold tracking-[3px] uppercase
      shadow-[0_8px_32px_rgba(27,94,53,0.28),0_2px_8px_rgba(27,94,53,0.14),inset_0_1px_0_rgba(255,255,255,0.1)]
      cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.98]"
        >
          Mulai Eksplorasi
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full
      bg-[rgba(245,240,232,0.16)] text-sm"
          >
            →
          </span>
        </button>

        {/* Stats */}
        <div className="flex mt-8 border-t border-[rgba(27,94,53,0.1)] pt-5.5">
          {ATTRACT_CONTENT.stats.map(({ value, label }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center px-6.5 ${i < ATTRACT_CONTENT.stats.length - 1 ? "border-r border-[rgba(27,94,53,0.12)]" : ""}`}
            >
              <div className="font-serif font-bold leading-none text-[34px] text-[#1B5E35] mb-1">
                {value}
              </div>
              <div className="text-[8.5px] tracking-[2.5px] uppercase font-semibold text-[#9AAD9C]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
