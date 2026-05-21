# Kế Hoạch Phát Triển Hệ Thống Quản Lý Ca Học Speaking

Dựa trên tài liệu `web-function.md`, hệ thống là một LMS thu nhỏ chuyên biệt cho việc quản lý lịch học Speaking 1-1 và nhóm. Dưới đây là kế hoạch phát triển chi tiết và phân bổ các kỹ năng (Skills) cần thiết.

---

## 1. Lộ Trình Phát Triển (Development Roadmap)

Dựa vào yêu cầu và các điểm đã chốt ở mục 19, lộ trình được tinh chỉnh lại như sau:

### Giai đoạn 1: Lõi Hệ Thống & Xếp Lịch (MVP - Tháng 1)
* **Mục tiêu:** Vận hành được quy trình cơ bản: Giáo viên đăng ký lịch ➔ AM xếp lớp ➔ Gửi email xác nhận.
* **Tính năng:**
  * Khởi tạo Database Schema (PostgreSQL).
  * Hệ thống Auth (Login/Logout/Reset Password). Phân quyền cơ bản (Super Admin, AM, Teacher).
  * Dashboard cơ bản cho AM và Giáo viên.
  * Quản lý Giáo viên: Submit ca rảnh (Availability).
  * Quản lý Học viên (CRUD cơ bản).
  * Quản lý Ca học: Tạo ca, gán học viên vào ca.
  * Lịch hiển thị (Weekly Calendar).
  * Gửi email xác nhận cơ bản (Tích hợp SendGrid/SES).

### Giai đoạn 2: Cổng Học Viên, Đổi Lịch & Nhắc Nhở (Tháng 2)
* **Mục tiêu:** Mở rộng quyền cho học viên tự theo dõi và tự động hóa nhắc lịch.
* **Tính năng:**
  * **Cổng Học Viên (Student Portal):** Đăng nhập, tra cứu lịch học, xem thông tin tài khoản, đổi mật khẩu.
  * Quản lý Đổi Lịch (Reschedule) & Ca bù (Makeup requests). Lưu lịch sử đổi lịch.
  * Tự động hóa Email: Nhắc lịch buổi sáng (07:00), nhắc trước 30 phút, nhắc đến giờ học.
  * Gửi email tổng hợp lịch dạy cho giáo viên.
  * AM: Công cụ tra cứu mật khẩu học viên.

### Giai đoạn 3: Đánh Giá & Theo Dõi Tiến Độ (Tháng 3)
* **Mục tiêu:** Số hóa quy trình chấm điểm và nhận xét sau buổi học.
* **Tính năng:**
  * Form đánh giá (Rubric IELTS Speaking: Fluency, Lexical, Grammar, Pronunciation).
  * Nhập nhận xét, bài tập về nhà, lưu ý cho giáo viên sau.
  * Theo dõi số buổi học (áp dụng rule tính buổi mới chốt: Học viên no-show tính buổi nếu không có lý do hợp lệ; ca nhóm vẫn tính bình thường nếu 1 bạn nghỉ).
  * Cảnh báo học viên sắp hết buổi.

### Giai đoạn 4: Báo Cáo, Vận Hành & Tối Ưu (Tháng 4)
* **Mục tiêu:** Cung cấp công cụ quản trị cấp cao và chốt lương.
* **Tính năng:**
  * Báo cáo giờ dạy giáo viên (quy đổi giờ).
  * Báo cáo tiến độ học viên, tỷ lệ nghỉ/hủy.
  * Export dữ liệu ra Excel/CSV.
  * Audit logs (Lưu vết thao tác).
  * Email logs (Kiểm tra lịch sử gửi email).

---

## 2. Tính Toán Kỹ Năng (Skills) Cần Thiết Để Phát Triển

Trong quá trình xây dựng, chúng ta sẽ tận dụng tối đa các **Antigravity Skills** đã được cài đặt trong `.agent/skills/` cùng với các kỹ năng lập trình (Tech Stack Skills).

### 2.1. Sử dụng Kỹ Năng Hệ Thống (Antigravity Skills)

1. **`web-artifacts-builder` (Đóng vai trò cốt lõi cho Frontend):**
   * **Sử dụng khi:** Xây dựng các component phức tạp như **Weekly Calendar** (hiển thị 3 chế độ: tuần/ngày/giáo viên), **Student Search Dropdown**, **Modal gán học viên/đổi lịch**.
   * **Lợi ích:** Đảm bảo code React/Next.js kết hợp Shadcn UI và Tailwind CSS được cấu trúc sạch sẽ, tái sử dụng cao.

2. **`frontend-design` & `theme-factory` (Đóng vai trò UI/UX):**
   * **Sử dụng khi:** Thiết lập **Design System** cơ bản (Màu trạng thái ca học: Xám, Xanh, Cam, Đỏ, Vàng), thiết kế các Dashboard cho AM, Teacher và Student Portal sao cho trực quan, hiện đại, dễ thao tác (ít click nhất có thể).
   * **Lợi ích:** Tránh giao diện khô cứng, mang lại trải nghiệm người dùng chuyên nghiệp.

3. **`doc-coauthoring` (Đóng vai trò Phân tích & Tài liệu hóa):**
   * **Sử dụng khi:** Cần viết chi tiết **API Specification**, chốt lại **Database Schema** hoặc chuẩn hóa các Rule tính lương/tính buổi học (Mục 12 & 13) thành tài liệu kỹ thuật cho team vận hành.

4. **`internal-comms` (Đóng vai trò Xây dựng Template Email):**
   * **Sử dụng khi:** Soạn thảo nội dung cho các **Email Templates** (Xác nhận, Nhắc lịch, Lời nhắn trước buổi học).
   * **Lợi ích:** Đảm bảo văn phong chuyên nghiệp, đúng chuẩn ngôn ngữ giao tiếp với khách hàng/học viên.

5. **`webapp-testing` (Đóng vai trò QA/Kiểm thử):**
   * **Sử dụng khi:** Viết script tự động (Playwright) để kiểm thử các luồng quan trọng: Luồng AM xếp lịch bị trùng, Luồng học viên đăng nhập, Luồng tính số buổi sau khi giáo viên đánh giá.
   * **Lợi ích:** Đảm bảo hệ thống không bị lỗi logic (đặc biệt ở khâu tính số buổi và lương).

6. **`mcp-builder` (Đóng vai trò Tích hợp mở rộng):**
   * **Sử dụng khi:** (Giai đoạn sau) Nếu cần xây dựng công cụ để AI có thể query trực tiếp vào Database tra cứu lịch học, hoặc tích hợp Google Calendar API / Zoom API.

### 2.2. Kỹ Năng Công Nghệ (Tech Stack Skills)

* **Frontend:** React, Next.js, Tailwind CSS, Shadcn UI, FullCalendar.
* **Backend:** Node.js (NestJS hoặc Express.js), Xử lý Background Jobs (BullMQ/Redis cho các tác vụ cron gửi email lúc 7:00 sáng).
* **Database:** PostgreSQL (Thiết kế Schema quan hệ chặt chẽ), Prisma ORM hoặc TypeORM.
* **DevOps/Bảo mật:** Docker, GitHub Actions CI/CD, JWT Authentication, Quản lý phân quyền RBAC.
