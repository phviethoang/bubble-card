// letter.js — mở/đóng/chuyển thư. Hiệu ứng "nở ra từ bong bóng" dùng kỹ thuật FLIP:
// tấm thư bắt đầu ở đúng vị trí & cỡ của bong bóng rồi giãn ra chính giữa màn hình.

import {
  LETTERS, isAnon, escapeHtml, toParagraphs,
} from './config.js';
import { markRead } from './state.js';

export function createLetterView({ els, field, getText, onClose }) {
  const {
    overlay, backdrop, card, closeBtn, scroll,
    fromEl, bodyEl, signEl, countEl, prevBtn, nextBtn,
  } = els;
  let current = 0;

  function populate(i) {
    const letter = LETTERS[i];
    const anon = isAnon(letter);
    card.style.setProperty('--c', field.colorOf(i));
    fromEl.innerHTML = anon
      ? 'Từ <b>một người giấu tên</b> 🤍'
      : 'Từ <b>' + escapeHtml(letter.name.trim()) + '</b>';
    bodyEl.innerHTML = toParagraphs(getText(i));
    signEl.textContent = anon ? '— Một sinh viên của cô' : '— ' + letter.name.trim();
    countEl.textContent = (i + 1) + ' / ' + LETTERS.length;
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === LETTERS.length - 1;
    scroll.scrollTop = 0;
    if (markRead(i)) field.markReadVisual(i);
  }

  // Tính transform để đưa tấm thư (đang ở chính giữa) về trùng khớp bong bóng thứ i.
  function transformToBubble(i) {
    const r = field.rectOf(i);
    const lr = card.getBoundingClientRect();
    const tx = (r.left + r.width / 2) - (lr.left + lr.width / 2);
    const ty = (r.top + r.height / 2) - (lr.top + lr.height / 2);
    const sc = Math.max(0.08, r.width / lr.width);
    return `translate(${tx}px, ${ty}px) scale(${sc})`;
  }

  function open(i) {
    current = i;
    overlay.hidden = false;
    field.pause();
    populate(i);

    // đặt tấm thư về đúng bong bóng (không transition), rồi giãn ra
    card.style.transition = 'none';
    card.style.transformOrigin = 'center center';
    card.style.opacity = '1';
    card.style.transform = 'none';
    const startTransform = transformToBubble(i);
    card.style.transform = startTransform;
    card.style.opacity = '0';
    backdrop.style.transition = 'none';
    backdrop.style.opacity = '0';

    void card.offsetWidth; // ép trình duyệt vẽ trạng thái đầu trước khi chuyển

    card.style.transition = 'transform 0.55s cubic-bezier(.2,.85,.25,1), opacity 0.4s ease';
    backdrop.style.transition = 'opacity 0.45s ease';
    card.style.transform = 'none';
    card.style.opacity = '1';
    backdrop.style.opacity = '1';
  }

  function close() {
    card.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.4s ease';
    backdrop.style.transition = 'opacity 0.4s ease';
    card.style.transform = transformToBubble(current);
    card.style.opacity = '0';
    backdrop.style.opacity = '0';

    setTimeout(() => {
      overlay.hidden = true;
      card.style.transition = 'none';
      card.style.transform = 'none';
      card.style.opacity = '1';
      field.resume();
      if (onClose) onClose();
    }, 500);
  }

  function go(delta) {
    const next = current + delta;
    if (next < 0 || next >= LETTERS.length) return;
    current = next;
    scroll.classList.add('is-swapping');
    setTimeout(() => {
      populate(next);
      scroll.classList.remove('is-swapping');
    }, 180);
  }

  backdrop.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => go(-1));
  nextBtn.addEventListener('click', () => go(1));
  window.addEventListener('keydown', (e) => {
    if (overlay.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
  });

  return {
    open,
    close,
    isOpen() { return !overlay.hidden; },
  };
}
