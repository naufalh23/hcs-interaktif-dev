"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import TopBar from "@/components/kiosk/TopBar";
import { useStore } from "@/store/kiosk-store";
import { cn, formatPrice } from "@/lib/utils";
import { bookingSchema } from "@/lib/validations";
import { AGENTS, WALK_IN } from "@/data/agents";
import type { BookingSchema } from "@/lib/validations";
import type { PaymentMethod } from "@/data/leads";

const PAYMENT_OPTS: {
  value: PaymentMethod;
  label: string;
  sub: string;
  icon: string;
}[] = [
  { value: "KPR Bank", label: "KPR Bank", sub: "Free biaya KPR*", icon: "🏦" },
  {
    value: "Cash Keras",
    label: "Cash Keras",
    sub: "Diskon spesial",
    icon: "💰",
  },
  {
    value: "Cash Bertahap",
    label: "Cash Bertahap",
    sub: "12–24 bulan",
    icon: "📅",
  },
];

export default function FormScreen() {
  const goTo = useStore((s) => s.goTo);
  const type = useStore((s) => s.houseType);
  const unit = useStore((s) => s.unit);
  const custom = useStore((s) => s.custom);
  const extra = useStore((s) => s.extraPrice());
  const total = useStore((s) => s.totalPrice());
  const payment = useStore((s) => s.paymentMethod);
  const setPay = useStore((s) => s.setPayment);
  const setCode = useStore((s) => s.setBookingCode);
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { paymentMethod: payment },
  });

  const onSubmit = async (form: BookingSchema) => {
    if (!type || !unit) return;
    setBusy(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod: payment,
          unitId: unit.id,
          unitCode: unit.code,
          houseTypeId: type.id,
          houseTypeName: type.name,
          clusterName: type.cluster,
          unitFacing: unit.facing,
          basePrice: unit.price,
          totalPrice: total,
          customization: custom,
          kioskId: "KIOSK-01",
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error ?? "Gagal");
      setCode(json.bookingCode);
      goTo("success");
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Terjadi kesalahan, coba lagi.",
      );
    } finally {
      setBusy(false);
    }
  };

  if (!type || !unit) return null;

  return (
    <div className="absolute inset-0 flex flex-col animate-screen-in bg-[#EDE8DE]">
      <TopBar />
      <div className="flex-1 overflow-hidden flex">
        {/* ── Left summary ────────────────────────────── */}
        <div
          className="w-90 shrink-0 flex flex-col p-6 gap-4 overflow-y-auto
                        bg-[#F5F0E8] border-r border-[rgba(27,94,53,0.1)]"
        >
          {/* Order card */}
          <div
            className="rounded-[18px] p-5 bg-[#FDFAF4]
                          border border-[rgba(27,94,53,0.13)]
                          shadow-[0_3px_16px_rgba(27,94,53,0.07)]"
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="text-[38px]">{type.icon}</span>
              <div>
                <div className="text-[9px] tracking-[2px] uppercase font-bold text-[#1B5E35] mb-0.5">
                  {type.cluster}
                </div>
                <div className="font-serif font-semibold text-[20px] text-[#163F25] leading-[1.1]">
                  {type.name}
                </div>
                <div className="text-[11px] text-[#8A9E8C] mt-px">
                  Kavling {unit.code}
                </div>
              </div>
            </div>

            <div className="border-t border-[rgba(27,94,53,0.1)] pt-3 mb-1">
              {[
                ["Kavling", unit.code],
                ["Arah Hadap", unit.facing],
                ["Lantai", `${type.floors} Lantai`],
                ["LB / LT", `${type.buildingArea}m² / ${type.landArea}m²`],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between py-1.5">
                  <span className="text-[11px] text-[#8A9E8C]">{l}</span>
                  <span className="text-[11px] font-bold text-[#1B5E35]">
                    {v}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-[rgba(27,94,53,0.12)] pt-2.5 mt-1">
              <div className="flex justify-between py-1">
                <span className="text-[11px] text-[#8A9E8C]">Harga Dasar</span>
                <span className="text-[11px] font-semibold text-[#4A6A55]">
                  {formatPrice(unit.price)}
                </span>
              </div>
              {extra > 0 && (
                <div className="flex justify-between py-1">
                  <span className="text-[11px] text-[#8A9E8C]">
                    Kustomisasi
                  </span>
                  <span className="text-[11px] font-semibold text-[#8B6A00]">
                    +{formatPrice(extra)}
                  </span>
                </div>
              )}
              <div
                className="flex justify-between items-baseline mt-2 pt-2
                              border-t-[1.5px] border-[rgba(27,94,53,0.1)]"
              >
                <span className="text-[10px] font-bold text-[#163F25] uppercase tracking-[1px]">
                  Total Estimasi
                </span>
                <span className="font-serif font-bold text-[24px] text-[#163F25]">
                  {formatPrice(total)}
                </span>
              </div>
              <div className="text-[9.5px] text-[#9AAD9C] text-right mt-0.5">
                Belum termasuk notaris &amp; pajak
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div>
            <div className="text-[9.5px] tracking-[2.5px] uppercase font-bold text-[#9AAD9C] mb-2">
              Metode Pembayaran
            </div>
            <div className="flex flex-col gap-2">
              {PAYMENT_OPTS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setPay(o.value)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl text-left transition-all border-[1.5px]",
                    payment === o.value
                      ? "bg-[rgba(27,94,53,0.08)] border-[rgba(27,94,53,0.3)]"
                      : "bg-[#FDFAF4] border-[rgba(27,94,53,0.1)]",
                  )}
                >
                  <span className="text-xl">{o.icon}</span>
                  <div className="flex-1">
                    <div className="text-[12.5px] font-bold text-[#163F25]">
                      {o.label}
                    </div>
                    <div className="text-[10px] text-[#8A9E8C]">{o.sub}</div>
                  </div>
                  <div
                    className={cn(
                      "size-4 rounded-full border-2 flex items-center justify-center shrink-0",
                      payment === o.value
                        ? "border-[#1B5E35] bg-[#1B5E35]"
                        : "border-[rgba(27,94,53,0.2)] bg-transparent",
                    )}
                  >
                    {payment === o.value && (
                      <div className="size-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right form ──────────────────────────────── */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Promo banner */}
          <div
            className="flex items-center gap-2.5 rounded-xl px-4 py-3 mb-6
                          bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)]"
          >
            <span className="text-base">🎁</span>
            <div className="text-[12px] font-medium text-[#7A5A00]">
              <strong>Promo All-In 5Jt</strong> — Free Biaya KPR, BPHTB &amp;
              AJB! Terbatas.
            </div>
          </div>

          <div
            className="text-[10px] tracking-[2.5px] uppercase font-bold text-[#9AAD9C]
                          mb-4 pb-3 border-b border-[rgba(27,94,53,0.1)]"
          >
            Data Diri Pemesan
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-3.5 text-black">
              <Field label="Nama Lengkap *" err={errors.fullName?.message}>
                <input
                  {...register("fullName")}
                  placeholder="Nama sesuai KTP"
                  className={inp(!!errors.fullName)}
                />
              </Field>
              <Field label="No. HP / WhatsApp *" err={errors.phone?.message}>
                <input
                  {...register("phone")}
                  placeholder="08xx xxxx xxxx"
                  className={inp(!!errors.phone)}
                />
              </Field>
            </div>

            <Field label="Email" err={errors.email?.message}>
              <div className="text-black">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="nama@email.com (opsional)"
                  className={inp(!!errors.email)}
                />
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-3.5 text-black">
              <Field label="Marketing Agent">
                <select {...register("agentCode")} className={inp(false)}>
                  <option value="">— Pilih Agent —</option>
                  {AGENTS.map((a) => (
                    <option key={a.id} value={a.code}>
                      {a.name}
                    </option>
                  ))}
                  <option value={WALK_IN.code}>{WALK_IN.name}</option>
                </select>
              </Field>
              <Field label="Domisili">
                <input
                  {...register("domicile")}
                  placeholder="Kota / Kabupaten"
                  className={inp(false)}
                />
              </Field>
            </div>

            {/* Disclaimer */}
            <div
              className="rounded-xl p-4 text-[11.5px] text-[#7A9480] leading-relaxed
                            bg-[rgba(27,94,53,0.06)] border border-[rgba(27,94,53,0.12)]"
            >
              ⚠️ Form ini adalah{" "}
              <strong className="text-[#4A6A55]">registrasi minat</strong>,
              bukan pembelian resmi. Tim H City Sawangan akan menghubungi Anda
              di <strong className="text-[#4A6A55]">+62 811 1130 114</strong>{" "}
              dalam 1×24 jam.
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => goTo("unit")}
                className="px-5 py-3.5 rounded-xl border-[1.5px] border-[rgba(27,94,53,0.16)]
                           bg-transparent text-[12.5px] font-semibold text-[#7A9480]
                           transition-all hover:bg-[rgba(27,94,53,0.06)]"
              >
                ← Kembali
              </button>
              <button
                type="submit"
                disabled={busy}
                className={cn(
                  "flex-1 py-3.5 rounded-xl text-[13px] font-bold tracking-[2px] uppercase transition-all",
                  busy
                    ? "bg-[rgba(27,94,53,0.2)] text-[#7A9480] cursor-not-allowed"
                    : "bg-linier-to-br from-[#1B5E35] to-[#2E7D52] text-[#F5F0E8] cursor-pointer shadow-[0_6px_24px_rgba(27,94,53,0.25)] hover:scale-[1.01]",
                )}
              >
                {busy ? "Menyimpan…" : "🏠 Konfirmasi Booking →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── helpers ────────────────────────────────────────────── */

const inp = (err: boolean) =>
  cn(
    "w-full rounded-xl px-4 py-3.5 text-[14px] outline-none transition-all",
    err
      ? "border-[1.5px] border-red-400 bg-red-50 focus:border-red-500"
      : "border-[1.5px] border-[rgba(27,94,53,0.15)] bg-white focus:border-[#1B5E35] focus:bg-[#FDFAF4] focus:shadow-[0_0_0_3px_rgba(27,94,53,0.08)]",
  );

function Field({
  label,
  err,
  children,
}: {
  label: string;
  err?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9.5px] font-bold tracking-[1.5px] uppercase text-[#8A9E8C]">
        {label}
      </label>
      {children}
      {err && <span className="text-[10px] text-[#B03030]">{err}</span>}
    </div>
  );
}
