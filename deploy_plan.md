# Kế Hoạch Triển Khai Hệ Thống (Deployment Plan) - Chi Phí $0

Tài liệu này trình bày các giải pháp miễn phí để đưa website Quản lý Ca học Speaking (Next.js + PostgreSQL) lên môi trường Internet để giáo viên và quản lý có thể truy cập và kiểm thử (testing).

---

## 1. Các Giải Pháp Phổ Biến & Tối Ưu (0đ)

### Giải Pháp A: Vercel + Neon.tech (Khuyên Dùng)
Sự kết hợp tối ưu nhất cho các dự án phát triển bằng Next.js sử dụng Prisma.

*   **Hosting Frontend & API (Next.js):** **Vercel** (Hobby Plan - Free)
    *   Tự động deploy từ GitHub mỗi khi push code mới.
    *   Tốc độ tải trang cực nhanh nhờ hệ thống CDN của Vercel.
    *   Hỗ trợ Serverless API hoàn hảo cho Next.js App Router.
*   **Database (PostgreSQL):** **Neon.tech** hoặc **Supabase** (Free Tier)
    *   **Neon:** Cho phép tạo 1 Database PostgreSQL miễn phí (dung lượng 0.5 GB), tối ưu hóa tốt với Prisma, có tính năng tự động ngủ khi không có request và khởi động lại sau 2-3 giây.
    *   **Supabase:** Cho phép tạo tối đa 2 dự án miễn phí (dung lượng 500MB), cung cấp dashboard quản lý database trực quan và có sẵn Connection Pool.
*   **Chi phí:** **$0**
*   **Ưu điểm:** Ổn định, tự động hóa CI/CD, không bị giới hạn thời gian sử dụng thử.
*   **Nhược điểm:** Do cơ chế miễn phí, database của Neon/Supabase sẽ tự động "ngủ" nếu không hoạt động sau một thời gian (khoảng 5-15 phút). Lần truy cập đầu tiên sau khi ngủ sẽ mất khoảng 3-5 giây để khởi động lại database.

### Giải Pháp B: Cloudflare Tunnel / Ngrok (Mở cổng Localhost)
Chia sẻ trực tiếp ứng dụng đang chạy ở máy tính cá nhân của bạn ra Internet.

*   **Cơ chế:** Cài đặt một Client (Ngrok hoặc Cloudflare) trên máy của bạn để tạo ra một đường link công khai (HTTPS) dẫn thẳng về cổng `http://localhost:3000`.
*   **Chi phí:** **$0**
*   **Ưu điểm:** Không cần cấu hình server, không cần migrate database lên cloud. Tiện lợi để test nhanh trong vài giờ.
*   **Nhược điểm:** Máy tính của bạn phải luôn bật và kết nối mạng. Nếu bạn tắt máy hoặc tắt terminal, link sẽ bị hỏng.

---

## 2. Hướng Dẫn Từng Bước Cho Giải Pháp Khuyên Dùng (Vercel + Neon)

### Bước 1: Chuẩn bị Mã Nguồn trên GitHub & Bảo mật file `.env`

Để đảm bảo các thông tin cấu hình nhạy cảm (như mật khẩu database, token gửi email) trong file `.env` không bao giờ bị lộ lên GitHub, hãy thực hiện chi tiết các bước sau:

#### 1. Kiểm tra cấu trúc file `.gitignore`
*   Hiện tại, trong thư mục `web/` đã có sẵn file `web/.gitignore` chứa dòng `.env*` (dòng 34). Điều này giúp tự động bỏ qua file `.env`, `.env.local`, `.env.production`...
*   **Khuyến nghị:** Nếu bạn tạo repository Git ở **thư mục gốc** (`SpeakingRegistrationSystem/`), bạn nên tạo thêm một file `.gitignore` ở thư mục gốc để quản lý tập trung và thêm dòng sau vào:
    ```text
    # Bỏ qua các file môi trường trong thư mục web
    web/.env*
    ```

#### 2. Kiểm tra xem Git đã bỏ qua file `.env` thực sự chưa
Trước khi push code lên GitHub, hãy mở Terminal tại thư mục dự án và chạy lệnh sau để kiểm tra xem file `.env` có bị Git theo dõi hay không:
```powershell
git status
```
*   **Trường hợp Đúng:** Bạn không thấy file `web/.env` xuất hiện trong danh sách file đang được Git theo dõi (Changes to be committed) hoặc file chưa được theo dõi (Untracked files).
*   **Trường hợp Sai:** Nếu thấy `web/.env` xuất hiện trong danh sách thay đổi, **tuyệt đối không chạy lệnh `git commit`**.

*Mẹo: Bạn có thể chạy lệnh sau để kiểm tra quy tắc ignore nào đang áp dụng lên file:*
```powershell
git check-ignore -v web/.env
```
*(Nếu hiển thị ra đường dẫn file `.gitignore` và quy tắc `.env*` thì file đã được ignore thành công).*

#### 3. Cách xử lý nếu lỡ commit nhầm file `.env` lên Git
Nếu trước đó bạn đã lỡ commit file `.env` lên lịch sử Git:
1.  Chạy lệnh sau để xóa file `.env` khỏi bộ nhớ đệm của Git (nhưng vẫn giữ lại file thực tế ở máy local):
    ```powershell
    git rm --cached web/.env
    ```
2.  Commit và push thay đổi này lên GitHub:
    ```powershell
    git commit -m "chore: remove .env from git tracking"
    git push origin main
    ```
3.  Đổi mật khẩu database ngay lập tức nếu file cũ chứa mật khẩu thật đã bị push lên GitHub công khai (Public repo).


### Bước 2: Tạo Cơ Sở Dữ Liệu PostgreSQL miễn phí trên Neon.tech
1.  Truy cập [Neon.tech](https://neon.tech/) và đăng ký tài khoản miễn phí.
2.  Tạo một Project mới (chọn Region gần Việt Nam nhất như Singapore hoặc Asia Pacific).
3.  Sau khi tạo xong, Neon sẽ cung cấp cho bạn một chuỗi kết nối **Connection String** dạng:
    ```env
    DATABASE_URL="postgres://alex:abcd@ep-cool-darkness-123456.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
    ```
4.  Lưu chuỗi kết nối này lại để cấu hình ở bước tiếp theo.

### Bước 3: Đồng bộ Database Schema (Migration)
Để đồng bộ các bảng dữ liệu chúng ta đã thiết kế bằng Prisma lên database Neon mới tạo:
1.  Tạm thời thay thế giá trị `DATABASE_URL` trong file `.env` ở máy local bằng Connection String của Neon.
2.  Mở Terminal tại thư mục `web` và chạy lệnh push schema:
    ```powershell
    npx prisma db push
    ```
    *(Lệnh này sẽ tạo các bảng như User, Student, Session... trên database Neon mà không cần chạy lại lịch sử migration).*
3.  Khôi phục lại `DATABASE_URL` local trong file `.env` nếu bạn muốn tiếp tục phát triển local.

### Bước 4: Deploy Next.js lên Vercel
1.  Truy cập [Vercel](https://vercel.com/) và đăng nhập bằng tài khoản GitHub.
2.  Chọn **Add New** -> **Project**.
3.  Import Repository GitHub chứa mã nguồn của bạn.
4.  Tại phần cấu hình dự án, mở rộng mục **Environment Variables** và thêm các biến môi trường sau:
    *   `DATABASE_URL`: Dán đường link Connection String lấy từ Neon.tech ở Bước 2.
    *   `NEXTAUTH_SECRET` hoặc các khóa bí mật khác (nếu có).
5.  Nhấn nút **Deploy**. Quá trình build sẽ mất khoảng 1-2 phút. Sau khi hoàn thành, Vercel sẽ cung cấp một tên miền miễn phí dạng `tên-dự-án.vercel.app`.

---

## 3. Quy Trình Cập Nhật & Bảo Trì Khi Có Code Mới (CI/CD)

Khi dự án đã được deploy theo cách trên, mỗi khi bạn phát triển thêm tính năng mới:
1.  **Nếu có thay đổi Database Schema:**
    *   Cập nhật file `schema.prisma`.
    *   Chạy `npx prisma db push` với database URL của Neon để cập nhật cấu trúc database.
2.  **Nếu chỉ thay đổi code giao diện/logic API:**
    *   Chỉ cần dùng lệnh Git để push code lên GitHub:
        ```bash
        git add .
        git commit -m "update feature X"
        git push origin main
        ```
    *   Vercel sẽ tự động phát hiện code mới và tiến hành deploy lại phiên bản mới trong vòng 1-2 phút mà không làm gián đoạn người dùng test.
