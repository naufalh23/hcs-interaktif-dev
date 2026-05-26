"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import TopBar from "@/components/kiosk/TopBar";
import UnitPreviewCard from "@/components/kiosk/UnitPreviewCard";
import Lightbox from "@/components/kiosk/Lightbox";
import { useStore } from "@/store/kiosk-store";
import { cn, formatPrice } from "@/lib/utils";
import { bookingSchema } from "@/lib/validations";
import { AGENTS, WALK_IN } from "@/data/agents";
import type { BookingSchema } from "@/lib/validations";
import { FORM_CONTENT } from "@/data/content/form-screen";
import { ADDON_OPTIONS } from "@/data/customization";

export default function FormScreen() {
  const goTo    = useStore((s) => s.goTo);
  const type    = useStore((s) => s.houseType);
  const unit    = useStore((s) => s.unit);
  const extra   = useStore((s) => s.extraPrice());
  const total   = useStore((s) => s.totalPrice());
  const setPay  = useStore((s) => s.setPayment);
  const setCode = useStore((s) => s.setBookingCode);
  const custom  = useStore((s) => s.custom);
  const [busy, setBusy]         = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { paymentMethod: "KPR Bank" },
  });

  const onSubmit = async (form: BookingSchema) => {
    if (!type || !unit) return;
    setBusy(true);
    setPay(form.paymentMethod);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          unitId:        unit.id,
          unitCode:      unit.code,
          houseTypeId:   type.id,
          houseTypeName: `Tipe ${type.types[0].buildingArea}/${type.types[0].landArea}`,
          clusterName:   type.cluster,
          basePrice:     unit.price,
          totalPrice:    total,
          customization: custom,
          kioskId:       "KIOSK-01",
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error ?? "Gagal");
      setCode(json.bookingCode);
      goTo("success");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Terjadi kesalahan, coba lagi.");
    } finally {
      setBusy(false);
    }
  };

  if (!type || !unit) return null;

  return (
    <div className="absolute inset-0 flex flex-col animate-screen-in bg-[#EDE8DE]">
      <TopBar />
      <div className="flex-1 overflow-hidden flex">

        {/* ── Sidebar ───────────────────────────────────── */}
        <div className="w-120 shrink-0 flex flex-col bg-[#F5F0E8] border-r border-[rgba(27,94,53,0.1)]">

          {/* Scrollable: unit preview */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-5 pt-5 pb-4">
              <UnitPreviewCard unit={unit} onOpenLightbox={setLightbox} />
            </div>
          </div>

          {/* Price card */}
          <div className="px-6 pt-4 border-t border-[rgba(27,94,53,0.08)]">
            <div className="rounded-2xl p-4 border border-[rgba(27,94,53,0.1)] bg-[#FDFAF4]">
              <div className="text-[9px] tracking-[2.5px] uppercase font-bold text-[#9AAD9C] mb-2">
                {FORM_CONTENT.orderSummary.totalLabel}
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-[11px] text-[#7A9480]">{FORM_CONTENT.orderSummary.basePriceLabel}</span>
                <span className="text-[11px] font-semibold text-[#4A6A55]">{formatPrice(unit.price)}</span>
              </div>
              {ADDON_OPTIONS.filter((o) => custom.addons[o.id]).map((o) => (
                <div key={o.id} className="flex justify-between items-start mb-1 gap-2">
                  <span className="text-[10px] text-[#7A9480] leading-tight flex-1">{o.name}</span>
                  {o.contact ? (
                    <span className="text-[10px] font-medium text-[#7A5A00] shrink-0">Hubungi Sales</span>
                  ) : o.price > 0 ? (
                    <span className="text-[10px] font-semibold text-[#8B6A00] shrink-0">+{formatPrice(o.price)}</span>
                  ) : (
                    <span className="text-[10px] font-medium text-[#5A8C6A] shrink-0">Gratis</span>
                  )}
                </div>
              ))}
              <div className="border-t border-dashed border-[rgba(27,94,53,0.14)] mt-2 pt-2 flex justify-between items-baseline">
                <span className="text-[10.5px] font-bold text-[#163F25] uppercase tracking-[1px]">Total</span>
                <span className="font-serif font-bold text-[20px] text-[#163F25]">{formatPrice(total)}</span>
              </div>
              <div className="text-[8.5px] text-[#9AAD9C] text-right mt-0.5">{FORM_CONTENT.orderSummary.taxNote}</div>
            </div>
          </div>

          {/* Back button */}
          <div className="px-6 py-4">
            <button
              type="button"
              onClick={() => goTo("addon")}
              className="w-full py-3 rounded-xl border-[1.5px] border-[rgba(27,94,53,0.18)] bg-transparent
                         text-xs font-semibold text-[#7A9480] transition-all hover:bg-[rgba(27,94,53,0.06)]"
            >
              ← Kembali ke Addon
            </button>
          </div>
        </div>

        {/* ── Form area ─────────────────────────────────── */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto px-8 pt-7 pb-4">

            <div className="mb-5">
              <div className="text-[9.5px] tracking-[3px] uppercase font-bold text-[#9AAD9C] mb-1">
                {FORM_CONTENT.stepLabel}
              </div>
              <h1 className="font-serif font-light text-[32px] text-[#163F25] leading-tight mb-0.5">
                {FORM_CONTENT.heading}
              </h1>
              <p className="text-[11px] text-[#7A9480]">{FORM_CONTENT.subtitle}</p>
            </div>

            <div className="text-[9.5px] tracking-[2.5px] uppercase font-bold text-[#9AAD9C]
                            mb-4 pb-3 border-b border-[rgba(27,94,53,0.1)]">
              {FORM_CONTENT.sectionLabel}
            </div>

            <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3.5">
                <Field label={FORM_CONTENT.fields.fullName.label} err={errors.fullName?.message}>
                  <input {...register("fullName")} placeholder={FORM_CONTENT.fields.fullName.placeholder} className={inp(!!errors.fullName)} />
                </Field>
                <Field label={FORM_CONTENT.fields.phone.label} err={errors.phone?.message}>
                  <input {...register("phone")} placeholder={FORM_CONTENT.fields.phone.placeholder} className={inp(!!errors.phone)} />
                </Field>
              </div>

              <Field label={FORM_CONTENT.fields.email.label} err={errors.email?.message}>
                <input {...register("email")} type="email" placeholder={FORM_CONTENT.fields.email.placeholder} className={inp(!!errors.email)} />
              </Field>

              <div className="grid grid-cols-2 gap-3.5">
                <Field label={FORM_CONTENT.fields.paymentMethod.label} err={errors.paymentMethod?.message}>
                  <select {...register("paymentMethod")} className={inp(!!errors.paymentMethod)}>
                    <option value="">{FORM_CONTENT.fields.paymentMethod.placeholder}</option>
                    {FORM_CONTENT.paymentOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label={FORM_CONTENT.fields.domicile.label}>
                  <input {...register("domicile")} placeholder={FORM_CONTENT.fields.domicile.placeholder} className={inp(false)} />
                </Field>
              </div>

              <Field label={FORM_CONTENT.fields.agentCode.label}>
                <select {...register("agentCode")} className={inp(false)}>
                  <option value="">{FORM_CONTENT.fields.agentCode.placeholder}</option>
                  {AGENTS.map((a) => (
                    <option key={a.id} value={a.code}>{a.name}</option>
                  ))}
                  <option value={WALK_IN.code}>{WALK_IN.name}</option>
                </select>
              </Field>

              <div className="rounded-xl px-4 py-3 text-[11px] text-[#7A9480] leading-relaxed
                              bg-[rgba(27,94,53,0.05)] border border-[rgba(27,94,53,0.1)]">
                {FORM_CONTENT.disclaimer.icon} {FORM_CONTENT.disclaimer.text}
              </div>
            </form>
          </div>

          {/* Submit button */}
          <div className="px-8 py-4 border-t border-[rgba(27,94,53,0.08)] bg-[#EDE8DE]">
            <button
              type="submit"
              form="booking-form"
              disabled={busy}
              className={cn(
                "w-full py-3.5 rounded-xl text-[13px] font-bold tracking-[2px] uppercase transition-all",
                busy
                  ? "bg-[rgba(27,94,53,0.2)] text-[#7A9480] cursor-not-allowed"
                  : "bg-linear-to-br from-[#1B5E35] to-[#2E7D52] text-[#F5F0E8] shadow-[0_6px_24px_rgba(27,94,53,0.25)] hover:scale-[1.005] cursor-pointer",
              )}
            >
              {busy ? "Menyimpan…" : "🏠 Konfirmasi Booking →"}
            </button>
          </div>
        </div>

      </div>

      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

/* ── Form helpers ─────────────────────────────────────────── */

const inp = (err: boolean) =>
  cn(
    "w-full rounded-xl px-4 py-3.5 text-[14px] text-black outline-none transition-all",
    err
      ? "border-[1.5px] border-red-400 bg-red-50 focus:border-red-500"
      : "border-[1.5px] border-[rgba(27,94,53,0.15)] bg-white focus:border-[#1B5E35] focus:bg-[#FDFAF4] focus:shadow-[0_0_0_3px_rgba(27,94,53,0.08)]",
  );

function Field({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9.5px] font-bold tracking-[1.5px] uppercase text-[#8A9E8C]">{label}</label>
      {children}
      {err && <span className="text-[10px] text-[#B03030]">{err}</span>}
    </div>
  );
}
