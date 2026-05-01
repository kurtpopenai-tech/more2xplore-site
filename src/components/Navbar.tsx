'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { enquiryStore } from '@/lib/enquiry-store'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Rentals', href: '#rentals' },
  { label: 'Social', href: '#social' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  onOpenEnquiry: () => void
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const enquiryCount = useSyncExternalStore(
    enquiryStore.subscribe,
    enquiryStore.getCount,
    () => 0
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map((l) => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-950/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold tracking-tight text-white">
              MORE<span className="text-brand-400">2</span>XPLORE
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-brand-600/20 text-brand-300'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Enquiry bag */}
            <button
              onClick={onOpenEnquiry}
              className="relative ml-3 rounded-lg bg-brand-600 p-2.5 text-white transition-colors hover:bg-brand-500"
            >
              <ShoppingBag className="h-5 w-5" />
              {enquiryCount > 0 && (
                <span className="enquiry-badge-pulse absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
                  {enquiryCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenEnquiry}
              className="relative rounded-lg bg-brand-600 p-2 text-white"
            >
              <ShoppingBag className="h-5 w-5" />
              {enquiryCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold">
                  {enquiryCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="animate-fade-in border-t border-white/10 bg-navy-950/98 backdrop-blur-md md:hidden">
          <div className="px-4 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-brand-600/20 text-brand-300'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
