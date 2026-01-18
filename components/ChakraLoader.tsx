
import React from 'react';

const ChakraLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]">
      <div className="absolute inset-0 opacity-[0.05] jaali-pattern" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='%23fbbf24'/%3E%3C/svg%3E")` }}></div>

      <div className="relative w-64 h-64 md:w-96 md:h-96">
        {/* Intricate Loading Chakra */}
        <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_30px_rgba(251,191,36,0.7)]">
            <defs>
              <linearGradient id="loadGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#92400e" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="none" stroke="url(#loadGold)" strokeWidth="1.5" strokeDasharray="3 3" />
            
            {[...Array(16)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 22.5} 50 50)`}>
                <path d="M49 5 L51 5 L51 40 L49 40 Z" fill="url(#loadGold)" />
                <circle cx="50" cy="6" r="1.5" fill="#fff" />
              </g>
            ))}
            
            <circle cx="50" cy="50" r="18" fill="url(#loadGold)" />
            <circle cx="50" cy="50" r="12" fill="#050505" />
            <path d="M50 44 Q56 50 50 56 Q44 50 50 44" fill="#fbbf24" className="animate-pulse" />
          </svg>
        </div>
      </div>
      
      <div className="mt-20 text-center space-y-8 relative z-10">
        <h2 className="font-samarkan text-5xl md:text-7xl text-amber-500 tracking-wider font-bold gold-glow animate-pulse">
          CITADEL 1.0
        </h2>
        <p className="font-pyriform text-amber-200/50 text-xl tracking-[0.4em] uppercase font-bold">
          Aligning Universal Logic...
        </p>
        <div className="w-64 h-[2px] bg-amber-900/40 mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-amber-500 animate-[loadProgress_3s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <style>{`
        @keyframes loadProgress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ChakraLoader;
