
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
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      life: number;
      maxLife: number;

      constructor() {
        // Emitting from the center/bottom of the wheel mostly
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 80; // Spread within the wheel
        this.x = canvas!.width / 2 + Math.cos(angle) * radius;
        this.y = canvas!.height / 2 + Math.sin(angle) * radius;

        this.size = Math.random() * 12 + 5; // Larger flakes
        this.speedX = (Math.random() * 2) - 1; // Slight horizontal drift
        this.speedY = (Math.random() * -3) - 1; // Upward flow
        this.life = 100;
        this.maxLife = 100;

        // Fire palette: White (hot) -> Yellow -> Orange -> Red -> Smoke
        // We'll define base color here but can modify in draw based on life
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.life * 0.1) * 0.5; // Wobbly path
        this.life -= 2; // Burn out faster
        if (this.size > 0.2) this.size -= 0.2;
      }

      draw() {
        if (!ctx) return;
        const lifeRatio = this.life / this.maxLife;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        // Dynamic color based on life
        if (lifeRatio > 0.8) {
          ctx.fillStyle = `rgba(255, 255, 200, ${lifeRatio})`; // White/Yellow hot
        } else if (lifeRatio > 0.5) {
          ctx.fillStyle = `rgba(255, 160, 0, ${lifeRatio})`; // Orange
        } else {
          ctx.fillStyle = `rgba(255, 69, 0, ${lifeRatio})`; // Red
        }

        ctx.fill();
      }
    }

    // Additive blending for glowing fire effect
    ctx.globalCompositeOperation = 'lighter';

    const particles: Particle[] = [];
    const createParticles = () => {
      // Create multiple particles per frame for density
      for (let i = 0; i < 3; i++) {
        if (particles.length < 400) {
          particles.push(new Particle());
        }
      }
    };

    const animateParticles = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      createParticles();
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0 || particles[i].size <= 0) {
          particles.splice(i, 1);
          i--;
        }
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
          src="/Wheel.png"
          alt="Chakra Wheel"
          className="main-chakra-img w-full h-full object-contain filter drop-shadow-[0_0_80px_rgba(251,191,36,0.3)]"
        />
        <div className="absolute inset-0 bg-amber-600/5 blur-[120px] rounded-full -z-10 scale-95"></div>
      </div>
    </div>
  );
};

export default PersistentWheel;
