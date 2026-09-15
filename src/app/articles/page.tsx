import type { Metadata } from "next";
import { getArticles } from "@/lib/articles";
import ArticlesClient from "./ArticlesClient";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, BookOpen, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Articles & Digital Insights - Lucknow & India Agency",
  description: "Read authoritative articles, case studies, and engineering playbooks on website development, SEO, viral Instagram reels, and AI search engines in Lucknow and across India.",
  keywords: [
    "Website Walae Articles",
    "Digital Marketing Agency in Lucknow Blog",
    "Web Development Company Lucknow Insights",
    "Best SEO Company in Lucknow",
    "Social Media Marketing Agency India",
    "Google Discover Ranking Playbook",
    "Next.js Development Lucknow",
    "Meta Ads Strategy India"
  ],
  alternates: {
    canonical: "https://websitewalae.com/articles",
  },
  openGraph: {
    title: "Articles & Digital Insights - Lucknow & India Agency",
    description: "Read authoritative articles, case studies, and engineering playbooks on website development, SEO, viral Instagram reels, and AI search engines in Lucknow and across India.",
    url: "https://websitewalae.com/articles",
    siteName: "Website Walae",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://websitewalae.com/images/tech_hero_bg.jpg",
        width: 1200,
        height: 675,
        alt: "Website Walae Articles & Digital Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles & Digital Insights",
    description: "Read authoritative articles, case studies, and engineering playbooks on website development, SEO, viral Instagram reels, and AI search engines in Lucknow and across India.",
    images: ["https://websitewalae.com/images/tech_hero_bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  // Structured Data for Google Search & Discover
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Website Walae Digital Insights & Articles",
    "description": "Authoritative insights, engineering guides, and digital marketing strategies for ambitious businesses in Lucknow and across India.",
    "url": "https://websitewalae.com/articles",
    "publisher": {
      "@type": "Organization",
      "name": "Website Walae",
      "logo": "https://websitewalae.com/logo.png"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": articles.map((article, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://websitewalae.com/articles/${article.slug}`,
        "name": article.title
      }))
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-brand-text flex flex-col justify-between pt-24 sm:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-16 max-w-7xl mx-auto text-center flex flex-col items-center">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-accent/10 rounded-full blur-[140px] pointer-events-none -z-10" />

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-brand-accent mb-6 uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-brand-accent" />
            <span>Lucknow &amp; All-India Digital Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight uppercase max-w-4xl leading-tight mb-6">
            Insights &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-text-secondary">
              Digital Articles
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-brand-text-secondary max-w-2xl mx-auto leading-relaxed">
            Actionable playbooks on next-generation web engineering, high-ranking SEO algorithms, viral reel marketing, and AI engine optimization crafted for ambitious brands in Lucknow and across India.
          </p>
        </section>

        {/* Dynamic Articles Listing Component */}
        <ArticlesClient initialArticles={articles} />

        {/* Conversion CTA Strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
          <div className="bg-gradient-to-r from-brand-accent/10 via-white/5 to-brand-accent/10 border border-brand-accent/30 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-accent mb-2 uppercase tracking-widest">
                <BookOpen className="w-4 h-4" />
                <span>Need Custom Growth Strategy?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Turn Traffic Into Customers In Lucknow &amp; Beyond.
              </h2>
              <p className="text-xs sm:text-sm text-brand-text-secondary mt-2 max-w-xl">
                We combine Next.js engineering with viral content and targeted Meta ads to help your business dominate its industry.
              </p>
            </div>

            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-black font-bold text-sm sm:text-base tracking-wide transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(202,255,0,0.4)] hover:scale-105 shrink-0"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
