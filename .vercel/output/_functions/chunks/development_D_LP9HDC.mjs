import { c as createComponent } from './astro-component_DtgDE76K.mjs';
import 'piccolore';
import { L as renderTemplate, x as maybeRenderHead } from './sequence_D8ekMvs6.mjs';
import { r as renderComponent } from './entrypoint_CHgLRPWq.mjs';
import { $ as $$Layout } from './Layout_C2LtPF5i.mjs';
import { $ as $$Navigation } from './Navigation__mK9drz8.mjs';

const $$Development = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "各年段發展圖像 | 光禾華德福", "data-astro-cid-yuswycl2": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, { "data-astro-cid-yuswycl2": true })} ${maybeRenderHead()}<section class="hero-small" data-astro-cid-yuswycl2> <div class="container" data-astro-cid-yuswycl2> <h1 data-astro-cid-yuswycl2>各年段發展圖像</h1> <p data-astro-cid-yuswycl2>華德福學校國小到高中的年段發展圖像</p> </div> </section> <section class="section" data-astro-cid-yuswycl2> <div class="container" data-astro-cid-yuswycl2> <div class="development-gallery" data-astro-cid-yuswycl2> <img src="/20230313-1_orig.jpg" alt="七年級發展圖像" data-astro-cid-yuswycl2> <img src="/20230313-2_orig.jpg" alt="八年級發展圖像" data-astro-cid-yuswycl2> <img src="/20230313-3_orig.jpg" alt="九年級發展圖像" data-astro-cid-yuswycl2> <img src="/20230313-4_orig.jpg" alt="十年級發展圖像" data-astro-cid-yuswycl2> <img src="/20230313-5_orig.jpg" alt="十一年級發展圖像" data-astro-cid-yuswycl2> <img src="/20230313-6_orig.jpg" alt="十二年級發展圖像" data-astro-cid-yuswycl2> <img src="/20230313-7_orig.jpg" alt="一至三年級發展圖像" data-astro-cid-yuswycl2> <img src="/20230313-8_orig.jpg" alt="四至五年級發展圖像" data-astro-cid-yuswycl2> <img src="/20230313-9_orig.jpg" alt="六至八年級發展圖像" data-astro-cid-yuswycl2> <img src="/20230313-10_orig.jpg" alt="國小階段發展圖像" data-astro-cid-yuswycl2> <img src="/20230313-11_orig.jpg" alt="國中階段發展圖像" data-astro-cid-yuswycl2> <img src="/20230313-12_orig.jpg" alt="高中階段發展圖像" data-astro-cid-yuswycl2> <img src="/20230313-13_orig.jpg" alt="完整發展圖像" data-astro-cid-yuswycl2> </div> </div> </section> <footer class="footer" data-astro-cid-yuswycl2> <div class="container" data-astro-cid-yuswycl2> <p data-astro-cid-yuswycl2>© 2026 光禾華德福實驗學校. All rights reserved.</p> </div> </footer> ` })}`;
}, "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/curriculum/development.astro", void 0);

const $$file = "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/curriculum/development.astro";
const $$url = "/curriculum/development";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Development,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
