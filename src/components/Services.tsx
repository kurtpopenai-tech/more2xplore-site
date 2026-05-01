import {
  CalendarCheck,
  Speaker,
  Lightbulb,
  Megaphone,
  Users,
  Package,
  Store,
  Palette,
  type LucideIcon,
} from 'lucide-react'
import servicesData from '@/data/services.json'

const iconMap: Record<string, LucideIcon> = {
  CalendarCheck,
  Speaker,
  Lightbulb,
  Megaphone,
  Users,
  Package,
  Store,
  Palette,
}

export default function Services() {
  return (
    <section id="services" className="relative bg-navy-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand-400">
            What We Do
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            End-to-End Event Solutions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            From concept and strategy through to setup, execution, and
            reporting — we handle every aspect of your event.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicesData.map((service) => {
            const Icon = iconMap[service.icon] || Package
            const isRental = service.linkTo === 'rentals'

            const Card = (
              <div
                key={service.id}
                className={`group relative rounded-2xl border p-6 transition-all duration-300 ${
                  isRental
                    ? 'border-brand-600/40 bg-brand-600/10 hover:border-brand-500/60 hover:bg-brand-600/15'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                <div
                  className={`mb-4 inline-flex rounded-xl p-3 ${
                    isRental
                      ? 'bg-brand-600/20 text-brand-400'
                      : 'bg-white/5 text-gray-400 group-hover:text-brand-400'
                  } transition-colors`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {service.description}
                </p>
                {isRental && (
                  <span className="mt-4 inline-block text-sm font-semibold text-brand-400">
                    Browse catalogue &darr;
                  </span>
                )}
              </div>
            )

            if (isRental) {
              return (
                <a key={service.id} href="#rentals" className="block">
                  {Card}
                </a>
              )
            }
            return Card
          })}
        </div>
      </div>
    </section>
  )
}
