"use client";

import { useEffect, useRef } from "react";

export function GoldAtmosphere({
  density = 70,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let tick = 0;
    let running = true;

    const particles = Array.from({ length: density }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 1.8,
      s: 0.12 + Math.random() * 0.35,
      a: 0.18 + Math.random() * 0.42,
      p: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      if (!running) return;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      for (const p of particles) {
        const drift = reduce ? 0 : Math.sin(tick * 0.008 + p.p) * 14;
        const x = p.x * width + drift;
        const rawY = p.y * height - tick * p.s;
        const span = height + 80;
        const y = ((rawY % span) + span) % span - 40;
        ctx.beginPath();
        ctx.fillStyle = `rgba(212, 175, 119, ${p.a})`;
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="luxury-smoke luxury-smoke-a" />
      <div className="luxury-smoke luxury-smoke-b" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
