"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

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

export default function Home() {
  const [cameraModeActive, setCameraModeActive] = useState(true);

  // Lock scroll on the body when camera mode is active
  useEffect(() => {
    if (cameraModeActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [cameraModeActive]);

  return (
    <div className="w-full relative bg-brand-bg text-brand-text min-h-screen">
      {/* Global Cinematic Grain Overlay */}
      <div className="noise-overlay" />

      {/* Interactive Camera Intro */}
      <AnimatePresence>
        {cameraModeActive && (
          <CameraInterface onEnterSite={() => setCameraModeActive(false)} />
        )}
      </AnimatePresence>
      
      {/* Main Site Content - Rendered but hidden from interaction until Camera Mode is exited */}
      <div 
        className="w-full"
        style={{ 
          opacity: cameraModeActive ? 0 : 1, 
          visibility: cameraModeActive ? 'hidden' : 'visible',
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <SceneController>
          <HeroScene />
          <ContentCreationScene />
          <EditingScene />
          <SocialMediaScene />
          <WebDesignScene />
          <DevelopmentScene />
          <MarketingScene />
        </SceneController>

        <Services />
        <Portfolio />
        <Process />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
