# BD-02 — Thiết kế database

> Status: agreed-internal

## 1. Sơ đồ ER

```mermaid
erDiagram
    USERS ||--o{ BOOKINGS : "đặt"
    ROOMS ||--o{ BOOKINGS : "được đặt"
    BOOKINGS ||--o{ BOOKING_EVENTS : "có lịch sử"

    USERS {
        bigint id PK
        string sso_subject "định danh từ SSO"
        string name
        string email
        string role "employee | ga-admin"
    }
    ROOMS {
        bigint id PK
        string name
        int capacity
        boolean is_special "cần GA duyệt"
        boolean is_active
    }
    BOOKINGS {
        bigint id PK
        bigint user_id FK
        bigint room_id FK
        datetime start_at
        datetime end_at
        string title
        int attendee_count
        string status "pending | confirmed | rejected | cancelled"
    }
    BOOKING_EVENTS {
        bigint id PK
        bigint booking_id FK
        string event "created | approved | rejected | cancelled"
        bigint actor_user_id
        datetime created_at
    }
```

## 2. Ghi chú thiết kế

- **Chặn đặt trùng (FR-02):** ràng buộc kiểm tra ở tầng service + unique-range check trong transaction; không dựa vào UI.
- **`BOOKING_EVENTS`** là lịch sử bất biến (append-only) — phục vụ audit và báo cáo FR-07; không update/delete.
- Booking phòng thường tạo ra ở trạng thái `confirmed` ngay; phòng đặc biệt tạo ở `pending` (xem [BD-03](BD-03-BookingFlows.md)).

## 3. Câu hỏi chưa chốt

- Giữ dữ liệu 2 năm (ràng buộc SR-01 mục 3): xóa cứng hay archive sang bảng riêng? — cần bàn với GA về nhu cầu tra cứu quá 2 năm.
