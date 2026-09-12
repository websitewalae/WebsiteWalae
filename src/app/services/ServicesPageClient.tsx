"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const SERVICES = [
  { id: "01", name: "Website Development", desc: "Custom-coded, high-performance web applications built for speed, scalability, and conversion.", deliverables: ["Custom Next.js/React", "CMS Integration", "E-commerce", "Performance Optimization"] },
  { id: "02", name: "UI / UX Design", desc: "Intuitive, premium digital interfaces designed to captivate users and elevate brand perception.", deliverables: ["Wireframing", "Prototyping", "Design Systems", "User Testing"] },
  { id: "03", name: "Social Media Marketing", desc: "Strategic content distribution and community management that turns attention into engagement.", deliverables: ["Content Strategy", "Grid Planning", "Community Management", "Growth Tactics"] },
  { id: "04", name: "Content Creation", desc: "High-end visual and written content that perfectly communicates your brand's unique value.", deliverables: ["Copywriting", "Graphic Design", "Brand Photography", "Creative Direction"] },
  { id: "05", name: "Video Production", desc: "Cinematic commercial and short-form video content engineered for modern algorithmic reach.", deliverables: ["Reels & Shorts", "Commercials", "Product Videos", "Post-Production"] },
  { id: "06", name: "SEO", desc: "Data-driven organic search strategies to dominate SERPs and capture high-intent traffic.", deliverables: ["Technical SEO", "On-Page Optimization", "Keyword Strategy", "Link Building"] },
  { id: "07", name: "Meta Ads", desc: "Precision-targeted paid advertising campaigns designed for maximum ROI and lead generation.", deliverables: ["Campaign Setup", "A/B Testing", "Audience Targeting", "Conversion Tracking"] },
];

export default function ServicesPageClient() {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-brand-text pt-28 pb-16">
      <div className="noise-overlay" />
      
      {/* Header */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 text-xs font-mono text-brand-accent uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4" />
            OUR SERVICES
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter uppercase mb-6 leading-none">
            WHAT WE DO <br />
            <span className="text-brand-text-secondary">BEST.</span>
          </h1>
          <p className="text-lg sm:text-2xl text-brand-text-secondary max-w-2xl font-medium mt-8 leading-relaxed">
            A comprehensive ecosystem of digital services engineered to build, scale, and accelerate your business.
          </p>
        </motion.div>
      </section>

      {/* Services List */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] pb-24">
        <div className="flex flex-col border-t border-white/10">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group border-b border-white/10 py-12 sm:py-16 relative overflow-hidden"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-brand-accent/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-16">
                <div className="flex items-start gap-6 sm:gap-12 w-full lg:w-1/2">
                  <span className="text-sm sm:text-lg font-mono text-brand-accent pt-2 sm:pt-4 shrink-0">
                    {service.id}
                  </span>
                  <div>
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4 group-hover:text-brand-accent transition-colors duration-500">
                      {service.name}
                    </h2>
                    <p className="text-brand-text-secondary sm:text-xl leading-relaxed max-w-lg">
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div className="w-full lg:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-8 lg:gap-16 pl-14 sm:pl-20 lg:pl-0">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">Deliverables</span>
                    {service.deliverables.map((del, idx) => (
                      <span key={idx} className="text-sm sm:text-base font-medium text-white/80 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-brand-accent" />
                        {del}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    href={`/start-a-project?service=${encodeURIComponent(service.name)}`}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-black transition-all duration-500 shrink-0 mt-4 sm:mt-0"
                  >
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-24 border-t border-white/10">
        <div className="glass p-10 sm:p-16 rounded-3xl border border-white/10 text-center flex flex-col items-center gap-8 bg-gradient-to-t from-brand-accent/[0.02] to-transparent">
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">Need a custom stack?</h2>
          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(202,255,0,0.4)]"
          >
            <span>Discuss your project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
