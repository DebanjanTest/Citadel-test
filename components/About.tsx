
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(".about-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 60,
        stagger: 0.3,
        duration: 1.5,
        ease: "power3.out"
      });
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden border-y border-amber-900/20 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
        <div className="about-item space-y-8">
          <div className="space-y-4">
            <h2 className="font-samarkan text-4xl md:text-7xl text-amber-500 gold-glow leading-tight font-black uppercase tracking-wider">
              The Legend <br/><span className="text-amber-100/40 text-2xl md:text-3xl font-light">of Citadel</span>
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-amber-600 to-transparent"></div>
          </div>
          
          <p className="font-karma text-xl md:text-3xl text-amber-100/70 leading-relaxed italic font-medium">
            "In the confluence of ancient wisdom and futuristic logic, CITADEL 1.0 emerges as the crucible for modern sages. We summon the architects of the digital age to decode the dharma of computation."
          </p>

          <div className="grid sm:grid-cols-2 gap-6 pt-6">
            <div className="border border-amber-900/40 bg-amber-950/20 p-8 rounded-sm hover:border-amber-500/60 transition-all group backdrop-blur-lg">
              <h4 className="font-samarkan text-amber-500 font-black text-3xl mb-1 group-hover:gold-glow">48 PRAHARAS</h4>
              <p className="font-pyriform text-[10px] uppercase tracking-[0.4em] text-amber-200/40 font-bold">continuous creation</p>
            </div>
            <div className="border border-amber-900/40 bg-amber-950/20 p-8 rounded-sm hover:border-amber-500/60 transition-all group backdrop-blur-lg">
              <h4 className="font-samarkan text-amber-500 font-black text-3xl mb-1 group-hover:gold-glow">500+ RISHIS</h4>
              <p className="font-pyriform text-[10px] uppercase tracking-[0.4em] text-amber-200/40 font-bold">global intelligence</p>
            </div>
          </div>
        </div>

        <div className="about-item relative flex justify-center lg:justify-end">
          <div className="relative hover-3d w-full max-w-lg aspect-[3/4] border border-amber-500/20 p-3 bg-black/60 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-amber-500/10 z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1544391682-445027ff0c53?auto=format&fit=crop&q=80&w=800" 
              alt="Ancient Temple" 
              className="w-full h-full object-cover grayscale opacity-50 mix-blend-luminosity hover:grayscale-0 hover:opacity-80 transition-all duration-1000"
            />
            {/* Sacred Geometry Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div className="w-[150%] h-[150%] border-[0.5px] border-amber-500/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute w-[80%] h-[80%] border-[0.5px] border-amber-500/10 rotate-45"></div>
            </div>
            {/* Traditional Corner Icons */}
            <div className="absolute -top-4 -left-4 text-amber-600 text-3xl">☸</div>
            <div className="absolute -bottom-4 -right-4 text-amber-600 text-3xl">☸</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
