# Bong bóng tri ân 💌

Mini web app gửi lời tri ân tới cô. Mỗi sinh viên là một **bong bóng** trôi nhẹ lên;
chạm vào bong bóng, nó **nở ra thành một tấm thư** để cô đọc. Đọc xong bong bóng gắn
một trái tim ❤. Đọc hết thì có **màn kết + pháo giấy**.

Thiết kế **ưu tiên điện thoại** (để cô quét QR đọc trên máy), nhưng vẫn đẹp trên máy tính.

---

## 1. Sửa nội dung + mã hóa (quan trọng)

Nội dung thư được **mã hóa** trước khi đẩy lên, nên phải sửa ở **bản gốc** rồi chạy
lệnh mã hóa — KHÔNG sửa thẳng `data/letters.js` (đó là bản đã mã hóa, tự sinh).

1. Mở **`data/letters.source.js`** (bản rõ, không bị đẩy lên GitHub) và sửa:
   - **`CONFIG`**: tên cô, câu đề tặng màn chào, lời cảm ơn màn kết.
   - **`LETTERS`**: mỗi sinh viên một dòng:
     ```js
     { name: 'Tên hiển thị', text: `Nội dung tâm thư...` },
     ```
   - Ẩn danh: để `name: ''` → bong bóng ghi **"Ẩn danh"**.
   - Xuống dòng bằng Enter trong dấu backtick `` ` ``; để **một dòng trống** để tách đoạn.
2. Chạy mã hóa:
   ```bash
   node build/encrypt.mjs
   ```
   Lệnh này tạo `data/letters.js` (đã mã hóa) và giữ nguyên **mã bí mật** trong
   `SECRET-CODE.txt`. Muốn đổi mã mới: `node build/encrypt.mjs --new`
   (hoặc đặt tay: `CODE=ABC234 node build/encrypt.mjs`).
3. Commit + push (chỉ đẩy bản đã mã hóa; bản rõ và mã đã được `.gitignore`).

**Khóa xem:** ai vào cũng thấy bong bóng/tên/giao diện, nhưng **mở đọc thư phải nhập
mã** (in kèm QR / gửi riêng cô). Nhập đúng 1 lần thì thiết bị đó nhớ luôn. Không có mã
thì kể cả mở source cũng chỉ thấy chuỗi đã mã hóa.

> `tên` hiển thị công khai (không mã hóa) để còn vẽ bong bóng; chỉ **nội dung thư** được mã hóa.

---

## 2. Chạy thử trên máy

App dùng ES modules nên **phải mở qua một web server**, không mở trực tiếp bằng cách
double-click file (trình duyệt sẽ chặn vì lý do bảo mật). Chạy một server tĩnh trong
thư mục này:

```bash
# cách 1: Python (thường có sẵn)
python3 -m http.server 8080

# cách 2: Node
npx serve .
```

Rồi mở `http://localhost:8080`.

**Xem thử trên điện thoại (cùng wifi):** thay `localhost` bằng IP máy tính, ví dụ
`http://192.168.1.10:8080`. Xem IP bằng `hostname -I` (Linux) hoặc `ipconfig` (Windows).

Tiến trình "đã đọc" lưu trong trình duyệt (localStorage). Muốn xem lại từ đầu:
xoá dữ liệu site đó, hoặc mở tab ẩn danh.

---

## 3. Đưa lên mạng (để tạo QR)

Chọn **một** cách miễn phí, kéo/thả cả thư mục:

- **Netlify Drop** — vào https://app.netlify.com/drop, kéo thả cả thư mục `bong-bong-tri-an`. Xong có link ngay.
- **Vercel** — `npm i -g vercel` rồi chạy `vercel` trong thư mục này.
- **GitHub Pages** — đẩy thư mục lên một repo, bật Pages ở nhánh chính.

Sau khi có link (ví dụ `https://ten-cua-ban.netlify.app`), tạo **QR** từ link đó
(vào https://qr.io hoặc bất kỳ trang tạo QR nào), in ra và dán vào quà.

---

## 4. Cấu trúc dự án

```
bong-bong-tri-an/
├── index.html            khung trang, nạp css + module
├── data/
│   └── letters.js        ★ nội dung (bạn sửa ở đây)
├── css/
│   ├── base.css          reset, màu, nền
│   ├── bubbles.css       bong bóng + trạng thái đã đọc
│   ├── letter.css        tấm thư + điều hướng
│   └── screens.css       màn chào / tiến trình / màn kết
└── js/
    ├── config.js         hằng số (màu, tốc độ...) + hàm tiện ích
    ├── state.js          theo dõi "đã đọc" + lưu localStorage
    ├── dom.js            gom tham chiếu DOM
    ├── bubbles.js        tạo bong bóng + chuyển động + pause
    ├── letter.js         mở/đóng/chuyển thư (hiệu ứng nở)
    ├── confetti.js       pháo giấy màn kết
    ├── ui.js             màn chào / topbar / hint / màn kết
    └── main.js           lắp ráp mọi thứ
```

## 5. Chỉnh nhanh vài thứ hay dùng

- **Cảm giác chuyển động bong bóng** (tốc độ, cỡ, độ lắc): sửa `TUNE` trong `js/config.js`.
- **Bảng màu bong bóng**: sửa `PALETTE` trong `js/config.js`.
- **Chữ trên thanh tiến trình / nút**: `js/ui.js`.
- **Màu giấy thư, nền**: các biến `--paper1/--paper2/--bg1...` đầu file `css/base.css`.
