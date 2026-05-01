import { Instagram, Facebook, Twitter } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Rentals', href: '#rentals' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <span className="font-display text-xl font-bold tracking-tight">
              MORE<span className="text-brand-400">2</span>XPLORE
            </span>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Full-service event solutions, equipment rental, and brand
              activations across South Africa since 2007.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="mailto:gary@more2xplore.co.za" className="hover:text-white">
                  gary@more2xplore.co.za
                </a>
              </li>
              <li>
                <a href="mailto:roxy@more2xplore.co.za" className="hover:text-white">
                  roxy@more2xplore.co.za
                </a>
              </li>
              <li>
                <a href="tel:+27835160242" className="hover:text-white">
                  083 516 02 42
                </a>
              </li>
              <li>
                <a href="tel:+27844073494" className="hover:text-white">
                  084 407 3494
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/m2xplore/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white/5 p-2.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/MORE2XPLORE/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white/5 p-2.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/more2xplore"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white/5 p-2.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} More2Xplore Event Solutions. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
