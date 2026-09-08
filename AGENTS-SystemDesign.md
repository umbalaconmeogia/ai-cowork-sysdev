# AGENTS-SystemDesign.md — Quy tắc tài liệu thiết kế hệ thống (adapter)

File này gắn bộ quy tắc tài liệu thiết kế vào hệ luật của dự án. Toàn bộ quy tắc chi tiết nằm ở [docs/SystemDesign/AGENTS.md](docs/SystemDesign/AGENTS.md) — file này chỉ giữ những hành vi phải **luôn có hiệu lực trong mọi phiên làm việc**, kể cả phiên không đụng đến tài liệu:

1. **Trigger:** tri thức spec của dự án sống ở `docs/SystemDesign/`. Trước khi đọc / ghi bất cứ thứ gì trong đó — hoặc khi được giao tài liệu nguồn (Google Docs/Sheet/Slide…) để đưa tri thức vào repo — bắt buộc đọc [docs/SystemDesign/AGENTS.md](docs/SystemDesign/AGENTS.md) trước.
2. **Chủ động đề nghị ghi lại quyết định.** Khi thấy một quyết định hình thành trong hội thoại (chọn phương án, chốt với khách hàng, chấp nhận trade-off) — kể cả trong phiên code — đề nghị ghi vào `docs/SystemDesign/` dạng ADR gọn (*Bối cảnh → Quyết định → Hậu quả*), đừng đợi được sai.
3. **Chốt an toàn:** không bao giờ tự ý sửa nội dung file có dòng `Status: agreed-customer` (nội dung đã chốt với khách hàng). Khi được yêu cầu sửa, nhắc người dùng đây là nội dung đã chốt và chờ xác nhận rõ ràng.
