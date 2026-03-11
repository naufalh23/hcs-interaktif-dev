import { clsx, type ClassValue } from 'clsx'
import { twMerge }               from 'tailwind-merge'

export function cn(...i: ClassValue[]) { return twMerge(clsx(i)) }

export function formatPrice(n: number): string {
  if (n >= 1_000_000_000) {
    const v = n / 1_000_000_000
    return `Rp ${v % 1 === 0 ? v : v.toFixed(1).replace(/\.0$/, '')} M`
  }
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(0)} Jt`
  return `Rp ${n.toLocaleString('id-ID')}`
}

export function toWaNumber(phone: string): string {
  const c = phone.replace(/\D/g, '')
  if (c.startsWith('0'))  return `62${c.slice(1)}`
  if (c.startsWith('+'))  return c.slice(1)
  return c
}
