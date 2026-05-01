import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'More2Xplore Event Solutions | Events, Rentals & Activations',
  description:
    'Full-service event solutions, equipment rental, and brand activations across South Africa. Corporate events, weddings, sound & lighting, furniture hire. Cape Town, Johannesburg, Durban.',
  keywords: [
    'event company Cape Town',
    'equipment rental Cape Town',
    'event setup South Africa',
    'brand activations',
    'furniture hire events',
    'sound and lighting rental',
    'corporate events Cape Town',
    'wedding equipment hire',
  ],
  openGraph: {
    title: 'More2Xplore Event Solutions',
    description:
      'Full-service event solutions, equipment rental, and brand activations across South Africa.',
    url: 'https://more2xplore.co.za',
    siteName: 'More2Xplore Event Solutions',
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'More2Xplore Event Solutions',
    description:
      'Full-service event solutions, equipment rental, and brand activations across South Africa.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-navy-950 text-white antialiased">{children}</body>
    </html>
  )
}
