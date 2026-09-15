"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

const CLIENT_REELS = [
  {
    id: "reel-1",
    client: "Caffeine & Cravings",
    handle: "@caffeineandcravingslko",
    badge: "Client Production",
    video: "/videos/reels/DbxlS_CS1rL.mp4",
    poster: "/images/reels/reel_coffee_rain.jpg",
    url: "https://www.instagram.com/reel/DbxlS_CS1rL/",
    likes: "1,981",
    comments: "18",
    tag: "AESTHETIC CAFE REEL",
    caption: "Cinematic rain & coffee visuals crafted for Lucknow's favourite cafe.",
  },
  {
    id: "reel-2",
    client: "Caffeine & Cravings",
    handle: "@caffeineandcravingslko",
    badge: "Viral Campaign",
    video: "/videos/reels/DSpKibZEtkI.mp4",
    poster: "/images/reels/reel_cappuccino_offer.jpg",
    url: "https://www.instagram.com/reel/DSpKibZEtkI/",
    likes: "8,420",
    comments: "42",
    tag: "VIRAL ₹9 OFFER CAMPAIGN",
    caption: "Lucknow's boldest New Year offer — viral campaign strategy & commercial shoot.",
  },
  {
    id: "reel-3",
    client: "Frisky Panda",
    handle: "@friskypanda.in",
    badge: "Event Production",
    video: "/videos/reels/DPOd9-QD0Pd.mp4",
    poster: "/images/reels/reel_frisky_panda.jpg",
    url: "https://www.instagram.com/reel/DPOd9-QD0Pd/",
    likes: "2,460",
    comments: "38",
    tag: "DANDIYA EVENT COVERAGE",
    caption: "Lucknow's 1st Kids Dandiya festival event production & viral social coverage.",
  },
];

// Dedicated 30-Day Client Cache Memory for Section Videos
function ReelVideo({ src, poster, isActive }: { src: string; poster: string; isActive: boolean }) {
  const [videoUrl, setVideoUrl] = useState<string>(src);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  useEffect(() => {
    let isMounted = true;
    let objectUrl: string | null = null;

    async function loadCachedVideo() {
      if (typeof window === "undefined" || !("caches" in window)) return;

      try {
        const CACHE_NAME = "ww-reels-v1";
        const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(src);

        if (cachedResponse) {
          const timestamp = cachedResponse.headers.get("x-cache-timestamp");
          const cachedTime = timestamp ? parseInt(timestamp, 10) : Date.now();

          if (Date.now() - cachedTime < THIRTY_DAYS_MS) {
            const blob = await cachedResponse.blob();
            if (isMounted) {
              objectUrl = URL.createObjectURL(blob);
              setVideoUrl(objectUrl);
            }
            return;
          } else {
            await cache.delete(src);
          }
        }

        const res = await fetch(src);
        if (res.ok) {
          const blob = await res.blob();
          const headers = new Headers(res.headers);
          headers.set("x-cache-timestamp", Date.now().toString());
          headers.set("Cache-Control", "public, max-age=2592000, immutable");

          const responseToCache = new Response(blob.slice(), {
            status: res.status,
            statusText: res.statusText,
            headers,
          });

          await cache.put(src, responseToCache);
          if (isMounted) {
            objectUrl = URL.createObjectURL(blob);
            setVideoUrl(objectUrl);
          }
        }
      } catch (err) {}
    }

    loadCachedVideo();

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      poster={poster}
      loop
      muted
      playsInline
      preload="metadata"
      className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105"
    />
  );
}

function SocialCard({ reel, isActive }: { reel: any; isActive: boolean }) {
  return (
    <div className={`w-[290px] sm:w-[320px] shrink-0 h-[500px] sm:h-[530px] glass rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between shadow-floating border transition-all duration-500 bg-[#0a0a0a]/95 backdrop-blur-2xl ${isActive ? 'scale-100 opacity-100 border-brand-accent/60 shadow-[0_0_30px_rgba(199,255,61,0.15)] z-20' : 'scale-[0.92] opacity-40 border-white/10 z-10'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <img 
            src="/logo.png" 
            alt={`${reel.client} — ${reel.caption}`} 
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-brand-accent/40 p-0.5 bg-black" 
          />
          <div>
            <div className="text-xs sm:text-sm font-bold text-brand-text flex items-center gap-1.5 leading-tight">
              <span>{reel.client}</span>
            </div>
            <div className="text-[10px] text-brand-text-muted">{reel.badge} • Lucknow</div>
          </div>
        </div>

        <a
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-accent hover:text-black text-white/70 flex items-center justify-center transition-all duration-300 group pointer-events-auto"
          title="View on Instagram"
        >
          <Share2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
        </a>
      </div>
      
      {/* Video Container */}
      <div className="flex-1 rounded-2xl border border-white/10 mb-2.5 relative overflow-hidden bg-black group/video">
        <ReelVideo src={reel.video} poster={reel.poster} isActive={isActive} />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[9px] sm:text-[10px] font-mono font-bold text-brand-accent px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-brand-accent/40 shadow-lg">
            {reel.tag}
          </span>
        </div>

        {/* Active Client Badge */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
          <span>CLIENT WORK</span>
        </div>
      </div>

      {/* Metrics & Actions */}
      <div className="flex flex-col gap-1.5 pt-0.5">
        <div className="flex items-center justify-between text-brand-text pointer-events-auto">
          <div className="flex items-center gap-3">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 fill-pink-500" />
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
          </div>
          <a
            href={reel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono font-bold text-brand-accent hover:text-white transition-colors flex items-center gap-1"
            title="Open Original Reel on Instagram"
          >
            <span>REEL</span>
            <Bookmark className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="text-xs sm:text-sm font-bold text-white leading-none">{reel.likes} likes</div>
        <div className="text-[10px] sm:text-[11px] text-brand-text-secondary leading-snug line-clamp-1">
          {reel.caption}
        </div>
      </div>
    </div>
  );
}

export default function SocialMediaScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const desktopCardsRef = useRef<HTMLDivElement>(null);
  
  // Mobile state
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // DESKTOP: Cinematic Pinning & Scrubbing
      if (!desktopCardsRef.current) return;
      const cards = desktopCardsRef.current.children;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=130%",
          scrub: 0.4,
          pin: true,
          pinSpacing: true,
        },
      });

      tl.fromTo(textRef.current, { opacity: 0, scale: 0.95, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.4 });

      tl.fromTo(cards, 
        { opacity: 0, y: 150, scale: 0.8, rotateZ: 0 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateZ: (i) => [-10, 0, 10][i],
          x: (i) => [-280, 0, 280][i],
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out"
        },
        "-=0.2"
      );

      tl.to(cards, {
        y: -350,
        scale: (i) => i === 1 ? 1.4 : 0.6,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.in"
      });

      tl.to(textRef.current, { opacity: 0, y: -40, duration: 0.4 }, "<");

      return () => tl.kill();
    });

    mm.add("(max-width: 767px)", () => {
      // MOBILE: Lightweight Entrance Without Pinning
      gsap.fromTo(textRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", // Trigger early, no pin
          }
        }
      );
      
      gsap.fromTo(mobileCarouselRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", 
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  // Handle mobile swipe observer smoothly
  useEffect(() => {
    const container = mobileCarouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = 290; // The fixed width of the mobile card
      const gap = 16;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      
      if (index >= 0 && index < CLIENT_REELS.length) {
        setActiveSlide(index);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    // Run once to initialize
    handleScroll();
    
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full md:h-screen min-h-[95vh] py-24 md:py-0 overflow-hidden flex flex-col items-center justify-center bg-brand-bg">
      {/* Ambient Glowing Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[30vw] h-[30vw] bg-brand-accent/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div ref={textRef} className="absolute md:top-[12%] top-[8%] text-center px-4 z-20 w-full">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight mb-2 uppercase font-inter-tight leading-tight">FROM CONTENT TO ATTENTION.</h2>
        <p className="text-[10px] sm:text-sm text-brand-accent font-mono">REAL CLIENT PRODUCTIONS &amp; VIRAL SOCIAL REELS</p>
      </div>

      {/* --- DESKTOP CINEMATIC CARDS (Hidden on Mobile) --- */}
      <div ref={desktopCardsRef} className="hidden md:flex relative z-10 items-center justify-center w-full h-full mt-[10%] px-4 pointer-events-none">
        {CLIENT_REELS.map((reel) => (
          <div key={`desktop-${reel.id}`} className="absolute pointer-events-auto">
             <SocialCard reel={reel} isActive={true} />
          </div>
        ))}
      </div>

      {/* --- MOBILE SWIPEABLE CAROUSEL (Hidden on Desktop) --- */}
      <div className="flex flex-col md:hidden w-full mt-24 z-10 overflow-hidden">
        <div 
          ref={mobileCarouselRef} 
          className="flex overflow-x-auto snap-x snap-mandatory px-[calc(50vw-145px)] gap-4 pb-8 pt-4 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {CLIENT_REELS.map((reel, i) => (
            <div key={`mobile-${reel.id}`} className="snap-center shrink-0 flex items-center justify-center">
              <SocialCard reel={reel} isActive={activeSlide === i} />
            </div>
          ))}
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="flex flex-col items-center justify-center gap-3 w-full -mt-2">
          <div className="flex items-center gap-2">
            {CLIENT_REELS.map((_, i) => (
              <div 
                key={i} 
                className={`transition-all duration-300 rounded-full ${activeSlide === i ? 'w-6 h-1.5 bg-brand-accent shadow-[0_0_8px_rgba(199,255,61,0.6)]' : 'w-1.5 h-1.5 bg-white/20'}`}
              />
            ))}
          </div>
          <div className="text-[9px] font-mono text-brand-text-muted flex items-center gap-1.5 tracking-widest uppercase font-bold">
            0{activeSlide + 1} / 0{CLIENT_REELS.length} — Swipe to Explore →
          </div>
        </div>
      </div>

    </section>
  );
}
