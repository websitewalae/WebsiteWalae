"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Articles", href: "/articles" },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/nomo")) return null;

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-[100] transition-all duration-300 pointer-events-auto"
      initial={{ y: 0 }}
      animate={{
        y: 0,
        backgroundColor: isScrolled ? "rgba(5, 5, 5, 0.85)" : "rgba(5, 5, 5, 0.2)",
        borderBottom: isScrolled
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "1px solid rgba(255, 255, 255, 0.03)",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(4px)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] h-[64px] lg:h-[76px] flex items-center justify-between">
        {/* LEFT: Website Walae Logo */}
        <Link href="/" className="flex items-center gap-2 group" data-cursor="link">
          <img
            src="/logo.png"
            alt="Website Walae Logo"
            className="h-[28px] sm:h-[34px] md:h-[38px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* CENTER: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative py-1 text-brand-text-secondary hover:text-white transition-colors duration-200 group flex flex-col items-center"
                data-cursor="link"
              >
                <span className={`transition-transform duration-200 group-hover:-translate-y-[1px] ${isActive ? "text-white font-semibold" : ""}`}>
                  {item.name}
                </span>

                {/* Tiny lime indicator / hover line */}
                <motion.span
                  className="absolute bottom-0 h-[2px] bg-brand-accent rounded-full"
                  initial={false}
                  animate={{
                    width: isActive ? "100%" : "0%",
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <span className="absolute bottom-0 w-0 h-[2px] bg-brand-accent rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: Start a Project Button (Desktop) & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/start-a-project"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-accent text-black font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(202,255,0,0.4)] hover:scale-105"
            data-cursor="button"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:text-brand-accent transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 flex flex-col gap-5 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-semibold flex items-center justify-between py-2 border-b border-white/5 ${
                      isActive ? "text-brand-accent" : "text-white/80 hover:text-white"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
            </div>

            <Link
              href="/start-a-project"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-accent text-black font-bold text-sm tracking-wide mt-2"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
