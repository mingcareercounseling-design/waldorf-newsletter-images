# 光禾華德福網站後台使用說明

## 一、後台登入

網址：`https://your-site.vercel.app/admin`

預設密碼：`waldorf2026`

> ⚠️ 請在 Vercel 環境變數設定中修改為安全密碼（見第四節）

---

## 二、後台功能

### 2.1 管理儀表板（`/admin`）

登入後可看到管理儀表板，包含：
- **頁面管理**：快速跳轉至各頁面編輯器
- **光禾通訊**：管理通訊期數與翻頁效果
- **進階內容編輯器**：Decap CMS（支援富文本、圖片上傳）
- **前台預覽**：在新視窗開啟網站首頁
- **登出**：結束管理員工作階段

### 2.2 Decap CMS 進階編輯器

點擊儀表板上的「開啟 Decap CMS」按鈕，進入 Decap CMS 界面。

功能包括：
- ✅ 富文本編輯器（WYSIWYG，支援粗體、圖片、連結、清單）
- ✅ 新增/刪除最新消息
- ✅ 新增/刪除行事曆活動
- ✅ 新增/刪除師資介紹
- ✅ 新增/刪除通訊期數
- ✅ 編輯靜態頁面（首頁、關於、支持、聯絡）
- ✅ 圖片上傳（自動儲存至 `public/images/uploads/`）

**首次使用需設定 GitHub OAuth**（見第三節）

---

## 三、設定 GitHub OAuth（Decap CMS 必要步驟）

### 步驟一：建立 GitHub OAuth App

1. 登入 [GitHub](https://github.com)
2. 前往「Settings」→「Developer settings」→「OAuth Apps」→「New OAuth App」
3. 填入以下資料：
   - **Application name**：光禾華德福網站後台
   - **Homepage URL**：`https://your-site.vercel.app`
   - **Authorization callback URL**：`https://your-site.vercel.app/admin/`
4. 點擊「Register application」
5. 複製「Client ID」

### 步驟二：更新設定

開啟 `public/admin/config.yml`，將 `app_id` 改為您的 Client ID：

```yaml
backend:
  name: github
  repo: mingcareercounseling-design/waldorf-newsletter-images
  branch: main
  auth_type: pkce
  app_id: YOUR_CLIENT_ID_HERE   # ← 改這裡
```

### 步驟三：提交修改

將修改後的 `config.yml` 推送至 GitHub，Vercel 會自動重新部署。

---

## 四、Vercel 環境變數設定

在 Vercel 儀表板設定以下環境變數：

| 變數名稱 | 說明 | 範例 |
|----------|------|------|
| `ADMIN_PASSWORD` | 後台登入密碼（請修改）| `your-secure-password` |

**設定步驟：**
1. 前往 [Vercel 儀表板](https://vercel.com)
2. 選擇此專案 → Settings → Environment Variables
3. 新增變數並設定值
4. 重新部署（會自動觸發）

---

## 五、新增光禾通訊期數

### 方法一：透過 Decap CMS

1. 開啟 Decap CMS
2. 點擊「光禾通訊」→「New 光禾通訊」
3. 填入期數、標題、學期、圖片前綴路徑、總頁數
4. 點擊「Save」→ GitHub 自動更新 → Vercel 重新部署

### 方法二：直接編輯 JSON

在 `src/content/newsletters/` 目錄新增 JSON 檔案，格式如下：

```json
{
  "issue": 37,
  "title": "光禾通訊 第37期",
  "semester": "114春夏",
  "cover": "",
  "imagePrefix": "https://raw.githubusercontent.com/mingcareercounseling-design/waldorf-newsletter-images/main/NO37/NO37-",
  "pageCount": 50,
  "date": "2025-06-01"
}
```

> 圖片需先上傳至對應的 GitHub 倉庫路徑

---

## 六、新增最新消息

### 透過 Decap CMS

1. 開啟 Decap CMS → 點擊「最新消息」→「New 最新消息」
2. 填入標題、日期、內容（支援 Markdown 富文本）
3. 點擊「Save」

當修改推送至 GitHub，Vercel 會自動重新部署。通常在 **3-5 分鐘**內即可在前台看到更新。

---

## 七、本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置（驗證無錯誤）
npm run build
```

本地啟動 Decap CMS（需安裝 proxy）：
```bash
npx decap-server &
npm run dev
```

然後在 `public/admin/config.yml` 中暫時啟用 `local_backend: true`，不需要 GitHub OAuth 即可在本地測試 CMS。

---

## 八、技術架構

| 技術 | 版本 | 用途 |
|------|------|------|
| Astro | 6.x | 靜態網站框架 |
| TailwindCSS | 4.x | 樣式 |
| @astrojs/vercel | 最新 | Vercel SSR 適配器 |
| Decap CMS | 3.x | 後台內容管理 |
| FlipbookV2 | 自製 | 電子報翻頁效果 |

**內容儲存：** JSON 檔案在 `src/content/`，由 Decap CMS 透過 GitHub API 讀寫

**部署流程：** 編輯內容 → GitHub commit → Vercel 自動部署（約 3-5 分鐘）

---

*最後更新：2026-04-17*
