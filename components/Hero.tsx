
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        scrub: true,
        pin: false, // Don't pin the whole hero, let it scroll but animate parallax
      }
    });

    // Parallax Effect
    // Background moves slowly (depth)
    tl.to(bgRef.current, {
      y: 100,
      scale: 1.2, // Increased scale to prevent gaps
      ease: "none"
    }, 0);

    // Foreground zooms in aggressively (intrusive 3D effect)
    // Adjust scale and z-index feel
    tl.to(fgRef.current, {
      scale: 2.5, // Significant zoom
      y: 200,     // Move down faster than background
      opacity: 0, // Fade out eventually as it passes "through" the camera
      ease: "power1.in"
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
          className="w-full h-full object-cover opacity-100"
        />
      </div>

      {/* Vignette Overlay (Z-1) - Sits on top of background but below foreground */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,#050505_100%)]"></div>

      {/* Foreground Layer - Intrusive Element (Z-10) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <img
          ref={fgRef}
          src="/Backgrounds/foreground.png"
          alt="Citadel Interface"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Hero Content (Z-20) */}
      <div ref={contentRef} className="relative z-20 max-w-5xl text-center px-6">
        <div className="overflow-hidden py-4">
          {/* Metallic Gold Title Effect */}
          <h1 className="hero-title font-samarkan text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] leading-[1] tracking-normal uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] via-[#f59e0b] to-[#78350f] drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
            citadel 1.0
          </h1>
        </div>

        <div className="overflow-hidden mt-4 mb-10">
          <p className="hero-subtitle font-pyriform text-2xl sm:text-3xl md:text-4xl text-amber-100/90 tracking-[0.3em] lowercase glow-text">
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
