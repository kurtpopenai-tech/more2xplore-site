import { Instagram, Facebook, Twitter } from 'lucide-react'

export default function SocialFeed() {
  return (
    <section id="social" className="relative bg-navy-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand-400">
            Follow Our Journey
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Recent Work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Follow us on social media to see our latest events, setups, and
            behind-the-scenes content.
          </p>
        </div>

        {/*
          SOCIAL FEED EMBED
          =================
          Replace this placeholder with your chosen social feed widget:

          Option A (Recommended): Behold (https://behold.so)
          - Free tier: 1 feed, 1 widget
          - Paste their embed script here

          Option B: Elfsight (https://elfsight.com)
          - Free tier: 1 widget, 200 views/month
          - Paste their <div class="elfsight-app-..." /> here

          Option C: EmbedSocial (https://embedsocial.com)
          - Free trial available
          - Paste their widget code here

          Option D: Custom Instagram Graph API integration
          - See /api/social route for implementation
        */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-navy-800 to-brand-950"
            >
              <div className="flex h-full items-center justify-center">
                <Instagram className="h-8 w-8 text-gray-700" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-brand-600/0 transition-colors group-hover:bg-brand-600/20">
                <Instagram className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Social feed widget placeholder — connect Instagram/Facebook in
          production
        </p>

        {/* Social links */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="https://www.instagram.com/m2xplore/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/10"
          >
            <Instagram className="h-5 w-5" />
            Follow on Instagram
          </a>
          <a
            href="https://www.facebook.com/MORE2XPLORE/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/10"
          >
            <Facebook className="h-5 w-5" />
            Follow on Facebook
          </a>
        </div>
      </div>
    </section>
  )
}
