import type { Metadata } from "next";
import StartProjectClient from "./StartProjectClient";

export const metadata: Metadata = {
  title: "Start a Project with Website Walae | Digital Agency in Lucknow",
  description: "Start your next digital project with Website Walae. Tell us what you're building, and we'll figure out the rest.",
  keywords: ["Start a Project", "Hire Digital Agency", "Web Development Inquiry", "SEO Quote"],
  alternates: {
    canonical: "https://websitewalae.com/start-a-project",
  },
  openGraph: {
    title: "Start a Project with Website Walae | Digital Agency in Lucknow",
    description: "Start your next digital project with Website Walae. Tell us what you're building, and we'll figure out the rest.",
    url: "https://websitewalae.com/start-a-project",
    siteName: "Website Walae",
    locale: "en_IN",
    type: "website",
    images: ["https://websitewalae.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Start a Project with Website Walae | Digital Agency in Lucknow",
    description: "Start your next digital project with Website Walae.",
    images: ["https://websitewalae.com/og-image.png"],
  },
};

export default function StartProjectPage() {
  return <StartProjectClient />;
}
