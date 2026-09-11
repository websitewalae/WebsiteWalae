"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function EditingScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !uiRef.current || !playheadRef.current || !progressRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

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

    // 0% - Viewport entry: Fade in text and UI immediately
    tl.fromTo(textRef.current, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.4 });
    tl.fromTo(uiRef.current, 
      { opacity: 0, scale: 0.92, rotateX: -8, y: 60 }, 
      { opacity: 1, scale: 1, rotateX: 0, y: 0, duration: 0.6, ease: "power2.out" },
      "<"
    );

    // 20% - Playhead moves across timeline
    tl.fromTo(playheadRef.current, 
      { x: "0%" }, 
      { x: "92%", duration: 1.2, ease: "none" }
    );

    // 40% - Exporting status progress simulation
    tl.to({}, {
      duration: 0.8,
      onUpdate: function() {
        const progress = Math.floor(this.progress() * 100);
        if (progressRef.current) {
          progressRef.current.innerText = `EXPORTING MASTER... ${progress}%`;
        }
      }
    }, "<");

    // 70% - Complete export state
    tl.to(progressRef.current, { 
      onStart: () => { if (progressRef.current) progressRef.current.innerText = "FINAL MASTER EXPORTED ✦" },
      color: "#C7FF3D", 
      duration: 0.1 
    });

    // 80% - Exit transition into Social Media Engine
    tl.to([uiRef.current, textRef.current], {
      opacity: 0,
      scale: 0.94,
      y: -40,
      duration: 0.5,
      ease: "power2.in"
    }, "+=0.2");

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#050505]">
      <div ref={textRef} className="absolute top-[8%] sm:top-[12%] text-center px-4 z-20 max-w-full">
        <h2 className="text-xl sm:text-3xl md:text-5xl text-white font-black tracking-tight mb-2">
          THEN WE TURN RAW <br/> FOOTAGE INTO CONTENT.
        </h2>
      </div>

      <div ref={uiRef} className="w-[94%] sm:w-[90%] max-w-6xl h-[48vh] sm:h-[65vh] rounded-2xl border border-brand-border-strong flex flex-col overflow-hidden mt-[16%] sm:mt-[10%] shadow-cinematic perspective-[1000px] relative">
        {/* Cinematic Editor Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/editor_pc_bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-brand-bg/30" />

        {/* Top Header Overlay */}
        <div className="absolute top-0 w-full h-10 sm:h-12 border-b border-brand-border/50 bg-brand-surface/80 backdrop-blur-md flex items-center px-4 justify-between z-10">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
          </div>
          <span ref={progressRef} className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-brand-text">
            RENDERING PREVIEW...
          </span>
        </div>

        {/* Playhead Overlay */}
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 h-1.5 bg-brand-surface/50 rounded-full overflow-hidden z-10 backdrop-blur-sm border border-brand-border/50">
           <div ref={playheadRef} className="h-full bg-brand-accent w-2 rounded-full" />
        </div>
      </div>
    </section>
  );
}
