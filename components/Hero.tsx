
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Animate Tech Lines first
    tl.fromTo(".tech-line",
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.5, stagger: 0.2 }
    );

    // Text & Buttons Entrance
    tl.fromTo(".hero-title",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2 },
      "-=1.0"
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

    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-16 pt-32 md:pt-20 overflow-hidden">
      {/* Decorative Tech Lines */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] left-0 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-amber-600 to-transparent tech-line origin-left opacity-30"></div>
        <div className="absolute bottom-[20%] right-0 w-[50%] h-[1px] bg-gradient-to-l from-transparent via-amber-600 to-transparent tech-line origin-right opacity-30"></div>
        {/* Angled lines */}
        <svg className="absolute top-0 right-0 w-[40%] h-[40%] pointer-events-none opacity-20 tech-line">
          <polyline points="0,0 100,0 150,50" fill="none" stroke="#fbbf24" strokeWidth="1" />
          <circle cx="150" cy="50" r="2" fill="#fbbf24" />
        </svg>
      </div>

      <div className="relative z-20 max-w-4xl">
        <div className="overflow-hidden py-2">
          {/* Metallic Gold Title Effect */}
          <h1 className="hero-title font-samarkan text-5xl sm:text-7xl md:text-[10rem] lg:text-[11rem] leading-[0.9] tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] via-[#f59e0b] to-[#78350f] drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
            citadel 1.0
          </h1>
        </div>

        <div className="overflow-hidden mt-6 mb-12">
          <p className="hero-subtitle font-pyriform text-2xl sm:text-3xl md:text-5xl text-amber-100/90 tracking-[0.2em] lowercase glow-text">
            the dharma of code
          </p>
        </div>

        <div className="hero-btns flex flex-col sm:flex-row gap-8 items-start">
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
