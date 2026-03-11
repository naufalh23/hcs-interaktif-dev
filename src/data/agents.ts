// ============================================================
//  DATA STATIS — Daftar Marketing Agent
//  TODO: Nanti fetch dari CMS/HRM
// ============================================================

export interface Agent {
  id:   string
  name: string
  code: string  // kode agent untuk tracking
}

export const AGENTS: Agent[] = [
  { id: 'a01', name: 'Andi Pratama',     code: 'AP01' },
  { id: 'a02', name: 'Siti Rahma',       code: 'SR02' },
  { id: 'a03', name: 'Budi Santoso',     code: 'BS03' },
  { id: 'a04', name: 'Dewi Anggraini',   code: 'DA04' },
  { id: 'a05', name: 'Reza Firmansyah',  code: 'RF05' },
  { id: 'a06', name: 'Nurul Hidayah',    code: 'NH06' },
]

export const WALK_IN = { id: 'walk-in', name: 'Walk-in (Tanpa Agent)', code: 'WALK' }
