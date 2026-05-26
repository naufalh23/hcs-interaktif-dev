import type { PaymentMethod } from "@/data/leads";

export const FORM_CONTENT = {
  stepLabel: "Langkah 4 dari 4",
  heading:   "Data Pemesanan",
  subtitle:     "Isi data diri untuk konfirmasi booking",
  sectionLabel: "Data Diri Pemesan",

  fields: {
    fullName:      { label: "Nama Lengkap *",      placeholder: "Nama sesuai KTP"          },
    phone:         { label: "No. HP / WhatsApp *", placeholder: "08xx xxxx xxxx"           },
    email:         { label: "Email",               placeholder: "nama@email.com (opsional)" },
    agentCode:     { label: "Marketing Agent",     placeholder: "— Pilih Agent —"          },
    domicile:      { label: "Domisili",            placeholder: "Kota / Kabupaten"         },
    paymentMethod: { label: "Metode Pembayaran *", placeholder: "— Pilih Metode —"         },
  },

  paymentOptions: [
    { value: "KPR Bank"      as PaymentMethod, label: "KPR Bank — Free biaya KPR*"  },
    { value: "Cash Keras"    as PaymentMethod, label: "Cash Keras — Diskon spesial" },
    { value: "Cash Bertahap" as PaymentMethod, label: "Cash Bertahap — 12–24 bulan" },
  ],

  orderSummary: {
    totalLabel:     "Estimasi Harga",
    basePriceLabel: "Harga Unit",
    customLabel:    "Addon / Kustomisasi",
    taxNote:        "* Harga belum termasuk pajak & biaya notaris",
  },

  disclaimer: {
    icon:           "⚠️",
    text:           "Form ini adalah registrasi minat, bukan pembelian resmi. Tim H City Sawangan akan menghubungi Anda di +62 811 1130 114 dalam 1×24 jam.",
    highlightPhone: "+62 811 1130 114",
  },
} as const;
