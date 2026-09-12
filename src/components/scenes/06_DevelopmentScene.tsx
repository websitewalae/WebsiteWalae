"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Check, ArrowRight, Code2, Folder, Terminal } from "lucide-react";

// Authentic, logical Next.js 16 App Router code representing Website Walae's actual architecture
const CODE_LINES = [
  {
    num: 1,
    tokens: [
      { text: "import", cls: "text-purple-400 font-semibold" },
      { text: " { ", cls: "text-white/70" },
      { text: "HeroScene", cls: "text-cyan-300 font-medium" },
      { text: " } ", cls: "text-white/70" },
      { text: "from", cls: "text-purple-400 font-semibold" },
      { text: ' "@/components/scenes/01_HeroScene"', cls: "text-emerald-400" },
      { text: ";", cls: "text-white/60" },
    ],
  },
  {
    num: 2,
    tokens: [
      { text: "import", cls: "text-purple-400 font-semibold" },
      { text: " { ", cls: "text-white/70" },
      { text: "SocialMediaScene", cls: "text-cyan-300 font-medium" },
      { text: " } ", cls: "text-white/70" },
      { text: "from", cls: "text-purple-400 font-semibold" },
      { text: ' "@/components/scenes/04_SocialMediaScene"', cls: "text-emerald-400" },
      { text: ";", cls: "text-white/60" },
    ],
  },
  {
    num: 3,
    tokens: [
      { text: "import", cls: "text-purple-400 font-semibold" },
      { text: " { ", cls: "text-white/70" },
      { text: "DevelopmentScene", cls: "text-cyan-300 font-medium" },
      { text: " } ", cls: "text-white/70" },
      { text: "from", cls: "text-purple-400 font-semibold" },
      { text: ' "@/components/scenes/06_DevelopmentScene"', cls: "text-emerald-400" },
      { text: ";", cls: "text-white/60" },
    ],
  },
  {
    num: 4,
    tokens: [],
  },
  {
    num: 5,
    tokens: [
      { text: "export default function", cls: "text-purple-400 font-semibold" },
      { text: " WebsiteWalaeExperience", cls: "text-yellow-300 font-bold" },
      { text: "() {", cls: "text-white/80" },
    ],
  },
  {
    num: 6,
    tokens: [
      { text: "  return (", cls: "text-purple-400 font-semibold" },
    ],
  },
  {
    num: 7,
    tokens: [
      { text: "    <", cls: "text-white/60" },
      { text: "main", cls: "text-blue-400 font-semibold" },
      { text: " className", cls: "text-amber-300" },
      { text: "=", cls: "text-white/60" },
      { text: '"relative min-h-screen bg-[#050505] text-white"', cls: "text-emerald-400" },
      { text: ">", cls: "text-white/60" },
    ],
  },
  {
    num: 8,
    tokens: [
      { text: "      <", cls: "text-white/60" },
      { text: "HeroScene", cls: "text-cyan-300 font-medium" },
      { text: " mode", cls: "text-amber-300" },
      { text: "=", cls: "text-white/60" },
      { text: '"3D_Cinematic"', cls: "text-emerald-400" },
      { text: " studio", cls: "text-amber-300" },
      { text: "=", cls: "text-white/60" },
      { text: '"Lucknow"', cls: "text-emerald-400" },
      { text: " />", cls: "text-white/60" },
    ],
  },
  {
    num: 9,
    tokens: [
      { text: "      <", cls: "text-white/60" },
      { text: "SocialMediaScene", cls: "text-cyan-300 font-medium" },
      { text: " clientReels", cls: "text-amber-300" },
      { text: "=", cls: "text-white/60" },
      { text: '"Viral_Campaigns"', cls: "text-emerald-400" },
      { text: " />", cls: "text-white/60" },
    ],
  },
  {
    num: 10,
    tokens: [
      { text: "      <", cls: "text-white/60" },
      { text: "DevelopmentScene", cls: "text-cyan-300 font-medium" },
      { text: " stack", cls: "text-amber-300" },
      { text: "=", cls: "text-white/60" },
      { text: '"Next.js_16"', cls: "text-emerald-400" },
      { text: " performance", cls: "text-amber-300" },
      { text: "=", cls: "text-white/60" },
      { text: '"100/100"', cls: "text-emerald-400" },
      { text: " />", cls: "text-white/60" },
    ],
  },
  {
    num: 11,
    tokens: [
      { text: "    </", cls: "text-white/60" },
      { text: "main", cls: "text-blue-400 font-semibold" },
      { text: ">", cls: "text-white/60" },
    ],
  },
  {
    num: 12,
    tokens: [
      { text: "  );", cls: "text-white/80" },
    ],
  },
  {
    num: 13,
    tokens: [
      { text: "}", cls: "text-white/80" },
    ],
  },
];

export default function DevelopmentScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const codeLinesRef = useRef<HTMLDivElement>(null);
  const buildStatusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !editorRef.current || !codeLinesRef.current || !buildStatusRef.current || !textRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const codeLines = codeLinesRef.current.children;
    const buildStatuses = buildStatusRef.current.children;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=130%",
        scrub: 0.4,
        pin: true,
        pinSpacing: true,
      },
    });

    // 0% - Viewport entry: text & editor rotate in immediately
    tl.fromTo(textRef.current, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.4 });
    tl.fromTo(editorRef.current, 
      { opacity: 0, rotateY: 15, scale: 0.9, x: 40 }, 
      { opacity: 1, rotateY: 0, scale: 1, x: 0, duration: 0.6, ease: "power2.out" },
      "<"
    );

    // 20% - Rapid code typing lines
    tl.fromTo(codeLines, 
      { opacity: 0, x: -15 }, 
      { opacity: 1, x: 0, stagger: 0.05, duration: 0.8 }
    );

    // 45% - Terminal status checklist lights up
    tl.fromTo(buildStatuses,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, color: "#C7FF3D" }
    );

    // 75% - Morph exit into Marketing Engine
    tl.to([editorRef.current, textRef.current], {
      opacity: 0,
      scale: 0.94,
      y: -40,
      duration: 0.5,
      ease: "power2.in"
    }, "+=0.2");

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#050505]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[45vw] h-[45vw] bg-brand-accent/15 rounded-full blur-[140px] mix-blend-screen" />
      </div>

      {/* Header Headline */}
      <div ref={textRef} className="absolute top-[6%] sm:top-[8%] text-center px-4 z-20 max-w-full">
        <h2 className="text-xl sm:text-3xl md:text-5xl font-black text-white tracking-tight mb-1.5 uppercase font-inter-tight">
          DESIGN IS ONLY <br /> THE BEGINNING.
        </h2>
        <p className="text-xs sm:text-sm text-brand-accent font-mono">HIGH-PERFORMANCE CODE ENGINE • NEXT.JS 16 &amp; TURBOPACK</p>
      </div>

      {/* Code Editor Container */}
      <div className="flex w-full max-w-5xl mt-[16%] sm:mt-[7%] px-4 sm:px-6 perspective-[1000px] z-10">
        <div ref={editorRef} className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl">
          
          {/* Editor Window Title Bar */}
          <div className="h-10 bg-[#0d0d0d] border-b border-white/10 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              {/* macOS Traffic Lights */}
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>

              {/* Active Tab */}
              <div className="flex items-center gap-2 bg-[#141414] border-t-2 border-brand-accent px-3.5 py-1 rounded-t text-xs text-white font-mono ml-3 border-x border-white/5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>page.tsx</span>
                <span className="text-white/30 text-[10px] ml-1.5 hover:text-white cursor-pointer">✕</span>
              </div>
            </div>

            {/* Language indicator */}
            <div className="text-[10px] font-mono text-white/40 hidden sm:block">
              TypeScript JSX • UTF-8
            </div>
          </div>

          {/* Breadcrumb Path Bar */}
          <div className="h-6 bg-[#080808] border-b border-white/5 flex items-center px-4 text-[10px] font-mono text-white/40 gap-1.5 select-none">
            <Folder className="w-3 h-3 text-amber-400/80" />
            <span>src</span>
            <span>/</span>
            <span>app</span>
            <span>/</span>
            <span className="text-white/70 font-medium">page.tsx</span>
            <span className="text-white/30">›</span>
            <span className="text-yellow-400/80">WebsiteWalaeExperience()</span>
          </div>
          
          {/* Main Editor Body */}
          <div className="p-3 sm:p-5 font-mono text-[11px] sm:text-[13px] flex flex-col bg-[#070707] overflow-x-auto">
            <div ref={codeLinesRef} className="flex flex-col gap-0.5">
              {CODE_LINES.map((line, i) => (
                <div key={i} className="flex whitespace-pre leading-relaxed select-text hover:bg-white/[0.02] rounded px-1 transition-colors">
                  {/* Line Number */}
                  <span className="text-white/20 w-7 sm:w-8 select-none shrink-0 text-right pr-3 font-mono text-[10px] sm:text-xs">
                    {line.num}
                  </span>
                  
                  {/* Code Tokens with Proper Indentation */}
                  <span className="border-l border-white/10 pl-3 flex-1">
                    {line.tokens.length === 0 ? (
                      <span>&nbsp;</span>
                    ) : (
                      line.tokens.map((token, tIdx) => (
                        <span key={tIdx} className={token.cls}>
                          {token.text}
                        </span>
                      ))
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Integrated Terminal Drawer (Non-overlapping) */}
          <div className="border-t border-white/10 bg-[#050505] p-3 sm:p-4 font-mono text-[10px] sm:text-xs flex flex-col gap-1.5">
            {/* Terminal Drawer Header */}
            <div className="flex items-center justify-between text-[10px] font-mono text-white/40 border-b border-white/5 pb-1.5 mb-1 select-none">
              <div className="flex items-center gap-3">
                <span className="text-brand-accent font-bold border-b border-brand-accent pb-0.5 flex items-center gap-1">
                  <Terminal className="w-3 h-3 inline" />
                  <span>TERMINAL</span>
                </span>
                <span>OUTPUT</span>
                <span>DEBUG CONSOLE</span>
              </div>
              <span className="text-white/30">node v20 • bash</span>
            </div>

            {/* Terminal Log */}
            <div className="text-brand-text-muted text-[10px] sm:text-xs">$ npm run build</div>
            <div ref={buildStatusRef} className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Compiled in 820ms (Turbopack Next.js 16)</span>
              </div>
              <div className="flex items-center gap-2 text-brand-text-secondary">
                <ArrowRight className="w-3.5 h-3.5 text-white/50 shrink-0" />
                <span>Responsive WebGL layout verified</span>
              </div>
              <div className="flex items-center gap-2 text-brand-text-secondary">
                <ArrowRight className="w-3.5 h-3.5 text-white/50 shrink-0" />
                <span>Core Web Vitals Performance: 100/100</span>
              </div>
              <div className="mt-0.5 text-brand-accent font-bold">● Ready for production: https://websitewalae.com</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
