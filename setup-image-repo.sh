#!/bin/bash
# 光禾華德福電子報圖片 GitHub 託管設定腳本
# 執行前請確認已登入 GitHub CLI: gh auth login

set -e

REPO_NAME="waldorf-newsletter-images"
ORG="mingcareercounseling-design"
IMAGE_SRC="$(pwd)/public/newsletter/光禾通訊"
TEMP_DIR="/tmp/$REPO_NAME"

echo "🚀 開始設定圖片 repo..."

# 1. 建立 GitHub repo
echo "📦 建立 GitHub repo..."
gh repo create "$ORG/$REPO_NAME" --public --description "光禾華德福電子報圖片託管" || echo "Repo 可能已存在，繼續..."

# 2. 建立暫時目錄並初始化 git
echo "📁 準備圖片..."
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"
cd "$TEMP_DIR"
git init
git remote add origin "https://github.com/$ORG/$REPO_NAME.git"

# 3. 只複製圖片（不含 PDF/DOCX）
echo "🖼  複製 JPG 圖片..."
cp "$IMAGE_SRC"/NO*.jpg . 2>/dev/null && echo "JPG 複製完成" || echo "無 JPG 可複製"

echo "🖼  複製 PNG 圖片..."
cp "$IMAGE_SRC"/NO*.png . 2>/dev/null && echo "PNG 複製完成" || echo "無 PNG 可複製"

echo "🖼  複製 page-*.jpg 圖片..."
cp "$IMAGE_SRC"/page-*.jpg . 2>/dev/null && echo "page JPG 複製完成" || echo "無 page JPG 可複製"

# 4. 分批 commit（避免單次太大）
echo "📤 分批 commit 並推送..."

# 先加所有 JPG
git add NO*.jpg page-*.jpg 2>/dev/null || true
git diff --cached --quiet || git commit -m "Add JPG images (issues 23-30)"

# 再加 PNG（分三批：34, 35, 36）
for ISSUE in 34 35 36; do
  if ls NO${ISSUE}*.png 1>/dev/null 2>&1; then
    git add NO${ISSUE}*.png
    git commit -m "Add PNG images (issue $ISSUE)"
  fi
done

# 5. 推送到 GitHub
echo "☁️  推送到 GitHub..."
git push -u origin main

echo ""
echo "✅ 完成！圖片已上傳到："
echo "   https://github.com/$ORG/$REPO_NAME"
echo ""
echo "📌 CDN 網址格式："
echo "   https://raw.githubusercontent.com/$ORG/$REPO_NAME/main/NO36-01.jpg"
