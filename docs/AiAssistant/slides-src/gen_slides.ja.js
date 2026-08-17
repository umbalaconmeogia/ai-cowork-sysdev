// Japanese version of gen_slides.js — same layout, translated content.
// Output: ../AiAssistant-team-intro.ja.pptx
const path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");

// ---- palette ----
const NAVY = "1E2761";
const NAVY2 = "27336F";
const ICE = "CADCFC";
const ICE_BG = "EEF3FB";
const MINT = "02C39A";
const WHITE = "FFFFFF";
const INK = "22263B";
const MUTED = "5A6178";

const HEAD = "Yu Gothic";
const BODY = "Yu Gothic";
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
    const arr = items.map((t) => ({
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

    s.addShape("roundRect", { x: 9.0, y: 1.7, w: 2.7, h: 1.55, rectRadius: 0.08, fill: { color: ICE, transparency: 72 }, line: { type: "none" } });
    s.addShape("roundRect", { x: 9.65, y: 2.65, w: 2.7, h: 1.55, rectRadius: 0.08, fill: { color: ICE, transparency: 45 }, line: { type: "none" } });
    s.addShape("roundRect", { x: 10.3, y: 3.6, w: 2.7, h: 1.6, rectRadius: 0.08, fill: { color: MINT }, line: { type: "none" }, shadow: shadow() });
    s.addText("docs/", { x: 10.3, y: 3.78, w: 2.7, h: 0.5, align: "center", fontFace: MONO, fontSize: 16, bold: true, color: NAVY, margin: 0 });
    s.addText("markdown · AI-first", { x: 10.3, y: 4.28, w: 2.7, h: 0.4, align: "center", fontFace: BODY, fontSize: 11, color: NAVY, margin: 0 });

    s.addText("作業規約", { x: 0.7, y: 1.95, w: 7.5, h: 0.4, fontFace: BODY, fontSize: 13, bold: true, color: MINT, charSpacing: 4, margin: 0 });
    s.addText("AIと共に進める\nシステム設計", { x: 0.7, y: 2.35, w: 8.2, h: 1.9, fontFace: HEAD, fontSize: 40, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 1.05 });
    s.addText("SE / ブリッジSE向け — 要件定義から基本設計まで", { x: 0.7, y: 4.35, w: 7.8, h: 0.5, fontFace: BODY, fontSize: 17, color: ICE, margin: 0 });
    s.addText("出典: docs/AiAssistant/AiAssistant.md  ·  2026-08", { x: 0.7, y: 6.75, w: 7.5, h: 0.35, fontFace: BODY, fontSize: 11, color: ICE, transparency: 20, margin: 0 });
    s.addNotes("本日の目的：仕様策定の段階で、すぐ適用できるほどシンプルなAIとの働き方を統一すること。完成された開発プロセスではなく、あくまで作業規約。ただし将来チーム共通プロセスの一部になり得る合理性を持たせている。");
  }

  // ============================================================ S2 problems
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "なぜこの規約が必要か", { kicker: "課題" });

    const y = 1.75, h = 4.7, w = 5.95;
    card(s, 0.6, y, w, h);
    iconCircle(s, 0.95, y + 0.35, "users_w", 0.66);
    s.addText("AIの使い方が人それぞれ", { x: 0.95, y: y + 1.15, w: w - 0.7, h: 0.5, fontFace: HEAD, fontSize: 19, bold: true, color: NAVY, margin: 0 });
    bullets(s, [
      "各自の経験・独学に依存している",
      "共有会は全員には届かない — 自分でやらなければ、聞いただけでは理解にならない",
      "「効果的なやり方」がチームの資産として蓄積されない",
    ], 0.95, y + 1.75, w - 0.7, h - 2.0, { size: 14 });

    card(s, 6.78, y, w, h);
    iconCircle(s, 7.13, y + 0.35, "layers_w", 0.66);
    s.addText("仕様の知識が二つの層の間で失われる", { x: 7.13, y: y + 1.15, w: w - 0.7, h: 0.5, fontFace: HEAD, fontSize: 18, bold: true, color: NAVY, margin: 0 });
    bullets(s, [
      "上位層（顧客・スーパーSE・リーダー）は Google Docs / Sheet / Slide で作業",
      "開発チーム + AI はリポジトリ内のテキストをIDEで扱う",
      "記録には「どこに保存するか」を考える手間がかかる → 記録が減る",
      "下への伝達漏れ → チームとAIが不完全な情報で作業する",
    ], 7.13, y + 1.75, w - 0.7, h - 2.0, { size: 14 });

    s.addNotes("現場の課題は二つ。第一：AIの使い方がバラバラで、質が揃わない。第二（より重要）：顧客との作業層（Google Drive）で生まれる仕様知識が、開発チームとAIに完全な形で届かない。");
  }

  // ============================================================ S3 principles
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "四つの基本原則", { kicker: "理念" });

    const items = [
      ["check_w", "覚えられるほどシンプルなルール", "人間は少数のルールだけ覚える。複雑な部分はすべてinstruction fileに集約し、AIが実行する。"],
      ["robot_w", "AIに最大限任せる — ただし依存ではない", "AIが得意な仕事はAIへ。人間は本来やるべき仕事に力を注ぐ：意思決定・交渉・検証。"],
      ["md_w", "AIファーストのドキュメント", "知識はすべてtext / markdownへ。AIが完全に把握でき、人間も読めて管理できる。"],
      ["home_w", "リポジトリが知識の唯一の家", "docs/ に保存（ベトナム語で記述）。どこに保存するかはAIが決め、人間は結果を管理する。"],
    ];
    const cw = 5.95, ch = 2.2;
    const pos = [ [0.6, 1.8], [6.78, 1.8], [0.6, 4.25], [6.78, 4.25] ];
    items.forEach(([icon, t, d], i) => {
      const [x, y] = pos[i];
      card(s, x, y, cw, ch);
      iconCircle(s, x + 0.3, y + 0.32, icon, 0.6);
      s.addText(t, { x: x + 1.12, y: y + 0.28, w: cw - 1.4, h: 0.68, fontFace: HEAD, fontSize: 16, bold: true, color: NAVY, valign: "top", margin: 0 });
      s.addText(d, { x: x + 1.12, y: y + 0.98, w: cw - 1.45, h: ch - 1.15, fontFace: BODY, fontSize: 12.5, color: INK, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
    });
    s.addNotes("優先順位つきの四原則。原則2を強調：「最大限任せる」は依存ではなく分業。人間はAIに代替できない三つの仕事を守る：意思決定・交渉・検証。");
  }

  // ============================================================ S4 two tiers
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "ドキュメントの二層モデル — 現実を受け入れ、役割を明確に", { kicker: "モデル" });

    const y = 1.7, h = 3.35, w = 5.35;
    card(s, 0.6, y, w, h, ICE_BG);
    iconCircle(s, 0.92, y + 0.3, "drive_n", 0.6, ICE);
    s.addText("Google Drive", { x: 1.68, y: y + 0.36, w: 3.6, h: 0.5, fontFace: HEAD, fontSize: 19, bold: true, color: NAVY, margin: 0 });
    bullets(s, [
      "顧客・上位層とのコミュニケーション／交渉の場",
      "SEが自ら作成・更新するのが基本 — 時にはAIに依頼（大きな表をxlsxで生成、直接編集）",
      "一時的なインプット：読んで知識を抽出したら役割終了",
    ], 0.95, y + 1.1, w - 0.65, h - 1.3, { size: 12.5, gap: 6 });

    s.addShape("chevron", { x: 6.12, y: y + 1.25, w: 1.05, h: 0.8, fill: { color: MINT }, line: { type: "none" } });
    s.addText("SE + AI\nが変換", { x: 5.92, y: y + 2.12, w: 1.45, h: 0.62, align: "center", fontFace: BODY, fontSize: 11, bold: true, color: MUTED, margin: 0 });

    card(s, 7.38, y, w, h, NAVY);
    iconCircle(s, 7.7, y + 0.3, "git_w", 0.6, NAVY2);
    s.addText("リポジトリ — docs/", { x: 8.46, y: y + 0.36, w: 3.9, h: 0.5, fontFace: HEAD, fontSize: 19, bold: true, color: WHITE, margin: 0 });
    bullets(s, [
      "チーム唯一の source of truth",
      "生きた知識：AIと全メンバーが参照・更新",
      "AIが書く — SEはほぼ手で編集しない：AIと議論し「関連ドキュメントを更新して」と依頼、diffをレビュー",
    ], 7.73, y + 1.1, w - 0.65, h - 1.3, { size: 12.5, gap: 6, color: ICE });

    card(s, 0.6, 5.45, 12.13, 1.35, NAVY);
    s.addText([
      { text: "変換の単位はドキュメントではなく「出来事」。  ", options: { bold: true, color: MINT } },
      { text: "リポジトリに入れるのは「打合せで確定した内容」であり、「ファイルのコピー」ではない。Driveのファイルが後で修正されたら？ — それは新しい出来事で、新しい変換を行うだけ。Driveを監視する仕組みは不要。", options: { color: WHITE } },
    ], { x: 0.95, y: 5.62, w: 11.45, h: 1.05, fontFace: BODY, fontSize: 13.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.1 });

    s.addNotes("現実に逆らわない：Driveは今後も顧客との作業場。ただし役割を分ける — Driveは交渉の場、リポジトリが唯一の真実の源。「誰がペンを持つか」も強調：Driveでは基本SEが手作業（時々AI）、リポジトリでは逆にAIと議論して更新を依頼し、手編集はほぼしない。手編集はAIの帳簿管理（目次・相互リンク）を迂回し、構成が静かにズレるため。下のポイント：出来事単位の変換により「変換後にDriveファイルが修正される」問題も解決。");
  }

  // ============================================================ S5 five rules (dark)
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    titleBar(s, "暗記すべき五つのルール", { kicker: "人間側のルール", dark: true });

    const rules = [
      ["リポジトリが仕様知識の唯一の家", "docs/ にないものは、チームもAIも「知らないもの」とみなす。"],
      ["出来事ごとに、すぐ変換", "打合せ・決定のたびに：担当SEがAIと10〜15分で内容をリポジトリへ。溜め込まない。"],
      ["話したら書く — 書くまでは終わっていない", "セッションの最後に固定の質問：「今日決めたことで、docsにまだ無いものは？」"],
      ["取り返しの難しさに応じてレビュー", "顧客と合意済み（interface・範囲・金額）→ 一字一句レビュー。内部の解釈 → 軽くレビュー。"],
      ["AIが得意な仕事はAIへ", "起草・変換・図示・一貫性の維持 — AIの仕事。意思決定・交渉・検証 — 人間の仕事。"],
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
    s.addNotes("最重要スライド — 人間が覚えるべきことはこれで全部。チームが一枚だけ覚えるならこのスライド。それ以外はすべてAI側のルールに集約済み。");
  }

  // ============================================================ S6 conversion ritual
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "Drive → リポジトリ変換の儀式", { kicker: "運用", sub: "実施者：プロジェクト担当SE — 打合せ・決定の直後" });

    const steps = [
      ["AIに素材を渡す", "Docs / Sheet / Slide + 文脈：「X日の打合せ結果、テーマはY」"],
      ["AIがmarkdownへ変換", "docs構成に従いAIが保存先を決定、目次も自動更新"],
      ["SEがその場でチェック", "スライドやExcelの自由な図はAIが誤読しやすい — 右の2つの技法で確認"],
      ["確定", "承認、status更新、コミット"],
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

    const cx = 7.05, cy = 1.95, cw = 5.68, chh = 3.6;
    card(s, cx, cy, cw, chh, ICE_BG);
    s.addText("二つの検証技法", { x: cx + 0.35, y: cy + 0.25, w: cw - 0.7, h: 0.45, fontFace: HEAD, fontSize: 17, bold: true, color: NAVY, margin: 0 });
    iconCircle(s, cx + 0.35, cy + 0.85, "eye_n", 0.52, ICE);
    s.addText([
      { text: "図による逆検証", options: { bold: true, color: NAVY, breakLine: true } },
      { text: "AIが理解した内容を図に描き直させ（Mermaid / drawio）、原本と並べて目視で比較する。ズレは一目瞭然。", options: { color: INK } },
    ], { x: cx + 1.05, y: cy + 0.8, w: cw - 1.4, h: 1.2, fontFace: BODY, fontSize: 12.5, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
    iconCircle(s, cx + 0.35, cy + 2.2, "quest_n", 0.52, ICE);
    s.addText([
      { text: "不明点リスト", options: { bold: true, color: NAVY, breakLine: true } },
      { text: "AIは「不確かな点・曖昧な点・推測した点」の申告が義務 — 黙って空欄を埋めてはならない。短いリストだが、SEが最も熟読すべき箇所。", options: { color: INK } },
    ], { x: cx + 1.05, y: cy + 2.15, w: cw - 1.4, h: 1.3, fontFace: BODY, fontSize: 12.5, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });

    card(s, cx, 5.8, cw, 1.0, ICE_BG);
    iconCircle(s, cx + 0.35, 5.99, "shield_n", 0.52, ICE);
    s.addText("会社が承認したAIツールのみ使用。特別なNDAがある案件 → 適用前にSEが確認。", { x: cx + 1.05, y: 5.92, w: cw - 1.4, h: 0.8, fontFace: BODY, fontSize: 12, color: INK, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });

    s.addNotes("具体的なタイミングに紐付いた儀式 — 「いつやるか」が決まっていない規約は死ぬ。ステップ3を強調：AIの流暢な文章は流し読みで承認しがちなので、手作業の突き合わせではなく2つの技法を使う。最後にセキュリティ：会社のAIツール規定に従う。");
  }

  // ============================================================ S7 status
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "ドキュメントのステータス — 何が、誰と確定済みか", { kicker: "運用" });

    s.addShape("roundRect", { x: 0.6, y: 1.75, w: 12.13, h: 0.62, rectRadius: 0.06, fill: { color: "F1F3F8" }, line: { color: ICE, width: 1 } });
    s.addText("> Status: draft | agreed-internal | agreed-customer (YYYY-MM-DD)", { x: 0.95, y: 1.75, w: 11.6, h: 0.62, fontFace: MONO, fontSize: 14, color: NAVY, valign: "middle", margin: 0 });
    s.addText("— 各仕様ファイルの冒頭に一行", { x: 0.62, y: 2.42, w: 8, h: 0.35, fontFace: BODY, fontSize: 12, italic: true, color: MUTED, margin: 0 });

    const y = 3.0, h = 2.6, w = 3.7;
    const cards = [
      ["draft", "F1F3F8", NAVY, "ドラフト", "AIが起草、または議論中。\n拘束力なし — 軽くレビュー。", INK],
      ["agreed-internal", ICE, NAVY, "チーム内で合意済み", "開発を進める基盤；\n内部での微調整はまだ可能。", INK],
      ["agreed-customer", NAVY, WHITE, "顧客と確定済み", "契約に近い拘束力。\n修正 = 再交渉 → 一字一句レビュー。", ICE],
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
      { text: "agreed-customer への変更はプロジェクト担当SEのみ。", options: { bold: true, color: NAVY } },
      { text: "   ·   開発チームはstatusを見て、拘束力ある仕様とブレインストームを区別する。", options: { color: MUTED } },
    ], { x: 0.62, y: 6.0, w: 12.1, h: 0.6, fontFace: BODY, fontSize: 13, margin: 0 });

    s.addNotes("gitは内容の履歴は残すが「合意の状態」は表現しない。status一行は安価だがブリッジSEには死活的 — agreed-customerは契約に近い拘束力を持ち、AIもこのファイルの勝手な修正を禁じられている。");
  }

  // ============================================================ S8 what to write
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "docsに何を書くか — 散文ではなく、意思決定を", { kicker: "運用" });

    const y = 1.8, h = 3.9, w = 5.95;
    card(s, 0.6, y, w, h);
    iconCircle(s, 0.95, y + 0.3, "clip_w", 0.6);
    s.addText("優先して記録するもの", { x: 1.72, y: y + 0.37, w: 4.2, h: 0.5, fontFace: HEAD, fontSize: 17, bold: true, color: NAVY, margin: 0 });
    bullets(s, [
      "決定 + 背景 + 理由 — 簡潔なADR (Architecture Decision Record)：背景 → 決定 → 帰結",
      "未確定の論点",
      "顧客からの制約",
      "AIは文章を書くのが得意 — ドキュメントは膨らみやすいが、正しくはならない。従来型の大部な文書一式を再現しない。",
    ], 0.95, y + 1.1, w - 0.68, h - 1.3, { size: 12.5, gap: 7 });

    card(s, 6.78, y, w, h);
    iconCircle(s, 7.13, y + 0.3, "diagram_w", 0.6);
    s.addText("図とイメージ", { x: 7.9, y: y + 0.37, w: 4.0, h: 0.5, fontFace: HEAD, fontSize: 17, bold: true, color: NAVY, margin: 0 });
    bullets(s, [
      "Mermaid — デフォルト（約80%）：sequence, state, ER, flow；GitHub / VSCodeでそのまま表示",
      "PlantUML — Mermaidにない標準UMLが必要な時（swimlane付きactivity、component）；これもtext",
      "drawio — レイアウト調整／SEの手描きが必要な時；.drawio.svg で保存 + text説明を添付",
      "埋め込み画像は死んだ知識 → 参考用のみ、「仕様ではない」と明記",
    ], 7.13, y + 1.1, w - 0.68, h - 1.65, { size: 12.5, gap: 7 });
    s.addText("真実はtextにある — 図はビュー。食い違ったらtextが勝つ。", { x: 7.13, y: y + 3.35, w: w - 0.68, h: 0.45, fontFace: BODY, fontSize: 12.5, italic: true, bold: true, color: NAVY, valign: "middle", margin: 0 });

    s.addText("「短くて正しいは、長くて滑らかに勝つ。」", { x: 0.6, y: 6.0, w: 12.13, h: 0.6, align: "center", fontFace: HEAD, fontSize: 20, italic: true, bold: true, color: MINT, margin: 0 });

    s.addNotes("要件定義〜基本設計で希少なのは「決定とその理由」であり、文字数ではない。ADR = Architecture Decision Record：取り返しの難しい決定を数行で記録（背景→決定→帰結）；ここでは広義に使い、顧客との仕様決定も含む。図について：Mermaidがデフォルト；標準UML（swimlane付きactivity等、Mermaid非対応）はPlantUML；手描き・レイアウト重視はdrawioで.drawio.svg保存。原則：真実はtextに、図はビュー — 食い違えばtextが勝つ。");
  }

  // ============================================================ S9 AGENTS.md
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "AI側のルール — リポジトリ内のinstruction file", { kicker: "AGENTS.MD" });

    const dx = 0.6;
    s.addShape("roundRect", { x: dx + 0.55, y: 2.1, w: 3.4, h: 1.25, rectRadius: 0.08, fill: { color: NAVY }, line: { type: "none" }, shadow: shadow() });
    s.addText("AGENTS.md", { x: dx + 0.55, y: 2.28, w: 3.4, h: 0.5, align: "center", fontFace: MONO, fontSize: 17, bold: true, color: WHITE, margin: 0 });
    s.addText("唯一のマスター", { x: dx + 0.55, y: 2.78, w: 3.4, h: 0.4, align: "center", fontFace: BODY, fontSize: 11.5, color: ICE, margin: 0 });

    const sub = [ ["CLAUDE.md", dx, 4.35], [".cursor/rules", dx + 2.35, 4.35] ];
    sub.forEach(([t, x, yy]) => {
      s.addShape("roundRect", { x, y: yy, w: 2.2, h: 0.75, rectRadius: 0.07, fill: { color: ICE_BG }, line: { color: ICE, width: 1 } });
      s.addText(t + "  →", { x, y: yy, w: 2.2, h: 0.75, align: "center", valign: "middle", fontFace: MONO, fontSize: 12.5, color: NAVY, margin: 0 });
      s.addShape("line", { x: x + 1.1, y: 3.35, w: Math.max(0.05, (dx + 2.25) - (x + 1.1)), h: 1.0, line: { color: MUTED, width: 1.5, endArrowType: "arrow" }, flipV: true });
    });
    s.addText("各ツールのファイルはAGENTS.mdを指すだけ。\nルールの内容はツール選択より長生きする\n(Cursor → Claude Code → …)", { x: dx, y: 5.35, w: 4.7, h: 1.3, fontFace: BODY, fontSize: 12, italic: true, color: MUTED, margin: 0, lineSpacingMultiple: 1.15 });

    const rx = 6.0, rw = 6.7;
    s.addText("AIに義務付けること：", { x: rx, y: 1.85, w: rw, h: 0.45, fontFace: HEAD, fontSize: 17, bold: true, color: NAVY, margin: 0 });
    bullets(s, [
      "docs構成に従い保存先を自ら決定；目次と相互リンクを維持",
      "修正前に計画を提示 — 小さなdiffで、まとめて再生成しない",
      "元資料の変換時は不明点を申告する",
      "会話の中で決定が生まれたら、記録を自ら提案する",
      "図はMermaidで — 仕様に埋め込み画像を作らない",
      "statusを尊重：agreed-customerは勝手に修正しない；更新時は簡潔なchangelog（重要な節目のみ）",
    ], rx, 2.4, rw, 3.3, { size: 13, gap: 9 });

    card(s, rx, 5.85, rw, 0.95, NAVY);
    s.addText("どのAIアシスタントでリポジトリを開いても、同じ規律に入る — 「人それぞれ」問題への解答。", { x: rx + 0.3, y: 5.85, w: rw - 0.6, h: 0.95, fontFace: BODY, fontSize: 13, bold: true, color: WHITE, valign: "middle", margin: 0, lineSpacingMultiple: 1.1 });

    s.addNotes("ドキュメント構成の複雑さはすべてここに集約 — 人間は覚えなくてよい。AGENTS.mdはツール中立のオープン標準；現在Cursor→Claude Codeへ移行中で今後も変わり得るため、ルールはツールより長生きさせる。規約はリポジトリ内にあるので、共有会に出たかどうかに関係なく全員に自動適用される。");
  }

  // ============================================================ S10 risks
  {
    const s = pres.addSlide();
    s.background = { color: WHITE };
    titleBar(s, "最大のリスクはAIではなく — レビューにある", { kicker: "要注意" });

    const risks = [
      ["glasses_w", "形だけのレビュー", "AIの文章は流暢 → 流し読みして承認してしまう。少しズレた仕様が、もっともらしく見えて正式になる。", "図による逆検証 + 不明点リストの熟読。"],
      ["masks_w", "整って見えるが、密かに間違っている", "整然としたドキュメントの隠れた誤りは、バラバラなメモより危険 — 信頼を生んでしまうから。", "小さなdiff + changelog；時々AIに原則との矛盾を自己点検させる。"],
      ["align_w", "文字は増えても、正しさは増えない", "重要な決定が、AIの生む もっともらしい定型文に埋もれる。", "散文より、決定・理由・制約の記録を優先する。"],
      ["clock_w", "タイミングがなければ規約は死ぬ", "皆が理解していても誰もやらない — 「いつやるか」が定義されていないから。", "全ルールを具体的タイミングに紐付け：打合せ後、セッション終了時、コミット前。"],
    ];
    const cw = 5.95, chh = 2.35;
    const pos = [ [0.6, 1.75], [6.78, 1.75], [0.6, 4.3], [6.78, 4.3] ];
    risks.forEach(([icon, t, d, fix], i) => {
      const [x, y] = pos[i];
      card(s, x, y, cw, chh);
      iconCircle(s, x + 0.28, y + 0.28, icon, 0.56);
      s.addText(t, { x: x + 1.05, y: y + 0.26, w: cw - 1.3, h: 0.45, fontFace: HEAD, fontSize: 14.5, bold: true, color: NAVY, margin: 0 });
      s.addText([
        { text: d, options: { color: INK, breakLine: true } },
        { text: "対策:  ", options: { bold: true, color: MINT } },
        { text: fix, options: { color: MUTED } },
      ], { x: x + 1.05, y: y + 0.74, w: cw - 1.35, h: chh - 0.95, fontFace: BODY, fontSize: 11.5, valign: "top", margin: 0, lineSpacingMultiple: 1.08, paraSpaceAfter: 4 });
    });
    s.addNotes("ボトルネックは「書く」から「レビューする」へ移った — それは意図的な交換だが、リスクには名前を付けておく。四つのリスクはいずれも、規約の中に対策が組み込み済み。");
  }

  // ============================================================ S11 closing (dark)
  {
    const s = pres.addSlide();
    s.background = { color: NAVY };
    titleBar(s, "どこから始めるか", { kicker: "ネクストステップ", dark: true });

    const steps = [
      "チーム向け1ページ要約 — 五つのルールから",
      "AGENTS.mdテンプレート — そのままプロジェクトのリポジトリへ",
      "各種テンプレート：statusつき仕様ファイル、簡潔ADR、不明点リスト",
      "実プロジェクトで試行 → 課題を記録 → 規約を更新",
    ];
    let y = 1.95;
    steps.forEach((t, i) => {
      numCircle(s, 0.72, y + 0.02, i + 1, 0.5);
      s.addText(t, { x: 1.45, y, w: 6.1, h: 0.9, fontFace: BODY, fontSize: 15, color: WHITE, valign: "top", margin: 0, lineSpacingMultiple: 1.1 });
      y += 1.02;
    });

    card(s, 8.1, 2.1, 4.6, 3.4, NAVY2);
    s.addText([
      { text: "人間が決める。", options: { color: WHITE, breakLine: true } },
      { text: "AIが書く。", options: { color: MINT, breakLine: true } },
      { text: "リポジトリが憶える。", options: { color: ICE } },
    ], { x: 8.45, y: 2.35, w: 3.95, h: 2.9, fontFace: HEAD, fontSize: 26, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.35 });

    s.addText("詳細: docs/AiAssistant/AiAssistant.md   ·   議論・反論を歓迎します", { x: 0.72, y: 6.7, w: 11.9, h: 0.4, fontFace: BODY, fontSize: 12, color: ICE, margin: 0 });
    s.addNotes("締め：この規約は生きたドキュメント — 試して、つまずいた所を直していく。最後の三行がこの働き方全体の精神：人間が決め、AIが書き、リポジトリが憶える。");
  }

  await pres.writeFile({ fileName: path.join(__dirname, "..", "AiAssistant-team-intro.ja.pptx") });
  console.log("written");
})().catch((e) => { console.error(e); process.exit(1); });
