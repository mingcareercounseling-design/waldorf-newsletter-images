import { c as createComponent } from './astro-component_DtgDE76K.mjs';
import 'piccolore';
import { x as maybeRenderHead, a2 as addAttribute, L as renderTemplate } from './sequence_D8ekMvs6.mjs';
import 'clsx';
import { r as renderScript } from './Layout_C2LtPF5i.mjs';

const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const navItems = [
    { name: "首頁", href: "/" },
    { name: "關於光禾", href: "/about", submenu: [
      { name: "願景", href: "/about/vision" },
      { name: "成長故事", href: "/about/history" },
      { name: "經營團隊", href: "/about/team" },
      { name: "社團法人", href: "/about/association" },
      { name: "教職團隊", href: "/about/teachers" },
      { name: "家長會", href: "/about/parents" },
      { name: "華德福名錄", href: "/about/waldorf-list" }
    ] },
    { name: "招生資訊", href: "/admissions", submenu: [
      { name: "預約參訪", href: "/admissions/visit" },
      { name: "入學申請", href: "/admissions/apply" },
      { name: "招生簡章", href: "/admissions/guide" },
      { name: "招生Q&A", href: "/admissions/faq" },
      { name: "招生說明會", href: "/admissions/seminar" },
      { name: "本校學費", href: "/admissions/tuition" },
      { name: "收退費辦法", href: "/admissions/refund" },
      { name: "轉出流程", href: "/admissions/transfer-out" },
      { name: "交通資訊", href: "/admissions/transportation" }
    ] },
    { name: "教學圖像", href: "/curriculum", submenu: [
      { name: "什麼是華德福", href: "/curriculum/whatis" },
      { name: "華德福QA大集合", href: "/curriculum/qa" },
      { name: "各年段發展圖像", href: "/curriculum/development" },
      { name: "小學部主副課程介紹", href: "/curriculum/elementary-courses" },
      { name: "教學正常化", href: "/curriculum/normalization" }
    ] },
    { name: "活動集錦", submenu: [
      { name: "四季慶典", href: "/activities/seasons" },
      { name: "發表暨成果展", href: "/activities/achievement" },
      { name: "心得分享", href: "/activities/experience" },
      { name: "講座研習", href: "/activities/seminars" },
      { name: "花絮剪影", href: "/activities/highlights" }
    ] },
    { name: "光禾通訊", href: "/newsletter" },
    { name: "行事曆", href: "/calendar" },
    { name: "財務公開", href: "/finance" },
    { name: "支持光禾", href: "/support" },
    { name: "聯絡我們", href: "/contact" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="header" data-astro-cid-pux6a34n> <div class="container" data-astro-cid-pux6a34n> <a href="/" class="logo" data-astro-cid-pux6a34n> <img src="/images/brand/logo2.png" alt="光禾華德福" class="logo-img" data-astro-cid-pux6a34n> </a> <button class="nav-toggle" id="nav-toggle-btn" data-astro-cid-pux6a34n>☰</button> <nav class="nav" data-astro-cid-pux6a34n> ${navItems.map((item) => renderTemplate`<div class="nav-item" data-astro-cid-pux6a34n> <a${addAttribute(item.href, "href")} class="nav-link" data-astro-cid-pux6a34n>${item.name}</a> ${item.submenu && renderTemplate`<div class="submenu" data-astro-cid-pux6a34n> ${item.submenu.map((sub) => renderTemplate`<a${addAttribute(sub.href, "href")} class="submenu-link" data-astro-cid-pux6a34n>${sub.name}</a>`)} </div>`} </div>`)} </nav> </div> </header>  ${renderScript($$result, "/Users/sam/.openclaw/workspace/waldorf-website/src/components/Navigation.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/sam/.openclaw/workspace/waldorf-website/src/components/Navigation.astro", void 0);

export { $$Navigation as $ };
