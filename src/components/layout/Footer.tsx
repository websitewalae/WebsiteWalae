export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-brand-border py-12 lg:py-24 relative z-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[5vw] flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col items-start text-left gap-4 max-w-sm">
          <img src="/logo.png" alt="Website Walae" className="h-14 sm:h-16 w-auto object-contain object-left mb-2" />
          <div className="text-brand-text-secondary text-sm font-semibold tracking-widest uppercase">Digital Creative Agency</div>
          <p className="text-brand-text-muted text-sm mt-4">
            We combine design, technology, content and marketing to help brands build a stronger digital presence.
          </p>
        </div>
        
        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-brand-text-muted tracking-widest uppercase">Navigation</span>
            <a href="/" className="text-sm font-medium hover:text-brand-accent transition-colors">Home</a>
            <a href="/services" className="text-sm font-medium hover:text-brand-accent transition-colors">Services</a>
            <a href="/work" className="text-sm font-medium hover:text-brand-accent transition-colors">Work</a>
            <a href="/about" className="text-sm font-medium hover:text-brand-accent transition-colors">About</a>
            <a href="/contact" className="text-sm font-medium hover:text-brand-accent transition-colors">Contact</a>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-brand-text-muted tracking-widest uppercase">Social</span>
            <a href="#" className="text-sm font-medium hover:text-brand-accent transition-colors">Instagram</a>
            <a href="#" className="text-sm font-medium hover:text-brand-accent transition-colors">LinkedIn</a>
            <a href="#" className="text-sm font-medium hover:text-brand-accent transition-colors">Twitter (X)</a>
            <a href="#" className="text-sm font-medium hover:text-brand-accent transition-colors">YouTube</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[5vw] mt-24 pt-8 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-text-disabled">
        <p>© {new Date().getFullYear()} Website Walae. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-brand-text-muted">Privacy Policy</a>
          <a href="#" className="hover:text-brand-text-muted">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
