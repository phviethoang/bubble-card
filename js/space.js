// space.js — nền vũ trụ trên canvas: sao (xa/gần, lấp lánh), hành tinh (vẽ có
// khối 3D, gợi hệ Mặt Trời), và sao băng vụt qua ngẫu nhiên. Chạy độc lập,
// phía sau trường bong bóng.

export function createSpace(canvas) {
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0, H = 0, dpr = 1;
  let stars = [];
  let planets = [];
  const shooting = [];
  let clock = 0;
  let nextShootAt = 1.5 + Math.random() * 1.5;
  let last = 0, running = false, raf = 0;

  const STAR_TINTS = ['255,255,255', '255,255,255', '202,220,255', '255,238,214'];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildStars();
    buildPlanets();
  }

  function buildStars() {
    const count = Math.max(70, Math.min(260, Math.round((W * H) / 6500)));
    stars = [];
    for (let i = 0; i < count; i++) {
      const depth = Math.pow(Math.random(), 2.2); // đa số ở xa (nhỏ), số ít gần (to)
      const r = 0.5 + depth * 2.4;                 // 0.5 .. 2.9 px
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r,
        glow: r > 1.7,
        base: 0.32 + depth * 0.5,                  // càng to càng sáng
        amp: reduce ? 0 : 0.18 + Math.random() * 0.3,
        tw: Math.random() * 2 + 0.8,
        phase: Math.random() * Math.PI * 2,
        tint: STAR_TINTS[(Math.random() * STAR_TINTS.length) | 0],
      });
    }
  }

  function buildPlanets() {
    const base = Math.min(W, H);
    planets = [
      // Sao Thổ — vành + dải mây
      { xr: 0.87, yr: 0.13, r: base * 0.084, ring: true, bands: true, alpha: 0.6,
        light: '245,222,170', mid: '206,160,96', dark: '120,80,40' },
      // Sao Mộc — dải mây + vết đỏ lớn
      { xr: 0.07, yr: 0.4, r: base * 0.066, ring: false, bands: true, spot: '200,96,64', alpha: 0.55,
        light: '250,224,190', mid: '210,150,110', dark: '138,86,58' },
      // Sao Hải Vương — xanh thẳm
      { xr: 0.17, yr: 0.82, r: base * 0.05, ring: false, bands: false, alpha: 0.5,
        light: '150,190,255', mid: '70,110,205', dark: '30,54,120' },
      // Sao Hỏa — đỏ nhỏ
      { xr: 0.94, yr: 0.8, r: base * 0.03, ring: false, bands: false, alpha: 0.5,
        light: '255,170,130', mid: '200,100,68', dark: '110,48,34' },
      // Sao Thiên Vương — băng lam nhạt
      { xr: 0.78, yr: 0.93, r: base * 0.036, ring: false, bands: false, alpha: 0.45,
        light: '188,240,240', mid: '120,196,205', dark: '58,120,138' },
    ];
  }

  function drawPlanet(p) {
    const x = p.xr * W, y = p.yr * H, r = p.r;
    const lx = x - r * 0.42, ly = y - r * 0.42; // nguồn sáng: trên-trái

    ctx.save();
    ctx.globalAlpha = p.alpha;

    // quầng khí quyển
    const halo = ctx.createRadialGradient(x, y, r * 0.92, x, y, r * 1.5);
    halo.addColorStop(0, `rgba(${p.light},0.18)`);
    halo.addColorStop(1, `rgba(${p.light},0)`);
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(x, y, r * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // thân cầu (cắt theo hình tròn)
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.clip();

    const body = ctx.createRadialGradient(lx, ly, r * 0.15, x, y, r * 1.25);
    body.addColorStop(0, `rgba(${p.light},1)`);
    body.addColorStop(0.55, `rgba(${p.mid},1)`);
    body.addColorStop(1, `rgba(${p.dark},1)`);
    ctx.fillStyle = body;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);

    // dải mây (hành tinh khí)
    if (p.bands) {
      const nb = 6;
      for (let i = 0; i < nb; i++) {
        const yy = y - r + (i + 0.5) * (2 * r / nb);
        ctx.globalAlpha = p.alpha * (i % 2 ? 0.18 : 0.1);
        ctx.fillStyle = i % 2 ? `rgba(${p.dark},1)` : `rgba(${p.light},1)`;
        ctx.beginPath();
        ctx.ellipse(x, yy, r * 1.05, (2 * r / nb) * 0.32, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = p.alpha;
    }

    // vết đỏ lớn (kiểu Sao Mộc)
    if (p.spot) {
      ctx.globalAlpha = p.alpha * 0.55;
      ctx.fillStyle = `rgba(${p.spot},1)`;
      ctx.beginPath();
      ctx.ellipse(x + r * 0.28, y + r * 0.12, r * 0.26, r * 0.16, -0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = p.alpha;
    }

    // bóng đổ vùng tối (phía xa nguồn sáng)
    const term = ctx.createRadialGradient(lx, ly, r * 0.2, x, y, r * 1.35);
    term.addColorStop(0, 'rgba(0,0,0,0)');
    term.addColorStop(0.68, 'rgba(0,0,0,0)');
    term.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = term;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);

    ctx.restore(); // bỏ clip

    // viền sáng khí quyển ở mép được chiếu sáng
    ctx.globalAlpha = p.alpha * 0.85;
    ctx.lineWidth = Math.max(1, r * 0.05);
    ctx.strokeStyle = `rgba(${p.light},0.55)`;
    ctx.beginPath();
    ctx.arc(x, y, r * 0.99, Math.PI * 0.95, Math.PI * 1.55);
    ctx.stroke();

    // vành (kiểu Sao Thổ)
    if (p.ring) {
      ctx.globalAlpha = p.alpha;
      ctx.strokeStyle = `rgba(${p.light},0.45)`;
      ctx.lineWidth = Math.max(1.5, r * 0.07);
      ctx.beginPath();
      ctx.ellipse(x, y, r * 1.8, r * 0.5, -0.5, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function spawnShoot() {
    const fromLeft = Math.random() < 0.5;
    const startX = fromLeft ? Math.random() * W * 0.35 : W - Math.random() * W * 0.35;
    const startY = -40 + Math.random() * H * 0.3;
    const speed = (W + H) * (0.28 + Math.random() * 0.12);
    const angle = (fromLeft ? 0.22 : 0.78) * Math.PI + (Math.random() - 0.5) * 0.14;
    shooting.push({
      x: startX, y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      tail: 190 + Math.random() * 120,
      life: 0,
    });
  }

  function drawShoot(sh) {
    const fade = sh.life < 0.18 ? sh.life / 0.18 : 1;
    const mag = Math.hypot(sh.vx, sh.vy) || 1;
    const tx = sh.x - (sh.vx / mag) * sh.tail;
    const ty = sh.y - (sh.vy / mag) * sh.tail;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const grad = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
    grad.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
    grad.addColorStop(0.35, `rgba(200,222,255,${0.5 * fade})`);
    grad.addColorStop(1, 'rgba(180,210,255,0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(180,210,255,0.9)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(sh.x, sh.y);
    ctx.lineTo(tx, ty);
    ctx.stroke();

    ctx.fillStyle = `rgba(255,255,255,${fade})`;
    ctx.beginPath();
    ctx.arc(sh.x, sh.y, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    clock += dt;

    ctx.clearRect(0, 0, W, H);

    for (const p of planets) drawPlanet(p);

    for (const s of stars) {
      const a = s.base + Math.sin(clock * s.tw + s.phase) * s.amp;
      const alpha = a < 0.05 ? 0.05 : a > 1 ? 1 : a;
      ctx.fillStyle = `rgb(${s.tint})`;
      if (s.glow) {
        ctx.globalAlpha = alpha * 0.18;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (clock >= nextShootAt) {
      spawnShoot();
      nextShootAt = clock + (reduce ? 9 + Math.random() * 6 : 3 + Math.random() * 3);
    }
    for (let i = shooting.length - 1; i >= 0; i--) {
      const sh = shooting[i];
      sh.life += dt;
      sh.x += sh.vx * dt;
      sh.y += sh.vy * dt;
      drawShoot(sh);
      if (sh.x < -160 || sh.x > W + 160 || sh.y > H + 160) shooting.splice(i, 1);
    }

    if (running) raf = requestAnimationFrame(frame);
  }

  window.addEventListener('resize', () => { if (W) resize(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(raf);
    } else if (!running) {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  });

  return {
    start() {
      resize();
      if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    },
  };
}
