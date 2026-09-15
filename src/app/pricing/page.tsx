import type { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";
import { getPackages } from "@/lib/packages";

export const metadata: Metadata = {
  title: "Pricing & Packages | Website Walae Digital Agency",
  description: "Transparent, value-driven pricing for website development, SEO, social media marketing, and digital creative services.",
  keywords: ["Digital Marketing Pricing", "Web Development Cost India", "SEO Packages Lucknow", "Social Media Management Pricing"],
  alternates: {
    canonical: "https://websitewalae.com/pricing",
  },
  openGraph: {
    title: "Pricing & Packages | Website Walae Digital Agency",
    description: "Transparent, value-driven pricing for website development, SEO, social media marketing, and digital creative services.",
    url: "https://websitewalae.com/pricing",
    siteName: "Website Walae",
    locale: "en_IN",
    type: "website",
    images: ["https://websitewalae.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Packages | Website Walae Digital Agency",
    description: "Transparent, value-driven pricing for digital services.",
    images: ["https://websitewalae.com/og-image.png"],
  },
};

export default async function PricingPage() {
  const packages = await getPackages();
  return <PricingPageClient initialPackages={packages} />;
}
