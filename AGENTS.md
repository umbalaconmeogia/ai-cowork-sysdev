# AGENTS.md

File instruction **gốc của dự án** — nơi giữ quy tắc chung cho AI assistant làm việc trong repo, và là chỗ nối các bộ quy tắc đóng gói riêng (mỗi bộ một dòng link, như mục dưới).

**Cách file này được nạp:** tự động vào mỗi phiên chat — các tool bản mới **đọc trực tiếp** chuẩn `AGENTS.md` (Claude Code từ v2.1.277 khi repo không có `CLAUDE.md`; Cursor bản mới, Codex…). File con trỏ chỉ cần khi có file cấu hình riêng **che mất** nó: dự án đã có sẵn `CLAUDE.md` thì Claude Code bỏ qua `AGENTS.md` — phải thêm dòng import `` @AGENTS.md `` vào đó (xem [CLAUDE.md](CLAUDE.md) mẫu; phải là cú pháp import `@`, câu văn "hãy đọc" không đảm bảo được nạp); Cursor bản cũ dùng [.cursor/rules/agents.mdc](.cursor/rules/agents.mdc). Vì luôn chiếm chỗ trong mọi phiên, file này phải giữ **tinh gọn**: quy tắc chi tiết đặt ở file được link, chỉ nạp khi cần.

## Quy tắc tài liệu thiết kế hệ thống

Đọc và tuân theo @AGENTS-SystemDesign.md

(Dòng trên dùng cú pháp import `@` — Claude Code nạp thẳng file adapter vào mọi phiên, đúng vai trò "luôn trực chiến" của nó; tool không hỗ trợ import thì coi đây là chỉ thị đọc file `AGENTS-SystemDesign.md`.)

## Quy tắc riêng của dự án

Repo này là repo quy ước nên chưa có quy tắc riêng nào khác. Trong dự án của bạn, đây là nơi giữ (hoặc giữ nguyên) các quy tắc vốn có của dự án: coding convention, build, test, review…
