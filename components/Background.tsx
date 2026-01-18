
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      {/* Layer 1: Moving Color Aura (Deep, shifting adjacent colors) */}
      <div className="absolute inset-[-20%] aura-layer opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_#451a03_0%,_transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_30%,_#78350f_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_80%,_#b45309_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,_#451a03_0%,_transparent_50%)]"></div>
      </div>
      
      {/* Layer 2: Complex 'Jaali' Mythological Repetitive Pattern Layer */}
      <div 
        className="absolute inset-0 jaali-pattern opacity-[0.2]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.5' fill-rule='evenodd'%3E%3Cpath d='M60 0 L120 60 L60 120 L0 60 Z M60 15 L105 60 L60 105 L15 60 Z M60 35 L85 60 L60 85 L35 60 Z'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='120' cy='0' r='2'/%3E%3Ccircle cx='0' cy='120' r='2'/%3E%3Ccircle cx='120' cy='120' r='2'/%3E%3Ccircle cx='60' cy='60' r='4'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px'
        }}
      />

      {/* Layer 3: Modern Tech Grid Layer for scalability aesthetic */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Layer 4: Vignette to pull focus to content */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.85)_100%)]"></div>
    </div>
  );
};

export default Background;
