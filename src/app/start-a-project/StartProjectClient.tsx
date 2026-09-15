"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { submitProjectQuery } from "./actions";

const SERVICES = [
  "Website Development",
  "UI / UX Design",
  "Social Media Marketing",
  "Content Creation",
  "Video Production",
  "SEO",
  "Meta Ads",
  "PR / Public Relations",
  "E-commerce",
  "Something Else"
];

const BUDGETS = [
  "Under ₹25K",
  "₹25K–₹50K",
  "₹50K–₹1L",
  "₹1L+",
  "Not Sure"
];

const TIMELINES = [
  "ASAP",
  "1–2 Weeks",
  "1 Month",
  "Flexible"
];

export default function StartProjectClient() {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    services: [] as string[],
    budget: "",
    details: "",
    timeline: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.business.trim()) newErrors.business = "Business / Brand is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (formData.services.length === 0) newErrors.services = "Please select at least one service";
    if (!formData.details.trim()) newErrors.details = "Project details are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to top of form if errors
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);
    
    try {
      const result = await submitProjectQuery(formData);
      
      if (result.success) {
        setIsSuccess(true);
      } else {
        setSubmitError(result.error || "Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Submission failed", error);
      setSubmitError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-brand-text pt-28 pb-16">
      <div className="noise-overlay" />
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter uppercase mb-6 leading-none">
            LET'S BUILD SOMETHING <br />
            <span className="text-brand-text-secondary">WORTH TALKING ABOUT.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-brand-text-secondary font-medium mt-4">
            Tell us what you're building. We'll figure out the rest.
          </p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-12 sm:p-20 rounded-3xl border border-brand-accent/30 text-center flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 rounded-full bg-brand-accent/10 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-brand-accent" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">Request Received</h2>
              <p className="text-lg text-brand-text-secondary max-w-lg">
                Thank you for reaching out. Our team will review your project details and get back to you shortly.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="glass p-6 sm:p-12 rounded-3xl border border-white/10 flex flex-col gap-10"
            >
              {submitError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{submitError}</p>
                </div>
              )}
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/50">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className={`w-full bg-black/40 border ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-brand-accent'} rounded-xl px-5 py-4 text-white outline-none transition-colors`}
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/50">Business / Brand *</label>
                  <input
                    type="text"
                    value={formData.business}
                    onChange={e => setFormData({...formData, business: e.target.value})}
                    className={`w-full bg-black/40 border ${errors.business ? 'border-red-500' : 'border-white/10 focus:border-brand-accent'} rounded-xl px-5 py-4 text-white outline-none transition-colors`}
                    placeholder="Company Name"
                  />
                  {errors.business && <span className="text-red-500 text-xs">{errors.business}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/50">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className={`w-full bg-black/40 border ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-brand-accent'} rounded-xl px-5 py-4 text-white outline-none transition-colors`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/50">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className={`w-full bg-black/40 border ${errors.phone ? 'border-red-500' : 'border-white/10 focus:border-brand-accent'} rounded-xl px-5 py-4 text-white outline-none transition-colors`}
                    placeholder="+91 00000 00000"
                  />
                  {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
                </div>
              </div>

              {/* Services Needed */}
              <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                <label className="text-xs font-mono uppercase tracking-widest text-white/50">What do you need? *</label>
                <div className="flex flex-wrap gap-3">
                  {SERVICES.map(service => {
                    const isSelected = formData.services.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`px-5 py-3 rounded-xl border text-sm transition-all duration-300 ${
                          isSelected 
                            ? 'bg-brand-accent border-brand-accent text-black font-semibold' 
                            : 'bg-black/20 border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
                {errors.services && <span className="text-red-500 text-xs">{errors.services}</span>}
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                <label className="text-xs font-mono uppercase tracking-widest text-white/50">Budget</label>
                <div className="flex flex-wrap gap-3">
                  {BUDGETS.map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({...formData, budget: b})}
                      className={`px-5 py-3 rounded-xl border text-sm transition-all duration-300 ${
                        formData.budget === b
                          ? 'bg-white border-white text-black font-semibold' 
                          : 'bg-black/20 border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                <label className="text-xs font-mono uppercase tracking-widest text-white/50">Timeline</label>
                <div className="flex flex-wrap gap-3">
                  {TIMELINES.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({...formData, timeline: t})}
                      className={`px-5 py-3 rounded-xl border text-sm transition-all duration-300 ${
                        formData.timeline === t
                          ? 'bg-white border-white text-black font-semibold' 
                          : 'bg-black/20 border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                <label className="text-xs font-mono uppercase tracking-widest text-white/50">Project Details *</label>
                <textarea
                  value={formData.details}
                  onChange={e => setFormData({...formData, details: e.target.value})}
                  className={`w-full bg-black/40 border ${errors.details ? 'border-red-500' : 'border-white/10 focus:border-brand-accent'} rounded-xl px-5 py-4 text-white outline-none transition-colors min-h-[150px] resize-y`}
                  placeholder="Tell us about your goals, current challenges, and what success looks like..."
                />
                {errors.details && <span className="text-red-500 text-xs">{errors.details}</span>}
              </div>

              {/* Submit */}
              <div className="pt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-brand-accent text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(202,255,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? "PROCESSING..." : "START THE CONVERSATION"}</span>
                  {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
}
