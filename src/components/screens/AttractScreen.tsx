"use client";

import { useStore } from "@/store/kiosk-store";
import Image from "next/image";

function Logo({ size = 84 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" fill="none">
      <polygon
        points="45,4 82,24 82,66 45,86 8,66 8,24"
        fill="rgba(27,94,53,0.08)"
        stroke="#1B5E35"
        strokeWidth="1.5"
      />
      <polygon
        points="45,11 76,28 76,62 45,79 14,62 14,28"
        fill="none"
        stroke="rgba(201,168,76,0.38)"
        strokeWidth="0.75"
      />
      <text
        x="50%"
        y="54%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Cormorant Garamond,Georgia,serif"
        fontSize="42"
        fontWeight="700"
        fill="#1B5E35"
      >
        H
      </text>
      <line
        x1="27"
        y1="70"
        x2="63"
        y2="70"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 w-70">
      <div className="flex-1 h-px bg-linier-to-r from-transparent to-[#C9A84C]" />
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
      <div className="flex-1 h-px bg-linier-to-l from-transparent to-[#C9A84C]" />
    </div>
  );
}

export default function AttractScreen() {
  const goTo = useStore((s) => s.goTo);

  return (
    <div className="absolute inset-0 overflow-hidden animate-screen-in flex items-center justify-center bg-[#F5F0E8]">
      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(27,94,53,0.09)_1px,transparent_1px)] bg-size-[24px_24px]" />

      {/* Centre radial bloom */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_46%,rgba(245,240,232,0.96)_28%,rgba(220,210,188,0.5)_100%)]" />

      {/* Green side pillars */}
      {[
        {
          cls: "left-0",
          rotate: false,
          text: "Marketing Gallery · H City Sawangan · Depok",
        },
        {
          cls: "right-0",
          rotate: true,
          text: "Jl. Raya Parung No. 27 · +62 811 1130 114",
        },
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

      {/* Rotating rings */}
      {/* {[380, 580, 790].map((s, i) => (
        <div
          key={s}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: s,
            height: s,
            border: `1px solid rgba(27,94,53,${[0.09, 0.055, 0.03][i]})`,
            animation: `spin ${[30, 48, 68][i]}s linear infinite ${i === 1 ? "reverse" : ""}`,
          }}
        />
      ))} */}

      {/* Corner ornaments */}
      {/* {[
        { top: 72, left: 80, d: "M0,26 L0,0 L26,0" },
        { top: 72, right: 80, d: "M26,26 L26,0 L0,0" },
        { bottom: 90, left: 80, d: "M0,0 L0,26 L26,26" },
        { bottom: 90, right: 80, d: "M26,0 L26,26 L0,26" },
      ].map((o, i) => {
        const { d, ...pos } = o;
        return (
          <svg
            key={i}
            width="26"
            height="26"
            viewBox="0 0 26 26"
            className="absolute pointer-events-none"
            style={pos as React.CSSProperties}
          >
            <path
              d={d}
              fill="none"
              stroke="#C9A84C"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        );
      })} */}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-0 px-20">
        {/* Logo + brand */}
        <div className="flex flex-col items-center mb-5 gap-2.5">
          <Image
            src="/Logo-HCS.png"
            alt="Company Logo"
            width={120}
            height={300}
            className="w-auto h-32"
            priority
          />
          <div className="font-serif font-bold text-[26px] tracking-[6px] text-[#163F25]">
            H City <span className="text-[#1B5E35]">Sawangan</span>
          </div>
          <div className="text-[9.5px] tracking-[4.5px] text-[#8A9E8C] uppercase font-semibold">
            A home to live
          </div>
        </div>

        <div className="mb-6">
          <GoldDivider />
        </div>

        {/* Headline */}
        <h1 className="font-serif font-light text-[64px] leading-[0.86] tracking-[-0.5px] text-[#163F25] mb-7.5">
          Temukan Hunian
          <br />
          <em className="text-[#1B5E35] italic">Impian</em> Anda
        </h1>

        {/* <p
          style={{
            fontSize: "10.5px",
            letterSpacing: "4px",
            color: "#7A9480",
            fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: 30,
          }}
        >
          7 Cluster · 13 Fasilitas · Siap Huni
        </p> */}

        {/* CTA */}
        <button
          onClick={() => goTo("type")}
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
          {[
            ["7", "Cluster"],
            ["13", "Fasilitas"],
            ["15'", "Destinasi"],
            ["5Jt", "All-in"],
          ].map(([n, l], i) => (
            <div
              key={l}
              className={`flex flex-col items-center px-6.5 ${i < 3 ? "border-r border-[rgba(27,94,53,0.12)]" : ""}`}
            >
              <div className="font-serif font-bold leading-none text-[34px] text-[#1B5E35] mb-1">
                {n}
              </div>
              <div className="text-[8.5px] tracking-[2.5px] uppercase font-semibold text-[#9AAD9C]">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tap hint */}
      {/* <div
        className="absolute flex items-center gap-2 animate-fade-up"
        style={{
          bottom: 96,
          left: "50%",
          transform: "translateX(-50%)",
          animationDelay: "1s",
          animationFillMode: "both",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-blink"
          style={{ background: "#C9A84C" }}
        />
        <span
          style={{
            fontSize: "9.5px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "#AABAA6",
          }}
        >
          Sentuh layar untuk mulai
        </span>
        <span
          className="w-1.5 h-1.5 rounded-full animate-blink"
          style={{ background: "#C9A84C", animationDelay: "0.5s" }}
        />
      </div> */}

      {/* Bottom tipe strip */}
      {/* <div
        className="absolute bottom-0 flex pointer-events-none bg-yellow-300"
        style={{
          left: 64,
          right: 64,
          height: 72,
          borderTop: "1px solid rgba(27,94,53,0.1)",
          background: "rgba(27,94,53,0.025)",
        }}
      >
        {["60/84", "70/100", "84/120", "100/120", "120/150", "150/180"].map(
          (n, i) => (
            <div
              key={n}
              className="flex-1 flex flex-col items-center justify-center gap-0.5"
              style={{
                borderRight: i < 5 ? "1px solid rgba(27,94,53,0.09)" : "none",
                background: i % 2 === 0 ? "rgba(27,94,53,0.03)" : "transparent",
              }}
            >
              <span
                className="font-serif font-bold"
                style={{ fontSize: 18, color: "rgba(27,94,53,0.22)" }}
              >
                {n}
              </span>
              <span
                style={{
                  fontSize: 7,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "rgba(27,94,53,0.22)",
                }}
              >
                m²
              </span>
            </div>
          ),
        )}
      </div> */}
    </div>
  );
}
