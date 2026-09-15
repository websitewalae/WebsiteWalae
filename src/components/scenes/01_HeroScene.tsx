"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Menu,
  ChevronDown,
  ArrowRight,
  Code,
  Layout,
  Share2,
  Sparkles,
  Video,
  Search,
  Target,
  ExternalLink,
  Zap,
  CheckCircle2,
  TrendingUp,
  Megaphone
} from "lucide-react";
import HeroLogo3D from "../ui/HeroLogo3D";

// 8 Core Services Definition
const SERVICES = [
  {
    id: "ui-ux",
    num: "01",
    title: "UI / UX DESIGN",
    mobileTitle: "UI / UX",
    icon: Layout,
    color: "#7C3AED",
    pos: { top: "8%", left: "50%", transform: "translateX(-50%)" },
    mobilePos: { top: "10%", left: "50%", transform: "translateX(-50%)" },
    lineAngle: -90,
    preview: {
      tag: "DESIGN SYSTEM",
      heading: "Figma & Design Systems",
      desc: "Pixel-perfect visual architectures, component libraries & interactive prototypes.",
      stats: ["4.9/5 Rating", "100+ UI Kits"],
    },
  },
  {
    id: "web-dev",
    num: "02",
    title: "WEBSITE DEVELOPMENT",
    mobileTitle: "WEB DEV",
    icon: Code,
    color: "#C7FF3D",
    pos: { top: "20%", right: "6%" },
    mobilePos: { top: "17%", right: "2%" },
    lineAngle: -35,
    preview: {
      tag: "FULLSTACK WEB",
      heading: "Next.js & WebGL Systems",
      desc: "Ultra-fast, SEO-optimized web applications built with modern 3D & GSAP motion.",
      stats: ["100/100 Lighthouse", "60 FPS Motion"],
    },
  },
  {
    id: "video-prod",
    num: "03",
    title: "VIDEO PRODUCTION",
    mobileTitle: "VIDEO PROD",
    icon: Video,
    color: "#EF4444",
    pos: { top: "50%", right: "3%", transform: "translateY(-50%)" },
    mobilePos: { top: "63%", right: "2%" },
    lineAngle: 0,
    preview: {
      tag: "CINEMATIC 4K",
      heading: "Commercials & Visuals",
      desc: "High-end video production, 3D motion graphics & commercial brand films.",
      stats: ["4K RAW Capture", "Color Graded"],
    },
  },
  {
    id: "meta-ads",
    num: "04",
    title: "META ADS",
    mobileTitle: "META ADS",
    icon: Target,
    color: "#3B82F6",
    pos: { bottom: "20%", right: "8%" },
    mobilePos: { top: "72%", right: "3%" },
    lineAngle: 45,
    preview: {
      tag: "PERFORMANCE MARKETING",
      heading: "Paid Acquisition & Scaling",
      desc: "Data-driven Meta ad campaigns targeting high-intent custom audiences.",
      stats: ["4.8x Avg ROAS", "+1.2M Reach"],
    },
  },
  {
    id: "seo",
    num: "05",
    title: "SEO & GROWTH",
    mobileTitle: "SEO & GROWTH",
    icon: Search,
    color: "#10B981",
    pos: { bottom: "20%", left: "8%" },
    mobilePos: { top: "72%", left: "3%" },
    lineAngle: 135,
    preview: {
      tag: "ORGANIC RANKING",
      heading: "Search Engine Dominance",
      desc: "Technical SEO, semantic keyword optimization & authority link acquisition.",
      stats: ["#1 Rank Growth", "+350% Organic"],
    },
  },
  {
    id: "content-creation",
    num: "06",
    title: "CONTENT CREATION",
    mobileTitle: "CONTENT",
    icon: Sparkles,
    color: "#F59E0B",
    pos: { top: "50%", left: "3%", transform: "translateY(-50%)" },
    mobilePos: { top: "63%", left: "2%" },
    lineAngle: 180,
    preview: {
      tag: "STUDIO CREATIVE",
      heading: "Brand Storytelling & Assets",
      desc: "Short-form video, creative copy, graphic design & content systems.",
      stats: ["10k+ Asset Bank", "Viral Formats"],
    },
  },
  {
    id: "social-media",
    num: "07",
    title: "SOCIAL MEDIA MARKETING",
    mobileTitle: "SOCIAL MEDIA",
    icon: Share2,
    color: "#EC4899",
    pos: { top: "20%", left: "6%" },
    mobilePos: { top: "17%", left: "2%" },
    lineAngle: -145,
    preview: {
      tag: "ATTENTION ENGINE",
      heading: "Social Strategy & Growth",
      desc: "Multi-platform content distribution, community management & audience scaling.",
      stats: ["+2.4M Views", "85% Engaged"],
    },
  },
  {
    id: "pr-public-relations",
    num: "08",
    title: "PR / PUBLIC RELATIONS",
    mobileTitle: "PR",
    icon: Megaphone,
    color: "#06B6D4",
    pos: { bottom: "5%", left: "50%", transform: "translateX(-50%)" },
    mobilePos: { bottom: "10%", left: "50%", transform: "translateX(-50%)" },
    lineAngle: 90,
    preview: {
      tag: "BRAND AUTHORITY",
      heading: "Digital PR & Outreach",
      desc: "High-tier media placements, reputation management & industry dominance.",
      stats: ["100+ Publications", "Verified Trust"],
    },
  }
];

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const nodesContainerRef = useRef<HTMLDivElement>(null);

  // Hover & Active States
  const [isLogoHovered, setIsLogoHovered] = useState<boolean>(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);

  // SSR Safe Window dimensions
  const [windowDims, setWindowDims] = useState<{ w: number; h: number }>({ w: 1200, h: 800 });

  useEffect(() => {
    const updateDims = () => {
      if (typeof window !== "undefined") {
        setWindowDims({ w: window.innerWidth, h: window.innerHeight });
      }
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  // Mouse Parallax normalized (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springMouseY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      const normX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const normY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseX.set(normX);
      mouseY.set(normY);
    }
  };

  // GSAP 1st Scroll Response & Perspective Recede
  useEffect(() => {
    if (!sectionRef.current || !logoContainerRef.current || !nodesContainerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 0.4,
        pin: true,
        pinSpacing: true,
      },
    });

    // 1st Pixel Scroll: 3D logo recedes backward, service nodes collapse toward center
    tl.to(
      logoContainerRef.current,
      {
        scale: 0.65,
        y: "-15%",
        opacity: 0.3,
        duration: 1,
        ease: "none",
      },
      0
    );

    tl.to(
      nodesContainerRef.current,
      {
        scale: 0.8,
        opacity: 0.1,
        duration: 0.8,
        ease: "power2.in",
      },
      0
    );

    tl.to(
      contentRef.current,
      {
        opacity: 0,
        y: -50,
        duration: 0.7,
        ease: "power2.inOut",
      },
      0
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#030303] selection:bg-brand-accent selection:text-black max-w-full"
    >
      {/* ========================================================================= */}
      {/* BACKGROUND CANVAS: ATMOSPHERIC LIGHT & GRAIN */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            opacity: isLogoHovered ? [0.35, 0.6, 0.35] : [0.15, 0.3, 0.15],
            scale: isLogoHovered ? 1.15 : 1,
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-gradient-to-br from-brand-accent/20 via-purple-900/20 to-blue-900/10 rounded-full blur-[180px] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_4px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/90" />
      </div>

      {/* ========================================================================= */}
      {/* SVG CONNECTING SIGNAL PATHS BETWEEN CENTRAL LOGO AND 7 SERVICE NODES */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        <svg className="w-full h-full overflow-visible">
          {SERVICES.map((srv, idx) => {
            const isSelected = activeServiceIndex === idx;
            const isAnyActive = activeServiceIndex !== null;
            const isMobile = windowDims.w < 768;

            const targetXPercent = isMobile ?
              (idx === 0 ? 0.5 : idx === 1 ? 0.82 : idx === 2 ? 0.82 : idx === 3 ? 0.80 : idx === 4 ? 0.20 : idx === 5 ? 0.18 : idx === 6 ? 0.18 : 0.5) :
              (idx === 0 ? 0.5 : idx === 1 ? 0.92 : idx === 2 ? 0.95 : idx === 3 ? 0.90 : idx === 4 ? 0.10 : idx === 5 ? 0.05 : idx === 6 ? 0.08 : 0.5);

            const targetYPercent = isMobile ?
              (idx === 0 ? 0.12 : idx === 1 ? 0.19 : idx === 2 ? 0.65 : idx === 3 ? 0.74 : idx === 4 ? 0.74 : idx === 5 ? 0.65 : idx === 6 ? 0.19 : 0.88) :
              (idx === 0 ? 0.10 : idx === 1 ? 0.22 : idx === 2 ? 0.50 : idx === 3 ? 0.78 : idx === 4 ? 0.78 : idx === 5 ? 0.50 : idx === 6 ? 0.22 : 0.90);

            return (
              <g key={srv.id}>
                {/* Background path line */}
                <line
                  x1="50%"
                  y1="50%"
                  x2={`${targetXPercent * 100}%`}
                  y2={`${targetYPercent * 100}%`}
                  stroke={isSelected ? srv.color : isLogoHovered ? "#c7ff3d" : "rgba(255,255,255,0.12)"}
                  strokeWidth={isSelected ? "2.5" : isLogoHovered ? "1.5" : "1"}
                  strokeDasharray={isSelected ? "none" : "4 6"}
                  className="transition-all duration-500"
                />

                {/* Traveling Signal Pulses */}
                <circle r={isSelected ? "4" : "2.5"} fill={isSelected ? srv.color : "#c7ff3d"}>
                  <animateMotion
                    dur={isSelected ? "1.2s" : isLogoHovered ? "2s" : "4s"}
                    repeatCount="indefinite"
                    path={`M ${windowDims.w / 2},${windowDims.h / 2} L ${windowDims.w * targetXPercent},${windowDims.h * targetYPercent}`}
                  />
                </circle>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* CENTERPIECE: 3D WEBSITE WALAE LOGO MESH */}
      {/* ========================================================================= */}
      <div
        ref={logoContainerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
      >
        <HeroLogo3D
          isHovered={isLogoHovered}
          onHoverChange={setIsLogoHovered}
          mouseX={springMouseX.get()}
          mouseY={springMouseY.get()}
          activeServiceIndex={activeServiceIndex}
        />

        {/* Dynamic System Status Indicator */}
        <motion.div
          animate={{
            scale: isLogoHovered ? [1, 1.05, 1] : 1,
            borderColor: isLogoHovered ? "rgba(199,255,61,0.8)" : "rgba(255,255,255,0.15)",
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-3 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border text-[10px] font-mono tracking-widest text-white uppercase flex items-center gap-2 shadow-cinematic pointer-events-none"
        >
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
          <span className="text-brand-accent font-bold">
            {isLogoHovered
              ? "SYSTEM AWAKENED // SELECT SERVICE"
              : activeServiceIndex !== null
              ? `SERVICE: ${SERVICES[activeServiceIndex].title}`
              : "WEBSITE WALAE • CREATIVE SYSTEM"}
          </span>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 8 SERVICE NODES & INTERACTIVE PREVIEW CARDS */}
      {/* ========================================================================= */}
      <div ref={nodesContainerRef} className="absolute inset-0 z-20 pointer-events-none">
        {SERVICES.map((srv, idx) => {
          const Icon = srv.icon;
          const isSelected = activeServiceIndex === idx;
          const isDimmed = activeServiceIndex !== null && activeServiceIndex !== idx;
          const isMobile = windowDims.w < 768;

          return (
            <div
              key={srv.id}
              style={isMobile ? srv.mobilePos : srv.pos}
              className="absolute pointer-events-auto transition-all duration-300"
            >
              {/* Node Button */}
              <motion.button
                onMouseEnter={() => setActiveServiceIndex(idx)}
                onMouseLeave={() => setActiveServiceIndex(null)}
                onClick={() => {
                  const targetEl = document.querySelector("#services") || document.querySelector("#work");
                  if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  opacity: isDimmed ? 0.35 : 1,
                  scale: isSelected ? 1.08 : isLogoHovered ? 1.04 : 1,
                }}
                className={`glass px-2 py-1 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border flex items-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-sm font-mono font-bold transition-all duration-300 shadow-floating backdrop-blur-xl group ${
                  isSelected
                    ? "bg-black/90 border-brand-accent text-white shadow-[0_0_25px_rgba(199,255,61,0.4)]"
                    : "bg-black/70 border-white/15 text-white/80 hover:text-white hover:border-white/40"
                }`}
              >
                <div
                  className="w-5 h-5 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors shrink-0"
                  style={{ backgroundColor: `${srv.color}20` }}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: srv.color }} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] sm:text-[9px] text-white/40 font-mono leading-none mb-0.5">{srv.num}</span>
                  <span className="tracking-tight uppercase whitespace-nowrap">{isMobile ? srv.mobileTitle : srv.title}</span>
                </div>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand-accent hidden sm:block" />
              </motion.button>

              {/* Interactive Service Preview Pop-up */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.92 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute z-40 top-full mt-3 left-1/2 -translate-x-1/2 w-64 sm:w-72 glass bg-black/95 border border-white/20 p-4 rounded-2xl shadow-cinematic backdrop-blur-2xl text-left pointer-events-none"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase"
                        style={{ backgroundColor: `${srv.color}25`, color: srv.color }}
                      >
                        {srv.preview.tag}
                      </span>
                      <Zap className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1 tracking-tight">{srv.preview.heading}</h4>
                    <p className="text-xs text-white/70 leading-relaxed mb-3">{srv.preview.desc}</p>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/60">
                      {srv.preview.stats.map((st, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-brand-accent" />
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TOP & BOTTOM HUD OVERLAY (TYPOGRAPHY & ACTIONS) */}
      {/* ========================================================================= */}
      <div ref={contentRef} className="absolute inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 md:p-10 pointer-events-none">
        
        {/* Top HUD Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center w-full pointer-events-auto"
        >
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center" data-cursor="link">
              <img src="/logo.png" alt="Website Walae" className="h-8 sm:h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
            </Link>
          </div>

          <div className="hidden md:flex flex-col items-center">
            <div className="flex gap-1 opacity-40 mb-1">
              {[...Array(19)].map((_, i) => (
                <div key={i} className={`w-[1px] ${i % 5 === 0 ? "h-3 bg-white" : "h-2 bg-white/40"}`} />
              ))}
            </div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase">
              WEBSITE WALAE // INTERACTIVE CREATIVE UNIVERSE
            </span>
          </div>

          <div className="glass px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 bg-black/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-white tracking-widest uppercase">
              3D CORE ACTIVE
            </span>
          </div>
        </motion.div>

        {/* Immediate Scroll Cue (1.2s Intro Speed Requirement) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 pointer-events-none"
        >
          <div className="flex flex-col items-center text-center gap-1 font-mono text-[10px] tracking-[0.25em] text-white/80 uppercase">
            <span>SCROLL</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-brand-accent" />
            </motion.div>
            <span>DOWN</span>
          </div>
        </motion.div>

        {/* Bottom Navigation Dock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center w-full pb-2 pointer-events-auto z-30"
        >
          <div className="glass px-2.5 py-1.5 sm:py-2 rounded-full border border-white/15 flex items-center gap-2 backdrop-blur-2xl bg-black/75 shadow-cinematic">
            <Link
              href="#work"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors text-white group"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-accent group-hover:scale-110 transition-transform" />
            </Link>

            <Link
              href="#contact"
              className="px-4 py-1.5 sm:px-6 sm:py-2 h-8 sm:h-10 bg-white text-black font-bold text-xs sm:text-sm rounded-full hover:bg-brand-accent transition-all duration-300 flex items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors text-white">
              <Menu size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
