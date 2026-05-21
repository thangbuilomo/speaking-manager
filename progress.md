# Tiến Độ Dự Án: Hệ Thống Quản Lý Ca Học Speaking

## Đã hoàn thành (Cập nhật: 21/05/2026)

### 1. Phân Tích & Lập Kế Hoạch
- [x] Hoàn thiện tài liệu đặc tả chức năng chi tiết (`web-function.md`).
- [x] Lập kế hoạch phát triển 4 giai đoạn & xác định tech stack (`development_plan.md`).
- [x] Xác định các Antigravity Skills cần thiết để hỗ trợ phát triển.

### 2. Khởi Tạo Dự Án & Git Setup
- [x] Khởi tạo dự án Frontend với Next.js (thư mục `web`).
- [x] Tích hợp Tailwind CSS và thiết lập cấu trúc layout cơ bản (`globals.css`, `layout.tsx`).
- [x] Thiết lập file `.gitignore` an toàn ở root và thư mục con để ẩn file `.env` chứa thông tin nhạy cảm.
- [x] Khởi tạo git và đẩy dự án lên GitHub thành công (`thangbuilomo/speaking-manager`).

### 3. Giai đoạn 1: Lõi Hệ Thống & Giao Diện MVP
- [x] Xây dựng trang Đăng nhập (`/login`) xử lý phân quyền.
- [x] Xây dựng Component `DashboardLayout` dùng chung.
- [x] **AM Dashboard (`/am/dashboard`)**: Khối thống kê, Khối cảnh báo khẩn cấp và Danh sách lịch học hôm nay.
- [x] **Teacher Dashboard (`/teacher/dashboard`)**: Giao diện chào mừng, Hành động nhanh, Thống kê cá nhân, Lịch dạy trong ngày và Cảnh báo ca chưa nhận xét.
- [x] Thiết kế Database Schema hoàn chỉnh với PostgreSQL & Prisma ORM (`prisma/schema.prisma`).
- [x] Xây dựng API Auth đăng nhập thực tế (`/api/auth/login`).
- [x] Xây dựng API Quản lý Ca học & Xếp lịch (`/api/sessions`, `/api/bookings`).
- [x] Xây dựng API đăng ký ca rảnh của Giáo viên (`/api/availability`).
- [x] Viết kịch bản tự động kiểm thử UI Playwright cho Mobile & Desktop (`test_ui.py`, `test_mobile_ui.py`).

### 4. Giai đoạn 2: Cổng Học Viên, Đổi Lịch & Nhắc Nhở Tự Động
- [x] **Cổng Học Viên (Student Portal)**:
  - Cho phép Học viên đăng nhập bằng Email/Password thông qua `/api/auth/login`.
  - Thiết kế trang Dashboard Học viên (`/student/dashboard`) hiển thị thông tin gói học, số buổi còn lại, lịch học sắp tới và bảng điểm/nhận xét từ giáo viên.
  - Cập nhật `DashboardLayout` hiển thị menu tương ứng cho học viên.
- [x] **Quản lý Đổi Lịch (Reschedule) & Ca Bù (Makeup Requests)**:
  - Xây dựng trang Đổi lịch & Ca bù dành cho học viên (`/student/reschedule`) kèm form đăng ký và modal hiển thị.
  - Xây dựng API đổi lịch (`/api/reschedule`) tích hợp cơ chế Transaction an toàn: Tự động giải phóng ca cũ, chuyển học viên sang ca mới (hoặc tạo ca mới) và lưu vết lịch sử vào bảng `RescheduleLog`.
  - Xây dựng API đăng ký ca học bù (`/api/makeup-requests`) tăng tự động biến `makeupSessions` của học viên.
- [x] **Tự động hóa Email & Nhắc lịch (Reminders Service)**:
  - Xây dựng API Cron Reminders (`/api/cron/reminders`) mô phỏng gửi email tự động:
    - Nhắc lịch học buổi sáng lúc 07:00.
    - Nhắc lịch học trước giờ học 30 phút.
    - Gửi email tổng hợp lịch dạy tuần tới cho từng Giáo viên (`teacher_summary`).
- [x] **Công cụ Quản lý cho AM**:
  - Xây dựng trang danh sách Học viên (`/am/students`) kèm tính năng **Tra cứu mật khẩu học viên** (Password Lookup Tool) giúp AM hỗ trợ học viên khi cần thiết.

---

## Các Bước Tiếp Theo (Giai đoạn 3 - Đánh Giá & Theo Dõi Tiến Độ)
- [ ] Xây dựng form đánh giá chi tiết theo Rubric IELTS Speaking sau buổi học (Fluency, Lexical, Grammar, Pronunciation).
- [ ] API cập nhật số buổi học còn lại của học viên sau khi giáo viên hoàn tất nhận xét.
- [ ] Thiết lập hệ thống cảnh báo tự động trên Dashboard khi học viên sắp hết số buổi học trong gói.
- [ ] Thực hiện cơ chế tính buổi học linh hoạt (học viên nghỉ không lý do hợp lý, ca nhóm có bạn nghỉ...).
