"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function ContentCreationScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<HTMLDivElement>(null);
  const filesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !filesContainerRef.current || !recRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const files = filesContainerRef.current.children;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 0.5,
        pin: true,
      },
    });

    // 0% - Viewport entry: REC indicator lights up & headline moves in immediately
    tl.fromTo(recRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3 });
    tl.fromTo(textRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 }, "<");

    // 20% - Staggered file entry (sliding with rotation & depth velocity)
    tl.fromTo(files, 
      { opacity: 0, y: 120, rotateX: 30, scale: 0.7 },
      { opacity: 1, y: 0, rotateX: 0, scale: 1, stagger: 0.15, duration: 0.8, ease: "power2.out" },
      "-=0.2"
    );

    // 50% - Orbital shift before export
    tl.to(files, {
      rotateZ: (i) => [-4, 0, 4][i],
      y: (i) => [-10, 10, -10][i],
      duration: 0.5,
    });

    // 75% - Files fly toward editing workstation (continuous story transition)
    tl.to(files, {
      z: -600,
      y: -250,
      scale: 0.4,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: "power2.in"
    });

    tl.to(textRef.current, { opacity: 0, y: -40, duration: 0.4 }, "<");

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-brand-bg">
      <div ref={textRef} className="absolute top-[15%] text-center px-6 z-20">
        <h2 className="text-h2 mb-4">FIRST, WE CAPTURE ATTENTION.</h2>
      </div>

      {/* Viewfinder UI */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-brand-border opacity-25 m-4 sm:m-12 lg:m-24 flex items-center justify-center">
        <div className="w-8 h-8 sm:w-16 sm:h-16 border-t-2 border-l-2 border-brand-accent absolute top-4 left-4 sm:top-8 sm:left-8" />
        <div className="w-8 h-8 sm:w-16 sm:h-16 border-t-2 border-r-2 border-brand-accent absolute top-4 right-4 sm:top-8 sm:right-8" />
        <div className="w-8 h-8 sm:w-16 sm:h-16 border-b-2 border-l-2 border-brand-accent absolute bottom-4 left-4 sm:bottom-8 sm:left-8" />
        <div className="w-8 h-8 sm:w-16 sm:h-16 border-b-2 border-r-2 border-brand-accent absolute bottom-4 right-4 sm:bottom-8 sm:right-8" />
        
        <div ref={recRef} className="absolute top-4 sm:top-8 flex items-center gap-2 text-brand-accent font-mono text-xs sm:text-sm tracking-widest">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 animate-pulse" /> 
          REC ● 00:00:12
        </div>
      </div>

      {/* Captured Files */}
      <div ref={filesContainerRef} className="relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-12 sm:-mt-12 px-4 max-w-full perspective-[1000px]">
        {[
          { name: "FINAL_REEL_01.mp4", size: "4K • 24fps" },
          { name: "PRODUCT_SHOOT.mov", size: "1080p • 60fps" },
          { name: "CAMPAIGN_MASTER.mp4", size: "4K • RAW" }
        ].map((file, i) => (
          <div key={i} className="glass p-4 sm:p-6 rounded-2xl w-[260px] sm:w-[280px] h-[150px] sm:h-[180px] flex flex-col justify-between shadow-floating transform-gpu transition-transform hover:scale-105">
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center">
                <div className="w-0 h-0 border-t-[5px] sm:border-t-[6px] border-t-transparent border-l-[8px] sm:border-l-[10px] border-l-brand-text border-b-[5px] sm:border-b-[6px] border-b-transparent ml-1" />
              </div>
              <span className="text-[10px] sm:text-xs text-brand-text-muted font-mono">{file.size}</span>
            </div>
            <div>
              <p className="font-mono text-xs sm:text-sm text-brand-text mb-1 truncate">{file.name}</p>
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
