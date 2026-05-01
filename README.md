# More2Xplore Event Solutions — Website

Modern single-page website with equipment rental catalogue, portfolio gallery, social feed integration, and admin panel.

## Quick Start (Local Development)

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm run dev
```

Open http://localhost:3000

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL via Supabase
- **Auth:** JWT (jose + bcryptjs)
- **Email:** Nodemailer
- **Icons:** Lucide React
- **Hosting:** Vercel (recommended)

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main single-page site
│   ├── layout.tsx            # Root layout with metadata/SEO
│   ├── globals.css           # Global styles + animations
│   ├── admin/                # Admin panel pages
│   │   ├── page.tsx          # Dashboard
│   │   ├── rentals/          # Rental item management
│   │   ├── portfolio/        # Portfolio management
│   │   ├── enquiries/        # Enquiry viewer
│   │   └── settings/         # Site settings
│   └── api/
│       ├── auth/             # Admin login/logout
│       ├── contact/          # Contact form submission
│       └── enquiries/        # Rental enquiry submission
├── components/
│   ├── Navbar.tsx            # Sticky nav with enquiry badge
│   ├── Hero.tsx              # Full-screen hero section
│   ├── About.tsx             # Company story + offices
│   ├── Services.tsx          # Service cards grid
│   ├── Portfolio.tsx         # Filterable gallery + lightbox
│   ├── Rentals.tsx           # Full rental catalogue browser
│   ├── SocialFeed.tsx        # Instagram/Facebook feed
│   ├── Contact.tsx           # Contact form + info
│   ├── Footer.tsx            # Site footer
│   ├── WhatsAppButton.tsx    # Floating WhatsApp CTA
│   └── EnquiryDrawer.tsx     # Cart-like enquiry sidebar
├── data/                     # JSON seed data
│   ├── rental-items.json     # ~85 rental items from catalogue
│   ├── categories.json       # 13 categories
│   ├── services.json         # 8 service offerings
│   └── clients.json          # 24 client names
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   ├── utils.ts              # Helper functions
│   ├── supabase.ts           # Supabase client config
│   └── enquiry-store.ts      # Client-side enquiry state
└── supabase/
    ���── schema.sql            # Full database schema
```

## Deployment Steps

### 1. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor → paste contents of `supabase/schema.sql` → Run
3. Copy your project URL and keys from Settings → API

### 2. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_JWT_SECRET=generate-a-random-string-here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL_TO=gary@more2xplore.co.za,roxy@more2xplore.co.za
NEXT_PUBLIC_WHATSAPP_NUMBER=27835160242
NEXT_PUBLIC_SITE_URL=https://more2xplore.co.za
```

### 3. Deploy to Vercel

1. Push to GitHub
2. Import in [vercel.com](https://vercel.com)
3. Add all env vars from `.env.local`
4. Deploy

### 4. DNS

Point `more2xplore.co.za` to Vercel:
- Add domain in Vercel project settings
- Update DNS A/CNAME records with your registrar

## Current State

The frontend is fully built and functional with JSON data files. To enable full admin CRUD operations:

1. Connect Supabase (update API routes to use `getServiceSupabase()` instead of JSON imports)
2. Wire up admin forms to Supabase mutations
3. Add image upload to Cloudinary or Supabase Storage
4. Replace social feed placeholders with chosen embed widget

## Admin Panel

Access at `/admin`. Default login:
- Email: gary@more2xplore.co.za
- Password: m2xadmin2024

**Change the password immediately after first login.**

## Social Feed Setup

Replace the placeholder in `SocialFeed.tsx` with your chosen widget:
- [Behold](https://behold.so) — recommended, free tier available
- [Elfsight](https://elfsight.com) — free tier, 200 views/month
- [EmbedSocial](https://embedsocial.com) — free trial
