
import React, { useEffect, useRef } from 'react';

const DustOverlay: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; layer: number }[] = [];
        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            const particleCount = Math.floor(window.innerWidth / 10); // Adjust density
            particles = [];

            for (let i = 0; i < particleCount; i++) {
                // Layer 1: Smaller, slower, more transparent (Background dust)
                // Layer 2: Larger, faster, brighter (Foreground dust)
                const layer = Math.random() > 0.6 ? 2 : 1;

                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: layer === 1 ? Math.random() * 1.5 + 0.5 : Math.random() * 2.5 + 1,
                    speedX: layer === 1 ? (Math.random() - 0.5) * 0.2 : (Math.random() - 0.5) * 0.5,
                    speedY: layer === 1 ? (Math.random() - 0.5) * 0.2 : (Math.random() - 0.5) * 0.5,
                    opacity: layer === 1 ? Math.random() * 0.3 + 0.1 : Math.random() * 0.4 + 0.2,
                    layer: layer
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                ctx.beginPath();
                // Golden/Amber tint for the dust to match theme, or white/grey
                ctx.fillStyle = `rgba(252, 211, 77, ${p.opacity})`;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-20 pointer-events-none mix-blend-screen opacity-70"
        />
    );
};

export default DustOverlay;
