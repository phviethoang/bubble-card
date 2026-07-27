// ui.js — đổ chữ từ CONFIG vào màn chào/màn kết, và điều khiển hiện/ẩn
// màn chào, thanh tiến trình, gợi ý, màn kết.

import { CONFIG } from './config.js';

export function createUI({ els, onOpen, onFinaleClose }) {
  // đổ nội dung tĩnh từ CONFIG
  els.eyebrow.textContent = CONFIG.eyebrow;
  els.gtitle.textContent = CONFIG.greetingTitle || ('Gửi cô ' + CONFIG.teacher);
  els.gsub.textContent = CONFIG.greetingSubtitle;
  els.openBtn.textContent = CONFIG.openButton;
  els.ftitle.textContent = CONFIG.finaleTitle;
  els.fmsg.textContent = CONFIG.finaleMessage;
  document.title = CONFIG.pageTitle || ('Gửi cô ' + CONFIG.teacher);

  els.openBtn.addEventListener('click', () => {
    els.welcome.classList.add('is-hidden');
    els.topbar.classList.add('is-visible');
    // hiện gợi ý một lúc rồi tự ẩn
    setTimeout(() => {
      els.hint.classList.add('is-visible');
      setTimeout(() => els.hint.classList.remove('is-visible'), 5200);
    }, 500);
    if (onOpen) onOpen();
  });

  els.finaleClose.addEventListener('click', () => {
    els.finale.hidden = true;
    if (onFinaleClose) onFinaleClose();
  });

  return {
    updateProgress(count, tot) {
      els.progress.textContent = '💌 Đã đọc ' + count + ' / ' + tot;
    },
    showFinale() { els.finale.hidden = false; },
    hideFinale() { els.finale.hidden = true; },
  };
}
