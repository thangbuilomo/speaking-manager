# Tiến Độ Dự Án: Hệ Thống Quản Lý Ca Học Speaking

## Đã hoàn thành (Cập nhật: 20/05/2026)

### 1. Phân Tích & Lập Kế Hoạch
- [x] Hoàn thiện tài liệu đặc tả chức năng chi tiết (`web-function.md`).
- [x] Lập kế hoạch phát triển 4 giai đoạn & xác định tech stack (`development_plan.md`).
- [x] Xác định các Antigravity Skills cần thiết để hỗ trợ phát triển.

### 2. Khởi Tạo Dự Án
- [x] Khởi tạo dự án Frontend với Next.js (thư mục `web`).
- [x] Tích hợp Tailwind CSS và thiết lập cấu trúc layout cơ bản (`globals.css`, `layout.tsx`).

### 3. Phát Triển Giao Diện (Frontend MVP)
- [x] Xây dựng trang Đăng nhập (`/login`) phục vụ điều hướng cho các Role.
- [x] Xây dựng Component `DashboardLayout` cho trang quản trị.
- [x] **AM Dashboard (`/am/dashboard`)**:
  - Xây dựng giao diện thống kê tổng quan (số ca hôm nay, ca trống, ca đã gán, ca chờ bù).
  - Tạo khối hiển thị Cảnh báo công việc cần xử lý khẩn cấp.
  - Tạo khối danh sách Lịch học sắp diễn ra.
- [x] **Teacher Dashboard (`/teacher/dashboard`)**:
  - Xây dựng giao diện chào mừng và thống kê cá nhân.
  - Tạo các nút thao tác nhanh (Gửi lời nhắn, Đăng ký ca rảnh).
  - Xây dựng danh sách lịch dạy trong ngày.
  - Tạo khối cảnh báo nhắc nhở các ca học chưa nhập nhận xét/điểm.

### 4. Kiểm Thử Giao Diện (UI Testing)
- [x] Xây dựng kịch bản tự động hóa bằng Playwright (`test_ui.py`).
- [x] Thiết lập luồng test tự động: Đăng nhập giả lập và chụp ảnh màn hình (screenshot) cho AM Dashboard và Teacher Dashboard.

---

## Các Bước Tiếp Theo (Giai đoạn 1 - Lõi Hệ Thống)
- [x] Thiết kế và khởi tạo Database Schema (PostgreSQL với Prisma ORM).
- [x] Xây dựng Backend APIs cơ bản (Next.js App Router).
- [x] Kết nối API với hệ thống Auth thực tế (Tạo API `/api/auth/login`).
- [x] Thực hiện tính năng: Giáo viên đăng ký ca rảnh (Tạo API `/api/availability`).
- [x] Thực hiện tính năng: AM tạo ca học và gán Học viên (Tạo API `/api/sessions` và `/api/bookings`).
