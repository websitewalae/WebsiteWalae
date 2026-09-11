"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { Menu, Sparkles, Camera, Cpu, Layout, Code, Search, ChevronDown, Zap, ArrowRight } from "lucide-react";

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const aiCoreRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  // Micro State for AI Core Processing Animation
  const [aiStateIndex, setAiStateIndex] = useState<number>(0);
  const AI_STATES = ["STATUS: READY", "ANALYZING INTENT...", "CREATIVE SIGNAL FOUND", "SYSTEM ACTIVE"];

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const parallaxX = useSpring(useTransform(mouseX, [-600, 600], [-15, 15]), { stiffness: 100, damping: 30 });
  const parallaxY = useSpring(useTransform(mouseY, [-600, 600], [-15, 15]), { stiffness: 100, damping: 30 });

  // AI Core Micro State Cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setAiStateIndex((prev) => (prev + 1) % AI_STATES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // GSAP 1st Scroll Pixel Instant Response & Morph into Production
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !cameraRef.current || !aiCoreRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 0.4,
        pin: true,
      },
    });

    // 1st pixel scroll: Grid zooms forward, Camera viewfinder activates, AI Core signals camera
    tl.to(gridRef.current, {
      scale: 2.4,
      rotateX: 65,
      y: "25%",
      opacity: 0.15,
      duration: 1,
      ease: "none",
    }, 0);

    tl.to(aiCoreRef.current, {
      scale: 1.4,
      opacity: 0,
      y: "-30%",
      duration: 0.8,
      ease: "power2.in",
    }, 0);

    tl.to(cameraRef.current, {
      scale: 1.6,
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    }, 0);

    tl.to(nodesRef.current, {
      scale: 1.2,
      opacity: 0,
      duration: 0.7,
      ease: "power2.in",
    }, 0);

    tl.to(contentRef.current, {
      opacity: 0,
      y: -60,
      scale: 0.94,
      duration: 0.7,
      ease: "power2.inOut",
    }, 0);

  }, []);

  return (
    <section 
      ref={sectionRef} 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#020202] selection:bg-brand-accent selection:text-black max-w-full"
    >
      {/* ========================================================================= */}
      {/* LAYER 1 — ATMOSPHERE (DARK BLUE/PURPLE HAZE & DIGITIZED SCAN) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] bg-gradient-to-br from-brand-accent/15 via-purple-900/15 to-transparent rounded-full blur-[170px] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040404] via-transparent to-[#040404]/90 z-1" />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 2 — DIGITAL PERSPECTIVE GRID (POWER ON AT 0.4s) */}
      {/* ========================================================================= */}
      <div 
        ref={gridRef}
        className="absolute inset-0 z-0 pointer-events-none perspective-[1000px] flex items-center justify-center opacity-30 overflow-hidden"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="w-[150vw] h-[150vw] border border-white/10 rounded-full border-dashed animate-[spin_140s_linear_infinite]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: "rotateX(75deg)",
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 3 — SUBTLE VECTOR SIGNAL PATHS CONNECTING SYSTEM NODES */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30 overflow-hidden">
        <svg className="w-full h-full max-w-5xl">
          <motion.path 
            d="M 120,220 L 480,360 L 840,220"
            fill="none" 
            stroke="rgba(199, 255, 61, 0.5)" 
            strokeWidth="1"
            strokeDasharray="4 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* LAYER 4 — CONNECTED CREATIVE SYSTEM NODES (CAMERA, DESIGN, CODE, SEARCH) */}
      {/* ========================================================================= */}
      <motion.div 
        ref={nodesRef} 
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden max-w-full"
      >
        {/* CAMERA / PRODUCTION Node (Left) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute top-[26%] left-[4%] sm:left-[8%] md:left-[12%] glass px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2 text-[10px] font-mono text-white/80 shadow-cinematic backdrop-blur-md"
        >
          <Camera className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>CAMERA // PRODUCTION</span>
        </motion.div>

        {/* DESIGN / UI-UX Node (Top Right) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute top-[22%] right-[4%] sm:right-[8%] md:right-[12%] glass px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2 text-[10px] font-mono text-white/80 shadow-cinematic backdrop-blur-md"
        >
          <Layout className="w-3.5 h-3.5 text-blue-400" />
          <span>DESIGN // UI-UX</span>
        </motion.div>

        {/* CODE / WEB Node (Bottom Left) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="absolute bottom-[24%] left-[4%] sm:left-[6%] md:left-[10%] glass px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2 text-[10px] font-mono text-white/80 shadow-cinematic backdrop-blur-md"
        >
          <Code className="w-3.5 h-3.5 text-green-400" />
          <span>CODE // WEB</span>
        </motion.div>

        {/* SEARCH / GROWTH Node (Bottom Right) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="absolute bottom-[24%] right-[4%] sm:right-[6%] md:right-[10%] glass px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2 text-[10px] font-mono text-white/80 shadow-cinematic backdrop-blur-md"
        >
          <Search className="w-3.5 h-3.5 text-purple-400" />
          <span>SEARCH // GROWTH</span>
        </motion.div>
      </motion.div>

      {/* ========================================================================= */}
      {/* CAMERA SYSTEM VIEWFINDER (ENTRY IN HERO) */}
      {/* ========================================================================= */}
      <motion.div 
        ref={cameraRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-[28%] left-[4%] sm:left-[6%] z-15 pointer-events-none hidden md:block"
      >
        <div className="border border-red-500/40 bg-black/60 p-2.5 rounded-lg font-mono text-[9px] text-white flex items-center gap-2 shadow-cinematic">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 font-bold">REC ● 4K RAW</span>
          <span className="text-white/50">24 FPS</span>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* CENTER FOCAL POINT: AI CREATIVE CORE & AUTONOMOUS MICRO-STATES */}
      {/* ========================================================================= */}
      <motion.div 
        ref={aiCoreRef}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-15 flex flex-col items-center pointer-events-none"
      >
        <div className="relative w-44 h-44 sm:w-60 sm:h-60 flex items-center justify-center">
          {/* Outer Rotating Node Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-brand-accent/30 border-t-brand-accent shadow-[0_0_30px_rgba(199,255,61,0.25)]"
          />
          {/* Reverse Inner Ring */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full border border-blue-500/20 border-b-blue-400"
          />

          {/* Inner Core Glass Sphere */}
          <div className="absolute inset-8 rounded-full glass bg-black/70 border border-white/20 flex flex-col items-center justify-center p-4 backdrop-blur-xl shadow-floating text-center">
            <Cpu className="w-7 h-7 sm:w-9 sm:h-9 text-brand-accent mb-1 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-white uppercase text-center leading-tight">
              AI CREATIVE CORE
            </span>
            {/* Dynamic Micro State Cycle */}
            <motion.span 
              key={aiStateIndex}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              className="text-[8px] font-mono text-brand-accent mt-1 font-bold tracking-wider uppercase"
            >
              {AI_STATES[aiStateIndex]}
            </motion.span>
          </div>

          {/* Signal Link Badge */}
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 bg-black/90 border border-brand-accent/50 px-3.5 py-1 rounded-full text-[9px] font-mono text-brand-accent tracking-widest uppercase flex items-center gap-1.5 shadow-cinematic whitespace-nowrap"
          >
            <Sparkles className="w-3 h-3 animate-spin" />
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
            <div className="text-[10px] tracking-[0.3em] text-white/50 font-mono">WEBSITE WALAE // DIGITAL CREATIVE OPERATING SYSTEM</div>
          </div>

          {/* Top Right: Status Badge */}
          <div className="glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white font-mono">SYSTEM ACTIVE</span>
          </div>
        </motion.div>

        {/* Center Main Headline (Typed & Confident) */}
        <div className="absolute top-[28%] sm:top-[30%] left-1/2 -translate-x-1/2 text-center pointer-events-none w-[92%] max-w-4xl z-20">
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="text-display-hero text-white tracking-tighter uppercase font-black filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
          >
            IDEAS IN.<br/>
            <span className="text-brand-accent">ATTENTION OUT.</span>
          </motion.h1>
        </div>

        {/* Immediate Scroll Cue (Rule 08 & 10: Appears at 1.2s at bottom center) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30"
        >
          <div className="flex flex-col items-center text-center gap-1 font-mono text-[10px] tracking-[0.25em] text-white/90 uppercase">
            <span>SCROLL</span>
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-brand-accent" />
            </motion.div>
            <span>DOWN</span>
          </div>
        </motion.div>

        {/* Bottom Dock with Integrated Signal Trace */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex justify-center w-full pb-2 sm:pb-4 z-20"
        >
          <div className="glass px-2 py-1.5 sm:py-2 rounded-full border border-white/10 flex items-center gap-1.5 sm:gap-2 backdrop-blur-xl bg-black/60 shadow-cinematic">
            <Link href="#work" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group">
              <span className="text-xs group-hover:scale-110 transition-transform text-white">✦</span>
            </Link>
            
            <Link 
              href="#contact" 
              className="px-4 py-1.5 sm:px-6 sm:py-2 h-8 sm:h-10 bg-white text-black font-bold text-xs sm:text-sm rounded-full hover:bg-brand-accent transition-all duration-300 flex items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
