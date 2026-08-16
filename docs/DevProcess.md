# Kế hoạch quy trình phát triển (mức cao)

Tài liệu **sống**: ghi khung tổng thể trước; chi tiết (ticket, review, tài liệu, công cụ, AI…) bổ sung dần khi áp dụng thực tế.

**Phạm vi dự kiến:** team nhỏ (khoảng 3–10 người); sản phẩm web và app mobile; chủ yếu hệ thống nghiệp vụ, thỉnh thoảng bán hàng hoặc dự án đặc thù (ví dụ crawl, tích hợp dữ liệu).

---

## Hai kiểu phát triển

| Kiểu | Khi nào | Cách làm (mức cao) |
|------|---------|---------------------|
| **A. Mặc định** | Trừ khi dự án **chỉ rõ** làm theo Scrum (hoặc framework tương tự) | **Đầu vào dự án:** cố gắng có **thiết kế tổng thể** (kiến trúc, ranh giới chính, luồng nghiệp vụ lớn…) càng sớm càng tốt — không chờ “đến lúc cần mới thiết kế”. Càng có bản tổng thể sớm thì càng có **thời gian và cơ hội** để nhìn lại, chỉnh sửa trước và trong khi triển khai. **Sau đó:** triển khai **theo từng giai đoạn** (mảnh tính năng, nhịp release…) trên nền thiết kế đó. |
| **B. Scrum / chỉ định** | Dự án ghi rõ áp dụng Scrum… | Theo quy ước đã thống nhất cho dự án đó (sprint, backlog…); không ép vào hàng A trừ khi team quyết định chồng thêm. |

---

## Nguyên tắc ngắn

- Với kiểu **A:** **thiết kế tổng thể trước, làm theo giai đoạn sau**; chi tiết từng phần vẫn có thể tinh chỉnh khi đi sâu từng mảnh.
- **Từng mảnh / từng giai đoạn triển khai** vẫn đi qua cùng một **dãy bước logic** (hiểu → mô tả → thiết kế chi tiết phần đang làm → build → kiểm tra → release…); nhiều mảnh có thể **song song** theo thời gian.
- **Kiểm thử hồi quy (regression)** giữ vai trò **quan trọng** trong toàn quy trình (xem mục dưới).
- Có chỗ ghi **việc tiếp theo** (cuối file) để không quên hướng mở rộng.

---

## Kiểm thử hồi quy và đổi spec / thiết kế

- **Hồi quy:** đảm bảo thay đổi mới **không làm hỏng** hành vi đã ổn định; càng có bộ kiểm tra hồi quy tin cậy thì càng dễ **dám chỉnh spec hoặc thiết kế** khi phát hiện sai sót hoặc cơ hội cải tiến.
- **AI:** có thể giúp **giảm chi phí** soạn và **chạy** test (tự động hoặc kịch bản lặp lại), nên đầu tư vào lớp kiểm tra này **đáng** hơn so với team chỉ có người và ít thời gian test thủ công.
- **Lưu ý:** test **xanh** không luôn đồng nghĩa **đúng kỳ vọng nghiệp vụ** — nên giữ ít nhất **vài kiểm thử thủ công theo kịch bản quan trọng** hoặc thỉnh thoảng **kiểm tra xem sửa cố ý có làm test đỏ không** (tránh ảo tưởng an toàn).
- Chi tiết (phạm vi test, CI, ngưỡng bắt buộc trước merge theo loại release…) bổ sung dần.

---

## Cân bằng: thiết kế tổng thể, kiểm chứng, và rủi ro

- **Thiết kế sớm là giả thuyết** cho đến khi có phản hồi thực (tích hợp, người dùng, hiệu năng). Tránh biến bản tổng thể thành “bất khả xâm phạm” — nhịp **nhìn lại / chỉnh** (định kỳ hoặc theo mốc) quan trọng không kém viết tài liệu.
- **Lát cắt mỏng (thin slice)** khi phù hợp: một luồng nhỏ **đi xuyên** (ví dụ UI → API → dữ liệu) sớm để **kiểm chứng khung** thiết kế, không thay thế thiết kế tổng thể nhưng giảm rủi ro “chỉ đúng trên giấy”.
- **Độ sâu thiết kế tỷ lệ với độ khó đảo ngược:** phần dễ đổi → ghi nhẹ; phần **đắt để đổi** (hợp đồng API, schema dùng chung, phân quyền, tiền/số liệu) → chốt sớm và **review người** kỹ hơn — kể cả khi tài liệu do AI soạn.
- **Ghi quyết định kiến trúc gọn (ví dụ ADR):** vài dòng *bối cảnh → quyết định → hậu quả* cho mỗi lựa chọn khó đổi; nhẹ hơn bản thiết kế dài nhưng giúp sau này biết *vì sao* chọn vậy.
- **Spike / thử kỹ thuật:** nên có **ngân sách thời gian** rõ (crawl, cổng thanh toán, tích hợp lạ…) để không kẹt mãi ở thử mà không quay lại nhịp giai đoạn chính thức.

---

## Các giai đoạn (một mảnh công việc)

1. **Hiểu vấn đề** — Nắm nhu cầu, phạm vi, ràng buộc; quyết định phần nào làm ngay / để sau.
2. **Mô tả cần làm** — Diễn đạt hành vi mong muốn ở mức team có thể bàn và kiểm chứng được.
3. **Thiết kế** — Chọn hướng kỹ thuật và kiến trúc phù hợp quy mô (gồm chỗ các bộ phận/web/app chạm nhau, nếu có).
4. **Xây dựng** — Code, cấu hình, migration… theo thiết kế đã thống nhất.
5. **Kiểm tra** — Xác nhận đúng yêu cầu mới và **không phá vỡ phần đã có** (kiểm thử hồi quy / regression theo mức độ rủi ro).
6. **Đưa lên môi trường thật** — Triển khai, vận hành, theo dõi sau release.
7. **Vận hành & cải tiến** — Sửa lỗi, tối ưu, tiếp nhận phản hồi; khi đổi yêu cầu thì quay lại các bước phù hợp phía trên.

Một số việc (thử ý tưởng kỹ thuật, spike) có thể **chỉ đi qua vài bước đầu** rồi dừng để quyết định có làm tiếp chuỗi đầy đủ hay không.

---

## Việc sẽ làm chi tiết sau

- Quy ước ticket / trạng thái (ví dụ Redmine): khi nào tạo, dev, test, review, đóng.
- Mức tài liệu cần cho từng giai đoạn (nếu dùng RD/BD/DD hoặc tên gọi khác).
- Chỗ nào trong quy trình **ưu tiên nhờ AI** và cách kiểm tra kết quả.
- Checklist riêng cho loại dự án (nghiệp vụ / bán hàng / batch–crawl…).
- Ngưỡng regression / bộ test **bắt buộc** khác nhau theo loại thay đổi (hotfix vs release lớn).
- Mẫu ADR hoặc quy ước ghi quyết định kiến trúc ngắn.

---

## Lịch sử chỉnh sửa

| Ngày | Thay đổi |
|------|----------|
| 2026-04-03 | Khởi tạo bản mức cao; thu gọn còn khung giai đoạn và việc mở rộng sau |
| 2026-04-03 | Thêm hai kiểu phát triển (mặc định: thiết kế tổng thể trước, làm theo giai đoạn sau; Scrum khi chỉ định); nhấn mạnh kiểm thử hồi quy và AI |
| 2026-04-03 | Bổ sung: cân bằng thiết kế sớm vs kiểm chứng; thin slice; ADR; spike có giới hạn thời gian; rủi ro test xanh sai kỳ vọng; backlog chi tiết (ngưỡng regression, ADR) |
                        