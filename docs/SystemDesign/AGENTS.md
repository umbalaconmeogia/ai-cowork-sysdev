# AGENTS.md — Quy tắc cho `docs/SystemDesign/`

Quy tắc tổ chức, đọc và ghi tri thức thiết kế hệ thống. Áp dụng cho mọi thao tác trong thư mục này. Nguyên tắc chung của repo: [AGENTS.md gốc](../../AGENTS.md).

## 1. Cấu trúc thư mục

```
docs/SystemDesign/
├── AGENTS.md            ← file này
├── README.md            ← index điều hướng: category nào chứa gì, đọc khi nào
├── SR/                  ← System Requirements — yêu cầu hệ thống
│   ├── README.md        ← overview ngắn + mục lục link từng file, kèm mô tả "đọc khi nào"
│   ├── SR-01-<Topic>.md
│   ├── SR-02-<Topic>.md
│   └── material/        ← file không phải markdown (ảnh, xlsx, drawio…) của category này
├── BD/                  ← Basic Design — kiến trúc, DB, luồng nghiệp vụ chính, cấu trúc UI
├── DD/                  ← Detailed Design — API, service, migration, chi tiết UI/UX
├── Test/                ← kịch bản test, dữ liệu test, chiến lược test
└── SpecialTopics/       ← chuyên đề cắt ngang (job queue, authorization…) — mỗi chủ đề một file, chủ đề lớn một thư mục con
```

**Đây là khung định hướng, không phải danh sách file cứng.** Không quy định trước file nào phải tồn tại — AI tự tổ chức theo các quy tắc:

- **Một chủ đề một file.** File chi tiết đặt tên `<CAT>-NN-<TopicName>.md` (ví dụ `BD-03-DatabaseDesign.md`); số thứ tự phản ánh trình tự đọc hợp lý. Tên file và thư mục không chứa dấu cách.
- **Tách file** khi một file phình ra ngoài phạm vi một chủ đề, hoặc dài đến mức đọc cả file trở nên tốn kém so với phần thông tin cần lấy. **Gộp file** khi nhiều file lắt nhắt cùng một chủ đề. Tách/gộp xong phải cập nhật README của category.
- **Thêm category mới** (ví dụ `Ops/`) khi dự án có nhu cầu thật và các category hiện có không chứa nổi; cập nhật `README.md` gốc khi thêm.
- **File không phải markdown** (ảnh, xlsx, drawio…) để trong `material/` của category, và phải được tham chiếu từ ít nhất một file markdown kèm mô tả nó là gì. Không để file dữ liệu nằm lẫn với file md.
- Thư mục này chưa có khung? — tạo (README gốc + category cần thiết) ngay khi nhận tri thức spec đầu tiên, không hỏi lại.
- Gặp file/thư mục lệch quy ước (tên sai format, thiếu trong mục lục)? — đề xuất chỉnh lại, không lẳng lặng làm theo kiểu cũ.

## 2. Cách ĐỌC (tiết kiệm token)

1. Luôn bắt đầu từ `README.md` gốc để biết cần vào category nào.
2. Đọc `README.md` của category đó để chọn đúng file chi tiết.
3. Chỉ đọc file chi tiết cần thiết. **Không đọc toàn bộ cây tài liệu**, trừ khi được yêu cầu rà soát tổng thể.

Vì vậy chất lượng index là sống còn: mỗi README phải đủ để quyết định "cần đọc file nào" mà không phải mở từng file.

## 3. Cách GHI / cập nhật

1. Tự quyết vị trí lưu theo cơ cấu mục 1 (kèm kế hoạch trước khi sửa — quy tắc chung của repo).
2. **Sau khi sửa:** cập nhật README/mục lục của category và liên kết chéo liên quan. Đây là trách nhiệm của AI, không phải của người.
3. Khi chuyển đổi tài liệu nguồn (Docs/Sheet/Slide) vào đây: ngoài khai báo chỗ mờ (quy tắc chung), nếu bản gốc có flow/sơ đồ thì **vẽ lại bằng diagram-as-text** những gì đã hiểu để người dùng so với bản gốc bằng mắt (kiểm tra ngược).
4. Quyết định (ADR gọn) ghi vào file chủ đề liên quan (mục "Quyết định"); quyết định cắt ngang nhiều chủ đề → file riêng trong `SpecialTopics/`.

## 4. Sơ đồ

| Tình huống | Công cụ |
|---|---|
| Mặc định (sequence, state, ER, flow đơn giản) | **Mermaid** nhúng trong markdown |
| Cần UML chuẩn mà Mermaid không diễn đạt được (activity có swimlane, component, deployment) | **PlantUML** |
| Người dùng cần kiểm soát layout / bản vẽ tay | **drawio**, lưu `.drawio.svg` trong `material/`, kèm bản mô tả text do AI trích xuất |

Không tạo ảnh nhúng (png/jpg) cho nội dung spec. Ảnh chỉ dành cho tham khảo (whiteboard, mockup) và phải ghi rõ *"tham khảo, không phải spec"*.

## 5. Trạng thái tài liệu

Mỗi file spec có một dòng status ở đầu file:

```markdown
> Status: draft | agreed-internal | agreed-customer (YYYY-MM-DD)
```

- File mới do AI soạn → `draft`.
- **Không tự ý sửa nội dung file `agreed-customer`.** Khi được yêu cầu sửa, phải nhắc người dùng rằng đây là nội dung đã chốt với khách hàng và chờ xác nhận rõ ràng.
- Việc chuyển status là quyết định của con người (riêng `agreed-customer` chỉ SE nắm dự án được chuyển) — AI chỉ cập nhật dòng status khi được chỉ thị.

## 6. Định dạng markdown

- Mỗi file bắt đầu bằng heading cấp 1 (`#`), tự đứng được một mình khi đọc riêng.
- Heading dùng phân cấp nhất quán (`##`, `###`), không nhảy cấp.
- Khi cần deliverable hợp nhất (PDF/DOCX), dùng công cụ (pandoc…) ghép các file — không sửa tay bản xuất; markdown luôn là bản gốc.
