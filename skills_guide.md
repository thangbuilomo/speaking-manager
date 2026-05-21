# Hướng Dẫn Sử Dụng và Vai Trò của Các Skills trong Antigravity

Chào mừng bạn đến với hệ thống kỹ năng của **Google Antigravity**! Các kỹ năng bạn yêu cầu đã được cài đặt thành công vào thư mục cấu hình cục bộ của dự án tại:
`<workspace-root>/.agent/skills/`

Dưới đây là tài liệu chi tiết giải thích vai trò của từng skill và cách bạn có thể kích hoạt chúng khi làm việc với Antigravity.

---

## 1. Bảng Tổng Hợp Vai Trò Các Skills

| Tên Skill (Thư mục) | Lĩnh vực | Vai Trò & Chức Năng Chính | Khi nào nên kích hoạt? |
| :--- | :--- | :--- | :--- |
| **`frontend-design`** | Design / Theme | Tạo giao diện Frontend đẳng cấp, thẩm mỹ cao, tránh "giao diện AI thô sơ". | Khi code UI/UX, landing page, dashboard, React/HTML/CSS. |
| **`theme-factory`** | Theme / Style | Bộ công cụ định nghĩa màu sắc, font chữ (10 theme có sẵn) hoặc tạo theme mới. | Khi thiết lập hệ thống design token, bảng màu cho UI/slides/docs. |
| **`web-artifacts-builder`**| Web Build | Xây dựng các ứng dụng web React/Tailwind/shadcn phức tạp nhiều trang/component. | Khi build web app lớn cần state management, routing, shadcn. |
| **`webapp-testing`** | Web Test | Tự động hóa kiểm thử UI, chụp màn hình, check log trình duyệt bằng Playwright. | Khi cần test lỗi giao diện, kiểm thử tính năng của web local. |
| **`mcp-builder`** | MCP | Hướng dẫn xây dựng các MCP Server (Python/NodeTS) kết nối API/tool ngoài. | Khi cần mở rộng công cụ cho AI kết nối với database, GitHub, Slack. |
| **`doc-coauthoring`** | Authoring / Docs | Quy trình đồng biên soạn tài liệu kỹ thuật, đề xuất dự án chất lượng cao. | Khi cần viết tài liệu kiến trúc, proposal, tài liệu quyết định. |
| **`internal-comms`** | Communications | Soạn thảo email, báo cáo tiến độ, bản tin, tài liệu FAQ chuẩn doanh nghiệp. | Khi cần viết báo cáo tiến độ dự án, cập nhật lãnh đạo, sự cố. |
| **`algorithmic-art`** | Art / Creative | Tạo nghệ thuật thuật toán, vẽ hình tương tác dựa trên toán học bằng `p5.js`. | Khi cần vẽ tranh Generative Art bằng code, luồng hạt ngẫu nhiên. |

---

## 2. Chi Tiết Vai Trò & Cách Dùng Từng Skill

### 🎨 1. frontend-design (Thiết kế Giao diện Cao cấp)
* **Mô tả:** Giúp tạo ra các giao diện web, component React, hoặc layout HTML/CSS có chất lượng sản xuất (production-grade) với thẩm mỹ cao.
* **Vai trò:** Hướng dẫn AI cách lựa chọn typography hiện đại (Inter, HSL colors, Outfit), tạo các hiệu ứng micro-animations, glassmorphism, và bố cục responsive. Giúp sản phẩm của bạn trông như được thiết kế bởi một Senior Frontend Designer chuyên nghiệp, tránh các giao diện thô sơ cơ bản của AI.
* **Cách dùng:**
  > **Ví dụ yêu cầu:** *"Hãy thiết kế cho tôi một giao diện Dashboard quản lý học viên thật đẹp bằng HTML/CSS vanilla, sử dụng skill frontend-design để thiết kế cao cấp."*

### 🖌️ 2. theme-factory (Nhà máy Giao diện & Màu sắc)
* **Mô tả:** Quản lý hệ thống màu sắc và font chữ của các sản phẩm (landing page, slide thuyết trình, tài liệu, v.v.).
* **Vai trò:** Cung cấp 10 bộ giao diện phối màu chuyên nghiệp hoặc cho phép tạo mới hệ thống phối màu đồng nhất. Giúp giao diện của bạn có tính nhất quán về mặt thương hiệu.
* **Cách dùng:**
  > **Ví dụ yêu cầu:** *"Hãy áp dụng theme màu Neon/Dark Mode từ skill theme-factory vào trang web này."*

### 🛠️ 3. web-artifacts-builder (Xây dựng Ứng dụng Web Phức tạp)
* **Mô tả:** Xây dựng ứng dụng web đa dạng thành phần bằng React, Tailwind CSS, và shadcn/ui.
* **Vai trò:** Hướng dẫn AI cách chia nhỏ component cấu trúc thư mục sạch sẽ, xử lý state management (quản lý trạng thái), điều hướng trang (routing), tích hợp các component nâng cao của thư viện UI cao cấp.
* **Cách dùng:**
  > **Ví dụ yêu cầu:** *"Tạo một ứng dụng web đăng ký học tập nhiều bước (multi-step form) có lưu trạng thái vào localStorage sử dụng web-artifacts-builder."*

### 🧪 4. webapp-testing (Kiểm thử Ứng dụng Web Local)
* **Mô tả:** Bộ công cụ kiểm thử frontend tự động sử dụng Playwright.
* **Vai trò:** Chỉ dẫn AI cách viết và chạy các script tự động mở trình duyệt Chromium/Firefox, điền biểu mẫu, click nút, chụp ảnh màn hình UI, thu thập console log và kiểm thử xem trang web hoạt động đúng không.
* **Cách dùng:**
  > **Ví dụ yêu cầu:** *"Hãy sử dụng skill webapp-testing viết script Playwright để kiểm tra chức năng đăng nhập của trang web local."*

### 🔌 5. mcp-builder (Xây dựng máy chủ MCP)
* **Mô tả:** Hướng dẫn tạo Model Context Protocol (MCP) Server bằng Python (FastMCP) hoặc Node/TypeScript (MCP SDK).
* **Vai trò:** MCP giúp AI có thêm các "công cụ" mới để tương tác với hệ thống của bạn (như đọc DB, ghi file, kết nối API ngoài). Skill này hướng dẫn AI viết code server MCP chuẩn chỉ, thiết lập schema cho tool rõ ràng để không bị lỗi.
* **Cách dùng:**
  > **Ví dụ yêu cầu:** *"Tôi muốn tạo một MCP server kết nối với cơ sở dữ liệu MySQL của dự án này, hãy dùng mcp-builder để viết code."*

### 📝 6. doc-coauthoring (Đồng sáng tác Tài liệu)
* **Mô tả:** Đồng hành cùng bạn viết tài liệu dự án chất lượng cao.
* **Vai trò:** Dẫn dắt bạn qua quy trình: thu thập ngữ cảnh ➔ viết nháp ➔ tinh chỉnh ➔ kiểm duyệt. Thích hợp cho việc viết Đặc tả kỹ thuật (Technical Specs), Đề xuất tính năng (Feature Proposals), hoặc Hướng dẫn cài đặt.
* **Cách dùng:**
  > **Ví dụ yêu cầu:** *"Tôi muốn viết tài liệu kiến trúc cho dự án Speaking Registration, hãy kích hoạt doc-coauthoring để thực hiện."*

### 📧 7. internal-comms (Truyền thông Nội bộ & Báo cáo)
* **Mô tả:** Soạn thảo các tài liệu giao tiếp nội bộ trong nhóm và doanh nghiệp.
* **Vai trò:** Cung cấp các biểu mẫu chuẩn và cách hành văn chuyên nghiệp để viết Báo cáo tiến độ (Status Reports), Bản tin nội bộ (Newsletters), Câu hỏi thường gặp (FAQs), hoặc Báo cáo sự cố hệ thống (Incident Reports).
* **Cách dùng:**
  > **Ví dụ yêu cầu:** *"Viết một email báo cáo sự cố sập server database sáng nay cho ban giám đốc, sử dụng skill internal-comms."*

### 🌀 8. algorithmic-art (Nghệ thuật Thuật toán)
* **Mô tả:** Tạo generative art sử dụng thư viện `p5.js`.
* **Vai trò:** Hướng dẫn AI cách viết code thuật toán vẽ hình ảnh, luồng hạt, mô phỏng vật lý chuyển động nghệ thuật dựa trên toán học (trigonometry, noise).
* **Cách dùng:**
  > **Ví dụ yêu cầu:** *"Hãy vẽ một hình nền nghệ thuật dạng lưới hạt chuyển động ngẫu nhiên bằng p5.js bằng skill algorithmic-art."*

---

## 3. Cách Antigravity Tự Động Nhận Diện và Sử Dụng

Vì các kỹ năng này được đặt trong thư mục `.agent/skills/` của dự án, Antigravity sẽ:
1. **Tự động quét mô tả (description)** trong file `SKILL.md` của các skill khi khởi chạy dự án.
2. **Tự động kích hoạt (equip)** skill tương ứng khi câu lệnh của bạn có nội dung trùng khớp ngữ nghĩa (ví dụ bạn nhắc đến *"thiết kế giao diện", "viết tài liệu", "kiểm thử web", v.v.*).
3. Bạn cũng có thể **chỉ định trực tiếp** bằng cách nói: *"Hãy dùng skill [Tên Skill] ở thư mục .agent/skills để..."* để đảm bảo AI áp dụng chính xác 100% hướng dẫn.
