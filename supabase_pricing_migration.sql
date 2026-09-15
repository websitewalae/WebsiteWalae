-- =========================================================================
-- WEBSITE WALAE — PRICING TABLE MIGRATION
-- Run this in Supabase SQL Editor to extend the packages table
-- =========================================================================

-- Add new columns to the existing packages table
ALTER TABLE public.packages
  ADD COLUMN IF NOT EXISTS service_name TEXT,
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general',
  ADD COLUMN IF NOT EXISTS starting_price TEXT,
  ADD COLUMN IF NOT EXISTS pricing_label TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS cta_text TEXT DEFAULT 'Select Plan',
  ADD COLUMN IF NOT EXISTS cta_link TEXT DEFAULT '/start-a-project',
  ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Migrate existing data: copy 'name' to 'service_name' and 'price' to 'starting_price'
UPDATE public.packages SET service_name = name WHERE service_name IS NULL;
UPDATE public.packages SET starting_price = price WHERE starting_price IS NULL;
UPDATE public.packages SET pricing_label = 
  CASE 
    WHEN price LIKE '%Custom%' THEN 'Custom Quote'
    ELSE 'Starting From'
  END
WHERE pricing_label IS NULL;

-- Create index for display ordering
CREATE INDEX IF NOT EXISTS idx_packages_display_order ON public.packages(display_order);
CREATE INDEX IF NOT EXISTS idx_packages_active ON public.packages(active);
