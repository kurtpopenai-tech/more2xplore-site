'use client'

import { useState, useMemo } from 'react'
import { Search, X, Plus, ChevronDown } from 'lucide-react'
import categoriesData from '@/data/categories.json'
import itemsData from '@/data/rental-items.json'
import { formatPrice } from '@/lib/utils'
import { enquiryStore } from '@/lib/enquiry-store'
import type { RentalItem } from '@/lib/types'

const ITEMS_PER_PAGE = 20

export default function Rentals() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null)

  const items = itemsData as RentalItem[]

  const filtered = useMemo(() => {
    let result = items.filter((item) => item.isActive)
    if (activeCategory !== 'all') {
      result = result.filter((item) => item.category === activeCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.colours && item.colours.some((c) => c.toLowerCase().includes(q)))
      )
    }
    return result
  }, [items, activeCategory, searchQuery])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: items.filter((i) => i.isActive).length }
    categoriesData.forEach((cat) => {
      counts[cat.id] = items.filter(
        (i) => i.isActive && i.category === cat.id
      ).length
    })
    return counts
  }, [items])

  const addToEnquiry = (item: RentalItem) => {
    enquiryStore.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      priceType: item.priceType,
    })
  }

  return (
    <section id="rentals" className="relative bg-navy-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand-400">
            Equipment Hire
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Rental Catalogue
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Browse our extensive range of furniture, décor, lighting, bars, and
            more. Add items to your enquiry list and we&apos;ll get back to you with
            availability and pricing.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          {/* Search bar */}
          <div className="relative mx-auto max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setVisibleCount(ITEMS_PER_PAGE)
              }}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-10 text-white placeholder-gray-500 outline-none transition-colors focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => {
                setActiveCategory('all')
                setVisibleCount(ITEMS_PER_PAGE)
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-brand-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              All ({categoryCounts.all})
            </button>
            {categoriesData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  setVisibleCount(ITEMS_PER_PAGE)
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-brand-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.name} ({categoryCounts[cat.id] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-center text-sm text-gray-500">
          Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}{' '}
          items
        </p>

        {/* Item grid */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-500">
              No items found. Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col rounded-xl border border-white/10 bg-white/[0.03] transition-all hover:border-white/20 hover:bg-white/[0.06]"
              >
                {/* Image placeholder */}
                <button
                  onClick={() => setSelectedItem(item)}
                  className="aspect-square w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-navy-800 to-brand-950"
                >
                  <div className="flex h-full items-center justify-center">
                    <span className="text-xs text-gray-600">Photo</span>
                  </div>
                </button>

                <div className="flex flex-1 flex-col p-4">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-left"
                  >
                    <h3 className="font-display font-semibold leading-tight group-hover:text-brand-300">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-brand-400 font-semibold">
                      {formatPrice(item.price, item.priceType)}
                    </p>
                  </button>

                  {/* Colour dots */}
                  {item.colours && item.colours.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.colours.slice(0, 5).map((colour) => (
                        <span
                          key={colour}
                          className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-gray-400"
                        >
                          {colour}
                        </span>
                      ))}
                      {item.colours.length > 5 && (
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-gray-400">
                          +{item.colours.length - 5}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-auto pt-3">
                    <button
                      onClick={() => addToEnquiry(item)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600/20 py-2 text-sm font-semibold text-brand-400 transition-all hover:bg-brand-600 hover:text-white"
                    >
                      <Plus className="h-4 w-4" />
                      Add to Enquiry
                    </button>
                  </div>
                </div>

                {item.isFeatured && (
                  <div className="absolute left-3 top-3 rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Featured
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/10"
            >
              <ChevronDown className="h-4 w-4" />
              Load More ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Item detail modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="animate-fade-in-up max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-navy-900 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl font-bold">
                  {selectedItem.name}
                </h3>
                <p className="mt-1 text-lg font-semibold text-brand-400">
                  {formatPrice(selectedItem.price, selectedItem.priceType)}
                </p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="rounded-lg p-1 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image placeholder */}
            <div className="mb-5 aspect-video rounded-xl bg-gradient-to-br from-navy-800 to-brand-950">
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-gray-600">Product Photo</span>
              </div>
            </div>

            <p className="mb-4 text-gray-300">{selectedItem.description}</p>

            <div className="mb-5 space-y-2 text-sm">
              {selectedItem.colours && selectedItem.colours.length > 0 && (
                <div className="flex gap-2">
                  <span className="text-gray-500">Colours:</span>
                  <span className="text-gray-300">
                    {selectedItem.colours.join(', ')}
                  </span>
                </div>
              )}
              {selectedItem.material && (
                <div className="flex gap-2">
                  <span className="text-gray-500">Material:</span>
                  <span className="text-gray-300">{selectedItem.material}</span>
                </div>
              )}
              {selectedItem.dimensions && (
                <div className="flex gap-2">
                  <span className="text-gray-500">Dimensions:</span>
                  <span className="text-gray-300">
                    {selectedItem.dimensions}
                  </span>
                </div>
              )}
              {selectedItem.quantity && (
                <div className="flex gap-2">
                  <span className="text-gray-500">Available:</span>
                  <span className="text-gray-300">
                    {selectedItem.quantity} units
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                addToEnquiry(selectedItem)
                setSelectedItem(null)
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
            >
              <Plus className="h-4 w-4" />
              Add to Enquiry List
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
