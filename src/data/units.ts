// ============================================================
//  DATA STATIS — Unit/Kavling per Cluster
//  TODO: Nanti replace dengan fetch ke CMS/ERP
//  Key = id dari HOUSE_TYPES
// ============================================================

export type UnitStatus = 'available' | 'indent' | 'sold'

export interface Unit {
  id:        string
  code:      string        // "D-01"
  block:     string        // nama blok
  facing:    string        // arah hadap
  status:    UnitStatus
  price:     number        // harga kavling (bisa beda per posisi)
  floors:    number        // jumlah lantai
  bedrooms:  number        // jumlah kamar tidur
  bathrooms: number        // jumlah kamar mandi
  notes?:    string        // catatan opsional, misal "Hook", "Corner"
}

export const UNITS: Record<string, Unit[]> = {
  t60: [
    { id: 'D01', code: 'D-01', block: 'Damar A', facing: 'Timur',   status: 'available', price: 800_000_000,   floors: 1, bedrooms: 3, bathrooms: 2 },
    { id: 'D02', code: 'D-02', block: 'Damar A', facing: 'Utara',   status: 'available', price: 810_000_000,   floors: 1, bedrooms: 3, bathrooms: 2 },
    { id: 'D03', code: 'D-03', block: 'Damar A', facing: 'Selatan', status: 'sold',      price: 800_000_000,   floors: 1, bedrooms: 3, bathrooms: 2 },
    { id: 'D04', code: 'D-04', block: 'Damar A', facing: 'Barat',   status: 'available', price: 815_000_000,   floors: 1, bedrooms: 3, bathrooms: 2 },
    { id: 'D05', code: 'D-05', block: 'Damar A', facing: 'Timur',   status: 'indent',    price: 820_000_000,   floors: 1, bedrooms: 3, bathrooms: 2 },
    { id: 'D06', code: 'D-06', block: 'Damar A', facing: 'Utara',   status: 'available', price: 800_000_000,   floors: 1, bedrooms: 3, bathrooms: 2 },
    { id: 'D07', code: 'D-07', block: 'Damar B', facing: 'Timur',   status: 'available', price: 805_000_000,   floors: 1, bedrooms: 3, bathrooms: 2 },
    { id: 'D08', code: 'D-08', block: 'Damar B', facing: 'Selatan', status: 'sold',      price: 810_000_000,   floors: 1, bedrooms: 3, bathrooms: 2 },
    { id: 'D09', code: 'D-09', block: 'Damar B', facing: 'Barat',   status: 'available', price: 800_000_000,   floors: 1, bedrooms: 3, bathrooms: 2, notes: 'Hook' },
    { id: 'D10', code: 'D-10', block: 'Damar B', facing: 'Utara',   status: 'available', price: 820_000_000,   floors: 1, bedrooms: 3, bathrooms: 2 },
  ],

  t70: [
    { id: 'K01', code: 'K-01', block: 'Kenanga', facing: 'Timur',   status: 'available', price: 900_000_000,   floors: 1, bedrooms: 2, bathrooms: 1 },
    { id: 'K02', code: 'K-02', block: 'Kenanga', facing: 'Utara',   status: 'available', price: 920_000_000,   floors: 1, bedrooms: 2, bathrooms: 1 },
    { id: 'K03', code: 'K-03', block: 'Kenanga', facing: 'Selatan', status: 'sold',      price: 1_010_000_000, floors: 1, bedrooms: 3, bathrooms: 2 },
    { id: 'K04', code: 'K-04', block: 'Kenanga', facing: 'Barat',   status: 'indent',    price: 1_000_000_000, floors: 1, bedrooms: 3, bathrooms: 2 },
    { id: 'K05', code: 'K-05', block: 'Kenanga', facing: 'Timur',   status: 'available', price: 1_050_000_000, floors: 1, bedrooms: 3, bathrooms: 2, notes: 'Hook dekat taman' },
    { id: 'K06', code: 'K-06', block: 'Kenanga', facing: 'Utara',   status: 'available', price: 1_000_000_000, floors: 1, bedrooms: 3, bathrooms: 2 },
  ],

  t84: [
    { id: 'M01', code: 'M-01', block: 'Melati',  facing: 'Timur',   status: 'indent',    price: 1_400_000_000, floors: 2, bedrooms: 4, bathrooms: 3 },
    { id: 'M02', code: 'M-02', block: 'Melati',  facing: 'Utara',   status: 'available', price: 1_420_000_000, floors: 2, bedrooms: 4, bathrooms: 3 },
    { id: 'M03', code: 'M-03', block: 'Melati',  facing: 'Selatan', status: 'available', price: 1_410_000_000, floors: 2, bedrooms: 4, bathrooms: 3 },
    { id: 'M04', code: 'M-04', block: 'Melati',  facing: 'Barat',   status: 'available', price: 1_400_000_000, floors: 2, bedrooms: 4, bathrooms: 3, notes: 'Hook' },
  ],

  t100: [
    { id: 'A01', code: 'A-01', block: 'Anggrek', facing: 'Timur',   status: 'available', price: 1_600_000_000, floors: 2, bedrooms: 4, bathrooms: 3 },
    { id: 'A02', code: 'A-02', block: 'Anggrek', facing: 'Utara',   status: 'available', price: 1_650_000_000, floors: 2, bedrooms: 4, bathrooms: 3 },
    { id: 'A03', code: 'A-03', block: 'Anggrek', facing: 'Selatan', status: 'indent',    price: 1_620_000_000, floors: 2, bedrooms: 5, bathrooms: 3 },
    { id: 'A04', code: 'A-04', block: 'Anggrek', facing: 'Barat',   status: 'available', price: 1_600_000_000, floors: 2, bedrooms: 5, bathrooms: 3 },
  ],

  t120: [
    { id: 'B01', code: 'B-01', block: 'Bougen',  facing: 'Timur',   status: 'available', price: 2_000_000_000, floors: 2, bedrooms: 5, bathrooms: 4 },
    { id: 'B02', code: 'B-02', block: 'Bougen',  facing: 'Utara',   status: 'indent',    price: 2_050_000_000, floors: 2, bedrooms: 5, bathrooms: 4 },
    { id: 'B03', code: 'B-03', block: 'Bougen',  facing: 'Barat',   status: 'available', price: 2_000_000_000, floors: 2, bedrooms: 5, bathrooms: 4, notes: 'Hook' },
  ],

  t150: [
    { id: 'DH01', code: 'DH-01', block: 'Dahlia', facing: 'Timur',  status: 'available', price: 2_800_000_000, floors: 2, bedrooms: 5, bathrooms: 5 },
    { id: 'DH02', code: 'DH-02', block: 'Dahlia', facing: 'Utara',  status: 'indent',    price: 2_900_000_000, floors: 2, bedrooms: 6, bathrooms: 5 },
  ],
}
