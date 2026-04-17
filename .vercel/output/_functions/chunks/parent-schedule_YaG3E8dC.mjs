import { c as createComponent } from './astro-component_DtgDE76K.mjs';
import 'piccolore';
import { L as renderTemplate, x as maybeRenderHead } from './sequence_D8ekMvs6.mjs';
import { r as renderComponent } from './entrypoint_CHgLRPWq.mjs';
import { $ as $$Layout } from './Layout_C2LtPF5i.mjs';
import { $ as $$Navigation } from './Navigation__mK9drz8.mjs';

const $$ParentSchedule = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "家長社群參與年度時程表 | 光禾華德福", "data-astro-cid-3k6jwbpb": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, { "data-astro-cid-3k6jwbpb": true })} ${maybeRenderHead()}<section class="hero-small" data-astro-cid-3k6jwbpb> <div class="container" data-astro-cid-3k6jwbpb> <h1 data-astro-cid-3k6jwbpb>家長社群參與年度時程表</h1> <p data-astro-cid-3k6jwbpb>家長參與學校活動的年度規劃</p> </div> </section> <section class="section" data-astro-cid-3k6jwbpb> <div class="container" data-astro-cid-3k6jwbpb> <div class="schedule-section" data-astro-cid-3k6jwbpb> <h2 data-astro-cid-3k6jwbpb>全校性活動</h2> <ul data-astro-cid-3k6jwbpb> <li data-astro-cid-3k6jwbpb>年度活動</li> <li data-astro-cid-3k6jwbpb>三元社群活動</li> <li data-astro-cid-3k6jwbpb>每日活動</li> <li data-astro-cid-3k6jwbpb>其他不定期或定期活動</li> </ul> </div> <div class="schedule-section" data-astro-cid-3k6jwbpb> <h2 data-astro-cid-3k6jwbpb>班級性活動</h2> <p data-astro-cid-3k6jwbpb>各班級的家長參與活動</p> </div> </div> </section> <footer class="footer" data-astro-cid-3k6jwbpb> <div class="container" data-astro-cid-3k6jwbpb> <p data-astro-cid-3k6jwbpb>© 2026 光禾華德福實驗學校. All rights reserved.</p> </div> </footer> ` })}`;
}, "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/about/parent-schedule.astro", void 0);

const $$file = "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/about/parent-schedule.astro";
const $$url = "/about/parent-schedule";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ParentSchedule,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
