"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight, Activity, Share2, Eye } from "lucide-react";

export default function ContentCreationScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLSpanElement>(null);
  const textRightRef = useRef<HTMLSpanElement>(null);
  const recRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const signalLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !cardsContainerRef.current || !recRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsContainerRef.current.children;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 0.4,
        pin: true,
      },
    });

    // 0% - Immediate entry: REC indicator lights up & headline enters
    tl.fromTo(recRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3 });
    tl.fromTo(textRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, "<");

    // 10%-40% - Staggered card sequence (CONTENT -> DISTRIBUTION -> ATTENTION)
    tl.fromTo(cards, 
      { opacity: 0, y: 90, scale: 0.82, rotateX: 20 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotateX: 0, 
        stagger: 0.15, 
        duration: 0.8, 
        ease: "power2.out" 
      },
      "-=0.2"
    );

    // 40%-60% - Headline splits & Attention Signal Thread activates
    if (textLeftRef.current && textRightRef.current) {
      tl.to(textLeftRef.current, { x: "-20px", duration: 0.5 }, "<");
      tl.to(textRightRef.current, { x: "20px", duration: 0.5 }, "<");
    }

    if (signalLineRef.current) {
      tl.fromTo(signalLineRef.current, 
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.6, ease: "easeInOut" },
        "<"
      );
    }

    // 60%-80% - Orbital lock
    tl.to(cards, {
      rotateZ: (i) => [-3, 0, 3][i],
      y: (i) => [-8, 8, -8][i],
      duration: 0.4,
    });

    // 80%-100% - Cards compress into flowing data stream transitioning into Editing Scene
    tl.to(cards, {
      z: -500,
      y: -200,
      scale: 0.35,
      opacity: 0,
      stagger: 0.06,
      duration: 0.7,
      ease: "power2.in"
    });

    tl.to(textRef.current, { opacity: 0, y: -30, duration: 0.4 }, "<");

  }, []);

  const storyCards = [
    {
      step: "01",
      tag: "CONTENT CREATED",
      title: "WEBSITE WALAE // CONTENT",
      metric: "4K RAW FOOTAGE CAPTURED",
      icon: Sparkles,
      color: "border-brand-accent/50 text-brand-accent",
      sub: "High-impact brand cinematography & reels."
    },
    {
      step: "02",
      tag: "DISTRIBUTED",
      title: "WEBSITE WALAE // DISTRIBUTION",
      metric: "MULTI-CHANNEL DELIVERY",
      icon: Share2,
      color: "border-blue-400/50 text-blue-400",
      sub: "Multi-platform targeted attention dispatch."
    },
    {
      step: "03",
      tag: "ATTENTION CAPTURED",
      title: "WEBSITE WALAE // ATTENTION",
      metric: "HIGH INTENT ENGAGEMENT",
      icon: Eye,
      color: "border-purple-400/50 text-purple-400",
      sub: "Audience growth & measurable business ROI."
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#050505] selection:bg-brand-accent selection:text-black max-w-full"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/3 w-[50vw] h-[50vw] bg-gradient-to-br from-brand-accent/20 via-purple-600/10 to-transparent rounded-full blur-[150px] mix-blend-screen" />
      </div>

      {/* Participating Headline (Point 18) */}
      <div ref={textRef} className="absolute top-[12%] text-center px-4 z-20 max-w-full">
        <h2 className="text-h2 text-white font-black tracking-tight flex flex-wrap justify-center gap-2">
          <span ref={textLeftRef} className="inline-block">FROM CONTENT</span>
          <span ref={textRightRef} className="inline-block text-brand-accent">TO ATTENTION.</span>
        </h2>
      </div>

      {/* Viewfinder UI Indicator */}
      <div className="absolute inset-0 pointer-events-none border border-brand-border opacity-20 m-3 sm:m-8 lg:m-20 flex items-center justify-center max-w-full overflow-hidden">
        <div className="w-6 h-6 sm:w-12 sm:h-12 border-t-2 border-l-2 border-brand-accent absolute top-3 left-3 sm:top-6 sm:left-6" />
        <div className="w-6 h-6 sm:w-12 sm:h-12 border-t-2 border-r-2 border-brand-accent absolute top-3 right-3 sm:top-6 sm:right-6" />
        <div className="w-6 h-6 sm:w-12 sm:h-12 border-b-2 border-l-2 border-brand-accent absolute bottom-3 left-3 sm:bottom-6 sm:left-6" />
        <div className="w-6 h-6 sm:w-12 sm:h-12 border-b-2 border-r-2 border-brand-accent absolute bottom-3 right-3 sm:bottom-6 sm:right-6" />
        
        <div ref={recRef} className="absolute top-3 sm:top-6 flex items-center gap-2 text-brand-accent font-mono text-xs tracking-widest bg-black/60 px-3 py-1 rounded-full border border-brand-accent/30">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" /> 
          <span>REC ● 00:00:01:12 // CAPTURED</span>
        </div>
      </div>

      {/* Electric Lime Attention Signal Thread (Point 16) */}
      <div 
        ref={signalLineRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-4xl h-0.5 bg-gradient-to-r from-transparent via-brand-accent to-transparent pointer-events-none z-10 opacity-0"
      >
        <div className="w-3 h-3 rounded-full bg-brand-accent shadow-[0_0_15px_rgba(199,255,61,0.8)] -mt-1.2 animate-[ping_2s_infinite]" />
      </div>

      {/* Content Story Cards Container (Points 13-17) */}
      <div ref={cardsContainerRef} className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 mt-16 sm:mt-8 px-4 max-w-full perspective-[1000px]">
        {storyCards.map((card, i) => {
          const CardIcon = card.icon;
          return (
            <div 
              key={i} 
              className={`glass p-5 sm:p-6 rounded-2xl w-[280px] sm:w-[310px] h-[190px] sm:h-[210px] flex flex-col justify-between shadow-floating border bg-[#0a0a0a]/90 backdrop-blur-xl transform-gpu transition-all duration-300 hover:scale-105 ${card.color}`}
            >
              {/* Card Top Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <CardIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-text-muted font-bold">{card.title}</span>
                </div>
                <span className="text-[9px] font-mono font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">{card.step}</span>
              </div>

              {/* Card Visual Content Body */}
              <div className="my-2 text-left">
                <div className="text-xs sm:text-sm font-black text-white tracking-wide uppercase mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                  {card.tag}
                </div>
                <div className="text-[10px] font-mono text-brand-accent font-bold tracking-wider mb-1">
                  {card.metric}
                </div>
                <p className="text-[10px] text-brand-text-secondary font-mono leading-tight">
                  {card.sub}
                </p>
              </div>

              {/* Card Footer Signal Bar */}
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden flex items-center">
                <div className="w-full h-full bg-brand-accent animate-pulse" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
