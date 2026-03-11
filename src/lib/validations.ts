import { z } from 'zod'

export const bookingSchema = z.object({
  fullName:      z.string().min(2, 'Nama minimal 2 karakter').max(100),
  phone:         z.string().min(9, 'No HP tidak valid').max(15).regex(/^[0-9+\-\s()]+$/, 'Format tidak valid'),
  email:         z.string().email('Format email tidak valid').optional().or(z.literal('')),
  agentCode:     z.string().optional(),
  domicile:      z.string().optional(),
  paymentMethod: z.enum(['KPR Bank', 'Cash Keras', 'Cash Bertahap']),
})

export type BookingSchema = z.infer<typeof bookingSchema>
