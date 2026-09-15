import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getArticles } from "@/lib/articles";
import ShareButtons from "./ShareButtons";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Sparkles, HelpCircle, CheckCircle2 } from "lucide-react";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Website Walae",
    };
  }

  const title = `${article.title} | Website Walae Insights`;
  const description =
    article.seo_description ||
    "Authoritative insights on web development, digital marketing, and business scaling in Lucknow and India from Website Walae.";
  const canonicalUrl = `https://websitewalae.com/articles/${article.slug}`;
  const imageUrl = `https://websitewalae.com${article.coverImage || "/images/tech_hero_bg.jpg"}`;

  return {
    title,
    description,
    keywords: article.seo_keywords?.split(",").map((k) => k.trim()) || [
      "Website Walae",
      "Digital Marketing Agency Lucknow",
      "Web Development India",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Website Walae",
      type: "article",
      publishedTime: article.created_at,
      authors: [article.author || "Website Walae"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
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
}

export const dynamic = "force-dynamic";

export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const formattedDate = new Date(article.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const fullUrl = `https://websitewalae.com/articles/${article.slug}`;
  const imageUrl = `https://websitewalae.com${article.coverImage || "/images/tech_hero_bg.jpg"}`;

  // Article JSON-LD Structured Data (Google Discover & SEO)
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": ["Article", "BlogPosting"],
    "headline": article.title,
    "description": article.seo_description,
    "image": [imageUrl],
    "datePublished": article.created_at,
    "dateModified": article.created_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    "author": {
      "@type": "Organization",
      "name": article.author || "Website Walae",
      "url": "https://websitewalae.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Website Walae",
      "url": "https://websitewalae.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://websitewalae.com/logo.png",
      },
    },
  };

  // Optional FAQPage JSON-LD for Answer Engine Optimization (Google AI Overviews)
  let faqStructuredData: any = null;
  if (article.aeo_faq && Array.isArray(article.aeo_faq) && article.aeo_faq.length > 0) {
    faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": article.aeo_faq.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    };
  }

  return (
    <div className="w-full min-h-screen bg-[#050505] text-brand-text flex flex-col justify-between pt-24 sm:pt-28">
      {/* Structured Data Script Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-brand-text-secondary hover:text-brand-accent transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Header Eyebrow */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-brand-accent mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{article.category || "Digital Marketing"}</span>
          </span>
          <span className="flex items-center gap-1 text-white/50">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </span>
          <span className="flex items-center gap-1 text-white/50">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime || "5 min read"}</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase leading-tight mb-6 font-inter-tight">
          {article.title}
        </h1>

        {/* Author Byline Box */}
        <div className="flex items-center justify-between py-4 border-y border-white/10 mb-8 text-xs font-mono text-white/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center text-brand-accent font-bold">
              WW
            </div>
            <div>
              <div className="font-semibold text-white flex items-center gap-1.5">
                <span>{article.author}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
              </div>
              <div className="text-[11px] text-white/40 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-white/30" />
                <span>Hazratganj, Lucknow • Serving All India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Large Featured Image (Google Discover Requirement: 1200px format) */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-10 shadow-2xl">
          <img
            src={article.coverImage || "/images/tech_hero_bg.jpg"}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent" />
        </div>

        {/* Share Buttons */}
        <ShareButtons title={article.title} url={fullUrl} />

        {/* Article Body Content */}
        <article className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-brand-text-secondary prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg prose-li:text-brand-text-secondary prose-strong:text-brand-accent prose-a:text-brand-accent prose-a:underline hover:prose-a:text-white">
          <div
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="flex flex-col gap-5 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-extrabold [&>h2]:text-white [&>h2]:mt-8 [&>h2]:mb-3 [&>p]:text-white/80 [&>p]:leading-relaxed [&>p]:text-base sm:[&>p]:text-lg [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:text-white/70 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:text-white/70 [&>strong]:text-brand-accent"
          />
        </article>

        {/* GEO / Strategic Takeaway Box */}
        {article.geo_summary && (
          <div className="my-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-brand-accent/10 to-transparent border border-brand-accent/30">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-accent uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4" />
              <span>Local &amp; All-India Strategic Blueprint</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Why This Matters for Businesses in Lucknow &amp; Across India
            </h3>
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              {article.geo_summary}
            </p>
          </div>
        )}

        {/* AEO FAQ Section (for Google Discover, AI Overviews & Rich Snippets) */}
        {article.aeo_faq && Array.isArray(article.aeo_faq) && article.aeo_faq.length > 0 && (
          <div className="my-12 border-t border-white/10 pt-10">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-accent uppercase tracking-wider mb-3">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Expert Q&amp;A &amp; Quick Takeaways
            </h3>
            <div className="flex flex-col gap-4">
              {article.aeo_faq.map((faq, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-brand-accent/30 transition-colors"
                >
                  <div className="font-bold text-white text-base mb-2 flex items-start gap-2">
                    <span className="text-brand-accent shrink-0">Q:</span>
                    <span>{faq.question}</span>
                  </div>
                  <p className="text-sm text-brand-text-secondary pl-5 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Conversion Box */}
        <div className="my-16 p-8 sm:p-10 rounded-3xl bg-[#0a0a0a] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="text-xs font-mono text-brand-accent uppercase">Work With Website Walae</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Ready to scale your brand in Lucknow or nationwide?
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-secondary mt-1 max-w-lg">
              Partner with Lucknow's premier digital agency for websites that convert and campaigns that dominate.
            </p>
          </div>
          <Link
            href="/start-a-project"
            className="px-8 py-3.5 rounded-full bg-brand-accent text-black font-bold text-sm tracking-wide hover:bg-white hover:shadow-[0_0_20px_rgba(202,255,0,0.4)] transition-all shrink-0"
          >
            Start a Project
          </Link>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="my-16 border-t border-white/10 pt-12">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-8">
              More Insights from Website Walae
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id || rel.slug}
                  href={`/articles/${rel.slug}`}
                  className="group flex flex-col justify-between bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-brand-accent/40 transition-all hover:-translate-y-1"
                >
                  <div>
                    <span className="text-[10px] font-mono text-brand-accent block mb-2">
                      {rel.category || "Digital Marketing"}
                    </span>
                    <h4 className="font-bold text-white group-hover:text-brand-accent text-sm leading-snug line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/50">
                    <span>{rel.readTime || "5 min read"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-accent group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
