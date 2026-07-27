// bubbles.js — trường bong bóng với HAI kiểu chuyển động đổi được tức thì:
//   'float' : trôi tự do, va chạm đàn hồi khỏi nhau và khỏi 4 tường -> không đè,
//             dễ bấm, nhưng đầy màn hình (đông).
//   'rise'  : bay lên nhẹ + lắc ngang, lên hết trên thì vòng xuống dưới -> thoáng
//             hơn (một phần ở ngoài màn), nhưng có thể lướt chồng nhau đôi lúc.

import {
  LETTERS, TUNE, rand, pickColor, displayName,
} from './config.js';
import { isRead, getMode } from './state.js';

export function createBubbleField({ container, onClick }) {
  let W = window.innerWidth;
  let H = window.innerHeight;
  const bubbles = [];
  let running = false;
  let paused = false;
  let last = performance.now();
  let mode = getMode();

  function baseSize() {
    return Math.max(
      TUNE.minSize,
      Math.min(TUNE.maxSize, Math.min(W, TUNE.sizeCap) / TUNE.sizeDivisor),
    );
  }

  function spawnX(size) {
    return rand(TUNE.edge, Math.max(TUNE.edge + 1, W - size - TUNE.edge));
  }

  function clampPos(b) {
    b.x = Math.max(TUNE.edge, Math.min(W - b.size - TUNE.edge, b.x));
    b.y = Math.max(TUNE.edge, Math.min(H - b.size - TUNE.edge, b.y));
  }

  function build() {
    const S = baseSize();
    LETTERS.forEach((letter, i) => {
      const size = Math.round(S * rand(0.82, 1.24));
      const speed = rand(TUNE.speedMin, TUNE.speedMax);
      const ang = rand(0, Math.PI * 2);
      const b = {
        i,
        size,
        r: size / 2,
        color: pickColor(i),
        x: spawnX(size),
        y: rand(TUNE.edge, Math.max(TUNE.edge + 1, H - size - TUNE.edge)),
        // 'float'
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        // 'rise'
        rise: speed,
        baseX: 0,
        swayAmp: rand(16, 42),
        swayFreq: rand(0.18, 0.4),
        phase: rand(0, Math.PI * 2),
        t: rand(0, 10),
      };
      b.baseX = b.x;

      const el = document.createElement('button');
      el.className = 'bubble' + (isRead(i) ? ' is-read' : '');
      el.style.width = el.style.height = size + 'px';
      el.style.setProperty('--c', b.color);
      el.style.setProperty('--fs', Math.max(11, Math.min(18, size * 0.155)) + 'px');
      el.style.setProperty('--hl-x', rand(12, 30).toFixed(1) + '%');
      el.style.setProperty('--hl-y', rand(10, 26).toFixed(1) + '%');
      el.style.setProperty('--hl-size', rand(15, 26).toFixed(1) + '%');
      el.style.setProperty('--hl-a', rand(0.4, 0.62).toFixed(2));
      el.style.transform = `translate(${b.x}px, ${b.y}px)`;
      el.innerHTML = '<span class="skin"><span class="name"></span></span>';
      el.querySelector('.name').textContent = displayName(letter);
      el.setAttribute('aria-label', 'Đọc lời nhắn của ' + displayName(letter));
      el.addEventListener('click', () => onClick(i));

      b.el = el;
      container.appendChild(el);
      bubbles.push(b);
    });

    // giải chồng lấn ban đầu (dùng cho kiểu 'float')
    for (let it = 0; it < 40; it++) {
      resolveOverlaps(false);
      for (const b of bubbles) clampPos(b);
    }
  }

  // Tách các cặp chồng lấn; withVelocity=true thì thêm xung phản xạ vận tốc.
  function resolveOverlaps(withVelocity) {
    const n = bubbles.length;
    for (let a = 0; a < n; a++) {
      const A = bubbles[a];
      for (let c = a + 1; c < n; c++) {
        const B = bubbles[c];
        let nx = (B.x + B.r) - (A.x + A.r);
        let ny = (B.y + B.r) - (A.y + A.r);
        let dist = Math.hypot(nx, ny);
        const minD = A.r + B.r + TUNE.gap;
        if (dist >= minD) continue;

        if (dist < 0.001) { nx = 1; ny = 0; dist = 0.001; }
        else { nx /= dist; ny /= dist; }

        const invA = 1 / (A.r * A.r), invB = 1 / (B.r * B.r);
        const totalInv = invA + invB;

        const overlap = minD - dist;
        A.x -= nx * overlap * (invA / totalInv);
        A.y -= ny * overlap * (invA / totalInv);
        B.x += nx * overlap * (invB / totalInv);
        B.y += ny * overlap * (invB / totalInv);

        if (!withVelocity) continue;
        const rvn = (B.vx - A.vx) * nx + (B.vy - A.vy) * ny;
        if (rvn < 0) {
          const j = -(1 + TUNE.bounce) * rvn / totalInv;
          A.vx -= j * invA * nx; A.vy -= j * invA * ny;
          B.vx += j * invB * nx; B.vy += j * invB * ny;
        }
      }
    }
  }

  function bounceWalls(b) {
    const maxX = W - b.size - TUNE.edge;
    const maxY = H - b.size - TUNE.edge;
    if (b.x < TUNE.edge) { b.x = TUNE.edge; b.vx = Math.abs(b.vx); }
    else if (b.x > maxX) { b.x = maxX; b.vx = -Math.abs(b.vx); }
    if (b.y < TUNE.edge) { b.y = TUNE.edge; b.vy = Math.abs(b.vy); }
    else if (b.y > maxY) { b.y = maxY; b.vy = -Math.abs(b.vy); }
  }

  function updateFloat(dt) {
    for (const b of bubbles) { b.x += b.vx * dt; b.y += b.vy * dt; }
    resolveOverlaps(true);
    resolveOverlaps(true);
    const maxV = TUNE.speedMax * 2.2;
    for (const b of bubbles) {
      bounceWalls(b);
      const sp = Math.hypot(b.vx, b.vy);
      if (sp > maxV) { b.vx = (b.vx / sp) * maxV; b.vy = (b.vy / sp) * maxV; }
    }
  }

  function updateRise(dt) {
    for (const b of bubbles) {
      b.t += dt;
      b.y -= b.rise * dt;
      let x = b.baseX + Math.sin(b.t * b.swayFreq + b.phase) * b.swayAmp;
      if (b.y < -b.size - 20) {              // lên hết trên -> vòng xuống dưới
        b.y = H + rand(10, 130);
        b.baseX = spawnX(b.size);
        x = b.baseX;
      }
      b.x = Math.max(TUNE.edge, Math.min(W - b.size - TUNE.edge, x));
    }
  }

  function render() {
    for (const b of bubbles) {
      b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
    }
  }

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (running && !paused) {
      if (mode === 'rise') updateRise(dt);
      else updateFloat(dt);
      render();
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    for (const b of bubbles) clampPos(b);
  });

  build();
  requestAnimationFrame(frame);

  return {
    start() { running = true; last = performance.now(); },
    pause() { paused = true; },
    resume() { paused = false; last = performance.now(); },
    rectOf(i) { return bubbles[i].el.getBoundingClientRect(); },
    colorOf(i) { return bubbles[i].color; },
    markReadVisual(i) { bubbles[i].el.classList.add('is-read'); },
    resetVisual() { for (const b of bubbles) b.el.classList.remove('is-read'); },
    getMode() { return mode; },
    setMode(m) {
      const next = m === 'rise' ? 'rise' : 'float';
      if (next === mode) return;
      mode = next;
      for (const b of bubbles) {
        if (mode === 'rise') {
          b.baseX = b.x;                     // lấy vị trí hiện tại làm tâm lắc
        } else {
          const ang = rand(0, Math.PI * 2);
          const sp = rand(TUNE.speedMin, TUNE.speedMax);
          b.vx = Math.cos(ang) * sp;
          b.vy = Math.sin(ang) * sp;
        }
      }
    },
  };
}
