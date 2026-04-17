import { c as createComponent } from './astro-component_DtgDE76K.mjs';
import 'piccolore';
import { L as renderTemplate, x as maybeRenderHead } from './sequence_D8ekMvs6.mjs';
import { r as renderComponent } from './entrypoint_CHgLRPWq.mjs';
import { $ as $$Layout } from './Layout_C2LtPF5i.mjs';
import { $ as $$Navigation } from './Navigation__mK9drz8.mjs';

const $$Visit = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "預約參訪 | 光禾華德福", "data-astro-cid-drawl2rl": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, { "data-astro-cid-drawl2rl": true })} ${maybeRenderHead()}<section class="hero-small" data-astro-cid-drawl2rl> <div class="container" data-astro-cid-drawl2rl> <h1 data-astro-cid-drawl2rl>預約參訪</h1> <p data-astro-cid-drawl2rl>走進光禾，認識華德福教育</p> </div> </section> <section class="section" data-astro-cid-drawl2rl> <div class="container" data-astro-cid-drawl2rl> <div class="intro" data-astro-cid-drawl2rl> <p data-astro-cid-drawl2rl>我們誠摯邀請您與孩子一同走進光禾華德福，體驗充滿生命力與節奏感的學習環境。</p> <p data-astro-cid-drawl2rl>請填寫以下表單，我們將有專人與您電話聯繫確認參訪時間。</p> </div> <div class="form-container" data-astro-cid-drawl2rl> <form class="visit-form" action="#" method="POST" data-astro-cid-drawl2rl> <div class="form-row" data-astro-cid-drawl2rl> <div class="form-group" data-astro-cid-drawl2rl> <label for="parentName" data-astro-cid-drawl2rl>家長姓名 <span class="required" data-astro-cid-drawl2rl>*</span></label> <input type="text" id="parentName" name="parentName" required placeholder="請輸入您的姓名" data-astro-cid-drawl2rl> </div> </div> <div class="form-row two-col" data-astro-cid-drawl2rl> <div class="form-group" data-astro-cid-drawl2rl> <label for="phone" data-astro-cid-drawl2rl>聯絡電話 <span class="required" data-astro-cid-drawl2rl>*</span></label> <input type="tel" id="phone" name="phone" required placeholder="0912-345-678" data-astro-cid-drawl2rl> </div> <div class="form-group" data-astro-cid-drawl2rl> <label for="email" data-astro-cid-drawl2rl>電子郵件 <span class="required" data-astro-cid-drawl2rl>*</span></label> <input type="email" id="email" name="email" required placeholder="example@email.com" data-astro-cid-drawl2rl> </div> </div> <div class="form-row" data-astro-cid-drawl2rl> <div class="form-group" data-astro-cid-drawl2rl> <label for="visitDate" data-astro-cid-drawl2rl>預計參訪日期及時間 <span class="required" data-astro-cid-drawl2rl>*</span></label> <input type="datetime-local" id="visitDate" name="visitDate" required data-astro-cid-drawl2rl> <p class="hint" data-astro-cid-drawl2rl>我們將有專人電話與您確認</p> </div> </div> <div class="form-row" data-astro-cid-drawl2rl> <div class="form-group" data-astro-cid-drawl2rl> <label for="childInfo" data-astro-cid-drawl2rl>您的孩子性別，目前就讀學校及就讀年級 <span class="required" data-astro-cid-drawl2rl>*</span></label> <input type="text" id="childInfo" name="childInfo" required placeholder="例如：男，高雄市XX國小，三年級" data-astro-cid-drawl2rl> </div> </div> <div class="form-row" data-astro-cid-drawl2rl> <div class="form-group" data-astro-cid-drawl2rl> <label for="message" data-astro-cid-drawl2rl>備註（欲了解資訊）</label> <textarea id="message" name="message" rows="3" placeholder="歡迎分享您想了解的資訊..." data-astro-cid-drawl2rl></textarea> </div> </div> <button type="submit" class="btn-submit" data-astro-cid-drawl2rl>送出申請</button> </form> </div> <div class="contact-info" data-astro-cid-drawl2rl> <h3 data-astro-cid-drawl2rl>其他聯繫方式</h3> <p data-astro-cid-drawl2rl>電話：07-7885128</p> <p data-astro-cid-drawl2rl>Email：waldorf.kh@gmail.com</p> </div> </div> </section> <footer class="footer" data-astro-cid-drawl2rl> <div class="container" data-astro-cid-drawl2rl> <p data-astro-cid-drawl2rl>© 2026 光禾華德福實驗學校. All rights reserved.</p> </div> </footer> ` })}`;
}, "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admissions/visit.astro", void 0);

const $$file = "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admissions/visit.astro";
const $$url = "/admissions/visit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Visit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
