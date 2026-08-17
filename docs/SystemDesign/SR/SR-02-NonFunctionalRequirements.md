# SR-02 — Yêu cầu phi chức năng

> Status: agreed-internal

## 1. Hiệu năng

- ~200 người dùng, đỉnh điểm ~30 người đồng thời (đầu giờ sáng).
- Trang lịch phòng tải < 2 giây với 1 tuần dữ liệu.

## 2. Bảo mật

- Đăng nhập qua SSO công ty (OIDC). Không lưu mật khẩu riêng.
- Phân quyền 2 vai trò: `employee`, `ga-admin`.

## 3. Vận hành

- Chạy trên hạ tầng nội bộ hiện có (xem [BD-01](../BD/BD-01-Architecture.md)).
- Backup database hằng ngày, giữ 30 bản.
- Không yêu cầu HA — chấp nhận downtime bảo trì ngoài giờ.
