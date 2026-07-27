// config.js — chuẩn hoá dữ liệu + hằng số tinh chỉnh + hàm tiện ích.
// Mọi module khác lấy dữ liệu/hằng số từ đây, không đụng thẳng vào data/.

import { CONFIG as RAW_CONFIG, LETTERS as RAW_LETTERS } from '../data/letters.js';

// Giá trị mặc định, để nếu data thiếu trường nào thì app vẫn chạy.
const DEFAULTS = {
  teacher: '',
  pageTitle: '',
  eyebrow: 'LỜI TRI ÂN',
  greetingTitle: '',
  greetingSubtitle: '',
  openButton: 'Mở những lời nhắn 💌',
  finaleTitle: 'Cảm ơn cô ạ!',
  finaleMessage: '',
};

export const CONFIG = { ...DEFAULTS, ...RAW_CONFIG };
export const LETTERS = Array.isArray(RAW_LETTERS) ? RAW_LETTERS : [];

// Bảng màu pastel cho bong bóng (dạng "r,g,b" để CSS ghép rgba(var(--c), a)).
export const PALETTE = [
  '255,133,171', // hồng
  '255,145,120', // cam san hô
  '255,183,120', // đào
  '255,213,120', // vàng
  '190,222,120', // cốm
  '130,222,170', // bạc hà
  '120,214,214', // ngọc
  '120,190,255', // xanh trời
  '150,160,255', // tím lam
  '190,150,255', // oải hương
  '224,140,235', // lan
  '255,150,200', // hồng phấn
];

// Tinh chỉnh chuyển động/kích thước bong bóng — sửa ở đây nếu muốn đổi cảm giác.
export const TUNE = {
  minSize: 76,      // px, bong bóng nhỏ nhất
  maxSize: 150,     // px, bong bóng lớn nhất
  sizeCap: 780,     // giới hạn bề rộng khi tính cỡ (để desktop không quá to)
  sizeDivisor: 4.4, // bề rộng / số này ~ cỡ cơ bản
  speedMin: 18,     // tốc độ trôi nhỏ nhất (px/giây)
  speedMax: 30,     // tốc độ trôi lớn nhất (px/giây)
  bounce: 1,        // độ nảy khi va chạm (1 = đàn hồi hoàn toàn, không dính; <1 = mất đà dần)
  gap: 0,           // ngưỡng chạm: 0 = chạm mép mới bật; âm = cho lún vào chút; dương = chừa hở
  edge: 8,          // lề (px) — tường để bong bóng bật lại
};

// ---- Hàm tiện ích ----

export function rand(min, max) {
  return min + Math.random() * (max - min);
}

export function pickColor(index) {
  // bước 5 để hai bong bóng cạnh nhau khác màu rõ
  return PALETTE[(index * 5) % PALETTE.length];
}

export function isAnon(letter) {
  return !letter || !letter.name || !letter.name.trim();
}

export function displayName(letter) {
  return isAnon(letter) ? 'Ẩn danh' : letter.name.trim();
}

export function escapeHtml(str) {
  return String(str).replace(/[&<>"]/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
  ));
}

// Tách văn bản thành các đoạn <p>: 1 dòng trống = ngắt đoạn, xuống dòng đơn = <br>.
export function toParagraphs(text) {
  return String(text)
    .trim()
    .split(/\n{2,}/)
    .map((p) => '<p>' + escapeHtml(p).replace(/\n/g, '<br>') + '</p>')
    .join('');
}
