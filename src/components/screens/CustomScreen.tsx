'use client'

import TopBar              from '@/components/kiosk/TopBar'
import { useStore }        from '@/store/kiosk-store'
import { cn, formatPrice } from '@/lib/utils'
import {
  ROOF_OPTIONS, DOOR_OPTIONS, WINDOW_OPTIONS, ADDON_OPTIONS,
  ROOF_COLORS, calcExtraPrice,
} from '@/data/customization'
import type { CustomOption } from '@/data/customization'

const ROOF_COLOR_SVG: Record<string, string> = {
  minimalis: '#3D5C4A', joglo: '#5C7A3D', mediteran: '#8B7A5A', tropis: '#2D7A5A',
}

export default function CustomScreen() {
  const goTo   = useStore(s => s.goTo)
  const type   = useStore(s => s.houseType)
  const custom = useStore(s => s.custom)
  const setC   = useStore(s => s.setCustom)
  const toggle = useStore(s => s.toggleAddon)
  const extra  = useStore(s => s.extraPrice())
  const total  = useStore(s => s.totalPrice())

  if (!type) return null

  const wallColor = type.wallColors[custom.colorIndex]?.hex ?? '#C4B89A'
  const roofColor = ROOF_COLOR_SVG[custom.roofStyle] ?? '#3D5C4A'
  const roofY     = type.floors === 2 ? 103 : 143
  const roofTop   = type.floors === 2 ? 55  : 58

  return (
    <div className="absolute inset-0 flex flex-col animate-screen-in" style={{ background: '#EDE8DE' }}>
      <TopBar />
      <div className="flex-1 overflow-hidden flex">

        {/* ── Left: Live Preview ───────────────────────── */}
        <div className="w-[380px] shrink-0 flex flex-col p-6 overflow-y-auto"
          style={{ background: '#F5F0E8', borderRight: '1px solid rgba(27,94,53,0.1)' }}>

          <div style={{ fontSize: '9.5px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, color: '#9AAD9C', marginBottom: 14 }}>
            Preview Rumah
          </div>

          <div className="flex-1 flex items-center justify-center">
            <svg viewBox="0 0 320 280" className="w-full max-w-[295px] drop-shadow-lg" fill="none">
              <ellipse cx="160" cy="270" rx="105" ry="9" fill="rgba(27,94,53,0.1)" />
              {/* Ground */}
              <rect x="40" y="258" width="240" height="6" rx="3" fill="rgba(27,94,53,0.06)" />
              {/* Wall */}
              <rect x="40" y="140" width="240" height="120" rx="4" fill={wallColor} />
              {/* Wall highlight */}
              <rect x="40" y="140" width="240" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
              {/* 2nd floor */}
              {type.floors === 2 && <>
                <rect x="40" y="100" width="240" height="42" rx="3" fill={wallColor} opacity={0.88} />
                <rect x="40" y="100" width="240" height="5" fill="rgba(255,255,255,0.2)" />
                <rect x="120" y="108" width="80" height="29" rx="4" fill="rgba(180,220,240,0.5)" />
              </>}
              {/* Roof */}
              <polygon points={`20,${roofY} 160,${roofTop} 300,${roofY}`} fill={roofColor} />
              <polygon points={`20,${roofY} 160,${roofTop} 300,${roofY}`}
                fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
              {/* Fascia board */}
              <line x1="20" y1={roofY} x2="300" y2={roofY} stroke="rgba(0,0,0,0.08)" strokeWidth="5" />
              {/* Door */}
              <rect x="130" y="200" width="60" height="60" rx="30" fill="rgba(27,63,37,0.7)" />
              <rect x="134" y="204" width="52" height="52" rx="26" fill="rgba(22,45,28,0.8)" />
              <circle cx="172" cy="230" r="4.5" fill="#C9A84C" />
              <circle cx="172" cy="230" r="2.5" fill="#E0C06A" />
              {/* Windows */}
              {[58, 202].map(x => (
                <g key={x}>
                  <rect x={x} y="161" width="62" height="52" rx="5" fill="rgba(180,220,240,0.55)" />
                  <rect x={x} y="161" width="62" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
                  <line x1={x+31} y1="161" x2={x+31} y2="213" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                  <line x1={x} y1="187" x2={x+62} y2="187" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                </g>
              ))}
              {/* Addons */}
              {custom.addons.garasi && <>
                <rect x="46" y="198" width="74" height="62" rx="2" fill="#8A9E8C" />
                <rect x="50" y="202" width="66" height="54" rx="2" fill="#6A7E6C" />
                <line x1="50" y1="229" x2="116" y2="229" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                <line x1="83" y1="202" x2="83" y2="256" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
              </>}
              {custom.addons.solar && <>
                <rect x="80" y={type.floors === 2 ? 68 : 72} width="64" height="36" rx="3" fill="#3A4A5A" />
                {[0, 1, 2, 3].map(n => (
                  <rect key={n}
                    x={80 + (n % 2) * 33 + 2} y={(type.floors === 2 ? 68 : 72) + Math.floor(n / 2) * 18 + 2}
                    width="28" height="14" rx="1" fill="#2A3A4A" />
                ))}
              </>}
              {custom.addons.pagar && <>
                <rect x="20" y="251" width="280" height="7" rx="2" fill="#6A7E6C" />
                {[20,46,72,98,216,242,268,294].map(x =>
                  <rect key={x} x={x} y="243" width="5" height="15" rx="1" fill="#6A7E6C" />
                )}
              </>}
              {custom.addons.ac && (
                <rect x="200" y="155" width="34" height="11" rx="3" fill="#A0A8A4" />
              )}
              {/* Garden */}
              {[[36,256,12],[40,260,8],[282,256,12],[278,260,8]].map(([cx,cy,r], i) => (
                <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 === 0 ? 'rgba(27,94,53,0.45)' : 'rgba(46,125,82,0.5)'} />
              ))}
            </svg>
          </div>

          {/* Price breakdown */}
          <div style={{ marginTop: 12, background: '#F5F0E8', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(27,94,53,0.1)' }}>
            <div style={{ fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700, color: '#9AAD9C', marginBottom: 8 }}>
              Estimasi Harga
            </div>
            <div className="flex justify-between" style={{ marginBottom: 4 }}>
              <span style={{ fontSize: '11px', color: '#7A9480' }}>Harga Dasar</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#4A6A55' }}>{formatPrice(type.basePrice)}</span>
            </div>
            {extra > 0 && (
              <div className="flex justify-between" style={{ marginBottom: 4 }}>
                <span style={{ fontSize: '11px', color: '#7A9480' }}>Kustomisasi</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#8B6A00' }}>+{formatPrice(extra)}</span>
              </div>
            )}
            <div style={{ borderTop: '1px dashed rgba(27,94,53,0.14)', margin: '8px 0', paddingTop: 8 }}>
              <div className="flex justify-between items-baseline">
                <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#163F25', textTransform: 'uppercase', letterSpacing: '1px' }}>Total</span>
                <span className="font-serif font-bold" style={{ fontSize: '22px', color: '#163F25' }}>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex gap-2.5 mt-4">
            <button onClick={() => goTo('type')}
              className="transition-all"
              style={{ padding: '12px 16px', borderRadius: 12, border: '1.5px solid rgba(27,94,53,0.18)', background: 'transparent', fontSize: '12px', fontWeight: 600, color: '#7A9480' }}
              onMouseEnter={e => Object.assign((e.target as HTMLElement).style, { background: 'rgba(27,94,53,0.06)' })}
              onMouseLeave={e => Object.assign((e.target as HTMLElement).style, { background: 'transparent' })}>
              ← Tipe
            </button>
            <button onClick={() => goTo('unit')}
              className="flex-1 transition-all hover:scale-[1.01]"
              style={{
                padding: '12px 0', borderRadius: 12,
                background: 'linear-gradient(135deg,#1B5E35,#2E7D52)',
                color: '#F5F0E8', fontSize: '12px', fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase',
                boxShadow: '0 4px 20px rgba(27,94,53,0.22)',
              }}>
              Pilih Unit →
            </button>
          </div>
        </div>

        {/* ── Right: Options ───────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-7 flex flex-col gap-6">

          <Section icon="🏗" title="Model Atap" sub="Desain atap mempengaruhi kesan rumah">
            <OptionRow opts={ROOF_OPTIONS} sel={custom.roofStyle}
              onPick={id => setC({ roofStyle: id })} />
          </Section>

          <Section icon="🎨" title="Warna Eksterior" sub="Pilih warna cat dinding luar">
            <div className="flex gap-3 flex-wrap">
              {type.wallColors.map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <button onClick={() => setC({ colorIndex: i })}
                    className="w-11 h-11 rounded-xl transition-all hover:scale-110 relative flex items-center justify-center"
                    style={{
                      background: c.hex,
                      border: custom.colorIndex === i
                        ? `2.5px solid #1B5E35`
                        : '2px solid rgba(0,0,0,0.06)',
                      boxShadow: custom.colorIndex === i
                        ? '0 0 0 3px rgba(27,94,53,0.2), 0 4px 12px rgba(0,0,0,0.1)'
                        : '0 2px 6px rgba(0,0,0,0.08)',
                    }}>
                    {custom.colorIndex === i && (
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: 16, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>✓</span>
                    )}
                  </button>
                  <span style={{ fontSize: '8.5px', color: '#8A9E8C', textAlign: 'center', maxWidth: 44 }}>{c.name}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section icon="🚪" title="Model Pintu" sub="Kesan pertama hunian Anda">
            <OptionRow opts={DOOR_OPTIONS} sel={custom.doorStyle}
              onPick={id => setC({ doorStyle: id })} />
          </Section>

          <Section icon="🪟" title="Tipe Jendela" sub="Pencahayaan & sirkulasi udara">
            <OptionRow opts={WINDOW_OPTIONS} sel={custom.windowStyle}
              onPick={id => setC({ windowStyle: id })} />
          </Section>

          <Section icon="⚡" title="Fasilitas Tambahan" sub="Upgrade hunian Anda (bisa multi-pilih)">
            <div className="flex flex-col gap-2">
              {ADDON_OPTIONS.map(a => (
                <button key={a.id} onClick={() => toggle(a.id)}
                  className="flex items-center gap-3 p-3.5 rounded-xl text-left transition-all"
                  style={{
                    background: custom.addons[a.id] ? 'rgba(27,94,53,0.08)' : '#FDFAF4',
                    border: `1.5px solid ${custom.addons[a.id] ? 'rgba(27,94,53,0.35)' : 'rgba(27,94,53,0.1)'}`,
                  }}>
                  <span style={{ fontSize: 20 }}>{a.icon}</span>
                  <div className="flex-1">
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#163F25', marginBottom: 1 }}>{a.name}</div>
                    <div style={{ fontSize: '10px', color: '#7A9480' }}>{a.desc}</div>
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#1B5E35', marginRight: 8 }}>
                    +{formatPrice(a.price)}
                  </div>
                  {/* Toggle */}
                  <div className="relative shrink-0 transition-all"
                    style={{
                      width: 38, height: 20, borderRadius: 10,
                      background: custom.addons[a.id] ? '#1B5E35' : '#D8D1C4',
                    }}>
                    <div className="absolute top-[3px] w-[14px] h-[14px] rounded-full bg-white transition-all"
                      style={{ left: custom.addons[a.id] ? 21 : 3, boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                  </div>
                </button>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({ icon, title, sub, children }: {
  icon: string; title: string; sub: string; children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 text-sm"
          style={{ background: 'rgba(27,94,53,0.1)', border: '1px solid rgba(27,94,53,0.15)' }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#163F25' }}>{title}</div>
          <div style={{ fontSize: '10px', color: '#8A9E8C' }}>{sub}</div>
        </div>
      </div>
      {children}
    </div>
  )
}

function OptionRow({ opts, sel, onPick }: {
  opts: CustomOption[]; sel: string; onPick: (id: string) => void
}) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1">
      {opts.map(o => {
        const active = sel === o.id
        return (
          <button key={o.id} onClick={() => onPick(o.id)}
            className="shrink-0 w-[112px] rounded-[14px] p-3 text-center transition-all relative"
            style={{
              background: active ? 'rgba(27,94,53,0.08)' : '#FDFAF4',
              border: `1.5px solid ${active ? '#1B5E35' : 'rgba(27,94,53,0.12)'}`,
              boxShadow: active ? '0 4px 16px rgba(27,94,53,0.1)' : '0 1px 4px rgba(27,94,53,0.05)',
            }}>
            {active && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center animate-pop-in"
                style={{ background: '#1B5E35', color: '#F5F0E8', fontSize: '8px', fontWeight: 700 }}>✓</div>
            )}
            <span style={{ fontSize: 24, display: 'block', marginBottom: 6 }}>{o.icon}</span>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#163F25', marginBottom: 3, lineHeight: 1.2 }}>{o.name}</div>
            <div style={{ fontSize: '9.5px', color: '#8A9E8C', marginBottom: 8, lineHeight: 1.3 }}>{o.desc}</div>
            <div className="inline-block rounded-full px-2 py-0.5"
              style={{
                fontSize: '9.5px', fontWeight: 700,
                background: o.price === 0 ? 'rgba(27,94,53,0.1)' : 'rgba(180,130,0,0.1)',
                color:      o.price === 0 ? '#1B5E35' : '#7A5A00',
              }}>
              {o.price === 0 ? 'Standar' : '+' + formatPrice(o.price)}
            </div>
          </button>
        )
      })}
    </div>
  )
}
