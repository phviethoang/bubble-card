// confetti.js — pháo giấy màn kết bằng canvas, không cần thư viện ngoài.

import { rand } from './config.js';

export function createConfetti(canvas) {
  const ctx = canvas.getContext('2d');
  const COLORS = ['#ff85ab', '#ffd578', '#82deaa', '#78d6d6', '#96a0ff', '#e08ceb', '#ff9178'];
  let parts = [];
  let running = false;
  let last = 0;
  let raf = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', () => { if (running) resize(); });

  function frame(now) {
    const dt = Math.min(now - last, 50) / 1000;
    last = now;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of parts) {
      p.y += p.vy * dt;
      p.x += p.vx * dt;
      p.rot += p.vr * dt;
      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
      ctx.restore();
    }
    if (running) raf = requestAnimationFrame(frame);
  }

  return {
    start() {
      resize();
      parts = [];
      for (let i = 0; i < 160; i++) {
        parts.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          r: rand(5, 11),
          c: COLORS[i % COLORS.length],
          vy: rand(60, 150),
          vx: rand(-40, 40),
          rot: rand(0, Math.PI * 2),
          vr: rand(-5, 5),
        });
      }
      if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
  };
}
