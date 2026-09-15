import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Digital Marketing & Creative Services | Website Walae Lucknow",
  description: "Explore our premium services including Website Development, UI/UX Design, SEO, Social Media Marketing, Content Creation, Video Production, PR, and Meta Ads.",
  keywords: ["Digital Marketing Services", "Web Development Agency", "UI UX Design", "SEO Services", "Video Production", "Meta Ads"],
  alternates: {
    canonical: "https://websitewalae.com/services",
  },
  openGraph: {
    title: "Digital Marketing & Creative Services | Website Walae Lucknow",
    description: "Explore our premium services including Website Development, UI/UX Design, SEO, Social Media Marketing, Content Creation, Video Production, PR, and Meta Ads.",
    url: "https://websitewalae.com/services",
    siteName: "Website Walae",
    locale: "en_IN",
    type: "website",
    images: ["https://websitewalae.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing & Creative Services | Website Walae Lucknow",
    description: "Explore our premium digital marketing and creative services.",
    images: ["https://websitewalae.com/og-image.png"],
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
