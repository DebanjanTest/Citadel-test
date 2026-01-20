
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PersistentWheel: React.FC = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!wheelRef.current) return;

    // Initial state setup
    // Initial state setup via matchMedia
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.set(wheelRef.current, {
        scale: 1,
        opacity: 0.8,
        top: "15%",
        right: "-10%",
        left: "auto",
        xPercent: 0,
        yPercent: 0
      });
    });

    mm.add("(max-width: 768px)", () => {
      mm.add("(max-width: 768px)", () => {
        gsap.set(wheelRef.current, {
          scale: 0.8,
          opacity: 0.6, // Restore visibility
          top: "20%",
          left: "50%",
          right: "auto",
          xPercent: -50,
          yPercent: 0
        });
      });

      // Constant rotation of the main chakra
      gsap.to(".main-chakra-img", {
        rotation: 360,
        duration: 35,
        repeat: -1,
        ease: "none"
      });

      // Consistent pathing throughout the page with smoother scale transitions
      // reusing existing 'mm' instance

      mm.add("(min-width: 769px)", () => {
        // DESKTOP ANIMATION
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          }
        });

        tl.to(wheelRef.current, {
          top: "120vh",
          left: "-12%",
          scale: 1.3,
          opacity: 0.6,
          rotationY: 45,
          duration: 1.5
        })
          .to(wheelRef.current, {
            top: "220vh",
            left: "-12%",
            scale: 1.0,
            opacity: 0.4,
            rotationY: 20,
            duration: 2
          })
          .to(wheelRef.current, {
            top: "350vh",
            left: "40%",
            scale: 1.4,
            opacity: 0.75,
            rotationX: 45,
            duration: 1
          })
          .to(wheelRef.current, {
            top: "520vh",
            left: "70%",
            scale: 1.05,
            opacity: 0.9,
            rotationY: 15,
            duration: 1
          });
      });

      mm.add("(max-width: 768px)", () => {
        // MOBILE ANIMATION
        // Center the wheel or make it a subtle background element
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          }
        });

        tl.to(wheelRef.current, {
          top: "120vh",
          left: "50%",      // Center it
          xPercent: -50,    // True center
          scale: 0.8,       // Smaller
          opacity: 0.5,     // Kept visible
          rotationY: 10,
          duration: 1.5
        })
          .to(wheelRef.current, {
            top: "250vh",
            scale: 0.6,
            opacity: 0.4,   // Never too faint
            duration: 2
          })
          .to(wheelRef.current, {
            top: "380vh",
            scale: 0.9,
            opacity: 0.5,
            duration: 1
          })
          .to(wheelRef.current, {
            top: "550vh",
            scale: 0.7,
            opacity: 0.6,
            duration: 1
          });
      });

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        mm.revert(); // Clean up media query listeners
      };
    }, []);

    // Fire Particle Effect
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Resize canvas to cover the container
      const resizeObserver = new ResizeObserver(() => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      });
      resizeObserver.observe(canvas);

      class Particle {
        x: number;
        y: number;
        angle: number;
        speed: number;
        length: number;
        thickness: number;
        life: number;
        maxLife: number;

        constructor() {
          this.reset(true); // true = start random distance to pre-fill
        }

        reset(initial: boolean = false) {
          const centerX = canvas!.width / 2;
          const centerY = canvas!.height / 2;

          this.angle = Math.random() * Math.PI * 2;
          this.speed = Math.random() * 4 + 2; // Fast outward speed

          // Random start distance: if initial, anywhere; else, center
          const startDist = initial ? Math.random() * 300 : Math.random() * 50;

          this.x = centerX + Math.cos(this.angle) * startDist;
          this.y = centerY + Math.sin(this.angle) * startDist;

          this.length = Math.random() * 20 + 5;
          this.thickness = Math.random() * 2 + 0.5;

          this.life = 100;
          this.maxLife = 100;
        }

        update() {
          this.x += Math.cos(this.angle) * this.speed;
          this.y += Math.sin(this.angle) * this.speed;

          this.length += 0.5; // Stretch as it moves out
          this.life -= 1.5;

          if (this.life <= 0 ||
            this.x < -100 || this.x > canvas!.width + 100 ||
            this.y < -100 || this.y > canvas!.height + 100) {
            this.reset();
          }
        }

        draw() {
          if (!ctx) return;
          const lifeRatio = this.life / this.maxLife;

          // Coloring
          if (lifeRatio > 0.8) {
            ctx.fillStyle = `rgba(255, 255, 220, ${lifeRatio})`; // Hot White
          } else if (lifeRatio > 0.4) {
            ctx.fillStyle = `rgba(255, 160, 20, ${lifeRatio})`; // Orange
          } else {
            ctx.fillStyle = `rgba(200, 40, 0, ${lifeRatio})`; // Red
          }

          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle); // Rotate to point outward
          // Draw line centered on its coordinate
          ctx.fillRect(0, -this.thickness / 2, this.length, this.thickness);
          ctx.restore();
        }
      }

      // Additive blending for glowing fire lines
      ctx.globalCompositeOperation = 'lighter';

      const particles: Particle[] = [];
      const createParticles = () => {
        // Allow more particles for a denser fire
        if (particles.length < 600) {
          particles.push(new Particle());
        }
      };

      const animateParticles = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        createParticles();
        for (let i = 0; i < particles.length; i++) {
          // Create new particles only if the array isn't full (handled in createParticles)
          // But here we just update existing ones
          if (particles.length < 600) createParticles();
        }

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }
        requestAnimationFrame(animateParticles);
      }

      animateParticles();

      return () => resizeObserver.disconnect();
    }, []);

    return (
      <div
        ref={wheelRef}
        // Changed z-[1] to z-0 to sit behind main content, kept fixed
        className="fixed z-0 pointer-events-none w-[320px] h-[320px] md:w-[600px] md:h-[600px] flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        <div className="relative w-full h-full hover-3d" style={{ transformStyle: 'preserve-3d' }}>
          {/* Canvas for Fire Effect - Expanded to prevent clipping */}
          <canvas ref={canvasRef} className="absolute -inset-[75%] w-[250%] h-[250%] -z-10 scale-100" style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)' }} />

          <img
            src="/Wheel Glow.png"
            alt="Chakra Wheel"
            className="main-chakra-img w-full h-full object-contain filter drop-shadow-[0_0_80px_rgba(251,191,36,0.3)]"
          />
          <div className="absolute inset-0 bg-amber-600/5 blur-[120px] rounded-full -z-10 scale-95"></div>
        </div>
      </div>
    );
  };

  export default PersistentWheel;
