import type { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Website Walae | Pricing",
  description: "Transparent, value-driven pricing for website development, SEO, social media marketing, and digital creative services.",
  keywords: ["Digital Marketing Pricing", "Web Development Cost India", "SEO Packages Lucknow", "Social Media Management Pricing"],
};

export default function PricingPage() {
  return <PricingPageClient />;
}
