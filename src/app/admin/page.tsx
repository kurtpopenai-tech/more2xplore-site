import { Package, Image, Inbox, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import rentalItems from '@/data/rental-items.json'
import categories from '@/data/categories.json'

const stats = [
  {
    label: 'Rental Items',
    value: rentalItems.filter((i) => i.isActive).length,
    icon: Package,
    href: '/admin/rentals',
    color: 'text-brand-400 bg-brand-600/20',
  },
  {
    label: 'Categories',
    value: categories.length,
    icon: Package,
    href: '/admin/rentals',
    color: 'text-blue-400 bg-blue-600/20',
  },
  {
    label: 'Portfolio Items',
    value: 12,
    icon: Image,
    href: '/admin/portfolio',
    color: 'text-purple-400 bg-purple-600/20',
  },
  {
    label: 'Recent Enquiries',
    value: 0,
    icon: Inbox,
    href: '/admin/enquiries',
    color: 'text-green-400 bg-green-600/20',
  },
]

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">Dashboard</h1>

      {/* Stats grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/20 hover:bg-white/[0.06]"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2.5 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-gray-600 transition-transform group-hover:translate-x-1 group-hover:text-gray-400" />
            </div>
            <p className="mt-4 text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-4 font-display text-lg font-semibold">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/rentals"
            className="rounded-lg bg-brand-600/20 px-4 py-2 text-sm font-medium text-brand-400 hover:bg-brand-600/30"
          >
            + Add Rental Item
          </Link>
          <Link
            href="/admin/portfolio"
            className="rounded-lg bg-purple-600/20 px-4 py-2 text-sm font-medium text-purple-400 hover:bg-purple-600/30"
          >
            + Add Portfolio Item
          </Link>
          <Link
            href="/admin/enquiries"
            className="rounded-lg bg-green-600/20 px-4 py-2 text-sm font-medium text-green-400 hover:bg-green-600/30"
          >
            View Enquiries
          </Link>
          <Link
            href="/admin/settings"
            className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/10"
          >
            Site Settings
          </Link>
        </div>
      </div>

      {/* Setup instructions */}
      <div className="mt-8 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6">
        <h2 className="mb-2 font-display text-lg font-semibold text-yellow-300">
          Setup Required
        </h2>
        <p className="mb-4 text-sm text-gray-400">
          To fully activate the admin panel, complete these steps:
        </p>
        <ol className="list-inside list-decimal space-y-2 text-sm text-gray-400">
          <li>
            Set up a Supabase project and add your credentials to{' '}
            <code className="text-yellow-300">.env.local</code>
          </li>
          <li>Run the SQL schema in <code className="text-yellow-300">supabase/schema.sql</code> against your database</li>
          <li>Run <code className="text-yellow-300">npm run seed</code> to import the catalogue data</li>
          <li>Configure SMTP settings for email delivery</li>
          <li>
            Create your admin user via the Supabase dashboard or seed script
          </li>
        </ol>
      </div>
    </div>
  )
}
