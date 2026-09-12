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
  title: "Website Walae | Digital Marketing Agency in Lucknow",
  description: "Website Walae is a digital marketing and creative agency in Lucknow offering website development, UI/UX design, SEO, social media marketing, content creation, video production and Meta Ads.",
  keywords: [
    "Website Walae",
    "Digital Creative Agency Lucknow",
    "Web Development Agency",
    "Best Digital Marketing Agency in Lucknow",
    "UI/UX Design Lucknow",
    "SEO Services Lucknow",
    "Social Media Marketing",
    "Video Editing & Reels",
    "Meta Ads Agency Lucknow",
    "E-commerce Development",
    "Lead Generation Lucknow"
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
    title: "Website Walae | Digital Marketing Agency in Lucknow",
    description: "Website Walae is a digital marketing and creative agency in Lucknow offering website development, UI/UX design, SEO, social media marketing, content creation, video production and Meta Ads.",
    url: "https://websitewalae.com",
    siteName: "Website Walae",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Walae | Digital Marketing Agency in Lucknow",
    description: "Website Walae is a digital marketing and creative agency in Lucknow offering website development, UI/UX design, SEO, social media marketing, content creation, video production and Meta Ads.",
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
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

// AEO & GEO structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "name": "Website Walae",
  "url": "https://websitewalae.com",
  "logo": "https://websitewalae.com/logo.png",
  "description": "Website Walae is a digital marketing and creative agency in Lucknow offering website development, UI/UX design, SEO, social media marketing, content creation, video production and Meta Ads.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Halwasiya Market",
    "addressLocality": "Hazratganj",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "226001",
    "addressCountry": "IN"
  },
  "telephone": "+917317782998",
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
    "Meta Ads & Digital Marketing"
  ]
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
