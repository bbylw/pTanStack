# WebNav Hub - 个人导航中心

[![TanStack Start](https://img.shields.io/badge/TanStack-Start-blue.svg)](https://tanstack.com/start)
[![TanStack Router](https://img.shields.io/badge/TanStack-Router-emerald.svg)](https://tanstack.com/router)
[![TanStack Query](https://img.shields.io/badge/TanStack-Query_v5-ff4154.svg)](https://tanstack.com/query)
[![React 19](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev/)

**WebNav Hub** 是一个现代化、数据驱动的个人网站导航中心。本项目在**100% 严格保留原版经典视觉界面与交互设计（UI 像素级完全不变）**的前提下，底层代码全面升级为最新现代化技术栈架构：**TanStack Start**、**TanStack Router**、**TanStack Query v5**、**React 19** 与 **TypeScript**。

---

## 🌟 项目亮点

* 🎨 **100% 经典原版 UI 视觉**：严格保持原版深色经典主题（暗黑背景、橙黑导航高亮、流光悬浮卡片微动效），所有 CSS 样式、排版布局、响应式断点与交互效果毫秒级还原。
* ⚡ **TanStack Start 静态预渲染 (SSG)**：首屏采用构建期预渲染技术生成纯静态 HTML，无需等待客户端 JS 编译执行，具备秒级直达体验与极佳的 SEO 友好度。
* 🧭 **TanStack Router 类型安全路由**：基于官方推荐的文件系统路由（File-based routing），完美重构 Hash 定位与平滑滚动机制。
* 🔄 **TanStack Query (React Query v5) 驱动**：异步状态管理与智能缓存，数据与结构彻底分离。
* 💾 **纯数据驱动维护**：所有网址数据存储在独立的 [`public/data.json`](./public/data.json) 中，新增分类或链接只需修改 JSON，直观易维护。
* 🚀 **告别客户端运行时编译**：淘汰低效的浏览器端 Babel Standalone 编译，引入现代 Vite 构建工具链，提供极速 HMR 实时预览与秒级生产打包。

---

## 📁 项目结构

```bash
pTanStack/
├── public/                 # 静态资源与数据目录
│   ├── data.json           # 导航链接数据库（可随时编辑）
│   └── CNAME               # 自定义域名配置（ptanstack.ndjp.net）
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
│   └── deploy.yml          # GitHub Actions 自动构建与 Surge 部署工作流
├── vite.config.ts          # Vite 与 TanStack Start SSG 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 依赖与脚本
```

---

## 🚀 本地开发与运行

### 1. 安装依赖
```bash
npm install
```

### 2. 启动本地开发服务
遵循开发规范，使用 `portless` 启动本地开发服务：
```bash
portless
# 或者运行: npm run dev
# 本地访问地址: https://ptanstack.localhost
```

### 3. 生成路由树
```bash
npm run generate-routes
```

### 4. 生产环境构建与预渲染
```bash
npm run build
```
执行后仅需数百毫秒即可在 `dist/client` 目录生成包含 `CNAME`、`data.json` 与完整预渲染 HTML 的静态产物。

---

## ✍️ 如何编辑和管理链接？

所有网址都统一放置在 [`public/data.json`](./public/data.json) 中管理：

```json
[
  {
    "id": "ai-search",            // 分类的唯一 ID
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

## ☁️ 自动化部署 (CI/CD)

通过 GitHub Actions 持续集成工作流（[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)），当代码推送到 `main` 分支时自动触发：
1. **自动构建**：检出代码，安装依赖并执行 `npm run build` 完成全站静态预渲染。
2. **GitHub Pages 部署**：使用 GitHub 官方 Actions 自动将 `dist/client` 静态产物发布至 GitHub Pages。
3. **Surge 备份部署**：若在仓库 Secret 中配置了 `SURGE_TOKEN`，自动同步发布至 `ptanstack.surge.sh`。
4. **自定义域名支持**：内置 [public/CNAME](./public/CNAME) 域名配置，自动绑定至自定义域名 `ptanstack.ndjp.net`。
