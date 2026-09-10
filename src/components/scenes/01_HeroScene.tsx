"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MagneticButton from "../ui/MagneticButton";

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !cameraRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
      },
    });

    // Cinematic Background Parallax/Zoom
    tl.to(cameraRef.current, {
      scale: 1.1,
      y: "15%",
      opacity: 0.4,
      duration: 1,
      ease: "power2.inOut",
    }, 0);

    // Text fades out
    tl.to(textRef.current, {
      opacity: 0,
      y: -50,
      scale: 0.95,
      duration: 0.5,
    }, 0);

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-brand-bg pt-20">
      {/* Cinematic Photographic Background with Motion Effects */}
      <div 
        ref={cameraRef as any}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('/images/tech_hero_bg.jpg')" }}
      />

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-bg via-transparent to-brand-bg opacity-90 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-brand-bg/40 mix-blend-multiply pointer-events-none" />

      <div ref={textRef} className="relative z-20 flex flex-col items-center text-center max-w-5xl px-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-brand-accent text-sm md:text-base font-semibold tracking-widest uppercase mb-6"
        >
          Digital Creative Agency
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-display-hero mb-8"
        >
          WE BUILD DIGITAL <br />
          <span className="text-brand-text-muted">EXPERIENCES THAT</span> <br />
          MOVE PEOPLE.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-brand-text-secondary text-lg md:text-xl max-w-2xl mb-12"
        >
          Websites, content, design and marketing built to turn attention into growth.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center gap-6"
        >
          <MagneticButton>Start a Project</MagneticButton>
          <a href="#work" className="text-sm font-semibold hover:text-brand-accent transition-colors" data-cursor="link">
            Explore Our Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
