# Blog Web

基于 [Eleventy](https://www.11ty.dev/)（11ty）构建的简洁优雅博客，通过 **GitHub Actions** 自动部署到 **GitHub Pages**。纯 HTML 和 CSS，无客户端 JavaScript，极致性能。

![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## ✨ 特性

- ⚡ **极速加载** —— 纯静态 HTML/CSS，零客户端 JS
- 🌗 **暗色模式** —— 跟随系统自动切换亮色/暗色主题
- 📱 **响应式设计** —— 手机、平板、桌面端体验一致
- 🏷️ **标签系统** —— 自动生成标签页面，方便文章归类
- 📡 **RSS 订阅** —— Atom feed 输出至 `/feed/feed.xml`
- 🔗 **前后篇导航** —— 文章页面自动关联上下文
- 💻 **代码高亮** —— 基于 PrismJS 的语法高亮
- 🖼️ **图片优化** —— 自动转换为 WebP/JPEG 格式
- 🔍 **SEO 友好** —— 语义化 HTML + meta 标签 + sitemap

---

## 📁 项目结构

```
blog-web/
├── .github/workflows/gh-pages.yml   # GitHub Actions 部署脚本
├── _data/
│   └── metadata.js                  # 站点配置（标题、作者等）
├── _includes/
│   ├── layouts/
│   │   ├── base.njk                 # 主 HTML 框架
│   │   ├── home.njk                 # 首页布局
│   │   └── post.njk                 # 文章页布局
│   ├── header.njk                   # 顶栏 + 导航
│   ├── footer.njk                   # 页脚
│   └── postslist.njk                # 可复用的文章列表组件
├── content/
│   ├── blog/                        # 博客文章（Markdown）
│   ├── about/                       # 关于页面
│   ├── index.njk                    # 首页入口
│   ├── blog.njk                     # 全部文章列表
│   ├── tags.njk                     # 标签总览页
│   ├── tag.njk                      # 单标签页面模板
│   ├── 404.md                       # 404 页面
│   └── feed/                        # RSS feed 样式文件
├── public/
│   └── css/
│       ├── index.css                # 主样式表
│       ├── message-box.css           # 提示框样式
│       └── prism-diff.css           # diff 高亮样式
├── eleventy.config.js               # Eleventy 配置
├── package.json
├── .gitignore
└── .nojekyll                        # 禁用 GitHub Pages 的 Jekyll 处理
```

---

## 🚀 本地运行

### 环境要求

- [Node.js](https://nodejs.org/) 18 或更高版本

### 起步

```bash
# 1. 克隆仓库
git clone https://github.com/你的用户名/blog-web.git
cd blog-web

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm start
```

浏览器打开 `http://localhost:8080`，修改文件后自动刷新。

### 生产构建

```bash
npm run build
```

静态站点生成在 `_site/` 目录中。

---

## 📝 撰写文章

在 `content/blog/` 下新建 Markdown 文件：

```markdown
---
title: 我的新文章
description: 文章摘要，用于列表预览和 SEO
date: 2026-08-15
tags:
  - JavaScript
  - 教程
---

正文从这里开始。用 **Markdown** 书写！

## 代码块也可以

​```javascript
console.log("你好，世界！");
​```
```

文章会自动出现在首页、博客页、RSS 和标签页中。

### 草稿

在 front matter 中添加 `draft: true` 即可隐藏该文章。草稿在开发模式下仍然可见。

---

## 🎨 自定义配置

### 站点信息

编辑 `_data/metadata.js`，修改网站标题、描述、URL 和作者信息：

```js
export default {
  title: "我的博客",
  url: "https://你的用户名.github.io/blog-web/",
  language: "zh",
  description: "写代码、读好书、认真生活。",
  author: {
    name: "你的名字",
    email: "you@example.com",
    url: "https://你的用户名.github.io/blog-web/about/",
  },
};
```

### 样式

主样式文件为 `public/css/index.css`，所有颜色、字体、间距均通过 **CSS 自定义属性**（变量）管理，修改十分便捷：

```css
:root {
  --color-primary: #2563eb;    /* 修改主题色 */
  --font-sans: "Inter", ...;   /* 修改字体 */
  --max-width: 720px;           /* 修改内容区宽度 */
}
```

### 导航菜单

在任意页面的 front matter 中添加 `eleventyNavigation` 即可：

```yaml
eleventyNavigation:
  key: 我的页面
  order: 3
```

### 字体

默认使用 Google Fonts（Inter + Merriweather + Fira Code），配置在 `_includes/layouts/base.njk` 中。如需更换，修改 `<link>` 标签或替换为其他字体即可。

---

## 🌐 部署到 GitHub Pages

### 第 1 步：推送至 GitHub

在 GitHub 上创建新仓库，然后推送代码：

```bash
git init
git add .
git commit -m "初始化博客"
git branch -M main
git remote add origin https://github.com/你的用户名/blog-web.git
git push -u origin main
```

### 第 2 步：配置 GitHub Pages

1. 打开 GitHub 上的仓库页面
2. 进入 **Settings → Pages**（左侧菜单）
3. 在 **Build and Deployment** 中设置：
   - **Source**：`GitHub Actions`
4. 完成——无需其他设置

### 第 3 步：触发首次部署

推送至 `main` 分支后，工作流会自动运行。你也可以手动触发：

1. 在仓库中进入 **Actions** 标签页
2. 左侧选择 **Deploy to GitHub Pages**
3. 点击 **Run workflow → Run workflow**

### 第 4 步：访问你的网站

部署完成后（通常 30–60 秒），网站上线地址为：

```
https://你的用户名.github.io/blog-web/
```

> **注意**：`package.json` 中的 `build-ghpages` 脚本使用了 `--pathprefix=/blog-web/`。如果你的仓库名不同，请更新此路径。如果使用自定义域名，可直接删除 `--pathprefix` 参数。

### 绑定自定义域名

1. 在 `public/` 目录下新建 `CNAME` 文件：
   ```
   www.yourdomain.com
   ```
2. 在域名 DNS 中添加 CNAME 记录，指向 `你的用户名.github.io`
3. 进入 **Settings → Pages → Custom domain**，填写域名并启用 HTTPS
4. 删除 `package.json` 中 `build-ghpages` 脚本的 `--pathprefix=/blog-web/`

---

## 🔧 常用命令

| 命令 | 说明 |
| ---- | ---- |
| `npm start` | 启动开发服务器（热重载） |
| `npm run build` | 生产构建 |
| `npm run build-ghpages` | 带路径前缀的构建（GitHub Pages 用） |
| `npm run debug` | 调试模式构建 |
| `npm run debugstart` | 调试模式开发服务器 |
| `npm run benchmark` | 构建性能分析 |

---

## 🛠️ 技术栈

- **[Eleventy v3](https://www.11ty.dev/)** —— 静态网站生成器
- **[Nunjucks](https://mozilla.github.io/nunjucks/)** —— 模板引擎
- **[PrismJS](https://prismjs.com/)** —— 代码语法高亮
- **[Luxon](https://moment.github.io/luxon/)** —— 日期格式化
- **[GitHub Actions](https://github.com/features/actions)** —— CI/CD

---

## 📄 许可协议

MIT —— 随意用于你自己的博客。详见 [LICENSE](LICENSE)。

---

## 🙏 致谢

基于 [Zach Leatherman](https://www.zachleat.com/) 的优秀项目 [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog) 构建。如果你喜欢 Eleventy，欢迎支持这个开源项目。
