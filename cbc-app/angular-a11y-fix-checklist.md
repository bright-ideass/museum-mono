# Angular 專案無障礙修正工作清單

## 📊 總覽

- **總檔案數：** 6 個關鍵檔案
- **預計工作批次：** 3 批
- **預計完成時間：** 3 次對話

---

## 🔴 第一批：核心列表元件修正（最高優先級）

**影響範圍：** 所有列表頁面（生肖、主題套幣、紀念幣、流通券幣等）

### ✅ 待修正檔案

#### 1. exhibit-list.component.html
- **路徑：** `cbc-app/src/app/components/exhibit-list/exhibit-list.component.html`
- **問題：** 第 4 行，圖片 alt 與連結文字重複
- **修正：**
  ```html
  <!-- 修正前 -->
  <img [src]="data.ThumbnailImg" alt="{{data.ExhibitsName}}" class="img-fluid">

  <!-- 修正後 -->
  <img [src]="data.ThumbnailImg" alt="" class="img-fluid">
  ```
- **影響頁面：** 約 20 個列表頁

#### 2. product.component.html
- **路徑：** `cbc-app/src/app/modules/index/components/product/product.component.html`
- **問題：** 第 8 行，首頁商品列表圖片 alt 與 h6 重複
- **修正：**
  ```html
  <!-- 修正前 -->
  <img [src]="data.ThumbnailImg" [alt]="data.ExhibitsName" class="img-fluid">

  <!-- 修正後 -->
  <img [src]="data.ThumbnailImg" alt="" class="img-fluid">
  ```
- **影響頁面：** 首頁

**預計影響：** 🔴 **修正後立即解決 HM1240400C 類型問題**

### 🧪 第一批修正後測試 URL

修正完成後，請使用以下 URL 測試效果（使用 axe DevTools 或 WAVE 擴充套件）：

#### 測試列表頁（exhibit-list.component）
```
https://museum.4impact.cc/zh-tw/commemorate/zodiac-sign-first
https://museum.4impact.cc/zh-tw/commemorate/zodiac-sign-second
https://museum.4impact.cc/zh-tw/commemorate/theme-flower
https://museum.4impact.cc/zh-tw/commemorate/coin-national-celebration
https://museum.4impact.cc/zh-tw/circulation/banknote
https://museum.4impact.cc/zh-tw/circulation/currency
```

#### 測試首頁（product.component）
```
https://museum.4impact.cc/zh-tw
```

**檢測重點：**
- ✅ 列表中的圖片應該有 `alt=""`（空字串）
- ✅ 不應該再出現 HM1240400C 錯誤（圖片 alt 與連結文字重複）
- ✅ 螢幕閱讀器只會唸一次項目名稱（而非兩次）

---

## 🟡 第二批：Footer 與 Header 優化（中優先級）

**影響範圍：** 全站（每個頁面都有 footer 和 header）

### ✅ 待修正檔案

#### 3. footer.component.html
- **路徑：** `cbc-app/src/app/core/footer/footer.component.html`
- **問題：** 第 51 行，LOGO alt 不夠描述性
- **修正：**
  ```html
  <!-- 修正前 -->
  <img src="assets/img/ft_logo.png" alt="LOGO" class="img-fluid my-5">

  <!-- 修正後 -->
  <img src="assets/img/ft_logo.png" alt="中央銀行全球資訊網" class="img-fluid my-5">
  ```

#### 4. footer.component.ts
- **路徑：** `cbc-app/src/app/core/footer/footer.component.ts`
- **問題：** 缺少 offline-resources-1x 處理邏輯
- **修正：** 加入 ngAfterViewInit 方法
  ```typescript
  ngAfterViewInit() {
    // 處理 offline-resources 圖片
    const offlineImg = document.getElementById('offline-resources-1x');
    if (offlineImg && !offlineImg.hasAttribute('alt')) {
      offlineImg.setAttribute('alt', '');
    }
  }
  ```

#### 5. header.component.html
- **路徑：** `cbc-app/src/app/core/header/header.component.html`
- **問題：** 第 5 行，LOGO alt 不夠描述性
- **修正：**
  ```html
  <!-- 修正前 -->
  <img src="assets/img/logo.png" alt="LOGO" class="img-fluid">

  <!-- 修正後 -->
  <img src="assets/img/logo.png" alt="中央銀行券幣數位博物館" class="img-fluid">
  ```

**預計影響：** 🟡 **改善全站 LOGO 可及性，防禦 404 頁面問題**

### 🧪 第二批修正後測試 URL

修正完成後，請使用以下 URL 測試效果：

#### 測試任意頁面（所有頁面都有 footer 和 header）
```
https://museum.4impact.cc/zh-tw
https://museum.4impact.cc/zh-tw/commemorate/zodiac-sign-first
https://museum.4impact.cc/zh-tw/circulation/banknote
```

**檢測重點：**
- ✅ Header LOGO 的 alt 應該是「中央銀行券幣數位博物館」
- ✅ Footer LOGO 的 alt 應該是「中央銀行全球資訊網」
- ✅ 如果出現 offline-resources-1x 圖片，應該有 alt 屬性（空字串）
- ✅ 不應該出現「alt="LOGO"」這種不具描述性的文字

#### 測試 404 頁面（驗證 offline-resources 處理）
嘗試訪問不存在的頁面，檢查是否有圖片缺少 alt：
```
https://museum.4impact.cc/zh-tw/not-exist-page
```

---

## 🟢 第三批：詳細頁面輪播圖優化（低優先級，可選）

**影響範圍：** 所有詳細頁面（約 35 個 component）

### ✅ 待修正檔案（範例）

#### 6. 所有 *-detail.component.html
**需要修正的檔案列表：**
- zodiac-sign-first-detail.component.html
- zodiac-sign-second-detail.component.html
- zodiac-sign-third-detail.component.html
- theme-national-park-detail.component.html
- theme-aboriginal-detail.component.html
- theme-flower-detail.component.html
- theme-other-detail.component.html
- note-detail.component.html
- coin-national-celebration-detail.component.html
- coin-festival-detail.component.html
- coin-international-events-detail.component.html
- coin-special-memorial-detail.component.html
- medal-national-celebration-detail.component.html
- medal-festival-detail.component.html
- banknote-detail.component.html
- anniversary-detail.component.html
- currency-detail.component.html
- anniversary-currency-detail.component.html
- ... (約 35 個檔案)

**問題：** 輪播縮圖（slider-nav）的 alt 與主圖重複

**修正策略（批次處理）：**
```html
<!-- slider-for (主圖) - 保留 alt -->
<img [src]="img.imgSrc" alt="{{img.imgName}}-{{img.imgType}}" class="img-fluid">

<!-- slider-nav (縮圖) - 設為空 -->
<img [src]="img.imgSrc" alt="" class="img-fluid">
```

**預計影響：** 🟢 **優化詳細頁面體驗**

**注意：** 這批可以最後處理，或建立批次處理腳本

### 🧪 第三批修正後測試 URL

修正完成後，請使用以下 URL 測試詳細頁面的輪播效果：

#### 測試詳細頁面（需要資料 ID，以下為範例）
```
https://museum.4impact.cc/zh-tw/commemorate/zodiac-sign-first/1
https://museum.4impact.cc/zh-tw/commemorate/zodiac-sign-second/1
https://museum.4impact.cc/zh-tw/commemorate/theme-flower/1
https://museum.4impact.cc/zh-tw/commemorate/coin-national-celebration/1
https://museum.4impact.cc/zh-tw/circulation/banknote/1
```

**檢測重點：**
- ✅ 主圖輪播（slider-for）的圖片應該有描述性 alt
- ✅ 縮圖導航（slider-nav）的圖片 alt 應該為空字串
- ✅ 不應該有重複的 alt 描述

**注意：** 需要確認實際的資料 ID，可能是 `1`, `2`, `3` 等數字，或其他格式

---

## 📝 執行順序建議

### 第 1 次對話：修正第一批（核心列表元件）
```
請修正：
1. exhibit-list.component.html
2. product.component.html
```
**預計效果：** 立即解決所有列表頁的 HM1240400C 問題

---

### 第 2 次對話：修正第二批（Footer & Header）
```
請修正：
3. footer.component.html
4. footer.component.ts
5. header.component.html
```
**預計效果：** 改善全站 LOGO 描述，處理 offline-resources 問題

---

### 第 3 次對話：批次修正第三批（詳細頁面）
```
選項 A：手動逐一修正（約需要多次對話）
選項 B：建立批次處理腳本（推薦）
```
**預計效果：** 完善所有詳細頁面的輪播圖無障礙

---

## 🎯 快速開始命令

### 開始第一批修正
```
請幫我修正第一批的 2 個檔案：
1. exhibit-list.component.html
2. product.component.html
```

### 開始第二批修正
```
請幫我修正第二批的 3 個檔案：
3. footer.component.html
4. footer.component.ts
5. header.component.html
```

### 開始第三批修正
```
請幫我建立批次處理腳本來修正所有詳細頁面的 slider-nav 圖片 alt
```

---

## ✅ 檢查清單

- [ ] 第一批：核心列表元件修正完成
- [ ] 第二批：Footer & Header 修正完成
- [ ] 第三批：詳細頁面優化完成
- [ ] 執行 `npm run build` 確認編譯成功
- [ ] 本地測試無障礙檢測
- [ ] 部署到測試環境
- [ ] 使用 accessibility-test-urls-simple.txt 進行全站檢測

---

## 📊 預期成果

修正完成後，應該能解決：
- ✅ HM1240400C：圖文連結重複問題（100%）
- ✅ LOGO 描述性問題
- ✅ offline-resources 防禦性處理
- ✅ 詳細頁面輪播圖優化（選擇性）

---

## 💡 建議

1. **先執行第一批**，測試效果最明顯
2. **第二批可以合併執行**，檔案少且關聯性高
3. **第三批可以暫緩**，影響相對較小，可以視檢測結果決定

準備好了嗎？告訴我要開始哪一批！🚀
