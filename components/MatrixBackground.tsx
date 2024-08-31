"use client"

import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
    children: React.ReactNode;
}

export const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ children }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };

        resizeCanvas();

        const particles: { 
            x: number; 
            y: number; 
            radius: number; 
            speedX: number; 
            speedY: number; 
            alpha: number; 
            color: string;
        }[] = [];

        const colors = ['#41a1e0', '#7efcf6', '#30c89e', '#1f78b4', '#00ccff'];

        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                alpha: Math.random(),
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            ctx.fillStyle = 'rgba(16, 16, 16, 0.95)'; // Keep background close to black but not pure black
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        
                // Adjust the fillStyle to be brighter and more opaque
                ctx.fillStyle = 'rgba(100, 200, 255, 0.8)'; // Light blue, higher opacity
                ctx.fill();
        
                particle.x += particle.speedX;
                particle.y += particle.speedY;
        
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = canvas.height;
            });
        };
        

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            resizeCanvas();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full min-h-screen">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div className="relative z-10">{children}</div>
        </div>
    );
};
