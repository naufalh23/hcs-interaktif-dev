'use client'

import { useEffect, useState } from 'react'
import { useStore }            from '@/store/kiosk-store'
import { cn }                  from '@/lib/utils'
import type { Screen }         from '@/store/kiosk-store'

const STEPS: { key: Screen; label: string; n: number }[] = [
  { key: 'type',   label: 'Tipe',        n: 1 },
  { key: 'custom', label: 'Kustomisasi', n: 2 },
  { key: 'unit',   label: 'Unit',        n: 3 },
  { key: 'form',   label: 'Pemesanan',   n: 4 },
]
const ORDER: Screen[] = ['attract','type','custom','unit','form','success']

/* Light H logo — tiny */
function MiniLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 90 90" fill="none">
      <polygon points="45,4 82,24 82,66 45,86 8,66 8,24"
        fill="rgba(27,94,53,0.08)" stroke="#1B5E35" strokeWidth="2" />
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
        fontFamily="Cormorant Garamond,Georgia,serif" fontSize="44" fontWeight="700" fill="#1B5E35">H</text>
    </svg>
  )
}

export default function TopBar() {
  const screen = useStore(s => s.screen)
  const reset  = useStore(s => s.reset)
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }))
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  const curIdx = ORDER.indexOf(screen)

  return (
    <div className="h-[60px] shrink-0 flex items-center px-6 gap-5"
      style={{
        background: '#FDFAF4',
        borderBottom: '1px solid rgba(27,94,53,0.12)',
        boxShadow: '0 1px 8px rgba(27,94,53,0.06)',
      }}>

      {/* Brand */}
      <div className="flex items-center gap-2.5 shrink-0">
        <MiniLogo />
        <div className="leading-none">
          <div className="font-serif font-bold" style={{ fontSize: 15, letterSpacing: '2px', color: '#163F25' }}>
            H City <span style={{ color: '#1B5E35' }}>Sawangan</span>
          </div>
          <div style={{ fontSize: '8px', letterSpacing: '2.5px', color: '#9AAD9C', textTransform: 'uppercase', marginTop: 2, fontWeight: 600 }}>
            A home to live
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-7 shrink-0" style={{ background: 'rgba(27,94,53,0.14)' }} />

      {/* Steps */}
      <div className="flex gap-1 flex-1">
        {STEPS.map(s => {
          const idx    = ORDER.indexOf(s.key)
          const done   = idx < curIdx
          const active = s.key === screen
          return (
            <div key={s.key}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all"
              style={{
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px',
                color: active ? '#1B5E35' : done ? 'rgba(27,94,53,0.4)' : 'rgba(107,128,112,0.45)',
              }}>
              {/* Step circle */}
              <span className="w-[21px] h-[21px] rounded-full flex items-center justify-center shrink-0 transition-all"
                style={{
                  fontSize: '9px', fontWeight: 700, border: '1.5px solid',
                  borderColor: active ? '#1B5E35' : done ? '#1B5E35' : 'rgba(27,94,53,0.2)',
                  background:  active ? '#1B5E35' : done ? 'rgba(27,94,53,0.08)' : 'transparent',
                  color:       active ? '#F5F0E8' : done ? '#1B5E35' : 'rgba(27,94,53,0.3)',
                }}>
                {done ? '✓' : s.n}
              </span>
              {active && <span>{s.label}</span>}
            </div>
          )
        })}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="tabular-nums" style={{ fontSize: '11px', color: '#9AAD9C', fontWeight: 500 }}>{time}</span>
        <button onClick={reset}
          className="transition-all hover:scale-[1.02]"
          style={{
            fontSize: '10.5px', fontWeight: 600, letterSpacing: '1px',
            color: '#8A9E8C', padding: '6px 12px', borderRadius: 10,
            border: '1px solid rgba(27,94,53,0.16)', background: 'transparent',
          }}
          onMouseEnter={e => Object.assign((e.target as HTMLElement).style, { background: 'rgba(27,94,53,0.06)', color: '#1B5E35' })}
          onMouseLeave={e => Object.assign((e.target as HTMLElement).style, { background: 'transparent', color: '#8A9E8C' })}>
          ✕ Reset
        </button>
      </div>
    </div>
  )
}
