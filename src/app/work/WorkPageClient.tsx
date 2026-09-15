"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, Sparkles, Filter } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

type ProjectCategory = "ALL" | "WEBSITES" | "BRANDING" | "SOCIAL" | "VIDEO" | "CAMPAIGNS";

interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  industry: string;
  service: string;
  description: string;
  url: string;
  year: string;
}

const PROJECTS: Project[] = [
  { id: "01", name: "Accuved by Rekha", category: "WEBSITES", industry: "Health & Wellness", service: "Web Development", description: "Ayurvedic wellness platform built with dynamic catalog, responsive design, and SEO structure.", url: "https://accuvedbyrekha.com/", year: "2025" },
  { id: "02", name: "Briocred Pharma", category: "WEBSITES", industry: "Medical", service: "Corporate Website", description: "Pharmaceutical corporate web presence designed for high credibility, product showcase, and compliance.", url: "https://briocredpharmaceuticals.com/", year: "2024" },
  { id: "03", name: "Buy Noorea", category: "WEBSITES", industry: "E-Commerce", service: "E-commerce Development", description: "Online retail storefront crafted with smooth checkout flow, mobile optimization, and brand identity.", url: "https://buynoorea.com/", year: "2024" },
  { id: "04", name: "Tulip Eyewear", category: "BRANDING", industry: "Fashion & Retail", service: "Web App & UI/UX", description: "Premium eyewear shopping experience showcasing luxury minimalist visual aesthetics and catalog filters.", url: "https://tulip-eyewear.vercel.app/", year: "2025" },
  { id: "05", name: "Safed Rang", category: "BRANDING", industry: "Apparel & Fashion", service: "E-commerce & Branding", description: "Minimalist fashion brand storefront built for high conversion and brand storytelling.", url: "https://safedrang.com/", year: "2024" },
  { id: "06", name: "Haj Umrah Deals", category: "CAMPAIGNS", industry: "Travel & Hospitality", service: "Web Portal & Marketing", description: "Pilgrimage travel booking portal with custom lead capture, package filters, and enquiry workflow.", url: "https://hajumrahdeals.com/", year: "2024" },
  { id: "07", name: "Skyscraper Builder", category: "WEBSITES", industry: "Real Estate", service: "Corporate Website", description: "Construction & real estate development portfolio highlighting project showcases and lead generation.", url: "https://skyscraperbuilderdeveloper.com/", year: "2025" },
  { id: "08", name: "Union Traders", category: "WEBSITES", industry: "Trading & B2B", service: "B2B Commerce Portal", description: "Industrial B2B trade portal designed for product catalog browsing and instant bulk quotes.", url: "https://uniontradersindia.com/", year: "2024" },
  { id: "09", name: "Shunyity Tech", category: "WEBSITES", industry: "Technology", service: "Agency Web Platform", description: "IT solutions and agency web platform highlighting modern tech architecture and digital services.", url: "https://www.shunyitytechsolutions.com/", year: "2024" },
  { id: "10", name: "Preserve Comm.", category: "BRANDING", industry: "PR & Media", service: "Corporate Website", description: "Corporate communications and public relations agency website with sleek dark design language.", url: "https://preservecommunication.com/", year: "2025" },
  { id: "11", name: "Kitchen Sweets", category: "SOCIAL", industry: "Food & Beverage", service: "Web App & Content", description: "Online sweets & bakery web application featuring appetizing media content and online ordering.", url: "https://kitchen-sweets.vercel.app/", year: "2025" },
  { id: "12", name: "Website Walae Commercials", category: "VIDEO", industry: "Creative Media", service: "Video Production & Reels", description: "High-impact video reels, commercial shoots, and short-form video content produced for brand growth.", url: "https://websitewalae.com/", year: "2025" },
];

const CATEGORIES: ProjectCategory[] = ["ALL", "WEBSITES", "BRANDING", "SOCIAL", "VIDEO", "CAMPAIGNS"];

export default function WorkPageClient() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === "ALL"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-[#050505] text-brand-text pt-28 pb-16">
      {/* Noise Background Overlay */}
      <div className="noise-overlay" />

      {/* Header Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] pt-12 pb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-brand-accent uppercase tracking-widest mb-4">
          <Sparkles className="w-4 h-4" />
          SELECTED PROJECTS // WORK SHOWCASE
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter uppercase mb-6 leading-none">
          WORK THAT SPEAKS <br />
          <span className="text-brand-text-secondary">BEFORE WE DO.</span>
        </h1>
        <p className="text-base sm:text-xl text-brand-text-secondary max-w-2xl font-medium">
          A collection of digital platforms, e-commerce storefronts, brand systems, and creative campaigns engineered for real-world presence and functionality.
        </p>

        {/* Filter Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-10 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-text-muted mr-3">
            <Filter className="w-3.5 h-3.5" />
            FILTER:
          </div>
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  isSelected
                    ? "bg-brand-accent text-black font-bold shadow-[0_0_15px_rgba(202,255,0,0.3)]"
                    : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-8">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-brand-accent/50 transition-all duration-500 shadow-cinematic"
              >
                {/* Visual Preview Screenshot Container with async loading */}
                <div className="relative w-full h-56 sm:h-64 bg-[#0d0d0d] bg-[radial-gradient(ellipse_at_top,rgba(199,255,61,0.05),transparent_70%)] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10 pointer-events-none" />
                  <img
                    src={`https://s0.wordpress.com/mshots/v1/${encodeURIComponent(project.url)}?w=800`}
                    alt={project.name}
                    decoding="async"
                    className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter group-hover:filter-none grayscale group-hover:grayscale-0"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-brand-accent uppercase tracking-wider">
                    {project.category}
                  </div>
                  
                  <div className="absolute top-4 right-4 z-20 text-xs font-mono text-white/50">
                    {project.year}
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-6 flex flex-col justify-between flex-1 relative z-20">
                  <div>
                    <div className="text-xs font-mono text-brand-accent mb-1">{project.service}</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-brand-accent transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed line-clamp-3 mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-[10px] font-mono text-white/40 uppercase">Industry: {project.industry}</span>
                    
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-brand-accent transition-colors group/link"
                    >
                      <span>View Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Start Project CTA Banner */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-20 mt-12 border-t border-white/10">
        <div className="glass p-8 sm:p-14 rounded-3xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-gradient-to-r from-white/[0.03] to-brand-accent/[0.05]">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase text-white mb-2">
              HAVE A PROJECT IN MIND?
            </h2>
            <p className="text-sm sm:text-base text-brand-text-secondary max-w-xl">
              Let&apos;s build a digital experience tailored specifically to your brand strategy and business goals.
            </p>
          </div>

          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(202,255,0,0.4)] shrink-0"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
