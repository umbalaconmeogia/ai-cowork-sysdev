# AGENTS.md

File instruction **gốc của dự án** — nơi giữ quy tắc chung cho AI assistant làm việc trong repo, và là chỗ nối các bộ quy tắc đóng gói riêng (mỗi bộ một dòng link, như mục dưới).

**Cách file này được nạp:** file này được đưa vào **mỗi phiên chat một cách tự động** — tool đọc trực tiếp chuẩn `AGENTS.md` (Cursor bản mới, Codex…) nạp thẳng; tool dùng file cấu hình riêng thì nạp qua con trỏ: [CLAUDE.md](CLAUDE.md) với Claude Code, [.cursor/rules/agents.mdc](.cursor/rules/agents.mdc) với Cursor. Vì luôn chiếm chỗ trong mọi phiên, file này phải giữ **tinh gọn**: quy tắc chi tiết đặt ở file được link, chỉ nạp khi cần.

## Quy tắc tài liệu thiết kế hệ thống

Đọc và tuân theo [AGENTS-SystemDesign.md](AGENTS-SystemDesign.md).

## Quy tắc riêng của dự án

Repo này là repo quy ước nên chưa có quy tắc riêng nào khác. Trong dự án của bạn, đây là nơi giữ (hoặc giữ nguyên) các quy tắc vốn có của dự án: coding convention, build, test, review…
