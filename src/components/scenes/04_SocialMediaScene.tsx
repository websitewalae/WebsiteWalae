"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

export default function SocialMediaScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !cardsRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsRef.current.children;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      },
    });

    tl.fromTo(textRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 });

    // Cards fan out from center
    tl.fromTo(cards, 
      { opacity: 0, y: 200, scale: 0.8, rotateZ: 0 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateZ: (i) => [-10, 0, 10][i],
        x: (i) => [-300, 0, 300][i],
        stagger: 0.1,
        duration: 1,
        ease: "power2.out"
      }
    );

    // Cards move up and disappear
    tl.to(cards, {
      y: -500,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power2.in"
    });

    tl.to(textRef.current, { opacity: 0, y: -50, duration: 0.5 }, "<");

  }, []);

  const stats = [
    { views: "12.8K", likes: "1,842", shares: "327" },
    { views: "45.2K", likes: "6,102", shares: "891" },
    { views: "102K", likes: "14.5K", shares: "2.1K" },
  ];

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-brand-bg">
      {/* Ambient Glowing Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[30vw] h-[30vw] bg-brand-accent/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div ref={textRef} className="absolute top-[15%] text-center px-6 z-20">
        <h2 className="text-h2 mb-4">FROM CONTENT TO ATTENTION.</h2>
      </div>

      <div ref={cardsRef} className="relative z-10 flex items-center justify-center w-full h-full mt-[10%]">
        {stats.map((stat, i) => (
          <div key={i} className="absolute w-[300px] h-[500px] glass rounded-3xl p-4 flex flex-col justify-between shadow-floating border-brand-border-strong bg-[#0a0a0a]/80">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-surface border border-brand-border" />
              <div>
                <div className="text-sm font-bold text-brand-text">Website Walae</div>
                <div className="text-xs text-brand-text-muted">Sponsored</div>
              </div>
            </div>
            
            <div className="flex-1 rounded-xl border border-brand-border/50 mb-4 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-black">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-bg/80" />
               <div className="w-12 h-12 rounded-full border border-brand-accent/50 flex items-center justify-center bg-black/50 backdrop-blur-md z-10">
                 <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-brand-accent border-b-[6px] border-b-transparent ml-1" />
               </div>
               <div className="absolute bottom-4 left-4 text-brand-accent font-mono text-[10px] tracking-widest z-10">ENGAGEMENT PEAKING</div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-brand-text">
                <div className="flex gap-4">
                  <Heart className="w-6 h-6" />
                  <MessageCircle className="w-6 h-6" />
                  <Share2 className="w-6 h-6" />
                </div>
                <Bookmark className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold">{stat.likes} likes</div>
              <div className="text-xs text-brand-text-muted">
                Demo metrics for illustrative purposes only.
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
