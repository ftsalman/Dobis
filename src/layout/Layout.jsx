import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/features/chat/components/ChatWidget";
import { scrollToHash, scrollToTop, setSmoothScroller } from "@/utils/smoothScroll";

export const Layout = () => {
  // Momentum (inertia) scrolling for the whole page; skipped for users who prefer reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.085, anchors: { offset: -96 } });
    setSmoothScroller(lenis);
    return () => {
      setSmoothScroller(null);
      lenis.destroy();
    };
  }, []);

  // New page: start at the top, or at the #section the link pointed to once it has rendered.
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      scrollToTop();
      return undefined;
    }
    let tries = 0;
    let frame = 0;
    const seek = () => {
      if (document.querySelector(hash)) scrollToHash(hash);
      else if (tries++ < 30) frame = requestAnimationFrame(seek);
    };
    frame = requestAnimationFrame(seek);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return (
    <div className="relative min-h-screen bg-canvas">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};
