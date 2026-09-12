"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { Battery, Maximize, Focus, Sparkles, Send, ArrowRight } from "lucide-react";

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

const PRESET_IDEAS = [
  "Launch a premium fashion brand",
  "Build an AI SaaS platform",
  "Scale e-commerce store with reels",
  "Modern real estate digital portal"
];

interface Props {
  onEnterSite: () => void;
}

export default function CameraInterface({ onEnterSite }: Props) {
  const [activeService, setActiveService] = useState<Service>(SERVICES[0]);
  const [isShutterClosed, setIsShutterClosed] = useState(false);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  
  // AI Core Simulation State
  const [showAiModal, setShowAiModal] = useState(false);
  const [userIdea, setUserIdea] = useState("");
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiStep, setAiStep] = useState<number>(0);

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

  const rotateX = useSpring(useTransform(mouseY, [-500, 500], [4, -4]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-4, 4]), { stiffness: 100, damping: 30 });

  // Simulate Timecode (direct DOM update to avoid 24 re-renders/sec)
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      if (activeService.ui.action === "REC" || activeService.ui.action === "PLAY ▶") {
        frame++;
        const s = Math.floor(frame / 24);
        const m = Math.floor(s / 60);
        const f = frame % 24;
        if (timecodeRef.current) {
          timecodeRef.current.textContent = `00:${m.toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}:${f.toString().padStart(2, '0')}`;
        }
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
    }, 300);
  };

  const handleEnterSite = () => {
    setIsExiting(true);
    mouseX.set(0);
    mouseY.set(0);

    if (containerRef.current && monitorRef.current) {
      const tl = gsap.timeline({
        onComplete: onEnterSite
      });

      setIsShutterClosed(true);

      tl.to(monitorRef.current, {
        width: "100%",
        height: "100vh",
        borderRadius: 0,
        borderWidth: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.1
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
      }, "-=0.3");
    }
  };

  const handleAnalyzeIdea = (ideaText?: string) => {
    const text = ideaText || userIdea;
    if (!text.trim()) return;
    setUserIdea(text);
    setAiAnalyzing(true);
    setAiStep(1);

    setTimeout(() => setAiStep(2), 700);
    setTimeout(() => setAiStep(3), 1500);
    setTimeout(() => {
      setAiStep(4);
      setAiAnalyzing(false);
    }, 2400);
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="fixed inset-0 z-50 bg-[#020202] flex items-center justify-center overflow-hidden font-mono selection:bg-brand-accent selection:text-black perspective-[2000px] p-2 sm:p-4"
    >
      
      {/* Outer Studio Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div 
          style={{ x: useTransform(mouseX, [-500, 500], [-50, 50]), y: useTransform(mouseY, [-500, 500], [-50, 50]) }}
          className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] md:w-[40vw] md:h-[40vw] bg-brand-accent rounded-full blur-[150px] mix-blend-screen" 
        />
        <motion.div 
          style={{ x: useTransform(mouseX, [-500, 500], [50, -50]), y: useTransform(mouseY, [-500, 500], [50, -50]) }}
          className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw] bg-blue-500 rounded-full blur-[120px] mix-blend-screen" 
        />
      </div>

      {/* Responsive Monitor Frame */}
      <motion.div 
        ref={monitorRef}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="relative w-[96vw] sm:w-[90vw] md:w-[75vw] h-[85vh] md:h-[45vw] max-h-[88vh] bg-black border-[4px] sm:border-[6px] border-[#1a1a1a] rounded-xl flex flex-col overflow-hidden will-change-transform"
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
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${activeService.bgUrl})` }}
          />
        </AnimatePresence>

        {/* Dynamic Focus Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => {
            const seed = (i * 137.5) % 100;
            const seedY = (i * 93.1) % 100;
            return (
             <motion.div
               key={i}
               className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
               initial={{ x: seed + "%", y: seedY + "%", opacity: 0.2 }}
               animate={{ y: [null, ((seedY + 50) % 100) + "%"], opacity: [null, 0.8, 0] }}
               transition={{ duration: 8 + (i % 8), repeat: Infinity, ease: "linear" }}
             />
            );
          })}
        </div>

        {/* Scanlines & Noise */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-[0.25]" />

        {/* --- CAMERA UI OVERLAYS --- */}
        <div className="absolute inset-0 pointer-events-none p-3 sm:p-5 md:p-8 flex flex-col justify-between text-[10px] md:text-xs text-white/90 font-bold tracking-widest z-20">
          
          {/* Top Status Bar */}
          <div className="flex justify-between items-start drop-shadow-md">
            <div className="flex items-center gap-2 sm:gap-4">
              <span className={`flex items-center gap-1.5 ${activeService.ui.color}`}>
                {activeService.ui.action === "REC" && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                {activeService.ui.action}
              </span>
              <span className="text-[9px] sm:text-xs">{activeService.ui.mode}</span>
              <span ref={timecodeRef} className="hidden sm:inline font-mono">00:00:00:00</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAiModal(true)}
                className="pointer-events-auto flex items-center gap-1.5 bg-brand-accent/20 border border-brand-accent/50 text-brand-accent px-2.5 py-1 rounded-full text-[9px] sm:text-xs font-mono hover:bg-brand-accent hover:text-black transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                AI IDEA CORE
              </button>
              <Battery className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>

          {/* Center Crosshairs & Focus Ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
            <div className="w-[50%] sm:w-[40%] h-[40%] border border-white/20 relative">
              <div className="absolute top-1/2 left-1/2 w-8 sm:w-12 h-px bg-white/50 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 w-px h-8 sm:h-12 bg-white/50 -translate-x-1/2 -translate-y-1/2" />
              
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/30"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Focus className="w-24 h-24 sm:w-32 sm:h-32 stroke-[0.5]" />
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar: Services & Enter Site Button */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center pointer-events-auto w-full gap-3 sm:gap-4 mt-auto">
            
            {/* Scrollable / Responsive Service Selector */}
            <div className="flex flex-row md:flex-wrap items-center gap-2 sm:gap-4 max-w-full md:max-w-2xl bg-black/60 md:bg-black/40 p-2.5 sm:p-4 backdrop-blur-md rounded-lg border border-white/10 overflow-x-auto no-scrollbar">
              <span className="text-brand-text-muted text-[9px] sm:text-[10px] whitespace-nowrap hidden sm:flex items-center gap-1.5 mr-1">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                TARGET LOCK:
              </span>
              {SERVICES.slice(1).map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(service)}
                  className={`shrink-0 text-left text-[10px] sm:text-xs transition-all duration-300 hover:text-white group flex items-center gap-1.5 whitespace-nowrap px-2 py-1 rounded ${activeService.id === service.id ? "text-white bg-white/10 font-bold" : "text-white/40"}`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${activeService.id === service.id ? "bg-brand-accent" : "bg-transparent group-hover:bg-white/50"}`} />
                  {service.name}
                </button>
              ))}
            </div>

            {/* Enter Site Button */}
            <motion.button 
              onClick={handleEnterSite}
              whileHover={{ scale: 1.03, backgroundColor: "#fff" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 bg-brand-accent text-black px-6 py-3 sm:px-8 sm:py-4 rounded-sm font-bold transition-colors uppercase text-xs sm:text-sm shadow-[0_0_20px_rgba(202,255,0,0.3)] shrink-0"
            >
              <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Enter Site
            </motion.button>
          </div>
        </div>

        {/* Center Active Service Title / Focus Card */}
        <AnimatePresence>
          {!isShutterClosed && activeService.id !== "intro" && !showAiModal && (
            <motion.div 
              initial={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 w-[85%] max-w-lg"
            >
              <div className="border border-brand-accent/50 p-4 sm:p-8 md:p-12 relative bg-black/40 backdrop-blur-[6px] shadow-[0_0_40px_rgba(0,0,0,0.8)] rounded-lg text-center">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-accent" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-accent" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-accent" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-accent" />
                <h2 className="text-lg sm:text-2xl md:text-4xl font-bold tracking-tighter text-white uppercase text-center filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                  {activeService.name}
                </h2>
              </div>
            </motion.div>
          )}
          
          {/* Main Title Intro Screen */}
          {!isShutterClosed && activeService.id === "intro" && !showAiModal && (
             <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 w-[90%]"
             >
               <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter mb-3 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">WEBSITE WALAE</h1>
               <p className="text-xs sm:text-sm md:text-xl font-mono text-brand-accent tracking-widest uppercase bg-black/60 backdrop-blur-md py-1.5 px-4 rounded-full inline-block border border-brand-accent/30">
                 Digital Creative Agency
               </p>
             </motion.div>
          )}
        </AnimatePresence>

        {/* AI Idea Core Interactive Simulation Modal */}
        <AnimatePresence>
          {showAiModal && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl z-30 p-4 sm:p-8 flex flex-col justify-between overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-brand-border pb-4">
                <div className="flex items-center gap-2 text-brand-accent font-mono text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  AI CREATIVE ENGINE // INPUT PROMPT
                </div>
                <button 
                  onClick={() => { setShowAiModal(false); setAiStep(0); }}
                  className="text-white/60 hover:text-white text-xs font-mono border border-white/20 px-3 py-1 rounded"
                >
                  CLOSE [X]
                </button>
              </div>

              {/* Input / Steps */}
              <div className="my-auto max-w-xl mx-auto w-full">
                {aiStep === 0 && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight">GIVE ME AN IDEA.</h3>
                    <p className="text-xs sm:text-sm text-brand-text-secondary">
                      Tell Website Walae&apos;s AI Core what you want to build:
                    </p>

                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={userIdea}
                        onChange={(e) => setUserIdea(e.target.value)}
                        placeholder="e.g. Launch a premium streetwear brand..."
                        className="flex-1 bg-brand-surface border border-brand-border rounded-lg px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-accent"
                        onKeyDown={(e) => e.key === 'Enter' && handleAnalyzeIdea()}
                      />
                      <button 
                        onClick={() => handleAnalyzeIdea()}
                        className="bg-brand-accent text-black font-bold px-5 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-4">
                      <p className="text-[10px] text-brand-text-muted mb-2 font-mono">OR TAP A PRESET IDEA:</p>
                      <div className="flex flex-wrap gap-2">
                        {PRESET_IDEAS.map((preset, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnalyzeIdea(preset)}
                            className="text-[10px] sm:text-xs bg-white/5 border border-white/10 hover:border-brand-accent px-3 py-1.5 rounded-full text-white/80 transition-colors text-left"
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {aiStep > 0 && (
                  <div className="flex flex-col gap-6 py-4">
                    <div className="glass p-4 rounded-xl border border-brand-accent/30 font-mono text-xs text-brand-accent">
                      &gt; INPUT: &quot;{userIdea}&quot;
                    </div>

                    <div className="flex flex-col gap-3 font-mono text-xs">
                      {aiStep >= 1 && (
                        <div className="flex items-center gap-3 text-yellow-400">
                          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                          <span>ANALYZING INTENT & AUDIENCE...</span>
                        </div>
                      )}
                      {aiStep >= 2 && (
                        <div className="flex items-center gap-3 text-blue-400">
                          <div className="w-2 h-2 rounded-full bg-blue-400" />
                          <span>MAPPING VISUAL DIRECTION & USER JOURNEY...</span>
                        </div>
                      )}
                      {aiStep >= 3 && (
                        <div className="flex items-center gap-3 text-brand-accent">
                          <div className="w-2 h-2 rounded-full bg-brand-accent" />
                          <span>CREATIVE SYSTEM GENERATED!</span>
                        </div>
                      )}
                    </div>

                    {aiStep === 4 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass p-4 rounded-xl border border-white/20 flex flex-wrap gap-2 text-[10px] sm:text-xs font-mono justify-center"
                      >
                        {["IDEA", "BRAND IDENTITY", "VIDEO CONTENT", "WEBSITE UI", "META ADS", "GROWTH"].map((node, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="bg-brand-accent/20 border border-brand-accent text-brand-accent px-2 py-1 rounded">
                              {node}
                            </span>
                            {i < 5 && <ArrowRight className="w-3 h-3 text-white/40" />}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center border-t border-brand-border pt-4 text-[10px] text-brand-text-muted">
                <span>AI THINKS. CAMERA CREATES.</span>
                <button 
                  onClick={handleEnterSite} 
                  className="text-brand-accent underline hover:text-white font-bold"
                >
                  PROCEED TO EXPERIENCE →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shutter & Glitch Overlay */}
        <AnimatePresence>
          {isShutterClosed && (
            <>
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.15, ease: "circIn" }}
                className="absolute inset-0 bg-[#050505] z-40 origin-top"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 0.5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-white mix-blend-overlay z-40 pointer-events-none"
                style={{ clipPath: "polygon(0 20%, 100% 20%, 100% 30%, 0 30%)" }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
