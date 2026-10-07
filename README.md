# 💌 Thiệp 20/10 — Gửi Người Anh Yêu

Website thiệp chúc mừng **20/10 (Ngày Phụ Nữ Việt Nam)** được thiết kế riêng dành tặng người yêu / bạn gái / vợ. Dự án tập trung vào trải nghiệm cảm xúc, lãng mạn, hiện đại, đậm chất cinematic và hiệu ứng mở thiệp 3D sống động.

---

## 🌹 Trải Nghiệm Cảm Xúc (The Journey)

Website dẫn dắt người nhận qua một chuỗi cảm xúc được chuẩn bị kỹ lưỡng:

1. **Màn hình Loading Tối Giản:**
   - Biểu tượng `20 • 10` trang nhã: *"Preparing something special for you..."*
   - Tự động chuyển tiếp mượt mà sau 1.4s.

2. **Màn hình Mở Phong Bì Hoàng Gia (3D Envelope):**
   - Tiêu đề: *"Một món quà nhỏ dành riêng cho em. 20 • 10"*.
   - Chiếc phong bì 3D sắc đỏ rượu vang (Wine Burgundy) với con dấu sáp niêm phong (Wax Seal) ánh vàng.
   - Nhấp vào **"Mở thiệp yêu thương"**: Phong bì rung nhẹ → Con dấu mở → Nắp phong bì mở ngược 3D → Ánh sáng phát ra → Cánh hoa bay lượn → Lá thư trượt lên kiêu sa → Chuyển cảnh cinematic vào nội dung thiệp.

3. **Hero Section:**
   - Tiêu đề xuất hiện từng dòng: *"Gửi em, người con gái anh thương nhất. 20/10"*.
   - Chỉ dẫn cuộn xuống tự động biến mất khi lướt trang.

4. **Tâm Thư Tình Yêu (Love Letter):**
   - Bức thư tình đầy xúc động trên nền giấy da cao cấp, viền chỉ ánh vàng, lời văn chân thành, ấm áp.

5. **Bộ Sưu Tập Kỷ Niệm (Photo Gallery & Lightbox):**
   - *"Những khoảnh khắc anh muốn giữ lại thật lâu"*: Hiển thị ảnh nghệ thuật với bố cục bất đối xứng hiện đại.
   - Chạm vào bất kỳ ảnh nào để mở **Fullscreen Lightbox** với caption, nút chuyển ảnh Trước/Sau và phím tắt bàn phím (Trái/Phải/Esc).

6. **Điều Anh Yêu Ở Em (Love Reasons):**
   - *"Có rất nhiều điều khiến anh thương em"*: 5 thẻ tối giản (Nụ cười của em, Cách em quan tâm, Những lúc trẻ con, Cách em luôn nỗ lực, Em là chính em).

7. **Dòng Thời Gian Tình Yêu (Timeline):**
   - Hành trình tình yêu với đường line sáng dọc (Ngày đầu gặp nhau → Lần đầu nói chuyện thâu đêm → Lần đầu đi chơi → Những ngày bình yên → Những lần giận dỗi → Và hôm nay 20/10).

8. **Hộp Quà Bí Mật Tương Tác (Secret Gift Box):**
   - Chiếc hộp quà 3D với nơ vàng sang trọng.
   - Chạm vào hộp: Mở nắp cùng pháo hoa trái tim và thông điệp lời hứa cảm động xuất hiện.

9. **Lời Nhắn Cuối & Kết Thúc (Final Message):**
   - Không gian tối dần, lắng đọng và sâu sắc: *"Chúc em 20/10 thật vui. Yêu em. — Anh"*.
   - Huy hiệu `Happy Vietnamese Women's Day 20 • 10`.
   - Nút **"Đọc lại từ đầu"** để người thương có thể thưởng thức lại trọn vẹn hành trình bất kỳ lúc nào.

10. **Nhạc Nền Tinh Tế (Music Player):**
    - Nút nhạc floating sang trọng ở góc phải.
    - Phát file `/music/love-song.mp3` nếu có.
    - Nếu chưa có file mp3 hoặc trình duyệt chặn autoplay, tự động kích hoạt **Web Audio API Melody Synthesizer** tích hợp sẵn để phát giai điệu piano/chime êm dịu mà không bao giờ bị lỗi hay crash.

---

## 🎯 Cá Nhân Hóa Dễ Dàng

### 1. Đổi tên người nhận qua URL Parameter
Chỉ cần gửi đường link kèm `?to=Tên`, website sẽ tự động cập nhật tên người yêu vào toàn bộ thiệp:
- `https://your-domain.com/?to=Ngọc` ➔ *"Gửi Ngọc, người con gái anh thương nhất"*
- `https://your-domain.com/?to=Linh` ➔ *"Gửi Linh, người con gái anh thương nhất"*

### 2. Tùy chỉnh toàn bộ nội dung tại 1 file duy nhất
Mở file `config/card.ts` để chỉnh sửa:
- Tên người gửi (`sender`), người nhận (`receiver`)
- Nội dung bức thư tình (`letter.paragraphs`)
- Danh sách 5 lý do yêu (`reasons.items`)
- Các mốc thời gian kỷ niệm (`timeline.events`)
- Danh sách ảnh và caption (`gallery.photos`)
- Lời hứa trong hộp quà (`gift.revealedMessage`)
- Lời nhắn cuối và chữ ký (`finalMessage`)

### 3. Thêm bài hát riêng của hai bạn
Đặt file nhạc định dạng `.mp3` vào thư mục:
```text
public/music/love-song.mp3
```

---

## 🛠️ Công Nghệ Sử Dụng

- **Next.js 16 (App Router & React 19)**
- **Tailwind CSS v4**
- **Framer Motion**: Animation cinematic và hiệu ứng phong bì 3D
- **Lucide React**: Hệ thống icon trang nhã (không sử dụng emoji làm icon giao diện)
- **canvas-confetti**: Hiệu ứng pháo hoa trái tim chúc mừng
- **Web Audio API**: Bộ phát giai điệu âm thanh êm dịu tích hợp sẵn
- **Google Fonts**: Playfair Display, Cormorant Garamond, Dancing Script, Plus Jakarta Sans

---

## 🚀 Hướng Dẫn Chạy & Deploy

### Chạy cục bộ (Local Development)
```bash
npm install
npm run dev
```
Mở trình duyệt: **http://localhost:3000** hoặc **http://localhost:3000/?to=Ngọc**

### Kiểm tra Code & Build
```bash
npm run lint    # Kiểm tra TypeScript & ESLint (0 lỗi)
npm run build   # Build production thành công 100%
```

### Triển khai lên Vercel (1 Click Deploy)
1. Đẩy project lên GitHub.
2. Đăng nhập [vercel.com](https://vercel.com/) và chọn Import repository.
3. Nhấn **Deploy** — Vercel sẽ tự động build và cấp tên miền miễn phí.
