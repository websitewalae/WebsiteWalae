"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { PricingPackage } from "@/lib/packages";

export default function PricingPageClient({ initialPackages }: { initialPackages: PricingPackage[] }) {
  // AEO FAQ for the pricing page
  const pricingFaq = [
    {
      question: "How much does website development cost?",
      answer: "Custom website development at Website Walae starts from ₹15,000 for standard websites. E-commerce platforms and complex web applications require a custom quote based on features and integrations."
    },
    {
      question: "Do you offer monthly retainers for SEO and Social Media?",
      answer: "Yes, we offer ongoing monthly retainer packages for SEO, Social Media Management, and Meta Ads starting from ₹15,000 per month."
    },
    {
      question: "Are there any hidden costs in your pricing?",
      answer: "No, our pricing is completely transparent. For custom projects, you will receive a detailed proposal outlining all costs before we begin any work."
    }
  ];

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
          {initialPackages.map((tier, i) => {
            const descriptionParts = (tier.description || "").split("---");
            const mainDescription = descriptionParts[0].trim();
            const breakdownText = descriptionParts.length > 1 ? descriptionParts[1].trim() : null;

            return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className={`group p-8 sm:p-10 rounded-3xl border transition-all duration-500 relative overflow-hidden flex flex-col h-full bg-[#0a0a0a] ${tier.popular ? 'border-brand-accent shadow-[0_0_30px_rgba(199,255,61,0.1)]' : 'border-white/10 hover:border-brand-accent/50'}`}
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-brand-accent text-black text-[10px] font-bold font-mono px-4 py-1.5 rounded-bl-xl uppercase tracking-widest">
                  POPULAR
                </div>
              )}

              <div className="relative z-10 flex-1 flex flex-col mt-2">
                <div className="text-xs font-mono text-brand-text-muted mb-2">{tier.category}</div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2">
                  {tier.name}
                </h3>
                
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-accent mb-4 flex flex-col gap-1">
                  <div className="flex items-end gap-1">
                    {tier.pricing_label && tier.pricing_label !== 'Custom Quote' && (
                      <span className="text-sm text-brand-text-secondary font-medium tracking-wide uppercase mb-1">{tier.pricing_label}</span>
                    )}
                    {tier.price}
                  </div>
                  
                  {breakdownText && (
                    <div className="flex flex-col gap-1 mt-3 mb-1 bg-black/40 p-4 rounded-xl border border-white/5">
                      {breakdownText.split('\n').map((line, idx) => {
                        const [label, val] = line.split(':');
                        if (!val) return <div key={idx} className="text-sm text-white/80 font-medium tracking-wide">{line}</div>;
                        return (
                          <div key={idx} className="flex justify-between items-center text-sm py-0.5">
                            <span className="text-white/80 font-medium">{label.trim()}</span>
                            <span className="text-brand-accent font-bold">{val.trim()}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <p className="text-sm text-white/50 mb-8 flex-1">
                  {mainDescription}
                </p>

                <div className="flex flex-col gap-3">
                  {tier.features?.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-brand-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-brand-accent transition-colors" />
                      {feat}
                    </div>
                  ))}
                </div>

                <Link
                  href={tier.cta_link || `/start-a-project?service=${encodeURIComponent(tier.name)}`}
                  className={`mt-10 flex items-center justify-between w-full py-4 border-t transition-colors ${tier.popular ? 'border-brand-accent/30' : 'border-white/10 group-hover:border-brand-accent/30'}`}
                >
                  <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${tier.popular ? 'text-brand-accent' : 'text-white group-hover:text-brand-accent'}`}>
                    {tier.cta_text || 'Select Plan'}
                  </span>
                  <ArrowRight className={`w-4 h-4 transition-all ${tier.popular ? 'text-brand-accent translate-x-1' : 'text-white/50 group-hover:text-brand-accent group-hover:translate-x-1'}`} />
                </Link>
              </div>
            </motion.div>
          )})}
        </div>
      </section>

      {/* AEO FAQ Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-16">
        <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight mb-8">Pricing FAQ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pricingFaq.map((faq, i) => (
            <div key={i} className="glass p-6 sm:p-8 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <span>{faq.question}</span>
              </h3>
              <p className="text-brand-text-secondary leading-relaxed ml-8">{faq.answer}</p>
            </div>
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
