
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Stats: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const stats = [
        { value: 24, label: "Hours of Creation", suffix: "+" },
        { value: 500, label: "Coders assembling", suffix: "+" },
        { value: 10, label: "Universities", suffix: "+" },
        { value: 50, label: "Lakhs Prize Pool", suffix: "K+" },
    ];

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            stats.forEach((_, i) => {
                const counter = document.getElementById(`counter-${i}`);
                if (counter) {
                    gsap.from(counter, {
                        textContent: 0,
                        duration: 2.5,
                        ease: "power2.out",
                        snap: { textContent: 1 },
                        stagger: 1,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                        },
                        onUpdate: function () {
                            counter.innerHTML = Math.ceil(this.targets()[0].textContent) + (stats[i].suffix || "");
                        },
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-20 relative z-10 border-y border-amber-900/30 bg-black/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                {stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center space-y-2 group hover:transform hover:scale-105 transition-transform duration-300">
                        <div className="font-samarkan text-5xl md:text-7xl text-amber-500 gold-glow font-bold">
                            <span id={`counter-${idx}`}>{0}{stat.suffix}</span>
                        </div>
                        <div className="h-0.5 w-12 bg-amber-800 group-hover:w-24 transition-all duration-500"></div>
                        <p className="font-pyriform text-amber-100/70 text-lg md:text-xl uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
