export interface RentalItem {
  id: string
  name: string
  category: string
  price: number | null
  priceType: 'fixed' | 'from' | 'on_request'
  description: string
  colours: string[] | null
  material: string | null
  quantity: number | null
  dimensions: string | null
  isFeatured: boolean
  isActive: boolean
  sortOrder: number
  images?: string[]
}

export interface Category {
  id: string
  name: string
  sortOrder: number
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  linkTo?: string
}

export interface EnquiryItem {
  id: string
  name: string
  price: number | null
  priceType: string
  quantity: number
}

export interface ContactFormData {
  fullName: string
  email: string
  phone: string
  company: string
  eventType: string
  eventDate: string
  message: string
}

export interface PortfolioItem {
  id: string
  title: string
  category: string
  imageUrl: string
  caption?: string
  client?: string
}
