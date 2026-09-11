"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Search, TrendingUp, Users, MousePointerClick, Activity } from "lucide-react";

export default function MarketingScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !searchRef.current || !analyticsRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const stats = analyticsRef.current.children;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      },
    });

    // Fade in text and Search UI
    tl.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });
    tl.fromTo(searchRef.current, 
      { opacity: 0, y: 100, scale: 0.9 }, 
      { opacity: 1, y: 0, scale: 1, duration: 1 }
    );

    // Search Results move up
    const resultItem = searchRef.current.querySelector('.search-result');
    if (resultItem) {
      tl.to(resultItem, { y: -80, color: "#C7FF3D", duration: 1 });
    }

    // Search fades out, Analytics come in
    tl.to(searchRef.current, { opacity: 0, scale: 1.1, duration: 0.5 });
    
    tl.fromTo(stats, 
      { opacity: 0, y: 50, scale: 0.8 }, 
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 1, ease: "back.out(1.5)" }
    );

    // Fade out
    tl.to([analyticsRef.current, textRef.current], {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.in"
    });

  }, []);

  const metrics = [
    { label: "TRAFFIC", value: "+42%", icon: <Users className="w-6 h-6 text-brand-accent" /> },
    { label: "ENGAGEMENT", value: "+28%", icon: <Activity className="w-6 h-6 text-brand-accent" /> },
    { label: "CONVERSIONS", value: "+31%", icon: <MousePointerClick className="w-6 h-6 text-brand-accent" /> },
    { label: "LEADS", value: "+54%", icon: <TrendingUp className="w-6 h-6 text-brand-accent" /> },
  ];

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#050505]">
      <div ref={textRef} className="absolute top-[10%] text-center px-6 z-20">
        <h2 className="text-h2 mb-4">BUILT TO BE FOUND.<br/>BUILT TO CONVERT.</h2>
      </div>

      {/* Search Engine UI */}
      <div ref={searchRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[10%] px-4">
        <div className="w-[92%] sm:w-[80%] max-w-2xl bg-brand-surface border border-brand-border rounded-full h-12 sm:h-14 flex items-center px-4 sm:px-6 gap-3 sm:gap-4 shadow-cinematic mb-8 sm:mb-12">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-brand-text-muted" />
          <div className="text-brand-text font-mono text-xs sm:text-sm">digital creative agency</div>
        </div>

        <div className="w-[92%] sm:w-[80%] max-w-2xl flex flex-col gap-4 sm:gap-6 relative">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-brand-bg z-10" />
           {[1, 2, 3].map((i) => (
             <div key={i} className={`flex flex-col gap-1 sm:gap-2 ${i === 3 ? 'search-result' : 'opacity-40'}`}>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-brand-surface" />
                  <div className="text-[10px] sm:text-xs text-brand-text-muted">https://www.websitewalae.com</div>
                </div>
                <div className="text-base sm:text-xl font-bold text-brand-text">Website Walae | Digital Creative Agency</div>
                <div className="text-xs sm:text-sm text-brand-text-secondary">We build digital experiences that move people. Websites, content, design and marketing.</div>
             </div>
           ))}
        </div>
      </div>

      {/* Analytics UI */}
      <div ref={analyticsRef} className="absolute inset-0 flex flex-wrap items-center justify-center gap-3 sm:gap-6 p-4 sm:p-6 mt-[10%] content-center opacity-0 max-w-4xl mx-auto">
        {metrics.map((metric, i) => (
          <div key={i} className="glass w-[140px] sm:w-[220px] md:w-[240px] h-[150px] sm:h-[220px] md:h-[240px] rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between shadow-floating border-brand-border-strong">
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              {metric.icon}
            </div>
            <div>
              <div className="text-2xl sm:text-4xl md:text-5xl font-bold font-mono text-brand-text mb-1 tracking-tighter">
                {metric.value}
              </div>
              <div className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-text-secondary">
                {metric.label}
              </div>
            </div>
            {/* Fake graph line */}
            <div className="w-full h-6 sm:h-12 mt-2 opacity-50" style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 30\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0 30 Q 25 15 50 20 T 100 5\' fill=\'none\' stroke=\'%23C7FF3D\' stroke-width=\'2\'/%3E%3C/svg%3E")',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat'
            }} />
          </div>
        ))}
        <div className="w-full text-center text-[10px] sm:text-xs text-brand-text-disabled mt-4 font-mono">
          * Demo metrics for illustrative purposes only.
        </div>
      </div>
    </section>
  );
}
