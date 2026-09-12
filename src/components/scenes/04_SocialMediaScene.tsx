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
function ReelVideo({ src, poster }: { src: string; poster: string }) {
  const [videoUrl, setVideoUrl] = useState<string>(src);
  const videoRef = useRef<HTMLVideoElement>(null);

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

          // Retain for minimum 30 days
          if (Date.now() - cachedTime < THIRTY_DAYS_MS) {
            const blob = await cachedResponse.blob();
            if (isMounted) {
              objectUrl = URL.createObjectURL(blob);
              setVideoUrl(objectUrl);
            }
            return;
          } else {
            // Expired after 30 days, clear old cache entry
            await cache.delete(src);
          }
        }

        // Cache on initial visit for ultra-fast instant playback
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
      } catch (err) {
        // Fallback gracefully to standard direct source
      }
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
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105"
    />
  );
}

export default function SocialMediaScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !cardsRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsRef.current.children;

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

    // 0% - Viewport entry headline
    tl.fromTo(textRef.current, { opacity: 0, scale: 0.95, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.4 });

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    // 15% - Cards fan out smoothly
    tl.fromTo(cards, 
      { opacity: 0, y: 150, scale: 0.8, rotateZ: 0 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateZ: (i) => isMobile ? [-4, 0, 4][i] : [-10, 0, 10][i],
        x: (i) => isMobile ? [-25, 0, 25][i] : [-280, 0, 280][i],
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.2"
    );

    // 70% - Cards scale up and morph toward Web Design Home
    tl.to(cards, {
      y: -350,
      scale: (i) => i === 1 ? 1.4 : 0.6,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "power2.in"
    });

    tl.to(textRef.current, { opacity: 0, y: -40, duration: 0.4 }, "<");

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-brand-bg">
      {/* Ambient Glowing Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[30vw] h-[30vw] bg-brand-accent/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div ref={textRef} className="absolute top-[8%] sm:top-[12%] text-center px-4 z-20 max-w-full">
        <h2 className="text-xl sm:text-3xl md:text-5xl font-black text-white tracking-tight mb-2 uppercase font-inter-tight">FROM CONTENT TO ATTENTION.</h2>
        <p className="text-xs sm:text-sm text-brand-accent font-mono">REAL CLIENT PRODUCTIONS &amp; VIRAL SOCIAL REELS</p>
      </div>

      <div ref={cardsRef} className="relative z-10 flex items-center justify-center w-full h-full mt-[12%] sm:mt-[10%] px-4">
        {CLIENT_REELS.map((reel, i) => (
          <div key={reel.id + i} className="absolute w-[240px] sm:w-[320px] h-[400px] sm:h-[530px] glass rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between shadow-floating border border-white/10 hover:border-brand-accent/40 bg-[#0a0a0a]/95 backdrop-blur-2xl transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <img 
                  src="/logo.png" 
                  alt="Website Walae Logo" 
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
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-accent hover:text-black text-white/70 flex items-center justify-center transition-all duration-300 group"
                title="View on Instagram"
              >
                <Share2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            
            {/* Video Container with 30-Day Cached Video & Poster Thumbnail */}
            <div className="flex-1 rounded-2xl border border-white/10 mb-2.5 relative overflow-hidden bg-black group/video">
              <ReelVideo src={reel.video} poster={reel.poster} />

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
              <div className="flex items-center justify-between text-brand-text">
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
        ))}
      </div>
    </section>
  );
}
