# AGENTS.md — Quy tắc cho `docs/SystemDesign/`

Toàn bộ quy tắc tổ chức, đọc và ghi tri thức thiết kế hệ thống — **tự đứng trọn vẹn**, áp dụng cho mọi thao tác trong thư mục này. File được kích hoạt từ adapter [AGENTS-SystemDesign.md](../../AGENTS-SystemDesign.md) ở root. (Quy ước nền tảng dành cho con người nằm ở repo quy ước gốc `ai-cowork-sysdev`: `docs/AiAssistant/AiAssistant.md`.)

## 1. Nguyên tắc nền

- **Repo là nhà duy nhất của tri thức spec.** Tri thức về yêu cầu / thiết kế chỉ được coi là tồn tại khi đã nằm trong thư mục này. Tài liệu bên ngoài (Google Docs/Sheet/Slide) là đầu vào nhất thời: đọc, rút tri thức, xong vai trò.
- **AI ghi — người kiểm soát.** AI quyết định lưu vào đâu theo cơ cấu dưới đây; con người review diff. Người dùng hiếm khi sửa tay tài liệu — nếu phát hiện dấu vết sửa tay làm lệch cơ cấu (mục lục thiếu, liên kết gãy), chủ động đề xuất chỉnh.
- **Ngôn ngữ:** tài liệu viết bằng **tiếng Việt**. Bản dịch (nếu có) đặt cùng thư mục, cùng tên, thêm hậu tố ngôn ngữ: `<name>.ja.md`, `<name>.en.md`. Bản tiếng Việt là bản gốc; khi sửa bản gốc phải đề nghị đồng bộ bản dịch.
- **Ngắn mà đúng thắng dài mà mượt.** Ưu tiên ghi quyết định + lý do + ràng buộc + câu hỏi chưa chốt. Không sinh văn xuôi đồ sộ kiểu tài liệu truyền thống; không lặp lại nội dung đã có ở file khác — liên kết tới đó.
- **Sự thật nằm ở text, sơ đồ là view.** Ngữ nghĩa chính xác giữ ở text có cấu trúc (bảng, danh sách bước, given-when-then); khi hai bên lệch nhau, text thắng — và AI phải giữ hai bên đồng bộ.

## 2. Cấu trúc thư mục

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

## 3. Cách ĐỌC (tiết kiệm token)

1. Luôn bắt đầu từ `README.md` gốc để biết cần vào category nào.
2. Đọc `README.md` của category đó để chọn đúng file chi tiết.
3. Chỉ đọc file chi tiết cần thiết. **Không đọc toàn bộ cây tài liệu**, trừ khi được yêu cầu rà soát tổng thể.

Vì vậy chất lượng index là sống còn: mỗi README phải đủ để quyết định "cần đọc file nào" mà không phải mở từng file.

## 4. Cách GHI / cập nhật

1. **Trước khi sửa, liệt kê kế hoạch:** "tôi định sửa các file này, vì lý do này" — để người dùng kiểm soát mà không phải đọc từng dòng. Sửa theo **diff nhỏ**, không regenerate cả file hay cả cụm.
2. **Tự quyết vị trí lưu** theo cơ cấu mục 2 khi được giao tri thức mới.
3. **Sau khi sửa:** cập nhật README/mục lục của category và liên kết chéo liên quan. Đây là trách nhiệm của AI, không phải của người.
4. **Changelog theo mốc, không theo lần sửa.** Chỉ thêm dòng lịch sử vào tài liệu khi thay đổi đáng kể về nội dung/quyết định (đổi quy tắc, thêm/bỏ mục lớn, hoàn tất phiên bản); chỉnh câu chữ lặt vặt không ghi — git đã lo phần đó.

## 5. Chuyển đổi tài liệu nguồn (Docs / Sheet / Slide → đây)

1. Chuyển thành markdown, tự quyết vị trí theo cơ cấu mục 2.
2. **Khai báo chỗ mờ — bắt buộc:** liệt kê riêng các điểm *không chắc / bản gốc mơ hồ / đã suy diễn*, thay vì lẳng lặng điền vào chỗ trống. Danh sách này là thứ người dùng đọc kỹ nhất.
3. Nếu bản gốc có flow/sơ đồ: **vẽ lại bằng diagram-as-text** những gì đã hiểu để người dùng so với bản gốc bằng mắt (kiểm tra ngược).

## 6. Quyết định (ADR gọn)

- Format: **Bối cảnh → Quyết định → Hậu quả** (vài dòng). Ghi vào file chủ đề liên quan (mục "Quyết định"); quyết định cắt ngang nhiều chủ đề → file riêng trong `SpecialTopics/`.
- Khi người dùng hỏi *"những gì ta đã chốt hôm nay mà docs chưa có?"* — rà lại hội thoại, trả lời đầy đủ kèm đề xuất ghi vào đâu.
- (Việc **chủ động đề nghị** ghi quyết định là hành vi luôn trực chiến, quy định ở adapter root.)

## 7. Sơ đồ

| Tình huống | Công cụ |
|---|---|
| Mặc định (sequence, state, ER, flow đơn giản) | **Mermaid** nhúng trong markdown |
| Cần UML chuẩn mà Mermaid không diễn đạt được (activity có swimlane, component, deployment) | **PlantUML** |
| Người dùng cần kiểm soát layout / bản vẽ tay | **drawio**, lưu `.drawio.svg` trong `material/`, kèm bản mô tả text do AI trích xuất |

Không tạo ảnh nhúng (png/jpg) cho nội dung spec. Ảnh chỉ dành cho tham khảo (whiteboard, mockup) và phải ghi rõ *"tham khảo, không phải spec"*.

## 8. Trạng thái tài liệu

Mỗi file spec có một dòng status ở đầu file:

```markdown
> Status: draft | agreed-internal | agreed-customer (YYYY-MM-DD)
```

- File mới do AI soạn → `draft`.
- **Không tự ý sửa nội dung file `agreed-customer`.** Khi được yêu cầu sửa, phải nhắc người dùng rằng đây là nội dung đã chốt với khách hàng và chờ xác nhận rõ ràng.
- Việc chuyển status là quyết định của con người (riêng `agreed-customer` chỉ SE nắm dự án được chuyển) — AI chỉ cập nhật dòng status khi được chỉ thị.

## 9. Định dạng markdown

- Mỗi file bắt đầu bằng heading cấp 1 (`#`), tự đứng được một mình khi đọc riêng.
- Heading dùng phân cấp nhất quán (`##`, `###`), không nhảy cấp.
- Khi cần deliverable hợp nhất (PDF/DOCX), dùng công cụ (pandoc…) ghép các file — không sửa tay bản xuất; markdown luôn là bản gốc.
