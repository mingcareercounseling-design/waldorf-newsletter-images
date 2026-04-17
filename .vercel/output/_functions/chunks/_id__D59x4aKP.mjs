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
  const pageData = {
    "index": {
      title: "首頁",
      hero: { title: "光禾華德福實驗學校", subtitle: "讓孩子在自然中成長" },
      sections: ["班級樹苗", "最新消息", "招生資訊"]
    },
    "about": {
      title: "關於光禾",
      hero: { title: "關於我們", subtitle: "認識光禾華德福" },
      sections: ["願景", "成長故事", "經營團隊", "教職團隊"]
    },
    "admissions": {
      title: "招生資訊",
      hero: { title: "招生資訊", subtitle: "加入光禾大家庭" },
      sections: ["預約參訪", "招生簡章", "本校學費"]
    },
    "curriculum": {
      title: "教學圖像",
      hero: { title: "教學圖像", subtitle: "什麼是華德福教育" },
      sections: ["什麼是華德福", "各年段發展"]
    },
    "activities": {
      title: "活動集錦",
      hero: { title: "活動集錦", subtitle: "光禾的點點滴滴" },
      sections: ["四季慶典", "發表成果展"]
    },
    "newsletter": {
      title: "光禾通訊",
      hero: { title: "光禾通訊", subtitle: "每學季的紀錄" },
      sections: ["最新期數"]
    },
    "calendar": {
      title: "行事曆",
      hero: { title: "行事曆", subtitle: "光禾年度行事" }
    },
    "finance": {
      title: "財務公開",
      hero: { title: "財務公開", subtitle: "公開透明" }
    },
    "support": {
      title: "支持光禾",
      hero: { title: "支持光禾", subtitle: "感謝您的支持" }
    },
    "contact": {
      title: "聯絡我們",
      hero: { title: "聯絡我們", subtitle: "歡迎聯繫" }
    }
  };
  const page = pageData[id] || { title: id, sections: [] };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `編輯 ${page.title}`, "data-astro-cid-dtcqb6l3": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, { "data-astro-cid-dtcqb6l3": true })} ${maybeRenderHead()}<section class="hero-small" data-astro-cid-dtcqb6l3> <div class="container" data-astro-cid-dtcqb6l3> <h1 data-astro-cid-dtcqb6l3>編輯：${page.title}</h1> <a href="/admin" class="back-link" data-astro-cid-dtcqb6l3>← 返回後台</a> </div> </section> <section class="section" data-astro-cid-dtcqb6l3> <div class="container" data-astro-cid-dtcqb6l3> <div class="editor-layout" data-astro-cid-dtcqb6l3> <!-- 預覽區 --> <div class="preview-area" data-astro-cid-dtcqb6l3> <div class="preview-header" data-astro-cid-dtcqb6l3> <span data-astro-cid-dtcqb6l3>👀 預覽</span> <a${addAttribute(id === "index" ? "/" : `/${id}`, "href")} target="_blank" class="preview-link" data-astro-cid-dtcqb6l3>開新視窗</a> </div> <div class="preview-content" data-astro-cid-dtcqb6l3> <h2 data-astro-cid-dtcqb6l3>${page.hero?.title}</h2> <p data-astro-cid-dtcqb6l3>${page.hero?.subtitle}</p> </div> </div> <!-- 編輯區 --> <div class="edit-area" data-astro-cid-dtcqb6l3> <h3 data-astro-cid-dtcqb6l3>編輯內容區塊</h3> <div class="section-list" data-astro-cid-dtcqb6l3> ${(page.sections || []).map((section, i) => renderTemplate`<div class="section-item" data-astro-cid-dtcqb6l3> <span class="section-number" data-astro-cid-dtcqb6l3>${i + 1}</span> <span class="section-name" data-astro-cid-dtcqb6l3>${section}</span> <button class="edit-btn" data-astro-cid-dtcqb6l3>✏️ 編輯</button> </div>`)} <button class="add-section-btn" data-astro-cid-dtcqb6l3>➕ 新增區塊</button> </div> </div> </div> </div> </section> ` })}`;
}, "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/edit/[id].astro", void 0);

const $$file = "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/edit/[id].astro";
const $$url = "/admin/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
