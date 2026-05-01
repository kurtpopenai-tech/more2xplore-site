'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// Placeholder portfolio data — replace with DB/CMS data in production
const portfolioCategories = [
  'All',
  'Events',
  'Sound & Lighting',
  'Brand Activations',
  'Branding',
  'Outlet Management',
  'Staffing',
]

// Using placeholder images — in production these come from the admin panel
const portfolioItems = [
  { id: 1, category: 'Events', caption: 'Corporate event setup with custom décor and furniture' },
  { id: 2, category: 'Sound & Lighting', caption: 'Full sound and lighting rig for outdoor activation' },
  { id: 3, category: 'Brand Activations', caption: 'Brand activation with custom bar and signage' },
  { id: 4, category: 'Events', caption: 'Intimate corporate dinner setup' },
  { id: 5, category: 'Branding', caption: 'Custom vinyl branding and collateral production' },
  { id: 6, category: 'Sound & Lighting', caption: 'Stage lighting for conference presentation' },
  { id: 7, category: 'Brand Activations', caption: 'Outdoor brand activation with mobile bar service' },
  { id: 8, category: 'Staffing', caption: 'Brand ambassadors at promotional event' },
  { id: 9, category: 'Outlet Management', caption: 'POS setup and outlet trade visit' },
  { id: 10, category: 'Events', caption: 'Wedding setup with Oakland furniture range' },
  { id: 11, category: 'Branding', caption: 'Event collateral and vinyl branding' },
  { id: 12, category: 'Brand Activations', caption: 'Custom activation concept and setup' },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered =
    activeFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null
    )
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null
    )

  return (
    <section id="portfolio" className="relative bg-navy-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand-400">
            Our Work
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Portfolio
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            A showcase of events, activations, and setups we&apos;ve delivered for
            our clients across South Africa.
          </p>
        </div>

        {/* Filter pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeFilter === cat
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, index) => (
            <button
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-navy-800"
            >
              {/* Placeholder — in production: <Image src={item.imageUrl} ... /> */}
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-950 to-navy-800">
                <span className="text-sm text-gray-600">
                  {item.category} Photo
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform group-hover:translate-y-0">
                <p className="text-sm font-medium text-white">
                  {item.caption}
                </p>
                <p className="text-xs text-gray-400">{item.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4">
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="max-h-[80vh] max-w-4xl">
            {/* Placeholder — in production: actual image */}
            <div className="flex aspect-video items-center justify-center rounded-xl bg-navy-800">
              <div className="text-center">
                <p className="text-lg text-gray-400">
                  {filtered[lightboxIndex].caption}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  {lightboxIndex + 1} / {filtered.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
