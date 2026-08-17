# Tài liệu thiết kế hệ thống — MRB (Meeting Room Booking)

> **Lưu ý:** đây là **ví dụ minh họa** với một dự án giả tưởng, nhằm thể hiện cách tổ chức tài liệu theo [AGENTS.md](AGENTS.md). Nội dung nghiệp vụ là hư cấu.

Hệ thống đặt phòng họp nội bộ cho công ty ~200 nhân viên: đặt / hủy phòng, duyệt yêu cầu với phòng đặc biệt, thông báo qua email và Slack.

## Điều hướng nhanh

| Category | Chứa gì | Đọc khi nào |
|---|---|---|
| [SR/](SR/) | Yêu cầu hệ thống (functional / non-functional, ràng buộc từ khách hàng) | Cần biết hệ thống phải làm gì, phạm vi, điều đã cam kết |
| [BD/](BD/) | Thiết kế cơ bản: kiến trúc, database, luồng nghiệp vụ chính | Cần hiểu hệ thống được dựng thế nào ở mức tổng thể |
| [SpecialTopics/](SpecialTopics/) | Chuyên đề cắt ngang | Chủ đề riêng không thuộc gọn một category |

Category `DD/` (thiết kế chi tiết) và `Test/` **chưa tồn tại** — sẽ được tạo khi dự án bước sang giai đoạn tương ứng.

## Chọn điểm bắt đầu theo việc đang làm

- **Tìm hiểu yêu cầu / phạm vi** → [SR/README.md](SR/README.md)
- **Kiến trúc, tech stack** → [BD-01-Architecture.md](BD/BD-01-Architecture.md)
- **Database** → [BD-02-DatabaseDesign.md](BD/BD-02-DatabaseDesign.md)
- **Luồng đặt / duyệt phòng** → [BD-03-BookingFlows.md](BD/BD-03-BookingFlows.md)
- **Đặt phòng định kỳ (recurring)** → [SpecialTopics/RecurringBooking-Design.md](SpecialTopics/RecurringBooking-Design.md)

## Trạng thái tổng quan

| Category | Trạng thái | Ghi chú |
|---|---|---|
| SR | `agreed-customer` (FR) / `agreed-internal` (NFR) | FR đã chốt với khách 2026-08-10 |
| BD | `agreed-internal` / `draft` | Kiến trúc + DB đã thống nhất nội bộ; flows đang hoàn thiện |
| SpecialTopics | `draft` | Recurring booking đang bàn |
