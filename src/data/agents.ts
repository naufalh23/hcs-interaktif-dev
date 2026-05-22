// ============================================================
//  DATA STATIS — Daftar Marketing Agent
//  TODO: Nanti fetch dari CMS/HRM
// ============================================================

export interface Agent {
  id:   number
  name: string
  code: string  // kode agent untuk tracking
}

export const AGENTS: Agent[] = [
  { id: 1, name: 'Andi Pratama',     code: 'AP01' },
  { id: 2, name: 'Siti Rahma',       code: 'SR02' },
  { id: 3, name: 'Budi Santoso',     code: 'BS03' },
  { id: 4, name: 'Dewi Anggraini',   code: 'DA04' },
  { id: 5, name: 'Reza Firmansyah',  code: 'RF05' },
  { id: 6, name: 'Nurul Hidayah',    code: 'NH06' },
]

export const WALK_IN = { id: 0, name: 'Walk-in (Tanpa Agent)', code: 'WALK' }
