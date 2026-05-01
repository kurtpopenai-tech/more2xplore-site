'use client'

// Simple in-memory store for enquiry items with event emitter pattern
// Persists in React state via the EnquiryProvider context

import { EnquiryItem } from './types'

type Listener = () => void

let items: EnquiryItem[] = []
let listeners: Listener[] = []

function emit() {
  listeners.forEach((l) => l())
}

export const enquiryStore = {
  getItems(): EnquiryItem[] {
    return items
  },

  getCount(): number {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  },

  addItem(item: Omit<EnquiryItem, 'quantity'>) {
    const existing = items.find((i) => i.id === item.id)
    if (existing) {
      existing.quantity += 1
    } else {
      items = [...items, { ...item, quantity: 1 }]
    }
    emit()
  },

  removeItem(id: string) {
    items = items.filter((i) => i.id !== id)
    emit()
  },

  updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(id)
      return
    }
    items = items.map((i) => (i.id === id ? { ...i, quantity } : i))
    emit()
  },

  clear() {
    items = []
    emit()
  },

  subscribe(listener: Listener): () => void {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
}
