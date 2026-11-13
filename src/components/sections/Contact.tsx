"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { submitProjectQuery } from "@/app/start-a-project/actions";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const serviceSelect = form.elements.namedItem("service") as HTMLSelectElement | null;
    const budgetSelect = form.elements.namedItem("budget") as HTMLSelectElement | null;

    setIsSubmitting(true);
    setError(null);

    const result = await submitProjectQuery({
      name: get("name"),
      business: get("business"),
      email: get("email"),
      phone: get("phone"),
      services: serviceSelect?.selectedOptions[0]?.text ? [serviceSelect.selectedOptions[0].text] : [],
      budget: budgetSelect?.selectedOptions[0]?.text ?? "",
      timeline: "",
      details: get("message"),
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      form.reset();
    } else {
      setError("Something went wrong. Please call or WhatsApp us at +91 73177 82998.");
    }
  };

  return (
    <section id="contact" className="relative w-full bg-[#050505] py-16 sm:py-24 md:py-48 overflow-hidden z-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
        
        {/* Left Column */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-h2 text-brand-text mb-4 sm:mb-6">HAVE AN IDEA?<br/>LET&apos;S BUILD IT.</h2>
            <p className="text-brand-text-secondary text-base sm:text-lg md:text-xl max-w-md">
              Tell us what you&apos;re building. We&apos;ll figure out the rest.
            </p>
          </div>
          
          <div className="mt-8 lg:mt-0">
            <p className="text-[10px] sm:text-xs font-mono tracking-widest text-brand-text-muted mb-2 sm:mb-4">OR CALL US DIRECTLY</p>
            <a href="tel:+917317782998" className="text-2xl sm:text-3xl font-bold tracking-tighter hover:text-brand-accent transition-colors" data-cursor="link">
              7317782998
            </a>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:gap-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <input required name="name" aria-label="Your name" type="text" autoComplete="name" placeholder="Name" className="bg-[#0a0a0a] border border-brand-border rounded-xl px-4 sm:px-6 py-3.5 sm:py-4 outline-none focus:border-brand-accent transition-colors text-brand-text text-sm w-full" />
                  <input required name="business" aria-label="Business or brand name" type="text" autoComplete="organization" placeholder="Business / Brand" className="bg-[#0a0a0a] border border-brand-border rounded-xl px-4 sm:px-6 py-3.5 sm:py-4 outline-none focus:border-brand-accent transition-colors text-brand-text text-sm w-full" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <input required name="email" aria-label="Email address" type="email" autoComplete="email" placeholder="Email" className="bg-[#0a0a0a] border border-brand-border rounded-xl px-4 sm:px-6 py-3.5 sm:py-4 outline-none focus:border-brand-accent transition-colors text-brand-text text-sm w-full" />
                  <input required name="phone" aria-label="Phone number" type="tel" autoComplete="tel" placeholder="Phone" className="bg-[#0a0a0a] border border-brand-border rounded-xl px-4 sm:px-6 py-3.5 sm:py-4 outline-none focus:border-brand-accent transition-colors text-brand-text text-sm w-full" />
                </div>
                <select required name="service" aria-label="Service you need" defaultValue="" className="bg-[#0a0a0a] border border-brand-border rounded-xl px-4 sm:px-6 py-3.5 sm:py-4 outline-none focus:border-brand-accent transition-colors text-brand-text-muted text-sm w-full appearance-none">
                  <option value="" disabled>What do you need?</option>
                  <option value="website">Website Development</option>
                  <option value="design">UI/UX Design</option>
                  <option value="marketing">Social Media / Marketing</option>
                  <option value="content">Content Creation</option>
                  <option value="other">Multiple Services / Other</option>
                </select>
                <select required name="budget" aria-label="Budget" defaultValue="" className="bg-[#0a0a0a] border border-brand-border rounded-xl px-4 sm:px-6 py-3.5 sm:py-4 outline-none focus:border-brand-accent transition-colors text-brand-text-muted text-sm w-full appearance-none">
                  <option value="" disabled>Budget</option>
                  <option value="small">Under ₹25K</option>
                  <option value="medium">₹25K – ₹50K</option>
                  <option value="large">₹50K – ₹1L</option>
                  <option value="enterprise">₹1L+</option>
                </select>
                <textarea required name="message" aria-label="Message" placeholder="Message" rows={4} className="bg-[#0a0a0a] border border-brand-border rounded-xl px-4 sm:px-6 py-3.5 sm:py-4 outline-none focus:border-brand-accent transition-colors text-brand-text text-sm w-full resize-none" />
                
                {error && (
                  <p role="alert" className="text-sm text-red-400">{error}</p>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-2 self-start flex items-center justify-center gap-2 rounded-full px-6 py-4 sm:px-8 sm:py-5 bg-brand-surface border border-brand-border text-brand-text text-sm font-semibold transition-all hover:bg-[#1a1a1a] hover:border-brand-border-strong disabled:opacity-50 group"
                  data-cursor="button"
                >
                  {isSubmitting ? (
                    <span>SENDING...</span>
                  ) : (
                    <>
                      <span>LET&apos;S BUILD THIS</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center glass rounded-3xl p-12 border-brand-accent/30"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, delay: 0.2 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-brand-accent mb-6" />
                </motion.div>
                <h3 className="text-3xl font-bold mb-4">Request Received</h3>
                <p className="text-brand-text-secondary">We&apos;ll review your project details and get back to you within 24 hours.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
