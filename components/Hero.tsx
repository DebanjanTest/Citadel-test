
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DustOverlay from './DustOverlay';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const fgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !bgRef.current || !fgRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrubbing
        pin: false,
      }
    });

    // Parallax Effect
    // Background moves slowly (depth)
    tl.to(bgRef.current, {
      y: 100,
      scale: 1.2,
      ease: "none"
    }, 0);

    // Foreground zooms in (intrusive 3D effect)
    tl.to(fgRef.current, {
      scale: 1.6, // More controlled zoom
      y: 100,
      opacity: 1,
      ease: "power1.out"
    }, 0);

    // Content (Title) moves at a medium pace and fades
    tl.to(contentRef.current, {
      y: -150,
      opacity: 0,
      ease: "none"
    }, 0);

    // Intro Animation (unchanged)
    const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Text & Buttons Entrance
    introTl.fromTo(".hero-title",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2 },
      0.5
    )
      .fromTo(".hero-subtitle",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0 },
        "-=0.8"
      )
      .fromTo(".hero-btns",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

    return () => {
      tl.kill();
      introTl.kill();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Layer - Battle Layer (Z-0) */}
      <div className="absolute inset-0 z-0">
        <img
          ref={bgRef}
          src="/Backgrounds/background1.png"
          alt="Citadel Battle Layer"
          className="w-full h-full object-cover opacity-100 brightness-110 saturate-125"
        />
      </div>

      {/* Vignette Overlay (Z-1) - Sits on top of background but below foreground */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,#050505_100%)]"></div>

      {/* Blurred Filler Layer (Z-5) - Handles edges if main image doesn't cover */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <img
          src="/Backgrounds/foreground1.png"
          alt="Blurred Background Filler"
          className="w-full h-full object-cover blur-3xl opacity-60 brightness-100 saturate-125 scale-110"
        />
      </div>

      {/* Foreground Layer - Intrusive Element (Z-10) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <img
          ref={fgRef}
          src="/Backgrounds/foreground1.png"
          alt="Citadel Interface"
          className="w-full h-full object-contain object-left-bottom brightness-110 saturate-125 drop-shadow-2xl" // Anchored bottom-left, uncropped
        />
      </div>

      {/* Dust Overlay Layer (Z-25) - Floating particles across screen */}
      <DustOverlay />

      {/* Main Hero Content (Z-30) */}
      <div ref={contentRef} className="relative z-30 max-w-5xl text-center px-6">
        <div className="overflow-hidden py-4">
          {/* Metallic Gold Title Effect - Resized */}
          <h1 className="hero-title font-samarkan text-5xl sm:text-7xl md:text-[6rem] lg:text-[8rem] leading-[1] tracking-normal uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] via-[#f59e0b] to-[#78350f] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] filter">
            citadel 1.0
          </h1>
        </div>

        <div className="overflow-hidden mt-4 mb-10">
          <p className="hero-subtitle font-pyriform text-xl sm:text-2xl md:text-3xl text-amber-100/90 tracking-[0.3em] lowercase glow-text">
            the dharma of code
          </p>
        </div>

        <div className="hero-btns flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto">
          {/* Primary Gold Button */}
          <button className="relative px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-black font-pyriform font-bold text-xl rounded-md transition-all shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:shadow-[0_0_40px_rgba(217,119,6,0.6)] hover:scale-105 active:scale-95 uppercase tracking-wider border border-amber-400/50">
            Register Now
          </button>

          {/* Secondary Outline Button */}
          <button className="px-10 py-4 border border-amber-500/60 text-amber-400 font-pyriform font-bold text-xl rounded-md transition-all bg-black/40 backdrop-blur-sm hover:bg-amber-900/20 hover:border-amber-400 hover:text-amber-200 hover:scale-105 active:scale-95 uppercase tracking-wider">
            View Vyuhas
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
