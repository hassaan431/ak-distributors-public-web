"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

// Register GSAP CustomEase plugin in client environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export default function ArchPortalPreloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const archCutoutRef = useRef<SVGPathElement>(null);
  const archOutlineRef = useRef<SVGPathElement>(null);
  const leftWingRef = useRef<HTMLDivElement>(null);
  const rightWingRef = useRef<HTMLDivElement>(null);
  const activeTlRef = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    // Register custom easing curves
    try {
      CustomEase.create("InOut", "0.75, 0, 0.25, 1");
      CustomEase.create("diveIn", "0.6, 0, 0, 1");
    } catch {
      // Eases already registered
    }

    const updateArchPath = (wVw: number, yVh: number) => {
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const wPx = (wVw / 100) * winW;
      const yPx = (yVh / 100) * winH;
      const cx = winW / 2;
      const r = wPx / 2;
      const left = cx - r;
      const right = cx + r;
      const top = yPx;
      const bottom = winH + 100;

      // Closed arch path for the cutout mask
      const d = `M ${left} ${bottom} L ${left} ${top + r} A ${r} ${r} 0 0 1 ${right} ${top + r} L ${right} ${bottom} Z`;
      if (archCutoutRef.current) {
        archCutoutRef.current.setAttribute("d", d);
      }

      // Open arch outline (left wall, rounded arch cap, right wall)
      const outlineD = `M ${left} ${bottom} L ${left} ${top + r} A ${r} ${r} 0 0 1 ${right} ${top + r} L ${right} ${bottom}`;
      if (archOutlineRef.current) {
        archOutlineRef.current.setAttribute("d", outlineD);
      }
    };

    const finishAndHandoff = () => {
      activeTlRef.current = null;
      const el = containerRef.current;
      if (el) {
        el.style.display = "none";
      }
      document.body.style.overflow = "";

      if (window.__lenis) {
        window.__lenis.start();
      }

      // Hand-off: Ensure all hero elements are fully visible
      const headlineEl = document.querySelector("[data-hero-headline]");
      const subtextEl = document.querySelector("[data-hero-subtext]");
      const ctaEl = document.querySelector("[data-hero-cta]");

      if (headlineEl) gsap.set(headlineEl, { opacity: 1, y: 0 });
      if (subtextEl) gsap.set(subtextEl, { opacity: 1, y: 0 });
      if (ctaEl) gsap.set(ctaEl, { opacity: 1, y: 0 });
    };

    const runSequence = (isFastTransition: boolean) => {
      const el = containerRef.current;
      if (!el) return;

      if (activeTlRef.current) {
        activeTlRef.current.kill();
        activeTlRef.current = null;
      }

      // Lock scroll during the intro animation
      document.body.style.overflow = "hidden";
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
        window.__lenis.stop();
      }
      window.scrollTo(0, 0);

      const isMobile = window.innerWidth < 992;
      const heroMasterImg = document.querySelector("[data-hero-master-img]");
      const headlineEl = document.querySelector("[data-hero-headline]");
      const subtextEl = document.querySelector("[data-hero-subtext]");
      const ctaEl = document.querySelector("[data-hero-cta]");

      // Initial hero master background image setup (wide cinematic framing)
      if (heroMasterImg) {
        gsap.set(heroMasterImg, {
          scale: isMobile ? 1.08 : 0.82,
          transformOrigin: "center top",
        });
      }

      // Hide hero typography during arch entrance so the arch portal silhouette cleanly frames the hero
      if (!isFastTransition) {
        if (headlineEl) gsap.set(headlineEl, { opacity: 0, y: 25 });
        if (subtextEl) gsap.set(subtextEl, { opacity: 0, y: 20 });
        if (ctaEl) gsap.set(ctaEl, { opacity: 0, y: 20 });
      }

      el.style.display = "block";

      // Reset outline stroke opacity
      if (archOutlineRef.current) {
        gsap.set(archOutlineRef.current, { opacity: 1 });
      }

      // Start with arch already in view framing the bottom of the page (no black screen)
      const startW = isMobile ? 42 : 26;
      const startY = isMobile ? 75 : 80;
      const archState = { w: startW, y: startY };
      updateArchPath(startW, startY);

      if (isFastTransition) {
        // Fast 0.6s transition for returning visits in session
        const fastTl = gsap.timeline({
          onComplete: finishAndHandoff,
        });
        activeTlRef.current = fastTl;

        if (leftWingRef.current) gsap.set(leftWingRef.current, { opacity: 0 });
        if (rightWingRef.current) gsap.set(rightWingRef.current, { opacity: 0 });

        fastTl.to(archState, {
          w: 130,
          y: -100,
          duration: 0.6,
          ease: "diveIn",
          onUpdate: () => updateArchPath(archState.w, archState.y),
        }, 0);

        if (archOutlineRef.current) {
          fastTl.to(archOutlineRef.current, { opacity: 0, duration: 0.4 }, 0);
        }

        if (heroMasterImg) {
          fastTl.to(heroMasterImg, {
            scale: 1.0,
            duration: 0.6,
            ease: "InOut",
          }, 0);
        }
        return;
      }

      // Mark visited in sessionStorage
      try {
        sessionStorage.setItem("hasVisited", "true");
      } catch {
        // Ignore storage access errors
      }

      // Prepare side wings initial state
      if (leftWingRef.current) {
        gsap.set(leftWingRef.current, {
          opacity: 0,
          x: isMobile ? -15 : -35,
        });
      }
      if (rightWingRef.current) {
        gsap.set(rightWingRef.current, {
          opacity: 0,
          x: isMobile ? 15 : 35,
        });
      }

      // Cinematic Arch Portal timeline (~3.5s total)
      const tl = gsap.timeline({
        onComplete: finishAndHandoff,
      });
      activeTlRef.current = tl;

      const phase1W = isMobile ? 44 : 36;
      const phase1Y = isMobile ? 12 : 14;

      // Phase 1: Smoothly pan arch upwards into centered framing position (0s -> 1.5s)
      tl.to(archState, {
        w: phase1W,
        y: phase1Y,
        duration: 1.5,
        ease: "InOut",
        onUpdate: () => updateArchPath(archState.w, archState.y),
      }, 0);

      // Hero image parallax drift during Phase 1
      if (heroMasterImg) {
        tl.to(heroMasterImg, {
          scale: isMobile ? 1.04 : 0.86,
          duration: 1.5,
          ease: "InOut",
        }, 0);
      }

      // Flanking Wings entrance: Fade and glide in alongside the arch ascent (0.2s -> 1.5s)
      if (leftWingRef.current) {
        tl.to(leftWingRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.3,
          ease: "power2.out",
        }, 0.2);
      }
      if (rightWingRef.current) {
        tl.to(rightWingRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.3,
          ease: "power2.out",
        }, 0.2);
      }

      // Framing Hold: 0.6s deliberate pause (1.5s -> 2.1s) where the arch, left crest, and right greetings hold

      // Phase 2: Dive-in zoom through the arch into the building (2.1s -> 3.5s)
      tl.to(archState, {
        w: 130,
        y: -100,
        duration: 1.4,
        ease: "diveIn",
        onUpdate: () => updateArchPath(archState.w, archState.y),
      }, 2.1);

      // Fade out the architectural outline stroke during the dive-in
      if (archOutlineRef.current) {
        tl.to(archOutlineRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        }, 2.1);
      }

      // Concurrently: Wings smoothly part outward and dissolve as portal expands (2.1s -> 2.7s)
      if (leftWingRef.current) {
        tl.to(leftWingRef.current, {
          opacity: 0,
          x: isMobile ? -25 : -45,
          duration: 0.6,
          ease: "power2.out",
        }, 2.1);
      }
      if (rightWingRef.current) {
        tl.to(rightWingRef.current, {
          opacity: 0,
          x: isMobile ? 25 : 45,
          duration: 0.6,
          ease: "power2.out",
        }, 2.1);
      }

      // Concurrently: Zoom hero image to 1.0
      if (heroMasterImg) {
        tl.to(heroMasterImg, {
          scale: 1.0,
          duration: 1.4,
          ease: "InOut",
        }, 2.1);
      }

      // Smooth entrance for hero typography as the arch zooms past the screen (3.0s -> 3.5s)
      if (headlineEl) {
        tl.to(headlineEl, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }, 3.0);
      }

      if (subtextEl || ctaEl) {
        tl.to([subtextEl, ctaEl].filter(Boolean), {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
        }, 3.15);
      }
    };

    // Check sessionStorage hasVisited
    let visited = false;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forceIntro = urlParams.get("intro") === "1" || urlParams.get("intro") === "true";
      visited = !forceIntro && sessionStorage.getItem("hasVisited") === "true";
    } catch {
      visited = false;
    }

    // Expose replay function globally for testing and interactive button
    window.replayArchIntro = () => {
      try {
        sessionStorage.removeItem("hasVisited");
      } catch {}
      runSequence(false);
    };

    const handleReplayEvent = () => runSequence(false);
    window.addEventListener("replay-arch-intro", handleReplayEvent);

    // Run immediately on page load
    runSequence(visited);

    return () => {
      window.removeEventListener("replay-arch-intro", handleReplayEvent);
      if (activeTlRef.current) {
        activeTlRef.current.kill();
        activeTlRef.current = null;
      }
      document.body.style.overflow = "";
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <div
      ref={containerRef}
      data-preloader
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden bg-transparent"
    >
      {/* SVG Mask with pure black backdrop & dynamic center arch cutout */}
      <svg className="w-full h-full block absolute inset-0 z-0">
        <defs>
          <mask id="arch-portal-mask" maskUnits="userSpaceOnUse">
            {/* White covers entire viewport (renders the dark background) */}
            <rect width="100%" height="100%" fill="white" />
            {/* Black arch cutout makes this area transparent to show the hero */}
            <path ref={archCutoutRef} fill="black" />
          </mask>
        </defs>
        {/* Full-screen luxury pure black backdrop with dynamic arch cutout */}
        <rect
          width="100%"
          height="100%"
          fill="#000000"
          mask="url(#arch-portal-mask)"
        />
        {/* Crisp architectural hairline silhouette */}
        <path
          ref={archOutlineRef}
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Flanking Wing 1: Left Side - AK Distributors Crest Logo */}
      <div
        ref={leftWingRef}
        className="absolute left-0 top-0 bottom-0 z-10 flex flex-col items-center justify-center pointer-events-none w-[30vw] md:w-[32vw] px-3 sm:px-6 md:px-10"
      >
        <div className="relative w-full max-w-[140px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[340px] xl:max-w-[380px] flex items-center justify-center">
          <img
            src="/images/intro/ak-crest.png"
            alt="AK Distributors LLC Crest"
            className="w-full h-auto object-contain drop-shadow-[0_4px_30px_rgba(255,255,255,0.08)]"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Flanking Wing 2: Right Side - Multilingual Cultural Greetings */}
      <div
        ref={rightWingRef}
        className="absolute right-0 top-0 bottom-0 z-10 flex flex-col items-center justify-center pointer-events-none w-[30vw] md:w-[32vw] px-3 sm:px-6 md:px-10"
      >
        <div className="relative w-full max-w-[130px] sm:max-w-[180px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[340px] flex items-center justify-center">
          <img
            src="/images/intro/greetings.png"
            alt="Welcome Greetings in Multiple Languages"
            className="w-full h-auto object-contain drop-shadow-[0_4px_30px_rgba(255,255,255,0.08)]"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
