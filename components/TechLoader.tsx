import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const TechLoader: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const glitchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial Black Screen & Grid Fade In
            gsap.to(".grid-bg", { opacity: 0.15, duration: 1 });

            // 2. Central Reactor Spin (Chakra Tech)
            // Note: We use the class names defined in the SVG below
            gsap.to(".chakra-spin-1", { rotation: 360, transformOrigin: "center", duration: 20, repeat: -1, ease: "linear" });
            gsap.to(".chakra-spin-2", { rotation: -360, transformOrigin: "center", duration: 25, repeat: -1, ease: "linear" });
            gsap.to(".chakra-spin-3", { rotation: 180, transformOrigin: "center", duration: 15, repeat: -1, ease: "linear" });
            gsap.to(".chakra-pulser", { scale: 1.1, transformOrigin: "center", opacity: 0.8, duration: 1.5, yoyo: true, repeat: -1, ease: "sine.inOut" });

            // 3. Typing Effect for "System Booting"
            const tl = gsap.timeline();
            tl.to(textRef.current, {
                text: {
                    value: "SYSTEM_DHARMA_INIT...",
                    delimiter: ""
                },
                duration: 1.5,
                ease: "none"
            })
                .to(textRef.current, {
                    text: { value: "ALIGNING_CHAKRAS... [||||||||||]" },
                    duration: 1,
                    delay: 0.5
                })
                .to(textRef.current, {
                    text: { value: "ESTABLISHING_CITADEL_UPLINK..." },
                    duration: 1,
                    delay: 0.5
                });

            // 4. Progress Bar Fill
            gsap.to(progressRef.current, {
                width: "100%",
                duration: 3.5,
                ease: "power2.inOut"
            });

            // 5. Glitch Effect on Title
            const glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 3 });
            glitchTimeline
                .to(glitchRef.current, { skewX: 20, color: "#f59e0b", duration: 0.1, ease: "power4.inOut" })
                .to(glitchRef.current, { skewX: -20, color: "#fff", duration: 0.1, ease: "power4.inOut" })
                .to(glitchRef.current, { skewX: 0, duration: 0.1, ease: "power4.inOut" })
                .to(glitchRef.current, { opacity: 0.8, textShadow: "0 0 20px #fbbf24", duration: 0.05, yoyo: true, repeat: 3 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-mono text-amber-500 selection:bg-amber-500 selection:text-black">

            {/* Background Grid - Gold/Amber */}
            <div className="grid-bg absolute inset-0 opacity-0 bg-[linear-gradient(rgba(245,158,11,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 p-8 border-l-2 border-t-2 border-amber-500/50 w-24 h-24"></div>
            <div className="absolute top-0 right-0 p-8 border-r-2 border-t-2 border-amber-500/50 w-24 h-24"></div>
            <div className="absolute bottom-0 left-0 p-8 border-l-2 border-b-2 border-amber-500/50 w-24 h-24"></div>
            <div className="absolute bottom-0 right-0 p-8 border-r-2 border-b-2 border-amber-500/50 w-24 h-24"></div>

            {/* Central Viz - Intricate Tech Chakra SVG */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center mb-16">

                {/* SVG Container for complex geometry */}
                <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
                    <defs>
                        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Outer Static Ring */}
                    <circle cx="200" cy="200" r="190" fill="none" stroke="#b45309" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />

                    {/* Rotating Ring 1 (Complex Mandala) */}
                    <g className="chakra-spin-1">
                        <circle cx="200" cy="200" r="170" fill="none" stroke="#d97706" strokeWidth="1" strokeOpacity="0.5" />
                        {[...Array(8)].map((_, i) => (
                            <path key={`path-${i}`} d={`M200 30 L200 50`} stroke="#fbbf24" strokeWidth="2" transform={`rotate(${i * 45} 200 200)`} />
                        ))}
                        {[...Array(24)].map((_, i) => (
                            <rect key={`rect-${i}`} x="198" y="32" width="4" height="8" fill="#fbbf24" fillOpacity="0.6" transform={`rotate(${i * 15} 200 200)`} />
                        ))}
                    </g>

                    {/* Rotating Ring 2 (Tech Segments) */}
                    <g className="chakra-spin-2">
                        <circle cx="200" cy="200" r="130" fill="none" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="20 10" />
                        {[...Array(3)].map((_, i) => (
                            <circle key={`c-${i}`} cx="200" cy="70" r="4" fill="#fbbf24" transform={`rotate(${i * 120} 200 200)`} />
                        ))}
                    </g>

                    {/* Rotating Ring 3 (Inner Geometry) */}
                    <g className="chakra-spin-3">
                        <rect x="160" y="160" width="80" height="80" fill="none" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.6" />
                        <rect x="160" y="160" width="80" height="80" fill="none" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.6" transform="rotate(45 200 200)" />
                    </g>

                    {/* Core Pulser */}
                    <circle className="chakra-pulser" cx="200" cy="200" r="30" fill="url(#goldGlow)" />
                    <circle cx="200" cy="200" r="10" fill="#fbbf24" />
                </svg>

                {/* Core Jewel Overlay (React Div for glow effect) */}
                <div className="absolute w-24 h-24 rounded-full flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full bg-amber-500/10 rounded-full animate-pulse shadow-[0_0_40px_rgba(245,158,11,0.4)]"></div>
                </div>
            </div>

            {/* Text Info */}
            <div className="z-10 text-center space-y-6">
                <h1 ref={glitchRef} className="text-6xl md:text-8xl font-bold tracking-[0.2em] text-amber-50 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] font-['Cinzel'] md:font-mono">
                    CITADEL
                </h1>

                <div className="h-8 overflow-hidden">
                    <p ref={textRef} className="text-lg md:text-xl text-amber-400 tracking-[0.3em] font-bold">INITIALIZING...</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-16 w-64 md:w-96 h-1 bg-amber-900/30">
                <div ref={progressRef} className="h-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,1)] w-0 relative rounded-full"></div>
                <div className="flex justify-between mt-2 text-[10px] text-amber-700 font-mono tracking-widest">
                    <span>SYS.01</span>
                    <span>V.1.0</span>
                    <span>CONN.SECURE</span>
                </div>
            </div>


        </div>
    );
};

export default TechLoader;
