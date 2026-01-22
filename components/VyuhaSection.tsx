
import React from 'react';

const VyuhaSection: React.FC = () => {
  const vyuhas = [
    { title: "Padmavyuha", desc: "The Labyrinth of Logic. Forge distributed systems that withstand the chaos of time.", icon: "💠" },
    { title: "Chakravyuha", desc: "The Infinite Cycle. Master state management and recursive algorithms in the core.", icon: "☸️" },
    { title: "Garudavyuha", desc: "The Wings of Wisdom. Soar through high-performance AI and neural landscapes.", icon: "🦅" },
    { title: "Vajravyuha", desc: "The Thunderbolt Strike. Secure your fortress with impenetrable cybersecurity.", icon: "⚡" },
    { title: "Makaravyuha", desc: "The Crocodile Grip. Lock digital assets in the immutable chains of Blockchain.", icon: "🐊" },
    { title: "Suchivyuha", desc: "The Needle's Point. Pierce the veil of reality with precision IoT and Hardware.", icon: "📍" },
  ];

  return (
    <section id="community" className="py-32 px-8 md:px-24 relative z-10">
      <div className="text-center mb-20 space-y-6">
        <h2 className="font-samarkan text-4xl md:text-7xl text-amber-500 gold-glow font-black uppercase tracking-tight">Ancient Vyuhas</h2>
        <p className="font-karma text-xl md:text-2xl text-amber-100/50 max-w-2xl mx-auto italic">Strategic pathways through the digital battlefield of Dharma.</p>
        <div className="flex justify-center gap-2">
          {[...Array(5)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-amber-900"></div>)}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {vyuhas.map((vyuha, idx) => (
          <div key={idx} className="group relative hover-3d bg-black/40 border border-amber-900/30 p-10 hover:border-amber-500/50 transition-all duration-700 cursor-pointer overflow-hidden backdrop-blur-md">
            {/* Background Texture for Card */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

            <div className="text-6xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110">{vyuha.icon}</div>

            <h3 className="font-samarkan text-3xl text-amber-500 mb-5 tracking-tight group-hover:text-amber-300 transition-colors uppercase font-bold">
              {vyuha.title}
            </h3>

            <p className="font-karma text-lg text-amber-100/60 leading-relaxed font-medium">
              {vyuha.desc}
            </p>

            <div className="mt-10 pt-8 border-t border-amber-900/30 flex justify-between items-center">
              <span className="font-pyriform text-xs text-amber-700 font-black uppercase tracking-[0.3em] group-hover:text-amber-400 transition-colors">INITIATE PATH</span>
              <div className="w-8 h-[1px] bg-amber-900 group-hover:w-16 group-hover:bg-amber-400 transition-all"></div>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-amber-500">
                <path d="M24 0 L24 24 L0 24" strokeWidth="1" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VyuhaSection;
