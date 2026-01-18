
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const arrowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !arrowsRef.current) return;

    const arrows = arrowsRef.current.querySelectorAll('.astra-arrow');
    const sectionHeight = sectionRef.current.offsetHeight;
    
    arrows.forEach((arrow, index) => {
      const isLeftToRight = Math.random() > 0.4; 
      const startX = isLeftToRight ? -600 : window.innerWidth + 600;
      const endX = isLeftToRight ? window.innerWidth + 600 : -600;
      const yStart = (index / arrows.length) * sectionHeight + (Math.random() - 0.5) * 400;
      const yEnd = yStart + (Math.random() - 0.5) * 1000; 
      const angle = Math.atan2(yEnd - yStart, endX - startX) * (180 / Math.PI);

      gsap.fromTo(arrow, 
        { x: startX, y: yStart, opacity: 0, rotation: angle, scale: 0.1 + (Math.random() * 1.5) },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.05 + (Math.random() * 4),
          },
          x: endX, y: yEnd,
          opacity: Math.random() * 0.8 + 0.1,
          ease: "none"
        }
      );
    });
  }, []);

  const events = [
    { day: "Day 1", time: "10:00 AM", title: "The Summoning", desc: "Opening ceremony and theme reveal." },
    { day: "Day 1", time: "12:00 PM", title: "The Forging Begins", desc: "Hacking phase one starts globally." },
    { day: "Day 2", time: "02:00 PM", title: "Mid-Way Ritual", desc: "Mentorship sessions and checkpoint." },
    { day: "Day 3", time: "10:00 AM", title: "The Final Seal", desc: "Project submissions and code freeze." },
    { day: "Day 3", time: "04:00 PM", title: "Ascension", desc: "Winners announced and closing ritual." },
  ];

  return (
    <section id="timeline" ref={sectionRef} className="py-24 md:py-40 px-6 md:px-12 lg:px-24 relative z-10 overflow-hidden min-h-[160vh]">
      <div ref={arrowsRef} className="absolute inset-0 pointer-events-none z-0">
        {[...Array(150)].map((_, i) => (
          <div key={i} className="astra-arrow absolute w-24 md:w-72 opacity-0 pointer-events-none">
            <svg viewBox="0 0 200 40" fill="none" className="filter drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
              <path d="M0 20 L30 12 L24 20 L30 28 Z" fill="#451a03" />
              <rect x="25" y="19" width="150" height="2" fill="#fbbf24" opacity="0.6" />
              <path d="M175 12 L195 20 L175 28 Z" fill="#fbbf24" />
            </svg>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-32">
          <h2 className="font-samarkan text-6xl md:text-9xl text-amber-500 gold-glow tracking-widest uppercase">Kaal Chakra</h2>
          <p className="font-pyriform text-amber-200/60 text-2xl md:text-3xl tracking-[0.4em] mt-8 uppercase">— CHRONICLES OF TIME —</p>
        </div>

        <div className="space-y-24 md:space-y-40 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-amber-600/40 to-transparent -translate-x-1/2 hidden md:block"></div>

          {events.map((ev, i) => (
            <div key={i} className={`flex flex-col md:flex-row gap-12 md:gap-24 items-start md:items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className={`flex-1 w-full group ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className="bg-black/90 backdrop-blur-3xl border border-amber-900/60 p-10 md:p-14 rounded-sm hover:border-amber-400 transition-all duration-700 shadow-2xl relative">
                  <span className="font-pyriform text-amber-500 font-bold uppercase tracking-[0.2em] text-sm md:text-lg mb-4 block">{ev.day} • {ev.time}</span>
                  <h3 className="font-samarkan text-3xl md:text-5xl text-amber-50 group-hover:text-amber-400 transition-colors">{ev.title}</h3>
                  <p className="font-karma text-xl md:text-3xl text-amber-100/40 mt-8 italic">{ev.desc}</p>
                </div>
              </div>
              <div className="relative z-20 flex-shrink-0">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-amber-500 bg-black flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.3)]">
                   <div className="w-6 h-6 md:w-10 md:h-10 bg-amber-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="flex-1 hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
