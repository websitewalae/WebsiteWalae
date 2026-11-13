"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, MapPin, Mail, Clock, MessageCircle } from "lucide-react";
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
            Let&apos;s talk about <br />
            <span className="text-brand-text-secondary">your next project.</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
            <a
              href="tel:+917317782998"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg sm:text-xl tracking-wider transition-all duration-300 hover:border-brand-accent hover:text-brand-accent group"
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>+91 73177 82998</span>
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

        <section
          aria-labelledby="contact-details"
          className="w-full max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
        >
          <h2 id="contact-details" className="md:col-span-2 text-2xl sm:text-3xl font-bold text-white mb-2">
            Visit or reach Website Walae in Lucknow
          </h2>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Website+Walae+Halwasiya+Market+Hazratganj+Lucknow"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-accent/50 transition-colors"
          >
            <MapPin className="w-6 h-6 text-brand-accent shrink-0" aria-hidden="true" />
            <div>
              <div className="font-bold text-white">Office</div>
              <address className="not-italic text-brand-text-secondary">
                Halwasiya Market, Hazratganj,<br />Lucknow, Uttar Pradesh 226001
              </address>
              <span className="text-sm text-brand-accent">Get directions</span>
            </div>
          </a>
          <div className="flex gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <Clock className="w-6 h-6 text-brand-accent shrink-0" aria-hidden="true" />
            <div>
              <div className="font-bold text-white">Working hours</div>
              <p className="text-brand-text-secondary">Monday to Saturday, 10:00 AM – 7:00 PM</p>
              <p className="text-sm text-brand-text-muted">Sunday closed. Message us on WhatsApp anytime.</p>
            </div>
          </div>
          <a
            href="https://wa.me/917317782998?text=Hi%20Website%20Walae%2C%20I%27d%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-accent/50 transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-brand-accent shrink-0" aria-hidden="true" />
            <div>
              <div className="font-bold text-white">WhatsApp</div>
              <p className="text-brand-text-secondary">+91 73177 82998</p>
              <span className="text-sm text-brand-accent">Chat now</span>
            </div>
          </a>
          <a
            href="mailto:support@websitewalae.com"
            className="flex gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-accent/50 transition-colors"
          >
            <Mail className="w-6 h-6 text-brand-accent shrink-0" aria-hidden="true" />
            <div>
              <div className="font-bold text-white">Email</div>
              <p className="text-brand-text-secondary">support@websitewalae.com</p>
              <span className="text-sm text-brand-accent">We reply within one working day</span>
            </div>
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
