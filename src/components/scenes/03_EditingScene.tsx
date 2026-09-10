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
        end: "+=200%",
        scrub: 1,
        pin: true,
      },
    });

    // Fade in text and UI
    tl.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });
    tl.fromTo(uiRef.current, 
      { opacity: 0, scale: 0.9, rotateX: -10, y: 100 }, 
      { opacity: 1, scale: 1, rotateX: 0, y: 0, duration: 1, ease: "power2.out" },
      "<"
    );

    // Playhead moves across timeline
    tl.fromTo(playheadRef.current, 
      { x: "0%" }, 
      { x: "400px", duration: 2, ease: "none" }
    );

    // Simulate exporting text update
    tl.to({}, {
      duration: 1,
      onUpdate: function() {
        const progress = Math.floor(this.progress() * 100);
        if (progressRef.current) {
          progressRef.current.innerText = `EXPORTING... ${progress}%`;
        }
      }
    });

    // Final state text
    tl.to(progressRef.current, { 
      onStart: () => { if (progressRef.current) progressRef.current.innerText = "READY TO PUBLISH" },
      color: "#C7FF3D", 
      duration: 0.1 
    });

    // Fade out
    tl.to([uiRef.current, textRef.current], {
      opacity: 0,
      scale: 0.95,
      y: -50,
      duration: 1,
      ease: "power2.inOut"
    }, "+=0.5");

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#050505]">
      <div ref={textRef} className="absolute top-[15%] text-center px-6 z-20">
        <h2 className="text-h2 mb-4">THEN WE TURN RAW <br/> FOOTAGE INTO CONTENT.</h2>
      </div>

      <div ref={uiRef} className="w-[90%] max-w-6xl h-[70vh] rounded-2xl border border-brand-border-strong flex flex-col overflow-hidden mt-[10%] shadow-cinematic perspective-[1000px] relative">
        {/* Cinematic Editor Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/editor_pc_bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-brand-bg/20" />

        {/* Top Header Overlay for Storytelling */}
        <div className="absolute top-0 w-full h-12 border-b border-brand-border/50 bg-brand-surface/80 backdrop-blur-md flex items-center px-4 justify-between z-10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <span ref={progressRef} className="text-xs font-mono font-bold tracking-widest text-brand-text">
            RENDERING PREVIEW...
          </span>
        </div>

        {/* Playhead Overlay (adds to the editing feel) */}
        <div className="absolute bottom-10 left-10 right-10 h-1 bg-brand-surface/50 rounded-full overflow-hidden z-10 backdrop-blur-sm border border-brand-border/50">
           <div ref={playheadRef} className="h-full bg-brand-accent w-2" />
        </div>
      </div>
    </section>
  );
}
