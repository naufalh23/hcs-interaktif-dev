'use client'

import TopBar        from '@/components/kiosk/TopBar'
import { useStore }  from '@/store/kiosk-store'
import { cn, formatPrice } from '@/lib/utils'
import type { HouseType }  from '@/data/house-types'

const ROOF_COLOR: Record<string, string> = {
  minimalis: '#3D5C4A', joglo: '#5C7A3D', mediteran: '#8B7A5A', tropis: '#2D7A5A',
}
const BADGE_STYLE: Record<string, React.CSSProperties> = {
  ready:  { background: 'rgba(27,94,53,0.1)',  color: '#1B5E35', border: '1px solid rgba(27,94,53,0.2)' },
  indent: { background: 'rgba(180,130,0,0.1)', color: '#7A5A00', border: '1px solid rgba(180,130,0,0.22)' },
  hot:    { background: 'rgba(180,40,40,0.08)', color: '#8B2020', border: '1px solid rgba(180,40,40,0.2)' },
}

export default function TypeScreen({ houseTypes }: { houseTypes: HouseType[] }) {
  const pickType = useStore(s => s.pickType)
  const current  = useStore(s => s.houseType)

  return (
    <div className="absolute inset-0 flex flex-col animate-screen-in" style={{ background: '#EDE8DE' }}>
      <TopBar />
      <div className="flex-1 overflow-y-auto p-7 flex flex-col gap-5">

        {/* Header */}
        <div>
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, color: '#9AAD9C', marginBottom: 6 }}>
            Langkah 1 dari 4
          </div>
          <h1 className="font-serif font-light" style={{ fontSize: '38px', color: '#163F25', lineHeight: 1.1, marginBottom: 4 }}>
            Pilih <em style={{ color: '#1B5E35', fontStyle: 'italic' }}>Cluster</em> &amp; Tipe
          </h1>
          <p style={{ fontSize: '12px', color: '#7A9480' }}>
            Jl. Raya Parung No. 27, Bojongsari, Depok · Tersedia mulai Rp 800 Juta
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-3.5">
          {houseTypes.map(t => (
            <TypeCard key={t.id} type={t}
              selected={current?.id === t.id}
              onSelect={() => pickType(t)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TypeCard({ type: t, selected, onSelect }: {
  type: HouseType; selected: boolean; onSelect: () => void
}) {
  const wallCol = t.wallColors[0]?.hex ?? '#C4B89A'

  return (
    <button onClick={onSelect} className="text-left group">
      <div className={cn(
        'overflow-hidden rounded-[18px] transition-all duration-300 relative border-[1.5px]',
        selected ? '' : 'hover:-translate-y-1',
      )}
        style={{
          background: '#FDFAF4',
          borderColor: selected ? '#1B5E35' : 'rgba(27,94,53,0.14)',
          boxShadow: selected
            ? '0 0 0 1.5px #1B5E35, 0 16px 40px rgba(27,94,53,0.14)'
            : '0 2px 12px rgba(27,94,53,0.07)',
        }}>

        {/* Badge */}
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[9.5px] font-bold tracking-[1.5px] uppercase"
          style={BADGE_STYLE[t.badge]}>
          {t.badgeLabel}
        </div>

        {/* Checkmark */}
        {selected && (
          <div className="absolute top-3 left-3 z-10 w-6 h-6 rounded-full flex items-center justify-center animate-pop-in"
            style={{ background: '#1B5E35', color: '#F5F0E8', fontSize: '11px', fontWeight: 700 }}>
            ✓
          </div>
        )}

        {/* Illustration area */}
        <div className="h-[132px] flex items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#EDE8DE 0%,#E3DDD2 100%)' }}>
          <svg width="186" height="120" viewBox="0 0 186 120">
            <ellipse cx="93" cy="115" rx="64" ry="7" fill="rgba(27,94,53,0.12)" />
            {/* Wall */}
            <rect x="18" y="68" width="150" height="46" rx="3" fill={wallCol} />
            {t.floors === 2 && <>
              <rect x="18" y="42" width="150" height="28" rx="3" fill={wallCol} opacity={0.82} />
              <rect x="60" y="48" width="66" height="17" rx="3" fill="rgba(180,210,230,0.6)" />
            </>}
            {/* Roof */}
            <polygon
              points={`5,${t.floors === 2 ? 45 : 70} 93,${t.floors === 2 ? 13 : 26} 181,${t.floors === 2 ? 45 : 70}`}
              fill={ROOF_COLOR.minimalis}
            />
            {/* Door */}
            <rect x="75" y="88" width="36" height="28" rx="18" fill="rgba(27,94,53,0.55)" />
            <rect x="78" y="91" width="30" height="22" rx="15" fill="rgba(22,63,37,0.7)" />
            <circle cx="90" cy="102" r="2.5" fill="rgba(201,168,76,0.9)" />
            {/* Windows */}
            <rect x="23" y="76" width="38" height="26" rx="4" fill="rgba(180,210,230,0.55)" />
            <line x1="42" y1="76" x2="42" y2="102" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <line x1="23" y1="89" x2="61" y2="89" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <rect x="125" y="76" width="38" height="26" rx="4" fill="rgba(180,210,230,0.55)" />
            <line x1="144" y1="76" x2="144" y2="102" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <line x1="125" y1="89" x2="163" y2="89" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          </svg>
        </div>

        {/* Info */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(27,94,53,0.08)' }}>
          <div style={{ fontSize: '9.5px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700, color: '#1B5E35', marginBottom: 2 }}>
            {t.cluster}
          </div>
          <div className="font-serif font-semibold" style={{ fontSize: '21px', color: '#163F25', marginBottom: 4 }}>
            {t.name}
          </div>
          <div style={{ fontSize: '11px', color: '#8A9E8C', marginBottom: 12 }}>
            {t.floors} Lantai · LB {t.buildingArea}m² · LT {t.landArea}m²
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="font-serif font-bold" style={{ fontSize: '18px', color: '#163F25' }}>
                {formatPrice(t.basePrice)}
              </div>
              <div style={{ fontSize: '9.5px', color: '#9AAD9C' }}>/unit</div>
            </div>
            <div className="flex gap-3">
              {[['KT', t.bedrooms], ['KM', t.bathrooms]].map(([l, v]) => (
                <div key={l as string} className="text-center">
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#4A7A5A' }}>{v}</div>
                  <div style={{ fontSize: '9px', color: '#9AAD9C' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
