# Chuyên đề — Đặt phòng định kỳ (Recurring Booking)

> Status: draft

Nhu cầu phát sinh sau buổi demo 2026-08-14: GA muốn đặt "họp giao ban mỗi thứ Hai 9:00–10:00". Chưa nằm trong FR đã chốt — nếu làm sẽ là thương lượng mở rộng phạm vi.

## 1. Các phương án đang cân nhắc

| Phương án | Mô tả | Ưu | Nhược |
|---|---|---|---|
| A. Sinh trước N booking | Tạo sẵn từng booking con cho 3 tháng tới | Đơn giản, tái dùng toàn bộ logic hiện có | Sửa/hủy cả chuỗi phải xử lý hàng loạt |
| B. Booking rule riêng | Lưu quy tắc định kỳ, tính toán chiếm chỗ lúc runtime | Sửa một chỗ, chuỗi vô hạn | Logic chặn trùng phức tạp hơn đáng kể |

Đang nghiêng về **A** vì khớp nguyên tắc QD-01 (giữ đơn giản) — chưa chốt.

## 2. Câu hỏi chưa chốt

- Phạm vi và chi phí: khách hàng có chấp nhận đưa vào giai đoạn 1 không, hay để giai đoạn 2? — SE nắm dự án sẽ trao đổi với GA.
- Nếu một booking con trong chuỗi rơi vào ngày phòng bị ngừng sử dụng thì xử lý thế nào?
