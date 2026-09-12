-- =========================================================================
-- WEBSITE WALAE — SUPABASE DATABASE SCHEMA SETUP SCRIPT
-- Run this script in your Supabase SQL Editor (Database -> SQL Editor)
-- =========================================================================

-- 1. CREATE ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  author TEXT DEFAULT 'Website Walae',
  content TEXT NOT NULL,
  seo_description TEXT,
  seo_keywords TEXT,
  geo_summary TEXT,
  aeo_faq JSONB,
  published BOOLEAN DEFAULT false
);

-- Enable Row Level Security (RLS) on Articles
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow public read access for articles" ON public.articles;
DROP POLICY IF EXISTS "Allow full access for authenticated users on articles" ON public.articles;

-- Allow public to read articles
CREATE POLICY "Allow public read access for articles"
  ON public.articles FOR SELECT
  USING (true);

-- Allow authenticated admins full access to articles
CREATE POLICY "Allow full access for authenticated users on articles"
  ON public.articles FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');


-- 2. CREATE PORTFOLIO TABLE
CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  link TEXT,
  featured BOOLEAN DEFAULT false
);

-- Enable RLS on Portfolio
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access for portfolio" ON public.portfolio;
DROP POLICY IF EXISTS "Allow full access for authenticated users on portfolio" ON public.portfolio;

CREATE POLICY "Allow public read access for portfolio"
  ON public.portfolio FOR SELECT
  USING (true);

CREATE POLICY "Allow full access for authenticated users on portfolio"
  ON public.portfolio FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');


-- 3. CREATE PACKAGES TABLE
CREATE TABLE IF NOT EXISTS public.packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  features JSONB,
  popular BOOLEAN DEFAULT false
);

-- Enable RLS on Packages
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access for packages" ON public.packages;
DROP POLICY IF EXISTS "Allow full access for authenticated users on packages" ON public.packages;

CREATE POLICY "Allow public read access for packages"
  ON public.packages FOR SELECT
  USING (true);

CREATE POLICY "Allow full access for authenticated users on packages"
  ON public.packages FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- =========================================================================
-- 4. GRANT ACCESS TO API ROLES (REQUIRED FOR SUPABASE CLIENT ACCESS)
-- =========================================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

