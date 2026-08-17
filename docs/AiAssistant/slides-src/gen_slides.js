const path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");

// ---- palette ----
const NAVY = "1E2761";
const NAVY2 = "27336F"; // slightly lighter navy for cards on dark bg
const ICE = "CADCFC";
const ICE_BG = "EEF3FB";
const MINT = "02C39A";
const WHITE = "FFFFFF";
const INK = "22263B";
const MUTED = "5A6178";

const HEAD = "Cambria";
const BODY = "Calibri";
const MONO = "Courier New";

async function iconData(Icon, colorHex, px = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Icon, { color: "#" + colorHex, size: px })
  );
  const buf = await sharp(Buffer.from(svg), { density: 300 })
    .resize(px, px, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

function shadow() {
  return { type: "outer", color: "1E2761", opacity: 0.22, blur: 7, offset: 2, angle: 90 };
}

(async () => {
  // pre-render icons
  const ic = {};
  const defs = {
    users_w: [fa.FaUserFriends, WHITE],
    layers_w: [fa.FaLayerGroup, WHITE],
    check_w: [fa.FaRegCheckCircle, WHITE],
    robot_w: [fa.FaRobot, WHITE],
    md_w: [fa.FaMarkdown, WHITE],
    home_w: [fa.FaHome, WHITE],
    drive_n: [fa.FaGoogleDrive, NAVY],
    git_w: [fa.FaGitAlt, WHITE],
    eye_n: [fa.FaEye, NAVY],
    quest_n: [fa.FaRegQuestionCircle, NAVY],
    shield_n: [fa.FaShieldAlt, NAVY],
    clip_w: [fa.FaClipboardList, WHITE],
    diagram_w: [fa.FaProjectDiagram, WHITE],
    glasses_w: [fa.FaGlasses, WHITE],
    masks_w: [fa.FaTheaterMasks, WHITE],
    align_w: [fa.FaAlignLeft, WHITE],
    clock_w: [fa.FaRegClock, WHITE],
  };
  for (const [k, [I, c]] of Object.entries(defs)) ic[k] = await iconData(I, c);

  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
  const W = 13.33;

  // helpers -----------------------------------------------------------
  function titleBar(s, text, opts = {}) {
    const color = opts.dark ? WHITE : NAVY;
    if (opts.kicker) {
      s.addText(opts.kicker, {
        x: 0.62, y: 0.38, w: 12, h: 0.32, fontFace: BODY, fontSize: 12, bold: true,
        color: MINT, charSpacing: 3, margin: 0,
      });
    }
    s.addText(text, {
      x: 0.6, y: opts.kicker ? 0.68 : 0.45, w: 12.1, h: 0.75, fontFace: HEAD,
      fontSize: 30, bold: true, color, margin: 0,
    });
    if (opts.sub) {
      s.addText(opts.sub, {
        x: 0.62, y: opts.kicker ? 1.4 : 1.18, w: 12, h: 0.4, fontFace: BODY,
        fontSize: 14, italic: true, color: opts.dark ? ICE : MUTED, margin: 0,
      });
    }
  }

  function card(s, x, y, w, h, fill = ICE_BG) {
    s.addShape("roundRect", {
      x, y, w, h, fill: { color: fill }, rectRadius: 0.09, line: { type: "none" },
      shadow: shadow(),
    });
  }

  function iconCircle(s, x, y, iconKey, d = 0.62, circleColor = NAVY) {
    s.addShape("ellipse", { x, y, w: d, h: d, fill: { color: circleColor }, line: { type: "none" } });
    const pad = d * 0.26;
    s.addImage({ data: ic[iconKey], x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad });
  }

  function numCircle(s, x, y, n, d = 0.52, fill = MINT, txt = NAVY) {
    s.addShape("ellipse", { x, y, w: d, h: d, fill: { color: fill }, line: { type: "none" } });
    s.addText(String(n), {
      x, y: y - 0.02, w: d, h: d, align: "center", valign: "middle",
      fontFace: HEAD, fontSize: 18, bold: true, color: txt, margin: 0,
    });
  }

  function bullets(s, items, x, y, w, h, opt = {}) {
    const arr = items.map((t, i) => ({
      text: t,
      options: {
        bullet: { code: "2013", indent: 12 },
        breakLine: true,
        paraSpaceAfter: opt.gap == null ? 8 : opt.gap,
      },
    }));
    s.addText(arr, {
      x, y, w, h, fontFace: BODY, fontSize: opt.size || 14, color: opt.color || INK,
      valign: "top", margin: 0, lineSpacingMultiple: 1.06,
    });
  }

  // ============================================================ S1 title
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };

    // cascading document cards motif (right side)
    s.addShape("roundRect", { x: 9.0, y: 1.7, w: 2.7, h: 1.55, rectRadius: 0.08, fill: { color: ICE, transparency: 72 }, line: { type: "none" } });
    s.addShape("roundRect", { x: 9.65, y: 2.65, w: 2.7, h: 1.55, rectRadius: 0.08, fill: { color: ICE, transparency: 45 }, line: { type: "none" } });
    s.addShape("roundRect", { x: 10.3, y: 3.6, w: 2.7, h: 1.6, rectRadius: 0.08, fill: { color: MINT }, line: { type: "none" }, shadow: shadow() });
    s.addText("docs/", { x: 10.3, y: 3.78, w: 2.7, h: 0.5, align: "center", fontFace: MONO, fontSize: 16, bold: true, color: NAVY, margin: 0 });
    s.addText("markdown · AI-first", { x: 10.3, y: 4.28, w: 2.7, h: 0.4, align: "center", fontFace: BODY, fontSize: 11, color: NAVY, margin: 0 });

    s.addText("QUY ƯỚC LÀM VIỆC", { x: 0.7, y: 1.95, w: 7.5, h: 0.4, fontFace: BODY, fontSize: 13, bold: true, color: MINT, charSpacing: 4, margin: 0 });
    s.addText("Làm việc cùng AI\ntrong thiết kế hệ thống", { x: 0.7, y: 2.35, w: 8.2, h: 1.9, fontFace: HEAD, fontSize: 40, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.05 });
    s.addText("Dành cho SE / Bridge SE — giai đoạn requirement đến basic design", { x: 0.7, y: 4.35, w: 7.8, h: 0.5, fontFace: BODY, fontSize: 17, color: ICE, margin: 0 });
    s.addText("Nguồn: docs/AiAssistant/AiAssistant.md  ·  2026-08", { x: 0.7, y: 6.75, w: 7.5, h: 0.35, fontFace: BODY, fontSize: 11, color: ICE, transparency: 20, margin: 0 });
    s.addNotes("Mục tiêu buổi này: thống nhất một cách làm việc với AI đủ đơn giản để áp dụng ngay, cho giai đoạn định hình spec. Không phải quy trình phát triển hoàn chỉnh — chỉ là quy ước làm việc, nhưng đủ hợp lý để sau này thành một phần của quy trình chung.");
  }

  // ============================================================ S2 problems
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "Vì sao cần quy ước này?", { kicker: "VẤN ĐỀ" });

    const y = 1.75, h = 4.7, w = 5.95;
    // card 1
    card(s, 0.6, y, w, h);
    iconCircle(s, 0.95, y + 0.35, "users_w", 0.66);
    s.addText("Mỗi người dùng AI một kiểu", { x: 0.95, y: y + 1.15, w: w - 0.7, h: 0.5, fontFace: HEAD, fontSize: 19, bold: true, color: NAVY, margin: 0 });
    bullets(s, [
      "Dùng AI theo kinh nghiệm và sự tự học của riêng mỗi người",
      "Buổi chia sẻ không đến được tất cả — nghe không đồng nghĩa với hiểu, nếu không tự làm",
      "Tri thức “cách làm hiệu quả” không tích lũy thành tài sản chung của team",
    ], 0.95, y + 1.75, w - 0.7, h - 2.0, { size: 14 });

    // card 2
    card(s, 6.78, y, w, h);
    iconCircle(s, 7.13, y + 0.35, "layers_w", 0.66);
    s.addText("Tri thức spec rơi rụng giữa hai tầng", { x: 7.13, y: y + 1.15, w: w - 0.7, h: 0.5, fontFace: HEAD, fontSize: 19, bold: true, color: NAVY, margin: 0 });
    bullets(s, [
      "Cấp cao (khách hàng, super SE, leader) làm việc trên Google Docs / Sheet / Slide",
      "Dev team + AI làm việc với text trong repo, qua IDE",
      "Ghi chép tốn công nghĩ “lưu vào đâu” → người ta ghi ít đi",
      "Truyền đạt xuống thiếu sót → team và AI làm việc trên thông tin thiếu",
    ], 7.13, y + 1.75, w - 0.7, h - 2.0, { size: 14 });

    s.addNotes("Hai vấn đề thực tế. Thứ nhất: cách dùng AI phân tán, không đồng đều. Thứ hai — quan trọng hơn: tri thức spec sinh ra ở tầng làm việc với khách hàng (Google Drive) không xuống được đầy đủ tới dev team và AI.");
  }

  // ============================================================ S3 principles
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "Bốn nguyên tắc nền tảng", { kicker: "TRIẾT LÝ" });

    const items = [
      ["check_w", "Quy tắc đủ đơn giản để nhớ", "Con người chỉ thuộc vài quy tắc. Toàn bộ phần phức tạp dồn vào instruction file cho AI thi hành."],
      ["robot_w", "Đẩy tối đa cho AI — không phụ thuộc", "Đẩy việc AI làm tốt để dành năng lượng cho việc người đáng làm: ra quyết định, đàm phán, thẩm định."],
      ["md_w", "Tài liệu AI-first", "Mọi tri thức quy về text / markdown để AI nắm trọn vẹn — con người vẫn đọc và kiểm soát được."],
      ["home_w", "Repo là nhà duy nhất của tri thức", "Lưu trong docs/ của repository, viết bằng tiếng Việt. AI quyết định lưu vào đâu — người kiểm soát kết quả."],
    ];
    const cw = 5.95, ch = 2.2;
    const pos = [ [0.6, 1.8], [6.78, 1.8], [0.6, 4.25], [6.78, 4.25] ];
    items.forEach(([icon, t, d], i) => {
      const [x, y] = pos[i];
      card(s, x, y, cw, ch);
      iconCircle(s, x + 0.3, y + 0.32, icon, 0.6);
      s.addText(t, { x: x + 1.12, y: y + 0.28, w: cw - 1.4, h: 0.68, fontFace: HEAD, fontSize: 17, bold: true, color: NAVY, valign: "top", margin: 0 });
      s.addText(d, { x: x + 1.12, y: y + 0.98, w: cw - 1.45, h: ch - 1.15, fontFace: BODY, fontSize: 13, color: INK, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
    });
    s.addNotes("Bốn nguyên tắc, theo thứ tự ưu tiên. Nhấn mạnh nguyên tắc 2: 'đẩy tối đa' là phân công lao động chứ không phải phụ thuộc — người giữ ba việc AI không thay được: quyết định, đàm phán, thẩm định.");
  }

  // ============================================================ S4 two tiers
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "Hai tầng tài liệu — chấp nhận thực tế, phân vai rõ", { kicker: "MÔ HÌNH" });

    const y = 1.7, h = 3.35, w = 5.35;
    // Drive card (ice)
    card(s, 0.6, y, w, h, ICE_BG);
    iconCircle(s, 0.92, y + 0.3, "drive_n", 0.6, ICE);
    s.addText("Google Drive", { x: 1.68, y: y + 0.36, w: 3.6, h: 0.5, fontFace: HEAD, fontSize: 19, bold: true, color: NAVY, margin: 0 });
    bullets(s, [
      "Bề mặt giao tiếp / đàm phán với khách hàng và cấp cao",
      "SE tự tay tạo / update là chính — thi thoảng nhờ AI (sinh bảng lớn thành xlsx, sửa trực tiếp)",
      "Đầu vào nhất thời: đọc xong, rút tri thức, xong vai trò",
    ], 0.95, y + 1.1, w - 0.65, h - 1.3, { size: 12.5, gap: 6 });

    // arrow
    s.addShape("chevron", { x: 6.12, y: y + 1.25, w: 1.05, h: 0.8, fill: { color: MINT }, line: { type: "none" } });
    s.addText("SE + AI\nchuyển đổi", { x: 5.92, y: y + 2.12, w: 1.45, h: 0.62, align: "center", fontFace: BODY, fontSize: 11, bold: true, color: MUTED, margin: 0 });

    // Repo card (navy)
    card(s, 7.38, y, w, h, NAVY);
    iconCircle(s, 7.7, y + 0.3, "git_w", 0.6, NAVY2);
    s.addText("Repo — docs/", { x: 8.46, y: y + 0.36, w: 3.6, h: 0.5, fontFace: HEAD, fontSize: 19, bold: true, color: WHITE, margin: 0 });
    bullets(s, [
      "Source of truth duy nhất của team",
      "Tri thức sống: AI và mọi thành viên truy cập, cập nhật",
      "AI ghi — SE hiếm khi sửa tay: bàn luận với AI rồi yêu cầu “update vào các tài liệu cần thiết”, SE review diff",
    ], 7.73, y + 1.1, w - 0.65, h - 1.3, { size: 12.5, gap: 6, color: ICE });

    // key callout
    card(s, 0.6, 5.45, 12.13, 1.35, NAVY);
    s.addText([
      { text: "Chuyển đổi theo SỰ KIỆN, không theo tài liệu.  ", options: { bold: true, color: MINT } },
      { text: "Đơn vị đưa vào repo là “nội dung đã chốt trong buổi làm việc”, không phải “bản sao của file”. File Drive sửa tiếp? — đó là một sự kiện mới, kích hoạt một lần chuyển đổi mới. Không cần cơ chế theo dõi Drive.", options: { color: WHITE } },
    ], { x: 0.95, y: 5.62, w: 11.45, h: 1.05, fontFace: BODY, fontSize: 14, valign: "middle", margin: 0, lineSpacingMultiple: 1.1 });

    s.addNotes("Không chống lại thực tế: Drive vẫn là nơi làm việc với khách hàng. Nhưng vai trò được phân định — Drive là bề mặt giao tiếp, repo là nguồn sự thật duy nhất. Nhấn mạnh 'ai cầm bút': trên Drive SE tự tay là chính (thi thoảng nhờ AI); trên repo thì ngược lại — bàn với AI rồi bảo nó update, hiếm khi sửa tay, vì sửa tay đi vòng qua phần bookkeeping của AI (mục lục, liên kết chéo) khiến cơ cấu lặng lẽ lệch. Điểm mấu chốt ở callout: chuyển đổi theo sự kiện giải quyết luôn bài toán 'file Drive bị sửa sau khi đã chuyển đổi'.");
  }

  // ============================================================ S5 five rules (dark)
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    titleBar(s, "Năm quy tắc phải thuộc", { kicker: "PHẦN CỦA CON NGƯỜI", dark: true });

    const rules = [
      ["Repo là nhà duy nhất của tri thức spec", "Thứ không nằm trong docs/ — team và AI coi như không biết."],
      ["Chuyển đổi ngay theo sự kiện", "Sau mỗi buổi họp / quyết định: SE nắm dự án dành 10–15 phút cùng AI đưa nội dung vào repo. Không dồn."],
      ["Bàn xong phải ghi — chưa ghi là chưa xong", "Kết thúc mỗi phiên bằng câu hỏi cố định: “Những gì ta đã chốt hôm nay mà docs chưa có?”"],
      ["Review theo độ khó đảo ngược", "Đã chốt với khách hàng (interface, phạm vi, tiền) → review từng chữ. Diễn giải nội bộ → review nhẹ."],
      ["Đẩy cho AI việc AI làm tốt", "Soạn thảo, chuyển đổi, vẽ sơ đồ, giữ nhất quán — việc của AI. Quyết định, đàm phán, thẩm định — việc của người."],
    ];
    let y = 1.62;
    rules.forEach(([t, d], i) => {
      numCircle(s, 0.72, y + 0.08, i + 1, 0.5);
      s.addText([
        { text: t, options: { bold: true, color: WHITE, fontSize: 16.5, breakLine: true } },
        { text: d, options: { color: ICE, fontSize: 12.5 } },
      ], { x: 1.45, y, w: 11.3, h: 1.05, fontFace: BODY, valign: "top", margin: 0, lineSpacingMultiple: 1.12, paraSpaceAfter: 3 });
      y += 1.12;
    });
    s.addNotes("Slide quan trọng nhất — đây là TOÀN BỘ những gì một người cần thuộc. Nếu team chỉ nhớ được một slide, hãy nhớ slide này. Mọi thứ còn lại đã được dồn sang phần quy tắc cho AI.");
  }

  // ============================================================ S6 conversion ritual
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "Nghi thức chuyển đổi Drive → repo", { kicker: "VẬN HÀNH", sub: "Người thực hiện: SE nắm dự án — ngay sau buổi họp / quyết định" });

    const steps = [
      ["Đưa nguyên liệu cho AI", "File Docs / Sheet / Slide + bối cảnh: “kết quả buổi họp ngày X về chủ đề Y”"],
      ["AI chuyển đổi thành markdown", "AI tự quyết vị trí lưu theo cơ cấu docs, tự cập nhật mục lục"],
      ["SE kiểm tra ngay lập tức", "Slide / Excel vẽ tùy hứng rất dễ bị AI hiểu sai — kiểm tra bằng 2 kỹ thuật bên phải"],
      ["Chốt", "Xác nhận, cập nhật status, commit"],
    ];
    let y = 2.0;
    steps.forEach(([t, d], i) => {
      numCircle(s, 0.72, y + 0.05, i + 1, 0.5, NAVY, WHITE);
      if (i < steps.length - 1) s.addShape("line", { x: 0.97, y: y + 0.58, w: 0, h: 0.55, line: { color: ICE, width: 2.5 } });
      s.addText([
        { text: t, options: { bold: true, color: NAVY, fontSize: 15.5, breakLine: true } },
        { text: d, options: { color: MUTED, fontSize: 12 } },
      ], { x: 1.42, y: y - 0.02, w: 5.2, h: 1.0, fontFace: BODY, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
      y += 1.13;
    });

    // right: verification card
    const cx = 7.05, cy = 1.95, cw = 5.68, chh = 3.6;
    card(s, cx, cy, cw, chh, ICE_BG);
    s.addText("Hai kỹ thuật kiểm tra", { x: cx + 0.35, y: cy + 0.25, w: cw - 0.7, h: 0.45, fontFace: HEAD, fontSize: 17, bold: true, color: NAVY, margin: 0 });
    iconCircle(s, cx + 0.35, cy + 0.85, "eye_n", 0.52, ICE);
    s.addText([
      { text: "Kiểm tra ngược bằng hình", options: { bold: true, color: NAVY, breakLine: true } },
      { text: "AI vẽ lại những gì nó hiểu (Mermaid / drawio), đặt cạnh bản gốc. So bằng mắt — lệch là thấy ngay.", options: { color: INK } },
    ], { x: cx + 1.05, y: cy + 0.8, w: cw - 1.4, h: 1.2, fontFace: BODY, fontSize: 12.5, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
    iconCircle(s, cx + 0.35, cy + 2.2, "quest_n", 0.52, ICE);
    s.addText([
      { text: "Danh sách chỗ mờ", options: { bold: true, color: NAVY, breakLine: true } },
      { text: "AI phải khai báo điểm không chắc / mơ hồ / đã suy diễn — thay vì lẳng lặng điền vào chỗ trống. Ngắn, và là thứ SE đọc kỹ nhất.", options: { color: INK } },
    ], { x: cx + 1.05, y: cy + 2.15, w: cw - 1.4, h: 1.3, fontFace: BODY, fontSize: 12.5, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });

    // security note
    card(s, cx, 5.8, cw, 1.0, ICE_BG);
    iconCircle(s, cx + 0.35, 5.99, "shield_n", 0.52, ICE);
    s.addText("Chỉ dùng AI tool được công ty phê duyệt. Dự án có NDA đặc thù → SE xác nhận trước khi áp dụng.", { x: cx + 1.05, y: 5.92, w: cw - 1.4, h: 0.8, fontFace: BODY, fontSize: 12, color: INK, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });

    s.addNotes("Đây là nghi thức gắn với thời điểm cụ thể — quy ước chết khi không có 'lúc nào' được định nghĩa. Nhấn mạnh bước 3: người review văn AI trôi chảy rất dễ gật cho qua, nên dùng 2 kỹ thuật thay vì đọc-đối-chiếu thủ công. Cuối cùng: bảo mật — theo quy định AI tool của công ty.");
  }

  // ============================================================ S7 status
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "Trạng thái tài liệu — cái gì đã chốt, với ai?", { kicker: "VẬN HÀNH" });

    // code line
    s.addShape("roundRect", { x: 0.6, y: 1.75, w: 12.13, h: 0.62, rectRadius: 0.06, fill: { color: "F1F3F8" }, line: { color: ICE, width: 1 } });
    s.addText("> Status: draft | agreed-internal | agreed-customer (YYYY-MM-DD)", { x: 0.95, y: 1.75, w: 11.6, h: 0.62, fontFace: MONO, fontSize: 14, color: NAVY, valign: "middle", margin: 0 });
    s.addText("— một dòng ở đầu mỗi file spec", { x: 0.62, y: 2.42, w: 8, h: 0.35, fontFace: BODY, fontSize: 12, italic: true, color: MUTED, margin: 0 });

    const y = 3.0, h = 2.6, w = 3.7;
    const cards = [
      ["draft", "F1F3F8", NAVY, "Nháp", "AI soạn hoặc đang bàn.\nChưa ràng buộc — review nhẹ.", INK],
      ["agreed-internal", ICE, NAVY, "Team đã thống nhất", "Cơ sở để dev triển khai;\nvẫn có thể tinh chỉnh nội bộ.", INK],
      ["agreed-customer", NAVY, WHITE, "Đã chốt với khách hàng", "Ràng buộc gần như hợp đồng.\nSửa = thương lượng lại → review từng chữ.", ICE],
    ];
    cards.forEach(([tag, fill, tagColor, t, d, dColor], i) => {
      const x = 0.6 + i * (w + 0.51);
      card(s, x, y, w, h, fill);
      s.addText(tag, { x: x + 0.3, y: y + 0.28, w: w - 0.6, h: 0.4, fontFace: MONO, fontSize: 14, bold: true, color: tagColor, margin: 0 });
      s.addText(t, { x: x + 0.3, y: y + 0.78, w: w - 0.6, h: 0.5, fontFace: HEAD, fontSize: 16, bold: true, color: tagColor, margin: 0 });
      s.addText(d, { x: x + 0.3, y: y + 1.32, w: w - 0.6, h: h - 1.5, fontFace: BODY, fontSize: 12.5, color: dColor, valign: "top", margin: 0, lineSpacingMultiple: 1.12 });
      if (i < 2) s.addShape("chevron", { x: x + w + 0.08, y: y + h / 2 - 0.18, w: 0.36, h: 0.36, fill: { color: MINT }, line: { type: "none" } });
    });

    s.addText([
      { text: "Chỉ SE nắm dự án ", options: { bold: true, color: NAVY } },
      { text: "được chuyển status sang agreed-customer.   ·   Team dev nhìn status để phân biệt spec ràng buộc với brainstorm.", options: { color: MUTED } },
    ], { x: 0.62, y: 6.0, w: 12.1, h: 0.6, fontFace: BODY, fontSize: 13, margin: 0 });

    s.addNotes("Git version hóa nội dung nhưng không nói lên trạng thái thỏa thuận. Một dòng status rẻ nhưng sống còn với Bridge SE — agreed-customer có tính ràng buộc gần như hợp đồng, AI cũng bị cấm tự sửa các file này.");
  }

  // ============================================================ S8 what to write
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "Ghi gì vào docs? — Quyết định, không phải văn xuôi", { kicker: "VẬN HÀNH" });

    const y = 1.8, h = 3.9, w = 5.95;
    card(s, 0.6, y, w, h);
    iconCircle(s, 0.95, y + 0.3, "clip_w", 0.6);
    s.addText("Ưu tiên ghi", { x: 1.72, y: y + 0.37, w: 4.0, h: 0.5, fontFace: HEAD, fontSize: 18, bold: true, color: NAVY, margin: 0 });
    bullets(s, [
      "Quyết định + bối cảnh + lý do — ADR gọn (Architecture Decision Record): bối cảnh → quyết định → hậu quả",
      "Câu hỏi chưa chốt",
      "Ràng buộc từ khách hàng",
      "AI viết chữ rất giỏi — tài liệu dễ phình mà không đúng hơn. Đừng tái tạo bộ tài liệu truyền thống đồ sộ.",
    ], 0.95, y + 1.1, w - 0.68, h - 1.3, { size: 13.5 });

    card(s, 6.78, y, w, h);
    iconCircle(s, 7.13, y + 0.3, "diagram_w", 0.6);
    s.addText("Sơ đồ và hình ảnh", { x: 7.9, y: y + 0.37, w: 4.0, h: 0.5, fontFace: HEAD, fontSize: 18, bold: true, color: NAVY, margin: 0 });
    bullets(s, [
      "Mermaid — mặc định (~80%): sequence, state, ER, flow; render native GitHub / VSCode",
      "PlantUML — khi cần UML chuẩn mà Mermaid thiếu (activity + swimlane, component); vẫn là text",
      "drawio — khi cần layout / bản vẽ tay của SE; lưu .drawio.svg + kèm mô tả text",
      "Ảnh nhúng là tri thức chết → chỉ để tham khảo, ghi rõ “không phải spec”",
    ], 7.13, y + 1.1, w - 0.68, h - 1.65, { size: 12.5, gap: 7 });
    s.addText("Sự thật nằm ở text — sơ đồ là view. Lệch nhau: text thắng.", { x: 7.13, y: y + 3.35, w: w - 0.68, h: 0.45, fontFace: BODY, fontSize: 12.5, italic: true, bold: true, color: NAVY, valign: "middle", margin: 0 });

    s.addText("“Ngắn mà đúng thắng dài mà mượt.”", { x: 0.6, y: 6.0, w: 12.13, h: 0.6, align: "center", fontFace: HEAD, fontSize: 20, italic: true, bold: true, color: MINT, margin: 0 });

    s.addNotes("Ở giai đoạn requirement/basic design, thứ khan hiếm là quyết định và lý do — không phải chữ. ADR = Architecture Decision Record: bản ghi vài dòng cho một quyết định khó đảo ngược (bối cảnh → quyết định → hậu quả); ở đây dùng nghĩa rộng, gồm cả quyết định spec với khách hàng. Về sơ đồ: Mermaid là mặc định; PlantUML khi cần UML chuẩn (Mermaid không có activity diagram chuẩn với swimlane); drawio cho bản vẽ tay / cần layout, lưu dạng .drawio.svg. Nguyên tắc chốt: sự thật nằm ở text, sơ đồ chỉ là view — lệch nhau thì text thắng.");
  }

  // ============================================================ S9 AGENTS.md
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "Phần của AI — instruction file trong repo", { kicker: "AGENTS.MD" });

    // left diagram
    const dx = 0.6;
    s.addShape("roundRect", { x: dx + 0.55, y: 2.1, w: 3.4, h: 1.25, rectRadius: 0.08, fill: { color: NAVY }, line: { type: "none" }, shadow: shadow() });
    s.addText("AGENTS.md", { x: dx + 0.55, y: 2.28, w: 3.4, h: 0.5, align: "center", fontFace: MONO, fontSize: 17, bold: true, color: WHITE, margin: 0 });
    s.addText("file gốc duy nhất", { x: dx + 0.55, y: 2.78, w: 3.4, h: 0.4, align: "center", fontFace: BODY, fontSize: 11.5, color: ICE, margin: 0 });

    const sub = [ ["CLAUDE.md", dx, 4.35], [".cursor/rules", dx + 2.35, 4.35] ];
    sub.forEach(([t, x, yy]) => {
      s.addShape("roundRect", { x, y: yy, w: 2.2, h: 0.75, rectRadius: 0.07, fill: { color: ICE_BG }, line: { color: ICE, width: 1 } });
      s.addText(t + "  →", { x, y: yy, w: 2.2, h: 0.75, align: "center", valign: "middle", fontFace: MONO, fontSize: 12.5, color: NAVY, margin: 0 });
      s.addShape("line", { x: x + 1.1, y: 3.35, w: Math.max(0.05, (dx + 2.25) - (x + 1.1)), h: 1.0, line: { color: MUTED, width: 1.5, endArrowType: "arrow" }, flipV: true });
    });
    s.addText("File của từng tool chỉ trỏ đến AGENTS.md.\nNội dung quy tắc sống lâu hơn lựa chọn công cụ\n(Cursor → Claude Code → …)", { x: dx, y: 5.35, w: 4.7, h: 1.3, fontFace: BODY, fontSize: 12, italic: true, color: MUTED, margin: 0, lineSpacingMultiple: 1.15 });

    // right list
    const rx = 6.0, rw = 6.7;
    s.addText("AI được quy định phải:", { x: rx, y: 1.85, w: rw, h: 0.45, fontFace: HEAD, fontSize: 17, bold: true, color: NAVY, margin: 0 });
    bullets(s, [
      "Tự quyết vị trí lưu theo cơ cấu docs; tự cập nhật mục lục và liên kết chéo",
      "Liệt kê kế hoạch trước khi sửa — diff nhỏ, không regenerate cả cụm tài liệu",
      "Khai báo chỗ mờ khi chuyển đổi tài liệu nguồn",
      "Chủ động đề nghị ghi lại quyết định hình thành trong hội thoại",
      "Sơ đồ bằng Mermaid — không tạo ảnh nhúng cho spec",
      "Tôn trọng status: agreed-customer không tự sửa; ghi changelog gọn khi cập nhật",
    ], rx, 2.4, rw, 3.3, { size: 13.5, gap: 9 });

    card(s, rx, 5.85, rw, 0.95, NAVY);
    s.addText("Ai mở repo bằng AI assistant nào cũng vào cùng một nề nếp — lời giải cho “mỗi người một kiểu”.", { x: rx + 0.3, y: 5.85, w: rw - 0.6, h: 0.95, fontFace: BODY, fontSize: 13, bold: true, color: WHITE, valign: "middle", margin: 0, lineSpacingMultiple: 1.1 });

    s.addNotes("Toàn bộ độ phức tạp về cơ cấu tài liệu nằm ở đây — con người không phải nhớ. AGENTS.md là chuẩn mở trung lập; ta đang chuyển Cursor → Claude Code và có thể còn đổi tiếp, nên quy tắc phải sống lâu hơn công cụ. Quy ước nằm trong repo nên tự áp dụng cho mọi người, không phụ thuộc ai dự buổi chia sẻ nào.");
  }

  // ============================================================ S10 risks
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "Rủi ro lớn nhất không nằm ở AI — nằm ở khâu review", { kicker: "CẢNH GIÁC" });

    const risks = [
      ["glasses_w", "Review hình thức", "AI viết trôi chảy → người đọc lướt rồi gật. Spec lệch một chút nhưng trông hợp lý sẽ thành chính thức.", "Kiểm tra ngược bằng hình + đọc kỹ danh sách chỗ mờ."],
      ["masks_w", "Sai ngầm trông chuẩn", "Kho tài liệu chỉnh chu nhưng sai ngầm nguy hiểm hơn ghi chép rời rạc — vì nó tạo được lòng tin.", "Diff nhỏ + changelog; thỉnh thoảng bắt AI tự rà mâu thuẫn với nguyên tắc gốc."],
      ["align_w", "Phình chữ, không thêm đúng", "Vài quyết định quan trọng bị chôn trong văn mẫu hợp lý do AI sinh ra.", "Thiên vị ghi quyết định / lý do / ràng buộc thay vì văn xuôi đầy đủ."],
      ["clock_w", "Quy ước chết vì không có thời điểm", "Ai cũng hiểu nhưng không ai làm — vì không có “lúc nào” được định nghĩa.", "Mọi quy tắc gắn với thời điểm cụ thể: sau buổi họp, cuối phiên, trước khi commit."],
    ];
    const cw = 5.95, chh = 2.35;
    const pos = [ [0.6, 1.75], [6.78, 1.75], [0.6, 4.3], [6.78, 4.3] ];
    risks.forEach(([icon, t, d, fix], i) => {
      const [x, y] = pos[i];
      card(s, x, y, cw, chh);
      iconCircle(s, x + 0.28, y + 0.28, icon, 0.56);
      s.addText(t, { x: x + 1.05, y: y + 0.26, w: cw - 1.3, h: 0.45, fontFace: HEAD, fontSize: 15.5, bold: true, color: NAVY, margin: 0 });
      s.addText([
        { text: d, options: { color: INK, breakLine: true } },
        { text: "Phòng:  ", options: { bold: true, color: MINT } },
        { text: fix, options: { color: MUTED } },
      ], { x: x + 1.05, y: y + 0.74, w: cw - 1.35, h: chh - 0.95, fontFace: BODY, fontSize: 11.8, valign: "top", margin: 0, lineSpacingMultiple: 1.08, paraSpaceAfter: 4 });
    });
    s.addNotes("Bottleneck chuyển từ 'viết' sang 'review' — đó là trao đổi có chủ đích, nhưng phải gọi tên rủi ro của nó. Bốn rủi ro này đều có biện pháp phòng đã cài sẵn trong quy ước.");
  }

  // ============================================================ S11 closing (dark)
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    titleBar(s, "Bắt đầu từ đâu?", { kicker: "TIẾP THEO", dark: true });

    const steps = [
      "Bản rút gọn một trang cho team — từ 5 quy tắc",
      "AGENTS.md mẫu — đặt được ngay vào repo dự án",
      "Template: file spec + dòng status, ADR gọn, danh sách chỗ mờ",
      "Áp dụng thử một dự án thật → ghi nhận chỗ vướng → cập nhật quy ước",
    ];
    let y = 1.95;
    steps.forEach((t, i) => {
      numCircle(s, 0.72, y + 0.02, i + 1, 0.5);
      s.addText(t, { x: 1.45, y, w: 6.1, h: 0.9, fontFace: BODY, fontSize: 15, color: WHITE, valign: "top", margin: 0, lineSpacingMultiple: 1.1 });
      y += 1.02;
    });

    // takeaway
    card(s, 8.1, 2.1, 4.6, 3.4, NAVY2);
    s.addText([
      { text: "Con người quyết định.", options: { color: WHITE, breakLine: true } },
      { text: "AI ghi chép.", options: { color: MINT, breakLine: true } },
      { text: "Repo ghi nhớ.", options: { color: ICE } },
    ], { x: 8.45, y: 2.35, w: 3.95, h: 2.9, fontFace: HEAD, fontSize: 28, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.35 });

    s.addText("Chi tiết: docs/AiAssistant/AiAssistant.md   ·   Thảo luận và phản biện luôn được hoan nghênh", { x: 0.72, y: 6.7, w: 11.9, h: 0.4, fontFace: BODY, fontSize: 12, color: ICE, margin: 0 });
    s.addNotes("Kết: quy ước này là tài liệu sống — áp dụng thử, vướng đâu sửa đó. Ba câu cuối là tinh thần của toàn bộ cách làm: con người quyết định, AI ghi chép, repo ghi nhớ.");
  }

  await pres.writeFile({ fileName: path.join(__dirname, "..", "AiAssistant-team-intro.pptx") });
  console.log("written");
})().catch((e) => { console.error(e); process.exit(1); });
