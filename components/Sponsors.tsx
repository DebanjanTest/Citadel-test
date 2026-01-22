
import React from 'react';

const Sponsors: React.FC = () => {
    const patronTiers = [
        {
            title: "Samrat (Title Sponsors)",
            height: "h-32 md:h-48",
            items: [1] // Placeholder count
        },
        {
            title: "Maharaja (Gold Sponsors)",
            height: "h-24 md:h-32",
            items: [1, 2]
        },
        {
            title: "Raja (Silver Sponsors)",
            height: "h-20 md:h-24",
            items: [1, 2, 3]
        }
    ];

    return (
        <section id="sponsors" className="py-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto text-center space-y-20">

                <div className="mb-16">
                    <h2 className="font-samarkan text-5xl md:text-8xl text-amber-500 gold-glow mb-4">Royal Patrons</h2>
                    <p className="font-pyriform text-xl text-amber-200/50 uppercase tracking-[0.3em]">Allies in the Dharma of Code</p>
                </div>

                {patronTiers.map((tier, idx) => (
                    <div key={idx} className="space-y-8">
                        <h3 className="font-karma text-2xl md:text-3xl text-amber-100/40 uppercase tracking-widest border-b border-amber-900/30 inline-block pb-2 px-8">{tier.title}</h3>

                        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                            {tier.items.map((item) => (
                                <div key={item} className={`${tier.height} w-full max-w-[200px] md:max-w-[300px] bg-white/5 backdrop-blur-sm border border-amber-900/40 rounded-lg flex items-center justify-center hover:border-amber-500/50 hover:bg-white/10 transition-all duration-300 group cursor-pointer`}>
                                    <span className="font-samarkan text-amber-800 group-hover:text-amber-500 transition-colors text-2xl opacity-50 group-hover:opacity-100">Sponsor Logo</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="mt-24 p-10 border border-amber-900/30 bg-amber-900/5 rounded-xl max-w-4xl mx-auto backdrop-blur-md">
                    <h3 className="font-pyriform text-2xl text-amber-400 mb-4 uppercase tracking-widest">Become an Ally</h3>
                    <p className="font-karma text-amber-200/70 mb-8 max-w-2xl mx-auto">Join forces with the Citadel. Support the next generation of digital warriors.</p>
                    <button className="px-8 py-3 bg-amber-600/20 hover:bg-amber-600 text-amber-500 hover:text-black border border-amber-600 transition-all font-pyriform uppercase tracking-widest font-bold rounded">
                        Download Prospectus
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Sponsors;
