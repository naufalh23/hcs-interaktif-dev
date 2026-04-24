// import { NextRequest, NextResponse } from 'next/server'
// import { saveLead }                  from '@/data/leads'
// import type { BookingPayload }       from '@/data/leads'

// export async function POST(req: NextRequest) {
//   try {
//     const body: BookingPayload = await req.json()

//     // Validasi minimal
//     if (!body.fullName?.trim() || !body.phone?.trim() || !body.unitCode) {
//       return NextResponse.json({ success: false, error: 'Data tidak lengkap' }, { status: 400 })
//     }

//     // Simpan ke in-memory store
//     const lead = saveLead({
//       fullName:      body.fullName.trim(),
//       phone:         body.phone.trim(),
//       email:         body.email?.trim()     || undefined,
//       agentCode:     body.agentCode?.trim() || undefined,
//       domicile:      body.domicile?.trim()  || undefined,
//       paymentMethod: body.paymentMethod,
//       unitId:        body.unitId,
//       unitCode:      body.unitCode,
//       houseTypeId:   body.houseTypeId,
//       houseTypeName: body.houseTypeName,
//       clusterName:   body.clusterName,
//       unitFacing:    body.unitFacing,
//       basePrice:     body.basePrice,
//       totalPrice:    body.totalPrice,
//       customization: JSON.stringify(body.customization),
//       kioskId:       body.kioskId ?? 'KIOSK-01',
//     })

//     // Log ke console untuk monitoring sementara
//     console.table({
//       code:    lead.bookingCode,
//       name:    lead.fullName,
//       phone:   lead.phone,
//       unit:    lead.unitCode,
//       price:   lead.totalPrice,
//       payment: lead.paymentMethod,
//     })

//     return NextResponse.json({
//       success:     true,
//       bookingCode: lead.bookingCode,
//       bookingId:   lead.id,
//     })

//   } catch (err) {
//     console.error('[POST /api/booking]', err)
//     return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
//   }
// }

// // GET — lihat semua leads (untuk testing, hapus di production)
// export async function GET() {
//   const { getAllLeads } = await import('@/data/leads')
//   const leads = getAllLeads()
//   return NextResponse.json({ total: leads.length, leads })
// }
