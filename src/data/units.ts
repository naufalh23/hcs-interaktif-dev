// ============================================================
//  DATA STATIS — Unit/Kavling per Cluster
//  TODO: Nanti replace dengan fetch ke CMS/ERP
//  Key = id dari HOUSE_TYPES (number)
// ============================================================

export type UnitStatus = 'available' | 'indent' | 'sold'

export interface Unit {
  id:        number
  code:      string     // "AK-01"
  type:      string     // tipe unit, misal "45/81" — untuk filter sidebar
  status:    UnitStatus
  price:     number
  floors:    number
  bedrooms:  number
  bathrooms: number
  notes?:    string
  images:    string[]   // foto unit — ganti dengan path asli saat tersedia
}

export const UNITS: Record<number, Unit[]> = {
  // ── 1: Cluster Akasia ──────────────────────────────────
  1: [
    { id:  1, code: 'AK-01', type: '45/81',  status: 'available', price: 900_000_000,   floors: 1, bedrooms: 2, bathrooms: 1, images: ['/Akasia.png', '/Borneo.png'] },
    { id:  2, code: 'AK-02', type: '45/81',  status: 'available', price: 920_000_000,   floors: 1, bedrooms: 2, bathrooms: 1, images: ['/Akasia.png', '/Borneo.png'] },
    { id:  3, code: 'AK-03', type: '72/120', status: 'sold',      price: 1_010_000_000, floors: 1, bedrooms: 3, bathrooms: 2, images: ['/Akasia.png', '/Borneo.png'] },
    { id:  4, code: 'AK-04', type: '51/105', status: 'indent',    price: 1_000_000_000, floors: 1, bedrooms: 3, bathrooms: 2, images: ['/Akasia.png', '/Borneo.png'] },
    { id:  5, code: 'AK-05', type: '72/120', status: 'available', price: 1_050_000_000, floors: 1, bedrooms: 3, bathrooms: 2, images: ['/Akasia.png', '/Borneo.png'], notes: 'Hook dekat taman' },
    { id:  6, code: 'AK-06', type: '51/105', status: 'available', price: 1_000_000_000, floors: 1, bedrooms: 3, bathrooms: 2, images: ['/Akasia.png', '/Borneo.png'] },
  ],

  // ── 2: Cluster Borneo ──────────────────────────────────
  2: [
    { id:  7, code: 'BR-01', type: '51/105', status: 'indent',    price: 1_100_000_000, floors: 2, bedrooms: 3, bathrooms: 2, images: ['/Borneo.png', '/Cemara.png'] },
    { id:  8, code: 'BR-02', type: '51/105', status: 'available', price: 1_120_000_000, floors: 2, bedrooms: 3, bathrooms: 2, images: ['/Borneo.png', '/Cemara.png'] },
    { id:  9, code: 'BR-03', type: '72/120', status: 'available', price: 1_110_000_000, floors: 2, bedrooms: 4, bathrooms: 3, images: ['/Borneo.png', '/Cemara.png'] },
    { id: 10, code: 'BR-04', type: '72/120', status: 'available', price: 1_100_000_000, floors: 2, bedrooms: 4, bathrooms: 3, images: ['/Borneo.png', '/Cemara.png'], notes: 'Hook' },
  ],

  // ── 3: Cluster Cemara ──────────────────────────────────
  3: [
    { id: 11, code: 'CM-01', type: '38/60', status: 'available', price: 800_000_000, floors: 1, bedrooms: 2, bathrooms: 1, images: ['/Cemara.png', '/Damar.png'] },
    { id: 12, code: 'CM-02', type: '45/81', status: 'available', price: 820_000_000, floors: 1, bedrooms: 2, bathrooms: 1, images: ['/Cemara.png', '/Damar.png'] },
    { id: 13, code: 'CM-03', type: '60/60', status: 'indent',    price: 840_000_000, floors: 1, bedrooms: 2, bathrooms: 1, images: ['/Cemara.png', '/Damar.png'] },
    { id: 14, code: 'CM-04', type: '38/60', status: 'available', price: 800_000_000, floors: 1, bedrooms: 2, bathrooms: 1, images: ['/Cemara.png', '/Damar.png'] },
    { id: 15, code: 'CM-05', type: '45/81', status: 'available', price: 810_000_000, floors: 1, bedrooms: 2, bathrooms: 1, images: ['/Cemara.png', '/Damar.png'] },
  ],

  // ── 4: Cluster Damar ───────────────────────────────────
  4: [
    { id: 16, code: 'DM-01', type: '72/120',  status: 'available', price: 1_400_000_000, floors: 2, bedrooms: 4, bathrooms: 3, images: ['/Damar.png', '/Eucalyptus.png'] },
    { id: 17, code: 'DM-02', type: '90/90',   status: 'available', price: 1_420_000_000, floors: 2, bedrooms: 4, bathrooms: 3, images: ['/Damar.png', '/Eucalyptus.png'] },
    { id: 18, code: 'DM-03', type: '72/120',  status: 'sold',      price: 1_400_000_000, floors: 2, bedrooms: 4, bathrooms: 3, images: ['/Damar.png', '/Eucalyptus.png'] },
    { id: 19, code: 'DM-04', type: '90/90',   status: 'available', price: 1_430_000_000, floors: 2, bedrooms: 4, bathrooms: 3, images: ['/Damar.png', '/Eucalyptus.png'], notes: 'Hook' },
    { id: 20, code: 'DM-05', type: '100/120', status: 'indent',    price: 1_450_000_000, floors: 2, bedrooms: 5, bathrooms: 4, images: ['/Damar.png', '/Eucalyptus.png'] },
    { id: 21, code: 'DM-06', type: '100/120', status: 'available', price: 1_400_000_000, floors: 2, bedrooms: 5, bathrooms: 4, images: ['/Damar.png', '/Eucalyptus.png'] },
    { id: 22, code: 'DM-07', type: '100/120', status: 'available', price: 1_410_000_000, floors: 2, bedrooms: 5, bathrooms: 4, images: ['/Damar.png', '/Eucalyptus.png'], notes: 'Corner' },
  ],

  // ── 5: Cluster Eucalyptus ──────────────────────────────
  5: [
    { id: 23, code: 'EU-01', type: '45/81',  status: 'available', price: 950_000_000,   floors: 1, bedrooms: 2, bathrooms: 1, images: ['/Eucalyptus.png', '/Gaharu.png'] },
    { id: 24, code: 'EU-02', type: '51/105', status: 'indent',    price: 980_000_000,   floors: 1, bedrooms: 3, bathrooms: 2, images: ['/Eucalyptus.png', '/Gaharu.png'] },
    { id: 25, code: 'EU-03', type: '72/120', status: 'available', price: 1_050_000_000, floors: 1, bedrooms: 3, bathrooms: 2, images: ['/Eucalyptus.png', '/Gaharu.png'] },
    { id: 26, code: 'EU-04', type: '51/105', status: 'available', price: 950_000_000,   floors: 1, bedrooms: 3, bathrooms: 2, images: ['/Eucalyptus.png', '/Gaharu.png'] },
  ],

  // ── 6: Cluster Gaharu ──────────────────────────────────
  6: [
    { id: 27, code: 'GH-01', type: '100/120', status: 'available', price: 1_600_000_000, floors: 2, bedrooms: 4, bathrooms: 3, images: ['/Gaharu.png', '/Akasia.png'] },
    { id: 28, code: 'GH-02', type: '100/120', status: 'indent',    price: 1_650_000_000, floors: 2, bedrooms: 4, bathrooms: 3, images: ['/Gaharu.png', '/Akasia.png'] },
    { id: 29, code: 'GH-03', type: '72/120',  status: 'available', price: 1_600_000_000, floors: 2, bedrooms: 4, bathrooms: 3, images: ['/Gaharu.png', '/Akasia.png'], notes: 'Hook' },
  ],
}
