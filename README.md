# WebNav Hub - 个人导航中心

[![TanStack Start](https://img.shields.io/badge/TanStack-Start-blue.svg)](https://tanstack.com/start)
[![TanStack Router](https://img.shields.io/badge/TanStack-Router-emerald.svg)](https://tanstack.com/router)
[![TanStack Query](https://img.shields.io/badge/TanStack-Query_v5-ff4154.svg)](https://tanstack.com/query)
[![React 19](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev/)

**WebNav Hub** 是一个现代化、数据驱动的个人网站导航中心。本项目在**100% 严格保留原版经典视觉界面与交互设计（UI 像素级完全不变）**的前提下，底层代码全面升级为最新现代化技术栈架构：**TanStack Start**、**TanStack Router**、**TanStack Query v5**、**React 19** 与 **TypeScript**。

---

## 🌟 项目亮点

* 🎨 **100% 经典原版 UI 视觉**：严格保持原版深色经典主题（暗黑背景、橙黑导航高亮、流光悬浮卡片微动效），所有 CSS 样式、排版布局、响应式断点与交互效果毫秒级还原。
* ⚡ **TanStack Start 静态预渲染 (SSG)**：首屏采用构建期预渲染技术生成纯静态 HTML，无需等待客户端 JS 编译执行，具备秒级直达体验与极佳的 SEO 友好度。
* 🧭 **TanStack Router 类型安全路由**：基于官方推荐的文件系统路由（File-based routing），完美重构 Hash 定位与平滑滚动机制。
* 🔄 **TanStack Query (React Query v5) 驱动**：异步状态管理与智能缓存，数据与结构彻底分离。
* 💾 **纯数据驱动维护**：所有网址数据存储在独立的 [`public/data.json`](./public/data.json) 中，新增分类或链接只需修改 JSON，直观易维护。
* 🚀 **告别客户端运行时编译**：淘汰低效的浏览器端 Babel Standalone 编译，引入现代 Vite 构建工具链，提供极速生产打包。

---

## 📁 项目结构

```bash
pTanStack/
├── public/                 # 静态资源与数据目录
│   ├── data.json           # 导航链接数据库（可随时编辑）
│   ├── favicon.svg         # 网站矢量图标
│   └── CNAME               # 自定义域名配置（如 ptanstack.ndjp.net）
├── src/
│   ├── integrations/       # TanStack Query 配置与 DevTools 插件
│   │   └── tanstack-query/
│   ├── routes/             # TanStack Router 文件系统路由
│   │   ├── __root.tsx      # 根布局文档（包含字体图标与样式注入）
│   │   └── index.tsx       # 导航中心主页面（原汁原味 UI 渲染）
│   ├── types/              # TypeScript 类型定义
│   │   └── navigation.ts
│   ├── router.tsx          # 路由器初始化与 SSR Query 集成
│   ├── routeTree.gen.ts    # TanStack 自动生成的类型安全路由树
│   └── styles.css          # 100% 原版视觉样式表
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions 自动构建与 Pages / Surge 双轨部署工作流
├── vite.config.ts          # Vite 与 TanStack Start SSG 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 依赖与脚本
```

---

## ✍️ 如何编辑和管理链接？

所有网址都统一放置在 [`public/data.json`](./public/data.json) 中管理：

```json
[
  {
    "id": "ai-search",            // 分类的唯一 ID（用于锚点定位）
    "title": "Ai搜索",            // 导航栏显示的分类名称
    "icon": "fa-solid fa-robot",  // 该分类对应的 FontAwesome 图标
    "links": [
      { 
        "name": "智谱清言", 
        "url": "https://chatglm.cn/", 
        "icon": "fa-solid fa-comment-dots" 
      },
      { 
        "name": "chatgpt", 
        "url": "https://chatgpt.com/", 
        "icon": "fa-brands fa-google" 
      }
    ]
  }
]
```

---

## ☁️ 多托管平台部署教程

本项目为标准现代静态站点预渲染（SSG）架构，构建输出目录统一为：
- **构建命令 (Build Command)**: `npm run build`
- **输出目录 (Output Directory)**: `dist/client`
- **Node.js 版本**: `>= 20.x` (推荐 22.x)

### 1. GitHub Pages (Actions 自动化部署)
仓库已内置完整的 CI/CD 工作流（[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)），当代码推送到 `main` 分支时自动触发构建并部署：

1. 进入 GitHub 仓库设置：**Settings** -> **Pages**。
2. 在 **Build and deployment** -> **Source** 中，将来源从 *Deploy from a branch* 改为 **GitHub Actions**。
3. 推送代码至 `main` 分支，GitHub Actions 将全自动完成构建并发布。
4. 如需绑定自定义域名，直接修改 [`public/CNAME`](./public/CNAME) 即可。

### 2. Cloudflare Pages
全球边缘加速分发，配置极简：

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)，进入 **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**。
2. 选中本项目仓库并点击 **Begin setup**。
3. 在构建设置中填入：
   - **Framework preset**: `None` 或 `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist/client`
   - **Environment variables**: 添加 `NODE_VERSION` = `22`
4. 点击 **Save and Deploy** 即可完成全球发布。

### 3. Vercel
1. 访问 [Vercel Dashboard](https://vercel.com/)，点击 **Add New...** -> **Project** 并导入该 GitHub 仓库。
2. 在 **Configure Project** 页面配置：
   - **Framework Preset**: `Other` 或 `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/client`
3. 点击 **Deploy**，几秒内即可完成自动化发布并获取独立 `*.vercel.app` 域名。

### 4. Netlify
1. 登录 [Netlify](https://app.netlify.com/)，选择 **Add new site** -> **Import an existing project** 连接 GitHub 仓库。
2. 配置构建参数：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/client`
3. 点击 **Deploy site** 即可完成部署。

### 5. Surge
极简静态托管服务（本项目工作流已内置兼容）：
- **CLI 手动发布**：
  ```bash
  npm run build
  npx surge dist/client your-domain.surge.sh
  ```
- **Actions 自动化发布**：
  在 GitHub 仓库 **Settings** -> **Secrets and variables** -> **Actions** 中添加：
  - `SURGE_TOKEN`: 你的 Surge 授权 Token（通过 `surge token` 命令获取）
  工作流将在每次推送到 `main` 时自动同步发布到 Surge，并自动生成 `200.html` SPA 兜底。

---

## 📄 开源许可证

本项目基于 MIT 许可证开源。
