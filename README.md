# Museum Mono - 中央銀行券幣數位博物館

> Monorepo 整合前台、後台、API 伺服器

## 專案結構

```
museum-mono/
├── backend/          # Angular 管理後台 (Admin Dashboard)
├── cbc-app/          # Angular 前台網站 (無障礙 AA 版本)
├── server/           # NestJS 後端 API
└── README.md
```

## 各專案說明

### backend/ - 管理後台
- **技術棧**: Angular
- **功能**: Banner、新聞、展品、FAQ 等內容管理
- **Port**: 4200

### cbc-app/ - 前台網站
- **技術棧**: Angular 8
- **功能**: 券幣博物館公開網站
- **版本**: `2025-12-23-AA-without-3-pages` (無障礙 AA 認證版)
- **Port**: 5002
- **備註**: 已移除兒童版、虛擬展覽館、典藏寶庫（這些移至 [cbc-gallery](https://github.com/bright-ideass/cbc-gallery)）

### server/ - 後端 API
- **技術棧**: NestJS + TypeORM + MSSQL
- **功能**: RESTful API 服務
- **Port**: 3000

## 環境需求

- Node.js 14.x (Angular 8 不相容 Node 17+)
- npm
- MSSQL Server

## 快速開始

```bash
# 安裝各專案依賴
cd backend && npm install
cd ../cbc-app/cbc-app && npm install
cd ../../server && npm install

# 啟動開發伺服器
# Terminal 1 - API
cd server && npm run start:dev

# Terminal 2 - 前台
cd cbc-app/cbc-app && npm start

# Terminal 3 - 後台
cd backend && npm start
```

## 部署

### 前台 (cbc-app)
- **Production URL**: https://beta-museum.4impact.cc
- **IIS 部署**: 見 cbc-app/README.md

### Mockup 版本
- **URL**: https://mockup-museum.4impact.cc
- **分支**: `2025-12-23-AA-without-3-pages`
- **說明**: 設計稿 mockup 版本，用於前端開發參考

### 虛擬展廳 (獨立專案)
- **Repository**: https://github.com/bright-ideass/cbc-gallery
- **Production URL**: https://gallery.4impact.cc
- **說明**: 不進行無障礙 AA 認證的獨立網站

## 相關連結

- [cbc-gallery](https://github.com/bright-ideass/cbc-gallery) - 虛擬展廳（兒童版、虛擬展覽館、典藏寶庫）
- [HackMD 工作紀錄](https://hackmd.io/@yillkid)

## License

Private - 中央銀行券幣數位博物館
