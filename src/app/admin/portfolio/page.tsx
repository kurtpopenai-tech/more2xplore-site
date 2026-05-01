'use client'

import { Plus, Edit, Trash2 } from 'lucide-react'

const portfolioItems = [
  { id: 1, title: 'Corporate Event Setup', category: 'Events' },
  { id: 2, title: 'Sound & Lighting Rig', category: 'Sound & Lighting' },
  { id: 3, title: 'Brand Activation', category: 'Brand Activations' },
  { id: 4, title: 'Corporate Dinner', category: 'Events' },
  { id: 5, title: 'Vinyl Branding', category: 'Branding' },
]

export default function AdminPortfolio() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Portfolio</h1>
          <p className="text-sm text-gray-500">Manage your portfolio gallery</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-500">
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="group rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
          >
            <div className="aspect-video bg-gradient-to-br from-navy-800 to-brand-950" />
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">{item.category}</p>
              </div>
              <div className="flex gap-1">
                <button className="rounded-md p-1.5 text-gray-500 hover:bg-white/5 hover:text-brand-400">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="rounded-md p-1.5 text-gray-500 hover:bg-red-500/10 hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-gray-600">
        Full CRUD with image upload requires Supabase connection
      </p>
    </div>
  )
}
