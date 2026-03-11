// ============================================================
//  IN-MEMORY LEAD STORE
//  Data booking tersimpan di memori server sementara.
//  TODO: Ganti dengan Supabase/database setelah CMS siap
//
//  Catatan: Data hilang saat server restart.
//  Untuk production harus pakai database.
// ============================================================

import type { CustomizationState } from './customization'

export type PaymentMethod = 'KPR Bank' | 'Cash Keras' | 'Cash Bertahap'
export type LeadStatus    = 'new' | 'contacted' | 'negotiating' | 'booked' | 'cancelled'

export interface Lead {
  id:            string
  bookingCode:   string
  createdAt:     string
  // Data pemesan
  fullName:      string
  phone:         string
  email?:        string
  agentCode?:    string
  domicile?:     string
  // Properti
  unitCode:      string
  houseTypeName: string
  clusterName:   string
  unitFacing:    string
  // Harga
  basePrice:     number
  extraPrice:    number
  totalPrice:    number
  paymentMethod: PaymentMethod
  // Kustomisasi (disimpan sebagai JSON string)
  customization: string
  // Tracking
  kioskId:       string
  status:        LeadStatus
}

// In-memory store (array di module scope = persistent per proses Node)
const LEADS_STORE: Lead[] = []

let counter = 1

export function generateBookingCode(): string {
  const pad = String(counter++).padStart(4, '0')
  return `HC-${pad}`
}

export function saveLead(data: Omit<Lead, 'id' | 'bookingCode' | 'createdAt' | 'status'>): Lead {
  const lead: Lead = {
    ...data,
    id:          crypto.randomUUID(),
    bookingCode: generateBookingCode(),
    createdAt:   new Date().toISOString(),
    status:      'new',
  }
  LEADS_STORE.push(lead)
  console.log(`[Leads] Saved: ${lead.bookingCode} — ${lead.fullName} — ${lead.unitCode}`)
  return lead
}

export function getAllLeads(): Lead[] {
  return [...LEADS_STORE].reverse() // terbaru dulu
}

export function getLeadByCode(code: string): Lead | undefined {
  return LEADS_STORE.find(l => l.bookingCode === code)
}

// Tipe untuk payload dari form
export interface BookingPayload {
  fullName:      string
  phone:         string
  email?:        string
  agentCode?:    string
  domicile?:     string
  paymentMethod: PaymentMethod
  unitId:        string
  unitCode:      string
  houseTypeId:   string
  houseTypeName: string
  clusterName:   string
  unitFacing:    string
  basePrice:     number
  totalPrice:    number
  customization: CustomizationState
  kioskId:       string
}
