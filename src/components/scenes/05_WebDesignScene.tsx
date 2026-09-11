"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function WebDesignScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const wireframeRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !screenRef.current || !wireframeRef.current || !uiRef.current || !textRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=140%",
        scrub: 0.5,
        pin: true,
      },
    });

    // 0% - Immediate entry: headline & screen expansion start together
    tl.fromTo(textRef.current, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.4 });
    
    tl.fromTo(screenRef.current, 
      { scale: 0.35, y: 120, opacity: 0, borderRadius: "40px" },
      { scale: 1, y: 0, opacity: 1, borderRadius: "16px", duration: 0.7, ease: "power2.out" },
      "<"
    );

    // 35% - Wireframe morphs into polished UI Design
    tl.to(wireframeRef.current, { opacity: 0, duration: 0.3 });
    tl.fromTo(uiRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 }, "<");

    // 50% - Stagger UI component build elements
    const uiElements = uiRef.current.children;
    tl.fromTo(uiElements, 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "back.out(1.5)" }
    );

    // 75% - Morph exit into Development Code Editor
    tl.to([screenRef.current, textRef.current], {
      opacity: 0,
      scale: 1.05,
      y: -30,
      duration: 0.5,
      ease: "power2.in"
    }, "+=0.2");

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-brand-bg">
      <div ref={textRef} className="absolute top-[10%] text-center px-6 z-20">
        <h2 className="text-h2 mb-4">THEN WE BUILD <br /> THE DIGITAL HOME.</h2>
      </div>

      <div ref={screenRef} className="w-[92%] sm:w-[90%] max-w-6xl h-[65vh] sm:h-[70vh] bg-brand-surface border border-brand-border-strong rounded-2xl mt-[5%] shadow-cinematic overflow-hidden relative flex flex-col">
        {/* Fake Browser Header */}
        <div className="h-9 sm:h-10 border-b border-brand-border bg-[#0a0a0a] flex items-center px-4 gap-2 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-brand-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-brand-border" />
          <div className="ml-2 sm:ml-4 h-6 w-36 sm:w-64 bg-brand-bg rounded-md border border-brand-border flex items-center px-3">
             <span className="text-[9px] sm:text-[10px] text-brand-text-muted font-mono">websitewalae.com</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative bg-brand-bg overflow-hidden p-4 sm:p-8">
          
          {/* Wireframe State */}
          <div ref={wireframeRef} className="absolute inset-0 p-4 sm:p-8 flex flex-col gap-4 sm:gap-8 opacity-100">
            <div className="h-10 sm:h-12 w-full border-2 border-dashed border-brand-border rounded flex justify-between items-center px-4">
              <div className="w-16 sm:w-24 h-3 sm:h-4 bg-brand-surface rounded" />
              <div className="w-24 sm:w-48 h-3 sm:h-4 bg-brand-surface rounded" />
            </div>
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-brand-border rounded p-4">
              <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-sm">
                <div className="w-48 sm:w-64 h-8 sm:h-12 bg-brand-surface rounded" />
                <div className="w-full h-4 sm:h-6 bg-brand-surface rounded" />
                <div className="w-24 sm:w-32 h-8 sm:h-10 bg-brand-surface rounded-full mt-2 sm:mt-4" />
              </div>
            </div>
          </div>

          {/* Polished UI State */}
          <div ref={uiRef} className="absolute inset-0 p-4 sm:p-8 flex flex-col gap-4 sm:gap-8 opacity-0">
            {/* Nav */}
            <div className="h-10 sm:h-12 w-full glass rounded-full flex justify-between items-center px-4 sm:px-6">
              <div className="text-xs sm:text-sm font-bold tracking-widest text-brand-text">BRAND</div>
              <div className="flex gap-2 sm:gap-4 text-[10px] sm:text-xs text-brand-text-secondary">
                <span>HOME</span>
                <span>ABOUT</span>
                <span>CONTACT</span>
              </div>
            </div>
            {/* Hero */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4 text-white">THE FUTURE IS NOW.</h1>
              <p className="text-xs sm:text-base text-brand-text-secondary max-w-md mb-4 sm:mb-8">A fully realized digital experience built from the ground up to convert.</p>
              <button className="px-6 py-2.5 sm:px-8 sm:py-4 bg-brand-accent text-brand-bg font-bold text-xs sm:text-sm rounded-full">Explore</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
