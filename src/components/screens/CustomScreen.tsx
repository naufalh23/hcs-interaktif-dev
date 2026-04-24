"use client";

import TopBar from "@/components/kiosk/TopBar";
import { useStore } from "@/store/kiosk-store";
import { cn, formatPrice } from "@/lib/utils";
import {
  ROOF_OPTIONS,
  DOOR_OPTIONS,
  WINDOW_OPTIONS,
  ADDON_OPTIONS,
  ROOF_COLORS,
  calcExtraPrice,
} from "@/data/customization";
import type { CustomOption } from "@/data/customization";

const ROOF_COLOR_SVG: Record<string, string> = {
  minimalis: "#3D5C4A",
  joglo: "#5C7A3D",
  mediteran: "#8B7A5A",
  tropis: "#2D7A5A",
};

export default function CustomScreen() {
  const goTo = useStore((s) => s.goTo);
  const type = useStore((s) => s.houseType);
  const custom = useStore((s) => s.custom);
  const setC = useStore((s) => s.setCustom);
  const toggle = useStore((s) => s.toggleAddon);
  const extra = useStore((s) => s.extraPrice());
  const total = useStore((s) => s.totalPrice());

  if (!type) return null;

  const wallColor = type.wallColors[custom.colorIndex]?.hex ?? "#C4B89A";
  const roofColor = ROOF_COLOR_SVG[custom.roofStyle] ?? "#3D5C4A";
  const roofY = type.floors === 2 ? 103 : 143;
  const roofTop = type.floors === 2 ? 55 : 58;

  return (
    <div className="absolute inset-0 flex flex-col animate-screen-in bg-[#EDE8DE]">
      <TopBar />
      <div className="flex-1 overflow-hidden flex">
        {/* ── Left: Live Preview ───────────────────────── */}
        <div className="w-95 shrink-0 flex flex-col p-6 overflow-y-auto bg-[#F5F0E8] border-r border-[rgba(27,94,53,0.1)]">
          <div className="text-[9.5px] tracking-[3px] uppercase font-bold text-[#9AAD9C] mb-3.5">
            Preview Rumah
          </div>

          <div className="flex-1 flex items-center justify-center">
            <svg
              viewBox="0 0 320 280"
              className="w-full max-w-73.75 drop-shadow-lg"
              fill="none"
            >
              <ellipse
                cx="160"
                cy="270"
                rx="105"
                ry="9"
                fill="rgba(27,94,53,0.1)"
              />
              <rect
                x="40"
                y="258"
                width="240"
                height="6"
                rx="3"
                fill="rgba(27,94,53,0.06)"
              />
              <rect
                x="40"
                y="140"
                width="240"
                height="120"
                rx="4"
                fill={wallColor}
              />
              <rect
                x="40"
                y="140"
                width="240"
                height="6"
                rx="3"
                fill="rgba(255,255,255,0.25)"
              />
              {type.floors === 2 && (
                <>
                  <rect
                    x="40"
                    y="100"
                    width="240"
                    height="42"
                    rx="3"
                    fill={wallColor}
                    opacity={0.88}
                  />
                  <rect
                    x="40"
                    y="100"
                    width="240"
                    height="5"
                    fill="rgba(255,255,255,0.2)"
                  />
                  <rect
                    x="120"
                    y="108"
                    width="80"
                    height="29"
                    rx="4"
                    fill="rgba(180,220,240,0.5)"
                  />
                </>
              )}
              <polygon
                points={`20,${roofY} 160,${roofTop} 300,${roofY}`}
                fill={roofColor}
              />
              <polygon
                points={`20,${roofY} 160,${roofTop} 300,${roofY}`}
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="2"
              />
              <line
                x1="20"
                y1={roofY}
                x2="300"
                y2={roofY}
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="5"
              />
              <rect
                x="130"
                y="200"
                width="60"
                height="60"
                rx="30"
                fill="rgba(27,63,37,0.7)"
              />
              <rect
                x="134"
                y="204"
                width="52"
                height="52"
                rx="26"
                fill="rgba(22,45,28,0.8)"
              />
              <circle cx="172" cy="230" r="4.5" fill="#C9A84C" />
              <circle cx="172" cy="230" r="2.5" fill="#E0C06A" />
              {[58, 202].map((x) => (
                <g key={x}>
                  <rect
                    x={x}
                    y="161"
                    width="62"
                    height="52"
                    rx="5"
                    fill="rgba(180,220,240,0.55)"
                  />
                  <rect
                    x={x}
                    y="161"
                    width="62"
                    height="6"
                    rx="3"
                    fill="rgba(255,255,255,0.3)"
                  />
                  <line
                    x1={x + 31}
                    y1="161"
                    x2={x + 31}
                    y2="213"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={x}
                    y1="187"
                    x2={x + 62}
                    y2="187"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                  />
                </g>
              ))}
              {custom.addons.garasi && (
                <>
                  <rect
                    x="46"
                    y="198"
                    width="74"
                    height="62"
                    rx="2"
                    fill="#8A9E8C"
                  />
                  <rect
                    x="50"
                    y="202"
                    width="66"
                    height="54"
                    rx="2"
                    fill="#6A7E6C"
                  />
                  <line
                    x1="50"
                    y1="229"
                    x2="116"
                    y2="229"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="2"
                  />
                  <line
                    x1="83"
                    y1="202"
                    x2="83"
                    y2="256"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="2"
                  />
                </>
              )}
              {custom.addons.solar && (
                <>
                  <rect
                    x="80"
                    y={type.floors === 2 ? 68 : 72}
                    width="64"
                    height="36"
                    rx="3"
                    fill="#3A4A5A"
                  />
                  {[0, 1, 2, 3].map((n) => (
                    <rect
                      key={n}
                      x={80 + (n % 2) * 33 + 2}
                      y={
                        (type.floors === 2 ? 68 : 72) +
                        Math.floor(n / 2) * 18 +
                        2
                      }
                      width="28"
                      height="14"
                      rx="1"
                      fill="#2A3A4A"
                    />
                  ))}
                </>
              )}
              {custom.addons.pagar && (
                <>
                  <rect
                    x="20"
                    y="251"
                    width="280"
                    height="7"
                    rx="2"
                    fill="#6A7E6C"
                  />
                  {[20, 46, 72, 98, 216, 242, 268, 294].map((x) => (
                    <rect
                      key={x}
                      x={x}
                      y="243"
                      width="5"
                      height="15"
                      rx="1"
                      fill="#6A7E6C"
                    />
                  ))}
                </>
              )}
              {custom.addons.ac && (
                <rect
                  x="200"
                  y="155"
                  width="34"
                  height="11"
                  rx="3"
                  fill="#A0A8A4"
                />
              )}
              {[
                [36, 256, 12],
                [40, 260, 8],
                [282, 256, 12],
                [278, 260, 8],
              ].map(([cx, cy, r], i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={
                    i % 2 === 0 ? "rgba(27,94,53,0.45)" : "rgba(46,125,82,0.5)"
                  }
                />
              ))}
            </svg>
          </div>

          {/* Price breakdown */}
          <div className="mt-3 bg-[#F5F0E8] rounded-2xl p-4 border border-[rgba(27,94,53,0.1)]">
            <div className="text-[9px] tracking-[2.5px] uppercase font-bold text-[#9AAD9C] mb-2">
              Estimasi Harga
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-[11px] text-[#7A9480]">Harga Dasar</span>
              <span className="text-[11px] font-semibold text-[#4A6A55]">
                {formatPrice(type.basePrice)}
              </span>
            </div>
            {extra > 0 && (
              <div className="flex justify-between mb-1">
                <span className="text-[11px] text-[#7A9480]">Kustomisasi</span>
                <span className="text-[11px] font-semibold text-[#8B6A00]">
                  +{formatPrice(extra)}
                </span>
              </div>
            )}
            <div className="border-t border-dashed border-[rgba(27,94,53,0.14)] mt-2 pt-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[10.5px] font-bold text-[#163F25] uppercase tracking-[1px]">
                  Total
                </span>
                <span className="font-serif font-bold text-[22px] text-[#163F25]">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex gap-2.5 mt-4">
            <button
              onClick={() => goTo("type")}
              className="px-4 py-3 rounded-xl border-[1.5px] border-[rgba(27,94,53,0.18)] bg-transparent
                         text-xs font-semibold text-[#7A9480] transition-all
                         hover:bg-[rgba(27,94,53,0.06)]"
            >
              ← Tipe
            </button>
            <button
              onClick={() => goTo("unit")}
              className="flex-1 py-3 rounded-xl bg-linier-to-br from-[#1B5E35] to-[#2E7D52]
                         text-[#F5F0E8] text-xs font-bold tracking-[2px] uppercase
                         shadow-[0_4px_20px_rgba(27,94,53,0.22)] transition-all hover:scale-[1.01]"
            >
              Pilih Unit →
            </button>
          </div>
        </div>

        {/* ── Right: Options ───────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-7 flex flex-col gap-6">
          <Section
            icon="🏗"
            title="Model Atap"
            sub="Desain atap mempengaruhi kesan rumah"
          >
            <OptionRow
              opts={ROOF_OPTIONS}
              sel={custom.roofStyle}
              onPick={(id) => setC({ roofStyle: id })}
            />
          </Section>

          <Section
            icon="🎨"
            title="Warna Eksterior"
            sub="Pilih warna cat dinding luar"
          >
            <div className="flex gap-3 flex-wrap">
              {type.wallColors.map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <button
                    onClick={() => setC({ colorIndex: i })}
                    className={cn(
                      "size-11 rounded-xl transition-all hover:scale-110 relative flex items-center justify-center",
                      custom.colorIndex === i
                        ? "border-[2.5px] border-[#1B5E35] shadow-[0_0_0_3px_rgba(27,94,53,0.2),0_4px_12px_rgba(0,0,0,0.1)]"
                        : "border-2 border-[rgba(0,0,0,0.06)] shadow-[0_2px_6px_rgba(0,0,0,0.08)]",
                    )}
                    style={{ background: c.hex }}
                  >
                    {custom.colorIndex === i && (
                      <span className="text-white font-bold text-base [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                        ✓
                      </span>
                    )}
                  </button>
                  <span className="text-[8.5px] text-[#8A9E8C] text-center max-w-11">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          <Section
            icon="🚪"
            title="Model Pintu"
            sub="Kesan pertama hunian Anda"
          >
            <OptionRow
              opts={DOOR_OPTIONS}
              sel={custom.doorStyle}
              onPick={(id) => setC({ doorStyle: id })}
            />
          </Section>

          <Section
            icon="🪟"
            title="Tipe Jendela"
            sub="Pencahayaan & sirkulasi udara"
          >
            <OptionRow
              opts={WINDOW_OPTIONS}
              sel={custom.windowStyle}
              onPick={(id) => setC({ windowStyle: id })}
            />
          </Section>

          <Section
            icon="⚡"
            title="Fasilitas Tambahan"
            sub="Upgrade hunian Anda (bisa multi-pilih)"
          >
            <div className="flex flex-col gap-2">
              {ADDON_OPTIONS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => toggle(a.id)}
                  className={cn(
                    "flex items-center gap-3 p-3.5 rounded-xl text-left transition-all border-[1.5px]",
                    custom.addons[a.id]
                      ? "bg-[rgba(27,94,53,0.08)] border-[rgba(27,94,53,0.35)]"
                      : "bg-[#FDFAF4] border-[rgba(27,94,53,0.1)]",
                  )}
                >
                  <span className="text-xl">{a.icon}</span>
                  <div className="flex-1">
                    <div className="text-[12.5px] font-semibold text-[#163F25] mb-px">
                      {a.name}
                    </div>
                    <div className="text-[10px] text-[#7A9480]">{a.desc}</div>
                  </div>
                  <div className="text-[11px] font-bold text-[#1B5E35] mr-2">
                    +{formatPrice(a.price)}
                  </div>
                  {/* Toggle */}
                  <div
                    className={cn(
                      "relative shrink-0 w-9.5 h-5 rounded-full transition-all",
                      custom.addons[a.id] ? "bg-[#1B5E35]" : "bg-[#D8D1C4]",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.75 size-3.5 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.2)] transition-all",
                        custom.addons[a.id] ? "left-5.25" : "left-0.75",
                      )}
                    />
                  </div>
                </button>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  sub,
  children,
}: {
  icon: string;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div
          className="size-8 rounded-[10px] flex items-center justify-center shrink-0 text-sm
                        bg-[rgba(27,94,53,0.1)] border border-[rgba(27,94,53,0.15)]"
        >
          {icon}
        </div>
        <div>
          <div className="text-[13px] font-bold text-[#163F25]">{title}</div>
          <div className="text-[10px] text-[#8A9E8C]">{sub}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

function OptionRow({
  opts,
  sel,
  onPick,
}: {
  opts: CustomOption[];
  sel: string;
  onPick: (id: string) => void;
}) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1">
      {opts.map((o) => {
        const active = sel === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onPick(o.id)}
            className={cn(
              "shrink-0 w-28 rounded-[14px] p-3 text-center transition-all relative border-[1.5px]",
              active
                ? "bg-[rgba(27,94,53,0.08)] border-[#1B5E35] shadow-[0_4px_16px_rgba(27,94,53,0.1)]"
                : "bg-[#FDFAF4] border-[rgba(27,94,53,0.12)] shadow-[0_1px_4px_rgba(27,94,53,0.05)]",
            )}
          >
            {active && (
              <div
                className="absolute top-2 right-2 size-4 rounded-full flex items-center justify-center
                              animate-pop-in bg-[#1B5E35] text-[#F5F0E8] text-[8px] font-bold"
              >
                ✓
              </div>
            )}
            <span className="text-2xl block mb-1.5">{o.icon}</span>
            <div className="text-[11px] font-bold text-[#163F25] mb-0.75 leading-tight">
              {o.name}
            </div>
            <div className="text-[9.5px] text-[#8A9E8C] mb-2 leading-snug">
              {o.desc}
            </div>
            <div
              className={cn(
                "inline-block rounded-full px-2 py-0.5 text-[9.5px] font-bold",
                o.price === 0
                  ? "bg-[rgba(27,94,53,0.1)] text-[#1B5E35]"
                  : "bg-[rgba(180,130,0,0.1)] text-[#7A5A00]",
              )}
            >
              {o.price === 0 ? "Standar" : "+" + formatPrice(o.price)}
            </div>
          </button>
        );
      })}
    </div>
  );
}
