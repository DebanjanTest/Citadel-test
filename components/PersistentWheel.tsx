
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PersistentWheel: React.FC = () => {
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wheelRef.current) return;

    // Initial state setup to prevent jump on start
    gsap.set(wheelRef.current, {
      scale: 1,
      opacity: 0.3,
      top: "15%",
      right: "-10%",
      xPercent: 0,
      yPercent: 0
    });

    // Constant rotation of the main chakra
    gsap.to(".main-chakra-svg", {
      rotation: 360,
      duration: 35,
      repeat: -1,
      ease: "none"
    });

    // Consistent pathing throughout the page with smoother scale transitions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Reduced scrub for more direct but smooth response
      }
    });

    tl.to(wheelRef.current, {
      top: "100vh",
      left: "10%",
      scale: 1.15,
      opacity: 0.25,
      rotationY: 30,
      duration: 1
    })
    .to(wheelRef.current, {
      top: "220vh",
      left: "80%",
      scale: 0.95,
      opacity: 0.35,
      rotationY: -30,
      duration: 1
    })
    .to(wheelRef.current, {
      top: "350vh",
      left: "40%",
      scale: 1.4,
      opacity: 0.15,
      rotationX: 45,
      duration: 1
    })
    .to(wheelRef.current, {
      top: "520vh",
      left: "70%",
      scale: 1.05,
      opacity: 0.3,
      rotationY: 15,
      duration: 1
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={wheelRef} 
      className="fixed z-[1] pointer-events-none w-[320px] h-[320px] md:w-[600px] md:h-[600px] flex items-center justify-center"
      style={{ perspective: '1200px' }}
    >
      <div className="relative w-full h-full hover-3d" style={{ transformStyle: 'preserve-3d' }}>
        <svg viewBox="0 0 100 100" className="main-chakra-svg w-full h-full filter drop-shadow-[0_0_80px_rgba(251,191,36,0.3)]">
          <defs>
            <linearGradient id="chakraGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <filter id="chakraGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <circle cx="50" cy="50" r="48" fill="none" stroke="url(#chakraGold)" strokeWidth="0.5" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="url(#chakraGold)" strokeWidth="1.2" opacity="0.4" />
          
          {/* Decorative Outer Spikes */}
          {[...Array(24)].map((_, i) => (
            <path key={i} d="M50 2 L51.5 6 L48.5 6 Z" fill="url(#chakraGold)" transform={`rotate(${i * 15} 50 50)`} />
          ))}

          {[...Array(8)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 45} 50 50)`}>
              <path d="M48.5 6 L51.5 6 L52.5 48 L47.5 48 Z" fill="url(#chakraGold)" opacity="0.9" filter="url(#chakraGlow)" />
              <circle cx="50" cy="10" r="1.8" fill="#fff" opacity="0.7" />
            </g>
          ))}
          
          <circle cx="50" cy="50" r="16" fill="url(#chakraGold)" />
          <circle cx="50" cy="50" r="11" fill="#050505" />
          <path d="M50 40 Q60 50 50 60 Q40 50 50 40" fill="url(#chakraGold)" className="animate-pulse" />
        </svg>
        <div className="absolute inset-0 bg-amber-600/5 blur-[120px] rounded-full -z-10 scale-95"></div>
      </div>
    </div>
  );
};

export default PersistentWheel;
