
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-24 px-8 border-t border-amber-900/40 bg-[#050505] relative z-30 text-center overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        <div className="font-samarkan text-4xl md:text-8xl text-amber-500 font-black tracking-tight gold-glow uppercase">
          CITADEL 1.0
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {['Twitter', 'Discord', 'Github', 'Instagram'].map(link => (
            <a key={link} href="#" className="font-pyriform text-amber-100/30 hover:text-amber-400 transition-all uppercase tracking-[0.4em] text-xs md:text-base font-bold border-b border-transparent hover:border-amber-400 pb-2">
              {link}
            </a>
          ))}
        </div>

        <div className="font-karma text-amber-100/40 text-sm md:text-xl leading-relaxed max-w-3xl mx-auto italic font-medium">
          &copy; 2024 THE CITADEL HACKATHON. FORGED IN THE CRUCIBLE OF SACRED LOGIC. <br className="hidden md:block" />
          DESIGNED FOR THOSE WHO SEEK THE DIGITAL DHARMA IN THE KALI YUGA OF TECH.
        </div>

        <div className="pt-8">
          <div className="font-samarkan text-amber-900/20 text-6xl md:text-[10rem] select-none uppercase font-black pointer-events-none tracking-tight">
            ॐ CITADEL ॐ
          </div>
        </div>
      </div>

      {/* Ornamental Tech Corner Detail */}
      <div className="absolute bottom-10 right-10 w-24 h-24 text-amber-600/5 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M0 0 L100 0 L100 100 Z" />
          <circle cx="70" cy="30" r="10" fill="black" />
        </svg>
      </div>
      <div className="absolute bottom-10 left-10 w-24 h-24 text-amber-600/5 pointer-events-none transform rotate-90">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M0 0 L100 0 L100 100 Z" />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
