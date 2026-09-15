import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Digital Marketing & Creative Services",
  description: "Website Walae provides end-to-end digital marketing and creative services in Lucknow including website development, UI/UX design, SEO, social media marketing, Meta Ads, video production, and PR.",
  keywords: ["Website Walae Services", "Digital Marketing Services Lucknow", "Website Development Lucknow", "SEO Services India"],
  alternates: {
    canonical: "https://websitewalae.com/services",
  },
  openGraph: {
    title: "Digital Marketing & Creative Services",
    description: "Website Walae provides end-to-end digital marketing and creative services in Lucknow including website development, UI/UX design, SEO, social media marketing, Meta Ads, video production, and PR.",
    url: "https://websitewalae.com/services",
    siteName: "Website Walae",
    locale: "en_IN",
    type: "website",
    images: ["https://websitewalae.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing & Creative Services",
    description: "Website Walae provides end-to-end digital marketing and creative services in Lucknow including website development, UI/UX design, SEO, social media marketing, Meta Ads, video production, and PR.",
    images: ["https://websitewalae.com/og-image.png"],
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
