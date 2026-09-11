"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { Menu, Sparkles, Camera, Cpu, Layout, Code, TrendingUp, ChevronDown } from "lucide-react";

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const aiCoreRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const signalLineRef = useRef<HTMLDivElement>(null);
  const floatingObjectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Continuous Scroll-Driven Timeline for Hero -> Production morph
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 0.5,
        pin: true,
      },
    });

    // 1st-Pixel Instant Scroll Response: Grid morphs forward, AI Core expands, content transitions
    tl.to(gridRef.current, {
      scale: 2.2,
      rotateX: 60,
      y: "30%",
      opacity: 0.2,
      duration: 1,
      ease: "none",
    }, 0);

    tl.to(aiCoreRef.current, {
      scale: 1.5,
      opacity: 0,
      y: "-20%",
      duration: 0.8,
      ease: "power2.in",
    }, 0);

    tl.to(floatingObjectsRef.current, {
      scale: 1.3,
      opacity: 0,
      z: 200,
      duration: 0.9,
      ease: "power2.in",
    }, 0);

    tl.to(contentRef.current, {
      opacity: 0,
      y: -80,
      scale: 0.92,
      duration: 0.7,
      ease: "power2.inOut",
    }, 0);

  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#030303] selection:bg-brand-accent selection:text-black"
    >
      {/* ========================================================================= */}
      {/* LAYER 1 — ATMOSPHERE & VOLUMETRIC HAZE */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-gradient-to-br from-brand-accent/20 via-blue-600/10 to-transparent rounded-full blur-[160px] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80 z-1" />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 2 — DIGITAL PERSPECTIVE GRID (POWER UP ANIMATION 0-1s) */}
      {/* ========================================================================= */}
      <div 
        ref={gridRef}
        className="absolute inset-0 z-0 pointer-events-none perspective-[1000px] flex items-center justify-center opacity-40"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-[160vw] h-[160vw] border border-white/10 rounded-full border-dashed animate-[spin_120s_linear_infinite]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: "rotateX(75deg)",
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 3 — CREATIVE SYSTEM NODES & CONNECTED PATHS */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30">
        <svg className="w-full h-full max-w-6xl">
          <motion.path 
            d="M 150,250 L 500,400 L 850,250"
            fill="none" 
            stroke="rgba(199, 255, 61, 0.4)" 
            strokeWidth="1"
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* LAYER 4 — FLOATING 3D STUDIO OBJECTS (CAMERA, AI, DESIGN, CODE, MARKETING) */}
      {/* ========================================================================= */}
      <div ref={floatingObjectsRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Production Camera Lens Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: [0, -12, 0] }}
          transition={{ opacity: { duration: 0.8, delay: 0.3 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute top-[22%] left-[8%] md:left-[12%] glass px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2 text-[10px] font-mono text-white/70 shadow-cinematic backdrop-blur-md"
        >
          <Camera className="w-4 h-4 text-red-500 animate-pulse" />
          <span>PRODUCTION // 4K RAW</span>
        </motion.div>

        {/* Editing Timeline Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: [0, 15, 0] }}
          transition={{ opacity: { duration: 0.8, delay: 0.5 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute bottom-[28%] left-[6%] md:left-[10%] glass px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2 text-[10px] font-mono text-white/70 shadow-cinematic backdrop-blur-md"
        >
          <div className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
          <span>TIMELINE // EDITING</span>
        </motion.div>

        {/* Design Canvas UI Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: [0, -15, 0] }}
          transition={{ opacity: { duration: 0.8, delay: 0.4 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute top-[20%] right-[8%] md:right-[12%] glass px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2 text-[10px] font-mono text-white/70 shadow-cinematic backdrop-blur-md"
        >
          <Layout className="w-4 h-4 text-blue-400" />
          <span>DESIGN // UI-UX</span>
        </motion.div>

        {/* Development Code Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: [0, 12, 0] }}
          transition={{ opacity: { duration: 0.8, delay: 0.6 }, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute bottom-[26%] right-[6%] md:right-[10%] glass px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2 text-[10px] font-mono text-white/70 shadow-cinematic backdrop-blur-md"
        >
          <Code className="w-4 h-4 text-green-400" />
          <span>CODE // NEXT.JS</span>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* LAYER 5 & CENTER FOCAL POINT: AI CREATIVE CORE + CAMERA SYNERGY (POINTS 05 & 06) */}
      {/* ========================================================================= */}
      <motion.div 
        ref={aiCoreRef}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-15 flex flex-col items-center pointer-events-none"
      >
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center">
          {/* Outer Rotating Node Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-brand-accent/30 border-t-brand-accent shadow-[0_0_30px_rgba(199,255,61,0.2)]"
          />
          {/* Reverse Ring */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full border border-blue-500/20 border-b-blue-400"
          />

          {/* Inner Core Glass Sphere */}
          <div className="absolute inset-8 rounded-full glass bg-black/60 border border-white/20 flex flex-col items-center justify-center p-4 backdrop-blur-xl shadow-floating">
            <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-brand-accent mb-1 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-white uppercase text-center leading-tight">
              AI CREATIVE CORE
            </span>
            <span className="text-[8px] font-mono text-brand-accent mt-0.5">STATUS: READY</span>
          </div>

          {/* Signal Indicator Links (AI THINKS → CAMERA CREATES) */}
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-7 bg-black/80 border border-brand-accent/40 px-3 py-1 rounded-full text-[9px] font-mono text-brand-accent tracking-widest uppercase flex items-center gap-1.5 shadow-cinematic"
          >
            <Sparkles className="w-3 h-3" />
            <span>AI THINKS • CAMERA CREATES</span>
          </motion.div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* MAIN HUD CONTENT CONTAINER */}
      {/* ========================================================================= */}
      <div ref={contentRef} className="absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-6 md:p-12">
        
        {/* Top HUD Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-between items-center w-full"
        >
          {/* Top Left: Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center" data-cursor="link">
              <img src="/logo.png" alt="Website Walae" className="h-8 sm:h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            </Link>
          </div>

          {/* Top Center: Timeline Gauge */}
          <div className="hidden md:flex flex-col items-center">
            <div className="flex gap-1 opacity-40 mb-2">
              {[...Array(21)].map((_, i) => (
                <div key={i} className={`w-[1px] ${i % 5 === 0 ? 'h-3 bg-white' : 'h-2 bg-white/50'}`} />
              ))}
            </div>
            <div className="text-[10px] tracking-[0.3em] text-white/50 font-mono">WEBSITE WALAE // DIGITAL CREATIVE STUDIO</div>
          </div>

          {/* Top Right: Status Badge */}
          <div className="glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white font-mono">READY</span>
          </div>
        </motion.div>

        {/* Immediate Scroll Cue (Rule 08: Appears within 1s at bottom center) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30"
        >
          <div className="flex flex-col items-center text-center gap-1 font-mono text-[10px] tracking-[0.25em] text-white/80 uppercase">
            <span>SCROLL</span>
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-brand-accent" />
            </motion.div>
            <span>DOWN</span>
          </div>
        </motion.div>

        {/* Bottom Dock */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-center w-full pb-2 sm:pb-4"
        >
          <div className="glass px-2 py-1.5 sm:py-2 rounded-full border border-white/10 flex items-center gap-1.5 sm:gap-2 backdrop-blur-xl bg-black/40 shadow-cinematic">
            <Link href="#work" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group">
              <span className="text-xs group-hover:scale-110 transition-transform text-white">✦</span>
            </Link>
            
            <Link href="#contact" className="px-4 py-1.5 sm:px-6 sm:py-2 h-8 sm:h-10 bg-white text-black font-bold text-xs sm:text-sm rounded-full hover:bg-brand-accent transition-colors flex items-center">
              Start a Project
            </Link>
            
            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white">
              <Menu size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
