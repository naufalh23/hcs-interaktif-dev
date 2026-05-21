// ============================================================
//  DATA STATIS — Opsi Addon Hunian H City Sawangan
//  TODO: Nanti bisa di-manage lewat CMS
// ============================================================

export interface AddonOption {
  id:       string
  name:     string
  desc:     string
  price:    number        // 0 = gratis
  contact?: boolean       // true = tampilkan "Hubungi Sales"
}

export const ADDON_OPTIONS: AddonOption[] = [
  {
    id:    'pre_ac',
    name:  'Pre-Installation AC',
    desc:  'Instalasi Sudah Disiapkan Rapi, Unit AC Tinggal Dipasang Tanpa Repot.',
    price: 0,
  },
  {
    id:    'cat',
    name:  'Cat Interior (Warna Custom)',
    desc:  'Warna Bisa Disesuaikan Dengan Selera, Tetap Menggunakan Cat Berkualitas Standar HCS.',
    price: 0,
  },
  {
    id:    'smartlock',
    name:  'Smart Door Lock',
    desc:  'Akses Lebih Aman Dan Praktis Dengan Sistem Kunci Digital Modern.',
    price: 0,
  },
  {
    id:    'ac1pk',
    name:  'AC 1 PK + Instalasi',
    desc:  'Nikmati Kenyamanan Maksimal Dengan AC Lengkap Beserta Pemasangan.',
    price: 6_000_000,
  },
  {
    id:    'ac05pk',
    name:  'AC 1/2 PK + Instalasi',
    desc:  'Solusi Hemat Dan Praktis Dengan AC Lengkap Siap Pakai.',
    price: 5_000_000,
  },
  {
    id:      'solar',
    name:    'Panel Surya',
    desc:    'Hemat Energi Dengan Solusi Panel Surya Sesuai Kebutuhan Anda.',
    price:   0,
    contact: true,
  },
]

export interface CustomizationState {
  addons: Record<string, boolean>
}

export const DEFAULT_CUSTOM: CustomizationState = {
  addons: {},
}

export function calcExtraPrice(state: CustomizationState): number {
  return ADDON_OPTIONS
    .filter(o => !o.contact && state.addons[o.id])
    .reduce((sum, o) => sum + o.price, 0)
}
