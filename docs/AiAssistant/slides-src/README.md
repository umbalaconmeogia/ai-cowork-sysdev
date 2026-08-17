# Nguồn sinh file AiAssistant-team-intro.pptx

Các file pptx trong `docs/AiAssistant/` là **sản phẩm sinh ra** từ script trong thư mục này — **không sửa trực tiếp file pptx**:

| File pptx | Script nguồn | Ghi chú |
|---|---|---|
| [`../AiAssistant-team-intro.pptx`](../AiAssistant-team-intro.pptx) | `gen_slides.js` | Bản gốc tiếng Việt |
| [`../AiAssistant-team-intro.ja.pptx`](../AiAssistant-team-intro.ja.pptx) | `gen_slides.ja.js` | Bản dịch tiếng Nhật (font Yu Gothic); cùng layout, chỉ khác nội dung chữ. **Khi sửa nội dung bản gốc, phải sửa tương ứng bản dịch** (hoặc hỏi người dùng có cần đồng bộ không) |

## Chỉ dẫn cho AI assistant

Khi được yêu cầu sửa / update file `AiAssistant-team-intro.pptx`:

1. Sửa `gen_slides.js` trong thư mục này (không tạo script mới ở scratchpad, không chỉnh XML bên trong pptx).
2. Chạy lại script để sinh file mới — output tự ghi đè vào `docs/AiAssistant/AiAssistant-team-intro.pptx` (script dùng đường dẫn tương đối so với vị trí của nó, chạy từ thư mục nào cũng được).
3. Kiểm tra kết quả render (chuyển PDF/ảnh xem lại các slide đã sửa) trước khi kết thúc.

Nội dung slide bám theo [`../AiAssistant.md`](../AiAssistant.md) — khi tài liệu gốc đổi đáng kể, cập nhật slide tương ứng.

## Cách chạy

Cần Node.js và các package (cài local, không commit `node_modules`):

```bash
npm install pptxgenjs react react-dom react-icons sharp
```

```bash
node gen_slides.js
```

Package `react`/`react-dom`/`react-icons`/`sharp` chỉ dùng để render icon thành PNG nhúng vào slide; `pptxgenjs` là thư viện sinh pptx chính.
