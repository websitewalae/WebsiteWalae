import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://websitewalae.com";
  const now = new Date();

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      images: [`${baseUrl}/logo.png`],
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      images: [`${baseUrl}/images/tech_hero_bg.jpg`],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/start-a-project`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      images: [`${baseUrl}/images/tech_hero_bg.jpg`],
    },
    ...[
      "website-development-lucknow",
      "digital-marketing-lucknow",
      "seo-lucknow",
      "social-media-marketing-lucknow",
      "ui-ux-design-lucknow",
      "video-production-lucknow",
      "content-creation-lucknow",
      "meta-ads-lucknow",
      "pr-lucknow"
    ].map(slug => ({
      url: `${baseUrl}/services/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  // Dynamic articles for Google Search & Discover indexing
  try {
    const articles = await getArticles();
    const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.created_at || now),
      changeFrequency: "weekly",
      priority: 0.8,
      images: [
        article.coverImage?.startsWith("http")
          ? article.coverImage
          : `${baseUrl}${article.coverImage || "/images/tech_hero_bg.jpg"}`,
      ],
    }));

    return [...staticPages, ...articleEntries];
  } catch {
    return staticPages;
  }
}
