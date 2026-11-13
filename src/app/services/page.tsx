import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Digital Marketing & Creative Services",
  description: "All Website Walae services in Lucknow: websites, UI/UX, SEO, social media, reels, video production, Meta Ads and PR. See what each includes and costs.",
  keywords: ["Website Walae Services", "Digital Marketing Services Lucknow", "Website Development Lucknow", "SEO Services India"],
  alternates: {
    canonical: "https://websitewalae.com/services",
  },
  openGraph: {
    title: "Digital Marketing & Creative Services",
    description: "All Website Walae services in Lucknow: websites, UI/UX, SEO, social media, reels, video production, Meta Ads and PR. See what each includes and costs.",
    url: "https://websitewalae.com/services",
    siteName: "Website Walae",
    locale: "en_IN",
    type: "website",
    images: ["https://websitewalae.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing & Creative Services",
    description: "All Website Walae services in Lucknow: websites, UI/UX, SEO, social media, reels, video production, Meta Ads and PR. See what each includes and costs.",
    images: ["https://websitewalae.com/og-image.png"],
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
