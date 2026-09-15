import Link from "next/link";
import { ArrowRight, Home, Layout, Search, Sparkles } from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-brand-text pt-28 pb-16 flex flex-col">
      <div className="noise-overlay" />
      
      <div className="flex-grow max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] flex flex-col items-center justify-center text-center relative z-10 w-full min-h-[60vh]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="text-[150px] sm:text-[200px] font-black uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent">
          404
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-8 mb-6">
          <span className="text-brand-accent">PAGE NOT FOUND</span>
        </h1>
        
        <p className="text-base sm:text-lg text-brand-text-secondary max-w-lg mb-12">
          The page you are looking for has been moved, deleted, or possibly never existed. Let's get you back on track.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
          <Link
            href="/"
            className="glass p-6 rounded-2xl border border-white/10 flex flex-col items-center gap-3 hover:border-brand-accent/50 hover:bg-white/5 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Home className="w-5 h-5 text-brand-accent" />
            </div>
            <span className="font-bold text-white text-sm uppercase">Homepage</span>
          </Link>
          
          <Link
            href="/services"
            className="glass p-6 rounded-2xl border border-white/10 flex flex-col items-center gap-3 hover:border-brand-accent/50 hover:bg-white/5 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layout className="w-5 h-5 text-brand-accent" />
            </div>
            <span className="font-bold text-white text-sm uppercase">Our Services</span>
          </Link>
          
          <Link
            href="/contact"
            className="glass p-6 rounded-2xl border border-white/10 flex flex-col items-center gap-3 hover:border-brand-accent/50 hover:bg-white/5 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Search className="w-5 h-5 text-brand-accent" />
            </div>
            <span className="font-bold text-white text-sm uppercase">Contact Us</span>
          </Link>
        </div>
        
        <Link
          href="/start-a-project"
          className="mt-12 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-accent text-black font-bold text-sm tracking-wide transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(202,255,0,0.5)] hover:scale-105"
        >
          <span>START A PROJECT</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <Footer />
    </div>
  );
}
