import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Navigation from "@/components/layout/Navigation";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Website Walae | Top Digital Creative Agency & Web Development",
  description: "Website Walae is a premium digital creative agency specializing in Web Development, UI/UX Design, SEO, Social Media Marketing, and Video Production. Your complete digital growth partner.",
  keywords: [
    "Website Walae",
    "Digital Creative Agency",
    "Web Development Agency",
    "UI/UX Design",
    "SEO Services",
    "Social Media Marketing",
    "Video Editing",
    "Reel Production",
    "Digital Marketing Agency Lucknow",
    "E-commerce Solutions",
    "Lead Generation",
    "Brand Growth",
    "Best marketing agency"
  ],
  authors: [{ name: "Website Walae" }],
  creator: "Website Walae",
  publisher: "Website Walae",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Website Walae | Digital Creative Agency",
    description: "We Build. We Create. We Grow. Transform your brand with our premium web development, design, and marketing services.",
    url: "https://websitewalae.com",
    siteName: "Website Walae",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Walae | Digital Creative Agency",
    description: "We Build. We Create. We Grow. Transform your brand with our premium digital services.",
    creator: "@websitewalae",
  },
  alternates: {
    canonical: "https://websitewalae.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// AEO & GEO structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "name": "Website Walae",
  "url": "https://websitewalae.com",
  "logo": "https://websitewalae.com/wp-content/uploads/2025/01/cropped-cropped-Untitled-design-6.png",
  "description": "Website Walae is a full-service digital creative agency delivering 25+ services across 12+ industries. We specialize in web development, UI/UX design, SEO, social media marketing, and content creation.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Halwasiya Market",
    "addressLocality": "Hazratganj",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "226001",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://instagram.com/websitewalae",
    "https://linkedin.com/company/websitewalae",
    "https://facebook.com/websitewalae"
  ],
  "knowsAbout": [
    "Web Development",
    "Search Engine Optimization (SEO)",
    "Social Media Marketing",
    "UI/UX Design",
    "Video Production",
    "E-commerce Development"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-brand-bg text-brand-text">
        <SmoothScroll>
          <CustomCursor />
          <Navigation />
          <main className="relative">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
