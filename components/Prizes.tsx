
import React from 'react';

const Prizes: React.FC = () => {
  const prizes = [
    { rank: "Silver Ratna", value: "$2,000", perk: "Tier 2 Access", color: "text-slate-400" },
    { rank: "Gold Ratna", value: "$5,000", perk: "Incubation Support", color: "text-amber-400" },
    { rank: "Bronze Ratna", value: "$1,000", perk: "Merchandise Kit", color: "text-orange-800" },
  ];

  return (
    <section id="prizes" className="py-24 md:py-32 px-6 md:px-24 bg-black/20">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="font-samarkan text-4xl md:text-7xl lg:text-8xl text-amber-500 gold-glow tracking-widest uppercase">Divine Ratnas</h2>
        <p className="font-pyriform text-amber-100/40 text-lg md:text-2xl mt-4 uppercase">— REWARDS FOR THE ENLIGHTENED —</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-stretch md:items-end gap-6 md:gap-8 max-w-6xl mx-auto">
        {/* Silver */}
        <div className="flex-1 hover-3d p-8 bg-amber-900/5 border border-amber-900/20 text-center flex flex-col justify-center order-2 md:order-1 group hover:border-amber-400 transition-all min-h-[250px] md:h-[300px]">
          <h3 className={`font-samarkan text-2xl ${prizes[0].color} tracking-wider`}>{prizes[0].rank}</h3>
          <div className="font-pyriform text-3xl md:text-4xl font-bold my-4 text-white tracking-widest">{prizes[0].value}</div>
          <p className="font-pyriform text-xs md:text-sm text-amber-100/30 uppercase tracking-[0.3em]">{prizes[0].perk}</p>
        </div>
        
        {/* Gold */}
        <div className="flex-1 hover-3d p-8 md:p-12 bg-amber-600/10 border-2 border-amber-500 text-center flex flex-col justify-center order-1 md:order-2 relative z-20 md:transform md:scale-110 shadow-[0_0_50px_rgba(217,119,6,0.3)] min-h-[300px] md:h-[400px]">
          <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 md:px-6 py-1 font-bold font-pyriform text-[10px] md:text-xs uppercase tracking-[0.4em] whitespace-nowrap">ULTIMATE SEAL</div>
          <h3 className={`font-samarkan text-3xl md:text-4xl ${prizes[1].color} tracking-widest`}>{prizes[1].rank}</h3>
          <div className="font-pyriform text-5xl md:text-6xl font-black my-4 md:my-6 text-white gold-glow tracking-widest">{prizes[1].value}</div>
          <p className="font-pyriform text-xs md:text-sm text-amber-200 uppercase tracking-[0.4em] font-bold">{prizes[1].perk}</p>
        </div>

        {/* Bronze */}
        <div className="flex-1 hover-3d p-8 bg-amber-900/5 border border-amber-900/20 text-center flex flex-col justify-center order-3 group hover:border-amber-800 transition-all min-h-[250px] md:h-[300px]">
          <h3 className={`font-samarkan text-2xl ${prizes[2].color} tracking-wider`}>{prizes[2].rank}</h3>
          <div className="font-pyriform text-3xl md:text-4xl font-bold my-4 text-white tracking-widest">{prizes[2].value}</div>
          <p className="font-pyriform text-xs md:text-sm text-amber-100/30 uppercase tracking-[0.3em]">{prizes[2].perk}</p>
        </div>
      </div>
    </section>
  );
};

export default Prizes;
