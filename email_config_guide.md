# Hướng Dẫn Tích Hợp Gửi Mail Tự Động Qua Google Workspace

Để gửi email nhắc nhở tự động bằng địa chỉ email **`ieltsonline@ducthangbui.com`** (sử dụng dịch vụ Google Workspace), bạn cần thực hiện 2 phần cấu hình chính: **Thiết lập bảo mật trên tài khoản Google** và **Cấu hình biến môi trường trên Web App**.

---

## PHẦN 1: Tạo Mật Khẩu Ứng Dụng (App Password) trên Google Workspace

Google mặc định chặn đăng nhập trực tiếp bằng mật khẩu thông thường từ các ứng dụng bên thứ ba (Nodemailer). Bạn bắt buộc phải tạo **Mật khẩu ứng dụng (App Password - gồm 16 ký tự)**:

### Các bước thực hiện:
1. Đăng nhập vào tài khoản **`ieltsonline@ducthangbui.com`** trên trình duyệt.
2. Truy cập trang quản lý tài khoản Google tại: [myaccount.google.com](https://myaccount.google.com/).
3. Tại menu bên trái, chọn tab **Bảo mật** (Security).
4. Kiểm tra mục **Xác minh 2 bước** (2-Step Verification):
   * **Bắt buộc:** Trạng thái phải là **ĐÃ BẬT** (ON). Nếu chưa bật, bạn hãy làm theo hướng dẫn của Google để bật Xác minh 2 bước.
5. Sau khi đã bật Xác minh 2 bước, gõ tìm kiếm cụm từ **"Mật khẩu ứng dụng"** (hoặc **"App Passwords"**) ở thanh tìm kiếm phía trên cùng trang tài khoản.
6. Tại trang tạo Mật khẩu ứng dụng:
   * **Chọn ứng dụng:** Chọn `Khác (Tên tùy chỉnh)` hoặc `Other (Custom name)`.
   * **Nhập tên:** Ví dụ nhập `Speaking Manager App`.
   * Click nút **Tạo** (Generate).
7. Hệ thống sẽ hiển thị một ô màu vàng chứa **Mật khẩu ứng dụng gồm 16 chữ cái** (Ví dụ: `abcd efgh ijkl mnop`).
8. **Sao chép và lưu mật khẩu này lại** (bỏ đi các khoảng trắng). Đây sẽ là mật khẩu dùng để kết nối SMTP từ ứng dụng.

---

## PHẦN 2: Cấu Hình Biến Môi Trường (Environment Variables)

### 1. Khi chạy local (Chạy thử nghiệm trên máy tính của bạn)
Mở file `web/.env` trên máy tính của bạn và thêm các dòng cấu hình sau (không sửa đổi hay xóa những dòng cũ):

```env
# Cấu hình SMTP gửi mail qua Google Workspace
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=ieltsonline@ducthangbui.com
SMTP_PASS=abcdefghijklmnop  # Thay bằng 16 ký tự Mật khẩu ứng dụng vừa tạo (viết liền không khoảng cách)
```

> [!WARNING]
> Tuyệt đối không đẩy file `.env` chứa mật khẩu này lên GitHub (file này đã được chặn trong `.gitignore`).

### 2. Khi Deploy lên Vercel (Production)
Khi bạn đưa ứng dụng lên Vercel để chạy chính thức:
1. Truy cập vào Dashboard dự án trên **Vercel** ➔ Chọn tab **Settings** ➔ Chọn mục **Environment Variables**.
2. Thêm lần lượt 5 cặp Key - Value giống như cấu hình ở file `.env` phía trên:
   * Key: `SMTP_HOST` | Value: `smtp.gmail.com`
   * Key: `SMTP_PORT` | Value: `465`
   * Key: `SMTP_SECURE` | Value: `true`
   * Key: `SMTP_USER` | Value: `ieltsonline@ducthangbui.com`
   * Key: `SMTP_PASS` | Value: `[16_ký_tự_mật_khẩu_ứng_dụng]`
3. Nhấn **Save** để lưu lại. Vercel sẽ tự động áp dụng các biến này trong lần build tiếp theo.

---

## PHẦN 3: Cách Thử Nghiệm Gửi Mail

Hệ thống đã được tích hợp sẵn Nodemailer, khi bạn gọi API Cron (ví dụ qua URL), nó sẽ gửi email thực tế thay vì mock logs:

1. Chạy dự án ở local: `npm run dev` (trong thư mục `web`).
2. Gửi một request GET (dùng trình duyệt hoặc Postman) đến API:
   * **Nhắc lịch sáng nay:** `http://localhost:3000/api/cron/reminders?type=morning`
   * **Nhắc trước 30 phút:** `http://localhost:3000/api/cron/reminders?type=before_30_min`
   * **Weekly Summary cho Giáo viên:** `http://localhost:3000/api/cron/reminders?type=teacher_summary`
3. Kiểm tra hòm thư nhận để xem email định dạng HTML đã được gửi thành công từ địa chỉ `ieltsonline@ducthangbui.com`.
