"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function MagneticButton({
  children,
  className,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 14, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 160, damping: 14, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={cn(
        "group relative flex items-center justify-center gap-2 rounded-full px-6 py-4 lg:px-7 lg:py-5",
        "bg-brand-surface border border-brand-border text-brand-text font-semibold text-sm",
        "transition-colors duration-200 hover:bg-[#1a1a1a] hover:border-brand-border-strong",
        className
      )}
      data-cursor="button"
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-accent relative z-10" />

      {/* Subtle Glow on hover */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-brand-accent blur-xl pointer-events-none" />
    </motion.button>
  );
}
