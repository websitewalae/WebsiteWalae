import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website Walae | Best Digital Marketing Agency in Lucknow",
  description:
    "Website Walae is a digital marketing and creative agency in Lucknow offering website development, UI/UX design, SEO, social media marketing, content creation, video production, Meta Ads and PR.",
  keywords: [
    "best digital marketing agency in Lucknow",
    "digital marketing company in Lucknow",
    "website development company in Lucknow",
    "SEO agency in Lucknow",
    "social media marketing agency in Lucknow",
    "UI UX design agency in Lucknow",
    "video production company in Lucknow",
    "Meta Ads agency in Lucknow",
    "PR agency in Lucknow",
    "creative agency in Lucknow",
    "Website Walae",
  ],
  alternates: {
    canonical: "https://websitewalae.com",
  },
  openGraph: {
    title: "Website Walae | Best Digital Marketing Agency in Lucknow",
    description:
      "Website Walae is a digital marketing and creative agency in Lucknow offering website development, UI/UX design, SEO, social media marketing, content creation, video production, Meta Ads and PR.",
    url: "https://websitewalae.com",
    siteName: "Website Walae",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://websitewalae.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Website Walae — Digital Marketing Agency in Lucknow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Walae | Best Digital Marketing Agency in Lucknow",
    description:
      "Website Walae is a digital marketing and creative agency in Lucknow offering website development, UI/UX design, SEO, social media marketing, content creation, video production, Meta Ads and PR.",
    creator: "@websitewalae",
    images: ["https://websitewalae.com/og-image.png"],
  },
};

// Homepage FAQ data for AEO structured data
const homepageFaq = [
  {
    question: "What does Website Walae do?",
    answer:
      "Website Walae is a digital marketing and creative agency based in Lucknow, Uttar Pradesh, India. The agency provides website development, UI/UX design, SEO, social media marketing, content creation, video production, Meta Ads and public relations services to help businesses build a stronger digital presence.",
  },
  {
    question: "Where is Website Walae located?",
    answer:
      "Website Walae is located in Hazratganj, Lucknow, Uttar Pradesh, India (226001). You can reach the team at +91 73177 82998 or websitewalae@gmail.com.",
  },
  {
    question: "What services does Website Walae provide?",
    answer:
      "Website Walae provides nine core services: Website Development, UI/UX Design, Social Media Marketing, Content Creation, Video Production, SEO (Search Engine Optimization), Meta Ads, PR (Public Relations), and Digital Marketing strategy.",
  },
  {
    question: "What is the best digital marketing agency in Lucknow?",
    answer:
      "Website Walae is a Lucknow-based digital marketing and creative agency offering end-to-end services including website development, SEO, social media marketing, video production, and Meta Ads. The agency combines creative direction with modern technology to help businesses grow their digital presence.",
  },
  {
    question: "How can I start a project with Website Walae?",
    answer:
      "You can start a project with Website Walae by visiting websitewalae.com/start-a-project and filling out the project inquiry form, or by calling +91 73177 82998 directly.",
  },
];

// Structured data for WebPage + FAQ
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Website Walae | Best Digital Marketing Agency in Lucknow",
  description:
    "Website Walae is a digital marketing and creative agency in Lucknow offering website development, UI/UX design, SEO, social media marketing, content creation, video production, Meta Ads and PR.",
  url: "https://websitewalae.com",
  publisher: {
    "@type": "Organization",
    name: "Website Walae",
    logo: "https://websitewalae.com/logo.png",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homepageFaq.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://websitewalae.com",
    },
  ],
};

export default function Home() {
  return (
    <div className="w-full relative bg-brand-bg text-brand-text min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Global Cinematic Grain Overlay */}
      <div className="noise-overlay" />

      {/* Primary H1 — accessible to crawlers immediately */}
      <h1 className="sr-only">Best Digital Marketing Agency in Lucknow — Website Walae</h1>

      {/* Interactive Client-Side Content */}
      <HomePageClient />

      {/* SEO-Visible Content — Visible to both users AND crawlers */}
      <section
        className="relative w-full bg-[#030303] border-t border-white/5 py-16 sm:py-24 px-4 sm:px-6 lg:px-[5vw]"
        aria-label="About Website Walae — Digital Marketing Agency in Lucknow"
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Section heading */}
          <div className="mb-12 sm:mb-16">
            <p className="text-brand-accent text-xs sm:text-sm font-mono tracking-widest uppercase mb-3">
              About Our Agency
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight max-w-3xl">
              Digital Marketing Agency in Lucknow That Builds Digital Experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16">
            {/* About paragraph */}
            <div>
              <p className="text-brand-text-secondary text-sm sm:text-base leading-relaxed mb-6">
                Website Walae is a digital marketing and creative agency based in
                Lucknow, Uttar Pradesh, India. We provide website development, UI/UX
                design, SEO, social media marketing, content creation, video production,
                Meta Ads and public relations services. Our team combines creative
                direction with modern technology to help businesses grow their digital
                presence and acquire real customers.
              </p>
              <p className="text-brand-text-secondary text-sm sm:text-base leading-relaxed">
                As one of the best digital marketing companies in Lucknow, we work with
                startups, SMEs and established brands to craft data-driven strategies
                that deliver measurable results. From SEO and social media marketing to
                full-scale website development, we offer end-to-end digital solutions
                tailored for the Indian market.
              </p>
            </div>

            {/* Services list */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-5">Our Services</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-brand-text-secondary text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>
                    <Link href="/services/website-development-lucknow" className="text-white hover:text-brand-accent transition-colors">
                      Website Development
                    </Link>{" "}
                    — Custom Next.js web platforms and e-commerce solutions
                  </span>
                </li>
                <li className="flex items-start gap-3 text-brand-text-secondary text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>
                    <Link href="/services/ui-ux-design-lucknow" className="text-white hover:text-brand-accent transition-colors">
                      UI/UX Design
                    </Link>{" "}
                    — Figma design systems, prototypes and spatial interfaces
                  </span>
                </li>
                <li className="flex items-start gap-3 text-brand-text-secondary text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>
                    <Link href="/services/social-media-marketing-lucknow" className="text-white hover:text-brand-accent transition-colors">
                      Social Media Marketing
                    </Link>{" "}
                    — Organic growth, content calendars and community management
                  </span>
                </li>
                <li className="flex items-start gap-3 text-brand-text-secondary text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>
                    <Link href="/services/content-creation-lucknow" className="text-white hover:text-brand-accent transition-colors">
                      Content Creation
                    </Link>{" "}
                    — Brand photography, copywriting and creative direction
                  </span>
                </li>
                <li className="flex items-start gap-3 text-brand-text-secondary text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>
                    <Link href="/services/video-production-lucknow" className="text-white hover:text-brand-accent transition-colors">
                      Video Production
                    </Link>{" "}
                    — 4K cinematic shoots, reels and commercial films
                  </span>
                </li>
                <li className="flex items-start gap-3 text-brand-text-secondary text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>
                    <Link href="/services/seo-lucknow" className="text-white hover:text-brand-accent transition-colors">
                      SEO
                    </Link>{" "}
                    — Technical SEO, local SEO and organic ranking growth
                  </span>
                </li>
                <li className="flex items-start gap-3 text-brand-text-secondary text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>
                    <Link href="/services/meta-ads-lucknow" className="text-white hover:text-brand-accent transition-colors">
                      Meta Ads
                    </Link>{" "}
                    — Facebook and Instagram paid advertising campaigns
                  </span>
                </li>
                <li className="flex items-start gap-3 text-brand-text-secondary text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>
                    <Link href="/services/pr-lucknow" className="text-white hover:text-brand-accent transition-colors">
                      PR / Public Relations
                    </Link>{" "}
                    — Digital PR, media outreach and reputation management
                  </span>
                </li>
                <li className="flex items-start gap-3 text-brand-text-secondary text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>
                    <Link href="/services/digital-marketing-lucknow" className="text-white hover:text-brand-accent transition-colors">
                      Digital Marketing
                    </Link>{" "}
                    — Full-stack digital marketing strategy and execution
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* FAQ Section — visible for both users and crawlers */}
          <div className="border-t border-white/5 pt-12 sm:pt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {homepageFaq.map((faq, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 sm:p-6">
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-2">{faq.question}</h3>
                  <p className="text-brand-text-secondary text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="border-t border-white/5 pt-10 mt-12 flex flex-wrap gap-6 text-xs sm:text-sm text-brand-text-muted">
            <span>
              📞 <a href="tel:+917317782998" className="text-brand-text-secondary hover:text-white transition-colors">+91 73177 82998</a>
            </span>
            <span>
              ✉️ <a href="mailto:websitewalae@gmail.com" className="text-brand-text-secondary hover:text-white transition-colors">websitewalae@gmail.com</a>
            </span>
            <span>
              📍 Hazratganj, Lucknow, Uttar Pradesh 226001, India
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm">
            <Link href="/start-a-project" className="text-brand-accent hover:text-white transition-colors font-medium">Start a Project →</Link>
            <Link href="/work" className="text-brand-text-secondary hover:text-white transition-colors">View Our Work</Link>
            <Link href="/pricing" className="text-brand-text-secondary hover:text-white transition-colors">Pricing</Link>
            <Link href="/articles" className="text-brand-text-secondary hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

