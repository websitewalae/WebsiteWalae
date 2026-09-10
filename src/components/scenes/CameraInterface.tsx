"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { Battery, Maximize, Focus } from "lucide-react";

type Service = {
  id: string;
  name: string;
  bgUrl: string;
  ui: {
    mode: string;
    action: string;
    color: string;
  };
};

const SERVICES: Service[] = [
  { id: "intro", name: "WEBSITE WALAE", bgUrl: "/images/commercial_shoot_bg.jpg", ui: { mode: "4K RAW", action: "STBY", color: "text-white" } },
  { id: "production", name: "SHOOTING & PRODUCTION", bgUrl: "/images/commercial_shoot_bg.jpg", ui: { mode: "4K RAW", action: "REC", color: "text-red-500" } },
  { id: "editing", name: "VIDEO EDITING", bgUrl: "/images/editor_pc_bg.jpg", ui: { mode: "PRORES", action: "PLAY ▶", color: "text-brand-accent" } },
  { id: "design", name: "UI / UX DESIGN", bgUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop", ui: { mode: "VECTOR", action: "GRID", color: "text-blue-400" } },
  { id: "dev", name: "WEBSITE DEVELOPMENT", bgUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop", ui: { mode: "LIVE", action: "BUILD", color: "text-green-400" } },
  { id: "marketing", name: "SEO & MARKETING", bgUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop", ui: { mode: "DATA", action: "TRACK", color: "text-purple-400" } }
];

interface Props {
  onEnterSite: () => void;
}

export default function CameraInterface({ onEnterSite }: Props) {
  const [activeService, setActiveService] = useState<Service>(SERVICES[0]);
  const [isShutterClosed, setIsShutterClosed] = useState(false);
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const monitorRef = useRef<HTMLDivElement>(null);

  // 3D Mouse Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isExiting) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const rotateX = useSpring(useTransform(mouseY, [-500, 500], [5, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-5, 5]), { stiffness: 100, damping: 30 });

  // Simulate Timecode
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      if (activeService.ui.action === "REC" || activeService.ui.action === "PLAY ▶") {
        frame++;
        const s = Math.floor(frame / 24);
        const m = Math.floor(s / 60);
        const f = frame % 24;
        setTimecode(`00:${m.toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}:${f.toString().padStart(2, '0')}`);
      }
    }, 1000 / 24);
    return () => clearInterval(interval);
  }, [activeService]);

  const handleSelectService = (service: Service) => {
    if (service.id === activeService.id) return;
    
    setIsShutterClosed(true);
    setTimeout(() => {
      setActiveService(service);
      setTimeout(() => {
        setIsShutterClosed(false);
      }, 100);
    }, 300); // Shutter speed
  };

  const handleEnterSite = () => {
    setIsExiting(true);
    
    // Reset rotations before GSAP takes over
    mouseX.set(0);
    mouseY.set(0);

    if (containerRef.current && monitorRef.current) {
      const tl = gsap.timeline({
        onComplete: onEnterSite
      });

      // Shutter closes one last time
      setIsShutterClosed(true);

      tl.to(monitorRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        borderWidth: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 1.2,
        ease: "power3.inOut",
        delay: 0.2
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
      }, "-=0.5");
    }
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="fixed inset-0 z-50 bg-[#020202] flex items-center justify-center overflow-hidden font-mono selection:bg-brand-accent selection:text-black perspective-[2000px]"
    >
      
      {/* Outer Studio Environment (Subtle Lighting) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div 
          style={{ x: useTransform(mouseX, [-500, 500], [-50, 50]), y: useTransform(mouseY, [-500, 500], [-50, 50]) }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-brand-accent rounded-full blur-[150px] mix-blend-screen" 
        />
        <motion.div 
          style={{ x: useTransform(mouseX, [-500, 500], [50, -50]), y: useTransform(mouseY, [-500, 500], [50, -50]) }}
          className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-blue-500 rounded-full blur-[120px] mix-blend-screen" 
        />
      </div>

      {/* The Physical Monitor with 3D Tilt */}
      <motion.div 
        ref={monitorRef}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="relative w-[90vw] md:w-[75vw] h-[80vh] md:h-[45vw] max-h-[85vh] bg-black border-[6px] border-[#1a1a1a] rounded-xl flex flex-col overflow-hidden will-change-transform"
        animate={{
          boxShadow: isShutterClosed 
            ? "0 0 0 1px #333, 0 20px 50px rgba(0,0,0,0.8), inset 0 0 200px rgba(255,255,255,0.1)" 
            : "0 0 0 1px #333, 0 30px 60px rgba(0,0,0,0.9), inset 0 0 100px rgba(0,0,0,0.5)"
        }}
      >
        {/* Cinematic Background Viewfinder Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ scale: 1.15, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 1.05, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${activeService.bgUrl})` }}
          />
        </AnimatePresence>

        {/* Dynamic Focus Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => {
            // Deterministic pseudo-random values based on index to prevent hydration mismatch
            const seed = (i * 137.5) % 100;
            const seedY = (i * 93.1) % 100;
            const seedScale = (i * 0.1) % 2;
            const seedOpacity = (i * 0.05) % 0.5;
            
            return (
             <motion.div
               key={i}
               className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
               initial={{ 
                 x: seed + "%", 
                 y: seedY + "%",
                 scale: seedScale,
                 opacity: seedOpacity
               }}
               animate={{ 
                 y: [null, ((seedY + 50) % 100) + "%"],
                 x: [null, ((seed + 50) % 100) + "%"],
                 opacity: [null, 0.8, 0]
               }}
               transition={{ 
                 duration: 10 + (i % 10), 
                 repeat: Infinity, 
                 ease: "linear" 
               }}
             />
            );
          })}
        </div>

        {/* Scanlines & Grain */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-[0.25]" />

        {/* --- CAMERA UI OVERLAYS --- */}
        <div className="absolute inset-0 pointer-events-none p-4 md:p-8 flex flex-col justify-between text-[10px] md:text-xs text-white/90 font-bold tracking-widest z-20">
          
          {/* Top Bar */}
          <div className="flex justify-between items-start drop-shadow-md">
            <div className="flex items-center gap-4">
              <span className={`flex items-center gap-2 ${activeService.ui.color}`}>
                {activeService.ui.action === "REC" && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                {activeService.ui.action}
              </span>
              <span>{activeService.ui.mode}</span>
              <span className="hidden md:inline">{timecode}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline">ISO 400</span>
              <span className="hidden md:inline">F2.8</span>
              <span className="hidden md:inline">1/50</span>
              <Battery className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>

          {/* Center Crosshairs & Animated Focus */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-[40%] h-[40%] border border-white/20 relative">
              <div className="absolute top-1/2 left-1/2 w-12 h-px bg-white/50 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 w-px h-12 bg-white/50 -translate-x-1/2 -translate-y-1/2" />
              
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/30"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Focus className="w-32 h-32 stroke-[0.5]" />
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar / Service Navigation (Interactive) */}
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center pointer-events-auto w-full gap-4">
            
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 flex-wrap max-w-2xl bg-black/40 p-4 backdrop-blur-md rounded-lg border border-white/10 hover:border-white/30 transition-colors">
              <span className="text-brand-text-muted w-full text-[10px] mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                TARGET LOCK / SERVICES
              </span>
              {SERVICES.slice(1).map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(service)}
                  className={`relative text-left transition-all duration-300 hover:text-white group flex items-center gap-2 ${activeService.id === service.id ? "text-white scale-105" : "text-white/40"}`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${activeService.id === service.id ? "bg-brand-accent" : "bg-transparent group-hover:bg-white/50"}`} />
                  {service.name}
                </button>
              ))}
            </div>

            {/* Enter Site Trigger */}
            <motion.button 
              onClick={handleEnterSite}
              whileHover={{ scale: 1.05, backgroundColor: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-brand-accent text-black px-8 py-4 rounded-sm font-bold transition-colors uppercase shadow-[0_0_20px_rgba(202,255,0,0.3)]"
            >
              <Maximize className="w-4 h-4" />
              Enter Site
            </motion.button>
          </div>
        </div>

        {/* Focus Box around Active Content */}
        <AnimatePresence>
          {!isShutterClosed && activeService.id !== "intro" && (
            <motion.div 
              initial={{ scale: 1.2, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
            >
              <div className="border border-brand-accent/50 p-8 md:p-16 relative bg-black/20 backdrop-blur-[4px] shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-accent" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-accent" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-accent" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-accent" />
                <h2 className="text-2xl md:text-5xl font-bold tracking-tighter text-white uppercase text-center filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                  {activeService.name}
                </h2>
              </div>
            </motion.div>
          )}
          
          {/* Intro Screen */}
          {!isShutterClosed && activeService.id === "intro" && (
             <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10"
             >
               <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">WEBSITE WALAE</h1>
               <p className="text-sm md:text-xl font-mono text-brand-accent tracking-widest uppercase bg-black/50 backdrop-blur-sm py-2 px-4 rounded-full inline-block">Digital Creative Agency</p>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Advanced Shutter & Glitch Animation Overlay */}
        <AnimatePresence>
          {isShutterClosed && (
            <>
              {/* Black Physical Shutter */}
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.15, ease: "circIn" }}
                className="absolute inset-0 bg-[#050505] z-40 origin-top"
              />
              {/* Digital Glitch Flash */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 0.5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-white mix-blend-overlay z-40 pointer-events-none"
                style={{ clipPath: "polygon(0 20%, 100% 20%, 100% 30%, 0 30%)" }}
              />
               <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="absolute inset-0 bg-brand-accent mix-blend-color-dodge z-40 pointer-events-none"
                style={{ clipPath: "polygon(0 70%, 100% 70%, 100% 80%, 0 80%)" }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
