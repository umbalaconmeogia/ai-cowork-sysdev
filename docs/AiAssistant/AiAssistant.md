# Sử dụng AI hỗ trợ công việc thiết kế hệ thống của SE / Bridge SE

Tài liệu **sống**: bản đầy đủ (định nghĩa vấn đề, nguyên tắc, quy ước vận hành). Bản rút gọn một trang để phổ biến nhanh sẽ được tạo sau, trích từ tài liệu này.

---

## 1. Mục đích và phạm vi

Đưa ra **một cách làm việc với AI đủ đơn giản để hiểu và áp dụng ngay** cho công việc định hình specification của hệ thống (từ requirement đến basic design). Đây **không phải** một quy trình phát triển phần mềm hoàn chỉnh — nhưng được thiết kế đủ hợp lý để về sau trở thành một phần của quy trình chung của team (xem [DevProcess.md](DevProcess.md)).

**Phạm vi giai đoạn:** hiểu vấn đề → mô tả yêu cầu → thiết kế cơ bản. Các giai đoạn sau (thiết kế chi tiết, coding, test) không nằm trong phạm vi tài liệu này, dù tài liệu do giai đoạn này sinh ra chính là đầu vào cho chúng.

---

## 2. Đối tượng

**Đối tượng chính:** SE / Bridge SE **giữ vai trò nắm dự án**. Trong mô hình của công ty, mỗi dự án luôn có một SE/BridgeSE là người:

- Tham gia các cuộc họp với khách hàng / super SE / leader.
- Thường là người cùng tạo tài liệu với các đối tượng đó (trên Google Docs/Spreadsheet).
- Do đó là người **chịu trách nhiệm chuyển giao tri thức** từ tầng làm việc cấp cao xuống cho dev team / SE khác / AI.

Tài liệu này viết cho người đó. Các thành viên khác (dev, SE khác) cũng nên theo các quy ước ở đây, nhưng trách nhiệm vận hành cốt lõi thuộc về SE nắm dự án.

---

## 3. Định nghĩa vấn đề

### 3.1. Cách dùng AI phân tán, mỗi người một kiểu

Mỗi người dùng AI theo kinh nghiệm và sự học hỏi riêng. Có chia sẻ nội bộ, nhưng không phải ai cũng tham dự, và nghe người khác nói không đồng nghĩa với hiểu (nếu không tự làm). Hệ quả: chất lượng và cách khai thác AI không đồng đều, tri thức về "cách làm hiệu quả" không tích lũy được thành tài sản chung.

### 3.2. Tri thức spec bị rơi rụng hoặc truyền đạt thiếu sót giữa hai tầng làm việc

Thực tế tồn tại **hai tầng làm việc** với hai môi trường khác nhau:

| Tầng | Ai | Làm việc ở đâu |
|------|----|----|
| Cấp cao | Khách hàng, super SE, leader, SE nắm dự án | Google Docs / Spreadsheet / Slide (do thói quen và do đối tượng làm việc cùng) |
| Triển khai | Dev team, SE khác, AI assistant | IDE (VSCode/Cursor), file text trong repo |

Tri thức quan trọng về spec/requirement sinh ra ở tầng cấp cao có thể:

1. **Rơi rụng** — việc ghi chép đòi hỏi SE phải nghĩ "lưu vào đâu, lưu thế nào", chi phí suy nghĩ đó khiến người ta ghi ít đi.
2. **Truyền đạt thiếu sót** — nội dung nằm trên Google Drive không đến được (hoặc đến không đầy đủ) với team dev và AI, dẫn đến làm việc trên thông tin thiếu.

---

## 4. Triết lý nền tảng

Bốn nguyên tắc, theo thứ tự ưu tiên:

1. **Quy tắc phải đủ đơn giản để con người nhớ và áp dụng.** Quy trình chết vì quá nặng, không phải vì thiếu chi tiết. Vì vậy tài liệu này tách bạch: **quy tắc cho con người** (ít, phải thuộc — mục 6) và **quy tắc cho AI** (nhiều, nằm trong instruction file của repo, AI thi hành, con người không cần nhớ — mục 8).

2. **Xem trọng AI assistant — đẩy tối đa cho AI, nhưng không phụ thuộc.** "Đẩy tối đa" nghĩa là: con người có ý thức đẩy cho AI những việc AI làm tốt, **đừng ôm vào mình**, để dành năng lượng cho những việc con người đáng làm. Với SE, việc đáng làm là: **ra quyết định, đàm phán với khách hàng, và thẩm định những gì AI viết ra** — ba việc AI không thay được. Đây là phân công lao động, không phải phụ thuộc.

3. **Tài liệu là AI-first, nhưng con người kiểm soát được.** Mọi tri thức quy về dạng text/markdown để AI nắm bắt trọn vẹn; đồng thời con người vẫn đọc và review được. Sơ đồ ưu tiên dạng diagram-as-text (Mermaid/PlantUML/drawio) thay vì ảnh nhúng.

4. **Repo là nhà duy nhất của tri thức.** Tri thức được lưu trong thư mục `docs/` của repository (cùng repo với source nếu hệ thống nhỏ; repo docs riêng nếu hệ thống gồm nhiều repo/subsystem). Con người bàn luận, truyền đạt tri thức với AI; **AI quyết định lưu vào đâu, như thế nào** theo cơ cấu đã định; con người chỉ kiểm soát kết quả.

---

## 5. Mô hình hai tầng tài liệu

Không chống lại thực tế: **chấp nhận** tài liệu làm việc cấp cao được tạo và lưu trên Google Drive. Nhưng phân định rõ vai trò:

| | Google Drive (Docs/Sheet/Slide) | Repo (`docs/`, markdown) |
|---|---|---|
| Vai trò | **Bề mặt giao tiếp/đàm phán** với khách hàng và cấp cao | **Source of truth duy nhất** của team |
| Tính chất | Đầu vào **nhất thời** (ephemeral input): đọc xong, rút tri thức, xong vai trò | Tri thức **sống**, được AI và mọi thành viên truy cập, cập nhật |
| Ai duy trì | Khách hàng / leader / SE theo thói quen của họ | AI ghi, SE kiểm soát |
| Cách tạo / sửa | **SE tự tay là chính**; thi thoảng nhờ AI khi có lợi | **Bàn luận với AI** rồi yêu cầu AI update; SE hiếm khi sửa tay |

**Ai cầm bút ở mỗi tầng** (nhấn mạnh cho SE nắm dự án):

- **File làm việc với khách hàng (Drive):** SE tự tạo, tự update bằng tay là chính — đó là bề mặt làm việc trực tiếp với khách. Vẫn nên nhờ AI khi có lợi: ví dụ cần thêm một bảng thật lớn liệt kê danh sách màn hình vào spreadsheet, có thể nhờ AI sinh file xlsx rồi nhúng vào, hoặc cấp quyền cho AI sửa trực tiếp file. Dù ai tạo, sản phẩm ở tầng này vẫn là đầu vào nhất thời — nghi thức chuyển đổi vào repo (mục 7.1) không thay đổi.
- **File trên repo:** SE có thể tự sửa, nhưng **hiếm khi nên làm vậy**. Cách làm mặc định: bàn luận với AI, cung cấp thông tin cần thiết, rồi chốt bằng yêu cầu *"hãy update nội dung vào các tài liệu cần thiết"* — AI tìm đúng chỗ theo cơ cấu docs, sửa, cập nhật mục lục/liên kết chéo; SE review diff. Lý do không chỉ là tiết kiệm công: sửa tay **đi vòng qua phần bookkeeping của AI** (mục lục, liên kết, vị trí lưu) khiến cơ cấu tài liệu lặng lẽ lệch đi. Sửa tay vài chữ nhỏ vẫn hợp lệ — đây là mặc định, không phải lệnh cấm.

**Ngôn ngữ:** tài liệu trong repo viết bằng **tiếng Việt**. (Bản dịch sang ngôn ngữ khác, nếu cần, sẽ có quy ước riêng sau.)

**Điểm mấu chốt — chuyển đổi theo sự kiện, không theo tài liệu:** đơn vị được đưa vào repo không phải "bản sao của file Docs X" mà là "**nội dung đã bàn / đã chốt trong buổi làm việc Y**". Nhờ đó không cần cơ chế theo dõi thay đổi trên Drive (thứ thực tế không ai duy trì nổi): nếu file Docs được sửa tiếp, lần sửa đó gắn với một buổi làm việc / quyết định mới, và sự kiện mới đó kích hoạt một lần chuyển đổi mới.

---

## 6. Quy tắc cho con người (phải thuộc)

Năm quy tắc. Đây là toàn bộ những gì một người cần nhớ:

1. **Repo là nhà duy nhất của tri thức spec.** Thứ không nằm trong `docs/` thì coi như team và AI không biết.

2. **Chuyển đổi ngay theo sự kiện.** Sau mỗi buổi họp / mỗi quyết định với khách hàng hoặc cấp cao, SE nắm dự án dành 10–15 phút cùng AI "tiêu hóa" nội dung đó vào repo. Không dồn, không để sang tuần.

3. **Bàn xong phải ghi — chưa ghi là chưa xong.** Cuộc nói chuyện với AI (hay với người) nếu điểm quan trọng không được lưu ra tài liệu thì sẽ mất. Kết thúc mỗi phiên làm việc với AI bằng một câu hỏi cố định: *"Những gì ta đã chốt hôm nay mà docs chưa có?"*

4. **Review theo độ khó đảo ngược.** AI viết, người thẩm định. Phần đã thỏa thuận với khách hàng (interface, phạm vi, số liệu, tiền) → review từng chữ. Phần diễn giải nội bộ, dễ sửa → review nhẹ. (Cùng nguyên tắc với [DevProcess.md](DevProcess.md): độ sâu thiết kế/review tỷ lệ với độ khó đảo ngược.)

5. **Đẩy cho AI việc AI làm tốt.** Soạn thảo, chuyển đổi định dạng, vẽ sơ đồ, tìm chỗ cần cập nhật, giữ nhất quán cơ cấu tài liệu — là việc của AI. Ra quyết định, đàm phán, thẩm định — là việc của người.

---

## 7. Quy ước vận hành chi tiết

### 7.1. Nghi thức chuyển đổi Drive → repo

Người thực hiện: SE nắm dự án (người đã dự họp / cùng tạo tài liệu). Các bước:

1. **Đưa nguyên liệu cho AI:** file Docs/Sheet/Slide (hoặc export), kèm bối cảnh — "đây là kết quả buổi họp ngày X về chủ đề Y".
2. **AI chuyển đổi** thành markdown theo cơ cấu docs (AI tự quyết vị trí — mục 8).
3. **SE kiểm soát chất lượng chuyển đổi ngay lập tức** — vì bản gốc có thể là slide hoặc Excel vẽ flow một cách tùy hứng, rất dễ bị AI hiểu sai. Hai kỹ thuật kiểm tra (thay vì đọc-đối-chiếu thủ công, việc con người làm rất tệ):
   - **Kiểm tra ngược bằng hình:** yêu cầu AI **vẽ lại** những gì nó hiểu (Mermaid/drawio) và đặt cạnh bản gốc. So hai sơ đồ bằng mắt nhanh và chính xác hơn nhiều so với đọc văn xuôi đối chiếu với hình. Lệch là thấy ngay.
   - **Đọc kỹ danh sách chỗ mờ:** AI được quy định (mục 8) phải liệt kê riêng "điểm tôi không chắc / bản gốc mơ hồ / tôi đã suy diễn". Danh sách này thường ngắn, và là thứ SE cần đọc kỹ nhất.
4. **Chốt:** SE xác nhận, cập nhật trạng thái tài liệu (mục 7.3), commit.

### 7.2. Hình ảnh và sơ đồ

- **Ưu tiên diagram-as-text hơn ảnh nhúng.** Ảnh trong repo là tri thức chết: không diff được, AI không sửa được khi spec đổi, sẽ lặng lẽ outdate. Sơ đồ dạng text (Mermaid nhúng trong markdown, PlantUML) là tri thức sống.
- **Chọn công cụ vẽ theo ba bậc** (lưu ý: Mermaid không vẽ được một số UML chuẩn — ví dụ activity diagram có swimlane/fork-join — nên không ép mọi thứ vào Mermaid):

  | Tình huống | Công cụ |
  |---|---|
  | Mặc định (~80% nhu cầu): sequence, state, ER, flow đơn giản | **Mermaid** — render native trong GitHub / VSCode, không cần toolchain |
  | Cần UML chuẩn mà Mermaid không diễn đạt được (activity diagram có swimlane, component, deployment) | **PlantUML** — vẫn là diagram-as-text, AI viết thạo; chấp nhận cài extension / server để render |
  | Cần kiểm soát layout, sơ đồ vẽ tay của SE, hoặc hướng tới deliverable cho khách | **drawio** — lưu dạng `.drawio.svg` (ảnh SVG có nhúng source: vừa hiển thị trong markdown, vừa mở lại bằng drawio sửa tiếp được); luôn kèm bản mô tả text do AI trích xuất |

- **Sự thật nằm ở text, sơ đồ là view.** Ngữ nghĩa chính xác của spec giữ ở text có cấu trúc (bảng, danh sách bước kèm người thực hiện, given-when-then…); sơ đồ để con người nắm nhanh. Khi sơ đồ và text lệch nhau — **text thắng**, và AI có trách nhiệm giữ hai bên đồng bộ. Nhờ tách vai này, giới hạn UML của Mermaid không còn nghiêm trọng: UML chuẩn chỉ bắt buộc khi khách hàng yêu cầu trong deliverable (ngoài phạm vi — xem mục 10).
- Với hình trong tài liệu gốc: dùng AI **tái tạo** thành sơ đồ dễ hiểu hơn từ bản gốc (UML nhúng markdown, drawio; với UI có thể dùng công cụ như Google Stitch để chuyển thành prototype). Ảnh gốc giữ lại làm tham chiếu **cho đến khi** bản tái tạo được SE xác nhận; sau đó bản text là chính.
- Những gì không đáng công tái tạo (ảnh whiteboard chụp một lần, mockup tham khảo) được phép sống dạng ảnh, nhưng phải ghi chú rõ: *tham khảo, không phải spec*.
- AI hiện đọc tài liệu có hình khá tốt, nên hình ảnh không phải vấn đề cốt tử — nhưng quy tắc trên vẫn giữ để tài liệu **cập nhật được** về lâu dài.

### 7.3. Trạng thái tài liệu

Với Bridge SE, khác biệt giữa *nháp*, *team đã thống nhất*, và *khách hàng đã đồng ý* là sống còn — loại thứ ba có tính ràng buộc gần như hợp đồng. Git version hóa nội dung nhưng không nói lên trạng thái thỏa thuận. Quy ước: **một dòng status ở đầu mỗi file spec**:

```markdown
> Status: draft | agreed-internal | agreed-customer (YYYY-MM-DD)
```

- `draft` — AI soạn hoặc đang bàn, chưa ràng buộc.
- `agreed-internal` — team đã thống nhất.
- `agreed-customer` — đã chốt với khách hàng (ghi ngày). Sửa nội dung ở trạng thái này đồng nghĩa với thương lượng lại — review từng chữ.

Chỉ **SE nắm dự án** được quyền chuyển status sang `agreed-customer` (vì đó là người trực tiếp làm việc và chốt với khách hàng). Nhờ dòng status, team dev phân biệt được spec ràng buộc với brainstorm.

### 7.4. Giữ lại tri thức từ các phiên làm việc với AI

- Nội dung quan trọng hình thành trong hội thoại **phải được ghi ra docs trước khi kết thúc phiên** (quy tắc 3, mục 6).
- Việc "nhớ ra cái gì quan trọng" cũng được đẩy một phần cho AI: instruction file (mục 8) quy định AI **chủ động đề nghị ghi lại** khi thấy một quyết định hình thành trong hội thoại ("điểm A, B vừa chốt chưa nằm trong docs, tôi ghi vào X nhé?").
- Ưu tiên ghi **quyết định + bối cảnh + lý do** (dạng ADR gọn — vài dòng *bối cảnh → quyết định → hậu quả*), **câu hỏi chưa chốt**, và **ràng buộc từ khách hàng** — hơn là tái tạo bộ tài liệu truyền thống đồ sộ. Ở giai đoạn requirement/basic design, thứ khan hiếm là quyết định và lý do của nó, không phải chữ. **Ngắn mà đúng thắng dài mà mượt.**
- **ADR là gì:** Architecture Decision Record — bản ghi quyết định, mỗi bản chỉ vài dòng cho **một quyết định khó đảo ngược**, gồm: *bối cảnh* (tình huống, ràng buộc lúc đó), *quyết định* (chọn phương án nào), *hậu quả* (được gì, mất gì, trade-off chấp nhận). Giá trị của nó là trả lời câu hỏi "vì sao hồi đó chọn thế này?" — thứ không ai nhớ sau vài tháng, và là thứ tài liệu thiết kế truyền thống thường bỏ qua (ghi *cái gì* nhưng không ghi *vì sao*). Với AI còn thêm một giá trị: khi AI đề xuất thay đổi, nó đọc được lý do cũ và biết ràng buộc nào vẫn còn hiệu lực. Trong tài liệu này, ADR dùng theo **nghĩa rộng**: không chỉ quyết định kiến trúc mà cả quyết định về spec với khách hàng (ví dụ: "khách chốt bỏ tính năng Y vì ngân sách").

### 7.5. Bảo mật

Khi đưa tài liệu của khách hàng vào AI tool, chỉ dùng **AI tool được công ty phê duyệt** theo quy định hiện hành về sử dụng AI (tài liệu này không lặp lại nội dung quy định đó — tham chiếu quy định của công ty). Với dự án có ràng buộc NDA đặc thù, SE nắm dự án xác nhận trước khi áp dụng quy trình chuyển đổi ở mục 7.1.

---

## 8. Quy tắc cho AI (nằm trong instruction file của repo)

Toàn bộ độ phức tạp về cơ cấu tài liệu được dồn vào đây, để con người không phải nhớ. Các quy tắc này được viết vào instruction file của repo, với quy ước chuẩn hóa:

- **`AGENTS.md` là file gốc** — chuẩn mở, trung lập về công cụ, được nhiều AI tool đọc trực tiếp.
- File riêng của từng tool (`CLAUDE.md` cho Claude Code, rule file của Cursor…) **chỉ là file trỏ đến / include `AGENTS.md`**, không chứa nội dung riêng.
- Lý do chọn chuẩn trung lập: team đang trong quá trình chuyển đổi công cụ (Cursor → Claude Code) và có thể còn đổi tiếp; nội dung quy tắc phải sống lâu hơn lựa chọn công cụ.

Nhờ nằm trong repo, **ai mở repo bằng AI assistant nào cũng bị đưa vào cùng một nề nếp** — không phụ thuộc người đó có dự buổi chia sẻ hay không. Đây chính là lời giải cho vấn đề 3.1.

Nội dung chính của instruction file:

1. **Cơ cấu thư mục `docs/`** — cấu trúc modular: mỗi tài liệu lớn một thư mục, mỗi file một chủ đề, `README.md` làm entry point + mục lục có link, file đánh số thứ tự (`01-`, `02-`…), mỗi file bắt đầu bằng heading cấp 1. (Chi tiết: [sample/DesignDocument.md](sample/DesignDocument.md).)
2. **AI tự quyết vị trí lưu** theo cơ cấu trên khi được giao tri thức mới; tự cập nhật mục lục/index; tự duy trì liên kết chéo giữa các tài liệu liên quan.
3. **Trước khi sửa, liệt kê kế hoạch:** "tôi định sửa các file này, vì lý do này" — để người review kiểm soát mà không phải đọc từng dòng. Sửa theo **diff nhỏ**, không regenerate cả cụm tài liệu.
4. **Khi chuyển đổi tài liệu nguồn (Docs/Sheet/Slide), phải khai báo chỗ mờ:** liệt kê riêng các điểm không chắc / mơ hồ / đã suy diễn, thay vì lẳng lặng điền vào chỗ trống.
5. **Chủ động đề nghị ghi lại quyết định** khi thấy quyết định hình thành trong hội thoại.
6. **Sơ đồ bằng diagram-as-text** (Mermaid ưu tiên); không tạo ảnh nhúng cho nội dung spec.
7. **Tôn trọng dòng status** (mục 7.3): file `agreed-customer` không được sửa nội dung nếu không có chỉ thị rõ ràng của con người; khi sửa phải nhắc người dùng rằng đây là nội dung đã chốt với khách hàng.
8. **Ghi changelog gọn** ở cuối file khi cập nhật, để người review liếc qua là biết vừa thay đổi gì — nhưng **theo mốc quan trọng, không phải theo từng lần sửa**. Lịch sử/changelog trong tài liệu là bản ghi đánh dấu thay đổi đáng kể về nội dung hoặc quyết định (đổi một quy tắc, thêm/bỏ một mục lớn, hoàn tất một phiên bản); log chi tiết từng thay đổi đã có git đảm nhiệm — ghi cả hai nơi là thừa. AI không tự thêm dòng lịch sử cho các chỉnh sửa nhỏ (câu chữ, bổ sung lặt vặt).

*(Instruction file mẫu cụ thể sẽ được soạn riêng — xem mục 10.)*

---

## 9. Rủi ro cần ý thức và cách phòng

| Rủi ro | Biểu hiện | Phòng ngừa |
|--------|-----------|------------|
| **Review hình thức** — AI viết trôi chảy, người đọc lướt rồi gật | Spec lệch một chút so với ý khách hàng nhưng trông rất hợp lý, trở thành chính thức | Kiểm tra ngược bằng hình; đọc kỹ danh sách chỗ mờ; review từng chữ với nội dung `agreed-customer` (7.1, 7.3) |
| **Kho tài liệu "trông chuẩn nhưng sai ngầm"** | Nguy hiểm hơn ghi chép rời rạc vì tạo được lòng tin | Diff nhỏ + changelog + AI khai báo suy diễn; thỉnh thoảng yêu cầu AI tự rà mâu thuẫn giữa tài liệu mới và nguyên tắc gốc |
| **Tài liệu phình chữ, không thêm đúng** | AI sản xuất chữ giỏi; vài quyết định quan trọng bị chôn trong văn mẫu | Thiên vị ghi quyết định/lý do/ràng buộc thay vì văn xuôi đầy đủ (7.4) |
| **Drift giữa Drive và repo** | File Docs được sửa tiếp sau lần chuyển đổi, không ai biết | Chuyển đổi theo **sự kiện**, coi file Drive là đầu vào nhất thời (mục 5) |
| **Quy ước chết vì không có thời điểm áp dụng** | Ai cũng hiểu nhưng không ai làm | Mọi quy tắc đều gắn với thời điểm cụ thể: sau buổi họp, cuối phiên làm việc, trước khi commit |

---

## 10. Việc sẽ làm tiếp

- Soạn **bản rút gọn một trang** cho con người (từ mục 6) để phổ biến nhanh trong team.
- Soạn **instruction file mẫu** (`AGENTS.md`, từ mục 8) đặt được ngay vào repo dự án.
- **Chiều ngược repo → deliverable cho khách hàng** (ngoài phạm vi tài liệu này): hướng cơ bản đã định — AI sinh markdown, người duyệt và yêu cầu sửa, rồi convert sang docx/định dạng khách yêu cầu; sẽ quy ước chi tiết sau.
- **Quy ước bản dịch** cho tài liệu repo khi cần ngôn ngữ khác (dự kiến: cùng thư mục, cùng tên, thêm hậu tố ngôn ngữ, ví dụ `basic-design.en.md`).
- Template cụ thể: file spec (kèm dòng status), bản ghi quyết định (ADR gọn), mẫu "danh sách chỗ mờ" khi chuyển đổi.
- Thử áp dụng vào một dự án thật, ghi nhận lại chỗ vướng, cập nhật tài liệu này.
- Về sau: tích hợp thành một phần của quy trình chung ([DevProcess.md](DevProcess.md), mục "Chỗ nào trong quy trình ưu tiên nhờ AI").

---

## Lịch sử chỉnh sửa

Chỉ ghi **mốc thay đổi quan trọng** của tài liệu (đổi quy tắc, thêm/bỏ mục lớn, hoàn tất phiên bản) — không ghi mọi lần sửa file; log chi tiết đã có git.

| Ngày | Thay đổi |
|------|----------|
| 2026-08-17 | Khởi tạo bản đầy đủ: định nghĩa vấn đề, đối tượng (SE nắm dự án), triết lý, mô hình hai tầng tài liệu, quy tắc cho người / cho AI, quy ước vận hành (chuyển đổi theo sự kiện, kiểm tra ngược, status, ADR gọn), rủi ro |
