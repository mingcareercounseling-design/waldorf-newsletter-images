import { c as createComponent } from './astro-component_DtgDE76K.mjs';
import 'piccolore';
import { L as renderTemplate, ba as defineScriptVars, a2 as addAttribute, x as maybeRenderHead } from './sequence_D8ekMvs6.mjs';
import { r as renderComponent } from './entrypoint_CHgLRPWq.mjs';
import { $ as $$Layout } from './Layout_C2LtPF5i.mjs';
import { $ as $$Navigation } from './Navigation__mK9drz8.mjs';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$FlipbookV2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$FlipbookV2;
  const { imageUrls, title = "光禾通訊", semester = "" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", '<div class="fb-wrapper" data-astro-cid-ix27ilic> <!-- Header --> <div class="fb-header" data-astro-cid-ix27ilic> <div class="fb-title" data-astro-cid-ix27ilic> <span class="fb-icon" data-astro-cid-ix27ilic>📖</span> <span data-astro-cid-ix27ilic>', "</span> ", ' </div> <div class="fb-controls" data-astro-cid-ix27ilic> <button class="fb-btn" id="fb-prev" data-astro-cid-ix27ilic>‹ 上一頁</button> <span class="fb-pageinfo" data-astro-cid-ix27ilic>\n第 <span id="fb-current" data-astro-cid-ix27ilic>1</span> 頁，共 <span id="fb-total" data-astro-cid-ix27ilic>', '</span> 頁\n</span> <button class="fb-btn" id="fb-next" data-astro-cid-ix27ilic>下一頁 ›</button> <button class="fb-btn fb-fullscreen-btn" id="fb-fullscreen" data-astro-cid-ix27ilic>⛶</button> </div> </div> <!-- Loading overlay --> <div class="fb-loading" id="fb-loading" data-astro-cid-ix27ilic> <div class="fb-spinner" data-astro-cid-ix27ilic></div> <p id="fb-loading-text" data-astro-cid-ix27ilic>正在載入...</p> </div> <!-- Book stage --> <div class="fb-stage" id="fb-stage" data-astro-cid-ix27ilic> <div class="fb-book" id="fb-book" data-astro-cid-ix27ilic></div> </div> <!-- Thumbnail strip --> <div class="fb-thumbs" id="fb-thumbs" data-astro-cid-ix27ilic> ', " ", ' </div> </div> <script src="https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js"><\/script> <script>(function(){', `
(function () {
  'use strict';

  let pageFlip = null;
  let isReady = false;
  let totalImages = imageUrls.length;
  let loadedCount = 0;

  const elLoading   = document.getElementById('fb-loading');
  const elLoadTxt   = document.getElementById('fb-loading-text');
  const elStage     = document.getElementById('fb-stage');
  const elBook      = document.getElementById('fb-book');
  const elCurrent   = document.getElementById('fb-current');
  const elPrev      = document.getElementById('fb-prev');
  const elNext      = document.getElementById('fb-next');
  const elFullscreen = document.getElementById('fb-fullscreen');
  const elThumbs    = document.querySelectorAll('.fb-thumb');

  // ── 預載圖片 ───────────────────────────────────
  function preloadImages(urls, onProgress, onDone) {
    const images = [];
    let done = 0;
    if (urls.length === 0) { onDone([]); return; }

    urls.forEach((url, i) => {
      const img = new Image();
      img.onload = img.onerror = function () {
        images[i] = img.complete && img.naturalWidth > 0 ? img : null;
        done++;
        onProgress(done, urls.length);
        if (done === urls.length) onDone(images);
      };
      img.src = url;
    });
  }

  // ── 初始化 ─────────────────────────────────────
  function init() {
    elLoading.style.display = 'flex';
    elStage.style.opacity   = '0';

    // 先載入前 4 張用來算尺寸，其餘背景載入
    const firstBatch = imageUrls.slice(0, 4);

    preloadImages(firstBatch,
      function (done, total) {
        elLoadTxt.textContent = '正在載入圖片 ' + done + ' / ' + totalImages + '...';
      },
      function (images) {
        // 計算書本尺寸
        const refImg = images.find(Boolean);
        if (!refImg) { showError('圖片載入失敗'); return; }

        buildFlipbook(refImg.naturalWidth, refImg.naturalHeight);

        // 繼續背景載入其餘圖片
        if (totalImages > 4) {
          preloadImages(imageUrls.slice(4),
            function (done) {
              loadedCount = 4 + done;
              elLoadTxt.textContent = '正在載入圖片 ' + loadedCount + ' / ' + totalImages + '...';
            },
            function () { /* all done */ }
          );
        }
      }
    );
  }

  // ── 建立 PageFlip ──────────────────────────────
  function buildFlipbook(imgW, imgH) {
    // 計算舞台可用尺寸
    const stageW = elStage.clientWidth || window.innerWidth;
    const maxBookW = Math.min(stageW - 20, 900);  // 雙頁寬上限 900px
    const pageW  = Math.floor(maxBookW / 2);
    const pageH  = Math.round(pageW * (imgH / imgW));

    // 清空舊內容
    elBook.innerHTML = '';

    // StPageFlip 設定
    pageFlip = new St.PageFlip(elBook, {
      width:  pageW,
      height: pageH,
      size:   'fixed',
      maxShadowOpacity: 0.6,
      showCover:   true,
      flippingTime: 700,
      mobileScrollSupport: false,
      swipeDistance: 20,
      useMouseEvents: true,
      autoSize: false,
    });

    // 用 HTML 頁面（img 標籤）載入，避免 canvas 記憶體問題
    const pageEls = imageUrls.map(function (url, i) {
      const div = document.createElement('div');
      div.className = 'fb-page-item';
      div.style.cssText = 'width:100%;height:100%;overflow:hidden;background:#fff;';
      const img = document.createElement('img');
      img.src   = url;
      img.alt   = '第 ' + (i + 1) + ' 頁';
      img.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block;';
      img.loading = i < 4 ? 'eager' : 'lazy';
      div.appendChild(img);
      return div;
    });

    pageFlip.loadFromHTML(pageEls);

    // 事件
    pageFlip.on('flip', function (e) {
      var page = e.data + 1;
      elCurrent.textContent = page;
      highlightThumb(e.data);
    });

    pageFlip.on('changeOrientation', function () {
      // 方向改變時更新顯示
    });

    // 隱藏 loading，顯示書
    elLoading.style.display = 'none';
    elStage.style.opacity   = '1';
    elStage.style.transition = 'opacity 0.4s';
    isReady = true;

    bindControls();
  }

  // ── 按鈕控制 ───────────────────────────────────
  function bindControls() {
    elPrev.onclick = function () {
      if (pageFlip) pageFlip.flipPrev('bottom');
    };
    elNext.onclick = function () {
      if (pageFlip) pageFlip.flipNext('bottom');
    };

    // 鍵盤
    document.addEventListener('keydown', function (e) {
      if (!isReady) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { pageFlip.flipNext('bottom'); e.preventDefault(); }
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { pageFlip.flipPrev('bottom'); e.preventDefault(); }
    });

    // 全螢幕（iOS Safari 不支援 requestFullscreen，改用 CSS 偽全螢幕）
    function enterPseudo() {
      const wrapper = document.querySelector('.fb-wrapper');
      wrapper.classList.add('fb-pseudo-fullscreen');
      document.body.style.overflow = 'hidden';
      elFullscreen.textContent = '✕';
    }
    function exitPseudo() {
      const wrapper = document.querySelector('.fb-wrapper');
      wrapper.classList.remove('fb-pseudo-fullscreen');
      document.body.style.overflow = '';
      elFullscreen.textContent = '⛶';
    }
    function isPseudo() {
      return document.querySelector('.fb-wrapper').classList.contains('fb-pseudo-fullscreen');
    }

    elFullscreen.onclick = function () {
      const wrapper = document.querySelector('.fb-wrapper');
      const nativeOk = !!(wrapper.requestFullscreen || wrapper.webkitRequestFullscreen);
      const inNative = !!(document.fullscreenElement || document.webkitFullscreenElement);

      if (nativeOk) {
        if (inNative) {
          (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        } else {
          (wrapper.requestFullscreen || wrapper.webkitRequestFullscreen).call(wrapper);
        }
      } else {
        // iOS Safari fallback
        isPseudo() ? exitPseudo() : enterPseudo();
      }
    };

    // 同步原生全螢幕按鈕文字
    document.addEventListener('fullscreenchange', function () {
      elFullscreen.textContent = document.fullscreenElement ? '✕' : '⛶';
    });
    document.addEventListener('webkitfullscreenchange', function () {
      elFullscreen.textContent = (document.fullscreenElement || document.webkitFullscreenElement) ? '✕' : '⛶';
    });

    // 縮圖點擊
    elThumbs.forEach(function (thumb) {
      thumb.onclick = function () {
        var page = parseInt(thumb.dataset.page, 10);
        if (pageFlip) pageFlip.flip(page);
      };
    });
  }

  // ── 高亮縮圖 ───────────────────────────────────
  function highlightThumb(pageIdx) {
    elThumbs.forEach(function (t) { t.classList.remove('fb-thumb-active'); });
    var active = document.querySelector('.fb-thumb[data-page="' + pageIdx + '"]');
    if (active) {
      active.classList.add('fb-thumb-active');
      active.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
    }
  }

  // ── 錯誤處理 ───────────────────────────────────
  function showError(msg) {
    elLoading.innerHTML = '<p style="color:#e74c3c;font-size:1.2rem;">⚠️ ' + msg + '</p>';
  }

  // ── 啟動 ───────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('astro:page-load', init);
})();
})();<\/script>`])), maybeRenderHead(), title, semester && renderTemplate`<span class="fb-semester" data-astro-cid-ix27ilic>${semester}</span>`, imageUrls.length, imageUrls.slice(0, 20).map((url, i) => renderTemplate`<img class="fb-thumb"${addAttribute(url, "src")}${addAttribute(`第 ${i + 1} 頁`, "alt")}${addAttribute(i, "data-page")} loading="lazy" data-astro-cid-ix27ilic>`), imageUrls.length > 20 && renderTemplate`<div class="fb-thumb-more" data-astro-cid-ix27ilic>+${imageUrls.length - 20} 頁</div>`, defineScriptVars({ imageUrls }));
}, "/Users/sam/.openclaw/workspace/waldorf-website/src/components/FlipbookV2.astro", void 0);

const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const CDN_BASE = "https://raw.githubusercontent.com/mingcareercounseling-design/waldorf-newsletter-images/main";
  const pngConfig = {
    "36": { count: 66, digits: 2 },
    "35": { count: 120, digits: 3 },
    "34": { count: 100, digits: 3 }
  };
  const data = {
    "36": { title: "第36期", semester: "113學年度 秋冬學季合輯", count: 66 },
    "35": { title: "第35期", semester: "112學年度 秋冬學季合輯", count: 120 },
    "34": { title: "第34期", semester: "112學年度 冬春夏學季合輯", count: 100 },
    "33": { title: "第33期", semester: "112學年度 春學季刊", count: 20 },
    "32": { title: "第32期", semester: "112學年度 夏學季刊", count: 20 },
    "31": { title: "第31期", semester: "111學年度 春學季刊", count: 18 },
    "30": { title: "第30期", semester: "110學年度 冬學季刊", count: 24 },
    "29": { title: "第29期", semester: "110學年度 秋學季刊", count: 30 },
    "28": { title: "第28期", semester: "110學年度 夏學季刊", count: 51 },
    "27": { title: "第27期", semester: "110學年度 春學季刊", count: 37 },
    "26": { title: "第26期", semester: "109學年度 夏學季刊", count: 52 },
    "24-25": { title: "光禾通訊24-25", semester: "113-114學年度合訂本", count: 52 },
    "23": { title: "第23期", semester: "109學年度 春學季刊", count: 65 }
  };
  const { id } = Astro2.params;
  const item = data[id];
  if (!item) {
    return Astro2.redirect("/newsletter");
  }
  const prefix = id === "24-25" ? "NO24-25" : "NO" + id;
  const pngInfo = pngConfig[id];
  const images = [];
  for (let i = 1; i <= item.count; i++) {
    if (pngInfo) {
      const numStr = i.toString().padStart(pngInfo.digits, "0");
      images.push(`${CDN_BASE}/${prefix}-${numStr}.png`);
    } else {
      const numStr = i.toString().padStart(2, "0");
      images.push(`${CDN_BASE}/${prefix}-${numStr}.jpg`);
    }
  }
  const { title, semester } = item;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${title} - 光禾通訊`, "data-astro-cid-pyvotnj4": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navigation", $$Navigation, { "data-astro-cid-pyvotnj4": true })} ${maybeRenderHead()}<section class="hero-small" data-astro-cid-pyvotnj4> <div class="container" data-astro-cid-pyvotnj4> <h1 data-astro-cid-pyvotnj4>光禾通訊</h1> <p data-astro-cid-pyvotnj4>每學季發行的校園通訊，記錄光禾的點點滴滴</p> </div> </section> <section class="section" data-astro-cid-pyvotnj4> <div class="container" data-astro-cid-pyvotnj4> <p class="intro" data-astro-cid-pyvotnj4>選擇一期開始閱讀</p> ${renderComponent($$result2, "FlipbookV2", $$FlipbookV2, { "imageUrls": images, "title": title, "semester": semester, "data-astro-cid-pyvotnj4": true })} <div class="issue-links" data-astro-cid-pyvotnj4> <p class="intro" style="margin-top: 2rem;" data-astro-cid-pyvotnj4>其他期數：</p> <div class="links-grid" data-astro-cid-pyvotnj4> ${["36", "35", "34", "33", "32", "31", "30", "29", "28", "27", "26", "24-25", "23"].filter((i) => i !== id).map((i) => renderTemplate`<a${addAttribute(`/newsletter/${i}`, "href")} data-astro-cid-pyvotnj4>${i === "24-25" ? "24-25期合訂" : `第${i}期`}</a>`)} </div> </div> </div> </section> ` })}`;
}, "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/newsletter/[id].astro", void 0);

const $$file = "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/newsletter/[id].astro";
const $$url = "/newsletter/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
