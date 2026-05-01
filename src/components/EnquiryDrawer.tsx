'use client'

import { useState, useSyncExternalStore } from 'react'
import { X, Minus, Plus, Trash2, Send, MessageCircle } from 'lucide-react'
import { enquiryStore } from '@/lib/enquiry-store'
import { formatPrice, generateWhatsAppLink, generateEnquiryWhatsAppMessage } from '@/lib/utils'

interface EnquiryDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function EnquiryDrawer({ isOpen, onClose }: EnquiryDrawerProps) {
  const items = useSyncExternalStore(
    enquiryStore.subscribe,
    enquiryStore.getItems,
    () => []
  )

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            quantity: i.quantity,
            price: i.price,
            priceType: i.priceType,
          })),
        }),
      })

      if (res.ok) {
        setStatus('sent')
        enquiryStore.clear()
        setFormData({ name: '', email: '', phone: '', eventDate: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const whatsappLink = generateWhatsAppLink(
    '27835160242',
    generateEnquiryWhatsAppMessage(items)
  )

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70] bg-black/60"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="animate-slide-in-right fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-navy-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="font-display text-lg font-bold">
            Enquiry List
            {items.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {status === 'sent' ? (
            <div className="mt-8 text-center">
              <div className="mb-4 inline-flex rounded-full bg-green-500/20 p-3">
                <Send className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="font-display text-lg font-semibold text-green-300">
                Enquiry Sent!
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                We&apos;ll get back to you with availability and pricing shortly.
              </p>
              <button
                onClick={() => {
                  setStatus('idle')
                  setShowForm(false)
                  onClose()
                }}
                className="mt-6 rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
              >
                Done
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="mt-8 text-center">
              <p className="text-gray-500">Your enquiry list is empty.</p>
              <p className="mt-2 text-sm text-gray-600">
                Browse the rental catalogue and add items you&apos;re interested in.
              </p>
              <button
                onClick={onClose}
                className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
              >
                Browse Catalogue
              </button>
            </div>
          ) : showForm ? (
            <form onSubmit={handleSubmitEnquiry} className="space-y-4">
              <p className="text-sm text-gray-400">
                Fill in your details and we&apos;ll send you a quote for the{' '}
                {items.length} item{items.length > 1 ? 's' : ''} in your list.
              </p>
              <input
                type="text"
                required
                placeholder="Your Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-500"
              />
              <input
                type="email"
                required
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-500"
              />
              <input
                type="tel"
                required
                placeholder="Phone *"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-500"
              />
              <input
                type="date"
                placeholder="Event Date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-500"
              />
              <textarea
                rows={3}
                placeholder="Additional notes (optional)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-500"
              />
              {status === 'error' && (
                <p className="text-sm text-red-400">
                  Something went wrong. Try WhatsApp instead.
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {status === 'sending' ? 'Sending...' : 'Submit Enquiry'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full py-2 text-sm text-gray-500 hover:text-white"
              >
                Back to list
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-brand-400">
                      {formatPrice(item.price, item.priceType)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        enquiryStore.updateQuantity(item.id, item.quantity - 1)
                      }
                      className="rounded-md bg-white/5 p-1 text-gray-400 hover:bg-white/10 hover:text-white"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        enquiryStore.updateQuantity(item.id, item.quantity + 1)
                      }
                      className="rounded-md bg-white/5 p-1 text-gray-400 hover:bg-white/10 hover:text-white"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => enquiryStore.removeItem(item.id)}
                      className="ml-1 rounded-md p-1 text-gray-500 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => enquiryStore.clear()}
                className="mt-2 text-xs text-gray-600 hover:text-red-400"
              >
                Clear all items
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && !showForm && status !== 'sent' && (
          <div className="border-t border-white/10 px-6 py-4 space-y-2">
            <button
              onClick={() => setShowForm(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-500"
            >
              <Send className="h-4 w-4" />
              Submit Enquiry via Email
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-500"
            >
              <MessageCircle className="h-4 w-4" />
              Enquire via WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  )
}
