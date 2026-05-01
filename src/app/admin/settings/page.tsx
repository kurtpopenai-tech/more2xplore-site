'use client'

import { Save } from 'lucide-react'

export default function AdminSettings() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">Site Settings</h1>
        <p className="text-sm text-gray-500">
          Manage company information and site content
        </p>
      </div>

      <div className="space-y-8">
        {/* Company Info */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">
            Company Information
          </h2>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-gray-400">
                  Email 1
                </label>
                <input
                  defaultValue="gary@more2xplore.co.za"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">
                  Email 2
                </label>
                <input
                  defaultValue="roxy@more2xplore.co.za"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-gray-400">
                  Phone 1
                </label>
                <input
                  defaultValue="083 516 02 42"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">
                  Phone 2
                </label>
                <input
                  defaultValue="084 407 3494"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                WhatsApp Number
              </label>
              <input
                defaultValue="27835160242"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">
            Social Media Links
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                Instagram URL
              </label>
              <input
                defaultValue="https://www.instagram.com/m2xplore/"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                Facebook URL
              </label>
              <input
                defaultValue="https://www.facebook.com/MORE2XPLORE/"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                Twitter URL
              </label>
              <input
                defaultValue="https://twitter.com/more2xplore"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">
            Hero Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                Headline
              </label>
              <input
                defaultValue="Event Solutions. Equipment Rental. Nationwide."
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                Subheading
              </label>
              <textarea
                rows={2}
                defaultValue="From concept to execution — corporate events, brand activations, and equipment hire across South Africa since 2007."
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
              />
            </div>
            <div className="rounded-lg border-2 border-dashed border-white/10 p-6 text-center">
              <p className="text-sm text-gray-500">
                Upload hero background image
              </p>
            </div>
          </div>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-500">
          <Save className="h-4 w-4" />
          Save Settings
        </button>

        <p className="text-xs text-gray-600">
          Settings persistence requires Supabase database connection
        </p>
      </div>
    </div>
  )
}
