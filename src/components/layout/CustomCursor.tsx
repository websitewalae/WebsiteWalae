"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorType, setCursorType] = useState<"default" | "button" | "image" | "project" | "link">("default");
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices / mobile
    if (window.innerWidth < 768 || "ontouchstart" in window) {
      return;
    }
    
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Bubble up to find interactive elements
      const interactiveEl = target.closest("button, a, [data-cursor]");
      
      if (interactiveEl) {
        const type = interactiveEl.getAttribute("data-cursor") || 
                    (interactiveEl.tagName === "BUTTON" ? "button" : "link");
        
        setCursorType(type as any);
        
        if (type === "image") setCursorText("VIEW →");
        else if (type === "project") setCursorText("OPEN →");
        else if (type === "link") setCursorText("→");
        else setCursorText("");
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const variants = {
    default: {
      width: 8,
      height: 8,
      backgroundColor: "#C7FF3D", // Accent color
      mixBlendMode: "normal" as any,
    },
    button: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(199, 255, 61, 0.15)", // Translucent accent
      mixBlendMode: "normal" as any,
    },
    image: {
      width: 80,
      height: 80,
      backgroundColor: "#C7FF3D",
      mixBlendMode: "normal" as any,
    },
    project: {
      width: 80,
      height: 80,
      backgroundColor: "#C7FF3D",
      mixBlendMode: "normal" as any,
    },
    link: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      mixBlendMode: "difference" as any,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[9999] text-brand-bg font-bold tracking-tight"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      variants={variants}
      animate={cursorType}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {(cursorType === "image" || cursorType === "project" || cursorType === "link") && (
        <span className="text-[10px] whitespace-nowrap px-2">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}
