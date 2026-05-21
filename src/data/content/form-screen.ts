import type { PaymentMethod } from "@/data/leads";

export const FORM_CONTENT = {
  promoBanner: {
    icon: "🎁",
    boldText: "Promo All-In 5Jt",
    detail: "Free Biaya KPR, BPHTB & AJB! Terbatas.",
  },
  sectionLabel: "Data Diri Pemesan",
  fields: {
    fullName:  { label: "Nama Lengkap *",       placeholder: "Nama sesuai KTP"          },
    phone:     { label: "No. HP / WhatsApp *",  placeholder: "08xx xxxx xxxx"           },
    email:     { label: "Email",                placeholder: "nama@email.com (opsional)" },
    agentCode: { label: "Marketing Agent",      placeholder: "— Pilih Agent —"          },
    domicile:  { label: "Domisili",             placeholder: "Kota / Kabupaten"         },
  },
  disclaimer: {
    icon: "⚠️",
    text: "Form ini adalah registrasi minat, bukan pembelian resmi. Tim H City Sawangan akan menghubungi Anda di +62 811 1130 114 dalam 1×24 jam.",
    highlightPhone: "+62 811 1130 114",
  },
  paymentLabel: "Metode Pembayaran",
  paymentOptions: [
    { value: "KPR Bank"      as PaymentMethod, label: "KPR Bank",       sub: "Free biaya KPR*", icon: "🏦" },
    { value: "Cash Keras"    as PaymentMethod, label: "Cash Keras",     sub: "Diskon spesial",  icon: "💰" },
    { value: "Cash Bertahap" as PaymentMethod, label: "Cash Bertahap",  sub: "12–24 bulan",     icon: "📅" },
  ],
  orderSummary: {
    kavlingLabel:   "Kavling",
    facingLabel:    "Arah Hadap",
    floorsLabel:    "Lantai",
    areaLabel:      "LB / LT",
    basePriceLabel: "Harga Dasar",
    customLabel:    "Kustomisasi",
    totalLabel:     "Total Estimasi",
    taxNote:        "Belum termasuk notaris & pajak",
  },
} as const;
