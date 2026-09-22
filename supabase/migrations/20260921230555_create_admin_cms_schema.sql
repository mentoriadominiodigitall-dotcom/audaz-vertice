/*
# Audaz Vértice Digital — Admin CMS Schema

This migration creates the complete database schema for a fully admin-manageable website.
All site content (company info, services, products, cases, testimonials, FAQ, blog, etc.)
is stored in the database and editable through an admin panel at /admin.

## Tables Created

1. **site_config** — single-row table for company info (name, phone, email, social links, address, hours, slogan, description, logo URLs, favicon)
2. **hero_config** — hero section content (title, subtitle, description, button labels/links, background image/video URL, overlay opacity)
3. **section_config** — per-section settings (title, subtitle, description, enabled toggle, order) for all main sections
4. **nav_links** — navigation menu items (label, href, order, enabled)
5. **stats** — homepage statistics (value, label, order)
6. **values** — about section values cards (icon name, title, text, order)
7. **diferenciais** — differentials cards (icon name, title, text, order)
8. **services** — services with icon, title, description, image, features array, slug, order
9. **products** — products with title, category, price, description, image, status, order
10. **process_steps** — process timeline steps (number, title, text, order)
11. **cases** — case studies (client, description, image, results JSONB, tags array, order)
12. **testimonials** — testimonials (name, role, company, text, photo, rating, order)
13. **faq_items** — FAQ entries (question, answer, category, order)
14. **blog_posts** — blog articles (title, excerpt, content, category, author, date, read_time, image, slug, published)
15. **partners** — partner names (name, order)
16. **messages** — contact form submissions (name, email, company, message, responded flag, created_at)
17. **seo_settings** — SEO config (meta title, description, keywords, OG image, robots, canonical, schema.org JSON)
18. **analytics_settings** — analytics config (GA4 ID, GTM ID, Meta Pixel ID, Microsoft Clarity ID)
19. **theme_settings** — color and font configuration (primary, secondary, accent, button, title, text, link, card, background, hover colors + font family/weight/size settings)
20. **admin_profile** — admin profile display info (name, avatar URL)

## Security

- RLS enabled on ALL tables.
- Public read access (anon + authenticated) on all content tables so the website can display without login.
- Write access restricted to authenticated users only (admin must be logged in).
- Messages table: public can INSERT (contact form), only authenticated can SELECT/UPDATE/DELETE.
- A default admin user is NOT created here — the admin signs up via the /admin auth flow.

## Notes

1. All content tables use `TO anon, authenticated` for SELECT since the public site needs to read them.
2. Write operations are `TO authenticated` only.
3. The `messages` table allows anon INSERT so the contact form works without login.
4. All tables have `created_at` and `updated_at` timestamps.
5. `position` / `order` integer columns control display ordering.
6. `enabled` boolean columns allow toggling visibility of sections and nav items.
*/

-- ============================================================
-- site_config — single-row company info
-- ============================================================
CREATE TABLE IF NOT EXISTS site_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL DEFAULT 'Audaz Vértice Digital',
  description text NOT NULL DEFAULT 'Somos uma empresa especializada em fortalecer a presença digital de empresas através de estratégia, design, tecnologia e marketing.',
  slogan text NOT NULL DEFAULT 'Estratégia · Design · Tecnologia · Marketing',
  phone text NOT NULL DEFAULT '+55 21 99024-1155',
  whatsapp text NOT NULL DEFAULT '+55 21 99024-1155',
  email text NOT NULL DEFAULT 'Suporte.Audaz@Outlook.com',
  instagram text NOT NULL DEFAULT 'https://www.instagram.com/audaz_vertice',
  facebook text NOT NULL DEFAULT '',
  linkedin text NOT NULL DEFAULT '',
  tiktok text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT 'Rio de Janeiro, Brasil',
  hours text NOT NULL DEFAULT 'Seg — Sex: 09h às 18h',
  logo_light text NOT NULL DEFAULT '',
  logo_dark text NOT NULL DEFAULT '',
  favicon text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_site_config" ON site_config;
CREATE POLICY "public_read_site_config" ON site_config FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_site_config" ON site_config;
CREATE POLICY "auth_update_site_config" ON site_config FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_site_config" ON site_config;
CREATE POLICY "auth_insert_site_config" ON site_config FOR INSERT
  TO authenticated WITH CHECK (true);

-- ============================================================
-- hero_config — hero section content
-- ============================================================
CREATE TABLE IF NOT EXISTS hero_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_line1 text NOT NULL DEFAULT 'Transformamos',
  title_line2 text NOT NULL DEFAULT 'marcas audaciosas',
  title_line3 text NOT NULL DEFAULT 'em referências digitais.',
  subtitle text NOT NULL DEFAULT 'Estratégia · Design · Tecnologia · Marketing',
  description text NOT NULL DEFAULT 'Somos uma empresa especializada em fortalecer a presença digital de empresas através de estratégia, design, tecnologia e marketing.',
  button1_label text NOT NULL DEFAULT 'Comece seu projeto',
  button1_link text NOT NULL DEFAULT '#contato',
  button2_label text NOT NULL DEFAULT 'Conheça serviços',
  button2_link text NOT NULL DEFAULT '#servicos',
  background_type text NOT NULL DEFAULT 'image',
  background_url text NOT NULL DEFAULT 'https://images.pexels.com/photos/18545023/pexels-photo-18545023.jpeg?auto=compress&cs=tinysrgb&w=1920',
  overlay_opacity numeric NOT NULL DEFAULT 0.8,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE hero_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_hero_config" ON hero_config;
CREATE POLICY "public_read_hero_config" ON hero_config FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_hero_config" ON hero_config;
CREATE POLICY "auth_write_hero_config" ON hero_config FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_hero_config" ON hero_config;
CREATE POLICY "auth_insert_hero_config" ON hero_config FOR INSERT
  TO authenticated WITH CHECK (true);

-- ============================================================
-- section_config — per-section settings
-- ============================================================
CREATE TABLE IF NOT EXISTS section_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL UNIQUE,
  section_label text NOT NULL,
  title text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  enabled boolean NOT NULL DEFAULT true,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE section_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_section_config" ON section_config;
CREATE POLICY "public_read_section_config" ON section_config FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_section_config" ON section_config;
CREATE POLICY "auth_write_section_config" ON section_config FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_section_config" ON section_config;
CREATE POLICY "auth_insert_section_config" ON section_config FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_section_config" ON section_config;
CREATE POLICY "auth_delete_section_config" ON section_config FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- nav_links — navigation menu
-- ============================================================
CREATE TABLE IF NOT EXISTS nav_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  href text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE nav_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_nav_links" ON nav_links;
CREATE POLICY "public_read_nav_links" ON nav_links FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_nav_links" ON nav_links;
CREATE POLICY "auth_write_nav_links" ON nav_links FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_nav_links" ON nav_links;
CREATE POLICY "auth_insert_nav_links" ON nav_links FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_nav_links" ON nav_links;
CREATE POLICY "auth_delete_nav_links" ON nav_links FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- stats — homepage statistics
-- ============================================================
CREATE TABLE IF NOT EXISTS stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value text NOT NULL,
  label text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_stats" ON stats;
CREATE POLICY "public_read_stats" ON stats FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_stats" ON stats;
CREATE POLICY "auth_write_stats" ON stats FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_stats" ON stats;
CREATE POLICY "auth_insert_stats" ON stats FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_stats" ON stats;
CREATE POLICY "auth_delete_stats" ON stats FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- values — about section values
-- ============================================================
CREATE TABLE IF NOT EXISTS values (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Target',
  title text NOT NULL,
  text text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE values ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_values" ON values;
CREATE POLICY "public_read_values" ON values FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_values" ON values;
CREATE POLICY "auth_write_values" ON values FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_values" ON values;
CREATE POLICY "auth_insert_values" ON values FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_values" ON values;
CREATE POLICY "auth_delete_values" ON values FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- diferenciais — differentials cards
-- ============================================================
CREATE TABLE IF NOT EXISTS diferenciais (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Zap',
  title text NOT NULL,
  text text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE diferenciais ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_diferenciais" ON diferenciais;
CREATE POLICY "public_read_diferenciais" ON diferenciais FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_diferenciais" ON diferenciais;
CREATE POLICY "auth_write_diferenciais" ON diferenciais FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_diferenciais" ON diferenciais;
CREATE POLICY "auth_insert_diferenciais" ON diferenciais FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_diferenciais" ON diferenciais;
CREATE POLICY "auth_delete_diferenciais" ON diferenciais FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- services — services with features
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Search',
  title text NOT NULL,
  description text NOT NULL,
  image text NOT NULL DEFAULT '',
  features text[] NOT NULL DEFAULT '{}',
  slug text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_services" ON services;
CREATE POLICY "public_read_services" ON services FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_services" ON services;
CREATE POLICY "auth_write_services" ON services FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_services" ON services;
CREATE POLICY "auth_insert_services" ON services FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_services" ON services;
CREATE POLICY "auth_delete_services" ON services FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- products — products with price and category
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'active',
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_products" ON products;
CREATE POLICY "auth_write_products" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_products" ON products;
CREATE POLICY "auth_insert_products" ON products FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_products" ON products;
CREATE POLICY "auth_delete_products" ON products FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- process_steps — process timeline
-- ============================================================
CREATE TABLE IF NOT EXISTS process_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text NOT NULL,
  title text NOT NULL,
  text text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_process_steps" ON process_steps;
CREATE POLICY "public_read_process_steps" ON process_steps FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_process_steps" ON process_steps;
CREATE POLICY "auth_write_process_steps" ON process_steps FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_process_steps" ON process_steps;
CREATE POLICY "auth_insert_process_steps" ON process_steps FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_process_steps" ON process_steps;
CREATE POLICY "auth_delete_process_steps" ON process_steps FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- cases — case studies with results JSONB
-- ============================================================
CREATE TABLE IF NOT EXISTS cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client text NOT NULL,
  description text NOT NULL,
  image text NOT NULL DEFAULT '',
  results jsonb NOT NULL DEFAULT '[]',
  tags text[] NOT NULL DEFAULT '{}',
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_cases" ON cases;
CREATE POLICY "public_read_cases" ON cases FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_cases" ON cases;
CREATE POLICY "auth_write_cases" ON cases FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_cases" ON cases;
CREATE POLICY "auth_insert_cases" ON cases FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_cases" ON cases;
CREATE POLICY "auth_delete_cases" ON cases FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- testimonials — client testimonials
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '',
  text text NOT NULL,
  photo text NOT NULL DEFAULT '',
  rating integer NOT NULL DEFAULT 5,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_testimonials" ON testimonials;
CREATE POLICY "public_read_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_testimonials" ON testimonials;
CREATE POLICY "auth_write_testimonials" ON testimonials FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_testimonials" ON testimonials;
CREATE POLICY "auth_insert_testimonials" ON testimonials FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_testimonials" ON testimonials;
CREATE POLICY "auth_delete_testimonials" ON testimonials FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- faq_items — FAQ entries
-- ============================================================
CREATE TABLE IF NOT EXISTS faq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL DEFAULT 'Geral',
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_faq_items" ON faq_items;
CREATE POLICY "public_read_faq_items" ON faq_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_faq_items" ON faq_items;
CREATE POLICY "auth_write_faq_items" ON faq_items FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_faq_items" ON faq_items;
CREATE POLICY "auth_insert_faq_items" ON faq_items FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_faq_items" ON faq_items;
CREATE POLICY "auth_delete_faq_items" ON faq_items FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- blog_posts — blog articles
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT 'Equipe Audaz',
  publish_date date,
  read_time text NOT NULL DEFAULT '5 min',
  image text NOT NULL DEFAULT '',
  slug text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT true,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_blog_posts" ON blog_posts;
CREATE POLICY "public_read_blog_posts" ON blog_posts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_blog_posts" ON blog_posts;
CREATE POLICY "auth_write_blog_posts" ON blog_posts FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_blog_posts" ON blog_posts;
CREATE POLICY "auth_insert_blog_posts" ON blog_posts FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_blog_posts" ON blog_posts;
CREATE POLICY "auth_delete_blog_posts" ON blog_posts FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- partners — partner names for marquee
-- ============================================================
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_partners" ON partners;
CREATE POLICY "public_read_partners" ON partners FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_partners" ON partners;
CREATE POLICY "auth_write_partners" ON partners FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_partners" ON partners;
CREATE POLICY "auth_insert_partners" ON partners FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_partners" ON partners;
CREATE POLICY "auth_delete_partners" ON partners FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- messages — contact form submissions
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL DEFAULT '',
  message text NOT NULL,
  responded boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Public can INSERT (contact form) but NOT read
DROP POLICY IF EXISTS "public_insert_messages" ON messages;
CREATE POLICY "public_insert_messages" ON messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Only authenticated can read, update, delete messages
DROP POLICY IF EXISTS "auth_read_messages" ON messages;
CREATE POLICY "auth_read_messages" ON messages FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_messages" ON messages;
CREATE POLICY "auth_update_messages" ON messages FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_messages" ON messages;
CREATE POLICY "auth_delete_messages" ON messages FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- seo_settings — SEO configuration
-- ============================================================
CREATE TABLE IF NOT EXISTS seo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meta_title text NOT NULL DEFAULT 'Audaz Vértice Digital | Estratégia, Design e Tecnologia',
  meta_description text NOT NULL DEFAULT 'Fortalecemos a presença digital de empresas através de estratégia, design, tecnologia e marketing.',
  keywords text NOT NULL DEFAULT 'agência digital, marketing digital, web design, branding, SEO',
  og_image text NOT NULL DEFAULT '',
  og_type text NOT NULL DEFAULT 'website',
  twitter_card text NOT NULL DEFAULT 'summary_large_image',
  robots text NOT NULL DEFAULT 'index, follow',
  canonical text NOT NULL DEFAULT 'https://audazverticedigital.com.br',
  schema_org jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_seo_settings" ON seo_settings;
CREATE POLICY "public_read_seo_settings" ON seo_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_seo_settings" ON seo_settings;
CREATE POLICY "auth_write_seo_settings" ON seo_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_seo_settings" ON seo_settings;
CREATE POLICY "auth_insert_seo_settings" ON seo_settings FOR INSERT
  TO authenticated WITH CHECK (true);

-- ============================================================
-- analytics_settings — analytics configuration
-- ============================================================
CREATE TABLE IF NOT EXISTS analytics_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ga4_id text NOT NULL DEFAULT '',
  gtm_id text NOT NULL DEFAULT '',
  meta_pixel_id text NOT NULL DEFAULT '',
  microsoft_clarity_id text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_analytics_settings" ON analytics_settings;
CREATE POLICY "public_read_analytics_settings" ON analytics_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_analytics_settings" ON analytics_settings;
CREATE POLICY "auth_write_analytics_settings" ON analytics_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_analytics_settings" ON analytics_settings;
CREATE POLICY "auth_insert_analytics_settings" ON analytics_settings FOR INSERT
  TO authenticated WITH CHECK (true);

-- ============================================================
-- theme_settings — color and font configuration
-- ============================================================
CREATE TABLE IF NOT EXISTS theme_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  color_primary text NOT NULL DEFAULT '#D90429',
  color_secondary text NOT NULL DEFAULT '#FFC300',
  color_accent text NOT NULL DEFAULT '#10B981',
  color_button text NOT NULL DEFAULT '#10B981',
  color_button_hover text NOT NULL DEFAULT '#34d399',
  color_title text NOT NULL DEFAULT '#F5F5F5',
  color_text text NOT NULL DEFAULT '#b5b5b5',
  color_link text NOT NULL DEFAULT '#F5F5F5',
  color_card text NOT NULL DEFAULT '#111111',
  color_background text NOT NULL DEFAULT '#050505',
  color_hover text NOT NULL DEFAULT '#D90429',
  font_display text NOT NULL DEFAULT 'Space Grotesk',
  font_body text NOT NULL DEFAULT 'Inter',
  font_base_size text NOT NULL DEFAULT '16px',
  font_heading_weight text NOT NULL DEFAULT '700',
  font_body_weight text NOT NULL DEFAULT '400',
  font_heading_line_height text NOT NULL DEFAULT '1.1',
  font_body_line_height text NOT NULL DEFAULT '1.6',
  font_letter_spacing text NOT NULL DEFAULT '-0.02em',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_theme_settings" ON theme_settings;
CREATE POLICY "public_read_theme_settings" ON theme_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_write_theme_settings" ON theme_settings;
CREATE POLICY "auth_write_theme_settings" ON theme_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_theme_settings" ON theme_settings;
CREATE POLICY "auth_insert_theme_settings" ON theme_settings FOR INSERT
  TO authenticated WITH CHECK (true);

-- ============================================================
-- admin_profile — admin display info
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT 'Administrador',
  avatar_url text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_profile ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "auth_read_admin_profile" ON admin_profile;
CREATE POLICY "auth_read_admin_profile" ON admin_profile FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "auth_write_admin_profile" ON admin_profile;
CREATE POLICY "auth_write_admin_profile" ON admin_profile FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "auth_insert_admin_profile" ON admin_profile;
CREATE POLICY "auth_insert_admin_profile" ON admin_profile FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- Indexes for ordering
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_nav_links_position ON nav_links(position);
CREATE INDEX IF NOT EXISTS idx_stats_position ON stats(position);
CREATE INDEX IF NOT EXISTS idx_values_position ON values(position);
CREATE INDEX IF NOT EXISTS idx_diferenciais_position ON diferenciais(position);
CREATE INDEX IF NOT EXISTS idx_services_position ON services(position);
CREATE INDEX IF NOT EXISTS idx_products_position ON products(position);
CREATE INDEX IF NOT EXISTS idx_process_steps_position ON process_steps(position);
CREATE INDEX IF NOT EXISTS idx_cases_position ON cases(position);
CREATE INDEX IF NOT EXISTS idx_testimonials_position ON testimonials(position);
CREATE INDEX IF NOT EXISTS idx_faq_items_position ON faq_items(position);
CREATE INDEX IF NOT EXISTS idx_blog_posts_position ON blog_posts(position);
CREATE INDEX IF NOT EXISTS idx_partners_position ON partners(position);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- ============================================================
-- updated_at trigger function
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables
DO $$
DECLARE t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'site_config','hero_config','section_config','nav_links','stats','values',
    'diferenciais','services','products','process_steps','cases','testimonials',
    'faq_items','blog_posts','partners','messages','seo_settings',
    'analytics_settings','theme_settings','admin_profile'
  ])
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at ON %I', t);
    EXECUTE format('CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()', t);
  END LOOP;
END;
$$;
