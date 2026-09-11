"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function DevelopmentScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const codeLinesRef = useRef<HTMLDivElement>(null);
  const buildStatusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !editorRef.current || !codeLinesRef.current || !buildStatusRef.current || !textRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const codeLines = codeLinesRef.current.children;
    const buildStatuses = buildStatusRef.current.children;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "+=110%",
        scrub: 0.3,
      },
    });

    // 0% - Viewport entry: text & editor rotate in immediately
    tl.fromTo(textRef.current, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.4 });
    tl.fromTo(editorRef.current, 
      { opacity: 0, rotateY: 20, scale: 0.88, x: 50 }, 
      { opacity: 1, rotateY: 0, scale: 1, x: 0, duration: 0.6, ease: "power2.out" },
      "<"
    );

    // 20% - Rapid code typing lines
    tl.fromTo(codeLines, 
      { opacity: 0, x: -15 }, 
      { opacity: 1, x: 0, stagger: 0.06, duration: 0.8 }
    );

    // 45% - Terminal status checklist lights up
    tl.fromTo(buildStatuses,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, color: "#C7FF3D" }
    );

    // 75% - Morph exit into Marketing Engine
    tl.to([editorRef.current, textRef.current], {
      opacity: 0,
      scale: 0.94,
      y: -40,
      duration: 0.5,
      ease: "power2.in"
    }, "+=0.2");

  }, []);

  const codeSnippet = [
    `import { Hero } from "@/components/Hero";`,
    `import { Services } from "@/components/Services";`,
    `import { Portfolio } from "@/components/Portfolio";`,
    ``,
    `export default function Page() {`,
    `  return (`,
    `    <main className="flex flex-col bg-brand-bg">`,
    `      <Hero />`,
    `      <Services />`,
    `      <Portfolio />`,
    `    </main>`,
    `  );`,
    `}`
  ];

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#0a0a0a]">
      <div ref={textRef} className="absolute top-[10%] text-center px-6 z-20">
        <h2 className="text-h2 mb-4">DESIGN IS ONLY <br /> THE BEGINNING.</h2>
      </div>

      <div className="flex w-full max-w-6xl mt-[8%] sm:mt-[5%] gap-8 px-4 sm:px-6 perspective-[1000px]">
        {/* Code Editor */}
        <div ref={editorRef} className="flex-1 h-[65vh] sm:h-[60vh] bg-[#050505] border border-brand-border-strong rounded-xl shadow-cinematic flex flex-col overflow-hidden">
          <div className="h-9 sm:h-10 bg-brand-surface border-b border-brand-border flex items-center px-3 sm:px-4 gap-2">
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs font-mono text-brand-text-muted">page.tsx</span>
          </div>
          
          <div className="flex-1 p-3 sm:p-6 font-mono text-[11px] sm:text-sm overflow-hidden flex flex-col relative">
             <div ref={codeLinesRef} className="flex flex-col gap-1 overflow-x-auto no-scrollbar">
               {codeSnippet.map((line, i) => (
                 <div key={i} className="flex whitespace-nowrap">
                   <span className="text-brand-text-disabled w-6 sm:w-8 select-none shrink-0">{i + 1}</span>
                   <span className={line.includes('import') ? 'text-blue-400' : line.includes('function') ? 'text-purple-400' : line.includes('<') ? 'text-green-400' : 'text-brand-text-secondary'}>
                     {line}
                   </span>
                 </div>
               ))}
             </div>

             {/* Terminal Overlay */}
             <div className="absolute bottom-0 left-0 right-0 h-2/5 sm:h-1/3 bg-black/90 border-t border-brand-border p-3 sm:p-4 font-mono text-[10px] sm:text-xs">
                <div className="text-brand-text-muted mb-1">$ npm run build</div>
                <div ref={buildStatusRef} className="flex flex-col gap-0.5 sm:gap-1">
                  <div>✓ Compiled successfully</div>
                  <div>→ Responsive layout verified</div>
                  <div>→ Performance 100/100</div>
                  <div className="mt-1 text-brand-text text-brand-accent">Ready for production.</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
