"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Layout, Share2, Sparkles, Video, Search, Target, 
  ArrowRight, CheckCircle2, Cpu, Zap, Layers, BarChart3, 
  ChevronRight, PhoneCall, Code2, Film, Palette
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

type ServiceCategory = "ALL" | "DEV & DESIGN" | "MEDIA & CONTENT" | "MARKETING & GROWTH";

interface ServiceItem {
  id: string;
  num: string;
  name: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  icon: any;
  accentColor: string;
  deliverables: string[];
  techStack: string[];
  impactMetric: string;
  idealFor: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "website-dev",
    num: "01",
    name: "Website Development",
    category: "DEV & DESIGN",
    tagline: "Ultra-fast Next.js 16 & WebGL Digital Experiences",
    description: "We don't build generic template websites. We architect custom, high-velocity web platforms engineered for 100/100 Lighthouse performance, spatial interactivity, and seamless conversion.",
    icon: Globe,
    accentColor: "#C7FF3D",
    deliverables: [
      "Custom Next.js & React Architecture",
      "Headless CMS & Supabase Integration",
      "Interactive 3D / GSAP WebGL Effects",
      "Full E-commerce & Checkout Systems",
      "99+ Lighthouse Speed Score"
    ],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Three.js", "GSAP"],
    impactMetric: "0.4s Avg Page Load // 100% Mobile Ready",
    idealFor: "Brands wanting to look like market leaders"
  },
  {
    id: "ui-ux",
    num: "02",
    name: "UI / UX Design",
    category: "DEV & DESIGN",
    tagline: "Spatial Design Systems & High-Fidelity Prototypes",
    description: "Intuitive, dark-aesthetic interfaces engineered to captivate users and elevate brand stature. We craft living design systems and clickable prototypes before writing a single line of code.",
    icon: Layout,
    accentColor: "#8B5CF6",
    deliverables: [
      "Comprehensive Figma Design Systems",
      "High-Fidelity Clickable Prototypes",
      "Information Architecture & User Journeys",
      "Mobile-First Responsive Layouts",
      "Custom Micro-Interactions & Icons"
    ],
    techStack: ["Figma", "Design Tokens", "Auto-Layout", "Spatial UX", "Prototyping"],
    impactMetric: "Zero-Friction User Flow // High Retention",
    idealFor: "SaaS, Startups, Premium Retail & E-com"
  },
  {
    id: "video-production",
    num: "03",
    name: "Video Production",
    category: "MEDIA & CONTENT",
    tagline: "Cinematic 4K Commercials & Viral Reel Systems",
    description: "High-end commercial films, lifestyle product reels, and brand storytelling shot on cinema cameras and graded in DaVinci Resolve. Built specifically for algorithmic attention and engagement.",
    icon: Video,
    accentColor: "#EF4444",
    deliverables: [
      "High-Impact Commercial Films & Shoots",
      "Short-Form Video (Reels, Shorts, TikTok)",
      "ProRes 4K RAW Cinema Capture",
      "DaVinci Resolve Color Grading & VFX",
      "Custom Sound Design & Master Audio"
    ],
    techStack: ["Sony Cinema FX", "DaVinci Resolve", "Premiere Pro", "After Effects"],
    impactMetric: "ProRes 4K Mastered // High Re-watch Rate",
    idealFor: "Brands needing viral organic reach"
  },
  {
    id: "content-creation",
    num: "04",
    name: "Content Creation",
    category: "MEDIA & CONTENT",
    tagline: "Creative Storytelling, Brand Copy & High-End Visuals",
    description: "We craft multi-format content assets that establish category leadership: from brand photography and carousels to persuasive copywriting that compels target audiences to take immediate action.",
    icon: Sparkles,
    accentColor: "#F59E0B",
    deliverables: [
      "Brand Photography & Product Shoots",
      "Conversion-Driven Ad Copy & Scripting",
      "Social Visual Identity & Carousel Kits",
      "High-Converting Landing Page Copy",
      "Quarterly Content Asset Banks"
    ],
    techStack: ["Creative Direction", "Studio Lighting", "Copywriting", "Art Direction"],
    impactMetric: "Multi-Platform Asset Kit // High Viral Potential",
    idealFor: "Growing businesses lacking in-house creative"
  },
  {
    id: "social-media",
    num: "05",
    name: "Social Media Marketing",
    category: "MARKETING & GROWTH",
    tagline: "Attention Engineering & Organic Community Scaling",
    description: "We don't just post to keep accounts active. We build strategic distribution engines that turn casual viewers into loyal brand advocates, multiplying reach and organic inbound inquiries.",
    icon: Share2,
    accentColor: "#EC4899",
    deliverables: [
      "Growth Architecture & Algorithm Strategy",
      "End-to-End Content Calendar Execution",
      "Community Engagement & DM Nurturing",
      "Influencer & Creator Collaborations",
      "Monthly KPI Tracking & Growth Reports"
    ],
    techStack: ["Instagram", "LinkedIn", "YouTube", "Meta Business Suite", "Analytics"],
    impactMetric: "+300% Organic Reach Growth // Real Followers",
    idealFor: "Brands looking to dominate their local or global niche"
  },
  {
    id: "meta-ads",
    num: "06",
    name: "Meta Ads & Paid Acquisition",
    category: "MARKETING & GROWTH",
    tagline: "Precision Paid Traffic Engineered for Predictable ROI",
    description: "Stop burning ad budget on boosted posts. We build high-converting paid acquisition funnels using advanced CBO/ABO testing, lookalike audiences, and high-CTR creative hooks that yield positive ROAS.",
    icon: Target,
    accentColor: "#3B82F6",
    deliverables: [
      "Conversion API & Pixel Setup",
      "Cold, Warm & Retargeting Funnels",
      "Dynamic A/B Creative Testing",
      "Custom Audience & Lookalike Modeling",
      "ROAS-Driven Weekly Ad Budget Scaling"
    ],
    techStack: ["Meta Ads Manager", "Conversion API", "CBO Testing", "Analytics"],
    impactMetric: "4.8x Average Return on Ad Spend (ROAS)",
    idealFor: "E-commerce stores, real estate, clinics, & B2B leads"
  },
  {
    id: "seo",
    num: "07",
    name: "Search Engine Optimization (SEO)",
    category: "MARKETING & GROWTH",
    tagline: "Dominating Google Search & AI Answer Engines",
    description: "Capture customers at the exact moment they search for your services. We execute deep technical SEO, structured JSON-LD schema, local Lucknow & national keyword dominance to secure #1 rankings.",
    icon: Search,
    accentColor: "#10B981",
    deliverables: [
      "Technical Core Web Vitals Optimization",
      "High-Intent Keyword Cluster Research",
      "Local SEO & Google Business Profile Domination",
      "Rich Snippet Schema & AI Answer Engine Opt.",
      "Authority Link Building & Content Silos"
    ],
    techStack: ["Google Search Console", "Semrush", "JSON-LD Schema", "Lighthouse"],
    impactMetric: "#1 Organic Rankings // Zero Ad Spend Traffic",
    idealFor: "Local Lucknow businesses & national platforms"
  }
];

const CATEGORIES: ServiceCategory[] = ["ALL", "DEV & DESIGN", "MEDIA & CONTENT", "MARKETING & GROWTH"];

const PROCESS_STEPS = [
  { step: "01", title: "DEEP DISCOVERY", desc: "We analyze your business, dissect competitors, and engineer the precise digital roadmap for growth." },
  { step: "02", title: "SPATIAL ARCHITECTURE", desc: "We prototype interactive wireframes and design systems so you experience the look before code." },
  { step: "03", title: "RAPID PRODUCTION", desc: "High-velocity development, 4K shoot production, and ad funnel building with zero lag." },
  { step: "04", title: "LAUNCH & DOMINATE", desc: "Rigorous quality assurance, deployment on global CDNs, and data-driven scaling." },
];

export default function ServicesPageClient() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("ALL");
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const filteredServices = activeCategory === "ALL" 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-[#050505] text-brand-text pt-28 pb-16">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Hero Header Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] pt-8 sm:pt-12 pb-12 sm:pb-16 relative">
        <div className="absolute top-10 right-10 w-72 h-72 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-accent bg-brand-accent/10 border border-brand-accent/30 px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>FULL-STACK DIGITAL CREATIVE STUDIO // 7 CORE CAPABILITIES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            CAPABILITIES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-brand-accent">
              ENGINEERED TO GROW.
            </span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-brand-text-secondary max-w-3xl font-medium leading-relaxed">
            We bridge high-end cinematic aesthetics with cutting-edge engineering and data-driven marketing. Everything you need to scale your brand under one unified roof.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">100%</div>
              <div className="text-xs font-mono text-brand-text-muted uppercase">In-House Execution</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-brand-accent font-mono">60 FPS</div>
              <div className="text-xs font-mono text-brand-text-muted uppercase">Digital Performance</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">4K RAW</div>
              <div className="text-xs font-mono text-brand-text-muted uppercase">Cinema Capture</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-brand-accent font-mono">4.8x</div>
              <div className="text-xs font-mono text-brand-text-muted uppercase">Average Ad ROAS</div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter Pills Bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-12 border-b border-white/10 pb-6">
          <span className="text-xs font-mono text-brand-text-muted uppercase tracking-wider mr-2 hidden sm:inline">
            FILTER CAPABILITY:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  isSelected
                    ? "bg-brand-accent text-black font-bold shadow-[0_0_20px_rgba(199,255,61,0.35)] scale-105"
                    : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] pb-24">
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => {
              const Icon = service.icon;
              const isHovered = hoveredService === service.id;

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-brand-accent/60 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                >
                  {/* Subtle Accent Glow on Card Hover */}
                  <div 
                    className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-20"
                    style={{ backgroundColor: service.accentColor }}
                  />

                  <div>
                    {/* Card Header Row */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                          style={{ 
                            backgroundColor: `${service.accentColor}15`, 
                            borderColor: `${service.accentColor}40`,
                            color: service.accentColor 
                          }}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                            {service.category}
                          </div>
                          <div className="text-xs font-mono font-bold" style={{ color: service.accentColor }}>
                            CAPABILITY [{service.num}]
                          </div>
                        </div>
                      </div>

                      {/* Expected Impact Badge */}
                      <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/80">
                        <Zap className="w-3 h-3 text-brand-accent" />
                        <span>{service.impactMetric.split("//")[0]}</span>
                      </div>
                    </div>

                    {/* Service Name & Tagline */}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase mb-2 group-hover:text-brand-accent transition-colors duration-300">
                      {service.name}
                    </h2>
                    <p className="text-xs sm:text-sm font-mono text-brand-accent mb-4">
                      ✦ {service.tagline}
                    </p>

                    <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-white/10">
                      <div className="text-[11px] font-mono text-white/40 uppercase tracking-widest mb-2">
                        CORE DELIVERABLES:
                      </div>
                      {service.deliverables.map((deliv, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/85">
                          <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech & Tooling Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6">
                      {service.techStack.map((tool) => (
                        <span 
                          key={tool} 
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 text-[10px] font-mono text-brand-text-secondary"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Action Bar */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 mt-auto">
                    <div className="text-[11px] font-mono text-brand-text-muted hidden sm:block">
                      Ideal for: <span className="text-white/80">{service.idealFor}</span>
                    </div>

                    <Link
                      href={`/start-a-project?service=${encodeURIComponent(service.name)}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-white transition-all duration-300 group-hover:bg-brand-accent group-hover:text-black group-hover:border-brand-accent group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(199,255,61,0.4)] ml-auto"
                      data-cursor="button"
                    >
                      <span>START WITH THIS</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4-Step Studio Delivery Pipeline */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-20 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-3">
            HOW WE DELIVER EXCELLENCE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            THE 4-STAGE <span className="text-brand-accent">PIPELINE</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-text-secondary font-mono">
            Every client engagement follows our battle-tested studio blueprint to guarantee zero downtime and maximum business impact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((item, pIdx) => (
            <div 
              key={item.step}
              className="glass p-6 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-brand-accent/50 transition-all duration-300"
            >
              <div className="text-4xl font-black text-brand-accent/30 font-mono mb-4 group-hover:text-brand-accent transition-colors">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-16">
        <div className="relative rounded-3xl overflow-hidden border border-brand-accent/30 p-8 sm:p-14 lg:p-20 bg-gradient-to-br from-[#0c1404] via-[#080808] to-[#040404] text-center flex flex-col items-center justify-center shadow-[0_0_80px_rgba(199,255,61,0.1)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,255,61,0.12),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-mono text-brand-accent uppercase tracking-widest mb-4 inline-block">
              READY TO ACCELERATE?
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
              HAVE AN IDEA? <br />
              <span className="text-brand-accent">LET&apos;S BUILD IT TOGETHER.</span>
            </h2>
            <p className="text-sm sm:text-lg text-brand-text-secondary mb-8 leading-relaxed">
              Tell us what you&apos;re building. We will assemble the exact design, tech stack, and content team to deliver results.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/start-a-project"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-accent text-black font-bold text-sm tracking-wide transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(202,255,0,0.5)] hover:scale-105 inline-flex items-center justify-center gap-2"
                data-cursor="button"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/20 text-white font-bold text-sm tracking-wide transition-all duration-300 hover:bg-white/10 hover:border-white/40"
              >
                VIEW PRICING PACKAGES
              </Link>
              <a
                href="tel:7317782998"
                className="w-full sm:w-auto px-6 py-4 rounded-full text-brand-text-secondary hover:text-brand-accent transition-colors font-mono text-xs inline-flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>+91 7317782998</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
