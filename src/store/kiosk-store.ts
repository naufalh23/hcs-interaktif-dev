'use client'
import { create }                           from 'zustand'
import { DEFAULT_CUSTOM, calcExtraPrice }   from '@/data/customization'
import type { CustomizationState }          from '@/data/customization'
import type { HouseType }                   from '@/data/house-types'
import type { Unit }                        from '@/data/units'
import type { PaymentMethod }               from '@/data/leads'

export type Screen = 'attract' | 'type' | 'custom' | 'unit' | 'form' | 'success'

interface KioskStore {
  screen:        Screen
  houseType:     HouseType | null
  unit:          Unit      | null
  custom:        CustomizationState
  paymentMethod: PaymentMethod
  bookingCode:   string | null
  isLoading:     boolean

  goTo:          (s: Screen)  => void
  pickType:      (t: HouseType) => void
  pickUnit:      (u: Unit)    => void
  setCustom:     (patch: Partial<CustomizationState>) => void
  toggleAddon:   (id: string) => void
  setPayment:    (m: PaymentMethod) => void
  setBookingCode:(c: string)  => void
  setLoading:    (v: boolean) => void
  reset:         ()           => void

  // Computed helpers
  extraPrice:    () => number
  totalPrice:    () => number
}

export const useStore = create<KioskStore>((set, get) => ({
  screen:        'attract',
  houseType:     null,
  unit:          null,
  custom:        { ...DEFAULT_CUSTOM, addons: {} },
  paymentMethod: 'KPR Bank',
  bookingCode:   null,
  isLoading:     false,

  goTo:          (s)  => set({ screen: s }),
  pickType:      (t)  => set({ houseType: t, unit: null, custom: { ...DEFAULT_CUSTOM, addons: {} }, screen: 'custom' }),
  pickUnit:      (u)  => set({ unit: u }),
  setCustom:     (p)  => set(s => ({ custom: { ...s.custom, ...p } })),
  toggleAddon:   (id) => set(s => ({
    custom: { ...s.custom, addons: { ...s.custom.addons, [id]: !s.custom.addons[id] } }
  })),
  setPayment:    (m)  => set({ paymentMethod: m }),
  setBookingCode:(c)  => set({ bookingCode: c }),
  setLoading:    (v)  => set({ isLoading: v }),
  reset:         ()   => set({
    screen: 'attract', houseType: null, unit: null,
    custom: { ...DEFAULT_CUSTOM, addons: {} },
    paymentMethod: 'KPR Bank', bookingCode: null, isLoading: false,
  }),

  extraPrice: () => calcExtraPrice(get().custom),
  totalPrice: () => (get().unit?.price ?? 0) + calcExtraPrice(get().custom),
}))
