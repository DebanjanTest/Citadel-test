
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
    gsap.to(".main-chakra-img", {
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
        <img
          src="/Wheel.png"
          alt="Chakra Wheel"
          className="main-chakra-img w-full h-full object-contain filter drop-shadow-[0_0_80px_rgba(251,191,36,0.3)]"
        />
        <div className="absolute inset-0 bg-amber-600/5 blur-[120px] rounded-full -z-10 scale-95"></div>
      </div>
    </div>
  );
};

export default PersistentWheel;
