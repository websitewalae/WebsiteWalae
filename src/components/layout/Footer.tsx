import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-brand-border py-12 lg:py-24 relative z-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[5vw] flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col items-start text-left gap-4 max-w-sm">
          <Link href="/" className="inline-block">
            <img src="/logo.png" alt="Website Walae" className="h-12 sm:h-14 w-auto object-contain object-left mb-2 transition-transform hover:scale-105" />
          </Link>
          <div className="text-brand-text-secondary text-sm font-semibold tracking-widest uppercase">Digital Creative Agency</div>
          <p className="text-brand-text-muted text-sm mt-2">
            We combine design, technology, content and marketing to help brands build a stronger digital presence.
          </p>
        </div>
        
        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-brand-text-muted tracking-widest uppercase mb-1">Navigation</span>
            <Link href="/" className="text-sm font-medium text-brand-text-secondary hover:text-brand-accent transition-colors">Home</Link>
            <Link href="/work" className="text-sm font-medium text-brand-text-secondary hover:text-brand-accent transition-colors">Work</Link>
            <Link href="/services" className="text-sm font-medium text-brand-text-secondary hover:text-brand-accent transition-colors">Services</Link>
            <Link href="/about" className="text-sm font-medium text-brand-text-secondary hover:text-brand-accent transition-colors">About</Link>
            <Link href="/pricing" className="text-sm font-medium text-brand-text-secondary hover:text-brand-accent transition-colors">Pricing</Link>
            <Link href="/contact" className="text-sm font-medium text-brand-text-secondary hover:text-brand-accent transition-colors">Contact</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-brand-text-muted tracking-widest uppercase mb-1">Social</span>
            <a href="https://instagram.com/websitewalae" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-text-secondary hover:text-brand-accent transition-colors">Instagram</a>
            <a href="https://linkedin.com/company/websitewalae" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-text-secondary hover:text-brand-accent transition-colors">LinkedIn</a>
            <a href="https://facebook.com/websitewalae" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-text-secondary hover:text-brand-accent transition-colors">Facebook</a>
            <a href="tel:7317782998" className="text-sm font-medium text-brand-text-secondary hover:text-brand-accent transition-colors">+91 7317782998</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[5vw] mt-16 pt-8 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-text-disabled">
        <p>© {new Date().getFullYear()} Website Walae. All rights reserved.</p>
        <div className="flex gap-6 font-mono text-xs">
          <Link href="/privacy" className="text-brand-text-muted hover:text-brand-accent transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-brand-text-muted hover:text-brand-accent transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
