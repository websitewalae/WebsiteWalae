"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { 
  Globe, Layout, Share2, Camera, Video, Search, Target, 
  Sparkles, ArrowRight, Play, CheckCircle2, Code, Layers, 
  TrendingUp, Activity, MousePointerClick, Users, Eye, Heart, MessageCircle, Bookmark, Check
} from "lucide-react";

type Service = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  icon: any;
  hudStatus: string;
  metrics: string[];
};

const SERVICES: Service[] = [
  {
    id: "01",
    name: "Website Development",
    category: "ENGINEERING",
    tagline: "High-performance dynamic Next.js digital experiences.",
    icon: Globe,
    hudStatus: "BUILDING WEBSITE // COMPONENTS: 24 // STATUS: LIVE",
    metrics: ["100/100 LIGHTHOUSE", "NEXT.JS 16", "TURBOPACK"]
  },
  {
    id: "02",
    name: "UI / UX Design",
    category: "DESIGN SYSTEM",
    tagline: "Spatial, immersive visual systems crafted for modern brands.",
    icon: Layout,
    hudStatus: "DESIGN SYSTEM // AUTO LAYOUT // PROTOTYPE READY",
    metrics: ["FIGMA SYSTEM", "AUTO LAYOUT", "SPATIAL UX"]
  },
  {
    id: "03",
    name: "Social Media Marketing",
    category: "ATTENTION",
    tagline: "Virality engines and high-converting content ecosystems.",
    icon: Share2,
    hudStatus: "SOCIAL ENGINE // VIRAL SIGNAL // ENGAGEMENT PEAKING",
    metrics: ["+45.2K REACH", "14.5K ENGAGEMENT", "4.8% CTR"]
  },
  {
    id: "04",
    name: "Content Creation",
    category: "PRODUCTION",
    tagline: "High-end commercials, product shoots, and reel production.",
    icon: Camera,
    hudStatus: "CREATIVE STUDIO // SHOT LIST: 12/12 // LIGHTING: OPTIMAL",
    metrics: ["4K RAW SHOOTS", "STORYBOARDING", "BRAND REELS"]
  },
  {
    id: "05",
    name: "Video Production",
    category: "CINEMATOGRAPHY",
    tagline: "Cinematic filming, editing, color grading, and VFX.",
    icon: Video,
    hudStatus: "PRORES 4K RAW // TIMELINE ACTIVE // COLOR GRADED",
    metrics: ["REC ● 00:01:24:18", "COLOR GRADED", "PRORES 422"]
  },
  {
    id: "06",
    name: "SEO",
    category: "VISIBILITY",
    tagline: "Organic search dominance and technical web indexing.",
    icon: Search,
    hudStatus: "CRAWL: COMPLETE // INDEXED: 100% // RANK: #1",
    metrics: ["RANK #1 GOOGLE", "TECHNICAL SEO", "ORGANIC GROWTH"]
  },
  {
    id: "07",
    name: "Meta Ads",
    category: "PERFORMANCE",
    tagline: "AI-targeted campaign ecosystems built for measurable ROI.",
    icon: Target,
    hudStatus: "CAMPAIGN ACTIVE // TARGETING OPTIMIZED // LEADS GENERATING",
    metrics: ["98% AUDIENCE MATCH", "5.2% CTR", "4.8X ROAS"]
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // 3D Pointer Parallax Tilt for Live Visual Stage
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 120, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 120, damping: 25 });

  // Viewport trigger setup (Rule 09: 0s immediate activation)
  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(headingRef.current, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const activeService = SERVICES[activeIndex];

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="relative w-full bg-[#070707] py-20 sm:py-28 lg:py-40 z-20 border-t border-brand-border overflow-hidden selection:bg-brand-accent selection:text-black"
    >
      {/* Background Grid & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] bg-brand-accent/20 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute bottom-1/3 right-1/4 w-[35vw] h-[35vw] bg-blue-600/15 rounded-full blur-[140px] mix-blend-screen" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw]">
        
        {/* Section Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-20 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-accent font-mono text-xs tracking-widest uppercase mb-3">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>EXPERIENCE OUR CAPABILITIES</span>
            </div>
            <h2 className="text-h2 text-white">DON&apos;T READ OUR SERVICES.<br/><span className="text-brand-accent">EXPERIENCE THEM.</span></h2>
          </div>
          <p className="text-brand-text-secondary text-sm sm:text-base max-w-sm font-mono">
            Hover or tap any service to activate its live visual stage.
          </p>
        </div>

        {/* 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: 7 Interactive Service Triggers (7 cols) */}
          <div className="lg:col-span-6 flex flex-col border-t border-white/10">
            {SERVICES.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative border-b border-white/10 py-5 sm:py-7 flex flex-col cursor-pointer transition-all duration-300 ${isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"}`}
                  data-cursor="service"
                >
                  {/* Service Row Main Info */}
                  <div className="flex items-center justify-between w-full px-2 sm:px-4">
                    <div className="flex items-center gap-3 sm:gap-6 relative z-10 transition-transform duration-300 group-hover:translate-x-2">
                      <span className={`text-xs sm:text-sm font-mono transition-colors duration-300 ${isActive ? "text-brand-accent font-bold" : "text-brand-text-muted group-hover:text-white"}`}>
                        {service.id}
                      </span>
                      <span className={`text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight transition-colors duration-300 ${isActive ? "text-white" : "text-brand-text-secondary group-hover:text-white"}`}>
                        {service.name}
                      </span>
                    </div>

                    {/* Animated Energy Trace Line & Arrow Indicator */}
                    <div className="flex items-center gap-3">
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          className="hidden sm:flex items-center gap-2 text-brand-accent text-xs font-mono"
                        >
                          <span className="w-12 h-px bg-brand-accent/60" />
                          <span className="text-[10px] uppercase font-bold tracking-widest">VIEW [{service.id}]</span>
                        </motion.div>
                      )}
                      <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${isActive ? "text-brand-accent translate-x-1" : "text-white/20 group-hover:text-white/60"}`} />
                    </div>
                  </div>

                  {/* Active Tagline Drawer */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-2 sm:px-4 mt-2 overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm text-brand-text-secondary pl-7 sm:pl-12 font-mono">
                          {service.tagline}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Spatial Live Visual Stage (5 cols on lg) */}
          <div 
            ref={stageRef}
            onMouseMove={handleStageMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            className="lg:col-span-6 sticky top-24 w-full"
          >
            <motion.div 
              style={{ rotateX, rotateY, transformPerspective: 1000 }}
              className="relative w-full h-[460px] sm:h-[520px] bg-black border border-white/15 rounded-2xl flex flex-col overflow-hidden shadow-floating will-change-transform"
            >
              {/* Stage Top HUD Bar */}
              <div className="h-11 bg-[#0a0a0a] border-b border-white/10 px-4 flex items-center justify-between text-[10px] font-mono text-white/80 shrink-0 z-20">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse" />
                  <span className="font-bold tracking-widest text-brand-accent">LIVE STAGE // {activeService.category}</span>
                </div>
                <div className="flex items-center gap-3 text-brand-text-muted">
                  <span className="hidden sm:inline">60 FPS</span>
                  <span>{activeService.id} / 07</span>
                </div>
              </div>

              {/* Stage Canvas Area */}
              <div className="relative flex-1 bg-[#040404] overflow-hidden flex items-center justify-center p-4 sm:p-6">
                
                {/* Scanlines & Grain */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-40" />

                {/* MORPHING STAGE CONTENT PER SERVICE */}
                <AnimatePresence mode="wait">
                  
                  {/* ========================================================================= */}
                  {/* 01 — WEBSITE DEVELOPMENT WORLD */}
                  {/* ========================================================================= */}
                  {activeIndex === 0 && (
                    <motion.div 
                      key="dev"
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      {/* Browser Mockup Container */}
                      <div className="w-full h-full bg-[#0a0a0a] border border-white/10 rounded-xl flex flex-col overflow-hidden shadow-cinematic">
                        {/* Browser Address Bar */}
                        <div className="h-8 bg-brand-surface border-b border-white/10 flex items-center px-3 gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500/70" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                          <div className="w-2 h-2 rounded-full bg-green-500/70" />
                          <div className="ml-3 h-5 flex-1 bg-black/60 rounded border border-white/10 flex items-center px-3">
                            <span className="text-[9px] text-brand-text-muted font-mono">https://websitewalae.com</span>
                          </div>
                        </div>

                        {/* Animated Assembly Area */}
                        <div className="flex-1 p-4 flex flex-col justify-between relative bg-[#050505] overflow-hidden">
                          {/* Code Flashing Background */}
                          <div className="absolute top-2 left-2 text-[9px] font-mono text-brand-accent/20 pointer-events-none">
                            <div>import &#123; createStudio &#125; from &apos;@/engine&apos;;</div>
                            <div>const app = await createStudio(&#123; fps: 60 &#125;);</div>
                          </div>

                          {/* Nav Bar Assembly */}
                          <motion.div 
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="h-8 glass rounded-full flex justify-between items-center px-4 border border-white/10 z-10"
                          >
                            <div className="text-[10px] font-bold tracking-widest text-white">WALAE</div>
                            <div className="flex gap-2 text-[9px] text-brand-text-muted">
                              <span className="text-brand-accent">WORK</span>
                              <span>SERVICES</span>
                              <span>CONTACT</span>
                            </div>
                          </motion.div>

                          {/* Hero Assembly */}
                          <div className="flex-1 flex flex-col items-center justify-center text-center my-4 z-10">
                            <motion.h4 
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2, duration: 0.4 }}
                              className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2"
                            >
                              WE BUILD WHAT&apos;S NEXT.
                            </motion.h4>
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              className="text-[10px] sm:text-xs text-brand-text-secondary max-w-xs mb-3 font-mono"
                            >
                              High-performance digital experiences built with Next.js & GSAP.
                            </motion.p>
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                              className="px-4 py-1.5 bg-brand-accent text-black font-bold text-[10px] rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(199,255,61,0.4)]"
                            >
                              <span>LAUNCH PROJECT</span>
                              <ArrowRight className="w-3 h-3" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ========================================================================= */}
                  {/* 02 — UI / UX DESIGN WORLD */}
                  {/* ========================================================================= */}
                  {activeIndex === 1 && (
                    <motion.div 
                      key="design"
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className="w-full h-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
                        {/* Figma Style Canvas Background */}
                        <div className="flex justify-between items-center text-[10px] font-mono text-brand-text-muted border-b border-white/10 pb-2 mb-3">
                          <span className="text-blue-400 font-bold">FRAME: DESKTOP_HERO_V2 [360 × 480]</span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">AUTO LAYOUT</span>
                        </div>

                        {/* Split Wireframe -> Polished System */}
                        <div className="grid grid-cols-2 gap-3 flex-1 items-center">
                          {/* Wireframe Box */}
                          <div className="border border-dashed border-white/20 p-3 rounded-lg flex flex-col gap-2 bg-black/40 h-full justify-center">
                            <div className="text-[9px] font-mono text-white/40">WIREFRAME</div>
                            <div className="h-4 w-3/4 bg-white/10 rounded" />
                            <div className="h-10 w-full bg-white/5 rounded border border-dashed border-white/20" />
                            <div className="h-3 w-1/2 bg-white/10 rounded" />
                          </div>
                          {/* Polished Component */}
                          <div className="border border-brand-accent/50 p-3 rounded-lg flex flex-col gap-2 bg-brand-surface h-full justify-center shadow-[0_0_20px_rgba(199,255,61,0.15)] relative">
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                            <div className="text-[9px] font-mono text-brand-accent font-bold">POLISHED UI</div>
                            <div className="h-4 w-3/4 bg-white font-bold text-[10px] rounded flex items-center px-2 text-black">Website Walae</div>
                            <div className="h-10 w-full glass rounded p-2 text-[9px] text-white/80">Design System Active</div>
                            <div className="flex gap-1 mt-1">
                              <div className="w-3 h-3 rounded-full bg-brand-accent" />
                              <div className="w-3 h-3 rounded-full bg-white" />
                              <div className="w-3 h-3 rounded-full bg-blue-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ========================================================================= */}
                  {/* 03 — SOCIAL MEDIA MARKETING WORLD */}
                  {/* ========================================================================= */}
                  {activeIndex === 2 && (
                    <motion.div 
                      key="social"
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full flex flex-col items-center justify-center relative"
                    >
                      <div className="w-[240px] sm:w-[270px] glass rounded-3xl p-4 border border-brand-accent/40 bg-[#0a0a0a]/90 shadow-floating flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center font-bold text-black text-xs">WW</div>
                            <div>
                              <div className="text-xs font-bold text-white">Website Walae</div>
                              <div className="text-[9px] text-brand-text-muted">Sponsored • Viral Engine</div>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full font-bold">TRENDING</span>
                        </div>

                        {/* Media Box */}
                        <div className="h-44 rounded-xl border border-white/10 bg-gradient-to-br from-purple-900/40 via-indigo-900/20 to-black flex items-center justify-center relative overflow-hidden my-2">
                          <div className="w-10 h-10 rounded-full bg-black/60 border border-brand-accent flex items-center justify-center z-10 shadow-cinematic">
                            <Play className="w-4 h-4 text-brand-accent ml-0.5 fill-brand-accent" />
                          </div>
                          <div className="absolute bottom-2 left-2 text-[9px] font-mono text-brand-accent">REEL MASTER // 4K</div>
                        </div>

                        {/* Interactive Engagement Bar */}
                        <div className="flex justify-between items-center text-white mt-2">
                          <div className="flex gap-3 text-xs">
                            <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" />
                            <MessageCircle className="w-5 h-5 text-white/80" />
                            <Share2 className="w-5 h-5 text-white/80" />
                          </div>
                          <Bookmark className="w-5 h-5 text-white/80" />
                        </div>
                        <div className="text-xs font-bold text-white mt-2 font-mono">14,502 likes</div>
                      </div>
                    </motion.div>
                  )}

                  {/* ========================================================================= */}
                  {/* 04 — CONTENT CREATION WORLD */}
                  {/* ========================================================================= */}
                  {activeIndex === 3 && (
                    <motion.div 
                      key="content"
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full flex flex-col justify-between p-2"
                    >
                      <div className="w-full h-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
                        <div className="flex justify-between items-center text-[10px] font-mono text-brand-text-muted border-b border-white/10 pb-2">
                          <span className="text-red-500 font-bold flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                            STUDIO SHOOT // ACTIVE
                          </span>
                          <span>SHOT 03 OF 12</span>
                        </div>

                        {/* Storyboard Cards */}
                        <div className="grid grid-cols-3 gap-2 my-auto">
                          {[
                            { label: "01 PRODUCT", fps: "4K 24" },
                            { label: "02 REEL MOVEMENT", fps: "1080p 60" },
                            { label: "03 COMMERCIAL", fps: "RAW PRORES" }
                          ].map((shot, i) => (
                            <div key={i} className="glass p-2.5 rounded-lg border border-white/10 flex flex-col justify-between h-28 text-left bg-black/40">
                              <span className="text-[8px] font-mono text-brand-accent">{shot.fps}</span>
                              <div className="w-6 h-6 rounded bg-brand-surface flex items-center justify-center my-1">
                                <Camera className="w-3 h-3 text-white/70" />
                              </div>
                              <span className="text-[9px] font-bold text-white leading-tight">{shot.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ========================================================================= */}
                  {/* 05 — VIDEO PRODUCTION WORLD */}
                  {/* ========================================================================= */}
                  {activeIndex === 4 && (
                    <motion.div 
                      key="video"
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className="w-full h-full bg-black border border-red-500/40 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                        {/* Viewfinder Crosshair Bar */}
                        <div className="flex justify-between items-center text-[10px] font-mono text-white/90 z-10">
                          <div className="flex items-center gap-2 text-red-500 font-bold">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span>REC ● PRORES 4K RAW</span>
                          </div>
                          <span className="font-bold text-brand-accent">00:01:24:18</span>
                        </div>

                        {/* Viewfinder Reticle */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                          <div className="w-32 h-24 border border-white/40 relative flex items-center justify-center">
                            <div className="w-6 h-px bg-white" />
                            <div className="h-6 w-px bg-white absolute" />
                          </div>
                        </div>

                        {/* Timeline Track below */}
                        <div className="h-10 bg-brand-surface border border-white/10 rounded-lg p-2 flex items-center gap-2 z-10">
                          <div className="h-full bg-red-500/60 w-1/3 rounded" />
                          <div className="h-full bg-brand-accent/60 w-1/2 rounded" />
                          <div className="h-full bg-blue-500/60 flex-1 rounded" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ========================================================================= */}
                  {/* 06 — SEO WORLD */}
                  {/* ========================================================================= */}
                  {activeIndex === 5 && (
                    <motion.div 
                      key="seo"
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full flex flex-col justify-between p-2"
                    >
                      <div className="w-full h-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
                        <div className="flex justify-between items-center text-[10px] font-mono text-brand-text-muted border-b border-white/10 pb-2">
                          <span className="text-brand-accent font-bold">SEARCH INDEX // GOOGLE RANKING</span>
                          <span>ORGANIC CRAWL</span>
                        </div>

                        {/* Search Bar & Ranked Item */}
                        <div className="flex flex-col gap-3 my-auto">
                          <div className="h-9 glass rounded-full px-4 flex items-center gap-2 border border-white/10">
                            <Search className="w-3.5 h-3.5 text-brand-accent" />
                            <span className="text-xs text-white font-mono">best digital creative agency</span>
                          </div>

                          <div className="glass p-3 rounded-xl border border-brand-accent bg-brand-accent/10 flex flex-col gap-1 text-left">
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] font-mono text-brand-accent">https://websitewalae.com</span>
                              <span className="text-[9px] font-mono bg-brand-accent text-black font-bold px-2 py-0.5 rounded">RANK #1</span>
                            </div>
                            <div className="text-xs font-bold text-white">Website Walae | Digital Creative Agency</div>
                            <div className="text-[10px] text-brand-text-secondary">We build high-converting digital presences.</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ========================================================================= */}
                  {/* 07 — META ADS WORLD */}
                  {/* ========================================================================= */}
                  {activeIndex === 6 && (
                    <motion.div 
                      key="ads"
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full flex flex-col justify-between p-2"
                    >
                      <div className="w-full h-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
                        <div className="flex justify-between items-center text-[10px] font-mono text-brand-text-muted border-b border-white/10 pb-2">
                          <span className="text-purple-400 font-bold">META ADS // TARGETING MATRIX</span>
                          <span>ROAS: 4.8X</span>
                        </div>

                        {/* Audience Matching Nodes & Lead Notification */}
                        <div className="grid grid-cols-2 gap-3 my-auto">
                          <div className="glass p-3 rounded-xl border border-white/10 flex flex-col justify-between h-28">
                            <span className="text-[9px] font-mono text-brand-text-muted">TARGET MATCH</span>
                            <div className="text-xl font-bold font-mono text-brand-accent">98.4%</div>
                            <span className="text-[9px] font-bold text-white">HIGH INTENT AUDIENCE</span>
                          </div>

                          <div className="glass p-3 rounded-xl border border-purple-500/40 bg-purple-900/20 flex flex-col justify-between h-28">
                            <span className="text-[9px] font-mono text-purple-300">LEADS GENERATED</span>
                            <div className="text-xl font-bold font-mono text-white">+142 LEADS</div>
                            <span className="text-[9px] font-bold text-purple-300">CONVERSION PEAKING</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

              </div>

              {/* Stage Bottom Status Metrics */}
              <div className="h-12 bg-[#080808] border-t border-white/10 px-4 flex items-center justify-between text-[10px] font-mono text-white/70 shrink-0 z-20">
                <div className="flex items-center gap-2 sm:gap-4 truncate">
                  {activeService.metrics.map((metric, i) => (
                    <span key={i} className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10 text-white/90">
                      <Check className="w-3 h-3 text-brand-accent" />
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
