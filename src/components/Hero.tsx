export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-brand-950 to-navy-950" />
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/40" />

      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(51,102,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(51,102,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-32 text-center sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">
            Est. 2007 &middot; Cape Town &middot; Johannesburg &middot; Durban
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Event Solutions.{' '}
            <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
              Equipment Rental.
            </span>{' '}
            Nationwide.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
            From concept to execution — corporate events, brand activations, and
            equipment hire across South Africa since 2007.
          </p>
        </div>

        <div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: '0.2s' }}
        >
          <a
            href="#rentals"
            className="inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-500 hover:shadow-brand-500/30 sm:w-auto"
          >
            View Our Equipment
          </a>
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 sm:w-auto"
          >
            Get In Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-gray-500 transition-colors hover:text-brand-400"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="h-10 w-px bg-gradient-to-b from-gray-500 to-transparent" />
          </a>
        </div>
      </div>
    </section>
  )
}
