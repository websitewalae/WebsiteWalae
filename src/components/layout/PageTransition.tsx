"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="w-full relative">
        {/* Dark/Lime Signal Overlay Transition */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[110] bg-[#050505] origin-top flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
            className="w-full h-[2px] bg-brand-accent absolute top-1/2 left-0 -translate-y-1/2"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
