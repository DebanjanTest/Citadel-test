
import React from 'react';

const FAQ: React.FC = () => {
  const faqs = [
    { q: "Who can participate?", a: "Seekers of all levels! From novices to masters of the stack." },
    { q: "What is the team size?", a: "A band of 2 to 4 developers is recommended." },
    { q: "Is it remote?", a: "Yes, the Citadel is a distributed fortress. Participate from anywhere." },
    { q: "Registration fee?", a: "Knowledge is free. Participation is priceless. (Free of cost)." },
  ];

  return (
    <section id="faq" className="py-32 px-8 md:px-24 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-samarkan text-4xl md:text-6xl text-amber-500 gold-glow mb-16 text-center tracking-tight uppercase">Sacred Sutras</h2>
        <div className="grid gap-8">
          {faqs.map((f, i) => (
            <div key={i} className="group border border-amber-900/30 p-8 md:p-10 hover:bg-amber-900/10 transition-all hover:border-amber-500/50 backdrop-blur-md">
              <h4 className="font-samarkan text-2xl text-amber-400 mb-4 group-hover:text-amber-300 transition-colors uppercase tracking-tight">{f.q}</h4>
              <p className="font-karma text-lg text-amber-100/50 leading-relaxed font-medium italic">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
