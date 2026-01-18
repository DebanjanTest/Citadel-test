
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from(".hero-title", {
      y: 150,
      opacity: 0,
      duration: 1.8,
      ease: "power4.out"
    })
    .from(".hero-subtitle", {
      y: 80,
      opacity: 0,
      duration: 1.4,
      ease: "power3.out"
    }, "-=1.2")
    .from(".hero-btns", {
      scale: 0.85,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.4)"
    }, "-=0.8");
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center md:px-24 pt-24 overflow-hidden">
      <div className="z-20 space-y-10 max-w-7xl mx-auto">
        <div className="overflow-hidden">
          <h1 className="hero-title font-samarkan text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-amber-500 gold-glow leading-[1] tracking-wider uppercase">
            citadel 1.0
          </h1>
        </div>
        
        <div className="overflow-hidden">
          <p className="hero-subtitle font-pyriform text-xl sm:text-2xl md:text-4xl lg:text-5xl text-amber-100/70 tracking-[0.3em] uppercase">
            — The Dharma of Code —
          </p>
        </div>
        
        <div className="hero-btns flex flex-col sm:flex-row gap-8 pt-12 justify-center items-center">
          <button className="relative group px-14 py-6 bg-amber-600 text-black font-pyriform font-bold text-2xl rounded-sm transition-all overflow-hidden shadow-[0_0_50px_rgba(217,119,6,0.5)] hover:scale-105 active:scale-95">
            <span className="relative z-10">INITIATE ASCENSION</span>
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
          </button>
          
          <button className="px-14 py-6 border-2 border-amber-600/50 hover:border-amber-400 text-amber-400 font-pyriform font-bold text-2xl rounded-sm transition-all bg-black/50 backdrop-blur-xl hover:scale-105 active:scale-95">
            DECODE VEDAS
          </button>
        </div>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-30 flex gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-[2px] h-40 bg-gradient-to-b from-transparent via-amber-500 to-transparent"></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
