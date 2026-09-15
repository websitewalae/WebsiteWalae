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
  metadataBase: new URL("https://websitewalae.com"),
  title: {
    default: "Website Walae | Best Digital Marketing Agency in Lucknow",
    template: "%s | Website Walae",
  },
  description: "Website Walae is a digital marketing and creative agency in Lucknow offering website development, UI/UX design, SEO, social media marketing, content creation, video production, Meta Ads and PR.",
  keywords: [
    "Website Walae",
    "best digital marketing agency in Lucknow",
    "digital marketing company in Lucknow",
    "website development company in Lucknow",
    "UI/UX Design Lucknow",
    "SEO agency in Lucknow",
    "social media marketing agency in Lucknow",
    "video production company in Lucknow",
    "Meta Ads agency in Lucknow",
    "PR agency in Lucknow",
    "creative agency in Lucknow",
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
    title: "Website Walae | Best Digital Marketing Agency in Lucknow",
    description: "Website Walae is a digital marketing and creative agency in Lucknow offering website development, UI/UX design, SEO, social media marketing, content creation, video production, Meta Ads and PR.",
    url: "https://websitewalae.com",
    siteName: "Website Walae",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://websitewalae.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Website Walae — Best Digital Marketing Agency in Lucknow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Walae | Best Digital Marketing Agency in Lucknow",
    description: "Website Walae is a digital marketing and creative agency in Lucknow offering website development, UI/UX design, SEO, social media marketing, content creation, video production, Meta Ads and PR.",
    creator: "@websitewalae",
    images: ["https://websitewalae.com/og-image.png"],
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
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

// Enhanced AEO & GEO structured data — Organization + LocalBusiness
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": "https://websitewalae.com/#organization",
  "name": "Website Walae",
  "url": "https://websitewalae.com",
  "logo": "https://websitewalae.com/logo.png",
  "image": "https://websitewalae.com/og-image.png",
  "description": "Website Walae is a digital marketing and creative agency based in Lucknow, Uttar Pradesh, India. The agency provides website development, UI/UX design, SEO, social media marketing, content creation, video production, Meta Ads and public relations services.",
  "email": "websitewalae@gmail.com",
  "telephone": "+917317782998",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Halwasiya Market",
    "addressLocality": "Hazratganj",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "226001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 26.8467,
    "longitude": 80.9462
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Lucknow"
    },
    {
      "@type": "State",
      "name": "Uttar Pradesh"
    },
    {
      "@type": "Country",
      "name": "India"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/websitewalae/",
    "https://www.linkedin.com/company/websitewalae",
    "https://www.facebook.com/websitewalae"
  ],
  "knowsAbout": [
    "Website Development",
    "UI/UX Design",
    "Search Engine Optimization (SEO)",
    "Social Media Marketing",
    "Content Creation",
    "Video Production",
    "Meta Ads & Digital Marketing",
    "Public Relations (PR)",
    "Digital Marketing Strategy"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Marketing & Creative Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Marketing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Content Creation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Video Production" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Meta Ads" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Public Relations" } }
    ]
  }
};

// WebSite schema for sitelinks search
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Website Walae",
  "url": "https://websitewalae.com",
  "publisher": {
    "@type": "Organization",
    "name": "Website Walae",
    "logo": "https://websitewalae.com/logo.png"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://websitewalae.com/articles?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} dark overflow-x-hidden`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased bg-brand-bg text-brand-text min-h-screen overflow-x-hidden relative">
        <SmoothScroll>
          <CustomCursor />
          <Navigation />
          <div className="relative min-h-screen w-full overflow-x-hidden">{children}</div>
        </SmoothScroll>
        
        {/* Google Analytics Injection */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
