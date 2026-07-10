"use client";

import { useEffect, useRef } from "react";

type Bubble = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  alpha: number;
};

/**
 * Cinematic canvas backdrop: slow-rising bubbles over layered sine waves.
 * Pure canvas — no WebGL dependency — so it stays fast on low-end devices.
 */
export default function WaterCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let t = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const bubbles: Bubble[] = Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1 + Math.random() * 4,
      speed: 0.02 + Math.random() * 0.06,
      drift: (Math.random() - 0.5) * 0.02,
      alpha: 0.08 + Math.random() * 0.25,
    }));

    const wave = (
      yBase: number,
      amplitude: number,
      wavelength: number,
      phase: number,
      color: string
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 8) {
        const y =
          yBase +
          Math.sin((x / wavelength) * Math.PI * 2 + phase) * amplitude +
          Math.sin((x / (wavelength * 0.53)) * Math.PI * 2 + phase * 1.6) * amplitude * 0.4;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      wave(height * 0.78, 14, 480, t * 0.4, "rgba(14, 77, 146, 0.16)");
      wave(height * 0.84, 18, 360, -t * 0.55, "rgba(46, 134, 222, 0.12)");
      wave(height * 0.9, 22, 300, t * 0.7, "rgba(103, 232, 249, 0.08)");

      for (const b of bubbles) {
        b.y -= b.speed * 0.01;
        b.x += b.drift * 0.01;
        if (b.y < -0.05) {
          b.y = 1.05;
          b.x = Math.random();
        }
        const px = b.x * width;
        const py = b.y * height;
        const grad = ctx.createRadialGradient(px - b.r / 3, py - b.r / 3, 0, px, py, b.r);
        grad.addColorStop(0, `rgba(165, 243, 252, ${b.alpha})`);
        grad.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.beginPath();
        ctx.arc(px, py, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      t += 0.016;
      raf = requestAnimationFrame(draw);
    };

    if (reduceMotion) {
      wave(height * 0.8, 14, 480, 0, "rgba(14, 77, 146, 0.16)");
      wave(height * 0.88, 18, 360, 2, "rgba(46, 134, 222, 0.12)");
    } else {
      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none ${className}`} />;
}
