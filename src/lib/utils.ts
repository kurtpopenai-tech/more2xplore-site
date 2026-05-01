import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatPrice(price: number | null, priceType: string): string {
  if (priceType === 'on_request' || price === null) return 'Price on Request'
  const formatted = `R${price.toLocaleString()}`
  if (priceType === 'from') return `From ${formatted}`
  return formatted
}

export function generateWhatsAppLink(
  number: string,
  message: string
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function generateEnquiryWhatsAppMessage(
  items: { name: string; quantity: number }[]
): string {
  const itemList = items
    .map((item) => `- ${item.name} (x${item.quantity})`)
    .join('\n')
  return `Hi More2Xplore, I'm interested in renting the following items:\n\n${itemList}\n\nPlease could you provide availability and a quote? Thank you.`
}
