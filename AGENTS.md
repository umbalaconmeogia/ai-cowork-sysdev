# AGENTS.md — Quy tắc làm việc cho AI assistant

File này là **instruction gốc duy nhất** cho mọi AI assistant làm việc trong repo. File riêng của từng tool (`CLAUDE.md`, `.cursor/rules`…) chỉ trỏ về đây, không chứa nội dung riêng. Quy ước nền tảng dành cho con người: [docs/AiAssistant/AiAssistant.md](docs/AiAssistant/AiAssistant.md).

File này giữ **tinh gọn có chủ đích**: chỉ chứa nguyên tắc chung và hành vi áp dụng cho mọi ngữ cảnh. Quy tắc riêng của từng vùng nằm trong `AGENTS.md` của thư mục đó (xem Bản đồ quy tắc) — cùng nguyên lý index-first như tài liệu.

## 1. Nguyên tắc nền

- **Repo là nhà duy nhất của tri thức spec.** Tri thức về yêu cầu / thiết kế chỉ được coi là tồn tại khi đã nằm trong `docs/`. Tài liệu bên ngoài (Google Docs/Sheet/Slide) là đầu vào nhất thời.
- **AI ghi — người kiểm soát.** AI quyết định lưu vào đâu theo cơ cấu đã định; con người review diff. Người dùng hiếm khi sửa tay tài liệu trong repo — nếu phát hiện dấu vết sửa tay làm lệch cơ cấu (mục lục thiếu, liên kết gãy), chủ động đề xuất chỉnh.
- **Ngôn ngữ:** tài liệu viết bằng **tiếng Việt**. Bản dịch (nếu có) đặt cùng thư mục, cùng tên, thêm hậu tố ngôn ngữ: `<name>.ja.md`, `<name>.en.md`. Bản tiếng Việt là bản gốc; khi sửa bản gốc phải đề nghị đồng bộ bản dịch.
- **Ngắn mà đúng thắng dài mà mượt.** Ưu tiên ghi quyết định + lý do + ràng buộc + câu hỏi chưa chốt. Không sinh văn xuôi đồ sộ kiểu tài liệu truyền thống; không lặp lại nội dung đã có ở file khác — liên kết tới đó.
- **Sự thật nằm ở text, sơ đồ là view.** Khi hai bên lệch nhau, text thắng — và AI phải giữ hai bên đồng bộ.

## 2. Bản đồ quy tắc (đọc trước khi làm việc trong vùng tương ứng)

| Phạm vi công việc | Bắt buộc đọc trước |
|---|---|
| Đọc / ghi tài liệu trong `docs/SystemDesign/`, hoặc chuyển đổi tài liệu nguồn vào đó | [docs/SystemDesign/AGENTS.md](docs/SystemDesign/AGENTS.md) |

- Quy tắc **gần nhất thắng**: `AGENTS.md` trong thư mục con có hiệu lực ưu tiên cho nội dung thư mục đó.
- Chưa đọc file quy tắc của vùng mà đã định làm việc trong vùng đó → dừng lại, đọc trước.
- Thêm vùng luật mới (coding, test, ops…) → tạo `AGENTS.md` trong thư mục tương ứng và bổ sung vào bảng này.

## 3. Hành vi chung (mọi ngữ cảnh)

1. **Trước khi sửa tài liệu, liệt kê kế hoạch:** "tôi định sửa các file này, vì lý do này" — để người dùng kiểm soát mà không phải đọc từng dòng. Sửa theo **diff nhỏ**, không regenerate cả file hay cả cụm.
2. **Chủ động đề nghị ghi lại quyết định.** Khi thấy một quyết định hình thành trong hội thoại (chọn phương án, chốt với khách hàng, chấp nhận trade-off) — đề nghị ghi dạng ADR gọn (*Bối cảnh → Quyết định → Hậu quả*), đừng đợi được sai. Khi người dùng hỏi *"những gì ta đã chốt hôm nay mà docs chưa có?"* — rà lại hội thoại, trả lời đầy đủ kèm đề xuất ghi vào đâu.
3. **Khai báo chỗ mờ khi chuyển đổi tài liệu nguồn:** liệt kê riêng các điểm *không chắc / bản gốc mơ hồ / đã suy diễn*, thay vì lẳng lặng điền vào chỗ trống.
4. **Changelog theo mốc, không theo lần sửa.** Chỉ thêm dòng lịch sử khi thay đổi đáng kể về nội dung/quyết định; chỉnh câu chữ lặt vặt không ghi — git đã lo phần đó.
5. **An toàn — không phụ thuộc ngữ cảnh:** không bao giờ tự ý sửa nội dung file có dòng `Status: agreed-customer` (nội dung đã chốt với khách hàng); khi được yêu cầu sửa, nhắc người dùng và chờ xác nhận rõ ràng. Chi tiết về status: quy tắc của `docs/SystemDesign/`.
