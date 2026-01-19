
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import HackathonIntro from './components/HackathonIntro.tsx';
import About from './components/About.tsx';
import ChakraLoader from './components/ChakraLoader.tsx';
import Background from './components/Background.tsx';
import VyuhaSection from './components/VyuhaSection.tsx';
import Timeline from './components/Timeline.tsx';
import Prizes from './components/Prizes.tsx';
import FAQ from './components/FAQ.tsx';
import Footer from './components/Footer.tsx';
import PersistentWheel from './components/PersistentWheel.tsx';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && mainRef.current) {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      if (!isTouch) {
        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const xPos = (clientX / window.innerWidth - 0.5) * 15;
          const yPos = (clientY / window.innerHeight - 0.5) * 15;

          gsap.to(".hover-3d", {
            rotationY: xPos,
            rotationX: -yPos,
            ease: "power2.out",
            duration: 1.5,
            transformPerspective: 1500
          });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }

      gsap.fromTo(mainRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });
    }
  }, [loading]);

  if (loading) {
    return <ChakraLoader />;
  }

  return (
    <div ref={mainRef} className="relative min-h-screen text-amber-50 selection:bg-amber-600 selection:text-white bg-[#050505] overflow-x-hidden">
      {/* Background layer always sits at the very bottom */}
      <Background />

      {/* Persistent Wheel sits between background and main content */}
      <PersistentWheel />

      <div className="relative z-10 w-full">

        <Header />

        <main className="relative z-20">
          <Hero />
          <HackathonIntro />
          <About />
          <VyuhaSection />
          <Timeline />
          <Prizes />
          <FAQ />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
