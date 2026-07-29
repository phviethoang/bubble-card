// grid.js — màn "Xem toàn bộ lời nhắn": tất cả thư xếp thành lưới (masonry).
// Thư đã đọc -> mở sẵn; chưa đọc -> đóng, chạm để mở. Nội dung chỉ nạp khi đã
// mở khóa (getText trả '' nếu chưa có mã) và việc mở thẻ đi qua cổng requireUnlock.

import { LETTERS, isAnon, escapeHtml, toParagraphs } from './config.js';
import { isRead, markRead, readCount, total } from './state.js';

export function createGrid({ els, field, getText, requireUnlock, onClose }) {
  const { view, body, countEl, closeBtn } = els;
  const cards = [];
  const textEls = [];
  let built = false;

  function build() {
    LETTERS.forEach((l, i) => {
      const anon = isAnon(l);
      const name = anon ? 'Ẩn danh' : (l.name || '').trim();
      const nameHtml = escapeHtml(name);

      const card = document.createElement('article');
      card.className = 'gcard';
      card.style.setProperty('--c', field.colorOf(i));
      card.innerHTML =
        '<div class="gcard-accent"></div>' +
        '<button class="gcard-closed" type="button">' +
          '<span class="gcard-seal">💌</span>' +
          '<span class="gcard-name">' + nameHtml + '</span>' +
          '<span class="gcard-hint">Chạm để mở</span>' +
        '</button>' +
        '<div class="gcard-open">' +
          '<p class="gcard-from">' +
            (anon ? 'Từ <b>một người giấu tên</b> 🤍' : 'Từ <b>' + nameHtml + '</b>') +
          '</p>' +
          '<div class="gcard-text"></div>' +
          '<p class="gcard-sign">' +
            (anon ? '— Một sinh viên của cô' : '— ' + nameHtml) +
          '</p>' +
        '</div>';

      card.querySelector('.gcard-closed')
        .addEventListener('click', () => requireUnlock(() => openCard(i)));
      cards.push(card);
      textEls.push(card.querySelector('.gcard-text'));
      body.appendChild(card);
    });
    built = true;
  }

  function fillText(i) {
    if (!textEls[i].innerHTML) textEls[i].innerHTML = toParagraphs(getText(i));
  }

  function openCard(i) {
    if (markRead(i)) field.markReadVisual(i);
    fillText(i);
    cards[i].classList.add('is-open');
    updateCount();
  }

  function syncStates() {
    for (let i = 0; i < cards.length; i++) {
      const open = isRead(i);
      cards[i].classList.toggle('is-open', open);
      if (open) fillText(i);
    }
  }

  function updateCount() {
    if (countEl) countEl.textContent = readCount() + ' / ' + total();
  }

  closeBtn.addEventListener('click', close);

  function open() {
    if (!built) build();
    syncStates();
    updateCount();
    view.hidden = false;
    view.scrollTop = 0;
    field.pause();
  }

  function close() {
    view.hidden = true;
    field.resume();
    if (onClose) onClose();
  }

  return {
    open,
    close,
    isOpen() { return !view.hidden; },
    refresh() { if (built) { syncStates(); updateCount(); } },
    updateCount,
  };
}
