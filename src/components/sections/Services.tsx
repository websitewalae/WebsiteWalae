"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { id: "01", name: "Website Development", image: "A website assembles itself." },
  { id: "02", name: "UI/UX Design", image: "A design canvas appears." },
  { id: "03", name: "Social Media Marketing", image: "Social feed scrolls." },
  { id: "04", name: "Content Creation", image: "A camera appears." },
  { id: "05", name: "Video Production", image: "A timeline appears." },
  { id: "06", name: "SEO", image: "Search results animate." },
  { id: "07", name: "Meta Ads", image: "Ad creative expands." },
  { id: "08", name: "E-commerce", image: "Product cards assemble." },
  { id: "09", name: "Lead Generation", image: "Growth chart rises." },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative w-full bg-[#0a0a0a] py-24 md:py-48 z-20 border-t border-brand-border">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[5vw]">
        <h2 className="text-h2 mb-16 md:mb-24 text-brand-text">WHAT WE DO.</h2>

        <div className="relative border-t border-brand-border" onMouseLeave={() => setHoveredIndex(null)}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative border-b border-brand-border py-6 md:py-10 flex items-center justify-between cursor-pointer overflow-hidden transition-colors hover:bg-brand-surface"
              onMouseEnter={() => setHoveredIndex(index)}
              data-cursor="image"
            >
              {/* Overlay for inactive items */}
              <div 
                className={`absolute inset-0 bg-[#0a0a0a]/50 transition-opacity duration-300 pointer-events-none ${
                  hoveredIndex !== null && hoveredIndex !== index ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="flex gap-3 sm:gap-6 md:gap-12 items-center relative z-10 transition-transform duration-500 group-hover:translate-x-4">
                <span className="text-xs sm:text-sm md:text-lg font-mono text-brand-text-muted transition-colors group-hover:text-brand-accent">
                  {service.id}
                </span>
                <span className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-brand-text group-hover:text-white">
                  {service.name}
                </span>
              </div>
            </div>
          ))}

          {/* Floating Visual Reaction (Desktop Only) */}
          <div className="absolute top-0 right-[5vw] w-[400px] h-[500px] pointer-events-none hidden lg:block perspective-[1000px] z-0">
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-full h-full glass rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-floating border-brand-border-strong bg-[#1a1a1a]/80">
                     <div className="w-24 h-24 rounded-full border border-brand-border bg-brand-surface mb-6 flex items-center justify-center">
                        <div className="w-8 h-8 bg-brand-accent animate-pulse" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                     </div>
                     <p className="text-lg font-semibold text-brand-text">
                       {services[hoveredIndex].image}
                     </p>
                     <p className="text-xs text-brand-text-muted mt-2">Interactive visual placeholder</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
