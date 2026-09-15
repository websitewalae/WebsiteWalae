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

const aboutFaq = [
  {
    question: "Who is Website Walae?",
    answer: "Website Walae is a premium digital marketing and creative agency. We combine cinematic design, advanced engineering, and data-driven marketing to build high-performance digital ecosystems for brands.",
  },
  {
    question: "Where is Website Walae based?",
    answer: "We are headquartered in the heart of Lucknow, Uttar Pradesh, India (Hazratganj, 226001). While based in Lucknow, we operate globally as a remote-first creative partner for ambitious brands.",
  },
  {
    question: "What services does Website Walae provide?",
    answer: "We provide 9 core digital services: Website Development, UI/UX Design, Social Media Marketing, Content Creation, Video Production, SEO & Growth, Meta Ads, E-commerce Development, and Public Relations (PR).",
  },
  {
    question: "What type of digital work do we specialize in?",
    answer: "We specialize in creating premium, high-end digital experiences. This includes fast Next.js & WebGL websites, cinematic 4K commercial videos, highly-converting Meta ad campaigns, and authoritative SEO dominance.",
  },
  {
    question: "How can someone contact Website Walae?",
    answer: "You can contact our official team directly via phone or email for project inquiries, partnerships, or consultations: Phone: +91 73177 82998, Email: websitewalae@gmail.com",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: aboutFaq.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AboutPageClient />
    </>
  );
}
