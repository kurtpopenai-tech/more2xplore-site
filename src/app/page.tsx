'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Rentals from '@/components/Rentals'
import SocialFeed from '@/components/SocialFeed'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import EnquiryDrawer from '@/components/EnquiryDrawer'

export default function HomePage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  return (
    <>
      <Navbar onOpenEnquiry={() => setEnquiryOpen(true)} />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Rentals />
        <SocialFeed />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <EnquiryDrawer
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </>
  )
}
