import { useEffect, useRef } from 'react';

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticle(container) {
  const el = document.createElement('div');
  const size = randomBetween(2, 6);
  const opacity = randomBetween(0.1, 0.4);
  const x = randomBetween(0, window.innerWidth);
  const y = randomBetween(0, window.innerHeight);

  el.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: rgba(255, 255, 255, ${opacity});
    border-radius: 50%;
    pointer-events: none;
    will-change: transform, opacity;
  `;
  container.appendChild(el);

  return {
    el,
    x,
    y,
    baseX: x,
    baseY: y,
    size,
    speedX: randomBetween(-0.3, 0.3),
    speedY: randomBetween(-0.2, 0.2),
    phase: randomBetween(0, Math.PI * 2),
    phaseSpeed: randomBetween(0.01, 0.03),
    amplitude: randomBetween(20, 60),
  };
}

function createShape(container) {
  const el = document.createElement('div');
  const size = randomBetween(20, 60);
  const opacity = randomBetween(0.03, 0.08);
  const isSquare = Math.random() > 0.7;
  const hasBorder = Math.random() > 0.5;

  el.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    ${hasBorder ? `border: 1px solid rgba(255, 255, 255, ${opacity * 2});` : `background: rgba(255, 255, 255, ${opacity});`}
    ${isSquare ? 'border-radius: 4px;' : 'border-radius: 50%;'}
    pointer-events: none;
    will-change: transform;
  `;
  container.appendChild(el);

  return {
    el,
    x: randomBetween(0, window.innerWidth - size),
    y: randomBetween(0, window.innerHeight - size),
    size,
    vx: randomBetween(-0.4, 0.4),
    vy: randomBetween(-0.3, 0.3),
    rotation: 0,
    rotationSpeed: randomBetween(-0.5, 0.5),
  };
}

function createGlow(container) {
  const el = document.createElement('div');
  const size = randomBetween(100, 200);
  const opacity = randomBetween(0.02, 0.05);

  el.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, rgba(255, 255, 255, ${opacity}) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    will-change: transform;
  `;
  container.appendChild(el);

  return {
    el,
    x: randomBetween(0, window.innerWidth - size),
    y: randomBetween(0, window.innerHeight - size),
    size,
    vx: randomBetween(-0.2, 0.2),
    vy: randomBetween(-0.15, 0.15),
    pulsePhase: randomBetween(0, Math.PI * 2),
    pulseSpeed: randomBetween(0.02, 0.04),
  };
}

function createLine(container) {
  const el = document.createElement('div');
  const width = randomBetween(40, 120);
  const opacity = randomBetween(0.03, 0.07);
  const angle = randomBetween(0, 360);

  el.style.cssText = `
    position: absolute;
    width: ${width}px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, ${opacity}), transparent);
    transform: rotate(${angle}deg);
    pointer-events: none;
    will-change: transform, opacity;
  `;
  container.appendChild(el);

  return {
    el,
    x: randomBetween(0, window.innerWidth - width),
    y: randomBetween(0, window.innerHeight),
    width,
    vx: randomBetween(-0.3, 0.3),
    vy: randomBetween(-0.2, 0.2),
    opacity,
    fadePhase: randomBetween(0, Math.PI * 2),
    fadeSpeed: randomBetween(0.015, 0.03),
  };
}

export default function FloatingObjects() {
  const containerRef = useRef(null);
  const stateRef = useRef({ particles: [], shapes: [], glows: [], lines: [] });
  const rafRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = Array.from({ length: 30 }, () => createParticle(container));
    const shapes = Array.from({ length: 6 }, () => createShape(container));
    const glows = Array.from({ length: 4 }, () => createGlow(container));
    const lines = Array.from({ length: 5 }, () => createLine(container));

    stateRef.current = { particles, shapes, glows, lines };

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      particles.forEach((p) => {
        p.phase += p.phaseSpeed;
        p.x += p.speedX + Math.sin(p.phase) * 0.3;
        p.y += p.speedY + Math.cos(p.phase) * 0.2;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const scale = 1 + Math.sin(p.phase * 2) * 0.3;
        p.el.style.transform = `translate(${p.x}px, ${p.y}px) scale(${scale})`;
      });

      shapes.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotationSpeed;

        if (s.x <= 0 || s.x >= w - s.size) s.vx *= -1;
        if (s.y <= 0 || s.y >= h - s.size) s.vy *= -1;

        s.x = Math.max(0, Math.min(s.x, w - s.size));
        s.y = Math.max(0, Math.min(s.y, h - s.size));

        s.el.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.rotation}deg)`;
      });

      glows.forEach((g) => {
        g.x += g.vx;
        g.y += g.vy;
        g.pulsePhase += g.pulseSpeed;

        if (g.x <= 0 || g.x >= w - g.size) g.vx *= -1;
        if (g.y <= 0 || g.y >= h - g.size) g.vy *= -1;

        g.x = Math.max(0, Math.min(g.x, w - g.size));
        g.y = Math.max(0, Math.min(g.y, h - g.size));

        const scale = 0.8 + Math.sin(g.pulsePhase) * 0.4;
        g.el.style.transform = `translate(${g.x}px, ${g.y}px) scale(${scale})`;
      });

      lines.forEach((l) => {
        l.x += l.vx;
        l.y += l.vy;
        l.fadePhase += l.fadeSpeed;

        if (l.x < -l.width) l.x = w + l.width;
        if (l.x > w + l.width) l.x = -l.width;
        if (l.y < -10) l.y = h + 10;
        if (l.y > h + 10) l.y = -10;

        const fade = 0.5 + Math.sin(l.fadePhase) * 0.5;
        l.el.style.transform = `translate(${l.x}px, ${l.y}px)`;
        l.el.style.opacity = fade;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      particles.forEach((p) => p.el.remove());
      shapes.forEach((s) => s.el.remove());
      glows.forEach((g) => g.el.remove());
      lines.forEach((l) => l.el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    />
  );
}
