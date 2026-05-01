-- More2Xplore Event Solutions — Database Schema
-- Run this against your Supabase PostgreSQL database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- RENTAL ITEMS
-- ============================================================
CREATE TABLE rental_items (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  name TEXT NOT NULL,
  category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  price NUMERIC(10,2),
  price_type TEXT NOT NULL DEFAULT 'fixed' CHECK (price_type IN ('fixed', 'from', 'on_request')),
  description TEXT,
  colours TEXT[],
  material TEXT,
  quantity INTEGER,
  dimensions TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_rental_items_category ON rental_items(category_id);
CREATE INDEX idx_rental_items_active ON rental_items(is_active);
CREATE INDEX idx_rental_items_featured ON rental_items(is_featured);

-- ============================================================
-- RENTAL ITEM IMAGES
-- ============================================================
CREATE TABLE rental_item_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rental_item_id TEXT REFERENCES rental_items(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_rental_images_item ON rental_item_images(rental_item_id);

-- ============================================================
-- PORTFOLIO ITEMS
-- ============================================================
CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  client_name TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ENQUIRIES
-- ============================================================
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL DEFAULT 'contact' CHECK (type IN ('contact', 'rental')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  event_type TEXT,
  event_date DATE,
  message TEXT,
  items JSONB, -- for rental enquiries: [{id, name, quantity, price}]
  is_read BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_enquiries_read ON enquiries(is_read);
CREATE INDEX idx_enquiries_type ON enquiries(type);
CREATE INDEX idx_enquiries_created ON enquiries(created_at DESC);

-- ============================================================
-- ADMIN USERS
-- ============================================================
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SITE SETTINGS (key-value store)
-- ============================================================
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CLIENT LOGOS
-- ============================================================
CREATE TABLE client_logos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AUTO-UPDATE TIMESTAMPS
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_rental_items_updated
  BEFORE UPDATE ON rental_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_categories_updated
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_portfolio_updated
  BEFORE UPDATE ON portfolio_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_settings_updated
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (enable for Supabase)
-- ============================================================
ALTER TABLE rental_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_item_images ENABLE ROW LEVEL SECURITY;

-- Public read access for frontend
CREATE POLICY "Public read rental items" ON rental_items
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public read portfolio" ON portfolio_items
  FOR SELECT USING (true);

CREATE POLICY "Public read client logos" ON client_logos
  FOR SELECT USING (true);

CREATE POLICY "Public read rental images" ON rental_item_images
  FOR SELECT USING (true);

-- Service role has full access (for admin operations via API routes)
-- Supabase service_role key bypasses RLS by default

-- ============================================================
-- SEED DEFAULT SETTINGS
-- ============================================================
INSERT INTO site_settings (key, value) VALUES
  ('company_info', '{"email1": "gary@more2xplore.co.za", "email2": "roxy@more2xplore.co.za", "phone1": "083 516 02 42", "phone2": "084 407 3494", "whatsapp": "27835160242"}'),
  ('social_links', '{"instagram": "https://www.instagram.com/m2xplore/", "facebook": "https://www.facebook.com/MORE2XPLORE/", "twitter": "https://twitter.com/more2xplore"}'),
  ('hero', '{"headline": "Event Solutions. Equipment Rental. Nationwide.", "subheading": "From concept to execution — corporate events, brand activations, and equipment hire across South Africa since 2007."}'),
  ('offices', '[{"city": "Cape Town", "label": "Head Office", "address": "1830 Capricorn Crescent, Capricorn Business Park, Muizenberg"}, {"city": "Johannesburg", "label": "Gauteng Office", "address": "Unit 3 Bronze Business Park, Brons Crescent, Clayville"}, {"city": "Durban", "label": "KZN Office", "address": "Unit 4, 769 Marine Drive, Bluff"}]')
ON CONFLICT (key) DO NOTHING;
