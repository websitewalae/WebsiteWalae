"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !cameraRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 1,
        pin: true,
      },
    });

    // Background scales up and fades out
    tl.to(cameraRef.current, {
      scale: 1.15,
      y: "10%",
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    }, 0);

    // Content fades out and moves up
    tl.to(contentRef.current, {
      opacity: 0,
      y: -100,
      scale: 0.9,
      duration: 0.6,
    }, 0);

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-brand-bg">
      {/* 1. Atmospheric Tech Background */}
      <div 
        ref={cameraRef as any}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none bg-cover bg-center bg-no-repeat opacity-[0.85]"
        style={{ backgroundImage: "url('/images/tech_hero_bg.jpg')" }}
      />
      
      {/* 2. Gradient Meshes for Dreamy Vibe */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-brand-bg via-brand-bg/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-brand-accent/5 mix-blend-overlay pointer-events-none" />

      {/* 3. Lightweight CSS Particles (Data Nodes) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => {
          // Deterministic values based on index to prevent React hydration errors
          const size = (i % 3) * 2 + 2;
          const left = (i * 13) % 100;
          const duration = 10 + (i % 5) * 2;
          const delay = (i % 7) * 0.5;
          const xDrift = (i % 2 === 0 ? 1 : -1) * ((i % 4) * 10);

          return (
            <motion.div
              key={i}
              className="absolute bg-brand-accent/40 rounded-full blur-[1px]"
              style={{
                width: size + "px",
                height: size + "px",
                left: left + "%",
                bottom: "-5%",
              }}
              animate={{
                y: ["0vh", "-110vh"],
                x: [0, xDrift],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
              }}
            />
          );
        })}
      </div>

      {/* Main HUD Container */}
      <div ref={contentRef} className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12">
        
        {/* Top HUD Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-between items-start w-full"
        >
          {/* Top Left: Logo / Sound */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center" data-cursor="link">
              <img src="/logo.png" alt="Website Walae" className="h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            </Link>
          </div>

          {/* Top Center: Timeline Gauge (Reference Vibe) */}
          <div className="hidden md:flex flex-col items-center">
            <div className="flex gap-1 opacity-40 mb-2">
              {[...Array(21)].map((_, i) => (
                <div key={i} className={`w-[1px] ${i % 5 === 0 ? 'h-3 bg-white' : 'h-2 bg-white/50'}`} />
              ))}
            </div>
            <div className="text-[10px] tracking-[0.3em] text-white/50 font-mono">EST. 2024 IN</div>
          </div>

          {/* Top Right: Status Badge */}
          <div className="glass px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-white">READY</span>
          </div>
        </motion.div>

        {/* Center: Interaction Prompt */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
        >
          <div className="relative w-24 h-24 flex items-center justify-center mb-4">
            {/* Glowing Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-white/20 border-t-brand-accent/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            />
            <div className="absolute inset-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md" />
            
            {/* Inner Text */}
            <div className="text-[10px] font-black tracking-widest text-white text-center leading-tight">
              SCROLL<br/>DOWN
            </div>
          </div>
        </motion.div>

        {/* Bottom Dock */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex justify-center w-full pb-4"
        >
          <div className="glass px-2 py-2 rounded-full border border-white/10 flex items-center gap-2 backdrop-blur-xl bg-black/40">
            <Link href="#work" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group">
              <span className="text-xs group-hover:scale-110 transition-transform">✦</span>
            </Link>
            
            <Link href="#contact" className="px-6 py-2 h-10 bg-white text-black font-bold text-sm rounded-full hover:bg-brand-accent transition-colors flex items-center">
              Start a Project
            </Link>
            
            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white">
              <Menu size={16} />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
