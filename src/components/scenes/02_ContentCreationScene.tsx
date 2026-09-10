"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function ContentCreationScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const filesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !filesContainerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const files = filesContainerRef.current.children;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
      },
    });

    // Fade in text
    tl.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });

    // Show files capturing instantly with the text
    tl.fromTo(files, 
      { opacity: 0, scale: 0.8, y: 50, rotateX: 20 },
      { opacity: 1, scale: 1, y: 0, rotateX: 0, stagger: 0.2, duration: 1, ease: "back.out(1.7)" },
      "<0.1" // Starts almost instantly with the text
    );

    // Files fly away toward the computer (next scene)
    tl.to(files, {
      z: -500,
      y: -200,
      scale: 0.5,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power2.in"
    });

    tl.to(textRef.current, { opacity: 0, y: -50, duration: 0.5 }, "<");

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-brand-bg">
      <div ref={textRef} className="absolute top-[15%] text-center px-6 z-20">
        <h2 className="text-h2 mb-4">FIRST, WE CAPTURE ATTENTION.</h2>
      </div>

      {/* Viewfinder UI */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-brand-border opacity-20 m-12 lg:m-24 flex items-center justify-center">
        <div className="w-16 h-16 border-t-2 border-l-2 border-brand-accent absolute top-8 left-8" />
        <div className="w-16 h-16 border-t-2 border-r-2 border-brand-accent absolute top-8 right-8" />
        <div className="w-16 h-16 border-b-2 border-l-2 border-brand-accent absolute bottom-8 left-8" />
        <div className="w-16 h-16 border-b-2 border-r-2 border-brand-accent absolute bottom-8 right-8" />
        <div className="absolute top-8 flex items-center gap-2 text-brand-accent font-mono text-sm tracking-widest animate-pulse">
          <div className="w-3 h-3 rounded-full bg-red-500" /> REC 00:00:12
        </div>
      </div>

      {/* Captured Files */}
      <div ref={filesContainerRef} className="relative z-10 flex flex-wrap items-center justify-center gap-8 -mt-12 perspective-[1000px]">
        {[
          { name: "FINAL_REEL_01.mp4", size: "4K • 24fps" },
          { name: "PRODUCT_SHOOT.mov", size: "1080p • 60fps" },
          { name: "CAMPAIGN_MASTER.mp4", size: "4K • RAW" }
        ].map((file, i) => (
          <div key={i} className="glass p-6 rounded-2xl w-[280px] h-[180px] flex flex-col justify-between shadow-floating transform-gpu transition-transform hover:scale-105">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-brand-text border-b-[6px] border-b-transparent ml-1" />
              </div>
              <span className="text-xs text-brand-text-muted font-mono">{file.size}</span>
            </div>
            <div>
              <p className="font-mono text-sm text-brand-text mb-1 truncate">{file.name}</p>
              <div className="w-full bg-brand-surface h-1 rounded-full overflow-hidden">
                <div className="w-full h-full bg-brand-accent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
