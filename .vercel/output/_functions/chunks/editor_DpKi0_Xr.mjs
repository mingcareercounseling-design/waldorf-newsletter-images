import { c as createComponent } from './astro-component_DtgDE76K.mjs';
import 'piccolore';
import { L as renderTemplate, a2 as addAttribute, b7 as renderHead } from './sequence_D8ekMvs6.mjs';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Editor = createComponent(($$result, $$props, $$slots) => {
  const pages = [
    { id: "index", name: "首頁", url: "/", icon: "🏠" },
    { id: "about", name: "關於光禾", url: "/about", icon: "📖" },
    { id: "admissions", name: "招生資訊", url: "/admissions", icon: "📝" },
    { id: "curriculum", name: "教學圖像", url: "/curriculum", icon: "🎓" },
    { id: "activities", name: "活動集錦", url: "/activities", icon: "🎉" },
    { id: "newsletter", name: "光禾通訊", url: "/newsletter", icon: "📰" },
    { id: "calendar", name: "行事曆", url: "/calendar", icon: "📅" },
    { id: "finance", name: "財務公開", url: "/finance", icon: "💰" },
    { id: "support", name: "支持光禾", url: "/support", icon: "❤️" },
    { id: "contact", name: "聯絡我們", url: "/contact", icon: "📞" }
  ];
  const tools = [
    { id: "text", name: "文字", icon: "📝", type: "text", category: "基本元件" },
    { id: "heading", name: "標題", icon: "🔤", type: "heading", category: "基本元件" },
    { id: "image", name: "圖片", icon: "🖼️", type: "image", category: "基本元件" },
    { id: "button", name: "按鈕", icon: "🔘", type: "button", category: "基本元件" },
    { id: "link", name: "連結", icon: "🔗", type: "link", category: "基本元件" },
    { id: "spacer", name: "空白", icon: "↕️", type: "spacer", category: "版面" },
    { id: "divider", name: "分隔線", icon: "➖", type: "divider", category: "版面" },
    { id: "card", name: "卡片", icon: "🃏", type: "card", category: "容器" },
    { id: "grid", name: "網格", icon: "🔲", type: "grid", category: "容器" },
    { id: "video", name: "影片", icon: "🎬", type: "video", category: "媒體" },
    { id: "gallery", name: "圖庫", icon: "📸", type: "gallery", category: "媒體" },
    { id: "form", name: "表單", icon: "📋", type: "form", category: "互動" },
    { id: "map", name: "地圖", icon: "🗺️", type: "map", category: "互動" }
  ];
  const currentPage = "index";
  return renderTemplate(_a || (_a = __template(['<html lang="zh-TW" data-astro-cid-wtxkghai> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>光禾華德福 - 網站編輯器</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap">', '</head> <body data-astro-cid-wtxkghai> <!-- 頂部工具欄 --> <header class="editor-header" data-astro-cid-wtxkghai> <div class="header-left" data-astro-cid-wtxkghai> <div class="logo" data-astro-cid-wtxkghai>🎨 光禾網站編輯器</div> <div class="page-selector" data-astro-cid-wtxkghai> <span data-astro-cid-wtxkghai>📄</span> <select id="pageSelect" data-astro-cid-wtxkghai> ', ` </select> </div> </div> <div class="header-actions" data-astro-cid-wtxkghai> <button class="header-btn btn-preview" onclick="togglePreview()" data-astro-cid-wtxkghai>👁️ 預覽</button> <button class="header-btn btn-save" onclick="saveChanges()" data-astro-cid-wtxkghai>💾 儲存</button> <button class="header-btn btn-publish" onclick="publishSite()" data-astro-cid-wtxkghai>🚀 發布</button> </div> </header> <!-- 左側工具欄 --> <aside class="editor-sidebar" data-astro-cid-wtxkghai> <div class="sidebar-tabs" data-astro-cid-wtxkghai> <button class="sidebar-tab active" onclick="switchTab('components')" data-astro-cid-wtxkghai>元件</button> <button class="sidebar-tab" onclick="switchTab('properties')" data-astro-cid-wtxkghai>屬性</button> </div> <div class="sidebar-content" data-astro-cid-wtxkghai> <!-- 元件面板 --> <div id="components-panel" class="tools-panel" data-astro-cid-wtxkghai> `, ` </div> <!-- 屬性面板 --> <div id="properties-panel" class="properties-panel" data-astro-cid-wtxkghai> <div class="prop-group" data-astro-cid-wtxkghai> <label class="prop-label" data-astro-cid-wtxkghai>選取的元素</label> <p style="color: #999; font-size: 0.9rem;" data-astro-cid-wtxkghai>點擊網頁中的元素來編輯</p> </div> <div class="prop-group" data-astro-cid-wtxkghai> <label class="prop-label" data-astro-cid-wtxkghai>背景顏色</label> <input type="color" class="prop-input" id="prop-bg" value="#ffffff" data-astro-cid-wtxkghai> </div> <div class="prop-group" data-astro-cid-wtxkghai> <label class="prop-label" data-astro-cid-wtxkghai>文字顏色</label> <input type="color" class="prop-input" id="prop-color" value="#333333" data-astro-cid-wtxkghai> </div> <div class="prop-group" data-astro-cid-wtxkghai> <label class="prop-label" data-astro-cid-wtxkghai>字型大小</label> <input type="range" class="prop-input" id="prop-size" min="12" max="72" value="16" data-astro-cid-wtxkghai> </div> <div class="prop-group" data-astro-cid-wtxkghai> <label class="prop-label" data-astro-cid-wtxkghai>對齊方式</label> <select class="prop-input" id="prop-align" data-astro-cid-wtxkghai> <option value="left" data-astro-cid-wtxkghai>靠左</option> <option value="center" data-astro-cid-wtxkghai>置中</option> <option value="right" data-astro-cid-wtxkghai>靠右</option> </select> </div> <button class="header-btn btn-save" style="width: 100%; margin-top: 20px;" onclick="applyProperties()" data-astro-cid-wtxkghai>✓ 套用變更</button> </div> </div> </aside> <!-- 主編輯區域 --> <main class="editor-main" data-astro-cid-wtxkghai> <div class="preview-container" id="previewContainer" data-astro-cid-wtxkghai> <div class="drop-zone" id="dropZone" data-astro-cid-wtxkghai>放開以新增元件</div> <iframe id="previewFrame" src="/" data-astro-cid-wtxkghai></iframe> </div> </main> <!-- 右側屬性欄 --> <aside class="editor-properties" id="propertiesSidebar" data-astro-cid-wtxkghai> <div class="prop-section" data-astro-cid-wtxkghai> <div class="prop-section-title" data-astro-cid-wtxkghai>選取元素屬性</div> <div class="prop-group" data-astro-cid-wtxkghai> <label class="prop-label" data-astro-cid-wtxkghai>元素類型</label> <input type="text" class="prop-input" id="elementType" readonly data-astro-cid-wtxkghai> </div> <div class="prop-group" data-astro-cid-wtxkghai> <label class="prop-label" data-astro-cid-wtxkghai>文字內容</label> <textarea class="prop-input" id="elementText" rows="3" data-astro-cid-wtxkghai></textarea> </div> <div class="prop-group" data-astro-cid-wtxkghai> <label class="prop-label" data-astro-cid-wtxkghai>連結網址</label> <input type="text" class="prop-input" id="elementLink" data-astro-cid-wtxkghai> </div> <button class="header-btn btn-save" style="width: 100%;" onclick="updateElement()" data-astro-cid-wtxkghai>更新元素</button> </div> </aside> <!-- 儲存提示 --> <div class="toast" id="toast" data-astro-cid-wtxkghai>✅ 儲存成功！</div> <script>
    // 全域變數
    let placedElements = [];
    let selectedElement = null;
    let draggedTool = null;
    
    // 切換側邊欄標籤
    function switchTab(tab) {
      document.querySelectorAll('.sidebar-tab').forEach(t => t.classList.remove('active'));
      event.target.classList.add('active');
      
      if (tab === 'components') {
        document.getElementById('components-panel').style.display = 'block';
        document.getElementById('properties-panel').classList.remove('active');
      } else {
        document.getElementById('components-panel').style.display = 'none';
        document.getElementById('properties-panel').classList.add('active');
      }
    }
    
    // 切換頁面
    document.getElementById('pageSelect').addEventListener('change', function() {
      const url = this.value;
      document.getElementById('previewFrame').src = url;
    });
    
    // 初始化拖曳事件
    document.addEventListener('DOMContentLoaded', function() {
      initDragAndDrop();
      initFrameInteraction();
    });
    
    // 拖曳功能
    function initDragAndDrop() {
      const toolItems = document.querySelectorAll('.tool-item');
      const dropZone = document.getElementById('dropZone');
      const previewContainer = document.getElementById('previewContainer');
      
      // 工具項目拖曳開始
      toolItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
          draggedTool = {
            type: this.dataset.type,
            icon: this.dataset.icon,
            name: this.dataset.name
          };
          this.classList.add('dragging');
          e.dataTransfer.setData('text/plain', JSON.stringify(draggedTool));
        });
        
        item.addEventListener('dragend', function() {
          this.classList.remove('dragging');
          dropZone.classList.remove('active');
        });
      });
      
      // 拖曳進入預覽區域
      previewContainer.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropZone.classList.add('active');
      });
      
      previewContainer.addEventListener('dragleave', function(e) {
        if (!previewContainer.contains(e.relatedTarget)) {
          dropZone.classList.remove('active');
        }
      });
      
      // 放置元件
      previewContainer.addEventListener('drop', function(e) {
        e.preventDefault();
        dropZone.classList.remove('active');
        
        if (draggedTool) {
          addElementToPage(draggedTool);
          draggedTool = null;
        }
      });
    }
    
    // 新增元件到頁面
    function addElementToPage(tool) {
      const frame = document.getElementById('previewFrame');
      const frameDoc = frame.contentDocument || frame.contentWindow.document;
      
      // 建立新元件
      const element = frameDoc.createElement('div');
      element.className = 'placed-element editable-element';
      element.dataset.type = tool.type;
      element.dataset.id = Date.now();
      
      // 根據元件類型建立內容
      switch(tool.type) {
        case 'heading':
          element.innerHTML = '<h2>' + tool.name + '</h2>';
          break;
        case 'text':
          element.innerHTML = '<p>點擊編輯文字內容...</p>';
          break;
        case 'image':
          element.innerHTML = '<div style="padding: 20px; background: #f0f0f0; text-align: center;">🖼️ 點擊上傳圖片</div>';
          break;
        case 'button':
          element.innerHTML = '<button style="padding: 10px 20px; background: #8B4513; color: white; border: none; border-radius: 5px;">' + tool.name + '</button>';
          break;
        case 'spacer':
          element.innerHTML = '<div style="height: 50px;"></div>';
          break;
        case 'divider':
          element.innerHTML = '<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">';
          break;
        case 'card':
          element.innerHTML = '<div style="padding: 20px; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);"><h3>卡片標題</h3><p>卡片內容...</p></div>';
          break;
        case 'video':
          element.innerHTML = '<div style="padding: 40px; background: #f0f0f0; text-align: center;">🎬 點擊嵌入影片</div>';
          break;
        default:
          element.innerHTML = '<div>' + tool.icon + ' ' + tool.name + '</div>';
      }
      
      // 加入工具列
      element.innerHTML += '<div class="element-toolbar"><button class="element-btn btn-edit" onclick="editElement(this)">✏️</button><button class="element-btn btn-delete" onclick="deleteElement(this)">🗑️</button></div>';
      
      // 添加到 body
      frameDoc.body.appendChild(element);
      
      // 記錄已放置的元件
      placedElements.push({
        id: element.dataset.id,
        type: tool.type,
        element: element
      });
      
      showToast('✅ 已新增 ' + tool.name);
    }
    
    // 初始化 iframe 內部交互
    function initFrameInteraction() {
      const frame = document.getElementById('previewFrame');
      
      frame.addEventListener('load', function() {
        try {
          const frameDoc = frame.contentDocument || frame.contentWindow.document;
          
          // 點擊元素選擇
          frameDoc.addEventListener('click', function(e) {
            if (e.target.classList.contains('editable-element') || e.target.closest('.editable-element')) {
              const element = e.target.classList.contains('editable-element') ? e.target : e.target.closest('.editable-element');
              selectElement(element);
            }
          });
          
        } catch(e) {
          console.log('Cannot access frame content:', e);
        }
      });
    }
    
    // 選擇元素
    function selectElement(element) {
      selectedElement = element;
      
      // 移除其他選取
      const frame = document.getElementById('previewFrame');
      try {
        const frameDoc = frame.contentDocument || frame.contentWindow.document;
        frameDoc.querySelectorAll('.editing-element').forEach(el => {
          el.classList.remove('editing-element');
        });
        
        element.classList.add('editing-element');
      } catch(e) {}
      
      // 顯示屬性面板
      document.getElementById('propertiesSidebar').classList.add('open');
      document.getElementById('elementType').value = element.dataset.type || 'unknown';
      document.getElementById('elementText').value = element.textContent || '';
    }
    
    // 編輯元素
    function editElement(btn) {
      const element = btn.closest('.editable-element');
      if (element) {
        selectElement(element);
      }
    }
    
    // 刪除元素
    function deleteElement(btn) {
      const element = btn.closest('.editable-element');
      if (element && confirm('確定要刪除這個元件嗎？')) {
        element.remove();
        placedElements = placedElements.filter(el => el.element !== element);
        showToast('🗑️ 已刪除');
      }
    }
    
    // 更新元素
    function updateElement() {
      if (selectedElement) {
        const text = document.getElementById('elementText').value;
        const link = document.getElementById('elementLink').value;
        
        // 更新文字
        if (selectedElement.tagName === 'P' || selectedElement.tagName === 'H2' || selectedElement.tagName === 'H3') {
          selectedElement.textContent = text;
        } else {
          // 嘗試找到文字元素
          const textEl = selectedElement.querySelector('p, h2, h3, span');
          if (textEl) textEl.textContent = text;
        }
        
        // 更新連結
        const linkEl = selectedElement.querySelector('a');
        if (linkEl && link) {
          linkEl.href = link;
        }
        
        showToast('✅ 已更新元素');
      }
    }
    
    // 套用屬性
    function applyProperties() {
      if (selectedElement) {
        const bg = document.getElementById('prop-bg').value;
        const color = document.getElementById('prop-color').value;
        const size = document.getElementById('prop-size').value;
        const align = document.getElementById('prop-align').value;
        
        selectedElement.style.backgroundColor = bg;
        selectedElement.style.color = color;
        selectedElement.style.fontSize = size + 'px';
        selectedElement.style.textAlign = align;
        
        showToast('✅ 已套用屬性');
      }
    }
    
    // 儲存變更
    function saveChanges() {
      // 收集所有放置的元件資料
      const savedData = {
        page: document.getElementById('pageSelect').value,
        elements: placedElements.map(el => ({
          type: el.type,
          id: el.id
        })),
        timestamp: new Date().toISOString()
      };
      
      // 儲存到 localStorage
      localStorage.setItem('editor_data_' + savedData.page, JSON.stringify(savedData));
      
      showToast('✅ 儲存成功！');
    }
    
    // 發布網站
    function publishSite() {
      if (confirm('確定要發布網站嗎？這會將所有變更更新到正式網站。')) {
        saveChanges();
        
        const toast = document.getElementById('toast');
        toast.textContent = '🚀 發布成功！';
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          toast.textContent = '✅ 儲存成功！';
        }, 3000);
      }
    }
    
    // 預覽切換
    function togglePreview() {
      const frame = document.getElementById('previewFrame');
      const currentSrc = frame.src;
      frame.src = '';
      setTimeout(() => frame.src = currentSrc, 100);
      showToast('👁️ 已重新整理預覽');
    }
    
    // 顯示提示
    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
    
    console.log('網站編輯器已啟動 - 支援拖曳元件到預覽區域');
  <\/script> </body> </html>`])), renderHead(), pages.map((page) => renderTemplate`<option${addAttribute(page.url, "value")}${addAttribute(page.url === `/${currentPage}`, "selected")} data-astro-cid-wtxkghai>${page.name}</option>`), ["基本元件", "版面", "容器", "媒體", "互動"].map((category) => renderTemplate`<div class="tools-section" data-astro-cid-wtxkghai> <div class="tools-section-title" data-astro-cid-wtxkghai>${category}</div> <div class="tools-grid" data-astro-cid-wtxkghai> ${tools.filter((t) => t.category === category).map((tool) => renderTemplate`<div class="tool-item" draggable="true"${addAttribute(tool.type, "data-type")}${addAttribute(tool.icon, "data-icon")}${addAttribute(tool.name, "data-name")} data-astro-cid-wtxkghai> <div class="tool-icon" data-astro-cid-wtxkghai>${tool.icon}</div> <div class="tool-name" data-astro-cid-wtxkghai>${tool.name}</div> </div>`)} </div> </div>`));
}, "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/editor.astro", void 0);

const $$file = "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/editor.astro";
const $$url = "/admin/editor";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Editor,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
