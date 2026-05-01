'use client'

import { Inbox, Mail, Phone, Calendar } from 'lucide-react'

export default function AdminEnquiries() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Enquiries</h1>
        <p className="text-sm text-gray-500">
          View and manage enquiries received via the website
        </p>
      </div>

      {/* Empty state */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] py-16 text-center">
        <div className="mb-4 inline-flex rounded-full bg-white/5 p-4">
          <Inbox className="h-8 w-8 text-gray-600" />
        </div>
        <h3 className="font-display text-lg font-semibold text-gray-400">
          No enquiries yet
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
          When visitors submit enquiries through the contact form or rental
          catalogue, they&apos;ll appear here. Enquiries are also emailed to
          gary@more2xplore.co.za and roxy@more2xplore.co.za.
        </p>
      </div>

      {/* Example of what an enquiry will look like */}
      <div className="mt-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Example Enquiry (Preview)
        </h2>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-brand-600/20 px-2 py-0.5 text-xs font-semibold text-brand-400">
              Equipment Rental
            </span>
            <span className="text-xs text-gray-600">2 May 2026, 10:30 AM</span>
          </div>
          <h3 className="font-semibold">John Smith</h3>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" /> john@example.com
            </span>
            <span className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" /> 082 123 4567
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> 15 Jun 2026
            </span>
          </div>
          <div className="mt-3 rounded-lg bg-white/5 p-3">
            <p className="mb-2 text-xs font-semibold text-gray-500">
              Items Requested:
            </p>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>White Oakland Long Ottoman x 4</li>
              <li>Boston Cocktail Table x 6</li>
              <li>White Metal Bar (Square) x 1</li>
              <li>Fairy Light Curtain x 2</li>
            </ul>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            &quot;We&apos;re hosting a corporate year-end function for 80 people. Would
            like a quote for the items above plus delivery to Constantia.&quot;
          </p>
        </div>
      </div>
    </div>
  )
}
