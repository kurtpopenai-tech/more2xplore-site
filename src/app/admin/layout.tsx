'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Image,
  Inbox,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/rentals', label: 'Rental Items', icon: Package },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Image },
  { href: '/admin/enquiries', label: 'Enquiries', icon: Inbox },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    // Check for auth token in cookie
    const hasToken = document.cookie.includes('admin_token=')
    setIsAuthenticated(hasToken)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      })

      if (res.ok) {
        setIsAuthenticated(true)
      } else {
        setLoginError('Invalid email or password')
      }
    } catch {
      setLoginError('Connection error. Please try again.')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    setIsAuthenticated(false)
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="font-display text-2xl font-bold">
              MORE<span className="text-brand-400">2</span>XPLORE
            </h1>
            <p className="mt-2 text-sm text-gray-500">Admin Panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-brand-500"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-brand-500"
            />
            {loginError && (
              <p className="text-sm text-red-400">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white hover:bg-brand-500"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-navy-950">
      {/* Sidebar - desktop */}
      <aside className="hidden w-64 border-r border-white/10 bg-navy-900 lg:block">
        <div className="p-6">
          <h1 className="font-display text-lg font-bold">
            M<span className="text-brand-400">2</span>X Admin
          </h1>
        </div>
        <nav className="px-3">
          {sidebarLinks.map((link) => {
            const isActive =
              link.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-600/20 text-brand-300'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto border-t border-white/10 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed left-0 top-0 z-50 h-full w-64 border-r border-white/10 bg-navy-900 lg:hidden">
            <div className="flex items-center justify-between p-6">
              <h1 className="font-display text-lg font-bold">
                M<span className="text-brand-400">2</span>X Admin
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="px-3">
              {sidebarLinks.map((link) => {
                const isActive =
                  link.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-600/20 text-brand-300'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </aside>
        </>
      )}

      {/* Main content */}
      <div className="flex-1">
        <header className="flex items-center gap-4 border-b border-white/10 px-6 py-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="font-display font-bold">
            M<span className="text-brand-400">2</span>X Admin
          </h1>
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
