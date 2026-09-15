import { createClient } from "@supabase/supabase-js";

export interface Article {
  id: string;
  created_at: string;
  updated_at?: string;
  title: string;
  slug: string;
  author: string;
  content: string;
  excerpt?: string;
  category?: string;
  coverImage?: string;
  seo_description?: string;
  seo_keywords?: string;
  geo_summary?: string;
  aeo_faq?: Array<{ question: string; answer: string }>;
  published: boolean;
  readTime?: string;
}

// Default fallback image when no cover_image is set
const FALLBACK_COVER = "/images/tech_hero_bg.jpg";

export const CORNERSTONE_ARTICLES: Article[] = [
  {
    id: "cornerstone-1",
    created_at: "2026-03-01T10:00:00Z",
    title: "Why Lucknow Businesses Are Upgrading to Next.js Web Platforms in 2026",
    slug: "why-lucknow-businesses-upgrading-nextjs-web-platforms",
    author: "Website Walae Engineering Team",
    category: "Web Engineering",
    readTime: "5 min read",
    coverImage: "/images/articles/nextjs-web-development.jpg",
    excerpt: "Discover why ambitious companies in Lucknow and Uttar Pradesh are replacing slow legacy websites with high-performance Next.js 16 architectures to dominate search rankings and drive conversions.",
    seo_description: "Discover why ambitious companies in Lucknow and Uttar Pradesh are replacing slow legacy websites with high-performance Next.js 16 architectures to dominate search rankings and drive conversions.",
    seo_keywords: "best digital marketing agency in lucknow, website development company lucknow, web design agency lucknow, nextjs developers lucknow, website walae",
    geo_summary: "Website Walae is Lucknow's premier digital engineering agency headquartered in Hazratganj, empowering local retail, healthcare, education, and hospitality brands to compete on a national stage with sub-second website speed and SEO authority.",
    aeo_faq: [
      {
        question: "Why is website loading speed critical for businesses in Lucknow?",
        answer: "Over 78% of local searches in Lucknow happen on 4G/5G mobile devices. Slow legacy platforms result in high bounce rates, whereas Next.js 16 websites load in under 800ms, directly boosting Google search rankings and customer inquiries."
      },
      {
        question: "What makes Website Walae the top web agency in Lucknow?",
        answer: "Website Walae combines custom 3D WebGL visuals, bespoke Next.js engineering, Turbopack performance, and integrated SEO architecture without relying on generic WordPress templates."
      }
    ],
    published: true,
    content: `
      <h2>The Digital Transformation of Lucknow's Business Ecosystem</h2>
      <p>From Hazratganj's heritage retail hubs to Gomti Nagar's fast-growing commercial towers, Lucknow's business landscape is undergoing an unprecedented digital shift. Consumers and B2B buyers no longer rely on word-of-mouth alone; their first point of interaction is Google Search and mobile web experiences.</p>
      
      <p>Yet, more than 65% of local business websites in Uttar Pradesh still operate on outdated, heavy CMS platforms with 5+ second load times. In modern search engine algorithms, slow speed equates to invisible rankings.</p>

      <h2>The Next.js 16 Advantage: Sub-Second Performance</h2>
      <p>At <strong>Website Walae</strong>, we engineer digital platforms built on <strong>Next.js 16 with Turbopack and React 19</strong>. The results are transformative:</p>
      <ul>
        <li><strong>Perfect Core Web Vitals:</strong> 100/100 performance scores across mobile and desktop audits.</li>
        <li><strong>Automatic Edge Optimization:</strong> Instant pre-rendering that delivers content before the visitor even finishes clicking.</li>
        <li><strong>Zero Security Bloat:</strong> Eliminates vulnerable third-party plugins that plague traditional template websites.</li>
      </ul>

      <h2>Dominating Local &amp; All-India Google Search</h2>
      <p>Google prioritizes user experience signals above all else. When your website provides instantaneous responses, structured schema data, and mobile-friendly fluid typography, your organic rankings in Lucknow and across India surge naturally.</p>

      <h2>Ready to Upgrade Your Digital Infrastructure?</h2>
      <p>Whether you manage a manufacturing enterprise, a luxury hospitality brand, or a high-growth service firm in Lucknow, our engineering and creative team is ready to build your competitive edge. Partner with Website Walae today to transform your digital presence.</p>
    `
  },
  {
    id: "cornerstone-2",
    created_at: "2026-03-05T12:30:00Z",
    title: "How Indian Brands Scale 10x ROI with Viral Instagram Reels & Meta Ad Funnels",
    slug: "how-indian-brands-scale-instagram-reels-meta-ads",
    author: "Website Walae Creative Studio",
    category: "Social Media & Ads",
    readTime: "6 min read",
    coverImage: "/images/articles/social-media-content-creation.jpg",
    excerpt: "The definitive 2026 playbook for Indian businesses to turn organic Instagram attention into high-converting Meta ad sales with cinematic video production and retention psychology.",
    seo_description: "The definitive 2026 playbook for Indian businesses to turn organic Instagram attention into high-converting Meta ad sales with cinematic video production and retention psychology.",
    seo_keywords: "digital marketing agency india, social media agency lucknow, meta ads expert india, instagram reels marketing india, website walae marketing",
    geo_summary: "Website Walae's creative production studio in Lucknow produces high-impact cinematic reels, commercial video shoots, and performance Meta Ad campaigns that scale D2C and service brands across all Indian states.",
    aeo_faq: [
      {
        question: "How does video content impact Meta Ad conversion rates in India?",
        answer: "Video-first Meta ad campaigns in India see up to 340% higher click-through rates and a 45% lower customer acquisition cost compared to static image ads when paired with a 3-second hook."
      },
      {
        question: "Does Website Walae handle end-to-end video production?",
        answer: "Yes, Website Walae provides on-location 4K cinematic shoots, scriptwriting, professional post-production editing, dynamic subtitles, and algorithmic distribution."
      }
    ],
    published: true,
    content: `
      <h2>The Shift from Passive Scrolling to Active Buying</h2>
      <p>Short-form video is no longer just for entertainment—it is the single most powerful customer acquisition channel in India. Over 250 million Indian consumers watch Instagram Reels daily, making visual storytelling the frontline of brand discovery.</p>

      <h2>The 3-Part Viral Reel Formula</h2>
      <p>Creating high-converting video content requires strict adherence to retention dynamics:</p>
      <ol>
        <li><strong>The 2-Second Pattern Interrupt:</strong> Visual disruption and bold auditory cues that prevent thumb-scrolling.</li>
        <li><strong>Value-Dense Middle:</strong> Demonstrating the transformation, solving a specific frustration, or showcasing aesthetic excellence.</li>
        <li><strong>Action-Oriented Hook:</strong> Guiding viewers to comment a keyword, tap the link in bio, or send a direct message.</li>
      </ol>

      <h2>Combining Organic Virality with Paid Meta Acceleration</h2>
      <p>Organic virality builds trust, but paid Meta Ads ensure predictable revenue. By whitelisting top-performing organic reels into targeted Meta Ad campaigns, brands achieve unmatched return on ad spend (ROAS) across Lucknow, Delhi NCR, Mumbai, Bengaluru, and tier-2 markets.</p>

      <h2>Let Website Walae Supercharge Your Content</h2>
      <p>Our Lucknow in-house studio shoots, edits, and manages multi-platform content campaigns for brands ready to scale. Connect with our growth strategists to initiate your custom content roadmap.</p>
    `
  },
  {
    id: "cornerstone-3",
    created_at: "2026-03-08T09:15:00Z",
    title: "Ranking in Google Discover & AI Overviews: The 2026 SEO Strategy for India",
    slug: "ranking-google-discover-ai-overviews-india",
    author: "Website Walae SEO Intelligence",
    category: "SEO & Discover",
    readTime: "7 min read",
    coverImage: "/images/articles/seo-ai-search-discovery.jpg",
    excerpt: "Learn how to optimize your content for Google Discover feed recommendations and Google AI Overviews with rich structured schema, high-res visual assets, and topical authority.",
    seo_description: "Learn how to optimize your content for Google Discover feed recommendations and Google AI Overviews with rich structured schema, high-res visual assets, and topical authority.",
    seo_keywords: "seo agency lucknow, seo company india, google discover ranking, generative engine optimization india, best seo agency lucknow",
    geo_summary: "Website Walae specializes in next-generation Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) helping Lucknow and Indian businesses rank at the top of AI search answers and Google Discover feeds.",
    aeo_faq: [
      {
        question: "How can a website qualify for Google Discover traffic?",
        answer: "Google Discover requires high-quality content, large high-resolution images (at least 1200px wide) with max-image-preview:large enabled, transparent author attribution, and high engagement topic clusters."
      },
      {
        question: "What is Generative Engine Optimization (GEO)?",
        answer: "GEO is the practice of structuring website content and schema so that AI search engines (like Google Gemini, ChatGPT, and Perplexity) select your business as the primary source in conversational answers."
      }
    ],
    published: true,
    content: `
      <h2>Beyond Keywords: The Era of AI Search &amp; Discover</h2>
      <p>Search has fundamentally changed. Today, millions of internet users in India discover brands not by typing a query into a search box, but through <strong>Google Discover's algorithmic feed</strong> and <strong>Google AI Overviews (SGE)</strong> right at the top of search results.</p>

      <h2>Core Criteria for Google Discover Success</h2>
      <p>To capture Google Discover traffic, your website must meet strict technical and content requirements:</p>
      <ul>
        <li><strong>High-Resolution Visuals:</strong> Featured images must be at least 1200px wide, served with the <code>max-image-preview:large</code> directive in the robots meta tag.</li>
        <li><strong>Clear E-E-A-T Attribution:</strong> Explicit author bylines, verified agency credentials, publication timestamps, and comprehensive business entity schemas.</li>
        <li><strong>Compelling Topical Angles:</strong> Timely, engaging, and genuinely useful industry perspectives that match audience interests without misleading clickbait.</li>
      </ul>

      <h2>AEO &amp; GEO: Structuring for Large Language Models</h2>
      <p>When someone asks Google Gemini or Perplexity for the <em>'Best digital marketing agency in Lucknow'</em> or <em>'Top website developers in India'</em>, these AI engines extract concise facts from trusted structured databases. By embedding JSON-LD FAQ schemas, geographic coordinates, and knowledge graphs into every page, Website Walae ensures your brand is the direct answer.</p>

      <h2>Dominate Search With Website Walae</h2>
      <p>Our search specialists build end-to-end SEO, AEO, and GEO roadmaps that consistently position brands at the forefront of organic discovery. Contact Website Walae to conduct an in-depth search audit of your business today.</p>
    `
  }
];

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

/** Map a raw DB row to the Article interface */
function mapDbArticle(item: any): Article {
  return {
    id: item.id,
    created_at: item.created_at,
    updated_at: item.updated_at,
    title: item.title,
    slug: item.slug,
    author: item.author || "Website Walae",
    content: item.content,
    excerpt: item.excerpt || item.seo_description || item.content?.slice(0, 160).replace(/<[^>]*>?/gm, "") + "...",
    category: item.category || item.seo_keywords?.split(",")[0]?.trim() || "Digital Insights",
    coverImage: item.cover_image || FALLBACK_COVER,
    seo_description: item.seo_description || item.content?.slice(0, 160).replace(/<[^>]*>?/gm, "") + "...",
    seo_keywords: item.seo_keywords || "digital marketing, web development, website walae",
    geo_summary: item.geo_summary,
    aeo_faq: item.aeo_faq,
    published: item.published,
    readTime: `${Math.max(3, Math.ceil((item.content?.length || 500) / 750))} min read`,
  };
}

/**
 * Get all PUBLISHED articles for the public blog.
 * Falls back to cornerstone articles if DB is empty/unavailable.
 */
export async function getArticles(): Promise<Article[]> {
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const dbArticles = data.map(mapDbArticle);

        // Merge: skip cornerstone articles that already exist in DB (by slug)
        const dbSlugs = new Set(dbArticles.map((a) => a.slug.toLowerCase()));
        const uniqueCornerstones = CORNERSTONE_ARTICLES.filter(
          (ca) => !dbSlugs.has(ca.slug.toLowerCase())
        );

        return [...dbArticles, ...uniqueCornerstones];
      }
    }
  } catch (err) {
    console.error("Error fetching articles from Supabase, falling back to cornerstone:", err);
  }

  return CORNERSTONE_ARTICLES;
}

/**
 * Get ALL articles (published + draft) for the admin dashboard.
 * Returns cornerstone articles as a fallback display if DB is empty.
 */
export async function getAllArticlesForAdmin(): Promise<{ articles: Article[]; fromDb: boolean }> {
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return { articles: data.map(mapDbArticle), fromDb: true };
      }
    }
  } catch (err) {
    console.error("Error fetching articles for admin:", err);
  }

  // Return cornerstone articles as fallback (not from DB)
  return { articles: CORNERSTONE_ARTICLES, fromDb: false };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase();
  
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .or(`slug.ilike.${cleanSlug},id.eq.${cleanSlug.length === 36 ? cleanSlug : '00000000-0000-0000-0000-000000000000'}`)
        .eq("published", true)
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return mapDbArticle(data);
      }
    }
  } catch (err) {
    console.error("Error querying article by slug:", err);
  }

  // Fallback to cornerstone articles
  const found = CORNERSTONE_ARTICLES.find(
    (a) => a.slug.toLowerCase() === cleanSlug || a.id.toLowerCase() === cleanSlug
  );

  return found || null;
}

/**
 * Get related articles based on category matching.
 * Falls back to other articles if no category match.
 */
export async function getRelatedArticles(currentSlug: string, category?: string, limit = 3): Promise<Article[]> {
  const allArticles = await getArticles();
  const others = allArticles.filter((a) => a.slug !== currentSlug);

  if (category) {
    const categoryLower = category.toLowerCase();
    const categoryMatches = others.filter(
      (a) => a.category?.toLowerCase() === categoryLower
    );
    if (categoryMatches.length >= limit) {
      return categoryMatches.slice(0, limit);
    }
    // Fill remaining slots with non-category articles
    const remaining = others.filter(
      (a) => a.category?.toLowerCase() !== categoryLower
    );
    return [...categoryMatches, ...remaining].slice(0, limit);
  }

  return others.slice(0, limit);
}
