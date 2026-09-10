"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const projects = [
  { id: "01", name: "Accuved by Rekha", industry: "Health & Wellness", services: "Web Development", desc: "Ayurvedic wellness platform.", url: "https://accuvedbyrekha.com/" },
  { id: "02", name: "Briocred Pharma", industry: "Medical", services: "Corporate Website", desc: "Pharmaceutical corporate presence.", url: "https://briocredpharmaceuticals.com/" },
  { id: "03", name: "Buy Noorea", industry: "E-Commerce", services: "E-commerce Development", desc: "Online retail experience.", url: "https://buynoorea.com/" },
  { id: "04", name: "Tulip Eyewear", industry: "Fashion", services: "Web App", desc: "Premium eyewear shopping experience.", url: "https://tulip-eyewear.vercel.app/" },
  { id: "05", name: "Safed Rang", industry: "Fashion", services: "E-commerce", desc: "Clothing brand storefront.", url: "https://safedrang.com/" },
  { id: "06", name: "Haj Umrah Deals", industry: "Travel", services: "Web Portal", desc: "Pilgrimage travel booking platform.", url: "https://hajumrahdeals.com/" },
  { id: "07", name: "Skyscraper Builder", industry: "Real Estate", services: "Corporate Website", desc: "Construction & Development portfolio.", url: "https://skyscraperbuilderdeveloper.com/" },
  { id: "08", name: "Union Traders", industry: "Trading", services: "B2B Portal", desc: "B2B trading and commerce.", url: "https://uniontradersindia.com/" },
  { id: "09", name: "Shunyity Tech", industry: "Technology", services: "Agency Website", desc: "IT solutions and services.", url: "https://www.shunyitytechsolutions.com/" },
  { id: "10", name: "Preserve Comm.", industry: "PR & Media", services: "Corporate Website", desc: "Communications and PR agency.", url: "https://preservecommunication.com/" },
  { id: "11", name: "Kitchen Sweets", industry: "Food & Beverage", services: "Web App", desc: "Online sweets & bakery store.", url: "https://kitchen-sweets.vercel.app/" },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = containerRef.current.children;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${containerRef.current?.scrollWidth}`,
        scrub: 1,
        pin: true,
      },
    });

    tl.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: "none",
    });

  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col">
      <div className="absolute top-[10%] left-6 lg:left-[5vw] z-20">
        <h2 className="text-h2 text-brand-text mb-4">WORK THAT SPEAKS <br /> BEFORE WE DO.</h2>
      </div>

      <div className="flex-1 flex items-center h-full mt-[10%] pl-6 lg:pl-[5vw]">
        <div ref={containerRef} className="flex gap-8 lg:gap-16 items-center h-[60vh]">
          {projects.map((project, i) => (
            <a 
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer" 
              className="relative w-[80vw] max-w-4xl h-full shrink-0 group rounded-3xl overflow-hidden cursor-pointer block"
              data-cursor="project"
            >
              <div className="absolute inset-0 bg-[#0a0a0a] transition-transform duration-700 group-hover:scale-105">
                {/* Live Website Screenshot Background */}
                <div className="w-full h-full bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10 absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-60" />
                <div 
                  className="w-full h-full opacity-40 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700 bg-cover bg-top" 
                  style={{ 
                    backgroundImage: `url(https://s0.wordpress.com/mshots/v1/${encodeURIComponent(project.url)}?w=1200)` 
                  }} 
                />
              </div>
              
              <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="text-brand-text-muted font-mono">{project.id}</div>
                  <div className="glass px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest">
                    {project.industry}
                  </div>
                </div>

                <div>
                  <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 transform transition-transform duration-500 group-hover:translate-x-4">
                    {project.name}
                  </h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 text-brand-text-secondary transform transition-transform duration-500 delay-75 group-hover:translate-x-4">
                    <span className="text-sm font-mono">{project.services}</span>
                    <span className="hidden md:block w-8 h-px bg-brand-border" />
                    <span className="text-sm">{project.desc}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
          {/* Spacer at the end for scrolling */}
          <div className="w-[10vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}
