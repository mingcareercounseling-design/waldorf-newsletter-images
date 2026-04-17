import { c as createComponent } from './astro-component_DtgDE76K.mjs';
import 'piccolore';
import { L as renderTemplate, x as maybeRenderHead } from './sequence_D8ekMvs6.mjs';
import { r as renderComponent } from './entrypoint_CHgLRPWq.mjs';
import { $ as $$Layout } from './Layout_C2LtPF5i.mjs';
import { $ as $$Navigation } from './Navigation__mK9drz8.mjs';

const $$Calendar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "行事曆 | 光禾華德福", "data-astro-cid-sl2ubhge": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, { "data-astro-cid-sl2ubhge": true })} ${maybeRenderHead()}<section class="hero-small" data-astro-cid-sl2ubhge> <div class="container" data-astro-cid-sl2ubhge> <h1 data-astro-cid-sl2ubhge>行事曆</h1> <p data-astro-cid-sl2ubhge>光禾家長行事曆</p> </div> </section> <section class="section" data-astro-cid-sl2ubhge> <div class="container" data-astro-cid-sl2ubhge> <div class="calendar-intro" data-astro-cid-sl2ubhge> <p data-astro-cid-sl2ubhge>📅 114學年度 春學季</p> <p class="note" data-astro-cid-sl2ubhge>以下為Google行事曆，可以直接同步到您的 Google 行事曆</p> <a href="https://calendar.google.com/calendar/r?cid=YOUR_CALENDAR_ID" target="_blank" class="btn-add" data-astro-cid-sl2ubhge>
➕ 加入 Google 行事曆
</a> </div> <!-- Google Calendar Embed --> <div class="calendar-embed" data-astro-cid-sl2ubhge> <iframe src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=Asia/Taipei" style="border: 0" width="100%" height="600" frameborder="0" scrolling="no" data-astro-cid-sl2ubhge>
        </iframe> </div> <div class="month-section" data-astro-cid-sl2ubhge> <h2 class="month-title" data-astro-cid-sl2ubhge>🌸 三月 2026</h2> <div class="event-list" data-astro-cid-sl2ubhge> <div class="event-item" data-astro-cid-sl2ubhge> <div class="event-date" data-astro-cid-sl2ubhge> <span class="day" data-astro-cid-sl2ubhge>3-4</span> <span class="week" data-astro-cid-sl2ubhge>週二-三</span> </div> <div class="event-content" data-astro-cid-sl2ubhge> <h3 data-astro-cid-sl2ubhge>G9茉莉班第三次會考模擬考</h3> </div> </div> <div class="event-item highlight" data-astro-cid-sl2ubhge> <div class="event-date" data-astro-cid-sl2ubhge> <span class="day" data-astro-cid-sl2ubhge>14</span> <span class="week" data-astro-cid-sl2ubhge>週六</span> </div> <div class="event-content" data-astro-cid-sl2ubhge> <h3 data-astro-cid-sl2ubhge>114春季聯合班親會</h3> </div> </div> <div class="event-item highlight" data-astro-cid-sl2ubhge> <div class="event-date" data-astro-cid-sl2ubhge> <span class="day" data-astro-cid-sl2ubhge>21</span> <span class="week" data-astro-cid-sl2ubhge>週六</span> </div> <div class="event-content" data-astro-cid-sl2ubhge> <h3 data-astro-cid-sl2ubhge>115學年度春季招生說明會</h3> </div> </div> <div class="event-item highlight" data-astro-cid-sl2ubhge> <div class="event-date" data-astro-cid-sl2ubhge> <span class="day" data-astro-cid-sl2ubhge>28</span> <span class="week" data-astro-cid-sl2ubhge>週六</span> </div> <div class="event-content" data-astro-cid-sl2ubhge> <h3 data-astro-cid-sl2ubhge>114春季慶典暨校慶</h3> </div> </div> <div class="event-item holiday" data-astro-cid-sl2ubhge> <div class="event-date" data-astro-cid-sl2ubhge> <span class="day" data-astro-cid-sl2ubhge>3</span> <span class="week" data-astro-cid-sl2ubhge>週五</span> </div> <div class="event-content" data-astro-cid-sl2ubhge> <h3 data-astro-cid-sl2ubhge>清明節連假開始</h3> </div> </div> </div> </div> <div class="note" data-astro-cid-sl2ubhge> <p data-astro-cid-sl2ubhge>📌 以上時間僅供參考，實際活動日期請以學校公告為主。</p> <p data-astro-cid-sl2ubhge>如有疑問，請致電 07-7885128 詢問。</p> </div> </div> </section> <footer class="footer" data-astro-cid-sl2ubhge> <div class="container" data-astro-cid-sl2ubhge> <p data-astro-cid-sl2ubhge>© 2026 光禾華德福實驗學校. All rights reserved.</p> </div> </footer> ` })}`;
}, "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/calendar.astro", void 0);

const $$file = "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/calendar.astro";
const $$url = "/calendar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Calendar,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
