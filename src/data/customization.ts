// ============================================================
//  DATA STATIS — Opsi Kustomisasi
//  TODO: Nanti bisa di-manage lewat CMS
// ============================================================

export interface CustomOption {
  id:    string
  icon:  string
  name:  string
  desc:  string
  price: number        // 0 = standar (gratis)
  svgId: string | null // id elemen SVG yang diupdate saat dipilih
}

export const ROOF_OPTIONS: CustomOption[] = [
  { id: 'minimalis', icon: '▲',  name: 'Minimalis Modern', desc: 'Sudut 25°, clean & modern',  price: 0,          svgId: 'roof' },
  { id: 'joglo',     icon: '⛺', name: 'Joglo Jawa',       desc: 'Sentuhan budaya Jawa',        price: 18_000_000, svgId: 'roof' },
  { id: 'mediteran', icon: '🏛', name: 'Mediteran',        desc: 'Gaya Eropa klasik',           price: 25_000_000, svgId: 'roof' },
  { id: 'tropis',    icon: '🌿', name: 'Tropis',           desc: 'Atap lebar & sejuk',          price: 15_000_000, svgId: 'roof' },
]

export const DOOR_OPTIONS: CustomOption[] = [
  { id: 'kayu',   icon: '🪵', name: 'Kayu Jati',      desc: 'Klasik & tahan lama',    price: 0,          svgId: null },
  { id: 'modern', icon: '⬛', name: 'Pivot Modern',   desc: 'Aluminium hitam doff',   price: 9_000_000,  svgId: null },
  { id: 'double', icon: '🚪', name: 'Double Door',    desc: 'Kesan mewah & luas',     price: 18_000_000, svgId: null },
  { id: 'kaca',   icon: '🔲', name: 'Kaca Tempered',  desc: 'Modern & terang',        price: 14_000_000, svgId: null },
]

export const WINDOW_OPTIONS: CustomOption[] = [
  { id: 'casement',  icon: '⬜', name: 'Casement',   desc: 'Buka ke luar, ventilasi', price: 0,          svgId: null },
  { id: 'sliding',   icon: '↔', name: 'Sliding',     desc: 'Hemat ruang',             price: 6_000_000,  svgId: null },
  { id: 'baywindow', icon: '⊟', name: 'Bay Window',  desc: 'View ekstra luas',        price: 20_000_000, svgId: null },
  { id: 'louvre',    icon: '🔳', name: 'Louvre',     desc: 'Jalusi aluminium',        price: 9_000_000,  svgId: null },
]

export const ADDON_OPTIONS: (CustomOption & { svgGroup: string | null })[] = [
  { id: 'garasi',    icon: '🚗', name: 'Garasi Tambahan',          desc: 'Carport 2 mobil',           price: 40_000_000, svgId: null, svgGroup: 'garage'  },
  { id: 'solar',     icon: '☀️', name: 'Panel Surya 2000W',        desc: 'Hemat listrik hingga 60%',  price: 30_000_000, svgId: null, svgGroup: 'solar'   },
  { id: 'pagar',     icon: '🔒', name: 'Pagar Besi Tempa',         desc: 'Desain custom per cluster', price: 20_000_000, svgId: null, svgGroup: 'fence'   },
  { id: 'ac',        icon: '❄️', name: 'Pre-installed AC (3 unit)',desc: 'AC 1PK per kamar',          price: 25_000_000, svgId: null, svgGroup: 'ac'      },
  { id: 'smarthome', icon: '📱', name: 'Smart Home System',        desc: 'Kontrol via smartphone',    price: 28_000_000, svgId: null, svgGroup: null      },
  { id: 'kolam',     icon: '🏊', name: 'Kolam Renang Mini',        desc: 'Ukuran 3×6 meter',          price: 55_000_000, svgId: null, svgGroup: null      },
]

// Warna atap per pilihan (untuk SVG preview)
export const ROOF_COLORS: Record<string, string> = {
  minimalis: '#3D5C4A',
  joglo:     '#5C7A3D',
  mediteran: '#8B7A5A',
  tropis:    '#2D7A5A',
}

// Nilai default saat mulai
export const DEFAULT_CUSTOM: CustomizationState = {
  roofStyle:   'minimalis',
  colorIndex:  0,
  doorStyle:   'kayu',
  windowStyle: 'casement',
  addons:      {},
}

export interface CustomizationState {
  roofStyle:   string
  colorIndex:  number
  doorStyle:   string
  windowStyle: string
  addons:      Record<string, boolean>
}

// Hitung total tambahan harga kustomisasi
export function calcExtraPrice(state: CustomizationState): number {
  const roof   = ROOF_OPTIONS  .find(o => o.id === state.roofStyle  )?.price ?? 0
  const door   = DOOR_OPTIONS  .find(o => o.id === state.doorStyle  )?.price ?? 0
  const window = WINDOW_OPTIONS.find(o => o.id === state.windowStyle)?.price ?? 0
  const addons = ADDON_OPTIONS .filter(o => state.addons[o.id]).reduce((s, o) => s + o.price, 0)
  return roof + door + window + addons
}
