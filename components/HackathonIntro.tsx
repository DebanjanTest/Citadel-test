import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HackathonIntro: React.FC = () => {
    useEffect(() => {
        gsap.fromTo(".hackathon-text",
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".hackathon-section",
                    start: "top 85%", // Starts earlier
                    end: "top 40%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    return (
        <section className="hackathon-section relative w-full pt-32 pb-6 px-6 flex justify-center items-center z-20 overflow-hidden">
            {/* Background Luminance/Shadow */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="w-[120%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.8)_0%,transparent_70%)] blur-xl"></div>
            </div>

            <div className="max-w-4xl text-center relative z-10 p-8 rounded-xl backdrop-blur-[2px]">
                <p className="hackathon-text text-xl md:text-3xl lg:text-4xl font-pyriform text-amber-100/90 leading-relaxed tracking-wide drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    A convergence of minds and machines. <br />
                    <span className="text-amber-500 font-bold glow-text">Citadel 1.0</span> is not just a hackathon;
                    it is a 36-hour ascension into the realm of pure code.
                    Step into the arena where legends are forged and digital reality is rewritten.
                </p>
            </div>
        </section>
    );
};

export default HackathonIntro;
