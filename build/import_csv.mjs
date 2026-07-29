// build/import_csv.mjs — Nạp câu trả lời từ file CSV (export từ Form) vào hệ thống.
// Áp logic: ẩn danh -> "<Con vật> ẩn danh"; giữ tên -> lấy 2 chữ cuối.
// Sau khi ghi data/letters.source.js sẽ TỰ CHẠY mã hóa (build/encrypt.mjs).
//
// Cách dùng:
//   node build/import_csv.mjs                # tự tìm file .csv mới nhất trong thư mục gốc
//   node build/import_csv.mjs "duong/dan.csv"
//
// Lưu ý: file .csv (chứa bản rõ) đã được .gitignore, không đẩy lên.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');

// 30 con vật (kiểu ẩn danh của Google Docs)
const ANIMALS = [
  'Chuột túi', 'Gấu trúc', 'Cáo', 'Hươu cao cổ', 'Chim cánh cụt', 'Sư tử',
  'Hổ', 'Voi', 'Cú mèo', 'Nhím', 'Sóc', 'Rái cá', 'Hải cẩu', 'Cá heo',
  'Tê giác', 'Hà mã', 'Lạc đà', 'Koala', 'Báo đốm', 'Ngựa vằn', 'Bạch tuộc',
  'Rùa biển', 'Thỏ', 'Công', 'Vẹt', 'Chồn', 'Gấu Bắc Cực', 'Đại bàng',
  'Cá voi', 'Sao la',
];

// Tên bị ép ẩn danh dù trả lời "Không" (troll). Khớp theo chuỗi con, không phân biệt hoa thường.
// Thêm tên vào đây nếu gặp trường hợp tương tự.
const FORCE_ANON = ['2k4 yếu nhất lab'];

// ---- Tìm file CSV ----
let csvPath = process.argv[2];
if (!csvPath) {
  const csvs = readdirSync(root)
    .filter((f) => f.toLowerCase().endsWith('.csv'))
    .map((f) => ({ f, t: statSync(resolve(root, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t);
  if (!csvs.length) { console.error('Không tìm thấy file .csv nào trong', root); process.exit(1); }
  csvPath = resolve(root, csvs[0].f);
  console.log('Dùng file:', csvs[0].f);
}

// ---- Đọc + parse CSV (hỗ trợ dấu ngoặc kép, phẩy/xuống dòng trong ô) ----
let raw = readFileSync(csvPath, 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
function parseCSV(str) {
  const rows = []; let row = [], cur = '', q = false;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (q) {
      if (c === '"') { if (str[i + 1] === '"') { cur += '"'; i++; } else q = false; }
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cur); cur = ''; }
    else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
    else if (c === '\r') { /* bỏ */ }
    else cur += c;
  }
  if (cur.length || row.length) { row.push(cur); rows.push(row); }
  return rows;
}
const rows = parseCSV(raw);
const headers = rows[0].map((h) => h.trim());
const find = (kw) => headers.findIndex((h) => h.toLowerCase().includes(kw));
const ci = {
  id: find('id'),
  name: find('tên của bạn') >= 0 ? find('tên của bạn') : find('tên'),
  letter: find('tâm thư') >= 0 ? find('tâm thư') : find('lời'),
  anon: find('ẩn danh'),
};
if (ci.name < 0 || ci.letter < 0 || ci.anon < 0) {
  console.error('Không nhận ra cột. Header:', headers);
  process.exit(1);
}

// ---- Logic ----
function isAnonAnswer(v) { return (v || '').trim().toLowerCase().startsWith('có'); }
function titleWord(w) { return w ? w[0].toLocaleUpperCase('vi') + w.slice(1) : w; }
function lastTwoWords(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.slice(-2).map(titleWord).join(' ');
}
function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

const usedAnimals = new Set();
function animalFor(seed) {
  let idx = hash(seed) % ANIMALS.length;
  for (let k = 0; k < ANIMALS.length; k++) {
    const j = (idx + k) % ANIMALS.length;
    if (!usedAnimals.has(j)) { usedAnimals.add(j); return ANIMALS[j]; }
  }
  return ANIMALS[idx]; // >30 người ẩn danh: cho lặp lại
}

const data = rows.slice(1).filter((r) => r.some((c) => c && c.trim()));

// Gộp record từ CSV + file phụ (data/extra-letters.js). Extras nối vào cuối và
// được giữ lại qua mỗi lần import CSV mới.
const records = data.map((r) => ({
  rawName: (r[ci.name] || '').trim(),
  text: (r[ci.letter] || '').trim(),
  anonAns: (r[ci.anon] || '').trim(),
  seed: (ci.id >= 0 && r[ci.id]) ? String(r[ci.id]) : (r[ci.letter] || ''),
}));

let extras = [];
try {
  const ex = await import(pathToFileURL(resolve(root, 'data/extra-letters.js')).href + '?t=' + Date.now());
  extras = (ex.EXTRAS || []).map((e, i) => ({
    rawName: (e.name || '').trim(),
    text: (e.text || '').trim(),
    anonAns: e.anon === false ? 'Không' : 'Có',
    seed: 'extra-' + i,
  }));
} catch { /* không có file phụ, bỏ qua */ }

const letters = [];
const report = [];
for (const rec of records.concat(extras)) {
  const { rawName, text, anonAns, seed } = rec;
  if (!text) continue; // bỏ dòng trống thư
  const forced = FORCE_ANON.some((t) => rawName.toLowerCase().includes(t.toLowerCase()));
  const anon = isAnonAnswer(anonAns) || forced || !rawName;
  const display = anon
    ? animalFor(seed) + ' ẩn danh'
    : (lastTwoWords(rawName) || animalFor(seed) + ' ẩn danh');
  letters.push({ name: display, text });
  report.push({
    goc: rawName || '(trống)',
    hien: display,
    anon: anon ? (forced && !isAnonAnswer(anonAns) ? 'ẩn danh (ép/troll)' : 'ẩn danh') : 'giữ tên',
  });
}

// ---- Giữ nguyên CONFIG hiện có, chỉ thay LETTERS ----
let CONFIG;
try {
  const cur = await import(pathToFileURL(resolve(root, 'data/letters.source.js')).href + '?t=' + Date.now());
  CONFIG = { ...cur.CONFIG };
  delete CONFIG.crypto;
} catch {
  CONFIG = { teacher: 'Nguyễn Thị Thu Trang', pageTitle: 'Bubble Card' };
}

const header =
  '// BẢN GỐC (bản rõ) — KHÔNG đẩy lên. Tự sinh từ CSV bởi build/import_csv.mjs.\n' +
  '// Có thể sửa tay; đổi CONFIG ở đây cũng được. Sau đó chạy: node build/encrypt.mjs\n';
const out =
  header +
  '\nexport const CONFIG = ' + JSON.stringify(CONFIG, null, 2) + ';\n' +
  '\nexport const LETTERS = ' + JSON.stringify(letters, null, 2) + ';\n';
writeFileSync(resolve(root, 'data/letters.source.js'), out);

console.log('\n=== KẾT QUẢ (' + letters.length + ' thư) ===');
report.forEach((x, i) => console.log(
  String(i + 1).padStart(2) + '. ' + x.goc + '  ->  "' + x.hien + '"  [' + x.anon + ']'));

console.log('\n=== Mã hóa lại (build/encrypt.mjs) ===');
const res = spawnSync('node', [resolve(__dir, 'encrypt.mjs')], { stdio: 'inherit' });
process.exit(res.status || 0);
