import { c as createComponent } from './astro-component_DtgDE76K.mjs';
import 'piccolore';
import { L as renderTemplate, x as maybeRenderHead, a2 as addAttribute } from './sequence_D8ekMvs6.mjs';
import { r as renderComponent } from './entrypoint_CHgLRPWq.mjs';
import { $ as $$Layout } from './Layout_C2LtPF5i.mjs';
import { $ as $$Navigation } from './Navigation__mK9drz8.mjs';

const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const isNew = id === "new";
  const issueData = isNew ? {
    title: "",
    semester: "",
    pdf: ""} : {
    title: `第${id}期`,
    semester: id === "36" ? "113秋冬" : "112秋冬",
    pdf: `/newsletter/光禾通訊/光禾通訊NO${id}.pdf`};
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": isNew ? "新增光禾通訊" : `編輯第${id}期`, "data-astro-cid-xoipydew": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, { "data-astro-cid-xoipydew": true })} ${maybeRenderHead()}<section class="hero-small" data-astro-cid-xoipydew> <div class="container" data-astro-cid-xoipydew> <h1 data-astro-cid-xoipydew>${isNew ? "新增光禾通訊" : `編輯第${id}期`}</h1> </div> </section> <section class="section" data-astro-cid-xoipydew> <div class="container" data-astro-cid-xoipydew> <form class="upload-form" method="post" action="/api/newsletter/upload" enctype="multipart/form-data" data-astro-cid-xoipydew> <div class="form-group" data-astro-cid-xoipydew> <label data-astro-cid-xoipydew>期數標題</label> <input type="text" name="title"${addAttribute(issueData.title, "value")} placeholder="例如：第36期" data-astro-cid-xoipydew> </div> <div class="form-group" data-astro-cid-xoipydew> <label data-astro-cid-xoipydew>學年度</label> <input type="text" name="semester"${addAttribute(issueData.semester, "value")} placeholder="例如：113學年度 秋冬學季合輯" data-astro-cid-xoipydew> </div> <div class="form-group" data-astro-cid-xoipydew> <label data-astro-cid-xoipydew>PDF 檔案</label> <div class="file-upload" data-astro-cid-xoipydew> <input type="file" name="pdf" accept=".pdf" id="pdf-input" data-astro-cid-xoipydew> <label for="pdf-input" class="file-label" data-astro-cid-xoipydew> <span class="upload-icon" data-astro-cid-xoipydew>📄</span> <span class="upload-text" data-astro-cid-xoipydew>點擊選擇 PDF 檔案</span> </label> </div> ${!isNew && issueData.pdf && renderTemplate`<p class="current-file" data-astro-cid-xoipydew>目前檔案：${issueData.pdf}</p>`} </div> <div class="info-box" data-astro-cid-xoipydew> <h4 data-astro-cid-xoipydew>ℹ️ 自動轉換說明</h4> <ul data-astro-cid-xoipydew> <li data-astro-cid-xoipydew>上傳 PDF 後，系統會自動将其轉換為圖片</li> <li data-astro-cid-xoipydew>圖片會放在 /newsletter/光禾通訊/ 目錄</li> <li data-astro-cid-xoipydew>轉換完成後，前台會自動更新</li> <li data-astro-cid-xoipydew>建議 PDF 解析度為 150-300 DPI</li> </ul> </div> <div class="form-actions" data-astro-cid-xoipydew> <button type="submit" class="submit-btn" data-astro-cid-xoipydew> ${isNew ? "➕ 新增並轉換" : "💾 儲存"} </button> <a href="/admin" class="cancel-btn" data-astro-cid-xoipydew>取消</a> </div> </form> </div> </section> ` })}`;
}, "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/newsletter/[id].astro", void 0);

const $$file = "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/newsletter/[id].astro";
const $$url = "/admin/newsletter/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
