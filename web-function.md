Dưới đây là bản plan chi tiết V1.0 có thể gửi cho dev và UI/UX để bắt đầu dựng hệ thống. Em viết theo hướng tài liệu yêu cầu sản phẩm (product requirements) + tài liệu kỹ thuật sơ bộ (technical specification). Nội dung được triển khai từ file tổng hợp tính năng hệ thống đăng ký ca học Speaking anh gửi. 

---

# plan phát triển website quản lý và đăng ký ca học speaking

## 1. mục tiêu sản phẩm

Website này là hệ thống nội bộ dùng để quản lý toàn bộ quy trình đăng ký, xếp lịch, đổi lịch, theo dõi học tập và báo cáo ca học Speaking.

Mục tiêu chính:

Giảm thao tác thủ công như copy dữ liệu, nhập mã học viên bằng tay, gửi email riêng lẻ, tổng hợp lịch bằng file Excel/Google Sheet và đối chiếu thủ công khi tính lương giáo viên.

Hệ thống cần xử lý được toàn bộ luồng:

Giáo viên đăng ký ca rảnh → quản lý xếp học viên vào ca → hệ thống gửi email xác nhận → nhắc lịch tự động → giáo viên dạy xong nhập đánh giá → hệ thống cập nhật số buổi còn lại → nếu đổi lịch thì lưu lịch sử → cuối tháng xuất báo cáo số giờ dạy.

Theo em, nên xem đây là một hệ thống LMS nhỏ chuyên cho Speaking 1-1/nhóm, không chỉ là một website đăng ký lịch.

---

# 2. nhóm người dùng và phân quyền

## 2.1. super admin

Dành cho người quản trị cao nhất.

Quyền:

Quản lý toàn bộ tài khoản.

Tạo/sửa/xóa giáo viên.

Tạo/sửa/xóa Academic Manager.

Cấu hình hệ thống email.

Cấu hình mẫu email.

Cấu hình thời lượng ca học.

Cấu hình trạng thái buổi học.

Xem toàn bộ báo cáo.

Xem log hệ thống.

Phân quyền người dùng.

---

## 2.2. academic manager / AM

Đây là nhóm dùng hệ thống nhiều nhất.

Quyền:

Xem toàn bộ lịch học.

Tạo ca học cho giáo viên.

Duyệt hoặc sử dụng ca rảnh giáo viên submit.

Gán học viên vào ca.

Tạo ca học nhóm.

Đổi lịch cho học viên.

Đẩy ca bù sang tuần sau.

Nhập ghi chú nội bộ cho học viên.

Xem lịch sử học của học viên.

Theo dõi số buổi đã học/còn lại.

Xem cảnh báo học viên gần hết buổi.

Import danh sách học viên.

Xuất báo cáo giáo viên.

Xuất báo cáo học viên.

---

## 2.3. giáo viên

Quyền:

Đăng nhập tài khoản cá nhân.

Submit ca rảnh trong tuần.

Submit ca dạy bù.

Xem lịch dạy ngày/tuần/tháng.

Xem thông tin học viên trong ca.

Xem lịch sử học tập của học viên.

Đổi lịch ca của mình, nếu được cấp quyền.

Gửi lời nhắn trước buổi học qua email hệ thống.

Nhập trạng thái buổi học.

Chấm điểm Speaking sau buổi học.

Nhập nhận xét cho học viên.

Ghi chú riêng cho giáo viên buổi sau.

---

## 2.4. học viên

Giai đoạn 1 có thể chưa cần tài khoản học viên.

Học viên nhận thông tin qua email:

Email xác nhận lịch học.

Email đổi lịch.

Email nhắc lịch.

Email lời nhắn trước buổi học.

Email bài tập/tài liệu chuẩn bị.

Giai đoạn sau có thể mở student portal, tức cổng học viên, để học viên tự xem lịch, lịch sử học, điểm và nhận xét.

---

# 3. cấu trúc website / sitemap

## 3.1. trang đăng nhập

Đường dẫn gợi ý:

`/login`

Chức năng:

Đăng nhập bằng email và mật khẩu.

Quên mật khẩu.

Gửi link reset mật khẩu.

Hiển thị lỗi đăng nhập.

Điều hướng theo vai trò sau khi đăng nhập:

Admin → dashboard quản trị.

AM → dashboard xếp lịch.

Giáo viên → dashboard giáo viên.

---

## 3.2. dashboard tổng quan

Đường dẫn:

`/dashboard`

Nội dung hiển thị theo vai trò.

Với AM:

Số ca hôm nay.

Số ca chưa gán học viên.

Số ca đã gán học viên.

Số ca bị đổi lịch.

Số ca chờ bù sang tuần sau.

Số học viên gần hết buổi.

Số nhận xét giáo viên chưa nhập.

Danh sách việc cần xử lý hôm nay.

Với giáo viên:

Số ca dạy hôm nay.

Ca gần nhất.

Danh sách học viên hôm nay.

Ca chưa nhập nhận xét.

Nút submit ca rảnh tuần này.

Nút gửi lời nhắn trước buổi học.

---

## 3.3. trang lịch học / calendar

Đường dẫn:

`/calendar`

Đây là trang quan trọng nhất.

UI/UX nên có 3 chế độ xem:

Xem theo tuần.

Xem theo ngày.

Xem theo giáo viên.

Thông tin trên từng ca:

Giờ học.

Thời lượng.

Tên giáo viên.

Tên học viên.

Loại ca: 1-1 / nhóm / ca bù.

Trạng thái: còn trống, đã gán, đã học, đổi lịch, hủy, học viên nghỉ, giáo viên nghỉ, chưa nhận xét.

Màu sắc gợi ý:

Ca trống: xám nhạt.

Ca đã gán: xanh.

Ca bù: cam.

Ca hủy: đỏ nhạt.

Ca đã học: xanh lá.

Ca chưa nhập nhận xét: vàng.

Chức năng:

Tạo ca mới.

Gán học viên.

Đổi lịch.

Hủy ca.

Đẩy sang tuần sau.

Xem chi tiết ca.

Lọc theo giáo viên.

Lọc theo học viên.

Lọc theo trạng thái.

Lọc theo loại ca.

---

## 3.4. trang giáo viên submit ca rảnh

Đường dẫn:

`/teacher/availability`

Chức năng:

Giáo viên chọn tuần.

Thêm ca rảnh.

Chọn ngày.

Chọn giờ bắt đầu.

Chọn thời lượng: 30 phút, 60 phút, 90 phút, 120 phút.

Chọn loại ca: ca thường / ca bù.

Nếu là ca bù, chọn học viên liên quan.

Nhập ghi chú.

Submit.

Trạng thái ca sau khi submit:

Available, tức có thể xếp học viên.

Booked, tức đã có học viên.

Cancelled, tức giáo viên hủy ca.

Expired, tức ca đã qua mà không được dùng.

Điểm UI/UX quan trọng:

Giáo viên không nên phải nhập tên mình. Hệ thống tự nhận diện từ tài khoản đăng nhập.

Nên có nút “copy lịch tuần trước” để giáo viên nhập nhanh.

Nên có cảnh báo nếu giáo viên tạo ca bị trùng giờ.

---

## 3.5. trang quản lý ca học

Đường dẫn:

`/sessions`

Chức năng:

Danh sách toàn bộ ca học.

Tạo ca học thủ công.

Sửa ca học.

Gán giáo viên.

Gán học viên.

Gán nhiều học viên vào cùng một ca.

Xác nhận đăng ký.

Gửi email xác nhận.

Đổi lịch.

Hủy ca.

Đẩy ca sang tuần sau.

Xem lịch sử thay đổi.

Các cột nên có:

Ngày học.

Giờ bắt đầu.

Giờ kết thúc.

Thời lượng.

Giáo viên.

Học viên.

Loại ca.

Trạng thái.

Đã gửi email chưa.

Đã nhập nhận xét chưa.

Người tạo ca.

Ngày tạo.

---

## 3.6. trang gán học viên vào ca

Có thể là modal, tức cửa sổ nổi, trong trang lịch.

Khi AM bấm vào một ca trống, hệ thống mở modal “Gán học viên”.

Thông tin hiển thị:

Thông tin ca học.

Danh sách học viên đang active.

Ô tìm kiếm theo tên, mã học viên, email.

Bộ lọc học viên còn buổi.

Bộ lọc học viên cần bù.

Bộ lọc học viên có ghi chú lịch học phù hợp.

Sau khi chọn học viên:

Hiện màn hình xác nhận.

Ví dụ:

“Xác nhận gán học viên Nguyễn Văn A vào ca Speaking với giáo viên B lúc 20:30 ngày 22/05/2026?”

Sau khi xác nhận:

Tạo booking.

Cập nhật trạng thái ca.

Gửi email xác nhận.

Ghi log thao tác.

---

## 3.7. trang đổi lịch

Có thể là modal hoặc trang riêng.

Đường dẫn gợi ý:

`/sessions/{session_id}/reschedule`

Chức năng:

Hiển thị ca hiện tại.

Cho chọn ca mới có sẵn.

Hoặc tạo ca mới.

Hoặc đẩy sang tuần sau.

Bắt buộc nhập lý do đổi lịch.

Nếu đẩy sang tuần sau:

Chọn tuần cần bù.

Nhập ghi chú.

Ví dụ:

“Học viên chỉ rảnh tối thứ Năm hoặc thứ Sáu.”

Sau khi xác nhận:

Cập nhật trạng thái ca cũ.

Tạo hoặc cập nhật ca mới.

Lưu lịch sử đổi lịch.

Gửi email đổi lịch cho học viên.

Thông báo cho giáo viên nếu giáo viên bị ảnh hưởng.

---

## 3.8. trang danh sách học viên

Đường dẫn:

`/students`

Chức năng:

Xem danh sách học viên.

Tạo học viên mới.

Import học viên từ file.

Sửa thông tin học viên.

Xem tình trạng học.

Xem số buổi đăng ký.

Xem số buổi đã học.

Xem số buổi còn lại.

Xem số buổi hủy.

Xem số buổi bù.

Xem số lần muộn hoặc không online.

Xem ghi chú AM.

Tìm kiếm theo tên, email, mã học viên.

Các cột nên có:

Student ID.

Họ tên.

Email.

Số điện thoại, nếu có.

Trạng thái học.

Gói học.

Tổng số buổi.

Đã học.

Còn lại.

Số buổi bù.

Số lần hủy.

Số lần muộn.

Ghi chú nhanh.

---

## 3.9. trang hồ sơ học viên

Đường dẫn:

`/students/{student_id}`

Các tab nên có:

Thông tin cá nhân.

Ghi chú nội bộ.

Lịch sử học.

Điểm và nhận xét.

Lịch sắp tới.

Lịch sử đổi lịch.

Buổi cần bù.

Thông tin trong hồ sơ:

Tên học viên.

Email.

Mã học viên.

Trạng thái học.

Tổng số buổi đăng ký.

Số buổi đã học.

Số buổi còn lại.

Lịch học ưu tiên.

Yêu cầu riêng về giáo viên.

Ghi chú AM.

Ghi chú học tập từ giáo viên.

Cảnh báo: còn 2 buổi, nghỉ nhiều, hay đổi lịch, chưa có nhận xét.

---

## 3.10. trang đánh giá sau buổi học

Đường dẫn:

`/sessions/{session_id}/review`

Chức năng:

Giáo viên nhập trạng thái buổi học:

Đã học.

Học viên nghỉ.

Giáo viên nghỉ.

Học viên muộn.

Học viên không online.

Ca bù.

Đã đổi lịch.

Sau đó nhập form đánh giá.

Điểm IELTS Speaking theo 4 tiêu chí:

Fluency and Coherence, tức độ trôi chảy và mạch lạc.

Lexical Resource, tức vốn từ vựng.

Grammatical Range and Accuracy, tức độ đa dạng và chính xác ngữ pháp.

Pronunciation, tức phát âm.

Điểm chọn từ 1.0 đến 9.0, có bước 0.5.

Nội dung nhận xét:

Nhận xét phát âm.

Nhận xét từ vựng.

Nhận xét ngữ pháp.

Nhận xét độ trôi chảy.

Nhận xét phát triển ý.

Topic đã học.

Questions đã luyện.

Bài tập về nhà.

Lời nhắn gửi học viên.

Lưu ý cho giáo viên buổi sau.

Sau khi lưu:

Cập nhật trạng thái “đã hoàn thành nhận xét”.

Cập nhật lịch sử học viên.

Trừ số buổi nếu buổi học được tính là đã học.

Không trừ buổi nếu trạng thái thuộc nhóm không tính buổi, tùy quy định vận hành.

---

## 3.11. trang giáo viên gửi lời nhắn trước buổi học

Đường dẫn:

`/teacher/pre-class-message`

Chức năng:

Giáo viên chọn ca học sắp tới.

Chọn học viên hoặc cả nhóm.

Nhập nội dung email.

Đính kèm file, nếu có.

Chọn mẫu email.

Bấm gửi.

Email nên gửi từ email hệ thống, không gửi từ email cá nhân giáo viên.

Nội dung có thể gồm:

Topic buổi tới.

Câu hỏi cần chuẩn bị.

Tài liệu đọc trước.

Từ vựng cần học.

Bài tập chuẩn bị.

File đính kèm.

---

## 3.12. trang báo cáo giáo viên

Đường dẫn:

`/reports/teachers`

Chức năng:

Chọn tháng.

Chọn giáo viên.

Xem số ca đã dạy.

Phân loại theo thời lượng:

30 phút.

60 phút.

90 phút.

120 phút.

Quy đổi tổng giờ dạy.

Ví dụ:

2 ca 30 phút = 1 giờ.

1 ca 90 phút = 1.5 giờ.

1 ca 120 phút = 2 giờ.

Báo cáo nên có:

Tên giáo viên.

Số ca dạy.

Tổng phút dạy.

Tổng giờ quy đổi.

Số ca học viên nghỉ.

Số ca giáo viên nghỉ.

Số ca bù.

Số ca chưa nhập nhận xét.

Nút export Excel/CSV.

---

## 3.13. trang báo cáo học viên

Đường dẫn:

`/reports/students`

Chức năng:

Theo dõi tiến độ học viên.

Lọc học viên còn ít buổi.

Lọc học viên nghỉ nhiều.

Lọc học viên cần bù.

Lọc học viên chưa có lịch tuần này.

Lọc học viên chưa có nhận xét.

Báo cáo nên có:

Học viên.

Gói học.

Tổng số buổi.

Đã học.

Còn lại.

Buổi bù.

Số lần hủy.

Số lần muộn.

Giáo viên gần nhất.

Ngày học gần nhất.

Cảnh báo.

---

## 3.14. trang notification / email logs

Đường dẫn:

`/notifications`

Chức năng:

Xem lịch sử email đã gửi.

Trạng thái gửi thành công/thất bại.

Loại email:

Xác nhận lịch học.

Đổi lịch.

Nhắc lịch.

Tổng hợp lịch giáo viên.

Lời nhắn trước buổi học.

Xem nội dung email.

Gửi lại email nếu thất bại.

---

## 3.15. trang settings

Đường dẫn:

`/settings`

Chức năng:

Cấu hình thời lượng ca học.

Cấu hình mẫu email.

Cấu hình giờ gửi email nhắc lịch.

Cấu hình số buổi còn lại để cảnh báo, mặc định là 2.

Cấu hình trạng thái buổi học.

Cấu hình quyền đổi lịch của giáo viên.

Cấu hình email hệ thống.

Cấu hình múi giờ, mặc định Asia/Ho_Chi_Minh.

---

# 4. chức năng chính theo module

## 4.1. module quản lý người dùng

Tên kỹ thuật: user management.

Chức năng:

Đăng nhập.

Đăng xuất.

Quên mật khẩu.

Đổi mật khẩu.

Quản lý tài khoản.

Phân quyền theo vai trò.

Khóa tài khoản.

Ghi log đăng nhập.

---

## 4.2. module giáo viên

Tên kỹ thuật: teacher management.

Chức năng:

Tạo hồ sơ giáo viên.

Quản lý thông tin giáo viên.

Quản lý ca rảnh.

Quản lý lịch dạy.

Báo cáo giờ dạy.

Theo dõi số ca chưa nhận xét.

---

## 4.3. module học viên

Tên kỹ thuật: student management.

Chức năng:

Tạo học viên.

Import học viên.

Quản lý thông tin học viên.

Quản lý số buổi học.

Ghi chú nội bộ.

Lịch sử học.

Cảnh báo gần hết buổi.

---

## 4.4. module ca học

Tên kỹ thuật: session management.

Chức năng:

Tạo ca.

Sửa ca.

Xóa/hủy ca.

Gán giáo viên.

Gán học viên.

Tạo ca nhóm.

Tạo ca bù.

Cập nhật trạng thái.

Xem lịch sử ca.

---

## 4.5. module đặt lịch

Tên kỹ thuật: booking management.

Chức năng:

Gán một hoặc nhiều học viên vào ca.

Xác nhận booking.

Gửi email xác nhận.

Kiểm tra trùng lịch học viên.

Kiểm tra trùng lịch giáo viên.

Kiểm tra học viên còn buổi hay không.

---

## 4.6. module đổi lịch

Tên kỹ thuật: reschedule management.

Chức năng:

Đổi sang ca trống trong tuần.

Tạo ca mới để đổi.

Đẩy sang tuần sau.

Lưu lý do đổi lịch.

Lưu người đổi lịch.

Lưu lịch sử trước/sau.

Gửi email đổi lịch.

---

## 4.7. module đánh giá sau buổi học

Tên kỹ thuật: assessment / feedback management.

Chức năng:

Cập nhật trạng thái buổi học.

Nhập điểm IELTS Speaking.

Nhập nhận xét.

Nhập topic/questions đã học.

Nhập homework.

Nhập lời nhắn cho học viên.

Nhập ghi chú cho giáo viên sau.

Cập nhật lịch sử học viên.

---

## 4.8. module email tự động

Tên kỹ thuật: notification service.

Các loại email:

Email xác nhận ca học.

Email đổi lịch.

Email nhắc lịch buổi sáng.

Email nhắc lịch trước 30 phút.

Email nhắc đúng giờ học, nếu cần.

Email tổng hợp lịch dạy cho giáo viên.

Email lời nhắn trước buổi học.

Email cảnh báo học viên gần hết buổi cho AM.

---

## 4.9. module báo cáo

Tên kỹ thuật: reporting module.

Báo cáo cần có:

Báo cáo ca học theo ngày/tuần/tháng.

Báo cáo giờ dạy giáo viên.

Báo cáo học viên gần hết buổi.

Báo cáo học viên nghỉ/hủy/muộn.

Báo cáo ca chưa nhập nhận xét.

Báo cáo ca bù.

Export Excel/CSV.

---

# 5. hệ thống cơ sở dữ liệu

Nên dùng cơ sở dữ liệu quan hệ (relational database) như PostgreSQL hoặc MySQL vì dữ liệu có nhiều quan hệ: giáo viên, học viên, ca học, booking, đánh giá, lịch sử đổi lịch, email logs.

## 5.1. bảng users

Lưu tài khoản đăng nhập.

Trường dữ liệu:

`id`

`full_name`

`email`

`password_hash`

`role`: super_admin, academic_manager, teacher

`phone`

`avatar_url`

`status`: active, inactive, locked

`last_login_at`

`created_at`

`updated_at`

---

## 5.2. bảng teachers

Lưu thông tin giáo viên.

Trường dữ liệu:

`id`

`user_id`

`teacher_code`

`full_name`

`email`

`phone`

`bio`

`status`

`note`

`created_at`

`updated_at`

---

## 5.3. bảng students

Lưu thông tin học viên.

Trường dữ liệu:

`id`

`student_code`

`full_name`

`email`

`phone`

`status`: active, paused, completed, stopped

`total_sessions`

`completed_sessions`

`remaining_sessions`

`cancelled_sessions`

`makeup_sessions`

`late_sessions`

`no_show_sessions`

`preferred_schedule_note`

`internal_note`

`created_at`

`updated_at`

---

## 5.4. bảng student_packages

Nếu học viên có thể mua nhiều gói học, nên tách bảng này.

Trường dữ liệu:

`id`

`student_id`

`package_name`

`total_sessions`

`used_sessions`

`remaining_sessions`

`start_date`

`end_date`

`status`

`created_at`

`updated_at`

---

## 5.5. bảng teacher_availabilities

Lưu ca rảnh do giáo viên submit.

Trường dữ liệu:

`id`

`teacher_id`

`date`

`start_time`

`end_time`

`duration_minutes`

`type`: regular, makeup

`status`: available, booked, cancelled, expired

`note`

`created_by`

`created_at`

`updated_at`

---

## 5.6. bảng sessions

Lưu ca học chính thức.

Trường dữ liệu:

`id`

`teacher_id`

`date`

`start_time`

`end_time`

`duration_minutes`

`session_type`: one_on_one, group, makeup

`source`: teacher_availability, manager_created

`status`: available, booked, completed, cancelled, rescheduled, student_absent, teacher_absent, no_show, pending_feedback

`topic`

`note`

`created_by`

`created_at`

`updated_at`

---

## 5.7. bảng session_students

Vì một ca có thể có nhiều học viên, cần bảng trung gian.

Trường dữ liệu:

`id`

`session_id`

`student_id`

`booking_status`: confirmed, cancelled, rescheduled, attended, absent, no_show

`is_makeup`

`note`

`created_at`

`updated_at`

---

## 5.8. bảng reschedule_logs

Lưu lịch sử đổi lịch.

Trường dữ liệu:

`id`

`old_session_id`

`new_session_id`

`student_id`

`teacher_id`

`old_date`

`old_start_time`

`old_end_time`

`new_date`

`new_start_time`

`new_end_time`

`changed_by`

`changed_by_role`

`reason`

`note`

`status_after_change`

`created_at`

---

## 5.9. bảng makeup_requests

Lưu các ca cần bù sang tuần sau.

Trường dữ liệu:

`id`

`student_id`

`original_session_id`

`preferred_note`

`target_week_start`

`target_week_end`

`status`: pending, scheduled, cancelled

`created_by`

`created_at`

`updated_at`

---

## 5.10. bảng session_reviews

Lưu đánh giá sau buổi học.

Trường dữ liệu:

`id`

`session_id`

`student_id`

`teacher_id`

`attendance_status`: on_time, late, absent, no_show, cancelled

`fluency_score`

`lexical_score`

`grammar_score`

`pronunciation_score`

`overall_score`

`pronunciation_comment`

`vocabulary_comment`

`grammar_comment`

`fluency_comment`

`idea_development_comment`

`topics_covered`

`questions_practiced`

`homework`

`message_to_student`

`note_for_next_teacher`

`submitted_at`

`created_at`

`updated_at`

---

## 5.11. bảng student_notes

Lưu ghi chú học viên.

Trường dữ liệu:

`id`

`student_id`

`note_type`: internal, learning, schedule, warning

`content`

`created_by`

`visible_to_teacher`: true/false

`created_at`

`updated_at`

---

## 5.12. bảng email_templates

Lưu mẫu email.

Trường dữ liệu:

`id`

`template_key`

`template_name`

`subject`

`body_html`

`body_text`

`status`

`created_at`

`updated_at`

---

## 5.13. bảng email_logs

Lưu lịch sử email.

Trường dữ liệu:

`id`

`recipient_email`

`recipient_name`

`email_type`

`subject`

`body`

`status`: pending, sent, failed

`provider_message_id`

`error_message`

`related_session_id`

`related_student_id`

`related_teacher_id`

`sent_at`

`created_at`

---

## 5.14. bảng files

Lưu file đính kèm.

Trường dữ liệu:

`id`

`uploaded_by`

`file_name`

`file_url`

`file_type`

`file_size`

`related_session_id`

`related_student_id`

`created_at`

---

## 5.15. bảng audit_logs

Lưu log thao tác quan trọng.

Trường dữ liệu:

`id`

`user_id`

`action`

`entity_type`

`entity_id`

`old_value`

`new_value`

`ip_address`

`user_agent`

`created_at`

---

# 6. API cần xây dựng

Có thể dùng REST API hoặc GraphQL. Với hệ thống này, REST API là đủ rõ và dễ giao cho dev.

## 6.1. auth API

`POST /api/auth/login`

Đăng nhập.

`POST /api/auth/logout`

Đăng xuất.

`POST /api/auth/forgot-password`

Gửi email reset mật khẩu.

`POST /api/auth/reset-password`

Đặt lại mật khẩu.

`GET /api/auth/me`

Lấy thông tin người dùng hiện tại.

---

## 6.2. user API

`GET /api/users`

Lấy danh sách người dùng.

`POST /api/users`

Tạo người dùng.

`GET /api/users/{id}`

Xem chi tiết người dùng.

`PUT /api/users/{id}`

Cập nhật người dùng.

`PATCH /api/users/{id}/status`

Khóa/mở tài khoản.

---

## 6.3. teacher API

`GET /api/teachers`

Danh sách giáo viên.

`POST /api/teachers`

Tạo giáo viên.

`GET /api/teachers/{id}`

Chi tiết giáo viên.

`PUT /api/teachers/{id}`

Cập nhật giáo viên.

`GET /api/teachers/{id}/schedule`

Lịch dạy giáo viên.

`GET /api/teachers/{id}/report`

Báo cáo giờ dạy giáo viên.

---

## 6.4. teacher availability API

`GET /api/teacher-availabilities`

Lấy danh sách ca rảnh.

`POST /api/teacher-availabilities`

Giáo viên submit ca rảnh.

`POST /api/teacher-availabilities/bulk`

Giáo viên submit nhiều ca cùng lúc.

`PUT /api/teacher-availabilities/{id}`

Sửa ca rảnh.

`DELETE /api/teacher-availabilities/{id}`

Hủy ca rảnh.

`POST /api/teacher-availabilities/copy-last-week`

Copy lịch tuần trước.

---

## 6.5. student API

`GET /api/students`

Danh sách học viên.

`POST /api/students`

Tạo học viên.

`POST /api/students/import`

Import học viên từ file.

`GET /api/students/{id}`

Hồ sơ học viên.

`PUT /api/students/{id}`

Cập nhật học viên.

`GET /api/students/{id}/history`

Lịch sử học.

`GET /api/students/{id}/notes`

Ghi chú học viên.

`POST /api/students/{id}/notes`

Thêm ghi chú.

`GET /api/students/low-remaining-sessions`

Danh sách học viên gần hết buổi.

---

## 6.6. session API

`GET /api/sessions`

Danh sách ca học.

`POST /api/sessions`

Tạo ca học.

`GET /api/sessions/{id}`

Chi tiết ca học.

`PUT /api/sessions/{id}`

Cập nhật ca học.

`DELETE /api/sessions/{id}`

Hủy ca học.

`PATCH /api/sessions/{id}/status`

Cập nhật trạng thái ca học.

`GET /api/sessions/calendar`

Lấy dữ liệu lịch theo tuần/ngày/tháng.

---

## 6.7. booking API

`POST /api/sessions/{id}/book`

Gán học viên vào ca.

Body gồm:

`student_ids`

`confirm_send_email`

`note`

`POST /api/sessions/{id}/confirm`

Xác nhận đăng ký.

`DELETE /api/sessions/{id}/students/{student_id}`

Gỡ học viên khỏi ca.

---

## 6.8. reschedule API

`POST /api/sessions/{id}/reschedule`

Đổi lịch.

Body gồm:

`new_session_id`

hoặc:

`new_date`

`new_start_time`

`new_duration_minutes`

`reason`

`note`

`send_email`

`POST /api/sessions/{id}/push-to-next-week`

Đẩy ca sang tuần sau.

`GET /api/reschedule-logs`

Lịch sử đổi lịch.

`GET /api/makeup-requests`

Danh sách ca cần bù.

`POST /api/makeup-requests/{id}/schedule`

Xếp lịch cho ca cần bù.

---

## 6.9. review API

`GET /api/sessions/{id}/review`

Lấy form đánh giá.

`POST /api/sessions/{id}/review`

Lưu đánh giá.

`PUT /api/session-reviews/{id}`

Sửa đánh giá.

`GET /api/students/{id}/reviews`

Lấy toàn bộ nhận xét của học viên.

---

## 6.10. notification API

`POST /api/notifications/send-confirmation`

Gửi email xác nhận.

`POST /api/notifications/send-reschedule`

Gửi email đổi lịch.

`POST /api/notifications/send-reminder`

Gửi email nhắc lịch.

`POST /api/notifications/send-teacher-daily-summary`

Gửi email tổng hợp lịch giáo viên.

`POST /api/notifications/pre-class-message`

Giáo viên gửi lời nhắn trước buổi học.

`GET /api/notifications/logs`

Lịch sử email.

`POST /api/notifications/{id}/resend`

Gửi lại email lỗi.

---

## 6.11. report API

`GET /api/reports/teacher-hours`

Báo cáo giờ dạy giáo viên.

`GET /api/reports/student-progress`

Báo cáo tiến độ học viên.

`GET /api/reports/pending-feedback`

Báo cáo ca chưa nhập nhận xét.

`GET /api/reports/makeup-sessions`

Báo cáo ca bù.

`GET /api/reports/export`

Xuất báo cáo Excel/CSV.

---

# 7. API bên thứ ba nên tích hợp

## 7.1. email service

Có thể dùng một trong các dịch vụ:

Amazon SES.

SendGrid.

Mailgun.

SMTP Google Workspace.

Yêu cầu:

Gửi email tự động.

Theo dõi trạng thái gửi.

Lưu message ID.

Hỗ trợ template HTML.

Hỗ trợ file đính kèm.

Email gửi đi nên là email hệ thống, ví dụ:

`ieltsonline@ducthangbui.com`

---

## 7.2. file storage API

Dùng để lưu file giáo viên gửi cho học viên.

Có thể dùng:

AWS S3.

Google Cloud Storage.

Cloudflare R2.

Google Drive API, nếu muốn tận dụng hệ sinh thái Google.

Yêu cầu:

Upload file.

Tải file.

Phân quyền truy cập file.

Giới hạn dung lượng.

Quét định dạng file an toàn.

---

## 7.3. calendar API, tùy chọn

Có thể tích hợp Google Calendar API ở giai đoạn sau.

Mục đích:

Đồng bộ lịch dạy của giáo viên.

Tạo event tự động.

Gửi lời mời calendar.

Nhắc lịch qua calendar.

Tuy nhiên, giai đoạn đầu chưa bắt buộc. Nếu làm luôn sẽ tăng độ phức tạp.

---

## 7.4. meeting link API, tùy chọn

Nếu lớp học online dùng Zoom/Google Meet, có thể tích hợp:

Zoom API.

Google Meet qua Google Calendar.

Microsoft Teams API.

Mục đích:

Tạo link học tự động.

Gắn link vào email xác nhận.

Gắn link vào ca học.

---

# 8. bảo mật hệ thống

## 8.1. xác thực đăng nhập

Dùng JWT hoặc session-based authentication.

Mật khẩu phải được hash bằng bcrypt hoặc Argon2.

Không lưu mật khẩu dạng plain text.

Có chức năng reset password qua email.

Có giới hạn số lần đăng nhập sai.

---

## 8.2. phân quyền truy cập

Dùng RBAC, tức role-based access control, nghĩa là phân quyền theo vai trò.

Ví dụ:

Giáo viên chỉ xem được lịch của mình.

Giáo viên chỉ sửa được ca của mình.

Giáo viên không xem được báo cáo lương của giáo viên khác.

AM xem được toàn bộ học viên và giáo viên.

Super admin xem được toàn bộ hệ thống.

---

## 8.3. bảo vệ dữ liệu học viên

Thông tin học viên gồm email, số điện thoại, lịch học, điểm, nhận xét. Đây là dữ liệu cá nhân, nên cần bảo vệ kỹ.

Yêu cầu:

HTTPS bắt buộc.

Không public API không cần thiết.

Không expose student ID nội bộ nếu không cần.

Phân quyền rõ người được xem nhận xét.

Log lại các thao tác xem/sửa/xóa dữ liệu quan trọng.

---

## 8.4. bảo mật API

Yêu cầu:

Validate dữ liệu đầu vào.

Chống SQL Injection.

Chống XSS.

Chống CSRF nếu dùng cookie session.

Rate limit API đăng nhập.

Rate limit API gửi email.

Kiểm tra quyền ở backend, không chỉ ở frontend.

---

## 8.5. audit log

Các thao tác sau cần lưu log:

Tạo ca học.

Gán học viên vào ca.

Đổi lịch.

Hủy ca.

Đẩy ca sang tuần sau.

Sửa số buổi học viên.

Sửa nhận xét giáo viên.

Gửi email.

Import học viên.

Xuất báo cáo.

Mục đích là khi có tranh cãi về lịch học, buổi bù hoặc tính giờ dạy, có thể truy vết được.

---

## 8.6. backup dữ liệu

Yêu cầu:

Backup database hằng ngày.

Lưu backup ít nhất 30 ngày.

Có phương án restore.

Log lỗi hệ thống.

Theo dõi trạng thái server.

---

# 9. luồng nghiệp vụ chính

## 9.1. luồng giáo viên submit ca rảnh

Giáo viên đăng nhập.

Vào trang “Submit ca rảnh”.

Chọn tuần.

Thêm ngày, giờ, thời lượng.

Bấm submit.

Hệ thống kiểm tra trùng lịch.

Nếu hợp lệ, lưu vào database.

Ca xuất hiện trên dashboard AM.

AM có thể gán học viên vào ca.

---

## 9.2. luồng AM gán học viên vào ca

AM vào lịch tuần.

Chọn ca trống.

Bấm “Gán học viên”.

Tìm học viên theo tên/mã/email.

Chọn một hoặc nhiều học viên.

Hệ thống kiểm tra học viên còn buổi hay không.

Hệ thống kiểm tra trùng lịch học viên.

AM xác nhận.

Hệ thống tạo booking.

Hệ thống gửi email xác nhận.

Ca chuyển trạng thái “đã gán”.

---

## 9.3. luồng đổi lịch

Người dùng bấm “Đổi lịch”.

Chọn ca mới hoặc tạo ca mới.

Nhập lý do đổi lịch.

Hệ thống lưu ca cũ và ca mới.

Hệ thống cập nhật trạng thái ca cũ.

Hệ thống tạo hoặc cập nhật ca mới.

Hệ thống gửi email đổi lịch.

Hệ thống lưu reschedule log.

---

## 9.4. luồng đẩy ca sang tuần sau

AM bấm “Đẩy sang tuần sau”.

Nhập ghi chú.

Chọn tuần cần bù.

Hệ thống tạo makeup request.

Ca hiện trong danh sách “cần bù”.

Khi AM xếp lịch tuần sau, hệ thống hiển thị cảnh báo.

AM chọn ca phù hợp.

Hệ thống gán học viên vào ca bù.

---

## 9.5. luồng giáo viên nhập nhận xét

Giáo viên vào lịch hôm nay.

Bấm vào ca đã dạy.

Chọn trạng thái học viên.

Nhập điểm IELTS Speaking.

Nhập nhận xét.

Nhập topic/questions.

Nhập homework.

Nhập lời nhắn cho học viên.

Lưu.

Hệ thống cập nhật lịch sử học viên.

Hệ thống cập nhật số buổi.

Hệ thống đánh dấu “đã hoàn thành nhận xét”.

---

# 10. yêu cầu UI/UX

## 10.1. nguyên tắc thiết kế

Giao diện nên ưu tiên vận hành nhanh, không cần quá màu mè.

Người dùng chính là AM và giáo viên, nên cần:

Ít thao tác.

Dễ nhìn lịch.

Dễ lọc.

Dễ tìm học viên.

Dễ biết ca nào có vấn đề.

Dễ xử lý việc cần làm hôm nay.

---

## 10.2. màn hình ưu tiên thiết kế trước

UI/UX nên vẽ trước các màn sau:

Login.

AM dashboard.

Teacher dashboard.

Weekly calendar.

Session detail modal.

Assign student modal.

Reschedule modal.

Push to next week modal.

Student list.

Student profile.

Teacher availability page.

Session review form.

Teacher report page.

Email template/settings page.

---

## 10.3. component quan trọng

Calendar component.

Student search dropdown.

Teacher filter.

Status badge.

Confirmation modal.

Reschedule timeline.

Session history drawer.

Review form.

Notification toast.

Warning banner.

Bulk import table.

Export button.

---

# 11. quy tắc trạng thái ca học

Nên chuẩn hóa status ngay từ đầu.

Gợi ý status:

`available`: ca trống.

`booked`: đã có học viên.

`completed`: đã học xong.

`pending_feedback`: đã học nhưng chưa nhập nhận xét.

`feedback_completed`: đã hoàn thành nhận xét.

`student_absent`: học viên nghỉ.

`teacher_absent`: giáo viên nghỉ.

`student_late`: học viên muộn.

`no_show`: học viên không online.

`cancelled`: ca bị hủy.

`rescheduled`: ca đã đổi lịch.

`makeup`: ca bù.

Nên phân biệt rõ “trạng thái ca học” và “trạng thái học viên trong ca”, vì một ca nhóm có thể có học viên A đi học, học viên B nghỉ.

---

# 12. rule tính số buổi

Cần thống nhất quy tắc với team vận hành trước khi dev code.

Gợi ý:

Nếu trạng thái là `completed` → trừ 1 buổi.

Nếu học viên muộn nhưng vẫn học → vẫn trừ 1 buổi.

Nếu học viên no-show không báo trước → tùy chính sách, có thể vẫn trừ 1 buổi.

Nếu giáo viên nghỉ → không trừ buổi, tạo ca bù.

Nếu hệ thống/AM hủy vì lý do vận hành → không trừ buổi.

Nếu đẩy sang tuần sau → chưa trừ buổi cho đến khi học xong ca bù.

Phần này cần được chốt rất kỹ vì liên quan trực tiếp đến chăm sóc học viên và tính lương giáo viên.

---

# 13. rule tính giờ dạy giáo viên

Công thức:

Tổng giờ dạy = tổng `duration_minutes` của các ca hợp lệ / 60.

Ca hợp lệ nên gồm:

Ca đã học.

Ca học viên no-show nhưng vẫn tính công giáo viên, nếu chính sách cho phép.

Ca học viên hủy sát giờ, nếu chính sách cho phép.

Không tính:

Ca bị hủy trước.

Ca giáo viên nghỉ.

Ca đổi lịch chưa dạy.

Báo cáo phải cho phép AM kiểm tra từng ca trước khi chốt lương.

---

# 14. cron job / tác vụ tự động

Hệ thống cần có các tác vụ chạy tự động.

## 14.1. gửi email nhắc học viên buổi sáng

Thời gian gợi ý:

07:00 hằng ngày theo giờ Việt Nam.

Tác vụ:

Tìm tất cả ca học trong ngày.

Gửi email cho học viên.

Ghi email log.

---

## 14.2. gửi email nhắc trước 30 phút

Chạy mỗi 5 phút.

Tác vụ:

Tìm ca sắp bắt đầu trong 30 phút.

Gửi email nhắc.

Tránh gửi trùng bằng email log.

---

## 14.3. gửi email tổng hợp cho giáo viên

Thời gian gợi ý:

07:00 hằng ngày.

Tác vụ:

Tìm lịch dạy hôm nay của từng giáo viên.

Gửi một email tổng hợp.

---

## 14.4. cảnh báo học viên gần hết buổi

Chạy hằng ngày.

Tác vụ:

Tìm học viên còn từ 1 đến 2 buổi.

Gửi cảnh báo cho AM.

Hiển thị trên dashboard.

---

## 14.5. cảnh báo ca chưa nhập nhận xét

Chạy hằng ngày, ví dụ 23:00.

Tác vụ:

Tìm ca đã qua nhưng chưa có nhận xét.

Gửi nhắc giáo viên hoặc hiển thị trên dashboard.

---

# 15. giai đoạn triển khai đề xuất

## giai đoạn 1: lõi xếp lịch

Ưu tiên làm trước:

Đăng nhập.

Phân quyền AM/giáo viên.

Giáo viên submit ca rảnh.

AM tạo ca.

AM gán học viên.

Danh sách học viên.

Calendar tuần.

Email xác nhận.

Đây là MVP, tức phiên bản tối thiểu có thể dùng được.

---

## giai đoạn 2: đổi lịch và nhắc lịch

Làm tiếp:

Đổi lịch.

Đẩy ca sang tuần sau.

Makeup request.

Lịch sử đổi lịch.

Email đổi lịch.

Email nhắc học viên.

Email tổng hợp lịch giáo viên.

---

## giai đoạn 3: đánh giá và lịch sử học

Làm tiếp:

Form chấm điểm.

Nhận xét sau buổi học.

Lịch sử học viên.

Topic/questions đã học.

Theo dõi số buổi còn lại.

Cảnh báo học viên gần hết buổi.

---

## giai đoạn 4: báo cáo và tối ưu vận hành

Làm tiếp:

Báo cáo giờ dạy giáo viên.

Báo cáo học viên.

Export Excel/CSV.

Email log.

Audit log.

Dashboard vận hành nâng cao.

---

## giai đoạn 5: tính năng nâng cao

Có thể làm sau:

Student portal.

Đồng bộ Google Calendar.

Tạo link Zoom/Meet tự động.

Gửi file/tài liệu nâng cao.

Tự động nhắc gia hạn gói học.

Báo cáo chất lượng giáo viên.

Báo cáo tiến bộ học viên theo band IELTS.

---

# 16. đề xuất công nghệ

Phần này dev có thể điều chỉnh, nhưng em đề xuất stack dễ phát triển và dễ bảo trì:

Frontend:

Next.js hoặc React.

Tailwind CSS.

Shadcn UI hoặc Ant Design.

Calendar library: FullCalendar hoặc React Big Calendar.

Backend:

NestJS hoặc Express.js.

Hoặc Laravel nếu team quen PHP.

Database:

PostgreSQL ưu tiên hơn MySQL vì mạnh về dữ liệu quan hệ và truy vấn báo cáo.

Background jobs:

BullMQ + Redis nếu dùng Node.js.

Hoặc cron job server-side.

File storage:

AWS S3, Cloudflare R2 hoặc Google Cloud Storage.

Email:

Amazon SES hoặc SendGrid.

Deployment:

Docker.

VPS/cloud server.

CI/CD qua GitHub Actions.

---

# 17. đầu việc cụ thể cho UI/UX

UI/UX nên bắt đầu bằng các deliverables sau:

User flow cho AM.

User flow cho giáo viên.

Sitemap toàn hệ thống.

Wireframe low-fidelity cho các màn chính.

Prototype high-fidelity cho:

Dashboard AM.

Weekly calendar.

Assign student modal.

Reschedule modal.

Student profile.

Teacher review form.

Design system cơ bản:

Màu trạng thái.

Button.

Input.

Table.

Modal.

Badge.

Toast.

Calendar card.

---

# 18. đầu việc cụ thể cho dev

Dev nên bắt đầu bằng các việc sau:

Chốt database schema.

Dựng authentication và role-based permission.

Dựng API user/teacher/student/session.

Dựng calendar API.

Dựng booking flow.

Dựng notification service.

Dựng background jobs gửi email.

Dựng audit logs.

Dựng report API.

Viết seed data demo:

5 giáo viên.

30 học viên.

50 ca học.

Một số ca đã đổi lịch.

Một số ca bù.

Một số ca chưa nhận xét.

---

# 19. các điểm cần chốt thêm trước khi code

Một số rule cần anh/chị vận hành chốt rõ với dev:

Giáo viên có được tự đổi lịch không, hay chỉ gửi yêu cầu đổi lịch? => trong một số trường hợp giáo viên được tự đổi lịch với học sinh

Học viên no-show có bị trừ buổi không? => có nhưng phải là do lỗi học sinh không tham gia và không có lý do hợp lệ

Ca nhóm tính số buổi như thế nào? => tính theo số học viên tham gia và giáo viên dạy. VD: nhóm có 3 học viên, có 2 học viên học, 1 học viên no show=> tính 2.5 buổi  (một buổi là đơn vị tính tối thiểu tương đương ca học 30 phút)

Một ca nhóm có nhiều học viên, nếu một bạn nghỉ thì xử lý ra sao? => Vấn học bình thường và vẫn tính số buổi đã học của toàn bộ học viên bình thường. Ca nhóm sẽ ko cho đổi lịch

Giáo viên có được xem toàn bộ lịch sử học viên hay chỉ lịch sử liên quan đến mình? => xem toàn bộ

Email nhắc “đến giờ học” có thật sự cần không, hay chỉ cần buổi sáng + trước 30 phút? => Có, rất cần vì học sinh hay quên

Có cần học viên đăng nhập không, hay chỉ nhận email trong giai đoạn đầu? => có, sẽ có 1 trang web cho riêng học sinh để check lịch và các thông tin khác.

Tài khoản và mật khẩu của học sinh và giáo viên: sử dụng tài khoản là email của giáo viên/học sinh, mật khẩu mặc định là Saola2026@ và yêu cầu đổi mật khẩu ngay lần đăng nhập đầu tiên.

Trang profile hs và giáo viên có mục đổi mật khẩu

Nếu quên mật khẩu thì trang đăng nhập có ghi rõ liên hệ quản lý lớp học để lấy lại mật khẩu.

AM có trang riêng để tra cứu mật khẩu của học viên (theo student ID, tên, và email) tương tự tra cứu của cả giáo viên.

Có cần đồng bộ Google Calendar không? => Tạm thời ko

---

# 20. Plan tương lai

Trang hệ thống LMS tổng sẽ get dữ liệu về students của trang speaking này để làm báo cáo học viên được.