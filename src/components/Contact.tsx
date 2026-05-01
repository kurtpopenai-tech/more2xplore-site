'use client'

import { useState } from 'react'
import { Send, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

const eventTypes = [
  'Corporate Event',
  'Brand Activation',
  'Wedding',
  'Equipment Rental',
  'Other',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    eventDate: '',
    message: '',
    _honey: '', // honeypot
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData._honey) return // bot detected

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('sent')
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          eventType: '',
          eventDate: '',
          message: '',
          _honey: '',
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const updateField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  return (
    <section id="contact" className="relative bg-navy-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand-400">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Contact Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Ready to start planning your event? Get in touch and our team will
            get back to you shortly.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            {status === 'sent' ? (
              <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center">
                <div className="mb-4 inline-flex rounded-full bg-green-500/20 p-3">
                  <Send className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="font-display text-xl font-semibold text-green-300">
                  Message Sent!
                </h3>
                <p className="mt-2 text-gray-400">
                  Thank you for contacting us. We will get back to you shortly.
                  <br />— The More2Xplore team
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-400">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-400">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-400">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-400">
                      Company / Organisation
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-400">
                      Event Type
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => updateField('eventType', e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-brand-500"
                    >
                      <option value="" className="bg-navy-900">
                        Select...
                      </option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type} className="bg-navy-900">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-400">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => updateField('eventDate', e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-400">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-brand-500"
                  />
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="_honey"
                  value={formData._honey}
                  onChange={(e) => updateField('_honey', e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {status === 'error' && (
                  <p className="text-sm text-red-400">
                    Something went wrong. Please try again or contact us
                    directly via email or WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-500 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact info sidebar */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 font-display text-lg font-semibold">
                Contact Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-brand-400" />
                  <div className="text-sm">
                    <a
                      href="mailto:gary@more2xplore.co.za"
                      className="block text-gray-300 hover:text-white"
                    >
                      gary@more2xplore.co.za
                    </a>
                    <a
                      href="mailto:roxy@more2xplore.co.za"
                      className="block text-gray-300 hover:text-white"
                    >
                      roxy@more2xplore.co.za
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-brand-400" />
                  <div className="text-sm">
                    <a
                      href="tel:+27835160242"
                      className="block text-gray-300 hover:text-white"
                    >
                      083 516 02 42
                    </a>
                    <a
                      href="tel:+27844073494"
                      className="block text-gray-300 hover:text-white"
                    >
                      084 407 3494
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 text-brand-400" />
                  <a
                    href="https://wa.me/27835160242"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 font-display text-lg font-semibold">
                Head Office
              </h3>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-brand-400" />
                <p className="text-sm text-gray-300">
                  1830 Capricorn Crescent,
                  <br />
                  Capricorn Business Park,
                  <br />
                  Muizenberg, Cape Town
                </p>
              </div>
              {/* Google Map embed */}
              <div className="mt-4 overflow-hidden rounded-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.5!2d18.47!3d-34.11!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCapricorn+Business+Park+Muizenberg!5e0!3m2!1sen!2sza!4v1"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="More2Xplore Head Office"
                  className="opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
