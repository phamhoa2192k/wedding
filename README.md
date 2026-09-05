# 💍 Website Thiệp Cưới Điện Tử (Digital Wedding Invitation)

Website thiệp cưới thuần HTML, CSS và JavaScript được thiết kế bám sát theo mẫu thiết kế từ thư mục `template/` (`1.jpg`, `2.jpg`, `3.jpg`), tối ưu hóa hiển thị trên di động (Mobile-First) và sẵn sàng host miễn phí trên **GitHub Pages**.

---

## 🎨 1. Cách Đổi Tông Màu (Theme)

Website hỗ trợ 5 tông màu thịnh hành cho đám cưới:
- `'green'` : **Xanh Rêu Ô-liu** (Mặc định chuẩn theo bản thiết kế mẫu)
- `'gold'` : **Vàng Ánh Kim / Hoàng Gia** (Luxury Champagne)
- `'red'` : **Đỏ Truyền Thống / Á Đông** (Crimson & Gold)
- `'pink'` : **Hồng Pastel / Lãng Mạn** (Romantic Blush)
- `'navy'` : **Xanh Navy / Quý Phái** (Navy Blue & Gold)

### 👉 Cách đổi:
Mở file `js/config.js`, tìm dòng đầu tiên và đổi giá trị của `theme`:
```javascript
const WEDDING_CONFIG = {
  theme: 'gold', // Đổi thành 'gold', 'red', 'green', 'pink', hoặc 'navy'
  ...
};
```
> **Mẹo:** Bạn cũng có thể bấm vào biểu tượng khay màu tròn ở góc phải bên dưới màn hình để bấm xem thử ngay lập tức các tông màu trực tiếp trên trình duyệt!

---

## 🖼️ 2. Cách Thay Đổi Ảnh Cưới Của Bạn

Hiện tại trang web đang sử dụng ảnh cưới mẫu (placeholder) trong thư mục `assets/images/`.

Khi có ảnh cưới thật, bạn có thể thực hiện 1 trong 2 cách sau:

### Cách 1 (Nhanh nhất):
Copy ảnh thật của bạn vào thư mục `assets/images/` với đúng các tên file sau để tự động thay thế:
- `hero.jpg`: Ảnh bìa cưới đầu trang (ảnh chân dung hoặc toàn thân)
- `save_date_bg.jpg`: Ảnh nền vòm hoa/ngoại cảnh cho card Save The Date
- `save_date_1.jpg`, `save_date_2.jpg`, `save_date_3.jpg`: 3 ảnh trong lưới Save The Date
- `couple_groom.jpg`, `couple_bride.jpg`: 2 ảnh chân dung Chú Rể & Cô Dâu
- `gallery_1.jpg` đến `gallery_7.jpg`: Các ảnh trong album kỷ niệm (*Our Memories*)

> **Lưu ý**: Toàn bộ khung ảnh đã được cố định kích thước 100% bằng CSS (`object-fit: cover`). Bạn có thể sử dụng ảnh ngang, ảnh dọc hay ảnh vuông tùy thích mà không sợ bị méo hình (distort), vỡ khung hay biến dạng tỷ lệ! Riêng ảnh Chú Rể & Cô Dâu đã được tối ưu căn giữa phần trên (focus khuôn mặt).

### Cách 2:
Mở file `js/config.js` và tùy chỉnh đường dẫn ảnh trong mục `images`:
```javascript
images: {
  hero: 'assets/images/anh_cua_ban.jpg',
  ...
}
```

---

## ✍️ 3. Tùy Chỉnh Thông Tin Đám Cưới (Đồng Bộ Động 100%)

Toàn bộ nội dung hiển thị trên website được **đồng bộ tự động 100% từ file [js/config.js](js/config.js)** thông qua JavaScript. Bạn **chỉ cần sửa đúng 1 file này**, toàn bộ website sẽ tự động cập nhật mà không cần chỉnh sửa mã HTML:
- **Tên Cô Dâu & Chú Rể**: Tự động cập nhật ở Hero Capsule, mục Cặp đôi và form RSVP.
- **Họ tên Bố Mẹ 2 bên**: Nhà trai & Nhà gái.
- **Ngày giờ & Lịch trình**: Cập nhật đồng hồ đếm ngược, quả trám Hero, bloc lịch Save The Date, dòng ngày Thư mời, và các mốc Timeline.
- **Địa điểm & Bản đồ**: Tên tư gia/trung tâm tiệc cưới, địa chỉ và link Google Maps.
- **Hộp mừng cưới & VietQR**: Tên ngân hàng, số tài khoản, chủ tài khoản và mã QR động.
- **Đường dẫn ảnh cưới & Nhạc nền**: Tự động load ảnh và nhạc theo cấu hình.

---

## 🚀 4. Hướng Dẫn Host Lên GitHub Pages (Miễn Phí 100%)

Trang web chỉ gồm các file tĩnh thuần HTML/CSS/JS nên có thể đưa lên GitHub Pages cực kỳ dễ dàng:

1. **Khởi tạo Git & Đẩy code lên GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Thiệp cưới điện tử"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-cua-ban>/wedding.git
   git push -u origin main
   ```
2. **Kích hoạt GitHub Pages**:
   - Vào repository trên GitHub -> Bấm tab **Settings**.
   - Ở cột bên trái, chọn mục **Pages**.
   - Tại phần **Branch**, chọn nhánh `main` và thư mục `/ (root)` -> Bấm **Save**.
3. **Hoàn tất**:
   - Sau khoảng 1-2 phút, GitHub sẽ cấp cho bạn đường link trang web có dạng:
     `https://<tai-khoan-cua-ban>.github.io/wedding/`
   - Bạn có thể gửi link này cho bạn bè, người thân hoặc quét mã QR in trên thiệp giấy!
