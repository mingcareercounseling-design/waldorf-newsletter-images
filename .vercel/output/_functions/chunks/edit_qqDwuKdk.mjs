import { c as createComponent } from './astro-component_DtgDE76K.mjs';
import 'piccolore';
import { L as renderTemplate, x as maybeRenderHead } from './sequence_D8ekMvs6.mjs';
import { r as renderComponent } from './entrypoint_CHgLRPWq.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_C2LtPF5i.mjs';

const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "編輯頁面 | 光禾華德福", "data-astro-cid-wr2tdydo": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="editor-layout" data-astro-cid-wr2tdydo> <!-- 工具欄 --> <header class="editor-toolbar" data-astro-cid-wr2tdydo> <div class="toolbar-left" data-astro-cid-wr2tdydo> <a href="/admin" class="back-btn" data-astro-cid-wr2tdydo>← 後台</a> <span class="page-title" id="pageTitle" data-astro-cid-wr2tdydo>載入中...</span> </div> <div class="toolbar-right" data-astro-cid-wr2tdydo> <button class="btn btn-secondary" onclick="addElement('h2')" data-astro-cid-wr2tdydo>➕ 標題</button> <button class="btn btn-secondary" onclick="addElement('p')" data-astro-cid-wr2tdydo>➕ 段落</button> <button class="btn btn-secondary" onclick="addElement('ul')" data-astro-cid-wr2tdydo>➕ 列表</button> <button class="btn btn-secondary" onclick="addElement('table')" data-astro-cid-wr2tdydo>➕ 表格</button> <button class="btn btn-save" onclick="savePage()" data-astro-cid-wr2tdydo>💾 儲存變更</button> </div> </header> <!-- 編輯區域 --> <div class="editor-container" data-astro-cid-wr2tdydo> <div class="editor-wrapper" id="editorArea" contenteditable="true" data-astro-cid-wr2tdydo></div> </div> <!-- 儲存成功提示 --> <div class="toast" id="toast" data-astro-cid-wr2tdydo>✅ 儲存成功！</div> </div> ${renderScript($$result2, "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/edit.astro?astro&type=script&index=0&lang.ts")} ` })} `;
}, "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/edit.astro", void 0);

const $$file = "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/edit.astro";
const $$url = "/admin/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
