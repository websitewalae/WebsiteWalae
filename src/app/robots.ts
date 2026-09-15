import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://websitewalae.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/nomo/", "/auth/", "/dashboard/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/nomo/", "/auth/", "/dashboard/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
