import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const TechLoader: React.FC = ({ onComplete }: { onComplete?: () => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const glitchRef = useRef<HTMLDivElement>(null);
    const chakraRef = useRef<HTMLDivElement>(null);

    // Audio Context Refs
    const audioCtxRef = useRef<AudioContext | null>(null);
    const masterGainRef = useRef<GainNode | null>(null);

    // Audio Initialization
    const initAudio = async () => {
        // Preload Critical Images
        const preloadImages = [
            "/Wheel Glow.png",
            "/Arrow.png"
        ];
        preloadImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        if (!audioCtxRef.current) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            audioCtxRef.current = new AudioContextClass();
            masterGainRef.current = audioCtxRef.current.createGain();
            masterGainRef.current.connect(audioCtxRef.current.destination);
            masterGainRef.current.gain.setValueAtTime(0.5, audioCtxRef.current.currentTime); // Increased Volume
        }

        if (audioCtxRef.current.state === 'suspended') {
            try {
                await audioCtxRef.current.resume();
                console.log("AudioContext resumed successfully");
            } catch (err) {
                console.error("Failed to resume AudioContext:", err);
            }
        }
    };

    // Sound Generators - Dark/Serious Edition

    // 1. Dark Ambient Drone (FM Synthesis)
    const playDrone = () => {
        if (!audioCtxRef.current || !masterGainRef.current) return;
        const ctx = audioCtxRef.current;

        // Carrier (Deep Low End)
        const carrierOsc = ctx.createOscillator();
        carrierOsc.type = 'sine';
        carrierOsc.frequency.setValueAtTime(40, ctx.currentTime); // Deep sub-bass

        // Modulator (Throbbing effect)
        const modOsc = ctx.createOscillator();
        modOsc.type = 'sine';
        modOsc.frequency.setValueAtTime(0.2, ctx.currentTime); // Slow throb (0.2Hz)

        const modGain = ctx.createGain();
        modGain.gain.setValueAtTime(50, ctx.currentTime); // Modulation depth

        // Wiring FM
        modOsc.connect(modGain);
        modGain.connect(carrierOsc.frequency);

        // Noise Layer for "Grit"
        const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(400, ctx.currentTime); // Muffled static

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.05, ctx.currentTime);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);

        // Master connect for drone
        const droneGain = ctx.createGain();
        droneGain.gain.setValueAtTime(0, ctx.currentTime);
        droneGain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 3);

        carrierOsc.connect(droneGain);
        noiseGain.connect(droneGain);
        droneGain.connect(masterGainRef.current);

        carrierOsc.start();
        modOsc.start();
        noise.start();

        return { osc: carrierOsc, mod: modOsc, noise: noise, gain: droneGain };
    };

    // 2. Static/Data Glitch (White Noise Bursts)
    const playGlitchSound = () => {
        if (!audioCtxRef.current || !masterGainRef.current) return;
        const ctx = audioCtxRef.current;

        // Create noise buffer on the fly (short)
        const bufferSize = ctx.sampleRate * 0.1;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, ctx.currentTime); // Thin, crisp static

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainRef.current);

        noise.start();
    };

    // 3. Mechanical Turbine Charge (Rhythmic Buildup)
    const playPowerUp = (duration: number) => {
        if (!audioCtxRef.current || !masterGainRef.current) return;
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        const mainGain = ctx.createGain();
        mainGain.connect(masterGainRef.current);
        mainGain.gain.setValueAtTime(0, now);
        mainGain.gain.linearRampToValueAtTime(0.5, now + duration);
        mainGain.gain.linearRampToValueAtTime(0, now + duration + 0.5);

        // 1. The "Rotor" (Chopped Noise)
        // Create noise
        const bufferSize = ctx.sampleRate * duration;
        const rotorBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = rotorBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const rotor = ctx.createBufferSource();
        rotor.buffer = rotorBuffer;

        // Filter noise to be heavy
        const rotorFilter = ctx.createBiquadFilter();
        rotorFilter.type = 'lowpass';
        rotorFilter.frequency.setValueAtTime(100, now);
        rotorFilter.frequency.exponentialRampToValueAtTime(800, now + duration);

        // Create LFO for the "Chopping" effect (AM Synthesis)
        const lfo = ctx.createOscillator();
        lfo.type = 'square';
        lfo.frequency.setValueAtTime(8, now); // Starts at 8Hz (idling)
        lfo.frequency.exponentialRampToValueAtTime(60, now + duration); // Speeds up to 60Hz (hum)

        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 1; // Full modulation

        // Connect LFO to rotor gain
        const rotorGain = ctx.createGain();
        rotorGain.gain.value = 0; // Base gain is 0, modulated by LFO

        // Handling AM Logic: 
        // We want the noise to turn ON/OFF based on LFO.
        // Web Audio LFO connects to AudioParam. 
        // To make it chop clearly, we use a constant node + LFO? 
        // Simpler approach: Just connect LFO to Gain. Gain goes -1 to 1. We just want 0 to 1.
        // So we offset it.

        // Actually, simplest "Engine" sound is just a Sawtooth rising in pitch + Noise.
        // Let's do a reliable "Tesla Charge" instead of complex AM which can be buggy if not careful.

        // REVISED STRATEGY: Tesla Charge
        // 1. High Pitch Whine (Sine)
        const whine = ctx.createOscillator();
        whine.type = 'sine';
        whine.frequency.setValueAtTime(200, now);
        whine.frequency.exponentialRampToValueAtTime(3000, now + duration);

        const whineGain = ctx.createGain();
        whineGain.gain.setValueAtTime(0, now);
        whineGain.gain.linearRampToValueAtTime(0.2, now + duration);

        whine.connect(whineGain);
        whineGain.connect(mainGain);
        whine.start();
        whine.stop(now + duration + 0.5);

        // 2. Low Energy Rumble (Sawtooth + Lowpass)
        const rumble = ctx.createOscillator();
        rumble.type = 'sawtooth';
        rumble.frequency.setValueAtTime(40, now);
        rumble.frequency.linearRampToValueAtTime(150, now + duration); // Rises slightly

        const rumbleFilter = ctx.createBiquadFilter();
        rumbleFilter.type = 'lowpass';
        rumbleFilter.frequency.setValueAtTime(100, now);
        rumbleFilter.frequency.linearRampToValueAtTime(1000, now + duration); // Opens up

        const rumbleGain = ctx.createGain();
        rumbleGain.gain.setValueAtTime(0, now);
        rumbleGain.gain.linearRampToValueAtTime(0.3, now + duration);

        rumble.connect(rumbleFilter);
        rumbleFilter.connect(rumbleGain);
        rumbleGain.connect(mainGain);
        rumble.start();
        rumble.stop(now + duration + 0.5);

        // 3. The "Pulse" (Square wave LFO effect manually simulated with a beat)
        // Just a simple beating wave
        const beat = ctx.createOscillator();
        beat.type = 'square';
        beat.frequency.setValueAtTime(50, now);
        beat.frequency.linearRampToValueAtTime(55, now + duration); // Beat frequency against rumble
        // This is subtle interference

        const beatGain = ctx.createGain();
        beatGain.gain.value = 0.05;
        beat.connect(beatGain);
        beatGain.connect(mainGain);
        beat.start();
        beat.stop(now + duration + 0.5);
    };

    useEffect(() => {
        // Attempt to initialize audio on mount (may be blocked by browser policy)
        // We'll also attach a one-time click listener to the window just in case user clicks early
        const startAudio = async () => {
            await initAudio();
            if (audioCtxRef.current?.state === 'running') {
                window.removeEventListener('click', startAudio);
                window.removeEventListener('keydown', startAudio);
                window.removeEventListener('mousemove', startAudio);
            }
        };
        window.addEventListener('click', startAudio);
        window.addEventListener('keydown', startAudio);
        window.addEventListener('mousemove', startAudio);

        // Try auto-start immediately
        initAudio().catch(e => console.log("Auto-start failed:", e));

        let droneNodes: { osc: OscillatorNode; gain: GainNode } | undefined;

        const ctx = gsap.context(() => {
            // Start Drone
            setTimeout(() => {
                droneNodes = playDrone();
            }, 500);

            // 1. Initial Black Screen & Grid Fade In
            gsap.to(".grid-bg", { opacity: 0.15, duration: 1 });

            // 2. Central Reactor Spin (Chakra Tech)
            gsap.to(".chakra-spin-1", { rotation: 360, transformOrigin: "center", duration: 20, repeat: -1, ease: "linear" });
            gsap.to(".chakra-spin-2", { rotation: -360, transformOrigin: "center", duration: 25, repeat: -1, ease: "linear" });
            gsap.to(".chakra-spin-3", { rotation: 180, transformOrigin: "center", duration: 15, repeat: -1, ease: "linear" });
            gsap.to(".chakra-pulser", { scale: 1.1, transformOrigin: "center", opacity: 0.8, duration: 1.5, yoyo: true, repeat: -1, ease: "sine.inOut" });

            // 3. Typing Effect
            const tl = gsap.timeline();
            tl.to(textRef.current, {
                text: { value: "SYSTEM_DHARMA_INIT...", delimiter: "" },
                duration: 1.5,
                ease: "none",
                onUpdate: () => {
                    // Play glitch sound occasionally during typing
                    if (Math.random() > 0.8) playGlitchSound();
                }
            })
                .to(textRef.current, {
                    text: { value: "ALIGNING_CHAKRAS... [||||||||||]" },
                    duration: 1,
                    delay: 0.5,
                    onStart: () => playGlitchSound()
                })
                .to(textRef.current, {
                    text: { value: "ESTABLISHING_CITADEL_UPLINK..." },
                    duration: 1,
                    delay: 0.5,
                    onStart: () => playGlitchSound()
                });

            // 4. Progress Bar Fill & Power Up Sound
            gsap.to(progressRef.current, {
                width: "100%",
                duration: 3.5,
                ease: "power2.inOut",
                onStart: () => playPowerUp(3.5)
            });

            // 5. Glitch Effect on Title
            const glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 3 });
            glitchTimeline
                .to(glitchRef.current, { skewX: 20, color: "#f59e0b", duration: 0.1, ease: "power4.inOut", onStart: playGlitchSound })
                .to(glitchRef.current, { skewX: -20, color: "#fff", duration: 0.1, ease: "power4.inOut" })
                .to(glitchRef.current, { skewX: 0, duration: 0.1, ease: "power4.inOut" })
                .to(glitchRef.current, { opacity: 0.8, textShadow: "0 0 20px #fbbf24", duration: 0.05, yoyo: true, repeat: 3 });

            // 6. Exit Sequence
            const exitTl = gsap.timeline({
                delay: 4.5,
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            // Fade out drone
            exitTl.call(() => {
                if (droneNodes && audioCtxRef.current) {
                    // droneNodes is now { osc, mod, noise, gain }
                    // We just fade the gain and stop the sources
                    droneNodes.gain.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);

                    const stopTime = audioCtxRef.current.currentTime + 1;
                    droneNodes.osc.stop(stopTime);
                    if ((droneNodes as any).mod) (droneNodes as any).mod.stop(stopTime);
                    if ((droneNodes as any).noise) (droneNodes as any).noise.stop(stopTime);
                }
            }, undefined, "start");

            exitTl.to([".grid-bg", textRef.current, progressRef.current, glitchRef.current, ".text-center"], {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            }, "start");

            exitTl.to(containerRef.current, {
                backgroundColor: "transparent",
                duration: 1,
                ease: "power2.inOut"
            }, "start");

            const mm = gsap.matchMedia();
            mm.add("(min-width: 769px)", () => {
                exitTl.to(chakraRef.current, {
                    top: "15%", left: "auto", right: "-10%", x: 0, y: 0,
                    width: "600px", height: "600px", position: "fixed",
                    duration: 1.5, ease: "power3.inOut"
                }, "start+=0.5");
            });

            mm.add("(max-width: 768px)", () => {
                exitTl.to(chakraRef.current, {
                    top: "20%", left: "50%", xPercent: -50, right: "auto",
                    width: "320px", height: "320px", position: "fixed",
                    duration: 1.5, ease: "power3.inOut"
                }, "start+=0.5");
            });

            exitTl.to(chakraRef.current, { opacity: 0, duration: 0.5 }, "-=0.2");
        }, containerRef);

        return () => {
            ctx.revert();
            if (audioCtxRef.current) {
                audioCtxRef.current.close();
            }
            window.removeEventListener('click', startAudio);
            window.removeEventListener('keydown', startAudio);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-mono text-amber-500 selection:bg-amber-500 selection:text-black">
            {/* Click overlap to encourage audio start if blocked */}
            <div className="absolute inset-0 z-50 cursor-pointer" onClick={initAudio} style={{ pointerEvents: 'none' }}></div>

            {/* Background Grid - Gold/Amber */}
            <div className="grid-bg absolute inset-0 opacity-0 bg-[linear-gradient(rgba(245,158,11,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 p-8 border-l-2 border-t-2 border-amber-500/50 w-24 h-24"></div>
            <div className="absolute top-0 right-0 p-8 border-r-2 border-t-2 border-amber-500/50 w-24 h-24"></div>
            <div className="absolute bottom-0 left-0 p-8 border-l-2 border-b-2 border-amber-500/50 w-24 h-24"></div>
            <div className="absolute bottom-0 right-0 p-8 border-r-2 border-b-2 border-amber-500/50 w-24 h-24"></div>

            {/* Central Viz - Intricate Tech Chakra SVG */}
            <div ref={chakraRef} className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center mb-16 z-20">

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
                <h1 ref={glitchRef} className="text-6xl md:text-8xl font-bold tracking-tight text-amber-50 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] font-samarkan">
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
