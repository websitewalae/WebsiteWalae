"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Sparkles, Search } from "lucide-react";
import { type Article } from "@/lib/articles";

const CATEGORIES = ["All", "Web Engineering", "Social Media & Ads", "SEO & Discover", "Digital Strategy"];

export default function ArticlesClient({ initialArticles }: { initialArticles: Article[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = initialArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" ||
      article.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      article.seo_keywords?.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      searchQuery.trim() === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.seo_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Determine grid layout based on article count for balanced composition
  const getGridClass = () => {
    if (filteredArticles.length === 1) return "grid grid-cols-1 max-w-2xl mx-auto gap-8";
    if (filteredArticles.length === 2) return "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8";
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-brand-accent text-black font-bold shadow-[0_0_20px_rgba(202,255,0,0.3)]"
                    : "bg-white/5 border border-white/10 text-brand-text-secondary hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles & topics..."
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl">
          <p className="text-brand-text-secondary text-base mb-3">No articles matched your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-brand-accent text-xs font-mono underline hover:text-white"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Articles Grid */}
      <div className={getGridClass()}>
        {filteredArticles.map((article, index) => {
          const isFeatured = index === 0 && selectedCategory === "All" && !searchQuery && filteredArticles.length >= 3;
          const formattedDate = new Date(article.created_at).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          // Build meaningful alt text based on article topic
          const altText = article.category
            ? `${article.category} — ${article.title}`
            : article.title;

          return (
            <Link
              key={article.id || article.slug}
              href={`/articles/${article.slug}`}
              className={`group flex flex-col justify-between bg-[#080808] border border-white/10 rounded-2xl overflow-hidden hover:border-brand-accent/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(202,255,0,0.1)] hover:-translate-y-1 ${
                isFeatured ? "md:col-span-2 lg:col-span-2 md:flex-row" : ""
              }`}
            >
              {/* Cover Image Container */}
              <div
                className={`relative overflow-hidden bg-white/5 shrink-0 ${
                  isFeatured ? "md:w-1/2 h-64 md:h-auto" : "w-full h-52"
                }`}
              >
                <img
                  src={article.coverImage || "/images/tech_hero_bg.jpg"}
                  alt={altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />
                
                {/* Category Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-brand-accent">
                    <Sparkles className="w-3 h-3" />
                    <span>{article.category || "Digital Marketing"}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  {/* Meta Byline */}
                  <div className="flex items-center gap-4 text-xs font-mono text-brand-text-muted mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formattedDate}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime || "5 min read"}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold text-white group-hover:text-brand-accent transition-colors leading-snug mb-3 ${
                      isFeatured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                    }`}
                  >
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-brand-text-secondary text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
                    {article.excerpt || article.seo_description || "Read the latest digital growth and engineering insights from Website Walae."}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/80">
                  <span className="text-white/60">{article.author}</span>
                  <span className="inline-flex items-center gap-1.5 text-brand-accent group-hover:translate-x-1 transition-transform font-bold">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
