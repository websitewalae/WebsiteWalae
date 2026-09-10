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
        end: "+=200%",
        scrub: 1,
        pin: true,
      },
    });

    // Fade in
    tl.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });
    
    // Screen scales up from a "social post" size
    tl.fromTo(screenRef.current, 
      { scale: 0.2, y: 200, opacity: 0, borderRadius: "50px" },
      { scale: 1, y: 0, opacity: 1, borderRadius: "16px", duration: 1, ease: "power2.out" },
      "<"
    );

    // Wireframe morphs to UI Design
    tl.to(wireframeRef.current, { opacity: 0, duration: 0.5 });
    tl.fromTo(uiRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "<");

    // UI elements stagger animate (simulate building)
    const uiElements = uiRef.current.children;
    tl.fromTo(uiElements, 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, stagger: 0.1, duration: 1, ease: "back.out(1.7)" }
    );

    // Fade out
    tl.to([screenRef.current, textRef.current], {
      opacity: 0,
      scale: 1.1,
      duration: 1,
      ease: "power2.in"
    });

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-brand-bg">
      <div ref={textRef} className="absolute top-[10%] text-center px-6 z-20">
        <h2 className="text-h2 mb-4">THEN WE BUILD <br /> THE DIGITAL HOME.</h2>
      </div>

      <div ref={screenRef} className="w-[90%] max-w-6xl h-[70vh] bg-brand-surface border border-brand-border-strong rounded-2xl mt-[5%] shadow-cinematic overflow-hidden relative flex flex-col">
        {/* Fake Browser Header */}
        <div className="h-10 border-b border-brand-border bg-[#0a0a0a] flex items-center px-4 gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-brand-border" />
          <div className="w-3 h-3 rounded-full bg-brand-border" />
          <div className="w-3 h-3 rounded-full bg-brand-border" />
          <div className="ml-4 h-6 w-64 bg-brand-bg rounded-md border border-brand-border flex items-center px-3">
             <span className="text-[10px] text-brand-text-muted font-mono">websitewalae.com</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative bg-brand-bg overflow-hidden p-8">
          
          {/* Wireframe State */}
          <div ref={wireframeRef} className="absolute inset-0 p-8 flex flex-col gap-8 opacity-100">
            <div className="h-12 w-full border-2 border-dashed border-brand-border rounded flex justify-between items-center px-4">
              <div className="w-24 h-4 bg-brand-surface rounded" />
              <div className="w-48 h-4 bg-brand-surface rounded" />
            </div>
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-brand-border rounded">
              <div className="flex flex-col items-center gap-4">
                <div className="w-64 h-12 bg-brand-surface rounded" />
                <div className="w-96 h-6 bg-brand-surface rounded" />
                <div className="w-32 h-10 bg-brand-surface rounded-full mt-4" />
              </div>
            </div>
          </div>

          {/* Polished UI State */}
          <div ref={uiRef} className="absolute inset-0 p-8 flex flex-col gap-8 opacity-0">
            {/* Nav */}
            <div className="h-12 w-full glass rounded-full flex justify-between items-center px-6">
              <div className="text-sm font-bold tracking-widest text-brand-text">BRAND</div>
              <div className="flex gap-4 text-xs text-brand-text-secondary">
                <span>HOME</span>
                <span>ABOUT</span>
                <span>CONTACT</span>
              </div>
            </div>
            {/* Hero */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <h1 className="text-6xl font-bold mb-4 text-white">THE FUTURE IS NOW.</h1>
              <p className="text-brand-text-secondary max-w-md mb-8">A fully realized digital experience built from the ground up to convert.</p>
              <button className="px-8 py-4 bg-brand-accent text-brand-bg font-bold rounded-full">Explore</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
