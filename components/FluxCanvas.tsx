'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  weight: number;
  state: 'undecided' | 'contested' | 'resolved';
  trail: Array<{ x: number; y: number; opacity: number }>;
}

function noise(x: number, y: number, t: number): number {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const T = t * 0.0003;
  return (
    Math.sin(X * 0.1 + T) * Math.cos(Y * 0.1 + T * 1.3) +
    Math.sin(X * 0.05 + Y * 0.07 + T * 0.7) * 0.5 +
    Math.cos(X * 0.03 - Y * 0.04 + T * 1.1) * 0.3
  );
}

export default function FluxCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef  = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Attractors representing winning clusters
    const attractors = [
      { x: 0.2, y: 0.3, strength: 0.8 },
      { x: 0.75, y: 0.6, strength: 0.9 },
      { x: 0.5, y: 0.8, strength: 0.6 },
    ];

    function spawnParticle(w: number, h: number): Particle {
      const maxLife = 180 + Math.random() * 240;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: 0,
        maxLife,
        weight: 0.3 + Math.random() * 0.7,
        state: 'undecided',
        trail: [],
      };
    }

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      if (ctx) ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    const COUNT = Math.min(500, Math.floor((window.innerWidth * window.innerHeight) / 4000));
    particlesRef.current = Array.from({ length: COUNT }, () =>
      spawnParticle(window.innerWidth, window.innerHeight)
    );

    function getColor(p: Particle): string {
      const alpha = Math.min(1, p.life / 30) * Math.min(1, (p.maxLife - p.life) / 30);
      if (p.state === 'undecided') return `rgba(100,120,180,${alpha * 0.5})`;
      if (p.state === 'contested') return `rgba(255,153,51,${alpha * 0.6})`;
      return `rgba(19,136,8,${alpha * 0.7})`;
    }

    function draw() {
      if (!ctx) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // Fade trails
      ctx.fillStyle = 'rgba(250,250,248,0.04)';
      ctx.fillRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        p.life++;

        // Reset dead particles
        if (p.life > p.maxLife) {
          Object.assign(p, spawnParticle(w, h));
          return;
        }

        // Perlin-ish field force
        const nx = p.x / w;
        const ny = p.y / h;
        const fieldX = noise(nx * 8, ny * 8, t) * Math.PI * 2;
        const fieldY = noise(nx * 8 + 100, ny * 8 + 100, t) * Math.PI * 2;

        p.vx += Math.cos(fieldX) * 0.08;
        p.vy += Math.sin(fieldY) * 0.08;

        // Attractor pull
        let closestDist = Infinity;
        attractors.forEach((a) => {
          const ax = a.x * w;
          const ay = a.y * h;
          const dx = ax - p.x;
          const dy = ay - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < closestDist) closestDist = dist;
          if (dist < w * 0.25) {
            const pull = (a.strength * 0.04) / (dist + 1);
            p.vx += dx * pull;
            p.vy += dy * pull;
          }
        });

        // State transitions
        const lifeFrac = p.life / p.maxLife;
        if (closestDist < w * 0.12 && lifeFrac > 0.4) p.state = 'resolved';
        else if (closestDist < w * 0.25 && lifeFrac > 0.2) p.state = 'contested';

        // Damping
        p.vx *= 0.92;
        p.vy *= 0.92;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2.5) { p.vx = (p.vx / speed) * 2.5; p.vy = (p.vy / speed) * 2.5; }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Trail
        p.trail.push({ x: p.x, y: p.y, opacity: 0.6 });
        if (p.trail.length > 8) p.trail.shift();

        // Draw trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          p.trail.forEach((pt) => ctx.lineTo(pt.x, pt.y));
          ctx.strokeStyle = getColor(p);
          ctx.lineWidth = p.weight * 1.2;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.weight * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = getColor(p);
        ctx.fill();
      });

      timeRef.current += 1;
      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="flux-canvas"
      aria-hidden="true"
      role="presentation"
    />
  );
}
