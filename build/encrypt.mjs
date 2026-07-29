// build/encrypt.mjs — Mã hóa nội dung thư từ bản rõ (data/letters.source.js)
// thành bản đã mã hóa (data/letters.js) để đẩy lên. Tên hiển thị vẫn để rõ,
// chỉ NỘI DUNG thư được mã hóa bằng mã bí mật (AES-256-GCM, khóa từ PBKDF2).
//
// Cách dùng:
//   node build/encrypt.mjs          # dùng lại mã cũ trong SECRET-CODE.txt (nếu có), không thì sinh mới
//   node build/encrypt.mjs --new    # ép sinh mã mới
//   CODE=ABC234 node build/encrypt.mjs   # tự đặt mã
//
// Mã được lưu ở SECRET-CODE.txt (đã .gitignore) và in ra màn hình.

import crypto from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');
const SRC = resolve(root, 'data/letters.source.js');
const OUT = resolve(root, 'data/letters.js');
const CODEFILE = resolve(root, 'SECRET-CODE.txt');

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // bỏ ký tự dễ nhầm (I,O,0,1)
function genCode(n) {
  const bytes = crypto.randomBytes(n);
  let s = '';
  for (let i = 0; i < n; i++) s += ALPHABET[bytes[i] % ALPHABET.length];
  return s;
}

const { CONFIG, LETTERS } = await import(pathToFileURL(SRC).href);

// Chọn mã: biến môi trường CODE > SECRET-CODE.txt > sinh mới
let code = (process.env.CODE || '').trim().toUpperCase();
if (!code && existsSync(CODEFILE)) code = readFileSync(CODEFILE, 'utf8').trim().toUpperCase();
if (!code || process.argv.includes('--new')) code = genCode(6);

const salt = crypto.randomBytes(16);
const iterations = 250000;
const key = crypto.pbkdf2Sync(code, salt, iterations, 32, 'sha256');

function encrypt(text) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ct = Buffer.concat([c.update(String(text), 'utf8'), c.final()]);
  const tag = c.getAuthTag();
  return Buffer.concat([iv, ct, tag]).toString('base64'); // iv | ciphertext | tag
}

const outConfig = { ...CONFIG };
delete outConfig.crypto;
outConfig.crypto = {
  salt: salt.toString('base64'),
  iterations,
  verifier: encrypt('bubble-card-ok'),
};

const outLetters = LETTERS.map((l) => ({ name: l.name || '', enc: encrypt(l.text || '') }));

const banner =
  '// TỆP TỰ SINH — ĐỪNG SỬA TAY.\n' +
  '// Nội dung thư đã được MÃ HÓA. Sửa thư ở data/letters.source.js rồi chạy:\n' +
  '//   node build/encrypt.mjs\n';

const body =
  banner +
  '\nexport const CONFIG = ' + JSON.stringify(outConfig, null, 2) + ';\n' +
  '\nexport const LETTERS = ' + JSON.stringify(outLetters, null, 2) + ';\n';

writeFileSync(OUT, body);
writeFileSync(CODEFILE, code + '\n');

console.log('Đã mã hóa ' + outLetters.length + ' lá thư -> data/letters.js');
console.log('MÃ BÍ MẬT: ' + code);
