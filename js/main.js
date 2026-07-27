// main.js — lắp ráp các module và nối chúng với nhau bằng callback.

import { el } from './dom.js';
import * as state from './state.js';
import { createSpace } from './space.js';
import { createBubbleField } from './bubbles.js';
import { createLetterView } from './letter.js';
import { createGrid } from './grid.js';
import { createConfetti } from './confetti.js';
import { createUI } from './ui.js';

const space = createSpace(el.space);
space.start();

const confetti = createConfetti(el.confetti);

// Chỉ bật màn kết một lần, khi cô vừa đọc xong lá thư cuối cùng.
let finaleShown = false;
function checkFinale() {
  if (!finaleShown && state.allRead()) {
    finaleShown = true;
    ui.showFinale();
    confetti.start();
  }
}

// Bong bóng: bấm vào thì mở thư tương ứng.
const field = createBubbleField({
  container: el.field,
  onClick: (i) => letter.open(i),
});

// Thư (popup nở từ bong bóng): đóng xong kiểm tra màn kết.
const letter = createLetterView({
  els: {
    overlay: el.overlay,
    backdrop: el.backdrop,
    card: el.card,
    closeBtn: el.closeBtn,
    scroll: el.scroll,
    fromEl: el.fromEl,
    bodyEl: el.bodyEl,
    signEl: el.signEl,
    countEl: el.countEl,
    prevBtn: el.prevBtn,
    nextBtn: el.nextBtn,
  },
  field,
  onClose: checkFinale,
});

// Lưới xem toàn bộ: chạm thẻ chưa mở để đọc; đóng xong kiểm tra màn kết.
const grid = createGrid({
  els: {
    view: el.gridView,
    body: el.gridBody,
    countEl: el.gridCount,
    closeBtn: el.gridClose,
  },
  field,
  onClose: checkFinale,
});

// Giao diện màn chào/kết.
const ui = createUI({
  els: {
    welcome: el.welcome,
    eyebrow: el.eyebrow,
    gtitle: el.gtitle,
    gsub: el.gsub,
    openBtn: el.openBtn,
    topbar: el.topbar,
    progress: el.progress,
    hint: el.hint,
    finale: el.finale,
    ftitle: el.ftitle,
    fmsg: el.fmsg,
    finaleClose: el.finaleClose,
  },
  onOpen: () => {
    field.start();
    el.tools.classList.add('is-visible');
  },
  onFinaleClose: () => confetti.stop(),
});

// Đồng bộ số "đã đọc" ở cả thanh trên và tiêu đề lưới.
state.onChange((count, tot) => {
  ui.updateProgress(count, tot);
  grid.updateCount();
});
ui.updateProgress(state.readCount(), state.total());

// Nút đặt lại.
el.resetBtn.addEventListener('click', () => {
  state.clearRead();
  field.resetVisual();
  finaleShown = false;
  ui.hideFinale();
  confetti.stop();
});

// Nút xem toàn bộ (góc + màn kết).
el.gridBtn.addEventListener('click', () => grid.open());
el.gridFromFinale.addEventListener('click', () => {
  ui.hideFinale();
  confetti.stop();
  grid.open();
});

// Nút đổi kiểu chuyển động, kèm toast báo chế độ.
let toastTimer = 0;
function showModeToast(m) {
  el.modeToast.textContent = m === 'rise' ? 'Kiểu: Bay lên ↑' : 'Kiểu: Trôi nổi';
  el.modeToast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.modeToast.classList.remove('is-visible'), 1600);
}
el.modeBtn.addEventListener('click', () => {
  const next = state.getMode() === 'float' ? 'rise' : 'float';
  state.setMode(next);
  field.setMode(next);
  showModeToast(next);
});
