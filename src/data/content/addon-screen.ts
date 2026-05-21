export const ADDON_CONTENT = {
  previewLabel: "Preview Rumah",
  priceBreakdown: {
    title: "Estimasi Harga",
    basePriceLabel: "Harga Dasar",
    customLabel: "Kustomisasi",
    totalLabel: "Total",
  },
  sections: [
    { key: "roofStyle",    icon: "🏗",  title: "Model Atap",          sub: "Desain atap mempengaruhi kesan rumah" },
    { key: "colorIndex",   icon: "🎨",  title: "Warna Eksterior",     sub: "Pilih warna cat dinding luar"         },
    { key: "doorStyle",    icon: "🚪",  title: "Model Pintu",         sub: "Kesan pertama hunian Anda"            },
    { key: "windowStyle",  icon: "🪟",  title: "Tipe Jendela",        sub: "Pencahayaan & sirkulasi udara"        },
    { key: "addons",       icon: "⚡",  title: "Fasilitas Tambahan",  sub: "Upgrade hunian Anda (bisa multi-pilih)" },
  ],
} as const;
