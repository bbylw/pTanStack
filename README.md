# WebNav Hub - 个人导航中心

WebNav Hub 是一个现代化、数据驱动的个人网站导航中心。本项目在**完美保留原版视觉界面和交互设计（UI 不变）**的前提下，底层代码基于 **React 19** 和 **TanStack Query (React Query)** 进行了重构，实现了数据与展现的彻底分离。

## 🌟 项目亮点

* 🎨 **经典 UI 视觉**：100% 还原原版设计，高保真深色主题，流畅的悬浮微动效。
* ⚡ **TanStack Query 驱动**：使用专业的异步状态管理工具加载、缓存和同步导航链接。
* 💾 **数据与视图分离**：所有网址数据存储在独立的 `data.json` 中，结构清晰，极易维护。
* 🌐 **免构建轻量部署**：采用浏览器原生 **Import Maps** 导入依赖，配合 **Babel Standalone** 客户端转译，无需安装 Node.js，无需任何 Vite/Webpack 构建命令，即开即用。
* 🛡️ **纯数据驱动**：数据与结构彻底解耦，`index.html` 内不含任何网址备份。当遇到异常或检测到本地双击跨域受限时，会自动呈现友好的排查引导屏，保障系统透明度。
* 🔗 **React 式路由联动**：完美重构了 Hash 定位机制，后退/前进/点击侧栏均可实现页面平滑滚动与栏目精准高亮。

---

## 📁 项目结构

```bash
net/
├── index.html     # 主应用程序（React 渲染模板与样式）
├── data.json      # 导航链接数据库（可随时编辑）
└── README.md      # 项目说明文档
```

---

## 🚀 运行方式

由于实现了完全数据驱动，本项目在本地调试或线上运行时均需要满足相应条件：

### 1. 本地/线上服务器运行 (推荐)
将本项目上传至任何静态网页托管服务（如 GitHub Pages、Netlify、Vercel 等），或者在本地项目目录中启动一个静态服务器：
```bash
# 使用 python 启动
python -m http.server 8000

# 或使用 nodejs 启动
npx serve .
```
启动后通过浏览器访问对应本地地址即可。此时网页会自动动态加载 `data.json` 中的最新网址数据。

### 2. 本地直接双击运行 (跨域限制提示)
如果您直接在文件夹中**双击 `index.html` 运行（通过 `file://` 协议）**，受制于现代浏览器的 CORS 跨域安全策略，浏览器会禁止页面读取本地的 `data.json` 文件。此时，网页会自动检测并拦截，展示红色的**数据加载失败引导提示**，指导您如何开启本地静态服务器。

---

## ☁️ 托管平台部署教程

本项目为纯静态结构（无构建步骤），极其适合部署在各类免费的静态网站托管平台上：

### 1. GitHub Pages (推荐 - 免费且方便)
1. 在 GitHub 上新建一个公开代码仓库（Repository）。
2. 将本目录下的 `index.html` 和 `data.json` 上传或推送到该仓库的 `main` 分支。
3. 打开该仓库的 **Settings** -> 左侧菜单选择 **Pages**。
4. 在 **Build and deployment** 部分，将 **Source** 设置为 `Deploy from a branch`。
5. 在 **Branch** 下拉菜单中选择 `main` 分支和 `/ (root)` 根目录，点击 **Save**。
6. 等待约 1 分钟后，GitHub 就会为您生成专有的静态网页链接（如 `https://username.github.io/repo-name/`）。

### 2. Vercel 部署
* **方法 A：Git 联动部署（最省心）**
  1. 将代码推送至 GitHub/GitLab 仓库。
  2. 登录 [Vercel 官网](https://vercel.com/)，点击 **Add New** -> **Project**。
  3. 导入（Import）您刚才建立的 Git 仓库。
  4. Vercel 会自动识别该项目为静态站点，**Framework Preset** 选择 `Other`，**Build and Development Settings** 保持默认（留空），直接点击 **Deploy**。
  5. 部署完成后，Vercel 会提供一个高速访问的二级域名。
* **方法 B：Vercel CLI 命令行部署（最快速）**
  1. 本地安装 CLI：`npm install -g vercel`。
  2. 在项目根目录下打开终端，输入：`vercel` 并按提示登录。
  3. 跟着指引连续按回车（保持默认设置），项目就会立刻部署完成！

### 3. Netlify 部署
* **方法 A：拖拽上传（免注册 GitHub）**
  1. 登录 [Netlify 官网](https://www.netlify.com/) 并进入 Dashboard。
  2. 找到 **Sites** 页面，向下滚动到 **Deploy manually** 区域。
  3. 直接将您本地的 `net/` 文件夹（必须包含 `index.html` 和 `data.json`）拖拽到上传框中。
  4. 几秒钟内，项目即刻发布完成！
* **方法 B：Git 联动部署**
  1. 在 Netlify 选择 **Add new site** -> **Import an existing project**，绑定 GitHub 并选择对应仓库，直接点击 **Deploy site**。

### 4. Cloudflare Pages 部署
1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)，在左侧菜单栏选择 **Workers & Pages** -> 点击 **Create** -> 选择 **Pages**。
2. **方法一**：选择 **Connect to Git** 关联您的 GitHub 仓库并直接点击部署。
3. **方法二**：选择 **Upload assets**，将包含 `index.html` 和 `data.json` 的项目文件夹拖入并点击上传部署。

---

## ✍️ 如何编辑和管理链接？

所有网址都统一放置在 [data.json](./data.json) 中管理。您只需使用文本编辑器打开它，按照以下结构编辑即可：

### 数据结构示例
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
        "icon": "fa-solid fa-comment-dots"  // 链接对应的图标 
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

* **新增网址**：在对应分类的 `links` 数组中添加一个包含 `name`、`url` 和 `icon` 的对象。
* **新增分类**：在 JSON 数组的最外层增加一个新的分类对象。
* **图标支持**：图标使用流行的 [FontAwesome v7](https://fontawesome.com/icons) 库，您可以在其官网上找到任何图标的类名（如 `fa-brands fa-github`）并填入对应的 `"icon"` 属性中。
