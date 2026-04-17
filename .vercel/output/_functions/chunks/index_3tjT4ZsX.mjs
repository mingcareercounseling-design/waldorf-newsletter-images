import { c as createComponent } from './astro-component_DtgDE76K.mjs';
import 'piccolore';
import { L as renderTemplate, x as maybeRenderHead, a2 as addAttribute } from './sequence_D8ekMvs6.mjs';
import { r as renderComponent } from './entrypoint_CHgLRPWq.mjs';
import { $ as $$Layout } from './Layout_C2LtPF5i.mjs';
import { $ as $$Navigation } from './Navigation__mK9drz8.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const CDN = "https://raw.githubusercontent.com/mingcareercounseling-design/waldorf-newsletter-images/main";
  const issues = [
    { id: "36", title: "第36期", semester: "113學年度 秋冬學季合輯", cover: `${CDN}/NO36-01.png` },
    { id: "35", title: "第35期", semester: "112學年度 秋冬學季合輯", cover: `${CDN}/NO35-001.png` },
    { id: "34", title: "第34期", semester: "112學年度 冬春夏學季合輯", cover: `${CDN}/NO34-001.png` },
    { id: "33", title: "第33期", semester: "112學年度 春學季刊", cover: `${CDN}/NO33-01.jpg` },
    { id: "32", title: "第32期", semester: "112學年度 夏學季刊", cover: `${CDN}/NO32-01.jpg` },
    { id: "31", title: "第31期", semester: "111學年度 春學季刊", cover: `${CDN}/NO31-01.jpg` },
    { id: "30", title: "第30期", semester: "110學年度 冬學季刊", cover: `${CDN}/NO30-01.jpg` },
    { id: "29", title: "第29期", semester: "110學年度 秋學季刊", cover: `${CDN}/NO29-01.jpg` },
    { id: "28", title: "第28期", semester: "110學年度 夏學季刊", cover: `${CDN}/NO28-01.jpg` },
    { id: "27", title: "第27期", semester: "110學年度 春學季刊", cover: `${CDN}/NO27-01.jpg` },
    { id: "26", title: "第26期", semester: "109學年度 夏學季刊", cover: `${CDN}/NO26-01.jpg` },
    { id: "24-25", title: "第24-25期", semester: "113-114學年度合訂本", cover: `${CDN}/NO24-25-01.jpg` },
    { id: "23", title: "第23期", semester: "109學年度 春學季刊", cover: `${CDN}/NO23-01.jpg` }
  ];
  const latest = issues[0];
  const rest = issues.slice(1);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "光禾通訊", "data-astro-cid-4ptckbda": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, { "data-astro-cid-4ptckbda": true })} ${maybeRenderHead()}<section class="hero" data-astro-cid-4ptckbda> <div class="container" data-astro-cid-4ptckbda> <h1 data-astro-cid-4ptckbda>📰 光禾通訊</h1> <p data-astro-cid-4ptckbda>光禾華德福實驗學校每學季發行的校園通訊，記錄光禾的點點滴滴</p> </div> </section> <section class="section" data-astro-cid-4ptckbda> <div class="container" data-astro-cid-4ptckbda> <!-- 最新一期：大卡片 --> <div class="latest-card" data-astro-cid-4ptckbda> <a${addAttribute(`/newsletter/${latest.id}`, "href")} class="latest-cover-link" data-astro-cid-4ptckbda> <img${addAttribute(latest.cover, "src")}${addAttribute(latest.title, "alt")} class="latest-cover" loading="eager" data-astro-cid-4ptckbda> <div class="latest-badge" data-astro-cid-4ptckbda>最新一期</div> </a> <div class="latest-info" data-astro-cid-4ptckbda> <h2 data-astro-cid-4ptckbda>${latest.title}</h2> <p class="semester" data-astro-cid-4ptckbda>${latest.semester}</p> <a${addAttribute(`/newsletter/${latest.id}`, "href")} class="read-btn" data-astro-cid-4ptckbda>📖 立即翻閱</a> </div> </div> <!-- 其他期數：格狀封面 --> <h3 class="section-title" data-astro-cid-4ptckbda>📚 過往期數</h3> <div class="issues-grid" data-astro-cid-4ptckbda> ${rest.map((issue) => renderTemplate`<a${addAttribute(`/newsletter/${issue.id}`, "href")} class="issue-card" data-astro-cid-4ptckbda> <div class="cover-wrap" data-astro-cid-4ptckbda> <img${addAttribute(issue.cover, "src")}${addAttribute(issue.title, "alt")} class="issue-cover" loading="lazy" data-astro-cid-4ptckbda> <div class="cover-overlay" data-astro-cid-4ptckbda> <span data-astro-cid-4ptckbda>📖 開始閱讀</span> </div> </div> <div class="issue-info" data-astro-cid-4ptckbda> <h4 data-astro-cid-4ptckbda>${issue.title}</h4> <p data-astro-cid-4ptckbda>${issue.semester}</p> </div> </a>`)} </div> </div> </section> ` })}`;
}, "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/newsletter/index.astro", void 0);

const $$file = "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/newsletter/index.astro";
const $$url = "/newsletter";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
