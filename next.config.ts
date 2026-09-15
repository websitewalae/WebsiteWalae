import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        // 30 Days Cache for Instagram Reel Videos (2592000 seconds)
        source: "/videos/reels/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, immutable",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
        ],
      },
      {
        // 30 Days Cache for Reel Thumbnail Posters (2592000 seconds)
        source: "/images/reels/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
