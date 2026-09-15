import type { Metadata } from "next";
import WorkPageClient from "./WorkPageClient";

export const metadata: Metadata = {
  title: "Work & Selected Projects",
  description: "Explore selected web development, branding, UI/UX design, and digital marketing projects crafted by Website Walae digital creative studio.",
  keywords: ["Website Walae Work", "Web Development Portfolio", "UI UX Design Projects", "Digital Marketing Case Studies Lucknow"],
  alternates: {
    canonical: "https://websitewalae.com/work",
  },
  openGraph: {
    title: "Work & Selected Projects",
    description: "Explore selected web development, branding, UI/UX design, and digital marketing projects crafted by Website Walae digital creative studio.",
    url: "https://websitewalae.com/work",
    siteName: "Website Walae",
    locale: "en_IN",
    type: "website",
    images: ["https://websitewalae.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work & Selected Projects",
    description: "Explore selected web development, branding, UI/UX design, and digital marketing projects crafted by Website Walae digital creative studio.",
    images: ["https://websitewalae.com/og-image.png"],
  },
};

export default function WorkPage() {
  return <WorkPageClient />;
}
