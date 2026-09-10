"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";

export default function Navigation() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  if (pathname.startsWith('/admin')) return null;

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-[100] transition-all duration-500"
      initial={{ backgroundColor: "rgba(5, 5, 5, 0)", borderBottom: "1px solid rgba(255, 255, 255, 0)", backdropFilter: "blur(0px)" }}
      animate={{
        backgroundColor: isScrolled ? "rgba(5, 5, 5, 0.72)" : "rgba(5, 5, 5, 0)",
        borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(255, 255, 255, 0)",
        backdropFilter: isScrolled ? "blur(18px)" : "blur(0px)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[5vw] h-[72px] lg:h-[84px] flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter" data-cursor="link">
          WEBSITE WALAE
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/#work" className="hover:text-brand-accent transition-colors" data-cursor="link">Work</Link>
          <Link href="/#services" className="hover:text-brand-accent transition-colors" data-cursor="link">Services</Link>
          <Link href="/about" className="hover:text-brand-accent transition-colors" data-cursor="link">About</Link>
          <Link href="/#contact" className="hover:text-brand-accent transition-colors" data-cursor="link">Contact</Link>
        </nav>

        <MagneticButton>Start a Project</MagneticButton>
      </div>
    </motion.header>
  );
}
