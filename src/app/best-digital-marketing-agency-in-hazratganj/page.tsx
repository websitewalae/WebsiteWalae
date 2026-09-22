import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, ArrowRight, Search, Share2, BarChart3, Globe, Palette, FileText, MapPin, Phone, Mail, CheckCircle2, Sparkles, TrendingUp, Users, Target, Eye, ShieldCheck, Clock, Calendar, ChevronDown } from "lucide-react";
import HazratganjFaqAccordion from "./HazratganjFaqAccordion";

/* ────────── SEO METADATA ────────── */
const PAGE_TITLE = "Best Digital Marketing Agency in Hazratganj – Website Walae";
const PAGE_DESC =
  "Looking for the best digital marketing agency in Hazratganj, Lucknow? Website Walae offers SEO, social media marketing, PPC ads, website design, content marketing & local business marketing. Get a free consultation today!";
const CANONICAL = "https://websitewalae.com/best-digital-marketing-agency-in-hazratganj";
const COVER_IMAGE = "/images/articles/hazratganj-digital-marketing.jpg";
const COVER_URL = `https://websitewalae.com${COVER_IMAGE}`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: [
    "best digital marketing agency in Hazratganj",
    "digital marketing company Hazratganj",
    "digital marketing agency Lucknow",
    "SEO agency Hazratganj",
    "social media marketing Hazratganj",
    "website design Hazratganj",
    "PPC advertising Lucknow",
    "Website Walae",
    "digital marketing near me Lucknow",
    "local SEO Hazratganj",
    "best SEO company Hazratganj Lucknow",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: CANONICAL,
    siteName: "Website Walae",
    type: "article",
    publishedTime: "2025-06-15T10:00:00Z",
    modifiedTime: new Date().toISOString(),
    authors: ["Website Walae"],
    images: [{ url: COVER_URL, width: 1200, height: 675, alt: "Best Digital Marketing Agency in Hazratganj – Website Walae" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: [COVER_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

/* ────────── JSON-LD STRUCTURED DATA ────────── */
const articleSchema = {
  "@context": "https://schema.org",
  "@type": ["Article", "BlogPosting"],
  headline: PAGE_TITLE,
  description: PAGE_DESC,
  image: [COVER_URL],
  datePublished: "2025-06-15T10:00:00Z",
  dateModified: new Date().toISOString(),
  mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
  author: { "@type": "Organization", name: "Website Walae", url: "https://websitewalae.com" },
  publisher: {
    "@type": "Organization",
    name: "Website Walae",
    url: "https://websitewalae.com",
    logo: { "@type": "ImageObject", url: "https://websitewalae.com/logo.png" },
  },
};

const faqData = [
  {
    question: "Which is the best digital marketing agency in Hazratganj, Lucknow?",
    answer:
      "Website Walae is widely recognized as the best digital marketing agency in Hazratganj, Lucknow. With a headquarters near Hazratganj and a strong track record of helping local businesses grow online, Website Walae offers end-to-end digital marketing services including SEO, social media marketing, PPC advertising, website development, and content marketing — all tailored to the Hazratganj market.",
  },
  {
    question: "What services do digital marketing agencies in Hazratganj offer?",
    answer:
      "Top digital marketing agencies in Hazratganj like Website Walae offer a comprehensive suite of services: Search Engine Optimization (SEO), Social Media Marketing (SMM) on Facebook, Instagram & LinkedIn, Google Ads & Meta Ads (PPC), responsive website design and development, content marketing (blogs, videos, infographics), local business marketing with Google Business Profile optimization, and brand strategy consulting.",
  },
  {
    question: "How do I choose the right digital marketing agency in Hazratganj?",
    answer:
      "Look for an agency with proven local market knowledge, transparent pricing, a diverse portfolio of Hazratganj-area clients, and monthly reporting with clear ROI metrics. Website Walae checks all these boxes — we understand Hazratganj's unique business culture, provide customized strategies (not cookie-cutter plans), and share detailed monthly performance reports so you always know how your campaigns are performing.",
  },
  {
    question: "Are digital marketing services in Hazratganj affordable for small businesses?",
    answer:
      "Yes! Website Walae offers flexible packages designed specifically for small businesses, startups, and local shops in Hazratganj. Our transparent pricing model means no hidden fees or surprise costs. We create customized plans that match your budget while still delivering measurable results — from basic social media management to full-funnel marketing strategies.",
  },
  {
    question: "Can a digital marketing agency help me grow my local business in Hazratganj?",
    answer:
      "Absolutely. Website Walae specializes in location-based marketing for Hazratganj businesses. Through local SEO, Google Business Profile optimization, hyper-targeted social media campaigns, and community engagement strategies, we have helped boutiques see 40% more footfalls, law firms generate repeat client leads, and coaching centers double their enrollment — all within 3 months.",
  },
  {
    question: "How long does it take to see results from digital marketing in Hazratganj?",
    answer:
      "Results depend on the strategy. PPC campaigns and social media ads can generate leads within the first week. SEO results typically take 3–6 months to show significant ranking improvements. At Website Walae, we set clear timelines and milestones so you can track progress from day one. Our Hazratganj clients typically see measurable improvements in traffic and leads within the first 90 days.",
  },
  {
    question: "Does Website Walae provide monthly reports and analytics?",
    answer:
      "Yes. Transparency is one of our core values. Every client receives detailed monthly reports that include website traffic analytics, keyword ranking updates, social media engagement metrics, ad campaign performance (impressions, clicks, conversions, ROAS), and actionable recommendations for the next month. We also schedule monthly review calls to walk you through the data.",
  },
  {
    question: "What industries does Website Walae serve in Hazratganj?",
    answer:
      "We serve a wide range of industries in and around Hazratganj, including retail & fashion boutiques, restaurants & cafés, coaching centers & educational institutions, law firms & professional services, healthcare clinics, real estate agencies, hospitality businesses, and e-commerce brands. Our customized approach ensures every industry gets a strategy that speaks to its unique audience.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/* ────────── SERVICES DATA ────────── */
const services = [
  {
    icon: "Search",
    title: "Search Engine Optimization (SEO)",
    desc: "We apply advanced SEO methods — on-page optimization, local SEO, technical audits, and authoritative backlink building — to position your business at the top of Google for high-intent keywords. Our data-driven approach ensures sustained organic traffic growth.",
    highlight: "Rank #1 on Google",
  },
  {
    icon: "Share2",
    title: "Social Media Marketing (SMM)",
    desc: "From Instagram Reels to Facebook campaigns, we build your brand presence where your customers scroll every day. Our team crafts compelling copy, designs scroll-stopping visuals, runs performance ads, and fosters genuine community engagement.",
    highlight: "340% Higher Engagement",
  },
  {
    icon: "Target",
    title: "Pay-Per-Click Advertising (PPC)",
    desc: "Don't wait months for organic results. Our Google Ads and Meta Ads campaigns deliver qualified leads and sales from day one — optimized for maximum ROAS within your budget. We A/B test every ad creative and landing page.",
    highlight: "Instant Lead Generation",
  },
  {
    icon: "Globe",
    title: "Website Design & Development",
    desc: "Your website is your 24/7 digital storefront. We design blazing-fast, responsive, SEO-friendly websites on modern frameworks that turn visitors into paying customers. Mobile-first, performance-obsessed, conversion-optimized.",
    highlight: "Sub-Second Load Times",
  },
  {
    icon: "FileText",
    title: "Content Marketing",
    desc: "We create compelling content that builds trust and authority — blogs, videos, infographics, social posts, and more. Every piece is strategically aligned with your brand voice and designed to attract, educate, and convert your ideal customer.",
    highlight: "Brand Authority Builder",
  },
  {
    icon: "MapPin",
    title: "Local Business Marketing",
    desc: "If you're targeting Hazratganj customers or anywhere in Lucknow, our location-based strategies make you the go-to brand. Google Business Profile optimization, local citations, geo-targeted ads, and community-driven campaigns.",
    highlight: "Dominate Local Search",
  },
];

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Search, Share2, Target, Globe, FileText, MapPin,
};

/* ────────── UNIQUE SELLING POINTS ────────── */
const usps = [
  { icon: Eye, title: "Local Market Knowledge", desc: "We understand Hazratganj's business environment, customer behavior, and culture inside out — better than any outsider ever could." },
  { icon: Palette, title: "Custom Strategy", desc: "No cookie-cutter plans. Every business gets a unique marketing strategy tailored to its goals, audience, and competitive landscape." },
  { icon: ShieldCheck, title: "Transparent Pricing", desc: "No surprise costs. Clear service plans, upfront fees, and flexible packages. You always know exactly what you're paying for." },
  { icon: BarChart3, title: "Monthly Reports & Analytics", desc: "Detailed monthly reports with campaign performance, ROI analysis, keyword rankings, and actionable recommendations." },
  { icon: TrendingUp, title: "Proven Results", desc: "Our campaigns generate qualified leads, grow sales pipelines, and build strong online reputations — backed by real metrics." },
  { icon: Users, title: "Dedicated Team", desc: "A full team of marketers, designers, developers, and strategists working together on your brand. Not a freelancer — a partner." },
];

/* ────────── SUCCESS STORIES ────────── */
const successStories = [
  { business: "Hazratganj Fashion Boutique", metric: "40%", label: "Increase in Footfalls", detail: "Local SEO + Instagram marketing drove walk-in traffic within 3 months.", icon: TrendingUp },
  { business: "Lucknow Law Firm", metric: "3×", label: "More Client Leads", detail: "Google Ads strategy generated consistent repeat client inquiries.", icon: Users },
  { business: "Coaching Center", metric: "2×", label: "Enrollment Doubled", detail: "Custom lead-gen funnel tailored to education sector needs.", icon: Target },
];

/* ────────── PAGE COMPONENT ────────── */
export default function BestDigitalMarketingAgencyHazratganj() {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-brand-text flex flex-col justify-between pt-24 sm:pt-28">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="flex-1 w-full">
        {/* ── BREADCRUMB ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-brand-text-secondary hover:text-brand-accent transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* ── HERO SECTION ── */}
        <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative w-full aspect-[16/9] sm:aspect-[2.2/1] rounded-2xl sm:rounded-3xl overflow-hidden shadow-floating border border-white/10">
            <img
              src={COVER_IMAGE}
              alt="Best Digital Marketing Agency in Hazratganj, Lucknow — Website Walae office near Hazratganj's iconic colonial architecture"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-transparent" />

            {/* Hero Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-brand-accent mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Digital Marketing</span>
                </span>
                <span className="flex items-center gap-1 text-white/60">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Hazratganj, Lucknow</span>
                </span>
                <span className="flex items-center gap-1 text-white/60">
                  <Clock className="w-3.5 h-3.5" />
                  <span>12 min read</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl">
                Best Digital Marketing Agency in{" "}
                <span className="text-brand-accent">Hazratganj</span>
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
                Website Walae — Your trusted digital partner helping Hazratganj businesses dominate online with SEO, social media, PPC, web design & content marketing.
              </p>
            </div>
          </div>
        </section>

        {/* ── AUTHOR BYLINE ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 border-y border-white/10 mb-10 text-xs font-mono text-white/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center text-brand-accent font-bold text-sm">
                WW
              </div>
              <div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <span>Website Walae</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
                </div>
                <div className="text-[11px] text-white/40 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-white/30" />
                  <span>Hazratganj, Lucknow • Serving All India</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-white/40">
              <Calendar className="w-3.5 h-3.5" />
              <span>Updated 2025</span>
            </div>
          </div>
        </div>

        {/* ── ARTICLE CONTENT ── */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Intro */}
          <div className="mb-12">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-6">
              Hazratganj, Lucknow&apos;s most prestigious commercial hub, is experiencing a digital revolution. With businesses ranging from heritage boutiques and renowned restaurants to modern startups and professional service firms, competition for online visibility has never been fiercer. Whether you&apos;re a startup finding your feet or an established brand looking to scale, your success in 2025 hinges on one thing — a powerful digital presence.
            </p>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              That&apos;s where <strong className="text-brand-accent">Website Walae</strong>, the best digital marketing agency in Hazratganj, steps in. We don&apos;t just run campaigns — we engineer growth systems that generate leads, build brand equity, and deliver measurable ROI for businesses across Lucknow and beyond.
            </p>
          </div>

          {/* ── WHY DIGITAL MARKETING IS A MUST ── */}
          <section className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6">
              Why Digital Marketing is a Must in 2025
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-6">
              Digital marketing is no longer a &ldquo;nice-to-have&rdquo; — it&apos;s the lifeline of modern business. Over <strong className="text-brand-accent">78% of consumers</strong> in Lucknow research products and services online before making a purchase. Social media, search engines, and websites have become the primary touchpoints between brands and customers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { stat: "78%", label: "Consumers research online before buying" },
                { stat: "4.5B+", label: "Active social media users worldwide" },
                { stat: "92%", label: "Of traffic goes to Page 1 Google results" },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-brand-accent mb-2">{item.stat}</div>
                  <div className="text-xs sm:text-sm text-white/60">{item.label}</div>
                </div>
              ))}
            </div>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              Hazratganj — the charming crossroads of old-world elegance and new-world entrepreneurship — offers unparalleled opportunities for digital growth. From fashion boutiques along MG Road and artisanal coffee houses to coaching centers, medical practices, and law firms — <strong className="text-brand-accent">every business in Hazratganj can multiply its reach</strong> with the right digital strategy.
            </p>
          </section>

          {/* ── WELCOME TO WEBSITE WALAE ── */}
          <section className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6">
              Welcome to Website Walae: Your Digital Partner
            </h2>
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-brand-accent/10 via-brand-accent/5 to-transparent border border-brand-accent/20 mb-6">
              <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-4">
                Website Walae is a Lucknow-based full-service digital marketing agency headquartered near Hazratganj. We combine strategic thinking, creative execution, and data-driven optimization to help businesses of every size achieve extraordinary online growth.
              </p>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed">
                With a dedicated team of marketers, designers, content strategists, and developers, we focus exclusively on one thing: <strong className="text-brand-accent">delivering measurable results</strong>. We&apos;ve helped dozens of regional businesses expand their footprint, generate consistent revenue, and build loyal customer bases — and we&apos;re ready to do the same for you.
              </p>
            </div>
          </section>

          {/* ── CORE SERVICES ── */}
          <section className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Our Core Digital Marketing Services
            </h2>
            <p className="text-sm sm:text-base text-white/60 mb-8">
              Every service is individually crafted to meet the unique needs of your business.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {services.map((service) => {
                const IconComp = iconMap[service.icon];
                return (
                  <div
                    key={service.title}
                    className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute top-0 right-0 m-4 px-2.5 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[10px] font-mono text-brand-accent">
                      {service.highlight}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/15 border border-brand-accent/25 flex items-center justify-center mb-4">
                      {IconComp && <IconComp className="w-5 h-5 text-brand-accent" />}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 pr-24">{service.title}</h3>
                    <p className="text-sm text-white/65 leading-relaxed">{service.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── WHAT MAKES WEBSITE WALAE UNIQUE ── */}
          <section className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              What Makes Website Walae Unique
            </h2>
            <p className="text-sm sm:text-base text-white/60 mb-8">
              There are many digital marketing agencies — here&apos;s why Website Walae stands out in Hazratganj.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {usps.map((usp) => {
                const UspIcon = usp.icon;
                return (
                  <div key={usp.title} className="p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-colors">
                    <UspIcon className="w-6 h-6 text-brand-accent mb-3" />
                    <h3 className="font-bold text-white text-sm mb-2">{usp.title}</h3>
                    <p className="text-xs text-white/60 leading-relaxed">{usp.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── SUCCESS STORIES ── */}
          <section className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Hazratganj Success Stories
            </h2>
            <p className="text-sm sm:text-base text-white/60 mb-8">
              Real results from real businesses we&apos;ve partnered with in Hazratganj and Lucknow.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {successStories.map((story) => {
                const StoryIcon = story.icon;
                return (
                  <div
                    key={story.business}
                    className="relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-accent/5 -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    <StoryIcon className="w-8 h-8 text-brand-accent mb-4 relative z-10" />
                    <div className="text-4xl font-extrabold text-brand-accent mb-1 relative z-10">{story.metric}</div>
                    <div className="text-sm font-semibold text-white mb-1 relative z-10">{story.label}</div>
                    <div className="text-[11px] font-mono text-brand-accent/70 mb-3 relative z-10">{story.business}</div>
                    <p className="text-xs text-white/55 leading-relaxed relative z-10">{story.detail}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-sm text-white/50 italic">
              These aren&apos;t anomalies — they&apos;re the standard we strive for with every client.
            </p>
          </section>

          {/* ── WHY HAZRATGANJ BUSINESSES NEED DIGITAL MARKETING ── */}
          <section className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6">
              Why Hazratganj Businesses Need Digital Marketing Now
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-6">
              Hazratganj isn&apos;t just any commercial district — it&apos;s the heartbeat of Lucknow. With high foot traffic, premium real estate, and a customer base that expects quality, the businesses here face unique challenges and opportunities:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "High competition means you need to stand out in search results and social feeds",
                "Premium customers expect a polished online presence — outdated websites lose credibility instantly",
                "Local searches like 'best [service] near Hazratganj' are growing 45% year-over-year",
                "Your competitors are already investing in digital — if you're not, you're falling behind",
                "Word-of-mouth alone can't scale — digital marketing multiplies your reach exponentially",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm sm:text-base text-white/75">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── OUR PROCESS ── */}
          <section className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6">
              How We Work: Our 4-Step Growth Process
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { step: "01", title: "Discovery & Audit", desc: "We analyze your current digital presence, competitors, and target audience to identify growth opportunities." },
                { step: "02", title: "Strategy & Planning", desc: "We build a customized marketing roadmap with clear goals, timelines, KPIs, and budget allocation." },
                { step: "03", title: "Execution & Optimization", desc: "Our team executes campaigns across channels, continuously A/B testing and optimizing for maximum performance." },
                { step: "04", title: "Reporting & Scaling", desc: "Monthly reports, ROI analysis, and strategic recommendations to double down on what's working." },
              ].map((step) => (
                <div key={step.step} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-3xl font-extrabold text-brand-accent/30 mb-2">{step.step}</div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ SECTION ── */}
          <section className="mb-14">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-accent uppercase tracking-wider mb-3">
              <ChevronDown className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8">
              FAQs – Best Digital Marketing Agency in Hazratganj
            </h2>
            <HazratganjFaqAccordion faqs={faqData} />
          </section>

          {/* ── GEO / LOCAL SUMMARY BOX ── */}
          <div className="my-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-brand-accent/10 to-transparent border border-brand-accent/30">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-accent uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4" />
              <span>Local & All-India Strategic Blueprint</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Why This Matters for Businesses in Hazratganj & Across India
            </h3>
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              Website Walae is Lucknow&apos;s premier digital marketing agency headquartered near Hazratganj, Halwasiya Market. We serve businesses across Lucknow&apos;s top commercial areas — Hazratganj, Gomti Nagar, Aminabad, Alambagh, Aliganj — and provide enterprise-grade digital marketing services to clients across Uttar Pradesh and all of India. Our deep local understanding combined with national-scale expertise makes us the ideal partner for any business looking to grow online.
            </p>
          </div>

          {/* ── CTA SECTION ── */}
          <section className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6">
              Let&apos;s Build Your Brand Together
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8">
              If you&apos;re an entrepreneur in Hazratganj who wants to dominate the digital world, Website Walae is the partner you&apos;ve been looking for. Whether you need a full-funnel marketing plan or just want help improving your website or Instagram presence — we&apos;ve got you covered.
            </p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-accent shrink-0" />
                <div>
                  <div className="text-xs text-white/40 font-mono">Location</div>
                  <div className="text-sm text-white font-medium">Hazratganj, Lucknow</div>
                </div>
              </div>
              <a href="tel:+917317782998" className="p-5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3 hover:border-brand-accent/30 transition-colors">
                <Phone className="w-5 h-5 text-brand-accent shrink-0" />
                <div>
                  <div className="text-xs text-white/40 font-mono">Phone</div>
                  <div className="text-sm text-white font-medium">7317782998</div>
                </div>
              </a>
              <a href="mailto:websitewalae@gmail.com" className="p-5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3 hover:border-brand-accent/30 transition-colors">
                <Mail className="w-5 h-5 text-brand-accent shrink-0" />
                <div>
                  <div className="text-xs text-white/40 font-mono">Email</div>
                  <div className="text-sm text-white font-medium">websitewalae@gmail.com</div>
                </div>
              </a>
            </div>
          </section>

          {/* ── BOTTOM CTA BOX ── */}
          <div className="my-16 p-8 sm:p-10 rounded-3xl bg-[#0a0a0a] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <span className="text-xs font-mono text-brand-accent uppercase">Work With Website Walae</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Ready to dominate digital in Hazratganj?
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary mt-1 max-w-lg">
                Get a free consultation with Lucknow&apos;s top digital marketing agency. Let&apos;s make your business the local brand everyone talks about.
              </p>
            </div>
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-accent text-black font-bold text-sm tracking-wide hover:bg-white hover:shadow-[0_0_20px_rgba(202,255,0,0.4)] transition-all shrink-0"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
