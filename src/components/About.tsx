import { MapPin } from 'lucide-react'
import clients from '@/data/clients.json'

const offices = [
  {
    city: 'Cape Town',
    label: 'Head Office',
    address: '1830 Capricorn Crescent, Capricorn Business Park, Muizenberg',
  },
  {
    city: 'Johannesburg',
    label: 'Gauteng Office',
    address: 'Unit 3 Bronze Business Park, Brons Crescent, Clayville',
  },
  {
    city: 'Durban',
    label: 'KZN Office',
    address: 'Unit 4, 769 Marine Drive, Bluff',
  },
]

export default function About() {
  return (
    <section id="about" className="relative bg-navy-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand-400">
            About Us
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            A Fully Integrated Event Service Provider
          </h2>
        </div>

        {/* Story + offices grid */}
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="space-y-5 text-lg leading-relaxed text-gray-300">
              <p>
                In 2007, we saw an opportunity in the market for a fully
                integrated event service delivery provider. We have since
                developed this into a self-sufficient implementation business
                with a national footprint that has implemented successful
                large-scale as well as small intimate events across various
                consumer markets.
              </p>
              <p>
                Since its inception, our business has grown from a small
                operation only supplying sound and lighting, to a dynamic
                business that offers a full portfolio of products and solutions
                to meet our clients&apos; needs.
              </p>
              <p className="text-gray-400">
                We are a hands-on team and clients have direct access to the
                owners of the business. We are driven to satisfy client needs and
                deliver on expectation — engaging clients as often as we need to,
                to ensure absolute satisfaction at an affordable rate.
              </p>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-2">
            {offices.map((office) => (
              <div
                key={office.city}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <div className="mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-400" />
                  <h3 className="font-display font-semibold">
                    {office.city}
                    <span className="ml-2 text-xs font-normal text-gray-500">
                      {office.label}
                    </span>
                  </h3>
                </div>
                <p className="text-sm text-gray-400">{office.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Client logos */}
        <div className="mt-20">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">
            Trusted by leading brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {clients.map((client) => (
              <span
                key={client}
                className="whitespace-nowrap text-sm font-medium text-gray-500 transition-colors hover:text-gray-300"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
