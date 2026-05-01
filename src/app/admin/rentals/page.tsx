'use client'

import { useState, useMemo } from 'react'
import { Search, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import rentalItems from '@/data/rental-items.json'
import categories from '@/data/categories.json'
import { formatPrice } from '@/lib/utils'

export default function AdminRentals() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)

  const items = useMemo(() => {
    let result = [...rentalItems]
    if (filterCategory !== 'all') {
      result = result.filter((i) => i.category === filterCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      )
    }
    return result
  }, [searchQuery, filterCategory])

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Rental Items</h1>
          <p className="text-sm text-gray-500">
            {rentalItems.length} items across {categories.length} categories
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-500"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-9 pr-4 text-sm text-white outline-none focus:border-brand-500"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-500"
        >
          <option value="all" className="bg-navy-900">
            All Categories
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} className="bg-navy-900">
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Items table */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="px-4 py-3 text-left font-medium text-gray-400">
                Item
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-400">
                Category
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-400">
                Price
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-400">
                Qty
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-400">
                Status
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const cat = categories.find((c) => c.id === item.category)
              return (
                <tr
                  key={item.id}
                  className="border-b border-white/5 hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-navy-800" />
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        {item.isFeatured && (
                          <span className="text-[10px] font-bold uppercase text-brand-400">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {cat?.name || item.category}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {formatPrice(item.price, item.priceType)}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-400">
                    {item.quantity ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item.isActive ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                        <Eye className="h-3 w-3" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-500/10 px-2 py-0.5 text-xs text-gray-500">
                        <EyeOff className="h-3 w-3" /> Hidden
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="rounded-md p-1.5 text-gray-500 hover:bg-white/5 hover:text-brand-400">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded-md p-1.5 text-gray-500 hover:bg-red-500/10 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-center text-xs text-gray-600">
        Showing {items.length} items &middot; Full CRUD operations require
        Supabase database connection
      </p>

      {/* Add item modal placeholder */}
      {showAddForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowAddForm(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-navy-900 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 font-display text-xl font-bold">
              Add Rental Item
            </h2>
            <p className="mb-4 text-sm text-gray-400">
              This form will be fully functional once connected to Supabase.
              Fields shown below match the data model from the PRD.
            </p>
            <div className="space-y-3">
              <input
                placeholder="Item Name"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
              />
              <select className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none">
                <option className="bg-navy-900">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-navy-900">
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Price (ZAR)"
                  type="number"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
                />
                <select className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none">
                  <option className="bg-navy-900">Fixed Price</option>
                  <option className="bg-navy-900">From (minimum)</option>
                  <option className="bg-navy-900">Price on Request</option>
                </select>
              </div>
              <textarea
                placeholder="Description"
                rows={3}
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
              />
              <input
                placeholder="Colours (comma separated)"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Dimensions"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
                />
                <input
                  placeholder="Quantity Available"
                  type="number"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
                />
              </div>
              <div className="rounded-lg border-2 border-dashed border-white/10 p-6 text-center">
                <p className="text-sm text-gray-500">
                  Drop images here or click to upload
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowAddForm(false)}
                className="rounded-lg px-4 py-2 text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500">
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
