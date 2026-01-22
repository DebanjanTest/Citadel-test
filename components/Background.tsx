
import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particleCount = Math.floor(window.innerWidth / 15); // Density based on width
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${p.opacity})`; // Gold color
        ctx.fill();

        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createParticles();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#050505]">
      {/* Layer 1: Moving Color Aura (Deep, shifting adjacent colors) */}
      <div className="absolute inset-[-20%] aura-layer opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_#451a03_0%,_transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_30%,_#78350f_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_80%,_#b45309_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,_#451a03_0%,_transparent_50%)]"></div>
      </div>

      {/* Layer 2: Moving Particles (The 'Server Motion' / Prana) */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />

      {/* Layer 3: Complex 'Jaali' Pattern - Slow Rotate/Move */}
      <div
        className="absolute inset-0 jaali-pattern opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.5' fill-rule='evenodd'%3E%3Cpath d='M60 0 L120 60 L60 120 L0 60 Z M60 15 L105 60 L60 105 L15 60 Z M60 35 L85 60 L60 85 L35 60 Z'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='120' cy='0' r='2'/%3E%3Ccircle cx='0' cy='120' r='2'/%3E%3Ccircle cx='120' cy='120' r='2'/%3E%3Ccircle cx='60' cy='60' r='4'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px'
        }}
      />

      {/* Layer 4: Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.85)_100%)]"></div>
    </div>
  );
};

export default Background;
