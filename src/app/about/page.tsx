import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Website Walae | Digital Creative Agency in Lucknow",
  description: "Website Walae is a digital creative agency based in Lucknow. We combine design, technology, content, and marketing to build ecosystems that generate real business growth.",
  keywords: ["About Website Walae", "Digital Creative Agency Lucknow", "About Us", "Creative Agency"],
  alternates: {
    canonical: "https://websitewalae.com/about",
  },
  openGraph: {
    title: "About Website Walae | Digital Creative Agency in Lucknow",
    description: "Website Walae is a digital creative agency based in Lucknow. We combine design, technology, content, and marketing to build ecosystems that generate real business growth.",
    url: "https://websitewalae.com/about",
    siteName: "Website Walae",
    locale: "en_IN",
    type: "website",
    images: ["https://websitewalae.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Website Walae | Digital Creative Agency in Lucknow",
    description: "Website Walae is a digital creative agency based in Lucknow.",
    images: ["https://websitewalae.com/og-image.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutPageClient />
    </>
  );
}
