import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Website Walae | Hire a Digital Agency in Lucknow",
  description: "Get in touch with Website Walae to discuss your next digital project. Call us directly at +91 7317782998 or start a project inquiry.",
  keywords: ["Contact Website Walae", "Digital Agency Contact", "Hire Web Developer Lucknow"],
  alternates: {
    canonical: "https://websitewalae.com/contact",
  },
  openGraph: {
    title: "Contact Website Walae | Hire a Digital Agency in Lucknow",
    description: "Get in touch with Website Walae to discuss your next digital project. Call us directly at +91 7317782998 or start a project inquiry.",
    url: "https://websitewalae.com/contact",
    siteName: "Website Walae",
    locale: "en_IN",
    type: "website",
    images: ["https://websitewalae.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Website Walae | Hire a Digital Agency in Lucknow",
    description: "Get in touch with Website Walae to discuss your next digital project.",
    images: ["https://websitewalae.com/og-image.png"],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
