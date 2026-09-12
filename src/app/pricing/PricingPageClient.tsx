"use client";

import { motion } from "framer-motion";
import { ArrowRight, IndianRupee, Sparkles } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const PRICING_TIERS = [
  {
    category: "WEBSITE DEVELOPMENT",
    price: "Starting from ₹15,000",
    isCustom: false,
    features: ["Custom websites", "Responsive design", "CMS / integrations", "SEO-ready structure"],
  },
  {
    category: "SOCIAL MEDIA",
    price: "Starting from ₹15,000 / mo",
    isCustom: false,
    features: ["Content strategy", "Creative posts", "Reels", "Monthly management"],
  },
  {
    category: "VIDEO PRODUCTION",
    price: "Starting from ₹15,000",
    isCustom: false,
    features: ["Reels", "Product videos", "Commercial content"],
  },
  {
    category: "SEO",
    price: "Starting from ₹15,000 / mo",
    isCustom: false,
    features: ["Technical SEO", "On-page SEO", "Content strategy", "Search visibility"],
  },
  {
    category: "META ADS",
    price: "Starting from ₹15,000 / mo",
    isCustom: false,
    features: ["Campaign setup", "Creative testing", "Audience targeting", "Lead generation"],
  },
  {
    category: "UI / UX DESIGN",
    price: "Custom Quote",
    isCustom: true,
    features: ["Wireframing", "Prototyping", "Design Systems", "User Journeys"],
  },
  {
    category: "CONTENT CREATION",
    price: "Custom Quote",
    isCustom: true,
    features: ["Copywriting", "Brand Photography", "Creative Direction", "Ad Creatives"],
  },
];

export default function PricingPageClient() {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-brand-text pt-28 pb-16">
      <div className="noise-overlay" />
      
      {/* Header */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] pt-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center sm:text-left flex flex-col items-center sm:items-start"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-brand-accent uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4" />
            INVESTMENT
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter uppercase mb-6 leading-none">
            PRICING.
          </h1>
          <p className="text-xl sm:text-3xl text-brand-text-secondary max-w-3xl font-bold mt-4 uppercase tracking-wide">
            CHOOSE WHAT YOU NEED.<br />
            <span className="text-brand-accent">BUILD WHAT YOU WANT.</span>
          </p>
        </motion.div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group glass p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-brand-accent/50 transition-all duration-500 relative overflow-hidden flex flex-col h-full bg-[#0a0a0a]"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2">
                  {tier.category}
                </h3>
                
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-accent mb-8 flex items-end gap-1">
                  {!tier.isCustom && <span className="text-sm text-brand-text-secondary font-medium tracking-wide uppercase mb-1">From</span>}
                  {tier.price}
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-brand-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-brand-accent transition-colors" />
                      {feat}
                    </div>
                  ))}
                </div>

                <Link
                  href={`/start-a-project?service=${encodeURIComponent(tier.category)}`}
                  className="mt-10 flex items-center justify-between w-full py-4 border-t border-white/10 group-hover:border-brand-accent/30 transition-colors"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-brand-accent transition-colors">Select Plan</span>
                  <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Custom Project CTA */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-24 border-t border-white/10">
        <div className="glass p-10 sm:p-20 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-16 bg-gradient-to-r from-[#0a0a0a] to-[#111]">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight mb-4">
              CUSTOM PROJECT?
            </h2>
            <p className="text-brand-text-secondary text-lg sm:text-xl max-w-xl">
              Need a full-stack solution encompassing multiple services? Let's discuss a tailored package that fits your exact requirements.
            </p>
          </div>
          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-brand-accent text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(202,255,0,0.4)] shrink-0"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
