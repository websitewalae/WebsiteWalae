"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function ContactPageClient() {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-brand-text flex flex-col justify-between pt-28">
      <div className="noise-overlay" />
      
      <main className="flex-1 flex flex-col items-center justify-center relative px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto w-full flex flex-col items-center gap-8"
        >
          <div className="text-xs font-mono text-brand-accent uppercase tracking-widest">
            WEBSITE WALAE
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter uppercase leading-none">
            Let's talk about <br />
            <span className="text-brand-text-secondary">your next project.</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
            <a
              href="tel:7317782998"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg sm:text-xl tracking-wider transition-all duration-300 hover:border-brand-accent hover:text-brand-accent group"
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>7317782998</span>
            </a>
            
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-accent text-black font-bold text-lg sm:text-xl tracking-wider transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(202,255,0,0.4)]"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
