// ============================================================
//  DATA STATIS — Unit/Kavling per Tipe Hunian
//  TODO: Nanti replace dengan fetch ke CMS/ERP
//  Key = id dari HOUSE_TYPES
// ============================================================

export type UnitStatus = 'available' | 'indent' | 'sold'

export interface Unit {
  id:     string
  code:   string        // "D-01"
  block:  string        // nama blok / cluster
  facing: string        // arah hadap
  status: UnitStatus
  price:  number        // harga kavling ini (bisa berbeda per posisi)
  notes?: string        // catatan opsional, misal "Hook", "Hook dekat taman"
}

export const UNITS: Record<string, Unit[]> = {
  t60: [
    { id: 'D01', code: 'D-01', block: 'Damar A', facing: 'Timur',   status: 'available', price: 800_000_000 },
    { id: 'D02', code: 'D-02', block: 'Damar A', facing: 'Utara',   status: 'available', price: 810_000_000 },
    { id: 'D03', code: 'D-03', block: 'Damar A', facing: 'Selatan', status: 'sold',      price: 800_000_000 },
    { id: 'D04', code: 'D-04', block: 'Damar A', facing: 'Barat',   status: 'available', price: 815_000_000 },
    { id: 'D05', code: 'D-05', block: 'Damar A', facing: 'Timur',   status: 'indent',    price: 820_000_000 },
    { id: 'D06', code: 'D-06', block: 'Damar A', facing: 'Utara',   status: 'available', price: 800_000_000 },
    { id: 'D07', code: 'D-07', block: 'Damar B', facing: 'Timur',   status: 'available', price: 805_000_000 },
    { id: 'D08', code: 'D-08', block: 'Damar B', facing: 'Selatan', status: 'sold',      price: 810_000_000 },
    { id: 'D09', code: 'D-09', block: 'Damar B', facing: 'Barat',   status: 'available', price: 800_000_000, notes: 'Hook' },
    { id: 'D10', code: 'D-10', block: 'Damar B', facing: 'Utara',   status: 'available', price: 820_000_000 },
  ],

  t70: [
    { id: 'K01', code: 'K-01', block: 'Kenanga',  facing: 'Timur',   status: 'available', price: 1_000_000_000 },
    { id: 'K02', code: 'K-02', block: 'Kenanga',  facing: 'Utara',   status: 'available', price: 1_020_000_000 },
    { id: 'K03', code: 'K-03', block: 'Kenanga',  facing: 'Selatan', status: 'sold',      price: 1_010_000_000 },
    { id: 'K04', code: 'K-04', block: 'Kenanga',  facing: 'Barat',   status: 'indent',    price: 1_000_000_000 },
    { id: 'K05', code: 'K-05', block: 'Kenanga',  facing: 'Timur',   status: 'available', price: 1_050_000_000, notes: 'Hook dekat taman' },
    { id: 'K06', code: 'K-06', block: 'Kenanga',  facing: 'Utara',   status: 'available', price: 1_000_000_000 },
  ],

  t84: [
    { id: 'M01', code: 'M-01', block: 'Melati',   facing: 'Timur',   status: 'indent',    price: 1_400_000_000 },
    { id: 'M02', code: 'M-02', block: 'Melati',   facing: 'Utara',   status: 'available', price: 1_420_000_000 },
    { id: 'M03', code: 'M-03', block: 'Melati',   facing: 'Selatan', status: 'available', price: 1_410_000_000 },
    { id: 'M04', code: 'M-04', block: 'Melati',   facing: 'Barat',   status: 'available', price: 1_400_000_000, notes: 'Hook' },
  ],

  t100: [
    { id: 'A01', code: 'A-01', block: 'Anggrek',  facing: 'Timur',   status: 'available', price: 1_600_000_000 },
    { id: 'A02', code: 'A-02', block: 'Anggrek',  facing: 'Utara',   status: 'available', price: 1_650_000_000 },
    { id: 'A03', code: 'A-03', block: 'Anggrek',  facing: 'Selatan', status: 'indent',    price: 1_620_000_000 },
    { id: 'A04', code: 'A-04', block: 'Anggrek',  facing: 'Barat',   status: 'available', price: 1_600_000_000 },
  ],

  t120: [
    { id: 'B01', code: 'B-01', block: 'Bougen',   facing: 'Timur',   status: 'available', price: 2_000_000_000 },
    { id: 'B02', code: 'B-02', block: 'Bougen',   facing: 'Utara',   status: 'indent',    price: 2_050_000_000 },
    { id: 'B03', code: 'B-03', block: 'Bougen',   facing: 'Barat',   status: 'available', price: 2_000_000_000, notes: 'Hook' },
  ],

  t150: [
    { id: 'DH01', code: 'DH-01', block: 'Dahlia', facing: 'Timur',   status: 'available', price: 2_800_000_000 },
    { id: 'DH02', code: 'DH-02', block: 'Dahlia', facing: 'Utara',   status: 'indent',    price: 2_900_000_000 },
  ],
}
