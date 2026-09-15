"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    let mm = gsap.matchMedia();

    // Responsive Animations
    mm.add("(min-width: 768px)", () => {
      // CTA Entrance
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current.children, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.15, 
            duration: 0.8, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 70%",
            }
          }
        );
      }

      // Grid Stagger Entrance
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Wordmark subtle parallax & glow
      if (wordmarkRef.current) {
        gsap.fromTo(wordmarkRef.current,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wordmarkRef.current,
              start: "top 95%",
              end: "bottom bottom",
              scrub: 1
            }
          }
        );
      }
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile simplified entrance
      gsap.fromTo([ctaRef.current, gridRef.current, wordmarkRef.current],
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.2, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          }
        }
      );
    });

    // Clean up
    return () => mm.revert();
  }, []);

  // Desktop Mouse Parallax for Big Wordmark
  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024 || !wordmarkRef.current) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    gsap.to(wordmarkRef.current, {
      x: x,
      y: y,
      duration: 1,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 1024 || !wordmarkRef.current) return;
    gsap.to(wordmarkRef.current, {
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <footer 
      ref={footerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#030303] text-white pt-20 md:pt-32 pb-6 overflow-hidden border-t border-white/5 z-50 selection:bg-brand-accent selection:text-black"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[30vh] bg-brand-accent/5 rounded-[100%] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100vw] h-[40vh] bg-brand-accent/5 rounded-[100%] blur-[150px] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[5vw] relative z-10">
        
        {/* 1. BIG FINAL CTA */}
        <div ref={ctaRef} className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 md:mb-32">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-6">
            LET’S CREATE <br className="hidden sm:block" />
            <span className="text-brand-accent italic pr-2">SOMETHING.</span>
          </h2>
          <p className="text-brand-text-secondary text-sm md:text-base lg:text-lg max-w-xl mx-auto mb-10 font-medium">
            Have an idea, a brand, or a project in mind? Let’s turn it into something people remember.
          </p>
          <Link 
            href="/start-a-project" 
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-accent text-black font-black text-sm md:text-base rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 tracking-widest uppercase">Start A Project</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>
        </div>

        {/* 2. FOOTER GRID (4-Column) */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20 md:mb-32">
          
          {/* Col 1: BRAND */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="inline-block mb-2">
              <img src="/logo.png" alt="Website Walae Logo" className="h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-transform origin-left" />
            </Link>
            <div>
              <div className="text-brand-accent text-xs font-bold tracking-widest uppercase mb-1">Website Walae</div>
              <div className="text-white text-sm font-semibold tracking-wide uppercase mb-2">Digital Creative Agency</div>
              <p className="text-brand-text-secondary text-xs sm:text-sm leading-relaxed max-w-xs">
                We build premium digital experiences that move people. Websites, content, design and marketing.
              </p>
            </div>
          </div>

          {/* Col 2: NAVIGATION */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono text-brand-text-muted tracking-[0.2em] uppercase mb-2">Navigation</span>
            {["Home", "Work", "Services", "Articles", "About", "Pricing", "Contact"].map((item) => (
              <Link 
                key={item} 
                href={item === "Home" ? "/" : item === "Articles" ? "/articles" : `/${item.toLowerCase()}`} 
                className="text-sm font-medium text-brand-text hover:text-brand-accent transition-colors w-fit relative group overflow-hidden"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-brand-accent -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </Link>
            ))}
          </div>

          {/* Col 3: SERVICES */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono text-brand-text-muted tracking-[0.2em] uppercase mb-2">Services</span>
            {[
              { label: "Website Development", path: "/services/website-development-lucknow" },
              { label: "UI/UX Design", path: "/services/ui-ux-design-lucknow" },
              { label: "Social Media Marketing", path: "/services/social-media-marketing-lucknow" },
              { label: "Content Creation", path: "/services/content-creation-lucknow" },
              { label: "Video Production", path: "/services/video-production-lucknow" },
              { label: "SEO & Growth", path: "/services/seo-lucknow" },
              { label: "Meta Ads", path: "/services/performance-marketing-lucknow" },
              { label: "Public Relations", path: "/services/pr-lucknow" },
            ].map((service) => (
              <Link 
                key={service.label} 
                href={service.path} 
                className="text-sm font-medium text-brand-text hover:text-brand-accent transition-colors w-fit relative group"
              >
                {service.label}
              </Link>
            ))}
          </div>

          {/* Col 4: CONNECT */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono text-brand-text-muted tracking-[0.2em] uppercase mb-2">Connect</span>
            <a href="https://www.instagram.com/websitewalae/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-text hover:text-brand-accent transition-colors flex items-center gap-2 w-fit">
              <span>Instagram</span>
              <span className="text-[9px] text-brand-accent font-mono py-0.5 px-1.5 rounded-sm bg-brand-accent/10">@websitewalae</span>
            </a>
            <a href="https://www.linkedin.com/company/websitewalae" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-text hover:text-brand-accent transition-colors w-fit">LinkedIn</a>
            <a href="https://www.facebook.com/websitewalae" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-text hover:text-brand-accent transition-colors w-fit">Facebook</a>
            
            <div className="h-4" /> {/* Spacer */}
            
            <a href="tel:+917317782998" className="text-sm font-bold text-white hover:text-brand-accent transition-colors w-fit">+91 7317782998</a>
            <a href="mailto:websitewalae@gmail.com" className="text-sm font-bold text-white hover:text-brand-accent transition-colors w-fit">websitewalae@gmail.com</a>
          </div>

        </div>

      </div>

      {/* 3. BIG BRAND SIGNATURE (Full Width) */}
      <div className="w-full relative overflow-hidden pt-4 pb-2 md:pt-10 select-none pointer-events-none flex justify-center">
        <div 
          ref={wordmarkRef}
          className="text-[14vw] md:text-[15.5vw] font-black tracking-tighter leading-[0.8] text-white/[0.03] text-center whitespace-nowrap transition-colors duration-700"
          style={{ textShadow: "0 0 80px rgba(199,255,61,0.05)" }}
        >
          WEBSITE WALAE
        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[5vw] relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-brand-text-disabled font-mono border-t border-white/5 pt-6 pb-2">
        <p>© {new Date().getFullYear()} Website Walae. All rights reserved.</p>
        <div className="flex gap-4 sm:gap-6">
          <Link href="/privacy" className="hover:text-brand-accent transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-brand-accent transition-colors">Terms & Conditions</Link>
        </div>
      </div>

    </footer>
  );
}
