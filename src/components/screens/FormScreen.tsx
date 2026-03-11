'use client'

import { useState }             from 'react'
import { useForm }              from 'react-hook-form'
import { zodResolver }          from '@hookform/resolvers/zod'
import { toast }                from 'sonner'
import TopBar                   from '@/components/kiosk/TopBar'
import { useStore }             from '@/store/kiosk-store'
import { cn, formatPrice }      from '@/lib/utils'
import { bookingSchema }        from '@/lib/validations'
import { AGENTS, WALK_IN }      from '@/data/agents'
import type { BookingSchema }   from '@/lib/validations'
import type { PaymentMethod }   from '@/data/leads'

const PAYMENT_OPTS: { value: PaymentMethod; label: string; sub: string; icon: string }[] = [
  { value: 'KPR Bank',      label: 'KPR Bank',      sub: 'Free biaya KPR*',  icon: '🏦' },
  { value: 'Cash Keras',    label: 'Cash Keras',    sub: 'Diskon spesial',   icon: '💰' },
  { value: 'Cash Bertahap', label: 'Cash Bertahap', sub: '12–24 bulan',      icon: '📅' },
]

export default function FormScreen() {
  const goTo    = useStore(s => s.goTo)
  const type    = useStore(s => s.houseType)
  const unit    = useStore(s => s.unit)
  const custom  = useStore(s => s.custom)
  const extra   = useStore(s => s.extraPrice())
  const total   = useStore(s => s.totalPrice())
  const payment = useStore(s => s.paymentMethod)
  const setPay  = useStore(s => s.setPayment)
  const setCode = useStore(s => s.setBookingCode)
  const [busy, setBusy] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { paymentMethod: payment },
  })

  const onSubmit = async (form: BookingSchema) => {
    if (!type || !unit) return
    setBusy(true)
    try {
      const res = await fetch('/api/booking', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form, paymentMethod: payment,
          unitId: unit.id, unitCode: unit.code,
          houseTypeId: type.id, houseTypeName: type.name,
          clusterName: type.cluster, unitFacing: unit.facing,
          basePrice: unit.price, totalPrice: total,
          customization: custom, kioskId: 'KIOSK-01',
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.error ?? 'Gagal')
      setCode(json.bookingCode)
      goTo('success')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Terjadi kesalahan, coba lagi.')
    } finally {
      setBusy(false)
    }
  }

  if (!type || !unit) return null

  return (
    <div className="absolute inset-0 flex flex-col animate-screen-in" style={{ background: '#EDE8DE' }}>
      <TopBar />
      <div className="flex-1 overflow-hidden flex">

        {/* ── Left summary ────────────────────────────── */}
        <div className="w-[360px] shrink-0 flex flex-col p-6 gap-4 overflow-y-auto"
          style={{ background: '#F5F0E8', borderRight: '1px solid rgba(27,94,53,0.1)' }}>

          {/* Order card */}
          <div className="rounded-[18px] p-5"
            style={{ background: '#FDFAF4', border: '1px solid rgba(27,94,53,0.13)', boxShadow: '0 3px 16px rgba(27,94,53,0.07)' }}>
            <div className="flex items-start gap-3 mb-4">
              <span style={{ fontSize: 38 }}>{type.icon}</span>
              <div>
                <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700, color: '#1B5E35', marginBottom: 2 }}>
                  {type.cluster}
                </div>
                <div className="font-serif font-semibold" style={{ fontSize: '20px', color: '#163F25', lineHeight: 1.1 }}>
                  {type.name}
                </div>
                <div style={{ fontSize: '11px', color: '#8A9E8C', marginTop: 1 }}>Kavling {unit.code}</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(27,94,53,0.1)', paddingTop: 12, marginBottom: 4 }}>
              {[
                ['Kavling',    unit.code],
                ['Arah Hadap', unit.facing],
                ['Lantai',     `${type.floors} Lantai`],
                ['LB / LT',   `${type.buildingArea}m² / ${type.landArea}m²`],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between py-1.5">
                  <span style={{ fontSize: '11px', color: '#8A9E8C' }}>{l}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#1B5E35' }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px dashed rgba(27,94,53,0.12)', paddingTop: 10, marginTop: 4 }}>
              <div className="flex justify-between py-1">
                <span style={{ fontSize: '11px', color: '#8A9E8C' }}>Harga Dasar</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#4A6A55' }}>{formatPrice(unit.price)}</span>
              </div>
              {extra > 0 && (
                <div className="flex justify-between py-1">
                  <span style={{ fontSize: '11px', color: '#8A9E8C' }}>Kustomisasi</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#8B6A00' }}>+{formatPrice(extra)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline mt-2 pt-2"
                style={{ borderTop: '1.5px solid rgba(27,94,53,0.1)' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#163F25', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Estimasi</span>
                <span className="font-serif font-bold" style={{ fontSize: '24px', color: '#163F25' }}>{formatPrice(total)}</span>
              </div>
              <div style={{ fontSize: '9.5px', color: '#9AAD9C', textAlign: 'right', marginTop: 2 }}>
                Belum termasuk notaris &amp; pajak
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div>
            <div style={{ fontSize: '9.5px', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700, color: '#9AAD9C', marginBottom: 8 }}>
              Metode Pembayaran
            </div>
            <div className="flex flex-col gap-2">
              {PAYMENT_OPTS.map(o => (
                <button key={o.value} type="button" onClick={() => setPay(o.value)}
                  className="flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                  style={{
                    background: payment === o.value ? 'rgba(27,94,53,0.08)' : '#FDFAF4',
                    border: `1.5px solid ${payment === o.value ? 'rgba(27,94,53,0.3)' : 'rgba(27,94,53,0.1)'}`,
                  }}>
                  <span style={{ fontSize: 20 }}>{o.icon}</span>
                  <div className="flex-1">
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#163F25' }}>{o.label}</div>
                    <div style={{ fontSize: '10px', color: '#8A9E8C' }}>{o.sub}</div>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{
                      borderColor: payment === o.value ? '#1B5E35' : 'rgba(27,94,53,0.2)',
                      background:  payment === o.value ? '#1B5E35' : 'transparent',
                    }}>
                    {payment === o.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right form ──────────────────────────────── */}
        <div className="flex-1 p-8 overflow-y-auto">

          {/* Promo banner */}
          <div className="flex items-center gap-2.5 rounded-xl px-4 py-3 mb-6"
            style={{
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.3)',
            }}>
            <span style={{ fontSize: 16 }}>🎁</span>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#7A5A00' }}>
              <strong>Promo All-In 5Jt</strong> — Free Biaya KPR, BPHTB &amp; AJB! Terbatas.
            </div>
          </div>

          <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700, color: '#9AAD9C', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(27,94,53,0.1)' }}>
            Data Diri Pemesan
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3.5">
              <Field label="Nama Lengkap *" err={errors.fullName?.message}>
                <input {...register('fullName')} placeholder="Nama sesuai KTP"
                  className={inp(!!errors.fullName)} />
              </Field>
              <Field label="No. HP / WhatsApp *" err={errors.phone?.message}>
                <input {...register('phone')} placeholder="08xx xxxx xxxx"
                  className={inp(!!errors.phone)} />
              </Field>
            </div>

            <Field label="Email" err={errors.email?.message}>
              <input {...register('email')} type="email" placeholder="nama@email.com (opsional)"
                className={inp(!!errors.email)} />
            </Field>

            <div className="grid grid-cols-2 gap-3.5">
              <Field label="Marketing Agent">
                <select {...register('agentCode')} className={inp(false)}>
                  <option value="">— Pilih Agent —</option>
                  {AGENTS.map(a => <option key={a.id} value={a.code}>{a.name}</option>)}
                  <option value={WALK_IN.code}>{WALK_IN.name}</option>
                </select>
              </Field>
              <Field label="Domisili">
                <input {...register('domicile')} placeholder="Kota / Kabupaten"
                  className={inp(false)} />
              </Field>
            </div>

            {/* Disclaimer */}
            <div className="rounded-xl p-4"
              style={{ background: 'rgba(27,94,53,0.06)', border: '1px solid rgba(27,94,53,0.12)', fontSize: '11.5px', color: '#7A9480', lineHeight: 1.6 }}>
              ⚠️ Form ini adalah <strong style={{ color: '#4A6A55' }}>registrasi minat</strong>, bukan pembelian resmi.
              Tim H City Sawangan akan menghubungi Anda di{' '}
              <strong style={{ color: '#4A6A55' }}>+62 811 1130 114</strong> dalam 1×24 jam.
            </div>

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => goTo('unit')}
                style={{
                  padding: '14px 20px', borderRadius: 12,
                  border: '1.5px solid rgba(27,94,53,0.16)', background: 'transparent',
                  fontSize: '12.5px', fontWeight: 600, color: '#7A9480',
                }}>
                ← Kembali
              </button>
              <button type="submit" disabled={busy}
                className={cn('flex-1 transition-all', !busy && 'hover:scale-[1.01]')}
                style={{
                  padding: '14px', borderRadius: 12,
                  background: busy ? 'rgba(27,94,53,0.2)' : 'linear-gradient(135deg,#1B5E35,#2E7D52)',
                  color: busy ? '#7A9480' : '#F5F0E8',
                  fontSize: '13px', fontWeight: 700,
                  letterSpacing: '2px', textTransform: 'uppercase',
                  cursor: busy ? 'not-allowed' : 'pointer',
                  boxShadow: busy ? 'none' : '0 6px 24px rgba(27,94,53,0.25)',
                }}>
                {busy ? 'Menyimpan…' : '🏠 Konfirmasi Booking →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

/* ── helpers ────────────────────────────────────────────── */

const inp = (err: boolean) => cn(
  'w-full rounded-xl px-4 py-3.5 text-[14px] outline-none transition-all',
  err
    ? 'border-[1.5px] border-red-400 bg-red-50 focus:border-red-500'
    : 'border-[1.5px] border-[rgba(27,94,53,0.15)] bg-white focus:border-[#1B5E35] focus:bg-[#FDFAF4] focus:shadow-[0_0_0_3px_rgba(27,94,53,0.08)]',
)

function Field({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A9E8C' }}>
        {label}
      </label>
      {children}
      {err && <span style={{ fontSize: '10px', color: '#B03030' }}>{err}</span>}
    </div>
  )
}
