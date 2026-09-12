"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "button" | "image" | "project" | "link">("default");
  const [cursorText, setCursorText] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);
  const lastTypeRef = useRef<string>("default");

  useEffect(() => {
    // Disable on touch devices or small screens
    if (typeof window === "undefined" || window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // When over form inputs or text areas, hide custom cursor for native responsiveness
      if (target.closest("input, textarea, select, option, label, [contenteditable]")) {
        setIsHidden(true);
        return;
      } else {
        setIsHidden(false);
      }

      // Check for interactive targets
      const interactiveEl = target.closest("button, a, [data-cursor]");
      if (interactiveEl) {
        const type = (interactiveEl.getAttribute("data-cursor") ||
          (interactiveEl.tagName === "BUTTON" ? "button" : "link")) as any;

        if (lastTypeRef.current !== type) {
          lastTypeRef.current = type;
          setCursorType(type);

          if (type === "image") setCursorText("VIEW");
          else if (type === "project") setCursorText("OPEN");
          else if (type === "link") setCursorText("");
          else setCursorText("");
        }
      } else {
        if (lastTypeRef.current !== "default") {
          lastTypeRef.current = "default";
          setCursorType("default");
          setCursorText("");
        }
      }
    };

    // Smooth RAF lerp for 60fps hardware-accelerated movement without React re-renders
    const updateCursor = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.28;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.28;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    animFrameId.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (isHidden) return null;

  // Visual sizes and styles based on type
  const isExpanded = cursorType === "button" || cursorType === "image" || cursorType === "project" || cursorType === "link";

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full transition-all duration-200 ease-out will-change-transform ${
        cursorType === "default"
          ? "w-2.5 h-2.5 bg-brand-accent shadow-[0_0_8px_rgba(199,255,61,0.6)]"
          : cursorType === "button"
          ? "w-12 h-12 bg-brand-accent/15 border border-brand-accent/40 backdrop-blur-[1px]"
          : cursorType === "project" || cursorType === "image"
          ? "w-20 h-20 bg-brand-accent text-black font-bold text-[10px] tracking-tight shadow-[0_0_25px_rgba(199,255,61,0.5)]"
          : "w-8 h-8 bg-white/15 border border-white/30 text-white font-bold text-xs"
      }`}
      style={{
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
      }}
    >
      {isExpanded && (cursorText || cursorType === "link") && (
        <span className="whitespace-nowrap select-none px-1 font-mono inline-flex items-center gap-0.5">
          {cursorText && <span>{cursorText}</span>}
          <ArrowUpRight className="w-3 h-3 inline" />
        </span>
      )}
    </div>
  );
}
