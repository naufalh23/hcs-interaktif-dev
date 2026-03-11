'use client'

import { useEffect, useRef } from 'react'
import { useStore }           from '@/store/kiosk-store'
import { formatPrice }        from '@/lib/utils'

const CF_COLORS = ['#1B5E35','#2E7D52','#4CAF78','#C9A84C','#E0C06A','#A8D5B8','#fff','#C4B89A']
const AUTO_RESET = 50_000

function Logo({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" fill="none">
      <polygon points="45,4 82,24 82,66 45,86 8,66 8,24"
        fill="rgba(27,94,53,0.08)" stroke="#1B5E35" strokeWidth="1.5" />
      <polygon points="45,11 76,28 76,62 45,79 14,62 14,28"
        fill="none" stroke="rgba(201,168,76,0.38)" strokeWidth="0.75" />
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
        fontFamily="Cormorant Garamond,Georgia,serif" fontSize="42" fontWeight="700" fill="#1B5E35">H</text>
      <line x1="27" y1="70" x2="63" y2="70" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function GoldDivider({ width = 240 }: { width?: number }) {
  return (
    <div className="flex items-center gap-3" style={{ width }}>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,transparent,#C9A84C)' }} />
      <svg width="8" height="8" viewBox="0 0 8 8">
        <rect x="2" y="0" width="4" height="4" fill="#C9A84C" transform="rotate(45 4 4)" />
      </svg>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left,transparent,#C9A84C)' }} />
    </div>
  )
}

export default function SuccessScreen() {
  const type    = useStore(s => s.houseType)
  const unit    = useStore(s => s.unit)
  const code    = useStore(s => s.bookingCode)
  const payment = useStore(s => s.paymentMethod)
  const total   = useStore(s => s.totalPrice())
  const reset   = useStore(s => s.reset)
  const cfRef   = useRef<HTMLDivElement>(null)
  const tmRef   = useRef<ReturnType<typeof setTimeout>>()

  /* Confetti burst */
  useEffect(() => {
    const box = cfRef.current
    if (!box) return
    for (let i = 0; i < 90; i++) {
      const el = document.createElement('div')
      const sz = 5 + Math.random() * 9
      Object.assign(el.style, {
        position:    'absolute',
        left:        `${Math.random() * 100}%`,
        top:         '-14px',
        width:       `${sz}px`,
        height:      `${sz * 1.6}px`,
        background:  CF_COLORS[Math.floor(Math.random() * CF_COLORS.length)],
        borderRadius: Math.random() > .45 ? '50%' : '2px',
        animationDuration:       `${2.5 + Math.random() * 2.5}s`,
        animationDelay:          `${Math.random() * 1.2}s`,
        animationTimingFunction: 'linear',
        animationFillMode:       'forwards',
      })
      el.classList.add('cf-piece')
      box.appendChild(el)
    }
    tmRef.current = setTimeout(reset, AUTO_RESET)
    return () => clearTimeout(tmRef.current)
  }, [reset])

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden animate-screen-in"
      style={{ background: '#F5F0E8' }}>

      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(27,94,53,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

      {/* Centre bloom */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(245,240,232,0.95) 25%, rgba(220,210,188,0.45) 100%)' }} />

      {/* Green pillar accents */}
      {['left-0','right-0'].map(cls => (
        <div key={cls} className={`absolute ${cls} top-0 bottom-0 w-3 pointer-events-none`}
          style={{ background: 'linear-gradient(180deg,#163F25,#1B5E35,#2E7D52,#1B5E35,#163F25)' }}>
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: '#C9A84C' }} />
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: '#C9A84C' }} />
        </div>
      ))}

      {/* Confetti container */}
      <div ref={cfRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

      {/* Card */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[520px] w-full animate-fade-up">

        {/* Logo + brand */}
        <div className="flex items-center gap-2.5 mb-5">
          <Logo size={52} />
          <div>
            <div className="font-serif font-bold" style={{ fontSize: '17px', letterSpacing: '3px', color: '#163F25' }}>
              H City <span style={{ color: '#1B5E35' }}>Sawangan</span>
            </div>
            <div style={{ fontSize: '8.5px', letterSpacing: '3px', color: '#9AAD9C', textTransform: 'uppercase', fontWeight: 600 }}>
              Marketing Gallery
            </div>
          </div>
        </div>

        <GoldDivider />

        {/* Icon */}
        <div className="flex items-center justify-center mt-6 mb-4 animate-pop-in"
          style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'rgba(27,94,53,0.08)',
            border: '2px solid rgba(27,94,53,0.2)',
            fontSize: 42,
          }}>
          🏠
        </div>

        <h1 className="font-serif font-light" style={{ fontSize: '52px', color: '#163F25', lineHeight: 0.9, marginBottom: 10 }}>
          Booking{' '}
          <em style={{ color: '#1B5E35', fontStyle: 'italic' }}>Berhasil!</em>
        </h1>
        <p style={{ fontSize: '13px', color: '#7A9480', marginBottom: 24 }}>
          Terima kasih! Hunian impian Anda satu langkah lebih dekat.
        </p>

        {/* Ticket */}
        <div className="relative w-full rounded-2xl overflow-visible mb-5"
          style={{ background: '#FDFAF4', border: '1px solid rgba(27,94,53,0.14)', boxShadow: '0 8px 40px rgba(27,94,53,0.1)' }}>
          {/* Notch */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
            style={{ background: '#F5F0E8', border: '1px solid rgba(27,94,53,0.1)' }} />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
            style={{ background: '#F5F0E8', border: '1px solid rgba(27,94,53,0.1)' }} />

          <div className="px-10 py-6">
            <div style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700, color: '#9AAD9C', marginBottom: 6 }}>
              Kode Booking
            </div>
            <div className="font-serif font-bold" style={{ fontSize: '44px', letterSpacing: '8px', color: '#1B5E35', lineHeight: 1, marginBottom: 16 }}>
              {code ?? '—'}
            </div>

            {/* Gold dashed divider */}
            <div style={{ borderTop: '1.5px dashed rgba(201,168,76,0.3)', paddingTop: 14 }}>
              <div className="grid grid-cols-3 gap-4">
                {[
                  ['Unit',   unit?.code   ?? '—'],
                  ['Tipe',   type?.name   ?? '—'],
                  ['Bayar',  payment      ?? '—'],
                ].map(([l, v]) => (
                  <div key={l} className="text-center">
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#163F25', marginBottom: 2 }}>{v}</div>
                    <div style={{ fontSize: '9.5px', color: '#8A9E8C' }}>{l}</div>
                  </div>
                ))}
              </div>
              {total > 0 && (
                <div className="mt-4 pt-4 text-center" style={{ borderTop: '1px solid rgba(27,94,53,0.1)' }}>
                  <div style={{ fontSize: '9.5px', color: '#8A9E8C', marginBottom: 2 }}>Total Estimasi</div>
                  <div className="font-serif font-bold" style={{ fontSize: '22px', color: '#1B5E35' }}>{formatPrice(total)}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* WA info */}
        <div className="w-full rounded-xl px-5 py-3 mb-6 flex items-center gap-2.5"
          style={{ background: 'rgba(27,94,53,0.07)', border: '1px solid rgba(27,94,53,0.14)' }}>
          <span style={{ fontSize: 16 }}>📞</span>
          <p style={{ fontSize: '12px', color: '#7A9480' }}>
            Tim kami akan menghubungi Anda via WhatsApp:{' '}
            <strong style={{ color: '#1B5E35' }}>+62 811 1130 114</strong>
          </p>
        </div>

        <button onClick={reset}
          className="inline-flex items-center gap-2 transition-all hover:scale-[1.03]"
          style={{
            padding: '14px 40px', borderRadius: 999,
            background: 'linear-gradient(135deg,#1B5E35,#2E7D52)',
            color: '#F5F0E8', fontSize: '12px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            boxShadow: '0 8px 28px rgba(27,94,53,0.28)',
          }}>
          ← Kembali ke Awal
        </button>

        <p style={{ fontSize: '9.5px', color: '#B0BEB2', marginTop: 14 }}>
          Halaman akan kembali otomatis dalam beberapa saat
        </p>
      </div>
    </div>
  )
}
