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
    <div className="flex items-center gap-3 w-[280px]">
      <div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to right,transparent,#C9A84C)" }}
      />
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
      <div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to left,transparent,#C9A84C)" }}
      />
    </div>
  );
}

export default function AttractScreen() {
  const goTo = useStore((s) => s.goTo);

  return (
    <div
      className="absolute inset-0 overflow-hidden cursor-pointer animate-screen-in flex items-center justify-center"
      style={{ background: "#F5F0E8" }}
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(27,94,53,0.09) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Centre radial bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 46%, rgba(245,240,232,0.96) 28%, rgba(220,210,188,0.5) 100%)",
        }}
      />

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
          className={`absolute ${cls} top-0 bottom-0 w-16 pointer-events-none flex flex-col`}
          style={{
            background:
              "linear-gradient(180deg,#163F25 0%,#1B5E35 45%,#2E7D52 70%,#1B5E35 100%)",
          }}
        >
          <div className="h-1 shrink-0" style={{ background: "#C9A84C" }} />
          <div
            className="flex-1 flex items-center justify-center overflow-hidden"
            style={{
              writingMode: "vertical-rl",
              transform: rotate ? "rotate(180deg)" : "none",
              fontSize: "8px",
              fontWeight: 600,
              letterSpacing: "3px",
              color: "rgba(245,240,232,0.36)",
              textTransform: "uppercase",
              userSelect: "none",
            }}
          >
            {text}
          </div>
          <div className="h-1 shrink-0" style={{ background: "#C9A84C" }} />
        </div>
      ))}

      {/* Rotating rings */}
      {[380, 580, 790].map((s, i) => (
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
      ))}

      {/* Corner ornaments */}
      {[
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
      })}

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ gap: 0, paddingLeft: 80, paddingRight: 80 }}
      >
        {/* Logo + brand */}
        <div className="flex flex-col items-center mb-5" style={{ gap: 10 }}>
          <Image
            src="/Logo-HCS.png"
            alt="Company Logo"
            width={120}
            height={300}
            className="w-auto h-32"
            priority
          />
          <div
            className="font-serif font-bold"
            style={{ fontSize: "26px", letterSpacing: "6px", color: "#163F25" }}
          >
            H City <span style={{ color: "#1B5E35" }}>Sawangan</span>
          </div>
          <div
            style={{
              fontSize: "9.5px",
              letterSpacing: "4.5px",
              color: "#8A9E8C",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            A home to live
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <GoldDivider />
        </div>

        {/* Headline */}
        <h1
          className="font-serif font-light"
          style={{
            fontSize: "64px",
            lineHeight: 0.86,
            letterSpacing: "-0.5px",
            color: "#163F25",
            marginBottom: 16,
          }}
        >
          Temukan Hunian
          <br />
          <em style={{ color: "#1B5E35", fontStyle: "italic" }}>Impian</em> Anda
        </h1>

        <p
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
        </p>

        {/* CTA */}
        <button
          onClick={() => goTo("type")}
          className="inline-flex items-center transition-all hover:scale-[1.03] active:scale-[0.98]"
          style={{
            gap: 12,
            padding: "15px 44px",
            borderRadius: 999,
            background: "linear-gradient(135deg,#1B5E35 0%,#2E7D52 100%)",
            color: "#F5F0E8",
            fontSize: "11.5px",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            boxShadow:
              "0 8px 32px rgba(27,94,53,0.28), 0 2px 8px rgba(27,94,53,0.14), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          Mulai Eksplorasi
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full"
            style={{ background: "rgba(245,240,232,0.16)", fontSize: 14 }}
          >
            →
          </span>
        </button>

        {/* Stats */}
        <div
          className="flex mt-8"
          style={{ borderTop: "1px solid rgba(27,94,53,0.1)", paddingTop: 22 }}
        >
          {[
            ["7", "Cluster"],
            ["13", "Fasilitas"],
            ["15'", "Destinasi"],
            ["5Jt", "All-in"],
          ].map(([n, l], i) => (
            <div
              key={l}
              className="flex flex-col items-center"
              style={{
                padding: "0 26px",
                borderRight: i < 3 ? "1px solid rgba(27,94,53,0.12)" : "none",
              }}
            >
              <div
                className="font-serif font-bold leading-none"
                style={{ fontSize: "34px", color: "#1B5E35", marginBottom: 4 }}
              >
                {n}
              </div>
              <div
                style={{
                  fontSize: "8.5px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "#9AAD9C",
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tap hint */}
      <div
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
      </div>

      {/* Bottom tipe strip */}
      <div
        className="absolute bottom-0 flex pointer-events-none"
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
      </div>
    </div>
  );
}
