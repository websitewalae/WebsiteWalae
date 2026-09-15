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
      <section className="sr-only-seo" aria-label="About Website Walae Entity">
        <h1>About Website Walae - Digital Marketing & Creative Agency</h1>
        <p>
          Website Walae is a premium digital marketing and creative agency based in Lucknow, Uttar Pradesh. 
          Founded on the principle of bridging high-end cinematic aesthetics with cutting-edge engineering and data-driven marketing, 
          Website Walae serves as a full-stack digital creative studio for ambitious brands across India.
        </p>
        <h2>Our Core Capabilities</h2>
        <ul>
          <li>Website Development (Next.js, React, WebGL)</li>
          <li>UI/UX Design (Figma Design Systems, Prototyping)</li>
          <li>Search Engine Optimization (SEO) & AEO</li>
          <li>Social Media Marketing & Growth</li>
          <li>Content Creation (Photography, Copywriting)</li>
          <li>Video Production (Cinematic 4K Commercials)</li>
          <li>Meta Ads & Paid Acquisition (Performance Marketing)</li>
          <li>PR / Public Relations & Brand Authority</li>
        </ul>
        <h2>Company Details</h2>
        <p><strong>Headquarters:</strong> Hazratganj, Lucknow, Uttar Pradesh 226001, India</p>
        <p><strong>Phone:</strong> +91 73177 82998</p>
        <p><strong>Email:</strong> websitewalae@gmail.com</p>
        <p><strong>Mission:</strong> To build digital ecosystems that generate real business growth through attention engineering and spatial architecture.</p>
      </section>
      <AboutPageClient />
    </>
  );
}
