
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PersistentWheel: React.FC = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!wheelRef.current) return;

    // Initial state setup
    gsap.set(wheelRef.current, {
      scale: 1,
      opacity: 0.8, // Increased visibility
      top: "15%",
      right: "-10%",
      xPercent: 0,
      yPercent: 0
    });

    // Constant rotation of the main chakra
    gsap.to(".main-chakra-img", {
      rotation: 360,
      duration: 35,
      repeat: -1,
      ease: "none"
    });

    // Consistent pathing throughout the page with smoother scale transitions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Reduced scrub for more direct but smooth response
      }
    });

    tl.to(wheelRef.current, {
      top: "100vh",
      left: "10%",
      scale: 1.15,
      opacity: 0.9,
      rotationY: 30,
      duration: 1
    })
      .to(wheelRef.current, {
        top: "220vh",
        left: "80%",
        scale: 0.95,
        opacity: 0.85,
        rotationY: -30,
        duration: 1
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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
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
        {/* Canvas for Fire Effect */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />

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
