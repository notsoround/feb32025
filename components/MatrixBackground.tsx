"use client"

import React, { useEffect, useRef } from 'react'

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

        const columns = canvas.width / 20;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0f0';
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = String.fromCharCode(Math.random() * 128);
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i] += 0.5;
            }
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