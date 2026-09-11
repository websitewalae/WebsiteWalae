"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const steps = [
  { id: "01", name: "DISCOVER", phase: "Idea" },
  { id: "02", name: "STRATEGIZE", phase: "Design" },
  { id: "03", name: "CREATE", phase: "Content" },
  { id: "04", name: "BUILD", phase: "Website" },
  { id: "05", name: "LAUNCH", phase: "Marketing" },
  { id: "06", name: "GROW", phase: "Growth" },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const items = trackRef.current.children;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${trackRef.current?.scrollWidth}`,
        scrub: 1,
        pin: true,
      },
    });

    tl.to(items, {
      xPercent: -100 * (items.length - 1),
      ease: "none",
    });

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center border-t border-brand-border">
      <div className="absolute top-[15%] text-center px-6 z-20">
        <h2 className="text-h2 mb-4 text-brand-text">THE PRODUCTION LINE.</h2>
      </div>

      <div className="flex items-center justify-start w-full h-full pt-[10%]">
        <div ref={trackRef} className="flex h-64">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center justify-center px-[4vw] sm:px-[8vw] md:px-[10vw] relative shrink-0">
              {/* Connection Line */}
              {i < steps.length - 1 && (
                <div className="absolute top-1/2 left-[50%] w-full h-px bg-brand-border-strong -translate-y-1/2" />
              )}
              
              <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full border border-brand-border-strong bg-brand-bg flex items-center justify-center mb-4 sm:mb-8 shadow-floating transition-transform hover:scale-110">
                 <div className="text-[10px] sm:text-xs font-mono text-brand-accent absolute top-4 sm:top-8">{step.id}</div>
                 <div className="text-sm sm:text-xl md:text-2xl font-bold tracking-tighter text-center">{step.name}</div>
              </div>
              <div className="text-center font-mono text-xs sm:text-sm text-brand-text-muted">
                {`-> ${step.phase}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
