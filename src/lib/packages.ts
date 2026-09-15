import { createClient } from "@supabase/supabase-js";

export interface PricingPackage {
  id: string;
  created_at: string;
  name: string;
  price: string;
  features: string[] | null;
  popular: boolean;
  service_name: string | null;
  slug: string | null;
  category: string | null;
  starting_price: string | null;
  pricing_label: string | null;
  description: string | null;
  cta_text: string | null;
  cta_link: string | null;
  display_order: number;
  active: boolean;
  updated_at: string | null;
}

// Default pricing for fallback when Supabase is unavailable
export const DEFAULT_PRICING: Omit<PricingPackage, "id" | "created_at" | "updated_at">[] = [
  {
    name: "Website Development",
    service_name: "Website Development",
    slug: "website-development",
    category: "DEVELOPMENT",
    price: "Starting from ₹15,000",
    starting_price: "₹15,000",
    pricing_label: "Starting From",
    description: "Custom websites built with modern technology, responsive design, and SEO-ready structure.",
    features: ["Custom websites", "Responsive design", "CMS / integrations", "SEO-ready structure"],
    popular: false,
    cta_text: "Select Plan",
    cta_link: "/start-a-project?service=Website+Development",
    display_order: 1,
    active: true,
  },
  {
    name: "Social Media Marketing",
    service_name: "Social Media Marketing",
    slug: "social-media",
    category: "MARKETING",
    price: "Starting from ₹15,000 / mo",
    starting_price: "₹15,000 / mo",
    pricing_label: "Starting From",
    description: "Strategic social media management with content creation, community engagement, and growth tracking.",
    features: ["Content strategy", "Creative posts", "Reels", "Monthly management"],
    popular: false,
    cta_text: "Select Plan",
    cta_link: "/start-a-project?service=Social+Media+Marketing",
    display_order: 2,
    active: true,
  },
  {
    name: "Video Production",
    service_name: "Video Production",
    slug: "video-production",
    category: "PRODUCTION",
    price: "Starting from ₹15,000",
    starting_price: "₹15,000",
    pricing_label: "Starting From",
    description: "Professional video content including reels, product videos, and commercial productions.",
    features: ["Reels", "Product videos", "Commercial content"],
    popular: false,
    cta_text: "Select Plan",
    cta_link: "/start-a-project?service=Video+Production",
    display_order: 3,
    active: true,
  },
  {
    name: "SEO",
    service_name: "SEO",
    slug: "seo",
    category: "MARKETING",
    price: "Starting from ₹15,000 / mo",
    starting_price: "₹15,000 / mo",
    pricing_label: "Starting From",
    description: "Comprehensive search engine optimization including technical SEO, on-page optimization, and content strategy.",
    features: ["Technical SEO", "On-page SEO", "Content strategy", "Search visibility"],
    popular: false,
    cta_text: "Select Plan",
    cta_link: "/start-a-project?service=SEO",
    display_order: 4,
    active: true,
  },
  {
    name: "Meta Ads",
    service_name: "Meta Ads",
    slug: "meta-ads",
    category: "MARKETING",
    price: "Starting from ₹15,000 / mo",
    starting_price: "₹15,000 / mo",
    pricing_label: "Starting From",
    description: "Facebook and Instagram advertising campaigns with audience targeting, creative testing, and lead generation.",
    features: ["Campaign setup", "Creative testing", "Audience targeting", "Lead generation"],
    popular: false,
    cta_text: "Select Plan",
    cta_link: "/start-a-project?service=Meta+Ads",
    display_order: 5,
    active: true,
  },
  {
    name: "UI / UX Design",
    service_name: "UI / UX Design",
    slug: "ui-ux-design",
    category: "DESIGN",
    price: "Custom Quote",
    starting_price: null,
    pricing_label: "Custom Quote",
    description: "Professional interface design with wireframes, prototypes, and design systems.",
    features: ["Wireframing", "Prototyping", "Design Systems", "User Journeys"],
    popular: false,
    cta_text: "Get a Quote",
    cta_link: "/start-a-project?service=UI+UX+Design",
    display_order: 6,
    active: true,
  },
  {
    name: "Content Creation",
    service_name: "Content Creation",
    slug: "content-creation",
    category: "PRODUCTION",
    price: "Custom Quote",
    starting_price: null,
    pricing_label: "Custom Quote",
    description: "Brand photography, copywriting, creative direction, and multi-format content production.",
    features: ["Copywriting", "Brand Photography", "Creative Direction", "Ad Creatives"],
    popular: false,
    cta_text: "Get a Quote",
    cta_link: "/start-a-project?service=Content+Creation",
    display_order: 7,
    active: true,
  },
  {
    name: "PR / Public Relations",
    service_name: "PR / Public Relations",
    slug: "pr",
    category: "MARKETING",
    price: "Custom Quote",
    starting_price: null,
    pricing_label: "Custom Quote",
    description: "Digital PR, media outreach, press releases, and online reputation management.",
    features: ["Brand PR Strategy", "Media Outreach", "Press Releases", "Reputation Management"],
    popular: false,
    cta_text: "Talk to Us",
    cta_link: "/start-a-project?service=PR",
    display_order: 8,
    active: true,
  },
];

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function getPackages(): Promise<PricingPackage[]> {
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as PricingPackage[];
      }
    }
  } catch (err) {
    console.error("Error fetching packages from Supabase:", err);
  }

  // Fallback to default pricing
  return DEFAULT_PRICING.map((pkg, i) => ({
    ...pkg,
    id: `default-${i}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })) as PricingPackage[];
}

export async function getAllPackages(): Promise<PricingPackage[]> {
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && data) {
        return data as PricingPackage[];
      }
    }
  } catch (err) {
    console.error("Error fetching all packages:", err);
  }
  return [];
}
