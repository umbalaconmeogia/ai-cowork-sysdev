# SR-01 — Yêu cầu chức năng

> Status: agreed-customer (2026-08-10)

## 1. Danh sách yêu cầu

| ID | Yêu cầu | Ghi chú |
|---|---|---|
| FR-01 | Nhân viên xem lịch phòng trống theo ngày/tuần | Mặc định hiển thị tuần hiện tại |
| FR-02 | Đặt phòng: chọn phòng, thời gian, tiêu đề cuộc họp, số người | Không cho đặt trùng khung giờ |
| FR-03 | Hủy booking của chính mình | Trước giờ họp ≥ 15 phút |
| FR-04 | Phòng đặc biệt: booking ở trạng thái chờ cho đến khi GA duyệt | Xem luồng ở [BD-03](../BD/BD-03-BookingFlows.md) |
| FR-05 | Thông báo email khi booking được tạo / duyệt / từ chối / hủy | Slack là kênh phụ, xem FR-08 |
| FR-06 | GA quản lý danh mục phòng (thêm/sửa/ngừng sử dụng, đánh dấu phòng đặc biệt) | |
| FR-07 | GA xem báo cáo tỷ lệ sử dụng phòng theo tháng | Xuất CSV |
| FR-08 | Thông báo Slack vào channel của người đặt | |

## 2. Ví dụ hành vi (given–when–then)

**FR-02 — chặn đặt trùng:**

- **Given** phòng A đã có booking 10:00–11:00 ngày X
- **When** người dùng đặt phòng A 10:30–11:30 ngày X
- **Then** hệ thống từ chối, hiển thị booking đang chiếm khung giờ; không tạo booking mới.

## 3. Ràng buộc từ khách hàng (đã chốt)

- Chỉ dùng tài khoản nội bộ (SSO công ty), **không** có đăng ký tài khoản riêng.
- Không làm mobile app ở giai đoạn này — web responsive là đủ.
- Dữ liệu booking giữ tối thiểu 2 năm phục vụ báo cáo.

## 4. Câu hỏi chưa chốt

- Người đặt hộ (đặt cho người khác chủ trì) có cần không? — GA sẽ trả lời sau buổi họp tháng 9.
