// state.js — theo dõi những thư đã đọc và lưu vào localStorage,
// để cô đóng/mở lại vẫn giữ được tiến trình. Phát sự kiện khi có thay đổi.

import { CONFIG, LETTERS } from './config.js';

const KEY = 'tribute_read_' + (CONFIG.teacher || 'default');
const listeners = [];

function load() {
  try {
    const arr = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

const read = new Set(load());

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify([...read]));
  } catch {
    /* chế độ riêng tư / hết dung lượng: bỏ qua, app vẫn chạy trong phiên */
  }
}

function emit() {
  for (const fn of listeners) fn(read.size, LETTERS.length);
}

export function isRead(i) {
  return read.has(i);
}

// Trả về true nếu đây là lần đầu đánh dấu (để bên ngoài chạy hiệu ứng).
export function markRead(i) {
  if (read.has(i)) return false;
  read.add(i);
  save();
  emit();
  return true;
}

export function readCount() {
  return read.size;
}

export function total() {
  return LETTERS.length;
}

export function allRead() {
  return LETTERS.length > 0 && read.size >= LETTERS.length;
}

export function onChange(fn) {
  listeners.push(fn);
}

// Xoá toàn bộ trạng thái đã đọc (nút đặt lại).
export function clearRead() {
  read.clear();
  save();
  emit();
}

// ---- Kiểu chuyển động bong bóng: 'float' (trôi/va chạm) | 'rise' (bay lên) ----
const MODE_KEY = 'tribute_mode_' + (CONFIG.teacher || 'default');
let motionMode = localStorage.getItem(MODE_KEY) === 'rise' ? 'rise' : 'float';

export function getMode() {
  return motionMode;
}

export function setMode(m) {
  motionMode = m === 'rise' ? 'rise' : 'float';
  try { localStorage.setItem(MODE_KEY, motionMode); } catch { /* bỏ qua */ }
}
