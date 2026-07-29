// lock.js — khóa nội dung thư bằng mã bí mật. Giao diện/bong bóng/tên vẫn xem
// được; chỉ khi MỞ đọc thư mới cần mã. Nội dung đã mã hóa sẵn (AES-256-GCM,
// khóa dẫn xuất từ mã qua PBKDF2) nên không có mã thì không giải ra được.
// Nhập đúng 1 lần -> lưu vào thiết bị, các lần sau tự mở.

import { CONFIG, LETTERS } from './config.js';

const STORE = 'tribute_unlock_' + (CONFIG.teacher || 'default');
const CRYPTO = CONFIG.crypto || null;
const hasCrypto = !!(CRYPTO && CRYPTO.salt);

function b64ToBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export function createLock({ els, onUnlocked }) {
  const { view, card, boxesWrap, msg, cancelBtn } = els;
  const boxes = Array.from(boxesWrap.querySelectorAll('.code-box'));
  let unlocked = false;
  let texts = [];
  let pending = null;

  function isUnlocked() { return unlocked || !hasCrypto; }

  async function deriveKey(code) {
    const enc = new TextEncoder();
    const base = await crypto.subtle.importKey('raw', enc.encode(code), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: b64ToBytes(CRYPTO.salt), iterations: CRYPTO.iterations, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['decrypt'],
    );
  }

  async function dec(key, blobB64) {
    const data = b64ToBytes(blobB64);
    const iv = data.slice(0, 12);
    const body = data.slice(12);
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, body);
    return new TextDecoder().decode(pt);
  }

  // Thử mã: đúng thì giải hết thư, lưu, trả true.
  async function tryCode(code) {
    if (!hasCrypto) { unlocked = true; return true; }
    const norm = String(code).trim().toUpperCase();
    let key;
    try { key = await deriveKey(norm); } catch { return false; }
    try {
      const v = await dec(key, CRYPTO.verifier);
      if (v !== 'bubble-card-ok') return false;
      texts = await Promise.all(LETTERS.map((l) => (l.enc ? dec(key, l.enc) : Promise.resolve(''))));
      unlocked = true;
      try { localStorage.setItem(STORE, norm); } catch { /* bỏ qua */ }
      if (onUnlocked) onUnlocked();
      return true;
    } catch { return false; }
  }

  // ---- Giao diện nhập mã ----
  function setMsg(t, kind) { msg.textContent = t || ''; msg.className = 'lock-msg' + (kind ? ' is-' + kind : ''); }
  function readBoxes() { return boxes.map((b) => b.value).join('').trim().toUpperCase(); }
  function clearBoxes() { boxes.forEach((b) => { b.value = ''; }); boxes[0].focus(); }
  function shake() { card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); }
  function show() { view.hidden = false; view.classList.remove('is-ok'); setMsg(''); clearBoxes(); setTimeout(() => boxes[0].focus(), 60); }
  function hide() { view.hidden = true; }

  async function submit() {
    const code = readBoxes();
    if (code.length < boxes.length) return;
    setMsg('Đang mở…');
    const ok = await tryCode(code);
    if (ok) {
      setMsg('Mở khóa rồi ạ 🤍', 'ok');
      view.classList.add('is-ok');
      setTimeout(() => { hide(); if (pending) { pending.resolve(); pending = null; } }, 650);
    } else {
      setMsg('Mã chưa đúng rồi ạ 🤍 Cô thử lại nhé.', 'err');
      shake();
      clearBoxes();
    }
  }

  boxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      box.value = box.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 1);
      if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
      if (readBoxes().length === boxes.length) submit();
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && i > 0) boxes[i - 1].focus();
      else if (e.key === 'Enter') submit();
    });
    box.addEventListener('paste', (e) => {
      e.preventDefault();
      const t = ((e.clipboardData || window.clipboardData).getData('text') || '')
        .replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      boxes.forEach((b, k) => { b.value = t[k] || ''; });
      (boxes[Math.min(t.length, boxes.length) - 1] || boxes[0]).focus();
      if (t.length >= boxes.length) submit();
    });
  });

  cancelBtn.addEventListener('click', () => { hide(); if (pending) { pending.reject(); pending = null; } });

  return {
    isUnlocked,
    getText(i) {
      if (isUnlocked() && hasCrypto) return texts[i] || '';
      if (!hasCrypto) return (LETTERS[i] && LETTERS[i].text) || ''; // dự phòng nếu chưa mã hóa
      return '';
    },
    prompt() {
      return new Promise((resolve, reject) => {
        if (isUnlocked()) { resolve(); return; }
        pending = { resolve, reject };
        show();
      });
    },
    async tryAutoUnlock() {
      if (!hasCrypto) { unlocked = true; return; }
      let code = '';
      try { code = localStorage.getItem(STORE) || ''; } catch { /* bỏ qua */ }
      if (code) {
        const ok = await tryCode(code);
        if (!ok) { try { localStorage.removeItem(STORE); } catch { /* bỏ qua */ } }
      }
    },
  };
}
