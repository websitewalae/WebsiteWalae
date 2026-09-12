"use client";

import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const STORY_STEPS = [
  { id: "01", title: "IDEA", desc: "Every great digital presence starts with a clear, strategic vision tailored to your goals." },
  { id: "02", title: "DESIGN", desc: "We craft premium, aesthetic interfaces that captivate and communicate your brand's essence." },
  { id: "03", title: "BUILD", desc: "Using modern technology, we engineer robust, fast, and scalable digital solutions." },
  { id: "04", title: "LAUNCH", desc: "Seamless deployment ensuring everything runs perfectly across all devices and platforms." },
  { id: "05", title: "GROW", desc: "Continuous optimization, SEO, and marketing to expand your reach and drive real results." },
];

export default function AboutPageClient() {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-brand-text pt-28 pb-16">
      <div className="noise-overlay" />
      
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] pt-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 text-xs font-mono text-brand-accent uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4" />
            ABOUT US
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter uppercase mb-6 leading-none">
            WEBSITE WALAE <br />
            <span className="text-brand-text-secondary">DIGITAL CREATIVE STUDIO.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-brand-text-secondary max-w-3xl font-medium mt-12 leading-relaxed">
            We are a collective of digital craftsmen. We don't just build websites; we build digital ecosystems.
          </p>
        </motion.div>
      </section>

      {/* Core Positioning Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-24 border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight mb-8">
            The Perfect Combination
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-lg sm:text-3xl font-extrabold text-brand-text-secondary uppercase">
            <motion.span whileHover={{ scale: 1.1, color: "#fff" }} className="transition-colors cursor-default">CREATIVE</motion.span>
            <span className="text-brand-accent">+</span>
            <motion.span whileHover={{ scale: 1.1, color: "#fff" }} className="transition-colors cursor-default">DESIGN</motion.span>
            <span className="text-brand-accent">+</span>
            <motion.span whileHover={{ scale: 1.1, color: "#fff" }} className="transition-colors cursor-default">TECHNOLOGY</motion.span>
            <span className="text-brand-accent">+</span>
            <motion.span whileHover={{ scale: 1.1, color: "#fff" }} className="transition-colors cursor-default">CONTENT</motion.span>
            <span className="text-brand-accent">+</span>
            <motion.span whileHover={{ scale: 1.1, color: "#fff" }} className="transition-colors cursor-default">DIGITAL MARKETING</motion.span>
          </div>
        </motion.div>
      </section>

      {/* Interactive Story Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-24 border-t border-white/10">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-brand-accent tracking-widest uppercase mb-4">Our Process</h2>
          <h3 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight">How we create value</h3>
        </div>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[27px] top-[40px] bottom-[40px] w-[2px] bg-white/10 hidden sm:block" />

          <div className="flex flex-col gap-12 sm:gap-24">
            {STORY_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col sm:flex-row items-start gap-6 sm:gap-16 group"
              >
                {/* Number Circle */}
                <div className="w-14 h-14 rounded-full bg-[#111] border border-white/20 flex items-center justify-center text-xl font-bold text-brand-accent shrink-0 relative z-10 group-hover:bg-brand-accent group-hover:text-black group-hover:scale-110 transition-all duration-500 shadow-[0_0_0_rgba(202,255,0,0)] group-hover:shadow-[0_0_20px_rgba(202,255,0,0.3)]">
                  {step.id}
                </div>
                
                {/* Content */}
                <div className="pt-2 sm:pt-3">
                  <h4 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight mb-4 group-hover:text-brand-accent transition-colors duration-500">
                    {step.title}
                  </h4>
                  <p className="text-brand-text-secondary sm:text-xl leading-relaxed max-w-2xl">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-24">
        <div className="glass p-10 sm:p-16 rounded-3xl border border-white/10 text-center flex flex-col items-center gap-8 bg-gradient-to-t from-brand-accent/[0.02] to-transparent">
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">Ready to start?</h2>
          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(202,255,0,0.4)]"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
