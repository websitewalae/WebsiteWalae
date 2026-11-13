"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ScrollTrigger from "gsap/ScrollTrigger";

import SceneController from "@/components/scenes/SceneController";
import HeroScene from "@/components/scenes/01_HeroScene";
import ContentCreationScene from "@/components/scenes/02_ContentCreationScene";
import EditingScene from "@/components/scenes/03_EditingScene";
import SocialMediaScene from "@/components/scenes/04_SocialMediaScene";
import WebDesignScene from "@/components/scenes/05_WebDesignScene";
import DevelopmentScene from "@/components/scenes/06_DevelopmentScene";
import MarketingScene from "@/components/scenes/07_MarketingScene";

import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

import CameraInterface from "@/components/scenes/CameraInterface";

export default function HomePageClient() {
  const [cameraModeActive, setCameraModeActive] = useState(false);
  // The pinned, scroll-scrubbed cinematic scenes are a desktop experience.
  // On phones they made the page ~25 screens long and "stuck" while
  // scrolling, so they're only mounted on screens 768px and wider.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Scenes mount after hydration on desktop; recalculate scroll positions
  // for the sections below them once they're in the DOM.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [isDesktop]);

  // Lock scroll on the body only when camera mode is explicitly opened
  useEffect(() => {
    if (cameraModeActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [cameraModeActive]);

  return (
    <>
      {/* Interactive Camera Mode (optional overlay) */}
      <AnimatePresence>
        {cameraModeActive && (
          <CameraInterface onEnterSite={() => setCameraModeActive(false)} />
        )}
      </AnimatePresence>
      
      {/* Main Site Content — immediately visible */}
      <div className="w-full">
        <SceneController>
          <HeroScene />
          {isDesktop && <ContentCreationScene />}
          {isDesktop && <EditingScene />}
          <SocialMediaScene />
          {isDesktop && <WebDesignScene />}
          {isDesktop && <DevelopmentScene />}
          {isDesktop && <MarketingScene />}
        </SceneController>

        <Services />
        <Portfolio />
        <Process />
        <About />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
