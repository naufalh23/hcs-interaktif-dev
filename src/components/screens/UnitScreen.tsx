'use client'

import { useState }       from 'react'
import TopBar              from '@/components/kiosk/TopBar'
import { useStore }        from '@/store/kiosk-store'
import { cn, formatPrice } from '@/lib/utils'
import { UNITS }           from '@/data/units'
import type { Unit }       from '@/data/units'

const STATUS: Record<string, { dot: string; bg: string; label: string }> = {
  available: { dot: '#22A85A', bg: 'rgba(34,168,90,0.12)',  label: 'Tersedia' },
  indent:    { dot: '#C9780A', bg: 'rgba(201,120,10,0.1)', label: 'Inden / Proses' },
  sold:      { dot: '#B03030', bg: 'rgba(176,48,48,0.08)', label: 'Terjual' },
}

export default function UnitScreen() {
  const goTo     = useStore(s => s.goTo)
  const type     = useStore(s => s.houseType)
  const selUnit  = useStore(s => s.unit)
  const pickUnit = useStore(s => s.pickUnit)
  const [activeBlock, setBlock] = useState('all')

  if (!type) return null

  const units    = UNITS[type.id] ?? []
  const blocks   = ['all', ...new Set(units.map(u => u.block))]
  const visible  = activeBlock === 'all' ? units : units.filter(u => u.block === activeBlock)
  const avail    = units.filter(u => u.status === 'available').length

  return (
    <div className="absolute inset-0 flex flex-col animate-screen-in" style={{ background: '#EDE8DE' }}>
      <TopBar />
      <div className="flex-1 overflow-hidden flex">

        {/* ── Sidebar ─────────────────────────────────── */}
        <div className="w-[250px] shrink-0 flex flex-col p-5 gap-4 overflow-y-auto"
          style={{ background: '#F5F0E8', borderRight: '1px solid rgba(27,94,53,0.1)' }}>

          {/* Filter blok */}
          <div>
            <div style={{ fontSize: '9.5px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, color: '#9AAD9C', marginBottom: 8 }}>
              Filter Blok
            </div>
            <div className="flex flex-col gap-1.5">
              {blocks.map(b => {
                const cnt = b === 'all'
                  ? units.filter(u => u.status !== 'sold').length
                  : units.filter(u => u.block === b && u.status !== 'sold').length
                const active = activeBlock === b
                return (
                  <button key={b} onClick={() => setBlock(b)}
                    className="flex justify-between items-center px-3.5 py-2.5 rounded-xl transition-all"
                    style={{
                      fontSize: '12.5px', fontWeight: 600,
                      background: active ? 'rgba(27,94,53,0.1)' : '#FDFAF4',
                      border: `1.5px solid ${active ? 'rgba(27,94,53,0.3)' : 'rgba(27,94,53,0.1)'}`,
                      color: active ? '#1B5E35' : '#7A9480',
                    }}>
                    <span className="capitalize">{b === 'all' ? 'Semua Blok' : b}</span>
                    <span className="rounded-lg px-1.5 py-0.5"
                      style={{ fontSize: '9.5px', fontWeight: 700, background: 'rgba(27,94,53,0.1)', color: '#1B5E35' }}>
                      {cnt}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Legenda */}
          <div>
            <div style={{ fontSize: '9.5px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, color: '#9AAD9C', marginBottom: 8 }}>
              Keterangan
            </div>
            {Object.entries(STATUS).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2.5 py-1.5">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: v.dot }} />
                <span style={{ fontSize: '11px', color: '#7A9480' }}>{v.label}</span>
              </div>
            ))}
          </div>

          {/* Tipe info */}
          <div className="mt-auto rounded-[14px] p-3.5"
            style={{ background: 'rgba(27,94,53,0.07)', border: '1px solid rgba(27,94,53,0.12)' }}>
            <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700, color: '#9AAD9C', marginBottom: 6 }}>
              Tipe Dipilih
            </div>
            <div className="font-serif font-semibold" style={{ fontSize: '17px', color: '#163F25', marginBottom: 2 }}>{type.name}</div>
            <div style={{ fontSize: '11px', color: '#7A9480' }}>{type.cluster}</div>
            <div style={{ fontSize: '11px', color: '#9AAD9C', marginTop: 2 }}>LB {type.buildingArea}m² · LT {type.landArea}m²</div>
          </div>

          <button onClick={() => goTo('custom')}
            className="w-full transition-all"
            style={{ padding: '11px', borderRadius: 12, border: '1.5px solid rgba(27,94,53,0.16)', background: 'transparent', fontSize: '12px', fontWeight: 600, color: '#7A9480' }}
            onMouseEnter={e => Object.assign((e.target as HTMLElement).style, { background: 'rgba(27,94,53,0.06)' })}
            onMouseLeave={e => Object.assign((e.target as HTMLElement).style, { background: 'transparent' })}>
            ← Kembali
          </button>
        </div>

        {/* ── Main grid ───────────────────────────────── */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5">
          <div>
            <h1 className="font-serif font-light" style={{ fontSize: '36px', color: '#163F25', lineHeight: 1.1, marginBottom: 4 }}>
              Pilih <em style={{ color: '#1B5E35', fontStyle: 'italic' }}>Kavling</em>
            </h1>
            <p style={{ fontSize: '12px', color: '#7A9480' }}>
              {type.cluster} · {type.name} ·{' '}
              <strong style={{ color: '#1B5E35' }}>{avail} unit tersedia</strong>
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {visible.map(u => (
              <UnitCard key={u.id} unit={u}
                selected={selUnit?.id === u.id}
                onSelect={() => u.status !== 'sold' && pickUnit(u)} />
            ))}
          </div>

          <div className="mt-auto pt-2">
            <button
              onClick={() => selUnit && goTo('form')}
              disabled={!selUnit}
              className="w-full transition-all"
              style={{
                padding: '15px', borderRadius: 14,
                background: selUnit
                  ? 'linear-gradient(135deg,#1B5E35,#2E7D52)'
                  : 'rgba(27,94,53,0.12)',
                color: selUnit ? '#F5F0E8' : 'rgba(27,94,53,0.35)',
                fontSize: '13px', fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase',
                cursor: selUnit ? 'pointer' : 'not-allowed',
                boxShadow: selUnit ? '0 6px 24px rgba(27,94,53,0.25)' : 'none',
              }}>
              {selUnit
                ? `Lanjut Pesan — Kavling ${selUnit.code} →`
                : 'Pilih unit terlebih dahulu'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function UnitCard({ unit: u, selected, onSelect }: {
  unit: Unit; selected: boolean; onSelect: () => void
}) {
  const st = STATUS[u.status]
  return (
    <div onClick={onSelect}
      className={cn('rounded-[14px] p-3.5 text-center transition-all relative', u.status !== 'sold' ? 'cursor-pointer' : 'cursor-not-allowed')}
      style={{
        background: selected ? 'rgba(27,94,53,0.08)' : '#FDFAF4',
        border: `1.5px solid ${selected ? '#1B5E35' : 'rgba(27,94,53,0.12)'}`,
        opacity: u.status === 'sold' ? 0.45 : 1,
        boxShadow: selected
          ? '0 0 0 1.5px #1B5E35, 0 6px 20px rgba(27,94,53,0.12)'
          : '0 1px 6px rgba(27,94,53,0.06)',
        transform: !selected && u.status !== 'sold' ? undefined : selected ? 'translateY(-1px)' : undefined,
      }}>
      {/* Status dot */}
      <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full"
        style={{ background: st.dot, boxShadow: u.status === 'available' ? `0 0 5px ${st.dot}` : 'none' }} />
      {/* Check */}
      {selected && (
        <div className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center animate-pop-in"
          style={{ background: '#1B5E35', color: '#F5F0E8', fontSize: '9px', fontWeight: 700 }}>✓</div>
      )}

      <div className="font-serif font-semibold" style={{ fontSize: '19px', color: '#163F25', marginBottom: 2 }}>{u.code}</div>
      <div style={{ fontSize: '10px', color: '#8A9E8C', marginBottom: 4 }}>{u.block}</div>
      <div style={{ fontSize: '10px', color: '#4A7A5A', fontWeight: 600, marginBottom: 6 }}>↑ {u.facing}</div>
      <div style={{ fontSize: '12px', fontWeight: 700, color: '#163F25' }}>{formatPrice(u.price)}</div>
      {u.notes && (
        <div className="mt-1.5 rounded-lg px-1.5 py-0.5"
          style={{ fontSize: '8.5px', fontWeight: 600, background: 'rgba(201,168,76,0.15)', color: '#7A5A00' }}>
          {u.notes}
        </div>
      )}
    </div>
  )
}
