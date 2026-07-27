// dom.js — gom tất cả tham chiếu phần tử DOM về một chỗ.
// Script nạp dạng module (defer sẵn) nên DOM đã sẵn sàng khi file này chạy.

const $ = (id) => document.getElementById(id);

export const el = {
  // nền vũ trụ
  space: $('space'),

  // vùng bong bóng
  field: $('field'),

  // màn chào
  welcome: $('welcome'),
  eyebrow: $('eyebrow'),
  gtitle: $('gtitle'),
  gsub: $('gsub'),
  openBtn: $('openBtn'),

  // thanh tiến trình + gợi ý
  topbar: $('topbar'),
  progress: $('progress'),
  hint: $('hint'),

  // cụm nút góc + toast chế độ
  tools: $('tools'),
  gridBtn: $('gridBtn'),
  modeBtn: $('modeBtn'),
  resetBtn: $('resetBtn'),
  modeToast: $('modeToast'),

  // màn xem toàn bộ
  gridView: $('gridView'),
  gridBody: $('gridBody'),
  gridCount: $('gridCount'),
  gridClose: $('gridClose'),
  gridFromFinale: $('gridFromFinale'),

  // lớp phủ thư
  overlay: $('overlay'),
  backdrop: $('backdrop'),
  card: $('letter'),
  closeBtn: $('closeBtn'),
  scroll: $('scroll'),
  fromEl: $('from'),
  bodyEl: $('body'),
  signEl: $('sign'),
  countEl: $('count'),
  prevBtn: $('prev'),
  nextBtn: $('next'),

  // màn kết + pháo giấy
  confetti: $('confetti'),
  finale: $('finale'),
  ftitle: $('ftitle'),
  fmsg: $('fmsg'),
  finaleClose: $('finaleClose'),
};
