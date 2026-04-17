import { c as createComponent } from './astro-component_DtgDE76K.mjs';
import 'piccolore';
import { L as renderTemplate, x as maybeRenderHead, a2 as addAttribute } from './sequence_D8ekMvs6.mjs';
import { r as renderComponent } from './entrypoint_CHgLRPWq.mjs';
import { $ as $$Layout } from './Layout_C2LtPF5i.mjs';
import { $ as $$Navigation } from './Navigation__mK9drz8.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const pages = [
    { id: "index", name: "首頁", href: "/" },
    { id: "about", name: "關於光禾", href: "/about" },
    { id: "admissions", name: "招生資訊", href: "/admissions" },
    { id: "curriculum", name: "教學圖像", href: "/curriculum" },
    { id: "activities", name: "活動集錦", href: "/activities" },
    { id: "newsletter", name: "光禾通訊", href: "/newsletter" },
    { id: "calendar", name: "行事曆", href: "/calendar" },
    { id: "finance", name: "財務公開", href: "/finance" },
    { id: "support", name: "支持光禾", href: "/support" },
    { id: "contact", name: "聯絡我們", href: "/contact" }
  ];
  const newsletterIssues = [
    { id: "36", title: "第36期", semester: "113秋冬", pages: 66 },
    { id: "35", title: "第35期", semester: "112秋冬", pages: 120 },
    { id: "34", title: "第34期", semester: "112冬春夏", pages: 100 }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "網站管理後台", "data-astro-cid-u2h3djql": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, { "data-astro-cid-u2h3djql": true })} ${maybeRenderHead()}<section class="hero-small" data-astro-cid-u2h3djql> <div class="container" data-astro-cid-u2h3djql> <h1 data-astro-cid-u2h3djql>網站管理後台</h1> <p data-astro-cid-u2h3djql>視覺化編輯網站內容</p> </div> </section> <section class="section" data-astro-cid-u2h3djql> <div class="container" data-astro-cid-u2h3djql> <div class="admin-grid" data-astro-cid-u2h3djql> <!-- 頁面編輯 --> <div class="admin-card" data-astro-cid-u2h3djql> <h3 data-astro-cid-u2h3djql>📄 頁面管理</h3> <p data-astro-cid-u2h3djql>點擊選擇要編輯的頁面</p> <div class="page-list" data-astro-cid-u2h3djql> ${pages.map((page) => renderTemplate`<a${addAttribute(`/admin/edit/${page.id}`, "href")} class="page-item" data-astro-cid-u2h3djql> <span class="page-name" data-astro-cid-u2h3djql>${page.name}</span> <span class="page-arrow" data-astro-cid-u2h3djql>→</span> </a>`)} </div> </div> <!-- 光禾通訊管理 --> <div class="admin-card highlight" data-astro-cid-u2h3djql> <h3 data-astro-cid-u2h3djql>📰 光禾通訊</h3> <p data-astro-cid-u2h3djql>上傳 PDF 並自動轉為 Flipbook</p> <div class="issue-list" data-astro-cid-u2h3djql> ${newsletterIssues.map((issue) => renderTemplate`<a${addAttribute(`/admin/newsletter/${issue.id}`, "href")} class="issue-item" data-astro-cid-u2h3djql> <span class="issue-title" data-astro-cid-u2h3djql>${issue.title}</span> <span class="issue-info" data-astro-cid-u2h3djql>${issue.semester} · ${issue.pages}頁</span> </a>`)} </div> <a href="/admin/newsletter/new" class="add-btn" data-astro-cid-u2h3djql>➕ 新增期數</a> </div> <!-- Decap CMS 進階編輯 --> <div class="admin-card highlight-cms" data-astro-cid-u2h3djql> <h3 data-astro-cid-u2h3djql>✏️ 進階內容編輯器</h3> <p data-astro-cid-u2h3djql>富文本編輯器，支援圖片、粗體、清單等格式。需要 GitHub 帳號登入。</p> <a href="/admin/index.html" class="action-btn" target="_blank" data-astro-cid-u2h3djql>開啟 Decap CMS</a> </div> <!-- 預覽 --> <div class="admin-card" data-astro-cid-u2h3djql> <h3 data-astro-cid-u2h3djql>👀 前台預覽</h3> <p data-astro-cid-u2h3djql>查看網站前台顯示效果</p> <a href="/" target="_blank" class="action-btn" data-astro-cid-u2h3djql>開啟新視窗</a> </div> <!-- 登出 --> <div class="admin-card" data-astro-cid-u2h3djql> <h3 data-astro-cid-u2h3djql>🔒 帳號</h3> <p data-astro-cid-u2h3djql>結束管理工作時請登出</p> <a href="/admin/logout" class="action-btn logout-btn" data-astro-cid-u2h3djql>登出</a> </div> </div> </div> </section> ` })}`;
}, "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/index.astro", void 0);

const $$file = "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
