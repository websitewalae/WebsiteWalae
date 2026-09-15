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

      {/* SEO-Visible Content — Always in DOM for crawlers */}
      <section className="sr-only-seo" aria-label="About Website Walae">
        <h1>Digital Marketing Agency in Lucknow That Builds Digital Experiences</h1>
        <p>
          Website Walae is a digital marketing and creative agency based in
          Lucknow, Uttar Pradesh, India. We provide website development, UI/UX
          design, SEO, social media marketing, content creation, video production,
          Meta Ads and public relations services. Our team combines creative
          direction with modern technology to help businesses grow their digital
          presence and acquire real customers.
        </p>
        <h2>Our Services</h2>
        <ul>
          <li>
            <Link href="/services/website-development-lucknow">
              Website Development
            </Link>{" "}
            — Custom Next.js web platforms and e-commerce solutions
          </li>
          <li>
            <Link href="/services/ui-ux-design-lucknow">UI/UX Design</Link> —
            Figma design systems, prototypes and spatial interfaces
          </li>
          <li>
            <Link href="/services/social-media-marketing-lucknow">
              Social Media Marketing
            </Link>{" "}
            — Organic growth, content calendars and community management
          </li>
          <li>
            <Link href="/services/content-creation-lucknow">
              Content Creation
            </Link>{" "}
            — Brand photography, copywriting and creative direction
          </li>
          <li>
            <Link href="/services/video-production-lucknow">
              Video Production
            </Link>{" "}
            — 4K cinematic shoots, reels and commercial films
          </li>
          <li>
            <Link href="/services/seo-lucknow">SEO</Link> — Technical SEO,
            local SEO and organic ranking growth
          </li>
          <li>
            <Link href="/services/meta-ads-lucknow">Meta Ads</Link> — Facebook
            and Instagram paid advertising campaigns
          </li>
          <li>
            <Link href="/services/pr-lucknow">PR / Public Relations</Link> —
            Digital PR, media outreach and reputation management
          </li>
          <li>
            <Link href="/services/digital-marketing-lucknow">
              Digital Marketing
            </Link>{" "}
            — Full-stack digital marketing strategy and execution
          </li>
        </ul>
        <h2>Frequently Asked Questions</h2>
        {homepageFaq.map((faq, i) => (
          <div key={i}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
        <h2>Contact Website Walae</h2>
        <p>
          Phone: <a href="tel:+917317782998">+91 73177 82998</a> | Email:{" "}
          <a href="mailto:websitewalae@gmail.com">websitewalae@gmail.com</a> |
          Location: Hazratganj, Lucknow, Uttar Pradesh 226001, India
        </p>
        <p>
          <Link href="/start-a-project">Start a Project</Link> |{" "}
          <Link href="/work">View Our Work</Link> |{" "}
          <Link href="/pricing">Pricing</Link> |{" "}
          <Link href="/articles">Blog</Link>
        </p>
      </section>

      {/* Interactive Client-Side Content */}
      <HomePageClient />
    </div>
  );
}
