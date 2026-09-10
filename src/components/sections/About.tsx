"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const objectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !objectsRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const objects = objectsRef.current.children;

    // Parallax effect on scroll
    gsap.to(objects, {
      y: (i) => -100 * (i % 3 + 1), // Different speeds
      rotate: (i) => 10 * (i % 2 === 0 ? 1 : -1),
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen bg-brand-bg flex flex-col items-center justify-center overflow-hidden py-24 md:py-48">
      {/* Floating Objects */}
      <div ref={objectsRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-32 h-32 glass rounded-full shadow-floating opacity-30 flex items-center justify-center text-xs font-mono text-brand-text-muted">CAMERA</div>
        <div className="absolute top-[60%] left-[15%] w-48 h-32 glass rounded-xl shadow-floating opacity-20 flex items-center justify-center text-xs font-mono text-brand-text-muted">LAPTOP</div>
        <div className="absolute top-[15%] right-[15%] w-24 h-48 glass rounded-3xl shadow-floating opacity-40 flex items-center justify-center text-xs font-mono text-brand-text-muted">PHONE</div>
        <div className="absolute top-[50%] right-[10%] w-56 h-40 glass rounded-xl shadow-floating opacity-20 flex items-center justify-center text-xs font-mono text-brand-text-muted">DESIGN UI</div>
        <div className="absolute bottom-[10%] left-[40%] w-64 h-24 glass rounded-lg shadow-floating opacity-30 flex items-center justify-center text-xs font-mono text-brand-text-muted">TIMELINE</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="text-h2 mb-12">NOT JUST ANOTHER AGENCY.</h2>
        <p className="text-xl md:text-3xl text-brand-text-secondary leading-relaxed font-medium mb-16">
          We combine <span className="text-brand-text">design</span>, <span className="text-brand-text">technology</span>, <span className="text-brand-text">content</span> and <span className="text-brand-text">marketing</span> to help brands build a stronger digital presence.
        </p>
        
        <a 
          href="/about" 
          className="relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-brand-accent rounded-full hover:scale-105 hover:bg-white transition-all duration-300 z-20 group"
        >
          Read Our Story
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
